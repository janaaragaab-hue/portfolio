// ---------- Theme (light / dark) ----------
(function () {
  var root = document.documentElement, btn = document.getElementById('themeBtn');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  var theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function apply(t) {
    root.setAttribute('data-theme', t);
    btn.textContent = t === 'dark' ? '☀' : '☾';
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  apply(theme);
  btn.addEventListener('click', function () {
    theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  });
})();

// ---------- Images: show the image only if the file exists ---------- 

document.querySelectorAll('img[data-img]').forEach(function (img) {
  img.addEventListener('load', function () {
    img.hidden = false;
    var ph = img.parentElement.querySelector('.ph'); if (ph) ph.hidden = true;
  });
  img.src = img.dataset.img;
});

document.getElementById('yr').textContent = new Date().getFullYear();

// ---------- Highlight the nav link of the section in view ----------
(function () {
  var links = {};
  document.querySelectorAll('nav ul a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === e.target.id); });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });
})();

// ---------- Project filter (built from each project's tool chips) ----------
(function () {
  var filters = document.querySelector('.filters'), projects = document.querySelectorAll('.project');
  if (!filters) return;
  function tags(p) {
    var t = [];
    p.querySelectorAll('.tools .chip').forEach(function (c) {
      var x = c.textContent.trim();
      if (/^(HTML5|CSS3?|Bootstrap)$/.test(x) && t.indexOf('HTML / CSS') < 0) t.push('HTML / CSS');
      if (x === 'JavaScript') t.push('JavaScript');
      if (x === 'Python') t.push('Python');
    });
    return t;
  }
  ['All', 'HTML / CSS', 'JavaScript', 'Python'].forEach(function (name, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = name; b.setAttribute('aria-pressed', i === 0);
    b.addEventListener('click', function () {
      filters.querySelectorAll('button').forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
      projects.forEach(function (p) { p.hidden = !(name === 'All' || tags(p).indexOf(name) > -1); });
    });
    filters.appendChild(b);
  });
})();

// ---------- Back to top ----------
(function () {
  var btn = document.getElementById('toTop');
  addEventListener('scroll', function () { btn.classList.toggle('show', scrollY > 600); }, { passive: true });
  btn.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });
})();
