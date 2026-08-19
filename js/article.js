(() => {
  'use strict';

  document.documentElement.classList.add('js');
  const params = new URLSearchParams(location.search);
  const captureMode = params.has('qa');
  if (captureMode) document.documentElement.classList.add('qa-capture');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const posts = [
    {
      id:'independent-thinking-changing-markets',title:'Independent thinking in changing markets',category:'Market Insights',edition:'BP Bernstein perspective',image:'images/insight-johannesburg.png',alt:'Johannesburg financial district architecture',inlineImage:'images/insight-markets.png',inlineAlt:'Financial district reflected in a glass building',excerpt:'Market conditions change, but a clear view of risk, value and long-term objectives helps investors respond without losing perspective.',
      intro:['Markets rarely move in a straight line. A disciplined investment approach begins with understanding what has changed, what has not, and which decisions genuinely support an investor’s long-term objectives.','Independent thinking means assessing opportunities on their merits, considering both downside risk and potential return, and avoiding decisions driven only by short-term market noise.'],
      sectionTitle:'Separating signal from noise',section:['Periods of rapid price movement can make every headline feel urgent. Yet price, value and risk are different ideas. Research creates the space to test assumptions, understand the forces behind a move and judge whether those forces are likely to endure.','That process is less about predicting every market turn and more about making each decision deliberately. It brings portfolio construction, liquidity needs and time horizon back into the same conversation.'],
      points:['Begin with the investor’s objectives and time horizon','Assess valuation alongside financial and competitive strength','Consider downside risk before potential return','Review decisions as conditions and circumstances change'],
      quote:'The goal is not to react to every market move. It is to keep each decision connected to a clear purpose.',closingTitle:'Perspective before prediction',closing:['A long-term approach does not ignore change. It responds to change with context, evidence and an understanding of how individual decisions fit within the wider portfolio.','That is where independent thinking earns its place: not as certainty about the future, but as a disciplined way to navigate it.'],source:'services.html#equity',sourceLabel:'Explore equity trading'
    },
    {
      id:'planning-disciplined-market-insight',title:'Planning with disciplined market insight',category:'Portfolio Strategy',edition:'Investor perspective',image:'images/equity-trading.png',alt:'Institutional financial market screens',inlineImage:'images/services-architecture.png',inlineAlt:'Contemporary financial-district interior',excerpt:'A sound plan connects market research with portfolio construction, risk tolerance and the outcomes an investor is working toward.',
      intro:['Good portfolio planning is not simply a collection of securities. It is a deliberate process that links research, asset selection, diversification and ongoing review.','The most useful market insight is insight that can be translated into a clear decision while remaining aligned with an investor’s circumstances and objectives.'],sectionTitle:'From insight to construction',section:['Research becomes useful when it informs the role each holding is expected to play. Growth, income, liquidity and resilience can require different instruments and different review periods.','A portfolio should therefore be understood as a connected system rather than a list of isolated ideas.'],points:['Define the purpose of the portfolio','Match asset roles to risk and liquidity needs','Diversify across relevant sources of return','Review the plan as objectives evolve'],quote:'A disciplined plan gives market information a practical purpose.',closingTitle:'A process built to be reviewed',closing:['Planning is not a once-off event. Markets, personal circumstances and financial objectives all change over time.','Regular review helps distinguish between a plan that needs adjustment and a market move that simply needs perspective.'],source:'amc.html#approach',sourceLabel:'Explore our investment approach'
    },
    {
      id:'global-diversification-still-matters',title:'Why global diversification still matters',category:'Offshore Investing',edition:'Global markets',image:'images/insight-offshore.png',alt:'Cape Town coastline and Table Mountain',inlineImage:'images/news-market-hero.png',inlineAlt:'Global market map and financial charts',excerpt:'Offshore exposure can broaden an investor’s opportunity set while reducing reliance on a single market and currency environment.',
      intro:['South African investors operate in a relatively concentrated local market. Global exposure can provide access to a wider range of industries, business models and economic drivers.','Diversification does not remove risk, but it can distribute exposure more thoughtfully across markets, currencies and sources of return.'],sectionTitle:'A broader opportunity set',section:['International markets include sectors and companies that may have limited representation locally. Offshore investing can therefore add more than currency exposure; it can change the underlying composition of a portfolio.','The appropriate allocation still depends on objectives, time horizon, liquidity and the investor’s existing local exposure.'],points:['Access industries beyond the local market','Spread exposure across currencies and regions','Understand the underlying holdings, not only the geography','Keep offshore allocation connected to the total portfolio'],quote:'Global exposure is most useful when it has a defined role in the wider investment plan.',closingTitle:'Diversification with intent',closing:['The case for offshore investing is not based on a single currency view or a short-term market call.','It rests on building a portfolio with access to a wider set of opportunities while understanding the additional risks that global exposure introduces.'],source:'services.html#offshore',sourceLabel:'Explore offshore investments'
    },
    {
      id:'opportunity-in-changing-markets',title:'Understanding opportunity in changing markets',category:'Market Insights',edition:'Market intelligence',image:'images/insight-markets.png',alt:'Financial district reflected in a glass building',inlineImage:'images/equity-trading.png',inlineAlt:'Institutional market-monitoring screens',excerpt:'Volatility can obscure the difference between price movement and lasting value. Research helps investors separate the two.',
      intro:['Changing markets create both uncertainty and opportunity. The important distinction is whether a price move reflects a durable change in fundamentals or a temporary shift in sentiment.','A research-led approach examines valuation, balance-sheet strength, competitive position and the broader economic environment before capital is committed.'],sectionTitle:'Price is only the starting point',section:['A lower price does not automatically mean better value, just as a rising price does not by itself confirm improving quality. Context matters.','Understanding the business, the market structure and the assumptions reflected in the price helps create that context.'],points:['Test the investment case against current evidence','Examine liquidity and balance-sheet resilience','Distinguish cyclical pressure from structural change','Size exposure with the downside in mind'],quote:'Opportunity becomes clearer when price is considered alongside quality, risk and time.',closingTitle:'Research creates optionality',closing:['Markets will continue to change. A repeatable research process helps investors compare opportunities on consistent terms.','That does not eliminate uncertainty, but it makes uncertainty more visible and therefore more manageable.'],source:'services.html#equity',sourceLabel:'Explore our market services'
    },
    {
      id:'role-of-the-jse',title:'The role of the JSE in South Africa’s capital markets',category:'Investor Education',edition:'Educational resource',image:'images/services-hero-architecture.png',alt:'Modern South African financial district architecture',inlineImage:'images/insight-johannesburg.png',inlineAlt:'Johannesburg financial district',excerpt:'The exchange connects organisations seeking capital with investors and provides an orderly market for listed securities.',
      intro:['The Johannesburg Stock Exchange supports capital formation by providing a regulated venue where companies can issue securities and investors can trade listed shares.','It also establishes market rules and structures intended to support orderly trading, transparency and access to market information.'],sectionTitle:'Connecting capital and opportunity',section:['Public markets allow organisations to raise capital from a broad investor base while giving investors access to ownership in listed companies.','The exchange provides the market infrastructure; brokers and other authorised participants help investors access that infrastructure.'],points:['A regulated venue for listed securities','Rules designed to support orderly markets','Published information that supports price discovery','Access through authorised market participants'],quote:'An exchange is both a marketplace and a framework for transparent participation.',closingTitle:'Why market structure matters',closing:['Understanding how securities are issued, traded and settled helps investors interpret the transactions they see in an account.','It also explains why governance, disclosure and authorised access are central to a functioning capital market.'],source:'https://www.bpbernstein.co.za/educational/',sourceLabel:'Read BP Bernstein educational resources'
    },
    {
      id:'primary-secondary-equity-markets',title:'Primary and secondary equity markets explained',category:'Investor Education',edition:'Educational resource',image:'images/services-architecture.png',alt:'Glass and steel financial district atrium',inlineImage:'images/services-hero-architecture.png',inlineAlt:'Modern financial-district architecture',excerpt:'New securities raise capital in the primary market; existing securities change hands between investors in the secondary market.',
      intro:['In a primary-market transaction, an issuer offers new shares and receives the capital raised. This capital can help fund business development and expansion.','In the secondary market, investors buy and sell securities that have already been issued. The proceeds belong to the seller rather than the original issuer.'],sectionTitle:'Two connected parts of one market',section:['Primary issuance creates securities and channels capital to the issuer. Secondary trading provides the mechanism through which existing holders can buy and sell those securities.','An active secondary market can support liquidity and price discovery, which in turn can influence the appeal of future primary issuance.'],points:['Primary transactions involve newly issued securities','Secondary transactions occur between market participants','Market prices reflect available supply and demand','Liquidity can vary significantly between securities'],quote:'Primary markets create the security; secondary markets create ongoing access.',closingTitle:'Reading the transaction correctly',closing:['Knowing which market a transaction belongs to clarifies who receives the proceeds and what the transaction accomplishes.','This distinction is a useful foundation for understanding public capital markets.'],source:'https://www.bpbernstein.co.za/educational/',sourceLabel:'Read BP Bernstein educational resources'
    },
    {
      id:'read-a-balance-sheet',title:'Reading a balance sheet with greater confidence',category:'Investor Education',edition:'Financial definitions',image:'images/legal-market-scales-hero.png',alt:'Market data and financial balance scales',inlineImage:'images/insight-markets.png',inlineAlt:'Financial district and market reflections',excerpt:'A balance sheet offers a point-in-time view of what a company owns, what it owes and the equity attributable to shareholders.',
      intro:['A balance sheet records assets and liabilities at a particular date. The difference between them represents shareholders’ equity, also referred to as net assets or book value.','It is most useful when considered alongside the income statement and cash-flow statement, which provide different views of operating performance and liquidity.'],sectionTitle:'A snapshot with important context',section:['Assets can differ in quality, liquidity and the assumptions used to measure them. Liabilities can differ in maturity, cost and priority.','The headline totals are therefore a starting point. Notes to the financial statements provide important detail about what sits behind them.'],points:['Compare current assets with near-term obligations','Review the composition and maturity of debt','Consider how assets are valued','Read the notes alongside the primary statements'],quote:'A balance sheet is most informative when the composition of each total is understood.',closingTitle:'Use more than one statement',closing:['Profitability, cash generation and financial position answer different questions. No single statement tells the full story.','Reading them together helps form a more complete view of a company’s financial resilience.'],source:'https://www.bpbernstein.co.za/educational/',sourceLabel:'Read BP Bernstein educational resources'
    },
    {
      id:'how-market-indexes-work',title:'How market indexes help investors measure performance',category:'Market Insights',edition:'Market foundations',image:'images/disclaimer-market-hero.png',alt:'World market data and a rising chart',inlineImage:'images/news-market-hero.png',inlineAlt:'Global financial market data visualisation',excerpt:'Indexes summarise the movement of a defined group of shares and can provide a useful benchmark for market and portfolio performance.',
      intro:['A market index is a statistical measure designed to reflect the collective behaviour of a selected group of securities. The percentage change is generally more useful than the index level on its own.','Indexes can be used as performance benchmarks, as references for index-tracking funds and as indicators of movement within a market or sector.'],sectionTitle:'What an index represents',section:['Every index follows a methodology that determines which securities are included and how much influence each one has.','Two indexes covering the same market can therefore produce different results because of differences in constituents, weighting and rebalancing.'],points:['Understand the index universe and methodology','Compare performance over the same period','Consider dividends and fees where relevant','Use a benchmark that matches the portfolio’s purpose'],quote:'A benchmark is useful only when its composition is relevant to what is being measured.',closingTitle:'Measurement needs context',closing:['An index can describe a market segment, but it does not describe an investor’s objectives or constraints.','Benchmark comparisons are most meaningful when the risks, exposures and time periods are genuinely comparable.'],source:'https://www.bpbernstein.co.za/educational/',sourceLabel:'Read BP Bernstein educational resources'
    },
    {
      id:'preference-shares-income-risk',title:'Preference shares: income, structure and risk',category:'Portfolio Strategy',edition:'Investment products',image:'images/amc-market-hero.png',alt:'Active investment strategy and market data',inlineImage:'images/equity-trading.png',inlineAlt:'Market data displayed on institutional screens',excerpt:'Preference shares can contribute an income-oriented component to a portfolio, but their terms and risks require careful assessment.',
      intro:['Preference shares have characteristics of both equity and income instruments. Their dividend terms, ranking and sensitivity to market conditions can differ materially between issues.','They should therefore be assessed within the context of an investor’s broader portfolio, liquidity needs and tolerance for risk.'],sectionTitle:'The terms define the instrument',section:['Dividend mechanics, redemption provisions, ranking and convertibility can materially affect how a preference share behaves.','Credit quality and market liquidity also matter, particularly when an investor may need to exit before any stated redemption event.'],points:['Read the specific terms of the issue','Assess issuer and credit risk','Consider liquidity in the secondary market','Understand the role of the income within the portfolio'],quote:'The label is not enough; the specific rights and risks of each issue matter.',closingTitle:'Income is only one dimension',closing:['Expected income should be assessed alongside capital risk, liquidity and the issuer’s ability to meet its obligations.','A structured comparison helps determine whether the instrument suits the intended portfolio role.'],source:'https://www.bpbernstein.co.za/educational/',sourceLabel:'Read BP Bernstein educational resources'
    },
    {
      id:'exchange-traded-funds',title:'What exchange-traded funds offer investors',category:'Trading',edition:'Investment products',image:'images/team-adviser-03.png',alt:'BP Bernstein investment adviser',inlineImage:'images/news-market-hero.png',inlineAlt:'Global markets and financial data',excerpt:'ETFs can provide transparent, tradeable exposure to a basket of securities and may support cost-efficient diversification.',
      intro:['An exchange-traded fund is listed and traded during market hours. Its portfolio is designed to track a defined index, sector or investment strategy.','ETFs can help investors access diversified market exposure in a single security, although investors should still consider the underlying holdings, costs, liquidity and investment objective.'],sectionTitle:'Access through one listed security',section:['The convenience of an ETF comes from packaging a defined portfolio into a tradeable instrument. The exposure may be broad or highly focused.','Understanding the tracked index or strategy is essential because that methodology determines the actual portfolio an investor receives.'],points:['Review the underlying index or strategy','Compare total costs, not only the headline fee','Consider trading liquidity and bid-offer spreads','Check how the exposure fits the wider portfolio'],quote:'An ETF simplifies access, but it does not remove the need to understand the exposure.',closingTitle:'Transparent does not mean identical',closing:['ETFs can differ in methodology, replication approach, costs and risk even when their names sound similar.','Careful comparison helps ensure that the chosen fund matches the intended investment objective.'],source:'services.html#etf',sourceLabel:'Explore ETF services'
    },
    {
      id:'offshore-exposure-rand',title:'Managing offshore exposure in a changing rand environment',category:'Offshore Investing',edition:'Global markets',image:'images/team-adviser-02.png',alt:'BP Bernstein adviser discussing a portfolio',inlineImage:'images/insight-offshore.png',inlineAlt:'Cape Town coastline and Table Mountain',excerpt:'Currency movements can affect both the value and risk profile of offshore investments for South African investors.',
      intro:['Offshore exposure introduces access to a wider set of markets and currencies. It can also create additional volatility when foreign asset prices are translated back into rand.','The appropriate allocation depends on an investor’s objectives, time horizon, liquidity requirements and existing local exposure.'],sectionTitle:'Two sources of movement',section:['A rand-based investor experiences both the return of the underlying foreign asset and the movement of the exchange rate. Either can reinforce or offset the other.','That interaction is one reason short-term currency moves should not be considered in isolation from the purpose of the offshore allocation.'],points:['Separate asset performance from currency translation','Understand the currencies behind the holdings','Align the allocation with future spending needs','Review local and offshore exposure together'],quote:'Currency is part of the offshore result, but it is not the entire offshore investment case.',closingTitle:'Keep the total portfolio in view',closing:['Offshore exposure can add valuable diversification, but its size and structure should make sense within the investor’s full financial position.','A clear role makes it easier to evaluate the allocation when currency markets become volatile.'],source:'services.html#offshore',sourceLabel:'Explore offshore investments'
    },
    {
      id:'disciplined-investor-security',title:'Security starts with disciplined investor habits',category:'Company Updates',edition:'Client protection',image:'images/team-amy-schultz.png',alt:'BP Bernstein client services representative',inlineImage:'images/services-architecture.png',inlineAlt:'Secure contemporary financial-services environment',excerpt:'Keeping credentials private, checking unexpected messages and verifying instructions remain important safeguards against financial fraud.',
      intro:['Protecting an investment account is a shared responsibility. Passwords and login details should remain private, suspicious messages should be checked carefully, and unusual requests should be verified directly.','BP Bernstein’s account-verification processes are designed to support secure dealing and reduce the risk of unauthorised instructions.'],sectionTitle:'Pause, check and verify',section:['Fraud attempts often create urgency or direct clients to unfamiliar contact details. A short pause can make unusual language, changed payment instructions or unexpected links easier to identify.','Contacting BP Bernstein through a known channel provides a direct way to verify an instruction before acting.'],points:['Never share passwords or one-time security codes','Check the sender and destination of unexpected messages','Verify changed payment details independently','Report suspicious activity promptly'],quote:'A verification step is small; the protection it provides can be significant.',closingTitle:'Make security repeatable',closing:['Strong habits work best when they are followed consistently, not only when a message already looks suspicious.','Keeping contact details current and using trusted channels helps BP Bernstein and clients work together to protect account activity.'],source:'https://www.bpbernstein.co.za/',sourceLabel:'Visit BP Bernstein'
    }
  ];

  const requestedId = params.get('article');
  const post = posts.find(item => item.id === requestedId) || posts[0];
  if (requestedId !== post.id && !captureMode) history.replaceState(null, '', `article.html?article=${post.id}`);
  const currentIndex = posts.indexOf(post);
  const pageUrl = `${location.origin}${location.pathname}?article=${post.id}`;

  const wordCount = [post.title,post.excerpt,...post.intro,...post.section,...post.points,post.quote,...post.closing].join(' ').trim().split(/\s+/).length;
  const readingMinutes = Math.max(3, Math.ceil(wordCount / 190));
  const $ = selector => document.querySelector(selector);
  const articleUrl = id => `article.html?article=${encodeURIComponent(id)}`;

  document.title = `${post.title} | BP Bernstein`;
  $('meta[name="description"]').content = post.excerpt;
  $('meta[property="og:title"]').content = post.title;
  $('meta[property="og:description"]').content = post.excerpt;
  $('meta[property="og:image"]').content = new URL(post.image, location.href).href;
  $('link[rel="canonical"]').href = pageUrl;
  $('#heroImage').src = post.image; $('#heroImage').alt = post.alt;
  $('#breadcrumbTitle').textContent = post.title;
  $('#articleCategory').textContent = post.category;
  $('#articleTitle').textContent = post.title;
  $('#articleSummary').textContent = post.excerpt;
  $('#articleEdition').textContent = post.edition;
  $('#readingTime').textContent = `${readingMinutes} min read`;

  $('#articleBody').innerHTML = `
    <p class="lead">${post.intro[0]}</p>
    <p>${post.intro[1]}</p>
    <figure data-reveal><img src="${post.inlineImage}" alt="${post.inlineAlt}" width="1200" height="720" loading="lazy"><figcaption>${post.inlineAlt}. BP Bernstein market perspective.</figcaption></figure>
    <h2 data-reveal>${post.sectionTitle}</h2>
    ${post.section.map(paragraph => `<p>${paragraph}</p>`).join('')}
    <ul>${post.points.map(point => `<li>${point}</li>`).join('')}</ul>
    <blockquote class="pull-quote" data-reveal>${post.quote}</blockquote>
    <h2 data-reveal>${post.closingTitle}</h2>
    ${post.closing.map(paragraph => `<p>${paragraph}</p>`).join('')}
    <p><a href="${post.source}"${post.source.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${post.sourceLabel} <i class="ti ti-arrow-narrow-right" aria-hidden="true"></i></a></p>`;

  const previous = posts[(currentIndex - 1 + posts.length) % posts.length];
  const next = posts[(currentIndex + 1) % posts.length];
  $('#articlePager').innerHTML = `<a href="${articleUrl(previous.id)}"><i class="ti ti-arrow-left" aria-hidden="true"></i><small>Previous article</small><strong>${previous.title}</strong></a><a href="${articleUrl(next.id)}"><small>Next article</small><strong>${next.title}</strong><i class="ti ti-arrow-right" aria-hidden="true"></i></a>`;

  const related = [...posts.filter(item => item.id !== post.id && item.category === post.category),...posts.filter(item => item.id !== post.id && item.category !== post.category)].slice(0,4);
  $('#relatedCompact').innerHTML = related.map(item => `<a class="related-compact__item" href="${articleUrl(item.id)}"><span><img src="${item.image}" alt="${item.alt}" width="196" height="144" loading="lazy"></span><div><strong>${item.title}</strong><small>${item.category}</small></div></a>`).join('');
  $('#relatedGrid').innerHTML = related.slice(0,3).map((item,index) => `<article class="related-card" data-delay="${index * 90}"><a href="${articleUrl(item.id)}"><span class="related-card__image"><img src="${item.image}" alt="${item.alt}" width="720" height="440" loading="lazy"></span><small>${item.category}</small><h3>${item.title}</h3><b>Read more <i class="ti ti-arrow-narrow-right" aria-hidden="true"></i></b></a></article>`).join('');

  const encodedUrl = encodeURIComponent(pageUrl); const encodedTitle = encodeURIComponent(post.title);
  $('#shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  $('#shareX').href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  $('#shareLinkedIn').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  $('#shareEmail').href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${post.excerpt}\n\n${pageUrl}`)}`;
  $('#copyLink').addEventListener('click', async () => {
    const status = $('#copyStatus');
    try { await navigator.clipboard.writeText(pageUrl); status.textContent = 'Link copied'; }
    catch { const input = document.createElement('input'); input.value = pageUrl; document.body.append(input); input.select(); document.execCommand('copy'); input.remove(); status.textContent = 'Link copied'; }
    setTimeout(() => status.textContent = '', 1500);
  });

  const revealObserver = !captureMode && !reduceMotion && 'IntersectionObserver' in window ? new IntersectionObserver((entries, observer) => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    setTimeout(() => entry.target.classList.add('is-visible'), delay);
    observer.unobserve(entry.target);
  }), { threshold:.14, rootMargin:'0px 0px -5% 0px' }) : null;
  document.querySelectorAll('[data-reveal],.related-card').forEach(element => revealObserver ? revealObserver.observe(element) : element.classList.add('is-visible'));

  const header = $('#siteHeader');
  const progress = $('#readingProgress');
  const scrollTopButton = $('#scrollTop');
  let scrollFrame = false;
  const updateScroll = () => {
    if (scrollFrame) return; scrollFrame = true;
    requestAnimationFrame(() => {
      header.classList.toggle('is-sticky', scrollY > 80);
      const start = $('#articleBody').getBoundingClientRect().top + scrollY;
      const finish = $('#articlePager').getBoundingClientRect().bottom + scrollY - innerHeight * .55;
      const value = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, finish - start)));
      progress.style.transform = `scaleX(${value})`;
      scrollTopButton.classList.toggle('is-visible', value > .35);
      scrollFrame = false;
    });
  };
  updateScroll(); addEventListener('scroll', updateScroll, { passive:true }); addEventListener('resize', updateScroll);
  scrollTopButton.addEventListener('click', () => scrollTo({ top:0, behavior:reduceMotion ? 'auto' : 'smooth' }));

  const menu = $('#mobileMenu'); const menuToggle = $('#menuToggle');
  const setMenu = open => { const wasOpen = menu.classList.contains('is-open'); menu.classList.toggle('is-open',open); menu.setAttribute('aria-hidden',String(!open)); menuToggle.setAttribute('aria-expanded',String(open)); document.body.classList.toggle('menu-open',open); if(open) menu.querySelector('a')?.focus(); else if(wasOpen) menuToggle.focus(); };
  menuToggle.addEventListener('click',() => setMenu(true)); $('.mobile-menu__close').addEventListener('click',() => setMenu(false)); menu.querySelectorAll('a').forEach(link => link.addEventListener('click',() => setMenu(false)));

  const advisorDialog = $('#advisorDialog'); let dialogTrigger = null;
  document.querySelectorAll('[data-open-enquiry]').forEach(button => button.addEventListener('click',() => { dialogTrigger = button; setMenu(false); $('#advisorMessage').textContent=''; advisorDialog.showModal(); }));
  $('.advisor-dialog__close').addEventListener('click',() => advisorDialog.close()); advisorDialog.addEventListener('click',event => { if(event.target === advisorDialog) advisorDialog.close(); }); advisorDialog.addEventListener('close',() => dialogTrigger?.focus());
  $('#advisorForm').addEventListener('submit',event => { event.preventDefault(); if(!event.currentTarget.reportValidity()) return; $('#advisorMessage').textContent='Demo complete — no information was sent.'; event.currentTarget.reset(); });
  document.querySelectorAll('.newsletter-form').forEach(form => form.addEventListener('submit',event => { event.preventDefault(); const input=form.querySelector('input'); const message=form.parentElement.querySelector('.form-message'); if(!input.checkValidity()){message.textContent='Please enter a valid email address.';input.focus();return;} message.textContent='Demo complete — no information was sent.';form.reset(); }));
  document.addEventListener('keydown',event => { if(event.key !== 'Escape') return; if(menu.classList.contains('is-open')) setMenu(false); if(advisorDialog.open) advisorDialog.close(); });

  if (!captureMode && !reduceMotion && matchMedia('(pointer:fine)').matches) {
    const heroImage = $('#heroImage'); let pointerFrame = false;
    addEventListener('pointermove',event => { if(pointerFrame || scrollY > 720) return; pointerFrame=true; requestAnimationFrame(() => { const x=event.clientX/innerWidth-.5; const y=event.clientY/innerHeight-.5; heroImage.style.transform=`translate3d(${x*-8}px,${y*-5}px,0) scale(1.014)`; pointerFrame=false; }); },{passive:true});
    document.querySelectorAll('.magnetic').forEach(button => { button.addEventListener('pointermove',event => { const box=button.getBoundingClientRect(); button.style.transform=`translate(${(event.clientX-box.left-box.width/2)*.04}px,${(event.clientY-box.top-box.height/2)*.05}px)`; }); button.addEventListener('pointerleave',() => button.style.transform=''); });
  }
})();
