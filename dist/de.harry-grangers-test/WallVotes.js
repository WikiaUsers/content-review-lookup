function getVoters(postId) {
    return new Promise(function(resolve,reject) {
        /*
        $.nirvana.postJson('WallExternal','votersModal',{format:'json',id:postId},function(data) {
            resolve({
                count: data.count,
                voters: $(data.list).filter('li').map(function() {
                    return {
                        username: $(this).find('a').text().trim(),
                        avatar: $(this).find('img').attr('src')}
                    }
                ).get()
            })
        });
        */
        //Why not use this instead?
        $.nirvana.getJson('WallExternal','votersListItems',{format:'json',from:0, id: postId},function(data) {
            resolve(data);
        });
    })
}