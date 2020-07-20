$(function() {
    // Special:Random > Special:Random/main
    $('a.subnav-2a[href="/wiki/Special:Random"]').attr('href', '/wiki/Special:Random/main');

    // removes discussions module IF there are no relevant discussions to be displayed
    if (document.getElementsByClassName('forum-zero-state-creative').length) {
        document.getElementById('mw-content-text').removeChild(document.getElementById('RelatedForumDiscussion'));
    }

    /* Restores the Special:Upload functionality. This does not block core functionality
     * by: [[w:c:starwars:User:Green tentacle|Green tentacle]] */
    if (window.UploadPhotos && window.UploadPhotos.showDialog) {
        $('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
    }

    if (mw.config.get('wgPageName') === 'Special:AdminDashboard') {
        var li = document.createElement('li'),
            a = document.createElement('a'),
            ul = document.getElementById('AdminDashboardAdvanced').getElementsByTagName('ul')[0],
            lis = ul.getElementsByTagName('li');
        
        a.title = a.innerHTML = "Requests for unblock";
        a.href = "/wiki/Category:Requests_for_unblock";
        
        li.appendChild(a);
        ul.insertBefore(li, lis[(lis.length - 3)]);
    }
});