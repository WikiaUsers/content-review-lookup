$('<span id="center-box" style="width:400px; height:500px; display: none; float: left;"><div id="box-header" style="position:absolute; top:0px; border-radius: 10px;"><img src="http://d1mcde1f7zaaai.cloudfront.net/inapp/img-2/top.png" width="400px"></div><div id="text-title" style="position:absolute; top: 38px; left:calc(100% - 325px);"><img src="http://i.imgur.com/uahgdJa.png"><div id="text-title-text" style="position:absolute; top:14px; font-size:22px; left:calc(100px - 23px);">卡牌資訊</div></div><div id="info_message" style="position:absolute; width:calc(100% - 81px); height: calc(100% - 123px); overflow-y: auto; margin:90px 0 33px 0; padding-left: 10%; padding-right: 10%; text-align:left; font-size:14px;"></div><div id="box-footer" style="position:absolute; bottom:0px; border-radius: 10px;"><img src="http://d1mcde1f7zaaai.cloudfront.net/inapp/img-2/down.png" width="400px"></div><div id="box-close" style="position:absolute; bottom:5px; border-radius: 10px; left:50%; margin-left:-40px;"><input type="button" id="closewindows" value="關閉視窗" style="font-size:18px;" /></div></span>').appendTo('#pet_card_info');

$('#q-mark').click(function() {
	$('#center-box').show();
});
$('#closewindows').click(function() {
	$('#center-box').hide();
});

$('<span id="center-box1" style="width:400px; height:300px; display: none; float: left;"><div id="box-header" style="position:absolute; top:0px; border-radius: 10px;"><img src="http://d1mcde1f7zaaai.cloudfront.net/inapp/img-2/top.png" width="400px"></div><div id="text-title" style="position:absolute; top: 38px; left:calc(100% - 325px);"></div><div id="info_message" style="position:absolute; width:calc(100% - 81px); height: calc(100% - 123px); overflow-y: auto; margin:90px 0 33px 0; padding-left: 10%; padding-right: 10%; text-align:left; font-size:14px;"></div><div id="box-footer" style="position:absolute; bottom:0px; border-radius: 10px;"><img src="http://d1mcde1f7zaaai.cloudfront.net/inapp/img-2/down.png" width="400px"></div><div id="box-close" style="position:absolute; bottom:5px; border-radius: 10px; left:50%; margin-left:-40px;"><input type="button" id="closewindows1" value="關閉視窗" style="font-size:18px;" /></div></span>').appendTo('#pet_card_info1');

$('#q-mark1').click(function() {
	$('#center-box1').show();
});
$('#closewindows1').click(function() {
	$('#center-box1').hide();
});

$('#center-box').hide();
var monsterid = $('#card_info').data('id');
$.get('http://zh.wingwing007.wikia.com/api.php',{
	format:'json',
	action: 'expandtemplates',
	text:'{{TeamSkill|' + monsterid + '}}'
}, function (data) {
	var messageinfotmp1 = data.expandtemplates['*'].replace(/<color=yellow>/ig,'<span style="color:yellow;">');
	var messageinfo = messageinfotmp1.replace(/<\/color>/ig,'</span>');
	$('#info_message').html(messageinfo);
});


$('#center-box').css('background', '#000').css('max-width', '500px').css('max-height', '600px').css('background-size', 'cover').css('width', '100%').css('height', '100%').css('position', 'absolute').css('border-radius', '10px').css('z-index', '10').css('width', '400px').css('height', '300px').css('display', 'none').css('width', '400px').css('height', '300px').css('float', 'left');
$('#center-box1').css('background', '#000').css('max-width', '500px').css('max-height', '600px').css('background-size', 'cover').css('width', '100%').css('height', '100%').css('position', 'absolute').css('border-radius', '10px').css('z-index', '10').css('width', '400px').css('height', '300px').css('display', 'none').css('width', '400px').css('height', '300px').css('float', 'left');$('#box-header').css('position', 'absolute').css('top', '0px').css('border-radius', '10px').css('width', '400px');
$('#text-title').css('position', 'absolute').css('top', '38px').css('left', 'calc(100% - 325px)');
$('#text-title-text').css('position', 'absolute').css('top', '14px').css('color', '#fff').css('font-size', '22px').css('left', 'calc(100px - 23px)').css('z-index', '11');
$('#info_message').css('position', 'absolute').css('width', 'calc(100% - 81px)').css('height', 'calc(100% - 123px)').css('overflow-y', 'auto').css('margin', '90px 0 33px 0').css('padding-left', '10%').css('padding-right', '10%').css('text-align', 'left').css('color', '#fff').css('font-size', '14px').css('z-index', '11');
$('#box-footer').css('position', 'absolute').css('bottom', '0px').css('border-radius', '10px').css('width', '400px');
$('#box-close').css('position', 'absolute').css('bottom', '5px').css('border-radius', '10px').css('left', '50%').css('margin-left', '-40px');
$('select').css('width', '45px').css('font-size', '9.5pt').css('padding', '1px 0px 1px 5px').css('margin', '0').css('-webkit-border-radius', '4px').css('-moz-border-radius', '4px').css('border-radius', '4px').css('-webkit-box-shadow', '0 3px 0 #ccc, 0 -1px #fff inset').css('-moz-box-shadow', '0 3px 0 #ccc, 0 -1px #fff inset').css('box-shadow', 'inset 1px 1px 2px #ddd8dc').css('background', '#f8f8f8').css('font-weight', 'bold').css('font-family', '"lucida grande",Tahoma,Verdana,Arial,sans-serif').css('border', 'none').css('outline', 'none').css('display', ' inline-block').css('-webkit-appearance', 'none').css('-moz-appearance', 'none').css('appearance', 'none').css('cursor', 'pointer').css('white-space', 'nowrap');