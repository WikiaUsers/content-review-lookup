$(function(){
	function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	var urlfilm = "https://marvel.fandom.com/ru/wiki/Шаблон:Случайный_факт/Список .facts-Films .fact"+ getRandomInt(1, 2);
	var urlser = "https://marvel.fandom.com/ru/wiki/Шаблон:Случайный_факт/Список .facts-Serials .fact"+ getRandomInt(1, 2);
	var urlgames = "https://marvel.fandom.com/ru/wiki/Шаблон:Случайный_факт/Список .facts-Games .fact"+ getRandomInt(1, 2);
	var urlcom = "https://marvel.fandom.com/ru/wiki/Шаблон:Случайный_факт/Список .facts-Comics .fact"+ getRandomInt(1, 2);
	var urlper = "https://marvel.fandom.com/ru/wiki/Шаблон:Случайный_факт/Список .facts-Persons .fact"+ getRandomInt(1, 2);

$('#random-fact-Films').load(urlfilm);
$('#random-fact-Serials').load(urlser);
$('#random-fact-Games').load(urlgames);
$('#random-fact-Comics').load(urlcom);
$('#random-fact-Persons').load(urlper);
});