'use strict';
const channels = {
  outdoor: {status:'OUTDOOR MEDIA', title:'Own a little of the skyline.', description:'Find the right neighbourhood, the right format, and the right moment. Explore classic billboards and digital screens from media owners.', features:['Static billboards & large-format displays','Digital screens, sizes & time slots','Location-led discovery & media packages'], label:'THE CITY IS YOUR CANVAS.', art:'Go big. Get noticed.', cta:'Plan an outdoor campaign ↗'},
  transit: {status:'METRO & RAIL MEDIA', title:'Be part of the daily journey.', description:'Reach audiences on the move. Explore local trains, metro networks and stations with formats suited to the route and the ride.', features:['AC & non-AC trains, metro and stations','Interior panels, exterior wraps & screens','Routes, coach coverage & media-owner packages'], label:'NEXT STOP. YOUR BRAND.', art:'Make every journey count.', cta:'Explore transit advertising ↗'},
  digital: {status:'CONNECTED DIGITAL CHANNELS', title:'From a search to a scroll.', description:'Bring your creative and campaign planning together for Meta, Google and Microsoft. Connect eligible accounts where integrations are supported.', features:['Facebook & Instagram placements','Google Search, YouTube & Display','Microsoft Search & Audience Network'], label:'SHOW UP IN THEIR EVERYDAY.', art:'Turn a scroll into a story.', cta:'Discuss digital campaigns ↗'},
  tv: {status:'TELEVISION · PLANNED', title:'Think outside the small screen.', description:'Bring your story into the living room. We’re building relationships for television media planning, subject to broadcaster and agency availability.', features:['Regional & national channel planning','Audience, time-band & creative requirements','Media-owner coordination and availability checks'], label:'A BIGGER PICTURE.', art:'Made for prime time.', cta:'Register interest in TV ↗'},
  ott: {status:'OTT & STREAMING · PLANNED', title:'The next episode? Your brand.', description:'Explore the possibilities of streaming advertising across services such as ZEE5 and Hotstar. Access depends on publisher agreements and supported ad products.', features:['Streaming video & connected-TV formats','Publisher-specific creative and approval rules','Availability confirmed before campaign booking'], label:'WHERE STORIES FIND THEIR AUDIENCE.', art:'Be part of what’s next.', cta:'Register interest in streaming ↗'}
};
const tabs = [...document.querySelectorAll('[data-channel]')];
function selectChannel(tab) {
  const key = tab.dataset.channel, data = channels[key];
  tabs.forEach(item => { const selected = item === tab; item.setAttribute('aria-selected', String(selected)); item.tabIndex = selected ? 0 : -1; });
  document.querySelector('#channel-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('.channel-art').dataset.art = key;
  document.getElementById('channel-image').setAttribute('aria-hidden', String(key !== 'outdoor'));
  for (const [id,value] of Object.entries({'channel-status':data.status,'channel-title':data.title,'channel-description':data.description,'art-label':data.label,'art-title':data.art,'channel-cta':data.cta})) document.getElementById(id).textContent = value;
  document.getElementById('channel-features').replaceChildren(...data.features.map(text => { const item = document.createElement('li'); item.textContent = text; return item; }));
  document.getElementById('channel-cta').href = {outdoor:'billboards.html',transit:'metro.html',digital:'digital.html',tv:'television.html',ott:'streaming.html'}[key];
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => selectChannel(tab));
  tab.addEventListener('keydown', event => { let next; if(event.key==='ArrowRight') next=(index+1)%tabs.length; if(event.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length; if(event.key==='Home') next=0; if(event.key==='End') next=tabs.length-1; if(next!==undefined){event.preventDefault();selectChannel(tabs[next]);tabs[next].focus();} });
});
const toggle = document.querySelector('.menu-toggle'), navigation = document.getElementById('navigation');
function closeMenu(){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.getElementById('year').textContent = new Date().getFullYear();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const reveal = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveal.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(element=>reveal.observe(element));
  const captions=['Start with the places that matter.','One idea. Creative for every placement.','Keep your next steps in view.'];
  const story = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.story-step').forEach(step=>step.classList.toggle('is-active',step===entry.target));document.querySelector('.workspace-wrap').dataset.step=entry.target.dataset.step;document.getElementById('workspace-caption').textContent=captions[Number(entry.target.dataset.step)];}}),{rootMargin:'-20% 0px -35% 0px',threshold:0});
  document.querySelectorAll('.story-step').forEach(element=>story.observe(element));
}
const hero = document.querySelector('.hero'), cards=[...document.querySelectorAll('.media-card')];
let framePending=false;
function animateScroll(){framePending=false;if(reducedMotion.matches||document.documentElement.classList.contains('animations-paused')||innerWidth<761){cards.forEach(card=>card.style.removeProperty('transform'));return;}const progress=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/hero.offsetHeight));cards.forEach((card,index)=>{const angle=[-4,3,6][index]*(1-progress);const y=[-15,20,-10][index]*progress;card.style.transform=`translateY(${y}px) rotate(${angle}deg)`;});}
window.addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(animateScroll);}},{passive:true});
window.addEventListener('resize',animateScroll);
reducedMotion.addEventListener('change',animateScroll);
