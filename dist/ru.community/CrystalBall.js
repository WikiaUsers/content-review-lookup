/*global require */

/*
 * Скрипт для хрустального шара
 * Является частью новогодних мероприятий - http://ru.community.wikia.com/wiki/Блог_участника:Kuzura/Новогодние_мероприятия_2017
 *
 * Код: Сибирский Смотритель
 * Идея: Fiona of Amber
 * Помогали: Fiona of Amber, Your Own Waifu
 */
require(['wikia.window'], function (window) {
    var document = window.document;
    if (!document.querySelector('.crystal-ball-wrapper')) {
        return;
    }

    var console = window.console,
        // Фразы и категории
        topics = [
            'phrase',
            'hero',
            'enemy',
            'mission',
            'ability',
            'book',
            'series',
            'place',
            'item',
            'pet',
            'rank',
            'group',
            'music',
            'game',
            'film'
        ],
        questions = [
            'Избегу ли я глобального бана',
            'Получу ли я админку',
            'Станет ли моя вики популярной',
            'Стоит ли мне создавать вики',
            'Перестану ли я откладывать статью на потом',
            'Когда админ даст модератора',
            'Проголосуют ли участники против меня',
            'Как поднять вики в WAM',
            'Удалят ли админы мою статью',
            'Когда моя статья станет лучшей',
            'Когда вандалы прекратят набегать на мою вики',
            'Перестанет ли Фэндом портить мою вики своими обновлениями',
            'Попадёт ли моя вики на Вики Месяца',
            'Как найти новых участников для моей вики',
            'Станут ли просмотры на моей вики падать',
            'Как мне писать шаблоны',
            'Поможет ли моей вики Эскадра',
            'С чего мне начать учить JS',
            'Когда в ТО будут нововведения',
            'Как изменить оформление вики',
            'Как мне сделать своего бота',
            'Зачем админ меня заблокировал',
            'Как набрать лайков на моём сообщении',
            'Как мне написать статей, чтобы сделать проект золотым',
            'Как сделать красивую заглавную'
        ],
        answers = {
            phrase: '@',
            hero: 'Тебе поможет @',
            enemy: 'Тебе будет мешать @',
            mission: 'Только после прохождения миссии «@»',
            ability: 'Используй способность «@»',
            book: 'Тебе стоит прочитать книгу «@»',
            series: 'Всё будет как в серии «@»',
            place: '@ - там всё произойдёт',
            item: '@ - лучшее в этой ситуации',
            pet: 'С тобой пойдёт @',
            rank: 'Сначала надо достигнуть ранга «@»',
            group: 'Это могут только из фракции «@»',
            music: 'На фоне будет играть @',
            game: 'Тебе стоит поиграть в @',
            film: 'Всё будет, как в фильме «@»'
        },
        articles = {
            // Фразы (обычно названия сериалов)
            phrase: [
                {
                    url: 'ru.detroit-become-human',
                    categories: ['Журналы']
                },
                {
                    url: 'ru.fallout',
                    categories: ['Квесты Fallout: New Vegas']
                },
                {
                    url: 'ru.fallout',
                    categories: ['Квесты Fallout 76']
                }
            ],
            // Хорошие персонажи
            hero: [
                {
                    url: 'ru.ducktales2017',
                    categories: ['Персонажи']
                },
                {
                    url: 'ru.undertale',
                    categories: ['Персонажи Deltarune']
                },
                {
                    url: 'ru.vikings',
                    categories: ['Персонажи']
                }
            ],
            // Плохие персонажи (но основная масса - обобщающие, как и в хороших)
            enemy: [
                {
                    url: 'ru.dead-cells',
                    categories: ['Враги']
                },
                {
                    url: 'ru.sally-face',
                    categories: ['Персонажи']
                },
                {
                    url: 'ru.darksiders',
                    categories: ['Боссы (Darksiders III)']
                }
            ],
            // Миссии и квесты
            mission: [
                {
                    url: 'shararam',
                    categories: ['Квесты']
                },
                {
                    url: 'ru.dragonage',
                    categories: ['Квесты Dragon Age: Инквизиция']
                },
                {
                    url: 'ru.elderscrolls',
                    categories: ['Квесты (Саммерсет)']
                },
                {
                    url: 'ru.geometry-dash',
                    categories: ['Уровни']
                }
            ],
            // Способности и колдовство
            ability: [
                {
                    url: 'ru.darksouls',
                    categories: ['Виды магии (Dark Souls III)']
                },
                {
                    url: 'ru.warframe',
                    categories: ['Способности Варфреймов']
                },
                {
                    url: 'ru.harrypotter',
                    categories: ['Заклинания по алфавиту']
                }
            ],
            // Книжки и вообще всё, что можно прочитать
            book: [
                {
                    url: 'ru.stephenking',
                    categories: ['Книги']
                },
                {
                    url: 'ru.lotr',
                    categories: ['Книги']
                },
                {
                    url: 'ru.losyash-library',
                    categories: ['Книги']
                }
            ],
            // Названия серии (то, что не подходит в phrase)
            series: [
                {
                    url: 'ru.hello-bob',
                    categories: ['Эпизоды']
                },
                {
                    url: 'ru.riverdale',
                    categories: ['Серии (Ривердэйл)']
                },
                {
                    url: 'ru.americanhorrorstory',
                    categories: ['Серии']
                }
            ],
            // Там, где всё происходит
            place: [
                {
                    url: 'ru.the-long-dark',
                    categories: ['Локации']
                },  
                {
                    url: 'ru.subnautica',
                    categories: ['Биомы']
                },               
		{
                    url: 'ru.atom-rpg',
                    categories: ['Локации']
                }
            ],
            // Вообще все вещи
            item: [
                {
                    url: 'ru.dont-starve',
                    categories: ['Hamlet']
                },
                {
                    url: 'ru.bendy-and-the-ink-machine',
                    categories: ['Предметы']
                },
                {
                    url: 'ru.bloodborne',
                    categories: ['Предметы']
                }
            ],
            // Компаньоны и зверьё
            pet: [
                {
                    url: 'ru.slimerancher',
                    categories: ['Слаймы']
                },
                {
                    url: 'ru.tardis',
                    categories: ['Спутники Доктора']
                },
                {
                    url: 'ru.battle-cats',
                    categories: ['Коты']
                }
            ],
            // Ранги
            rank: [
                {
                    url: 'ru.warhammer40k',
                    categories: ['Звания, Титулы и Ранги']
                },
                {
                    url: 'ru.starwars',
                    categories: ['Ранги ситхов']
                }
            ],
            // Группы и сброды
            group: [
                {
                    url: 'ru.overlordanime',
                    categories: ['Расы']
                },
                {
                    url: 'ru.ninjago',
                    categories: ['Фракции']
                },
                {
                    url: 'ru.warriors-cats',
                    categories: ['Племена и группы']
                }
            ],
            // То, что играет на фоне
            music: [
                {
                    url: 'ru.kpop',
                    categories: ['Синглы']
                },
                {
                    url: 'ru.blackpink',
                    categories: ['Синглы']
                },
                {
                    url: 'ru.shingekinokyojin',
                    categories: ['Музыка']
                }
            ],
            // Игры
            game: [
                {
                    url: 'ru.five-nights-at-freddys',
                    categories: ['Игры']
                },
                {
                    url: 'ru.divinity',
                    categories: ['Игры']
                },
                {
                    url: 'ru.dvloper-games',
                    categories: ['Игры']
                }
            ],
            // Фильмы
            film: [
                {
                    url: 'ru.marvel',
                    categories: ['Фильмы']
                },
                {
                    url: 'ru.lego',
                    categories: ['Фильмы']
                }
            ]
        };

    // HTML и события
    function setupCrystalSphere () {
        document.querySelector('.crystal-ball-wrapper').innerHTML =
        '<div class="crystal-ball">' +
            '<div class="question">' +
                '<div class="intro">В этом году:</div>' +
                '<div class="topic">Когда я загружусь?</div>' +
            '</div>' +
            '<div class="custom-question">' +
                '<div class="intro">В этом году:</div>' +
                '<div class="topic"><span class="custom-question-value" contenteditable="true" spellcheck="false"></span><span>?</span></div>' +
                '<div class="hint">Нажми Enter, когда закончишь</div>' +
            '</div>' +
            '<div class="answer">' +
                '<div class="intro">Мой ответ:</div>' +
                '<div class="prediction">Смотри, нас скринят, типа пасхалка</div>' +
            '</div>' +
            '<div class="options">' +
                '<button class="pick-another">Другой вопрос</button>' +
                '<button class="type-yourself">Задать свой</button>' +
            '</div>' +
        '</div>';

        var $question = document.querySelector('.question'),
            $customQuestion = document.querySelector('.custom-question'),
            $input = document.querySelector('.custom-question-value'),
            $answer = document.querySelector('.answer'),
            $prediction = document.querySelector('.prediction'),
            $pickAnother = document.querySelector('.pick-another'),
            $typeYourself = document.querySelector('.type-yourself');

        $customQuestion.style.display = 'none';

        changePrediction();

        $pickAnother.addEventListener('click', changePrediction);

        $typeYourself.addEventListener('click', function () {
            $question.style.display = 'none';
            $customQuestion.style.display = '';
            $input.focus();
        });

        $customQuestion.addEventListener('click', function () {
            $input.focus();
        });

        $input.addEventListener('keydown', function (ev) {
            if (ev.key === 'Enter') {
                ev.preventDefault();

                if (!$input.textContent.length) {
                    return;
                }

                $question.style.display = '';
                $customQuestion.style.display = 'none';
                changePrediction($input.textContent);
            }
        });

        function changePrediction (question) {
            if ($answer.classList.contains('faded-out')) {
                return;
            }

            if (typeof question !== 'string') {
                question = randomFromArray(questions);
            }

            $question.querySelector('.topic').textContent = question + '?';
            $answer.classList.add('faded-out');

            getRandomAnswer(function (answer) {
                $prediction.innerHTML = answer;
                $answer.classList.remove('faded-out');
            });
        }
    }

    // Взятие случайного элемента массива
    function randomFromArray (arr) {
        if (arr.length === 1) {
            return arr[0];
        }
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Рекурсивное получение рандомного ответа
    var articleLogs = []; // Для исключения повторяющихся ответов
    function getRandomAnswer (callback) {
        var topic = randomFromArray(topics),
            answer = answers[topic],
            wiki = randomFromArray(articles[topic]);

        getRandomArticle(
            wiki,
            function (article, link) {
                var articleLogsItem = wiki.url + ':' + article;

                if (
                    articleLogs.indexOf(articleLogsItem) !== -1 ||
                    typeof article === 'undefined' // Функция вызвана без аргументов, всё по новой
                ) {
                    return getRandomAnswer(callback);
                }

                articleLogs.push(articleLogsItem);

                return callback(answer.replace(
                    '@',
                    '<a href="/wiki/w:c:' + wiki.url + ':' + article + '" target="_blank">' +
                        link +
                    '</a>'
                ));
            }
        );
    }

    // Получение случайной статьи
    // И да, тоже рекурсивно
    function getRandomArticle (wiki, callback) {
        var url = wiki.url,
            cat = randomFromArray(wiki.categories),
            nameOnLeft = typeof wiki.nameOnLeft === 'boolean'
                ? wiki.nameOnLeft
                : false;
        if (typeof cat === 'string') {
            var xhr = new window.XMLHttpRequest();

            xhr.responseType = 'document';
            // JSONP на статью нельзя, вот CORS и не пускает
            // Придётся зайти сбоку
            xhr.open('GET', 'http://cors-anywhere.herokuapp.com/' + url + '.wikia.com/index.php?title=Special:RandomInCategory/' + cat, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    try {
                        var data = xhr.response.
                            querySelector('title').
                            textContent.split('|').
                            shift().
                            trim().
                            replace(/</g, '&lt;').
                            replace(/>/g, '&gt;');

                        if (/^Категория:/.test(data)) {
                            data = data.replace(/^Категория:/, '');
                            return getRandomArticle({
                                url: url,
                                categories: [data],
                                nameOnLeft: nameOnLeft
                            }, callback);
                        } else if (
                            /^(Файл|Шаблон):/.test(data)
                        ) {
                            return getRandomArticle(wiki, callback);
                        } else if (
                            /(Случайная страница категории|Random page in category)/.test(data)
                        ) {
                            // Когда наткнулись на пустую категорию - вызываем функцию без аргументов
                            return callback();
                        }

                        var link = data.split(':').
                            pop().
                            replace(/\s?\(.*?\)/g, '').
                            trim().
                            split('/');

                        link = nameOnLeft
                            ? link.shift()
                            : link.pop();

                        return callback(data, link);
                    } catch (er) {
                        return console.error(er);
                    }
                } else {
                    return console.error(xhr.statusText);
                }
            };
            return xhr.send();
        }
        var link = randomFromArray(cat);
        return callback(link, link);
    }

    // Запускаем этот шарик
    setupCrystalSphere();
});