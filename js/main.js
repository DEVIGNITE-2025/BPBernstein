(() => {
  'use strict';

  document.documentElement.classList.add('js');

  // Structured so the display can be connected to an approved delayed-market API.
  const marketData = [
    { label: 'JSE ALSI', value: '89,214.65', change: 0.61 },
    { label: 'TOP 40', value: '82,345.21', change: 0.76 },
    { label: 'USD / ZAR', value: '18.24', change: 0.12 },
    { label: 'GBP / ZAR', value: '23.41', change: -0.08 }
  ];

  const services = [
    {
      id: 1,
      title: 'Equity Trading',
      description: 'We provide direct market access to local and global equity markets. Our experienced dealers and research team deliver insight, execution and support to help you make informed decisions.',
      benefits: [
        'Direct access to the JSE and major global markets',
        'Specialist research and sector insight',
        'Competitive pricing and execution',
        'Personalised dealing and relationship support'
      ],
      image: 'images/equity-trading.png',
      alt: 'Professional institutional equity trading workstation'
    },
    {
      id: 2,
      title: 'CFD Trading',
      description: 'Access flexible market exposure through contracts for difference, supported by experienced dealers who understand the importance of disciplined execution and risk awareness.',
      benefits: [
        'Exposure to local and international shares',
        'Long and short trading opportunities',
        'Transparent margin and risk management support',
        'Responsive access to an experienced dealing team'
      ],
      image: 'images/insight-markets.png',
      alt: 'Contemporary financial district reflected in a glass building'
    },
    {
      id: 3,
      title: 'Offshore Investments',
      description: 'Diversify beyond South Africa with considered access to international markets, global opportunities and specialist guidance aligned to your investment objectives.',
      benefits: [
        'Access to established international markets',
        'Broader geographic and currency diversification',
        'Research-led investment opportunities',
        'Personal assistance with offshore execution'
      ],
      image: 'images/insight-offshore.png',
      alt: 'Cape Town and Table Mountain viewed across the Atlantic coast'
    },
    {
      id: 4,
      title: 'ETN’s',
      description: 'Exchange-traded notes offer targeted market exposure in a transparent listed structure, helping investors express a specific view across selected assets and themes.',
      benefits: [
        'Convenient exchange-traded access',
        'Exposure to selected indices and asset classes',
        'Transparent market pricing',
        'Guidance from our specialist dealing team'
      ],
      image: 'images/services-architecture.png',
      alt: 'Dark institutional glass architecture with red market reflections'
    },
    {
      id: 5,
      title: 'ETF’s',
      description: 'Build efficient, diversified market exposure with exchange-traded funds selected to complement your broader portfolio strategy and long-term objectives.',
      benefits: [
        'Cost-efficient diversified exposure',
        'Access to local and global indices',
        'Transparent daily pricing and liquidity',
        'Portfolio support tailored to your objectives'
      ],
      image: 'images/hero-johannesburg.png',
      alt: 'Johannesburg skyline and bridge at sunrise'
    },
    {
      id: 6,
      title: 'Satrix',
      description: 'Access a broad range of index-tracking investments through the Satrix platform, with straightforward execution and personal support from BP Bernstein.',
      benefits: [
        'Wide selection of index-tracking products',
        'Simple access through a trusted platform',
        'Flexible portfolio-building options',
        'Personal assistance when you need it'
      ],
      image: 'images/insight-johannesburg.png',
      alt: 'Johannesburg city architecture in warm afternoon light'
    }
  ];

  const ticker = document.querySelector('#marketTicker');
  if (ticker) {
    ticker.innerHTML = marketData.map((item) => {
      const isDown = item.change < 0;
      return `
        <div class="ticker__item">
          <strong>${item.label}</strong>
          <span class="ticker__item-value">${item.value}</span>
          <span class="ticker__change${isDown ? ' ticker__change--down' : ''}">
            <i class="ti ti-triangle-filled" aria-hidden="true"${isDown ? ' style="transform:rotate(180deg)"' : ''}></i>
            ${Math.abs(item.change).toFixed(2)}%
          </span>
        </div>`;
    }).join('');
  }

  const menu = document.querySelector('#mobileMenu');
  const menuToggle = document.querySelector('#menuToggle');
  const menuClose = document.querySelector('.mobile-menu__close');

  const setMenuOpen = (open) => {
    if (!menu || !menuToggle) return;
    const wasOpen = menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a')?.focus();
    else if (wasOpen) menuToggle.focus();
  };

  menuToggle?.addEventListener('click', () => setMenuOpen(true));
  menuClose?.addEventListener('click', () => setMenuOpen(false));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('is-open')) setMenuOpen(false);
  });

  const tabs = [...document.querySelectorAll('.service-tab')];
  const panel = document.querySelector('#servicePanel');
  const copy = document.querySelector('#serviceCopy');
  const media = document.querySelector('#serviceMedia');
  const number = document.querySelector('#serviceNumber');
  const heading = document.querySelector('#serviceHeading');
  const description = document.querySelector('#serviceDescription');
  const benefits = document.querySelector('#serviceBenefits');
  const image = document.querySelector('#serviceImage');
  const serviceLink = document.querySelector('#serviceLink');
  let activeService = 0;
  let serviceTimer;

  const benefitMarkup = (items) => items.map((item) => `
    <li>
      <span class="benefit-icon"><i class="ti ti-check" aria-hidden="true"></i></span>
      <span>${item}</span>
    </li>`).join('');

  const setService = (nextIndex, moveFocus = false) => {
    if (nextIndex === activeService || nextIndex < 0 || nextIndex >= services.length) return;
    activeService = nextIndex;
    const service = services[nextIndex];

    tabs.forEach((tab, index) => {
      const isActive = index === nextIndex;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    if (moveFocus) tabs[nextIndex].focus();

    copy?.classList.add('is-changing');
    media?.classList.add('is-changing');
    window.clearTimeout(serviceTimer);

    serviceTimer = window.setTimeout(() => {
      if (number) number.textContent = String(service.id).padStart(2, '0');
      if (heading) heading.textContent = service.title;
      if (description) description.textContent = service.description;
      if (benefits) benefits.innerHTML = benefitMarkup(service.benefits);
      if (image) {
        image.src = service.image;
        image.alt = service.alt;
      }
      if (serviceLink) serviceLink.innerHTML = `Explore ${service.title} <i class="ti ti-arrow-narrow-right" aria-hidden="true"></i>`;
      panel?.setAttribute('aria-labelledby', tabs[nextIndex].id);

      window.requestAnimationFrame(() => {
        copy?.classList.remove('is-changing');
        media?.classList.remove('is-changing');
      });
    }, 250);
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setService(index));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      else nextIndex = (index - 1 + tabs.length) % tabs.length;
      setService(nextIndex, true);
    });
  });

  const accountDialog = document.querySelector('#accountDialog');
  const accountForm = document.querySelector('#accountForm');
  const accountMessage = document.querySelector('#accountMessage');
  let dialogTrigger = null;

  document.querySelectorAll('[data-open-dialog]').forEach((button) => {
    button.addEventListener('click', () => {
      dialogTrigger = button;
      setMenuOpen(false);
      accountMessage.textContent = '';
      accountDialog?.showModal();
    });
  });
  document.querySelector('.account-dialog__close')?.addEventListener('click', () => accountDialog?.close());
  accountDialog?.addEventListener('click', (event) => {
    if (event.target === accountDialog) accountDialog.close();
  });
  accountDialog?.addEventListener('close', () => dialogTrigger?.focus());
  accountForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    accountMessage.textContent = 'Thank you — your enquiry has been captured in this prototype.';
    accountForm.reset();
  });

  const newsletterForm = document.querySelector('#newsletterForm');
  const newsletterMessage = document.querySelector('#newsletterMessage');
  newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (!input.checkValidity()) {
      newsletterMessage.textContent = 'Please enter a valid email address.';
      input.focus();
      return;
    }
    newsletterMessage.textContent = 'Thank you. You’re on the list.';
    newsletterForm.reset();
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroImage = document.querySelector('.hero__image');
  if (!reduceMotion && heroImage && window.innerWidth > 768) {
    let framePending = false;
    window.addEventListener('scroll', () => {
      if (framePending || window.scrollY > 520) return;
      framePending = true;
      window.requestAnimationFrame(() => {
        heroImage.style.transform = `translate3d(0, ${Math.min(42, window.scrollY * .08)}px, 0) scale(1.01)`;
        framePending = false;
      });
    }, { passive: true });
  }
})();
