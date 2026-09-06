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
      intro: 'For a company account, prepare the company records and authority documents alongside the application mandate.',
      items: ['A resolution naming the authorised director, signed by each director.','The mandate, initialled and signed by the authorised director.','Certified identity documents for the CEO and all directors.','Proof of residence (not older than three months) for the CEO and directors holding 25% or more.','Company registered-address records, directors list, incorporation certificate and business letterhead.','A certified company bank statement or bank letter, plus a SARS document confirming the company tax number.']
    },
    cc: {
      label: 'Close Corporation (CC)',
      intro: 'A Close Corporation application needs evidence of the authorised member, the CC’s registration and its banking and tax details.',
      items: ['A proxy or resolution naming the member authorised to instruct on the account, signed by each member.','The mandate, initialled and signed by the authorised member.','Certified ID and proof of residence (not older than three months) for the authorised person.','Certified CK1 and CK2 records, plus a certified utility bill for the CC physical address.','CC letterhead reflecting the business address.','A certified CC bank statement or bank letter, plus a SARS document confirming the CC tax number.']
    },
    minor: {
      label: 'Minor',
      intro: 'The account is opened in the minor’s name and the guardian signs the mandate in that capacity.',
      items: ['The mandate in the minor’s name, initialled and signed by the guardian as father, mother or guardian.','A certified copy of the minor’s birth certificate.','Certified ID and proof of residence (not older than three months) for the guardian.','A declaration that the minor resides with the guardian.','A certified bank statement or bank letter confirming banking details.','A SARS document confirming the parent or guardian tax number.']
    },
    joint: {
      label: 'Joint Account',
      intro: 'BP Bernstein lists joint accounts as an available structure, but its public material does not publish a complete current checklist for this option.',
      items: ['Confirm every intended account holder and the preferred instruction arrangement.','Request the current joint-account mandate directly from BP Bernstein.','Ask the team to confirm the certified identity, address, banking and tax documents required from each holder.','Do not submit documents until the account-opening team confirms the current pack.']
    },
    trust: {
      label: 'Trust',
      intro: 'Trust applications require trustee authority, trust formation records and verification documents for the parties involved.',
      items: ['A proxy resolution naming the trustee authorised to instruct on the account, signed by all trustees.','The mandate, initialled and signed by the authorised trustee.','Certified IDs and proof of residence for trustees and beneficiaries, plus proof of the trust registered address.','The trust deed, Master of the High Court authorisation and the trust will with named beneficiaries.','A certified trust bank statement or bank letter confirming banking details.','A SARS document confirming the trust tax number.']
    },
    foreign: {
      label: 'Foreign Company',
      intro: 'BP Bernstein lists foreign companies as an available structure, but its public material does not publish a complete current checklist for this option.',
      items: ['Confirm the country of incorporation and the authorised representatives.','Request the current foreign-company mandate and checklist directly from BP Bernstein.','Ask the team to confirm certification, translation, authority and tax-document requirements.','Agree the submission method before preparing or sending documents.']
    },
    individual: {
      label: 'SA Individual',
      intro: 'For a South African individual account, prepare the signed mandate and the core identity, address, banking and tax records.',
      items: ['The mandate, initialled and signed.','A certified copy of your South African ID.','Certified proof of residence, not older than three months.','A certified bank statement or bank letter confirming your banking details.','A SARS-issued document confirming your tax number.','If the proof of residence is not in your name, ask BP Bernstein for its residential-address declaration process.']
    },
    nonresident: {
      label: 'Non Resident of SA Individual',
      intro: 'A non-resident individual application uses the relevant mandate with passport, address, banking and applicable tax-residency records.',
      items: ['The mandate, initialled and signed.','A certified copy of your passport.','Certified proof of residence, not older than three months.','A certified bank statement or bank letter confirming banking details.','A foreign income-tax document confirming your tax number, where applicable.','Confirm any cross-border, certification or tax-residency requirements with the account-opening team.']
    },
    club: {
      label: 'Non Legal Entity / Club',
      intro: 'A club or non-legal entity needs documented authority, its formation agreement and records for the nominated account holder.',
      items: ['A proxy resolution naming the authorised person and signed by all beneficiaries or members.','The mandate, initialled and signed by the authorised person.','Certified IDs for beneficiaries or members, and certified proof of residence for the nominated person.','The formation agreement, signed by all beneficiaries or members.','A certified bank statement or bank letter for the nominated account.','A SARS document confirming the nominated person’s tax number.']
    }
  };

  let selectedAccount = 'individual';
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

  const explorerButtons = [...document.querySelectorAll('[data-account-explorer]')];
  const explorerName = document.querySelector('#explorerAccountName');
  const explorerIntro = document.querySelector('#explorerAccountIntro');
  const explorerList = document.querySelector('#explorerAccountList');
  const explorerPanel = document.querySelector('.account-types-explorer__panel');
  const renderExplorer = key => {
    const account = accountData[key];
    if (!account || !explorerPanel) return;
    explorerButtons.forEach(button => {
      const active = button.dataset.accountExplorer === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    explorerName.textContent = account.label;
    explorerIntro.textContent = account.intro;
    explorerList.innerHTML = account.items.map(item => `<li><i class="ti ti-circle-check" aria-hidden="true"></i>${item}</li>`).join('');
    if (!reduceMotion) explorerPanel.animate([{ opacity:.5, transform:'translateY(7px)' }, { opacity:1, transform:'translateY(0)' }], { duration:260, easing:'cubic-bezier(.22,1,.36,1)' });
  };
  explorerButtons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.accountExplorer;
    renderAccount(key);
    renderExplorer(key);
  }));
  renderExplorer(selectedAccount);

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
