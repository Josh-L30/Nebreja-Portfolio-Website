/**
 * Reusable native components for the portfolio prototype.
 * Status-button interaction adapted from Animata's MIT-licensed Status Button
 * by hari: https://animata.design/docs/button/status-button
 * Ported to native buttons without React, Motion, demo timers or decorative icons.
 * Case-study hover-depth pattern adapted from Animata Case Study Card by
 * Adriana Fruchter: https://animata.design/docs/card/case-study-card
 * Simplified to one face, no book tab or hidden layers.
 */
const data = fetch(new URL('../data/content.json', import.meta.url)).then(response => {
  if (!response.ok) throw new Error('Content unavailable');
  return response.json();
});
const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};
const imageURL = (file, width) => new URL(`../assets/${file}-${width}.webp`, import.meta.url).href;
function fillImage(image, file, sizes) {
  image.srcset = [480,960,1440].map(width => `${imageURL(file,width)} ${width}w`).join(', ');
  image.sizes = sizes;
  image.src = imageURL(file,960);
  image.width = 1440;
  image.height = 720;
  image.decoding = 'async';
}

export function setButtonStatus(button, state) {
  const labels = {idle:'Send message',pending:'Sending',success:'Message submitted',error:'Try again'};
  button.dataset.state = state;
  button.disabled = state === 'pending';
  button.setAttribute('aria-busy', String(state === 'pending'));
  button.textContent = labels[state];
}

export function createField(field) {
  const wrapper = node('div','ui-field');
  const label = node('label','ui-label',field.label);
  const input = node(field.type === 'textarea' ? 'textarea' : 'input','ui-input');
  input.id = `contact-${field.name}`;
  input.name = field.name;
  input.required = true;
  input.maxLength = field.maxLength;
  if (field.type !== 'textarea') input.type = field.type;
  if (field.autocomplete) input.autocomplete = field.autocomplete;
  if (field.type === 'textarea') input.rows = 5;
  label.htmlFor = input.id;
  wrapper.append(label,input);
  return wrapper;
}

class PortfolioProjects extends HTMLElement {
  async connectedCallback() {
    try {
      const config = await data;
      const list = node('div','work-list');
      const picker=node('div','project-picker');
      picker.setAttribute('aria-label','Choose a project');
      const covers=config.projects.map(project=>project.id==='dashboard'?project.gallery[2].image:project.id==='cinemabuddyux'?'screen-fig3':project.image);
      config.projects.forEach((project,index) => {
        const button = node('button','work-item');
        button.hidden=index!==0;
        button.type = 'button';
        button.dataset.project = project.id;
        const text = node('div','work-copy');
        text.append(node('span','work-category',index===0?'Featured project':project.categories.join(' · ')));
        text.append(node('h3','',project.title),node('p','',project.summary),node('p','role',project.role));
        const tags=node('div','work-tags');
        project.tags.forEach(tag=>tags.append(node('span','',tag)));
        text.append(tags);
        const action=node('div','work-footer');
        action.append(node('span','project-action',project.video?'Watch walkthrough':'Explore project'),node('span','work-count',project.video?'Video walkthrough':`${project.gallery.length} screens`));
        text.append(action);
        const visual = node('div','work-visual');
        const display = node('div','work-display');
        const chrome = node('div','work-chrome');
        chrome.append(node('span','',index===0?'CPC / Centralized platform':project.title),node('span','',project.video?'Walkthrough':'Interface preview'));
        const thumb = node('div','thumb');
        const image = node('img');
        const cover=project.id==='dashboard'?project.gallery[2].image:project.id==='cinemabuddyux'?'screen-fig3':project.image;
        fillImage(image, cover, '(max-width:600px) calc(100vw - 108px), (max-width:1100px) 480px, 510px');
        image.alt = `${project.title} interface preview`;
        image.loading = 'lazy';
        thumb.append(image);
        display.append(chrome,thumb);
        visual.append(display);
        [-1,1].forEach(direction=>{
          const ghost=node('img','deck-wing '+(direction<0?'deck-left':'deck-right'));
          fillImage(ghost,covers[(index+direction+config.projects.length)%config.projects.length],'220px');
          ghost.alt='';ghost.loading='lazy';ghost.setAttribute('aria-hidden','true');visual.prepend(ghost);
        });
        button.append(visual,text);
        list.append(button);
        const choice=node('button','project-choice');choice.type='button';
        choice.setAttribute('aria-label',String(index+1).padStart(2,'0')+' Show '+project.title);
        choice.setAttribute('aria-pressed',String(index===0));
        const mini=node('img');fillImage(mini,cover,'100px');mini.alt='';mini.loading='lazy';
        choice.append(mini,node('span','',String(index+1).padStart(2,'0')));
        choice.addEventListener('click',()=>select(index));picker.append(choice);
      });
      let current=0;
      const controls=node('div','project-controls');
      const previous=node('button','','Previous');const next=node('button','','Next');
      previous.type=next.type='button';
      const count=node('span','','1 / '+config.projects.length);count.setAttribute('aria-live','polite');
      controls.append(previous,count,next);
      function select(index){
        current=(index+config.projects.length)%config.projects.length;
        [...list.children].forEach((slide,i)=>slide.hidden=i!==current);
        [...picker.children].forEach((choice,i)=>choice.setAttribute('aria-pressed',String(i===current)));
        count.textContent=`${current+1} / ${config.projects.length}`;
      }
      previous.addEventListener('click',()=>select(current-1));next.addEventListener('click',()=>select(current+1));
      picker.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
        event.preventDefault();select(event.key==='Home'?0:event.key==='End'?config.projects.length-1:current+(event.key==='ArrowRight'?1:-1));picker.children[current].focus();
      });
      this.replaceChildren(list,controls,picker);
      revealOnce(this);
    } catch {
      this.replaceChildren(node('p','component-error','Project previews could not load. Please refresh to try again.'));
    }
  }
}

class PortfolioContactForm extends HTMLElement {
  async connectedCallback() {
    try {
      const {contact} = await data;
      const form = node('form','contact-form');
      form.setAttribute('aria-label','Contact Brad');
      const fields = node('div','form-fields');
      contact.fields.forEach(field => fields.append(createField(field)));
      const note = node('p','form-note',contact.endpoint ? 'All fields are required.' : 'Preview only. Messages are not sent yet.');
      note.id = 'contact-note';
      form.setAttribute('aria-describedby','contact-note');
      const status = node('p','form-status');
      status.id = 'contact-status';
      status.setAttribute('role','status');
      status.setAttribute('aria-live','polite');
      const submit = node('button','primary ui-button');
      submit.type = 'submit';
      setButtonStatus(submit,'idle');
      const actions = node('div','form-actions');
      actions.append(submit,note);
      form.append(fields,actions,status);
      form.addEventListener('submit', async event => {
        event.preventDefault();
        if (submit.disabled) return;
        if (!form.reportValidity()) return;
        const payload = Object.fromEntries(new FormData(form));
        for (const field of contact.fields) {
          if (!String(payload[field.name] || '').trim()) {
            form.elements.namedItem(field.name).focus();
            status.textContent = 'Please complete every field.';
            return;
          }
        }
        if (!contact.endpoint) {
          status.textContent = 'Sending is not available in this preview. Your message has been kept here.';
          return;
        }
        setButtonStatus(submit,'pending');
        fields.querySelectorAll('input, textarea').forEach(input => { input.disabled = true; });
        status.textContent = '';
        try {
          const response = await fetch(contact.endpoint, {
            method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
            body:JSON.stringify(payload), signal:AbortSignal.timeout(15000)
          });
          if (!response.ok) throw new Error('Submission rejected');
          setButtonStatus(submit,'success');
          status.textContent = 'Your message was submitted. Thank you for getting in touch.';
          form.reset();
        } catch {
          setButtonStatus(submit,'error');
          status.textContent = 'Your message could not be sent. Please try again. Your text is still here.';
        } finally {
          fields.querySelectorAll('input, textarea').forEach(input => { input.disabled = false; });
        }
      });
      form.addEventListener('input', () => {
        if (!submit.disabled) {
          setButtonStatus(submit,'idle');
          status.textContent = '';
        }
      });
      this.replaceChildren(form);
      revealOnce(this);
      revealOnce(form);
    } catch {
      this.replaceChildren(node('p','component-error','The contact form could not load. Please refresh to try again.'));
    }
  }
}
class PortfolioStack extends HTMLElement {
  async connectedCallback() {
    try {
      const {stack,stackGroups} = await data;
      const groups=node('div','stack-groups');
      stackGroups.forEach(group=>{
        const section=node('div','tech-group');
        const list=node('ul','tech-list');
        list.setAttribute('aria-label',group.title);
        section.append(node('h3','tech-group-title',group.title),list);
        group.tools.forEach(name=>{
        const item=stack.find(tool=>tool.name===name);
        if(!item)return;
        const chip = node('li','tech-chip');
        const logo = node('img','tech-logo');
        logo.src = new URL('../'+item.logo,import.meta.url).href;
        logo.alt = '';
        logo.width = 22;
        logo.height = 22;
        logo.loading = 'lazy';
        logo.decoding = 'async';
        chip.append(logo,node('span','',item.name));
        list.append(chip);
        });
        groups.append(section);
      });
      this.replaceChildren(groups);
      groups.querySelectorAll('.tech-group').forEach(revealOnce);
    } catch {
      this.replaceChildren(node('p','component-error','The technology list could not load. Please refresh to try again.'));
    }
  }
}

class PortfolioCertificates extends HTMLElement {
  async connectedCallback() {
    try {
      const {certificates} = await data;
      const list = node('div','certificate-list');
      const choices=node('div','certificate-choices');
      choices.setAttribute('aria-label','Choose a certificate');
      let current=0;
      const controls=node('div','certificate-controls');
      const previous=node('button','','Previous');const next=node('button','','Next');
      previous.type=next.type='button';
      const count=node('span','','1 / '+certificates.length);count.setAttribute('aria-live','polite');
      controls.append(previous,count,next);
      function select(index){
        current=(index+certificates.length)%certificates.length;
        [...list.children].forEach((panel,i)=>panel.hidden=i!==current);
        [...choices.children].forEach((item,i)=>item.setAttribute('aria-pressed',String(i===current)));
        count.textContent=`${current+1} / ${certificates.length}`;
      }
      previous.addEventListener('click',()=>select(current-1));next.addEventListener('click',()=>select(current+1));
      choices.addEventListener('keydown',event=>{
        if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
        event.preventDefault();select(event.key==='Home'?0:event.key==='End'?certificates.length-1:current+(event.key==='ArrowRight'?1:-1));choices.children[current].focus();
      });
      certificates.forEach((certificate,index)=>{
        const link = node('a','certificate-item');
        link.hidden=index!==0;
        link.href = new URL('../'+certificate.image,import.meta.url).href;
        link.setAttribute('aria-label',`View certificate: ${certificate.title}`);
        const image = node('img','certificate-thumb');
        image.src = new URL('../'+certificate.preview,import.meta.url).href;
        image.srcset=`${new URL('../'+certificate.medium,import.meta.url).href} 480w, ${image.src} 960w`;
        image.sizes='(max-width:600px) calc(100vw - 80px), 520px';
        image.alt = '';
        image.width = certificate.width;
        image.height = certificate.height;
        image.loading = 'lazy';
        image.decoding = 'async';
        const text = node('div','certificate-copy');
        text.append(node('h3','',certificate.title),node('p','',certificate.issuer+' · '+certificate.year));
        link.append(image,text,node('span','certificate-action','View certificate'));
        list.append(link);
        const choice=node('button','certificate-choice');choice.type='button';
        choice.setAttribute('aria-label',String(index+1).padStart(2,'0')+' Show '+certificate.title);
        choice.dataset.number=String(index+1).padStart(2,'0');
        choice.setAttribute('aria-pressed',String(index===0));
        const miniature=node('img','credential-miniature');
        miniature.src=new URL('../'+certificate.miniature,import.meta.url).href;
        miniature.alt='';miniature.width=72;miniature.height=54;miniature.loading='lazy';
        choice.append(miniature,node('span','',certificate.title),node('small','',certificate.issuer+' · '+certificate.year));
        choice.addEventListener('click',()=>select(index));
        choices.append(choice);
      });
      const showcase=node('div','credential-showcase');showcase.append(list,controls,choices);
      this.replaceChildren(showcase);
      revealOnce(this);
    } catch {
      this.replaceChildren(node('p','component-error','Certificates could not load. Please refresh to try again.'));
    }
  }
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const arrivalObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    arrivalObserver.unobserve(entry.target);
    if (!reducedMotion.matches && !navigator.connection?.saveData) {
      entry.target.classList.add('arrive');
      entry.target.addEventListener('animationend',()=>entry.target.classList.remove('arrive'),{once:true});
    }
  });
}, {threshold:.12});
function revealOnce(element) { arrivalObserver.observe(element); }
reducedMotion.addEventListener('change',()=>{
  if(reducedMotion.matches){
    document.getAnimations().forEach(animation=>animation.cancel());
    document.querySelectorAll('.arrive').forEach(element=>element.classList.remove('arrive'));
  }
});
customElements.define('portfolio-projects',PortfolioProjects);
customElements.define('portfolio-contact-form',PortfolioContactForm);
customElements.define('portfolio-stack',PortfolioStack);
customElements.define('portfolio-certificates',PortfolioCertificates);

const dialog = document.getElementById('projectDialog');
const imageDialog=document.getElementById('imageDialog');
const fullImage=document.getElementById('fullImage');
const imageStatus=document.getElementById('imageStatus');
function openImage(source,title){
  document.getElementById('imageTitle').textContent=title;
  fullImage.alt=title;
  fullImage.hidden=true;
  imageStatus.textContent='Loading full-size image…';
  fullImage.onload=()=>{fullImage.hidden=false;imageStatus.textContent='';};
  fullImage.onerror=()=>{imageStatus.textContent='This image could not load. Close the viewer and try again.';};
  fullImage.src=source;
  imageDialog.showModal();
}
document.getElementById('closeImage').addEventListener('click',()=>imageDialog.close());
imageDialog.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  event.preventDefault();event.stopPropagation();imageDialog.close();
});
imageDialog.addEventListener('cancel',event=>{
  event.preventDefault();
  event.stopPropagation();
  imageDialog.close();
});
imageDialog.addEventListener('click',event=>{
  if(event.target!==imageDialog)return;
  const rect=imageDialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)imageDialog.close();
});
document.addEventListener('click',event=>{
  const link=event.target.closest('.certificate-item,#galleryOriginal,#enlargePreview');
  if(!link)return;
  event.preventDefault();
  const certificate=link.matches('.certificate-item');
  openImage(link.href||document.getElementById('galleryOriginal').href,certificate?link.querySelector('h3').textContent:document.getElementById('detailTitle').textContent+' / '+document.getElementById('galleryCount').textContent);
});
const detailVideo = document.getElementById('detailVideo');
let gallery = [];
let galleryIndex = 0;
function showGalleryImage(index) {
  galleryIndex = Math.max(0,Math.min(index,gallery.length-1));
  const item=gallery[galleryIndex];
  if(!item)return;
  const image=document.getElementById('detailImage');
  fillImage(image,item.image,'(max-width:600px) 90vw, 820px');
  image.alt=item.label;
  document.getElementById('galleryCount').textContent=`${galleryIndex+1} of ${gallery.length}`;
  document.getElementById('galleryPrevious').disabled=galleryIndex===0;
  document.getElementById('galleryNext').disabled=galleryIndex===gallery.length-1;
  document.getElementById('galleryOriginal').href=new URL('../'+item.original,import.meta.url).href;
  document.querySelectorAll('.gallery-thumbnail').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===galleryIndex)));
}
const filmstrip=node('div','gallery-filmstrip');
filmstrip.setAttribute('aria-label','Choose a project screen');
document.getElementById('detailGallery').append(filmstrip);
filmstrip.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  showGalleryImage(event.key==='Home'?0:event.key==='End'?gallery.length-1:galleryIndex+(event.key==='ArrowRight'?1:-1));
  filmstrip.children[galleryIndex].focus();
});
document.getElementById('galleryPrevious').addEventListener('click',()=>showGalleryImage(galleryIndex-1));
document.getElementById('galleryNext').addEventListener('click',()=>showGalleryImage(galleryIndex+1));
document.addEventListener('click', async event => {
  const button = event.target.closest('[data-project]');
  if (!button) return;
  const config = await data;
  const project = config.projects.find(item => item.id === button.dataset.project);
  if (!project || dialog.open) return;
  document.getElementById('detailTitle').textContent = project.title;
  document.getElementById('detailRole').textContent = project.role;
  document.getElementById('detailHeadline').textContent=project.headline!==project.title?project.headline:'';
  document.getElementById('detailCategories').textContent=project.categories.join(' · ');
  document.getElementById('detailTags').textContent=project.tags.join(' · ');
  document.getElementById('detailCopy').textContent = project.description;
  const bullets=document.getElementById('detailBullets');
  bullets.replaceChildren(...project.bullets.map(bullet=>node('li','',bullet)));
  gallery=project.gallery;
  filmstrip.replaceChildren(...gallery.map((screen,index)=>{
    const button=node('button','gallery-thumbnail');button.type='button';
    button.setAttribute('aria-label',`${String(index+1).padStart(2,'0')} Show ${screen.label}`);
    button.setAttribute('aria-pressed',String(index===0));
    const miniature=node('img');fillImage(miniature,screen.image,'100px');miniature.alt='';miniature.loading='lazy';
    button.append(miniature,node('span','',String(index+1).padStart(2,'0')));
    button.addEventListener('click',()=>showGalleryImage(index));return button;
  }));
  document.getElementById('detailGallery').hidden=gallery.length===0;
  if(gallery.length)showGalleryImage(0);
  detailVideo.hidden=!project.video;
  if(project.video){detailVideo.poster=imageURL('screen-fig1',960);detailVideo.src=new URL('../'+project.video,import.meta.url).href;}
  dialog.showModal();
  dialog.scrollTop = 0;
});
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{
  if(dialog.open)return;
  detailVideo.pause();detailVideo.removeAttribute('src');detailVideo.load();
});
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
});
document.getElementById('theme').addEventListener('click',event=>{
  const light=document.body.classList.toggle('light');
  try{localStorage.setItem('brad-theme',light?'light':'dark');}catch{}
  event.currentTarget.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');
});
const sidebar=document.querySelector('.sidebar');
const mobileMenu=document.getElementById('mobileMenu');
mobileMenu.addEventListener('click',()=>{
  const open=sidebar.classList.toggle('nav-open');
  mobileMenu.setAttribute('aria-expanded',String(open));
});
sidebar.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{
  sidebar.classList.remove('nav-open');mobileMenu.setAttribute('aria-expanded','false');
}));
const sectionObserver=new IntersectionObserver(entries=>{
  const active=entries.find(entry=>entry.isIntersecting);
  if(!active)return;
  sidebar.querySelectorAll('nav a').forEach(link=>{
    if(link.hash==='#'+active.target.id)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
},{rootMargin:'-8% 0px -62% 0px'});
document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));

try{if(localStorage.getItem('brad-theme')==='dark'){document.body.classList.remove('light');document.getElementById('theme').setAttribute('aria-label','Switch to light theme');}}catch{}
document.querySelectorAll('.section-top,.experience-entry,.education-entry,.about>p,.contact-details,.supporting-skills').forEach(revealOnce);
