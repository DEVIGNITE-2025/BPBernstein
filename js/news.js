(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const captureMode = new URLSearchParams(location.search).has('qa');
  if (captureMode) document.documentElement.classList.add('qa-capture');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const posts = [
    {
      id: 'independent-thinking-changing-markets',
      title: 'Independent thinking in changing markets',
      category: 'Market Insights',
      edition: 'BP Bernstein perspective',
      image: 'images/insight-johannesburg.png',
      alt: 'Johannesburg financial district architecture',
      excerpt: 'Market conditions change, but a clear view of risk, value and long-term objectives helps investors respond without losing perspective.',
      body: ['Markets rarely move in a straight line. A disciplined investment approach begins with understanding what has changed, what has not, and which decisions genuinely support an investor’s long-term objectives.', 'Independent thinking means assessing opportunities on their merits, considering both downside risk and potential return, and avoiding decisions driven only by short-term market noise.'],
      source: 'services.html#equity', sourceLabel: 'Explore equity trading'
    },
    {
      id: 'planning-disciplined-market-insight',
      title: 'Planning with disciplined market insight',
      category: 'Portfolio Strategy',
      edition: 'Investor perspective',
      image: 'images/equity-trading.png',
      alt: 'Institutional financial market screens',
      excerpt: 'A sound plan connects market research with portfolio construction, risk tolerance and the outcomes an investor is working toward.',
      body: ['Good portfolio planning is not simply a collection of securities. It is a deliberate process that links research, asset selection, diversification and ongoing review.', 'The most useful market insight is insight that can be translated into a clear decision while remaining aligned with an investor’s circumstances and objectives.'],
      source: 'amc.html#approach', sourceLabel: 'Explore our investment approach'
    },
    {
      id: 'global-diversification-still-matters',
      title: 'Why global diversification still matters',
      category: 'Offshore Investing',
      edition: 'Global markets',
      image: 'images/insight-offshore.png',
      alt: 'Cape Town coastline and Table Mountain',
      excerpt: 'Offshore exposure can broaden an investor’s opportunity set while reducing reliance on a single market and currency environment.',
      body: ['For South African investors, international markets can provide access to industries, businesses and investment structures that are not always available locally.', 'Diversification does not remove risk, but it can distribute exposure more thoughtfully across markets, currencies and sources of return.'],
      source: 'services.html#offshore', sourceLabel: 'Explore offshore investments'
    },
    {
      id: 'opportunity-in-changing-markets',
      title: 'Understanding opportunity in changing markets',
      category: 'Market Insights',
      edition: 'Market intelligence',
      image: 'images/insight-markets.png',
      alt: 'Financial district reflected in a glass building',
      excerpt: 'Volatility can obscure the difference between price movement and lasting value. Research helps investors separate the two.',
      body: ['Changing markets create both uncertainty and opportunity. The important distinction is whether a price move reflects a durable change in fundamentals or a temporary shift in sentiment.', 'A research-led approach examines valuation, balance-sheet strength, competitive position and the broader economic environment before capital is committed.'],
      source: 'services.html#equity', sourceLabel: 'Explore our market services'
    },
    {
      id: 'role-of-the-jse',
      title: 'The role of the JSE in South Africa’s capital markets',
      category: 'Investor Education',
      edition: 'Educational resource',
      image: 'images/services-hero-architecture.png',
      alt: 'Modern South African financial district architecture',
      excerpt: 'The exchange connects organisations seeking capital with investors and provides an orderly market for listed securities.',
      body: ['The Johannesburg Stock Exchange supports capital formation by providing a regulated venue where companies can issue securities and investors can trade listed shares.', 'It also establishes market rules and structures intended to support orderly trading, transparency and access to market information.'],
      source: 'https://www.bpbernstein.co.za/educational/', sourceLabel: 'Read BP Bernstein educational resources'
    },
    {
      id: 'primary-secondary-equity-markets',
      title: 'Primary and secondary equity markets explained',
      category: 'Investor Education',
      edition: 'Educational resource',
      image: 'images/services-architecture.png',
      alt: 'Glass and steel financial district atrium',
      excerpt: 'New securities raise capital in the primary market; existing securities change hands between investors in the secondary market.',
      body: ['In a primary-market transaction, an issuer offers new shares and receives the capital raised. This capital can help fund business development and expansion.', 'In the secondary market, investors buy and sell securities that have already been issued. The proceeds belong to the seller rather than the original issuer.'],
      source: 'https://www.bpbernstein.co.za/educational/', sourceLabel: 'Read BP Bernstein educational resources'
    },
    {
      id: 'read-a-balance-sheet',
      title: 'Reading a balance sheet with greater confidence',
      category: 'Investor Education',
      edition: 'Financial definitions',
      image: 'images/legal-market-scales-hero.png',
      alt: 'Market data and financial balance scales',
      excerpt: 'A balance sheet offers a point-in-time view of what a company owns, what it owes and the equity attributable to shareholders.',
      body: ['A balance sheet records assets and liabilities at a particular date. The difference between them represents shareholders’ equity, also referred to as net assets or book value.', 'It is most useful when considered alongside the income statement and cash-flow statement, which provide different views of operating performance and liquidity.'],
      source: 'https://www.bpbernstein.co.za/educational/', sourceLabel: 'Read BP Bernstein educational resources'
    },
    {
      id: 'how-market-indexes-work',
      title: 'How market indexes help investors measure performance',
      category: 'Market Insights',
      edition: 'Market foundations',
      image: 'images/disclaimer-market-hero.png',
      alt: 'World market data and a rising chart',
      excerpt: 'Indexes summarise the movement of a defined group of shares and can provide a useful benchmark for market and portfolio performance.',
      body: ['A market index is a statistical measure designed to reflect the collective behaviour of a selected group of securities. The percentage change is generally more useful than the index level on its own.', 'Indexes can be used as performance benchmarks, as references for index-tracking funds and as indicators of movement within a market or sector.'],
      source: 'https://www.bpbernstein.co.za/educational/', sourceLabel: 'Read BP Bernstein educational resources'
    },
    {
      id: 'preference-shares-income-risk',
      title: 'Preference shares: income, structure and risk',
      category: 'Portfolio Strategy',
      edition: 'Investment products',
      image: 'images/amc-market-hero.png',
      alt: 'Active investment strategy and market data',
      excerpt: 'Preference shares can contribute an income-oriented component to a portfolio, but their terms and risks require careful assessment.',
      body: ['Preference shares have characteristics of both equity and income instruments. Their dividend terms, ranking and sensitivity to market conditions can differ materially between issues.', 'They should therefore be assessed within the context of an investor’s broader portfolio, liquidity needs and tolerance for risk.'],
      source: 'https://www.bpbernstein.co.za/educational/', sourceLabel: 'Read BP Bernstein educational resources'
    },
    {
      id: 'exchange-traded-funds',
      title: 'What exchange-traded funds offer investors',
      category: 'Trading',
      edition: 'Investment products',
      image: 'images/team-adviser-03.png',
      alt: 'BP Bernstein investment adviser',
      excerpt: 'ETFs can provide transparent, tradeable exposure to a basket of securities and may support cost-efficient diversification.',
      body: ['An exchange-traded fund is listed and traded during market hours. Its portfolio is designed to track a defined index, sector or investment strategy.', 'ETFs can help investors access diversified market exposure in a single security, although investors should still consider the underlying holdings, costs, liquidity and investment objective.'],
      source: 'services.html#etf', sourceLabel: 'Explore ETF services'
    },
    {
      id: 'offshore-exposure-rand',
      title: 'Managing offshore exposure in a changing rand environment',
      category: 'Offshore Investing',
      edition: 'Global markets',
      image: 'images/team-adviser-02.png',
      alt: 'BP Bernstein adviser discussing a portfolio',
      excerpt: 'Currency movements can affect both the value and risk profile of offshore investments for South African investors.',
      body: ['Offshore exposure introduces access to a wider set of markets and currencies. It can also create additional volatility when foreign asset prices are translated back into rand.', 'The appropriate allocation depends on an investor’s objectives, time horizon, liquidity requirements and existing local exposure.'],
      source: 'services.html#offshore', sourceLabel: 'Explore offshore investments'
    },
    {
      id: 'disciplined-investor-security',
      title: 'Security starts with disciplined investor habits',
      category: 'Company Updates',
      edition: 'Client protection',
      image: 'images/team-amy-schultz.png',
      alt: 'BP Bernstein client services representative',
      excerpt: 'Keeping credentials private, checking unexpected messages and verifying instructions remain important safeguards against financial fraud.',
      body: ['Protecting an investment account is a shared responsibility. Passwords and login details should remain private, suspicious messages should be checked carefully, and unusual requests should be verified directly.', 'BP Bernstein’s account-verification processes are designed to support secure dealing and reduce the risk of unauthorised instructions.'],
      source: 'https://www.bpbernstein.co.za/', sourceLabel: 'Visit BP Bernstein'
    }
  ];

  const categoryIcons = {
    'All News': 'ti-layout-list', 'Market Insights': 'ti-chart-line', 'Portfolio Strategy': 'ti-chart-pie',
    'Offshore Investing': 'ti-world', 'Investor Education': 'ti-school', Trading: 'ti-arrows-exchange',
    'Company Updates': 'ti-building-bank'
  };
  const categories = ['All News', ...new Set(posts.map(post => post.category))];
  const pageSize = 4;
  let selectedCategory = 'All News';
  let currentPage = 1;
  let hasRendered = false;

  const newsList = document.querySelector('#newsList');
  const pagination = document.querySelector('#pagination');
  const resultCount = document.querySelector('#resultCount');
  const clearFilter = document.querySelector('#clearFilter');
  const categoryList = document.querySelector('#categoryList');
  const mobileCategories = document.querySelector('#mobileCategories');

  const revealObserver = !captureMode && !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }), { threshold: .14, rootMargin: '0px 0px -5% 0px' })
    : null;

  const prepareReveals = root => {
    root.querySelectorAll('[data-reveal]').forEach(item => {
      item.style.setProperty('--delay', `${item.dataset.delay || 0}ms`);
      if (revealObserver) revealObserver.observe(item); else item.classList.add('is-visible');
    });
  };

  const categoryButton = (category, mobile = false) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.category = category;
    button.className = category === selectedCategory ? 'is-active' : '';
    button.setAttribute('aria-pressed', String(category === selectedCategory));
    if (mobile) button.textContent = category;
    else button.innerHTML = `<i class="ti ${categoryIcons[category] || 'ti-book'}" aria-hidden="true"></i><span>${category}</span><i class="ti ti-chevron-right" aria-hidden="true"></i>`;
    button.addEventListener('click', () => setCategory(category));
    return button;
  };

  const renderCategories = () => {
    categoryList.replaceChildren(...categories.map(category => categoryButton(category)));
    mobileCategories.replaceChildren(...categories.map(category => categoryButton(category, true)));
  };

  const renderPosts = () => {
    const filtered = selectedCategory === 'All News' ? posts : posts.filter(post => post.category === selectedCategory);
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    resultCount.textContent = filtered.length;
    clearFilter.hidden = selectedCategory === 'All News';

    if (!visible.length) {
      newsList.innerHTML = '<div class="news-empty"><i class="ti ti-news-off" aria-hidden="true"></i><h3>No perspectives found</h3><p>Choose another category to continue exploring.</p></div>';
    } else {
      newsList.innerHTML = visible.map((post, index) => `
        <article class="news-article" id="${post.id}" data-reveal data-delay="${index * 70}">
          <a class="news-article__image" href="article.html?article=${encodeURIComponent(post.id)}" aria-label="Read ${post.title}"><img src="${post.image}" alt="${post.alt}" ${index ? 'loading="lazy"' : ''}></a>
          <div class="news-article__body">
            <div class="news-article__meta"><span class="news-article__category">${post.category}</span><span>${post.edition}</span></div>
            <h3>${post.title}</h3><p class="news-article__excerpt">${post.excerpt}</p>
            <a class="article-read" href="article.html?article=${encodeURIComponent(post.id)}">Read more <i class="ti ti-arrow-narrow-right" aria-hidden="true"></i></a>
          </div>
        </article>`).join('');
    }
    renderPagination(pageCount);
    renderCategories();
    prepareReveals(newsList);

    if (hasRendered && !captureMode) document.querySelector('#archive').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    hasRendered = true;
  };

  const pageButton = (label, page, options = {}) => {
    const button = document.createElement('button');
    button.type = 'button'; button.innerHTML = label; button.disabled = options.disabled || false;
    if (page === currentPage) { button.classList.add('is-current'); button.setAttribute('aria-current', 'page'); }
    button.setAttribute('aria-label', options.label || `Page ${page}`);
    button.addEventListener('click', () => { currentPage = page; renderPosts(); });
    return button;
  };

  const renderPagination = pageCount => {
    if (pageCount <= 1) { pagination.replaceChildren(); return; }
    const nodes = [pageButton('<i class="ti ti-chevron-left" aria-hidden="true"></i>', Math.max(1, currentPage - 1), { disabled: currentPage === 1, label: 'Previous page' })];
    const pages = pageCount <= 6 ? Array.from({ length: pageCount }, (_, i) => i + 1) : [1, 2, 3, null, pageCount];
    pages.forEach(page => {
      if (page === null) { const dots = document.createElement('span'); dots.textContent = '…'; nodes.push(dots); }
      else nodes.push(pageButton(String(page), page));
    });
    nodes.push(pageButton('<i class="ti ti-chevron-right" aria-hidden="true"></i>', Math.min(pageCount, currentPage + 1), { disabled: currentPage === pageCount, label: 'Next page' }));
    pagination.replaceChildren(...nodes);
  };

  const setCategory = category => { selectedCategory = category; currentPage = 1; renderPosts(); };
  clearFilter.addEventListener('click', () => setCategory('All News'));

  const header = document.querySelector('#siteHeader');
  const updateHeader = () => header.classList.toggle('is-sticky', scrollY > 80);
  updateHeader(); addEventListener('scroll', updateHeader, { passive: true });

  const menu = document.querySelector('#mobileMenu');
  const menuToggle = document.querySelector('#menuToggle');
  const setMenu = open => {
    const wasOpen = menu.classList.contains('is-open');
    menu.classList.toggle('is-open', open); menu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a')?.focus(); else if (wasOpen) menuToggle.focus();
  };
  menuToggle.addEventListener('click', () => setMenu(true));
  document.querySelector('.mobile-menu__close').addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  const advisorDialog = document.querySelector('#advisorDialog');
  const articleDialog = document.querySelector('#articleDialog');
  let dialogTrigger = null;
  document.querySelectorAll('[data-open-enquiry]').forEach(button => button.addEventListener('click', () => {
    dialogTrigger = button; setMenu(false); document.querySelector('#advisorMessage').textContent = ''; advisorDialog.showModal();
  }));
  document.querySelector('.advisor-dialog__close').addEventListener('click', () => advisorDialog.close());
  advisorDialog.addEventListener('click', event => { if (event.target === advisorDialog) advisorDialog.close(); });
  advisorDialog.addEventListener('close', () => dialogTrigger?.focus());
  document.querySelector('#advisorForm').addEventListener('submit', event => {
    event.preventDefault(); if (!event.currentTarget.reportValidity()) return;
    document.querySelector('#advisorMessage').textContent = 'Demo complete — no information was sent.'; event.currentTarget.reset();
  });

  const openArticle = (id, trigger = null) => {
    const post = posts.find(item => item.id === id); if (!post) return;
    dialogTrigger = trigger;
    document.querySelector('#articleDialogImage').src = post.image;
    document.querySelector('#articleDialogImage').alt = post.alt;
    document.querySelector('#articleDialogCategory').textContent = post.category;
    document.querySelector('#articleDialogTitle').textContent = post.title;
    document.querySelector('#articleDialogBody').innerHTML = post.body.map(paragraph => `<p>${paragraph}</p>`).join('');
    const source = document.querySelector('#articleDialogSource'); source.href = post.source; source.innerHTML = `${post.sourceLabel} <i class="ti ti-arrow-up-right" aria-hidden="true"></i>`;
    articleDialog.showModal(); history.replaceState(null, '', `#${post.id}`);
  };
  document.querySelector('.article-dialog__close').addEventListener('click', () => articleDialog.close());
  articleDialog.addEventListener('click', event => { if (event.target === articleDialog) articleDialog.close(); });
  articleDialog.addEventListener('close', () => { if (location.hash && posts.some(post => `#${post.id}` === location.hash)) history.replaceState(null, '', `${location.pathname}${location.search}`); dialogTrigger?.focus(); });

  document.querySelectorAll('.newsletter-form').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault(); const input = form.querySelector('input'); const message = form.parentElement.querySelector('.form-message');
    if (!input.checkValidity()) { message.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    message.textContent = 'Demo complete — no information was sent.'; form.reset();
  }));

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (menu.classList.contains('is-open')) setMenu(false);
    if (advisorDialog.open) advisorDialog.close();
    if (articleDialog.open) articleDialog.close();
  });

  renderPosts();
  prepareReveals(document);

  if (!captureMode && !reduceMotion && matchMedia('(pointer:fine)').matches) {
    const heroImage = document.querySelector('.news-hero__image');
    const ctaImage = document.querySelector('.brand-cta__image');
    let frame = false;
    addEventListener('pointermove', event => {
      if (frame || scrollY > 730) return; frame = true;
      requestAnimationFrame(() => { const x = event.clientX / innerWidth - .5; const y = event.clientY / innerHeight - .5; heroImage.style.transform = `translate3d(${x * -8}px,${y * -6}px,0) scale(1.012)`; frame = false; });
    }, { passive: true });
    let scrollFrame = false;
    addEventListener('scroll', () => {
      if (scrollFrame) return; scrollFrame = true;
      requestAnimationFrame(() => { const box = ctaImage.parentElement.getBoundingClientRect(); const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - (box.top + box.height / 2)) / innerHeight)); ctaImage.style.transform = `translate3d(0,${progress * 24}px,0) scale(1.035)`; scrollFrame = false; });
    }, { passive: true });
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => { const box = button.getBoundingClientRect(); button.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .04}px,${(event.clientY - box.top - box.height / 2) * .05}px)`; });
      button.addEventListener('pointerleave', () => button.style.transform = '');
    });
  }

  if (location.hash) {
    const id = location.hash.slice(1); if (posts.some(post => post.id === id)) setTimeout(() => openArticle(id), 80);
  }
})();
