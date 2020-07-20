$('#WikiaPage .mp-userbox, \
   #WikiaPage .mp-avatars').each(function(){
    var $box = $(this),
        user = $box.attr('data-user'),
        $links = $box.find('.mp-links'),
        d_links = $links.attr('data-links'),
        d_links_s = d_links.split(/\|/g),
        link_obj = {
            'Profile': '/wiki/User:' + encodeURIComponent(user),
            'Talk': '/wiki/User_talk:' + encodeURIComponent(user),
            'Contributions': '/wiki/Special:Contributions:' + encodeURIComponent(user),
            'Editcount': '/wiki/Special:Editcount:' + encodeURIComponent(user)
        }, 
        links = [];
    for (var i = 0; i < d_links_s.length; i++){
        var $link = $('<a class="mp-link link" />');
        if (d_links_s[i] in link_obj){
            $link.attr('href', link_obj[d_links_s[i]]);
        } else {
            $link.attr('href', '/wiki/User:' + encodeURIComponent(user) + '/' + encodeURIComponent(d_links_s[i]));
        }
        $link.text(d_links_s[i]);
        links[links.length] = $link;
    }
    $links.html(links);
});

$('#WikiaPage .mp-slider-wrapper').each(function(){
    var $slider = $(this),
        $slider_item = $slider.find('> .slider-item'),
        $slider_elem = $('<section class="mp-slider slider" />'),
        $image_nav = $('<nav class="mp-slider-navigation slider-navigation"><ul /></nav>'),
        $items = [];
    $slider_item.each(function(index){
        var $slider_item_p = $('<figure class="mp-slider-item slider-item" />'),
            $item = $(this),
            $summary = $item.find('> .summary'),
            $image = $item.find('.slider-image').unwrap('<p />'),
            $s_image = $('<img class="slider-image image" />').attr('src', $image.children('img').attr('src')),
            $s_image2 = $('<img class="slider-nav-image nav-image" />').attr('src', $image.children('img').attr('src')),
            $summary_p = $('<figcaption class="slider-description slider-summary summary"><h3 /><p /></figcaption>'),
            title = $summary.attr('data-title');
        $slider_item_p.attr('id', 'mp-slider-item-' + index);
        $summary_p.find('> h2').text($summary.attr('data-title'));
        $summary_p.find('> p').html($summary.html());
        $slider_item_p.html([$s_image, $summary_p]);
        $image_nav.find('> ul').append($('<li data-tooltip="' + title + '" />').html($('<a href="#mp-slider-image' + index + '" class="slider-link slider" />').html($s_image2)));
        $items[$items.length] = $slider_item_p;
    });
    $items[$items.length] = $image_nav;
    $slider_elem.html($items);
    $slider.replaceWith($slider_elem);
});

/**
 * HTML & CSS Wiki Clock
 * Part I: Aesthetics
 **/
var hasClockWrapper = false;

if ($('.mp-clock').length)
    hasClockWrapper = true;
    
if (hasClockWrapper === true){
    var $clockWrapper = $('div.mp-clock'),
        $clockHTML = $('<section class="mp-clock box" id="mp-clock" />');
    $clockHTML.html([
        $('<div class="mp-clock-date" />')
            .html('<span class="mp-date" />'),
        $('<div class="mp-clock-mdy" />')
            .html('<span class="mp-mdy" />'),
        $('<div class="mp-clock-time" />')
            .html([
                $('<div class="mp-hours" />'),
                $('<div class="mp-minutes" />'),
                $('<ul class="mp-sec-ampm" />')
                    .html('<li class="mp-seconds"></li><li class="mp-ampm"></li>')
            ])
    ]);
    $clockWrapper.replaceWith($clockHTML);
}

/**
 * HTML & CSS Wiki Clock
 * Part II: Functionality
 **/
function addZero(i){
    if (i < 10)
        i = '0' + i;
    return i;
}

function format12h(hours){
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return {
        hours: addZero(hours),
        ampm: ampm
    };
}
 
$(document).ready(function createClock(){
    var _date = new Date(),
        _year = _date.getFullYear(),
        _month = _date.getMonth(),
        _day = _date.getDate(),
        _dayW = _date.getDay(),
        _hours = _date.getHours(),
        _minutes = _date.getMinutes(),
        _seconds = _date.getSeconds(),
        _daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        _monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        _fullDayW = _daysArr[_dayW],
        _fullMonth = _monthsArr[_month],
        _12h = true,
        _mmddyy = false,
        _ampm_obj = format12h(_hours);
    _day = addZero(_day);
    _hours = addZero(_hours);
    _minutes = addZero(_minutes);
    _seconds = addZero(_seconds);
    
    if ($('.mp-clock').find('.mp-date').length)
        $('.mp-clock').find('.mp-date').text(_fullDayW);
    
    if ($('.mp-clock').find('.mp-mdy').length)
        $('.mp-clock').find('.mp-mdy').text(_fullMonth + ' ' + _day + ', ' + _year);
        
    if ($('.mp-clock').find('.mp-hours').length)
        $('.mp-clock').find('.mp-hours').text((_12h === true) ? _ampm_obj.hours : _hours);
    
    if ($('.mp-clock').find('.mp-minutes').length)
        $('.mp-clock').find('.mp-minutes').text(_minutes);
    
    if ($('.mp-clock').find('.mp-seconds').length)
        $('.mp-clock').find('.mp-seconds').text(_seconds);
    
    if ($('.mp-clock').find('.mp-ampm').length && _12h === true)
        $('.mp-clock').find('.mp-ampm').text(_ampm_obj.ampm);
    setInterval(createClock, 1000);
});

/**
 * HTML & CSS Wiki Tabs
 **/

$(document).ready(function createTabs(){
    var tabsEnabled = false;
    if ($('div.tabs-wrapper-p').length)
        tabsEnabled = true;
    
    if (tabsEnabled === true){
        var $tabs = $('div.tabs-wrapper-p').find('.tabs-p'),
            tabs_html = 
             $('<section class="tabs-wrapper tabs-cont"> \
                    <ul class="tab-items items"></ul> \
                    <div class="tab-content content"></div> \
                </section>');
        $tabs.each(function(index){
            var $tab =
                    $('<li class="tab tab-item item"><a href="javascript:void(0);" /></li>'),
                $t = $(this),
                $tab_list = tabs_html.find('ul.items'),
                $tab_content = tabs_html.find('.tab-content');
            $tab.find('> a').text($t.text())
                .on('click', function switchTab(event){
                    $('.tab-items').find('.selected').removeClass('selected');
                    $(event.target).parent('.tab-item').addClass('selected');
                    $.ajax({
                        dataType: 'json',
                        url: '/' + new mw.Api('api').defaults + '.php?action=parse&text={{' + encodeURIComponent($t.attr('data-source') || $t.text()) + '}}&format=json'
                    }).done(function(data){
                        var d = data.parse.text['*'];
                        $tab_content.html(d);
                    }).fail(function(error){
                        $tab_content.html('There is nothing on this tab yet.');
                        console.log(error);
                    });
                });
            $tab_list.append($tab);
        });
        
        tabs_html.find('> ul.items > li').eq(0).addClass('selected');
        $.ajax({
            dataType: 'json',
            url: '/' + new mw.Api('api').defaults + '.php?action=parse&text={{' + encodeURIComponent($tabs.eq(0).attr('data-source') || $tabs.eq(0).text()) + '}}&format=json'
        }).done(function(data){
            var d = data.parse.text['*'],
                $tab_content = tabs_html.find('.tab-content');
            $tab_content.html(d);
        }).fail(function(error){
            var $tab_content = tabs_html.find('.tab-content');
            $tab_content.html('There is nothing on this tab yet.');
            console.log(error);
        });
        
        $('div.tabs-wrapper-p').replaceWith(tabs_html);
    }
});

/**
 * HTML & CSS Wiki Applications
 * The code only works in [[Project:Applications]] and [[HTML & CSS Wiki:Applications]]
 **/

$(document).ready(function _application(){
    var config = mw.config.get(['skin', 'wgPageName', 'wgUserName', 'wgEnableAPI', 'wgServer']);
    
    function _close(callback){
        if (callback instanceof Function || typeof callback == "function")
            Function.prototype.apply(callback, []);
        $('#NewAppModal').closeModal();
    }
    
    $('.form-section .form-list').each(function(index){
        var $list = $(this);
        $list.find('.form-list-items').addClass('hidden');
        $list.find('.form-list-label').on('click', function show(event){
            var $items = $(event.target).parent().find('.form-list-items [data-title]'),
                $items_a = $items.find('> a');
            $list.find('.form-list-items').removeClass('hidden');
            $items_a.on('click', function select(ev){
                var $x = $(event.target).parent('li[data-title]'),
                    $txt = $(event.target).text(),
                    $s = $list.find('> .form-list-label');
                $s.text($txt);
                $list.find('.form-list-items').addClass('hidden');
            });
        });
    });
    
    function _createModal(event){
        var modalContent =
            '<form class="WikiaForm application-form" id="application-form"> \
                <section class="form-section"> \
                    <h3>Username:</h3> \
                    <input type="text" name="username" readonly value="' + config.wgUserName + '" id="app-username" /> \
                </section> \
                <section class="form-section"> \
                    <h3>Position:</h3> \
                    <div class="form-list" data-name="positions"> \
                        <span class="form-list-label label"></span> \
                        <ul class="form-positions form-list-items"> \
                            <li data-title="Patroller"><a href="javascript:void(0);">Patroller</a></li> \
                            <li data-title="Code Editor"><a href="javascript:void(0)">Code Editor</a></li> \
                            <li data-title="Rollbacker"><a href="javascript:void(0)">Rollbacker</a></li> \
                            <li data-title="Chat Moderator"><a href="javascript:void(0)">Chat Moderator</a></li> \
                            <li data-title="Forum Moderator"><a href="javascript:void(0)">Forum Moderator</a></li> \
                            <li data-title="Administrator"><a href="javascript:void(0)">Administrator</a></li> \
                            <li data-title="Technical Administrator"><a href="javascript:void(0)">Technical Administrator</a></li>\
                        </ul> \
                    </div> \
                </section> \
                <section class="form-section"> \
                    <h3>Introduction</h3> \
                    <textarea name="introduction" id="app-intro" placeholder="Tell us about yourself." /> \
                </section> \
            </form>';
        $.showCustomModal('New Application', modalContent, {
            width: 650,
            id: 'NewAppModal',
            buttons: [{
                message: 'Cancel',
                id: 'app-button-cancel',
                handler: _close()
            }, {
                message: 'Confirm',
                defaultButton: true,
                id: 'app-button-confirm',
                handler: _close(function(){
                    var $username =
                            $('.application-form [name="username"]'),
                        $position = 
                            $('.application-form [data-name="positions"]'),
                        $introdution = 
                            $('.application-form [name="introduction"]'),
                        txt =
                            '<h2>{{UserAvatars|' + $username.val() + '|30}} ' + $username.val() + '</h2>' +
                            '<p><span style="font-weight: bold;">Position:</span> ' + $position.find('.form-list-label').text() + '</p>' +
                            '<p><span style="font-weight: bold;">Introduction:</span>' + $introduction.val() + '</p>';
                        post_url = '/' + new mw.Api('api').defaults + '.php?action=edit&title=Project:Applications/' + encodeURIComponent($position.find('.form-list-label').text()) + '&section=new&text=' + encodeURIComponent(txt) + '&token=' + encodeURIComponent(mw.user.tokens.values.editToken);
                    $.ajax({
                        method: 'POST',
                        url: post_url
                    }).done(function(){
                        window.location.reload();
                    });
                })
            }]
        });
    }
    
    if (config.wgPageName == 'Project:Applications' || config.wgPageName == 'HTML_&_CSS_Wiki:Applications'){
        var $_appButtonWrapper = $('div.app-button-wrapper'),
            $_appButton =
                $('<a href="javascript:void(0);" />')
                    .text('Create New Application')
                    .on('click', _createModal);
        $_appButtonWrapper.html($_appButton);
    }
});

$('.mp-slider .mp-slider-item#mp-slider-item-0').addClass('show');

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100820192443/htmlcss/images/3/38/Code.png",
     "speedTip": "Coded Content",
     "tagOpen": "<code>",
     "tagClose": "</code>",
     "sampleText": "Coded Content"
   };
}

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20100820192625/htmlcss/images/2/26/Favicon.png",
     "speedTip": "Nowiki Content",
     "tagOpen": "<nowiki>",
     "tagClose": "</nowiki>",
     "sampleText": "Nowiki Content"
   };
}

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20101102032913/htmlcss/images/e/ed/HTML_source_button.png",
     "speedTip": "HTML Source Code Content",
     "tagOpen": "<source lang=\"html4strict\">",
     "tagClose": "</source>",
     "sampleText": "HTML Code"
   };
}

if (mwCustomEditButtons) {
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20101102033107/htmlcss/images/f/f3/CSS_source_button.png",
     "speedTip": "CSS Source Code Content",
     "tagOpen": "<source lang=\"css\">",
     "tagClose": "</source>",
     "sampleText": "CSS Code"
   };
}


$(window).ready(function (){
        var nobr = $('#nobr'); // Use jQuery CSS-selector feature to find all elements with id="nobr".
        if(nobr.length > 0){ // If there are any...
            nobr.each(function (){ // call this function as a method of each one:
                    var that = $(this); // Get jQuery's representation of the element (needed within the click handler).
                    var contents = that.contents() // The contents are in jQuery representation too.
                        .replaceWith($(document.createElement('a')) // Replace them with a link...
                            .attr('href', '#') // that doesn't really point anywhere and says...
                            .append(document.createTextNode('Click here, but note that this will mess up the page\'s layout.'))
                            .click(function (event){ // When the link is clicked...
                                    that.contents().replaceWith(contents); // replace it with the original contents.
                                    event.preventDefault() // And make sure that # isn't added to the URL so the Back button still works.
                                    return false; // Ignored by jQuery, but doesn't hurt; this is the non-standard way to preventDefault.
                                        // It's necessary for cross-browser compatibility when jQuery is absent.
                                }));
                });
        }
    });

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length === 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

function showEras(className) {
	if( typeof( SKIP_ERAS ) != 'undefined' && SKIP_ERAS )
		return;

	var titleDiv = document.getElementById( className );

	if( titleDiv === null || titleDiv === undefined )
		return;

	var cloneNode = titleDiv.cloneNode(true);
	var firstHeading = getFirstHeading();
	firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
	cloneNode.style.display = "block";
}
// END JavaScript title rewrite

addOnloadHook(rewriteTitle);