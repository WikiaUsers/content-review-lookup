/* Pride toolbar button */
var toolbarLabel = 'Pride';
var toolbarLinks = [
    {link: 'https://bit.ly/FandomPridePlaylist', label: 'Pride spotify playlist'},
    {link: 'https://bit.ly/FandomPrideBlog-toolbar', label: 'Pride blog with Drag Queens interview'},
    {link: 'https://the-handmaids-tale.fandom.com/f/p/4400000000000049978', label: 'Discussion post'},
    {link: 'https://bit.ly/PrideEditorStory-Bart', label: 'Pride Stories: Celebrate with Itsbartbytheway'},
    {link: 'https://bit.ly/PrideEditorStory-Allyship', label: 'How to Strengthen LGBTQIA+ Allyship'},
    {link: 'https://bit.ly/PrideEditorStory-Sam', label: 'Pride Highlight: Meet Sam/Lemon Skweezy'}
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
    '<h2 style="margin-left: 16px">Pride Month</h2>' +
    '<ul class="wds-list wds-is-linked">' + 
        toolbarLinks.map(function(link) {
            return '<li class="custom"><a href="' + link.link + '">' + link.label + '</a></li>';
        }).join('') + 
    '</ul>' + 
'</div>';

toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);

/* Pride logo link */
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Celebrating Pride Month')
        )
        .attr('href', 'https://bit.ly/FandomPrideBlog-header')
);

/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
  var myElement = document.getElementById('mw-hello-world');
  //myElement.innerHTML = '<html>Hello World!!!</html>';
  // remove any content inside tag elements named 'noscript' unless Javascript is disabled (e.g. mercury skin)
  var noscriptElements = document.getElementsByName('mw-helloworld');
  myElement.innerHTML = '<html>'+noscriptElements.length+'</html>';
  for (index = 0; index < noscriptElements.length; index++) {
      noscriptElements[index].innerHTML = '<html>Hello World by name</html>';
  }
}());