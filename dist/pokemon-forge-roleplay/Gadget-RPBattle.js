/* RPBattle v1.2 — auto-HP + auto-log from prose (Fandom-ready, broader scan, debug)
   Put this in MediaWiki:Gadget-RPBattle.js and register via Gadgets-definition:
   * RPBattle[ResourceLoader|default]|RPBattle.js
*/
(function(){
  'use strict';
  // ---- Debug switch (optional): set window.RPBATTLE_DEBUG = true in console to see logs
  function dbg(){ if (window.RPBATTLE_DEBUG) console.log.apply(console, arguments); }

  function $all(sel, root){ return Array.prototype.slice.call((root||document).querySelectorAll(sel)); }
  function clamp(n, lo, hi){ return Math.max(lo, Math.min(hi, n)); }
  function norm(s){ return (s||'').trim().toLowerCase(); }

  // ---- MON STATE ----
  var mons = Object.create(null);
  function registerMon(el){
    var name = el.getAttribute('data-name'); if(!name) return;
    var key  = norm(name);
    var max  = parseInt(el.getAttribute('data-maxhp'), 10) || 100;
    var hp   = parseInt(el.getAttribute('data-hp'), 10); if (isNaN(hp)) hp = max;
    mons[key] = { el: el, name: name, max: max, hp: hp, lastMove: null };
    render(key);
    dbg('[RPB] Registered mon:', name, 'max', max, 'hp', hp);
  }
  function render(key){
    var m = mons[key]; if(!m) return;
    var pct = clamp((m.hp / m.max) * 100, 0, 100);
    var fill = m.el.querySelector('.rpb-fill');
    var hpnum = m.el.querySelector('.rpb-hpnum');
    if (fill) fill.style.width = pct.toFixed(2) + '%';
    if (hpnum) hpnum.textContent = m.hp + ' / ' + m.max;
    m.el.setAttribute('data-hp', m.hp);
  }
  function damage(targetName, amount){
    var t = mons[norm(targetName)]; if(!t) { dbg('[RPB] No target found for damage:', targetName); return 0; }
    var a = Math.max(0, parseInt(amount,10) || 0);
    t.hp = clamp(t.hp - a, 0, t.max); render(norm(targetName)); dbg('[RPB] Damage', targetName, a); return a;
  }
  function heal(targetName, amount){
    var t = mons[norm(targetName)]; if(!t) { dbg('[RPB] No target found for heal:', targetName); return 0; }
    var a = Math.max(0, parseInt(amount,10) || 0);
    var before = t.hp; t.hp = clamp(t.hp + a, 0, t.max); render(norm(targetName)); dbg('[RPB] Heal', targetName, a); return t.hp - before;
  }
  function faint(targetName){
    var t = mons[norm(targetName)]; if(!t) { dbg('[RPB] No target found for faint:', targetName); return; }
    t.hp = 0; render(norm(targetName)); dbg('[RPB] Faint', targetName);
  }

  // ---- CONFIG FROM PAGE (.rpb-log) ----
  var logEl, moves = Object.create(null);
  var baseHit = 10, critMult = 1.5, superMult = 1.5, notveryMult = 0.5;

  function parseMovesMap(s){
    var map = Object.create(null);
    (s||'').split(',').forEach(function(pair){
      var parts = pair.split(':');
      if (parts.length === 2){
        var mv = norm(parts[0]);
        var dmg = parseInt(parts[1], 10);
        if (mv && !isNaN(dmg)) map[mv] = dmg;
      }
    });
    return map;
  }
  function initConfig(){
    logEl = document.querySelector('.rpb-log');
    if (logEl){
      moves = parseMovesMap(logEl.getAttribute('data-moves'));
      var v;
      v = parseFloat(logEl.getAttribute('data-base-hit'));      if(!isNaN(v)) baseHit = v;
      v = parseFloat(logEl.getAttribute('data-crit-mult'));     if(!isNaN(v)) critMult = v;
      v = parseFloat(logEl.getAttribute('data-super-mult'));    if(!isNaN(v)) superMult = v;
      v = parseFloat(logEl.getAttribute('data-notvery-mult'));  if(!isNaN(v)) notveryMult = v;
    }
    dbg('[RPB] Config moves:', moves, 'baseHit', baseHit);
  }
  function appendLog(line){
    if (!logEl) return;
    var div = document.createElement('div');
    div.textContent = line;
    logEl.appendChild(div);
  }

  // ---- TEXT PARSING ----
  function explicitDamage(str){
    var m = str.match(/\bfor\s+(\d+)\s+damage\b/i); if (m) return parseInt(m[1],10);
    m = str.match(/\btakes\s+(\d+)\s+damage\b/i);   if (m) return parseInt(m[1],10);
    m = str.match(/\bdeals?\s+(\d+)\s+damage\b/i);  if (m) return parseInt(m[1],10);
    return null;
  }
  function flags(str){
    var s = str.toLowerCase();
    return {
      crit: /critical|critically hits/.test(s),
      super: /super effective/.test(s),
      notvery: /not very effective/.test(s)
    };
  }
  function applyMultipliers(amount, fl){
    var a = amount;
    if (fl.crit) a *= critMult;
    if (fl.super) a *= superMult;
    if (fl.notvery) a *= notveryMult;
    return Math.round(a);
  }

  function processLine(el){
    if (el.__rpbProcessed) return; // idempotent
    var text = (el.textContent || '').trim();
    if (!text) { el.__rpbProcessed = true; return; }

    // Only act if at least one mon name appears (avoid parsing unrelated paragraphs)
    var involved = Object.keys(mons).some(function(k){ return text.toLowerCase().indexOf(k) !== -1; });
    if (!involved) { el.__rpbProcessed = true; return; }

    var fl = flags(text);
    dbg('[RPB] Parse:', text);

    // 1) "X takes 12 damage."
    var m1 = text.match(/^\s*(.+?)\s+takes\s+(\d+)\s+damage\b/i);
    if (m1){
      var who = m1[1], amt = applyMultipliers(parseInt(m1[2],10), fl);
      var got = damage(who, amt);
      appendLog((who.trim()) + ' takes ' + got + ' damage.');
      el.__rpbProcessed = true; return;
    }

    // 2) "A deals 12 damage to B."
    var m2 = text.match(/^\s*(.+?)\s+deals?\s+(\d+)\s+damage\s+to\s+(.+?)\.?$/i);
    if (m2){
      var tgt = m2[3], val = applyMultipliers(parseInt(m2[2],10), fl);
      var got2 = damage(tgt, val);
      appendLog((tgt.trim()) + ' takes ' + got2 + ' damage.');
      el.__rpbProcessed = true; return;
    }

    // 3) "A uses Move on B"
    var mUseOn = text.match(/^\s*(.+?)\s+uses\s+([A-Za-z' -]+)\s+on\s+(.+?)\.?$/i);
    if (mUseOn){
      var atk = mUseOn[1], mv = mUseOn[2], tgt = mUseOn[3];
      if (mons[norm(atk)]) mons[norm(atk)].lastMove = mv;
      var val3 = explicitDamage(text);
      if (val3 == null){
        var base = moves[norm(mv)];
        if (typeof base !== 'number') base = baseHit;
        val3 = base;
      }
      val3 = applyMultipliers(val3, fl);
      var got3 = damage(tgt, val3);
      appendLog(atk + ' uses ' + mv + ' on ' + tgt + '.');
      appendLog(tgt + ' takes ' + got3 + ' damage.');
      el.__rpbProcessed = true; return;
    }

    // 4) "A's Move hits B"
    var mPoss = text.match(/^\s*(.+?)[’']s\s+([A-Za-z' -]+)\s+hits\s+(.+?)\.?$/i);
    if (mPoss){
      var atk2 = mPoss[1], mv2 = mPoss[2], tgt2 = mPoss[3];
      if (mons[norm(atk2)]) mons[norm(atk2)].lastMove = mv2;
      var base2 = explicitDamage(text);
      if (base2 == null){
        base2 = moves[norm(mv2)];
        if (typeof base2 !== 'number') base2 = baseHit;
      }
      base2 = applyMultipliers(base2, fl);
      var got4 = damage(tgt2, base2);
      appendLog(atk2 + ' uses ' + mv2 + ' on ' + tgt2 + '.');
      appendLog(tgt2 + ' takes ' + got4 + ' damage.');
      el.__rpbProcessed = true; return;
    }

    // 5) "A hits B with Move"
    var mWith = text.match(/^\s*(.+?)\s+hits\s+(.+?)\s+with\s+([A-Za-z' -]+)\.?$/i);
    if (mWith){
      var atk3 = mWith[1], tgt3 = mWith[2], mv3 = mWith[3];
      if (mons[norm(atk3)]) mons[norm(atk3)].lastMove = mv3;
      var base3 = explicitDamage(text);
      if (base3 == null){
        base3 = moves[norm(mv3)];
        if (typeof base3 !== 'number') base3 = baseHit;
      }
      base3 = applyMultipliers(base3, fl);
      var got5 = damage(tgt3, base3);
      appendLog(atk3 + ' uses ' + mv3 + ' on ' + tgt3 + '.');
      appendLog(tgt3 + ' takes ' + got5 + ' damage.');
      el.__rpbProcessed = true; return;
    }

    // 6) "B takes damage from Move"
    var mFrom = text.match(/^\s*(.+?)\s+takes\s+damage\s+from\s+([A-Za-z' -]+)\.?$/i);
    if (mFrom){
      var tgt4 = mFrom[1], mv4 = mFrom[2];
      var base4 = explicitDamage(text);
      if (base4 == null){
        base4 = moves[norm(mv4)];
        if (typeof base4 !== 'number') base4 = baseHit;
      }
      base4 = applyMultipliers(base4, fl);
      var got6 = damage(tgt4, base4);
      appendLog(tgt4 + ' is struck by ' + mv4 + '.');
      appendLog(tgt4 + ' takes ' + got6 + ' damage.');
      el.__rpbProcessed = true; return;
    }

    // 7) Generic: "A hits B" → baseHit or lastMove[atk]
    var mHit = text.match(/^\s*(.+?)\s+hits\s+(.+?)\.?$/i);
    if (mHit){
      var atk4 = mHit[1], tgt5 = mHit[2];
      var dmgVal = explicitDamage(text);
      var lm = mons[norm(atk4)] && mons[norm(atk4)].lastMove;
      if (dmgVal == null){
        if (lm && typeof moves[norm(lm)] === 'number') dmgVal = moves[norm(lm)];
        else dmgVal = baseHit;
      }
      dmgVal = applyMultipliers(dmgVal, fl);
      var got7 = damage(tgt5, dmgVal);
      appendLog(atk4 + (lm ? (' uses ' + lm + ' on ' + tgt5 + '.') : (' hits ' + tgt5 + '.')));
      appendLog(tgt5 + ' takes ' + got7 + ' damage.');
      el.__rpbProcessed = true; return;
    }

    // 8) Heals
    var mHeal = text.match(/^\s*(.+?)\s+(heals|recovers)\s+(\d+)\b/i);
    if (mHeal){
      var whoh = mHeal[1], healed = heal(whoh, parseInt(mHeal[3],10));
      appendLog((whoh.trim()) + ' heals ' + healed + '.');
      el.__rpbProcessed = true; return;
    }

    // 9) Faints
    var mF = text.match(/^\s*(.+?)\s+faints\b/i);
    if (mF){
      faint(mF[1]); appendLog((mF[1].trim()) + ' faints.');
      el.__rpbProcessed = true; return;
    }

    el.__rpbProcessed = true;
  }

  function scan(root){
    // Fandom/Oasis sometimes nests content differently; cover the bases:
    var hosts = [
      root || document,
      document.getElementById('mw-content-text'),
      document.querySelector('.page-content'),
      document.querySelector('#content'),
      document.querySelector('.rpb-watch') // explicit scope wrapper
    ].filter(Boolean);

    hosts.forEach(function(scope){
      var sel = 'p, li, blockquote, dd';
      // Prefer explicit scope if present
      var explicit = scope.querySelector('.rpb-watch');
      if (explicit) { $all(sel, explicit).forEach(processLine); }
      else { $all(sel, scope).forEach(processLine); }
    });
  }

  function init(){
    // gather mons then config
    $all('.rpb-mon').forEach(registerMon);
    initConfig();
    scan(document);

    var host = document.getElementById('mw-content-text') || document.querySelector('.page-content') || document.body;
    var obs = new MutationObserver(function(muts){
      muts.forEach(function(mu){
        Array.prototype.forEach.call(mu.addedNodes || [], function(n){
          if (n.nodeType !== 1) return;
          if (n.matches && n.matches('.rpb-mon')) registerMon(n);
          scan(n);
        });
      });
    });
    obs.observe(host, { childList:true, subtree:true });
    dbg('[RPB] Observer active on:', host);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();