if($('.admin-only').length !== 0) {
    console.log('auf dieser Seite');
    if($.inArray("sysop", mw.config.get('wgUserGroups')) === -1) {
        console.log('is Admin');
        $('.admin-only').detach();
    }
}