/* <nowiki> */
 
var charinsert = {
  "Стандартные":[
    [ ["„","“","","Типографические кавычки"],["’","","","Паостроф"],["‚","‘","","Простые кавычки"],
      ["“","”","","Кавычки (англ.)"],["‘","’","","Простые кавычки (англ.)"],
      ["«","»","","Кавычки (швейц.)"],["‹","›","","Простые кавычки (швейц.)"],
      ["»","«","","Заострённые кавычки"],["›","‹","","Простые заострённые кавычки"],
      ["–","","","тире/отступ"] ],
    [ "+", ["−","","","Знак вычитания"], ["·","","","Знак умножения"], "×", "÷", "≈", "≠", "±", "≤", "≥",
      "²", "³", "½", "†", "#", "*", "‰", "§", "€", "¢", "£", "¥", "$", "¿", "¡", "∞", "•", "…", "→", "↔" ],
    [ ["&nbsp;","","","Обязательный пробел"], ["[","]","","Внешняя ссылка"], ["[[","]]","","Внутренняя ссылка"], ["|","","","Вертикальная линия"],
      ["{{","}}","","Вставка шаблона"], ["~~~~","","","Подпись"] ],
    [ ["°","","","Градус"], ["′","","","Минута (символ)"], ["″","","","Секунда (символ)"] ]
  ],
  "Викификация":[
    [ [ "[[Категория:","]]" ], [ "[[Файл:","]]" ], [ "{{DISPLAYTITLE:","}}" ], [ "{{SORTIERUNG:","}}" ],
    [ "#REDIRECT [[","]]" ] ], [ "{{неоднозначность}}", "{{неоднозначность}}",
    [ [ "<ref>","<\/ref>" ], [ "<ref name=\"","\"><\/ref>" ], [ "<ref name=\"", "\" \/>" ], "<references \/>" ],
    [ [ "<nowiki>","<\/nowiki>" ], [ "<code>","<\/code>" ], [ "<syntaxhighlight lang=\"","\"><\/syntaxhighlight>" ],
     [ "<noinclude>","<\/noinclude>" ], [ "<includeonly>","<\/includeonly>" ], [ "<onlyinclude>","<\/onlyinclude>" ],
     [ "<math>","<\/math>" ] ],
    [ [ "== "," ==\n", "", "Размер шрифта 2" ], [ "=== "," ===\n", "", "Размер шрифта 3" ] ]
  ],
  "Символы МФА":[
    { "class":"IPA" },
    ["p", "t̪", "t", "ʈ", "c", "k", "q", "ʡ", "ʔ"],
    ["b", "d̪", "d", "ɖ", "ɟ", "ɡ", "ɢ"],
    ["ɓ", "ɗ", "ʄ", "ɠ", "ʛ"],
    ["t͡s", "t͡ʃ", "t͡ɕ", "d͡z", "d͡ʒ", "d͡ʑ"],
    ["ɸ", "f", "θ", "s", "ʃ", "ʅ", "ʆ", "ʂ", "ɕ", "ç", "ɧ", "x", "χ", "ħ", "ʜ", "h"],
    ["β", "v", "ʍ", "ð", "z", "ʒ", "ʓ", "ʐ", "ʑ", "ʝ", "ɣ", "ʁ", "ʕ", "ʖ", "ʢ", "ɦ"],
    ["ɬ", "ɮ"],
    ["m", "m̩", "ɱ", "ɱ̩", "ɱ̍", "n̪", "n̪̍", "n", "n̩", "ɳ", "ɳ̩", "ɲ", "ɲ̩", "ŋ", "ŋ̍", "ŋ̩", "ɴ", "ɴ̩"],
    ["ʙ", "ʙ̩", "r", "r̩", "ʀ", "ʀ̩"],
    ["ɾ", "ɽ", "ɿ", "ɺ"],
    ["l̪", "l̪̩", "l", "l̩", "ɫ", "ɫ̩", "ɭ", "ɭ̩", "ʎ", "ʎ̩", "ʟ", "ʟ̩"],
    ["w", "ɥ", "ʋ", "ɹ", "ɻ", "j", "ɰ"],
    ["ʘ", "ǂ", "ǀ", "ǃ", "ǁ"],
    ["ʰ", "ʱ", "ʷ", "ʸ", "ʲ", "ʳ", "ⁿ", "ˡ", "ʴ", "ʵ", "ˢ", "ˣ", "ˠ", "ʶ", "ˤ", "ˁ", "ˀ", "ʼ"],
    ["i", "i̯", "ĩ", "y", "y̯", "ỹ", "ɪ", "ɪ̯", "ɪ̃", "ʏ", "ʏ̯", "ʏ̃", "ɨ", "ɨ̯", "ɨ̃", "ʉ", "ʉ̯", "ʉ̃", "ɯ", "ɯ̯", "ɯ̃",
     "u", "u̯", "ũ", "ʊ", "ʊ̯", "ʊ̃"],
    ["e", "e̯", "ẽ", "ø", "ø̯", "ø̃", "ɘ", "ɘ̯", "ɘ̃", "ɵ", "ɵ̯", "ɵ̃", "ɤ", "ɤ̯", "ɤ̃", "o", "o̯", "õ"],
    ["ɛ", "ɛ̯", "ɛ̃", "œ", "œ̯", "œ̃", "ɜ", "ɜ̯", "ɜ̃", "ə", "ə̯", "ə̃", "ɞ", "ɞ̯", "ɞ̃", "ʌ", "ʌ̯", "ʌ̃", "ɔ", "ɔ̯", "ɔ̃"],
    ["æ", "æ̯", "æ̃", "ɶ", "ɶ̯", "ɶ̃", "a", "a̯", "ã", "ɐ", "ɐ̯", "ɐ̃", "ɑ", "ɑ̯", "ɑ̃", "ɒ", "ɒ̯", "ɒ̃"],
    ["ˈ", "ˌ", "ː", "ˑ", "˘", ".", "‿", "|", "‖"]
  ]
};
 
addOnloadHook(function() {
addOnloadHook(function() {
  var box;
  function loadCommonsTools() {
    function selectSubset() {
      var pp = box.getElementsByTagName("p");
      for (var i=0; i<pp.length; ++i) {
        pp[i].style["display"] = "none";
      }
      //show/create current subset
      var id = sel.options[sel.selectedIndex].value;
      var p = document.getElementById(id);
      if(!p) {
        p = document.createElement('p');
        p.setAttribute("id", id);
        p.setAttribute("class", "mwEdittoolsLanguage");
        createTokens(p, charinsert[id.substr("mwEdittools--".length)]);
        box.appendChild(p);
      }
      p.style["display"] = "inline";
    }
 
    function createTokens(paragraph, outerArr) {
      var buttons;
 
      function insertInner(elem) {
        var a = false, ins;
        switch(typeof(elem)) {
          case("string"): {
            ins = function() {
              insertTags(elem, "", "");
              return false;
            };
            a = document.createElement("a");
            a.setAttribute("title", elem);
            a.appendChild(document.createTextNode(elem));
          } break;
          case("array"):
          case("object"): {
            ins = function() {
              insertTags(elem[0], elem[1] || "", elem[2] || "");
              return false;
            };
            a = document.createElement("a");
            a.setAttribute("title", elem[3] || (elem[0] + (elem[2] || "…") + (elem[1] || "")));
            a.appendChild(document.createTextNode(elem[4] || (elem[0] + (elem[1] || ""))));
          }; break;
        }
        if(a !== false) {
          a.onclick = ins;
          a.setAttribute("href", "#");
          a.setAttribute("class", "mwEdittoolsButton");
          buttons.appendChild(document.createTextNode(" "));
          buttons.appendChild(a);
        }
      }
 
      function insertOuter(innerArr) {
        switch(typeof(innerArr)) {
          case("object"):
          case("array"):
            var obj = false;
            if(typeof(innerArr["class"]) === "string") {
              obj = true;
              paragraph.setAttribute("class", innerArr["class"]);
            }
            if(typeof(innerArr["lang"]) === "string") {
              obj = true;
              paragraph.setAttribute("lang", innerArr["lang"]);
            }
            if(typeof(innerArr["direction"]) === "string") {
              obj = true;
              paragraph.style.direction = innerArr["direction"];
            }
            if(typeof(innerArr["font-family"]) === "string") {
              obj = true;
              paragraph.style.fontFamily = innerArr["font-family"];
            }
            if(typeof(innerArr["font-size"]) === "string") {
              obj = true;
              paragraph.style.fontSize = innerArr["font-size"];
            }
            if(obj) {
              return false;
            }
            buttons = document.createElement("span");
            buttons.setAttribute("class", "mwEdittoolsButtons");
            for(var i = 0; i<innerArr.length; ++i) {
              insertInner(innerArr[i]);
            }
            paragraph.appendChild(buttons);
            return true;
          default:
            return false;
        }
      }
 
      if(outerArr.length == 0) { return; }
      for(var i=0; i<outerArr.length-1; ++i) {
        if(insertOuter(outerArr[i])) {
          var s = document.createElement("span");
          s.appendChild(document.createTextNode("\xA0\xA0•\xA0 "));
          s.style["font-weight"] = "bold";
          paragraph.appendChild(s);
        }
      }
      insertOuter(outerArr[outerArr.length-1]);
    }
 
    //create drop-down select
    var sel = document.createElement("select");
    for(var id in charinsert) {
      var op = document.createElement("option");
      op.setAttribute("value", "mwEdittools--" + id);
      op.appendChild(document.createTextNode(id));
      sel.appendChild(op);
    }
    sel.setAttribute("title", "Выбрать класс");
    sel.onchange = sel.onkeyup = selectSubset;
    box.appendChild(sel);
    box.appendChild(document.createTextNode(" "));
    selectSubset();
    return false;
  }
 
  //get div#mw-editTools
  box = document.getElementById('mw-editTools');
  if(!box) { return; }
 
  box = box.appendChild(document.createElement("div"));
  box.setAttribute("id", "specialchars");
 
  loadCommonsTools();
})
});
/* </nowiki> */