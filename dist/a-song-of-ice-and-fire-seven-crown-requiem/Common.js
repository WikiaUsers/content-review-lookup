/* Any JavaScript here will be loaded for all users on every page load. */

/* ===== Move ToC to top of article (so the sticky box starts at the top) ===== */
mw.hook('wikipage.content').add(function ($content) {
	var $toc = $content.find('#toc');
	var $out = $content.find('.mw-parser-output').first();
	if ($toc.length && $out.length) {
		$toc.prependTo($out);
	}
});

/* ===== ToC scroll highlight ===== */
mw.hook('wikipage.content').add(function () {
    var toc = document.getElementById('toc');
    if (!toc || toc.dataset.spy) return;
    toc.dataset.spy = '1';

    var heads = [], links = {}, current = null, ticking = false;
    toc.querySelectorAll('a[href^="#"]').forEach(function (a) {
        var id = decodeURIComponent(a.getAttribute('href').slice(1));
        var h = document.getElementById(id);
        if (h) { heads.push(h); links[id] = a; }
    });
    if (!heads.length) return;

    // the scrollable box around the ToC (the ToC itself or its sticky wrapper)
    var box = toc;
    for (var el = toc; el && el !== document.body; el = el.parentElement) {
        if (/auto|scroll/.test(getComputedStyle(el).overflowY)) { box = el; break; }
    }

    function update() {
        ticking = false;
        var active = null;
        for (var i = 0; i < heads.length; i++) {
            if (heads[i].getBoundingClientRect().top <= 110) active = heads[i];
            else break;
        }
        var link = active ? links[active.id] : null;
        if (link === current) return;
        if (current) current.classList.remove('toc-active');
        current = link;
        if (!link) return;
        link.classList.add('toc-active');
        var lr = link.getBoundingClientRect(), br = box.getBoundingClientRect();
        if (lr.top < br.top || lr.bottom > br.bottom) {
            box.scrollTop += (lr.top - br.top) - box.clientHeight / 2;
        }
    }

    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
});