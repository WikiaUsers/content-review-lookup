if(spAction == 'edit') {
    console.warn('User is in edit mode');
    importArticle({
        type: "style",
        article: "MediaWiki:VisualEditor-Oasis.css"
    });
    
    /*********************************************
    *
    * From w:c:dev:MassCategorization/code.js
    *
    ***********************************************/
    var EditForm = $('<form />').attr({
        method: '',
        name: '',
        id: 'EditModal'
    }).addClass('WikiaForm').append($('<fieldset />')),
    delay = window.massCategorizationDelay || 1000;
    
    $.showCustomModal('Mass Categorization', EditForm, {
        id: 'form-categorization',
        width: 500,
        buttons: [{  
            message: 'Cancel',
            handler: function() {
                $('#form-categorization').closeModal();
            }
        }, {
            id: 'start-button',
            message: 'Speichern',
            defaultButton: true,
            handler: function () {
                getAllEpisodes(function(data) {
                    var episodenlisten = JSON.parse(data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*']);
                    var season = $('.WikiaForm#EditModal input[name=season]').val();
                    var nr = $('.WikiaForm#EditModal input[name=nr]').val();
                    var title = $('.WikiaForm#EditModal input[name=title]').val();
                    var pubDate = $('.WikiaForm#EditModal input[name=pubDate]').val();
                    var description = $('.WikiaForm#EditModal textarea[name=description]').val();
                    console.dir(episodenlisten);
                    var editType = 'updated or added episode';
                    if($.inArray(season,Object.keys(episodenlisten)) !== -1) {
                        console.log(season,Object.keys(episodenlisten));
                        console.log('richtige Staffel',episodenlisten[season]);
                        if($.inArray(nr,Object.keys(episodenlisten[season])) !== -1) {
                            editType = 'update episode';
                            console.log(nr,Object.keys(episodenlisten[season]));
                            console.log('richtige Episode',episodenlisten[season][nr]);
                            currentEpisode = episodenlisten[season][nr];
                            currentEpisode.nr = nr;
                            currentEpisode.title = title;
                            currentEpisode.pubDate = pubDate;
                            currentEpisode.description = description;
                        }
                        else {
                            editType = 'insert new episode';
                            episodenlisten[season][nr] = {};
                            currentEpisode = episodenlisten[season][nr];
                            currentEpisode.nr = nr;
                            currentEpisode.title = title;
                            currentEpisode.pubDate = pubDate;
                            currentEpisode.description = description;
                            
                        }
                    }
                    else {
                        editType = 'insert new season';
                        episodenlisten[season] = {};
                        episodenlisten[season][nr] = {};
                        currentEpisode = episodenlisten[season][nr];
                        currentEpisode.nr = nr;
                        currentEpisode.title = title;
                        currentEpisode.pubDate = pubDate;
                        currentEpisode.description = description;
                    }
                    console.log(editType);
                    console.dir(episodenlisten);
                    
                    importScriptPage('w:c:de.harry-grangers-test:MediaWiki:EditPage.js');
                    editPage('MediaWiki:Episoden.js', JSON.stringify(episodenlisten, null, '\t'), editType);
                    $('#form-categorization').closeModal();
                    window.location.href=window.location.href.replace('spaction=edit&type=modal','action=purge');
                });
            }
        }]
    });
    
    function getAllEpisodes(callback) {
        $.get('http://pfefferkoerner.wikia.com/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&titles=MediaWiki:Episoden.js&format=json').done(callback);
    }
    
    /*function save() {
    }*/
    
    function addFormField(field) {
        console.dir(arguments);
        text = '';
        var element, affinity, type, id;
        switch(field) {
            case 'label':
                element = 'label';
                affinity = arguments[3];
                text = arguments[1];
                break;
            case 'text inline':
                element = 'input';
                type = 'text';
                id = arguments[2];
                break;
            case 'number':
                element = 'input';
                type = 'number';
                id = arguments[2];
                break;
            case 'date':
                element = 'input';
                type = 'date';
                id = arguments[2];
                break;
            case 'textfield':
                element = 'textarea';
                id = arguments[2];
                break;
            case 'text':
                element = 'p';
                text = arguments[1];
                break;
            case 'break':
                element = 'br';
                break;
            default:
                element = 'p';
                break;
        }
        attributes = {};
        console.log(typeof type, typeof affinity, typeof arguments[2], typeof id);
        if(typeof type !== 'undefined') {
            attributes.type = type;
        }
        if(typeof affinity !== 'undefined') {
            attributes['for'] = affinity;
        }
        if(typeof arguments[2] !== 'undefined') {
            attributes.name = arguments[2];
        }
        if(typeof id !== 'undefined') {
            attributes.id = arguments[2];
        }
        $('.WikiaForm#EditModal fieldset').append(
            $('<' + element + ' />').attr(attributes).text(text)  
        );
    }
    
    function addFormFields() {
        for(i = 0; i < arguments[0].length; i++) {
            addFormField(typeof arguments[0][i].field !== 'undefined' ? arguments[0][i].field : null,typeof arguments[0][i].text !== 'undefined' ? arguments[0][i].text : null,typeof arguments[0][i].name !== 'undefined' ? arguments[0][i].name : null,typeof arguments[0][i].affinity !== 'undefined' ? arguments[0][i].affinity : null);
            console.log(arguments[0][i]);
        }
        console.log(arguments[0].length + ' fields');
    }
    
     /*new mw.Api().get({
        action: 'templateparameters',
        prop: 'revisions',
        rvprop: 'content',
        titles: pageToCat
    })
    .done(function(d) { });*/
    
    addFormFields([
        {field:'label',text:'Staffel',affinity:'season'},
        {field:'number',name:'season'},
        {field:'break'},
        {field:'label',text:'Nr',affinity:'nr'},
        {field:'number',name:'nr'},
        {field:'break'},
        {field:'label',text:'Titel',affinity:'title'},
        {field:'text inline',name:'title'},
        {field:'break'},
        {field:'label',text:'Erscheinungsdatum',affinity:'pubDate'},
        {field:'date',name:'pubDate'},
        {field:'break'},
        {field:'label',text:'Inhalt',affinity:'description'},
        {field:'textfield',name:'description'}
    ]);
}
else {
    console.warn('User not in edit mode');
}