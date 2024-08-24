$('h2:contains("Appearances and references")+ul').wrap('<div class="collapsible-list">');
$('h2:contains("Bibliography")+ul').wrap('<div class="collapsible-list">');
$('h2:contains("Credits")+ul').wrap('<div class="collapsible-list">');
$('h2:contains("Contents")+ul').wrap('<div class="collapsible-list">');

var smallTreeCount = 5;

$('.collapsible-list').each(function(index, currentTree){
  const currentButtonID = 'mainButton-'+index;
  const numberOfSubLists = $(this).find('ul li ul').length;
  const total = $(this).find('ul li').length - numberOfSubLists;
  const buttonLabel = (total > smallTreeCount) ? 'show all' : 'hide all';
  const button = (numberOfSubLists === 0) ? '' : ' <small>(<a id="'+currentButtonID+'" class="show-hide-button">'+buttonLabel+'</a>)</small>';
  const desc = $('<div>This list includes '+total+' items'+button+'.</div>');

  $(this).prepend(desc);

  if (total > smallTreeCount){
    $(this).find('ul li ul').hide();
  }

  $('#'+currentButtonID).click(function(){
    if ($(this).text() === "show all"){
      $(currentTree).find('ul li ul').show();
    } else {
      $(currentTree).find('ul li ul').hide();
    }

    $(this).text(($(this).text() === "show all") ? "hide all" : "show all");
  });
});

$('.collapsible-list li ul').each(function(index, currentTree){
  const currentButtonID = 'pane-'+index++;
  const total = $(this).find('li').length - $(this).find('ul').length;
  const button = '<a id="'+currentButtonID+'" class="show-hide-button">'+total+'</a>';

  $(this).before('<small>('+button+')</small>');

  $('#'+currentButtonID).click(function(){
    $(currentTree).toggle();
  });
});