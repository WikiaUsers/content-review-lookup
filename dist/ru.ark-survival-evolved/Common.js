var $tfb;
 
/* Any JavaScript here will be loaded for all users on every page load. */

// copy to clipboard
$('.copy-clipboard').each(function () {
  var $this = $(this);
  $(this).html( '<span class="copy-content">' + $(this).html() + '</span>' );
  var $button = $('<button title="Copy to Clipboard">&#xf0ea;</button>');
  var $status = $('<div class="copy-status"></div>').hide();
  $this.append($button).append($status);
  $button.click(function () {
    var $content = $this.find('.copy-content');
    $content.children().remove();
    selectElementText($content[0]);

    try {
      if (!document.execCommand('copy'))
        throw 42;
      showCopyStatus($status, "Успешно скопировано!", true);
    } catch (err) {
      showCopyStatus($status, "Не удалось скопировать в буфер обмена. Сделайте это сами", false);
    }
  });
});

function showCopyStatus($elem, text, success) {
    $elem.css("color", success ? 'green' : 'red')
         .text(text)
         .show();

    setTimeout(function() {
       $elem.fadeOut(500);
    }, 5000);
}

function selectElementText(element) {
  var range, selection;    
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();        
    range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// Загрузить js для расчета статистики диких существ
if(document.getElementById('wildStatCalc')){
    importScript('MediaWiki:WildCreatureStats.js');
}

// Загрузить js для расчета рецептов
if(document.getElementById('cookingCalc')){
    importScript('MediaWiki:CookingCalc.js');
}
 
// Загрузить js для расчета статистики приручения
if(document.getElementById('TamingStatCalc')){
    importScript('MediaWiki:TamingCreature.js');
} 

// Загрузить js для расчета играмм
if(document.getElementById('engramTable')){
    importScript('MediaWiki:CalcEngram.js');
}  

// Загрузить js для расчета урона
if(document.getElementById('damageTable')){
    importScript('MediaWiki:CalcDamage.js');
}  

// Загрузить js для расчета характеристик игрока
if(document.getElementById('HumanStat')){
    importScript('MediaWiki:CalcHumanStat.js');
}  

// Загрузить js для расчета характеристик игрока
if(document.getElementById('resourcesCalc')){
    importScript('MediaWiki:CalcResources.js');
}  

importArticles({
    type: 'script',
    articles: [
       'MediaWiki:Satan23666/IPfunction.js', //Парсер
    ]
}); 
 
// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
function bindTT() {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink") == false) $t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).mouseover(showTip).mouseout(hideTip).mousemove(moveTip);
}
 
// check to see if it is active then do it
$(function() {
$("#bodyContent").mouseover(hideTip);
$("#bodyContent").append('<div id="tfb" class="htt"></div>');
$tfb = $("#tfb");
$("#bodyContent span.ajaxttlink").each(bindTT);
}); 

/* Simple tooltips */
importScriptPage('MediaWiki:Tooltip.js', 'joeplayground');
 
function addMastheadTags() {
  var rights = {};
  
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
       $('.UserProfileMasthead .masthead-info span.tag').remove();
       for( var i=0, len=rights[user].length; i < len; i++) {
         $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    } 
}; 
 
/* Таймер */

function plural(i,one,two,many){
  if(10<=(i%100)&&(i%100)<=20) return many;
  switch(i%10){
    case 1:
    return one;
    case 2:
    case 3:
    case 4:
    return two;
    default:
    return many;
  }
}
 
function updateTimer()
{
  var now = new Date()
  $('.timer:not(.stop)').each(function(){
    var dataTo = $(this).data('data-to');
    var dataEnd = $(this).attr('data-end');
    var dataDelimFull = $(this).attr('data-delim-full');
    //var dataShowMonth = $(this).attr('data-show-month');
    var diff = Math.floor((dataTo - now)/1000);
	if(diff<0) {
      if(dataEnd === 'text') {$(this).text($(this).attr('data-text')); $(this).addClass('stop'); return;}
      else if(dataEnd === 'stop') {diff=0; $(this).addClass('stop');}
      else diff = -diff;
	}
 
    $('.second .num',this).text(diff%60);
    if(dataDelimFull) $('.second .small',this).text(plural(diff%60,'секунда','секунды','секунд'));
    $('.minute',this).attr('title','или '+diff+' '+plural(diff,'секунда','секунды','секунд'));
    diff=Math.floor(diff/60);
 
    $('.minute .num',this).text(diff%60);
    if(dataDelimFull) $('.minute .small',this).text(plural(diff%60,'минута','минуты','минут'));
    $('.hour',this).attr('title','или '+diff+' '+plural(diff,'минута','минуты','минут'));
    diff=Math.floor(diff/60);
 
    $('.hour .num',this).text(diff%24);
    if(dataDelimFull) $('.hour .small',this).text(plural(diff%24,'час','часа','часов'));
    $('.day',this).attr('title','или '+diff+' '+plural(diff,'час','часа','часов'));
    diff=Math.floor(diff/24);
 
    $('.day .num',this).text(diff);
    if(dataDelimFull) $('.day .small',this).text(plural(diff,'день','дня','дней'));
  });
}
 
$(function(){
  var now = new Date()
  $('.timer').each(function(){
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('М')).addClass('month').css('display',$(this).attr('data-show-month')?'':'none'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('Д')).addClass('day'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('Ч')).addClass('hour'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('М')).addClass('minute'));
    $(this).append($('<span>').append($('<span>').addClass('num')).append($('<span>').addClass('small').css({'font-size':'30%','margin':'0px 4px'}).text('C').css('display',$(this).attr('data-delim-second')?'':'none')).addClass('second').attr('title','или много миллисекунд'));
    var dataTo = new Date($(this).attr('data-to'));
    var dataEnd = $(this).attr('data-end');
    var dataRepeat = $(this).attr('data-repeat');
    var dataRepeatCount = $(this).attr('data-repeat-count')*1;
	var diff = Math.floor((dataTo - now)/1000);
	if (dataEnd === 'repeat') 
      while(diff<0) 
      {
        switch(dataRepeat.toLowerCase())
        {
          case 'year':
            dataTo.setFullYear(dataTo.getFullYear()+dataRepeatCount); break;
          case 'month':
            dataTo.setMonth(dataTo.getMonth()+dataRepeatCount); break;
          case 'day':
            dataTo.setDate(dataTo.getDate()+dataRepeatCount); break;
        }
        diff = Math.floor((dataTo - now)/1000);
      }
	$(this).data('data-to',dataTo);
  });
  updateTimer();
  setInterval(updateTimer, 1000);
});

/* Для подсчёта опыта за убийства существа выбранного уровня */
var creatureKillXPDiv = null;
var creatureKillXPResultEl = null;

if (creatureKillXPDiv = document.getElementById('creatureKillXP')) {
  if (creatureKillXPDiv.dataset.basexp) {
    creatureKillXPDiv.innerHTML = 'За уровень ' + 
                            '<input' + 
                            ' type="number"' + 
                            ' min="1"' + 
                            ' max="999999"' + 
                            ' maxlength="6"' + 
                            ' value="1"' + 
                            ' onchange="creatureKillXPResultEl.innerHTML = updateXPLevel(' + creatureKillXPDiv.dataset.basexp + ', this.value)"' + 
                            ' onkeyup="creatureKillXPResultEl.innerHTML = updateXPLevel(' + creatureKillXPDiv.dataset.basexp + ', this.value)"' +
                            ' style="width:3.5em">: ' + 
                            '<span id="creatureKillXPResult"></span> Опыта';
    creatureKillXPResultEl = document.getElementById('creatureKillXPResult');
    creatureKillXPResultEl.innerHTML = updateXPLevel(creatureKillXPDiv.dataset.basexp, 1);
  }
}
 
function updateXPLevel(baseXP, level) {
    return (baseXP * (1 + (level - 1) * 0.1)).toFixed(2);
}

/*Скрипт альтернативного виджета дискорда*/
/*Автор скрипта: Сибирский Смотритель*/
(function () {
 
if ( $('#WikiaRail').length )
    initDiscordModule();
 
function initDiscordModule() {
    console.log("Getting data...");
    var discordJSON = "https://discordapp.com/api/servers/304855554705063936/embed.json";
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            var data = JSON.parse(request.responseText);
            setupModule(data);
        }
    };
    request.open("GET", discordJSON, true);
    request.send();
}
 
function setupModule(data) {
    console.log("Building module...");
    var $module = 
    $('<section class="ChatModule module">' +
        '<table>' +
            '<tbody>' +
                '<tr>' +
                    '<td style="vertical-align:middle; width:100%;">' +
                        '<p class="chat-name">' +
                            '<a href="https://ru.wikipedia.org/wiki/Discord" target="_blank">Discord</a> – бесплатный мессенджер для публичного общения вне Фэндома. <b>Подробнее <a href="http://ru.ark-survival-evolved.wikia.com/wiki/Шаблон:Discord" target="_blank">тут</a></b>' +
                        '</p>' +
                    '</td>' +
                      '<td style="vertical-align:middle; width:90px;">' +
                        '<center>' +
                            '<img alt="Discord" src="https://discordapp.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg" class="discord-icon">' +
                            '<span>В сети: <span id="discord-counter">?</span></span>' +
                            '<button class="discord-joined">Войти в чат</button>' +
                        '</center>' +
                      '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<hr/>' +
                        '<h4>Пользователи онлайн <div class="discord-chevron" style="float: right"></div></h4>' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<ul class="discord-list"></ul>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>' +
    '</section>');
 
    $module.find('.discord-joined').attr('onclick', "window.open('" + data.instant_invite + "','_blank')");
    $module.find('#discord-counter').text(data.members.length);
 
    data.members.forEach(function (v) {
        var $member = $('<li class="discord-member">' +
            '<div class="discord-avatar">' +
                '<img />' +
            '</div>' +
        '</li>');
        $member.append(v.username + (v.bot ? ' <span class="discord-bot">BOT</span>' : ''));
        $member.find('.discord-avatar').addClass("discord-" + v.status);
        $member.find('img').attr("src", v.avatar_url);
 
        $module.find(".discord-list").append($member);
    });
 
    var toggle      = $module.find('.discord-chevron'),
        collapsible = $module.find('.discord-list');
 
    collapsible.hide();
    toggle.click(function() {
        if ( !toggle.hasClass('opened') ) {
            collapsible.slideDown();
            toggle.addClass('opened');
        } else {
            collapsible.slideUp();
            toggle.removeClass('opened');
        }  
    });
 
    $('#WikiaRail').prepend($module);
    console.log("Discord module has currently loaded");
}
 
})();