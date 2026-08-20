(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const marketData = [
    { label: 'JSE ALSI', value: '89,214.65', change: 0.61 },
    { label: 'TOP 40', value: '82,345.21', change: 0.76 },
    { label: 'USD / ZAR', value: '18.24', change: 0.12 },
    { label: 'GBP / ZAR', value: '23.41', change: -0.08 }
  ];
  const ticker = document.querySelector('#marketTicker');
  ticker.innerHTML = marketData.map(item => {
    const down = item.change < 0;
    return `<div class="ticker__item"><strong>${item.label}</strong><span>${item.value}</span><span class="ticker__change${down ? ' ticker__change--down' : ''}"><i class="ti ti-triangle-filled" aria-hidden="true"${down ? ' style="transform:rotate(180deg)"' : ''}></i>${Math.abs(item.change).toFixed(2)}%</span></div>`;
  }).join('');

  const header = document.querySelector('#siteHeader');
  const updateHeader = () => header.classList.toggle('is-sticky', window.scrollY > 90);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menu = document.querySelector('#mobileMenu');
  const menuToggle = document.querySelector('#menuToggle');
  const setMenu = open => {
    const wasOpen = menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a')?.focus();
    else if (wasOpen) menuToggle.focus();
  };
  menuToggle.addEventListener('click', () => setMenu(true));
  document.querySelector('.mobile-menu__close').addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });

  const serviceImage = document.querySelector('#homeServiceImage');
  const serviceLinks = [...document.querySelectorAll('.home-service')];
  serviceLinks.forEach(link => {
    const activate = () => {
      serviceLinks.forEach(item => item.classList.toggle('is-active', item === link));
      if (serviceImage.src.endsWith(link.dataset.image)) return;
      serviceImage.style.opacity = '0';
      serviceImage.style.transform = 'scale(1.02)';
      window.setTimeout(() => {
        serviceImage.src = link.dataset.image;
        serviceImage.style.opacity = '1';
        serviceImage.style.transform = 'scale(1)';
      }, 170);
    };
    link.addEventListener('mouseenter', activate);
    link.addEventListener('focus', activate);
  });

  const team = [
    { name: 'Ina Sturino', role: 'Portfolio Strategy', bio: 'Focused on practical investment solutions, disciplined portfolio thinking and long-term client outcomes.', image: 'images/team-adviser-02.png' },
    { name: 'Francesco Sturino', role: 'Equity Markets', bio: 'Combining research-led insight with responsive dealing support across local and global markets.', image: 'images/team-adviser-03.png' },
    { name: 'Amy Schultz', role: 'Investment Specialist', bio: 'Bringing experienced market perspective and attentive personal service to every client relationship.', image: 'images/team-amy-schultz.png' }
  ];
  let activeTeam = 0;
  const portrait = document.querySelector('#teamPortrait');
  const renderTeam = index => {
    activeTeam = (index + team.length) % team.length;
    const person = team[activeTeam];
    portrait.classList.add('is-changing');
    window.setTimeout(() => { portrait.src = person.image; portrait.alt = `Portrait of ${person.name}`; portrait.classList.remove('is-changing'); }, 180);
    document.querySelector('#teamCounter').textContent = `${String(activeTeam + 1).padStart(2,'0')} / 03`;
    document.querySelector('#teamName').textContent = person.name;
    document.querySelector('#teamRole').textContent = person.role;
    document.querySelector('#teamBio').textContent = person.bio;
  };
  document.querySelector('#teamPrev').addEventListener('click', () => renderTeam(activeTeam - 1));
  document.querySelector('#teamNext').addEventListener('click', () => renderTeam(activeTeam + 1));

  const dialog = document.querySelector('#accountDialog');
  let dialogTrigger = null;
  document.querySelectorAll('[data-open-dialog]').forEach(button => button.addEventListener('click', () => { dialogTrigger = button; setMenu(false); document.querySelector('#accountMessage').textContent = ''; dialog.showModal(); }));
  document.querySelector('.account-dialog__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialogTrigger?.focus());
  document.querySelector('#accountForm').addEventListener('submit', event => { event.preventDefault(); document.querySelector('#accountMessage').textContent = 'Thank you — your enquiry has been captured in this prototype.'; event.currentTarget.reset(); });
  document.querySelector('#newsletterForm').addEventListener('submit', event => {
    event.preventDefault(); const input = event.currentTarget.querySelector('input'); const message = document.querySelector('#newsletterMessage');
    if (!input.checkValidity()) { message.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    message.textContent = 'Thank you. You’re on the list.'; event.currentTarget.reset();
  });

  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach(entry => { if (!entry.isIntersecting) return; entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroImage = document.querySelector('.home-hero__image');
  if (!reduceMotion && innerWidth > 768) {
    let pending = false;
    addEventListener('scroll', () => {
      if (pending || scrollY > 850) return; pending = true;
      requestAnimationFrame(() => { heroImage.style.transform = `translate3d(0,${Math.min(48,scrollY * .07)}px,0) scale(1.01)`; pending = false; });
    }, { passive: true });
  }
})();
