if(!!$('.discussion_guidelines').length) {
    getGuidelines(function(guidelines) {
        $('.discussion_guidelines').html(guidelines.value.replace(/\n/g,'<br />'));
    });
}

if($('.discussion_categories').exists()) {
    getCategories(function(categories) {
        list = $('<dl />').appendTo($('.discussion_categories').empty());
        for(var cat in categories) {
            list.append(
                $('<dt />').text(categories[cat].name == null ? '' : categories[cat].name),
                $('<dd />').text(categories[cat].description == null ? '' : categories[cat].description)  
            );
        }
    });
}

function getGuidelines(callback) {
    $.getJSON('https://services.wikia.com/site-attribute/site/' + wgCityId + '/attr/guidelines',function(data) {
        callback(data);
    });
}

function getCategories(callback) {
    $.getJSON('https://services.wikia.com/discussion/' + wgCityId + '/forums/',function(data) {
        callback(data._embedded['doc:forum']);
    });
}

function getCategoryId(name,callback) {
    getCategories(function(categories) {
        category = _.findWhere(categories,{name: name});
        callback(typeof category != 'undefined' ? category.id : false);
    });
}

function getFollowedThreads(userid,callback) {
    $.getJSON('https://services.wikia.com/discussion/' + wgCityId + '/threads/followed-by/' + userid,function(data) {
        callback(data._embedded.threads); 
    });
}

discuURL = 'https://services.wikia.com/discussion/' + wgCityId + '/';

function getPostsByUser(userid,callback) {
    $.getJSON(discuURL + 'users/' + userid + '/posts?page=0&limit=20&responseGroup=full&viewableOnly=false',function(data) {
        callback(data._embedded['doc:posts']);
    });
}

function getThread(threadId,callback) {
    $.getJSON(discuURL + 'threads/' + threadId + '?responseGroup=full',function(data) {
       callback(data); 
    });
}

function getPost(postId,callback) {
    $.getJSON(discuURL + 'posts/' + postId,function(data) {
       callback(data); 
    });
}

function getUserId(name, callback) {
    $.getJSON('/api.php?action=query&list=users&ususers=' + name + '&format=json', function(data) {
        users = data.query.users;
       callback(!!users.length ? data.query.users[0].userid : false); 
    });
}

/* setter */
function setCategoryDescription(category,description) {
    getCategoryId(category,function(categoryId) {
        if(categoryId) {
            console.info('Set description of ' + category + ' to ' + description);
            $.ajax({
                url: discuURL + 'forums/' + categoryId,
                method:'POST',
                data: JSON.stringify({
                    description: description
                }),
                xhrFields:{
                    withCredentials: true
                },
                success: function(data) {
                    console.log('success',data);
                },
                error: function(e,f,g) { 
                    console.log('error',e,f,g);
                }
            });
        }
        else {
            throw new ReferenceError('No category found having this name!');
        }
    });
}

function reportPost(postId,_valid) {
    if(arguments.length == 1 || _valid) {
        isValid = (arguments.length == 2 && _valid ? '/valid' : '');
        $.ajax({
            url: discuURL + 'posts/' + postId + '/report' + isValid,
            method: 'PUT'
        });
    }
    else if(arguments.length == 2 && !!_valid) {
        deletePost(postId,true);
    }
}

function deletePost(postId,_delete) {
    $.ajax({
        url: discuURL + 'posts/' + postId + '/' + (_delete ? 'delete' : 'undelete'),
        method: 'PUT'
    });
}

function movethreads(category, threadIds) {
    $.ajax({
        url: discuURL + 'forums/'+ category + '/movethreads',
        method:'POST',
        data: JSON.stringify({
            threadIds: threadIds
        }),
        xhrFields:{
            withCredentials: true
        },
        success: function(data) {
            console.log('success',data);
        },
        error: function(e,f,g) { 
            console.log('error',e,f,g);
        }
    });
}

function lockThread(threadId,lock) {
    $.ajax({
        url: discuURL + 'threads/' + threadId + '/lock',
        method: lock ? 'PUT' : 'DELETE'
    });
}

function deleteThread(threadId,_delete) {
    $.ajax({
        url: discuURL + 'threads/' + threadId + '/' + (_delete ? 'delete' : 'undelete'),
        method: 'PUT'
    });
}

function updatePost(postId,postContent,postTitle) {
    $.post(discuURL + 'posts/' + postId, JSON.stringify({
        body: postContent,
        id: postId,
        title: postTitle
    }),'json');
}