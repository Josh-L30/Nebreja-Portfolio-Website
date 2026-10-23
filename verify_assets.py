"""Check the static portfolio's referenced assets without a running server."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
from html.parser import HTMLParser
import json

ROOT = Path(__file__).resolve().parent
missing = set()
def check(value):
    path = unquote(urlsplit(value).path).lstrip('/')
    if path and not urlsplit(value).scheme and not value.startswith('#') and not (ROOT / path).is_file():
        missing.add(path)
class References(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in ('src', 'href') and value:
                check(value)
References().feed((ROOT / 'index.html').read_text(encoding='utf-8'))
config = json.loads((ROOT / 'data/content.json').read_text(encoding='utf-8'))
def walk(value):
    if isinstance(value, dict):
        for item in value.values(): walk(item)
    elif isinstance(value, list):
        for item in value: walk(item)
    elif isinstance(value, str) and value.startswith('assets/'):
        check(value)
walk(config)
for project in config['projects']:
    for screen in project['gallery']:
        for width in (480, 960, 1440): check(f"assets/{screen['image']}-{width}.webp")
for certificate in config['certificates']: check(certificate['preview'])
assert len(config['projects']) == 5 and len(config['certificates']) == 5
assert not missing, 'Missing assets: ' + ', '.join(sorted(missing))
print('PASS: local references, five work entries, five certificates and responsive galleries.')
