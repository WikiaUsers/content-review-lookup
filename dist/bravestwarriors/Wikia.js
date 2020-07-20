$(document).ready(function(){
$.getJSON("[http://bravestwarriors.wikia.com/wiki/List_of_episodes]",
  function(data){
    $.each(data.items, function(item){
      $("<td/>").value().appendTo("#data");
    });

  });
});