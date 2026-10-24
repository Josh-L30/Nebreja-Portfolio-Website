// Native, optional motion. Content stays visible without this module.
const activeRoots=new WeakMap();
export function sceneProgress(top,height){return Math.min(1,Math.max(0,(height*.85-top)/(height*.65)))}
export function initMotion(root=document){
 activeRoots.get(root)?.();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const mobile=matchMedia('(max-width: 767px)');
 const connection=navigator.connection;
 let frame=0,scene=null,near=false,listening=false,disposed=false;
 const observed=new WeakSet(),seen=new WeakSet();
 const allowed=()=>!reduced.matches&&!connection?.saveData;
 const desktop=()=>allowed()&&!mobile.matches;
 const animate=element=>{if(seen.has(element))return;seen.add(element);if(!allowed())return;element.classList.add('reveal-enter');element.addEventListener('animationend',()=>element.classList.remove('reveal-enter'),{once:true})};
 const reveals='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){animate(entry.target);reveals.unobserve(entry.target)}}),{threshold:.08}):null;
 function paint(){frame=0;if(!scene||!desktop()||!near||document.hidden||document.body.classList.contains('modal-open'))return;const progress=sceneProgress(scene.getBoundingClientRect().top,innerHeight);scene.style.transform=`scale(${.94+.06*progress})`}
 function request(){if(!frame&&!disposed)frame=requestAnimationFrame(paint)}
 function watch(enabled){if(enabled===listening)return;listening=enabled;if(enabled)window.addEventListener('scroll',request,{passive:true});else{window.removeEventListener('scroll',request);cancelAnimationFrame(frame);frame=0}}
 function configure(){document.documentElement.toggleAttribute('data-motion-static',!allowed());watch(near&&desktop()&&!document.hidden&&!document.body.classList.contains('modal-open'));if(!desktop()&&scene)scene.style.removeProperty('transform');if(!allowed()){root.querySelectorAll('.reveal-enter').forEach(e=>e.classList.remove('reveal-enter'));}if(listening)request()}
 const sceneObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{near=entries[0]?.isIntersecting||false;configure()},{rootMargin:'200px 0px'}):null;
 function discover(){root.querySelectorAll('[data-reveal]').forEach(element=>{if(observed.has(element))return;observed.add(element);if(reveals)reveals.observe(element)});const next=root.querySelector('[data-signature-visual]');if(next&&next!==scene){scene=next;sceneObserver?.observe(scene);if(mobile.matches&&reveals)reveals.observe(scene)}}
 const changes=new MutationObserver(()=>{discover();configure()});changes.observe(root===document?document.documentElement:root,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
 reduced.addEventListener('change',configure);mobile.addEventListener('change',configure);connection?.addEventListener('change',configure);window.addEventListener('resize',configure,{passive:true});document.addEventListener('visibilitychange',configure);discover();
 function cleanup(){disposed=true;watch(false);changes.disconnect();reveals?.disconnect();sceneObserver?.disconnect();reduced.removeEventListener('change',configure);mobile.removeEventListener('change',configure);connection?.removeEventListener('change',configure);window.removeEventListener('resize',configure);document.removeEventListener('visibilitychange',configure);root.querySelectorAll('.reveal-enter').forEach(e=>e.classList.remove('reveal-enter'));scene?.style.removeProperty('transform');activeRoots.delete(root)}
 activeRoots.set(root,cleanup);return cleanup;
}
