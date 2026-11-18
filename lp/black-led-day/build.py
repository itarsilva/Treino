"""Gera as versões da LP Black LED Day a partir de template.html, kits.json e fotos/."""
import json, base64
s = open('template.html').read()
kits = json.dumps(json.load(open('kits.json')), ensure_ascii=False, separators=(',', ':'))
logo = base64.b64encode(open('ledwave-logo-white.webp', 'rb').read()).decode()
emb = {n: 'data:image/webp;base64,' + base64.b64encode(open(f'fotos/kit-{n:02d}.webp', 'rb').read()).decode() for n in range(1, 16)}
links = {n: f'COLE_AQUI_O_LINK_DA_FOTO_KIT_{n:02d}' for n in range(1, 16)}
def build(fotos, note):
    js = '{\n' + ',\n'.join(f'    {n}: "{v}"' for n, v in fotos.items()) + '\n  }'
    return s.replace('@@KITS@@', kits).replace('@@LOGO@@', logo).replace('@@FOTOS@@', js).replace('@@FOTOS_NOTE@@', note)
rd = build(emb, 'já embutidas no código (não precisa subir nada).')
open('black-led-day-rd.html', 'w').write(rd)
open('black-led-day-rd-links.html', 'w').write(build(links, 'suba as 15 fotos (pasta fotos/) na biblioteca de imagens do RD e cole o link de cada uma na lista FOTOS, no script.'))
open('preview.html', 'w').write('<title>Black LED Day</title>\n<style>:root{color-scheme:dark}body{background:#07080d;margin:0}</style>\n' + rd)
