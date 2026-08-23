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
  const performanceCanvas = document.querySelector('#performanceChart');
  const performanceStorageKey = 'bpb-amc-performance-data';
  const defaultPerformanceData = {
    asOf: '',
    performance: {
      sixMonths: { fund: 24.03, benchmark: -1.64 },
      twelveMonths: { fund: 40.87, benchmark: 11.91 },
      inception: { fund: 127, benchmark: 54.12 }
    },
    holdings: [
      { name: 'Reinet Investments SCA', weight: 6.20 },
      { name: 'Pick n Pay Stores Ltd', weight: 4.57 },
      { name: 'Prosus NV', weight: 3.75 },
      { name: 'Tesla Inc', weight: 3.03 },
      { name: 'Sasol Limited', weight: 2.69 },
      { name: 'iShares 20+ Year Treasury Bond ETF', weight: 2.67 },
      { name: 'AdvisorShares Pure US Cannabis ETF', weight: 2.06 },
      { name: 'Alibaba Group Holdings Limited', weight: 1.98 },
      { name: 'KraneShares CSI China Internet ETF', weight: 1.85 },
      { name: 'Cash', weight: 30.48 }
    ]
  };
  const readPerformanceData = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(performanceStorageKey));
      if (!saved || typeof saved !== 'object') return defaultPerformanceData;
      return {
        ...defaultPerformanceData,
        ...saved,
        performance: {
          ...defaultPerformanceData.performance,
          ...(saved.performance || {})
        },
        holdings: Array.isArray(saved.holdings) && saved.holdings.length ? saved.holdings : defaultPerformanceData.holdings
      };
    } catch {
      return defaultPerformanceData;
    }
  };
  const formatPerformanceValue = value => `${(Number(value) || 0).toFixed(2)}%`;
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
  const updatePerformanceOutputs = data => {
    document.querySelectorAll('[data-performance-output]').forEach(output => {
      const [period, series] = output.dataset.performanceOutput.split('-');
      output.textContent = formatPerformanceValue(data.performance[period]?.[series]);
    });
    const dateLabel = data.asOf ? `As at ${data.asOf}` : 'Latest published figures';
    document.querySelectorAll('[data-performance-date], [data-holdings-date]').forEach(output => { output.textContent = dateLabel; });
  };
  const renderHoldings = holdings => {
    const list = document.querySelector('#holdingsList');
    if (!list) return;
    const highestWeight = Math.max(1, ...holdings.map(item => Math.abs(Number(item.weight) || 0)));
    list.innerHTML = holdings.map((holding, index) => {
      const weight = Number(holding.weight) || 0;
      const width = Math.max(0, Math.min(100, weight / highestWeight * 100));
      return `<li><span class="holding-rank">${String(index + 1).padStart(2, '0')}</span><span class="holding-name">${escapeHtml(holding.name || 'Holding')}</span><span class="holding-weight">${formatPerformanceValue(weight)}</span><i aria-hidden="true" style="--allocation:${width}%"></i></li>`;
    }).join('');
  };
  const drawPerformanceChart = (canvas, data) => {
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
    const periods = ['sixMonths', 'twelveMonths', 'inception'];
    const values = periods.flatMap(period => [Number(data.performance[period]?.fund) || 0, Number(data.performance[period]?.benchmark) || 0]);
    const minimum = Math.min(-5, ...values);
    const maximum = Math.max(5, ...values);
    const padding = Math.max(8, (maximum - minimum) * .12);
    const lower = minimum - padding;
    const upper = maximum + padding;
    const chartHeight = height - 18;
    const scaleY = value => height - 9 - ((value - lower) / Math.max(1, upper - lower)) * chartHeight;
    context.strokeStyle = 'rgba(255,255,255,.12)';
    context.lineWidth = 1;
    for (let index = 1; index < 5; index += 1) {
      const y = height * index / 5;
      context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
    }
    const baseline = scaleY(0);
    context.strokeStyle = 'rgba(255,255,255,.38)';
    context.beginPath(); context.moveTo(0, baseline); context.lineTo(width, baseline); context.stroke();
    const groupWidth = width / periods.length;
    const barWidth = Math.min(25, groupWidth * .22);
    periods.forEach((period, index) => {
      const centre = groupWidth * index + groupWidth / 2;
      [
        { value: Number(data.performance[period]?.fund) || 0, color: '#df1f2d' },
        { value: Number(data.performance[period]?.benchmark) || 0, color: '#ffffff' }
      ].forEach((series, seriesIndex) => {
        const y = scaleY(series.value);
        const x = centre + (seriesIndex === 0 ? -barWidth - 3 : 3);
        context.fillStyle = series.color;
        context.fillRect(x, Math.min(y, baseline), barWidth, Math.max(1, Math.abs(baseline - y)));
      });
    });
  };
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
  const renderPerformanceData = () => {
    const performanceData = readPerformanceData();
    updatePerformanceOutputs(performanceData);
    renderHoldings(performanceData.holdings);
    drawPerformanceChart(performanceCanvas, performanceData);
  };
  if ('IntersectionObserver' in window && performanceCanvas) {
    const chartObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      renderPerformanceData();
      chartObserver.disconnect();
    }), { threshold: .25 });
    chartObserver.observe(performanceCanvas);
  } else {
    renderPerformanceData();
  }
  addEventListener('resize', () => {
    drawLineChart(heroCanvas, heroSeries, null, 1);
    renderPerformanceData();
  });
  addEventListener('storage', event => {
    if (event.key === performanceStorageKey) renderPerformanceData();
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
        if (marketPanel) marketPanel.style.transform = `translate3d(${x * 5}px,${y * 4}px,0)`;
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
