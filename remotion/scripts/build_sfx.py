"""Monta a biblioteca de efeitos sonoros em remotion/public/sfx/.

Fontes:
- Kenney (CC0), via github.com/kapishdima/soundcn/assets
- remotion.media (efeitos listados na skill remotion-best-practices, sfx.md)
- Sintetizados aqui com FFmpeg (sem licença de terceiros)

Todos os arquivos saem em WAV mono 48 kHz, com pico normalizado em -3 dBFS, para que o
volume relativo entre eles seja previsível. Rode de novo para refazer a biblioteca:

    python scripts/build_sfx.py
"""

from __future__ import annotations

import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "public" / "sfx"
KENNEY = "https://raw.githubusercontent.com/kapishdima/soundcn/main/assets/"
REMOTION = "https://remotion.media/"

# destino (relativo a public/sfx) -> URL de origem
DOWNLOADS: dict[str, str] = {
    # whoosh / transições
    "whoosh/whoosh.wav": REMOTION + "whoosh.wav",
    "whoosh/whip.wav": REMOTION + "whip.wav",
    "whoosh/page-turn.wav": REMOTION + "page-turn.wav",
    # digitação (type writing): teclas variadas para não soar repetitivo
    "type/key-1.wav": KENNEY + "kenney_interface-sounds/click_001.ogg",
    "type/key-2.wav": KENNEY + "kenney_interface-sounds/click_002.ogg",
    "type/key-3.wav": KENNEY + "kenney_interface-sounds/click_003.ogg",
    "type/key-4.wav": KENNEY + "kenney_interface-sounds/tick_001.ogg",
    "type/key-5.wav": KENNEY + "kenney_interface-sounds/tick_002.ogg",
    "type/return.wav": KENNEY + "kenney_interface-sounds/switch_002.ogg",
    # pop (itens de lista, chips, cards)
    "pop/pop-1.wav": KENNEY + "kenney_interface-sounds/drop_001.ogg",
    "pop/pop-2.wav": KENNEY + "kenney_interface-sounds/drop_002.ogg",
    "pop/pop-3.wav": KENNEY + "kenney_interface-sounds/drop_003.ogg",
    "pop/pluck.wav": KENNEY + "kenney_interface-sounds/pluck_001.ogg",
    # interface
    "ui/click.wav": REMOTION + "mouse-click.wav",
    "ui/switch.wav": REMOTION + "switch.wav",
    "ui/select.wav": KENNEY + "kenney_interface-sounds/select_001.ogg",
    "ui/open.wav": KENNEY + "kenney_interface-sounds/maximize_001.ogg",
    "ui/close.wav": KENNEY + "kenney_interface-sounds/minimize_001.ogg",
    "ui/confirm.wav": KENNEY + "kenney_interface-sounds/confirmation_001.ogg",
    "ui/error.wav": KENNEY + "kenney_interface-sounds/error_004.ogg",
    "ui/tick.wav": KENNEY + "kenney_interface-sounds/tick_004.ogg",
    "ui/scroll.wav": KENNEY + "kenney_interface-sounds/scroll_001.ogg",
    "ui/zap.wav": KENNEY + "kenney_digital-audio/zap1.ogg",
    # acentos
    "accent/ding.wav": REMOTION + "ding.wav",
    "accent/shutter.wav": REMOTION + "shutter-modern.wav",
    "accent/glass.wav": KENNEY + "kenney_interface-sounds/glass_001.ogg",
    "accent/power-up.wav": KENNEY + "kenney_digital-audio/powerUp2.ogg",
    "accent/two-tone.wav": KENNEY + "kenney_digital-audio/twoTone1.ogg",
    # impactos
    "impact/punch.wav": KENNEY + "kenney_impact-sounds/impactPunch_heavy_000.ogg",
    "impact/soft.wav": KENNEY + "kenney_impact-sounds/impactSoft_medium_000.ogg",
    "impact/thud.wav": KENNEY + "kenney_impact-sounds/impactGeneric_light_000.ogg",
}

LICENSES = {
    "kenney-interface-sounds.txt": KENNEY + "kenney_interface-sounds/License.txt",
    "kenney-digital-audio.txt": KENNEY + "kenney_digital-audio/License.txt",
}

# destino -> (filtro lavfi de origem, cadeia de filtros)
SYNTH: dict[str, tuple[str, str]] = {
    # whoosh discreto para Aula: ruído rosa filtrado com envelope de subida e queda
    "whoosh/soft.wav": (
        "anoisesrc=d=0.55:c=pink:r=48000:a=0.5",
        "highpass=f=250,lowpass=f=2200,afade=t=in:d=0.3:curve=qsin,afade=t=out:st=0.3:d=0.25:curve=qsin",
    ),
    # whoosh de saída (mais curto, cai rápido)
    "whoosh/out.wav": (
        "anoisesrc=d=0.35:c=pink:r=48000:a=0.5",
        "highpass=f=400,lowpass=f=3500,afade=t=in:d=0.08,afade=t=out:st=0.08:d=0.27:curve=exp",
    ),
    # riser: varredura ascendente + ruído, para antecipar um número grande ou revelação
    "accent/riser.wav": (
        "aevalsrc='0.35*sin(2*PI*(180*t+260*t*t))+0.15*sin(2*PI*(360*t+520*t*t))':d=1.4:s=48000",
        "afade=t=in:d=1.2:curve=exp,afade=t=out:st=1.3:d=0.1",
    ),
    # boom grave (sub drop) para o gancho e números de impacto
    "impact/boom.wav": (
        "aevalsrc='exp(-3.5*t)*sin(2*PI*(70*t-12*t*t))':d=1.2:s=48000",
        "lowpass=f=220,afade=t=out:st=0.9:d=0.3",
    ),
    # tick de contador (números subindo)
    "ui/counter-tick.wav": (
        "aevalsrc='exp(-90*t)*sin(2*PI*2400*t)':d=0.06:s=48000",
        "highpass=f=800",
    ),
}

FINAL = ["-ac", "1", "-ar", "48000", "-c:a", "pcm_s16le"]


def ffmpeg(*args: str) -> None:
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def peak_db(path: Path) -> float:
    out = subprocess.run(
        ["ffmpeg", "-hide_banner", "-i", str(path), "-af", "volumedetect", "-f", "null", "-"],
        capture_output=True, text=True, check=True,
    ).stderr
    line = next(l for l in out.splitlines() if "max_volume" in l)
    return float(line.split("max_volume:")[1].split("dB")[0])


def normalize(src: Path, dst: Path, trim: bool = True) -> None:
    """Normaliza o pico em -3 dBFS. Com trim, remove o silêncio inicial (o som entra no
    frame exato em que é colocado). Os sintetizados não passam pelo trim, para não perder
    o fade-in."""
    tmp = dst.with_suffix(".tmp.wav")
    af = ["-af", "silenceremove=start_periods=1:start_threshold=-60dB"] if trim else []
    ffmpeg("-i", str(src), *af, *FINAL, str(tmp))
    gain = -3.0 - peak_db(tmp)
    ffmpeg("-i", str(tmp), "-af", f"volume={gain:.2f}dB", *FINAL, str(dst))
    tmp.unlink()


def fetch(url: str, dest: Path) -> None:
    safe = urllib.parse.quote(url, safe=":/")
    req = urllib.request.Request(safe, headers={"User-Agent": "build_sfx"})
    with urllib.request.urlopen(req, timeout=30) as r:
        dest.write_bytes(r.read())


def main() -> int:
    ROOT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        tmpdir = Path(td)
        for rel, url in DOWNLOADS.items():
            dst = ROOT / rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            raw = tmpdir / (dst.stem + Path(urllib.parse.urlparse(url).path).suffix)
            fetch(url, raw)
            normalize(raw, dst)
            print("ok", rel)
        for rel, (src, chain) in SYNTH.items():
            dst = ROOT / rel
            dst.parent.mkdir(parents=True, exist_ok=True)
            raw = tmpdir / (dst.stem + "-synth.wav")
            ffmpeg("-f", "lavfi", "-i", src, "-af", chain, *FINAL, str(raw))
            normalize(raw, dst, trim=False)
            print("ok", rel, "(sintetizado)")
    lic = ROOT / "licenses"
    lic.mkdir(exist_ok=True)
    for name, url in LICENSES.items():
        fetch(url, lic / name)
    return 0


if __name__ == "__main__":
    sys.exit(main())
