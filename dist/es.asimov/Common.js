FBadd=function()
 {
  var pgid='1600918123483223';
  var wurl='http://es.asimov.wikia.com/wiki/';
  var btid='#WikiaPageHeader';
  var bxid='#WikiaRail';
  
  // Inicialización de Facebook JS-SDK
  $('body').append('<div id="fb-root"></div>');
  (
   function(d,s,id)
    {
     var a,b=d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     a=d.createElement(s);
     a.id=id;
     a.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.3&appId=51181430795";
     b.parentNode.insertBefore(a,b);
    }(document, 'script', 'facebook-jssdk')
  );

  // Agrega caja de Facebook
  $(bxid).children().first().after('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id='+pgid+'&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="280" height="250" scrolling="no" />');

  // Si es artículo, agrega botones de "Me gusta" y "Compartir"
  var div='<div style="position:relative;top:-1em">';
  if(false&&('view'==wgTransactionContext.action)&&!wgTransactionContext.namespace)
   $(btid).children().first().after(
     $('<div style="float:right;padding-right:9em" align="right">'+div+'<div class="fb-like" data-href="'+wurl+wgPageName+'" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true">')
      .append(
        $(div).append( $(btid).children().slice(1,-1) )
       )
    ); //:.after(…
 } //:function
 
var leer_codigos_usuario=function()
{
 $.ajax('http://es.asimov.wikia.com/wiki/Usuario:'+wgUserName+'/Obras_le%C3%ADdas?action=raw',{error:function(e){console.log('Error al adquirir obras leídas',e);},success:function(t)
  {
   var lpu={'pat':/\{\{\s*Leído\s*\|([^\|\}]+)(?:\|([^\|\}]*))?\}\}/ig};
   var a=t.match(lpu.pat);
   if(a&&('length' in a)) for(var i=0;i<a.length;i++)
    {
     lpu.pat.lastIndex=0;
     var b=lpu.pat.exec(a[i]);
     if(b&&(1 in b)) lpu[b[1]]=(undefined===b[2])?100:b[2];
    }
   a=$('.lpu');
   if(a&&('length' in a))
    for(var i=0;i<a.length;i++)
     for(var j=0;j<a[i].classList.length;j++)
      {
       var b=/^lpu_(.*)$/.exec(a[i].classList[j]),c;
       if(b&&('length' in b)&&(b.length>1)&&(b[1] in lpu))
       {
        var c=lpu[b[1]];
        a[i].title=a[i].alt=c+'% completado';
        var d=a[i].children[0].children;
        d[0].style.width=c+'%';
        d[1].style.width=(100-c)+'%';
       } //:if
      } //:for j
  } // :function success
 });
}; //:function leer_codigos_usuario

$(FBadd);
$(leer_codigos_usuario)