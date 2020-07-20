$('.title-design-retro').parent().parent().prev().find('.header-column.header-title > h1').css({'font-family':'Fringe-Schrift','color':'#83A9BE'});

$('.title-design-3d').parent().parent().prev().find('.header-column.header-title > h1').css({'text-shadow':'0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15)','font-family':'eckige-Schrift','color':'grey','font-size':'3.8em','line-height':'.82em'});

$('.paralleluniversum-design').closest('.WikiaPageContentWrapper').addClass('paralleluniversum-design');
$('.paralleluniversum-design').closest('.WikiaMainContent').prev().find('.WikiNav').addClass('paralleluniversum-design');
//reguläres Universum
$('.paralleluniversum-design').closest('.WikiaMainContent').prev().find('nav li:nth-child(2) ul.subnav-2 li.subnav-2-item:first-child ul.subnav-3 li.subnav-3-item a').each(function(key, val) {
    if($(val).text() != 'Peter Bishop') {
        $(val).attr('href',$(val).attr('href') + '#Leben_im_Paralleluniversum');
    }
});
$('.paralleluniversum-design').closest('.WikiaMainContent').prev().find('nav li:nth-child(2) ul.subnav-2 li.subnav-2-item:first-child ul.subnav-3 li.subnav-3-item:first-child a').attr('href','/wiki/BOlivia').text('BOlivia');
$('.paralleluniversum-design').closest('.WikiaMainContent').prev().find('nav li:nth-child(2) ul.subnav-2 li.subnav-2-item:first-child ul.subnav-3 li.subnav-3-item:nth-child(3) a').attr('href','/wiki/Walternativ').text('Walternativ');
//Paralleluniversum
$('.paralleluniversum-design').closest('.WikiaMainContent').prev().find('nav li:nth-child(2) ul.subnav-2 li.subnav-2-item:nth-child(2) ul.subnav-3 li.subnav-3-item a').attr('href',$(this).attr('href') + '#Leben_im_Paralleluniversum');
$('.paralleluniversum-design').closest('.WikiaMainContent').prev().find('nav li:nth-child(2) ul.subnav-2 li.subnav-2-item:nth-child(2) ul.subnav-3 li.subnav-3-item:nth-child(7)').hide();

$('.vereinte-universen-design').closest('.WikiaMainContent').prev().find('.WikiNav > .navbackground').css('background-color','#DC7914');
$('.vereinte-universen-design').closest('.WikiaMainContent').prev().find('.WikiNav > .navbackground div').css('background-color','#DC7914');
$('.vereinte-universen-design').closest('.WikiaMainContent').prev().find('nav li.marked').css('background-color','#DC7914');
$('.vereinte-universen-design').closest('.WikiaMainContent').prev().find('nav li.marked > a').css('border-top','1px solid #DC7914');
$('.vereinte-universen-design').closest('.WikiaMainContent').prev().find('nav li').css('border-bottom', '1px solid #DC7914');