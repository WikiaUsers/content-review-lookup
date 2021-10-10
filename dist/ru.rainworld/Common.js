//Код для замены имени участника.
$(function () {
	if (
		(typeof disableUsernameReplace != "undefined" && disableUsernameReplace) ||
		wgUserName === null
	)
		return;
	$("span.insertusername").html(wgUserName);
});

//Добавление обложки для страниц Клен и Лиса
$(function () {
	var class_value = $(document.body)[0].classList.value;

	if (class_value.indexOf("Klen_s_flame") != -1) {
		$(document.body).addClass("page-Klen_s_flame");
	}

	if (class_value.indexOf("Foxengton") != -1) {
		$(document.body).addClass("page-Foxengton");
	}
});

$(function () {
	var buttons = document.getElementsByClassName("button-toggle");
	for (i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.innerHTML = "Показать";

		if (button.children)
			for (k = 0; k < button.children.length; k++)
				button.children[k].style = "pointer-events: none;";

		var toogle = document.getElementById(button.id + "-toggle");
		toogle.classList.add("display-none");

		toogle.id = button.id + i + "-toggle";
		button.id = button.id + i;
	}
});

//Отображение/скрытие элементов
$(".button-toggle").click(function () {
	var id = document.getElementById(this.id);
	var toggle = document.getElementById(this.id + "-toggle");

	if (toggle.classList.contains("display-none")) {
		id.innerHTML = "Скрыть";
		toggle.classList.remove("display-none");
	} else {
		id.innerHTML = "Показать";
		toggle.classList.add("display-none");
	}
});

//Переключение элементов
$(function () {
	tabbers = document.getElementsByClassName("rw-tabber");
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
			var tabber_button = tabber_buttons[j];
			var tabber_tab = tabber_tabs[j];

			var button_id = tabber + "-" + j;
			var tab_id = button_id + "-tab";

			tabber_button.classList.add("button-tabber");
			tabber_button.id = button_id;
			tabber_button.tabber = tabber;

			tabber_tab.id = tab_id;

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
});

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