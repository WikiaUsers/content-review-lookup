//Inspired from https://dev.fandom.com/wiki/MassNullEdit and https://dev.fandom.com/wiki/CategoryRenameAuto-update
if ($('.creates').length === 0) {
    $('.wds-button-group > .wds-dropdown__content.wds-is-right-aligned > ul.wds-list > li:last-child').after(
        $('<li/>').append('<a style="cursor:pointer" class="creates">AutoEditPages</a>')
    );
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" class="creates">AutoEditPages</a></li>');
}
 
function callAPI(data, method, callback) {
    data.format = 'json';
    $.ajax({
        data: data,
        dataType: 'json',
        url: wgScriptPath + '/api.php',
        type: method,
        success: function(data) {
            if (!data.error) {
                console.log('Succesful !');
            } else {
                console.log('Failed.');
                $('#text-error-output').append('Failed to edit page : ' + data.error.info + '<br/>');
            }
        },
        error: function(xhr, error) {
            showError('AJAX error: ' + error.info);
        }
    });
}
 
function deletetemplate(template, page) {
    console.log(template + '|' + page);
    $.get(mw.util.wikiScript('api'), {
        'action': 'query',
        prop: 'info|revisions',
        intoken: 'edit',
        titles: page,
        rvprop: 'content',
        rvlimit: '1',
        indexpageids: 'true',
        format: 'json'
    }, function(response) {
        var pages = response.query.pages[response.query.pageids[0]];
        var content = pages.revisions[0]['*'];
        var templates = '{{' + template;
        var templatestart = content.indexOf(templates);
        if (templatestart === -1) {
            console.log('Template not detected');
            return false;
        }
        var templateend = content.indexOf('}}', templatestart);
        console.log(templatestart + '|||' + templateend);
        var templateall = content.substring(templatestart, templateend + 2);
        content = content.replace(templateall, "");
        console.log('Content : ' + content);
        $.post(mw.util.wikiScript('api'), {
            minor: true,
            bot: true,
            format: 'json',
            summary: 'Deleted template :' + template,
            action: 'edit',
            title: page,
            basetimestamp: pages.revisions[0].timestamp,
            startimestamp: pages.starttimestamp,
            token: pages.edittoken,
            text: content
        }, function(data) {
            if (!data.error) {
                console.log('Succesful !');
            } else {
                console.log('Failed.');
                $('#text-error-output').append('Failed to edit page ' + page + ': ' + data.error.info + '<br/>');
            }
        });
    });
}
var pages;
 
function posts(pages, content) {
    var actions;
    actions = $('.adding:checked').val() + "text";
    if (actions == "appendtext") {
        $.post(mw.util.wikiScript('api'), {
            format: 'json',
            action: 'edit',
            title: pages,
            appendtext: content,
            minor: true,
            bot: true,
            token: mw.user.tokens.get("editToken")
        }, function(data) {
            if (!data.error) {
                console.log('Succesful !');
            } else {
                console.log('Failed.');
                $('#text-error-output').append('Failed to edit page ' + pages + ': ' + data.error.info + '<br/>');
            }
        });
    } else {
        $.post(mw.util.wikiScript('api'), {
            format: 'json',
            action: 'edit',
            title: pages,
            prependtext: content,
            minor: true,
            bot: true,
            token: mw.user.tokens.get("editToken")
        }, function(data) {
            if (!data.error) {
                console.log('Edit of ' + pages + ' has been made successfully !');
            } else {
                console.log('Failed.');
                $('#text-error-output').append('Failed to edit page ' + pages + ': ' + data.error.info + '<br/>');
            }
        });
    }
    setTimeout(init(), 1000);
}
 
function addpages(category) {
    if (!category) {
        return false;
    }
    $.getJSON("/api.php?action=query&list=categorymembers&cmtitle=Category:" + encodeURIComponent(category) + "&cmprop=title&cmlimit=5000&format=json", function(result) {
        var categoryUsage = result.query.categorymembers;
        console.log(categoryUsage);
        console.log("Category usage successfully retrieved");
        if (categoryUsage.length > 0) {
            for (var currentPage = 0; currentPage < categoryUsage.length; currentPage++) {
                var title = categoryUsage[currentPage].title;
                if (title) {
                    $('#Names').val($('#Names').val() + title + "\n");
                }
            }
        }
    });
    alert('Done!');
}
 
function init() {
    page = pages[0];
    content = $('#Text').val();
    $('#startButton').prop('disabled', true);
    if (!pages || !content) {
        alert('Please fill the text and pages inputs');
        return false;
    }
    if (page === null) {
        $('#startButton').prop('disabled', false);
        $('#text-error-output').append('Done!').css("background-color", "green");
        return false;
    } else {
        pages = pages.slice(1, pages.length);
        $('#Names').val(pages.join('\n'));
        posts(page, content);
    }
}
var form = '\
     <form method="" name="" class="WikiaForm"> \
         <fieldset> \
           <div style="text-align:center"> \
               <input type="radio" checked class="adding" name="actions" value="append">Append</input> \
               <input type="radio" class="adding" name="actions"  value="prepend"/>Prepend</input> \
           </div> \
                <p><b>Text to add :</b></p> <textarea style="width:500px; height:150px" id="Text"></textarea> \
                <p><b>Pages :</b></p> <textarea style="width:500px; height:150px" id="Names"></textarea> \
                <p><b>Add pages from a category :</b></p> <input type="text" id="Categoriename"/> \
                <p><b>Remove template from the pages above :</b></p> <input type="text" id="Templatetodelete"/> \
                <div id="text-error-output" style="height:10em; background-color: #ffbfbf; height: 150px; font-weight: bold; border: 1px solid black; overflow: scroll">Any errors encountered will appear below<br/></div> \
         </fieldset> \
     </form>';
$('.creates').click(function() {
    $.showCustomModal("Add contents to pages", form, {
        id: 'writeafter',
        width: 500,
        buttons: [{
                id: 'startButton',
                message: 'Submit',
                defaultButton: true,
                handler: function() {
                    pages = $('#Names').val().split('\n');
                    init();
                }
            },
            {
                id: 'Categorysubmit',
                message: 'Add pages from the category',
                handler: function() {
                    var categoryname = $('#Categoriename').val();
                    addpages(categoryname);
                }
            },
            {
                id: 'Template',
                message: 'Remove this template from pages above',
                handler: function() {
                    var template = $('#Templatetodelete').val();
                    if (!template) {
                        return false;
                    }
                    pages = $('#Names').val().split('\n');
                    for (i = 0; i < pages.length; i++) {
                        deletetemplate(template, pages[i]);
                    }
                }
            },
            {
                message: 'Close',
                handler: function() {
                    $('#writeafter').closeModal();
                    location.reload();
                }
            }
        ]
    });
});