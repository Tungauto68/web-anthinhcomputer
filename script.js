(function () {
  // Sticky header shadow
  var header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile menu
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('menuToggle');
  toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var parent = a.parentElement;
      if (parent.classList.contains('has-drop') && window.innerWidth <= 960) {
        e.preventDefault();
        parent.classList.toggle('open');
        return;
      }
      nav.classList.remove('open');
    });
  });

  // Reveal on scroll
  var targets = document.querySelectorAll('.section-head, .card, .step, .why-item, .prod, .chain li, .scope-col, .faq details');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
  }

  // Count-up stats
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var end = parseInt(el.getAttribute('data-count'), 10), start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.floor(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

  // Contact form -> opens email client with the details
  var form = document.getElementById('contactForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var body = 'Họ tên: ' + d.get('name') + '\nSĐT: ' + d.get('phone') + '\nCông ty: ' + d.get('company') +
      '\nNhu cầu: ' + d.get('service') + '\nNội dung: ' + d.get('message');
    window.location.href = 'mailto:lienhe@anthinhcomputer.vn?subject=' +
      encodeURIComponent('Yêu cầu tư vấn - ' + d.get('service')) + '&body=' + encodeURIComponent(body);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
