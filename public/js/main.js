(async () => {
  const CONTENT_FILES = {
    site: '/content/site.json',
    team: '/content/team.json',
    events: '/content/events.json',
    placements: '/content/placements.json'
  };

  async function loadJson(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    return res.json();
  }

  let D;
  try {
    const [siteData, team, eventsData, placements] = await Promise.all([
      loadJson(CONTENT_FILES.site),
      loadJson(CONTENT_FILES.team),
      loadJson(CONTENT_FILES.events),
      loadJson(CONTENT_FILES.placements)
    ]);
    D = {
      ...siteData,
      team,
      placements,
      upcomingEvents: eventsData.upcomingEvents || [],
      events: eventsData.events || []
    };
  } catch (err) {
    console.error('MPC content load failed; using bundled fallback.', err);
    D = window.MPC_DATA;
  }

  if (!D) return;
  window.MPC_DATA = D;

  const path = location.pathname.split('/').pop() || 'index.html';
  const esc = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
  const attr = esc;
  const assetUrl = (value = '') => {
    const s = String(value || '').trim();
    if (!s) return '';
    if (/^(https?:)?\/\//i.test(s) || s.startsWith('/') || s.startsWith('data:')) return s;
    return `/${s.replace(/^\.\//, '')}`;
  };
  const eventImageUrl = (event = {}) => {
    const embedded = window.MPC_EMBEDDED_EVENT_IMAGES?.[event.guest];
    if (embedded) return embedded;
    return assetUrl(event.speakerImage || event.images?.[0]);
  };

  const header = document.querySelector('[data-site-header]');
  if (header) {
    const links = [
      ['index.html','Home'],['about.html','About'],['team.html','Team'],['placements.html','Placements'],['events.html','Events'],['applications.html','Applications']
    ];
    const navLinks = links.map(([href,label]) => `<a href="${href}" ${path===href || (path==='' && href==='index.html') ? 'aria-current="page"' : ''} ${label==='Applications'?'class="nav-cta"':''}>${label}</a>`).join('');
    header.innerHTML = `
      <div class="site-header">
        <div class="container header-inner">
          <a href="index.html" class="brand" aria-label="McGill Private Capital home">
            <img class="brand-logo" src="/assets/logos/mpc-logo.png" alt="McGill Private Capital logo">
            <span class="brand-name">McGill Private Capital</span>
          </a>
          <nav class="desktop-nav" aria-label="Primary navigation">${navLinks}</nav>
          <button class="mobile-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span><span></span></button>
        </div>
        <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">${navLinks}</nav>
      </div>`;
    const toggle = header.querySelector('.mobile-toggle');
    const mobile = header.querySelector('.mobile-nav');
    toggle?.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div><div class="footer-brand">McGill Private Capital</div><p class="footer-copy">A student-run finance organization at McGill University focused on investment banking, private equity and investing careers.</p></div>
          <div><div class="footer-heading">Explore</div><div class="footer-links"><a href="about.html">About</a><a href="team.html">Team</a><a href="placements.html">Placements</a><a href="events.html">Events</a></div></div>
          <div><div class="footer-heading">Connect</div><div class="footer-links"><a href="applications.html">Applications</a><a href="${attr(D.site.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>${D.site.instagram?`<a href="${attr(D.site.instagram)}" target="_blank" rel="noopener noreferrer">Instagram ↗</a>`:''}</div></div>
        </div>
        <div class="footer-bottom"><span>© <span data-year></span> McGill Private Capital</span><span>Student organization · Montreal, Quebec</span></div>
      </div>
    </footer>`;
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  function initials(name){ return String(name || '').split(/\s+/).filter(Boolean).map(x=>x[0]).slice(0,2).join('').toUpperCase(); }
  function portrait(member){
    const fallback = `<div class="portrait-fallback" aria-hidden="true">${esc(initials(member.name))}</div>`;
    const image = assetUrl(member.image);
    if (!image) return `<div class="portrait">${fallback}</div>`;
    return `<div class="portrait">${fallback}<img src="${attr(image)}" alt="Portrait of ${attr(member.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()"></div>`;
  }
  function teamCard(m){
    const links = [m.email?`<a href="mailto:${attr(m.email)}">Email</a>`:'',m.linkedin?`<a href="${attr(m.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>`:''].filter(Boolean).join('');
    return `<article class="team-card" data-reveal>${portrait(m)}<h3>${esc(m.name)}</h3><div class="role">${esc(m.role)}</div>${m.placement?`<div class="placement">${esc(m.placement)}</div>`:'<div class="placement"></div>'}${links?`<div class="card-links">${links}</div>`:''}</article>`;
  }
  function renderTeam(id, list){ const el=document.getElementById(id); if(el) el.innerHTML=(list || []).map(teamCard).join(''); }
  renderTeam('leadership-grid', D.team?.leadership); renderTeam('senior-grid', D.team?.senior); renderTeam('junior-grid', D.team?.junior);

  const stats = document.getElementById('stats-grid');
  if(stats) stats.innerHTML=(D.stats || []).map(s=>`<div class="stat"><div class="stat-value">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`).join('');

  function logoCard(f){
    const logo = assetUrl(f.logoImage || f.logo);
    return `<div class="logo-card" data-reveal>${logo?`<img class="${attr(f.className||'')}" src="${attr(logo)}" alt="${attr(f.name)} logo" loading="lazy" referrerpolicy="no-referrer" onerror="this.closest('.logo-card').classList.add('failed')">`:''}<span class="logo-fallback">${esc(f.name)}</span><span class="logo-label">${esc(f.name)}</span></div>`;
  }
  function renderLogos(id, list){ const el=document.getElementById(id); if(el) el.innerHTML=(list || []).map(logoCard).join(''); }
  renderLogos('banking-logos', D.placements?.banking); renderLogos('investment-logos', D.placements?.investments);
  const prev = document.getElementById('placement-preview'); if(prev) prev.innerHTML=(D.placements?.banking || []).slice(0,8).map(logoCard).join('');

  const values=document.getElementById('values-grid'); if(values) values.innerHTML=(D.values || []).map((v,i)=>`<article class="value-card" data-reveal><span class="value-num">${String(i+1).padStart(2,'0')}</span><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></article>`).join('');

  function eventVisual(e){
    const fallback=`<div class="visual-fallback"><span>${esc(e.firm)}</span><strong>${esc(e.guest)}</strong></div>`;
    const image=eventImageUrl(e);
    if(!image) return `<div class="event-visual">${fallback}</div>`;
    return `<div class="event-visual speaker-visual">${fallback}<img src="${attr(image)}" alt="${attr(e.speakerImage ? `Portrait of ${e.guest}` : `${e.title} event photo`)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()"></div>`;
  }
  function eventGallery(e){
    const images=(e.images || []).map(assetUrl).filter(Boolean);
    if(!images.length) return '';
    return `<div class="event-gallery" aria-label="Photos from ${attr(e.title)}">${images.map((src,i)=>`<button class="event-gallery-item" type="button" aria-label="Open photo ${i+1} from ${attr(e.title)}"><img src="${attr(src)}" alt="${attr(e.title)} photo ${i+1}" loading="lazy" onerror="this.closest('.event-gallery-item').remove()"></button>`).join('')}</div>`;
  }

  const upcomingList=document.getElementById('upcoming-events');
  if(upcomingList) upcomingList.innerHTML=(D.upcomingEvents||[]).map(e=>`<article class="upcoming-event" data-reveal><div class="upcoming-date"><span>${esc(e.date)}</span>${e.time?`<strong>${esc(e.time)}</strong>`:''}</div>${eventImageUrl(e)?`<div class="upcoming-speaker"><img src="${attr(eventImageUrl(e))}" alt="Portrait of ${attr(e.guest)}" loading="lazy"></div>`:''}<div class="upcoming-copy"><div class="firm">${esc(e.firm)}${e.titleLine?` · ${esc(e.titleLine)}`:''}</div><h2>${esc(e.title)}</h2><p>${esc(e.description)}</p></div></article>`).join('');

  const eventList=document.getElementById('event-list');
  if(eventList) eventList.innerHTML=(D.events || []).map(e=>`<article class="event-row" data-reveal><div class="event-meta">${esc(e.date)}</div>${eventVisual(e)}<div class="event-copy"><div class="firm">${esc(e.firm)}</div><h2>${esc(e.title)}</h2><p>${esc(e.description)}</p>${eventGallery(e)}</div></article>`).join('');
  const homeEvents=document.getElementById('home-events');
  if(homeEvents){
    const featured=[...(D.upcomingEvents||[]),...(D.events||[])].slice(0,3);
    homeEvents.innerHTML=featured.map(e=>`<article class="home-event" data-reveal>${eventImageUrl(e)?`<img class="home-event-speaker" src="${attr(eventImageUrl(e))}" alt="Portrait of ${attr(e.guest)}" loading="lazy">`:''}<div class="date">${esc(e.date)}${e.time?` · ${esc(e.time)}`:''}</div><h3>${esc(e.title)}</h3><div class="muted">${esc(e.firm)}</div></article>`).join('');
  }

  document.querySelectorAll('[data-app-status]').forEach(el=>el.textContent=D.site.applicationStatus || 'Applications');
  document.querySelectorAll('[data-app-deadline]').forEach(el=>el.textContent=D.site.applicationDeadline || '');
  document.querySelectorAll('[data-application-button]').forEach(a=>{
    if(D.site.applicationUrl){ a.href=D.site.applicationUrl; a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='Start application'; }
    else { a.removeAttribute('href'); a.classList.add('disabled'); a.textContent='Application link coming soon'; a.setAttribute('aria-disabled','true'); }
  });

  const lightbox=document.createElement('dialog');
  lightbox.className='image-lightbox';
  lightbox.innerHTML='<button type="button" class="lightbox-close" aria-label="Close image">×</button><img alt="Expanded event photo">';
  document.body.appendChild(lightbox);
  const lightboxImg=lightbox.querySelector('img');
  lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
  lightbox.addEventListener('click',e=>{ if(e.target===lightbox) lightbox.close(); });
  document.addEventListener('click',e=>{
    const btn=e.target.closest('.event-gallery-item');
    if(!btn) return;
    const img=btn.querySelector('img');
    lightboxImg.src=img.src; lightboxImg.alt=img.alt; lightbox.showModal();
  });

  const revealEls=[...document.querySelectorAll('[data-reveal]')];
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }}),{threshold:.08});
    revealEls.forEach(el=>obs.observe(el));
  } else revealEls.forEach(el=>el.classList.add('visible'));
})();
