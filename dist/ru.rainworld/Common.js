importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
var ajaxPages = ["Special:Watchlist", "Special:Contributions", "Special:WikiActivity", "Special:RecentChanges", "Служебная:Watchlist", "Служебная:Contributions", "Служебная:WikiActivity", "Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление страницы';
var PurgeButtonText = 'Обновить';

//Код для замены имени участника. 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

//Добавление обложки для страниц Клен
$(document).ready(function () {
  classList = $(document.body)[0].classList.value;

  if (classList.indexOf("Klen_s_flame") != -1) {
    $(document.body).addClass("page-Klen_s_flame");
  }

  if (classList.indexOf("Foxengton") != -1) {
    $(document.body).addClass("page-Foxengton");
  }
});

//Отображение/скрытие элементов
$(document).ready(function () {
  buttons = $(".button-toggle");
  for (i = 0; i < buttons.length; i++) {
    button = buttons[i];
    $(button).text("Показать");

    if (button.children) {
      for (k = 0; k < button.children.length; k++) {
        $(button.children[k]).attr("style", "pointer-events: none;");
      }
    }

    $("#" + button.id + "-toggle").addClass("display-none");

    //Установка Id
    $("#" + button.id + "-toggle").attr("id", button.id + i + "-toggle");
    $(button).attr("id", button.id + i);
  }

  $(".button-toggle").click(function () {
    id = this.id;
    if ($("#" + id + "-toggle").hasClass("display-none")) {
      $("#" + id).text("Скрыть");
      $("#" + id + "-toggle").removeClass("display-none");
    } else {
      $("#" + id).text("Показать");
      $("#" + id + "-toggle").addClass("display-none");
    }
  });
});

//Переключение элементов
$(document).ready(function () {
  tabbers = $(".rw-tabber");
  for (i = 0; i < tabbers.length; i++) {
    tabber = tabbers[i].id;

    $("#" + tabber + "-buttons").attr("id", tabber + i + "-buttons");
    $("#" + tabber + "-tabs").attr("id", tabber + i + "-tabs");
    $("#" + tabber).attr("id", tabber + i);

    tabber = tabbers[i].id;

    console.log(tabber);

    tabber_buttons = document.getElementById(tabber + "-buttons").children;
    tabber_tabs = document.getElementById(tabber + "-tabs").children;

    for (j = 0; j < tabber_buttons.length; j++) {
      tabber_button = tabber_buttons[j];
      tabber_tab = tabber_tabs[j];

      button_id = tabber + "-" + j;
      tab_id = button_id + "-tab";

      $(tabber_button).addClass("button-tabber");
      $(tabber_button).attr("id", button_id);
      $(tabber_button).attr("tabber", tabber);

      $(tabber_tab).attr("id", tab_id);

      if (j === 0) {
        $(tabber_button).addClass("button-active");
      } else {
        $(tabber_tab).hide();
      }

      if (tabber_button.children) {
        for (k = 0; k < tabber_button.children.length; k++) {
          $(tabber_button.children[k]).attr("style", "pointer-events: none;");
        }
      }
    }
  }

  $(".button-tabber").click(function () {
    tab_id = this.id + "-tab";
    tabber_tabs = document.getElementById(
      $(this).attr("tabber") + "-tabs"
    ).children;

    $(".button-active[tabber=" + $(this).attr("tabber") + "]").removeClass(
      "button-active"
    );
    $(this).addClass("button-active");

    for (i = 0; i < tabber_tabs.length; i++) {
      tabber_tab = tabber_tabs[i];

      if (tabber_tab.id == tab_id) {
        $(tabber_tab).show();
      } else {
        $(tabber_tab).hide();
      }
    }
  });
});