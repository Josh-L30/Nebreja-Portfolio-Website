import urllib.request

checks = {
    'script.js': 'IntersectionObserver',
    'script.js': 'contactForm.addEventListener',
    'script.js': 'requestAnimationFrame',
    'script.js': 'modal.showModal',
    'script.js': 'nav-toggle'
}

response = urllib.request.urlopen('http://localhost:8000/js/script.js')
data = response.read().decode('utf-8')
for key, value in {
    'IntersectionObserver': 'IntersectionObserver',
    'contactForm submit binding': 'contactForm.addEventListener',
    'counter animation': 'requestAnimationFrame',
    'project modal': 'modal.showModal',
    'navigation drawer toggle': 'nav-toggle'
}.items():
    print('FOUND' if value in data else 'MISSING', key)
