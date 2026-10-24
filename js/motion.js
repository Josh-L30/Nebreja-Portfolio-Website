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
  const connection = navigator.connection;
  const targets = new Map(), near = new Set(), observed = new WeakSet();
  const stackTargets=new Map(), stackNear=new Set();
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
        word.style.removeProperty('filter');
        word.style.transform = `translateY(${Math.round((1 - eased) * 24)}px)`;
        word.style.setProperty('--word-fill', `${(local * 100).toFixed(2)}%`);
      });
    }
    for(const group of stackNear){
      const progress=clamp((innerHeight*.92-group.getBoundingClientRect().top)/(innerHeight*.44));
      const rest=1-progress*progress*(3-2*progress);
      stackTargets.get(group).forEach((tile,index)=>{
        const direction=index%2?1:-1;
        const distance=innerWidth<768?14:32;
        tile.style.transform=`translate3d(${direction*distance*rest}px,${direction*(innerWidth<768?65:90)*(1+(index%3)*.18)*rest}px,0) rotate(${direction*(8+index%4*2)*rest}deg)`;
      });
    }
    if (scene && heroNear && innerWidth >= 768) {
      const progress = clamp(scrollY / (hero.offsetHeight * .9));
      scene.style.transform = `translateY(${Math.round(progress * 65)}px)`;
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
      stackTargets.forEach(tiles=>tiles.forEach(tile=>tile.style.removeProperty('transform')));
      root.querySelectorAll('.reveal-enter').forEach(el => el.classList.remove('reveal-enter'));
      if (scene) { scene.style.transform = ''; scene.style.opacity = ''; }
    }
    if (scene && innerWidth < 768) { scene.style.transform = ''; scene.style.opacity = ''; }
    watch(allowed() && !doc.hidden && !doc.body.classList.contains('modal-open') && (heroNear || near.size > 0 || stackNear.size > 0));
    if (listening) request();
  }
  const wordsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const target = targets.get(entry.target); if (!target) return;
      if (entry.isIntersecting) near.add(target); else near.delete(target);
    }); configure();
  }, { rootMargin: '80px 0px', threshold: 0 });
  const stackObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.isIntersecting?stackNear.add(entry.target):stackNear.delete(entry.target));configure();
  },{rootMargin:'100px 0px'});
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
    root.querySelectorAll('.tech-group').forEach(group=>{
      if(stackTargets.has(group))return;
      stackTargets.set(group,[...group.querySelectorAll('.tech-chip')]);
      group.dataset.stackMotion='ready';stackObserver.observe(group);
    });
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
  reduced.addEventListener('change', configure);
  connection?.addEventListener('change', configure); addEventListener('resize', configure, { passive: true });
  doc.addEventListener('visibilitychange', configure);
  discover(); configure();
  if (hero && allowed()) requestAnimationFrame(() => { if (!disposed && allowed()) hero.classList.add('entrance-ready'); });
  doc.fonts?.ready.then(request);
  doc.documentElement.dataset.wordMotion = 'ready'; doc.documentElement.dataset.wordMode = 'scroll-linked';
  function cleanup() {
    disposed = true; watch(false); changes.disconnect(); bodyChanges.disconnect();
    wordsObserver.disconnect(); entrances.disconnect(); heroObserver.disconnect(); stackObserver.disconnect();
    stackTargets.forEach(tiles=>tiles.forEach(tile=>tile.style.removeProperty('transform')));
    reduced.removeEventListener('change', configure);
    connection?.removeEventListener('change', configure); removeEventListener('resize', configure);
    doc.removeEventListener('visibilitychange', configure); targets.forEach(clearTarget);
    if (scene) { scene.style.transform = ''; scene.style.opacity = ''; }
    activeRoots.delete(root);
  }
  activeRoots.set(root, cleanup); return cleanup;
}
