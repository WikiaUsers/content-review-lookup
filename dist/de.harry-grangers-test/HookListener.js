mw.hook('newPosted').add(function() {
    console.log('newPosted mw.hook');
});
mw.hook('afterNewMessagePost').add(function() {
    console.log('afterNewMessagePost mw.hook');
});
mw.hook('wikipage.content').add(function(){
    console.info('wikipage.content hook called');
});