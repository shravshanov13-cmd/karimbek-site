/* Karimbek — шапка и подвал, три языка, анимации при прокрутке */
(function () {
  'use strict';

  var D = document;
  var root = D.documentElement;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DICT = window.KB_I18N || {};
  var LANGS = ['uz', 'ru', 'en'];

  /* ---- Контакты ресторана: меняются в одном месте ---- */
  var TEL = '+998662377739';
  var TEL_TXT = '+998 66 237 77 39';
  var TEL2 = '+998902843030';
  var TEL2_TXT = '+998 90 284 30 30';
  var MAP = 'https://yandex.uz/maps/org/karimbek/234049585658/';
  var IG = 'https://www.instagram.com/karimbek_restaurant_samarqand/';
  /* Куда ведёт кнопка «Забронировать стол». Пока — блок с телефоном на странице контактов. */
  var BOOK = 'contacts.html#booking';
  var OPEN_H = 9, CLOSE_H = 23;

  var NAV = [
    ['home', 'index.html', 'nav.home', 'Главная'],
    ['restaurant', 'restaurant.html', 'nav.restaurant', 'Ресторан'],
    ['menu', 'menu.html', 'nav.menu', 'Меню'],
    ['evenings', 'evenings.html', 'nav.evenings', 'Вечера'],
    ['banquets', 'banquets.html', 'nav.banquets', 'Банкеты'],
    ['contacts', 'contacts.html', 'nav.contacts', 'Контакты']
  ];

  /* Русские строки, которые подставляет скрипт (остальной русский текст лежит прямо в HTML) */
  var RU = {
    'status.open': 'Сейчас открыто — до 23:00',
    'status.closed': 'Сейчас закрыто — откроемся в 09:00'
  };

  var ICON = {
    arrow: '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5"/></svg>',
    phone: '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 3h3.2l1.5 4-2 1.3a10.5 10.5 0 0 0 5 5l1.3-2 4 1.5V16a1.6 1.6 0 0 1-1.7 1.6A14.4 14.4 0 0 1 2.4 4.7 1.6 1.6 0 0 1 4 3Z"/></svg>',
    pin: '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M10 18s6-5.2 6-10A6 6 0 0 0 4 8c0 4.8 6 10 6 10Z"/><circle cx="10" cy="8" r="2.2"/></svg>'
  };

  var page = D.body.getAttribute('data-page') || 'home';

  /* ---------- Шапка, меню, подвал ---------- */

  function navLinks(withIndex) {
    return NAV.map(function (n, i) {
      return '<a href="' + n[1] + '"' + (n[0] === page ? ' aria-current="page"' : '') +
        (withIndex ? ' style="--i:' + i + '"' : '') + ' data-i18n="' + n[2] + '">' + n[3] + '</a>';
    }).join('');
  }

  function buildLayout() {
    var head = D.getElementById('site-header');
    if (head) {
      head.outerHTML =
        '<a class="skip" href="#main" data-i18n="skip">Перейти к содержимому</a>' +
        '<div class="progress" aria-hidden="true"></div>' +
        '<header class="hdr"><div class="hdr__in wrap">' +
          '<a class="brand" href="index.html" aria-label="Karimbek">' +
            '<img src="assets/img/logo.jpg" alt="" width="42" height="42"><span class="brand__name">Karimbek</span></a>' +
          '<nav class="nav" aria-label="Karimbek">' + navLinks(false) + '</nav>' +
          '<div class="hdr__tools">' +
            '<div class="lang" role="group" aria-label="Til / Язык / Language">' +
              '<button type="button" data-lang="uz" aria-pressed="false" aria-label="O‘zbekcha">UZ</button>' +
              '<button type="button" data-lang="ru" aria-pressed="false" aria-label="Русский">RU</button>' +
              '<button type="button" data-lang="en" aria-pressed="false" aria-label="English">EN</button>' +
            '</div>' +
            '<a class="btn btn--gold hdr__cta" href="' + BOOK + '" data-i18n="cta.book">Забронировать стол</a>' +
            '<button class="burger" type="button" aria-expanded="false" aria-controls="menu" aria-label="Menu"><i></i><i></i></button>' +
          '</div>' +
        '</div></header>' +
        '<div class="menu" id="menu"><div class="pattern" aria-hidden="true"></div>' +
          '<nav class="menu__nav" aria-label="Karimbek">' + navLinks(true) + '</nav>' +
          '<div class="menu__foot">' +
            '<a class="btn btn--gold" href="tel:' + TEL + '">' + ICON.phone + '<span>' + TEL_TXT + '</span></a>' +
            '<span data-i18n="fact.address.v">Самарканд, ул. Гагарина, 194</span>' +
            '<span data-i18n="fact.hours.v">Ежедневно, 09:00–23:00</span>' +
          '</div>' +
        '</div>';
    }

    var foot = D.getElementById('site-footer');
    if (foot) {
      foot.outerHTML =
        '<footer class="ftr"><div class="wrap">' +
          '<div class="ftr__grid">' +
            '<div class="ftr__brand">' +
              '<img src="assets/img/logo.jpg" alt="Karimbek" width="76" height="76" loading="lazy">' +
              '<p class="ftr__tag" data-i18n="foot.tag">Каримбек — красота в совершенстве</p>' +
            '</div>' +
            '<nav class="ftr__col" aria-label="Karimbek">' + navLinks(false) + '</nav>' +
            '<div class="ftr__col">' +
              '<span data-i18n="fact.address.v">Самарканд, ул. Гагарина, 194</span>' +
              '<span data-i18n="fact.hours.v">Ежедневно, 09:00–23:00</span>' +
              '<a href="tel:' + TEL + '">' + TEL_TXT + '</a>' +
              '<a href="tel:' + TEL2 + '">' + TEL2_TXT + '</a>' +
              '<a href="' + IG + '" target="_blank" rel="noopener">Instagram</a>' +
            '</div>' +
          '</div>' +
          '<p class="ftr__fine" data-i18n="foot.rights">© 2026 Ресторан «Каримбек», Самарканд</p>' +
        '</div></footer>' +
        '<div class="dock">' +
          '<a class="btn btn--gold" href="tel:' + TEL + '">' + ICON.phone + '<span data-i18n="cta.call">Позвонить</span></a>' +
          '<a class="btn btn--ghost" href="' + MAP + '" target="_blank" rel="noopener">' + ICON.pin + '<span data-i18n="cta.route">Маршрут</span></a>' +
        '</div>';
    }
  }

  /* ---------- Украшения, которые рисует скрипт ---------- */

  function octagram(R) {
    var r = R * 0.7654, pts = [];
    for (var k = 0; k < 16; k++) {
      var a = k * Math.PI / 8, q = k % 2 ? r : R;
      pts.push((q * Math.cos(a)).toFixed(2) + ' ' + (q * Math.sin(a)).toFixed(2));
    }
    return 'M' + pts.join('L') + 'Z';
  }

  function buildDecor() {
    D.querySelectorAll('svg[data-rosette]').forEach(function (svg) {
      svg.setAttribute('viewBox', '-100 -100 200 200');
      svg.innerHTML =
        '<g fill="none" stroke="currentColor" stroke-width=".45">' +
        '<path d="' + octagram(98) + '"/><path d="' + octagram(98) + '" transform="rotate(22.5)" opacity=".5"/>' +
        '<circle r="75"/><path d="' + octagram(72) + '" transform="rotate(22.5)"/>' +
        '<path d="' + octagram(52) + '"/><circle r="39"/>' +
        '<path d="' + octagram(36) + '" transform="rotate(22.5)"/></g>';
    });

    D.querySelectorAll('[data-eq]').forEach(function (eq) {
      var n = parseInt(eq.getAttribute('data-eq'), 10) || 12, html = '';
      for (var i = 0; i < n; i++) {
        html += '<i style="--d:' + (620 + (i * 173) % 640) + 'ms;--l:-' + ((i * 211) % 900) + 'ms"></i>';
      }
      eq.innerHTML = html;
    });

    D.querySelectorAll('.go:empty').forEach(function (g) { g.innerHTML = ICON.arrow; });

    /* лента: повторяем набор слов, чтобы хватило на всю ширину */
    D.querySelectorAll('.band__row').forEach(function (row) {
      var set = row.querySelector('.band__set');
      if (!set) return;
      for (var i = 0; i < 3; i++) row.appendChild(set.cloneNode(true));
    });

    D.querySelectorAll('[data-stagger]').forEach(function (box) {
      Array.prototype.forEach.call(box.children, function (c, i) { c.style.setProperty('--i', i); });
    });

    D.querySelectorAll('[data-book]').forEach(function (a) { a.setAttribute('href', BOOK); });
  }

  /* ---------- Языки ---------- */

  var nodes = [], attrs = [], lang = 'ru';

  function pickLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (LANGS.indexOf(q) > -1) return q;
    try {
      var s = localStorage.getItem('kb_lang');
      if (LANGS.indexOf(s) > -1) return s;
    } catch (e) {}
    var n = (navigator.language || 'ru').toLowerCase().slice(0, 2);
    return n === 'uz' ? 'uz' : n === 'ru' ? 'ru' : 'en';
  }

  function tr(key) {
    if (lang !== 'ru' && DICT[lang] && DICT[lang][key] != null) return DICT[lang][key];
    return RU[key];
  }

  function collect() {
    D.querySelectorAll('[data-i18n]').forEach(function (el) {
      nodes.push({ el: el, key: el.getAttribute('data-i18n'), ru: el.innerHTML });
    });
    D.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      attrs.push({ el: el, name: 'alt', key: el.getAttribute('data-i18n-alt'), ru: el.getAttribute('alt') });
    });
  }

  function splitWords(el) {
    var i = 0;
    el.innerHTML = el.innerHTML.split(/(<br\s*\/?>)/i).map(function (part) {
      if (/^<br/i.test(part)) return '<br>';
      return part.split(/\s+/).filter(Boolean).map(function (w) {
        return '<span class="w"><span style="--i:' + (i++) + '">' + w + '</span></span>';
      }).join(' ');
    }).join('');
  }

  function scrubWords(el) {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(function (w) {
      return '<span class="sw">' + w + '</span>';
    }).join(' ');
    el._n = -1;
  }

  function dress(el) {
    if (el.hasAttribute('data-split')) splitWords(el);
    if (el.hasAttribute('data-scrub')) scrubWords(el);
  }

  function applyLang(next, save) {
    lang = next;
    var dict = DICT[lang] || {};
    nodes.forEach(function (n) {
      var v = lang === 'ru' ? n.ru : dict[n.key];
      if (v == null) v = n.ru;
      if (n.el.tagName === 'TITLE') { D.title = v.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, ' '); return; }
      n.el.innerHTML = v;
      dress(n.el);
    });
    attrs.forEach(function (a) {
      var v = lang === 'ru' ? a.ru : dict[a.key];
      a.el.setAttribute(a.name, v == null ? a.ru : v);
    });
    root.lang = lang;
    D.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    setStatus();
    if (save) {
      try { localStorage.setItem('kb_lang', lang); } catch (e) {}
      /* язык выбран вручную — убираем ?lang= из адреса, чтобы он не перебивал выбор */
      try {
        var u = new URL(location.href);
        if (u.searchParams.has('lang')) { u.searchParams.delete('lang'); history.replaceState(null, '', u); }
      } catch (e) {}
    }
    requestUpdate();
  }

  /* ---------- «Сейчас открыто» по времени Самарканда (UTC+5) ---------- */

  function setStatus() {
    var h = (new Date().getUTCHours() + 5) % 24;
    var open = h >= OPEN_H && h < CLOSE_H;
    D.querySelectorAll('[data-status]').forEach(function (el) {
      el.classList.toggle('is-closed', !open);
      var t = el.querySelector('[data-status-text]');
      if (t) t.textContent = tr(open ? 'status.open' : 'status.closed');
    });
  }

  /* ---------- Появление при прокрутке ---------- */

  function watchReveals() {
    var els = D.querySelectorAll('[data-reveal],[data-split]');
    if (RM || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    els.forEach(function (el) { io.observe(el); });

    /* свет и эквалайзер работают, только пока они на экране */
    var live = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('is-live', e.isIntersecting); });
    }, { rootMargin: '80px' });
    D.querySelectorAll('[data-live]').forEach(function (el) { live.observe(el); });
  }

  /* ---------- Эффекты, привязанные к прокрутке ---------- */

  var fx = [], bar, hdr, dock, ticking = false;

  function setupScroll() {
    bar = D.querySelector('.progress');
    hdr = D.querySelector('.hdr');
    dock = D.querySelector('.dock');
    D.querySelectorAll('[data-progress],[data-parallax],[data-spin],[data-scrub]').forEach(function (el) {
      fx.push({
        el: el,
        prog: el.hasAttribute('data-progress'),
        par: parseFloat(el.getAttribute('data-parallax')) || 0,
        spin: el.hasAttribute('data-spin') ? (parseFloat(el.getAttribute('data-spin')) || 0.05) : 0,
        scrub: el.hasAttribute('data-scrub')
      });
    });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  function update() {
    ticking = false;
    var y = window.scrollY || 0, vh = window.innerHeight;
    var max = root.scrollHeight - vh;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ')';
    if (hdr) hdr.classList.toggle('is-stuck', y > 16);
    if (dock) dock.classList.toggle('is-on', y > vh * 0.45);

    for (var k = 0; k < fx.length; k++) {
      var f = fx[k], r = f.el.getBoundingClientRect();
      if (r.bottom < -240 || r.top > vh + 240) continue;
      var p = (vh - r.top) / (vh + r.height);
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      if (f.prog) f.el.style.setProperty('--p', p.toFixed(4));
      if (RM) { if (f.scrub) lightWords(f.el, 1); continue; }
      if (f.par) f.el.style.translate = '0 ' + ((p - 0.5) * f.par).toFixed(1) + 'px';
      if (f.spin) f.el.style.rotate = (y * f.spin).toFixed(2) + 'deg';
      if (f.scrub) lightWords(f.el, (vh * 0.86 - r.top) / (r.height + vh * 0.36));
    }
  }

  function lightWords(el, q) {
    var words = el.children, n = Math.round(Math.max(0, Math.min(1, q)) * words.length);
    if (n === el._n) return;
    el._n = n;
    for (var i = 0; i < words.length; i++) words[i].classList.toggle('on', i < n);
  }

  /* ---------- Меню на телефоне ---------- */

  function setupMenu() {
    var menu = D.getElementById('menu'), burger = D.querySelector('.burger');
    if (!menu || !burger) return;
    function set(open) {
      menu.classList.toggle('is-open', open);
      root.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.inert = !open;
    }
    set(false);
    burger.addEventListener('click', function () { set(!menu.classList.contains('is-open')); });
    D.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1080) set(false); });
  }

  /* ---------- Разделы меню: подсветка активного чипа ---------- */

  function setupMenuNav() {
    var box = D.querySelector('.mnav__in');
    if (!box || !('IntersectionObserver' in window)) return;
    var links = {};
    box.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var a = links[e.target.id];
        if (!a) return;
        Object.keys(links).forEach(function (id) { links[id].classList.toggle('is-on', links[id] === a); });
        box.scrollTo({ left: a.offsetLeft - box.clientWidth / 2 + a.offsetWidth / 2, behavior: RM ? 'auto' : 'smooth' });
      });
    }, { rootMargin: '-38% 0px -56% 0px' });
    D.querySelectorAll('.mcat[id]').forEach(function (s) { io.observe(s); });
  }

  /* ---------- Плавный переход между страницами ---------- */

  function setupLeave() {
    D.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== '_self') return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.protocol !== location.protocol || url.host !== location.host) return;
      if (url.pathname === location.pathname) return; /* якорь на этой же странице */
      e.preventDefault();
      root.classList.add('leaving');
      setTimeout(function () { location.href = a.href; }, RM ? 0 : 240);
    });
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) { root.classList.remove('leaving'); root.classList.add('ready'); }
    });
  }

  /* ---------- Запуск ---------- */

  buildLayout();
  buildDecor();
  collect();
  applyLang(pickLang(), false);

  D.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-lang]');
    if (b) applyLang(b.getAttribute('data-lang'), true);
  });

  setupMenu();
  setupMenuNav();
  setupLeave();
  setupScroll();
  setInterval(setStatus, 60000);

  /* показываем страницу сразу, не дожидаясь кадра анимации */
  void D.body.offsetWidth;
  root.classList.add('ready');
  setTimeout(watchReveals, 60);
})();
