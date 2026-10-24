"""HTTP smoke verification. Start python -m http.server 8000 first."""
import json, sys
from urllib.request import urlopen

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8000').rstrip('/')
def get(path):
    with urlopen(base + path, timeout=10) as response:
        assert response.status == 200
        return response.read().decode('utf-8')
html = get('/')
script = get('/js/script.js')
config = json.loads(get('/data/content.json'))
for marker in ('portfolio-projects', 'portfolio-certificates', 'portfolio-contact-form', 'type="module"'):
    assert marker in html, marker
for marker in ('project-showcase', 'certificate-choice', 'dialog.showModal()', 'gallery-filmstrip'):
    assert marker in script, marker
assert len(config['projects']) == 5 and len(config['certificates']) == 5
get('/css/style.css')
get('/css/components.css')
print('PASS: HTTP page, module, styles and five project/certificate data entries.')
