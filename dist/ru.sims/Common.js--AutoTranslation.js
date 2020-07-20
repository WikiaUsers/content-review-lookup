/* Any JavaScript here will be loaded for all users on every page load. */

// Последнее обновление скрипта: 4 октября 2018 //
/* if ($( "body" ).hasClass( "page-The_Sims_Wiki:Перевод" )) {
    $("#WikiaMainContent").css("width","100%")
    $("#WikiaRailWrapper").css("display","none")
} */

if ($( "body" ).hasClass( "page-The_Sims_Wiki:Перевод" )) {
    $( "#WikiaArticle" ).prepend( '<div style="float: left; width: 50%;"><h1>Ввести код</h1><input id="name" cols="20" rows="1" placeholder="Имя"><input id="name_rod" placeholder="Имя (родительный падеж)"><input id="lastname" placeholder="Фамилия"></textarea><textarea id="input" cols="40" rows="10"></textarea><div class="buttons"><input name="button" type="submit" value="Отправить"></div></div><div style="float: left; width: 50%;"><h1>Вывод</h1><textarea id="output" cols="40" rows="10"></textarea><br><button class="cut-textarea" disable>Скопировать</button></div><div style="clear:both; margin:0; padding:0;"></div><strong>Версия: 5.2.0</strong>')

    // Функция перевода
    function f_trans(string, vc){
        var str_new;
        for (i = 0; i < vc.length; i++) {
            str_new = string.replace(vc[i][0], vc[i][1]);
            string = str_new;
        }
        return string;
    }
    
    // Функция поиска индекса
    function lfIndex(array, uvar){
    	for (i = 0; i < array.length; i++) {
    		if (array[i][0] == uvar) return i;
    	}
    	return array.length-1;
    }
    
    // Функция проверки, есть ли подстрока в строке
    function isNotNull(isstring, exp) {
    	if (isstring.match(exp) !== null) return true 
    	return false
    }
    
    // Словари (первый для симологии, второй - для инфобокса)
    var vocabulary = [
    // Языки
    ['English', 'Английский'], ['Brazilian Portuguese', 'Португальский (Бразилия)'], ['Chinese (Simplified)', 'Китайский (упрощённый)'], ['Chinese (Traditional)', 'Китайский (традиционный)'], ['Czech', 'Чешский'], ['Danish', 'Датский'], ['Dutch', 'Голландский'], ['European Portuguese', 'Португальский (Европа)'], ['Finnish', 'Финский'], ['French', 'Французский'], ['German', 'Немецкий'], ['Italian', 'Итальянский'], ['Japanese', 'Японский'], ['Korean', 'Корейский'], ['Norwegian', 'Норвежский'], ['Russian', 'Русский'], ['Polish', 'Польский'], ['Spanish', 'Испанский'], ['Swedish', 'Шведский'], ['Thai', 'Тайский'], [/Other Languages/i, 'На других языках'], 
    // Характер
    ['PersonalityTable', 'Характер'], ['Personality', 'Характер'], [/sign\s+=/, 'знак        ='], [/neat\s+=/, 'чистюля     ='], [/outgoing\s+=/, 'экстраверт  ='], [/active\s+=/, 'деятель     ='], [/playful\s+=/, 'вечное дитя ='], [/nice\s+=/, 'лапочка     ='], [/Aries/g, 'Овен'], [/Taurus/g, 'Телец'], [/Gemini/g, 'Близнецы'], [/Cancer/g, 'Рак'], [/Leo/g, 'Лев'], [/Virgo/g, 'Дева'], [/Libra/g, 'Весы'], [/Scorpio/g, 'Скорпион'], [/Sagittarius/g, 'Стрелец'], [/Capricorn/g, 'Козерог'], [/Aquarius/g, 'Водолей'], [/Pisces/g, 'Рыбы'], ['sign-mismatch', 'Знак-несоответствие'], ['Sign-mismatch', 'Знак-несоответствие'], 
    // Интересы
    ['Interests', 'Интересы'], ['InterestTable', 'Интересы'], [/environment\s*=/, 'экология     ='], [/food\s*=/, 'еда          ='], [/weather\s*=/, 'погода       ='], [/culture\s*=/, 'культура     ='], [/money\s*=/, 'финансы      ='], [/politics\s*=/, 'политика     ='], [/paranormal\s*=/, 'мистика      ='], [/health\s*=/, 'здоровье     ='], [/fashion\s*=/, 'мода         ='], [/travel\s*=/, 'путешествия  ='], [/crime\s*=/, 'преступность ='], [/sports\s*=/, 'спорт        ='], [/entertainment\s*=/, 'развлечения  ='], [/animals\s*=/, 'животные     ='], [/work\s*=/, 'работа       ='], [/school\s*=/, 'учеба        ='], [/toys\s*=/, 'игрушки      ='], [/scifi\s*=/, 'фантастика   ='], ['Language', 'Язык'],  
    // Навыки
    ['Skills', 'Навыки'], ['SkillTable3', 'Навыки TS4'], ['SkillTable2', 'Навыки TS3'], ['SkillTable', 'Навыки TS2'], [/!Image/g, '!Иконка'], ['!Name', '!Имя'], ['!Relationship level', '!Уровень отношений'], [/cooking( ){1,}=/, 'кулинария ='], [/mechanical( ){1,}=/, 'техника ='], [/charisma( ){1,}=/, 'обаяние ='], [/body( ){1,}=/, 'культура тела ='], [/logic( ){1,}=/, 'логика ='], [/creativity( ){1,}=/, 'творчество ='], [/cleaning( ){1,}=/, 'уборка ='], 
    // Разделы симологии
    ['Simology', 'Симология'], [/File:/g, 'Файл:'],['{{ncd}}', '{{пбх}}'], ['[[ReNuYu Porta-Chug]]', '[[Эликсир «Снова-здорово»]]'], ['Inventory', 'Багаж'], ['!Memory', '!Воспоминание'], ['!Value', '!Цена'], ['Memories=', 'Воспоминания='], ['!Item', '!Предмет'], ['Gallery', 'Галерея'], ['Relationship Level', 'Уровень отношений'], [/Acquaintance/g, 'Знакомый'], [/wikitable heading-blue/g, 'wikitable heading-blue first-center'], 
    // Знаки отличия
    ['Talent Badges=', 'Знаки отличия='], ['{{TalentbadgeTable', '{{Знаки отличия'], [/cosmetology\s+=/, 'стилист ='], [/fishing\s+=/, 'рыболов ='], [/flowerarranging\s+=/, 'флорист ='], [/gardening\s+=/, 'садовод ='], [/pottery\s+=/, 'гончар ='], [/register\s+=/, 'кассир ='], [/restocking\s+=/, 'кладовщик ='], [/robotics\s+=/, 'робототехника ='], [/sales\s+=/, 'продавец ='], [/sewing\s+=/, 'портной ='], [/toymaking\s+=/, 'кукольник ='], [/= bronze/g, '= бронзовый'], [/= silver/g, '= серебряный'], [/= gold/g, '= золотой'], ['Relationships=', 'Отношения='], ['Enthusiasm=', 'Увлечения='], ['{{HobbyTable', '{{Увлечения'], [/\n\|predestined\s+=\s[\w]+\n/, '\n'], [/\|artsandcrafts\s+=/, '|прикладное искусство ='], [/\|cuisine\s+=/, '|кухня ='], [/\|filmandliterature\s+=/, '|кино и литература ='], [/\|fitness\s+=/, '|фитнес ='], [/\|games\s+=/, '|игры ='], [/\|musicanddance\s+=/, '|музыка и танцы ='], [/\|nature\s+=/, '|природа ='], [/\|science\s+=/, '|наука ='], [/\|sports\s+=/, '|спорт ='], [/\|tinkering\s+=/, '|техника =']]
    
    var voc_infobox = [
    // Раздел "Статья"
    ['{{Era', '{{Статья'], ['TS2U', 'TS2У'], ['TS2NL', 'TS2НЖ'], ['TS2FT', 'TS2УВ'], [/TS2OFB/i, 'TS2Б'], ['TS2S', 'TS2ВГ'], ['TS2AL', 'TS2ПК'], 
    // Разделы инфобокса
    ['{{Sim', '{{Сим'], ['{{Infobox Sim', '{{Сим'], [/name\s+=/, 'имя ='], [/image\s+= \[\[File:/, 'изображение = '], [/caption\s+=/, 'биография ='], [/sex\s+= Male/, 'пол = Мужской'], [/sex\s+= Female/, 'пол = Женский'], [/game\s+=/, 'игра ='], [/age\s+=/, 'возраст ='], [/asp\s+=/, 'жизненная цель ='], [/sign\s+=/, 'знак ='], [/hair\s+=/, 'волосы ='], [/eye\s+=/, 'глаза ='], [/skin\s+=/, 'кожа ='], [/body\s+=/, 'телосложение ='], [/play\s+=/, 'статус ='], [/neighbor\s+=/, 'городок ='], [/family\s+=/, 'семья ='], [/parents()+=/, 'родители ='], [/spouse\s+=/, 'отношения ='], [/child\s+=/, 'дети ='], [/turnon1\s+=/, 'фетиш1 ='], [/turnon2\s+=/, 'фетиш2 ='], [/turnoff\s+=/, 'стоп-сигнал ='], [/household\s+=/, 'коммуна ='], [/roommates\s+=/, 'сожители ='], [/major\s+=/, 'факультет ='], [/year\s+=/, 'курс ='], [/want[ ]+=/, 'мечта ='], [/[\n\|]maritalstatus = [\w\s]*\n/, ''], [/\n\|grade\s+=\s[\w]+( )*\n/, '\n'], [/career\s+=/, 'карьера ='], [/careerlevel\s+=/, 'должность ='], [/school\s+=/, 'школа ='], [/state\s+=/, 'форма жизни ='], 
    // Жизненные цели
    ['= Grow Up', '= Взросление'], ['= Family', '= Семья'], ['= Pleasure', '= Удовольствия'], ['= Fortune', '= Богатство'], ['= Knowledge', '= Знания'], ['= Popularity', '= Популярность'], ['= Romance', '= Любовь'], ['= Power', '= Власть'],
    // Возраст
    ['= Child', '= Ребёнок'], ['= Young Adult', '= Молодость'], ['= Adult', '= Зрелость'], ['= Teen', '= Юность'], ['= Elder', '= Старость'], 
    // Знак зодиака
    [/Aries/g, 'Овен'], [/Taurus/g, 'Телец'], [/Gemini/g, 'Близнецы'], [/Cancer/g, 'Рак'], [/Leo/g, 'Лев'], [/Virgo/g, 'Дева'], [/Libra/g, 'Весы'], [/Scorpio/g, 'Скорпион'], [/Sagittarius/g, 'Стрелец'], [/Capricorn/g, 'Козерог'], [/Aquarius/g, 'Водолей'], [/Pisces/g, 'Рыбы'], 
    // Телосложение
    ['= Thin', '= Стройное'], ['= Fit', '= Подтянутое'], ['Fat', 'Полное'], 
    // Внешность
    [/Green/g, 'Зелёный'], ['= Black', '= Чёрный'], ['Blonde', 'Светлый'], ['Blond', 'Светлый'], ['волосы = Red', 'волосы = Рыжий'], ['глаза = Red', 'глаза = Красный'], ['глаза = Brown', 'глаза = Карий'], ['волосы = Brown', 'волосы = Каштановый'], ['= Dark Blue', '= Синий'], ['= Blue', '= Голубой'], ['= Light Blue', '= Голубой'], ['глаза = Grey', 'глаза = Серый'], ['волосы = Grey', 'волосы = Седой'], ['= Tan', '= Светло-загорелый'], [/Light/g, 'Светлый'], ['Medium', 'Загорелый'], ['= Dark', '= Тёмный'], ['а = Grey', 'а = Серый'], ['= Bald', '= Лысый'],
    // Мечта всей жизни
    ['Become Business Tycoon', 'Получить должность: акула бизнеса'], ['Become Mad Scientist', 'Получить должность: безумный учёный'], ['Become Education Minister', 'Достичь вершины карьеры: образование'], ['Become Chief of Staff', 'Получить должность: главный врач'], ['Become Celebrity Chef', 'Получить должность: знаменитый шеф-повар'], ['Become Criminal Mastermind', 'Получить должность: криминальный авторитет'], ['Become Hall of Famer', 'Получить должность: легенда спорта'], ['Become Captain Hero', 'Получить должность: супергерой'], ['Reach Golden Anniversary', 'Отметить золотую свадьбу'], ['Become Mayor', 'Получить должность: мэр'], ['Become Space Pirate', 'Получить должность: космический пират'], ['Become Media Magnate', 'получить должность: медиамагнат'], ['Become Rock God', 'получить должность: рок-звезда'], ['Ate 200 Grilled Cheese', 'съесть горячих бутербродов: 200'], ['Become City Planner', 'Стать градостроителем'], [/Marry Off 6 Сhildren/, 'Устроить брак 6 своих детей'], ['Become Prestidigitator', 'Стать иллюзионистом'], ['Become Mogul', 'Получить должность: великий могол'], ['Become Professional Party Guest', 'Получить должность: светский лев'], ['Have 6 Pets Reach the Top Career Level', 'Питомцы достигают вершины карьеры: 6'], ['Become World Class Ballet Dancer', 'Стать танцовщицей балета'], ['Become Head of SCIA', 'Стать шефом СимБР'], ['Have 6 Grandchildren', 'Завести 6 внуков'], ['Graduate 3 Children from College', 'Дать 3 детям высшее образование'], ['Have 20 Simultaneous Lovers', 'Завести 20 любовников'], ['Max 7 Skills', 'Число максимально развитых навыков — 7'], ['Have 20 Simultaneous Best Friends', 'Завести 20 близких друзей'], ['Earn §100,000', 'Накопить 100000§'], ['Become General', 'Получить должность: генерал'], ['WooHoo with 20 Different Sims', 'Заняться сексом с 20 разными персонажами'], ['Have 6 Children Abducted by Aliens', 'Дать пришельцам похитить 6 своих детей'], ['Become Cult Leader', 'Получить должность: духовный лидер'], ['Become Ecological Guru', 'Получить должность: светило экологии'], ['Become Icon', 'Получить должность: культовая фигура'], ['Become Visionary', 'Получить должность: признанный мэтр'], ['Become Icon', 'Получить должность: культовая фигура'], 
    // Вкусы
    ['= Blonde Hair', '= Светлые волосы'], ['= Creative', '= Творец'], ['= Black Hair', '= Черные волосы'], [/(1|2) = Athletic/, ' = Атлет'], ['= Brown Hair', '= Каштановые волосы'], ['= Cologne', '= Запах одеколона'], ['= Charismatic', '= Обаяшка'], ['= Custom Hair', '= Нестандартная прическа'], ['= Facial Hair', '= Растительность на лице'], ['= Fatness', '= Полнота'], ['= Fitness', '= Фигура'], ['= Formal Wear', '= Официальный костюм'], ['= Full Face Makeup', '= Раскрашенное лицо'], ['= Glasses', '= Очки'], ['= Good at Cleaning', '= Чистюля'], ['= Good At Cleaning', '= Чистюля'], ['= Great Cook', '= Кулинар'], ['= Grey Hair', '= Седые волосы'], ['= Hard Worker', '= Трудяга'], ['= Hats', '= Головные уборы'], ['= Jewelry', '= Украшения'], ['= Logical', '= Логик'], ['= Lycanthropy', '= Ликантропия'], ['= Makeup', '= Макияж'], ['= Mechanical', '= Техник'], ['= Plantsimism', '= Ростомания'], ['= Red Hair', '= Рыжие волосы'], ['= Robots', '= Роботы'], ['= Stink', '= Запах пота'], ['= Swim Wear', '= Купальный костюм'], ['= Underwear', '= Нижнее белье'], ['= Vampirism', '= Вампиризм'], ['= Witchiness', '= Колдовство'], ['= Zombiism', '= Зомбирование'],
    // Школа
    ['Public School', 'Общественная школа'], ['Private School', 'Частная школа'], 
    // Карьера
    ['Unemployed', 'Без работы'], ['Adventurer', 'Приключения'], ['Architecture', 'Архитектура'], ['Art', 'Художник'], ['Athletics', 'Спорт'], ['Business', 'Бизнес'], ['Criminal', 'Криминал'], ['Culinary', 'Кулинария'], ['Dance', 'Танцы'], ['Education', 'Образование'], ['Business', 'Работник'], ['Intelligence', 'Разведка'], ['Journalism', 'Журналистика'], ['Law Enforcement', 'Охрана'], ['Law', 'Правосудие'], ['Medicine', 'Медицина'], ['Military', 'Армия'], ['Music', 'Музыка'], ['Natural Scientist', 'Учёный-естественник'], ['Oceanography', 'Океанология'], ['Paranormal', 'Мистика'], ['Politics', 'Политика'], ['Retired', 'На пенсии'], ['Science', 'Наука'], ['Show Business', 'Бизнес'], ['Slacker', 'Тусовка'], ['Entertainment', 'Эстрада'], ['Gamer', 'Индустрия игр'], 
    // Специальность
    ['Drama', 'Актёрское мастерство'], ['Art', 'Искусствоведение'], ['Biology', 'Биология'], ['History', 'История'], ['Literature', 'Литература'], ['Mathematics', 'Математика'], ['Political Science', 'Политология'], ['Philosophy', 'Психология'], ['Physics', 'Физика'], ['Psychology', 'Философия'], ['Economics', 'Экономика'], ['Undeclared', 'Вольнослушатель'], ['Freshman', 'Первый курс'], 
    // Городок
    ['= Belladonna Cove', '= Бухта Беладонна'], ['= Pleasantview', '= Новосельск'], ['= Sim State University', '= ГСУ'], ['= La Fiesta Tech', '= Техуниверситет'], ['= Académie Le Tour', '= Академия Ля Тур'], ['= Bluewater Village', '= Торжок'], ['= Riverblossom Hills', '= Цветущие Холмы'], ['= Desiderata Valley', '= Долина Желаний'], ['= Four Corners', '= Пятый Угол'], ['= Bitville', '= Битниквилль'], ['= Mesa Flats', '= Плоскогород'], ['= Felicity Island', '= Остров Невезения'], ['= Four Corners (Free Play)', '= Пятый Угол (свободная игра)'], ['= Arbor Falls', '= Зеленогорск'], ['= Wanmami Island', '= Маммамиа'], ['= Veronaville', '= Верона'], ['= Downtown', '= Центр'], ['= Weather', '= Погода'], ['= Garden Height', '= Садовск'],
    // Игра
    ['The Sims Castaway Stories', 'The Sims Истории робинзонов'], ['Apartment Life', 'Переезд в квартиру'], ['Nightlife', 'Ночная жизнь'], ['Seasons', 'Времена года'], [": University", ': Университет'], ['FreeTime', 'Увлечения'], ['The Sims Life Stories', 'The Sims Житейские истории'], ['The Sims Pet Stories', 'The Sims Истории о питомцах'],
    // Остальное
    ['NPC', 'НИП'], ['Playable', 'Управляемый'], ['Townie', 'Горожанин'], ['Vampire', 'Вампир'], [/File:/g, 'Файл:'], ['{{Spouse', '{{Отношения'], ['{{Relative', '{{Родство'],  ['|250px]]', '']];
    
    // Вывод словаря (в виде "Оригинал": "Перевод")
    $('input[name="vocabulary_button"]').on("click",function(){
    	var vocabulary_output = '';
    	for (i = 0; i < voc_infobox.length; i++) {
    		vocabulary_output_new = i+1 + '. \"' + voc_infobox[i][0] + '\": \"' + voc_infobox[i][1] + '\"\n';
    		vocabulary_output = vocabulary_output + vocabulary_output_new;
    	}
    	document.getElementById("output").value = vocabulary_output;
    });
    
    $('input[name="vocabulary_true"]').on("click",function(){
    	var vocabulary_output = '';
    	for (i = 0; i < vocabulary.length; i++) {
    		vocabulary_output_new = i+1 + '. \"' + vocabulary[i][0] + '\": \"' + vocabulary[i][1] + '\"\n';
    		vocabulary_output = vocabulary_output + vocabulary_output_new;
    	}
    	document.getElementById("output").value = vocabulary_output;
    });
    
    // Дебагинг
    $('input[name="debaging"]').on("click",function(){
    	var val = $("#input").val();
    	var str = val.replace(/ = [^\n]+/ig, "").replace(/  |/ig, "").replace(/\n/g,"\n|-\n!\n").replace(/\|([а-яА-Яё ]+)/g, "|{{GetAspirationImage|$1|The Sims 4}} $1");
    
    	/*tmp = '[';
    	var ending = '';
    	for (i = 0; i < 25; i++){
    		ending = tmp + "['" + str[i].match(/=[^\n]+/).toString().replace(/\n|= /, "") + "', '" + str[i].match(/[а-яА-Яё\s]+=/).toString().replace(/\n| =/g,"") + "'], "
    		tmp = ending;
    	}*/
    
    	document.getElementById("output").value = str;
    
    });
    
    // Перевод 
    $('input[name="button"]').on("click",function(){
    	var ending = marr = alone = game_link = neighbour_link = fullname = npc_category = content = npc_status = play_link = simology = simology_translated = ifTownie = add_to_family = npc_walking = broken_face = ncd = start = plumbob = no_skills = str_skills = str_skills_full = game = asp_link = full_app = default_memories = npc_headmaster_string = random_name = simPE_info = ifRandom_major = secret_society = share_name = name_link = society_sim = pregnancy_token = pregnancy_token_child = want_removed = distinguish = ifFor = warning = full_game = "";
    	var n_state = "1";
    	var neat = outgoing = active = playful = nice = 0;
    	var npc_status_index = 42;
    	var sim = {
    		name: "ИМЯ",
    		surname: "ФАМИЛИЯ",
    		original_name: "ОРИГИНАЛЬНОЕ ИМЯ",
    		name_rod: "ИМЯ В РОД. ПАДЕЖЕ",
    		gender: "ПОЛ",
    		gender_rod: "ПОЛ В РОД. ПАДЕЖЕ",
    		gender_rod_n: "ПОЛ В РОД. ПАДЕЖЕ С 'Н'",
    		gender_tvor: "ПОЛ В ТВОРИТ. ПАДЕЖЕ",
    		zodiac: "НЕТ",
    		asp: "НЕТ",
    		age: "Зрелость",
    		hair: "Нет",
    		eyes: "Нет",
    		skin: "Нет"
    	};
    
    	sim.name = $('input[id="name"]').val().trim();
    	sim.name_rod = $('input[id="name_rod"]').val().trim();
    	sim.surname = $('input[id="lastname"]').val().trim();
    	fullname = sim.name + " " + sim.surname;
    	
    	var val = $("#input").val();
    	var str = val;
    
    	if (str.match(/Female/) == "Female") {
    		sim.gender = 'она';
    		sim.gender_rod = 'её';
    		sim.gender_rod_n = 'неё'; 
    		sim.gender_tvor = 'ней'; 
    		genderB = 'Она';
    		gender_rodB = 'Её';
    		ending = 'а';
    		marr = 'женится на ней';
    		alone = 'одна';
    		selectable = 'переключаемой';
    		end_full_gender = 'ой';
    	}
    	else {
    		sim.gender = 'он';
    		sim.gender_rod = 'его';
    		sim.gender_rod_n = 'него'; 
    		sim.gender_tvor = 'ним'; 
    		genderB = 'Он';
    		gender_rodB = 'Его';
    		ending = '';
    		marr = 'выйдет за него замуж';
    		alone = 'один';
    		selectable = 'переключаемым';		
    		end_full_gender = 'ым';	
    	}
    
    	var interests = [['environment', 'экология', 'экологии', 0], ['food', 'еда', 'еде', 0], ['weather', 'погода', 'погоде', 0], ['food', 'культура', 'культуре', 0], ['money', 'финансы', 'финансах', 0], ['politics', 'политика', 'политике', 0], ['paranormal', 'мистика', 'мистике', 0], ['health', 'здоровье', 'здоровье', 0], ['fashion', 'мода', 'моде', 0], ['travel', 'путешествия', 'путешествиях', 0], ['crime', 'преступность', 'преступности', 0], ['sports', 'спорт', 'спорте', 0], ['entertainment', 'развлечения', 'развлечениях', 0], ['animals', 'животные', 'животных', 0], ['work', 'работа', 'работе', 0], ['school', 'учеба', 'учебе', 0], ['toys', 'игрушки', 'играшках', 0], ['scifi', 'фантастика', 'фантастике', 0]];
    
    	if (isNotNull(str, /'''[\w\s\.]+'''/)) sim.original_name = str.match(/'''[\w\s\.]+'''/).toString().replace(/'''/g,"");
    
    	if(isNotNull(str, /major\s+=\s\w+/)) default_memories = 'Воспоминания=\n{|class="wikitable heading-blue"\n!Иконка\n!Воспоминание\n|-\n|class="pos"|[[Файл:Met -Sim-.png]]\n|[[Таинственный незнакомец]]: знакомство\n|-\n|class="pos"|[[Файл:Became Best Friends with -Sim-.png]]\n|Таинственный незнакомец — мой близкий друг\n|-\n|class="pos"|[[Файл:Had Very First Kiss with -Sim-.png]]\n|Таинственный незнакомец: мой первый поцелуй\n|-\n|class="pos"|[[Файл:Had Very First Kiss with -Sim-.png]]\n|Таинственный незнакомец: поцелуй\n|-\n|class="pos"|[[Файл:Went to College.png]]\n|Поступление в университет\n|-\n|class="pos"|[[Файл:Joined Greek House.png]]\n|Присоединение к коммуне\n|-\n|class="pos"|[[Файл:Moved In.png]]\n|Переезд\n|';
    	else default_memories = 'Воспоминания=\n{|class="wikitable heading-blue"\n!Иконка\n!Воспоминание\n|-\n|class="pos"|[[Файл:Met -Sim-.png]]\n|[[Таинственный незнакомец]]: знакомство\n|-\n|class="pos"|[[Файл:Became Best Friends with -Sim-.png]]\n|Таинственный незнакомец — мой близкий друг\n|-\n|class="pos"|[[Файл:Had Very First Kiss with -Sim-.png]]\n|Таинственный незнакомец: мой первый поцелуй\n|-\n|class="pos"|[[Файл:Had Very First Kiss with -Sim-.png]]\n|Таинственный незнакомец: поцелуй\n|';	
    
    	var zigns = [['овен', 'овна'], ['телец', 'тельца'], ['близнецы', 'близнецов'], ['рак', 'рака'], ['лев', 'льва'], ['дева', 'девы'], ['весы', 'весов'], ['скорпион', 'скорпиона'], ['стрелец', 'стрельца'], ['козерог', 'козерога'], ['водолей', 'водолея'], ['рыбы', 'рыб']];
    
    	var NPCs = [['bartenders', 'Бармен', 'барменов', 'Бармены', 'барменом'], ['burglars', 'Вор', 'воров', 'Воры', 'вором'], ['exterminators', 'Дезинсектор', 'дезинсекторов', 'Дезинсекторы', 'дезинсектором'], ['firefighters', 'Пожарный (НИП)', 'пожарных', 'Пожарные (НИП)', 'пожарным'], ['gardeners', 'Садовник', 'садовников', 'Садовники', 'садовником'], ['headmasters', 'Директор', 'директоров', 'Директора', 'директором'], ['maids', 'Уборщик', 'уборщиков', 'Уборщики', 'уборщиком'], ['evil mascots', 'Талисман', 'злых талисманов', 'Злые талисманы', 'злым талисманом'],  ['good mascots', 'Талисман', 'добрых талисманов', 'Добрые талисманы', 'добрым талисманом'], ['coaches', 'Тренер', 'тренеров', 'Тренеры', 'тренером'], ['DJs', 'Ди-джей', 'ди-джеев', 'Ди-джеи', 'ди-джеем'], ['gypsy matchmaker', 'Гадалка', 'гадалок', 'Гадалки', 'гадалкой'], ['nannies', 'Няня (НИП)', 'нянь', 'Няни', 'няней'], ['nannies', 'Няня (НИП)', 'нянь', 'Нани', 'няней'], ['police officers', 'Полиция', 'офицеров полиции', 'Офицеры полиции', 'офицером полиции'], ['repairmen', 'Мастер', 'мастеров', 'Мастера', 'мастером'], ['mail carriers', 'Почтальон', 'почтальонов', 'Почтальоны', 'почтальоном'], ['art professors', 'Профессор', 'профессоров искусствоведения', 'Профессора', 'профессором'], ['biology professors', 'Профессор', 'профессоров биологии', 'Профессора', 'профессором'], ['drama professors', 'Профессор',  'профессоров актёрского мастерства', 'Профессора', 'профессором'], ['economics professors', 'Профессор',  'профессоров экономики', 'Профессора', 'профессором'], ['history professors', 'Профессор',  'Профессоров истории', 'Профессора', 'профессором'], ['literature professors', 'Профессор', 'профессоров литературы', 'Профессора', 'профессором'], ['mathematics professors', 'Профессор',  'Профессоров математики', 'Профессора', 'профессором'], ['philosophy professors', 'Профессор',  'профессоров философии', 'Профессора', 'профессором'], ['physics professors', 'Профессор', 'профессоров физики', 'Профессора', 'профессором'], ['political science professors', 'Профессор',  'профессоров политологии', 'Профессора', 'профессором'], ['psychology professors', 'Профессор',  'профессоров философии', 'Профессора', 'профессором'], ['undeclared professors', 'Профессор',  'профессоров вольнослушателей', 'Профессора', 'профессором'], [/Sales-clerks/i, 'Кассир', 'кассиров', 'Кассиры', 'кассиром'], ['delivery people', 'Доставщик', 'доставщиков', 'Доставщики', 'доставщиком'], ['cafeteria chefs', 'Повар в кафетерии', 'поваров в кафетерии', 'Повара в кафетерии', 'поваром в кафетерии'], ['carpool drivers', 'Водитель', 'водителей', 'Водители', 'водителем'], ['newspaper deliverers', 'Разносчик газет', 'разносчиков газет', 'Разносчики газет', 'доставщиком газет'], ['paper deliverers', 'Разносчик газет', 'разносчиков газет', 'Разносчики газет', 'доставщиком газет'], ['pizza deliverers', 'Доставщик пиццы', 'доставщиков пиццы', 'Доставщики пиццы', 'доставщиком пиццы'], ['hostesses', 'Администратор', 'администраторов', 'Администраторы', 'администратором'], ['waitresses', 'Официант', 'официантов', 'Официанты', 'официантом'], ['chefs', 'Повар', 'поваров', 'Повара', 'поваром'], ['streakers', 'Бегун голышом', 'бегунов голышом', 'Бегуны голышом', 'бегуном голышом'], ['grand vampires', 'Великий вампир', 'великих вампиров', 'Великие вампиры', 'великим вампиром'], ['baristas', 'Бариста', 'барист', 'Баристы', 'баристой'], ['cheerleaders', 'Чирлидер', 'чирлидерш', 'Чирлидеры', 'чирлидером'],  ['chinese food deliverers', 'Доставщик китайской еды', 'доставщиков китайской еды', 'Доставщики китайской еды', 'доставщиком китайской еды'], ['НЕИЗВЕСТНО', 'НЕИЗВЕСТНО', 'НЕИЗВЕСТНО', 'НЕИЗВЕСТНО', 'НЕИЗВЕСТНО']];
    
    	var neighbourhoods = [['ГСУ', 'ГСУ', 'ГСУ'], ['Техуниверситет', 'Техуниверситете', 'Техуниверситета'], ['Академия Ля Тур', 'Академии Ля Тур', 'Академии Ля Тур'], ['Торжок', 'Торжке', 'Торжка'], ['Цветущие Холмы', 'Цветущих Холмах', 'Цветущих Холмов'], ['Долина Желаний', 'Долине Желаний', 'Долины Желаний'], ['Бухта Беладонна', 'Бухте Беладонна', 'Бухты Беладонна'], ['Верона', 'Вероне', 'Вероны'], ['Центр', 'Центре', 'Центра'], ['Новосельск', 'Новосельске', 'Новосельска'], ['Битниквилль', 'Битниквилле', 'Битниквилля'], ['Плоскогород', 'Плоскогороде', 'Плоскогорода'], ['Пятый Угол (свободная игра)', 'Пятом Угле в свободной игре', 'Пятого Угла (свободная игра)'], ['Зеленогорск', 'Зеленогорске', 'Зеленогорска'], ['Садовск', 'Садовске', 'Садовска'], ['Маммамиа', 'Маммамие', 'Мамммии'], ['Погода', 'Погода', 'Погода'], ['Остров Невезения', 'острове Невезения', 'острова Невезения'], ['НЕИЗВЕСТНО', 'НЕИЗВЕСТНО', 'НЕИЗВЕСТНО']];
    
    	var LS_careers = [['Эстрада', 'Индустрия развлечений'], ['Индустрия игр', 'Разработка игр']];
    
    	var skills = [[0, '|кулинария', '[[Кулинария (навык)|кулинарии]]'], [0, '|техника', '[[Техника|техники]]'], [0, '|уборка', '[[Уборка|уборки]]'], [0, '|культура тела', '[[Культура тела|культуры тела]]'], [0, '|логика', '[[Логика|логики]]'], [0, '|творчество', '[[Творчество (навык)|творчества]]'], [0, '|обаяние', '[[Обаяние|обаяния]]']];
    
    	var app_hair = [['чёрный', 'чёрные'], ['каштановый', 'каштановые'], ['светлый', 'светлые'], ['рыжий', 'рыжие'], ['седой', 'седые'], ['лысый', 'нет'], ['ЦВЕТ ВОЛОС НЕ НАЙДЕН', 'ЦВЕТ ВОЛОС']];
    	var app_eyes = [['чёрный', 'чёрные'], ['карий', 'карие'], ['синий', 'синие'], ['голубой', 'голубые'], ['зелёный', 'зелёные'], ['серый', 'серые'], ['красный', 'красные'], ['ЦВЕТ ГЛАЗ НЕ НАЙДЕН', 'ЦВЕТ ГЛАЗ']];
    	var app_skin = [['светлый', 'светлая'], ['светло-загорелый', 'светло-загорелая'], ['загорелый', 'загорелая'], ['тёмный', 'тёмная'], ['зелёный', 'зелёная'], ['серый', 'серая'], ['ЦВЕТ КОЖИ НЕ НАЙДЕН', 'ЦВЕТ КОЖИ']];
    
    	var society_name = [['Landgraab Society', 'им. Ландграаба'], ['LFT Society', 'ЛФТ'], ['Volauvent Society', 'Бешамель']];
    
    	// Переводит инфобокс
    	var infobox = infobox_translated = neighbourhood = 'НЕИЗВЕСТНО';
    	if (isNotNull(str, /{{Era[^ё]+}}[{{\w:,\s\.\(\)]+}}/g)) {
    		infobox = str.match(/{{Era[^ё]+}}[{{\w:,\s\.\(\)]+}}/g).toString().replace(/{{DEFAULTSORT:[\w\s,\.\(\)]+}}/,"{{DEFAULTSORT:"+ sim.surname + ", " + sim.name + "}}").replace(sim.original_name, sim.name + " " + sim.surname);
    		infobox_translated = f_trans(infobox, voc_infobox);
    	}
    
    	sim.name = sim.name.replace("Проф. ", "");
    
    	if (isNotNull(infobox_translated, /городок = [\sа-я-А-Яё\(\)\w]+(\n|}})/)) neighbourhood = infobox_translated.match(/городок = [\sа-я-А-Яё\(\)\w]+(\n|}})/).toString().replace("городок = ",'').replace(/}}/g,'').replace(/\n/g,'').replace(",",'').trim();
    
    	var ind_hair = app_hair.length-1;
    	var ind_eyes = app_eyes.length-1;
    	var ind_skin = app_skin.length-1;
    
    	if (isNotNull(infobox_translated, /волосы = [^\n]+/)) {
    		sim.hair = infobox_translated.match(/волосы = [^\n]+/).toString().replace("волосы = ",'').toLowerCase().trim();
    		ind_hair = lfIndex(app_hair, sim.hair);
    	}
    	if (isNotNull(infobox_translated, /глаза = [^\n]+/)) {
    		sim.eyes = infobox_translated.match(/глаза = [^\n]+/).toString().replace("глаза = ",'').toLowerCase().trim();
    		ind_eyes = lfIndex(app_eyes, sim.eyes);
    	}
    	if (isNotNull(infobox_translated, /кожа = [^\n]+/)) {
    		sim.skin = infobox_translated.match(/кожа = [^\n]+/).toString().replace("кожа = ",'').toLowerCase().trim();
    		ind_skin = lfIndex(app_skin, sim.skin);
    	}
    
    	if (sim.hair == "лысый") {
    		full_app = "Он лысый, у него " + app_eyes[ind_eyes][1] + " глаза и " + app_skin[ind_skin][1] + " кожа.";
    		if (genderB == "Она") full_app = "Она лысая, у неё " + sim.gender_rod_n + " " + app_eyes[ind_eyes][1] + " глаза и " + app_skin[ind_skin][1] + " кожа.";
    	} else full_app = "У " + sim.gender_rod_n + " " + app_hair[ind_hair][1] + " волосы, " + app_eyes[ind_eyes][1] + " глаза и " + app_skin[ind_skin][1] + " кожа.";
    
    	if (isNotNull(infobox_translated, /игра = [^\n]+/)) {
    		var full_game = infobox_translated.match(/игра = [^\n]+/).toString();
    		if (full_game.length == 17 ) {
    			game = full_game.replace("игра = ", "").trim();
    			game_link = "''[["+ game + "]]''";
    		} else if (isNotNull(full_game, /истории/i)) {
    			game = full_game.replace("игра = ",'').trim();
    			game_link = "«''[["+ game + "]]''»";
    		} else {
    			game = full_game.replace("игра = The Sims 2: ",'').trim();
    			game_link = "дополнения «''[[The Sims 2: " + game + "|"+ game + "]]''» к игре ''[[The Sims 2]]''";
    		}
    	}	
    
    	if (isNotNull(game, /истории/i)) infobox_translated = f_trans(infobox_translated, LS_careers); //Если из "Житейских историй", то обновляет перевод карьер.
    
    	var neighbourhoods = [['ГСУ', 'ГСУ', 'ГСУ'], ['Техуниверситет', 'Техуниверситете', 'Техуниверситета'], ['Академия Ля Тур', 'Академии Ля Тур', 'Академии Ля Тур'], ['Торжок', 'Торжке', 'Торжка'], ['Цветущие Холмы', 'Цветущих Холмах', 'Цветущих Холмов'], ['Долина Желаний', 'Долине Желаний', 'Долины Желаний'], ['Бухта Беладонна', 'Бухте Беладонна', 'Бухты Беладонна'], ['Верона', 'Вероне', 'Вероны'], ['Центр', 'Центре', 'Центра'], ['Новосельск', 'Новосельске', 'Новосельска'], ['Битниквилль', 'Битниквилле', 'Битниквилля'], ['Плоскогород', 'Плоскогороде', 'Плоскогорода'], ['Пятый Угол (свободная игра)', 'Пятом Угле в свободной игре', 'Пятого Угла (свободная игра)'], ['Зеленогорск', 'Зеленогорске', 'Зеленогорска'], ['Садовск', 'Садовске', 'Садовска'], ['Маммамиа', 'Маммамие', 'Мамммии'], ['Погода', 'Погода', 'Погода'], ['Магия', 'Магия', 'Магия'], ['Питомцы', 'Питомцы', 'Питомцы'], ['Остров Невезения', 'острове Невезения', 'острова Невезения'], ['НЕИЗВЕСТНО', 'НЕИЗВЕСТНО', 'НЕИЗВЕСТНО']];
    	
    	var neighbour_index = lfIndex(neighbourhoods, neighbourhood);
    	if (neighbour_index === lfIndex(neighbourhoods, "ГСУ")) neighbour_link = "[[ГСУ]]";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Техуниверситет")) neighbour_link = "[[Техуниверситет]]е";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Плоскогород")) neighbour_link = "[[Плоскогород]]е";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Зеленогорск")) neighbour_link = "[[Зеленогорск]]е";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Садовск")) neighbour_link = "[[Садовск]]е";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Центр")) neighbour_link = "[[Центр (The Sims 2)|Центре]]";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Погода")) neighbour_link = "секретном городке «[[Погода (городок)|Погода]]»";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Магия")) neighbour_link = "секретном городке «[[Магия (городок)|Магия]]»";
    	else if (neighbour_index == lfIndex(neighbourhoods, "Питомцы")) neighbour_link = "секретном городке «[[Питомцы (городок)|Питомцы]]»";
    	else if (neighbour_index >= 0) neighbour_link = "[[" + neighbourhood + "|" + neighbourhoods[neighbour_index][1] + "]]";
    
    	// Узнаёт знак зодиака, жизненную цель и возраст
    	if (isNotNull(infobox_translated, /знак = [^\n]+/)) sim.zodiac = infobox_translated.match(/знак = [^\n]+/).toString().replace('знак = ','').toLowerCase();
    
    	if (isNotNull(infobox_translated, /цель = [^\n]+/)) {
    		sim.asp = infobox_translated.match(/цель = [^\n]+/).toString().replace('цель = ','').toLowerCase();
    		if (sim.asp == "взросление") asp_link = "взросление";
    		else if (sim.asp == "богатство") asp_link = "богатство";
    		else if (sim.asp == "удовольствия") asp_link = "удовольствия";
    		else asp_link = sim.asp + " (The Sims 2)|" + sim.asp;
    	}
    
    	if (isNotNull(infobox_translated, /возраст = [^\n]+/)) sim.age = infobox_translated.match(/возраст = [^\n]+/).toString().replace('возраст = ','');
    
    	zodiac_array_number = lfIndex(zigns, sim.zodiac);
    	
    	if (isNotNull(str, /'''[^ё]+\n\n==[C|S|I|B|P|M]/)) content = str.match(/'''[^ё]+\n\n==[C|S|I|B|P|M]/).toString().replace(/\n\n==[C|S|I|B|R|P|M]/,"");
    
    	if (isNotNull(infobox_translated,"НИП")) {
    		if (isNotNull(content,"who resides in") && neighbourhood != "Верона" && neighbourhood != "Новосельск") {
    			npc_status_array = content.match(/(made [^ё]*NPC]] |made )([\w \[\]\|-]+)(who|that)/);
    			npc_status = npc_status_array[2].replace(/\[|\]/g,'').replace(/ $/, '');
    		} else {
    			npc_status_array = content.match(/(made [^ё]*NPC]] |made )([\w \[\]\|]+)(who|that|in)/);
    			npc_status = npc_status_array[2].replace(/\[|\]/g,'').replace(/ $/, '');
    		}
    
    		if (npc_status.indexOf("|") != -1) {
    			tmp_sts = npc_status;
    			npc_status = tmp_sts.replace(/[^ё]+\|/,"");
    		}
    
    		npc_status_index = lfIndex(NPCs, npc_status);
    
    		if (npc_status_index > 28) play_link = alone + " из " + NPCs[npc_status_index][2];
    		else {
    			if (NPCs[npc_status_index][1] == "Уборщик" && sim.gender == "она") play_link = " одна из [[Уборщик|горничных]]";
    			else play_link = alone + " из [[" + NPCs[npc_status_index][1] + "|" + NPCs[npc_status_index][2] + "]]";
    		}
    
    		if (isNotNull(content,"community")) npc_walking = "В дополнение к работе " + NPCs[npc_status_index][4] + ", " + sim.name + " может прогуливаться по общественным участкам. ";
    
    		if (NPCs[npc_status_index][1] == "Директор") npc_headmaster_string = "Его характер выбирается случайным образом во время загрузки городка. Указанный ниже характер лишь упомянут в игровых файлах. Такое происходит со всеми директорами в игре.";
    		
    		infobox_translated = infobox_translated.replace(/\n\|семья = [\w\sа-яё\-]*\n/i, '\n');
    		
    		npc_category = "[[Категория:"+NPCs[npc_status_index][3]+"]]";
    		n_state = "3";
    	} else if (isNotNull(infobox_translated,"Горожанин") || isNotNull(infobox_translated,"Горожанка")) {
    		play_link = "горожанин";
    		if (sim.gender == "она") {
    			play_link = "горожанка";
    			infobox_translated = infobox_translated.replace("Горожанин", "Горожанка");	
    		}
    		infobox_translated = infobox_translated.replace(/\n\|семья = [\w\sа-яё\-]*\n/i, '\n');
    		n_state = "2";
    		ifTownie = "Как и у большинства горожан в ''The Sims 2'', [[карьера]], [[навык]]и и отношения " + sim.name_rod + " с другими горожанами при старте игры выбираются случайно. ";
    	}
    
    	// Отделяет симологию от всего остального
    	if (isNotNull(str, /==Simology==[^ё]+/)) simology = str.match(/==Simology==[^ё]+/).toString();
    	if (isNotNull(str, /==Personality==[^ё]+/)) simology = str.match(/==Personality==[^ё]+/).toString();
    
    	// Находит черты личности Maxis
    	if (isNotNull(simology,/\d\sneat+/)) { // если задана одна, то и остальные будут заданы
    		neat = simology.match(/\d\sneat+/).toString().replace(' neat','');
    		outgoing = simology.match(/\d\soutgoing+/).toString().replace(' outgoing','');
    		active = simology.match(/\d\sactive+/).toString().replace(' active','');
    		playful = simology.match(/\d\splayful+/).toString().replace(' playful','');
    		nice = simology.match(/\d\snice+/).toString().replace(' nice','');		
    	}
    
    	var personality_array = [[0, 'чистюля', 'неряха'], [0, 'экстраверт', 'интроверт'], [0, 'деятель', 'созерцатель'], [0, 'вечное дитя', 'зануда'], [0, 'лапочка', 'зараза']];
    
    	if (isNotNull(simology,/neat\s+=\s\d/)) { // если задана одна, то и остальные будут заданы
    		personality_array[0][0] = parseInt(simology.match(/neat\s+=\s\d+/).toString().replace(/neat\s+=\s/i,''));
    		personality_array[1][0] = parseInt(simology.match(/outgoing\s+=\s\d+/).toString().replace(/outgoing\s+=\s/,''));
    		personality_array[2][0] = parseInt(simology.match(/active\s+=\s\d+/).toString().replace(/active\s+=\s/,''));
    		personality_array[3][0] = parseInt(simology.match(/playful\s+=\s\d+/).toString().replace(/playful\s+=\s/,''));
    		personality_array[4][0] = parseInt(simology.match(/nice\s+=\s\d+/).toString().replace(/nice\s+=\s/,''));		
    	}
    
    	personality = "Касательно [[характер]]а, " + sim.name + " ";
    	personality_big = "в большой степени ";
    	personaly_med = "в некоторой степени ";
    	personaly_low = ". При этом " + sim.gender + " ";
    	for (i = 0; i < 5; i++) {
    		if (personality_array[i][0] > 7) {
    			tmp = personality_big + personality_array[i][1] + ", ";
    			personality_big = tmp;
    		} else if (personality_array[i][0] > 4) {
    			tmp = personaly_med + personality_array[i][1] + ", ";
    			personaly_med = tmp;
    		}
    	}
    	if (personality_big == "в большой степени ") personality_big = "";
    	else personality_big = personality_big.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    	if (personaly_med == "в некоторой степени ") personaly_med = "";
    	else {
    		if (personality_big === "") personaly_med = personaly_med.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    		else personaly_med = " и " + personaly_med.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    	}
    	for (i = 0; i < 5; i++) {
    		if (personality_array[i][0] < 5) {
    			tmp = personaly_low + personality_array[i][2] + ", ";
    			personaly_low = tmp;
    		}
    	}
    	if (personaly_low == ". При этом ") personaly_low = "";
    	else personaly_low = personaly_low.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    
    	personality = personality + personality_big + personaly_med + personaly_low + ". ";
    
    	// Заполняет информацию об интересах
    	var find_interest_regex, replace_interest_regex;
    	for (i = 0; i < interests.length; i++) {			
    		find_interest_regex = new RegExp(interests[i][0] + "[ ]+= [^\n]+");
    		replace_interest_regex = new RegExp(interests[i][0] + "[ ]+= ");
    		if (isNotNull(simology, find_interest_regex)) {
    			interests[i][3] = parseInt(simology.match(find_interest_regex).toString().replace(replace_interest_regex, ''), 10);
    		}			
    	}
    	var content_interests = int_testing_1 = "";
    
    	if (interests[0][3] >= 8) {
    		content_interests = "Больше всего " + sim.name + " [[Интерес|любит]] поговорить об ";
    		int_testing_1 = "Больше всего " + sim.name + " [[Интерес|любит]] поговорить об ";
    	}
    	else {
    		content_interests = "Больше всего " + sim.name + " [[Интерес|любит]] поговорить о ";
    		int_testing_2 = "Больше всего " + sim.name + " [[Интерес|любит]] поговорить о ";
    	}
    
    	for (i = 0; i < interests.length; i++) {
    		if (interests[i][3] >= 8) {
    			tmp_cnt = content_interests + interests[i][2] + ", ";
    			content_interests = tmp_cnt;
    		}
    	}
    
    	if (content_interests === int_testing_1 || content_interests === int_testing_2) content_interests = '';
    	else {
    		tmp_cnt = content_interests;
    		content_interests = tmp_cnt.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1') + ". ";
    	}
    
    	if (isNotNull(content, society_name[0][0])) society_sim = society_name[0][1];
    	else if (isNotNull(content, society_name[1][0])) society_sim = society_name[1][1];
    	else if (isNotNull(content, society_name[2][0])) society_sim = society_name[2][1];
    
    	if (sim.age == "Ребёнок" || sim.age == "Юность") {
    		if (sim.age == "Юность") add_to_family = gender_rodB + " можно добавить в семью, подружившись и отправив в [[университет]]{{ВерсияИгры|TS2:У}}, отметив " + sim.gender_rod + " именины с другим [[Подросток|подростком]]{{ВерсияИгры|TS2:УВ}} и затем вступив с " + sim.gender_tvor + " в брак или предложив переехать.";
    		else add_to_family = gender_rodB + " можно добавить в семью, подружившись и отправив в [[университет]]{{ВерсияИгры|TS2:У}} либо отметив " + sim.gender_rod + " именины с другим [[Ребёнок|ребёнком]]{{ВерсияИгры|TS2:УВ}}.";
    		pregnancy_token_child = " в зрелости";
    	} else {
    		if (isNotNull(infobox_translated,"Горожанин") || isNotNull(infobox_translated,"Горожанка"))	{
    			if (isNotNull(infobox_translated, "Вольнослушатель")) {
    				add_to_family = genderB + " может присоединиться к семье, если игрок " + marr + " или подружится с " + sim.gender_tvor + " и предложит переехать. " + genderB + " учится на первом курсе на [[Специальность|факультете]] вольнослушателей.";
    				if (isNotNull(simology, /interests/i)) ifRandom_major = "Как и у большинства горожан из «''Университета''», " + sim.gender_rod + " [[навык]]и выбираются случайным образом при загрузке " + neighbourhoods[neighbour_index][2] + ". В игровых файлах лишь указано, что у " + sim.gender_rod_n + " нет ни навыков, ни факультета. ";
    				else ifRandom_major = gender_rodB + " [[навык]]и и [[интересы]] выбираются случайным образом при загрузке " + neighbourhoods[neighbour_index][2] + ". В игровых файлах лишь указано, что у " + sim.gender_rod_n + " нет ни навыков, ни интересов, ни факультета. ";
    				if (isNotNull(content, "pre-made members")) secret_society = sim.name + " также является членом [[Тайное общество|тайного общества " + society_sim + "]].";
    			}
    			else add_to_family = genderB + " может присоединиться к семье, если игрок " + marr + " или подружится с " + sim.gender_tvor + " и предложит переехать. " + genderB + " работает В ДОЛЖНОСТИ в карьере КАРЬЕРА.";
    			} else if (NPCs[npc_status_index][1] == "Водитель") {
    				add_to_family = "Как и всех водителей транспорта, " + sim.gender_rod + " нельзя добавить в семью без использования кодов.";
    			} else add_to_family = genderB + " может присоединиться к семье, если игрок " + marr + " или подружится с " + sim.gender_tvor + " и предложит переехать.";
    	}
    
    	if (isNotNull(content, /broken-face/gi)) broken_face = "\n{{Сломанное-лицо}}";
    	if (isNotNull(content, /ncd/gi)) ncd = "\n{{пбх}}";
    
    	if (game == "The Sims Истории робинзонов") {
    		if (sim.gender == "она") start = "местная жительница [[Остров Невезения|острова Невезения]]. ";
    		else start = "местный житель [[Остров Невезения|острова Невезения]]. ";
    		
    		no_skills = "Как и у большинства персонажей в «''The Sims Истории робинзонов''», у "+ sim.gender_rod_n + " не развито ни одного навыка. ";
    	} else {
    		if (play_link == "горожанин" || play_link == "горожанка") start = play_link + " в "+ neighbour_link + ", в городке из " + game_link + ". ";
    		else {
    			if (isNotNull(infobox_translated,"Проф.")) {
    				if (sim.gender == "он") start = play_link + " в "+ neighbour_link + ", в городке из " + game_link + " (его женский аналог — [[]]). ";
    				else start = play_link + " в "+ neighbour_link + ", в городке из " + game_link + " (её мужской аналог — [[]]). ";
    			} else start = play_link + " в "+ neighbour_link + ", в городке из " + game_link + " (остальные это [[]] и [[]]). ";
    		}			
    	}
    
    	if (isNotNull(content,/(\bplumbob\b|\bPlumbBob\b|Plum Bob)/i)) plumbob = "Иногда, после присоединения к семье, [[пламбоб]] " + sim.name_rod + " появляется внутри " + sim.gender_rod_n + " вместо того, чтобы парить над " + sim.gender_rod + " головой. Такое происходит и с некоторыми другими НИП в ''The Sims 2''.";
    
    	simology = f_trans(simology, vocabulary); // переводит симологию
    	simology_translated = simology.replace(/{{info[\w.|\s':\d,а-яА-Яё]+}}/g, "{{инфо|Генетический характер|Генетический характер " + sim.name_rod + " — это стандартный шаблон Maxis для " + zigns[zodiac_array_number][1] + ": " + neat + " чистюля, " + outgoing + " экстраверт, " + active + " деятель, " + playful + " вечное дитя, " + nice + " лапочка.}}").replace(/Воспоминания=[^}]+/,default_memories); //Ещё чуток переводит
    
    	// Считывает навыки
    
    	if (isNotNull(simology,/кулинария\s+=\s\d+/)) skills[0][0] = parseInt(simology.match(/кулинария\s+=\s\d+/).toString().replace(/кулинария\s+=\s/,''));
    	if (isNotNull(simology,/техника\s+=\s\d+/)) skills[1][0] = parseInt(simology.match(/техника\s+=\s\d+/).toString().replace(/техника\s+=\s/,''));
    	if (isNotNull(simology,/уборка\s+=\s\d+/)) skills[2][0] = parseInt(simology.match(/уборка\s+=\s\d+/).toString().replace(/уборка\s+=\s/,''));
    	if (isNotNull(simology,/культура тела\s+=\s\d+/)) skills[3][0] = parseInt(simology.match(/культура тела\s+=\s\d+/).toString().replace(/культура тела\s+=\s/,''));
    	if (isNotNull(simology,/логика\s+=\s\d+/)) skills[4][0] = parseInt(simology.match(/логика\s+=\s\d+/).toString().replace(/логика\s+=\s/,''));	
    	if (isNotNull(simology,/творчество\s+=\s\d+/)) skills[5][0] = parseInt(simology.match(/творчество\s+=\s\d+/).toString().replace(/творчество\s+=\s/,''));	
    	if (isNotNull(simology,/обаяние\s+=\s\d+/)) skills[6][0] = parseInt(simology.match(/обаяние\s+=\s\d+/).toString().replace(/обаяние\s+=\s/,''));	
    
    	skills_full = "освоил" + ending + " навык ";
    	skills_almost = "почти освоил" + ending + " навык ";
    	skills_adv = "стремится к освоению навыка ";
    	skills_half = "на полпути к освоению навыка ";
    	n_full = n_almost = n_adv = n_half = n_small = 0;
    
    	for (i = 0; i < skills.length; i++) {
    		if (skills[i][0] == 10) {
    			tmp = skills_full + skills[i][2] + ", ";
    			skills_full = tmp;
    			n_full += 1;
    		} else if (skills[i][0] >= 8) {
    			tmp = skills_almost + skills[i][2] + ", ";
    			skills_almost = tmp;
    			n_almost += 1;				
    		} else if (skills[i][0] >= 6) {
    			tmp = skills_adv + skills[i][2] + ", ";
    			skills_adv = tmp;
    			n_adv += 1;				
    		} else if (skills[i][0] == 5) {
    			tmp = skills_half + skills[i][2] + ", ";
    			skills_half = tmp;
    			n_half += 1;				
    		} else if (skills[i][0] < 5 && skills[i][0] > 0) n_small += 1;
    	}
    
    
    	if (n_full > 1) skills_full = skills_full.replace("навык","навыки");
    	else if (n_full === 0) skills_full = "";
    
    	if (n_almost > 1) skills_almost = skills_almost.replace("навык","навыки");
    	else if (n_almost === 0) skills_almost = "";
    
    	if (n_adv > 1) skills_adv = skills_adv.replace("навыка","навыков");
    	else if (n_adv === 0) skills_adv = "";
    
    	if (n_half > 1) skills_half = skills_half.replace("навыка","навыков");
    	else if (n_half === 0) skills_half = "";
    
    	skills_full = skills_full.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    	skills_almost = skills_almost.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    	skills_adv = skills_adv.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    	skills_half = skills_half.replace(/, ([^,]*)$/,'').replace(/, ([^,]*)$/,' и '+'$1');
    
    	if (n_full === 0 && n_almost === 0 && n_adv === 0 && n_half > 0) str_skills = skills_half + ".";
    	else if (n_full === 0 && n_almost === 0 && n_adv > 0 && n_half === 0) str_skills = skills_adv + ".";
    	else if (n_full === 0 && n_almost === 0 && n_adv > 0 && n_half > 0) str_skills = skills_adv + " и " + skills_half + ".";
    	else if (n_full === 0 && n_almost > 0 && n_adv === 0 && n_half === 0) str_skills = skills_almost + ".";
    	else if (n_full === 0 && n_almost > 0 && n_adv === 0 && n_half > 0) str_skills = skills_almost + " и " + skills_half + ".";
    	else if (n_full === 0 && n_almost > 0 && n_adv > 0 && n_half === 0) str_skills = skills_almost + " и " + skills_adv + ".";
    	else if (n_full === 0 && n_almost > 0 && n_adv > 0 && n_half > 0) str_skills = skills_almost + ", " + skills_adv + " и " + skills_half + ".";
    	else if (n_full > 0 && n_almost === 0 && n_adv === 0 && n_half === 0) str_skills = skills_full + ".";
    	else if (n_full > 0 && n_almost === 0 && n_adv === 0 && n_half > 0) str_skills = skills_full + " и " + skills_half + ".";
    	else if (n_full > 0 && n_almost === 0 && n_adv > 0 && n_half === 0) str_skills = skills_full + " и " + skills_adv + ".";
    	else if (n_full > 0 && n_almost === 0 && n_adv > 0 && n_half > 0) str_skills = skills_full + ", " + skills_adv + " и " + skills_half + ".";
    	else if (n_full > 0 && n_almost > 0 && n_adv === 0 && n_half === 0) str_skills = skills_full + " и " + skills_almost + ".";
    	else if (n_full > 0 && n_almost > 0 && n_adv === 0 && n_half > 0) str_skills = skills_full + ", " + skills_almost + " и " + skills_half + ".";
    	else if (n_full > 0 && n_almost > 0 && n_adv > 0 && n_half === 0) str_skills = skills_full + ", " + skills_almost + " и " + skills_adv + ".";
    	else if (n_full > 0 && n_almost > 0 && n_adv > 0 && n_half > 0) str_skills = skills_full + ", " + skills_almost + ", " + skills_adv + " и " + skills_half + ".";
    
    	if (str_skills === "") {
    		if (n_small == skills.length) str_skills_full = '';
    		else if (n_small > 0) str_skills_full = 'Касательно [[навык]]ов, у ' + sim.gender_rod_n + ' слабо развиты все навыки. ';
    		else str_skills_full = '';
    	} else {
    		if (n_small > 0) str_skills_full = "Касательно [[навык]]ов, " + sim.gender + " " + str_skills.replace(".","") + ', но у ' + sim.gender_rod_n + ' слабо развиты остальные навыки. ';
    		else str_skills_full = "Касательно [[навык]]ов, " + sim.gender + " " + str_skills + " ";			
    	}
    
    	if (isNotNull(content,"name is randomized")) random_name = gender_rodB + " имя выбирается случайно, когда генерируются файлы " + neighbourhoods[neighbour_index][2]+". Имя «"+fullname+"» лишь упоминается в игровых файлах. ";
    	else random_name = "";
    
    
    	if (isNotNull(content, /(SimPE|natural)/i)) {
    		if (isNotNull(infobox_translated, "Старость")) simPE_info = "SimDNA в [[SimPE]] показывает, что у " + sim.gender_rod_n + " был КАКОЙ-ТО цвет волос до того, как " + sim.gender + " поседел" + ending + ". ";
    		else simPE_info = "Несмотря на то, что у " + sim.gender_rod_n + " " + app_hair[ind_hair][1] + " волосы, SimDNA в [[SimPE]] показывает, что " + sim.gender_rod + " натуральный цвет волос — НЕИЗВЕСТНО. ";
    	}
    
    	if (isNotNull(content, "pregnancy")) pregnancy_token = "У " + sim.name_rod + " есть маркер беременности, из-за чего у " + sim.gender_rod_n + " повышен шанс рождения двойни" + pregnancy_token_child + ". ";
    
    	if (isNotNull(content, "share")) share_name = genderB + " является полн" + end_full_gender + " тёзкой [[горожанке]] из [[|]], также " + sim.gender + " разделяет фамилию с горожанином [[]] из того же городка. Однако нет никаких подтверждений, что они как-либо связаны. ";
    
    	if (isNotNull(str,/({{for|{{distinguish)/i) && neighbourhood != "Остров Невезения") name_link = "'''" + fullname + "''' (ориг. ''[[:en:" + sim.original_name + "|" + sim.original_name.replace(/\s\([\w\s]+\)/i,"") + "]]'') — ";
    	else name_link = "{{Язык|ориг=" + sim.original_name + "}} — ";
    
    	if (isNotNull(content, "was removed")) want_removed = sim.name + " имеет [[Мечта всей жизни (The Sims 2)|мечту всей жизни]], которая была удалена перед выходом дополнения. ";
    		
    	if (isNotNull(str,/{{distinguish/i))	distinguish = "{{Не путать|" + fullname + "|вар1=}}";
    	if (isNotNull(str,/{{for/i)) ifFor = "{{Чтобы|прочитать о тёзках этого персонажа|" + fullname + "}}";
    
    	if(isNotNull(content, /Do NOT attempt/i)) warning = "{{Внимание|Не пытайтесь добавить " + sim.name_rod + " в семью, делать " + sim.gender_rod + " " + selectable + " или связываться с " + sim.gender_tvor + " в любой форме. Это повредит файлы всего городка, в котором " + sim.gender + " находится.}}";
    
    	ct_1 = name_link + start + add_to_family + "\n\n";
    	ct_2 = gender_rodB + " [[знак зодиака]] — " + sim.zodiac + ", а [[Жизненная цель (The Sims 2)|жизненная цель]] — [[" + asp_link + "]]. " + content_interests + str_skills_full + no_skills + ifTownie + npc_headmaster_string + "\n\n";
    	ct_3 = personality + "У " + sim.gender_rod_n + " с [[|]] из [[]] идентичные структуры лица. " + full_app + "\n\n";
    	ct_4 = npc_walking + simPE_info + pregnancy_token + want_removed + plumbob + "\n\n";
    	ct_5 = ifRandom_major + random_name + share_name + secret_society + warning + broken_face + ncd;
    
    	if (ct_4 == "\n\n") ct_4 = "";
    	if (ct_5 === "") ct_5 = "";
    
    	// Стандартный шаблон текста между инфобоксом и симологией
    	var content_translated = ct_1 + ct_2 + ct_3 + ct_4 + ct_5;
    
    	// Объединяет переведённые части
    	dist = "}}"+ifFor+distinguish+"\n{{Сим";
    	translated_page = infobox_translated.replace("}}\n{{Сим",dist) + "\n" + content_translated.replace(", .",".") + "\n----\n" + content + "\n\n" + simology_translated.trim() + "\n[[en:"+sim.original_name+"]]\n{{Жители "+ neighbourhoods[neighbour_index][2] +"|state" + n_state + "=uncollapsed}}\n"+npc_category;
    	document.getElementById("output").value = translated_page; // Выводит перевод
    });
    
    var cutTextareaBtn = document.querySelector('.cut-textarea');
    
    cutTextareaBtn.addEventListener('click', function(event) {  
        var cutTextarea = document.querySelector('#output');
        cutTextarea.select();
        
    	try {  
    	var successful = document.execCommand('cut');  
    	document.getElementById('input').value='';
    	var msg = successful ? 'successful' : 'unsuccessful';  
    	console.log('Cutting text command was ' + msg);  
    	} catch(err) {  
    		console.log('Oops, unable to cut');  
    	}  
    });
}