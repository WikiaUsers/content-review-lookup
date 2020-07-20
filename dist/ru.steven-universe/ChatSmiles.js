// ChatSmiles by Manka-Manka
// special for ru.steven-universe 
// Thx for using!
// 
// 07.12.2016
window.ChatSmilesMySet = {
    SmileSize: '19',
    UtilActive: true
};

var ChatSmiles = [];
ChatSmiles.css = {
    SmilesShowButton: 'position: absolute; right: 55px; top: -39px; z-index: 1000; display: block;',
    SmilesSection: 'z-index: 100; display:none; position: absolute; right: 1px; top: -353px;',
    SmilesBody: 'border: 4px solid rgba(0, 161, 202, 0.298039); background: rgb(223, 223, 223);',
    SmilesHeader: 'position: relative;padding: 5px 20px 5px 20px;',
    SmilesList: 'height: 300px; overflow-y: auto; overflow-x: hidden;',
    SmileSize: window.ChatSmilesMySet.SmileSize?window.ChatSmilesMySet.SmileSize:'19',
    StyleTag: '@-moz-document url-prefix() {#SmilesList table{margin-right: 18px !important;}}div.switch-module:hover{opacity: 0.5;}#SmilesBody:hover #SmilesList::-webkit-scrollbar-thumb{background: #fff;}#SmilesList::-webkit-scrollbar-thumb{background: rgba(0,0,0,0);}#SmilesList::-webkit-scrollbar,#SmilesList::-webkit-scrollbar-track{background: rgba(0,0,0,0);}#SmilesList img{    background: #f0f0f0;position: static;border-radius: 5px; padding: 5px; cursor: pointer; border: 2px solid transparent;}#SmilesList img:hover{border: 2px solid #aaa;}#SmilesBody th{font-size: smaller;}'
};
 
ChatSmiles.src = {
    SMB: {
        ToMedia:'<div class="switch-module" id="M_UtilBody" style="width: 32px;height: 32px;background:url(\'data:image/png;base64,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\');"></div>',
        ToSmiles: '<div class="switch-module" id="M_SmilesBody" style="width: 32px;height: 32px;background:url(\'data:image/png;base64,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\');"></div>'
        },
    Util: '<div id="UtilBody" style="' + ChatSmiles.css.SmilesBody + 'display: none;"><div id="UtilHeader" class="CSHeader" style="font-family: a_FuturaRound Bold Bold; font-size: 20px;' + ChatSmiles.css.SmilesHeader + '">Вы можете...</div><div id="UtilList" style="background: #f2f2f2; width: 500px;' + ChatSmiles.css.SmilesList + '">'
    +
    '<div id="YT_Search" style="padding: 10px;"><div style="display: flex;width: 100%;"><input id="YTI_Write" style="border: 1px solid #eee;box-shadow: 0 0 2px #424242;width:80%;padding: 4px 10px;font-weight: bold;background: none;" placeholder="...вставить здесь ID видео на YouTube"><div style="width: 15%;background-image: linear-gradient(to top,#d1cfcf,#f1f1f1);box-shadow: 0 0 2px #424242;border-radius: 0 10px 10px 0;text-align: center;font-size: 10px;cursor: pointer;" id="YTI_Submit">Вставить</div></div><div style="margin: 10px 0;display: flex;width: 100%;"><input id="IMGI_Write" style="border: 1px solid #eee;box-shadow: 0 0 2px #424242;width:80%;padding: 4px 10px;font-weight: bold;background: none;" placeholder="...вставить здесь URL изображения без &#x22;&#x68;&#x74;&#x74;&#x70;&#x3A;&#x2F;&#x2F;&#x22;"><div style="width: 15%;background-image: linear-gradient(to top,#d1cfcf,#f1f1f1);box-shadow: 0 0 2px #424242;border-radius: 0 10px 10px 0;text-align: center;font-size: 10px;cursor: pointer;" id="IMGI_Submit">Вставить</div></div></div>'
    +
    '</div></div>'
};
 
$('form#Write').append('<style>' + ChatSmiles.css.StyleTag + '</style><div id="SmilesShowButton" style="' + ChatSmiles.css.SmilesShowButton + '"><img src="https://vignette.wikia.nocookie.net/steven-universe/images/1/11/SmileIcon.png/revision/latest/scale-to-width/30?cb=20161109082639&path-prefix=ru"></div><div id="SmilesSection" class="hide" style="' + ChatSmiles.css.SmilesSection + '">' + ((window.ChatSmilesMySet.UtilActive===true)?ChatSmiles.src.Util:'<!-- Util is disabled -->') + '<div id="SmilesBody" style="' + ChatSmiles.css.SmilesBody + '"><div class="CSHeader" id="SmilesHeader" style="background: #e9e7e7;height: 25px;' + ChatSmiles.css.SmilesHeader + '"></div><div style="' + ChatSmiles.css.SmilesList + '" id="SmilesList"><small>Подождите, идет загрузка списка смайликов. Если это сообщение долго не исчезает: проверьте соединение с интернетом, возможно ваше соединение медленное, если все хорошо обратитесь к администрации.</small></div></div></div></div>');
 
$('#SmilesList').load('/wiki/MediaWiki:Emoticons?action=render', function(){
    $('#SmilesList ul').attr('style','list-style: none; margin: 0;');
    $('#SmilesList ul ul').hide();
    $('#SmilesList table').removeClass('wikitable');
 
    $('#SmilesList table img').attr('width', ChatSmiles.css.SmileSize).attr('height', 'auto').click(function(){
		var txt = $(this).parent().children('ul').children('li:first-child').text().replace(/\s/g, ''),
		messg = $('.message textarea').val();
        $('.message textarea').val(messg + txt + ' ').focus();
	});
 
	if ( window.ChatSmilesMySet.UtilActive === true ) {
        $('#UtilHeader').append('<div style="opacity: .5;position: absolute;right: 20px;top: 8px;bottom: 2px;" class="switch-modules">'+ChatSmiles.src.SMB.ToSmiles+'</div>');
        $('#SmilesHeader').append('<div style="opacity: .5;position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;width: 32px;" class="switch-modules">'+ChatSmiles.src.SMB.ToMedia+'</div>');
        $('#YTI_Submit').click(function(){
            var txt = $('#YTI_Write').val().replace(/\s/g, ''),
		messg = $('.message textarea').val();
        $('.message textarea').val(messg + '[yt="' + txt + '"] ').focus();
        });
 
        $('.switch-module').click(function(){
            $('#SmilesSection > div').hide();
            $('#SmilesSection > div#'+$(this).attr('id').split('M_').join('')).show();
        });
 
        $( "#YTI_Write" ).keypress(function( event ) {
            if ( event.which == 13 ) {
                $('#YTI_Submit').click();
                return false;
                }
        });
 
        $( "#IMGI_Write" ).keypress(function( event ) {
            if ( event.which == 13 ) {
                $('#IMGI_Submit').click();
                return false;
                }
        });
        //****************************
        $('#IMGI_Submit').click(function(){
            var txt = $('#IMGI_Write').val().replace(/\s/g, '');
            $mess = $('.message textarea');
            var messg = $mess.val(); 
            $mess.val(messg + '[img="' + txt + '"] ').focus();
        });
        //******************************
	}
});
$('#SmilesSection').hover(function(){
    $('#SmilesSection.hide').addClass('show').removeClass('hide');
},function(){
    $('#SmilesSection.show').addClass('hide').removeClass('show');
    $('#SmilesSection.hide').fadeOut("fast",function(){
        $('#SmilesShowButton').fadeIn("fast");
    });
 
});
$('#SmilesShowButton').mouseover(function(){
    $('#SmilesShowButton').fadeOut("fast");
    $('#SmilesSection').fadeIn("fast");
});