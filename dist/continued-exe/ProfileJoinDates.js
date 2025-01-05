//Credit goes to the Sonic Wiki Zone https://sonic.fandom.com/wiki/MediaWiki:ProfileJoinDates.js
/*Display first post date and first edit date on user profiles*/
/*By @Luma.dash*/
mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function(){
    var $newul,
    drivingObj = {
        callForumInfo: function(id){
            $.get(mw.config.get('wgScriptPath') + '/wikia.php', {
                    controller: "DiscussionContribution",
                    method: "getPosts",
                    userId: id,
                    format: "json"
            }).then(function (data) {
                            if (data._links.last === undefined) {
                            }
                            if (data._links.first === undefined){
                                return;
                            }
                            drivingObj.getFirstPost(data._links.last === undefined ? data._links.first[0].href : data._links.last[0].href).then(function (data) { //getFirstpost on discussions
                            var postsLength = data._embedded["doc:posts"].length;
                            var post = data._embedded["doc:posts"][postsLength - 1]; //get last post (first in date)
                            postDate = drivingObj.getPostDate(post.creationDate.epochSecond);
                            postDateToString = postDate.toISOString().split('T')[0];
                            postHref = "/f/p/" + post.threadId + "/r/" + post.id;
                            drivingObj.populateProfileCommentor(postDateToString, postHref);
                    })
                .catch(function(e){
                        console.log(e);
                    });
            }).catch(function(e){
                console.log(e);
            })

        },
        callEditorInfo: function(username) {
            var params = {
                action: "query",
                format: "json",
                list: 'usercontribs',
                ucuser: username,
                ucdir: 'newer'
            },
                api = new mw.Api();      
            api.get(params).then(function (data) {
                var firstEdit = data.query.usercontribs[0];
                if (firstEdit ===  undefined )
                    return
                drivingObj.populateProfileEditor(firstEdit);
            })
            .catch(function (e){
                console.log(e);
            })
        },
        populateProfileEditor: function(data) {
            var $liEdit,
                $anchorEdit;
            $anchorEdit = $('<a href ="/wiki/' + data.title + '?diff=' + data.revid + '">' + data.timestamp.split('T')[0] + '</a>')
            $liEdit = $('<li class = "editDate"><p>Joined Wiki since: </p>' + '</li>');
            $liEdit.find('p').append($anchorEdit);
            $newul.append($liEdit);
        },
        populateProfileCommentor: function(date, href) {
            var $liComment,
                $anchorcomment;
            $anchorcomment = $('<a href ="' + href + '">' + date + '</a>')
            $liComment = $('<li class = "postDate"><p>Joined Forum since: </p>' + '</li>');
            $liComment.find('p').append($anchorcomment);
            $newul.append($liComment);
        },
        getFirstPost: function(href) { //ajax call to get first post
            return $.get(href);
        },
        getPostDate: function(epochDate) { //convert epoch to date
            var d = new Date(0);
            d.setUTCSeconds(epochDate);
            return d;
        },
        isNotUserPage: function() {
            return (mw.config.get("wgCanonicalNamespace") !== "User" || (mw.config.get("wgCanonicalNamespace") === "User" && mw.config.get("wgTitle").includes("/") === true));
        },
        isNotMessageWall: function(){
            return (mw.config.get("wgCanonicalNamespace") !== "Message_Wall");
        },
        isNotUserBlog: function(){
            return (mw.config.get("wgCanonicalNamespace") !== "User_blog" || (mw.config.get("wgCanonicalNamespace") === "User_Blog" && mw.config.get("wgTitle").includes("/") === true));
        },
        isNotContributions: function(){
            return (mw.config.get("wgCanonicalNamespace") !== "Special" || mw.config.get("wgTitle").includes("Contributions/") === false);
        },
        isNotProfileActivity: function(){
            return (mw.config.get("wgCanonicalNamespace") !== "Special" || mw.config.get("wgTitle").includes("UserProfileActivity/") === false)
        },
        getUserName: function(){
            return mw.config.get('profileUserName');
        },
        run: function (){
                window.editorPostInfo = true;
                var $identityBox = $('.user-identity-box__info');
                $newul = $('<ul class = "moreInfo">');
                $identityBox.append($newul);
                new mw.Api().get({ //get id to run the functions
                action : "query",
                list: 'users',
                ususers: drivingObj.getUserName(),
                format: 'json',
            }).then(function(data) {
                drivingObj.callEditorInfo(drivingObj.getUserName());
                drivingObj.callForumInfo(data.query.users[0].userid);
            }).catch(function(e){
                console.log(e);
            });
        }
}
    if (drivingObj.isNotUserPage() === true && drivingObj.isNotMessageWall() === true && drivingObj.isNotUserBlog() === true && drivingObj.isNotContributions() === true && drivingObj.isNotProfileActivity() === true) 
        return;
    if (window.editorPostInfo === true)
    		return;
    else {
        var checkProfileShowed = function (){
            if (!$('.user-identity-box').length) {
                setTimeout(checkProfileShowed, 500);
            }
            else 
                drivingObj.run();
        }
        checkProfileShowed();
    }
});