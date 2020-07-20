/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */


/*Скрипт рандомайзера*/
function randomize() {
    if ($('#randomValue').length === 0) return; //Если на странице нечего рандомизировать - выйти и функции
    if ($('#randomValue span.randItem').length === 0) return; //Если на странице нечего рандомизировать - выйти и функции
    window.randomValueM = []; //Глобальная переменная с вариантами для рандомизации
    for (i=0;i<$('#randomValue span.randItem').length;i++) //Заполняем переменную
        randomValueM[i] = $('#randomValue span.randItem')[i].innerHTML;
    $('#randomValue').html(randomValueM[Math.floor(Math.random() * randomValueM.length)]); //Записываем случайно выбранный вариант
}
randomize(); //Вызов функции для первичной рандомизации
 
function reRandomize() { //Функция реролла
    $('#randomValue').html(randomValueM[Math.floor(Math.random() * randomValueM.length)]); //Записываем случайно выбранный вариант
    if ($('#randomValue span.Others').length && $('#randomValue span.Others').attr('data-widget-id')) { //Если в элементе присутствует плеер 
        elem = $('#randomValue span.Others')[0]; //Запомнить его
        elem.innerHTML='<audio controls="" ' + encodeURIComponent(elem.getAttribute("data-widget-ap")) + ' class="naudio"><source src="' + elem.getAttribute("data-widget-id") + '" type="audio/mp3">Ваш браузер не поддерживает тэг audio.</audio>'; //И прогрузить в него музыку
    }
}
 
$('body').on('click', '#reRandomize', reRandomize); //Рероллить содержимое при нажатии на кнопку




/*profile special*/
$('.trjplay-icon').click(function (){
  $(this).addClass('trjplay-icon-active');
  setTimeout(function() {
    $('.trjplay-icon').removeClass('trjplay-icon-active');
  }, 900);
 
});
 
$(document).ready(function() {
  var obj = document.createElement("audio");
  obj.src = "https://bindingofisaac.fandom.com/ru/wiki/special:Filepath/Satan_charge_up.ogg";
  obj.volume = 0.5;
  obj.autoPlay = false;
  obj.preLoad = true;
  obj.controls = true;
 
  $(".trjplay-icon").click(function() {
    obj.play();
    // obj.pause();
  });
});



//Автообновление вики-активности
 
var ajaxPages 
= ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText 
= 'Автообновление страницы';
 
//Последние изменения
$(function() {
    if (mw.config.get('wgNamespaceNumber') === 0 && !$.getUrlVar('diff') && !$.getUrlVar('oldid')) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            console.log(data);
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0];
            var html = '<div class="lastEdited">Последняя правка совершена <a href="/ru/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> (' + new Date(rv.timestamp).toUTCString().slice(0, 16) + ') </a>, ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC) <a class="lastEdited-diff">(разн)</a></div>';
            $('#PageHeader').after(html);
            mw.loader.using(['mediawiki.action.history.diff'], function() {
                $('.lastEdited-diff').on('click', function() {
                    $.showCustomModal('Изменения: ' + mw.config.get('wgPageName').replace(/_/g, ' '), rv.diff['*'], {
                        id: 'lastEdited-diff',
                        width: 650,
                        buttons: [{
                            message: 'Link',
                            defaultButton: true,
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/?diff=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Undo',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                                window.open('/ru/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
                            }
                        }, {
                            message: 'Cancel',
                            handler: function() {
                                $('#lastEdited-diff').closeModal();
                            }
                        }]
                    });
                });
            });
        });
    }
});