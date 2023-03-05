/* Any JavaScript here will be loaded for all users on every page load. */
/* BHM toolbar advertisement */
var toolbarLabel = 'BHM';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomBHMblog-toolbar', label: 'Fandom blog'},
    {link: 'https://strangerthings.fandom.com/f/p/4400000000003502854', label: 'Discussion post'},
    {link: 'https://strangerthings.fandom.com/f/p/4400000000003503554', label: 'Editing project'},
    {link: 'https://bit.ly/FandomBHMMillerStory', label: 'Editor Story: Meet Miller'},
    {link: 'https://bit.ly/FandomBHMTimeline', label: 'BHM Entertainment Timeline'},
    {link: 'https://bit.ly/FandomBHMInevitablyDope', label: 'Content Creator: Meet Inevitably Dope'},
    {link: 'https://bit.ly/FandomBHMRecap', label: 'Blog: BHM at Fandom recap'},
];
var toolbarElement = document.createElement( 'li' );
var toolbarWrapper = document.querySelector( '#WikiaBar .tools' );
toolbarElement.classList.add( 'custom' );
toolbarElement.classList.add( 'menu' );
toolbarElement.classList.add( 'wds-dropdown' );
toolbarElement.classList.add( 'wds-is-flipped' );
toolbarElement.innerHTML = '<span class="wds-dropdown__toggle">' + 
    '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg><a href="#">' + toolbarLabel + '</a>' + 
'</span>' + 
'<div class="wds-dropdown__content">' + 
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);