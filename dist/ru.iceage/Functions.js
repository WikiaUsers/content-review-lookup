/* <pre style="overflow: scroll; height: 25em"><nowiki> */

/*
    Функции, в данный момент функция
*/


/*
    Замена в шаблоне {{УЧАСТНИК}} на имя участника просматривающего страницу
    Requires copying Шаблон:УЧАСТНИК взято из Вукипедии
*/
function substUsername() {
	$('.insertusername').html(wgUserName);
}


/* </nowiki></pre> */