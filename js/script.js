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
  if(file.startsWith('assets/')){
    image.srcset='';image.src=new URL('../'+file,import.meta.url).href;
    image.width=1895;image.height=867;image.decoding='async';return;
  }
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
      const config=await data;
      const groups=config.projectGroups;
      if(!groups?.length)throw new Error('No project groups');
      let current=0;
      const layout=node('div','showcase');
      const deck=node('div','deck');deck.setAttribute('role','group');deck.setAttribute('aria-label','Featured project previews');
      const stories=node('div','project-copy');
      const choices=node('div','thumbnails');choices.setAttribute('role','group');choices.setAttribute('aria-label','Choose a project family');
      const slides=[],panels=[],buttons=[];
      const covers={cpc:'screen-Pic1',checkpoint:'assets/checkpoint-arrivals.png',cinemabuddy:'assets/cinemabuddy-overview.png'};
      groups.forEach((group,index)=>{
        const projects=group.projectIds.map(id=>config.projects.find(p=>p.id===id)).filter(Boolean);
        if(!projects.length)throw new Error('Missing project');
        const slide=node('button','deck-slide project-showcase');slide.type='button';slide.dataset.family=group.id;
        const chrome=node('span','window-bar');const dots=node('span','dots');dots.setAttribute('aria-hidden','true');for(let i=0;i<3;i++)dots.append(node('i'));
        chrome.append(dots,node('span','window-label',group.title));
        const image=node('img');fillImage(image,covers[group.id]||projects[0].image,'(max-width:767px) 76vw, (max-width:1100px) 43vw, 46vw');image.alt=group.title+' interface preview';image.loading='lazy';
        slide.append(chrome,image);slide.addEventListener('click',()=>{if(current!==index)select(index);else openProject(projects[0].id,slide).catch(()=>{})});
        deck.append(slide);slides.push(slide);
        const story=node('article','project-story');story.dataset.family=group.id;story.hidden=index!==0;
        story.append(node('h3','',group.title),node('p','summary',group.description),node('p','role',group.focus));
        if(group.privacyNote)story.append(node('p','project-privacy-note',group.privacyNote));
        const tags=node('div','tags');projects[0].tags.slice(0,5).forEach(tag=>tags.append(node('span','',tag)));story.append(tags);
        const launches=node('div','project-launches');
        projects.filter(project=>project.id!=='dashboard').forEach(project=>{const label='Explore project';const launch=node('button','project-launch',label+' ↗');launch.type='button';launch.dataset.project=project.id;launch.setAttribute('aria-label',label+': '+project.title);launches.append(launch)});
        if(projects[0].liveUrl){const live=node('a','project-launch','Live site ↗');live.href=projects[0].liveUrl;live.target='_blank';live.rel='noopener noreferrer';live.setAttribute('aria-label','Live site: '+group.title);launches.append(live);}
        story.append(launches);stories.append(story);panels.push(story);
        const choice=node('button','thumbnail family-choice');choice.type='button';choice.dataset.familySelect=group.id;choice.setAttribute('aria-label','Show '+group.title);
        const thumb=node('img');fillImage(thumb,covers[group.id]||projects[0].image,'100px');thumb.alt='';thumb.loading='lazy';choice.append(thumb,node('span','',group.id==='cpc'?'CPC System':group.id==='checkpoint'?'Checkpoint':'CinemaBuddy'));
        choice.addEventListener('click',()=>select(index));choices.append(choice);buttons.push(choice);
      });
      const controls=node('div','deck-controls');const previous=node('button','','←'),next=node('button','','→'),count=node('span','deck-count');previous.type=next.type='button';previous.setAttribute('aria-label','Previous project');next.setAttribute('aria-label','Next project');count.setAttribute('aria-live','polite');controls.append(previous,count,next);deck.append(controls);
      function select(index){
        current=(index+groups.length)%groups.length;
        slides.forEach((slide,i)=>{const relative=(i-current+groups.length)%groups.length;slide.dataset.position=relative===0?'active':relative===1?'right':'left';slide.setAttribute('aria-label',groups[i].title+(i===current?'. Open project details':'. Show project preview'))});
        panels.forEach((panel,i)=>panel.hidden=i!==current);buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===current)));count.textContent=`${current+1} / ${groups.length}`;
      }
      previous.addEventListener('click',()=>select(current-1));next.addEventListener('click',()=>select(current+1));
      choices.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();select(event.key==='Home'?0:event.key==='End'?groups.length-1:current+(event.key==='ArrowRight'?1:-1));buttons[current].focus()});
      layout.append(deck,stories);this.replaceChildren(layout,choices);select(0);
    } catch {this.replaceChildren(node('p','component-error','Project previews could not load. Please refresh to try again.'))}
  }
}

class PortfolioContactForm extends HTMLElement {
  async connectedCallback() {
    try {
      const {contact} = await data;
      const canSend=Boolean(contact.endpoint&&(contact.provider!=='web3forms'||contact.accessKey));
      const form = node('form','contact-form');
      form.setAttribute('aria-label','Contact Brad');
      const fields = node('div','form-fields');
      contact.fields.forEach(field => fields.append(createField(field)));
      const note = node('p','form-note',canSend ? 'Your name, email and message go to Web3Forms for delivery.' : 'Opens a draft in your email app.');
      note.id = 'contact-note';
      form.setAttribute('aria-describedby','contact-note');
      const status = node('p','form-status');
      status.id = 'contact-status';
      status.setAttribute('role','status');
      status.setAttribute('aria-live','polite');
      const botcheck=node('input');botcheck.type='checkbox';botcheck.name='botcheck';botcheck.hidden=true;botcheck.tabIndex=-1;botcheck.setAttribute('aria-hidden','true');
      const submit = node('button','primary ui-button');
      submit.type = 'submit';
      function resetSubmit(){setButtonStatus(submit,'idle');if(!canSend)submit.textContent='Open email draft';}
      resetSubmit();
      const actions = node('div','form-actions');
      actions.append(submit,note);
      form.append(fields,botcheck,actions,status);
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
        if(botcheck.checked){status.textContent='Your message could not be submitted. Please try again.';return;}
        if (!canSend) {
          const subject='Portfolio collaboration inquiry';
          const body=`Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`;
          location.href=`mailto:${contact.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          status.textContent = 'Your email draft has been opened. Send it from your email app. Your text is kept here.';
          return;
        }
        if(contact.provider==='web3forms')Object.assign(payload,{access_key:contact.accessKey,subject:'New portfolio collaboration inquiry',from_name:'Brad Nebreja Portfolio',botcheck:false});
        setButtonStatus(submit,'pending');
        fields.querySelectorAll('input, textarea').forEach(input => { input.disabled = true; });
        status.textContent = '';
        try {
          const response = await fetch(contact.endpoint, {
            method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
            body:JSON.stringify(payload), signal:AbortSignal.timeout(15000)
          });
          if (!response.ok) throw new Error('Submission rejected');
          const result=await response.json();
          if(result.success!==true)throw new Error('Provider did not accept submission');
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
          resetSubmit();
          status.textContent = '';
        }
      });
      this.replaceChildren(form);
      revealOnce(this);
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
  disconnectedCallback(){this.cleanup?.();}
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
        link.href = new URL('../'+(certificate.displayImage||certificate.image),import.meta.url).href;
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
        choice.setAttribute('aria-label',String(index+1)+' Show '+certificate.title);
        choice.dataset.number=String(index+1);
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
      select(0);
      revealOnce(this);
    } catch {
      this.replaceChildren(node('p','component-error','Certificates could not load. Please refresh to try again.'));
    }
  }
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const syncMotionPreference=()=>document.documentElement.toggleAttribute('data-motion-static',reducedMotion.matches||Boolean(navigator.connection?.saveData));
syncMotionPreference();
reducedMotion.addEventListener('change',syncMotionPreference);
navigator.connection?.addEventListener('change',syncMotionPreference);
function revealOnce(element) { element.dataset.reveal=''; }
// Motion is optional: a failed module cannot disable the site's controls.
import('./motion.js').then(({initMotion})=>initMotion(document)).catch(()=>{document.documentElement.dataset.wordMotion='unavailable';});
customElements.define('portfolio-projects',PortfolioProjects);
customElements.define('portfolio-contact-form',PortfolioContactForm);
customElements.define('portfolio-stack',PortfolioStack);
customElements.define('portfolio-certificates',PortfolioCertificates);

const dialog = document.getElementById('projectDialog');
const imageDialog=document.getElementById('imageDialog');
const layers=[];
function beginLayer(modal,trigger){
 if(layers.some(layer=>layer.modal===modal))return;
 if(!layers.length){document.body.style.setProperty('--locked-top',`-${scrollY}px`);document.body.dataset.lockY=String(scrollY);document.body.classList.add('modal-open')}
 layers.push({modal,trigger});
}
function endLayer(modal){
 const index=layers.findIndex(layer=>layer.modal===modal);if(index<0)return;
 const [layer]=layers.splice(index,1);
 if(!layers.length){const y=Number(document.body.dataset.lockY||0);document.body.classList.remove('modal-open');document.body.style.removeProperty('--locked-top');window.scrollTo({top:y,behavior:'instant'})}
 if(layer.trigger?.isConnected)layer.trigger.focus({preventScroll:true});
}
dialog.addEventListener('close',()=>endLayer(dialog));
imageDialog.addEventListener('close',()=>endLayer(imageDialog));
const fullImage=document.getElementById('fullImage');
const imageStatus=document.getElementById('imageStatus');
const imageFilmstrip=node('div','image-filmstrip');
imageFilmstrip.setAttribute('aria-label','Choose a full-size project screen');
imageFilmstrip.hidden=true;imageDialog.append(imageFilmstrip);
imageFilmstrip.addEventListener('keydown',event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();
  const index=event.key==='Home'?0:event.key==='End'?gallery.length-1:Math.max(0,Math.min(galleryIndex+(event.key==='ArrowRight'?1:-1),gallery.length-1));
  imageFilmstrip.children[index]?.click();imageFilmstrip.children[index]?.focus();
});
function loadFullImage(source,title){
  document.getElementById('imageTitle').textContent=title;
  fullImage.alt=title;
  fullImage.hidden=true;
  imageStatus.textContent='Loading full-size image…';
  fullImage.onload=()=>{fullImage.hidden=false;imageStatus.textContent='';};
  fullImage.onerror=()=>{imageStatus.textContent='This image could not load. Close the viewer and try again.';};
  fullImage.src=source;
}
function openImage(source,title,projectGallery=false){
  imageFilmstrip.hidden=!projectGallery;
  imageFilmstrip.replaceChildren();
  if(projectGallery)gallery.forEach((screen,index)=>{
    const button=node('button','gallery-thumbnail');button.type='button';
    button.setAttribute('aria-label',`${String(index+1)} Show ${screen.label}`);
    button.setAttribute('aria-pressed',String(index===galleryIndex));
    const image=node('img');fillImage(image,screen.image,'100px');image.alt='';image.loading='lazy';
    button.append(image,node('span','',String(index+1)));
    button.addEventListener('click',()=>{
      showGalleryImage(index);
      loadFullImage(new URL('../'+screen.original,import.meta.url).href,document.getElementById('detailTitle').textContent+' / '+document.getElementById('galleryCount').textContent);
      [...imageFilmstrip.children].forEach((choice,i)=>choice.setAttribute('aria-pressed',String(i===index)));
    });
    imageFilmstrip.append(button);
  });
  loadFullImage(source,title);
  beginLayer(imageDialog,document.activeElement);
  imageDialog.showModal();
  document.getElementById('closeImage').focus({preventScroll:true});imageDialog.scrollTop=0;
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
  openImage(link.href||document.getElementById('galleryOriginal').href,certificate?link.querySelector('h3').textContent:document.getElementById('detailTitle').textContent+' / '+document.getElementById('galleryCount').textContent,!certificate);
});
let gallery = [];
let galleryIndex = 0;
function showGalleryImage(index) {
  galleryIndex = Math.max(0,Math.min(index,gallery.length-1));
  const item=gallery[galleryIndex];
  if(!item)return;
  const image=document.getElementById('detailImage');
  fillImage(image,item.image,'(max-width:600px) 90vw, 820px');
  image.alt=item.label;
  const status=document.getElementById('galleryStatus');
  image.onload=()=>{status.textContent=''};
  image.onerror=()=>{status.textContent='This preview could not load. Try another image or open the full-size view.'};
  status.textContent=image.complete&&image.naturalWidth?'':'Loading preview…';
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
async function openProject(projectId, button) {
  const config = await data;
  const project = config.projects.find(item => item.id === projectId);
  if (!project || dialog.open) return;
  let liveLink=document.getElementById('detailLiveSite');
  if(!liveLink){liveLink=node('a','text-link');liveLink.id='detailLiveSite';liveLink.target='_blank';liveLink.rel='noopener noreferrer';document.getElementById('detailTitle').after(liveLink);}
  liveLink.hidden=!project.liveUrl;liveLink.textContent='Live site ↗';if(project.liveUrl)liveLink.href=project.liveUrl;else liveLink.removeAttribute('href');
  let privacy=document.getElementById('detailPrivacyNote');
  if(!privacy){privacy=node('p','project-privacy-note');privacy.id='detailPrivacyNote';liveLink.after(privacy);}
  privacy.hidden=!project.privacyNote;privacy.textContent=project.privacyNote||'';
  const caseCopy=document.getElementById('caseStudy');
  caseCopy.replaceChildren();
  Object.entries(project.caseStudy||{}).forEach(([key,value])=>{if(!value)return;const section=node('section');section.append(node('h3','',({status:'Project type',problem:'The brief',contribution:'My contribution',approach:'Approach',result:'Result'})[key]||key),node('p','',value));caseCopy.append(section)});
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
    button.setAttribute('aria-label',`${String(index+1)} Show ${screen.label}`);
    button.setAttribute('aria-pressed',String(index===0));
    const miniature=node('img');fillImage(miniature,screen.image,'100px');miniature.alt='';miniature.loading='lazy';
    button.append(miniature,node('span','',String(index+1)));
    button.addEventListener('click',()=>showGalleryImage(index));return button;
  }));
  document.getElementById('detailGallery').hidden=gallery.length===0;
  document.querySelector('.gallery-controls').hidden=gallery.length<2;filmstrip.hidden=gallery.length<2;
  if(gallery.length)showGalleryImage(0);
  beginLayer(dialog,button);
  dialog.showModal();
  document.getElementById('closeDialog').focus({preventScroll:true});
  dialog.scrollTop = 0;
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-project]');if(button)openProject(button.dataset.project,button).catch(()=>{})});
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{
  if(dialog.open)return;
});
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
});
document.body.classList.remove('light');
try{localStorage.removeItem('brad-theme')}catch{}
const heroFoot=document.querySelector('.hero-bottom');
if(heroFoot&&!heroFoot.querySelector('.hero-socials')){
 const social=document.querySelector('.social-rail').cloneNode(true);
 social.className='hero-socials';social.setAttribute('aria-label','Professional profiles');heroFoot.append(social);
}
const navigation=document.getElementById('sectionNav');
if('ResizeObserver' in window)new ResizeObserver(()=>document.documentElement.style.setProperty('--nav-height',navigation.getBoundingClientRect().height+'px')).observe(navigation);
if('IntersectionObserver' in window){
 const sectionObserver=new IntersectionObserver(entries=>{
  for(const entry of entries){if(!entry.isIntersecting)continue;const id=entry.target.id;
   const destination=['about','experience','stack'].includes(id)?'about':['certifications','education'].includes(id)?'certifications':id;
   navigation.querySelectorAll('a').forEach(link=>{if(link.hash==='#'+destination)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
  }
 },{rootMargin:'-15% 0px -65% 0px'});
 document.querySelectorAll('main>section[id]').forEach(section=>sectionObserver.observe(section));
}
document.querySelectorAll('.education-entry,.supporting-skills').forEach(revealOnce);

const mobileMenu=document.getElementById('mobileMenu');
const menuToggle=document.getElementById('menuToggle');
const menuSocials=document.querySelector('.social-rail').cloneNode(true);
menuSocials.className='menu-profile-links';
menuSocials.querySelectorAll('a').forEach(link=>{
 const label=link.getAttribute('aria-label').replace('Brad on ','').replace('Email Brad','Email');
 if(link.classList.contains('linkedin')&&!link.querySelector('svg')){link.textContent='';const icon=node('span','social-linkedin-mark','in');icon.setAttribute('aria-hidden','true');link.append(icon)}
 link.append(node('span','social-label',label));
});
document.querySelector('.menu-socials').append(menuSocials);
menuToggle.addEventListener('click',()=>{beginLayer(mobileMenu,menuToggle);mobileMenu.showModal();menuToggle.setAttribute('aria-expanded','true')});
document.getElementById('closeMenu').addEventListener('click',()=>mobileMenu.close());
let menuDestination=null;
mobileMenu.addEventListener('close',()=>{endLayer(mobileMenu);menuToggle.setAttribute('aria-expanded','false');if(menuDestination){menuDestination.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});menuDestination=null}});
mobileMenu.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
 event.preventDefault();menuDestination=document.querySelector(link.getAttribute('href'));mobileMenu.close();
}));
mobileMenu.addEventListener('click',event=>{if(event.target===mobileMenu){const rect=mobileMenu.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)mobileMenu.close()}});
matchMedia('(min-width:768px)').addEventListener('change',event=>{if(event.matches&&mobileMenu.open)mobileMenu.close()});
