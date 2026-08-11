import urllib.request
url = 'http://localhost:8000/js/script.js'
data = urllib.request.urlopen(url).read().decode('utf-8')
checks = ['IntersectionObserver', 'contactForm.addEventListener', 'requestAnimationFrame', 'modal.showModal', 'nav-toggle']
for item in checks:
    print('FOUND' if item in data else 'MISSING', item)
