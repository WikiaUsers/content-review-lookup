if ($("table").hasClass("FriendFinderInput")===true) {
    $("table.FriendFinderInput").wrap("<form></form>");
    $("form").attr('id',"friend_finder_form");
   // $("form").attr('style',"display:none");
    
    $("table.FriendFinderInput tr:eq(0) th:eq(0)").html('<label for="friend_finder_id">*遊戲ID:</label>');
    $("table.FriendFinderInput tr:eq(1) th:eq(0)").html('<label for="friend_finder_name">*遊戲名字:</label>');
    $("table.FriendFinderInput tr:eq(2) th:eq(0)").html('<label for="friend_finder_rank">*等級:</label>');
    $("table.FriendFinderInput tr:eq(3) th:eq(0)").html('<label for="friend_finder_note">備註:</label>');
    $("table.FriendFinderInput tr:eq(4) th:eq(0)").html('<label for="friend_finder_linkup_wiki_user">連結Wikia:</label>');
    
}