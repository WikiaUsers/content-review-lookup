importArticles({
    type: "style",
    articles: [
        'u:htmlcss:MediaWiki:To-do-list.css'
    ]
});

$(function(){
    function createList(name, content){
        var l =
            '<section class="tdl-section" data-name="' + name + '"> \
                <header class="tdl-header"> \
                    <h2>' + name + '</h2> \
                </header> \
                <div class="tdl-content">' + content + '</div> \
            </section>';
        $('#to-do-list').append(l);
    }
    
    function createSection(group){
        var m =
            '<nav class="tdl-group" data-group="' + group + '"> \
                <header class="tdl-group-header"> \
                    <h3>' + group + '</h3> \
                </header>';
        m += '</nav>';
        return m;
    }
    
    function generateList(group){
        $.ajax({
           type: 'GET',
           dataType: "json",
           url: '/api.php?action=parse&text={{' + wgPageName.split(':')[1] + '/' + group + '}}&format=json',
           success: function(data){
               var code = data.parse.text['*'];
               $('.tdl-group[data-group="' + group + '"]').append(code);
           }
        });
    }
    
    createList('Needs to be completed', (createSection('Standard') + createSection('Administrative')));
    generateList('Standard');
    generateList('Administrative');
    
    createList('Completed', createSection('Completed'));
    generateList('Completed');
});