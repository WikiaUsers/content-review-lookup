/* Any JavaScript here will be loaded for all users on every page load. */

( function() {

  /*============Tooltips============*/

  var $ability_tt = $([
    '<div class="tooltip hidden">',
      '<div class="ability-tt">',
        '<div class="ability-tt--header">',
          '<div class="ability-tt--icon">',
            '<span class="inline-icon">',
              '<span class="inline-icon--overlay">',
                '<img src="blah" />',
              '</span>',
              '<span class="inline-icon--image">',
                '<img src="blah" />',
              '</span>',
            '</span>',
          '</div>',
          '<div class="ability-tt--title"></div>',
          '<div class="ability-tt--spacer"></div>',
          '<div class="ability-tt--shiftkey nodisplay">Shift</div>',
          '<div class="ability-tt--keybind"></div>',
        '</div>',
        '<div class="ability-tt--properties">',  
          '<span class="ability-tt--cooldown"></span>',
          '<div class="ability-tt--spacer"></div>',
          '<span class="ability-tt--type"></span>',
        '</div>',
        '<div class="ability-tt--properties">',  
          '<span class="ability-tt--casttime"></span>',
          '<div class="ability-tt--spacer"></div>',
          '<span class="ability-tt--energy"></span>',
        '</div>',
        '<div class="ability-tt--divider"></div>',
        '<div class="ability-tt--description"></div>',
        '<div class="ability-tt--sub">',
        '</div>',
      '</div>',
    '</div>'
  ].join("\n"));

  $('body').append($ability_tt);

  $('.has_ability-tt')
    .mouseenter(function() {
      renderAbilityTooltip(this, $ability_tt);
      showTooltip($ability_tt);
    })
    .mousemove(function(e) {
      moveTooltip(e, $ability_tt);
    })
    .mouseleave(function() {
      hideTooltip($ability_tt);
    });

  function showTooltip($tt) {
    $tt.removeClass('hidden');
  }

  function moveTooltip(e, $tt) {
    var top = e.clientY + ((e.clientY - $tt.innerHeight() - 20) < 0 ? 20 : -($tt.innerHeight() + 20));
    var left = e.clientX + ((e.clientX + $tt.innerWidth() + 25) > $(window).width() ? -($tt.innerWidth() + 20) : 20);
    $tt.css({
      'position': 'fixed',
      'top': top + 'px',
      'left': left + 'px'
    });
  }

  function hideTooltip($tt) {
    $tt.addClass('hidden');
  }

  function renderAbilityTooltip(container, $tt) {
    $abilityData = $(container).find('.ability-tt--data');
    $tt.find('.ability-tt--title').text($abilityData.data('name'));
    $tt.find('.ability-tt--description').text($abilityData.data('description'));
    $tt.find('.ability-tt--cooldown').text($abilityData.data('cooldown') + ' Cooldown');
    $tt.find('.ability-tt--type').text($abilityData.data('type'));
    $tt.find('.ability-tt--casttime').text($abilityData.data('casttime') + ' Cast Time');
    $tt.find('.ability-tt--energy').text($abilityData.data('energy') + ' Energy');
    
    var key = $abilityData.data('key');
    if (key.substr(0, 5) == 'shift') {
      $tt.find('.ability-tt--shiftkey').removeClass('nodisplay');
      $tt.find('.ability-tt--keybind').text(key.substr(key.indexOf('+') + 1));
    }
    else {
      $tt.find('.ability-tt--shiftkey').addClass('nodisplay');
      $tt.find('.ability-tt--keybind').text(key);
    }  
    
    var $propertyBox = $tt.find('.ability-tt--sub');
    $propertyBox.empty();
    for (var i = 1; i <= 6; i++) {
      var property = $abilityData.data('property' + i);
      if (property !== '') {
        $propertyBox.append([
          '<span>',
            '<span class="ability-tt--sub_title">' + property + '</span>: ' + $abilityData.data('value' + i),
          '</span>'
        ].join("\n"));
      }
    }
    
    var borderSrc = $abilityData.find('.tooltip-border').attr('src');
    var iconSrc = $abilityData.find('.tooltip-image').attr('src');
    $tt.find('.inline-icon--overlay img').attr('src', borderSrc);
    $tt.find('.inline-icon--image img').attr('src', iconSrc);
  }

  /*============Twitch Streams============*/
  RLQ.push(function() {
    $.ajax({
     type: 'GET',
     url: 'https://api.twitch.tv/kraken/search/streams?query=battlerite',
     headers: {
       'Client-ID': 'isk4ekewuwm3l0ctjx648wexavajng'
     },
     success: function(data) {
      $("#mf-streams").html("");
      $.each(data.streams, function(i, stream) {
       $("#mf-streams").append( $("<div>", {id: "stream_" + stream.channel._id, "class": "stream"}).append($("<a>", {href: stream.channel.url, text: stream.channel.display_name}) , $("<p>", {text: stream.channel.status}) , $("<p>", {text: stream.viewers}) ) ) 
       console.log(stream);
      });
     }
    });
  });


}() );