(() => {
  'use strict';

  const storageKey = 'bpb-amc-performance-data';
  const defaults = {
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
  const form = document.querySelector('#amcDataForm');
  const message = document.querySelector('#cmsMessage');
  const holdingsEditor = document.querySelector('#holdingsEditor');

  const toNumber = value => Number.parseFloat(value) || 0;
  const field = name => form.elements.namedItem(name);
  const readData = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved || typeof saved !== 'object') return defaults;
      return {
        ...defaults,
        ...saved,
        performance: { ...defaults.performance, ...(saved.performance || {}) },
        holdings: Array.isArray(saved.holdings) && saved.holdings.length ? saved.holdings : defaults.holdings
      };
    } catch {
      return defaults;
    }
  };

  const renderHoldingInputs = holdings => {
    holdingsEditor.innerHTML = Array.from({ length: 10 }, (_, index) => {
      const holding = holdings[index] || { name: '', weight: 0 };
      const safeName = String(holding.name).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
      return `<div class="holding-editor-row"><span>${String(index + 1).padStart(2, '0')}</span><label><span class="sr-only">Holding ${index + 1} name</span><input name="holdingName${index}" type="text" value="${safeName}" required></label><label><span class="sr-only">Holding ${index + 1} weight percentage</span><input name="holdingWeight${index}" type="number" inputmode="decimal" step="0.01" value="${toNumber(holding.weight)}" required></label></div>`;
    }).join('');
  };

  const setFormData = data => {
    field('asOf').value = data.asOf || '';
    field('sixMonthsFund').value = toNumber(data.performance.sixMonths?.fund);
    field('sixMonthsBenchmark').value = toNumber(data.performance.sixMonths?.benchmark);
    field('twelveMonthsFund').value = toNumber(data.performance.twelveMonths?.fund);
    field('twelveMonthsBenchmark').value = toNumber(data.performance.twelveMonths?.benchmark);
    field('inceptionFund').value = toNumber(data.performance.inception?.fund);
    field('inceptionBenchmark').value = toNumber(data.performance.inception?.benchmark);
    renderHoldingInputs(data.holdings);
  };

  setFormData(readData());

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = {
      asOf: field('asOf').value.trim(),
      performance: {
        sixMonths: { fund: toNumber(field('sixMonthsFund').value), benchmark: toNumber(field('sixMonthsBenchmark').value) },
        twelveMonths: { fund: toNumber(field('twelveMonthsFund').value), benchmark: toNumber(field('twelveMonthsBenchmark').value) },
        inception: { fund: toNumber(field('inceptionFund').value), benchmark: toNumber(field('inceptionBenchmark').value) }
      },
      holdings: Array.from({ length: 10 }, (_, index) => ({
        name: field(`holdingName${index}`).value.trim(),
        weight: toNumber(field(`holdingWeight${index}`).value)
      }))
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
    message.textContent = 'AMC performance and holdings saved. Refresh the AMC page, or keep it open to see the updates automatically.';
  });
})();
