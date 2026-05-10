/* Any JavaScript here will be loaded for all users on every page load. */

/* inject filters for crayon border effect */
mw.hook('wikipage.content').add(function() {
  if (document.getElementById('crayon-filters')) return;
  
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'crayon-filters';
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  
  svg.innerHTML = `<defs>
    <filter id="crayon-roughen">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="5" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="crayon-roughen2">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="12" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="G" yChannelSelector="R"/>
    </filter>
  </defs>`;
  
  document.body.appendChild(svg);
});

/* change theme colors by category */
mw.hook('wikipage.content').add(function($content) {
    var categories = mw.config.get('wgCategories') || [];

	if (categories.indexOf('Everyday Is Christmas songs') !== -1) {
	    $('main').css('--theme-link-color', '#1B9374');
	    $('main').css('--theme-accent-color', '#F22339');
	    $('main').css('--theme-accent-color--rgb', '242, 35, 57');
	}
	
	if (categories.indexOf('Labrinth • Sia • Diplo Present... LSD songs') !== -1) {
	    $('main').css('--theme-link-color', '#ED80EC');
	    $('main').css('--theme-accent-color', '#4DACEA');
		$('main').css('--theme-accent-color--rgb', '77, 172, 234');
	}
});

;(function() {
    $('.mpd-item').click(function(e) {
        e.preventDefault();
        $('.mpd-item-container').hide();
        $('.mpd-content-container')
            .show()
            .append('<img class="loading" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" />');
        $('.mpd-content').load('/wiki/Template:' + $(this).data('load') + ' #mw-content-text', function() {
            $('.mpd-content-container .loading').remove();
            $(this).slideDown();
            $('.mpd-content-container #mw-content-text h3:first-of-type').prepend(
                $('<a class="back">⬅</a>').click(function() {
                    $('.mpd-content-container, .mpd-content').hide();
                    $('.mpd-item-container').fadeIn();
                    $(this).remove();
                })
            );
        });
    });
})();

/* welcome module */
$(function() {
    var welcome;
    if (localStorage.getItem('welcome-' + mw.config.get('wgDBname'))) {
        welcome = +localStorage.getItem('welcome-' + mw.config.get('wgDBname'));
    } else {
        welcome = 1;
        localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 1);
    }
    if (welcome < 4) {
        $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Welcome',
            disablepp: '',
            format: 'json'
        }, function(data) {
            $('#WikiaRail').append(
                $('<section>')
                    .addClass('module')
                    .addClass('welcome-module')
                    .append(
                        $('<h2>')
                            .addClass('activity-heading')
                            .text('Welcome to the Sia Wiki!')
                    )
                    .append(
                        $('<div>')
                            .addClass('welcome-container')
                            .html(
                                data.parse.text['*'].replace(/\$1/g, (!!mw.config.get('wgUserName') ? mw.config.get('wgUserName') : 'anonymous user'))
                            )
                            .append(
                                $('<div>')
                                    .addClass('buttons-container')
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .attr('id', 'remove')
                                            .text('Don\'t show again')
                                    )
                                    .append(
                                        $('<button>')
                                            .addClass('wikia-button')
                                            .addClass('talk')
                                            .addClass('comments')
                                            .addClass('secondary')
                                            .attr('id', 'cancel')
                                            .text('Cancel')
                                    )
                            )  
                    )
            );
            if (!mw.config.get('wgUserName')) {
                $('.welcome-module .anons').show();
            }
            $('.welcome-module #remove').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), 4);
                $('.welcome-module').fadeOut('slow');
            });
            $('.welcome-module #cancel').on('click', function() {
                localStorage.setItem('welcome-' + mw.config.get('wgDBname'), ++welcome);
                $('.welcome-module').fadeOut('slow');
            });
        });
    }
});