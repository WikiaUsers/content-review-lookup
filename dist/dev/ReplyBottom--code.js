//<source lang="javascript">
/**
* Moves blargarticle comments below their children, for easier replies
* @Author RansomTime
* Experemental.
**/
$(function() {
   var comReplies = function ( id ) {
      // Finds if the comment has children, returns the ID of the children in the comments ul
      if ($('#com-'+id)) {
            var comments = $('#article-comments-ul').children();
            var found = -1;

            for (var i = 0; i < comments.length; i++) {
            if (comments[i].id === "comm-" + id) {
                  found = i;
                  break;
            }
         }

         if (found === -1) {return -1;}

         if (comments[found + 1] && comments[found+1].className === "sub-comments") {
            return found + 1;
         }
      }
      return -1;
   };

   var moveBox = function(id) {
      //Moves the commentBox
      var commentBox = $('#comm-' +id).find(".article-comm-edit-box")[0];
      if (commentBox) {
         var hasReplies = comReplies(id);
         if (hasReplies !== -1) {
            var comments = $('#article-comments-ul').children();
            console.log(comments[hasReplies]);
            comments[hasReplies].appendChild(commentBox);
         }
      }
   };

   var getCommentIDs = function() {
      // Loops through all comments in the page and gets their IDs
      var res = [];
      var comments = $('#article-comments-ul').children();
      for (var i = 0; i < comments.length; i++) {
          if (comments[i].id) {
              res.push(comments[i].id.substring(5));
         }
      }
      return res;
   };

   $("#WikiaArticleComments").bind("DOMSubtreeModified", function() {
       var commentIDs = getCommentIDs();
       for (var i = 0; i < commentIDs.length; i++) {
           moveBox(commentIDs[i]);
       }
   });
});
//</source>