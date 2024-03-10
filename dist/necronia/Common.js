  var importScript = function(filename) {
    $.ajax({
      url: '/index.php?title=' + filename + '&action=raw',
      dataType: 'script',
      success: function(data) {
        $('body:first').append('<script type="text/javascript">' + data + '</script>');
      }
    });
  };

  //Flickity
  $.ajax({
    url: '/index.php?title=MediaWiki:Flickity.js&action=raw',
    dataType: 'script',
    success: function(data) {
      $('body:first').append('<script type="text/javascript">' + data + '</script>');
      $('.carousel').flickity({
        imagesLoaded: true,
        lazyLoad: true,
        percentPosition: false,
        autoPlay: true,
        wrapAround: true,
        selectedAttraction: 0.025,
        friction: 0.28
      });
    }
  });

  //Loot Parser
  if (mw.config.get('wgPageName') === 'Loot_Statistics' || $('a[href*="https://necronia.gamepedia.com/Loot_Statistics"]').length>0) {
      $.ajax({
          url: '/index.php?title=Mediawiki:Loot_Parser.js&action=raw',
          cache: false,
          success: function (text) {
              text = text.slice(text.search('id="pre_lootparser">') + 21, text.search('<\/pre>'));
              $('#lootparser_loot_script').append('<script type="text/javascript">' + text + '</script>');
          }
      });
  }

  //Tooltips
  mw.loader.load( '/index.php?title=MediaWiki:Tooltips.js&action=raw&ctype=text/javascript' );

  //Mapper
  if (mw.config.get('wgPageName') === 'Mapper' || $('a[href*="https://necronia.gamepedia.com/Mapper"]').length>0) {
     mw.loader.load( '/index.php?title=MediaWiki:Mapper.js&action=raw&ctype=text/javascript' );
  }

  //translator
  if (mw.config.get('wgPageName') === 'Troggish_Translator' || $('a[href*="https://necronia.gamepedia.com/Troggish_Translator"]').length>0) {
     mw.loader.load( '/index.php?title=MediaWiki:Troggish_Translator.js&action=raw&ctype=text/javascript' );
  }

  //Show/Hide toggle
  $(".showhide-header").click(function() {
    $(".showhide-body").toggleClass("displaynone");
  });

  //NPC Chat colors
  $('table.npc_chat_div_r div.m3, table.npc_chat_div div.m3').each(function() {
    $(this).html('<span>' + ($(this).html().replace(/<br \/>|<br\/>|<br>/gi, '</span><br /><span>').replace(/''player'':|<i>player<\/i>:|player:/gi, '</span><span class="pl">-:pL:-').replace(/-:pL:-/g, '<span class="i">Player</span>:').replace(/::/g, ':').replace(/\{/g, '<b>').replace(/\}/g, '</b>')) + '</span>');
  });

  // loot %
  mw.loader.load( '/index.php?title=MediaWiki:Loot_percentage.js&action=raw&ctype=text/javascript' );