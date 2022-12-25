//Summary buttons 
function SummaryButtons(){
 
 var sum = document.getElementById('wpSummary');
 
 if (!sum || (sum.form.wpSection && sum.form.wpSection.value == 'new')) return;
 var sp = document.createElement('div'); sp.id = 'userSummaryButtonsA';
// sum.parentNode.insertBefore(document.createElement('br'), sum.nextSibling);
 sum.parentNode.insertBefore(sp, sum.nextSibling);
 
 
 addSumButton('викиф.', 'викификация', 'Произведена викификация');
 addSumButton('оформл.', 'оформление', 'Улучшено оформление');
 addSumButton('стиль', 'стилевые правки', 'Поправлен стиль изложения');
 addSumButton('орфогр.', 'орфография', 'Поправлена орфография');
 addSumButton('пункт.', 'пунктуация', 'Изменена пунктуация');
 addSumButton('интервики', 'интервики', 'Исправлены межъязыковые ссылки (интервики)');
 addSumButton('кат.', 'категория', 'Исправлена категоризация');
 addSumButton('шаб.', 'шаблон', 'Добавлен / изменён шаблон');
 addSumButton('к удал.', 'к удалению', 'Страница предложена к удалению');
 addSumButton('доп.', 'дополнение', 'Добавлены новые сведения');
 addSumButton('иллюстрация', 'иллюстрация', 'Размещена иллюстрация');
 addSumButton('обнов.', 'обновление данных', 'Обновлены устаревшие данные');
 
 
 $(sp).children("a").css({display:'inline-block'});
 
}
 
function addSumButton(name, text, title) {
 var btn = document.createElement('a');
 btn.appendChild(document.createTextNode(name));
 btn.title = title;
 btn.onclick = function(){insertSummary(text)};
 document.getElementById('userSummaryButtonsA').appendChild(btn);
}
 
function insertSummary(text) {
 var sum = document.getElementById('wpSummary');
 if (sum.value.indexOf(text) != -1) return ;
 if (sum.value.match(/[^,; \/]$/)) sum.value += ',';
 if (sum.value.match(/[^ ]$/)) sum.value += ' ';
 sum.value += text;
}
 
addOnloadHook(SummaryButtons);