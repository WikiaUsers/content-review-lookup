/*** Disable comments in Old Blogs ***/
 
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este Post de Blog não pode ser comentado porque tem mais de um mês que foi criado.",
    expiryCategories: "Auto-arquivado"
};

var celeLicznikow = [];
if ($("#CountdownTarget1").html()!=undefined) {
if ($("#LiczbaLicznikow").html()==undefined) {
    celeLicznikow.push(Date.parse($("#CountdownTarget1").html()));
	}
 
for (var i = 0; i < $("#LiczbaLicznikow").html(); i++) { 
    celeLicznikow.push(Date.parse($("#CountdownTarget"+(i+1)).html()));
}
}
function startTime() {
 /*var c_target = document.getElementById('CountdownTarget');
 var c_timer = document.getElementById('CountdownTimer');*/
 if($("#CountdownTarget1") != undefined) {
  var dt=new Date().getTime();
  for (var i=0; i < celeLicznikow.length; i++) {
  var dr = celeLicznikow[i];
  /*var h=today.getHours();
  var m=today.getMinutes();
  var s=today.getSeconds();*/
  var d=Math.floor((dr-dt) / 86400000);
//Teraz następuje sprawdzenie, czy czas do podanej daty już minął i ewentualne zatrzymanie licznika
 if (d<0){
   $("#CountdownTimer"+(i+1)).html('<tr><td>0<br /><span class="CountdownLabel">Dia(s)</span></td><td>0<br /><span class="CountdownLabel">Hora(s)</span></td><td>00<br /><span  class="CountdownLabel">Minuto(s)</span></td><td>00<br /><span class="CountdownLabel">Segundo(s)</span></td>');
  }
//Jeśli czas jeszcze nie minął, to skrypt jest kontynuowany
 else {
  var h1=Math.floor((dr-dt) % 86400000 / 3600000);
  var m1=checkTime(Math.floor((dr-dt) % 86400000 % 3600000 / 60000));
  var s1=checkTime(Math.floor((dr-dt) % 86400000 % 3600000 % 60000 / 1000 ));
 
  /*m=checkTime(m);
  s=checkTime(s);
  m1=checkTime(m1);
  s1=checkTime(s1);*/
 
   $("#CountdownTimer"+(i+1)).html('<tr><td>' + d + '<br /><span class="CountdownLabel">' + liczbaMnoga(d, 'Dzień', 'Dni', 'Dni') + '</span></td>' + '<td>' + h1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(h1, 'Godzinę', 'Godziny', 'Godzin') + '</span></td>' + '<td>' + m1 + '<br /><span  class="CountdownLabel">' + liczbaMnoga(m1, 'Minutę', 'Minuty', 'Minut') + '</span></td>' + '<td>' + s1 + '<br /><span class="CountdownLabel">' + liczbaMnoga(s1, 'Sekundę', 'Sekundy', 'Sekund') + '</span></td>');
   }}
   t=setTimeout('startTime()',500);
 }
}
 
function checkTime(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
 
addOnloadHook(startTime);

//////////////////////
// SUPORTE DE PREDEFINIÇÃO //
//////////////////////

// Suporte para [[Predefinição:Emote]] por Bobogoobo mlp.wikia.com
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
              new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' + 
              emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
              ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img />', {'src':url, 'alt':emote}));
            }
        }

        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['1467'].revisions[0]['*'];
            // 1467 is the wgArticleId of MediaWiki:Emoticons

            $('.emote-template').each(function() {
                emotify($(this));
            });
        });

        $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
            if ($('.emote-template').length === $('.emote-template img').length) {
                return;
            }

            $('#WikiaArticleFooter .emote-template').each(function() {
                if (!($(this).children('img').length)) {
                    emotify($(this));
                }
            });
        });
    });
}

// Special:BlankPage-based scripts
//   All transcript lister by Bobogoobo - http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=transcrições
if (mw.config.get('wgPageName') === 'Especial:Página em branco' && mw.util.getParamValue('blankspecial')) {
    importArticle('Predefinição:Sandbox/' + {
            'transcrições': 'AllTranscripts',
        }[mw.util.getParamValue('blankspecial')]
    );
}