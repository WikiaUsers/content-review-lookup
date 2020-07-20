/*
 * Скрипт для хрустального шара
 * изначально создавался для новогодних мероприятий на центральной вики-ру
 *
 * Код: Сибирский Смотритель при участии Your Own Waifu
 * Идея: Fiona of Amber
 * Адаптация для 'Магия в нас и вокруг нас вики': ParaNorman Bates  
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
            'her',
            'hero',
            'heros',
            'enemy',
            'ability',
            'book',
            'place',
            'item',
            'pet',
            'ritual',
            'prayer',
            'wesen',
            'question',
            'fiction',
            'sleep',
            'stories',
            'tree'
        ],
        questions = [
            'Когда мне подарят что-то стоящее',
            'Какую работу лучше искать',
            'Где найти себе пару',
            'Как добиваться успеха во всём',
            'Как стать привлекательнее',
            'Как сделать карьеру',
            'Как справиться с бессоницей',
            'Получится ли у меня заняться любимым делом',
            'Что делать со свободным временем'
        ],
        answers = {
            phrase: '@ ', 
            her: 'Тебе поможет @',
            hero: 'Тебе поможет @',
            heros: 'Тебе помогут @',
            enemy: 'Тебе будет мешать @',
            ability: 'Попробуй применить «@»',
            book: 'Тебе стоит прочитать книгу «@»',
            place: '@ - там всё произойдёт',
            item: '@ - лучшее в этой ситуации',
            pet: 'С тобой пойдут @',
            ritual: 'Попробуй «@»',
            wesen: 'Смотри чтоб не явился «@»',
            prayer: 'Тебе поможет «@»',
            question: 'А ты знаешь «@»',
            fiction: 'Всё будет, как в книге «@»',
            sleep: 'Тогда когда тебе приснится «@»',
            stories: 'Подумай над историей про @',
            tree: 'Может «@» сможет тебе помочь'
        },
        articles = {
            // Фразы 
            phrase: [
                {
                    url: 'ru.magia',
                    categories: ['Некромантия']
                },
                {
                    url: 'ru.magia',
                    categories: ['Травничество']
                },
                {
                    url: 'ru.magia',
                    categories: ['Астрология']
                }
            ],
            // Хорошее
            her: [
                {
                    url: 'ru.magia',
                    categories: ['(Шаманизм)']
                }
            ],
            // Хороший персонаж
            hero: [
                {
                    url: 'ru.magia',
                    categories: ['(Дух)']
                }
            ],
            // Хорошие персонажи
            heros: [
                {
                    url: 'ru.magia',
                    categories: ['(Духи)']
                }
            ],
            // Плохие персонажи
            enemy: [
                {
                    url: 'ru.magia',
                    categories: ['Демонические князья']
                },
                {
                    url: 'ru.magia',
                    categories: ['(Демоны)']
                },
                {
                    url: 'ru.magia',
                    categories: ['Средний класс демонов']
                },
                {
                    url: 'ru.magia',
                    categories: ['Боги']
                }
            ],
            //Способности
            ability: [
                {
                    url: 'ru.magia',
                    categories: ['Парапсихология']
                },
                {
                    url: 'ru.magia',
                    categories: ['Пентакли (Монеты)']
                }
            ],
            // Книги и гримуары
            book: [
                {
                    url: 'ru.magia',
                    categories: ['Книги']
                },
                {
                    url: 'ru.magia',
                    categories: ['Гримуары']
                }
            ],
            // Места (Там, где всё происходит)
            place: [
                {
                    url: 'ru.magia',
                    categories: ['Сакральная география']
                }
            ],
            // Вещи
            item: [
                {
                    url: 'ru.magia',
                    categories: ['Жезлы (Скипетры)']
                },
                {
                    url: 'ru.magia',
                    categories: ['(Оберег)']
                }
            ],
            // Компаньоны и зверьё
            pet: [
                {
                    url: 'ru.magia',
                    categories: ['(Духи)']
                }
            ],
            // Ритуалы и заговоры
            ritual: [
                {
                    url: 'ru.magia',
                    categories: ['Ритуалы и обряды']
                },
                {
                    url: 'ru.magia',
                    categories: ['Заговоры и заклинания']
                },
                {
                    url: 'ru.magia',
                    categories: ['Ритуалы и обряды друидов']
                },
                {
                    url: 'ru.magia',
                    categories: ['Ритуалы и обряды с зеркалом']
                }
            ],
            // Молитвы
            prayer: [
                {
                    url: 'ru.magia',
                    categories: ['Молитвы']
                }
            ],
            // Мифические существа
            wesen : [
                {
                    url: 'ru.magia',
                    categories: ['Мифические существа']
                },
                {
                    url: 'ru.magia',
                    categories: ['Нейтральные духи']
                },
                {
                    url: 'ru.magia',
                    categories: ['Нечисть']
                },
                {
                    url: 'ru.magia',
                    categories: ['Живые мертвецы']
                }
            ],
            // Вопросы
            question: [
                {
                    url: 'ru.magia',
                    categories: ['Вопросы']
                }
            ],
            // Художественная литература
            fiction: [
                {
                    url: 'ru.magia',
                    categories: ['Художественная литература']
                }
            ],
            // Сны
            sleep: [
                {
                    url: 'ru.magia',
                    categories: ['Что Вам снится?']
                }
            ],
            // Истории
            stories: [
                {
                    url: 'ru.magia',
                    categories: ['(читать историю)']
                }
            ],
            // Деревья и растения
            tree: [
                {
                    url: 'ru.magia',
                    categories: ['Гороскоп друидов']
                },
                {
                    url: 'ru.magia',
                    categories: ['Дикие растения']
                },
                {
                    url: 'ru.magia',
                    categories: ['Эфирные масла']
                },
                {
                    url: 'ru.magia',
                    categories: ['(Деревья)']
                }
            ]
        };
 
    // HTML и события
    function setupCrystalSphere () {
        document.querySelector('.crystal-ball-wrapper').innerHTML =
        '<div class="crystal-ball">' +
            '<div class="question">' +
                '<div class="intro">Твой вопрос:</div>' +
                '<div class="topic">Когда я загружусь?</div>' +
            '</div>' +
            '<div class="custom-question">' +
                '<div class="intro">Твой вопрос:</div>' +
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