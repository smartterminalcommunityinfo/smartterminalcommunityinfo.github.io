/* Site menu: adds a "Menu" button to the top bar that opens a page list.
   Edit PAGES below to add, rename or reorder pages on every page at once. */
(function () {
  var PAGES = [
    { group: null, items: [['index.html', 'Home']] },
    { group: 'Agreement and fees', items: [
      ['development_agreement_issues.html', 'Development Agreement: Legal Issues'],
      ['impact_fees.html', 'Impact Fees & the 2019 Freeze'],
      ['land_use.html', 'Permitted & Prohibited Uses'],
      ['data_center.html', 'Data Center Exemption']
    ]},
    { group: 'People and companies', items: [
      ['businesses_summary.html', 'Prospective Tenants'],
      ['hercules.html', 'Project Hercules: The Agreements'],
      ['hercules_comparison.html', 'Project Hercules: Daimler Plants'],
      ['key_players.html', 'Key Players'],
      ['ownership_structure.html', 'Ownership Structure'],
      ['political_influence.html', 'Political Contributions']
    ]},
    { group: 'Site and maps', items: [
      ['interactive_map.html', 'Interactive Map'],
      ['maps.html', 'Maps & Site Exhibits'],
      ['superfund.html', 'Groundwater Contamination']
    ]},
    { group: 'Records', items: [
      ['documents.html', 'Key Documents'],
      ['project_timeline.html', 'Project Timeline']
    ]}
  ];
  var LINKS = [
    ['https://givebutter.com/casa-smtx', 'Donate'],
    ['https://linktr.ee/casa.smtx', 'Linktree'],
    ['https://www.instagram.com/casa.smtx', 'Instagram'],
    ['mailto:smartterminalcommunityinfo@gmail.com', 'Email']
  ];

  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var css = [
    '.sm-btn{display:inline-flex;align-items:center;gap:7px;background:transparent;color:#fff;border:1px solid #3b5f8a;border-radius:20px;padding:5px 14px 5px 11px;font:700 .85rem "Segoe UI",system-ui,sans-serif;cursor:pointer;line-height:1.2}',
    '.sm-btn:hover,.sm-btn:focus-visible{background:#2a4a73;border-color:#93c5fd}',
    '.sm-btn svg{width:16px;height:16px;flex:none}',
    '.sm-left{display:flex;align-items:center;gap:12px;flex-wrap:wrap;min-width:0}',
    '.sm-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:10001;opacity:0;transition:opacity .2s}',
    '.sm-panel{position:fixed;top:0;left:0;bottom:0;width:min(320px,86vw);background:#fff;z-index:10002;transform:translateX(-102%);transition:transform .22s ease;display:flex;flex-direction:column;box-shadow:4px 0 24px rgba(0,0,0,.25);font-family:"Segoe UI",system-ui,sans-serif}',
    '.sm-open .sm-backdrop{opacity:1}.sm-open .sm-panel{transform:none}',
    '.sm-head{display:flex;align-items:center;justify-content:space-between;background:#1e3a5f;color:#fff;padding:12px 16px;font-weight:700;font-size:.95rem}',
    '.sm-close{background:none;border:none;color:#fff;font-size:1.6rem;line-height:1;cursor:pointer;padding:0 4px}',
    '.sm-body{overflow-y:auto;padding:8px 0 20px;flex:1}',
    '.sm-group{margin:14px 16px 4px;color:#64748b;font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}',
    '.sm-body a{display:block;padding:10px 16px;color:#1e3a5f;text-decoration:none;font-size:.95rem;border-left:4px solid transparent}',
    '.sm-body a:hover,.sm-body a:focus-visible{background:#f1f5f9;outline:none}',
    '.sm-body a[aria-current=page]{border-left-color:#fbbf24;background:#fef9c3;font-weight:700}',
    '.sm-search{display:block;width:calc(100% - 32px);margin:12px 16px 4px;padding:10px 14px;border:none;border-radius:20px;background:#93c5fd;color:#1e3a5f;font:700 .9rem "Segoe UI",system-ui,sans-serif;cursor:pointer;text-align:left}',
    '.sm-ext{border-top:1px solid #e2e8f0;margin-top:16px}',
    '.sm-ext a{font-size:.88rem;padding:8px 16px}',
    'body.sm-lock{overflow:hidden}',
    /* On phones, the social links move into the menu so the top bar fits on one or two lines */
    '@media (max-width:640px){.site-nav .site-nav-actions .nav-btn{display:none}.site-nav{padding:8px 12px}}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Menu button, placed before the site title/home link
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sm-btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'sm-panel');
  btn.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 3h14M1 8h14M1 13h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>Menu';
  var first = nav.firstElementChild;
  var left = document.createElement('div');
  left.className = 'sm-left';
  nav.insertBefore(left, first);
  left.appendChild(btn);
  if (first && !first.classList.contains('site-nav-actions')) left.appendChild(first);

  // Panel
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var wrap = document.createElement('div');
  wrap.setAttribute('data-pagefind-ignore', '');
  var html = '<div class="sm-backdrop" hidden></div>' +
    '<nav class="sm-panel" id="sm-panel" aria-label="Site pages" hidden>' +
    '<div class="sm-head"><span>Citizens Against TriTexas</span>' +
    '<button type="button" class="sm-close" aria-label="Close menu">&times;</button></div>' +
    '<div class="sm-body">';
  if (document.getElementById('site-search-open')) {
    html += '<button type="button" class="sm-search">Search this site</button>';
  }
  PAGES.forEach(function (g) {
    if (g.group) html += '<div class="sm-group">' + g.group + '</div>';
    g.items.forEach(function (p) {
      var cur = p[0] === here ? ' aria-current="page"' : '';
      html += '<a href="' + p[0] + '"' + cur + '>' + p[1].replace(/&/g, '&amp;') + '</a>';
    });
  });
  html += '<div class="sm-ext"><div class="sm-group">Contact and support</div>';
  LINKS.forEach(function (l) {
    var ext = l[0].indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '';
    html += '<a href="' + l[0] + '"' + ext + '>' + l[1] + '</a>';
  });
  html += '</div></div></nav>';
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  var panel = wrap.querySelector('.sm-panel');
  var backdrop = wrap.querySelector('.sm-backdrop');
  var closeBtn = wrap.querySelector('.sm-close');
  var timer;

  function open() {
    clearTimeout(timer);
    panel.hidden = false;
    backdrop.hidden = false;
    void panel.offsetWidth; // let the slide-in transition run
    wrap.classList.add('sm-open');
    document.body.classList.add('sm-lock');
    btn.setAttribute('aria-expanded', 'true');
    var cur = panel.querySelector('[aria-current=page]');
    (cur || closeBtn).focus();
  }
  function close(returnFocus) {
    wrap.classList.remove('sm-open');
    document.body.classList.remove('sm-lock');
    btn.setAttribute('aria-expanded', 'false');
    timer = setTimeout(function () { panel.hidden = true; backdrop.hidden = true; }, 230);
    if (returnFocus) btn.focus();
  }

  btn.addEventListener('click', function () {
    wrap.classList.contains('sm-open') ? close(true) : open();
  });
  closeBtn.addEventListener('click', function () { close(true); });
  backdrop.addEventListener('click', function () { close(true); });
  document.addEventListener('keydown', function (e) {
    if (!wrap.classList.contains('sm-open')) return;
    if (e.key === 'Escape') { close(true); return; }
    if (e.key === 'Tab') { // keep keyboard focus inside the open menu
      var f = panel.querySelectorAll('a,button');
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  var s = panel.querySelector('.sm-search');
  if (s) s.addEventListener('click', function () {
    close(false);
    document.getElementById('site-search-open').click();
  });
})();
