if($('.admin-only').length !== 0) {
    console.log('auf dieser Seite');
    if($.inArray("sysop", wgUserGroups) === -1) {
        console.log('is Admin');
        $('.admin-only').detach();
    }
}