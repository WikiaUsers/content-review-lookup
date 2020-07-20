/**
 * ======================================
 * =           OPM:HNK Forum            =
 * ======================================
 * = @fandom One Punch Man: A Hero      =
 * =         Nobody Knows               =
 * = @author XDavidXtreme               =
 * = @version 0.1                       =
 * =============Description==============
 * = An alternative for Discussions,    =
 * = Forum Extension, Wiki-Style Forums =
 * = and Talk Pages.                    =
 * ======================================
 */

;(function($, mw) {

var namespace = mw.config.get('wgNamespaceNumber');
var title = mw.config.get('wgTitle');
var userid = mw.config.get('wgUserId');
var usergroup = mw.config.get('wgUserGroups');
var authordata;
var database;
var board;
var category;
var thread;
var forum = 0;

if (namespace == -1) {
    if(title.includes("OPMHNK/Forum"))
    {
        if (title == 'OPMHNK/Forum')
            forum = 1;
        else if (/[a-z]/ig.test((title.split('Forum:', 2))[1]))
            forum = 2;
        else if ((/[0-9]/g.test((title.split('Forum:', 2))[1])))
            forum = 3;
        else
            return;
    }
}

Forum = {

    Board: function() {
    
        $.each(board.dataCategory, function(k, v) {
            var CategoryLink = '/wiki/Special:OPMHNK/Forum:' + k;
            $('.WikiaArticle').append('<h2 class="cForumTitle"><a href="#">' + k + ' </a></h2><ol class="cForumList" data-role="Forum"></ol>');
            for (var i = 0; i < v.length; i++) {
                var BoardLink = '/wiki/Special:OPMHNK/Forum:' + v[i].replace(" ", "_");
                var Description = board.dataBoard[v[i]].description;
                $('.cForumList:last-child').append('<li class ="cForumRow" data-forumid="' + v[i] + '"><div class="cForumRowMain"><h4 class="cForumRowTitle"><a href="' + BoardLink + '">' + v[i] + '</a></h4></div><div class="cForumRowDescription"><p>' + Description + '</p></div></li>');
            }
        });
    },

    Category: function() {
          
        var BoardName = title.split("Forum:", 2)[1];
        var BoardLink = title.split("Forum:", 2)[1].replace(" ","_");
        var BoardPage = '/wiki/Special:OPMHNK/Forum:' + BoardLink;
        var Page = 1;
        var urlParams = new URLSearchParams(location.search);
        if (urlParams.has('page'))
            Page = urlParams.get('page');
        var PreviousPageID = Page - 1;
        var PreviousPage = '/wiki/Special:OPMHNK/Forum:' + BoardLink + '?page=' + PreviousPageID;
        var NextPageID = Page + 1;
        var NextPage = '/wiki/Special:OPMHNK/Forum:' + BoardLink + '?page=' + NextPageID;
        var ForumThreadPerPage = 30;
        var LastPageID = Math.ceil((Object.keys(category.dataThread[BoardName]).length) / ForumThreadPerPage);
        if(Page > LastPageID)
            Page = LastPageID;
        var LastPage = '/wiki/Special:OPMHNK/Forum:' + BoardLink + '?page=' + LastPageID;
    
        $('.WikiaArticle').append('<div data-controller="ForumPage"> <div class="bForumBox"> <div class="bForumButtonBar"> <div data-role="tablePagination">	<ul class="bForumPagination" id="' + BoardPage + '" data-pages="' + LastPageID + '"></ul></div></div><ol class="cForumList" data-role="Board"></ol>');
    
        if (Page > 1) {
            $('.bForumPagination').append('<li class="PaginationFirst"><a href="' + BoardPage + '" data-page="1"> <i class="fa fa-angle-double-left"></i></a></li>	<li class="PaginationPrevious"><a href="' + PreviousPage + '" data-page="' + PreviousPageID + '">Prev</a></li> ');
        }
    
        for (var i = Page - 5; (i <= Page + 5) && (i <= LastPageID); i++) {
            if (i < 1)
                i = 1;
            var PageName = '/wiki/Special:OPMHNK/Forum:' + BoardLink + '?page=' + i;
            $('.bForumPagination').append('<li class="PaginationPage"><a href="' + PageName + '" data-page="' + i + '">' + i + '</a></li> '
            );
            if (i == Page) {
                $(".PaginationPage").last().addClass("PaginationActive");
            }
        }
    
        if ((Page < LastPageID) && (LastPageID > 1))
          $('.bForumPagination').append('<li class="PaginationNext"><a href="' + NextPage + '" data-page="' + NextPageID + '">Next</a></li> <li class="PaginationLast"><a href="' + LastPage + '"	data-page="' + LastPageID + '"><i class="fa fa-angle-double-right"></i></a></li> <li class="PaginationJump"></li>'
          );
    
        for (var j = 0; j < Object.keys(category.dataThread[BoardName]).length; j++) {
            var index = Object.keys(category.dataThread[BoardName]);
            var Name = category.dataThread[BoardName][index[j]].name;
            var ID = Object.getOwnPropertyNames(category.dataThread[BoardName])[j].slice(7);
            var ThreadLink = '/wiki/Special:OPMHNK/Forum:' +  ID;
            $('.cForumList').append('<li class ="cForumRow" data-forumid="' + ID + '"><div class="cForumRowMain"><h4 class="cForumRowTitle"><a href="' + ThreadLink + '">' + Name + '</a></h4></div></li>'
            );
        }
    },

    Create: function() {
        if (userid == "null")
          return;
          
        $('.WikiaArticle').append('<div id="ThreadContent" class="ThreadPanel">	<div id="ThreadContentMain" style="display: block">	<ul class="ThreadVertical">	<li class="ThreadContentRow"> <label class="ThreadContentRowLabel" for="ThreadTitle">Title<span class="ThreadRequired">Required</span></label> <div class="ThreadContentRowTitle"> <input type="text" name="ThreadTitle"	maxlength="254"></div></li>	<li class="ThreadContentRow">	<label class="ThreadContentRowLabel" for="ThreadTitle"><span class="ThreadRequired">Required</span></label> <div class="ThreadContentRowEditor"> <div class="ThreadContentEditor" data-role="editor"> <div class="Editor"	data-toolbar=""> <div data-role="EditorComposer" class="EditorComposer" style="display; table;"> <div id="EditorContent" class="EditorContent" role="presentation" style="height: auto;"> <div class="EditorContentEditable" hidefocus="true" contenteditable="true" tabindex="1" spellcheck="true" role="textbox" style="max-height: 737px;"></div></div></div></div></div></ul></div></div> <div class="ThreadSubmit"> <a href="#" class="ThreadSubmitConfirm">Submit Thread</button></div>');
        
        $('.ThreadSubmitConfirm').click(function() {
            $('.ThreadSubmitConfirm').css("display", "none");
            Forum.Thread();
        });
    },

    Thread: function() {
        var BoardName = (title.split("Forum:", 2)[1]).replace("_", " ");
        var ThreadID = Object.keys(database.dataThread).length + 1;
        var Title = $("input[type=text][name=ThreadTitle]").val();
    
        category.dataThread[BoardName]["Thread " + ThreadID] = {"name": Title,"restriction": "public"};
    
        var Content = $('.EditorContentEditable').text();
        
        var ThreadYear = ("0" + new Date().getUTCFullYear()).slice(-4);
        var ThreadMonth = ("0" + (new Date().getUTCMonth() + 1)).slice(-2);
        var ThreadDay = ("0" + new Date().getUTCDate()).slice(-2);
        var ThreadHours = ("0" + new Date().getUTCHours()).slice(-2);
        var ThreadMinutes = ("0" + new Date().getUTCMinutes()).slice(-2);
        var ThreadSeconds = ("0" + new Date().getUTCSeconds()).slice(-2);
        var ThreadLink = 'Forum_talk:' + ThreadID + '/@comment-' + userid + '-' + ThreadYear + '' + ThreadMonth + '' + ThreadDay + '' + ThreadHours + '' + ThreadMinutes + '' + ThreadSeconds + '';
        
        var Data1 = {'action': 'edit','title': ThreadLink,'text': Content,'token': mw.user.tokens.get('editToken'),'format': 'json'};
        var Data2 = {"title": "OPMHNKForumThread","snippet": JSON.stringify(category),"language": "JSON"};
        var ThreadObject = {"name": Title,"restriction":"public","post": [{"Thread": {"id": ThreadLink}}],"topic": []};
        var Data3 = {"title": "OPMHNKForumThread" + ThreadID,"snippet": JSON.stringify(ThreadObject),"language": "JSON"};
    
        $.post(mw.util.wikiScript('api'), Data1);
        $.ajax({
            url: 'https://www.friendpaste.com/' + database.dataCategory.ForumThread,
            type: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(Data2),
        });
        $.ajax({
            url: 'https://www.friendpaste.com/',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(Data3),
            success: function(response) {
                Forum.Database(response.id, ThreadID);
            }
        });
    },

    Database: function(ForumNewThread, ThreadID) {
        database.dataThread["ForumThread" + ThreadID] = ForumNewThread;
        var Data = {"title": "OPMHNKForumDatabase","snippet": JSON.stringify(database),"language": "JSON"};
        $.ajax({
            url: 'https://friendpaste.com/heXkHRwvuNEPuU4cvzOIA',
            type: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(Data),
            success: function(response) {
                location.href = "/wiki/Special:OPMHNK/Forum:" + ThreadID;
            }
        });
    },
  
    Reply: function() {
        
        if (userid == "null")
            return;
          
        var AuthorName = authordata.items[0].name;
        var AuthorProfile = authordata.items[0].url;
        var AuthorAvatar = (authordata.items[0].avatar).replace('\/scale-to-width-down\/100', '\/scale-to-width-down\/54');
        
        $('.WikiaArticle').append('<div data-role="replyArea" class="ForumReply"><form accept-charset="utf-8" class="ForumReplyForm" action="' + thread + '" method="post" enctype="multipart/form-data"><div class="ForumReplyComposer"><div class="ForumReplyAvatar"><a href="' + AuthorProfile + '" class="ForumReplyAuthorAvatar" title="Go to ' + AuthorName + '\'s profile"><img src="' + AuthorAvatar + '" alt="' + AuthorName + '"></a></div><div class="ForumReplyComposerEditor"><div class="ForumReplyEditor"><div class="ForumReplyEditorMain"><div class="ForumReplyEditorDummy" tabindex="1"><i class="fa fa-comment-o"></i> Post in this thread...</div> <div class="ForumReplyEditorContent"><div class="EditorMain" dir="ltr" lang="en" role="application"><div class="EditorContentPost" role="presentation"><div class="EditorContentBox" role="presenation" style="height: auto;"><div class="EditorContentText" hidefocus="true" contenteditable="true" tabindex="1" spellcheck="true" role="textbox" style="max-height: 737px;"></div></div></div></div></div></div></div> <ul class="ForumReplyHorizontalBar"><li><button type="button" class="ForumReplySubmit" tabindex="2" accesskey="s" role="button">Submit Reply</button>'
        );
        
        $('.ForumReplyEditorDummy').one("click", function() {
            $('.ForumReplyEditorDummy').css("display", "none");
            $('.ForumReplyEditorContent').css("display", "block");
            $('.ForumReplyHorizontalBar').css("display", "block");
            $('.EditorContentText').focus();
        });
    
        $('.ForumReplySubmit').one("click", function() {
            $('.ForumReplySubmit').css("display", "none");

            var ThreadID = title.split("Forum:", 2)[1];

            var ThreadPost = Forum.Date(ThreadID);
            var Content = $('.EditorContentText').text();
            var Reply = "Thread";

            var data = {"action": 'edit',"title": ThreadPost,"text": Content,"token":mw.user.tokens.get('editToken'),"format": 'json'};

            $.post(mw.util.wikiScript('api'), data)
            var PostObject = {};
            PostObject["Post " + (Object.keys(thread.post[0]).length)] = {"id":ThreadPost,"reply": Reply};
            Object.assign(thread.post[0], PostObject);
            var Data = {"title": "OPMHNKForumThread" + ThreadID,"snippet": JSON.stringify(thread),"language": "JSON"};
            $.ajax({
                url: 'https://friendpaste.com/' + database.dataThread["ForumThread" + ThreadID],
                type: 'PUT',
                data: JSON.stringify(Data),
                contentType: "application/json",
                success: function(response) {
                    location.href += (location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge';
                }
            });
        });
    },
  
    Date: function(ThreadID) {
            var NewDate = new Date();
            var ThreadYear = ("0" + NewDate.getUTCFullYear()).slice(-4);
            var ThreadMonth = ("0" + (NewDate.getUTCMonth() + 1)).slice(-2);
            var ThreadDay = ("0" + NewDate.getUTCDate()).slice(-2);
            var ThreadHours = ("0" + NewDate.getUTCHours()).slice(-2);
            var ThreadMinutes = ("0" + NewDate.getUTCMinutes()).slice(-2);
            var ThreadSeconds = ("0" + NewDate.getUTCSeconds()).slice(-2);
            var ThreadPost = 'Forum_talk:' + ThreadID + '/@comment-' + userid + '-' + ThreadYear + '' + ThreadMonth + '' + ThreadDay + '' + ThreadHours + '' + ThreadMinutes + '' + ThreadSeconds + '';
            return ThreadPost;
    },

    Post: function(index, name, value) {
        var authorid = (value.id.split('-', 2))[1];
        var Data1 = {"ids": authorid};
        var Data2 = {"title": value.id,"action": 'raw',"cb": Math.ceil(new Date().getTime() / 1000),"dataType": 'text'};
        $.when(
            $.post('https://opmhnk.fandom.com/api/v1/User/Details', Data1, 'json'),
            $.get(mw.util.wikiScript(), Data2)
        )
        .then(function(response1, response2) {
            data = response1[0];
            text = response2[0];
            var AuthorName = data.items[0].name;
            var AuthorProfile = data.items[0].url;
            var AuthorAvatar = (data.items[0].avatar).replace('\/scale-to-width-down\/100', '');
            
            var NewDate = (value.id.split('-', 3))[2].toString();
            var Year = NewDate.slice(0, 4);
            var Month = NewDate.slice(4, 6);
            var Day = NewDate.slice(6, 8);
            var Hour = NewDate.slice(8, 10);
            var Minute = NewDate.slice(10, 12);
            var Second = NewDate.slice(12, 14);
        
            $('.WikiaArticle').append('<div class="ForumPost">	<div data-role="ForumComment" class="ForumComment">	<a id=' + index + '></a><article id="' + index + '" class="ForumArticle"> <aside class="ForumCommentAuthor">	<h3 class="ForumCommentAuthorName">	<strong><a href="' + AuthorProfile + '" title="Go to ' + AuthorName + '\'s profile" class="ForumCommentAuthorNameA">' + AuthorName + '</a></strong></h3>	<ul class="ForumCommentAuthorInfo">	<li class="ForumCommentAuthorPhoto"><a href="' + AuthorProfile + '" class="ForumCommentPhoto" title="Go to ' + AuthorName + '\'s profile"><img src="' + AuthorAvatar + '" alt="' + AuthorName + '"></a></li></ul></aside>	<div class="ForumCommentContent">	<div class="ForumCommentContentMain">	<div class="ForumCommentContentMeta">	<div class="ForumCommentContentDate"><a href="' + index + '" class="ForumCommentContentDateA">Posted <time datetime="' + Year + '-' + Month + '-' + Day + 'T' + Hour + ':' + Minute + ':' + Second + 'Z">' + Month + '/' + Day + '/' + Year + '</time></a></div></div> <div class="ForumCommentContentPost"> <div data-role= "CommentContent" class="ForumCommentContentText"> <p>' + text + '</p></div></div></div></div></article></div></div>'
        );                
        });
    }
};

if (forum == 1) {
    $('.WikiaArticle').empty();
    $('.page-header__page-subtitle').empty();
    $('.page-header__title').text("Forum");
    $('.page-header__page-subtitle').append('Forum');
    $.getJSON("https://friendpaste.com/heXkHRwvuNEPuU4cvzOIA/raw")
        .then(function(response) {
            database = response;
                $.getJSON('https://friendpaste.com/' + database.dataBoard.ForumBoard + '/raw')
                    .then(function(response) {
                        board = response;
                        Forum.Board();
                    });
        });
} else if (forum == 2) {
    $('.WikiaArticle').empty();
    $('.page-header__page-subtitle').empty();
    $('.page-header__title').text((title.split('Forum:', 2))[1].replace("_", " "));
      $('.page-header__page-subtitle').append(
      	'<a href = "/wiki/Special:OPMHNK/Forum">Forum</a> > ' + (title.split('Forum:', 2))[1].replace("_", " ")
      );
    $.getJSON("https://friendpaste.com/heXkHRwvuNEPuU4cvzOIA/raw")
        .then(function(response) {
        	database = response;
            $.getJSON('https://friendpaste.com/' + database.dataCategory.ForumThread + '/raw')
                .then(function(response) {
                    category = response
                    Forum.Category();
                    if((!(category.dataRestriction.includes(title.split("Forum:", 2)[1].replace("_", " ")))) || usergroup.includes("sysop"))
                        Forum.Create();
                });
        });
} else if (forum == 3) {
    $('.WikiaArticle').empty();
    $('.page-header__page-subtitle').empty();
        $.getJSON("https://friendpaste.com/heXkHRwvuNEPuU4cvzOIA/raw")
            .then(function(response) {
                database = response;
                var number = title.split("Forum:", 2)[1];
                $.getJSON('https://friendpaste.com/' + database.dataThread["ForumThread" + number] + '/raw')
                    .then(function(response) {
                        thread = response;
                        $('.page-header__title').text(thread.name);
                            $('.page-header__page-subtitle').append('<a href = "/wiki/Special:OPMHNK/Forum">Forum</a> > ' + thread.name
                        );
                        for (var i = 0; i < Object.keys(thread.post[0]).length; i++) {
                            var index = i;
                            var name = Object.keys(thread.post[0])[index];
                            var value = thread.post[0][name];
                            Forum.Post(index, name, value);
                        }
                        if((thread.restriction == "public") || (usergroup.includes("sysop")))
                        {
                            var data = {"ids": userid};
                            $.post('https://opmhnk.fandom.com/api/v1/User/Details', data, function(response) {
                            authordata = response;
                            Forum.Reply();
                            }, 'json')
                        }
                    });
        });
}

})(this.jQuery, this.mediaWiki);