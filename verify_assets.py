"""Check the static portfolio's referenced assets without a running server."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
from html.parser import HTMLParser
import json
import re

ROOT = Path(__file__).resolve().parent
missing = set()
def check(value):
    path = unquote(urlsplit(value).path).lstrip('/')
    if path and not urlsplit(value).scheme and not value.startswith('#'):
        target = ROOT / path
        if not target.is_file() and not (target.is_dir() and (target / 'index.html').is_file()):
            missing.add(path)
class References(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in ('src', 'href') and value:
                check(value)
            elif key == 'srcset' and value:
                for candidate in value.split(','):
                    check(candidate.strip().split()[0])
for page in ('index.html', 'privacy.html', 'terms.html', 'README.md'):
    References().feed((ROOT / page).read_text(encoding='utf-8'))
for sheet in (ROOT / 'css').glob('*.css'):
    for value in re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', sheet.read_text(encoding='utf-8')):
        if not urlsplit(value).scheme:
            assert (sheet.parent / unquote(urlsplit(value).path)).is_file(), value
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
        for width in (() if screen['image'].startswith('assets/') else (480, 960, 1440)): check(f"assets/{screen['image']}-{width}.webp")
for certificate in config['certificates']: check(certificate['preview'])
assert len(config['projects']) == 5 and len(config['certificates']) == 5
html = (ROOT / 'index.html').read_text(encoding='utf-8')
assert 'id="education"' not in html and 'href="#education"' not in html
assert not missing, 'Missing assets: ' + ', '.join(sorted(missing))
print('PASS: local references, four Selected Works (five project entries), five certificates and responsive galleries.')
