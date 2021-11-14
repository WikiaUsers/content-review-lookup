(function(){
var no = 8; // число снежинок
var speed = 10; // шаг в миллисекундах
var resizeCheck = 100; // через сколько шагов перепроверять размер окна
var resizeCheckCounter = resizeCheck;
var snowflake = "https://gamepedia.cursecdn.com/hytale_ru_gamepedia/4/4e/Snow.png";

var dx, xp, yp; 
var am, stx, sty; 
var i, doc_width = 800, doc_height = 600;
//doc_width = document.body.scrollWidth;
//doc_height = document.body.scrollHeight;
doc_width = window.innerHeight;
doc_height = window.innerWidth;
dx = new Array();
xp = new Array();
yp = new Array();
am = new Array();
stx = new Array();
sty = new Array();
for (i = 0; i < no; ++ i) {  
dx[i] = 0;         
xp[i] = Math.random()*(doc_width-50); // случ. число от 0 до (ширины окна - 50) = начальное положение по горизонтали
yp[i] = Math.random()*doc_height; // случ. число от 0 до высоты окна = начальное положение по вертикали
am[i] = Math.random()*20;  // случ. число от 0 до 20 = амплитуда колебаний вдоль x          
stx[i] = 0.02 + Math.random()/10; // случ. число от 0.02 до 0.12 = смещение по горизонтали (x) за 1 шаг
sty[i] = 0.7 + Math.random();  // случ. число от 0.7 до 1.7 = смещение по вертикали (y) за 1 шаг
document.write("<div id=\"dot"+ i +"\" style=\"position:fixed; z-index: 10; visibility:visible; top: 15px; left: 15px;\"><img src=\""+snowflake+"\" border=\"0\" alt=\"Снежинка\"></div>");
}

function snow() { 
	for (i = 0; i < no; ++ i) { 
		yp[i] += sty[i];
		dx[i] += stx[i];
		if (yp[i] > doc_height-50)  {  // если снежинка достигла дна, то возвращаю ее наверх и меняю ее характеристики
			yp[i] = 0;
			xp[i] = Math.random()*(doc_width-50);
			stx[i] = 0.02 + Math.random()/10;
			sty[i] = 0.7 + Math.random();
		}
	document.getElementById("dot"+i).style.top = ( yp[i] | 0 ) + "px";
	document.getElementById("dot"+i).style.left = ( xp[i] + am[i]*Math.sin(dx[i]) | 0 ) + "px";
	}
	if( --resizeCheckCounter <= 0 )  {
		doc_width = window.innerWidth;
		doc_height = window.innerHeight;
		resizeCheckCounter = resizeCheck;
	}
window.setTimeout(snow, speed);
}
snow();
})();