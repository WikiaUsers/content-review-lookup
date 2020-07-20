$("div.FriendFinderSearch").append('<form id="friend_finder_search_form"><label for="friend_finder_id">寵物ID:</label><input id="friend_finder_search" type="number" maxlength="4" size="4" min="1" max="9999" required><input type="submit" value="搜尋"></form><table><tr><td id="friend_finder_monster_icon"></td><td id="friend_finder_monster_name"></td></tr></table>');

(function friendFinder(){
  /**********make sure JS library are ready**********/
  if (typeof jQuery=="undefined") {
    setTimeout(friendFinder,100);
    return;
  }

  /*************functions*************/
  function findMonsterData(id){
    if (id<10) { id = "00"+id; } else if (id<100) { id = "0"+id;}
    /*reset*/
    $("#friend_finder_monster_icon,#friend_finder_monster_name").text("");

    if ($(".monster_data[data-no="+id+"]").length > 0) {
      /*found*/
      /*icon*/
      var icon = $("#friend_finder_icon_source .monster_data[data-no="+id+"]").clone();
      icon.appendTo($("#friend_finder_monster_icon"));
      $("#friend_finder_monster_name").text($(".monster_name", icon).text());
    } 
  }
  
  /************monitor*************/
  $("#friend_finder_search").bind('input', function(e){
    findMonsterData(parseInt($(this).val()));
  });
  $("#friend_finder_search_form").submit(function(e){
    e.preventDefault();
    var id = $(".monster_data", "#friend_finder_monster_icon").data("no");
    if (typeof id == "undefined") {
      alert("請輸入寵物ID");
    } else {
      window.location = "http://zh.pad.wikia.com/wiki/"+id+"/FriendFinder";
    }
  });

})();