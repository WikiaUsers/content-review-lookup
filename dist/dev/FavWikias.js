/*
originally from https://community.fandom.com/wiki/User:Crazybloy2/global.js
personal use only.
*/
$(() => {
      'use strict';
      if (window.favWikiaLoaded) return;
    
      const currentWikia = window.location.host.replace(/.fandom.com/g, '');
    
      const parent = '.page__main';
      $(parent).prepend('<div class="wikiafavorites"></div>');
      for (let i = 0; i < window.favWikias.length; i++) 
      {
        let language = '';
        if (window.favWikias[i].lang && window.favWikias[i].lang !== 'en' && !/\d/.test(window.favWikias[i].lang))
        {
           language = '/' + window.favWikias[i].lang;
        }
      $('.wikiafavorites').append(
        `<span data-fav="` + window.favWikias[i].name.toLowerCase() + `" data-lang="`+ window.favWikias[i].lang +`"><a href="https://`+window.favWikias[i].name.toLowerCase() + '.fandom.com' + language + '/wiki/' + window.favWikias[i].page + `" class="wds-button">` + window.favWikias[i].text + `</a></span>`
      );
    }
    $('span[data-fav]').each(function() 
    {
      if($(this).attr('data-fav') === currentWikia && (mw.config.get('wgArticlePath').includes($(this).attr('data-lang')) || ($(this).attr('data-lang') === 'en' && mw.config.get('wgArticlePath') === '/wiki/$1')))
      {
        $('.wikiafavorites').prepend($(this));
        $(this).attr('class', 'currentwikia');
        $('.currentwikia').append('<span class="wds-button"><p></p></span>');
        $('.currentwikia span>p').text($('.currentwikia a').text());
        $('.currentwikia a').remove();
      }
    });
    $('[data-fav]').children(':not(.currentwikia)').first().find('a').addClass('first');
    mw.loader.addStyleTag( `
        .wikiafavorites {
    display:flex;
    flex-wrap:nowrap;
    max-width:60vw;
    height:30px;
    position:absolute;
    top:0;
    left:0;
    zoom:0.8;
    z-index:200;
}

[data-fav]>span.wds-button {
    cursor:default;
    filter:brightness(1);
    border-color:var(--theme-page-background-color--secondary);
    color:white !important;
}

.wikiafavorites .wds-button {
    background:transparent;
    color:var(--theme-link-color);
    border-left:0;
    border-right:0;
    border-top:0;
    padding:5px;
    font-size:0.7rem !important;
    border-color:var(--theme-page-background-color--secondary);
    border-radius:0 !important;
}

.wikiafavorites .wds-button:not(:last-child) {
    border-right:0;
}

.wikiafavorites > span:last-child > .wds-button {
    border-right:0.5px solid var(--theme-page-background-color--secondary);
} 

.currentwikia>.wds-button {
    border-bottom:transparent;
    border-right: 0.5px solid var(--theme-page-background-color--secondary) !important;
}

.currentwikia p {
zoom:120%;
}

.currentwikia {
pointer-events:none;
background: rgba(var(--theme-accent-color--rgb), 0.6);
}

.wikiafavorites {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
` );
window.favWikiaLoaded = true;
});