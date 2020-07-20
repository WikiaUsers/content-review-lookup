var housepoints = new ObservedObject();
housepoints.addEventListener('set',function() {
   console.log('object has',housepoints.size(),(housepoints.size() == 1) ? 'item' :'items')
});
function housepointsOutput() {
    getParties(function() {
        if(typeof users != 'undefined' && !!Object.keys(users).length) {
            console.log('HERE: users in ',_.pluck(users,'name'),users[0].party);
            currentParty = users[0].party;
            date = new Date();
            date.setDate(1); //Beginning of the month
            ts = (date.getTime()  / 1000).toFixed();
            getUserContribs(_.pluck(users,'name'),ts,{party:currentParty},function(contribs,options) {
                housepoints.set(options.party,Object.keys(contribs).length);
            });
        }
    });
}
mw.hook('wikipage.content').add(housepointsOutput);
mw.hook('wikipage.content').add(function() {
    console.info('wikipage.content hook called');
});
/*
eventify(
            createSidebarModule('Hauspunkte',$('<div />').addClass('points').append(
                $('<div />').addClass('bar').append($('<div />').attr('id','Gryffindor')),
                $('<div />').addClass('bar').append($('<div />').attr('id','Hufflepuff')),
                $('<div />').addClass('bar').append($('<div />').attr('id','Ravenclaw')),
                $('<div />').addClass('bar').append($('<div />').attr('id','Slytherin'))
            ),'house-points');
*/