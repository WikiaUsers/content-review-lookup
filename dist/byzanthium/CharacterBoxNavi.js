/**************************************************************/
/*************** CharacterBox - Flip Navigation ***************/
/**************************************************************/

var currentHideCharSection = "Charx";

function hideshow(name){
  if(currentHideCharSection!=name){
    var pos = currentHideCharSection.lastIndexOf("x");
    var posn = name.lastIndexOf("x");
    document.getElementById(currentHideCharSection).style.display = "none";
    document.getElementById(currentHideCharSection.slice(0, pos)+"s").firstChild.id = "NAD";
    document.getElementById(name).style.display = "block";
    document.getElementById(name.slice(0, posn)+"s").firstChild.id = "SecActive";
    currentHideCharSection=name;
  }
}

if(document.getElementById('CharacterBox')){
  if(document.getElementById('Chars')){
    document.getElementById('Chars').onmouseover = function(){hideshow('Charx');};
  }
  if(document.getElementById('Backgs')){
    document.getElementById('Backgs').onmouseover = function(){hideshow('Backgx');};
  }
  if(document.getElementById('Vamps')){
    document.getElementById('Vamps').onmouseover = function(){hideshow('Vampx');};
  }
  if(document.getElementById('Facts')){
    document.getElementById('Facts').onmouseover = function(){hideshow('Factx');};
  }
  if(document.getElementById('Appears')){
    document.getElementById('Appears').onmouseover = function(){hideshow('Appearx');};
  }
  if(document.getElementById('Advans')){
    document.getElementById('Advans').onmouseover = function(){hideshow('Advanx');};
  }
}

/**************************************************************/
/*************** CharacterBox - Flip Navigation ***************/
/***************              End               ***************/
/**************************************************************/