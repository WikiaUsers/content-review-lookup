/* =====================================================================
   TAVERNA DO DRAGÃO VERDE — MediaWiki:Common.js
   Cole em  /wiki/MediaWiki:Common.js
   (passa pela revisão do Fandom antes de funcionar para todo mundo)
 
   Faz duas coisas nas páginas que usam {{Campanha}}:
   1. "Tocha": a luz segue o mouse (o efeito .torch do seu site)
   2. Parallax + texto surgindo ao rolar (em todos os navegadores;
      quando o JS roda, ele desliga a versão só-CSS para não brigarem)
   ===================================================================== */
(function () {
    'use strict';
 
    var campanhas = [];
    var ligado = false;
    var reduzirMovimento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
    /* --- tocha --------------------------------------------------------- */
    var ultimoMouse = null;
    var tochaAgendada = false;
 
    function moverTocha() {
        tochaAgendada = false;
        if (!ultimoMouse) { return; }
        for (var i = 0; i < campanhas.length; i++) {
            var r = campanhas[i].getBoundingClientRect();
            campanhas[i].style.setProperty('--tdv-x', (ultimoMouse.clientX - r.left) + 'px');
            campanhas[i].style.setProperty('--tdv-y', (ultimoMouse.clientY - r.top) + 'px');
        }
    }
 
    /* --- parallax ------------------------------------------------------- */
    var parallaxAgendado = false;
 
    function moverFundos() {
        parallaxAgendado = false;
        var vh = window.innerHeight;
        for (var i = 0; i < campanhas.length; i++) {
            var r = campanhas[i].getBoundingClientRect();
            if (r.bottom < 0 || r.top > vh) { continue; }
            var progresso = (vh - r.top) / (vh + r.height);      /* 0 → 1 */
            var fundo = campanhas[i].querySelector('.tdv-campanha__fundo');
            if (fundo) {
                fundo.style.transform = 'translateY(' + ((progresso * 2 - 1) * 10) + '%)';
            }
        }
    }
 
    function ligarEventos() {
        if (ligado) { return; }
        ligado = true;
 
        document.addEventListener('mousemove', function (e) {
            ultimoMouse = e;
            if (!tochaAgendada) {
                tochaAgendada = true;
                window.requestAnimationFrame(moverTocha);
            }
        });
 
        if (!reduzirMovimento) {
            var agendar = function () {
                if (!parallaxAgendado) {
                    parallaxAgendado = true;
                    window.requestAnimationFrame(moverFundos);
                }
            };
            window.addEventListener('scroll', agendar, { passive: true });
            window.addEventListener('resize', agendar);
        }
    }
 
    /* --- liga tudo quando o conteúdo da página carrega ------------------- */
    function iniciar($content) {
        var raiz = ($content && $content[0]) || document;
        var novos = Array.prototype.slice.call(raiz.querySelectorAll('.tdv-campanha'));
        novos = novos.filter(function (el) { return !el.getAttribute('data-tdv'); });
        if (!novos.length) { return; }
 
        novos.forEach(function (el) { el.setAttribute('data-tdv', '1'); });
        campanhas = campanhas.concat(novos);
        ligarEventos();
 
        if (reduzirMovimento) { return; }
 
        /* avisa o CSS que o JS assumiu (desliga a versão só-CSS) */
        document.documentElement.classList.add('tdv-js', 'tdv-js-fallback');
 
        /* texto surgindo ao rolar (o IntersectionObserver do seu site) */
        var cards = [];
        novos.forEach(function (el) {
            var c = el.querySelector('.tdv-campanha__card');
            if (c) { cards.push(c); }
        });
 
        if ('IntersectionObserver' in window) {
            var observador = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add('tdv-visivel');
                        observador.unobserve(entrada.target);
                    }
                });
            }, { threshold: 0.2 });
            cards.forEach(function (c) { observador.observe(c); });
        } else {
            cards.forEach(function (c) { c.classList.add('tdv-visivel'); });
        }
 
        moverFundos();
    }
 
    mw.hook('wikipage.content').add(iniciar);
}());