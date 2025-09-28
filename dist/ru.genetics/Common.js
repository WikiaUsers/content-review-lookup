window.AddRailModule = [
    { page: 'Template:RailModule1', prepend: true },
    'Template:RailModule2',
    'Template:RailModule3',
    'Template:RailModule4',
];
var wiki_name_number=Math.floor(Math.random() * 12);
	var wiki_name_text=["Генетика, химия и биохимия — неразрывные науки!", "Где была бы жизнь без ДНК!", "Генетика Вики", "От хромосомы до гена!", "Почему хоромосома похожа на бантик?", "Зачем нуклеосоме гистоны?", "Чем ДНК-маркер хуже гена!", "Кариотип, генотип, фенотип — важные аспекты генетики!", "С ума сошли генетики от ген и хромосом...", "Вирусы живые!", "Фенотипический признак — это основа?", 'Гены не врут!' ][wiki_name_number];
	var elements=document.getElementsByClassName('fandom-community-header__community-name');
	var wiki_name=elements[0];
	wiki_name.textContent=wiki_name_text;