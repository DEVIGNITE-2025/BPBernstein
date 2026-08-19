(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.querySelector('#pageLoader');
  const hideLoader = () => loader?.classList.add('is-hidden');
  if (reduceMotion) hideLoader();
  else window.setTimeout(hideLoader, 1650);

  const header = document.querySelector('#siteHeader');
  const setHeader = () => header.classList.toggle('is-sticky', scrollY > 50);
  setHeader();
  addEventListener('scroll', setHeader, { passive: true });

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
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });

  const infoContent = {
    general: [
      'An Actively Managed Certificate (AMC) is a listed investment that provides access to a professionally managed portfolio of shares and income-generating assets on the JSE.',
      'We combine market research, active stock selection and disciplined risk management to identify opportunities and navigate market cycles with confidence.',
      'The structure is designed to offer transparent market access while keeping long-term investor outcomes in focus.'
    ],
    corporate: ['Corporate actions can affect the securities held inside an actively managed portfolio.', 'The investment team assesses each event in the context of the portfolio strategy, risk profile and investor outcomes.'],
    preference: ['Preference shares can provide an income-oriented component within a diversified investment structure.', 'Their inclusion is evaluated through research, market conditions and the portfolio’s risk objectives.'],
    ordinary: ['Ordinary shares provide participation in the ownership and performance of listed companies.', 'Selection is research-led and considered as part of a diversified portfolio rather than in isolation.'],
    definitions: ['Financial and economic terms help investors understand how markets, securities and portfolio decisions interact.', 'Speak to a BP Bernstein adviser for information relevant to your circumstances.'],
    products: ['BP Bernstein provides access to a range of investment services, including equity trading, CFDs, offshore investments and exchange-traded products.', 'The appropriate structure depends on an investor’s objectives and risk profile.'],
    strategy: ['Investment strategy is expressed through research, active allocation, ongoing monitoring and regular risk review.', 'This repeatable process keeps the portfolio focused on disciplined long-term outcomes.']
  };
  const infoPanel = document.querySelector('#infoPanel');
  const infoButtons = [...document.querySelectorAll('.info-nav button')];
  infoButtons.forEach(button => button.addEventListener('click', () => {
    infoButtons.forEach(item => item.classList.toggle('is-active', item === button));
    infoPanel.animate([{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' });
    infoPanel.innerHTML = infoContent[button.dataset.topic].map(paragraph => `<p>${paragraph}</p>`).join('');
  }));

  const dialog = document.querySelector('#accountDialog');
  let dialogTrigger = null;
  document.querySelectorAll('[data-open-dialog]').forEach(button => button.addEventListener('click', () => {
    dialogTrigger = button;
    setMenu(false);
    document.querySelector('#accountMessage').textContent = '';
    dialog.showModal();
  }));
  document.querySelector('.account-dialog__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialogTrigger?.focus());
  document.querySelector('#accountForm').addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#accountMessage').textContent = 'Thank you — your enquiry has been captured in this prototype.';
    event.currentTarget.reset();
  });
  document.querySelector('#newsletterForm').addEventListener('submit', event => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    const message = document.querySelector('#newsletterMessage');
    if (!input.checkValidity()) { message.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    message.textContent = 'Thank you. You’re on the list.';
    event.currentTarget.reset();
  });

  const reveals = [...document.querySelectorAll('.reveal')];
  reveals.forEach(item => item.style.setProperty('--delay', `${item.dataset.delay || 0}ms`));
  if (reduceMotion) reveals.forEach(item => item.classList.add('is-visible'));
  else {
    const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .12 });
    reveals.forEach(item => revealObserver.observe(item));
  }

  const drawLineChart = (canvas, primary, comparison = null, progress = 1) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    }
    const context = canvas.getContext('2d');
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255,255,255,.10)';
    for (let index = 1; index < 5; index += 1) {
      context.beginPath(); context.moveTo(0, height * index / 5); context.lineTo(width, height * index / 5); context.stroke();
    }
    const drawSeries = (values, color, glow, amount) => {
      const lastIndex = Math.max(1, Math.floor((values.length - 1) * amount));
      const min = Math.min(...primary, ...(comparison || []));
      const max = Math.max(...primary, ...(comparison || []));
      context.save();
      context.strokeStyle = color;
      context.lineWidth = 2;
      context.lineJoin = 'round';
      context.shadowColor = glow;
      context.shadowBlur = 10;
      context.beginPath();
      values.slice(0, lastIndex + 1).forEach((value, index) => {
        const x = index / (values.length - 1) * width;
        const y = height - 12 - ((value - min) / Math.max(1, max - min)) * (height - 24);
        if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
      });
      context.stroke(); context.restore();
    };
    if (comparison) drawSeries(comparison, '#4b83c8', 'rgba(75,131,200,.5)', progress);
    drawSeries(primary, '#f1515b', 'rgba(241,81,91,.65)', progress);
  };

  const heroCanvas = document.querySelector('#heroChart');
  const heroSeries = [17,20,19,25,23,29,33,31,38,43,41,48,55,51,58,64,61,69,77,74,82,91,89,96];
  const growthCanvas = document.querySelector('#growthChart');
  const activeSeries = [22,25,30,29,34,39,44,42,49,54,59,63,61,69,74,81,78,86,93,99,106,104,113,121,129,126,138,147];
  const benchmarkSeries = [21,23,25,28,30,33,35,34,37,40,44,46,45,49,52,55,53,58,61,64,68,66,71,75,79,81,84,88];
  const animateChart = (canvas, primary, comparison) => {
    if (reduceMotion) { drawLineChart(canvas, primary, comparison, 1); return; }
    const start = performance.now();
    const frame = time => {
      const progress = Math.min(1, (time - start) / 950);
      drawLineChart(canvas, primary, comparison, 1 - Math.pow(1 - progress, 3));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  window.setTimeout(() => animateChart(heroCanvas, heroSeries), reduceMotion ? 0 : 1700);
  if ('IntersectionObserver' in window) {
    const chartObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateChart(growthCanvas, activeSeries, benchmarkSeries);
      chartObserver.disconnect();
    }), { threshold: .25 });
    chartObserver.observe(growthCanvas);
  } else {
    animateChart(growthCanvas, activeSeries, benchmarkSeries);
  }
  addEventListener('resize', () => {
    drawLineChart(heroCanvas, heroSeries, null, 1);
    drawLineChart(growthCanvas, activeSeries, benchmarkSeries, 1);
  });

  if (!reduceMotion && innerWidth > 780) {
    const heroImage = document.querySelector('.amc-hero__image');
    const marketPanel = document.querySelector('.market-panel');
    const magneticButtons = document.querySelectorAll('.magnetic');
    let framePending = false;
    addEventListener('mousemove', event => {
      if (framePending || scrollY > 760) return;
      framePending = true;
      requestAnimationFrame(() => {
        const x = (event.clientX / innerWidth - .5);
        const y = (event.clientY / innerHeight - .5);
        heroImage.style.transform = `translate3d(${x * -8}px,${y * -6}px,0) scale(1.01)`;
        marketPanel.style.transform = `translate3d(${x * 5}px,${y * 4}px,0)`;
        framePending = false;
      });
    }, { passive: true });
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', event => {
        const bounds = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - bounds.left - bounds.width / 2) * .05}px,${(event.clientY - bounds.top - bounds.height / 2) * .07}px)`;
      });
      button.addEventListener('mouseleave', () => button.style.transform = '');
    });
  }
})();
