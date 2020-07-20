/* Infoboxes */
(function() {
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			var color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) {
				$PI.css('border', '1px solid #' + color);
				$PI.find('h2').css('background-color', '#' + color);
			}
		});
	};
	// Run it now
	changeColors();
	// Bind it to TabView loadContent function, so Portable Infoboxes
	// inside TabView can also have fabulous custom backgrounds.
	// - - - -
	// WARNING! This may cause compatibility issues!
	/*
	TabViewClass.prototype.loadContent = function(tabLink) {
		var tabUrl = tabLink.attr('href')
		  , dataTabId = tabLink.parent().attr('data-tab')
		  , containerSelector = $('#' + this.cashedStuff.containersWrapperId).children('div[data-tab-body="' + dataTabId + '"]');
		if (containerSelector.data('loaded') !== true) {
			containerSelector.startThrobbing();
			$.get(tabUrl, {
				action: 'render'
			}, function(html) {
				containerSelector.html(html).data('loaded', true).stopThrobbing();
				mw.hook('wikipage.content').fire(containerSelector);
				changeColors();
			});
		}
	};
	*/
})();

//UserPage Create
            $(function() {
    $('<li>').html('<a href="#">Create Profile</a>')
        .prependTo('.toolbar .tools')
        .click(function() {
            $.showCustomModal('Profile Information', '<p>Infobox Background Color</p><input id="ifbbgcolor" type="text" size="50"></input><br /><p>Title</p><input id="ifbtitle" type="text" size="50"></input><br /><p>Image</p><input id="ifbimage" type="text" size="50"></input><br /><p>Voiced By</p><input id="ifbvoiceb" type="text" size="50"></input><br /><p>Species</p><input id="ifbspecies" type="text" size="50"></input><br /><p>Gender</p><input id="ifbgender" type="text" size="50"></input><br /><p>Nicknames</p><input id="ifbnickn" type="text" size="50"></input><br /><p>Friends</p><input id="ifbfriend" type="text" size="50"></input><br /><p>Occupation</p><input id="ifboccu" type="text" size="50"></input><br /><p>Affiliation</p><input id="ifbaffil" type="text" size="50"></input><br /><p>Residence</p><input id="ifbres" type="text" size="50"></input><br /><p>First Appearance</p><input id="ifbfapp" type="text" size="50"></input><br /><p>Other Appearances</p><input id="ifboapp" type="text" size="50"></input>', {
                id: 'cpModal',
                buttons: [{
                    id: 'createProfile',
                    defaultButton: true,
                    message: 'Create',
                    handler: function() {
                        var ifbbgcolor = $('#ifbbgcolor').val();
                        var ifbtitle = $('#ifbtitle').val();
                        var ifbimage = $('#ifbimage').val();
                        var ifbvoiceb = $('#ifbvoiceb').val();
                        var ifbspecies = $('#ifbspecies').val();
                        var ifbgender = $('#ifbgender').val();
                        var ifbnickn = $('#ifbnickn').val();
                        var ifbfriend = $('#ifbfriend').val();
                        var ifboccu = $('#ifboccu').val();
                        var ifbaffil = $('#ifbaffil').val();
                        var ifbres = $('ifbres').val();
                        var ifbfapp = $('ifbfapp').val();
                        var ifboapp = $('#ifboapp').val();
                        new mw.Api().post({
                            action: 'edit',
                            title: 'User:' + wgUserName,
                            summary: 'Creating Profile',
                            text: '{{UserPage' +
                            '|BGColor=' +  ifbbgcolor +
                            '|Title=' + ifbtitle +
                            '|image=' + ifbimage +
                            '|Voicedby=' + ifbvoiceb +
                            '|Species=' + ifbspecies +
                            '|Gender=' + ifbgender +
                            '|Nicknames=' + ifbnickn +
                            '|Friends=' + ifbfriend +
                            '|Occupation=' + ifboccu +
                            '|Affiliation=' + ifbaffil +
                            '|Residence=' + ifbres +
                            '|FirstAppearance=' + ifbfapp +
                            '|OtherAppearances=' + ifboapp +
                            '}}',
                            format: 'json',
                            createonly: true,
                            token: mw.user.tokens.get('editToken')
                        }).done(function(data) {
                            if (data.edit.result === 'Success') {
                                new BannerNotification("Successfully created page!", "confirm").show();
                            } else {
                                new BannerNotification("An error occurred.", "error").show();
                            }
                        }).fail(function(data) {
                            new BannerNotification("An error occurred.", "error").show();
                        });
                    }
                }, {
                    id: 'cpCancel',
                    defaultButton: true,
                    message: 'Cancel',
                    handler: function() {
                        $('#cpModal').closeModal();
                    }
                }]
            });
        });
});

var background = [
    '#03082e url(https://vignette.wikia.nocookie.net/accelworld/images/5/50/Wiki-background/revision/latest?cb=20161227144444) 0 0 / cover no-repeat fixed',
    'url(https://vignette.wikia.nocookie.net/accelworld/images/b/bb/Keyv03.jpg/revision/latest?cb=20170612154733) 0px 50px / cover no-repeat fixed rgb(3, 4, 22)'
	];
 
var final = background[Math.floor(Math.random() * background.length)];
$('body.skin-oasis').css({
   'background' : final
});