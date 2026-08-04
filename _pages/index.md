---
title: home
permalink: /
---

<section class="relative overflow-hidden px-4 min-h-[calc(100dvh-4rem)] flex items-center justify-center">
  <div class="hero-glow"></div>

  <!-- Decorative floating shapes (randomized on each visit) -->
  <div id="deco-shapes" class="absolute inset-0 pointer-events-none"></div>

  <div class="relative max-w-3xl mx-auto text-center">
    <div class="animate-fade-in-up">
      <img src="/assets/img/logo.svg" alt="Ruby 2D" class="w-24 sm:w-32 mx-auto mb-6 drop-shadow-[0_8px_30px_rgba(255,71,87,0.2)] animate-bounce-gentle">
    </div>

    <h1 class="animate-fade-in-up delay-1 text-5xl sm:text-7xl font-bold text-[var(--text-primary)] mb-5">
      Ruby 2D
    </h1>

    <p class="animate-fade-in-up delay-2 text-xl sm:text-2xl font-medium text-[var(--text-secondary)] mb-10 max-w-xl mx-auto leading-relaxed" style="white-space:nowrap;">
      Make 2D
      <span style="display:inline-block;clip-path:inset(-0.5em 0);"><span id="word-flip" style="display:inline-block;">applications</span></span>
      with Ruby
    </p>

    <div class="animate-fade-in-up delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="/learn/get-started" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-white text-base bg-[var(--ruby-red)] hover:bg-[var(--ruby-red-hover)] shadow-lg shadow-[var(--ruby-glow)] hover:shadow-xl hover:shadow-[var(--ruby-glow)] hover:-translate-y-0.5 transition-all duration-200">
        Get started
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
      </a>
      <a href="/try" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-[var(--text-secondary)] text-base border-2 border-[var(--surface-border)] hover:border-[var(--ruby-red)] hover:text-[var(--ruby-red)] hover:-translate-y-0.5 transition-all duration-200 bg-[var(--surface-card)]">
        Try it out
      </a>
    </div>

    {% assign example_count = 0 %}{% for cat in site.data.examples %}{% assign example_count = example_count | plus: cat.items.size %}{% endfor %}
    <p class="animate-fade-in-up delay-4 mt-10 text-[var(--text-secondary)] font-medium">
      or explore <a href="/examples" class="text-[var(--ruby-red)] underline decoration-wavy underline-offset-4 decoration-[rgba(255,71,87,.35)] hover:decoration-[var(--ruby-red)] hover:text-[var(--ruby-red-hover)] transition-colors">{{ example_count }} runnable examples</a> ✨
    </p>
  </div>
</section>

<script>
(function() {
  var rest = ['games', 'art', 'animations', 'visualizations', 'simulations', 'experiences', 'worlds', 'demos', 'experiments', 'scenes', 'sketches', 'interactions', 'illustrations', 'dashboards', 'interfaces'];
  for (var i = rest.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = rest[i]; rest[i] = rest[j]; rest[j] = tmp;
  }
  var words = ['applications'].concat(rest);
  var idx = 0;
  var el = document.getElementById('word-flip');
  if (!el) return;
  var outer = el.parentElement;

  // Set initial explicit width after fonts load so the first flip can animate from it
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function() {
    outer.style.width = el.offsetWidth + 'px';
  });

  // Soft-edge mask: the gradient spans 5× the element height (mask-size 500%).
  // At rest (mask-position 50%) the element's visible window lands on the fully-opaque
  // center zone. Animating to 0% or 100% shifts the window into the transparent zones,
  // dissolving the top or bottom edge as the word slides through.
  var grad = 'linear-gradient(to bottom, transparent 0%, transparent 20%, black 40%, black 60%, transparent 80%, transparent 100%)';
  el.style.webkitMaskImage = grad;
  el.style.maskImage = grad;
  el.style.webkitMaskSize = '100% 500%';
  el.style.maskSize = '100% 500%';
  el.style.webkitMaskPosition = '0% 50%';
  el.style.maskPosition = '0% 50%';

  var probe = document.createElement('span');
  probe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;white-space:nowrap;visibility:hidden;';
  document.body.appendChild(probe);

  var DUR = '0.5s';

  function flip() {
    idx = (idx + 1) % words.length;
    var next = words[idx];

    var cs = getComputedStyle(el);
    probe.style.fontSize = cs.fontSize;
    probe.style.fontFamily = cs.fontFamily;
    probe.style.fontWeight = cs.fontWeight;
    probe.textContent = next;
    var nextWidth = probe.offsetWidth;

    // Exit: slide up, mask shifts toward 0% → top edge dissolves
    el.style.transition = 'transform ' + DUR + ' ease, -webkit-mask-position ' + DUR + ' ease, mask-position ' + DUR + ' ease';
    el.style.transform = 'translateY(-115%)';
    el.style.webkitMaskPosition = '0% 0%';
    el.style.maskPosition = '0% 0%';

    setTimeout(function() {
      // Swap text while fully invisible
      el.textContent = next;
      el.style.transition = 'none';
      el.style.transform = 'translateY(115%)';
      el.style.webkitMaskPosition = '0% 100%';
      el.style.maskPosition = '0% 100%';

      // Surrounding text slides to new width as new word enters
      outer.style.transition = 'width ' + DUR + ' ease';
      outer.style.width = nextWidth + 'px';

      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          // Enter: slide up, mask shifts toward 50% → bottom edge dissolves in
          el.style.transition = 'transform ' + DUR + ' ease, -webkit-mask-position ' + DUR + ' ease, mask-position ' + DUR + ' ease';
          el.style.transform = '';
          el.style.webkitMaskPosition = '0% 50%';
          el.style.maskPosition = '0% 50%';
        });
      });
    }, 500);
  }

  setTimeout(function() { flip(); setInterval(flip, 4000); }, 2500);
})();
</script>

<script>
(function() {
  var container = document.getElementById('deco-shapes');
  if (!container) return;

  var colors = [
    'var(--accent-yellow)', 'var(--accent-blue)', 'var(--accent-green)',
    'var(--accent-purple)', 'var(--ruby-red)', 'var(--accent-orange)',
    'var(--accent-teal)'
  ];
  var types = ['circle', 'oval', 'square', 'triangle', 'line'];
  var mobile = window.innerWidth < 640;
  var minSize = mobile ? 14 : 20;
  var maxSize = mobile ? 40 : 60;

  // Zones around the periphery, avoiding the center content area
  var zones = [
    { x: [3, 20],  y: [5, 25] },   // top-left corner
    { x: [25, 40], y: [3, 18] },    // top-center-left
    { x: [60, 75], y: [3, 18] },    // top-center-right
    { x: [80, 95], y: [5, 25] },    // top-right corner
    { x: [3, 16],  y: [30, 55] },   // left-upper
    { x: [84, 96], y: [30, 55] },   // right-upper
    { x: [3, 16],  y: [55, 78] },   // left-lower
    { x: [84, 96], y: [55, 78] },   // right-lower
    { x: [3, 20],  y: [78, 92] },   // bottom-left corner
    { x: [25, 40], y: [82, 95] },   // bottom-center-left
    { x: [60, 75], y: [82, 95] },   // bottom-center-right
    { x: [80, 95], y: [78, 92] }    // bottom-right corner
  ];

  // Shuffle zones so shape types are distributed randomly
  for (var j = zones.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1));
    var tmp = zones[j]; zones[j] = zones[k]; zones[k] = tmp;
  }

  var count = mobile ? 8 : zones.length;

  function rand(a, b) { return Math.random() * (b - a) + a; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  for (var i = 0; i < count; i++) {
    var zone = zones[i];
    var size = rand(minSize, maxSize);
    var color = pick(colors);
    var opacity = rand(0.25, 0.6);
    var type = pick(types);
    var anim = Math.random() > 0.5 ? 'float' : 'float-reverse';
    var dur = rand(3, 7).toFixed(1);
    var del = rand(0, 4).toFixed(1);
    var rot = rand(-30, 30);

    var w = document.createElement('div');
    w.style.cssText =
      'position:absolute;top:' + rand(zone.y[0], zone.y[1]) + '%;left:' + rand(zone.x[0], zone.x[1]) + '%;' +
      'animation:' + anim + ' ' + dur + 's ease-in-out ' + del + 's infinite;';

    var el = document.createElement('div');
    el.style.opacity = opacity;

    switch (type) {
      case 'circle':
        el.style.cssText += 'width:' + size + 'px;height:' + size + 'px;background:' + color + ';border-radius:50%;';
        break;
      case 'oval':
        el.style.cssText += 'width:' + (size * 1.6) + 'px;height:' + size + 'px;background:' + color + ';border-radius:50%;transform:rotate(' + rot + 'deg);';
        break;
      case 'square':
        el.style.cssText += 'width:' + size + 'px;height:' + size + 'px;background:' + color + ';border-radius:20%;transform:rotate(' + rot + 'deg);';
        break;
      case 'triangle':
        var s = Math.round(size);
        el.innerHTML = '<svg width="' + s + '" height="' + s + '" viewBox="0 0 100 100" style="display:block;transform:rotate(' + Math.round(rot) + 'deg)">' +
          '<polygon points="50,8 8,92 92,92" style="fill:' + color + ';stroke:' + color + ';stroke-width:10;stroke-linejoin:round"/></svg>';
        break;
      case 'line':
        el.style.cssText += 'width:' + (size * 2) + 'px;height:' + Math.max(4, size * 0.2) + 'px;background:' + color + ';border-radius:999px;transform:rotate(' + rand(-60, 60) + 'deg);';
        break;
    }

    w.appendChild(el);
    container.appendChild(w);
  }
})();
</script>
