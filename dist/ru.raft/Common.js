/* Этот код работает у всех и везде. */
console.log("Common.js v0.4");


//создать объект опций для dev:CategoryIcon/code.js
window.fng = $.extend(window.fng, {cicon:{}});
//запросить изменение размера до 48px
window.fng.cicon.scale = '/scale-to-width-down/48';


// adds image to text in category page
// selector: '#mw-pages ul li a, .category-page__members .category-page__member > a'
// selectors: classic, dynacats
(function($, ci) {
	// restrict to ns:14 (category)
	ci.restrict = true;
	// dbl run or wrong conditions
	var mws = mw.config.get(['wgNamespaceNumber', 'skin', 'wgUserName']);
	if (ci.f || !mws.wgUserName || (mws.skin !== 'oasis') || (ci.restrict && (mws.wgNamespaceNumber !== 14))) return;
	// image extension
	ci.ext = '.png';
	// image class
	ci.cls = 'cicon-image';
	ci.cls = $.htmlentities(ci.cls);
	//icon image must be 64x64
	ci.scale   = '/window-crop/width/40/x-offset/0/y-offset/2/window-width/64/window-height/48';

	ci.getObj = function getObj (data, key) {
		// traverse through object tree
		var ret = [], r;
		for (var k in data) {
			if (data[k] instanceof Object) {
				if (k === key) {
					ret.push(data[k]);
				}
				r = ci.getObj(data[k], key);
				if (r) ret = ret.concat(r);
			}// if obj
		}// for k in data
		return ret;
	};// getObj

	ci.getVal = function getVal (data, key) {
		// traverse through object tree
		var ret = [], r;
		for (var k in data) {
			if (data[k] instanceof Object) {
				r = ci.getVal(data[k], key);
				if (r) ret = ret.concat(r);
			} else {
				if (k === key) {
					ret.push(data[k]);
				}
			}// if obj
		}// for k in data
		return ret;
	};// getVal
	
	ci.f = function() {
		$('#mw-pages ul li a, .category-page__members .category-page__member > a').each(function() {
			var article_name = $(this).text();
			var aimage = mw.Title.newFromText($(this).text() + ci.ext, 6);
			if ($(this).text() == 'Радио') window.xyzz = this;
			var api = new mw.Api(), $el = $(this), lnk = this;
			$el[0].style.verticalAlign = 'middle';
			$el.prepend(' ');
			var parent = $el.parent(); //.category-page__member
			var div; //.category-page__member-left in dynamic categories.
			var left = parent.find('.category-page__member-left a');
			if (left === false || left.length === 0) {
				left = parent.find('.category-page__member-left svg');
				if (left && left.length > 0) return; //Special element, e.g. category.
			}
			if (left === false || left.length === 0) { //Classic Categories. Should add image link
				div = parent.find('.category-page__member-left');
				if (!div || div.length === 0) {
					div = $('<div>', {class: 'category-page__member-left raft-categoty_left-div'});
					parent.prepend(div);
				}
				left = $('<a>', {href: "/ru/wiki/" + article_name, title: article_name});
				div.append(left);
				parent[0].classList.add('raft-category_li'); //dirty
				parent.parent()[0].classList.add('raft-category_ul');
			}
			api.get({action: 'query', redirects: '', titles: aimage.getPrefixedDb(),
				prop: 'imageinfo', iiprop: 'url', format: 'json'})
			.done(function(data) {
				var image = {};
				var page = {};
				page.missing = data.query.pages['-1'] ? true : false;
				if (page.missing) return;
				page.imageinfo = ci.getObj(data.query.pages, 'imageinfo');
				page.imageinfo = page.imageinfo.length > 0 ? page.imageinfo[0][0] : null;
				if (!page.imageinfo) return;
				// deal with redirs
				page.redirects = ci.getVal(ci.getObj(data.query, 'redirects'), 'to');
				page.redirects = page.redirects.length > 0 ? page.redirects[0] : null;
				image.url = page.redirects || page.imageinfo.url || ' ';
				if (image.url === ' ') return;
				// add scaling
				image.url = image.url.indexOf('?') > -1 ? image.url.replace('?', ci.scale + '?') : image.url + ci.scale;
				image.img = $('<img>', {src: image.url, class: ci.cls, alt: article_name});
				// stacking the stuff
				left.empty();
				left.append(image.img);
			});// done api.get
		});// each li a
	};// f

	mw.loader.using(['mediawiki.api', 'mediawiki.Title'], $(document).ready.bind(this, ci.f));
}(jQuery, (window.fng = window.fng || {}).cicon = window.fng.cicon || {}));



//Меняем цвета имён пользователей
(function(){
    var ADMINS = {Some14u:1,Sphingidae:1,};
    var BUREAUCRATS = {MarisFrance:1,};
    var BASE_URL = '.fandom.com/ru/wiki/';
    var PAGES = [ // [url part, ignore ip, ignore current page]
        ['Блог_участника:',1,0],
        ['Стена_обсуждения:',0,0],
        ['Служебная:Contributions/',1,0],
        ['Участник:',1,0],
    ];
    
    function prepareURL(url) { //Обрезаем URL до смысловой части
        var idx = url.indexOf(BASE_URL);
        if (idx === -1) return url; //error
        url = url.substr(idx + BASE_URL.length);
        url = decodeURIComponent(url.replace(/\+/g, " "));
        return url;
    }
    
    function getData(url) { //Получить настройки для URL
        for (var i=PAGES.length-1; i>=0; i--) {
            var data = PAGES[i];
            if (url.indexOf(data[0]) === 0) return data;
        }
    }
    
    function getUserName(url,data) { //Извлекает имя (или ip) из URL
        var start = data[0].length;
        url = url.substr(start);
        var m = url.match(/^[\w\d.:]+/);
        if (m) return m[0];
    }
    
    function checkIP(name) { //Проверяет, является ли имя ip-адресом
        if (name.split('.').length > 3 || name.split(':').length > 3)
            return true; //Да, является
    }
    
    function updateLink(a) { //Поменять цвет конкретной ссылки
        var url = prepareURL(a.href);
        var data = getData(url);
        if (!data) return;
        var name = getUserName(url, data);
        if (!name) return;
        var nickname = a.innerText.trim();
        if (nickname != name
            && nickname != 'Участник Фэндома'
            && nickname != 'Участник ФЭНДОМА') return;
        if (ADMINS[name]) return a.classList.add('raft_admin');
        if (BUREAUCRATS[name]) return a.classList.add('raft_bureaucrat');
        //var is_ignore_ip = data[1];
        var is_ip = checkIP(name);
        //if (!is_ignore_ip && is_ip) return;
        if (is_ip) return a.classList.add('raft_anonymous');
        return a.classList.add('raft_user');
    }
    
    function updateColors(target) { //Меняет цвета ников на текущей странице
        var url = prepareURL(location.href);
        var data = getData(url);
        //Проверяем текущий URL
        if (data) {
            var is_ignore_page = data[2];
            if (is_ignore_page) return;
            var is_ignore_ip = data[1];
            if (is_ignore_ip) {
                var name = getUserName(url, data);
                var is_ip = name && checkIP(name);
                if (is_ip) return;
            }
        }
        //Нужна возможность искать
        while (target && !target.querySelectorAll) target = target.parentNode;
        if(!target) return console.log('No parent!');
        //Проверяем все ссылки
        var arr = target.querySelectorAll('a'); 
        arr.forEach(updateLink);
    }
    updateColors(document);

    //Следим за появлением новых ссылок, чтобы и их покрасить
    var observer = new MutationObserver( function(mutationRecords) {
        //console.log('mutations',mutationRecords);
        mutationRecords.forEach(function(rec){
            if (rec.addedNodes.length > 0) rec.addedNodes.forEach(updateColors);
        });
        
    });
    observer.observe(document, {
        childList: true, //Следим за детьми
        subtree: true, // и более глубокими потомками
    });
})();

 
/* Подключение калькулятора */
if (mw.config.get('wgPageName') === 'Котелок') {
    importArticle({ type: 'script', article: 'PotCalc.js' });
}