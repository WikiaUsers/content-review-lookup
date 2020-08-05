/* Any JavaScript here will be loaded for all users on every page load. */
//списак тастера
function SummaryButtons(){
 var wpSummary = document.getElementById('wpSummary')
 if (!wpSummary || (wpSummary.form.wpSection && wpSummary.form.wpSection.value == 'new')) return
 wpSummaryBtn = document.createElement('span') //global var
 wpSummaryBtn.id = 'userSummaryButtonsA'
 
// +Препорука
 var wpSummaryBtnRec = document.createElement('i');
 wpSummaryBtnRec.appendChild(document.createTextNode('Молим вас, ако можете да одвојите време, описати вашу едит:'));
 wpSummaryBtnRec.appendChild(document.createElement('br'));
 wpSummaryBtn.appendChild(wpSummaryBtnRec);
 
 wpSummary.parentNode.insertBefore(wpSummaryBtn, wpSummary.nextSibling);
 wpSummary.parentNode.insertBefore(document.createElement('br'), wpSummary.nextSibling);
 addSumButton('вести', 'вести', 'Узети у обзир најновије вести');
 addSumButton('викификация', 'викификация', 'Врши викификация');
 addSumButton('делимична викификация', 'делимична викификация', 'Била притисне једно дугме');
 addSumButton('прописи', 'прописи', 'Према правилима');
 addSumButton('дизајн', 'дизајн', 'Дизајн');
 addSumButton('стил', 'стил измене', 'Стил измене');
 addSumButton('граматика', 'граматика', 'Поправлена правопис/интерпункција');
 addSumButton('категоризација', 'категоризација', 'Променити/додати категорије');
 addSumButton('шаблон', 'шаблон', 'Додао/измењен шаблон');
 addSumButton('додатак', 'додатак', 'Додати нове информације');
 addSumButton('разјашњење', 'разјашњење', 'Разјашњење');
 addSumButton('илустрација', 'илустрација', 'Смештен/промењен илустрација');
 addSumButton('ажурирање', 'ажурирање информација', 'Ажуриран застареле информације');
 addSumButton('означавање', 'едит означавање', 'Промена означавање');
 addSumButton('вишак', 'вишак', 'Заиста сувишно');
 addSumButton('интервики', 'интервики', 'Додао/промени линк на овај чланак на другом језику');
 addSumButton('замена слике', 'замена слике', 'Замена слике');
 addSumButton('рад са шаблонима', 'рад са шаблонима', 'Рад са шаблонима');
 addSumButton('грешке', 'грешке', 'Откривене грешке');
 addSumButton('сумње', 'сумње', 'Сумње у чланку');
}
 
//код убаците тастера за брзо опис
function addSumButton(name, text, title) {
 var btn = document.createElement('a');
 btn.appendChild(document.createTextNode(name));
 btn.title = title;
 btn.onclick = function(){insertSummary(text)};
 wpSummaryBtn.appendChild(btn);
 wpSummaryBtn.appendChild(document.createTextNode(' '));
}
 
//код убацивања опис
function insertSummary(text) {
 var wpSummary = document.getElementById('wpSummary')
 if (wpSummary.value.indexOf(text) != -1) return 
 if (wpSummary.value.match(/[^,; \/]$/)) wpSummary.value += ','
 if (wpSummary.value.match(/[^ ]$/)) wpSummary.value += ' '
 wpSummary.value += text
}
 
//позив функције убаците тастера за брзо опис измене приликом учитавања странице
addOnloadHook(SummaryButtons)