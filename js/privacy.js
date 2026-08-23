(() => {
  'use strict';
  const header = document.querySelector('#siteHeader');
  const updateHeader = () => header.classList.toggle('is-sticky', scrollY > 80);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive:true });

  const menu = document.querySelector('#mobileMenu');
  const menuToggle = document.querySelector('#menuToggle');
  const setMenu = open => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };
  menuToggle.addEventListener('click', () => setMenu(true));
  document.querySelector('.mobile-menu__close').addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.querySelector('#newsletterForm').addEventListener('submit', event => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const message = document.querySelector('#newsletterMessage');
    if (!input.checkValidity()) { message.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    message.textContent = 'Demo complete — no information was sent.';
    event.currentTarget.reset();
  });

  const contentsLinks = [...document.querySelectorAll('.privacy-toc a[href^="#"]')];
  const contentSections = contentsLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const setActiveSection = id => contentsLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });

  if (contentSections.length) {
    const syncContents = () => {
      const current = contentSections.filter(section => section.getBoundingClientRect().top <= 150).at(-1);
      setActiveSection((current || contentSections[0]).id);
    };
    syncContents();
    addEventListener('scroll', syncContents, { passive:true });
    contentsLinks.forEach(link => link.addEventListener('click', () => setActiveSection(link.getAttribute('href').slice(1))));
  }
})();
