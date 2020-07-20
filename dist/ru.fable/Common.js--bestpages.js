/**************************************************************
 Script: Best pages of the month
 Author: KORN1UX | Website: korniux.net / korniux.wikia.com
 Description: On best pages includes a crown
 Year: 2014
**************************************************************/

//      Configuration (Tip: links with underscores)

var BPagesQuoteMain = 'Fable_Wiki:Лучшая_цитата',
    BPagesArcticlesMain = 'Fable_Wiki:Лучшая_статья',
    BPagesArchiveTranslate = 'Архив';

//      Code. Contains magic 

function BestPages(page, date) {
    if (wgPageName.replace(/_/g, ' ') === page) {
        $('.WikiaPageHeader > .tally').append('<a href="http://' + document.domain + '/wiki/'+ BPagesArcticlesMain +'" title="Лучшая статья за ' + date + '"><img src="https://images.wikia.nocookie.net/__cb20120607080915/fable/ru/images/thumb/f/f3/Crown.png/40px-Crown.png" /></a>');
    }
}

if (wgPageName === BPagesQuoteMain) {
    $('.WikiaPageHeader > h1').css('font-size', '24px');
    if (wgUserName !== 'KORNiUX') {
        $('.WikiaPageHeader > .wikia-menu-button').remove();
    }
    $('.WikiaPageHeader > .talk').remove();
    $('.WikiaPageHeader > h1').after('<a class="button" href="?action=edit&section=new"><img src="https://images.wikia.nocookie.net/__cb20120607080913/fable/ru/images/thumb/f/f3/Crown.png/16px-Crown.png" /> Предложить</a><a class="button" href="/wiki/'+ BPagesQuoteMain +'/'+ BPagesArchiveTranslate +'">'+ BPagesArchiveTranslate +'</a>');
} else if (wgPageName === BPagesArcticlesMain) {
    $('.WikiaPageHeader > h1').css('font-size', '24px');
    if (wgUserName !== 'KORNiUX') {
        $('.WikiaPageHeader > .wikia-menu-button').remove();
    }
    $('.WikiaPageHeader > .talk').remove();
    $('.WikiaPageHeader > h1').after('<a class="button" href="?action=edit&section=new"><img src="https://images.wikia.nocookie.net/__cb20120607080913/fable/ru/images/thumb/f/f3/Crown.png/16px-Crown.png" /> Предложить</a><a class="button" href="/wiki/'+ BPagesArcticlesMain +'/'+ BPagesArchiveTranslate +'">'+ BPagesArchiveTranslate +'</a>');
}

function BPWidget() {
$('.WikiaRail.loaded').append('<div class="module"><a href="/wiki/Project:Возможности/Лучшая_статья" title="Голосовать за лучшую статью!"><img src="https://images.wikia.nocookie.net/__cb20120607080913/fable/ru/images/thumb/f/f3/Crown.png/32px-Crown.png"><span style="margin-left: 15px; line-height: 32px; font-weight: bold; font-family: PT Sans Narrow; font-size:18px;">Голосовать за лучшую статью!</span></a></div>');
}

/** 
* Function for adding content from special page to the bottom of the Chat module in the right rail
*
* By Wildream / Modified by KORN1UX with less bicycle 
*/
function VoteWidget() {
    if ($('.WikiaRail.loaded').length) {
        if(wgCanonicalNamespace === 0 || wgAction!== 'edit') {
            BPWidget();
        }
    } else {
        setTimeout(VoteWidget, 200);
    }
}
VoteWidget();

/**************************************************************
 Below is code for crown icon insertion.
 Syntax: BestPages('Fable III', 'Февраль 2014');
 Your page ----------------|                |
 Your month and year -----------------------|
**************************************************************/

BestPages('Уиспер', 'Апрель 2014');
BestPages('Тереза', 'Июнь - Июль 2014');