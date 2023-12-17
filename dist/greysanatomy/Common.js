/* Any JavaScript here will be loaded for all users on every page load. */
/* Pride toolbar advertisement
var toolbarLabel = 'Disability Pride';
var toolbarLinks = [
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395131', label: 'July 31: Disability Pride - Deaf'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395128', label: 'July 30: Disability Pride - Huntington\'s Disease'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395127', label: 'July 29: Disability Pride - Spinal Stroke'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395124', label: 'July 27: Disability Pride - PTSD'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395121', label: 'July 25: Disability Pride discussion post'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395120', label: 'July 25: Disability Pride - Cancer (Grey\'s Anatomy)'},
    {link: 'https://bit.ly/DisabilityPrideMonth-Chris', label: 'July 24: Going Through the (E)motions with Chris'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395116', label: 'July 24: Disability Pride - Cancer (Private Practice)'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395115', label: 'July 23: Disability Pride - Cancer (Station 19)'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395114', label: 'July 22: Disability Pride - Spina Bifida'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395111', label: 'July 20: Disability Pride - Bipolar Disorder'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395102', label: 'July 18: Disability Pride - Multiple Sclerosis'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395100', label: 'July 17: Disability Pride - Amputation'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395098', label: 'July 16: Disability Pride - Dyslexia'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395097', label: 'July 15: Disability Pride - Autism'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395094', label: 'July 14: Disability Pride - OCD'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395090', label: 'July 13: Disability Pride - Heart disease'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395089', label: 'July 12: Disability Pride - ADHD'},
    {link: 'https://greysanatomy.fandom.com/f/p/4400000000000395084', label: 'July 11: Disability Pride character highlights'}
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools, #WikiaBar .wikia-bar-anon' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wikiabar-button' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<h2 style="margin-left: 16px">Disability Pride Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* Pride logo link
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Disability Pride Month')
        )
        .attr('href', 'https://greysanatomy.fandom.com/f/p/4400000000000395084')
);