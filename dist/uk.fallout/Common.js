/**
 *
 * English: Open a popup with parameters to generate an array. 
 * The number of rows/columns can be modified. Some additional
 * parameters are related to templates available on :fr
 *
 * @author: fr:user:dake
 * @version: 0.1
 */
function popupTable()
{
  var popup = window.open('','name','height=180,width=300,scrollbars=yes');
 
  javaCode =  '<script type="text\/javascript">function insertCode(){';
  javaCode += 'var row = parseInt(document.paramForm.inputRow.value); '
  javaCode += 'var col = parseInt(document.paramForm.inputCol.value); '
  javaCode += 'var bord = 0; '
  javaCode += 'var styleHeader = false; '
  javaCode += 'var styleLine = false; '
  javaCode += 'var exfield = false; '
  javaCode += 'var align = document.paramForm.inputAlign.value; '
  javaCode += 'var padding = false; '
  javaCode += 'window.opener.generateTableau(col,row,bord,styleHeader,styleLine,exfield,align,padding); '
  javaCode += "alert('Таблицю створено!'); "
  javaCode += 'window.close(); '
  javaCode += '}<\/script>';
 
  popup.document.write('<html><head><title>Створення таблиці</title>');
  popup.document.write('<script type="text\/javascript" src="\/skins-1.5\/common\/wikibits.js"><!-- wikibits js --><\/script>');
  popup.document.write('<style type="text\/css" media="screen,projection">/*<![CDATA[*/ @import "\/skins-1.5\/monobook\/main.css?5"; /*]]>*/<\/style>');
  popup.document.write(javaCode); 
  popup.document.write('</head><body>');
  popup.document.write('<p>Введіть параметри таблиці: </p>');
  popup.document.write('<form name="paramForm">');
  popup.document.write('Вирівнювання&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="text" name="inputAlign" value="center" ><p>');
  popup.document.write('Кількість рядків&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <input type="text" name="inputRow" value="3" ><p>');
  popup.document.write('Кількість стовпчиків: <input type="text" name="inputCol" value="3" ><p>');
  popup.document.write('</form">');
  popup.document.write('<p><a href="javascript:insertCode()">Вставити таблицю</a>     |');
  popup.document.write('    <a href="javascript:self.close()">Відмінити (зачинити вікно)</a></p>');
  popup.document.write('</body></html>');
  popup.document.close();
}
 
/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();
/* {{nologo}} */
function noLogo() { if(document.getElementById('nologo'))
  document.getElementById('p-logo').style.display = 'none';
}
addOnloadHook(onPageInit);
 
function onPageInit()
{
    noLogo();
}

/* Додаткова статистика для користувачів */
mw.hook('wikipage.content').add(function ($content) {
    var msg = {
        nodata: '<span class="udu-nodata">Немає даних</span>',
        reqfailed: 'Error: Request failed.',
        cantavatar: 'Error: Cannot obtain user avatar.',
        usernotfound: 'Користувача не знайдено',
        delimiter: '<span class="udu-delim">, </span>',
    };
    var requestMax = 6,
        requestThreshold = 300,
        requestCount = 0,
        requests = [],
        rejected = 0,
        names = $content.find('.infobox-nicknames').text()
            .split('/')
            .map(function(v){return (v||'').trim()})
            .filter(Boolean),
        nickname = mw.config.get('wgTitle').replace( /^[^/]+\//, '' );
    if ($content.find('.infobox-gender').length || $content.find('.infobox-registration-date').length || $content.find('.infobox-editcount')) {
        if ( mw.config.get( 'wgNamespaceNumber' ) !== 0 ) {
            $content.find( '.pi-title .user-link' ).html(
                $( '<a />', {
                    href: '/wiki/User:' + (names[0] || nickname),
                    target: '_blank'
                }).append(
                    $('<span>', {
                        class: 'udu-nickname',
                        text: names[0] || nickname
                    })
                )
            );
        }
 
        $.ajax({
            url: mw.util.wikiScript('api'),
            data: {
                format: 'json',
                action: 'query',
                list: 'users',
                ususers: names[0] || nickname,
                usprop: 'registration|gender|editcount'
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                if (data) {
                    switch (data.query.users[0].gender) {
                    case 'male':
                        $content.find('.infobox-gender').append('<span class="fa fa-mars udu-fa"></span>');
                        break;
                    case 'female':
                        $content.find('.infobox-gender').append('<span class="fa fa-venus udu-fa"></span>');
                        break;
                    case 'unknown':
                        break;
                    default:
                        break;
                    }
                    try {
                        if (data.query.users[0].registration) {
                            $content.find('.infobox-registration-date').empty().text(data.query.users[0].registration.replace('T', ' ').replace('Z', ''));
                        } else {
                            $content.find('.infobox-registration-date').html(msg.nodata);
                        }

                        if (data.query.users[0].editcount) {
                            $content.find('.infobox-editcount').html(data.query.users[0].editcount);
                        } else {
                            $content.find('.infobox-editcount').html(msg.nodata);
                        }
                    } catch (e) {
                        $content.find('.infobox-registration-date').html(msg.nodata);
                        $content.find('.infobox-editcount').html(msg.nodata);
                    }
                }
            },
            error: function () {
                console.log(msg.reqfailed);
                $content.find('.infobox-registration-date').html(msg.nodata);
                $content.find('.infobox-editcount').html(msg.nodata)
            }
        });
    }// if ($content.find('.infobox-gender').length || $content.find('.infobox-registration-date').length)
 
    if ($content.find('.infobox-avatar').length) {
        $.ajax({
            url: '/api/v1/User/Details?size=150&ids=' + nickname,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $content.find('.infobox-avatar').html(
                        $('<img>', {
                           src: (data.items[0] || {}).avatar,
                           class: 'avatar'
                        })
                    );
                }
            },
            error: function () {
                console.log(msg.cantavatar);
                $content.find('.infobox-avatar').html(msg.nodata);
            }
        });
    }// if ($content.find('.infobox-avatar').length)
 
    // if ($content.find('.infobox-editcount').length)
});