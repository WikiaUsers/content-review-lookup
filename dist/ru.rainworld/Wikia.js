//Добавление обложки для страниц Клен
$(document).ready(function () {
  classList = $(document.body)[0].classList.value;

  if (classList.indexOf("Klen_s_flame") != -1) {
    $(document.body).addClass("page-Klen_s_flame");
  }
});

//Отображение/скрытие элементов
$(document).ready(function () {
  buttons = $(".button-toggle");
  for (let i = 0; i < buttons.length; i++) {
    button = buttons[i];
    $(button).text("Показать");
    $("#" + button.id + "-toggle").addClass("display-none");
  }
});

$(".button-toggle").click(function () {
  toggle(this.id);
});

function toggle(id) {
  if ($("#" + id + "-toggle").hasClass("display-none")) {
    $("#" + id).text("Скрыть");
    $("#" + id + "-toggle").removeClass("display-none");
  } else {
    $("#" + id).text("Показать");
    $("#" + id + "-toggle").addClass("display-none");
  }
}

//Переключение элементов
$(document).ready(function () {
  tabbers = $(".rw-tabber");
  for (let i = 0; i < tabbers.length; i++) {
    tabber = tabbers[i].id;
    tabber_buttons = document.getElementById(tabber + "-buttons").children;
    tabber_tabs = document.getElementById(tabber + "-tabs").children;

    for (let i = 0; i < tabber_buttons.length; i++) {
      const tabber_button = tabber_buttons[i];
      const tabber_tab = tabber_tabs[i];

      let button_id = tabber + "-" + i;
      let tab_id = button_id + "-tab";

      $(tabber_button).addClass("button-tabber");
      $(tabber_button).attr("id", button_id);
      $(tabber_button).attr(
        "onclick",
        "button_tabber_click('" + tabber + "','" + tab_id + "')"
      );

      $(tabber_tab).attr("id", tab_id);
      if (i > 0) $(tabber_tab).hide();

      if (tabber_button.children) {
        $(tabber_button.children[0]).attr("style", "pointer-events: none;");
      }
    }
  }
});

function button_tabber_click(tabber, tab_id) {
  tabber = document.getElementById(tabber + "-tabs");
  tabber_tabs = tabber.children;

  for (let i = 0; i < tabber_tabs.length; i++) {
    const tabber_tab = tabber_tabs[i];

    if (tabber_tab.id == tab_id) $(tabber_tab).show();
    else $(tabber_tab).hide();
  }
}