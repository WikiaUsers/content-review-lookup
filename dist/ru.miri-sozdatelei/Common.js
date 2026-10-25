/* Посмертные судьбы. Read-only lookup from the same wiki's public table.
 * ES5 syntax for compatibility with Fandom's community-script parser.
 * No tracking, storage, credentials or wiki writes.
 */
(function () {
 'use strict';
 function showError(root) {
  var message = document.createElement('p');
  message.textContent = 'Не удалось загрузить справочник. Открой общий список или обнови страницу.';
  var link = document.createElement('a');
  link.href = 'https://miri-sozdatelei.fandom.com/ru/wiki/Текущее_распределение_мёртвых_персонажей';
  link.textContent = 'Общий список судеб';
  root.replaceChildren(message,link);
 }
 function initialize() {
  var root = document.getElementById('afterlife-lookup');
  if (!root || root.dataset.ready || root.dataset.requested) return;
  root.dataset.requested = 'true';
  var controller = new AbortController();
  var timer = setTimeout(function () { controller.abort(); },15000);
  var endpoint = 'https://miri-sozdatelei.fandom.com/ru/api.php';
  var params = new URLSearchParams({action:'parse',page:'Текущее распределение мёртвых персонажей',prop:'text',format:'json',formatversion:'2',origin:'*',maxage:'0',smaxage:'0'});
  fetch(endpoint + '?' + params.toString(), {credentials:'omit',cache:'no-store',signal:controller.signal})
   .then(function (response) {
    if (!response.ok) throw new Error('Source unavailable');
    return response.json();
   })
   .then(function (payload) {
    if (payload.error || !payload.parse || typeof payload.parse.text !== 'string') throw new Error('Invalid source');
    var parsed = new DOMParser().parseFromString(payload.parse.text,'text/html');
    var table = parsed.querySelector('#afterlife-data');
    if (!table) throw new Error('Missing table');
    render(root,table);
    clearTimeout(timer);
   })
   .catch(function () { clearTimeout(timer); showError(root); });
 }
 function render(root,table) {
  var kinds = {'Местонахождение':'known','Последнее известное':'last','Неизвестно':'unknown','Гибель':'dead','Разные развязки':'branch','Превращение':'transformed'};
  var data = [];
  try {
   Array.from(table.querySelectorAll('tbody tr, table > tr')).forEach(function(row) {
    var c = Array.from(row.children);
    if (c.every(function(cell){return cell.tagName === 'TH';})) return;
    if (c.length !== 5 || c.some(function(cell){return cell.colSpan !== 1 || cell.rowSpan !== 1;})) throw new Error('Invalid row');
    var text = c.map(function(cell){return cell.textContent.trim();});
    if (!text[0] || !text[3] || !kinds[text[2]]) throw new Error('Invalid entry');
    var biography = 'https://miri-sozdatelei.fandom.com/ru/wiki/'+encodeURIComponent(text[0].replace(/ /g,'_'));
    var anchor = c[0].querySelector('a[href]');
    if (anchor) {
     var destination = new URL(anchor.getAttribute('href'),'https://miri-sozdatelei.fandom.com');
     if (destination.origin === 'https://miri-sozdatelei.fandom.com' && destination.pathname.indexOf('/ru/wiki/') === 0) biography = destination.origin + destination.pathname;
    }
    var links = [{label:'Биография',href:biography}];
    data.push({name:text[0],aliases:text[1] === '—' ? [] : text[1].split(';').map(function(s){return s.trim();}).filter(Boolean),kind:kinds[text[2]],place:text[3],detail:text[4] === '—' ? '' : text[4],sources:links});
   });
   if (!data.length) throw new Error('Empty table');
  } catch (error) {
   showError(root);
   return;
  }
  var style = document.createElement('style');
  style.textContent = "#afterlife-lookup{color-scheme:light;--ink:#213749;--muted:#5c6f7d;--paper:#f6f9fb;--edge:#d7e1e8;--navy:#213f58;--blue:#e9f1f7;--gold:#957037;--white:#fff;font-family:\"Segoe UI\",Arial,sans-serif;color:var(--ink);background:#e9eff3}#afterlife-lookup *{box-sizing:border-box}#afterlife-lookup{margin:0;min-height:100vh;border-top:5px solid var(--navy)}#afterlife-lookup main{width:min(840px,100% - 40px);margin:0 auto;padding:30px 0 35px}#afterlife-lookup header{display:flex;justify-content:space-between;align-items:center;gap:16px}#afterlife-lookup .brand{font-weight:700;color:var(--ink);text-decoration:none;font-size:15px;letter-spacing:.02em}#afterlife-lookup .edition{font-size:12px;color:var(--muted);border:1px solid #c5d2dc;border-radius:30px;padding:5px 10px}#afterlife-lookup .intro{margin:42px 0 28px}#afterlife-lookup .eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:11px;font-weight:700;color:var(--gold);margin:0 0 12px}#afterlife-lookup h1{font:normal clamp(32px,5vw,48px)/1.1 Georgia,serif;letter-spacing:-.035em;margin:0 0 14px}#afterlife-lookup .lead{font-size:17px;color:var(--muted);margin:0;line-height:1.6}#afterlife-lookup .lookup{background:var(--white);border:1px solid #ccd9e3;border-radius:16px;box-shadow:0 14px 32px #233c4d0a;overflow:hidden}#afterlife-lookup form{padding:27px 30px 0}#afterlife-lookup label{display:block;font-size:13px;font-weight:600;margin-bottom:9px}#afterlife-lookup .input-row{display:flex;gap:9px}#afterlife-lookup input{min-width:0;width:100%;font:inherit;font-size:19px;padding:15px 17px;color:var(--ink);background:#f8fafc;border:1px solid #b5c7d5;border-radius:8px}#afterlife-lookup input::placeholder{color:#758895}#afterlife-lookup button{font:inherit;cursor:pointer}#afterlife-lookup button:focus-visible,#afterlife-lookup a:focus-visible,#afterlife-lookup input:focus-visible{outline:3px solid #b78333;outline-offset:3px}#afterlife-lookup .submit{border:0;border-radius:8px;background:var(--navy);color:white;padding:0 23px;font-weight:600;white-space:nowrap}#afterlife-lookup .submit span{margin-left:10px}#afterlife-lookup .submit:hover{background:#315873}#afterlife-lookup .examples{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:14px 30px 23px;font-size:12px;color:var(--muted)}#afterlife-lookup .examples button,#afterlife-lookup #al-all-names button{border:1px solid var(--edge);border-radius:30px;padding:5px 11px;background:white;color:#425d71;font-size:12px}#afterlife-lookup .examples button:hover,#afterlife-lookup #al-all-names button:hover{background:var(--blue)}#afterlife-lookup .suggestions{margin:8px 30px 0;border:1px solid var(--edge);border-radius:8px;overflow:hidden}#afterlife-lookup .suggestion{width:100%;display:flex;justify-content:space-between;gap:10px;text-align:left;border:0;border-bottom:1px solid var(--edge);background:#fff;padding:12px 15px;color:var(--ink)}#afterlife-lookup .suggestion:last-child{border-bottom:0}#afterlife-lookup .suggestion small{color:var(--muted)}#afterlife-lookup .suggestion:hover,#afterlife-lookup .suggestion:focus{background:var(--blue)}#afterlife-lookup .answer{border-top:1px solid var(--edge);background:var(--paper);padding:30px;min-height:275px}#afterlife-lookup .welcome{text-align:center;padding:7px 10px 20px}#afterlife-lookup .seal{color:var(--gold);font:40px Georgia,serif;margin-bottom:9px}#afterlife-lookup .welcome h2{font:25px Georgia,serif;margin:0 0 12px}#afterlife-lookup .welcome p{line-height:1.7;color:var(--muted);font-size:14px;margin:0}#afterlife-lookup .record-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px}#afterlife-lookup .record-head h2{font-size:16px;margin:0;font-weight:650}#afterlife-lookup .type{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}#afterlife-lookup .destination{font:38px/1.15 Georgia,serif;margin:0 0 14px;color:var(--navy)}#afterlife-lookup .record[data-kind=unknown] .destination{color:#806122}#afterlife-lookup .record[data-kind=dead] .destination{color:#675568}#afterlife-lookup .record[data-kind=branch] .destination{color:#5c5186}#afterlife-lookup .detail{font-size:16px;line-height:1.7;margin:0;max-width:650px}#afterlife-lookup .alias{font-size:13px;color:var(--muted);margin:0 0 16px}#afterlife-lookup .sources{display:flex;flex-wrap:wrap;gap:10px 22px;border-top:1px solid var(--edge);padding-top:17px;margin-top:23px;font-size:13px}#afterlife-lookup .sources a{color:#355d7c;text-underline-offset:3px}#afterlife-lookup .branches{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}#afterlife-lookup .branch{padding:16px;background:white;border:1px solid var(--edge);border-radius:8px}#afterlife-lookup .branch h3{font-size:14px;margin:0 0 8px}#afterlife-lookup .branch p{font-size:14px;line-height:1.6;margin:0;color:var(--muted)}#afterlife-lookup .choice{display:block;width:100%;border:1px solid #c8d7e2;border-radius:8px;text-align:left;padding:17px;margin-top:12px;background:white;color:var(--ink)}#afterlife-lookup .choice:hover{border-color:var(--navy);background:var(--blue)}#afterlife-lookup .choice strong{display:block;margin-bottom:5px}#afterlife-lookup .choice span{font-size:13px;color:var(--muted)}#afterlife-lookup .empty h2,#afterlife-lookup .ambiguous h2{font:27px Georgia,serif;margin:0 0 14px}#afterlife-lookup .empty p,#afterlife-lookup .ambiguous p{line-height:1.7;color:var(--muted);margin:0}#afterlife-lookup footer{padding:21px 3px;color:var(--muted);font-size:12px;line-height:1.7}#afterlife-lookup footer p{margin:0 0 9px}#afterlife-lookup .footer-links{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}#afterlife-lookup .footer-links a,#afterlife-lookup .footer-links button{font-size:12px;color:#4a657a;text-decoration:underline;text-underline-offset:4px;background:none;border:0;padding:0}#afterlife-lookup #al-all-names{padding-top:14px;display:flex;gap:8px;flex-wrap:wrap}#afterlife-lookup [hidden]{display:none!important}@media(max-width:540px){#afterlife-lookup main{width:calc(100% - 28px);padding-top:20px}#afterlife-lookup .intro{margin:31px 0 22px}#afterlife-lookup .lead{font-size:15px}#afterlife-lookup form{padding:22px 18px 0}#afterlife-lookup .submit{padding:0 16px}#afterlife-lookup .submit span{display:none}#afterlife-lookup input{padding:14px 12px;font-size:17px}#afterlife-lookup .examples{padding:13px 18px 20px}#afterlife-lookup .suggestions{margin:8px 18px 0}#afterlife-lookup .answer{padding:23px 20px;min-height:260px}#afterlife-lookup .destination{font-size:30px}#afterlife-lookup .detail{font-size:15px}#afterlife-lookup .branches{grid-template-columns:1fr}#afterlife-lookup .record-head{align-items:flex-start}#afterlife-lookup .type{max-width:105px;text-align:right}#afterlife-lookup .edition{font-size:10px}#afterlife-lookup .brand{font-size:13px}#afterlife-lookup .welcome{padding:10px 0}#afterlife-lookup .welcome h2{font-size:23px}}\n\n#afterlife-lookup main{max-width:840px}#afterlife-lookup a{color:#355d7c}#afterlife-lookup h2{border:0;padding:0}#afterlife-lookup p{margin-top:0}#afterlife-lookup button{min-height:32px}#afterlife-lookup .destination{margin-bottom:14px}\n";
  root.appendChild(style);
  var ui = document.createElement('div');
  ui.innerHTML = "<main>\n <header><a class=\"brand\" href=\"https://miri-sozdatelei.fandom.com/ru/\">Миры Создателей</a><span class=\"edition\">Общий справочник</span></header>\n <div class=\"intro\"><p class=\"eyebrow\">Справочник миров</p><h1>Посмертные судьбы</h1><p class=\"lead\">Введи имя персонажа — узнай, где он сейчас.</p></div>\n <section class=\"lookup\" aria-label=\"Поиск персонажа\">\n  <form id=\"al-search-form\" autocomplete=\"off\"><label for=\"al-name\">Имя персонажа</label><div class=\"input-row\"><input id=\"al-name\" type=\"search\" placeholder=\"Например, Мутис\" maxlength=\"120\" spellcheck=\"false\" aria-controls=\"al-suggestions\" aria-expanded=\"false\"><button class=\"submit\" type=\"submit\">Найти <span aria-hidden=\"true\">↗</span></button></div></form>\n  <div id=\"al-suggestions\" class=\"suggestions\" hidden></div>\n  <div class=\"examples\"><span>Попробуй:</span><button type=\"button\" data-example=\"Мутис\">Мутис</button><button type=\"button\" data-example=\"Герман\">Герман</button><button type=\"button\" data-example=\"Джек\">Джек</button><button type=\"button\" data-example=\"Кейси\">Кейси</button></div>\n  <div id=\"al-answer\" class=\"answer\" aria-live=\"polite\" aria-atomic=\"true\"><div class=\"welcome\"><div class=\"seal\" aria-hidden=\"true\">✧</div><h2>У каждого — своя судьба</h2><p>Лимб, Хедэф, Забвенье или ещё незавершённая история.<br>Начни с имени.</p></div></div>\n </section>\n <footer><p><span id=\"al-count\"></span> Данные из общего списка судеб.</p><div class=\"footer-links\"><button id=\"al-show-all\" type=\"button\" aria-expanded=\"false\" aria-controls=\"al-all-names\">Все имена</button><a href=\"https://miri-sozdatelei.fandom.com/ru/wiki/Текущее_распределение_мёртвых_персонажей\" target=\"_blank\" rel=\"noopener\">Обычный список ↗</a></div><div id=\"al-all-names\" hidden></div></footer>\n <noscript>Для интерактивного поиска включи JavaScript. Обычный список доступен по ссылке выше.</noscript>\n</main>"; // Fixed UI only; wiki table data is rendered with textContent.
  root.replaceChildren(style,ui);
  document.getElementById('al-count').textContent = 'Записей в справочнике: ' + data.length + '.';

  function normalize(s) { return String(s).toLocaleLowerCase('ru').replace(/ё/g,'е').replace(/[’'`]/g,'').replace(/[^a-zа-я0-9]+/g,' ').trim(); }
  function names(record) { return [record.name].concat(record.aliases); }
  function exact(q) { return data.filter(function (x) { return names(x).some(function (n) { return normalize(n) === normalize(q); }); }); }
  function search(q) {
   var n = normalize(q);
   return n ? data.filter(function (x) { return names(x).some(function (a) { return normalize(a).indexOf(n) !== -1; }); }) : [];
  }
  var input = document.getElementById('al-name');
  var answer = document.getElementById('al-answer');
  var suggestions = document.getElementById('al-suggestions');
  var welcome = answer.innerHTML;
  function el(tag,cls,text) {
   var n = document.createElement(tag);
   if (cls) n.className = cls;
   if (text !== undefined) n.textContent = text;
   return n;
  }
  function hideSuggestions() { suggestions.hidden = true; suggestions.replaceChildren(); input.setAttribute('aria-expanded','false'); }
  function link(label,dest) { var a = el('a','',label); a.href = dest; a.target = '_blank'; a.rel = 'noopener'; return a; }
  function showRecord(record,query) {
   hideSuggestions();
   var box = el('article','record'); box.dataset.kind = record.kind;
   var head = el('div','record-head');
   var labels = {known:'Местонахождение',last:'Последнее известное',unknown:'Незавершённая линия',dead:'Посмертная судьба',branch:'Разные развязки',transformed:'Превращение'};
   head.append(el('h2','',record.name),el('span','type',labels[record.kind])); box.append(head);
   if (normalize(query) !== normalize(record.name)) box.append(el('p','alias','«'+query+'» — имя персонажа '+record.name+'.'));
   box.append(el('p','destination',record.place));
   if (record.detail && record.detail.trim() !== 'Без особенностей') box.append(el('p','detail',record.detail));
   if (record.branches) {
    var branches = el('div','branches');
    record.branches.forEach(function (b) { var cell = el('div','branch'); cell.append(el('h3','',b.name),el('p','',b.text)); branches.append(cell); });
    box.append(branches);
   }
   var sources = el('div','sources');
   record.sources.forEach(function (s) { sources.append(link(s.label+' ↗',s.href)); });
   box.append(sources); answer.replaceChildren(box);
  }
  function choose(record) { input.value = record.name; showRecord(record,record.name); }
  function ambiguity(matches) {
   hideSuggestions(); var box = el('div','ambiguous');
   box.append(el('h2','','Нашлось несколько персонажей'),el('p','','Выбери нужного:'));
   matches.forEach(function (r) {
    var b = el('button','choice'); b.type = 'button'; b.append(el('strong','',r.name),el('span','',r.subtitle || r.name));
    b.addEventListener('click',function () { choose(r); }); box.append(b);
   }); answer.replaceChildren(box);
  }
  function empty() {
   hideSuggestions(); var box = el('div','empty');
   box.append(el('h2','','В общем списке не найден'),el('p','','Проверь имя или открой «Все имена» ниже. Отсутствие в списке ничего не говорит о судьбе персонажа.'));
   answer.replaceChildren(box);
  }
  function run() {
   var q = input.value.trim();
   if (!normalize(q)) { hideSuggestions(); answer.innerHTML = welcome; return; }
   var matches = exact(q);
   if (matches.length === 1) showRecord(matches[0],q);
   else if (matches.length > 1) ambiguity(matches);
   else {
    var partial = search(q);
    if (partial.length === 1) showRecord(partial[0],partial[0].name);
    else if (partial.length > 1) ambiguity(partial);
    else empty();
   }
  }
  input.addEventListener('input',function () {
   var q = input.value;
   if (!normalize(q)) { hideSuggestions(); answer.innerHTML = welcome; return; }
   var matches = exact(q);
   if (matches.length === 1) { showRecord(matches[0],q.trim()); return; }
   if (matches.length > 1) { ambiguity(matches); return; }
   answer.innerHTML = welcome;
   var partial = search(q).slice(0,6);
   suggestions.replaceChildren(); suggestions.hidden = !partial.length;
   input.setAttribute('aria-expanded',String(!!partial.length));
   partial.forEach(function (r) {
    var b = el('button','suggestion'); b.type = 'button'; b.append(el('span','',r.name));
    if (r.subtitle) b.append(el('small','',r.subtitle));
    b.addEventListener('click',function () { choose(r); }); suggestions.append(b);
   });
  });
  document.getElementById('al-search-form').addEventListener('submit',function (e) { e.preventDefault(); run(); });
  input.addEventListener('keydown',function (e) {
   if (e.key === 'Escape') hideSuggestions();
   if (e.key === 'ArrowDown' && !suggestions.hidden) {
    e.preventDefault(); var button = suggestions.querySelector('button'); if (button) button.focus();
   }
  });
  suggestions.addEventListener('keydown',function (e) {
   var buttons = Array.from(suggestions.querySelectorAll('button')), i = buttons.indexOf(document.activeElement);
   if (e.key === 'ArrowDown') { e.preventDefault(); var next = buttons[(i+1)%buttons.length]; if (next) next.focus(); }
   if (e.key === 'ArrowUp') { e.preventDefault(); if (i <= 0) input.focus(); else buttons[i-1].focus(); }
   if (e.key === 'Escape') { hideSuggestions(); input.focus(); }
  });
  root.querySelectorAll('[data-example]').forEach(function (b) { b.addEventListener('click',function () { input.value = b.dataset.example; run(); }); });
  var all = document.getElementById('al-all-names');
  data.slice().sort(function (a,b) { return a.name.localeCompare(b.name,'ru'); }).forEach(function (r) {
   var b = el('button','',r.name); b.type = 'button';
   b.addEventListener('click',function () { choose(r); document.getElementById('al-search-form').scrollIntoView({block:'nearest'}); }); all.append(b);
  });
  document.getElementById('al-show-all').addEventListener('click',function (e) { all.hidden = !all.hidden; e.currentTarget.setAttribute('aria-expanded',String(!all.hidden)); });
  root.dataset.ready = 'true';
 }
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',initialize);
 else initialize();
 if (typeof mw !== 'undefined' && mw.hook) mw.hook('wikipage.content').add(initialize);
}());