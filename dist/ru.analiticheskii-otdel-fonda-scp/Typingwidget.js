( function () {
  'use strict';
  if (window._typingwidget_loaded) return;
  window._typingwidget_loaded = true;
  console.log('typing-widget: script loaded');

  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
  function sNum(v,d){ var n=Number(v); return isNaN(n)?d:n; }

  async function typeText(el, text, opts){
    if(!el) return;
    el.textContent = '';
    var cur = document.createElement('span'); cur.className='cursor'; el.appendChild(cur);
    for(var i=0;i<text.length;i++){ el.insertBefore(document.createTextNode(text[i]), cur);
      var variance = (Math.random()*(opts.variance*2))-opts.variance;
      await sleep(Math.max(10, Math.round(opts.speed + variance)));
    }
    cur.remove();
  }

  function initMarker(m, idx){
    if(!m || m.dataset._tw === '1') return;
    m.dataset._tw = '1';
    var speed = sNum(m.getAttribute('data-speed'), 60);
    var variance = sNum(m.getAttribute('data-variance'), 30);
    var pauseAfter = sNum(m.getAttribute('data-pause-after'), 1200);
    var src = m.getAttribute('data-source') || "Алгоритм проверки запущен...\nДоступ разрешён\nИдёт загрузка...";
    var id = (m.getAttribute('data-idprefix')||'typing') + '-' + (Math.random().toString(36).slice(2,9));

    var btn = document.createElement('a');
    btn.href = '#'; btn.className = 'typing-btn'; btn.setAttribute('role','button');
    btn.setAttribute('aria-controls', id+'-output'); btn.setAttribute('aria-expanded','false'); btn.tabIndex = 0;
    btn.textContent = m.getAttribute('data-label') || 'Подтвердить вход';

    var source = document.createElement('span'); source.className='type-source'; source.style.display='none'; source.textContent = src;
    var output = document.createElement('span'); output.className='typing-output'; output.id = id+'-output';
    output.setAttribute('aria-live','polite'); output.setAttribute('role','status');
    var staticOut = document.createElement('span'); staticOut.className='static-output'; staticOut.id = id+'-static'; staticOut.hidden = true;
    staticOut.textContent = m.getAttribute('data-static') || 'Актуальная информация: Фонд SCP — вымышленная организация.';

    m.appendChild(btn); m.appendChild(source); m.appendChild(output); m.appendChild(staticOut);

    var opts = { speed: speed, variance: variance, pauseAfter: pauseAfter };
    var played = false;

    async function activate(){
      if(played) return; played = true;
      try{
        btn.setAttribute('aria-expanded','true'); btn.classList.add('typing-btn--disabled');
        await typeText(output, source.textContent.trim(), opts);
        await sleep(opts.pauseAfter);
        staticOut.hidden = false; requestAnimationFrame(()=>staticOut.classList.add('show'));
      }catch(e){
        console.error('typing-widget activate error', e); played = false;
        btn.classList.remove('typing-btn--disabled'); btn.setAttribute('aria-expanded','false');
      }
    }

    btn.addEventListener('click', function(e){ if(e && e.preventDefault) e.preventDefault(); activate(); });
    btn.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' ' || e.key==='Spacebar'){ if(e.preventDefault) e.preventDefault(); activate(); } });

    console.log('typing-widget: initialized', id);
  }

  function scan(root){
    var r = (root && root.length)? root[0] : document;
    var markers = r.querySelectorAll('.typing-widget-marker');
    for(var i=0;i<markers.length;i++){ try{ initMarker(markers[i], i+1); } catch(e){ console.error(e); } }
  }

  document.addEventListener('DOMContentLoaded', function(){ scan(document); });
  if (typeof mw !== 'undefined' && mw.hook) mw.hook('wikipage.content').add(function($c){ scan($c); });
  else setInterval(function(){ scan(document); }, 2000);

})();