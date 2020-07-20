var Champ,tmp, Fen,navigateur; 



//——————————————————————————————————————————————————— 

function btn1(bou) //—— bouton sans paramètre —— 

//——————————————————————————————————————————————————— 

{ 

Fen.focus(); 

Champ.execCommand(bou.name,false,null); 

} 



//——————————————————————————————————————————————————— 

function addImg(bou) // 

//——————————————————————————————————————————————————— 

{ 

Fen.focus(); 

Champ.execCommand('insertImage',false,bou.src); 



} 

//——————————————————————————————————————————————————— 

function addLink(lien) // 

//——————————————————————————————————————————————————— 

{ 

Champ.body.innerHTML= Champ.body.innerHTML+""+prompt("texte commentaire du lien","lien")+""; 

} 

//——————————————————————————————————————————————————————————————————— 

function maj() //—— maj iframe ou textarea avant envoi formulaire —— 

//——————————————————————————————————————————————————————————————————— 

{ var tmp=document.getElementById("txt"); 

if (tmp.style.display=="none") 

{ 

tmp.value=Champ.body.innerHTML; 

} 

else 

{ 

Champ.body.innerHTML=tmp.value; 

} 

frm.submit(); 

} 



//——————————————————————————————————————————————————————————————————— 

function keyPress() //—— pour ie retour chariot devient br au lieu de p ——

//——————————————————————————————————————————————————————————————————— 

{ if(navigateur=="Microsoft Internet Explorer") 

{ 

if(event.keyCode==13) // c est quand je veux detecter LA touche enfonce 



// j ai aussi essaye avec window.event.keyCode 


Champ.body.innerHTML ='coucou'; 

} 

} 

//—————————————————————————————————————————————————— 

function voir(btn) //—— bascule html/Editeur —— 

//—————————————————————————————————————————————————— 

{ var tmp=document.getElementById("txt"); 

if (tmp.style.display=="none") 

{ tmp.style.display="inline"; 

btn.title="Revoir la page"; 

tmp.value=Champ.body.innerHTML; } 

else { tmp.style.display="none"; 

btn.title="Voir le Code HTML"; 

Champ.body.innerHTML=tmp.value; } } 

//———————————————————————————————————————————— 

function initWysiwyg() //—— Initialisation —— 

//———————————————————————————————————————————— 

{ 

navigateur=navigator.appName; 

switch (navigator.appName) 

{ 

// =========================== 

case "Microsoft Internet Explorer": 

// =========================== 

Fen=window.frames['Saisie']; 

Champ=Fen.document; 

Champ.designMode='On'; 

// 
//ATTENTION pour attacher un evenement a l iframe, il faut declarer 
//design mode on avant 


Champ.attachEvent("onkeypress", function evt_ie_keypress(event) { 
setTimeout("javascript:keyPress();" , 1); }); 



break; 

// ===== 

default:// sinon 

// ===== 

Champ=document.getElementById('Saisie').contentDocument; 

Champ.designMode='On'; 

Fen=document.getElementById('Saisie').contentWindow; 


document.getElementById("Saisie").contentWindow.document.addEventListener("keypress", 
function Gecko_Key_Press () { setTimeout("javascript:keyPress();" , 1); 
}, true); 

break; 

} 

Champ.execCommand('FontName', false,'comic sans ms'); 

Champ.execCommand("FontSize", false,2); 

Fen.focus(); 

}