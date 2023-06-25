/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
 
/* TOOLTIPS 
----первое число представляет описание; пусто = нет описания, 2 = есть описание----
----второе число представляет количество эффектов
*/

window.tooltips_list = [
        {
        classname: 'item-tooltip',
        parse: '{' + '{Template:Item tip|1=<#name#>|2=<#color#>|3=<#text#>|4=<#text2#>|o=<#obtain#>|o1=<#obtain1#>|o1a=<#a#>|o1b=<#b#>|o1c=<#c#>|o1d=<#d#>|o2=<#obtain2#>|title=<#title#>|link=<#link#>}}',
    },  {
        classname: 'enemy-tooltip',
        parse: '{' + '{Template:Enemy tip|1=<#name#>|2=<#codename#>|3=<#dura#>|4=<#atk#>|5=<#def#>|6=<#rist#>|title=<#title#>|link=<#link#>}}',
    },  {
        classname: 'character-tooltip',
        parse: '{' + '{Template:Character tip|1=<#name#>|2=<#class#>|3=<#rarity#>|4=<#faction#>|5=<#left#>|6=<#top#>|title=<#title#>|link=<#link#>}}',
    },	{
        classname: 'collection-tooltip',
        parse: '{' + '{Template:Collection tip|1=<#name#>|2=<#text1#>|3=<#text2#>|no=<#no#>|e=<#event#>|q=<#quality#>|c=<#condition#>|n=<#note#>}}',
    },	{
        classname: 'furniture-tooltip',
        parse: '{' + '{Template:Furniture tip|1=<#name#>|2=<#text1#>|3=<#text2#>|title=<#title#>|a=<#ambience#>|t1=<#type#>|t2=<#theme#>|s=<#set#>|o=<#obtain#>|o1a=<#obtain1a#>|o1b=<#obtain1b#>|o1c=<#obtain1c#>}}',
    },	{
        classname: 'outfit-tooltip',
        parse: '{' + '{Template:Outfit tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text3#>|m=<#model#>|s1=<#skin#>|i=<#illustrator#>|s2=<#series#>|o=<#obtain#>}}',
    },	{
        classname: 'glossary',
        parse: '{' + '{Template:Glossary tip|1=<#name#>|2=<#text1#>|3=<#text2#>|4=<#text3#>|title=<#title#>}}',
    },	{
        classname: 'sticker-tooltip',
        parse: '{' + '{Template:Sticker tip|1=<#name#>|2=<#text1#>|3=<#text2#>|u=<#use#>|r=<#rarity#>|o=<#obtain#>}}',
    }
];

src= [https://kit.fontawesome.com/c60fd2b490.js" crossorigin="anonymous"]

const db = [
      {
        "name": "Saria",
        "position": "Melee",
        "tags": ["Defense", "Healing", "Support"],
        "stars": 6
      },
      {
        "name": "Ceobe",
        "position": "Ranged",
        "tags": ["DPS", "Crowd Control"],
        "stars": 6
      },
    ];

    const max_clicked = {
      "qualification": 2,
      "position": 1,
      "class": 3,
      "affix": 3,
    };
    
    stolenurl = {
      "Saria":"https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_202_demkni.png",
      "Ceobe":"https://raw.githubusercontent.com/Aceship/Arknight-Images/main/avatars/char_2013_cerber.png",
    }

    function activatediv(div) {
      div.classList.add("active");
    }

    function deactivatediv(div) {
      div.classList.remove("active");
    }

    function alldivsActive(block) {
      return block.querySelectorAll(".active").length === max_clicked[block.classList[1]];
    }

    function getElements(block) {
      let elements = [];
      if (block.classList.contains("position")) {
        elements = db.filter(operator => operator.position === block.querySelector(".active").textContent);
      } else {
        elements = db.filter(operator => operator.tags.includes(block.querySelector(".active").textContent));
      }
      elements.sort((a, b) => b.stars - a.stars);
      return elements;
    }
    
function getImage(name) {
  return stolenurl[name]
}

async function renderElements(elements) {
  document.getElementById("results").innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("results");
  for (const operator of elements) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.style.width = "40px";
    img.src = await getImage(operator.name);
    const stars = document.createElement("span");
    for (let i = 0; i < operator.stars; i++) {
      const star = document.createElement("i");
      star.classList.add("fa", "fa-star");
      star.style.color = "gold";
      stars.appendChild(star);
    }
    const name = document.createElement("span");
    name.textContent = operator.name;
    const col1 = document.createElement("div");
    col1.classList.add("col1");
    col1.appendChild(img);
    const col2 = document.createElement("div");
    col2.classList.add("col2");
    col2.appendChild(stars);
    col2.appendChild(name);
    li.appendChild(col1);
    li.appendChild(col2);
    div.appendChild(li);
  }
  document.getElementById("results").appendChild(div);
}


    // Bind an event listener to each div in each block
    for (const block of document.querySelectorAll(".block")) {
      for (const div of block.querySelectorAll("div")) {
        div.addEventListener("click", () => {
          // If the div does not have the "active" class
          if (!div.classList.contains("active")) {

            // If not all divs in the block have the "active" class
            if (!alldivsActive(block)) {
              // Add the "active" class to the div
              activatediv(div);
            }
          } else {
            // Remove the "active" class from the div
            deactivatediv(div);
          }
          regenerateResult()
        });
      }
    }

    function regenerateResult() {
      // Get all the active divs
      const activedivs = document.querySelectorAll(".active");
      // Create an empty array to store the elements that match at least one of the active divs
      const elements = [];
      // Loop through all the active divs
      for (const div of activedivs) {
        // Get the elements that match the div's criteria
        const filteredElements = db.filter(operator => (operator.tags.includes(div.textContent) || operator.position === div.textContent) && !elements.includes(operator));
        // Add the filtered elements to the elements array
        elements.push(...filteredElements);
      }
      // Sort the elements by stars in decreasing order
      elements.sort((a, b) => b.stars - a.stars);
      // Render the elements
      renderElements(elements);
    }