var apiUrl = (apiUrl || 'http://'+location.host)+'/api.php';
var wikiName = location.host.replace('.wikia.com', '');
var wikiDBName = 'sword-art-online/ru';

function apiCall(param,sucsess){
	$.post(apiUrl,$.extend({format:'json'},param),sucsess,'json');
}
function phpCall(param,sucsess){
	$.post('http://ruranobe.ru/WikiGallery.php',$.extend({wiki:wikiName,base:wgPageName},param),sucsess);
}
if($('#SamogotTagGallery').exists()){
	function updateFiltering(href){
		phpCall({action: 'filter', filter: filter, page: page, pageSize: window.pageSize, order: window.order},function(data){
			if(href) window.history.pushState({html:data, cache:LightboxLoader.cache.articleMedia}, '', href);
			$('#SamogotTagGallery').html(data);
			LightboxLoader.cache.articleMedia=[];
			ImgLzy.init();
		});
	}
	function ulToggle(event){
		event.preventDefault();
		$(this).find('b').text($(this).find('b').text()=='►'?'▼':'►');
		$(this).next('ul').slideToggle();
	}
	
	window.filter=(decodeURIComponent(location.search).match(/tags=([^&?#=]*)/) || {1:''})[1];
	window.page=(decodeURIComponent(location.search).match(/page=([^&?#=]*)/) || {1:'1'})[1]*1;
	window.pageSize=(decodeURIComponent(location.search).match(/pageSize=([^&?#=]*)/) || {1:undefined})[1];
	window.order=(decodeURIComponent(location.search).match(/order=([^&?#=]*)/) || {1:undefined})[1];
	updateFiltering();
	
	
	window.onpopstate = function(e){
		if(e.state){
			$('#SamogotTagGallery').html(e.state.html);
			LightboxLoader.cache.articleMedia=e.state.cache;
		}
	};
	$('#SamogotTagGallery').on('click','a[data-tags]',function(){
		event.preventDefault();
		filter=$(this).attr('data-tags');
		page=$(this).attr('data-page');
		pageSize=$(this).attr('data-page-size');
		order=$(this).attr('data-order');
		updateFiltering($(this).attr('href'))
	}).on('change','.order-select',function(){
		console.log($(this).val());
		window.order=$(this).val();
		updateFiltering(location.href.replace(/(&?order=[^&#]*|$)/,'&order='+order));
	}).on('click', 'a.ul-toggle', ulToggle);
	$(window).on('lightboxOpened', function(){
		LightboxLoader.templateHtml=LightboxLoader.templateHtml.replace('class="wikia-button more-info-button secondary">Подробнее</a>','class="wikia-button more-info-button secondary">Теги</a>');
		$('#LightboxModal').on('click.Lightbox', '.LightboxHeader .more-info-button', function(event) {
			event.preventDefault();
			// if(!window.token) apiCall({
				// 'action': 'query', 
				// 'prop' : 'info', 
				// 'titles' : '1', 
				// 'intoken' : 'edit'},function(data){token=data.query.pages["-1"].edittoken});
			if(Lightbox.current.type === 'video') {
				Lightbox.video.destroyVideo();
			}
			Lightbox.openModal.addClass('more-info-mode');
			Lightbox.getShareCodes({fileTitle: Lightbox.current.key, articleTitle:wgTitle}, function(json) {
				Lightbox.openModal.moreInfo.append(Lightbox.openModal.shareTemplate.mustache(json))
				var trackingTitle = Lightbox.openModal.header.find('h1 a').text().replace(/ /g,'_');
				Lightbox.openModal.moreInfo.find('.hero').css('float','right');
				Lightbox.openModal.moreInfo.find('.share-form').children().remove();
				Lightbox.openModal.moreInfo.find('.bottom-forms').remove();
				apiCall({
					action: 'parse', 
					prop: 'text', 
					page: 'File:'+trackingTitle
				},function(data){
					ShF=Lightbox.openModal.moreInfo.find('.share-form');
					ShF.append('<nav class="wikia-menu-button" style="float:right;margin-right:5px;"><a class="wikia-button" href="/wiki/File:'+trackingTitle+'?action=edit"><img alt="" class="sprite edit-pencil" height="16" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" width="22"> Править описание</a><span class="drop"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"></span><ul class="WikiaMenuElement"><li><a href="#" class="remove-from-gallery">Удалить из галереи</a></li><li><a href="#" class="move-file">Переименовать</a></li></ul></nav>')
					ShF.append(data.parse.text['*']);
					if(ShF.children().length<2) 
						ShF.append('<i>Нет описания</i>');
				});
				var ul=$('<ul class="bottom-forms">').css({'padding-top':0,'overflow-y': 'auto', 'max-height': '390px'}).appendTo(Lightbox.openModal.moreInfo.find('.content'));
				for (var upCat in O.tagTree) {
					var li=$('<li>').prependTo(ul).append($('<a href="#"><b>►</b> '+upCat+'</a>').click(ulToggle));
					var ul2=$('<ul>').hide().appendTo(li);
					if(O.tagTree[upCat].length>4) 
					{
						ul2.get(0).style.mozColumnCount=3;
						ul2.get(0).style.webkitColumnCount=3;
						ul2.get(0).style.columnCount=3;
					}
					for(var i=0;i<O.tagTree[upCat].length;i++) {
						var li2=$('<li><label><input type="checkbox"> '+O.tagTree[upCat][i]+'</label></li>').appendTo(ul2);
						li2.find('input').prop('checked',O.imageTags[trackingTitle].indexOf(O.tagTree[upCat][i])!=-1);
					}
				}
			});
		}).on('change', '.more-info input', function(event) {
			var trackingTitle = Lightbox.openModal.header.find('h1 a').text().replace(/ /g,'_');
			var cat = $(this).parent('label').text().substr(1);
			phpCall({action: 'edittag', move: (event.target.checked?'add':'del'), image: trackingTitle, tag: cat});
			updateFiltering();
		}).on('click','.remove-from-gallery',function(){
			event.preventDefault();
			phpCall({action: 'delete', image: trackingTitle});
			updateFiltering()
		}).on('click','.move-file',function(){
			event.preventDefault();
			var ext=trackingTitle.match(/\.\w{3,4}$/);
			var newname=prompt('Введите новое имя',trackingTitle.replace(ext,''));
			phpCall({action: 'move', from: trackingTitle, to:newname+ext});
			updateFiltering()
		});
	});
}