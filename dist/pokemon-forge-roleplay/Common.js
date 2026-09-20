/* ===== Pokémon Forge Wiki Common.js ===== */

window.RLQ = window.RLQ || [];

window.RLQ.push(function () {

  /* =========================================================
     POKÉDEX OPENING INTRO
     ========================================================= */

  function unlock(){
    document.body.classList.remove('pdx-lock');
  }

  function lock(){
    document.body.classList.add('pdx-lock');
  }

  function hide(el){
    if (!el) return;

    el.classList.remove('is-playing','is-visible');
    el.setAttribute('aria-hidden','true');
    el.style.display = 'none';

    unlock();
  }

  function play(el){

    if (!el) return;

    el.classList.remove('is-playing','is-visible');
    el.setAttribute('aria-hidden','false');
    el.style.display = 'none';

    void el.offsetWidth;

    el.style.display = 'flex';
    el.classList.add('is-visible');
    lock();

    requestAnimationFrame(function(){
      el.classList.add('is-playing');
    });

    var finished = false;

    function finish(){

      if (finished) return;

      finished = true;

      hide(el);
    }

    function onEnd(e){

      if (e.animationName === 'pdx-overlay-fade'){

        el.removeEventListener(
          'animationend',
          onEnd
        );

        finish();
      }
    }

    el.addEventListener(
      'animationend',
      onEnd
    );

    setTimeout(function(){

      finish();

    }, 1800);


    var skip =
      el.querySelector('.pdx-skip');


    if (skip){

      skip.addEventListener(
        'click',
        function(){

          finish();

        }
      );


      skip.addEventListener(
        'keydown',
        function(e){

          if (
            e.key === 'Enter' ||
            e.key === ' '
          ){

            e.preventDefault();

            finish();
          }
        }
      );
    }


    function onEsc(e){

      if (e.key === 'Escape'){

        finish();

        window.removeEventListener(
          'keydown',
          onEsc
        );
      }
    }


    window.addEventListener(
      'keydown',
      onEsc
    );
  }


  function init(root){

    unlock();

    var el =
      (root || document).querySelector(
        '#pokedex-intro'
      );

    if (!el) return;

    if (
      el.dataset.pdxInit === '1'
    ){
      return;
    }

    el.dataset.pdxInit = '1';

    play(el);
  }


  init(document);


  if (
    typeof mw !== 'undefined' &&
    mw.hook
  ){

    mw.hook(
      'wikipage.content'
    ).add(
      function($content){

        unlock();

        var node =
          $content &&
          (
            $content.get ?
            $content.get(0) :
            $content[0]
          );

        init(
          node || document
        );
      }
    );
  }


  document.addEventListener(
    'visibilitychange',
    function(){

      unlock();

    }
  );


  window.addEventListener(
    'beforeunload',
    function(){

      unlock();

    }
  );


  /* =========================================================
     TRAINER CARD — POKÉ BALL THEME SONG
     ========================================================= */

  function findTrainerCardAudio(button){

    if (!button) return null;


    var audio =
      button.querySelector(
        'audio'
      );


    if (audio) return audio;


    var possiblePlayers =
      button.querySelectorAll(
        '.mw-tmh-player audio,' +
        '.mw-tmh-player-container audio,' +
        '.mediaContainer audio,' +
        '.audio-player audio,' +
        '.html5audio audio,' +
        'audio'
      );


    if (
      possiblePlayers.length
    ){

      return possiblePlayers[0];
    }


    var directAudio =
      button.querySelector(
        '.tc-theme-audio audio'
      );


    if (directAudio){

      return directAudio;
    }


    return null;
  }


  function stopOtherTrainerCardThemes(
    currentAudio
  ){

    document
      .querySelectorAll(
        '.tc-theme-song'
      )
      .forEach(
        function(otherButton){

          var otherAudio =
            findTrainerCardAudio(
              otherButton
            );


          if (
            otherAudio &&
            otherAudio !== currentAudio
          ){

            try{

              otherAudio.pause();

            }catch(e){}


            try{

              otherAudio.currentTime = 0;

            }catch(e){}
          }


          otherButton.classList.remove(
            'is-playing'
          );
        }
      );
  }


  function initTrainerCardThemeSongs(
    root
  ){

    var container =
      root || document;


    var themeButtons =
      container.querySelectorAll(
        '.tc-theme-song'
      );


    if (
      !themeButtons.length
    ){

      return;
    }


    themeButtons.forEach(
      function(button){

        if (
          button.dataset.tcThemeInit === '1'
        ){

          return;
        }


        button.dataset.tcThemeInit = '1';


        var audio =
          findTrainerCardAudio(
            button
          );


        if (!audio){

          setTimeout(
            function(){

              audio =
                findTrainerCardAudio(
                  button
                );


              if (audio){

                setupTrainerCardAudio(
                  button,
                  audio
                );
              }

            },
            500
          );

          return;
        }


        setupTrainerCardAudio(
          button,
          audio
        );
      }
    );
  }


  function setupTrainerCardAudio(
    button,
    audio
  ){

    if (
      !button ||
      !audio
    ){

      return;
    }


    if (
      audio.dataset.tcAudioInit === '1'
    ){

      return;
    }


    audio.dataset.tcAudioInit = '1';


    audio.addEventListener(
      'play',
      function(){

        stopOtherTrainerCardThemes(
          audio
        );

        button.classList.add(
          'is-playing'
        );
      }
    );


    audio.addEventListener(
      'pause',
      function(){

        button.classList.remove(
          'is-playing'
        );
      }
    );


    audio.addEventListener(
      'ended',
      function(){

        button.classList.remove(
          'is-playing'
        );


        try{

          audio.currentTime = 0;

        }catch(e){}
      }
    );


    button.addEventListener(
      'click',
      function(event){

        if (
          event.target === audio ||
          audio.contains(event.target)
        ){

          return;
        }


        event.preventDefault();
        event.stopPropagation();


        stopOtherTrainerCardThemes(
          audio
        );


        if (audio.paused){

          var playPromise =
            audio.play();


          if (
            playPromise !== undefined
          ){

            playPromise.then(
              function(){

                button.classList.add(
                  'is-playing'
                );

              }
            ).catch(
              function(error){

                button.classList.remove(
                  'is-playing'
                );


                console.warn(
                  'TrainerCard theme song could not be played:',
                  error
                );
              }
            );

          }else{

            button.classList.add(
              'is-playing'
            );
          }

        }else{

          audio.pause();

          button.classList.remove(
            'is-playing'
          );
        }
      }
    );
  }


  initTrainerCardThemeSongs(
    document
  );


  if (
    typeof mw !== 'undefined' &&
    mw.hook
  ){

    mw.hook(
      'wikipage.content'
    ).add(
      function($content){

        var node =
          $content &&
          (
            $content.get ?
            $content.get(0) :
            $content[0]
          );


        initTrainerCardThemeSongs(
          node || document
        );
      }
    );
  }


  setTimeout(
    function(){

      initTrainerCardThemeSongs(
        document
      );

    },
    1000
  );


  setTimeout(
    function(){

      initTrainerCardThemeSongs(
        document
      );

    },
    2500
  );

});


/* =========================================================
   POKÉMON GENERATOR
   ========================================================= */

window.RLQ.push(function () {

(function(){

  var POKEMON_GENERATOR_CODE_MAX =
    28672;


  /* Permanent Shiny Codes */

  var POKEMON_GENERATOR_SHINY_CODES = [

    1842,
    7291,
    10583,
    14376,
    21749,
    25104,
    28031

  ];


  /* All 25 Pokémon Natures */

  var POKEMON_GENERATOR_NATURES = [

    'Hardy',
    'Lonely',
    'Brave',
    'Adamant',
    'Naughty',

    'Bold',
    'Docile',
    'Relaxed',
    'Impish',
    'Lax',

    'Timid',
    'Hasty',
    'Serious',
    'Jolly',
    'Naive',

    'Bashful',
    'Quirky',
    'Mild',
    'Rash',
    'Quiet',

    'Calm',
    'Gentle',
    'Sassy',
    'Careful',
    'Modest'

  ];


  /* Random Integer */

  function randomInt(
    min,
    max
  ){

    return Math.floor(
      Math.random() *
      (max - min + 1)
    ) + min;
  }


  /* Generate Nature */

  function generateNature(){

    return POKEMON_GENERATOR_NATURES[
      randomInt(
        0,
        POKEMON_GENERATOR_NATURES.length - 1
      )
    ];
  }


  /* Generate IVs */

  function generateIVs(){

    return {

      HP:
        randomInt(
          0,
          31
        ),

      Attack:
        randomInt(
          0,
          31
        ),

      Defense:
        randomInt(
          0,
          31
        ),

      'Sp. Atk':
        randomInt(
          0,
          31
        ),

      'Sp. Def':
        randomInt(
          0,
          31
        ),

      Speed:
        randomInt(
          0,
          31
        )

    };
  }


  /* Generate EVs */

  function generateEVs(){

    var stats = [

      'HP',
      'Attack',
      'Defense',
      'Sp. Atk',
      'Sp. Def',
      'Speed'

    ];


    var evs = {

      HP: 0,
      Attack: 0,
      Defense: 0,
      'Sp. Atk': 0,
      'Sp. Def': 0,
      Speed: 0

    };


    var remaining =
      randomInt(
        0,
        127
      ) * 4;


    while (
      remaining >= 4
    ){

      var availableStats =
        stats.filter(
          function(stat){

            return (
              evs[stat] < 252
            );

          }
        );


      if (
        !availableStats.length
      ){

        break;
      }


      var stat =
        availableStats[
          randomInt(
            0,
            availableStats.length - 1
          )
        ];


      var remainingForStat =
        252 - evs[stat];


      var maxPoints =
        Math.min(

          Math.floor(
            remainingForStat / 4
          ),

          Math.floor(
            remaining / 4
          )

        );


      if (
        maxPoints <= 0
      ){

        continue;
      }


      var amount =
        randomInt(
          1,
          maxPoints
        ) * 4;


      evs[stat] += amount;

      remaining -= amount;
    }


    return evs;
  }


  /* Generate Random Code */

  function generateRandomCode(){

    return randomInt(
      1,
      POKEMON_GENERATOR_CODE_MAX
    );
  }


  /* Check Shiny Code */

  function checkShinyCode(
    code
  ){

    return (
      POKEMON_GENERATOR_SHINY_CODES.indexOf(
        code
      ) !== -1
    );
  }


  /* Check stored Shiny Encounter */

  function hasShinyEncounter(){

    try{

      return (
        localStorage.getItem(
          'pokemonForgeNextShiny'
        ) === 'true'
      );

    }catch(e){

      return false;
    }
  }


  /* Store Shiny Encounter */

  function setShinyEncounter(){

    try{

      localStorage.setItem(
        'pokemonForgeNextShiny',
        'true'
      );

    }catch(e){}
  }


  /* Consume Shiny Encounter */

  function consumeShinyEncounter(){

    try{

      localStorage.removeItem(
        'pokemonForgeNextShiny'
      );

    }catch(e){}
  }


  /* Generate Complete Pokémon Data */

  function generate(){

    var nature =
      generateNature();


    var ivs =
      generateIVs();


    var evs =
      generateEVs();


    var randomCode =
      generateRandomCode();


    var shiny =
      checkShinyCode(
        randomCode
      );


    if (shiny){

      setShinyEncounter();
    }


    return {

      nature:
        nature,

      ivs:
        ivs,

      evs:
        evs,

      randomCode:
        randomCode,

      shiny:
        shiny

    };
  }


  /* Build Generator Result */

  function buildResult(
    data
  ){

    var html = '';


    html +=
      '<div class="pokemon-generator-result">';


    html +=
      '<div class="pokemon-generator-nature">';


    html +=
      '<div class="pokemon-generator-heading">';


    html +=
      'Nature';


    html +=
      '</div>';


    html +=
      '<div class="pokemon-generator-nature-value">';


    html +=
      data.nature;


    html +=
      '</div>';


    html +=
      '</div>';


    html +=
      '<div class="pokemon-generator-section-title">';


    html +=
      'Individual Values — IVs';


    html +=
      '</div>';


    html +=
      '<div class="pokemon-generator-stats">';


    Object.keys(
      data.ivs
    ).forEach(
      function(stat){

        html +=
          '<div class="pokemon-generator-stat">';


        html +=
          '<div class="pokemon-generator-stat-name">';


        html +=
          stat;


        html +=
          '</div>';


        html +=
          '<div class="pokemon-generator-stat-value">';


        html +=
          data.ivs[stat];


        html +=
          '</div>';


        html +=
          '</div>';

      }
    );


    html +=
      '</div>';


    html +=
      '<div class="pokemon-generator-section-title">';


    html +=
      'Effort Values — EVs';


    html +=
      '</div>';


    html +=
      '<div class="pokemon-generator-stats">';


    Object.keys(
      data.evs
    ).forEach(
      function(stat){

        html +=
          '<div class="pokemon-generator-stat">';


        html +=
          '<div class="pokemon-generator-stat-name">';


        html +=
          stat;


        html +=
          '</div>';


        html +=
          '<div class="pokemon-generator-stat-value">';


        html +=
          data.evs[stat];


        html +=
          '</div>';


        html +=
          '</div>';

      }
    );


    html +=
      '</div>';


    if (
      data.shiny
    ){

      html +=
        '<div class="pokemon-generator-shiny">';


      html +=
        '<div class="pokemon-generator-shiny-title">';


      html +=
        '✨ SHINY ENCOUNTER';


      html +=
        '</div>';


      html +=
        '<div class="pokemon-generator-shiny-text">';


      html +=
        'The next Pokémon encounter will be shiny.';


      html +=
        '</div>';


      html +=
        '</div>';
    }


    html +=
      '</div>';


    return html;
  }


  document.addEventListener(
    'click',
    function(event){

      var button =
        event.target.closest(
          '.pokemon-generator-button'
        );


      if (!button){

        return;
      }


      event.preventDefault();

      event.stopPropagation();


      var generator =
        button.closest(
          '.pokemon-random-generator'
        );


      if (!generator){

        console.error(
          'Pokémon Generator: generator container not found.'
        );

        return;
      }


      var output =
        generator.querySelector(
          '.pokemon-generator-output'
        );


      if (!output){

        console.error(
          'Pokémon Generator: output container not found.'
        );

        return;
      }


      var data =
        generate();


      output.innerHTML =
        buildResult(
          data
        );

    }
  );


  document.addEventListener(
    'keydown',
    function(event){

      if (
        event.key !== 'Enter' &&
        event.key !== ' '
      ){

        return;
      }


      var button =
        event.target.closest(
          '.pokemon-generator-button'
        );


      if (!button){

        return;
      }


      event.preventDefault();


      button.click();

    }
  );


  window.PokemonForgeGenerator = {

    generate:
      generate,

    generateNature:
      generateNature,

    generateIVs:
      generateIVs,

    generateEVs:
      generateEVs,

    generateRandomCode:
      generateRandomCode,

    checkShinyCode:
      checkShinyCode,

    hasShinyEncounter:
      hasShinyEncounter,

    consumeShinyEncounter:
      consumeShinyEncounter

  };


  console.log(
    'Pokémon Forge Generator loaded successfully.'
  );

})();

});


/* =========================================================
   LOCATION THEME SONG PLAYER
   PLAYBACK + LIVE BLUE PROGRESS BAR
   ========================================================= */

(function(){

  function stopOtherLocationSongs(
    currentAudio
  ){

    document
      .querySelectorAll(
        '.location-theme-native-audio'
      )
      .forEach(
        function(audio){

          if (
            audio !== currentAudio
          ){

            try{

              audio.pause();

              audio.currentTime = 0;

            }catch(e){}


            var player =
              audio.closest(
                '.location-theme-player'
              );


            if (player){

              player.classList.remove(
                'is-playing'
              );


              var progress =
                player.querySelector(
                  '.location-theme-progress'
                );


              if (progress){

                progress.style.width =
                  '0%';
              }
            }
          }
        }
      );
  }


  function updateProgress(
    audio
  ){

    var player =
      audio.closest(
        '.location-theme-player'
      );


    if (!player){

      return;
    }


    var progress =
      player.querySelector(
        '.location-theme-progress'
      );


    if (!progress){

      return;
    }


    if (
      !audio.duration ||
      !isFinite(
        audio.duration
      )
    ){

      progress.style.width =
        '0%';

      return;
    }


    var percent =
      (
        audio.currentTime /
        audio.duration
      ) * 100;


    if (
      percent < 0
    ){

      percent = 0;
    }


    if (
      percent > 100
    ){

      percent = 100;
    }


    progress.style.width =
      percent + '%';
  }


  function setupPlayer(
    player
  ){

    if (
      player.dataset.locationPlayerReady === '1'
    ){

      return;
    }


    var audio =
      player.querySelector(
        '.location-theme-native-audio'
      );


    if (!audio){

      return;
    }


    player.dataset.locationPlayerReady =
      '1';


    audio.addEventListener(
      'play',
      function(){

        stopOtherLocationSongs(
          audio
        );


        player.classList.add(
          'is-playing'
        );


        updateProgress(
          audio
        );
      }
    );


    audio.addEventListener(
      'pause',
      function(){

        player.classList.remove(
          'is-playing'
        );


        updateProgress(
          audio
        );
      }
    );


    audio.addEventListener(
      'timeupdate',
      function(){

        updateProgress(
          audio
        );
      }
    );


    audio.addEventListener(
      'loadedmetadata',
      function(){

        updateProgress(
          audio
        );
      }
    );


    audio.addEventListener(
      'canplay',
      function(){

        updateProgress(
          audio
        );
      }
    );


    audio.addEventListener(
      'ended',
      function(){

        player.classList.remove(
          'is-playing'
        );


        updateProgress(
          audio
        );
      }
    );


    player.addEventListener(
      'click',
      function(event){

        event.preventDefault();

        event.stopPropagation();


        stopOtherLocationSongs(
          audio
        );


        if (
          audio.paused
        ){

          var promise =
            audio.play();


          if (
            promise &&
            typeof promise.then === 'function'
          ){

            promise.then(
              function(){

                player.classList.add(
                  'is-playing'
                );


                updateProgress(
                  audio
                );
              }
            ).catch(
              function(){

                player.classList.remove(
                  'is-playing'
                );
              }
            );

          }else{

            player.classList.add(
              'is-playing'
            );
          }

        }else{

          audio.pause();


          player.classList.remove(
            'is-playing'
          );
        }
      }
    );


    updateProgress(
      audio
    );
  }


  function initLocationPlayers(
    root
  ){

    var container =
      root || document;


    var players =
      container.querySelectorAll(
        '.location-theme-player'
      );


    players.forEach(
      function(player){

        setupPlayer(
          player
        );
      }
    );
  }


  initLocationPlayers(
    document
  );


  if (
    typeof mw !== 'undefined' &&
    mw.hook
  ){

    mw.hook(
      'wikipage.content'
    ).add(
      function($content){

        var node =
          $content &&
          (
            $content.get ?
            $content.get(0) :
            $content[0]
          );


        initLocationPlayers(
          node || document
        );
      }
    );
  }


  setTimeout(
    function(){

      initLocationPlayers(
        document
      );

    },
    500
  );


  setTimeout(
    function(){

      initLocationPlayers(
        document
      );

    },
    1500
  );


  setTimeout(
    function(){

      initLocationPlayers(
        document
      );

    },
    3000
  );

})();

/* =========================================================
   TRAINER'S POKÉDEX
   DATA + TABS + STAT BARS
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       FIND TRAINER DEX ROOTS
       ===================================================== */

    function getTrainerDexRoots(content) {

        var roots = [];

        /*
         * If Fandom supplies a content container,
         * search inside that container first.
         */

        if (content) {

            var contentElement = content;

            if (content.jquery) {
                contentElement = content[0];
            }

            if (contentElement) {

                if (
                    contentElement.matches &&
                    contentElement.matches(".trainer-dex")
                ) {

                    roots.push(contentElement);

                }

                var found =
                    contentElement.querySelectorAll
                        ? contentElement.querySelectorAll(".trainer-dex")
                        : [];

                for (var i = 0; i < found.length; i++) {
                    roots.push(found[i]);
                }

            }

        }


        /*
         * Also search the complete document.
         * This is important for direct page loads.
         */

        var documentRoots =
            document.querySelectorAll(".trainer-dex");

        for (var j = 0; j < documentRoots.length; j++) {

            if (roots.indexOf(documentRoots[j]) === -1) {
                roots.push(documentRoots[j]);
            }

        }


        return roots;

    }


    /* =====================================================
       INITIALIZE ONE TRAINER DEX
       ===================================================== */

    function initializeTrainerDex(dex) {

        if (!dex) {
            return;
        }


        /*
         * Prevent the same TrainerDex from being initialized
         * repeatedly by Fandom's page-content hook.
         */

        if (
            dex.getAttribute(
                "data-trainer-dex-initialized"
            ) === "true"
        ) {

            return;

        }


        /*
         * Find the database.
         */

        var database =
            dex.querySelector(
                ".trainer-dex-database"
            );


        if (!database) {
            return;
        }


        /*
         * Find all Pokémon records.
         */

        var records =
            database.querySelectorAll(
                ".dex-record"
            );


        if (!records.length) {
            return;
        }


        /*
         * Mark initialized.
         */

        dex.setAttribute(
            "data-trainer-dex-initialized",
            "true"
        );


        /* =================================================
           HELPERS
           ================================================= */


        function getRecord(number) {

            return database.querySelector(
                '.dex-record[data-pokemon="' +
                number +
                '"]'
            );

        }


        function getRecordValue(record, className) {

            if (!record) {
                return "";
            }


            var element =
                record.querySelector(
                    "." + className
                );


            if (!element) {
                return "";
            }


            return element.textContent.trim();

        }


        function getVisible(id) {

            return dex.querySelector(
                "#" + id
            );

        }


        function setText(id, value, fallback) {

            var element =
                getVisible(id);


            if (!element) {
                return;
            }


            var finalValue =
                String(
                    value === undefined ||
                    value === null
                        ? ""
                        : value
                ).trim();


            if (!finalValue) {

                finalValue =
                    fallback !== undefined
                        ? fallback
                        : "—";

            }


            element.textContent =
                finalValue;

        }


        function setHTML(id, value, fallback) {

            var element =
                getVisible(id);


            if (!element) {
                return;
            }


            var finalValue =
                String(
                    value === undefined ||
                    value === null
                        ? ""
                        : value
                ).trim();


            if (!finalValue) {

                finalValue =
                    fallback !== undefined
                        ? fallback
                        : "—";

            }


            element.innerHTML =
                finalValue;

        }


        /* =================================================
           TYPE HELPERS
           ================================================= */


        function normalizeType(type) {

            return String(type || "")
                .trim()
                .toLowerCase()
                .replace(/[\s.]+/g, "-");

        }


        function createTypeBadge(type) {

            if (!type) {
                return null;
            }


            var badge =
                document.createElement(
                    "span"
                );


            badge.className =
                "dex-type dex-type-" +
                normalizeType(type);


            badge.textContent =
                type;


            return badge;

        }


        /* =================================================
           UPDATE TYPES
           ================================================= */


        function updateTypes(record) {

            var type1 =
                getRecordValue(
                    record,
                    "record-type1"
                );


            var type2 =
                getRecordValue(
                    record,
                    "record-type2"
                );


            /*
             * Main Pokémon card types.
             */

            var mainTypes =
                getVisible(
                    "dex-types"
                );


            if (mainTypes) {

                mainTypes.innerHTML = "";


                if (type1) {

                    var badge1 =
                        createTypeBadge(
                            type1
                        );


                    if (badge1) {
                        mainTypes.appendChild(
                            badge1
                        );
                    }

                }


                if (type2) {

                    var badge2 =
                        createTypeBadge(
                            type2
                        );


                    if (badge2) {
                        mainTypes.appendChild(
                            badge2
                        );
                    }

                }


                if (!mainTypes.children.length) {

                    mainTypes.textContent =
                        "—";

                }

            }


            /*
             * Basic Information type row.
             */

            var infoTypes =
                getVisible(
                    "info-types"
                );


            if (infoTypes) {

                infoTypes.innerHTML = "";


                if (type1) {

                    var infoBadge1 =
                        createTypeBadge(
                            type1
                        );


                    if (infoBadge1) {

                        infoTypes.appendChild(
                            infoBadge1
                        );

                    }

                }


                if (type2) {

                    var infoBadge2 =
                        createTypeBadge(
                            type2
                        );


                    if (infoBadge2) {

                        infoTypes.appendChild(
                            infoBadge2
                        );

                    }

                }


                if (!infoTypes.children.length) {

                    infoTypes.textContent =
                        "—";

                }

            }

        }


        /* =================================================
           STAT BARS
           
           IMPORTANT:
           
           The bar width is the ACTUAL stat number.
           
           50  = 50%
           65  = 65%
           100 = 100%
           
           There is NO 255/720 scaling.
           ================================================= */


        function updateStat(statName, value) {

            var numberElement =
                getVisible(
                    "stat-" + statName
                );


            var barElement =
                getVisible(
                    "bar-" + statName
                );


            var numericValue =
                parseFloat(
                    String(value || "")
                        .replace(/,/g, "")
                        .trim()
                );


            if (isNaN(numericValue)) {
                numericValue = 0;
            }


            if (numericValue < 0) {
                numericValue = 0;
            }


            /*
             * Regular stat bars:
             *
             * 50 = 50%
             * 65 = 65%
             * etc.
             *
             * Clamp at 100 because the bar itself
             * represents a percentage.
             */

            var percentage =
                numericValue;


            if (percentage > 100) {
                percentage = 100;
            }


            if (numberElement) {

                numberElement.textContent =
                    String(numericValue);

            }


            if (barElement) {

                barElement.style.width =
                    percentage + "%";

            }

        }


        /* =================================================
           UPDATE TOTAL
           ================================================= */


        function updateTotal(record) {

            var total =
                getRecordValue(
                    record,
                    "record-total"
                );


            var numericTotal =
                parseFloat(
                    String(total || "")
                        .replace(/,/g, "")
                        .trim()
                );


            if (isNaN(numericTotal)) {
                numericTotal = 0;
            }


            if (numericTotal < 0) {
                numericTotal = 0;
            }


            var numberElement =
                getVisible(
                    "stat-total"
                );


            var barElement =
                getVisible(
                    "bar-total"
                );


            if (numberElement) {

                numberElement.textContent =
                    String(numericTotal);

            }


            /*
             * Total bar is always full,
             * exactly like the PokéStats template.
             */

            if (barElement) {

                barElement.style.width =
                    "100%";

            }

        }


        /* =================================================
           UPDATE MOVE
           ================================================= */


        function updateMove(slot, record) {

            var moveName =
                getRecordValue(
                    record,
                    "record-move" + slot
                );


            var moveType =
                getRecordValue(
                    record,
                    "record-move" +
                    slot +
                    "-type"
                );


            var moveElement =
                getVisible(
                    "move-" + slot
                );


            var typeElement =
                getVisible(
                    "move-type-" + slot
                );


            /*
             * Move name.
             */

            if (moveElement) {

                moveElement.textContent =
                    moveName || "—";

            }


            /*
             * Move type.
             */

            if (typeElement) {

                typeElement.className =
                    "dex-move-type";


                typeElement.textContent =
                    "";


                if (moveType) {

                    typeElement.classList.add(
                        "dex-type-" +
                        normalizeType(moveType)
                    );


                    typeElement.textContent =
                        moveType;

                }

            }

        }


        /* =================================================
           UPDATE FRIENDSHIP
           ================================================= */


        function updateFriendship(record) {

            var hearts =
                getVisible(
                    "dex-hearts"
                );


            if (!hearts) {
                return;
            }


            hearts.innerHTML = "";


            var friendship =
                parseFloat(
                    getRecordValue(
                        record,
                        "record-friendship"
                    )
                );


            if (isNaN(friendship)) {
                friendship = 0;
            }


            if (friendship < 0) {
                friendship = 0;
            }


            if (friendship > 255) {
                friendship = 255;
            }


            /*
             * Five hearts across 255 friendship.
             */

            var filled =
                Math.round(
                    (friendship / 255) * 5
                );


            for (
                var i = 0;
                i < 5;
                i++
            ) {

                var heart =
                    document.createElement(
                        "span"
                    );


                heart.className =
                    "friendship-heart " +
                    (
                        i < filled
                            ? "filled"
                            : "empty"
                    );


                heart.textContent =
                    "♥";


                hearts.appendChild(
                    heart
                );

            }

        }


        /* =================================================
           UPDATE POKÉMON ART
           ================================================= */


        function updateArtwork(record) {

            var art =
                getVisible(
                    "dex-pokemon-art"
                );


            if (!art) {
                return;
            }


            var image =
                record.querySelector(
                    ".record-image"
                );


            if (!image) {

                art.innerHTML =
                    "—";

                return;

            }


            /*
             * Copy the actual image HTML
             * from the hidden record.
             */

            art.innerHTML =
                image.innerHTML;

        }


        /* =================================================
           LOAD POKÉMON
           ================================================= */


        function loadPokemon(number) {

            var record =
                getRecord(number);


            if (!record) {
                return;
            }


            /* ---------------------------------------------
               RECORD DATA
               --------------------------------------------- */

            var nickname =
                getRecordValue(
                    record,
                    "record-nickname"
                );


            var species =
                getRecordValue(
                    record,
                    "record-species"
                );


            var dexNumber =
                getRecordValue(
                    record,
                    "record-number"
                );


            var ability =
                getRecordValue(
                    record,
                    "record-ability"
                );


            var item =
                getRecordValue(
                    record,
                    "record-item"
                );


            var level =
                getRecordValue(
                    record,
                    "record-level"
                );


            var gender =
                getRecordValue(
                    record,
                    "record-gender"
                );


            var genderSymbol =
                getRecordValue(
                    record,
                    "record-gender-symbol"
                );


            var nature =
                getRecordValue(
                    record,
                    "record-nature"
                );


            var trainer =
                getRecordValue(
                    record,
                    "record-trainer"
                );


            var trainerID =
                getRecordValue(
                    record,
                    "record-id"
                );


            var met =
                getRecordValue(
                    record,
                    "record-met"
                );


            var characteristic =
                getRecordValue(
                    record,
                    "record-characteristic"
                );


            var quote =
                getRecordValue(
                    record,
                    "record-quote"
                );


            var entry =
                getRecordValue(
                    record,
                    "record-entry"
                );


            var notes =
                getRecordValue(
                    record,
                    "record-notes"
                );


            /* ---------------------------------------------
               ART
               --------------------------------------------- */

            updateArtwork(
                record
            );


            /* ---------------------------------------------
               MAIN CARD
               --------------------------------------------- */

            setText(
                "dex-nickname",
                nickname,
                "Pokémon"
            );


            setText(
                "dex-species",
                species,
                "—"
            );


            setText(
                "dex-number",
                dexNumber,
                "—"
            );


            setText(
                "dex-gender-symbol",
                genderSymbol,
                ""
            );


            setText(
                "dex-quote",
                quote,
                ""
            );


            /* ---------------------------------------------
               BASIC INFORMATION
               --------------------------------------------- */

            setText(
                "info-nickname",
                nickname
            );


            setText(
                "info-species",
                species
            );


            setText(
                "info-number",
                dexNumber
            );


            setText(
                "info-ability",
                ability
            );


            setText(
                "info-item",
                item
            );


            setText(
                "info-level",
                level
            );


            setText(
                "info-gender",
                gender
            );


            setText(
                "info-nature",
                nature
            );


            setText(
                "info-trainer",
                trainer
            );


            setText(
                "info-id",
                trainerID
            );


            setText(
                "info-met",
                met
            );


            setText(
                "info-characteristic",
                characteristic
            );


            /* ---------------------------------------------
               TYPES
               --------------------------------------------- */

            updateTypes(
                record
            );


            /* ---------------------------------------------
               ENTRY
               --------------------------------------------- */

            setHTML(
                "dex-entry",
                entry
            );


            /* ---------------------------------------------
               NOTES
               --------------------------------------------- */

            setHTML(
                "dex-notes",
                notes
            );


            /* ---------------------------------------------
               STATS
               --------------------------------------------- */

            updateStat(
                "hp",
                getRecordValue(
                    record,
                    "record-hp"
                )
            );


            updateStat(
                "attack",
                getRecordValue(
                    record,
                    "record-attack"
                )
            );


            updateStat(
                "defense",
                getRecordValue(
                    record,
                    "record-defense"
                )
            );


            updateStat(
                "spatk",
                getRecordValue(
                    record,
                    "record-spatk"
                )
            );


            updateStat(
                "spdef",
                getRecordValue(
                    record,
                    "record-spdef"
                )
            );


            updateStat(
                "speed",
                getRecordValue(
                    record,
                    "record-speed"
                )
            );


            /*
             * Total number + 100% bar.
             */

            updateTotal(
                record
            );


            /* ---------------------------------------------
               MOVES
               --------------------------------------------- */

            for (
                var moveSlot = 1;
                moveSlot <= 4;
                moveSlot++
            ) {

                updateMove(
                    moveSlot,
                    record
                );

            }


            /* ---------------------------------------------
               ADDITIONAL INFORMATION
               --------------------------------------------- */

            setText(
                "info-friendship",
                getRecordValue(
                    record,
                    "record-friendship"
                )
            );


            setText(
                "info-status",
                getRecordValue(
                    record,
                    "record-status"
                )
            );


            setText(
                "info-evs",
                getRecordValue(
                    record,
                    "record-evs"
                )
            );


            setText(
                "info-ivs",
                getRecordValue(
                    record,
                    "record-ivs"
                )
            );


            setText(
                "info-happiness",
                getRecordValue(
                    record,
                    "record-happiness"
                )
            );


            /* ---------------------------------------------
               FRIENDSHIP HEARTS
               --------------------------------------------- */

            updateFriendship(
                record
            );


            /* ---------------------------------------------
               ACTIVE TAB
               --------------------------------------------- */

            var tabs =
                dex.querySelectorAll(
                    ".trainer-dex-tab"
                );


            for (
                var tabIndex = 0;
                tabIndex < tabs.length;
                tabIndex++
            ) {

                var tab =
                    tabs[tabIndex];


                var tabPokemon =
                    tab.getAttribute(
                        "data-pokemon"
                    );


                if (
                    String(tabPokemon) ===
                    String(number)
                ) {

                    tab.classList.add(
                        "active"
                    );

                } else {

                    tab.classList.remove(
                        "active"
                    );

                }

            }

        }


        /* =================================================
           CURRENT POKÉMON
           ================================================= */

        function getCurrentPokemon() {

            var active =
                dex.querySelector(
                    ".trainer-dex-tab.active"
                );


            if (!active) {
                return 1;
            }


            var number =
                parseInt(
                    active.getAttribute(
                        "data-pokemon"
                    ),
                    10
                );


            if (
                isNaN(number) ||
                number < 1 ||
                number > 6
            ) {

                return 1;

            }


            return number;

        }


        /* =================================================
           TAB EVENTS
           ================================================= */

        var tabs =
            dex.querySelectorAll(
                ".trainer-dex-tab"
            );


        for (
            var tabIndex = 0;
            tabIndex < tabs.length;
            tabIndex++
        ) {

            (function (tab) {

                tab.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        var number =
                            tab.getAttribute(
                                "data-pokemon"
                            );


                        loadPokemon(
                            number
                        );

                    }
                );

            })(tabs[tabIndex]);

        }


        /* =================================================
           LEFT / RIGHT FOOTER NAVIGATION
           ================================================= */

        var previous =
            dex.querySelector(
                "#dex-prev"
            );


        var next =
            dex.querySelector(
                "#dex-next"
            );


        if (previous) {

            previous.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    var current =
                        getCurrentPokemon();


                    current--;


                    if (current < 1) {
                        current = 6;
                    }


                    loadPokemon(
                        current
                    );

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    var current =
                        getCurrentPokemon();


                    current++;


                    if (current > 6) {
                        current = 1;
                    }


                    loadPokemon(
                        current
                    );

                }
            );

        }


        /* =================================================
           LEFT / RIGHT POKÉMON ARROWS
           ================================================= */

        var leftArrow =
            dex.querySelector(
                "#dex-pokemon-left"
            );


        var rightArrow =
            dex.querySelector(
                "#dex-pokemon-right"
            );


        if (leftArrow) {

            leftArrow.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    var current =
                        getCurrentPokemon();


                    current--;


                    if (current < 1) {
                        current = 6;
                    }


                    loadPokemon(
                        current
                    );

                }
            );

        }


        if (rightArrow) {

            rightArrow.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    var current =
                        getCurrentPokemon();


                    current++;


                    if (current > 6) {
                        current = 1;
                    }


                    loadPokemon(
                        current
                    );

                }
            );

        }


        /* =================================================
           INITIAL LOAD
           ================================================= */

        /*
         * Always load Pokémon #1 when a TrainerDex
         * is initialized.
         */

        loadPokemon(1);

    }


    /* =====================================================
       INITIALIZE ALL TRAINER DEXES
       ===================================================== */

    function initTrainerDex(content) {

        var roots =
            getTrainerDexRoots(
                content
            );


        for (
            var i = 0;
            i < roots.length;
            i++
        ) {

            initializeTrainerDex(
                roots[i]
            );

        }

    }


    /* =====================================================
       MEDIAWIKI / FANDOM PAGE CONTENT HOOK
       ===================================================== */

    if (
        typeof mw !== "undefined" &&
        mw.hook
    ) {

        mw.hook(
            "wikipage.content"
        ).add(
            function (content) {

                initTrainerDex(
                    content
                );

            }
        );

    }


    /* =====================================================
       NORMAL DOM LOAD
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            function () {

                initTrainerDex(
                    document
                );

            }
        );

    } else {

        initTrainerDex(
            document
        );

    }


    /* =====================================================
       MUTATION OBSERVER
       ===================================================== */

    /*
     * Fandom can replace page content without doing
     * a traditional full-page reload. This catches a
     * TrainerDex inserted after the initial page load.
     */

    if (
        typeof MutationObserver !==
        "undefined"
    ) {

        var observer =
            new MutationObserver(
                function (mutations) {

                    for (
                        var i = 0;
                        i < mutations.length;
                        i++
                    ) {

                        var mutation =
                            mutations[i];


                        if (
                            !mutation.addedNodes ||
                            !mutation.addedNodes.length
                        ) {

                            continue;

                        }


                        for (
                            var j = 0;
                            j < mutation.addedNodes.length;
                            j++
                        ) {

                            var node =
                                mutation.addedNodes[j];


                            if (
                                !node ||
                                node.nodeType !== 1
                            ) {

                                continue;

                            }


                            if (
                                node.matches &&
                                node.matches(
                                    ".trainer-dex"
                                )
                            ) {

                                initializeTrainerDex(
                                    node
                                );

                            }


                            if (
                                node.querySelectorAll
                            ) {

                                var dexes =
                                    node.querySelectorAll(
                                        ".trainer-dex"
                                    );


                                for (
                                    var k = 0;
                                    k < dexes.length;
                                    k++
                                ) {

                                    initializeTrainerDex(
                                        dexes[k]
                                    );

                                }

                            }

                        }

                    }

                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    }

})();