// Optional native motion: controls and content remain usable if this module fails to load.
const activeRoots = new WeakMap();
const clamp = value => Math.min(1, Math.max(0, value));
export function sceneProgress(top, height) { return clamp((height * .85 - top) / (height * .65)); }
export function wordProgress(top, height, textHeight = 0, type = 'heading') {
  const range = type === 'statement' ? Math.max(height * .62, textHeight * .9) : height * .55;
  return clamp((height * .9 - top) / range);
}
export function initMotion(root = document) {
  activeRoots.get(root)?.();
  if (!('IntersectionObserver' in window)) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const blurCapable = matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
  const connection = navigator.connection;
  const targets = new Map(), near = new Set(), observed = new WeakSet();
  const doc = root === document ? root : root.ownerDocument;
  const hero = root.querySelector('.hero'), scene = root.querySelector('.hero-scene');
  let frame = 0, disposed = false, listening = false, heroNear = false;
  const allowed = () => !reduced.matches && !connection?.saveData;
  function clearTarget(target) {
    target.element.style.setProperty('--text-fill', '100%');
    target.words.forEach(word => {
      word.style.removeProperty('opacity'); word.style.removeProperty('filter');
      word.style.removeProperty('transform'); word.style.removeProperty('--word-fill');
    });
  }
  function paint() {
    frame = 0;
    if (!allowed() || doc.hidden || doc.body.classList.contains('modal-open')) return;
    for (const target of near) {
      if (!target.element.isConnected) { near.delete(target); targets.delete(target.element); continue; }
      const rect = target.element.getBoundingClientRect();
      const progress = wordProgress(rect.top, innerHeight, rect.height, target.type);
      target.element.style.setProperty('--text-fill', `${(progress * 100).toFixed(2)}%`);
      const spread = target.type === 'statement' ? .68 : .45;
      target.words.forEach((word, index) => {
        const offset = target.words.length > 1 ? index / (target.words.length - 1) * spread : 0;
        const local = clamp((progress - offset) / (1 - spread));
        const eased = 1 - (1 - local) ** 3;
        word.style.opacity = String(.55 + .45 * eased);
        word.style.filter = `blur(${((1 - eased) * (blurCapable.matches ? (target.type === 'statement' ? 4 : 1.5) : 0)).toFixed(2)}px)`;
        word.style.transform = `translateY(${((1 - eased) * 24).toFixed(2)}px)`;
        word.style.setProperty('--word-fill', `${(local * 100).toFixed(2)}%`);
      });
    }
    if (scene && heroNear && innerWidth >= 768) {
      const progress = clamp(scrollY / (hero.offsetHeight * .9));
      scene.style.transform = `translateY(${progress * 65}px) scale(${1 - progress * .07}) rotateX(${progress * -4}deg)`;
      scene.style.opacity = String(1 - progress * .65);
    } else if (scene && innerWidth < 768) { scene.style.transform = ''; scene.style.opacity = ''; }
  }
  function request() { if (!frame && !disposed && allowed()) frame = requestAnimationFrame(paint); }
  function watch(enabled) {
    if (enabled === listening) return;
    listening = enabled;
    if (enabled) addEventListener('scroll', request, { passive: true });
    else { removeEventListener('scroll', request); cancelAnimationFrame(frame); frame = 0; }
  }
  function configure() {
    doc.documentElement.toggleAttribute('data-motion-static', !allowed());
    if (!allowed()) {
      targets.forEach(clearTarget);
      root.querySelectorAll('.reveal-enter').forEach(el => el.classList.remove('reveal-enter'));
      if (scene) { scene.style.transform = ''; scene.style.opacity = ''; }
    }
    if (scene && innerWidth < 768) { scene.style.transform = ''; scene.style.opacity = ''; }
    watch(allowed() && !doc.hidden && !doc.body.classList.contains('modal-open') && (heroNear || near.size > 0));
    if (listening) request();
  }
  const wordsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const target = targets.get(entry.target); if (!target) return;
      if (entry.isIntersecting) near.add(target); else near.delete(target);
    }); configure();
  }, { rootMargin: '80px 0px', threshold: 0 });
  const entrances = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entrances.unobserve(entry.target);
      if (!allowed()) return;
      entry.target.classList.add('reveal-enter');
      entry.target.addEventListener('animationend', () => entry.target.classList.remove('reveal-enter'), { once: true });
    });
  }, { threshold: .08 });
  const heroObserver = new IntersectionObserver(entries => { heroNear = entries[0]?.isIntersecting || false; configure(); }, { rootMargin: '120px' });
  if (hero) heroObserver.observe(hero);
  function split(element, type) {
    if (targets.has(element)) return;
    const existing = [...element.querySelectorAll('.word-piece')];
    if (existing.length) {
      targets.set(element, { element, words: existing, type });
      wordsObserver.observe(element);
      return;
    }
    const nodes = [], walker = doc.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) if (walker.currentNode.textContent.trim()) nodes.push(walker.currentNode);
    const words = [];
    nodes.forEach(text => {
      const fragment = doc.createDocumentFragment();
      text.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { fragment.append(doc.createTextNode(part)); return; }
        const word = doc.createElement('span'); word.className = 'word-piece'; word.textContent = part;
        words.push(word); fragment.append(word);
      }); text.replaceWith(fragment);
    });
    element.dataset.wordReveal = type;
    const target = { element, words, type }; targets.set(element, target); wordsObserver.observe(element);
  }
  function discover() {
    root.querySelectorAll('main h2,.project-story h3,.project-proof h3').forEach(el => split(el, 'heading'));
    root.querySelectorAll('.about .statement,.contact-intro').forEach(el => split(el, 'statement'));
    root.querySelectorAll('[data-reveal]').forEach(el => {
      if (observed.has(el) || el.hasAttribute('data-word-reveal')) return;
      observed.add(el); entrances.observe(el);
    });
  }
  const changes = new MutationObserver(() => { discover(); configure(); });
  changes.observe(root === document ? doc.documentElement : root, { childList: true, subtree: true });
  const bodyChanges = new MutationObserver(configure); bodyChanges.observe(doc.body, { attributes: true, attributeFilter: ['class'] });
  reduced.addEventListener('change', configure); blurCapable.addEventListener('change', configure);
  connection?.addEventListener('change', configure); addEventListener('resize', configure, { passive: true });
  doc.addEventListener('visibilitychange', configure);
  discover(); configure();
  if (hero && allowed()) requestAnimationFrame(() => { if (!disposed && allowed()) hero.classList.add('entrance-ready'); });
  doc.fonts?.ready.then(request);
  doc.documentElement.dataset.wordMotion = 'ready'; doc.documentElement.dataset.wordMode = 'scroll-linked';
  function cleanup() {
    disposed = true; watch(false); changes.disconnect(); bodyChanges.disconnect();
    wordsObserver.disconnect(); entrances.disconnect(); heroObserver.disconnect();
    reduced.removeEventListener('change', configure); blurCapable.removeEventListener('change', configure);
    connection?.removeEventListener('change', configure); removeEventListener('resize', configure);
    doc.removeEventListener('visibilitychange', configure); targets.forEach(clearTarget);
    if (scene) { scene.style.transform = ''; scene.style.opacity = ''; }
    activeRoots.delete(root);
  }
  activeRoots.set(root, cleanup); return cleanup;
}
