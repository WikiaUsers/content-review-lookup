/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
 
/* TOOLTIPS 
----первое число представляет описание; пусто = нет описания, 2 = есть описание----
----второе число представляет количество эффектов
*/

window.tooltips_list = [
        {
        classname: 'item-tooltip',
        parse: '{' + '{Template:Item tip|1=<#name#>|2=<#color#>|3=<#text#>|4=<#text2#>|5=<#text2b#>|6=<#text2c#>|o=<#obtain#>|o1=<#obtain1#>|o1a=<#a#>|o1b=<#b#>|o1c=<#c#>|o1d=<#d#>|o2=<#obtain2#>|title=<#title#>|link=<#link#>}}',
    },  {
        classname: 'enemy-tooltip',
        parse: '{' + '{Template:Enemy tip|1=<#name#>|2=<#codename#>|3=<#hp#>|4=<#atk#>|5=<#def#>|6=<#res#>|race=<#race#>|type=<#type#>|title=<#title#>|link=<#link#>}}',
    },  {
        classname: 'character-tooltip',
        parse: '{' + '{Template:Character tip|1=<#name#>|2=<#class#>|3=<#rarity#>|4=<#faction#>|5=<#left#>|6=<#top#>|title=<#title#>|link=<#link#>}}',
    },	{
        classname: 'collectible-tooltip',
        parse: '{' + '{Template:Collectible tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text2b#>|5=<#text2c#>|t=<#type#>|no=<#no#>|e=<#event#>|q=<#quality#>|c=<#condition#>}}',
    },	{
        classname: 'furniture-tooltip',
        parse: '{' + '{Template:Furniture tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text2b#>|5=<#text2c#>|title=<#title#>|a=<#ambience#>|t1=<#type#>|t2=<#theme#>|s=<#set#>|o=<#obtain#>|o1a=<#obtain1a#>|o1b=<#obtain1b#>|o1c=<#obtain1c#>}}',
    },	{
        classname: 'outfit-tooltip',
        parse: '{' + '{Template:Outfit tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text3#>|m=<#model#>|s1=<#skin#>|i=<#illustrator#>|s2=<#series#>|o=<#obtain#>}}',
    },	{
        classname: 'glossary',
        parse: '{' + '{Template:Glossary tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text3#>|title=<#title#>}}',
    },	{
        classname: 'profile-picture-tooltip',
        parse: '{' + '{Template:Profile picture tip|1=<#name#>|2=<#text#>|d=<#default#>|o=<#obtain#>}}',
    }
];
var oggPlayerButtonOnly = false;
// Данные для примера (замените на свои)
const operators = [
  { name: "Экзусiai", tags: ["Медуй", "ДПС", "Выносливость"] },
  { name: "SilverAsh", tags: ["Лидер", "ДПС", "Выживание"] }
];

const tags = ["Медуй", "ДПС", "Лидер", "Выносливость", "Выживание"];

// Инициализация тегов
function initTags() {
  const container = document.getElementById("tag-buttons");
  tags.forEach(tag => {
    const btn = document.createElement("div");
    btn.className = "tag-button";
    btn.textContent = tag;
    btn.onclick = () => btn.classList.toggle("selected");
    container.appendChild(btn);
  });
}

// Расчет результатов
function calculate() {
  const selectedTags = Array.from(document.querySelectorAll(".tag-button.selected"))
    .map(btn => btn.textContent);

  const filtered = operators.filter(op => 
    selectedTags.every(tag => op.tags.includes(tag))
  );

  displayResults(filtered);
}

// Отображение результатов
function displayResults(data) {
  const results = document.getElementById("results");
  results.innerHTML = data.map(op => 
    `<div class="result-item">${op.name} (${op.tags.join(", ")})</div>`
  ).join("");
}

// Запуск при загрузке
window.onload = initTags;