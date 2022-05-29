/******************************************************************************/
/*******************Скрипт разработан участником SmiledMoon.*******************/
/******************************************************************************/
(function() {
if (mw.config.get( 'wgPageName' ) == 'Список_пони') {
    /*Объявление переменных*/
    var listOfItems = [];
    var sortOrder = 'normal';
    var searchNameData = "";
    var searchKindData = ['единорог', 'пегас', 'земнопони', 'кристальный', 'перевёртыш', 'аликорн'];
    var searchGroupData = ['женвзр', 'мужвзр', 'жендет', 'муждет'];
    var searchSeason = "";
    var searchEpisode = "";
    var searchSeriesData = "";
    /*Создание управляющих элементов*/
    var searcNameInput = '<input id="searchCharactersTextArea" type="text" style="width:70%; display:inline-block" autofocus placeholder="Введите имя персонажа"/><button style="display:inline-block" type="button" id="searchCharactersButton">Поиск</button>';
    var searchSeasonsInput = '<select id="searchSeasons"><option value="">Все сезоны</option><option value="s1">1 сезон</option><option value="s2">2 сезон</option><option value="s3">3 сезон</option><option value="s4">4 сезон</option><option value="s5">5 сезон</option><option value="s6">6 сезон</option><option value="s7">7 сезон</option><option value="s8">8 сезон</option><option value="s9">9 сезон</option><option value="eg">EqG</option></select>';
    var searchEpisodesInput = '<select id="searchEpisodes" disabled><option value="">Все серии</option><option value="01">Серия 1</option><option value="02">Серия 2</option><option value="03">Серия 3</option><option value="04">Серия 4</option><option value="05">Серия 5</option><option value="06">Серия 6</option><option value="07">Серия 7</option><option value="08">Серия 8</option><option value="09">Серия 9</option><option value="10">Серия 10</option><option value="11">Серия 11</option><option value="12">Серия 12</option><option value="13">Серия 13</option><option value="14">Серия 14</option><option value="15">Серия 15</option><option value="16">Серия 16</option><option value="17">Серия 17</option><option value="18">Серия 18</option><option value="19">Серия 19</option><option value="20">Серия 20</option><option value="21">Серия 21</option><option value="22">Серия 22</option><option value="23">Серия 23</option><option value="24">Серия 24</option><option value="25">Серия 25</option><option value="26">Серия 26</option></select>';
    var sortingCharactersInput = '<br/><b>Сортировка:</b><select id="sortingCharacters"><option value="defaultSort">По умолчанию</option><option value="rusAlSort">По рус. алфавиту</option><option value="enAlSort">По англ. алфавиту</option><option value="fAppearance">По первому появлению</option></select>';
    var sortingOrderInput = '<b>Порядок:</b><select id="sortingOrder"><option value="normalOrder">Прямой</option><option value="reversOrder">Обратный</option></select>';
    document.getElementById('searchCharactersArea').innerHTML = searcNameInput;
    document.getElementById('searchCharacters').insertAdjacentHTML('beforeEnd', searchSeasonsInput + searchEpisodesInput + sortingCharactersInput + sortingOrderInput);
    var thead = document.createElement('thead');
    var tbody = document.getElementById('listOfCharacters').getElementsByTagName('tbody')[0];
    var table = tbody.parentNode;
    thead.appendChild(tbody.firstChild);
    document.getElementById('listOfCharacters').insertBefore(thead, listOfCharacters.firstChild);
    /*Создание массива данных*/
    for(var i=0; i<tbody.children.length; i++) {
        var elem = tbody.children[i];
        var firstAppearance = elem.children[3].firstChild.nodeValue.match(/\d+/g);
        listOfItems.push({
            nameRu:elem.children[0].getElementsByTagName('b')[0].innerHTML.toLowerCase(),
            nameEn:elem.children[0].getElementsByTagName('i')[0].innerHTML.toLowerCase(),
            nameSearch:elem.children[0].getElementsByTagName('b')[0].innerHTML + ' ' +  elem.children[0].getElementsByTagName('i')[0].innerHTML + ' ' +  elem.children[0].getElementsByTagName('span')[0].innerHTML,
            kindSearch:elem.children[1].getElementsByTagName('span')[0].innerHTML.toLowerCase(),
            groupSearch:elem.children[2].getElementsByTagName('span')[0].innerHTML.toLowerCase(),
            seriesSearch:elem.children[3].getElementsByTagName('span')[0].innerHTML.toLowerCase(),
            firstAppearanceSorting:(firstAppearance != null) ? firstAppearance[0]*100 + +firstAppearance[1] : 350,
            number:+i+1,
            elem:elem
      });
    }
    /*Обработка управляющих воздействий*/
    function searchTextProcessing() {
        var value = document.getElementById('searchCharactersTextArea').value;
        var searchNameValue = "";
        var searchNameTemp = value.toLowerCase().replace(/[\s_]+/g, ' ').replace(/ё/g, 'е');
        if (searchNameTemp != "") {
            searchNameTemp = ',' + searchNameTemp + ',';
            searchNameTemp = searchNameTemp.split(/[^a-zA-Z0-9\u0400-\u04FF]*,[^a-zA-Z0-9\u0400-\u04FF]*/);
            for (i=1;i<searchNameTemp.length;i++) {
                if (i == searchNameTemp.length-1) {
                    searchNameData = RegExp(searchNameData);
                } else if (i == 1) {
                    searchNameData = searchNameTemp[i];
                } else {
                    searchNameData = searchNameData + '|' + searchNameTemp[i];
                }
            }
            searchInListOfItems();
            for (i=1;i<searchNameTemp.length-1;i++) {
                if (i == 1) {
                    searchNameValue = searchNameTemp[i];
                } else {
                    searchNameValue = searchNameValue + ', ' + searchNameTemp[i];
                }
            }
            document.getElementById('searchCharactersTextArea').value = searchNameValue;
        };
    }
    function searchKindProcessing(arNum, kindName, kindEvent) {
        if (searchKindData[arNum] == kindName && searchKindData.join('').length > 9) {
            searchKindData[arNum] = "";
            document.getElementById(kindEvent).classList.add("sbuthold");
            searchInListOfItems();
        } else if (searchKindData[arNum] == "") {
            searchKindData[arNum] = kindName;
            document.getElementById(kindEvent).classList.remove("sbuthold");
            searchInListOfItems();
        }
    }
    function searchGroupProcessing(arNum1, arNum2, gName1, gName2, gName3, gName4, gName5, gName6, groupEvent) {
        if (searchGroupData.join().indexOf(gName1) != -1 && searchGroupData.join().indexOf(gName2) != -1) {
            searchGroupData[arNum1] = "";
            searchGroupData[arNum2] = "";
            document.getElementById(groupEvent).classList.add("sbuthold");
            searchInListOfItems();
        } else if (searchGroupData.join().indexOf(gName1) == -1) {
            if (searchGroupData.join().indexOf(gName3) != -1) {
                searchGroupData[arNum1] = gName5;
            }
            if (searchGroupData.join().indexOf(gName4) != -1) {
                searchGroupData[arNum2] = gName6;
            };
            document.getElementById(groupEvent).classList.remove("sbuthold");
            searchInListOfItems();
        }
    }
    function searchSeasonsProcessing() {
        searchSeason = document.getElementById('searchSeasons').value;
        document.getElementById('searchEpisodes').firstChild.setAttribute('selected','');
        if (searchSeason == ""|| searchSeason == "eg") {
            document.getElementById('searchEpisodes').setAttribute('disabled','');
        } else {
            document.getElementById('searchEpisodes').removeAttribute('disabled','');
            var option 
            for (var i=14;i<27;i++) {
                option = document.getElementById('searchEpisodes').children[i]
                option.style.display = (searchSeason == "s3")?'none':'block';
            }
        }
        searchSeriesData = RegExp(searchSeason);
        searchInListOfItems();
    }
    function searchEpisodesProcessing() {
        searchEpisode = document.getElementById('searchEpisodes').value;
        searchSeriesData = RegExp(searchSeason+"\\([\\d\\s]*"+searchEpisode+"[\\d\\s]*\\)");
        searchInListOfItems();
    }
    function sortingProcessing() {
        var value = document.getElementById('sortingCharacters').value;
        if (value == 'defaultSort') { 
            sortingListOfItems('def');
        } else if (value == 'rusAlSort') {
            sortingListOfItems('Ru');
        } else if (value == 'enAlSort') {
            sortingListOfItems('En');
        } else {
            sortingListOfItems('fapp');
        }
    }
    function orderSortingProcessing() {
        var value = document.getElementById('sortingOrder').value;
        sortOrder = (value == 'normalOrder') ?'normal' : 'revers';
        listOfItems.reverse();
        searchInListOfItems(true);        
    }
    /*Сортировка массива*/
    function sortingListOfItems(type) {
        function sorter(a, b) {
            if (type == 'Ru') {
                a = a.nameRu;
                b = b.nameRu;
            }else if (type == 'En'){
                a = a.nameEn;
                b = b.nameEn;
            } else if (type == 'def') {
                a = a.number;
                b = b.number;
            }else{
                a = a.firstAppearanceSorting;
                b = b.firstAppearanceSorting;
            }
            if (a < b) {
                return  -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        }
        listOfItems.sort(sorter);
        if (sortOrder == 'revers') {listOfItems.reverse()};
        searchInListOfItems(true);
    }
    /*Поиск и вывод результатов*/
    function searchInListOfItems(rezPlaceNoShow) {
        var rez = 0;
        var date = new Date();
        function searchDataProcessing(index) {
            var kindSearch = listOfItems[index].kindSearch;
            var groupSearch = listOfItems[index].groupSearch;
            var seriesSearch = listOfItems[index].seriesSearch;
            var searchName = listOfItems[index].nameSearch.toLowerCase().replace(/ё/g, 'е');
            if (searchNameData != "" && searchNameData.test(searchName) == false) {
                return false;
            };
            if (searchKindData.join().indexOf(kindSearch) == -1) {
                return false;
            }
            if (searchGroupData.join().indexOf(groupSearch) == -1) {
                return false;
            }
            if (searchSeriesData != "" && searchSeriesData.test(seriesSearch) == false) {
                return false;
            }
            rez++;
            return true;
        }
        var tempListOfItems = [];
        var tbodyNew = document.createElement('tbody') 
        for(var i=0; i<listOfItems.length; i++) {
            if(searchDataProcessing(i) == true){
                tempListOfItems.push(listOfItems[i]);
            }
        }
        table.removeChild(tbody);
        for(var i=0; i<tempListOfItems.length; i++) {
            tbodyNew.appendChild(tempListOfItems[i].elem);
        }
        table.appendChild(tbodyNew);
        tbody = document.getElementById('listOfCharacters').getElementsByTagName('tbody')[0];
        console.log('Время поиска:'+(new Date - date)+'мс');
        if(rezPlaceNoShow != true) {
            document.getElementById('rezPlace').innerHTML = rez;
            document.getElementById('searchCharactersEndMessage').style.display = 'block';
        }
    }
    /*Возврат таблицы к исходному виду*/
    function returnTab() {
        var butClasses = document.getElementsByClassName('searchButton');
        for (var i=0;i < butClasses.length;i++) {
            butClasses[i].classList.remove("sbuthold");
        }
        document.getElementById('searchCharactersTextArea').value = '';
        sortOrder = 'normal';
        searchNameData = "";
        searchKindData = ['единорог', 'пегас', 'земнопони', 'кристальный', 'перевёртыш', 'аликорн'];
        searchGroupData = ['женвзр', 'мужвзр', 'жендет', 'муждет'];
        searchSeason = ""
        searchEpisode = ""
        searchSeriesData = ""
        document.getElementById('searchEpisodes').firstChild.setAttribute('selected','');
        document.getElementById('searchEpisodes').setAttribute('disabled','');
        document.getElementById('searchSeasons').firstChild.setAttribute('selected','');
        document.getElementById('sortingCharacters').firstChild.setAttribute('selected','');
        document.getElementById('sortingOrder').firstChild.setAttribute('selected','');
        sortingListOfItems('def');
        document.getElementById('searchCharactersEndMessage').style.display = 'none';
    }
    /*Привязка обработчиков*/
    document.getElementById('searchCharactersButton').onclick=searchTextProcessing;
    document.getElementById('unicornSearchButton').onclick = function() {searchKindProcessing(0, "единорог", this.id)};
    document.getElementById('pegasusSearchButton').onclick = function() {searchKindProcessing(1, "пегас", this.id)};
    document.getElementById('earthSearchButton').onclick = function() {searchKindProcessing(2, "земнопони", this.id)};
    document.getElementById('сristalSearchButton').onclick = function() {searchKindProcessing(3, "кристальный", this.id)};
    document.getElementById('сhangelingSearchButton').onclick = function() {searchKindProcessing(4, "перевёртыш", this.id)};
    document.getElementById('alicornSearchButton').onclick = function() {searchKindProcessing(5, "аликорн", this.id)};
    document.getElementById('femaleSearchButton').onclick = function() {searchGroupProcessing(0, 2, "жен", "муж", "взр", "дет", "женвзр", "жендет", this.id)};
    document.getElementById('maleSearchButton').onclick = function() {searchGroupProcessing(1, 3, "муж", "жен", "взр", "дет", "мужвзр", "муждет", this.id)};
    document.getElementById('adultSearchButton').onclick = function() {searchGroupProcessing(0, 1, "взр", "дет", "жен", "муж", "женвзр", "мужвзр", this.id)};
    document.getElementById('underageSearchButton').onclick = function() {searchGroupProcessing(2, 3, "дет", "взр", "жен", "муж", "жендет", "муждет", this.id)};
    document.getElementById('searchSeasons').onchange=searchSeasonsProcessing;
    document.getElementById('searchEpisodes').onchange=searchEpisodesProcessing;
    document.getElementById('sortingCharacters').onchange=sortingProcessing;
    document.getElementById('sortingOrder').onchange=orderSortingProcessing;
    document.getElementById('returnTab').onclick = returnTab;
    document.getElementById('searchCharactersTextArea').onkeydown = function(event) {
        var keyID = (event.charCode) ? event.charCode : ((event.which) ? event.which : event.keyCode);
        if (keyID == 13) {
            searchTextProcessing();
        } else if (keyID == 27) {
            document.getElementById('searchCharactersTextArea').value = '';
        }
    };
}
})();