// Global Nav Buttons
// @author:Jr Mime

$(function () {
  glnbutt = {};
 
  glnbutt.init = function () {
    if (window.globalNavButtons) {
      if ($(".wds-global-navigation__links").length === 0) {
        $('.wds-global-navigation__content-bar-left').append($('<div>').addClass('wds-global-navigation__links'));
      }
      $(".wds-global-navigation__links").empty();
      $.each(window.globalNavButtons, function(i) {
        if (!window.globalNavButtons[i].isMain && !window.globalNavButtons[i].whoIsMain) {
          $(".wds-global-navigation__links").append("<a href='" + window.globalNavButtons[i].url + "' class='wds-global-navigation__link' id='custom-global-nav-button-" + window.globalNavButtons[i].shortName + "'>" + window.globalNavButtons[i].text + "</a>");
        } else if (window.globalNavButtons[i].isMain) {
          $(".wds-global-navigation__links").append(
            '<div class="wds-dropdown wds-global-navigation__link-group wds-has-dark-shadow">' +
              '<div class="wds-dropdown__toggle wds-global-navigation__dropdown-toggle wds-global-navigation__link">' +
              '<span id="custom-global-nav-button-href-' + window.globalNavButtons[i].shortName + '">' + window.globalNavButtons[i].text + '</span>' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny">' +
                '<path d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z" fill-rule="evenodd">' +
                '</path>' +
              '</svg>' +
            '</div>' +
             '<div class="wds-dropdown__content wds-global-navigation__dropdown-content">' +
              '<ul class="wds-list wds-is-linked" id="custom-global-nav-button-lbl-' + window.globalNavButtons[i].shortName + '">' +
                // Items here
              '</ul>' +
             '</div>'
          )
          if (window.globalNavButtons[i].url) document.getElementById("custom-global-nav-button-href-" + window.globalNavButtons[i].shortName).innerHTML = '<a style="color: inherit;" href="' + window.globalNavButtons[i].url + '">' + window.globalNavButtons[i].text + '</a>';
        } else if (!window.globalNavButtons[i].isMain && window.globalNavButtons[i].whoIsMain) {
          $("#custom-global-nav-button-lbl-" + window.globalNavButtons[i].whoIsMain).append(
            '<li>'+
              '<a href="' + window.globalNavButtons[i].url + '">' + window.globalNavButtons[i].text + '</a>' +
            '</li>'
          )
        }
        i++;
      });
    }
  };

  glnbutt.init();
});