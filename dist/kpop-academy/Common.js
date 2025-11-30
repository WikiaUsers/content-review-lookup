$(function () {
  var cardBackURL = "https://static.wikia.nocookie.net/kpop-academy/images/a/a4/Card-back.png/revision/latest?cb=20250113175309&format=original";

  var cardNames = [
    'Sparkpc1.png', 'Sparkpc2.png', 'Sparkpc3.png',
    'Berrypc1.png', 'Berrypc2.png', 'Berrypc3.png',
    'Kieranpc1.png', 'Kieranpc2.png', 'Kieranpc3.png',
    'Axlpc1.png', 'Axlpc2.png', 'Axlpc3.png',
    'Tristanpc1.png', 'Tristanpc2.png', 'Tristanpc3.png',
    'Mintpc1.png', 'Mintpc2.png', 'Mintpc3.png',
    'Fire Kpc1.png', 'Fire Kpc2.png', 'Fire Kpc3.png',
    'Leopc1.png', 'Leopc2.png', 'Leopc3.png',
    'Dantepc1.png', 'Dantepc2.png', 'Dantepc3.png',
    'Markpc1.png', 'Markpc2.png', 'Markpc3.png',
    'Janpc1.png', 'Janpc2.png', 'Janpc3.png',
    'Sai Lorepc1.png', 'Sai Lorepc2.png', 'Sai Lorepc3.png',
    'Myaepc1.png', 'Myaepc2.png', 'Myaepc3.png',
    'Elipc1.png', 'Elipc2.png', 'Elipc3.png',
    'Hazepc1.png', 'Hazepc2.png', 'Hazepc3.png',
    'Jessepc1.png', 'Jessepc2.png', 'Jessepc3.png',
    "Ken'tpc1.png", "Ken'tpc2.png", "Ken'tpc3.png",
    'RyLeepc1.png', 'RyLeepc2.png', 'RyLeepc3.png',
    'Orpheuspc1.png', 'Orpheuspc2.png', 'Orpheuspc3.png',
    'Greenpc1.png', 'Greenpc2.png', 'Greenpc3.png',
    'Hoshi Boshipc1.png', 'Hoshi Boshipc2.png', 'Hoshi Boshipc3.png',
    'Joxesterpc1.png', 'Joxesterpc2.png', 'Joxesterpc3.png',
    'Dunkpc1.png', 'Dunkpc2.png', 'Dunkpc3.png',
    'Moon Songpc1.png', 'Moon Songpc2.png', 'Moon Songpc3.png'
  ];

  var imageMap = {};
  var currentIndex = 0;
  var clickCount = 0;

  function fetchImageURL(fileName) {
    return $.getJSON("https://kpop-academy.fandom.com/api.php", {
      action: "query",
      titles: "File:" + fileName,
      prop: "imageinfo",
      iiprop: "url",
      format: "json",
      origin: "*"
    }).then(function (data) {
      var pages = data.query.pages;
      for (var key in pages) {
        if (pages[key].imageinfo) {
          return {
            name: fileName.replace('.png', ''),
            url: pages[key].imageinfo[0].url
          };
        }
      }
      return null;
    });
  }

  // Inject card-back image into the card-front
  $('.card-front').html('<img src="' + cardBackURL + '" alt="Card Back" style="width:100%; height:100%; border-radius:18px;" />');

  Promise.all(cardNames.map(fetchImageURL)).then(function (results) {
    results.forEach(function (card) {
      if (card) {
        imageMap[card.name] = card.url;
      }
    });

    $('#gacha-button').prop('disabled', false).text('🎲 Pull a Card!');
  });

  $('#gacha-button').click(function () {
  clickCount++;
  var keys = cardNames.map(name => name.replace('.png', ''));

  // Pick a random index from the keys array
  var randomIndex = Math.floor(Math.random() * keys.length);
  var randomKey = keys[randomIndex];

  if (clickCount === 1) {
    $('#gacha-result').html(
      '<img src="' + imageMap[randomKey] + '" alt="' + randomKey + '" style="width:100%; height:100%; border-radius:18px;" />' +
      '<p>You pulled: <strong>' + randomKey + '!</strong></p>'
    );
    $('.card-inner').css('transform', 'rotateY(180deg)');
  } else {
    $('.card-inner').css('transform', 'rotateY(0deg)');
    setTimeout(function () {
      $('#gacha-result').html(
        '<img src="' + imageMap[randomKey] + '" alt="' + randomKey + '" style="width:100%; height:100%; border-radius:18px;" />' +
        '<p>You pulled: <strong>' + randomKey + '!</strong></p>'
      );
      $('.card-inner').css('transform', 'rotateY(180deg)');
    }, 600);
  }
});
});
/***PLAYLIST***/
mw.loader.using('jquery').then(function () {
  // Load Font Awesome for buttons
  mw.loader.load('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', 'text/css');

  // Inject the HTML structure
          $('#app-art').html(`

            <img src="https://static.wikia.nocookie.net/kpop-academy/images/3/39/Site-community-image/revision/latest?cb=20250122000105" class="active" id="_1">
            <img src="https://static.wikia.nocookie.net/kpop-academy/images/b/b2/SongBanner_SongInLuv.png" id="_2">
            <img src="https://static.wikia.nocookie.net/kpop-academy/images/a/a6/SongBanner_MerryandHappyBeats.png" id="_3">
            <img src="https://static.wikia.nocookie.net/kpop-academy/images/a/ab/SongBanner_FeeltheEnergyTunes.png" id="_4">
            
              `);


  // ===================
  // Player Logic
  // ===================
  var playerTrack = $("#player-track"), bgArtwork = $('#bg-artwork'), bgArtworkUrl, albumName = $('#album-name'), trackName = $('#track-name'), albumArt = $('#album-art'), sArea = $('#s-area'), seekBar = $('#seek-bar'), trackTime = $('#track-time'), insTime = $('#ins-time'), sHover = $('#s-hover'), playPauseButton = $("#play-pause-button"),  i = playPauseButton.find('i'), tProgress = $('#current-time'), tTime = $('#track-length'), seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false, 
        albums = ['Main Theme','Luv Song','Happy Beats','Energy Tunes'], 
        trackNames = ['Kpop Academy','Kpop Academy','Kpop Academy','Kpop Academy'], 
        albumArtworks = ['_1','_2','_3','_4'], 
        trackUrl = ['https://static.wikia.nocookie.net/kpop-academy/images/6/69/Main_Theme.mp3',
                    'https://static.wikia.nocookie.net/kpop-academy/images/4/42/Luv_Song.mp3',
                    'https://static.wikia.nocookie.net/kpop-academy/images/0/03/Happy_Beats.mp3',
                    'https://static.wikia.nocookie.net/kpop-academy/images/0/04/Energy_Tunes.mp3',
                   ], 
        playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

            
        function showHover(event)
        {
                seekBarPos = sArea.offset(); 
                seekT = event.clientX - seekBarPos.left;
                seekLoc = audio.duration * (seekT / sArea.outerWidth());
                
                sHover.width(seekT);
                
                cM = seekLoc / 60;
                
                ctMinutes = Math.floor(cM);
                ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
                
                if( (ctMinutes < 0) || (ctSeconds < 0) )
                        return;
                
        if( (ctMinutes < 0) || (ctSeconds < 0) )
                        return;
                
                if(ctMinutes < 10)
                        ctMinutes = '0'+ctMinutes;
                if(ctSeconds < 10)
                        ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
                    insTime.text(ctMinutes+':'+ctSeconds);
            
                insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
                
        }

    function hideHover()
        {
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);                
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
                seekBar.width(seekT);
                hideHover();
    }

    function updateCurrTime()
        {
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

                curMinutes = Math.floor(audio.currentTime / 60);
                curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
                
                durMinutes = Math.floor(audio.duration / 60);
                durSeconds = Math.floor(audio.duration - durMinutes * 60);
                
                playProgress = (audio.currentTime / audio.duration) * 100;
                
                if(curMinutes < 10)
                        curMinutes = '0'+curMinutes;
                if(curSeconds < 10)
                        curSeconds = '0'+curSeconds;
                
                if(durMinutes < 10)
                        durMinutes = '0'+durMinutes;
                if(durSeconds < 10)
                        durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
                    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
                    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
                seekBar.width(playProgress+'%');
                
                if( playProgress == 100 )
                {
                        i.attr('class','fa fa-play');
                        seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
                }
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < albumArtworks.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find('div.active').removeClass('active');
            $("#_1, #_2, #_3, #_4").removeClass("active");
            $('#'+currArtwork).addClass('active');
            
            
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
        {        
        audio = new Audio();

                selectTrack(0);
                
                audio.loop = false;
                
                playPauseButton.on('click',playPause);
                
                sArea.mousemove(function(event){ showHover(event); });
                
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
                
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
        }
    
        initPlayer();
});




















// === Load dependencies ===
mw.loader.using(['mediawiki.api','jquery'], function(){

    let filters = {};            // selected filters
    let logic = 'OR';            // default logic

    // ============================================
    // 1) LOAD FILTER DATA FROM TEMPLATE <div>
    // ============================================
    const filtersData = {};  // replaced version (no hardcode)

    $('div.type-field[data-type="dropbox"]').each(function(){
        const key = $(this).data('key');
        const raw = $(this).data('options');       // "Idol,Sexy,Sporty"
        const arr = raw.split(',').map(x => x.trim());
        filtersData[key] = arr;

        // Insert a clickable span.dropdown same as old system
        const label = $('<span>')
            .addClass('dropdown')
            .attr('data-key', key)
            .text(key);

        $(this).replaceWith(label);
    });

    // ============================================
    // 2) RENDER DROPDOWNS (dynamic from dropbox)
    // ============================================
    $('span.dropdown').each(function(){
        let key = $(this).data('key');
        let $menu = $('<div>').addClass('dropdown-menu');

        filtersData[key].forEach(val => {
            let $item = $('<div>')
                .addClass('dropdown-item')
                .text(val)
                .data('value', val);

            $menu.append($item);
        });

        $(this).after($menu);

        $(this).click(function(){
            $menu.toggle();
        });
    });

    // ============================================
    // 3) SELECT/UNSELECT ITEM
    // ============================================
    $(document).on('click', '.dropdown-item', function(){
        let val = $(this).data('value');
        let key = $(this).closest('.dropdown-menu').prev('.dropdown').data('key');

        if(!filters[key]) filters[key] = [];

        if(filters[key].includes(val)){
            filters[key] = filters[key].filter(v => v !== val);
            $(this).removeClass('selected');
        } else {
            filters[key].push(val);
            $(this).addClass('selected');
        }
    });

    // ============================================
    // 4) QUERY DPL
    // ============================================
    $('#queryDataBtn').click(function(){
        if($.isEmptyObject(filters)){
            $('#queryDataGrid').html('No filter selected.');
            return;
        }

        let dplLines = ['{{#dpl:'];

        Object.keys(filters).forEach(key => {
            if(filters[key].length === 1){
                dplLines.push('|category=' + filters[key][0]);
            } else if(filters[key].length > 1){
                if(logic === 'OR'){
                    dplLines.push('|category=' + filters[key].join('¦'));
                } else {
                    filters[key].forEach(v => dplLines.push('|category=' + v));
                }
            }
        });

        dplLines.push('|notnamespace=File¦Template¦Category');
        dplLines.push('|ordermethod=title');
        dplLines.push('|format=,²{Shop¦food¦¦%TITLE%_ui¦¦5¦}²\\n,,');
        dplLines.push('}}');

        new mw.Api().get({
            action: 'parse',
            format: 'json',
            text: dplLines.join('\n'),
            contentmodel: 'wikitext'
        }).done(function(data){
            $('#queryDataGrid').html(data.parse.text['*']);
        });
    });

    // ============================================
    // 5) CLEAR FILTERS
    // ============================================
    $('#clearParamBtn').click(function(){
        filters = {};
        $('.dropdown-item').removeClass('selected');
        $('#queryDataGrid').html('');
    });

});