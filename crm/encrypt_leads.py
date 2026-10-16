"""Criptografa crm/leads.json -> crm/leads.enc.json (AES-256-GCM, chave PBKDF2-SHA256).
A senha vem da variável de ambiente CRM_SENHA; nunca fica no repositório."""
import base64, json, os, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ITER = 600_000
senha = os.environ.get('CRM_SENHA') or sys.exit('defina CRM_SENHA')
salt, iv = os.urandom(16), os.urandom(12)
key = PBKDF2HMAC(hashes.SHA256(), 32, salt, ITER).derive(senha.encode())
ct = AESGCM(key).encrypt(iv, open('crm/leads.json', 'rb').read(), None)
b64 = lambda b: base64.b64encode(b).decode()
json.dump({'v': 1, 'iter': ITER, 'salt': b64(salt), 'iv': b64(iv), 'ct': b64(ct)}, open('crm/leads.enc.json', 'w'))
print('ok', len(ct), 'bytes')
