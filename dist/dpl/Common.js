importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});

//******* Stops tabbers colliding with article section titles *******//
mw.hook('wikipage.content').add(function($content){
    $.each($content.find('.tabbernav a, .tabbertab'), function(){
        var $this = $(this);
        $this.attr('title', $this.attr('title') + '.');
    });
});