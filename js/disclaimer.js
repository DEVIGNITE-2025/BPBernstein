(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const captureMode = new URLSearchParams(location.search).has('qa');
  if (captureMode) document.documentElement.classList.add('qa-capture');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.querySelector('#siteHeader');
  const updateHeader = () => header.classList.toggle('is-sticky', scrollY > 80);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

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

  const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
  const sectionTargets = sectionLinks.map(link => document.getElementById(link.dataset.sectionLink)).filter(Boolean);
  const setActiveSection = id => sectionLinks.forEach(link => link.classList.toggle('is-active', link.dataset.sectionLink === id));
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .15, .4] });
    sectionTargets.forEach(section => sectionObserver.observe(section));
  }

  const dialog = document.querySelector('#disclaimerDialog');
  let dialogTrigger = null;
  const openDialog = trigger => {
    dialogTrigger = trigger;
    setMenu(false);
    document.querySelector('#disclaimerMessage').textContent = '';
    dialog.showModal();
  };
  document.querySelectorAll('[data-open-enquiry]').forEach(button => button.addEventListener('click', () => openDialog(button)));
  document.querySelector('.advisor-dialog__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialogTrigger?.focus());
  document.querySelector('#disclaimerForm').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    document.querySelector('#disclaimerMessage').textContent = 'Thank you. This prototype recorded the demo response locally; no information was sent.';
    event.currentTarget.reset();
  });
  document.querySelector('#newsletterForm').addEventListener('submit', event => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const message = document.querySelector('#newsletterMessage');
    if (!input.checkValidity()) { message.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    message.textContent = 'Demo complete — no information was sent.';
    event.currentTarget.reset();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (menu.classList.contains('is-open')) setMenu(false);
    if (dialog.open) dialog.close();
  });

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  revealItems.forEach(item => item.style.setProperty('--delay', `${item.dataset.delay || 0}ms`));
  if (captureMode || reduceMotion || !('IntersectionObserver' in window)) revealItems.forEach(item => item.classList.add('is-visible'));
  else {
    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .14 });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  if (!captureMode && !reduceMotion && matchMedia('(pointer:fine)').matches) {
    const heroImage = document.querySelector('.disclaimer-hero__image');
    const panel = document.querySelector('.protection-panel');
    const ctaImage = document.querySelector('.brand-cta__image');
    let pointerFrame = false;
    addEventListener('pointermove', event => {
      if (pointerFrame || scrollY > 840) return;
      pointerFrame = true;
      requestAnimationFrame(() => {
        const x = event.clientX / innerWidth - .5;
        const y = event.clientY / innerHeight - .5;
        heroImage.style.transform = `translate3d(${x * -8}px,${y * -6}px,0) scale(1.012)`;
        panel.style.transform = `translate3d(${x * 3}px,${y * 2}px,0)`;
        pointerFrame = false;
      });
    }, { passive: true });
    let scrollFrame = false;
    addEventListener('scroll', () => {
      if (scrollFrame) return;
      scrollFrame = true;
      requestAnimationFrame(() => {
        const box = ctaImage.parentElement.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - (box.top + box.height / 2)) / innerHeight));
        ctaImage.style.transform = `translate3d(0,${progress * 24}px,0) scale(1.035)`;
        scrollFrame = false;
      });
    }, { passive: true });
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const box = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .04}px,${(event.clientY - box.top - box.height / 2) * .05}px)`;
      });
      button.addEventListener('pointerleave', () => button.style.transform = '');
    });
  }
})();
