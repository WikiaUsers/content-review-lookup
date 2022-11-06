//Show deleted posts and a list of created threads for users
//by Luma.dash
mw.loader.using( "mediawiki.api" ).then(function () {
    //tracking variables
    var usrName;
    var pageCount = 0;
    var pageLmt = 20;
    var root = [];
    var $liarr = []; //host threads or deleted comments
    var del = false;
    var posts = false; 
    var hideLoadMore = false;
    var index = 0;
    var indexForDeleted = 0;
    var indexforPosts = 0;
    var config = mw.config.get([
        'wgScriptPath',
    ]);
    //construction variables
    var $mbody = $('.mw-body-content');
    var $tabbar = $('<div class = "tabbar"></div>'); //part of the $mobody
    var $tab1 = $('<button class = "tab" id = "th">Threads</button>');
    var $tab2 =  $('<button class = "tab" id = "dp">Deleted replies</button>');
    var $divThread = $('<div class ="divThread"></div>'); //for thread tab content
    var $divDel = $('<div class = "divDel"></div>'); //for del tab content
    var $divEnvelope = $('<div class ="envelope"></div>'); //contains the checkboxes and their labels
    var $showDel = $('<input type="checkbox" id="del" name="del"></input>');
    var $labelforDel = $('<label for="del">Show deleted</label>');
    var $checkLock = $('<input type="checkbox" id="lock" name="lock"></input>');
    var $labelforLock = $('<label for="lock">Check if locked</label>');
    var getURLParts = window.location.href.split('/');
    var runobj = {
    getTime: function(element) {
            var epochTime = element.creationDate.epochSecond; //get unix time
            var d = new Date(0);
            d.setUTCSeconds(epochTime);
            return d;
    },
    toStringThread: function(time, element) {
        var str = '<li><span class = "timestamp">' + time + '</span>'; 
        str+= ': <a href = "https://sonic.fandom.com/f/p/' + element.threadId + '">' + (element.title !== "" ? element.title:"(No content or file)") + '</a><span class = "note" data-checked = ""></span></li>';
        return str;
    },
    toStringComment: function(time, element) {
        var str = '<li><span class = "timestamp">' + time + '</span>'; 
        str+= ':<a href = "https://sonic.fandom.com/f/p/' + element.threadId + '/r/' + element.id + '">' + (element.rawContent !== "" ? element.rawContent : "(No content or File)") + '</a></li>';
        return str;
    },
    findDeleted: function(arr) {
        arr.forEach(function(element) {
            if (element.isDeleted === true && runobj.checkPost(element) === false) {
                var dte = runobj.getTime(element);
                var $li = $(runobj.toStringComment(dte, element));
                $liarr.push($li);
            }
        })
    },
    findLocked: function (th) {
                return $.get(config.wgScriptPath + '/wikia.php', {
                    controller: "DiscussionThread",
                    method: "getThread",
                    threadId: th,
                    viewableOnly: false, //for making deleted posts visible when del is true
                    format: "json", 
                    });
    },
    checkPost: function(element) {
        return (element.creatorId === element.threadCreatedBy.id && (element.title !== "" && element.title !== null)) 
    },
    findPost: function(myarr) { //find only threads
        myarr.forEach(function(element){
            if (runobj.checkPost(element) === true)  {
                var dte = runobj.getTime(element);
                var $li = $(runobj.toStringThread(dte, element));
                if (element.isDeleted === true) {//thread is deleted
                    $li.attr('class', 'deleted'); //mark it as deleted
                    $li.hide(); //do not display it
                }
                $liarr.push($li);
            }
        })   
    },
    callback: function() {
        if (posts === true) {
            $liarr = [];
            for (var i = indexforPosts; i < root.length; i++) //start gathering only the ones not gathered yet
                    for (var j = 0; j < root[i].length; j++) //as long as the number of ajax responses in the ith loading
                        runobj.findPost(root[i][j]._embedded["doc:posts"]);
        }
        else if (del === true) {
                $liarr = [];
                for (var i = indexForDeleted; i < root.length; i++) //start gathering only the ones not gathered yet
                    for (var j = 0; j < root[i].length; j++) { //as long as the number of ajax responses in the ith loading
                        runobj.findDeleted(root[i][j]._embedded["doc:posts"]);
                    }
        }
    },
    getPosts: function() {
        return $.get(config.wgScriptPath + '/wikia.php', {
            controller: "DiscussionContribution",
            method: "getPosts",
            userId: id,
            containerType: "FORUM",
            page: pageCount,
            limit: 100,
            viewableOnly: false,
            format: "json"
    });
    },
    getId: function(){
        return mw.loader.using( "mediawiki.api" ).then(function () {
            return ( new mw.Api( ) ).get( { 
                    action : "query",
                    list: 'users',
                    ususers: usrName,
                    format: 'json',
                } );
            });
    },
    callPost: function () {
        if (pageCount > pageLmt) { //break if pageCount exceeds
            pageLmt += 20; //20,40
            return 1;
        }
        else {
            return runobj.getPosts().then(function (data){ //because of 'then' does not return anything, the returned promise stores no value
                if (data._embedded["doc:posts"].length !== 0){
                    root[index].push(data); //push data to the array at "index"
                    pageCount++;
                    return runobj.callPost();
                }
                else  
                    hideLoadMore = true; //hide button
            });
        }
    },
    startConstruction: function() { 
        runobj.callPost().then(function (){ 
            $('.loader').remove();
            $divEnvelope.append($showDel); //append checkboxes + labels
            $divEnvelope.append($labelforDel);
            $divEnvelope.append($checkLock);
            $divEnvelope.append($labelforLock);
            $mbody.append($tabbar); 
            $tabbar.append($tab1);
            $tabbar.append($tab2);
            $mbody.append($divThread); //append the thread div
            $divThread.append($divEnvelope); //append the checkboxes to the thread div
            $mbody.append($divDel);
            $divThread.hide(); //at first, they are hidden
            $divDel.hide(); //at first, they are hidden
            runobj.handleTabs(); //event handler registerer for the tabs
            runobj.handleCheckbxs();
        }).catch(function (e) { console.log(e)});
},    
    handleTabs: function() { //event handler for tab buttons
    $('.tab').click(function (){ //event handler for each element carrying this class
        if ($('.tab.isActive').length === 0)
            runobj.createHandleMore();
        $('.tab').each(function(){ 
            if (this.className.includes("isActive") === true) //'this' here is '.tab' element 
                this.className = this.className.replace("isActive", "");
        });
        this.className += " isActive"; //'this' here is the button from which the event was fired
        if (this.textContent === "Threads") {
                posts = true; //trigger threads display
                if ($divThread.has('ul').length === 0) { //if $divThread does not have a list (ul) already?
                     runobj.callback();
                     var $ul = $('<ul></ul>');
                     $liarr.forEach(function($li){
                        $ul.append($li);
                    });
                    $divThread.append($ul);
                }
                else if ((indexforPosts + 1) != root.length) { //check if there's a new update array
                    indexforPosts++; //in order to load the next array
                    runobj.callback(); //extract posts only from the current update
                    var $ul = $divThread.find('ul'); //update the ul element
                    $liarr.forEach(function($li){
                        $ul.append($li);
                    });
                    indexforPosts = root.length - 1;
                }
            $divDel.hide();
            $divThread.show();
        }
        else {
            posts = false; //To allow the deleted tab
            if ($divDel.has('ul').length === 0) {
                del = true;
                runobj.callback(); //call findDeleted
                var $ul = $('<ul></ul>');
                $liarr.forEach(function($li){
                    $ul.append($li);
                });
                $divDel.append($ul);
            }
            else if ((indexForDeleted + 1) != root.length) { //check if there's a new update array
                indexForDeleted++; //in order to load the next array
                runobj.callback(); //extract posts only from the current update
                var $ul = $divDel.find('ul'); //update the ul element
                $liarr.forEach(function($li){ //append the new $li
                    $ul.append($li);
                });
                indexForDeleted = root.length - 1;
            }
            $divThread.hide();
            $divDel.show();
        }
    });
    },    
    handleCheckbxs: function() { //event handler for checkboxes
        $divEnvelope.find('input:checkbox').change(function(){
            if (this.name === "del") { //checkbox of showing delete
                if (this.checked === true) {
                    $('.divThread ul li.deleted').each(function(){
                        $(this).show();
                    })
                }
                else {
                    $('.divThread ul li.deleted').each(function(){
                        $(this).hide();
                    })
                }
            }
            else { //checkbox of showing locked
                if (this.checked === true) {
                    var $arrli = $('.divThread ul li');
                    $arrli.each(function() {
                        var lih = this;
                        if ($(lih).find('.note').attr('data-checked') !== "checked") { //only check those not marked as "checked"
                            runobj.findLocked($(lih).find('a').attr('href').match(/\d+/)[0]).then(function(res){ //see if the thread is locked by searching its thread id
                                if (res.isLocked) {
                                    $(lih).find('.note').text(" (Locked)");
                                }
                                $(lih).find('.note').attr('data-checked', "checked");  //mark those now checked
                            });
                        }
                    });
                }
            }
        });
    },    
    createHandleMore: function() {
        if ($('.loadMore').length === 0) {
            var $loadMore = $('<button class = "wds-button wds-is-secondary loadMore">Load More</button>');
            $('.page-content').append($loadMore);
        }
        $('.loadMore').click(function(){
            $('button').attr('disabled','disabled'); //disable all buttons
            root.push([]);
            index++; //add into the next array
            var loadMore = this;
            runobj.callPost().then(function() {
                if (hideLoadMore === true) //is there more posts or that's all?
                    $(loadMore).hide();
                if ($('.isActive').text() === "Threads") { //update the threads tab if it's active
                    indexforPosts++; //in order to load the next array
                    runobj.callback(); //extract posts only from the current update
                    var $ul = $divThread.find('ul'); //update the ul element
                    $liarr.forEach(function($li){
                        $ul.append($li);
                    });
                    indexforPosts = root.length - 1;
                }
                else { //update the deleted comments tab if it's active
                    indexForDeleted++;
                    runobj.callback();
                    var $ul = $divDel.find('ul'); //update the ul element
                    $liarr.forEach(function($li){
                        $ul.append($li);
                    });
                    indexForDeleted = root.length - 1;
                }
            $('button').removeAttr('disabled'); 
        });
    });
    }
};
    if (getURLParts[getURLParts.length - 2] === "Special:DiscussionsStatistics") {//check if it is the specified page
        usrName = getURLParts[getURLParts.length - 1]; //get username for getting id
    }
    else if (getURLParts[getURLParts.length - 2] === "Special:UserProfileActivity") { //add go to "Special:DiscussionsStatistics" button
        usrName = getURLParts[getURLParts.length - 1] //get the name
        var option = $('<span><a href = "/wiki/Special:DiscussionsStatistics/'+ usrName + '">Threads and deleted posts</a></span>');
        $('.UserProfileActivityModeration__links').append(option);
        return;
    }
    else 
        return;
    $('#firstHeading').text('Threads/Deleted Contributions');
    $mbody.empty();
    var $loader = $('<div class="loader"></div>');
    $mbody.append($loader);
    var ntitle = document.querySelector('title'); //get title node
    var text = ntitle.text; //get its text
    ntitle.text = text.replace('No such special page', 'Discussions User Statistics'); //change it 
    importArticle({type: 'style', article: 'MediaWiki:DiscussionsUserStatistics.css'});
    runobj.getId().then(function(d){ //wait for the promise to return and extract its returned data
        id = d.query.users[0].userid; //get the id from extracted data
        root.push([]); //add array to it
        runobj.startConstruction();
    }).catch (function(error){ console.log(error)});
    });