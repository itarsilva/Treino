"""Trilha original do motion "Lançamento" da Linha Editora.

120 BPM, Lá menor (Am – F – C – G), 14 compassos de 4 tempos = 28 s.
  1–2   intro: pad e arpejo, sem bateria, subida no fim
  3–10  drop: bumbo, palmas, chimbal, baixo
  11–12 respiro: sem bumbo, pad aberto e subida
  13–14 volta e final: drop curto e acorde final com cauda
Gera public/musica-lancamento.wav (44,1 kHz, estéreo, 16 bits). Só usa numpy.
"""
import sys
import wave

import numpy as np

SR = 44100
BPM = float(sys.argv[2]) if len(sys.argv) > 2 else 120   # uso: compor.py saida.wav [bpm]
TEMPO = 60 / BPM          # 0,5 s
COMPASSO = 4 * TEMPO      # 2 s
N_COMPASSOS = 14
DUR = N_COMPASSOS * COMPASSO + 2.0   # cauda de 2 s depois do último acorde
N = int(DUR * SR)
rng = np.random.default_rng(21)

L = np.zeros(N)
R = np.zeros(N)


def nota(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def amostra(t):
    return int(t * SR)


def soma(sinal, t0, pan=0.0, ganho=1.0):
    i = amostra(t0)
    j = min(N, i + len(sinal))
    if i >= N:
        return
    s = sinal[: j - i] * ganho
    L[i:j] += s * np.cos((pan + 1) * np.pi / 4)
    R[i:j] += s * np.sin((pan + 1) * np.pi / 4)


def envelope(n, a=0.005, d=0.1, s=0.7, r=0.1, dur=None):
    t = np.arange(n) / SR
    dur = dur if dur is not None else n / SR
    e = np.where(t < a, t / a, np.where(t < a + d, 1 - (1 - s) * (t - a) / d, s))
    e = np.where(t > dur - r, e * np.clip((dur - t) / r, 0, 1), e)
    return e


def passa_baixa(x, corte):
    # filtro de um polo, suficiente para amaciar pads e arpejos
    a = np.exp(-2 * np.pi * corte / SR)
    y = np.empty_like(x)
    acc = 0.0
    for k in range(len(x)):
        acc = (1 - a) * x[k] + a * acc
        y[k] = acc
    return y


# ── instrumentos ──────────────────────────────────────────────────────────────

def bumbo():
    n = amostra(0.45)
    t = np.arange(n) / SR
    f = 50 + 110 * np.exp(-t * 28)
    fase = 2 * np.pi * np.cumsum(f) / SR
    corpo = np.sin(fase) * np.exp(-t * 7)
    clique = rng.standard_normal(n) * np.exp(-t * 300) * 0.25
    return np.tanh((corpo + clique) * 1.6)


def palma():
    n = amostra(0.25)
    t = np.arange(n) / SR
    ruido = rng.standard_normal(n)
    e = np.zeros(n)
    for atraso in (0, 0.01, 0.02):
        k = amostra(atraso)
        e[k:] += np.exp(-(t[: n - k]) * 38)
    s = ruido * e
    return s - passa_baixa(s, 900)   # tira o grave, fica o estalo


def chimbal(aberto=False):
    n = amostra(0.18 if aberto else 0.05)
    t = np.arange(n) / SR
    s = rng.standard_normal(n)
    s = s - passa_baixa(s, 7000)
    return s * np.exp(-t * (18 if aberto else 90))


def baixo(midi, dur):
    n = amostra(dur)
    t = np.arange(n) / SR
    f = nota(midi)
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 6)
    return np.tanh(s * 1.3) * envelope(n, 0.004, 0.15, 0.6, 0.05)


def pad(midis, dur, brilho=1600):
    n = amostra(dur)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for m in midis:
        for desafina in (-0.12, 0.0, 0.12):
            f = nota(m + desafina)
            # dente de serra suave (poucos harmônicos)
            for h in range(1, 6):
                s += np.sin(2 * np.pi * f * h * t + rng.uniform(0, 6)) / h
    s = passa_baixa(s / (len(midis) * 9), brilho)
    return s * envelope(n, 0.35, 0.3, 0.85, 0.5)


def pluck(midi, dur=0.32):
    n = amostra(dur)
    t = np.arange(n) / SR
    f = nota(midi)
    s = (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * 2 * f * t) + 0.25 * np.sin(2 * np.pi * 3 * f * t))
    return s * np.exp(-t * 9) * envelope(n, 0.002, 0.05, 1, 0.03)


def subida(dur):
    n = amostra(dur)
    t = np.arange(n) / SR
    s = rng.standard_normal(n)
    corte = np.linspace(400, 9000, n)
    # varredura de filtro feita em blocos
    out = np.zeros(n)
    bloco = 2048
    for i in range(0, n, bloco):
        out[i:i + bloco] = passa_baixa(s[i:i + bloco], corte[i])
    return out * (t / dur) ** 2


def impacto():
    n = amostra(2.5)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * 45 * t) * np.exp(-t * 2.2)
    r = rng.standard_normal(n)
    return np.tanh(s * 1.5) + passa_baixa(r, 2500) * np.exp(-t * 3) * 0.6


# ── harmonia: Am – F – C – G, um acorde por compasso ─────────────────────────
ACORDES = [
    (45, [57, 60, 64, 69]),   # Am
    (41, [53, 57, 60, 65]),   # F
    (48, [55, 60, 64, 67]),   # C
    (43, [55, 59, 62, 67]),   # G
]
ARPEJO = [0, 2, 1, 3, 2, 1, 3, 2]   # índices dentro do acorde, em colcheias

kick, clap, hat, hat_ab = bumbo(), palma(), chimbal(), chimbal(True)
pad_bus_L = np.zeros(N)
pad_bus_R = np.zeros(N)

for c in range(N_COMPASSOS):
    t0 = c * COMPASSO
    raiz, acorde = ACORDES[c % 4]
    drop = 2 <= c <= 9 or 12 <= c <= 13
    respiro = 10 <= c <= 11
    final = c == 13

    # pad em todos os compassos (vai num barramento próprio para o "sidechain")
    p = pad(acorde, COMPASSO + 0.4, 2600 if respiro else 1700)
    i = amostra(t0)
    j = min(N, i + len(p))
    pad_bus_L[i:j] += p[: j - i] * 1.6
    pad_bus_R[i:j] += p[: j - i] * 1.7

    # arpejo em colcheias (menos no compasso final)
    if not final:
        for k, idx in enumerate(ARPEJO):
            soma(pluck(acorde[idx] + 12), t0 + k * TEMPO / 2, pan=0.35 if k % 2 else -0.35, ganho=0.26 if drop else 0.34)

    if drop:
        for b in range(4):
            tb = t0 + b * TEMPO
            if not (final and b > 0):
                soma(kick, tb, ganho=0.6)
            soma(hat, tb + TEMPO / 2, pan=0.2, ganho=0.22)
            if b in (1, 3) and not final:
                soma(clap, tb, ganho=0.45)
        if not final:
            soma(hat_ab, t0 + 3.5 * TEMPO, pan=-0.2, ganho=0.15)
            # baixo: raiz em colcheias com respiro no contratempo
            for k in range(8):
                if k % 2 == 0 or k in (3, 7):
                    soma(baixo(raiz, TEMPO / 2 * 0.9), t0 + k * TEMPO / 2, ganho=0.5)
    if respiro:
        soma(hat, t0 + 2 * TEMPO, ganho=0.12)

# subidas antes dos drops e impacto nos drops
soma(subida(COMPASSO * 1.0), 1 * COMPASSO, ganho=0.35)
soma(subida(COMPASSO * 2.0), 10 * COMPASSO, ganho=0.4)
soma(impacto(), 2 * COMPASSO, ganho=0.5)
soma(impacto(), 12 * COMPASSO, ganho=0.5)
# acorde final com cauda longa
soma(pad([57, 60, 64, 69, 72], 3.5, 2200), 13 * COMPASSO + TEMPO, ganho=0.9)
soma(impacto(), 13 * COMPASSO, ganho=0.4)

# "sidechain": o pad abaixa a cada bumbo nos drops
duck = np.ones(N)
for c in range(N_COMPASSOS):
    if 2 <= c <= 9 or 12 <= c <= 13:
        for b in range(4):
            i = amostra(c * COMPASSO + b * TEMPO)
            n = amostra(0.3)
            j = min(N, i + n)
            duck[i:j] = np.minimum(duck[i:j], 0.35 + 0.65 * (np.arange(j - i) / n))
L += pad_bus_L * duck
R += pad_bus_R * duck

# master: normaliza, satura de leve e entra/sai em fade
mix = np.stack([L, R], axis=1)
mix /= np.max(np.abs(mix)) + 1e-9
mix = np.tanh(mix * 1.4) / np.tanh(1.4)
fade_in = np.clip(np.arange(N) / (0.05 * SR), 0, 1)
fade_out = np.clip((N - np.arange(N)) / (1.5 * SR), 0, 1)
mix *= (fade_in * fade_out)[:, None] * 0.89

saida = sys.argv[1] if len(sys.argv) > 1 else "public/musica-lancamento.wav"
with wave.open(saida, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print(saida, f"{DUR:.1f}s")
