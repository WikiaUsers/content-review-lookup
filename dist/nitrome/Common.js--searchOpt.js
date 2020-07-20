/* Any JavaScript here will be loaded for all users on every page load. */
/*<pre>*/
// ======================================================================
// Name: Search option script
// Author: Jens Igels et al.
// Descript: Function to allow all users "search" and "go" values at
//           their own discretion. Includes options for disabling the
//           Wikia Autocomplete and opening search in a new window.
// Location: http://community.wikia.com/wiki/Forum:Search_Fix.js_edite
// ======================================================================
(function () {
  'use strict';
  var jq_go = function () {
    if (skin !== 'oasis') { return; }
    var
      get_cookie = function () {
        var i, c, cl = document.cookie.split(';');
        for (i = 0; i < cl.length; i++) {
          c = $.trim(cl[i]);
          if (c.indexOf('search_fix=') === 0) { return parseInt(c.substring(11), 10) || 0; }
        }
        return 1;
      },
      set_cookie = function (val) {
        var date = new Date();
        date.setTime(date.getTime() + (20 * 365 * 30 * 24 * 60 * 60 * 1000));
        date = date.toGMTString();
        document.cookie = 'search_fix=' + val + '; expires=' + date + '; domain=.wikia.com; path=/';
        return val;
      },
      loc = (
        $('#WikiaRail #WikiaSearch').size() ? 0 : (
          $('#WikiHeader #WikiaSearch').size() ? 1 : (
            $('#WikiaArticle .WikiaSearch').size() ? 2 : (
              $('#WikiaPageHeader #WikiaSearch').size() ? 3 : 0
            )
          )
        )
      ),//0=rail, 1=recentchanges, 2=wikia "thing", 3=main page
      settings = get_cookie(),
      $wikia_search = $('form#WikiaSearch, form.WikiaSearch').first(),
      $original_search_button = $wikia_search.find('button.wikia-button:first'),
      $go_button = $original_search_button.clone(),
      $options_button = $original_search_button.clone().attr('type', 'button'),
      $search_text = $wikia_search.find('input[name="search"]'),
      go_button_arrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAQCAYAAAD52jQlAAAAAXNSR0IArs4c6QAAAFNJREFUOMtjYBgs4P///2fwyTNSYiAjI6MJVQwlxmBGagQBusGM1ApbZIMZqRlpMIMZiYlNUgAjI6MJEy2SHO28P2giiupJiuqJn5hsSpMChSYAAGM0M6CqfzSlAAAAAElFTkSuQmCC',
      options_button_dots = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAAXNSR0IArs4c6QAAAB5JREFUKM9jYBgFo2CkgP///5/5////GWL5THR3IQCrQha54XKThQAAAABJRU5ErkJggg==';
    if ($wikia_search.size() < 1) { return; }
 
    // Buttons
    $original_search_button.after($options_button).before($go_button);
    $go_button.add($options_button).find('img')
      .removeClass('sprite search')
      .attr('alt', function (i) { return ['Go', 'Options'][i]; })
      .attr('src', function (i) { return [go_button_arrow, options_button_dots][i]; })
      .add($original_search_button.find('img'))
      .height(16).width(function (i) { return [21, 21, 10][i]; })
      .parent().css('margin', '0px 1px');
    $go_button.css('right', '+=' + ($original_search_button.outerWidth(true) + $options_button.outerWidth(true)));
    $original_search_button.css('right', '+=' + $options_button.outerWidth(true));
    $search_text.css('margin-right', '-=6')
      .width($search_text.width() - ($original_search_button.outerWidth(true)));
 
    if (settings & 1) {
        $go_button.show();
        $original_search_button.hide();
    }
    else {
        $original_search_button.show();
        $go_button.hide();
    }

    // Remove Autocomplete
    $(document).ready(function () { if (settings & 4) { $.loadJQueryAutocomplete = function () { }; } });

    // Button click events
    $go_button.click(function () {
      $wikia_search.attr('target', get_cookie() & 2 ? '_blank' : '_self');
      $wikia_search.find('input[name="fulltext"], input[name="go"]').remove();
      $wikia_search.append($('<input />', {'type': 'hidden', 'name': 'go', 'value': 'Go'}));
      $wikia_search.submit();
      return false;
    });
    $original_search_button.click(function () {
      $wikia_search.attr('target', get_cookie() & 2 ? '_blank' : '_self');
      $wikia_search.find('input[name="fulltext"], input[name="go"]').remove();
      $wikia_search.append($('<input />', {'type': 'hidden', 'name': 'fulltext', 'value': 'Search'}));
      $wikia_search.submit();
      return false;
    });
    $options_button.click(function () {
      var check_settings = function (name, num) {
        if (settings & num) { $('#search_fix_opt_' + name).attr('checked', 'checked'); }
        else { $('#search_fix_opt_' + name).removeAttr('checked'); }
      };
      if ($('#search_fix_options').size() < 1) {
        $wikia_search.after(
          $('<section />', {'id': 'search_fix_options'})
            .css({
              'background': 'cornsilk',
              'border': '1px solid #E5CDBE',
              'box-shadow': '0px 2px 5px 0px #FFEC9F',
              '-moz-box-shadow': '0px 2px 5px 0px #ffec9f',
              '-webkit-box-shadow': '0px 2px 5px 0px #FFEC9F',
              'display': 'none',
              'line-height': '1.5em',
              'margin-bottom': '10px',
              'max-width': '282px',
              'padding': '8px',
              'position': (loc === 0 ? 'relative' : 'absolute'),
              'right': (loc === 0 ? 0 : 10) + 'px',
              'top': (loc === 1 ? 83 : (loc === 3 ? 38 : (loc === 2 ? 85 : 0))) + 'px'
            })
            .append(
              $('<label>What to use when you press Enter:</label>'),
              $('<br />'),
              $('<input />', {'type': 'radio', 'id': 'search_fix_opt_search', 'value': '0', 'name': 'search_fix_default_button', 'checked': 'checked'}),
              $('<label>Search</label>'),
              $('<br />'),
              $('<input />', {'type': 'radio', 'id': 'search_fix_opt_go',  'value': '1', 'name': 'search_fix_default_button'}),
              $('<label>Go</label>'),
              $('<br />'),
              $('<br />'),
              $('<input />', {'type': 'checkbox', 'value': '1', 'id': 'search_fix_opt_new_window', 'name': 'search_fix_new_window'}),
              $('<label>Open all searches in a new window</label>'),
              $('<br />'),
              $('<input />', {'type': 'checkbox', 'value': '1', 'id': 'search_fix_opt_acomplete', 'name': 'search_fix_acomplete'}),
              $('<label>Disable wikia autocomplete (for future pages)</label>'),
              $('<button />', {'id': 'search_fix_options_save', 'value': '1', 'name': 'search_fix_new_window'})
                .text('Save')
                .css({'top': '30%', 'right': '18px', 'position': 'absolute'})
                .click(function () {
                  settings = set_cookie(
                    parseInt($('#search_fix_options input[name="search_fix_default_button"]:checked').val(), 10) +
                      ($('#search_fix_opt_new_window').is(':checked') ? 2 : 0) +
                      ($('#search_fix_opt_acomplete').is(':checked') ? 4 : 0)
                  );
                  $('#search_fix_options').slideUp('fast');
                  if (settings & 1) {
                      $go_button.show();
                      $original_search_button.hide();
                  }
                  else {
                      $original_search_button.show();
                      $go_button.hide();
                  }
                })
            )
        );
      }
      settings = get_cookie();
      $('#' + (settings & 1 ? 'search_fix_opt_go' : 'search_fix_opt_search')).click();
      check_settings('new_window', 2);
      check_settings('acomplete', 4);
      check_settings('cat', 8);
 
      $('#search_fix_options').slideToggle('fast');
      return false;
    });
  },
  jq_wait = function jq_wait() {
    if (typeof window.jQuery === 'undefined') { setTimeout(jq_wait, 100); }
    else { $(document).ready(jq_go); }
  };
  jq_wait();
}());
/*</pre>*/