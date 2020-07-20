
//Highlight pages by category, by User:Bobogoobo
$(function() {
    var pageList = {
        '*':{} //put individual pages here like this: {'page name':1, 'other page':1}
    };
    var categories = ['Category:Needs Cleanup'];
      //Categories there, e.g. ['Category:Stuff', 'Category:Other stuff'];
 
    function addHighlights(category) {
        $('#mw-content-text a').each(function() {
            if (pageList[category][$(this).attr('title')]) {
                $(this).css('background-color', 'yellow'); //change color here
            }
        });
    }
 
    function getPages(category, qcontinue, callback) {
        if (pageList[category] === undefined) {
            pageList[category] = {};
        }
        $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=' + 
          category + qcontinue + '&cmlimit=max&format=json', function(data) {
            for (var i = 0; i < data.query.categorymembers.length; i++) {
                pageList[category][data.query.categorymembers[i].title] = 1;
            }
 
            qcontinue = data['query-continue'];
            if (qcontinue) {
                getPages(category, '&cmcontinue=' + 
                  qcontinue.categorymembers.cmcontinue, callback);
            } else {
                callback(category);
            }
        });
    }
 
    for (var i = 0; i < categories.length; i++) {
        getPages(categories[i], '', addHighlights);
    }
    addHighlights('*');
});