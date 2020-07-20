    var creature={
		icon : 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4e/Ankylo_Icon.png/30px-Ankylo_Icon.png',
        effectiveness: 0,
        extralevels:0,
        fillfood: "Сырое мясо",
        foodrate:0,
        foodratemultiplier:0,
        level: 1,
        name:"Анкилозавр",
        requiredaffinity:0,
        searchname:"Анкилозавр",
        suppliedaffinity:0,
        tamingmethod:"Стандарт",
        torpor:0,
        torporrate:0,
        totalfood:0
    };

    var objTimer = 0;
    
    var totaltime = 0;
    var foodamounts={};

    var narcotics={
		buffertime: 0,
		max: 0,
		min: 0,
		buffernarcotics:0,
		narcoticsbuffertime: 0,
		narcoticsmethod: "Наркотик"
	};
    
    var	starvetiming = {
        start: new Date(),
        maxfood: 0,
        currentfood: 0,
        time: false,
        intervalid: null,
        starvetime: 0,
        alarm: false,
        alarmthreshold: 10
    };
    
    var ko ={
		koweapondam: 100,
		komeleedam: 100,
		searchkomethod: "Арбалет",
		komethod: "Арбалет",
		koquantities: {},
		kotimes: {},
		kotorpor: {},
		kodamage: {},
		torpor:0,
		damage:0
    };

    var narcoticstiming={
		start: new Date(),
		topupnarcotics: 0,
		currenttorpor: 0,
		time: false,
		intervalid: null,
		buffertime: 0,
		alarm: false,
		alarmthreshold: 10,
		narcoticsbuffertime: 0,
        narcoticsduration: 0,
        narcoticssupplied: 0,
		narcoticstimes: {
			"Наркотик": 0,
			"Наркоберри": 0
		}
	};
 
    var listFoods={
		'Межоберри': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/00/Mejoberry.png/30px-Mejoberry.png',
			food: 30,
			affinity: 30
		},
		'Ягоды': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/24/Berries.png/30px-Berries.png',
			food: 20,
			affinity: 20
		},
		'Сырое мясо': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e9/Raw_Meat.png/30px-Raw_Meat.png',
			food: 50,
			affinity: 50
		},
		'Сырое мясо-Скарабей': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e9/Raw_Meat.png/30px-Raw_Meat.png',
			food: 15,
			affinity: 15
		},
		'Жареное мясо': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Cooked_Meat.png/30px-Cooked_Meat.png',
			food: 25,
			affinity: 25
		},
		'Вяленое мясо': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/86/Cooked_Meat_Jerky.png/30px-Cooked_Meat_Jerky.png',
			food: 25,
			affinity: 25
		},
		'Сырое первосортное мясо': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Raw_Prime_Meat.png/30px-Raw_Prime_Meat.png',
			food: 50,
			affinity: 150
		},
		'Сырое первосортное мясо-Компи': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Raw_Prime_Meat.png/30px-Raw_Prime_Meat.png',
			food: 20,
			affinity: 600
		},
		'Жареное первосортное мясо': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Cooked_Meat.png/30px-Cooked_Meat.png',
			food: 50,
			affinity: 75
		},
        "Вяленое первосортное мясо":{
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/51/Prime_Meat_Jerky.png/30px-Prime_Meat_Jerky.png',
			food: 50,
			affinity: 75
		},
		'Ж/В первосортное мясо': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/dd/Cooked_Prime_Meat_or_Jerky.png/30px-Cooked_Prime_Meat_or_Jerky.png',
			food: 50,
			affinity: 75
		},
		'Протухшее мясо': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/ff/Spoiled_Meat.png/30px-Spoiled_Meat.png',
			food: 50,
			affinity: 100
		},
		'Сырая рыба': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Raw_Fish_Meat.png/30px-Raw_Fish_Meat.png',
			food: 25,
			affinity: 20
		},
		'Жареная рыба': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Cooked_Fish_Meat.png/30px-Cooked_Fish_Meat.png',
            food: 25,
			affinity: 10
		},
		'Сырая первосортная рыба': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/98/Raw_Prime_Fish_Meat.png/30px-Raw_Prime_Fish_Meat.png',
			food: 25,
			affinity: 60
		},
		'Жареная первосортная рыба': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b6/Cooked_Prime_Fish_Meat.png/30px-Cooked_Prime_Fish_Meat.png',
			food: 25,
			affinity: 30
		},
		'Корм-Общий': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
			food: 79.98,
			affinity: 400
		},
		'Корм-Бронто': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
			food: 53.28,
			affinity: 400
		},
		'Корм-Гигантопитек': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
			food: 79.98,
			affinity: 300
		},
		'Корм-Диплодок': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            food: 53.28,
            affinity: 275
		},
		'Корм-Мозазавр': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
			food: 79.98,
			affinity: 550
		},
		'Корм-Носорог': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            food: 53.28,
            affinity: 400
		},
		'Корм-Archa': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Kibble.png/30px-Kibble.png',
            food: 20,
            affinity: 400
		},
		'Овощи': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cb/Vegetables.png/30px-Vegetables.png',
			food: 40,
			affinity: 40
		},
		'Овощи-Медведь': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cb/Vegetables.png/30px-Vegetables.png',
			food: 100,
			affinity: 50
		},		
		'Редкий гриб': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/30/Rare_Mushroom.png/30px-Rare_Mushroom.png',
			food: 75,
			affinity: 90
		},
		'Семена Растения Икс': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f4/Plant_Species_X_Seed.png/30px-Plant_Species_X_Seed.png',
			food: 50,
			affinity: 45
		},
		'Семена Растения Уай': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f4/Plant_Species_X_Seed.png/30px-Plant_Species_X_Seed.png',
            food: 65,
            affinity: 160
		},		
		'Яйцо Гигантозавра': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e6/Giganotosaurus_Egg.png/30px-Giganotosaurus_Egg.png',
			food: 300,
			affinity: 1200
		},
		'Яйцо Кетцалькоатля': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d7/Quetzal_Egg.png/30px-Quetzal_Egg.png',
			food: 200,
			affinity: 550
		},
		'Яйцо Тираннозавра': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ee/Rex_Egg.png/30px-Rex_Egg.png',
			food: 200,
			affinity: 100
		},
		'Яйцо Спинозавра': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b3/Spino_Egg.png/30px-Spino_Egg.png',
			food: 137.5,
			affinity: 80
		},
		'Яйцо Бронтозавра': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1b/Bronto_Egg.png/30px-Bronto_Egg.png',
			food: 250,
			affinity: 60
		},
		'Яйцо Карнотавра': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/6b/Carno_Egg.png/30px-Carno_Egg.png',
			food: 137.5,
			affinity: 30
		},
		'Яйцо Додо': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/de/Dodo_Egg.png/30px-Dodo_Egg.png',
			food: 20,
			affinity: 9
		},
		'Человеческие фекалии': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/2a/Human_Feces.png/30px-Human_Feces.png',
			food: 10,
			affinity: 60
		},
		'Большие фекалии животных': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Feces.png/30px-Feces.png',
			food: 37.5,
			affinity: 225
		},
		'Средние фекалии животных': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Feces.png/30px-Feces.png',
			food: 25,
			affinity: 150
		},
		'Маленькие фекалии животных': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Feces.png/30px-Feces.png',
			food: 12.5,
			affinity: 75
		},
		'Гель удильщика': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/01/Angler_Gel.png/30px-Angler_Gel.png',
			food: 8*3,
			affinity: 50.0
		},
		'Отвар Просвещения': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f2/Broth_of_Enlightenment.png/30px-Broth_of_Enlightenment.png',
			food: 80,
			affinity: 1500.0
		},
		'Редкий цветок': {
            icon:'https://vignette.wikia.nocookie.net/ark-survival-evolved/images/b/bb/Rare_Flower.png/revision/latest/scale-to-width-down/32?cb=20151113114124&path-prefix=ru',
			food: 15*2.3333,
			affinity: 200
		},
		'Шип червя смерти': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/34/Deathworm_Horn_%28Scorched_Earth%29.png/30px-Deathworm_Horn_%28Scorched_Earth%29.png',
            food: 300,
            affinity: 450
		},
		'Сера': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cf/Sulfur_%28Scorched_Earth%29.png/30px-Sulfur_%28Scorched_Earth%29.png',
            food: 25,
            affinity: 25
		},
		'Глина': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/37/Clay_%28Scorched_Earth%29.png/30px-Clay_%28Scorched_Earth%29.png',
            food: 25,
            affinity: 15
		},
		'Камень': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d4/Stone.png/30px-Stone.png',
            food: 50,
            affinity: 7
		},
		'Хитин': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a1/Chitin.png/30px-Chitin.png',
            food: 50,
            affinity: 50
		},
		'Пиво': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/43/Beer_Jar.png/30px-Beer_Jar.png',
            food: 45,
            affinity: 400
		},
		'Сладкий овощной кекс': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8c/Sweet_Veggie_Cake.png/30px-Sweet_Veggie_Cake.png',
            food: 250,
            affinity: 400
		},
		'Репеллент': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/47/Bug_Repellant.png/30px-Bug_Repellant.png',
            food: 25,
            affinity: 200
		},
		'Чёрный жемчуг': {
            icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4c/Black_Pearl.png/30px-Black_Pearl.png',
            food: 30,
            affinity: 50
		},
		'Сырое первосортное мясо-Tuso': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/09/Raw_Prime_Meat.png/30px-Raw_Prime_Meat.png',
            food: 50,
            affinity: 15
		},
		'Сырая первосортная рыба-Tuso': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/98/Raw_Prime_Fish_Meat.png/30px-Raw_Prime_Fish_Meat.png',
            food: 25,
            affinity: 6
		},
		'Жареное первосортное мясо-Tuso': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Cooked_Meat.png/30px-Cooked_Meat.png',
            food: 50,
            affinity: 7.5
		},
		'Сырое мясо-Tuso': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e9/Raw_Meat.png/30px-Raw_Meat.png',
            food: 50,
            affinity: 5
		},
		'Сырая рыба-Tuso': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/31/Raw_Fish_Meat.png/30px-Raw_Fish_Meat.png',
            food: 25,
            affinity: 2
		},
		'Жареное мясо-Tuso': {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Cooked_Meat.png/30px-Cooked_Meat.png',
            food: 50,
            affinity: 2.5
		}

	}
 
	var foodprioritylist=[
		'Корм-Общий',
		'Корм-Носорог',
		'Корм-Диплодок',
		'Корм-Гигантопитек',
		'Корм-Бронтозавр',
		'Корм-Мозазавр',
		'Корм-Archa',
		'Сырое первосортное мясо',
		'Сырое первосортное мясо-Компи',
		'Жареное первосортное мясо',
		'Вяленое первосортное мясо',
		'Ж/В первосортное мясо',
		'Сырое мясо',
		'Жареное мясо',
		'Вяленое мясо',
		'Сырая первосортная рыба',
		'Жареная первосортная рыба',
		'Сырая рыба',
		'Жареная рыба',
		'Овощи',
		'Межоберри',
		'Ягоды',
		'Протухшее мясо',
		'Редкий гриб',
		'Семена Растения Икс',
		'Семена Растения Уай',
		'Яйцо Гигантозавра',
		'Яйцо Кетцалькоатля',
		'Яйцо Тираннозавра',
		'Яйцо Спинозавра',
		'Яйцо Бронтозавра',
		'Яйцо Карнотавра',
		'Яйцо Додо',
		'Большие фекалии животных',
		'Средние фекалии животных',
		'Маленькие фекалии животных',
		'Человеческие фекалии',
		'Гель удильщика',
		'Отвар Просвещения',
		'Редкий цветок',
		'Шип червя смерти',
		'Сераэб',
		'Глина',
		'Камень',
		'Хитин',
		'Пиво',
		'Корм-Megalo',
		'Сладкий овощной кекс',
		'Репеллент',
		'Чёрный жемчуг',
		'Сырое первосортное мясо-Tuso',
		'Сырая первосортная рыба-Tuso',
		'Жареное первосортное мясо-Tuso',
		'Сырое мясо-Tuso',
		'Сырая рыба-Tuso',
		'Жареное мясо-Tuso'
	];
 
    var komethods={

		'Рогатка': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_DoubleTorp",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 14,
			torpor: 14*1.75,
			usesmeleedam: false,
			usesweapondam: true,
			time: 0
		},
		'Лук': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_Tranq",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 20,
			torpor: 20*2+20*2.5,
			usesmeleedam: false,
			usesweapondam: true,
			time: 5
		},
 
		'Арбалет': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_Tranq",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 35,
			torpor: 35*2+35*2.5,
			usesmeleedam: false,
			usesweapondam: true,
			time: 5
		},
 
		'Длинная винтовка': {
			damagetypes: [
				"DmgType_ProjectileWithImpactFX_TranqMore",
				"DmgType_ProjectileWithImpactFX",
				"DmgType_Projectile"
			],
			damage: 26,
			torpor: 26*6+26*2.5,
			usesmeleedam: false,
			usesweapondam: true,
			time: 5
		},
		'Кулаки': {
			damagetypes: [
				"DmgType_Melee_Torpidity_SelfHurt",
				"DmgType_Melee_Torpidity_StoneWeapon",
				"DmgType_Melee_Torpidity",
				"DmgType_Melee_Human",
				"DmgType_Melee"
			],
			damage: 8,
			torpor: 8*1.75,
			usesmeleedam: true,
			usesweapondam: false,
			time: 0
		},
		'Дубинка': {
			damagetypes: [
				"DmgType_Melee_HighTorpidity_StoneWeapon_Club",
				"DmgType_Melee_HighTorpidity_StoneWeapon",
				"DmgType_Melee_Torpidity_StoneWeapon",
				"DmgType_Melee_Torpidity",
				"DmgType_Melee_Human",
				"DmgType_Melee"
			],
			damage: 5,
			torpor: 5*3.75,
			usesmeleedam: true,
			usesweapondam: true,
			time: 0
		},
		'Электрошокер': {
			damagetypes: [
				"DmgType_Melee_Human_ElectricStun",
				"DmgType_Melee_Human",
				"DmgType_Melee"
			],
			damage: 1,
			torpor: 1*500,
			usesmeleedam: false,
			usesweapondam: true,
			time: 0
		},
		'Скорпион': {
			damagetypes: [
				"DmgType_Melee_TorpPoison",
				"DmgType_Melee_Dino_Carnivore_Small",
				"DmgType_Melee_Dino_Carnivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 15,
			torpor: 15*3,
			usesmeleedam: true,
			usesweapondam: false,
			time: 10
		},
		'Жаба (Основная)': {
			damagetypes: [
				"DmgType_Melee_TorpPoison_ChitinPaste",
				"DmgType_Melee_TorpPoison",
				"DmgType_Melee_Dino_Carnivore_Small",
				"DmgType_Melee_Dino_Carnivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 12,
			torpor: 12*3,
			usesmeleedam: true,
			usesweapondam: false,
			time: 10
		},
		'Жаба (Вторичная)': {
			damagetypes: [
				"DmgType_Melee_TorpPoison_ChitinPaste",
				"DmgType_Melee_TorpPoison",
				"DmgType_Melee_Dino_Carnivore_Small",
				"DmgType_Melee_Dino_Carnivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 20,
			torpor: 20*3,
			usesmeleedam: true,
			usesweapondam: false,
			time: 10
		},
		'Пахи (Основная)': {
			damagetypes: [
				"DmgType_Melee_Dino_Herbivore_Small_LargeTorp",
				"DmgType_Melee_Dino_Herbivore_Small",
				"DmgType_Melee_Dino_Herbivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 10,
			torpor: 10*1,
			usesmeleedam: true,
			usesweapondam: false,
			time: 0
		},
		'Пахи (Разбег)': {
			damagetypes: [
				"DmgType_Melee_Dino_Herbivore_Small_HugeTorp",
				"DmgType_Melee_Dino_Herbivore_Small",
				"DmgType_Melee_Dino_Herbivore",
				"DmgType_Melee_Dino",
				"DmgType_Melee"
			],
			damage: 17,
			torpor: 17*3.5,
			usesmeleedam: true,
			usesweapondam: false,
			time: 0
		}
 
	};
 
	var narcoticsmethods={
		"Наркотик": {
			torpor: 40,
			time: 8,
			rate: 5
		},
		"Наркоберри": {
			torpor: 7.5,
			time: 3,
			rate: 2.5
		}
	}
 
	var listCreatures={
 
		Аллозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ef/Allosaurus_Icon.png/30px-Allosaurus_Icon.png',			
			foodrate: -0.001852*180.063385,
			basetorpor: 1000.0,
			basetorporrate: -0.1*8.0,
			torporperlevel: 0.06,
			baseaffinity: 2400.0,
			affinityperlevel: 100,
			ineffectbyaff: 1.875,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Диплодока',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		}, 
		Анкилозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4e/Ankylo_Icon.png/30px-Ankylo_Icon.png',
			foodrate: -0.003156*176.03154,
			basetorpor: 420,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 3000,
			affinityperlevel: 150,
			ineffectbyaff: 0.2,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Дилофозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Аргентавис: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/90/Argentavis_Icon.png/30px-Argentavis_Icon.png',
			foodrate: -0.001852*199.983994,
			basetorpor: 600,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 2000,
			affinityperlevel: 100,
			ineffectbyaff: 1.875,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Стегозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.5,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Аранео: {
			icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/29/Araneo_Icon.png/30px-Araneo_Icon.png',
			foodrate: -0.001736*864.055298,
			baseaffinity: 4000,
			affinityperlevel: 120,
			ineffectbyaff: 4.166667,
			basefood: 'Протухшее мясо',
			foods: ['Протухшее мясо'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.0
		},
		Артроплевра: {
			icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fb/Arthropluera_Icon.png/30px-Arthropluera_Icon.png',
			foodrate: -0.001543*648.088135,
			baseaffinity: 3000.0,
			affinityperlevel: 75.0,
			ineffectbyaff: 2.5,
			basefood: 'Протухшее мясо',
			foods: ['Сырое мясо', 'Протухшее мясо', 'Отвар Просвещения'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.6
		},
		Археоптерикс: {
		    icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1c/Archaeopteryx_Icon.png/30px-Archaeopteryx_Icon.png',
            foodrate: -1.49999999,
            basetorpor: 100,
            basetorporrate: -0.8333,
            torporperlevel: 0.06,
            baseaffinity: 500,
            affinityperlevel: 22.5,
            ineffectbyaff: 1.333333,
            basefood: 'Хитин',
            foods: ['Хитин', 'Корм-Archa'],
            kibble: 'Пелагорниса',
            tamingmethods: ["Стандарт"],
            damagemultipliers: {
                "DmgType_Projectile": 1.5
            },
            hitboxes: {
                "Тело": 1,
                "Голова": 3
            }
        },

		Ахатина:{
		    icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f8/Achatina_Icon.png/30px-Achatina_Icon.png',
            foodrate: -1.5555555556,
            basetorpor: 50,
            basetorporrate: -0.3,
            torporperlevel: 0.06,
            baseaffinity: 4250,
            affinityperlevel: 147,
            ineffectbyaff: 0.5,
            basefood: 'Сладкий овощной кекс',
            foods: ['Сладкий овощной кекс'],
            tamingmethods: ['Стандарт'],
            damagemultipliers: {
                "DmgType_Projectile": 1
            },
            hitboxes: {
                "Тело": 1,
                "Хвост": 0.5,
                "Раковина": 0.1
            }    
        },
        Богомол: {
			icon:'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/52/Mantis_Icon.png/30px-Mantis_Icon.png',
            foodrate: -0.83304,
            baseaffinity: 1800.0,
            affinityperlevel: 75,
            ineffectbyaff: 2.5,
			basefood: 'Шип червя смерти',
			foods: ['Шип червя смерти'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.0
		},
		"Большерогий олень": {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/51/Megaloceros_Icon.png/30px-Megaloceros_Icon.png',
			foodrate: -0.001543*432.058746,
			basetorpor: 175,
			basetorporrate: -0.1*2.915,
			torporperlevel: 0.06,
			baseaffinity: 1200,
			affinityperlevel: 60,
			ineffectbyaff: 0.5,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Диморфодона',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1.0000,
				"Голова": 2.5
			}
		},
 
		Бронтозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/54/Bronto_Icon.png/30px-Bronto_Icon.png',
			foodrate: -0.007716*180.001144,
			basetorpor: 1900,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 10000,
			affinityperlevel: 500,
			ineffectbyaff: 0.06,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Бронтозавр'],
			kibble: 'Карбонемиса',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Галлимим: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/66/Gallimimus_Icon.png/30px-Gallimimus_Icon.png',
			foodrate: -0.001929*432.002777,
			basetorpor: 420.0,
			basetorporrate: -1.67*2.5,
			torporperlevel: 0.06,
			baseaffinity: 2200.0,
			affinityperlevel: 95.0,
			ineffectbyaff: 0.4,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Диметродона',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 2
			}
		},
 
		Гигантозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d2/Giganotosaurus_Icon.png/30px-Giganotosaurus_Icon.png',
			foodrate: -0.002314*160.056335,
			basetorpor: 10000,
			basetorporrate: -25.0*4.8,
			torporperlevel: 0.06,
			baseaffinity: 5000,
			affinityperlevel: 160,
			ineffectbyaff: 1.25,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Кетцалькоатля',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},

		Гигантопитек: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1f/Gigantopithecus_Icon.png/30px-Gigantopithecus_Icon.png',
			foodrate: -0.004156*176.03154,
			baseaffinity: 4600.0,
			affinityperlevel: 75,
			ineffectbyaff: 2.5,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Корм-Гигантопитек'],
			kibble: 'Титанобоа',
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 0.5, //2 in devkit
			nonviolentfoodaffinitymultiplier: 1.65
		},
 
        "Горный элементаль": {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a2/Rock_Elemental_Icon.png/30px-Rock_Elemental_Icon.png',
            foodrate: -0.45790118805,
            basetorpor: 5E3,
            basetorporrate: -0.325,
            torporperlevel: 0.02,
            baseaffinity: 6500,
            affinityperlevel: 325,
            ineffectbyaff: 3,
			basefood: 'Корм-Archa',
			foods: ['Корм-Archa', 'Сера', 'Глина', 'Камень'],
			kibble: 'Богомола',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1
			}
		},
        Гриф: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a7/Vulture_Icon.png/30px-Vulture_Icon.png',
            foodrate: -1.49999999,
            baseaffinity: 655,
            affinityperlevel: 45,
            ineffectbyaff: 4.166666,
			basefood: 'Протухшее мясо',
			foods: ['Протухшее мясо'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.6
		},
		Дилофозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Dilo_Icon.png/30px-Dilo_Icon.png',
			foodrate: -0.000868*1728.110596,
			basetorpor: 75,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 450,
			affinityperlevel: 22.5,
			ineffectbyaff: 8.333333,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Диметродон: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/cd/Dimetrodon_Icon.png/30px-Dimetrodon_Icon.png',
			foodrate: -0.001736*160.010239,
			basetorpor: 750.0,
			basetorporrate: -10.0*2.5,
			torporperlevel: 0.06,
			baseaffinity: 1500.0,
			affinityperlevel: 90.0,
			ineffectbyaff: 2.5,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Кетцалькоатля',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Диморфодон: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f9/Dimorphodon_Icon.png/30px-Dimorphodon_Icon.png',
			foodrate: -0.001302*1152.07373,
			basetorpor: 100,
			basetorporrate: -0.1*8.333,
			torporperlevel: 0.06,
			baseaffinity: 900,
			affinityperlevel: 45,
			ineffectbyaff: 4.166666,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
		Диплодок: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/38/Diplodocus_Icon.png/30px-Diplodocus_Icon.png',
			foodrate: -1.3888888271,
			basetorpor: 3000,
			basetorporrate: -0.75,
			torporperlevel: 0.06,
			baseaffinity: 7500,
			affinityperlevel: 375,
			ineffectbyaff: 0.8,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Диплодок'],
			kibble: 'Листрозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
		"Диплодок (Не насильственно)": {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/38/Diplodocus_Icon.png/30px-Diplodocus_Icon.png',
			foodrate: -1.3888888271,
			baseaffinity: 7500,
			affinityperlevel: 375,
			ineffectbyaff: 0.8,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Корм-Диплодок'],
			kibble: 'Листрозавра',
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 0.5,
			nonviolentfoodaffinitymultiplier: 3
		},
		Диплокаулус:{
		    icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/74/Diplocaulus_Icon.png/30px-Diplocaulus_Icon.png',
            foodrate: -0.347175,
            basetorpor: 220,
            basetorporrate: -0.3,
            torporperlevel: 0.06,
            baseaffinity: 2E3,
            affinityperlevel: 75,
            ineffectbyaff: 2.5,
			basefood: 'Корм',
			foods: ['Корм', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Сырое мясо'],
			kibble: 'Археоптерикса',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1
			}
		},
		Додо: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/95/Dodo_Icon.png/30px-Dodo_Icon.png',
			foodrate: -0.000868*2880.184326,
			basetorpor: 30,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 450,
			affinityperlevel: 22.5,
			ineffectbyaff: 1.333333,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Доедикурус: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/91/Doedicurus_Icon.png/30px-Doedicurus_Icon.png',
			foodrate: -0.003156*176.03154,
			basetorpor: 800,
			basetorporrate: -0.1*7.5,
			torporperlevel: 0.06,
			baseaffinity: 4000,
			affinityperlevel: 150,
			ineffectbyaff: 0.2,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Дилофозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Дунклеостей: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f3/Dunkleosteus_Icon.png/30px-Dunkleosteus_Icon.png',
			foodrate: -0.001852*199.983994,
			basetorpor: 1150.0,
			basetorporrate: -2.0*0.5,
			torporperlevel: 0.06,
			baseaffinity: 1300.0,
			affinityperlevel: 60.0,
			ineffectbyaff: 3.275,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Титанобоа',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DamageType": 0.275,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Жаба: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f6/Frog_Icon.png/30px-Frog_Icon.png',
			foodrate: -0.001929*648.00415,
			basetorpor: 200,
			basetorporrate: -0.1*6.666,
			torporperlevel: 0.06,
			baseaffinity: 1800.000,
			affinityperlevel: 75,
			ineffectbyaff: 0.4,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Скорпиона',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Ихтиозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/23/Ichthy_Icon.png/30px-Ichthy_Icon.png',
			foodrate: -0.001929*420.0,
			baseaffinity: 1500,
			affinityperlevel: 75,
			ineffectbyaff: 2.5,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Додо',
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.5,
			nonviolentfoodaffinitymultiplier: 1.6
		},
 
		Каируку: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a1/Kairuku_Icon.png/30px-Kairuku_Icon.png',
			foodrate: -0.001389*1079.913574,
			basetorpor: 300,
			basetorporrate: -0.1*10.0,
			torporperlevel: 0.06,
			baseaffinity: 900,
			affinityperlevel: 45,
			ineffectbyaff: 4.166667,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Карбонемис: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f5/Carbonemys_Icon.png/30px-Carbonemys_Icon.png',
			foodrate: -0.003156*352.06308,
			basetorpor: 275,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 3000,
			affinityperlevel: 150,
			ineffectbyaff: 0.2,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Птеранодона',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1,
				"Shell": 0.2,
				"Tail": 0.5
			}
		},
 
		Карнотавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/72/Carno_Icon.png/30px-Carno_Icon.png',
			foodrate: -0.001852*199.983944,
			basetorpor: 350,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 2000,
			affinityperlevel: 100,
			ineffectbyaff: 1.875,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Анкилозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Кастороидес: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b9/Castoroides_Icon.png/30px-Castoroides_Icon.png',
			foodrate: -0.002314*160.056335,
			basetorpor: 350,
			basetorporrate: -0.1*15.0,
			torporperlevel: 0.06,
			baseaffinity: 2000,
			affinityperlevel: 100,
			ineffectbyaff: 0.3,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Галлимима',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
        Капрозух: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/17/Kaprosuchus_Icon.png/30px-Kaprosuchus_Icon.png',
            foodrate: -0.9999999923,
            basetorpor: 200,
            basetorporrate: -0.3,
            torporperlevel: 0.06,
            baseaffinity: 2E3,
            affinityperlevel: 75,
            ineffectbyaff: 2.5,
			basefood: 'Корм-Общий',
			foods: ['Корм-Общий', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Сырое мясо'],
			kibble: 'Тапежара',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1
			}
		},
		Кетцалькоатль: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/37/Quetzal_Icon.png/30px-Quetzal_Icon.png',
			foodrate: -0.0035*140.0,
			basetorpor: 1850.0,
			basetorporrate: -0.2*17,
			torporperlevel: 0.06,
			baseaffinity: 6850,
			affinityperlevel: 300,
			ineffectbyaff: 0.9375,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Тираннозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.2,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Компи: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/f5/Compy_Icon.png/30px-Compy_Icon.png',
			foodrate: -0.000868*1728.110596,
			basetorpor: 25,
			basetorporrate: -0.1*13.0,
			torporperlevel: 0.06,
			baseaffinity: 500.0,
			affinityperlevel: 65.0,
			ineffectbyaff: 8.333333,
			basefood: 'Сырое первосортное мясо-Компи',
			foods: ['Сырое первосортное мясо-Компи'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
		
		Листрозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/96/Lystrosaurus_Icon.png/30px-Lystrosaurus_Icon.png',
			foodrate: -0.000868*2880.184326,
			baseaffinity: 2000.0,
			affinityperlevel: 22.5,
			ineffectbyaff: 1.333333,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Редкий цветок'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.6
		}, 
		
		Лютоволк: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/95/Direwolf_Icon.png/30px-Direwolf_Icon.png',
			foodrate: -0.444444462455,
			basetorpor: 450,
			basetorporrate: -0.1*5.0,
			torporperlevel: 0.06,
			baseaffinity: 1200,
			affinityperlevel: 60,
			ineffectbyaff: 3.125,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Карнотавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 2.5
			}
		},
 
		Манта: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/54/Manta_Icon.png/30px-Manta_Icon.png',
			foodrate: -0.001929*420.0,
			baseaffinity: 1500.0,
			affinityperlevel: 75.0,
			ineffectbyaff: 2.5,
			basefood: 'Гель удильщика',
			foods: ['Гель удильщика'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.5,
			nonviolentfoodaffinitymultiplier: 1.6
		},

		Мамонт: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/f/fe/Mammoth_Icon.png/30px-Mammoth_Icon.png',
			foodrate: -0.004133*192.027771,
			basetorpor: 550,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 5000,
			affinityperlevel: 250,
			ineffectbyaff: 0.12,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Раптора',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Мегалодон: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9d/Megalodon_Icon.png/30px-Megalodon_Icon.png',
			foodrate: -0.001852*199.983994,
			basetorpor: 800,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 2000,
			affinityperlevel: 100,
			ineffectbyaff: 1.875,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Спинозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Мезопитек: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4b/Mesopithecus_Icon.png/30px-Mesopithecus_Icon.png',
			foodrate: -0.000868*2880.184326,
			baseaffinity: 2200,
			affinityperlevel: 65,
			ineffectbyaff: 2.5,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Корм-Общий'],
			kibble: 'Додо',
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2,
			nonviolentfoodaffinitymultiplier: 1.65
		},
 
		Мозазавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/72/Mosasaurus_Icon.png/30px-Mosasaurus_Icon.png',
			foodrate: -0.005*180.001144,
			basetorpor: 3000,
			basetorporrate: -0.4*32.0,
			torporperlevel: 0.06,
			baseaffinity: 11000,
			affinityperlevel: 600,
			ineffectbyaff: 0.06,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Мозазавр'],
			kibble: 'Кетцалькоатля',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
        Мореллатопс: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/db/Morellatops_Icon.png/30px-Morellatops_Icon.png',
            foodrate: -1.11111112153,
            basetorpor: 315,
            basetorporrate: -0.3,
            torporperlevel: 0.06,
            baseaffinity: 3E3,
            affinityperlevel: 150,
            ineffectbyaff: 0.2,
			basefood: 'Корм-Общий',
			foods: ['Корм-Общий', 'Овощи', 'Межоберри', 'Ягоды'],
			kibble: 'Грифа',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1
			}
		},
		Овираптор: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/68/Oviraptor_Icon.png/30px-Oviraptor_Icon.png',
			foodrate: -0.001302*768.049133,
			basetorpor: 125.0,
			basetorporrate: -0.1*2.08,
			torporperlevel: 0.06,
			baseaffinity: 960.0,
			affinityperlevel: 42.0,
			ineffectbyaff: 16.666668,
			basefood: 'Яйцо Додо',
			foods: ['Яйцо Додо', 'Яйцо Гигантозавра', 'Яйцо Кетцалькоатля', 'Яйцо Тираннозавра', 'Яйцо Спинозавра', 'Яйцо Бронтозавра', 'Яйцо Карнотавра'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Оникониктерис: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d1/Bat_Icon.png/30px-Bat_Icon.png',
			foodrate: -0.002893*192.034409,
			baseaffinity: 3000,
			affinityperlevel: 90,
			ineffectbyaff: 2.5,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.0
		},
 
		Паразавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bc/Parasaur_Icon.png/30px-Parasaur_Icon.png',
			foodrate: -0.001929*864.005554,
			basetorpor: 150,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 1500,
			affinityperlevel: 75,
			ineffectbyaff: 0.4,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 2
			}
		},
 
		Парацератерий: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/ee/Paraceratherium_Icon.png/30px-Paraceratherium_Icon.png',
			foodrate: -0.0035*327.6474,
			basetorpor: 1300.0,
			basetorporrate: -0.1*9.025,
			torporperlevel: 0.06,
			baseaffinity: 6500.0,
			affinityperlevel: 325.0,
			ineffectbyaff: 0.0923,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Пахицефалозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
        Пахиринозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/7a/Pachyrhinosaurus_Icon.png/30px-Pachyrhinosaurus_Icon.png',
            foodrate: -1.111111,
            basetorpor: 250,
            basetorporrate: -3.5,
            torporperlevel: 0.06,
            baseaffinity: 4625,
            affinityperlevel: 172,
            ineffectbyaff: 1.5,
			basefood: 'Репеллент',
			foods: ['Репеллент', 'Овощи', 'Межоберри', 'Ягоды'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 0.2
			}
		},
		Пахицефалозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8e/Pachy_Icon.png/30px-Pachy_Icon.png',
			foodrate: -0.001543*648.088135,
			basetorpor: 160.0,
			basetorporrate: -0.1*2.666,
			torporperlevel: 0.06,
			baseaffinity: 1200.0,
			affinityperlevel: 60.0,
			ineffectbyaff: 0.5,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Дилофозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 0.125
			}
		},
        Пегомастакс: {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5e/Pegomastax_Icon.png/30px-Pegomastax_Icon.png',
            foodrate: -2.49999999497,
            baseaffinity: 1350,
            affinityperlevel: 22.5,
            ineffectbyaff: 1.333333,
			basefood: 'Овощи',
			foods: ['Овощи', 'Межоберри', 'Ягоды'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.6
		},
		Пелагорнис: {
            icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3d/Pelagornis_Icon.png/30px-Pelagornis_Icon.png',
			foodrate: -0.001543*216.029373,
			basetorpor: 120.0,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 1200.0,
			affinityperlevel: 60.0,
			ineffectbyaff: 3.125,
			basefood: 'Сырая рыба',
			foods: ['Сырая рыба', 'Сырая первосортная рыба', 'Корм-Общий'],
			kibble: 'Компи',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
		
		Плезиозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/5a/Plesio_Icon.png/30px-Plesio_Icon.png',
			foodrate: -0.003858*180.001144,
			basetorpor: 1600,
			basetorporrate: -0.1*21.333332,
			torporperlevel: 0.06,
			baseaffinity: 5000,
			affinityperlevel: 250,
			ineffectbyaff: 0.75,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Тираннозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Прокоптодон: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/d/d5/Procoptodon_Icon.png/30px-Procoptodon_Icon.png',
			foodrate: -0.001929*648.00415,
			basetorpor: 350.0,
			basetorporrate: -0.1*6.666,
			torporperlevel: 0.034285714,
			baseaffinity: 3000.0,
			affinityperlevel: 150.0,
			ineffectbyaff: 0.2,
			basefood: 'Редкий гриб',
			foods: ['Редкий гриб', 'Семена Растения Икс'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Птеранодон: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/8f/Pteranodon_Icon.png/30px-Pteranodon_Icon.png',
			foodrate: -0.001543*216.029373,
			basetorpor: 120,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 1200,
			affinityperlevel: 60,
			ineffectbyaff: 3.125,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Додо',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.5,
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Раптор: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/64/Raptor_Icon.png/30px-Raptor_Icon.png',
			foodrate: -0.001543*648.088135,
			basetorpor: 180,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 1200,
			affinityperlevel: 60,
			ineffectbyaff: 3.125,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Паразавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		Саркозух: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a6/Sarco_Icon.png/30px-Sarco_Icon.png',
			foodrate: -0.001578*211.237854,
			basetorpor: 400,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 2000,
			affinityperlevel: 75,
			ineffectbyaff: 2.5,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Трицератопса',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Саблезуб: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/8/87/Sabertooth_Icon.png/30px-Sabertooth_Icon.png',
			foodrate: -0.001543*288.039185,
			basetorpor: 500,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 1200,
			affinityperlevel: 60,
			ineffectbyaff: 3.125,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Бронтозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
 
		"Свирепый медведь": {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/6/60/Direbear_Icon.png/30px-Direbear_Icon.png',
			foodrate: -0.003156*150.0,
			basetorpor: 1000,
			basetorporrate: -0.1*9.0,
			torporperlevel: 0.06,
			baseaffinity: 4000,
			affinityperlevel: 125,
			ineffectbyaff: 1.25,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Межоберри', 'Ягоды', 'Корм-Общий'],
			kibble: 'Карнотавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},	
 
		Скарабей: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b4/Dung_Beetle.png/30px-Dung_Beetle.png',
			foodrate: -0.001488*336.021515,
			baseaffinity: 900.0,
			affinityperlevel: 50.0,
			ineffectbyaff: 4.166667,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Протухшее мясо', 'Человеческие фекалии', 'Маленькие фекалии животных', 'Средние фекалии животных', 'Большие фекалии животных'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2,
			nonviolentfoodaffinitymultiplier: 1.0
		},
 
		Скорпион: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/1/1e/Pulmonoscorpius_Icon.png/30px-Pulmonoscorpius_Icon.png',
			foodrate: -0.001929*432.002777,
			basetorpor: 150,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 1500,
			affinityperlevel: 75,
			ineffectbyaff: 6.15, //2.5 in devkit
			basefood: 'Протухшее мясо',
			foods: ['Протухшее мясо'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Спинозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/a/a3/Spinosaur_Icon.png/30px-Spinosaur_Icon.png',
			foodrate: -0.002066*150.0,
			basetorpor: 850,
			basetorporrate: -0.1*21.333332,
			torporperlevel: 0.06,
			baseaffinity: 3200,
			affinityperlevel: 150,
			ineffectbyaff: 1.5,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Аргентависа',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Стегозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/0d/Stego_Icon.png/30px-Stego_Icon.png',
			foodrate: -0.005341*208.034286,
			basetorpor: 500,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 6000,
			affinityperlevel: 300,
			ineffectbyaff: 0.1,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Саркозуха',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 1.67
			}
		},
        Тапежара: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/4/4f/Tapejara_Icon.png/30px-Tapejara_Icon.png',
            foodrate: -0.333333322539,
            basetorpor: 450,
            basetorporrate: -0.3,
            torporperlevel: 0.06,
            baseaffinity: 2200.0,
            affinityperlevel: 100,
            ineffectbyaff: 3.125,
			basefood: 'Корм-Общий',
			foods: ['Корм-Общий', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Сырое мясо'],
			kibble: 'Аллозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1,
				"Голова":3
			}
		},
		Теризинозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/b1/Therizinosaurus_Icon.png/30px-Therizinosaurus_Icon.png',
            foodrate: -0.41666667289,
            basetorpor: 925,
            basetorporrate: -2.8333,
            torporperlevel: 0.06,
            baseaffinity: 6800.0,
            affinityperlevel: 160,
            ineffectbyaff: 0.06,
			basefood: 'Корм-Общий',
			foods: ['Корм-Общий', 'Овощи', 'Межоберри', 'Ягоды'],
			kibble: 'Мегалозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Голова":1
			}
		},
		Тираннозавр: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9b/Rex_Icon.png/30px-Rex_Icon.png',
			foodrate: -0.002314*180.063385,
			basetorpor: 1550,
			basetorporrate: -0.1*7.25,
			torporperlevel: 0.06,
			baseaffinity: 3450,
			affinityperlevel: 150,
			ineffectbyaff: 1.25,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Скорпиона',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},
 
		Трицератопс: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/9/9e/Trike_Icon.png/30px-Trike_Icon.png',
			foodrate: -0.003156*352.06308,
			basetorpor: 250,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 3000,
			affinityperlevel: 150,
			ineffectbyaff: 0.2,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Карнотавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		},
		Тусотеутис: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e4/Tusoteuthis_Icon.png/30px-Tusoteuthis_Icon.png',
            foodrate: -0.90000572,
            baseaffinity: 12500,
            affinityperlevel: 125,
            ineffectbyaff: 0.75,
			basefood: 'Чёрный жемчуг',
			foods: ['Чёрный жемчуг', 'Сырое первосортное мясо-Tuso', 'Жареное первосортное мясо-Tuso', 'Сырая первосортная рыба-Tuso', 'Сырое мясо-Tuso', 'Жареное мясо-Tuso', 'Сырая рыба-Tuso'],
			tamingmethods: ['Не насильственное'],
			nonviolentfoodratemultiplier: 2.0,
			nonviolentfoodaffinitymultiplier: 1.0
		},
        Тушканчик: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/30/Jerboa_Icon.png/30px-Jerboa_Icon.png',
            foodrate: -2.499999999,
            basetorpor: 30,
            basetorporrate: -0.3,
            torporperlevel: 0.06,
            baseaffinity: 1350,
            affinityperlevel: 22.5,
            ineffectbyaff: 1.333333,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Семена Растения Уай'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1
			}
		},
		Удильщик: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/22/Angler_Icon.png/30px-Angler_Icon.png',
			foodrate: -0.001852*149.988007,
			basetorpor: 900,
			basetorporrate: -7.0*0.4,
			torporperlevel: 0.06,
			baseaffinity: 1800.0,
			affinityperlevel: 90,
			ineffectbyaff: 2.5,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Каируку',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1
			}
		},		
 
		"Ужасная птица": {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/7/73/Terror_Bird_Icon.png/30px-Terror_Bird_Icon.png',
			foodrate: -0.001578*352.06308,
			basetorpor: 300,
			basetorporrate: -1.5*1.5,
			torporperlevel: 0.06,
			baseaffinity: 1600.0,
			affinityperlevel: 85.0,
			ineffectbyaff: 2.5,
			basefood: 'Сырое мясо',
			foods: ['Сырое мясо', 'Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Корм-Общий'],
			kibble: 'Галлимима',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8,
				"DmgType_Melee_Dino_Herbivore": 0.6
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
        Халикотерий: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/b/bd/Chalicotherium_Icon.png/30px-Chalicotherium_Icon.png',
            foodrate: -0.281648304,
            baseaffinity: 5E3,
            affinityperlevel: 275,
            ineffectbyaff: 0.16,
			basefood: 'Пиво',
			foods: ['Пиво'],
			tamingmethods: ['Не насильственное'],
            nonviolentfoodratemultiplier: 2,
            nonviolentfoodaffinitymultiplier: 1.6
		},
		Фиомия: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c4/Phiomia_Icon.png/30px-Phiomia_Icon.png',
			foodrate: -0.003156*1584.283936,
			basetorpor: 240,
			basetorporrate: -0.1*3,
			torporperlevel: 0.06,
			baseaffinity: 3000,
			affinityperlevel: 150,
			ineffectbyaff: 0.2,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи'],
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
		"Шипастый дракон": {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/51/Thorny_Dragon_Icon.png/30px-Thorny_Dragon_Icon.png',
            foodrate: -0.44444446245,
            basetorpor: 450,
            basetorporrate: -0.5,
            torporperlevel: 0.06,
            baseaffinity: 3E3,
            affinityperlevel: 150,
            ineffectbyaff: 1.5,
			basefood: 'Сырое первосортное мясо',
			foods: ['Сырое первосортное мясо', 'Ж/В первосортное мясо', 'Сырое мясо', 'Корм-Общий'],
			kibble: 'Верблюдозавра',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.0
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 2.5
			}
		},
        Шелкопряд: {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/0/00/Lymantria_Icon.png/30px-Lymantria_Icon.png',
            foodrate: -0.37037036,
            basetorpor: 550,
            basetorporrate: -0.3033,
            torporperlevel: 0.06,
            baseaffinity: 1800,
            affinityperlevel: 100,
            ineffectbyaff: 1.875,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Шипастого дракона',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Projectile": 1.5
			},
			hitboxes: {
				"Тело": 1,
				"Голова": 3
			}
		},
		"Шерстистый носорог": {
			icon: 'https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/ce/Woolly_Rhino_Icon.png/30px-Woolly_Rhino_Icon.png',
			foodrate: -0.003156*150.0*1.4,
			basetorpor: 600.0,
			basetorporrate: -0.1*9.0,
			torporperlevel: 0.06,
			baseaffinity: 3450.0,
			affinityperlevel: 125.0,
			ineffectbyaff: 1.25,
			basefood: 'Межоберри',
			foods: ['Межоберри', 'Ягоды', 'Овощи', 'Корм-Общий'],
			kibble: 'Ужасной птицы',
			tamingmethods: ['Стандарт'],
			damagemultipliers: {
				"DmgType_Melee_HighTorpidity_StoneWeapon": 0.66,
				"DmgType_Melee_Human": 0.8
			},
			hitboxes: {
				"Тело": 1
			}
		}
	}
 
    var selectCreature = '<select id="creature" onchange="calcTaming()">';
    for (var crt in listCreatures) {
        selectCreature += '<option value="' +  crt + '">'  +  crt + '</option>';    
    }
    selectCreature += '</select>';
    

if (resourcesCalcDiv = document.getElementById('TamingStatCalc')) {
    //Основная таблица
    mainTable = '<table class="wikitable" id="creatureTable" style="min-width:500px;">'+
    '<tbody><tr>'+
    '<th>Существо:</th>'+
    '<th><img id="iconCreature" src="' + creature.icon + '">' + selectCreature + '</th></tr>'+
    '<tr><th>Уровень:</th>'+
    '<th><input id="level" type="number" min="1" max="1094" maxlength="4" value="1" style="width:3em" onchange="calcTaming()"></th></tr>'+
    '<tr><th>Рейты приручения:</th>'+
    '<th><input id="tamingmultiplier" type="number" min="1" value="1" style="width:3em" onchange="calcTaming()"></th></tr>'+
    '<tr><th>Скорость голодания:</th>'+
    '<th><input id="foodratemultiplier" type="number" min="1" value="1" style="width:3em" onchange="calcTaming()"></th></tr>'+
    '</tbody></table>'+
    
    '<table class="wikitable" id="foodCreature" style="min-width:500px;">'+
    '<tbody></tbody></table>'+
    
    '<div class="tableheader tameCreature" onclick="showhidetable(\'tameCreature\')" style="width:500px; text-align:center; color:grey;"><b>Приручение</b><a><b> [Подробнее]</b></a></div>'+
    '<table class="wikitable" id="tameCreature" style="min-width:500px; display:none;">'+
    '<tbody></tbody></table></table>'+
    '<div class="tableender tameCreature" style="width:500px; text-align:center;"></div>'+
    
    '<div class="tableheader knockoutCreature" onclick="showhidetable(\'knockoutCreature\')" style="width:500px; text-align:center; color:grey;"><b>Оглушение</b><a><b> [Подробнее]</b></a></div>'+
    '<table class="wikitable" id="knockoutCreature" style="min-width:500px; display:none;">'+
    '<tbody></tbody></table></table>'+
    '<div class="tableender knockoutCreature" style="width:500px; text-align:center;"></div>'+
    
    '<div class="tableheader TimerTaming" onclick="showhidetable(\'TimerTaming\')" style="width:500px; text-align:center; color:grey;"><b>Таймер оглушения</b><a><b> [Подробнее]</b></a></div>'+
    '<table class="wikitable" id="TimerTaming" style="min-width:500px; display:none;">'+
    '<tbody></tbody></table></table>'+
    '<div class="tableender TimerTaming" style="width:500px; text-align:center;"></div>';
    
    document.getElementById('TamingStatCalc').innerHTML = mainTable;
 
    calcTaming();
}
 
function calcTaming(){
 
	texponent = 0.800403041; //0.829050872; //0.76593984; //0.827745067192723; //0.8107032;
	tcoefficient = 22.39671632; //25.7837826; //18.62553525; //24.7933173692763; //21.93040668;
 
    creaturedata = listCreatures[document.getElementById('creature').value];
    
    creature.name = document.getElementById('creature').value;
    creature.level = document.getElementById('level').value;
    creature.tamingmultiplier = document.getElementById('tamingmultiplier').value;
    creature.foodratemultiplier = document.getElementById('foodratemultiplier').value;
    creature.tamingmethod = creaturedata.tamingmethods[0];
    
	//iconCreature
	document.getElementById('iconCreature').src = creaturedata.icon;
 
    //fillfood
    creature.fillfood = creaturedata.foods[0];
 
    //requiredaffinity
    creature.requiredaffinity = creaturedata.baseaffinity + creaturedata.affinityperlevel * creature.level;
 
    //torpor
	creature.torpor = creaturedata.basetorpor + creaturedata.basetorpor * creaturedata.torporperlevel * (creature.level - 1);
 
	//torporrate
	creature.torporrate = creaturedata.basetorporrate + Math.pow( creature.level - 1 ,texponent) / (tcoefficient / creaturedata.basetorporrate);
	
	//narcoticstiming.currenttorpor
	narcoticstiming.currenttorpor = creature.torpor;
	
	maxfoodcalc();
	alltimescalc();
    resetfoods();
	foodCalc();
	tameCalc();
	effectivenessCalc();
	starvetimingcalc();
	
	FillTableFood();
    FillTableTame();
	if (creature.tamingmethod=="Стандарт") {
        var tableDisplay = document.getElementById('knockoutCreature');
        var theadDisplay = document.getElementsByClassName('tableheader knockoutCreature')[0];
        var EnderDisplay = document.getElementsByClassName('tableender knockoutCreature')[0];
        
        tableDisplay.style.display = "none";
        theadDisplay.style.display = "";
        EnderDisplay.style.display = "";

        tableDisplay = document.getElementById('TimerTaming');
        theadDisplay = document.getElementsByClassName('tableheader TimerTaming')[0];
        EnderDisplay = document.getElementsByClassName('tableender TimerTaming')[0];
        
        tableDisplay.style.display = "none";
        theadDisplay.style.display = "";
        EnderDisplay.style.display = "";

        knockoutcalc();
        FillTableKnockout();
        FillTableTimerTaming();
    }  

	if (creature.tamingmethod=="Не насильственное") {
        var tableDisplay = document.getElementById('knockoutCreature');
        var theadDisplay = document.getElementsByClassName('tableheader knockoutCreature')[0];
        var EnderDisplay = document.getElementsByClassName('tableender knockoutCreature')[0];
        
        tableDisplay.style.display = "none";
        theadDisplay.style.display = "none";
        EnderDisplay.style.display = "none";

        var tableDisplay = document.getElementById('TimerTaming');
        var theadDisplay = document.getElementsByClassName('tableheader TimerTaming')[0];
        var EnderDisplay = document.getElementsByClassName('tableender TimerTaming')[0];
        
        tableDisplay.style.display = "none";
        theadDisplay.style.display = "none";
        EnderDisplay.style.display = "none";

        knockoutcalc();
        FillTableKnockout();
    }  
    
}
 
function resetfoods() {
	for (var food in listFoods) {
		foodamounts[food]=0;
	}
}

function maxfoodcalc() {
	maxfoodamounts={};

	if (creature.tamingmethod=="Стандарт") {

		for (var food in listFoods) {
            maxfoodamounts[food]=Math.ceil(creature.requiredaffinity/listFoods[food].affinity/ (creature.tamingmultiplier * 2));
		}

	}

    if (creature.tamingmethod=="Не насильственное") {

        for (var food in listFoods) {
            maxfoodamounts[food]=Math.ceil(creature.requiredaffinity/listFoods[food].affinity/ (creature.tamingmultiplier * 2)/creaturedata.nonviolentfoodaffinitymultiplier);
		}

	}
}

function alltimescalc() {
		times={};

		if (creature.tamingmethod=="Стандарт") {
			creature.foodrate=listCreatures[creature.name].foodrate * creature.foodratemultiplier;
		}
		if (creature.tamingmethod=="Не насильственное") {
			creature.foodrate=listCreatures[creature.name].foodrate * creature.foodratemultiplier*listCreatures[creature.name].nonviolentfoodratemultiplier;
		}

		for (var food in maxfoodamounts) {
			times[food]=maxfoodamounts[food]*-listFoods[food].food/creature.foodrate;
		}

	}

function foodCalc(){
 
	foodamounts[creature.fillfood]=0;
	affinity=0;
	food=0;

	if (creature.tamingmethod=="Стандарт") {

		for (var i = 0; i < creaturedata.foods.length; i++) {
				
			affinity+=listFoods[creaturedata.foods[i]].affinity * creature.tamingmultiplier * 2*foodamounts[creaturedata.foods[i]];
			food-=listFoods[creaturedata.foods[i]].food*foodamounts[creaturedata.foods[i]];
		}
		foodamounts[creature.fillfood]=Math.max(Math.ceil((creature.requiredaffinity-affinity)/listFoods[creature.fillfood].affinity / (creature.tamingmultiplier * 2)),0);
		affinity+=listFoods[creature.fillfood].affinity * creature.tamingmultiplier * 2*foodamounts[creature.fillfood];
		food-=listFoods[creature.fillfood].food*foodamounts[creature.fillfood];
		creature.totalfood=-food;
		creature.suppliedaffinity=affinity;

        //totaltime
        totaltime=food/creaturedata.foodrate / creature.foodratemultiplier;
		}

	if (creature.tamingmethod=="Не насильственное") {

		for (var i = 0; i < creaturedata.foods.length; i++) {
			
			affinity+=listFoods[creaturedata.foods[i]].affinity * creature.tamingmultiplier * 2 *creaturedata.nonviolentfoodaffinitymultiplier*foodamounts[creaturedata.foods[i]];
			food-=listFoods[creaturedata.foods[i]].food*foodamounts[creaturedata.foods[i]];
		}
		foodamounts[creature.fillfood]=Math.max(Math.ceil((creature.requiredaffinity-affinity)/listFoods[creature.fillfood].affinity / (creature.tamingmultiplier * 2) /creaturedata.nonviolentfoodaffinitymultiplier),0);
		affinity+=listFoods[creature.fillfood].affinity * creature.tamingmultiplier * 2 *creaturedata.nonviolentfoodaffinitymultiplier*foodamounts[creature.fillfood];
		food-=listFoods[creature.fillfood].food*foodamounts[creature.fillfood];
		creature.totalfood=-food;
		creature.suppliedaffinity=affinity;
	//totaltime
	if (creature.tamingmethod=="Стандарт") {
		
		narcoticscalc();
	}

        //totaltime
		totaltime = food/creaturedata.foodrate / creature.foodratemultiplier/creaturedata.nonviolentfoodratemultiplier;
	}		
	
	tameCalc();
	effectivenessCalc();
	FillTableTame();
}

function narcoticscalc(){
        narcotics.buffertime = creature.torpor / -creature.torporrate;
        narcotics.max = Math.ceil(totaltime * -creature.torporrate / (40 - creature.torporrate * 8));
        narcotics.min = Math.max(Math.ceil((totaltime * -creature.torporrate - creature.torpor) / (40 - creature.torporrate * 8)), 0);
        narcotics.buffernarcotics = Math.ceil(creature.torpor / 40);
        narcotics.narcoticsbuffertime = 8 * narcotics.buffernarcotics;
        narcoticstimingcalc();
}

function tameCalc(){

    //narcoticsmethod
    narcoticsmethod = narcoticsmethods[narcotics.narcoticsmethod];
    
    //buffertime
    narcotics.buffertime = creature.torpor/-creature.torporrate;
    
    //max
    narcotics.max = Math.ceil(totaltime*-creature.torporrate/(narcoticsmethod.torpor-creature.torporrate*narcoticsmethod.time));
    
	//min
	narcotics.min=Math.max(Math.ceil((totaltime*-creature.torporrate-creature.torpor)/(narcoticsmethod.torpor-creature.torporrate*narcoticsmethod.time)), 0);
	
	//buffernarcotics
	narcotics.buffernarcotics=Math.ceil(creature.torpor/narcoticsmethod.torpor);
	narcotics.narcoticsbuffertime=narcoticsmethod.time*narcotics.buffernarcotics;
}

function effectivenessCalc(){
	var fedfood={};
	var effectiveness=100;
	for (var food in listFoods) {
		fedfood[food]=0;
	}


	if (creature.tamingmethod=="Стандарт") {

		for (var i = 0; i < foodprioritylist.length; i++) {
			var food=foodprioritylist[i];
			while (fedfood[food]<foodamounts[food]) {
				fedfood[food]++;
				effectiveness-=Math.pow(effectiveness, 2)*creaturedata.ineffectbyaff/listFoods[food].affinity/(creature.tamingmultiplier * 2)/100;
			}
		}

	}
	
	if (creature.tamingmethod=="Не насильственное") {

		for (var i = 0; i < foodprioritylist.length; i++) {
			var food=foodprioritylist[i];
			while (fedfood[food]<foodamounts[food]) {
				fedfood[food]++;
				effectiveness-=Math.pow(effectiveness, 2)*creaturedata.ineffectbyaff/listFoods[food].affinity/(creature.tamingmultiplier * 2)/creaturedata.nonviolentfoodaffinitymultiplier/100;
			}
		}

	}
	
	creature.effectiveness=effectiveness;
	creature.extralevels=Math.floor(creature.level*0.5*creature.effectiveness/100);
    
}

function knockoutcalc() {
	var komethod=komethods[ko.komethod];
	ko.koquantities={};

	for (hitbox in listCreatures[creature.name].hitboxes) {
		var torpor=komethod.torpor*listCreatures[creature.name].hitboxes[hitbox];
		var damage=komethod.damage*listCreatures[creature.name].hitboxes[hitbox];
		if (komethod.usesmeleedam) {
			torpor*=ko.komeleedam/100;
			damage*=ko.komeleedam/100;
		}
		if (komethod.usesweapondam) {
			torpor*=ko.koweapondam/100;
			damage*=ko.koweapondam/100;
		}
		for (i=0; i<komethod.damagetypes.length; i++) {
			if (komethod.damagetypes[i] in listCreatures[creature.name].damagemultipliers) {
				torpor*=listCreatures[creature.name].damagemultipliers[komethod.damagetypes[i]];
				damage*=listCreatures[creature.name].damagemultipliers[komethod.damagetypes[i]];
			}
		}
		ko.kotorpor[hitbox]=torpor;
		ko.kodamage[hitbox]=damage;
		ko.koquantities[hitbox]=Math.ceil(creature.torpor/torpor);
		ko.kotimes[hitbox]=ko.koquantities[hitbox]*komethod.time;
		
	}
}

//Таймер оглушения
//Версия 2.0
/*
function narcoticstimingcalc() {
		var narcoticsmethod=narcoticsmethods[narcotics.narcoticsmethod];
		var narcoticstimes=narcoticstiming.narcoticstimes;
		narcoticstiming.currenttorpor=Math.min(narcoticstiming.currenttorpor, creature.torpor);
		var suppliedtime=0;
		var suppliedtorpor=0;
		for (method in narcoticstimes) {
			if (!narcoticstimes.hasOwnProperty(method)) {
				continue;
			}
			if (narcoticstiming.currenttorpor+suppliedtorpor+(narcoticstimes[method]*narcoticsmethod.rate)>creature.torpor) {
				//Here we check if the current method brings us over the max possible torpor, and cut off the time if it does
				suppliedtime+=(creature.torpor-narcoticstiming.currenttorpor+suppliedtorpor)/narcoticsmethod.rate;
				suppliedtorpor=creature.torpor-narcoticstiming.currenttorpor;
				break;
			} else {
				suppliedtime+=narcoticstimes[method];
				suppliedtorpor+=narcoticstimes[method]*narcoticsmethod.rate;
			}
		}
		narcoticstiming.topupnarcotics=Math.ceil((creature.torpor-narcoticstiming.currenttorpor-suppliedtorpor)/narcoticsmethod.torpor);
		narcoticstiming.buffertime=(narcoticstiming.currenttorpor+suppliedtorpor)/-creature.torporrate;
		narcoticstiming.narcoticsbuffertime=suppliedtime;
		
		
	}*/
//Версия 3.0
function narcoticstimingcalc() {
        narcoticstiming.currenttorpor = Math.min(narcoticstiming.currenttorpor, creature.torpor);
        narcoticstiming.topupnarcotics = Math.ceil((creature.torpor - narcoticstiming.currenttorpor) / 40);
        narcoticstiming.buffertime = narcoticstiming.currenttorpor / -creature.torporrate;
        narcoticstiming.narcoticsbuffertime = 8 * narcoticstiming.topupnarcotics
    }

function supplynarcotic() {
        narcoticstiming.supplynarcoticamount = parseFloat(document.getElementById('useNarcotic').value);
		var narcoticsmethod=narcoticsmethods[narcotics.narcoticsmethod];
		var narcoticstimes=narcoticstiming.narcoticstimes;
		narcoticstimes[narcotics.narcoticsmethod]+=narcoticstiming.supplynarcoticamount*narcoticsmethod.time;
		//Из новой версии
        narcoticstiming.narcoticsduration += narcoticstiming.supplynarcoticamount * 8;
        narcoticstiming.narcoticssupplied += narcoticstiming.supplynarcoticamount

	}

function narcoticstimer() {
		
		objTimer = narcotics.buffertime;
		
		timerBuffer();
		
}
//----

function starvetimingcalc(){
        var _0x3a82x10 = Math.min(creature.totalfood, starvetiming.maxfood);
        if (starvetiming.currentfood > starvetiming.maxfood) {
            scope.starvetiming.currentfood = starvetiming.maxfood;
        }
        starvetiming.starvetime = (_0x3a82x10 - (starvetiming.maxfood - starvetiming.currentfood)) / -listCreatures[creature.name].foodrate / creature.foodratemultiplier;
        starvetiming.starvetime = Math.max(starvetiming.starvetime, 0);
        starvetiming.tametime = (creature.totalfood - (starvetiming.maxfood - starvetiming.currentfood)) / -listCreatures[creature.name].foodrate / creature.foodratemultiplier;
        starvetiming.tametime = Math.max(starvetiming.tametime, 0);
}

function starvetimer(){
        if (starvetiming.time == true) {
            starvetiming.intervalid = _0x3a82x3(function() {
                starvetiming.currentfood += listCreatures[creature.name].foodrate * creature.foodratemultiplier;
                starvetimingcalc();
                if (starvetiming.alarm == 1 && starvetiming.starvetime / 60 < starvetiming.alarmthreshold) {
                    starvetiming.alarm = 0;
                    var audio = new Audio(_0x1bd9[228]);
                    audio.volume = 0.3;
                    audio.play();
                }
            }, 1000);
        } else {
            cancel(starvetiming.intervalid);
            starvetiming.intervalid = null;
        }    
}

function FillTableFood(){
    
    //Таблица еды
    var q=0;
    FoodTable = document.getElementById('foodCreature').tBodies[0];
 
    FoodTable.innerHTML = "<tr><th>Еда</th><th>Макс.</th><th>Кол.</th><th>Время</th></tr>";
	
	for (var i = 0; i < creaturedata.foods.length; i++){
		
		//NameFood
		if (creaturedata.foods[i].substring(0,4) == 'Корм'){
			NameFood = 'Корм (Яйцо ' + creaturedata.kibble + ')';
		}
		else {
			NameFood = creaturedata.foods[i];
		}		 
		
        if (creature.tamingmethod=="Стандарт") {
            q=0;
        //Quantity
            QuantityFood = Math.max(Math.ceil(creature.requiredaffinity/listFoods[creaturedata.foods[i]].affinity / (creature.tamingmultiplier * 2)),0);
 
            if (creaturedata.foods[i]==creature.fillfood){
                q = QuantityFood; 
            }
            
            //time
            time = QuantityFood*-listFoods[creaturedata.foods[i]].food/creaturedata.foodrate;            
            //totaltime
            totaltime = food/creaturedata.foodrate;
        }

        if (creature.tamingmethod=="Не насильственное") {
            q=0;
        //Quantity
            QuantityFood = Math.max(Math.ceil(creature.requiredaffinity/listFoods[creaturedata.foods[i]].affinity / (creature.tamingmultiplier * 2)/creaturedata.nonviolentfoodaffinitymultiplier),0);
 
            if (creaturedata.foods[i]==creature.fillfood){
                q = QuantityFood; 
            }

            //time
            time = QuantityFood*-listFoods[creaturedata.foods[i]].food/creaturedata.foodrate/creaturedata.nonviolentfoodratemultiplier;
            
            //totaltime
            totaltime = food/creaturedata.foodrate/creaturedata.nonviolentfoodratemultiplier;
        }



 
        FoodTable.innerHTML += '<tr><td><a href="/wiki/' + NameFood + '">'+
		'<img src="'+ listFoods[creaturedata.foods[i]].icon + '">'+
		'<a href="/wiki/' + NameFood + '"><span class="ajaxttlink">'+ NameFood + '</span></td>'+
        '<td>' + QuantityFood + '</td>'+
        '<td><input id="' + creaturedata.foods[i] + '" type="number" min="0" max="' + QuantityFood + '" value="' + q + '" style="width:3em" onchange="changeFood(\'' + creaturedata.foods[i] + '\', this.value)"></td>'+
        '<td>' + secToTime(time) + '</td></tr>';
    }
}

function FillTableTame(){
    //Таблица приручения
    TameTable = document.getElementById('tameCreature').tBodies[0];
    
    TameTable.innerHTML = "";
    
    if (creature.tamingmethod=="Стандарт") {
    
        TameTable.innerHTML += '<tr><th style="text-align:left;">Сытость:</th><td>' + creature.suppliedaffinity + '/' + creature.requiredaffinity + '</td></tr>'+
        '<tr><th style="text-align:left;">Необходимый уровень сытости (Умен.):</th><td>' + creature.totalfood.toFixed(2) + ' (' + creature.foodrate.toFixed(1) +')</td></tr>'+
        '<tr><th style="text-align:left;">Всего времени:</th><td>' + secToTime(totaltime) + '</td></tr>'+
        '<tr><th style="text-align:left;">Эффективность:</th><td>' + creature.effectiveness.toFixed(1) + '% (+' + creature.extralevels + ' Ур.)</td></tr>' +
        '<tr><th style="text-align:left;">Всего оглушения (Умен.):</th><td>' + creature.torpor.toFixed(1) + ' (' + creature.torporrate.toFixed(3) + ')</td></tr>' +
        '<tr><th style="text-align:left;">Время до пробуждения:</th><td>' + secToTime(narcotics.buffertime) + '</td></tr>' +
        '<tr><th style="text-align:left;">Действие наркотика:</th><td id="NarcoticsBuffer">' + secToTime(narcotics.narcoticsbuffertime)  + '</td></tr>'+
        '<tr><th style="text-align:left;">Мин.-макс. наркотика:</th><td id="QuantityNarcotics">' + narcotics.min + ' - ' + narcotics.max + '</td></tr>';
    }    
    
    if (creature.tamingmethod=="Не насильственное") {
    
        TameTable.innerHTML += '<tr><th style="text-align:left;">Сытость:</th><td>' + creature.suppliedaffinity + '/' + creature.requiredaffinity + '</td></tr>'+
        '<tr><th style="text-align:left;">Минимально времени:</th><td>' + secToTime(totaltime) + '</td></tr>'+
        '<tr><th style="text-align:left;">Эффективность:</th><td>' + creature.effectiveness.toFixed(2) + '% (+' + creature.extralevels + ' Ур.)</td></tr>';
    }    
    
    Ender = document.getElementsByClassName('tableender tameCreature')[0];
    Ender.innerHTML = secToTime(totaltime);
    
}

function FillTableKnockout(){

    var selectWeapon = '<select id="weapon" onchange="changekomethod(this.value)">';
    for (var wpn in komethods){
        if (wpn==ko.komethod) {
            selectWeapon += '<option value="' +  wpn + '" selected="selected">'  +  wpn + '</option>'; 
        }
        else {
            selectWeapon += '<option value="' +  wpn + '">'  +  wpn + '</option>';  
        }
    }
    selectWeapon += '</select>';

    KnockoutTable = document.getElementById('knockoutCreature').tBodies[0];
    
    KnockoutTable.innerHTML = "";
    
    KnockoutTable.innerHTML = '<tr><th style="text-align:left;">Оружие</th><td>' + selectWeapon + '</td></tr>'+
        '<tr><th style="text-align:left;">Оглушение</th><td>' + Math.max(ko.kotorpor['Тело']/ko.kodamage['Тело']) + '</td></tr>'+
        '<tr><th style="text-align:left;">Урон оружия</th><td>' + 
        '<input id="WeaponDamage" type="number" min="0" value="' + ko.koweapondam + '" style="width:3em" onchange="changeWeaponDamage(this.value)">%'+ 
        '</td></tr>';
        
	for (hitbox in listCreatures[creature.name].hitboxes) {
        KnockoutTable.innerHTML += '<tr><th style="text-align:left;">' + hitbox +'</th><td>' + ko.koquantities[hitbox] + '(' + Math.max(ko.koquantities[hitbox]*komethods[ko.komethod].time) + ' сек.)</td></tr>';
	}

    Ender = document.getElementsByClassName('tableender knockoutCreature')[0];
    Ender.innerHTML = '' + ko.koweapondam + '% ' + ko.komethod + ', ' + ko.koquantities['Тело'] + ' удара, '+ Math.max(ko.koquantities[hitbox]*komethods[ko.komethod].time) + ' сек.';

}

function FillTableTimerTaming(){
    //Таймер оглушения
    var selectNarcoticMethod = '<select id="weapon" onchange="changekomethod(this.value)">';
    for (var nrm in narcoticsmethods){
        if (nrm==narcotics.narcoticsmethod) {
            selectNarcoticMethod += '<option value="' +  nrm + '" selected="selected">'  +  nrm + '</option>';  
        }
        else {
            selectNarcoticMethod += '<option value="' +  nrm + '">'  +  nrm + '</option>';  
        }
    }

    TimerTaming = document.getElementById('TimerTaming').tBodies[0];
    
    TimerTaming.innerHTML = "";
    
    if (creature.tamingmethod=="Стандарт") {
    
        TimerTaming.innerHTML += '<tr><th style="text-align:left;">Текущие оглушение:</th><td>'+
        '<input id="currentTorpor" type="number" min="0" max="' + creature.torpor + '" value="' + creature.torpor + '" style="width:3em"  onchange="changeCurrentTorpor()"> '+
        '<input id="narcoticstimercb" type="checkbox" onchange="narcoticstimer()" style="display:none">'+
        '<label class="CalcTamingButton" for="narcoticstimercb">Таймер</label></td></tr>'+
        
        '<tr><th style="text-align:left;">Метод оглушения:</th><td>' + selectNarcoticMethod +'</td></tr>'+
        
        '<tr><th style="text-align:left;">Использовать наркотик:</th><td>'+
        '<input id="useNarcotic" type="number" min="0" style="width:3em"> '+
        '<input type="button" onclick="supplynarcotic()" value="Использовать"></td></tr>'+
        
        '<tr><th style="text-align:left;">До макс.:</th><td id="topupnarcotics">0</td></tr>' +
        
        '<tr><th style="text-align:left;">Запас времени:</th><td id="buffer">' + secToTime(narcotics.buffertime) + '</td></tr>' +
        
        '<tr><th style="text-align:left;">Сигнал:</th><td>' + 
        '<input id="alarmthreshold" type="number" min="1" value="10" style="width:3em" > мин. '+
        '<input id="narcoticsalarmcb" type="checkbox" style="display:none">'+
        '<label class="CalcTamingButton" for="narcoticsalarmcb">Сигнал</label></td></tr>';
    }    
    
}

function secToTime(sec){ 
    dt = new Date(); 
    dt.setTime(sec*1000); 
    h = dt.getUTCHours();
    m = dt.getUTCMinutes();
    s = dt.getUTCSeconds();
    
    if(h<10) h = "0"+h;
    if(m<10) m = "0"+m;
    if(s<10) s = "0"+s;
    
    return h + ":" + m + ":" + s;
}

function showhidetable(nameTable){
    var tableDisplay = document.getElementById(nameTable);
    var theadDisplay = document.getElementsByClassName('tableheader ' + nameTable)[0];
    var EnderDisplay = document.getElementsByClassName('tableender ' + nameTable)[0];

    if (tableDisplay.style.display==""){
        tableDisplay.style.display = "none";
        theadDisplay.style.color = 'grey';
        theadDisplay.innerHTML = theadDisplay.innerHTML.replace('<a><b> [Скрыть]</b></a>', '<a><b> [Подробнее]</b></a>');
        EnderDisplay.style.display = "";
}
    else {
        tableDisplay.style.display = "";
        theadDisplay.style.color = 'black';
        theadDisplay.innerHTML = theadDisplay.innerHTML.replace('<a><b> [Подробнее]</b></a>', '<a><b> [Скрыть]</b></a>');
        EnderDisplay.style.display = "none";
    }
    

}

function forInterval(narcoticstimes) {
	var narcoticsapplied=false;


	for (method in narcoticstimes) {
		if (!narcoticstimes.hasOwnProperty(method)) {
			continue;
		}
		if (narcoticstimes[method]>0) {
			narcoticstimes[method]=Math.max(0, narcoticstimes[method]-1);
			narcoticstiming.currenttorpor+=narcoticsmethods[method].rate;
			if (narcoticstiming.currenttorpor>creature.torpor) {
				narcoticstiming.currenttorpor=creature.torpor;
				document.getElementById('currentTorpor').value = Math.ceil(narcoticstiming.currenttorpor);
				for (method in narcoticstimes) {
					narcoticstimes[method]=0;
				}
			}
			narcoticsapplied=true;
			break;
		}
	}
	if (!narcoticsapplied) {
		narcoticstiming.currenttorpor+=creature.torporrate;
    if(document.getElementById('currentTorpor').value!= Math.ceil(narcoticstiming.currenttorpor)){
        document.getElementById('currentTorpor').value = Math.ceil(narcoticstiming.currenttorpor);
    }
		
	}

	narcoticstimingcalc();
    
    document.getElementById('topupnarcotics').innerHTML = narcoticstiming.topupnarcotics;
    if(document.getElementById('currentTorpor').value!= Math.ceil(narcoticstiming.currenttorpor)){
        document.getElementById('currentTorpor').value = Math.ceil(narcoticstiming.currenttorpor);
    }
    
    if (narcoticstiming.buffertime/60<narcoticstiming.alarmthreshold){
        document.getElementById('buffer').innerHTML = '<span style="color:red;">' + secToTime(narcoticstiming.buffertime) + '</span>';
	}
	else{
        document.getElementById('buffer').innerHTML = '<span style="color:green;">' + secToTime(narcoticstiming.buffertime) + '</span>';
	}

	if (narcoticstiming.currenttorpor<=0) {
		narcoticstiming.currenttorpor=0;
		narcoticstimingcalc();
		narcoticstiming.time=false;
		narcoticstimer();
	}
	if (narcoticstiming.alarm==1 && narcoticstiming.buffertime/60<narcoticstiming.alarmthreshold) {
		narcoticstiming.alarm=0;
		var audio = new Audio('https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/e/e3/Alarm.ogg');
		audio.volume=0.3;
		audio.play();
	}
}

function changeFood(changedFood, valueFood){
    foodamounts[changedFood] = valueFood;
    
    foodCalc();

    document.getElementById(creature.fillfood).value = foodamounts[creature.fillfood];
}

function changekomethod(valueko) {
	ko.searchkomethod = valueko;
	ko.komethod = valueko;
	ko.koweapondam = 100;

    knockoutcalc();
    FillTableKnockout();
}

function changeWeaponDamage(value){
    ko.koweapondam = value;
    
    knockoutcalc();
    FillTableKnockout();
}

function timerBuffer(){
		var narcoticstimes=narcoticstiming.narcoticstimes;
		
		narcoticstiming.time = document.getElementById('narcoticstimercb').checked;
		
        narcoticstiming.alarm = document.getElementById('narcoticsalarmcb').checked;

		narcoticstiming.alarmthreshold = document.getElementById('alarmthreshold').value;
        
        if (narcoticstiming.time==true) {
            //narcoticstiming.intervalid= interval( forInterval(), 1000);
            var narcoticstimes=narcoticstiming.narcoticstimes;

            forInterval(narcoticstimes);
            narcoticstimingcalc();
            objTimer--;
            //document.getElementById('buffer').innerHTML = secToTime(narcotics.buffertime);
                if(objTimer==0){setTimeout(function(){},1000);}
                else{setTimeout(timerBuffer,1000);}
		} else {
		    objTimer = 0;
		}
}

function changeCurrentTorpor(){
	narcoticstiming.currenttorpor = parseFloat(document.getElementById('currentTorpor').value);
    if (document.getElementById('narcoticstimercb').checked==false){
        narcoticstimingcalc();
    }	
}

function changekomethod(value){
    narcotics.narcoticsmethod=value;
    if (document.getElementById('narcoticstimercb').checked==false){
        tameCalc();
        narcoticstimingcalc();
    }
    document.getElementById('NarcoticsBuffer').innerHTML = secToTime(narcotics.narcoticsbuffertime);
    document.getElementById('QuantityNarcotics').innerHTML = narcotics.min + ' - ' + narcotics.max;
}