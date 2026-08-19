(() => {
  'use strict';
  document.documentElement.classList.add('js');
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

  const accountData = {
    pty: {
      label: '(Pty) Ltd',
      intro: 'BP Bernstein will confirm the current company account mandate and supporting-document requirements before submission.',
      items: ['Confirm the company details and authorised representatives.','Request the current account mandate and document checklist.','Prepare the identity and entity information requested by the team.','Discuss any signing or authority requirements before submission.']
    },
    cc: {
      label: 'Close Corporation (CC)',
      intro: 'The team will provide the current Close Corporation mandate and confirm the information required for members and authorised representatives.',
      items: ['Confirm the registered Close Corporation details.','Identify members and authorised representatives.','Request the current account-specific mandate and checklist.','Confirm signing authority with BP Bernstein before submission.']
    },
    minor: {
      label: 'Minor',
      intro: 'A BP Bernstein representative will explain the available structure and the documentation required for a minor account.',
      items: ['Discuss the intended account structure with an adviser.','Confirm the responsible adult or representative details.','Request the current mandate and supporting-document checklist.','Submit only once the team has confirmed the required information.']
    },
    joint: {
      label: 'Joint Account',
      intro: 'BP Bernstein will confirm the current joint-account mandate and the information required from each applicant.',
      items: ['Confirm all intended account holders.','Request the current joint-account mandate.','Prepare the information requested for each applicant.','Agree the signing and instruction arrangements before submission.']
    },
    trust: {
      label: 'Trust',
      intro: 'The current trust mandate and supporting requirements are issued directly after the trust structure and authorised representatives are confirmed.',
      items: ['Confirm the trust details and authorised representatives.','Request the current trust mandate and checklist.','Prepare the trust and representative information requested.','Discuss authority and signing requirements with the team.']
    },
    foreign: {
      label: 'Foreign Company',
      intro: 'Foreign-company applications require account-specific guidance from BP Bernstein before documentation is prepared.',
      items: ['Confirm the entity jurisdiction and authorised representatives.','Request the current foreign-company requirements.','Prepare the company and representative information requested.','Discuss submission and document-format requirements directly.']
    },
    individual: {
      label: 'SA Individual',
      intro: 'BP Bernstein will provide the current individual mandate and confirm the supporting information required for an SA Individual account.',
      items: ['Confirm your preferred service and account structure.','Request the current individual mandate and checklist.','Prepare the identity and supporting information requested.','Contact the team before submitting the completed pack.']
    },
    nonresident: {
      label: 'Non Resident of SA Individual',
      intro: 'A representative will confirm the current requirements for a non-resident individual before issuing the applicable mandate pack.',
      items: ['Confirm your residency and contact details with the team.','Request the current non-resident mandate and checklist.','Prepare the information and document formats requested.','Discuss submission requirements directly with BP Bernstein.']
    },
    club: {
      label: 'Non Legal Entity / Club',
      intro: 'BP Bernstein will first confirm whether the intended structure is appropriate and then issue the relevant current guidance.',
      items: ['Explain the club or non-legal entity structure.','Confirm authorised representatives and intended operation.','Request the current mandate and supporting-document checklist.','Discuss authority and submission requirements before applying.']
    }
  };

  let selectedAccount = 'pty';
  const accountButtons = [...document.querySelectorAll('[data-account]')];
  const requirementName = document.querySelector('#requirementName');
  const requirementIntro = document.querySelector('#requirementIntro');
  const requirementList = document.querySelector('#requirementList');
  const advisorAccount = document.querySelector('#advisorAccount');
  const renderAccount = (key, shouldScroll = false) => {
    selectedAccount = key;
    const account = accountData[key];
    accountButtons.forEach(button => {
      const active = button.dataset.account === key;
      button.classList.toggle('is-active', active);
      if (button.hasAttribute('aria-selected')) button.setAttribute('aria-selected', String(active));
    });
    requirementName.textContent = account.label;
    requirementIntro.textContent = account.intro;
    requirementList.innerHTML = account.items.map(item => `<li><i class="ti ti-circle-check" aria-hidden="true"></i>${item}</li>`).join('');
    advisorAccount.value = account.label;
    const panel = document.querySelector('.requirements-panel');
    if (!reduceMotion) panel.animate([{ opacity: .45, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 330, easing: 'cubic-bezier(.22,1,.36,1)' });
    if (shouldScroll) document.querySelector('#requirements').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };
  accountButtons.forEach(button => button.addEventListener('click', () => renderAccount(button.dataset.account, Boolean(button.closest('.account-types')))));

  const dialog = document.querySelector('#advisorDialog');
  let dialogTrigger = null;
  document.querySelectorAll('[data-open-advisor]').forEach(button => button.addEventListener('click', () => {
    dialogTrigger = button;
    setMenu(false);
    document.querySelector('#advisorMessage').textContent = '';
    advisorAccount.value = accountData[selectedAccount].label;
    dialog.showModal();
  }));
  document.querySelector('.advisor-dialog__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialogTrigger?.focus());
  document.querySelector('#advisorForm').addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#advisorMessage').textContent = 'Thank you. This prototype recorded the demo response locally; no information was sent.';
    event.currentTarget.reset();
    advisorAccount.value = accountData[selectedAccount].label;
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
  if (reduceMotion || !('IntersectionObserver' in window)) revealItems.forEach(item => item.classList.add('is-visible'));
  else {
    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .15 });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  if (!reduceMotion && matchMedia('(pointer:fine)').matches) {
    const heroImage = document.querySelector('.account-hero__image');
    const trustPanel = document.querySelector('.hero-trust');
    let pending = false;
    addEventListener('mousemove', event => {
      if (pending || scrollY > 850) return;
      pending = true;
      requestAnimationFrame(() => {
        const x = event.clientX / innerWidth - .5;
        const y = event.clientY / innerHeight - .5;
        heroImage.style.transform = `translate3d(${x * -8}px,${y * -7}px,0) scale(1.01)`;
        trustPanel.style.transform = `translate3d(${x * 4}px,${y * 3}px,0)`;
        pending = false;
      });
    }, { passive: true });
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('mousemove', event => {
        const box = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .04}px,${(event.clientY - box.top - box.height / 2) * .06}px)`;
      });
      button.addEventListener('mouseleave', () => button.style.transform = '');
    });
  }
})();
