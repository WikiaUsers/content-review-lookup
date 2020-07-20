function xRomixReplaceBookRefs_RusEng(str){
	var str1='';
	for(i=0; i<str.length; i++){
		var c=str.charAt(i);
		if(c=='|') {break;} //по символу | прерываем обработку
		else if(c==' ') {c='_'}
		else if(c=='.') {c='_'}
		else if(c==',') {c='_'}
		else if(c=='-') {c='_'}
		else if(c=='А') {c='А'}
		else if(c=='Б') {c='B'}
		else if(c=='В') {c='V'}
		else if(c=='Г') {c='G'}
		else if(c=='Д') {c='D'}
		else if(c=='Е') {c='E'}
		else if(c=='Ж') {c='ZH'}
		else if(c=='З') {c='Z'}
		else if(c=='И') {c='I'}
		else if(c=='Й') {c='J'}
		else if(c=='К') {c='K'}
		else if(c=='Л') {c='L'}
		else if(c=='М') {c='M'}
		else if(c=='Н') {c='N'}
		else if(c=='О') {c='O'}
		else if(c=='П') {c='P'}
		else if(c=='Р') {c='R'}
		else if(c=='С') {c='S'}
		else if(c=='Т') {c='T'}
		else if(c=='У') {c='U'}
		else if(c=='Ф') {c='F'}
		else if(c=='Х') {c='H'}
		else if(c=='Ц') {c='C'}
		else if(c=='Ч') {c='CH'}
		else if(c=='Ш') {c='SH'}
		else if(c=='Щ') {c='SX'}
		else if(c=='Ъ') {c='_'}
		else if(c=='Ы') {c='Y'}
		else if(c=='Ь') {c='_'}
		else if(c=='Э') {c='YE'}
		else if(c=='Ю') {c='YU'}
		else if(c=='Я') {c='YA'}
		else if(c=='а') {c='a'}
		else if(c=='б') {c='b'}
		else if(c=='в') {c='v'}
		else if(c=='г') {c='g'}
		else if(c=='д') {c='d'}
		else if(c=='е') {c='e'}
		else if(c=='ж') {c='zh'}
		else if(c=='з') {c='z'}
		else if(c=='и') {c='i'}
		else if(c=='й') {c='j'}
		else if(c=='к') {c='k'}
		else if(c=='л') {c='l'}
		else if(c=='м') {c='m'}
		else if(c=='н') {c='n'}
		else if(c=='о') {c='o'}
		else if(c=='п') {c='p'}
		else if(c=='р') {c='r'}
		else if(c=='с') {c='s'}
		else if(c=='т') {c='t'}
		else if(c=='у') {c='u'}
		else if(c=='ф') {c='f'}
		else if(c=='х') {c='h'}
		else if(c=='ц') {c='c'}
		else if(c=='ч') {c='ch'}
		else if(c=='ш') {c='sh'}
		else if(c=='щ') {c='sx'}
		else if(c=='ъ') {c='_'}
		else if(c=='ы') {c='y'}
		else if(c=='ь') {c='_'}
		else if(c=='э') {c='ye'}
		else if(c=='ю') {c='yu'}
		else if(c=='я') {c='ya'}
		;
		
		str1+=c;
	}
	return str1;
}



function xRomixReplaceBookRefs_PaintRefs(str, ob) {
	var anchorTags = document.getElementsByTagName("a");
	for (var i = 0; i < anchorTags.length ; i++)
	{
	  var ob1=anchorTags[i];
	  ob1.style.backgroundColor="";
	} 

	
	ob.style.backgroundColor="yellow";
	
	var n="CITEREF_"+str;
	
	var anchorTags = document.getElementsByTagName("span");
	for (var i = 0; i < anchorTags.length ; i++)
	{
	  var ob=anchorTags[i];
	  var id=ob.id;
	  if (id==n){
		ob.parentNode.style.backgroundColor="#DDEEFF";
	  }else{	
	    ob.parentNode.style.backgroundColor="";
	  }
	}	
	
}


var xRomixReplaceBookRefs_BodyContent;

function xRomixReplaceBookRefs($0,$1,$2) {
//Эта функция вызывается для замены найденного текста.
//Первый параметр функции содержит найденную подстроку, остальные - подсовпадения в найденной строке. 
// http://www.citforum.ru/internet/javascript/js_new13.shtml
  s=""+$0;

  if(s.charAt(1)=='*'){ //Ссылка-цель вида [Это ссылка]
    s=s.slice(2,-1);
	s='<span id="CITEREF_'+xRomixReplaceBookRefs_RusEng(s)+'"><small>['+s+']</small></span>';
  
  }else{ //Ссылка-источник вида [ссылка], у которой есть цель.
    var n=$2;
	var p=n.indexOf("|");
	if(p>=0){
		n=n.substr(0,p);
		//alert(n);
	}
	searchStr="["+n+"]";
	if(xRomixReplaceBookRefs_BodyContent.indexOf(searchStr)!=-1){
		var n=xRomixReplaceBookRefs_RusEng(n);
		s='<a href="#CITEREF_'+n+'" onClick="xRomixReplaceBookRefs_PaintRefs(\''+n+'\', this);"><sup>'+$0+'</sup></a>';
	}
  }
return s;
}

addOnloadHook(function()
{
   if (wgAction=="view"){ //только для страниц просмотра
     var doc=document.getElementById('bodyContent');
     var s=doc.innerHTML;
	 xRomixReplaceBookRefs_BodyContent=s;
     //Регулярное выражение для поиска ссылок в формате [Ссылка 1]
     var reg = /(\[)(.+?)(\])/g
     //Выполняем замену
     s=s.replace(reg,xRomixReplaceBookRefs);
     doc.innerHTML=s;
   }
});