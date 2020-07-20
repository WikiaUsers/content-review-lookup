
if (resourcesCalcDiv = document.getElementById('resourcesCalc')) {
    //Список предметов
    itemList = {
        "GPS":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/72/GPS.png/30px-GPS.png',
            "Тип":'Оборудование',
            "Ресурсы": [{"item":"Полимер","quantity":5},
            {"item":"Электроника","quantity":20}]
        },
        "Арбалет":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/79/Crossbow.png/30px-Crossbow.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Металлический слиток","quantity":7},
            {"item":"Дерево","quantity":10},
            {"item":"Волокно","quantity":35}]
        },
        "Белый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/75/White_Coloring.png/30px-White_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Стимберри","quantity":15},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },
        "Бензин":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6e/Gasoline.png/30px-Gasoline.png',
            "Тип":'Разное',
            "Ресурсы": [{"item":"Кожа","quantity":5},
            {"item":"Нефть","quantity":3}]
        },
        "Боевой тартар":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/54/Battle_Tartare.png/30px-Battle_Tartare.png',
            "Тип":'Блюда',
            "Ресурсы": [{"item":"Сырое первосортное мясо","quantity":3},
            {"item":"Меджоберри","quantity":20},
            {"item":"Стимулятор","quantity":8},
            {"item":"Редкий цветок","quantity":2},
            {"item":"Лимон","quantity":1},
            {"item":"Кукуруза","quantity":1}]
        },
        "Большой капкан":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7c/Large_Bear_Trap.png/30px-Large_Bear_Trap.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Волокно","quantity":10},
            {"item":"Металлический слиток","quantity":6},
            {"item":"Кожа","quantity":15}]
        },
        "Большой грядка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ad/Large_Crop_Plot.png/30px-Large_Crop_Plot.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":80},
            {"item":"Солома","quantity":40},
            {"item":"Волокно","quantity":60},
            {"item":"Камень","quantity":100}]
        },
        "Бурдюк":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/63/Waterskin_%28Empty%29.png/30px-Waterskin_%28Empty%29.png',
            "Тип":'Инструменты',
            "Ресурсы": [{"item":"Кожа","quantity":4},
            {"item":"Волокно","quantity":12}]
        },
        "Бутылка для воды":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Water_Jar.png/30px-Water_Jar.png',
            "Тип":'Инструменты',
            "Ресурсы": [{"item":"Цемент","quantity":7},
            {"item":"Кожа","quantity":5},
            {"item":"Кристалл","quantity":2}]
        },
        "Вегетарианский суп":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d2/Calien_Soup.png/30px-Calien_Soup.png',
            "Тип":'Блюда',
            "Ресурсы": [{"item":"Лимон","quantity":5},
            {"item":"Тинтоберри","quantity":20},
            {"item":"Амарберри","quantity":20},
            {"item":"Меджоберри","quantity":10},
            {"item":"Стимулятор","quantity":2}]
        },
        "Верстак":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Smithy.png/30px-Smithy.png',
            "Тип":'Место для крафта',
            "Ресурсы": [{"item":"Металлический слиток","quantity":5},
            {"item":"Камень","quantity":50},
            {"item":"Дерево","quantity":30},
            {"item":"Кожа","quantity":20}]
        },
        "Вертикальный электрический кабель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d5/Vertical_Electrical_Cable.png/30px-Vertical_Electrical_Cable.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2}]
        },
        "Вяленое мясо":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/86/Cooked_Meat_Jerky.png/30px-Cooked_Meat_Jerky.png',
            "Тип":'Блюда',
            "Ресурсы": [{"item":"Жареное мясо","quantity":1},
            {"item":"Нефть","quantity":1},
            {"item":"Селитра","quantity":3}]
        },
        "Вяленое первосортное мясо":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/51/Prime_Meat_Jerky.png/30px-Prime_Meat_Jerky.png',
            "Тип":'Блюда',
            "Ресурсы": [{"item":"Жареное первосортное мясо","quantity":1},
            {"item":"Нефть","quantity":1},
            {"item":"Селитра","quantity":3}]
        },
        "Голубой краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b6/Cyan_Coloring.png/30px-Cyan_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":6},
			{"item":"Азулберри","quantity":12},
            {"item":"Селитра","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Глушитель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/43/Silencer.png/30px-Silencer.png',
            "Тип":'Оборудование',
            "Ресурсы": [{"item":"Металлический слиток","quantity":50},
            {"item":"Нефть","quantity":5},
            {"item":"Хитин или Кератин","quantity":20},
            {"item":"Кожа","quantity":10}]
        },
        "Граната":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fb/Grenade.png/30px-Grenade.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Волокно","quantity":15},
            {"item":"Камень","quantity":20},
            {"item":"Порох","quantity":30},
            {"item":"Кожа","quantity":5},
            {"item":"Металлический слиток","quantity":2},
            {"item":"Нефть","quantity":4}]
        },
        "Грязно-коричневый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4a/Mud_Coloring.png/30px-Mud_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":4},
			{"item":"Азулберри","quantity":1},
			{"item":"Тинтоберри","quantity":7},
			{"item":"Наркоберри","quantity":6},
            {"item":"Селитра","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Деревянная дверь":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2c/Wooden_Door.png/30px-Wooden_Door.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":20},
            {"item":"Солома","quantity":7},
            {"item":"Волокно","quantity":4}]
        },
        "Деревянная колонна":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/39/Wooden_Pillar.png/30px-Wooden_Pillar.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":40},
            {"item":"Солома","quantity":10},
            {"item":"Волокно","quantity":7}]
        },
        "Деревянная лестница":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c7/Wooden_Ladder.png/30px-Wooden_Ladder.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":4},
            {"item":"Солома","quantity":7},
            {"item":"Волокно","quantity":4}]
        },
        "Деревянная оконная рама":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0b/Wooden_Windowframe.png/30px-Wooden_Windowframe.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":36},
            {"item":"Солома","quantity":9},
            {"item":"Волокно","quantity":6}]
        },
        "Деревянная рама люка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9a/Wooden_Hatchframe.png/30px-Wooden_Hatchframe.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":50},
            {"item":"Солома","quantity":12},
            {"item":"Волокно","quantity":8}]
        },
        "Деревянная рампа":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f4/Wooden_Ramp.png/30px-Wooden_Ramp.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":60},
            {"item":"Солома","quantity":15},
            {"item":"Волокно","quantity":10}]
        },
        "Деревянная табличка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cb/Wooden_Wall_Sign.png/30px-Wooden_Wall_Sign.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":3},
            {"item":"Солома","quantity":2},
            {"item":"Волокно","quantity":2}]
        },
        "Деревянное окно":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/ca/Wooden_Window.png/30px-Wooden_Window.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":8},
            {"item":"Солома","quantity":2},
            {"item":"Волокно","quantity":1}]
        },
        "Деревянное основание для забора":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Wooden_Fence_Foundation.png/30px-Wooden_Fence_Foundation.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":10},
            {"item":"Солома","quantity":3},
            {"item":"Волокно","quantity":2}]
        },
        "Деревянное перекрытие":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cf/Wooden_Ceiling.png/30px-Wooden_Ceiling.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":60},
            {"item":"Солома","quantity":15},
            {"item":"Волокно","quantity":10}]
        },
        "Деревянное стена":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/08/Wooden_Wall.png/30px-Wooden_Wall.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":40},
            {"item":"Солома","quantity":10},
            {"item":"Волокно","quantity":7}]
        },
        "Деревянные шипы":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/00/Wooden_Spike_Wall.png/30px-Wooden_Spike_Wall.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":40},
            {"item":"Кожа","quantity":10},
            {"item":"Волокно","quantity":30}]
        },
        "Деревянный билборд":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/01/Wooden_Billboard.png/30px-Wooden_Billboard.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":60},
            {"item":"Солома","quantity":15},
            {"item":"Волокно","quantity":10}]
        },
        "Деревянный дверной проем":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8c/Wooden_Doorframe.png/30px-Wooden_Doorframe.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":30},
            {"item":"Солома","quantity":8},
            {"item":"Волокно","quantity":6}]
        },
        "Деревянный люк":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f1/Wooden_Trapdoor.png/30px-Wooden_Trapdoor.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":20},
            {"item":"Солома","quantity":7},
            {"item":"Волокно","quantity":4}]
        },
        "Деревянный мостик":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c3/Wooden_Catwalk.png/30px-Wooden_Catwalk.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":20},
            {"item":"Солома","quantity":7},
            {"item":"Волокно","quantity":4}]
        },
        "Деревянный указатель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/22/Wooden_Sign.png/30px-Wooden_Sign.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":5},
            {"item":"Солома","quantity":3},
            {"item":"Волокно","quantity":4}]
        },
        "Деревянный фундамент":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fb/Wooden_Foundation.png/30px-Wooden_Foundation.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":80},
            {"item":"Солома","quantity":20},
            {"item":"Волокно","quantity":15}]
        },
        "Детонатор для C4":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/85/C4_Remote_Detonator.png/30px-C4_Remote_Detonator.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Полимер","quantity":20},
            {"item":"Электроника","quantity":50},
            {"item":"Кристалл","quantity":10},
            {"item":"Металлический слиток","quantity":10},
            {"item":"Цемент","quantity":15}]
        },
        "Длинная винтовка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a2/Longneck_Rifle.png/30px-Longneck_Rifle.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Металлический слиток","quantity":95},
            {"item":"Дерево","quantity":20},
            {"item":"Кожа","quantity":25}]
        },
        "Дробовик":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/61/Shotgun.png/30px-Shotgun.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Металлический слиток","quantity":80},
            {"item":"Дерево","quantity":20},
            {"item":"Кожа","quantity":25}]
        },
        "Дынный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/50/Cantaloupe_Coloring.png/30px-Cantaloupe_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":7},
			{"item":"Тинтоберри","quantity":7},
			{"item":"Стимберри","quantity":4},
            {"item":"Селитра","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Желто-коричневый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ab/Tan_Coloring.png/30px-Tan_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":4},
            {"item":"Азулберри","quantity":1},
			{"item":"Тинтоберри","quantity":7},
			{"item":"Стимберри","quantity":6},
            {"item":"Порох","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Желтый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0c/Yellow_Coloring.png/30px-Yellow_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":15},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },
        "Заметка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cc/Note.png/30px-Note.png',
            "Тип":'Инструменты',
            "Ресурсы": [{"item":"Солома","quantity":3},
            {"item":"Волокно","quantity":1}]
        },
        "Заряд С4":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/46/C4_Charge.png/30px-C4_Charge.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Порох","quantity":75},
            {"item":"Кристалл","quantity":25},
            {"item":"Цемент","quantity":5},
            {"item":"Волокно","quantity":50},
            {"item":"Кожа","quantity":5},
            {"item":"Полимер","quantity":10},
            {"item":"Электроника","quantity":5}]
        },
        "Зеленый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c2/Green_Coloring.png/30px-Green_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":9},
            {"item":"Азулберри","quantity":9},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },
        "Каменная кирка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9a/Stonepick.png/30px-Stonepick.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Камень","quantity":1},
            {"item":"Дерево","quantity":1},
            {"item":"Солома","quantity":10}]
        },
        "Каменная колонна":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/60/Stone_Pillar.png/30px-Stone_Pillar.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":30},
            {"item":"Дерево","quantity":15},
            {"item":"Солома","quantity":10}]
        },
        "Каменная оконная рама":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2c/Stone_Windowframe.png/30px-Stone_Windowframe.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":35},
            {"item":"Дерево","quantity":18},
            {"item":"Солома","quantity":12}]
        },
        "Каменная рама":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6b/Stone_Dinosaur_Gateway.png/30px-Stone_Dinosaur_Gateway.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":140},
            {"item":"Дерево","quantity":70},
            {"item":"Солома","quantity":50}]
        },
        "Каменная рама для люка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ae/Stone_Hatchframe.png/30px-Stone_Hatchframe.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":50},
            {"item":"Дерево","quantity":25},
            {"item":"Солома","quantity":15}]
        },
        "Каменная стена":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1e/Stone_Wall.png/30px-Stone_Wall.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":40},
            {"item":"Дерево","quantity":20},
            {"item":"Солома","quantity":15}]
        },
        "Каменная стрела":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/28/Stone_Arrow.png/30px-Stone_Arrow.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Солома","quantity":2},
            {"item":"Волокно","quantity":2},
            {"item":"Кремень","quantity":1}]
        },
        "Каменная труба - Наклонная":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fc/Stone_Irrigation_Pipe_-_Inclined.png/30px-Stone_Irrigation_Pipe_-_Inclined.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":10}]
        },
        "Каменная труба - Разветвитель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/96/Stone_Irrigation_Pipe_-_Intersection.png/30px-Stone_Irrigation_Pipe_-_Intersection.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":15}]
        },
        "Каменная труба - Прямая":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/11/Stone_Irrigation_Pipe_-_Straight.png/30px-Stone_Irrigation_Pipe_-_Straight.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":5}]
        },
        "Каменная труба - Кран":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2b/Stone_Irrigation_Pipe_-_Tap.png/30px-Stone_Irrigation_Pipe_-_Tap.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":10},
            {"item":"Дерево","quantity":15}]
        },
        "Каменная труба - Вертикальная":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d7/Stone_Irrigation_Pipe_-_Vertical.png/30px-Stone_Irrigation_Pipe_-_Vertical.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":5}]
        },
        "Каменное основание для забора":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c0/Stone_Fence_Foundation.png/30px-Stone_Fence_Foundation.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":15},
            {"item":"Дерево","quantity":10},
            {"item":"Солома","quantity":10}]
        },
        "Каменное перекрытие":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Stone_Ceiling.png/30px-Stone_Ceiling.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":60},
            {"item":"Дерево","quantity":30},
            {"item":"Солома","quantity":20}]
        },
        "Каменный дверной проем":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/41/Stone_Doorframe.png/30px-Stone_Doorframe.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":30},
            {"item":"Дерево","quantity":16},
            {"item":"Солома","quantity":12}]
        },
        "Каменный топор":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d6/Stone_Hatchet.png/30px-Stone_Hatchet.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Солома","quantity":10},
            {"item":"Кремень","quantity":1},
            {"item":"Дерево","quantity":1}]
        },
        "Каменный фундамент":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f6/Stone_Foundation.png/30px-Stone_Foundation.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":80},
            {"item":"Дерево","quantity":40},
            {"item":"Солома","quantity":30}]
        },
        "Капкан":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Bear_Trap.png/30px-Bear_Trap.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Волокно","quantity":5},
            {"item":"Металлический слиток","quantity":3},
            {"item":"Кожа","quantity":6}]
        },
        "Кирпичный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/ff/Brick_Coloring.png/30px-Brick_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Тинтоберри","quantity":12},
			{"item":"Наркоберри","quantity":6},
            {"item":"Селитра","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Кислородный баллон":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2d/SCUBA_Top.png/30px-SCUBA_Top.png',
            "Тип":'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":20},
            {"item":"Волокно","quantity":8},
			{"item":"Металлический слиток","quantity":14},
            {"item":"Полимер","quantity":3}]
        },        
        "Кисть":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c4/Paintbrush.png/30px-Paintbrush.png',
            "Тип":'Инструменты',
            "Ресурсы": [{"item":"Дерево","quantity":1},
            {"item":"Кожа","quantity":3},
            {"item":"Солома","quantity":10}]
        },
        "Книжный шкаф":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f7/Bookshelf.png/30px-Bookshelf.png',
            "Тип":'Контейнеры',
            "Ресурсы": [{"item":"Дерево","quantity":100},
            {"item":"Солома","quantity":45},
            {"item":"Волокно","quantity":35}]
        },
        "Кожаная рубашка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Hide_Shirt.png/30px-Hide_Shirt.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":20},
            {"item":"Волокно","quantity":8}]
        },
        "Кожаная шапка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Hide_Hat.png/30px-Hide_Hat.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":15},
            {"item":"Волокно","quantity":6}]
        },
        "Кожаные ботинки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Hide_Boots.png/30px-Hide_Boots.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":12},
            {"item":"Волокно","quantity":5}]
        },
        "Кожаные перчатки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Hide_Gloves.png/30px-Hide_Gloves.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":10},
            {"item":"Волокно","quantity":4}]
        },
        "Кожаные штаны":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/44/Hide_Pants.png/30px-Hide_Pants.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":25},
            {"item":"Волокно","quantity":10}]
        },
        "Кожаный спальный мешок":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e8/Hide_Sleeping_Bag.png/30px-Hide_Sleeping_Bag.png',
            "Тип": 'Разное',
            "Ресурсы": [{"item":"Кожа","quantity":25},
            {"item":"Волокно","quantity":15}]
        },
        "Коллиматорный прицел":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/45/Holo-Scope.png/30px-Holo-Scope.png',
            "Тип":'Оборудование',
            "Ресурсы": [{"item":"Металлический слиток","quantity":40},
            {"item":"Кристалл","quantity":40},
            {"item":"Электроника","quantity":30}]
        },
        "Компас":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Compass.png/30px-Compass.png',
            "Тип":'Инструменты',
            "Ресурсы": [{"item":"Металл","quantity":5},
            {"item":"Кремень","quantity":5},
            {"item":"Волокно","quantity":30}]
        },
        "Композитный лук":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Compound_Bow.png/30px-Compound_Bow.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Полимер","quantity":95},
            {"item":"Металлический слиток","quantity":85},
            {"item":"Цемент","quantity":75}]
        },
        "Кондиционер":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/25/Air_Conditioner.png/30px-Air_Conditioner.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":80},
            {"item":"Электроника","quantity":15},
            {"item":"Полимер","quantity":5},
            {"item":"Кристалл","quantity":15}]
        },
        "Копье":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4f/Spear.png/30px-Spear.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Кремень","quantity":2},
            {"item":"Дерево","quantity":8},
            {"item":"Волокно","quantity":12}]
        },
        "Коричневый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/02/Brown_Coloring.png/30px-Brown_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":6},
            {"item":"Азулберри","quantity":3},
            {"item":"Тинтоберри","quantity":9},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },        
        "Королевский краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f6/Royalty_Coloring.png/30px-Royalty_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Азулберри","quantity":7},
            {"item":"Тинтоберри","quantity":7},
            {"item":"Наркоберри","quantity":4},
            {"item":"Порох","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Анкилозавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Анкилозавра","quantity":1},
            {"item":"Картофель","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Аранео)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Аранео","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },  
        "Корм (Яйцо Аргентависа)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Аргентависа","quantity":1},
            {"item":"Лимон","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Бронтозавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Бронтозавра","quantity":1},
            {"item":"Морковь","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Галлимима)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Галлимима","quantity":1},
            {"item":"Картофель","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Дилофозавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Дилофозавра","quantity":1},
            {"item":"Лимон","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Диметродона)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Диметродона","quantity":1},
            {"item":"Лимон","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Диморфодона)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Диморфодона","quantity":1},
            {"item":"Кукуруза","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Карбонемиса)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Карбонемиса","quantity":1},
            {"item":"Морковь","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Карнотавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Карнотавра","quantity":1},
            {"item":"Картофель","quantity":1},
            {"item":"Жареное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Кетцалькоатля)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Кетцалькоатля","quantity":1},
            {"item":"Морковь","quantity":3},
            {"item":"Вяленое первосортное мясо","quantity":3},
            {"item":"Меджоберри","quantity":100},
            {"item":"Волокно","quantity":120},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Паразавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Паразавра","quantity":1},
            {"item":"Кукуруза","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Пахицелофозавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Пахицелофозавра","quantity":1},
            {"item":"Лимон","quantity":1},
            {"item":"Жареное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Птеранодона)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Птеранодона","quantity":1},
            {"item":"Морковь","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Раптора)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Раптора","quantity":1},
            {"item":"Кукуруза","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Саркозуха)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Саркозуха","quantity":1},
            {"item":"Морковь","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Скорпиона)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Скорпиона","quantity":1},
            {"item":"Кукуруза","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Спинозавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Спинозавра","quantity":1},
            {"item":"Картофель","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Стегозавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Стегозавра","quantity":1},
            {"item":"Лимон","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Тираннозавра)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Тираннозавра","quantity":1},
            {"item":"Кукуруза","quantity":1},
            {"item":"Вяленое первосортное мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Титанобоа)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Титанобоа","quantity":1},
            {"item":"Кукуруза","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Трицератопса)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Трицератопса","quantity":1},
            {"item":"Картофель","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Корм (Яйцо Ужасной птицы)":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            "Тип":'Корма',
            "Ресурсы": [{"item":"Яйцо Ужасной птицы","quantity":1},
            {"item":"Лимон","quantity":1},
            {"item":"Вяленое мясо","quantity":1},
            {"item":"Меджоберри","quantity":2},
            {"item":"Волокно","quantity":3},
            {"item":"Вода","quantity":0.2}]
        },        
        "Кормушка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ec/Feeding_Trough.png/30px-Feeding_Trough.png',
            "Тип":'Контейнеры',
            "Ресурсы": [{"item":"Дерево","quantity":120},
            {"item":"Солома","quantity":60},
            {"item":"Волокно","quantity":40},
            {"item":"Металл","quantity":8}]
        },        
        "Костер":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/01/Campfire.png/30px-Campfire.png',
            "Тип":'Место для крафта',
            "Ресурсы": [{"item":"Солома","quantity":12},
            {"item":"Кремень","quantity":1},
            {"item":"Камень","quantity":16},
            {"item":"Дерево","quantity":2}]
        },        
        "Котелок":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f9/Cooking_Pot.png/30px-Cooking_Pot.png',
            "Тип":'Место для крафта',
            "Ресурсы": [{"item":"Камень","quantity":75},
            {"item":"Солома","quantity":15},
            {"item":"Дерево","quantity":10},
            {"item":"Кремень","quantity":5}]
        },        
        "Красный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d3/Red_Coloring.png/30px-Red_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Тинтоберри","quantity":15},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },        
        "Кремовый деликатес":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/12/Lazarus_Chowder.png/30px-Lazarus_Chowder.png',
            "Тип":'Блюда',
            "Ресурсы": [{"item":"Жареное мясо","quantity":9},
            {"item":"Картофель","quantity":5},
            {"item":"Кукуруза","quantity":5},
            {"item":"Меджоберри","quantity":10},
            {"item":"Наркотик","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },        
        "Лазерный прицел":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a1/Laser.png/30px-Laser.png',
            "Тип":'Оборудование',
            "Ресурсы": [{"item":"Металлический слиток","quantity":50},
            {"item":"Кристалл","quantity":60},
            {"item":"Электроника","quantity":40}]
        },        
        "Ласты":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/42/SCUBA_Flippers.png/30px-SCUBA_Flippers.png',
            "Тип":'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":12},
            {"item":"Волокно","quantity":5},
			{"item":"Хитин или Кератин","quantity":12},
            {"item":"Жемчуг","quantity":4}]
        },        
        "Лук":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/65/Bow.png/30px-Bow.png',
            "Тип":'Оружие',
            "Ресурсы": [{"item":"Дерево","quantity":15},
            {"item":"Волокно","quantity":50}]
        },        
        "Маленькая грядка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/59/Small_Crop_Plot.png/30px-Small_Crop_Plot.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":20},
            {"item":"Солома","quantity":10},
			{"item":"Волокно","quantity":15},
            {"item":"Камень","quantity":25}]
        },        
        "Мандариновый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Tangerine_Coloring.png/30px-Tangerine_Coloring.png',
            "Тип":'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":7},
            {"item":"Тинтоберри","quantity":7},
            {"item":"Наркоберри","quantity":4},
            {"item":"Порох","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },        
        "Маска для плавания":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/51/SCUBA_Mask.png/30px-SCUBA_Mask.png',
            "Тип":'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":15},
            {"item":"Волокно","quantity":6},
			{"item":"Хитин или Кератин","quantity":10},
            {"item":"Жемчуг","quantity":3}]
        },        
        "Металлический дверной проем":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/db/Metal_Doorframe.png/30px-Metal_Doorframe.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":" Металлический слиток","quantity":20},
            {"item":"Цемент","quantity":6}]
        },
        "Металлическая дверь":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Metal_Door.png/30px-Metal_Door.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":" Металлический слиток","quantity":10},
            {"item":"Цемент","quantity":4}]
        },
        "Металлическая кирка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9f/Metal_Pick.png/30px-Metal_Pick.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Металлический слиток","quantity":1},
			{"item":"Дерево","quantity":1},
			{"item":"Кожа","quantity":1}]
        },
        "Металлическая колонна":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d8/Metal_Pillar.png/30px-Metal_Pillar.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":" Металлический слиток","quantity":25},
            {"item":"Цемент","quantity":7}]
        },
        "Металлическая лестница":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5e/Metal_Ladder.png/30px-Metal_Ladder.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":7}]
        },
        "Металлическая оконная рама":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/68/Metal_Windowframe.png/30px-Metal_Windowframe.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":20},
			{"item":"Цемент","quantity":6}]
        },
        "Металлическая труба - Наклонная":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/19/Metal_Irrigation_Pipe_-_Inclined.png/30px-Metal_Irrigation_Pipe_-_Inclined.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":4},
             {"item":"Цемент","quantity":2}]
        },
        "Металлическая труба - Разветвитель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/77/Metal_Irrigation_Pipe_-_Intersection.png/30px-Metal_Irrigation_Pipe_-_Intersection.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":6},
             {"item":"Цемент","quantity":3}]
        },
        "Металлическая труба - Прямая":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f0/Metal_Irrigation_Pipe_-_Straight.png/30px-Metal_Irrigation_Pipe_-_Straight.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2},
             {"item":"Цемент","quantity":1}]
        },
        "Металлическая труба - Кран":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e4/Metal_Irrigation_Pipe_-_Tap.png/30px-Metal_Irrigation_Pipe_-_Tap.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":10},
            {"item":"Цемент","quantity":4},
            {"item":"Дерево","quantity":15}]
        },
        "Металлическая труба - Вертикальная":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d9/Metal_Irrigation_Pipe_-_Vertical.png/30px-Metal_Irrigation_Pipe_-_Vertical.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2},
             {"item":"Цемент","quantity":1}]
        },
        "Металлическая стена":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a9/Metal_Wall.png/30px-Metal_Wall.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":" Металлический слиток","quantity":25},
            {"item":"Цемент","quantity":7}]
        },
        "Металлическая стрела":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/12/Metal_Arrow.png/30px-Metal_Arrow.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Солома","quantity":3},
            {"item":"Волокно","quantity":3},
            {"item":" Металлический слиток","quantity":3},
            {"item":"Цемент","quantity":1},
            {"item":"Полимер","quantity":1}]
        },
        "Металлическая рама":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Metal_Dinosaur_Gateway.png/30px-Metal_Dinosaur_Gateway.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":" Металлический слиток","quantity":85},
            {"item":"Цемент","quantity":25}]
        },
        "Металлическая рама люка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e6/Metal_Hatchframe.png/30px-Metal_Hatchframe.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":" Металлический слиток","quantity":30},
            {"item":"Цемент","quantity":8}]
        },
        "Металлическая рампа":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/eb/Metal_Ramp.png/30px-Metal_Ramp.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":" Металлический слиток","quantity":35},
            {"item":"Цемент","quantity":10}]
        },
        "Металлический билборд":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/25/Metal_Billboard.png/30px-Metal_Billboard.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металл","quantity":35},
			{"item":"Цемент","quantity":10}]
        },
        "Металлический мостик":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/08/Metal_Catwalk.png/30px-Metal_Catwalk.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":15}]
        },
        "Металлический слиток":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/37/Metal_Ingot.png/30px-Metal_Ingot.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Металл","quantity":2}]
        },
        "Металлические ботинки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/77/Flak_Boots.png/30px-Flak_Boots.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Металлический слиток","quantity":8},
            {"item":"Кожа","quantity":6},
            {"item":"Волокно","quantity":4}]
        },
        "Металлические ворота":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/26/Metal_Dinosaur_Gate.png/30px-Metal_Dinosaur_Gate.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":35},
            {"item":"Цемент","quantity":10}]
        },
        "Металлические перчатки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f2/Flak_Gauntlets.png/30px-Flak_Gauntlets.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Металлический слиток","quantity":6},
            {"item":"Кожа","quantity":5},
            {"item":"Волокно","quantity":2}]
        },
        "Металлические шипы":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3a/Metal_Spike_Wall.png/30px-Metal_Spike_Wall.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":25},
            {"item":"Кожа","quantity":20},
            {"item":"Волокно","quantity":30}]
        },
        "Металлические штаны":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/07/Flak_Leggings.png/30px-Flak_Leggings.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Металлический слиток","quantity":16},
            {"item":"Кожа","quantity":12},
            {"item":"Волокно","quantity":5}]
        },
        "Металлический люк":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e9/Metal_Trapdoor.png/30px-Metal_Trapdoor.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":10},
             {"item":"Цемент","quantity":4}]
        },
        "Металлический нагрудник":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bf/Flak_Chestpiece.png/30px-Flak_Chestpiece.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Металлический слиток","quantity":13},
            {"item":"Кожа","quantity":10},
            {"item":"Волокно","quantity":4}]
        },
        "Металлический резервуар для воды":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cc/Metal_Water_Reservoir.png/30px-Metal_Water_Reservoir.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":75},
            {"item":"Цемент","quantity":25}]
        },
        "Металлический серп":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e0/Metal_Sickle.png/30px-Metal_Sickle.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Металлический слиток","quantity":18},
            {"item":"Дерево","quantity":4},
            {"item":"Кожа","quantity":16}]
        },
        "Металлический топор":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a6/Metal_Hatchet.png/30px-Metal_Hatchet.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Металлический слиток","quantity":8},
            {"item":"Дерево","quantity":1},
            {"item":"Кожа","quantity":10}]
        },
        "Металлический указатель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ad/Metal_Sign.png/30px-Metal_Sign.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":5},
             {"item":"Цемент","quantity":3}]
        },
        "Металлический фундамент":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/45/Metal_Foundation.png/30px-Metal_Foundation.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":50},
             {"item":"Цемент","quantity":15}]
        },
        "Металлический шлем":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ec/Flak_Helmet.png/30px-Flak_Helmet.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Металлический слиток","quantity":10},
            {"item":"Кожа","quantity":7},
            {"item":"Волокно","quantity":3}]
        },
        "Металлическое окно":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/11/Metal_Window.png/30px-Metal_Window.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":7}]
        },
        "Металлическое основание для забора":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3d/Metal_Fence_Foundation.png/30px-Metal_Fence_Foundation.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":5},
            {"item":"Цемент","quantity":2}]
        },
        "Металлическое перекрытие":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ac/Metal_Ceiling.png/30px-Metal_Ceiling.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":35},
            {"item":"Цемент","quantity":10}]
        },
        "Многополотное знамя":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7d/Multi-Panel_Flag.png/30px-Multi-Panel_Flag.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":10},
            {"item":"Волокно","quantity":100},
            {"item":"Кожа","quantity":20},
            {"item":"Солома","quantity":30}]
        },
        "Мясное рагу":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4d/Enduro_Stew.png/30px-Enduro_Stew.png',
            "Тип": 'Блюда',
            "Ресурсы": [{"item":"Жареное мясо","quantity":9},
            {"item":"Морковь","quantity":5},
            {"item":"Картофель","quantity":5},
            {"item":"Меджоберри","quantity":10},
            {"item":"Стимулятор","quantity":2},
            {"item":"Вода","quantity":1}]
        },
        "Наклонный электрический кабель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c3/Inclined_Electrical_Cable.png/30px-Inclined_Electrical_Cable.png',
            "Тип": 'Электричество',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2}]
        },
        "Наркотик":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e6/Narcotic.png/30px-Narcotic.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Наркоберри","quantity":5},
			{"item":"Протухшее мясо","quantity":1}]
        },
        "Натяжная наркотическая ловушка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ab/Tripwire_Narcotic_Trap.png/30px-Tripwire_Narcotic_Trap.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Наркотик","quantity":15},
			{"item":"Цемент","quantity":3},
			{"item":"Дерево","quantity":4},
			{"item":"Волокно","quantity":35},
			{"item":"Кожа","quantity":6},
			{"item":"Кристалл","quantity":1}]
        },
        "Натяжная сигнальная ловушка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d5/Tripwire_Alarm_Trap.png/30px-Tripwire_Alarm_Trap.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Металл","quantity":3},
			{"item":"Дерево","quantity":5},
			{"item":"Волокно","quantity":30},
			{"item":"Кожа","quantity":6},
			{"item":"Нефть","quantity":2}]
        },
        "Небесный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f7/Sky_Coloring.png/30px-Sky_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Азулберри","quantity":12},
            {"item":"Стимберри","quantity":6},
            {"item":"Порох","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Однополотное знамя":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/76/Flag.png/30px-Flag.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":10},
            {"item":"Волокно","quantity":100},
            {"item":"Кожа","quantity":20},
            {"item":"Солома","quantity":30}]
        },
        "Огромная каменная рама":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3b/Behemoth_Stone_Dinosaur_Gateway.png/30px-Behemoth_Stone_Dinosaur_Gateway.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":450},
            {"item":"Дерево","quantity":450},
            {"item":"Солома","quantity":450}]
        },
        "Огромная металлическая рама":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/49/Behemoth_Gateway.png/30px-Behemoth_Gateway.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":1500},
            {"item":"Цемент","quantity":450},
            {"item":"Полимер","quantity":450}]
        },
        "Огромные укрепленные ворота":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Behemoth_Reinforced_Dinosaur_Gate.png/30px-Behemoth_Reinforced_Dinosaur_Gate.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":450},
            {"item":"Дерево","quantity":450},
            {"item":"Солома","quantity":450}]
        },
        "Огромные металлически ворота":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/62/Behemoth_Gate.png/30px-Behemoth_Gate.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":1500},
            {"item":"Цемент","quantity":350}]
        },
        "Оливковый  краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b5/Olive_Coloring.png/30px-Olive_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":12},
            {"item":"Наркоберри","quantity":6},
            {"item":"Селитра","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Оранжевый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/74/Orange_Coloring.png/30px-Orange_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":9},
            {"item":"Тинтоберри","quantity":9},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },
        "Острый ягодный настой":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2e/Focal_Chili.png/30px-Focal_Chili.png',
            "Тип": 'Блюда',
            "Ресурсы": [{"item":"Жареное мясо","quantity":9},
            {"item":"Лимон","quantity":5},
            {"item":"Амарберри","quantity":20},
            {"item":"Азулберри","quantity":20},
            {"item":"Тинтоберри","quantity":20},
            {"item":"Меджоберри","quantity":10}]
        },
        "Парашют":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/86/Parachute.png/30px-Parachute.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Солома","quantity":40},
            {"item":"Волокно","quantity":20},
            {"item":"Кожа","quantity":10}]
        },
        "Патрон для дробовика":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/18/Simple_Shotgun_Ammo.png/30px-Simple_Shotgun_Ammo.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Простая пуля","quantity":1},
			{"item":"Металлический слиток","quantity":1},
            {"item":"Порох","quantity":3}]
        },
        "Пергаментный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0b/Parchement_Coloring.png/30px-Parchement_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":12},
            {"item":"Стимберри","quantity":6},
            {"item":"Порох","quantity":1},
			{"item":"Вода","quantity":0.2}]
        },
        "Пивная бочка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bd/Beer_Barrel.png/30px-Beer_Barrel.png',
            "Тип": 'Место для крафта',
            "Ресурсы": [{"item":"Дерево","quantity":500},
            {"item":"Металлический слиток","quantity":80},
            {"item":"Цемент","quantity":100}]
        },
        "Пика":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Pike.png/30px-Pike.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Металлический слиток","quantity":10},
            {"item":"Дерево","quantity":10},
            {"item":"Кожа","quantity":20}]
        },
        "Плавильная печь":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/98/Refining_Forge.png/30px-Refining_Forge.png',
            "Тип": 'Место для крафта',
            "Ресурсы": [{"item":"Камень","quantity":125},
            {"item":"Кремень","quantity":5},
            {"item":"Кожа","quantity":65},
            {"item":"Дерево","quantity":20},
            {"item":"Волокно","quantity":40}]
        },
        "Полимер":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/81/Polymer.png/30px-Polymer.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Обсидиан","quantity":2},
            {"item":"Цемент","quantity":2}]
        },        
        "Подствольный фонарик":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4d/Flashlight.png/30px-Flashlight.png',
            "Тип": 'Оборудование',
            "Ресурсы": [{"item":"Металлический слиток","quantity":40},
            {"item":"Кристалл","quantity":40},
            {"item":"Электроника","quantity":10}]
        },        
        "Подзорная труба":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c1/Spyglass.png/30px-Spyglass.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Дерево","quantity":5},
            {"item":"Кожа","quantity":10},
			{"item":"Волокно","quantity":10},
            {"item":"Кристалл","quantity":2}]
        },        
        "Помповое ружье":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a9/Pump-Action_Shotgun.png/30px-Pump-Action_Shotgun.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Металлический слиток","quantity":30},
            {"item":"Полимер","quantity":55},
			{"item":"Цемент","quantity":45}]
        },        
        "Порох":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ae/Gunpowder.png/30px-Gunpowder.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Селитра","quantity":1},
            {"item":"Уголь","quantity":1}]
        },        
        "Простая кровать":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b1/Simple_Bed.png/30px-Simple_Bed.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":15},
            {"item":"Солома","quantity":80},
            {"item":"Волокно","quantity":30},
            {"item":"Кожа","quantity":40}]
        },
        "Простая пуля":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/88/Simple_Bullet.png/30px-Simple_Bullet.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Металлический слиток","quantity":1},
            {"item":"Порох","quantity":6}]
        },
        "Прожаренный стейк":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/35/Shadow_Steak_Saute.png/30px-Shadow_Steak_Saute.png',
            "Тип": 'Блюда',
            "Ресурсы": [{"item":"Жареное первосортное мясо","quantity":3},
            {"item":"Наркотик","quantity":8},
            {"item":"Редкий гриб","quantity":2},
            {"item":"Картофель","quantity":1},
            {"item":"Морковь","quantity":1}]
        },
        "Промышленная плавильня":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c5/Industrial_Forge.png/30px-Industrial_Forge.png',
            "Тип": 'Место для крафта',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2500},
            {"item":"Кристалл","quantity":250},
            {"item":"Цемент","quantity":600},
            {"item":"Нефть","quantity":400},
            {"item":"Полимер","quantity":400}]
        },
        "Промышленный гриль":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/90/Industrial_Grill.png/30px-Industrial_Grill.png',
            "Тип": 'Место для крафта',
            "Ресурсы": [{"item":"Металлический слиток","quantity":200},
            {"item":"Кристалл","quantity":30},
            {"item":"Цемент","quantity":40},
            {"item":"Нефть","quantity":40}]
        },
        "Примитивный пистолет":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Simple_Pistol.png/30px-Simple_Pistol.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Металлический слиток","quantity":60},
            {"item":"Дерево","quantity":5},
			{"item":"Кожа","quantity":15}]
        },
        "Прямой электрический кабель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1d/Straight_Electrical_Cable.png/30px-Straight_Electrical_Cable.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2}]
        },
        "Пульт удаленного управления":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9b/Remote_Keypad.png/30px-Remote_Keypad.png',
            "Тип": 'Разное',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2},
            {"item":"Цемент","quantity":1},
			{"item":"Электроника","quantity":25}]
        },
        "Пуля простой винтовки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a0/Simple_Rifle_Ammo.png/30px-Simple_Rifle_Ammo.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2},
            {"item":"Порох","quantity":12}]
        },
        "Пурпурный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e2/Magenta_Coloring.png/30px-Magenta_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Азулберри","quantity":9},
            {"item":"Тинтоберри","quantity":9},
            {"item":"Селитра","quantity":1},
			{"item":"Вода","quantity":0.2}]
        },
        "Радио-маячок":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/59/Transponder_Node.png/30px-Transponder_Node.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Металлический слиток","quantity":3},
			{"item":"Цемент","quantity":12},
			{"item":"Электроника","quantity":14},
			{"item":"Полимер","quantity":10},
			{"item":"Кристалл","quantity":12}]
        },        
        "Радиолокатор":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/66/Transponder_Tracker.png/30px-Transponder_Tracker.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Металлический слиток","quantity":20},
			{"item":"Цемент","quantity":30},
			{"item":"Электроника","quantity":80},
			{"item":"Полимер","quantity":50},
			{"item":"Кристалл","quantity":25}]
        },        
        "Разветвитель электрических кабелей":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Electrical_Cable_Intersection.png/30px-Electrical_Cable_Intersection.png',
            "Тип": 'Электричество',
            "Ресурсы": [{"item":"Металлический слиток","quantity":2}]
        },        
        "Ракетница":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/05/Rocket_Launcher.png/30px-Rocket_Launcher.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Полимер","quantity":80},
			{"item":"Металлический слиток","quantity":50},
			{"item":"Цемент","quantity":60}]
        },        
        "Реактивная граната":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Rocket_Propelled_Grenade.png/30px-Rocket_Propelled_Grenade.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Порох","quantity":40},
			{"item":"Кристалл","quantity":10},
			{"item":"Цемент","quantity":20},
			{"item":"Полимер","quantity":10},
			{"item":"Металлический слиток","quantity":12}]
        },        
        "Резервуар для воды":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2c/Water_Reservoir.png/30px-Water_Reservoir.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":30},
			{"item":"Цемент","quantity":5}]
        },        
        "Рогатка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3f/Slingshot.png/30px-Slingshot.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Кожа","quantity":1},
            {"item":"Дерево","quantity":5},
			{"item":"Волокно","quantity":20}]
        },
        "Розовый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/30/Pink_Coloring.png/30px-Pink_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Тинтоберри","quantity":12},
            {"item":"Стимберри","quantity":6},
            {"item":"Порох","quantity":1},
			{"item":"Вода","quantity":0.2}]
        },
        "Самодельное взрывное устройство":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/15/Improvised_Explosive_Device.png/30px-Improvised_Explosive_Device.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Порох","quantity":50},
            {"item":"Кристалл","quantity":10},
            {"item":"Волокно","quantity":35},
            {"item":"Кожа","quantity":5},
            {"item":"Металлический слиток","quantity":10},
            {"item":"Дерево","quantity":1}]
        },
        "Сигнальный пистолет":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/57/Flare_Gun.png/30px-Flare_Gun.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Дерево","quantity":4},
            {"item":"Волокно","quantity":2},
            {"item":"Селитра","quantity":10},
            {"item":"Порох","quantity":2}]
        },
        "Седло на Анкилозавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/57/Ankylo_Saddle.png/30px-Ankylo_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":260},
            {"item":"Волокно","quantity":140},
            {"item":"Металлический слиток","quantity":10}]
        },
        "Седло на Аргентависа":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/04/Argentavis_Saddle.png/30px-Argentavis_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":350},
            {"item":"Волокно","quantity":185},
            {"item":"Хитин или Кератин","quantity":150}]
        },
        "Седло на Бронтозавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a2/Bronto_Saddle.png/30px-Bronto_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":350},
            {"item":"Волокно","quantity":185},
            {"item":"Металлический слиток","quantity":40}]
        },
        "Седло на Ихтиозавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/11/Ichthyosaurus_Saddle.png/30px-Ichthyosaurus_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":55},
            {"item":"Волокно","quantity":50},
            {"item":"Дерево","quantity":20},
            {"item":"Металл","quantity":10},
            {"item":"Кремень","quantity":8}]
        },
        "Седло на Карбонемиса":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/ac/Carbonemys_Saddle.png/30px-Carbonemys_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":170},
            {"item":"Волокно","quantity":95},
            {"item":"Цемент","quantity":10}]
        },
        "Седло на Карнотавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a9/Carno_Saddle.png/30px-Carno_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":320},
            {"item":"Волокно","quantity":170},
            {"item":"Металлический слиток","quantity":30}]
        },
        "Седло на Мамонта":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/19/Mammoth_Saddle.png/30px-Mammoth_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":260},
            {"item":"Волокно","quantity":140},
            {"item":"Металлический слиток","quantity":10}]
        },
        "Седло на Медведя":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9f/Direbear_Saddle.png/30px-Direbear_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":300},
            {"item":"Волокно","quantity":130},
            {"item":"Цемент","quantity":100}]
        },
        "Седло на Мегалодона":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/80/Megalodon_Saddle.png/30px-Megalodon_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":290},
            {"item":"Волокно","quantity":155},
            {"item":"Металлический слиток","quantity":30}]
        },
        "Седло на Паразавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b6/Parasaur_Saddle.png/30px-Parasaur_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":80},
            {"item":"Волокно","quantity":50},
            {"item":"Дерево","quantity":15}]
        },
        "Седло на Плезиозавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8e/Plesiosaur_Saddle.png/30px-Plesiosaur_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":400},
            {"item":"Волокно","quantity":250},
            {"item":"Цемент","quantity":65},
			{"item":"Жемчуг","quantity":40}]
        },
        "Седло на Птеранодона":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Pteranodon_Saddle.png/30px-Pteranodon_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":230},
            {"item":"Волокно","quantity":125},
            {"item":"Хитин или Кератин","quantity":75}]
        },
        "Седло на Раптора":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4b/Raptor_Saddle.png/30px-Raptor_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":110},
            {"item":"Волокно","quantity":65},
            {"item":"Дерево","quantity":20}]
        },
        "Седло на Рекса":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/89/Rex_Saddle.png/30px-Rex_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":380},
            {"item":"Волокно","quantity":200},
            {"item":"Металлический слиток","quantity":50}]
        },
        "Седло на Саблезуба":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/33/Sabertooth_Saddle.png/30px-Sabertooth_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":290},
            {"item":"Волокно","quantity":155},
            {"item":"Металлический слиток","quantity":20}]
        },
        "Седло на Саркозуха":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a6/Sarco_Saddle.png/30px-Sarco_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":230},
            {"item":"Волокно","quantity":75},
            {"item":"Цемент","quantity":20}]
        },
        "Седло на Скорпиона":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7a/Pulmonoscorpius_Saddle.png/30px-Pulmonoscorpius_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":170},
            {"item":"Волокно","quantity":95},
            {"item":"Дерево","quantity":30}]
        },
        "Седло на Спинозавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/97/Spino_Saddle.png/30px-Spino_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":380},
            {"item":"Волокно","quantity":200},
            {"item":"Цемент","quantity":45},
			{"item":"Жемчуг","quantity":25}]
        },
        "Седло на Стегозавра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4c/Stego_Saddle.png/30px-Stego_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":200},
            {"item":"Волокно","quantity":110},
            {"item":"Дерево","quantity":35}]
        },
        "Седло на Трицератопса":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/de/Trike_Saddle.png/30px-Trike_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":140},
            {"item":"Волокно","quantity":80},
            {"item":"Дерево","quantity":25}]
        },
        "Седло на Фиомию":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bb/Phiomia_Saddle.png/30px-Phiomia_Saddle.png',
            "Тип": 'Седла',
            "Ресурсы": [{"item":"Кожа","quantity":20},
            {"item":"Волокно","quantity":15},
            {"item":"Дерево","quantity":5}]
        },
        "Сейф":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c9/Vault.png/30px-Vault.png',
            "Тип": 'Контейнеры',
            "Ресурсы": [{"item":"Металлический слиток","quantity":300},
            {"item":"Цемент","quantity":60},
            {"item":"Нефть","quantity":30},
			{"item":"Полимер","quantity":60}]
        },
        "Серебряный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/88/Silver_Coloring.png/30px-Silver_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Наркоберри","quantity":6},
			{"item":"Стимберри","quantity":12},
            {"item":"Порох","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Селитра":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Sparkpowder.png/30px-Sparkpowder.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Кремень","quantity":2},
            {"item":"Камень","quantity":1}]
        },
        "Синий краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f2/Blue_Coloring.png/30px-Blue_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Азулберри","quantity":15},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },
        "Синевато-серый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4b/Slate_Coloring.png/30px-Slate_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Наркоберри","quantity":12},
			{"item":"Стимберри","quantity":6},
            {"item":"Селитра","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Снайперский прицел":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/74/Scope.png/30px-Scope.png',
            "Тип":'Оборудование',
            "Ресурсы": [{"item":"Металлический слиток","quantity":40},
            {"item":"Кристалл","quantity":20},
            {"item":"Камень","quantity":5}]
        },
        "Соломенная дверь":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6d/Thatch_Door.png/30px-Thatch_Door.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":40},
            {"item":"Солома","quantity":7},
            {"item":"Волокно","quantity":4}]
        },
        "Соломенная крыша":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/da/Thatch_Roof.png/30px-Thatch_Roof.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":15},
            {"item":"Солома","quantity":4},
            {"item":"Волокно","quantity":10}]
        },
        "Соломенная стена":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bd/Thatch_Wall.png/30px-Thatch_Wall.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":10},
            {"item":"Солома","quantity":2},
            {"item":"Волокно","quantity":7}]
        },
        "Соломенный дверной проем":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ef/Thatch_Doorframe.png/30px-Thatch_Doorframe.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Солома","quantity":8},
            {"item":"Дерево","quantity":6},
            {"item":"Волокно","quantity":6}]
        },
        "Соломенный фундамент":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/43/Thatch_Foundation.png/30px-Thatch_Foundation.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Солома","quantity":20},
            {"item":"Дерево","quantity":6},
            {"item":"Волокно","quantity":15}]
        },
        "Средняя грядка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Medium_Crop_Plot.png/30px-Medium_Crop_Plot.png',
            "Тип":'Постройки',
            "Ресурсы": [{"item":"Дерево","quantity":40},
            {"item":"Солома","quantity":20},
            {"item":"Волокно","quantity":30},
            {"item":"Камень","quantity":50}]
        },
        "Ступка и пестик":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f0/Mortar_And_Pestle.png/30px-Mortar_And_Pestle.png',
            "Тип": 'Место для крафта',
            "Ресурсы": [{"item":"Камень","quantity":65},
            {"item":"Кожа","quantity":15}]
        },
        "Станок":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/66/Fabricator.png/30px-Fabricator.png',
            "Тип": 'Место для крафта',
            "Ресурсы": [{"item":"Металлический слиток","quantity":35},
            {"item":"Цемент","quantity":20},
            {"item":"Селитра","quantity":50},
            {"item":"Кристалл","quantity":15},
            {"item":"Нефть","quantity":10}]
        },
        "Стимулятор":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e2/Stimulant.png/30px-Stimulant.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Стимберри","quantity":5},
            {"item":"Селитра","quantity":2}]
        },
        "Стоячий факел":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/60/Standing_Torch.png/30px-Standing_Torch.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Солома","quantity":8},
			{"item":"Кремень","quantity":1},
			{"item":"Камень","quantity":1},
            {"item":"Дерево","quantity":3}]
        },
        "Сфокусированный фонарный столб":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b1/Lamppost.png/30px-Lamppost.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":5},
            {"item":"Кристалл","quantity":10},
            {"item":"Электроника","quantity":2}]
        },
        "Темно-зеленый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Forest_Coloring.png/30px-Forest_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Амарберри","quantity":7},
            {"item":"Азулберри","quantity":7},
            {"item":"Наркоберри","quantity":4},
            {"item":"Порох","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Темно-синий краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/80/Navy_Coloring.png/30px-Navy_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Азулберри","quantity":12},
            {"item":"Наркоберри","quantity":6},
            {"item":"Селитра","quantity":1},
            {"item":"Вода","quantity":0.2}]
        },
        "Термошкаф":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Preserving_Bin.png/30px-Preserving_Bin.png',
            "Тип": 'Контейнеры',
            "Ресурсы": [{"item":"Камень","quantity":30},
            {"item":"Дерево","quantity":30},
            {"item":"Солома","quantity":10},
            {"item":"Волокно","quantity":20}]
        },
        "Тканевая рубашка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f0/Cloth_Shirt.png/30px-Cloth_Shirt.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Волокно","quantity":40}]
        },
        "Тканевая шапка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/42/Cloth_Hat.png/30px-Cloth_Hat.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Волокно","quantity":10}]
        },
        "Тканевые ботинки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/36/Cloth_Boots.png/30px-Cloth_Boots.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Волокно","quantity":25},
            {"item":"Кожа","quantity":6}]
        },
        "Тканевые перчатки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Cloth_Gloves.png/30px-Cloth_Gloves.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Волокно","quantity":20},
            {"item":"Кожа","quantity":4}]
        },
        "Тканевые штаны":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/69/Cloth_Pants.png/30px-Cloth_Pants.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Волокно","quantity":50}]
        },
        "Транквилизирующая стрела":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/be/Tranquilizer_Arrow.png/30px-Tranquilizer_Arrow.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Каменная стрела","quantity":1},
            {"item":"Наркотик","quantity":1}]
        },
        "Турель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f9/Auto_Turret.png/30px-Auto_Turret.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Металлический слиток","quantity":140},
            {"item":"Электроника","quantity":70},
            {"item":"Цемент","quantity":50},
            {"item":"Полимер","quantity":20}]
        },
        "Тяжелый шлем шахтера":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9a/Heavy_Miner%27s_Helmet.png/30px-Heavy_Miner%27s_Helmet.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Электроника","quantity":30},
            {"item":"Металлический слиток","quantity":20},
            {"item":"Полимер","quantity":14},
            {"item":"Кристалл","quantity":30},
            {"item":"Кожа","quantity":15},
            {"item":"Волокно","quantity":8}]
        },
        "Удобрение":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/25/Fertilizer.png/30px-Fertilizer.png',
            "Тип": 'Разное',
            "Ресурсы": [{"item":"Солома","quantity":50},
            {"item":"Фекалии","quantity":3}]
        },
        "Укреплённая деревянная дверь":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Reinforced_Wooden_Door.png/30px-Reinforced_Wooden_Door.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":20},
            {"item":"Дерево","quantity":4},
            {"item":"Солома","quantity":8}]
        },
        "Укрепленное окно":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/02/Reinforced_Window.png/30px-Reinforced_Window.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":8},
            {"item":"Дерево","quantity":4},
            {"item":"Солома","quantity":3}]
        },
        "Укрепленные ворота":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0d/Reinforced_Dinosaur_Gate.png/30px-Reinforced_Dinosaur_Gate.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":60},
            {"item":"Дерево","quantity":30},
            {"item":"Солома","quantity":20}]
        },
        "Укреплённый люк":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/72/Reinforced_Trapdoor.png/30px-Reinforced_Trapdoor.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Камень","quantity":20},
            {"item":"Дерево","quantity":4},
            {"item":"Солома","quantity":8}]
        },
        "Улучшенный пистолет":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2e/Fabricated_Pistol.png/30px-Fabricated_Pistol.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Полимер","quantity":35},
            {"item":"Металлический слиток","quantity":20},
            {"item":"Цемент","quantity":30}]
        },
        "Улучшенная пуля":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3e/Advanced_Bullet.png/30px-Advanced_Bullet.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Металлический слиток","quantity":1},
            {"item":"Порох","quantity":3}]
        },
        "Улучшенная пуля для винтовки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/64/Advanced_Rifle_Bullet.png/30px-Advanced_Rifle_Bullet.png',
            "Тип": 'Боеприпасы',
            "Ресурсы": [{"item":"Металлический слиток","quantity":1},
            {"item":"Порох","quantity":9}]
        },
        "Факел":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b2/Torch.png/30px-Torch.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Кремень","quantity":1},
            {"item":"Дерево","quantity":1},
            {"item":"Камень","quantity":1}]
        },
        "Фиолетовый краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0d/Purple_Coloring.png/30px-Purple_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Азулберри","quantity":9},
            {"item":"Тинтоберри","quantity":9},
			{"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },
        "Фонарный столб":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Omnidirectional_Lamppost.png/30px-Omnidirectional_Lamppost.png',
            "Тип": 'Постройки',
            "Ресурсы": [{"item":"Металлический слиток","quantity":5},
            {"item":"Кристалл","quantity":10},
            {"item":"Электроника","quantity":2}]
        },
        "Фляга":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5e/Canteen.png/30px-Canteen.png',
            "Тип": 'Инструменты',
            "Ресурсы": [{"item":"Полимер","quantity":10},
            {"item":"Кожа","quantity":2},
            {"item":"Цемент","quantity":4},
            {"item":"Металлический слиток","quantity":1}]
        },
        "Фриа карри":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/70/Fria_Curry.png/30px-Fria_Curry.png',
            "Тип": 'Блюда',
            "Ресурсы": [{"item":"Кукуруза","quantity":5},
            {"item":"Морковь","quantity":5},
            {"item":"Азулберри","quantity":20},
            {"item":"Меджоберри","quantity":10},
            {"item":"Наркотик","quantity":2}]
        },
        "Химический стол":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Chemistry_Bench.png/30px-Chemistry_Bench.png',
            "Тип": 'Место для крафта',
            "Ресурсы": [{"item":"Металлический слиток","quantity":250},
            {"item":"Цемент","quantity":250},
            {"item":"Селитра","quantity":100},
            {"item":"Кристалл","quantity":250},
            {"item":"Полимер","quantity":250},
            {"item":"Электроника","quantity":250}]
        },
        "Хитиновые ботинки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0d/Chitin_Boots.png/30px-Chitin_Boots.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Хитин","quantity":12},
            {"item":"Кожа","quantity":6},
            {"item":"Волокно","quantity":4}]
        },
        "Хитиновые перчатки":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Chitin_Gauntlets.png/30px-Chitin_Gauntlets.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Хитин","quantity":10},
            {"item":"Кожа","quantity":5},
            {"item":"Волокно","quantity":2}]
        },
        "Хитиновые штаны":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fd/Chitin_Leggings.png/30px-Chitin_Leggings.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Хитин","quantity":25},
            {"item":"Кожа","quantity":12},
            {"item":"Волокно","quantity":5}]
        },
        "Хитиновый нагрудник":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f1/Chitin_Chestpiece.png/30px-Chitin_Chestpiece.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Хитин","quantity":20},
            {"item":"Кожа","quantity":10},
            {"item":"Волокно","quantity":4}]
        },
        "Хитиновый шлем":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7b/Chitin_Helmet.png/30px-Chitin_Helmet.png',
            "Тип": 'Броня',
            "Ресурсы": [{"item":"Хитин","quantity":15},
            {"item":"Кожа","quantity":7},
            {"item":"Волокно","quantity":3}]
        },
        "Холодильник":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d8/Refrigerator.png/30px-Refrigerator.png',
            "Тип": 'Контейнеры',
            "Ресурсы": [{"item":"Металлический слиток","quantity":120},
            {"item":"Полимер","quantity":15},
            {"item":"Кристалл","quantity":25},
            {"item":"Электроника","quantity":10}]
        },
        "Целебный отвар":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/59/Medical_Brew.png/30px-Medical_Brew.png',
            "Тип": 'Блюда',
            "Ресурсы": [{"item":"Тинтоберри","quantity":20},
            {"item":"Наркотик","quantity":2}]
        },
        "Цемент":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/03/Cementing_Paste.png/30px-Cementing_Paste.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Хитин или Кератин","quantity":4},
            {"item":"Камень","quantity":8}]
        },
        "Черный краситель":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f6/Black_Coloring.png/30px-Black_Coloring.png',
            "Тип": 'Красители',
            "Ресурсы": [{"item":"Наркоберри","quantity":15},
            {"item":"Уголь","quantity":2},
            {"item":"Вода","quantity":0.2}]
        },
        "Чудо-удобрение":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/17/Re-Fertilizer.png/30px-Re-Fertilizer.png',
            "Тип": 'Разное',
            "Ресурсы": [{"item":"Редкий цветок","quantity":1},
			{"item":"Редкий гриб","quantity":1},
			{"item":"Селитра","quantity":4},
            {"item":"Удобрение","quantity":1},
            {"item":"Нефть","quantity":3}]
        },
        "Шкаф":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1d/Large_Storage_Box.png/30px-Large_Storage_Box.png',
            "Тип": 'Контейнеры',
            "Ресурсы": [{"item":"Дерево","quantity":50},
            {"item":"Солома","quantity":35},
            {"item":"Волокно","quantity":25}]
        },
        "Штаны для плавания":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7e/SCUBA_Leggings.png/30px-SCUBA_Leggings.png',
            "Тип":'Броня',
            "Ресурсы": [{"item":"Кожа","quantity":40},
            {"item":"Волокно","quantity":4},
			{"item":"Металлический слиток","quantity":2},
            {"item":"Полимер","quantity":40}]
        },        
        "Штурмовая винтовка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e0/Assault_Rifle.png/30px-Assault_Rifle.png',
            "Тип": 'Оружие',
            "Ресурсы": [{"item":"Полимер","quantity":60},
            {"item":"Металлический слиток","quantity":35},
            {"item":"Цемент","quantity":50}]
        },
        "Электрическая розетка":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Electrical_Outlet.png/30px-Electrical_Outlet.png',
            "Тип": 'Электричество',
            "Ресурсы": [{"item":"Металлический слиток","quantity":5},
            {"item":"Дерево","quantity":15},
            {"item":"Электроника","quantity":3}]
        },    
        "Электрический генератор":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Electrical_Generator.png/30px-Electrical_Generator.png',
            "Тип": 'Электричество',
            "Ресурсы": [{"item":"Металлический слиток","quantity":25},
            {"item":"Электроника","quantity":10}]
        },    
        "Электроника":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/dd/Electronics.png/30px-Electronics.png',
            "Тип": 'Ресурсы',
            "Ресурсы": [{"item":"Жемчуг","quantity":3},
            {"item":"Металлический слиток","quantity":1}]
        },    
        "Энергетический напиток":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/81/Energy_Brew.png/30px-Energy_Brew.png',
            "Тип": 'Блюда',
            "Ресурсы": [{"item":"Азулберри","quantity":20},
            {"item":"Стимулятор","quantity":2}]
        },    
        "Ящик":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d0/Storage_Box.png/30px-Storage_Box.png',
            "Тип": 'Контейнеры',
            "Ресурсы": [{"item":"Дерево","quantity":25},
            {"item":"Солома","quantity":20},
            {"item":"Волокно","quantity":10}]
        },     
        "Ящик для компоста":{
            "icon":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e1/Compost_Bin.png/30px-Compost_Bin.png',
            "Тип": 'Контейнеры',
            "Ресурсы": [{"item":"Дерево","quantity":50},
            {"item":"Солома","quantity":15},
            {"item":"Волокно","quantity":12}]
        }     
    };
    //Список ресурсов
    resourceList = {
        "Азулберри":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2f/Azulberry.png/30px-Azulberry.png',
        "Амарберри":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/60/Amarberry.png/30px-Amarberry.png',
        "Вода":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Water.png/30px-Water.png',
        "Волокно":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/45/Fiber.png/30px-Fiber.png',
        "Дерево":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/df/Wood.png/30px-Wood.png',
        "Жареное мясо":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Cooked_Meat.png/30px-Cooked_Meat.png',
        "Жареное первосортное мясо":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Cooked_Meat.png/30px-Cooked_Meat.png',
        "Жемчуг":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4a/Silica_Pearls.png/30px-Silica_Pearls.png',
        "Камень":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d4/Stone.png/30px-Stone.png',
        "Картофель":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/34/Savoroot.png/30px-Savoroot.png',
        "Кожа":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/96/Hide.png/30px-Hide.png',
        "Кремень":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2e/Flint.png/30px-Flint.png',
        "Кристалл":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Crystal.png/30px-Crystal.png',
        "Кукуруза":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4e/Longrass.png/30px-Longrass.png',
        "Лимон":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/14/Citronal.png/30px-Citronal.png',
        "Наркоберри":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/29/Narcoberry.png/30px-Narcoberry.png',
        "Нефть":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/06/Oil.png/30px-Oil.png',
        "Меджоберри":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/00/Mejoberry.png/30px-Mejoberry.png',
        "Металл":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e1/Metal.png/30px-Metal.png',
        "Морковь":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c3/Rockarrot.png/30px-Rockarrot.png',
        "Обсидиан":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/23/Obsidian.png/30px-Obsidian.png',
        "Редкий гриб":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/30/Rare_Mushroom.png/30px-Rare_Mushroom.png',
        "Редкий цветок":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bb/Rare_Flower.png/30px-Rare_Flower.png',
        "Протухшее мясо":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/ff/Spoiled_Meat.png/30px-Spoiled_Meat.png',
        "Солома":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/51/Thatch.png/30px-Thatch.png',
        "Стимберри":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Stimberry.png/30px-Stimberry.png',
        "Сырое первосортное мясо":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Raw_Prime_Meat.png/30px-Raw_Prime_Meat.png',
        "Тинтоберри":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/dd/Tintoberry.png/30px-Tintoberry.png',
        "Фекалии":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Feces.png/30px-Feces.png',
        "Хитин":'https://images.wikia.nocookie.net/ark-survival-evolved/ru&format=webp/images/thumb/a/a1/Chitin.png/30px-Chitin.png',
        "Хитин или Кератин":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f2/Chitin_or_Keratin.png/30px-Chitin_or_Keratin.png',
        "Уголь":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4f/Charcoal.png/30px-Charcoal.png',
        "Яйцо Анкилозавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/84/Ankylo_Egg.png/30px-Ankylo_Egg.png',
        "Яйцо Аранео":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a1/Araneo_Egg.png/30px-Araneo_Egg.png',
        "Яйцо Аргентависа":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cb/Argentavis_Egg.png/30px-Argentavis_Egg.png',
        "Яйцо Бронтозавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1b/Bronto_Egg.png/30px-Bronto_Egg.png',
        "Яйцо Галлимима":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/62/Gallimimus_Egg.png/30px-Gallimimus_Egg.png',
        "Яйцо Дилофозавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/af/Dilo_Egg.png/30px-Dilo_Egg.png',
        "Яйцо Диметродона":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bf/Dimetrodon_Egg.png/30px-Dimetrodon_Egg.png',
        "Яйцо Диморфодона":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b1/Dimorph_Egg.png/30px-Dimorph_Egg.png',
        "Яйцо Карбонемиса":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0d/Turtle_Egg.png/30px-Turtle_Egg.png',
        "Яйцо Карнотавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6b/Carno_Egg.png/30px-Carno_Egg.png',
        "Яйцо Кетцалькоатля":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d7/Quetzal_Egg.png/30px-Quetzal_Egg.png',
        "Яйцо Паразавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2a/Parasaur_Egg.png/30px-Parasaur_Egg.png',
        "Яйцо Пахицелофозавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/49/Pachycephalosaurus_Egg.png/30px-Pachycephalosaurus_Egg.png',
        "Яйцо Птеранодона":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6c/Pteranodon_Egg.png/30px-Pteranodon_Egg.png',
        "Яйцо Раптора":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/92/Raptor_Egg.png/30px-Raptor_Egg.png',
        "Яйцо Саркозуха":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4b/Sarco_Egg.png/30px-Sarco_Egg.png',
        "Яйцо Скорпиона":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e8/Pulmonoscorpius_Egg.png/30px-Pulmonoscorpius_Egg.png',
        "Яйцо Спинозавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b3/Spino_Egg.png/30px-Spino_Egg.png',
        "Яйцо Стегозавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1c/Stego_Egg.png/30px-Stego_Egg.png',
        "Яйцо Тираннозавра":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ee/Rex_Egg.png/30px-Rex_Egg.png',
        "Яйцо Титанобоа":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/81/Titanoboa_Egg.png/30px-Titanoboa_Egg.png',
        "Яйцо Трицератопса":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/39/Trike_Egg.png/30px-Trike_Egg.png',
        "Яйцо Ужасной птицы":'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e0/Terror_Bird_Egg.png/30px-Terror_Bird_Egg.png'
    };

    var tableCols = '';
    var tableColLeft = '';
    var tableColLeftRow = '';
    var tableColMiddle = '';
    var tableColRight = '';
    
    for (var res in itemList){
        tableColLeftRow += '<tr><td class="CalcResourcesRow" colspan="2" onclick="AddItem(\'' + res + '\')"><b>'+ 
        '<img src="'+ itemList[res].icon + '">'+ res +'</b></td></tr>';
    }
    
    //Создаем фильтр
    var filterItem = '<select onchange="changeFilter(this.value)">'+
    '<option>Всё</option>'+
    '<option>Боеприпасы</option>'+
    '<option>Блюда</option>'+
    '<option>Броня</option>'+
    '<option>Инструменты</option>'+
    '<option>Контейнеры</option>'+
    '<option>Корма</option>'+
    '<option>Красители</option>'+
    '<option>Место для крафта</option>'+
    '<option>Оборудование</option>'+
    '<option>Оружие</option>'+
    '<option>Постройки</option>'+
    '<option>Ресурсы</option>'+
    '<option>Седла</option>'+
    '<option>Электричество</option>'+
    '<option>Разное</option>'+
    '</select>';
    
    //Создаем начальную таблицу
    tableCols += '<table border="3" style="width: 100%; height: 45px; margin: 0px 0px 6px 0px;">'+
    '<tbody><tr><td>'+
    
    //Фильтр и шапка.
    '<table border="3" style="width: 260px; height: 45px; margin: 0px 0px 6px 0px;">'+
    '<tbody><tr class="item-filter">'+
    '<td style="height:30px">Предметы</td>'+
    '<td>'+ filterItem + '</td></tr></tbody></table></td>'+
   
    //Шапка крафта
    '<td style="vertical-align: top;"><table border="3" style="width: 260px; height: 45px; margin: 0px 0px 6px 0px;">'+
    '<tbody><tr><td style="height:30px">Вы крафтите</td>'+
    '<td><button onclick=RemoveAll()>Сбросить</button></td></tr></tbody></table></td>'+
    
    //Шапка ресурсов
    '<td><table border="3" style="width: 260px; height: 45px; margin: 0px 0px 6px 0px;">'+
    '<tbody><tr><td colspan="2" style="height:30px">Материалы</td>'+
    '</tr></tbody></table></td></tr>'+

    //Список предметов
    '<tr><td><div id="divScroll" style="overflow: scroll; height: 700px;"><table border="3" id="tableColLeft" style="width:260px;"><tbody>'+
    tableColLeftRow + '</tbody></table></div></td>'+
     
    //Список крафта
    '<td style="vertical-align: top;"><div id="divScroll" style="overflow: scroll; height: 700px;">'+
    '<table border="3" id="tableColMiddle" style="width:260px;">'+
    '<tbody id=trActiveItem>'+
    '</tbody></table></div></td>'+

    //Список ресурсов    
    '<td style="vertical-align: top;"><div id="divScroll" style="overflow: scroll; height: 700px;"><table border="3" style="width:260px;"><tbody id="tableColRight">'+
    '</tbody></div></table></td></tr></tbody></table>';
    
    document.getElementById('resourcesCalc').innerHTML = tableCols;
}

function AddItem(Item){
    
    //Добавляем предметы в колонку
    var RowActiveItem = '';
    var QuantityItem = 1;

    RowActiveItem = document.getElementById(Item);
    if (RowActiveItem == null){ 
        document.getElementById('trActiveItem').innerHTML += 
        '<tr id="'+Item+'"><td  onclick="RemoveItem(\'' + Item + '\')"><b>'+ 
        '<img src="'+ itemList[Item].icon + '">'+ Item +'</b></td>'+
        '<td><input id="quantityItem '+ Item +'" type="number" min="1" max="1000" maxlength="4" value="' + QuantityItem + '" style="width:5em" onchange="calcRes()"></td></tr>';}
    else{
        QuantityItem = document.getElementById('quantityItem '+ Item).value;
        QuantityItem = parseFloat(QuantityItem) + 1;
        document.getElementById('quantityItem '+ Item).value = QuantityItem;}
    calcRes();    
}

function RemoveItem(Item){
    
    document.getElementById(Item).parentNode.removeChild(document.getElementById(Item));
    calcRes();

}

function RemoveAll(){
    
    document.getElementById('trActiveItem').innerHTML = '';
    document.getElementById('tableColRight').innerHTML = '';

}

//Расчет ресурсов
function calcRes() {
    
    document.getElementById('tableColRight').innerHTML = '';
   //Получаем список создаваемых предметов
 
    ListCreateItems = document.getElementById('tableColMiddle').getElementsByTagName('TR');

    for (var i = 0; i < ListCreateItems.length; i++) {
        Item = ListCreateItems[i].id;
        
        if (ListCreateItems[i].id != "") {
            
            Factor = document.getElementById('quantityItem '+ Item).value;
            ResourcesItem = itemList[Item].Ресурсы;
            
            for (var resource in ResourcesItem){
                
                //Проверка есть ли ресурс в таблице
                if (document.getElementById('Res'+ ResourcesItem[resource].item) != null){
                    //Если ресурс уже есть
                    ResQuantity = parseFloat(document.getElementById('ResQuantity' + ResourcesItem[resource].item).innerHTML.substr(1));
                    ResQuantity = ResQuantity+(ResourcesItem[resource].quantity * Factor);
                    document.getElementById('ResQuantity' + ResourcesItem[resource].item).innerHTML = 'x' + ResQuantity;
 
                    //Проверка состоит ли ресурс из других ресурсов
                    if (resourceList[ResourcesItem[resource].item] == null){
                        CalResFromRes(ResourcesItem[resource].item, ResQuantity, "");
                        /*for (var indexRes in itemList[ResourcesItem[resource].item].Ресурсы){
                            resItemInTable = itemList[ResourcesItem[resource].item].Ресурсы[indexRes];
                            ResQuantityUnder = resItemInTable.quantity * ResQuantity;
                            document.getElementById('ResQuantity' + resItemInTable.item +'For'+ResourcesItem[resource].item).innerHTML = 'x' + ResQuantityUnder;
                        }    */
                    }
                }
                else{
                    //Создается ресурс в таблице
                    if (resourceList[ResourcesItem[resource].item] != null){ 
                        document.getElementById('tableColRight').innerHTML += '<tr><td id="Res' + ResourcesItem[resource].item + '"><img src="'+ resourceList[ResourcesItem[resource].item] + '">'+ ResourcesItem[resource].item +'</td><td id="ResQuantity' + ResourcesItem[resource].item + '">x' + (ResourcesItem[resource].quantity*Factor) + '</td></tr>';
                    }    
                    else {
                        
                        OpenRow = CalResFromRes(ResourcesItem[resource].item, (ResourcesItem[resource].quantity * Factor),"");
                        
                        document.getElementById('tableColRight').innerHTML += '<tr class="parent">'+
                        '<td id="Res' + ResourcesItem[resource].item + '" onclick="openbox(\''+ ResourcesItem[resource].item + '\');" class="close"><li>' +
                        '<img src="'+ itemList[ResourcesItem[resource].item].icon + '">'+ ResourcesItem[resource].item +'</td><td id="ResQuantity' + ResourcesItem[resource].item + '">x' + (ResourcesItem[resource].quantity*Factor) + 
                        '</li></td>'+
                        OpenRow +
                        '</tr>';                        
                    }
                }    
                
            }
        }    
    }
    
}

function CalResFromRes(Item, quantity, nameParent){
    var OpenRow = "";
    var img ="";
    //Проверка есть ли до ресурсы в таблице
    //if (document.getElementById('Res'+ Item) == null){
        //Если нет в таблице 
        for (var indexRes in itemList[Item].Ресурсы){
            resItemInTable = itemList[Item].Ресурсы[indexRes];
            //Проверка на ресурс из других ресурсов
            if(resourceList[resItemInTable.item] == null){
                
                
                OpenRow += '<tr class="box" style="display: none;" id="Row' + Item+nameParent+'">'+
                '<td id="Res' + resItemInTable.item +'For'+Item+nameParent+'" onclick="openbox(\'' + resItemInTable.item +'For'+Item + nameParent+'\');" class="close"><li>'+
                '<img src="' + itemList[resItemInTable.item].icon + '">' +                   resItemInTable.item + '</td>'+
                '<td id="ResQuantity' + resItemInTable.item +'For'+Item + nameParent+'">x' + (resItemInTable.quantity*quantity) + '</li></td>';
                
                
                var Parent = "For"+Item;
                OpenRow2=CalResFromRes(resItemInTable.item, (quantity * resItemInTable.quantity),Parent);
                OpenRow+=OpenRow2+'</tr>';
            }    
            else{
                OpenRow += '<tr class="box" style="display: none;" id="Row'+Item+nameParent+'">'+
                '<td id="Res' + resItemInTable.item +'For'+Item+nameParent+'">'+
                '<img src="' + resourceList[resItemInTable.item] + '">'+
                resItemInTable.item + '</td>'+
                '<td id="ResQuantity' + resItemInTable.item +'For'+Item + nameParent+'">x' + (resItemInTable.quantity*quantity) + '</td></tr>';
            }  
            
        }
        return OpenRow;
    //}
    /*else{
        //Если уже есть в таблице
        for (var indexRes in itemList[Item].Ресурсы){
            resItemInTable = itemList[Item].Ресурсы[indexRes];
            ResQuantityUnder = resItemInTable.quantity * ResQuantity;
            document.getElementById('ResQuantity' + resItemInTable.item +'For'+Item).innerHTML = 'x' + ResQuantityUnder;
        }
        return OpenRow;   
    }*/
}

//Фильтр
function changeFilter(Filter) {
    RowTabble = "";
    
    if(Filter != "Всё"){
        for (var res in itemList){
            if (Filter == itemList[res].Тип){
                RowTabble += '<tr><td class="CalcResourcesRow" colspan="2" onclick="AddItem(\'' + res + '\')"><b>'+ 
                '<img src="'+ itemList[res].icon + '">'+ res +'</b></td></tr>';
            }
        }        
    }
    else {
        for (var res in itemList){
            RowTabble += '<tr><td class="CalcResourcesRow" colspan="2" onclick="AddItem(\'' + res + '\')"><b>'+ 
            '<img src="'+ itemList[res].icon + '">'+ res +'</b></td></tr>';
        }        
    }
    
    document.getElementById('tableColLeft').innerHTML = '<tbody>' + RowTabble + '</tbody>';

}

/*********************************************
 * Развертывание таблиц
 * ******************************************/
function openbox(idRow){
    var disp = document.getElementsByClassName('box');
        for(var i=0;i<disp.length;i++){
            if(disp[i].id.substr(3) == idRow){
                if(disp[i].style.display == "none"){
                    document.getElementById('Res'+ idRow).className = "open";
                    disp[i].style.display = "";
                }
                else{
                    document.getElementById('Res'+ idRow).className = "close";
                    disp[i].style.display = "none";
                }
            }    
        }
    }
        
/*****************************************************/