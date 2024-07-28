var smallTreeCount = 3;

$('.appear').each(function(index, currentTree){
  const currentButtonID = 'mainButton-'+index;
  const numberOfSubLists = $(this).find('ul li ul, ol li ol, ul li ol, ol li ul').length;
  const total = $(this).find('ul li, ol li').length - numberOfSubLists;
  const buttonLabel = (total > smallTreeCount) ? 'show all' : 'hide all';
  const button = (numberOfSubLists === 0) ? '' : ' (<a id="'+currentButtonID+'" class="show-hide-button">'+buttonLabel+'</a>)';
  const desc = $('<div>This list includes '+total+' items'+button+'.</div>');

  $(this).prepend(desc);

  if (total > smallTreeCount){
    $(this).find('ul li ul, ol li ol, ul li ol, ol li ul').hide();
  }

  $('#'+currentButtonID).click(function(){
    if ($(this).text() === "show all"){
      $(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').show();
    } else {
      $(currentTree).find('ul li ul, ol li ol, ul li ol, ol li ul').hide();
    }

    $(this).text(($(this).text() === "show all") ? "hide all" : "show all");
  });
});

$('.appear li ul, .appear li ol').each(function(index, currentTree){
  const currentButtonID = 'pane-'+index++;
  const total = $(this).find('li').length - $(this).find('ul, ol').length;
  const button = '<a id="'+currentButtonID+'" class="show-hide-button">'+total+'</a>';

  $(this).before('('+button+')');

  $('#'+currentButtonID).click(function(){
    $(currentTree).toggle();
  });
});