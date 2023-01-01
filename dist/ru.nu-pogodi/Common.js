/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
//цвета имён пользователей by raft
(function(){
    var BUREAUCRATS = {ParaNorman_Bates:1,};
    var ADMINS = {Крош_и_Шорк:1,};
    var BASE_URL = '.fandom.com/ru/wiki/';
    var PAGES = [ // [url part, ignore ip, ignore current page]
        ['Блог_участника:',1,0],
        ['Стена_обсуждения:',0,0],
        ['Служебная:Contributions/',1,0],
        ['Участник:',1,0],
    ];
 
    function prepareURL(url) { //Обрезаем URL до смысловой части
        var idx = url.indexOf(BASE_URL);
        if (idx === -1) return url; //error
        url = url.substr(idx + BASE_URL.length);
        url = decodeURIComponent(url.replace(/\+/g, " "));
        return url;
    }
 
    function getData(url) { //Получить настройки для URL
        for (var i=PAGES.length-1; i>=0; i--) {
            var data = PAGES[i];
            if (url.indexOf(data[0]) === 0) return data;
        }
    }
 
    function getUserName(url,data) { //Извлекает имя (или ip) из URL
        var start = data[0].length;
        url = url.substr(start);
        var m = url.match(/^[\w\d.:]+/);
        if (m) return m[0];
    }
 
    function checkIP(name) { //Проверяет, является ли имя ip-адресом
        if (name.split('.').length > 3 || name.split(':').length > 3)
            return true; //Да, является
    }
 
    function updateLink(a) { //Поменять цвет конкретной ссылки
        var url = prepareURL(a.href);
        var data = getData(url);
        if (!data) return;
        var name = getUserName(url, data);
        if (!name) return;
        var nickname = a.innerText.trim();
        if (nickname != name
            && nickname != 'Участник Фэндома'
            && nickname != 'Участник ФЭНДОМА') return;
        if (ADMINS[name]) return a.classList.add('nupogodi_admin');
        if (BUREAUCRATS[name]) return a.classList.add('nupogodi_bureaucrat');
        //var is_ignore_ip = data[1];
        var is_ip = checkIP(name);
        //if (!is_ignore_ip && is_ip) return;
        if (is_ip) return a.classList.add('nupogodi_anonymous');
        return a.classList.add('nupogodi_user');
    }
 
    function updateColors(target) { //Меняет цвета ников на текущей странице
        var url = prepareURL(location.href);
        var data = getData(url);
        //Проверяем текущий URL
        if (data) {
            var is_ignore_page = data[2];
            if (is_ignore_page) return;
            var is_ignore_ip = data[1];
            if (is_ignore_ip) {
                var name = getUserName(url, data);
                var is_ip = name && checkIP(name);
                if (is_ip) return;
            }
        }
        //Нужна возможность искать
        while (target && !target.querySelectorAll) target = target.parentNode;
        if(!target) return console.log('No parent!');
        //Проверяем все ссылки
        var arr = target.querySelectorAll('a'); 
        arr.forEach(updateLink);
    }
    updateColors(document);
 
    //Следим за появлением новых ссылок, чтобы и их покрасить
    var observer = new MutationObserver( function(mutationRecords) {
        //console.log('mutations',mutationRecords);
        mutationRecords.forEach(function(rec){
            if (rec.addedNodes.length > 0) rec.addedNodes.forEach(updateColors);
        });
 
    });
    observer.observe(document, {
        childList: true, //Следим за детьми
        subtree: true, // и более глубокими потомками
    });
})();