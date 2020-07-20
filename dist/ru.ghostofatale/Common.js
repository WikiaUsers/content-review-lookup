/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* 1. Скрипт падежного исправления */

function getNumEnding(iNumber, aEndings) { // функция обмена слов
 var sEnding, i;
 iNumber = iNumber % 100; // остаток от деления на сотню
 if (iNumber >= 11 && iNumber <= 19) { // если 11-19
  sEnding=aEndings[2]; // "страниц"
 } else {
  i = iNumber % 10; // остаток от деления на десяток
  switch (i) {
   case (1): sEnding = aEndings[0]; break; // 1, 21 "страница"
   case (2):
   case (3):
   case (4): sEnding = aEndings[1]; break; // 2-4, 22-24 "страницы"
   default: sEnding = aEndings[2]; // 5-10, 20, 25-30 "страниц"
  }
 }
 return sEnding;
}

var value = document.getElementsByClassName("wds-community-header__counter-value")[0].innerHTML * 1, // получение цифры страниц, перевод в integer
    label = document.getElementsByClassName("wds-community-header__counter-label")[0],lin = label.innerHTML, // получение исходного слова
    line = ['Cтраница','Cтраницы','Cтраниц'], // строка замен
    nword = getNumEnding(value,line); // вызов функции обмена исходного слова на замену
label.innerHTML = lin.replace(lin,nword); // вставка исправления