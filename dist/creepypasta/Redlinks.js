/*##################################################*/
/*# Red Link Fixer                                 #*/
/*# Idea by Madnessfan34537                        #*/
/*# Code by Madnessfan34537 and Monchoman45        #*/
/*##################################################*/
 
        $('#WikiHeader').append('<a class="wikia-button" onclick="this.innerHTML = \'Processing...\'; FixRedlinks();">Fix redlinks</a>');
 
    function FixRedlinks() {
            $.getJSON('/api.php?action=query&prop=revisions&titles=' + wgPageName + '&rvprop=content&indexpageids=1&format=json', function(result) {
                    var text = result.query.pages[result.query.pageids[0]].revisions[0]['*'];
                    var redlinks = $('a.new');
 
                    var ref = 0;
                    while(text.indexOf('[[', ref) != -1) {
                            if(text.indexOf(']]', text.indexOf('[[', ref)) != -1) {
                                    var open = text.indexOf('[[', ref);
                                    var pipe = text.indexOf('|', open);
                                    var close = text.indexOf(']]', open);
                                    if(text.indexOf('<br/>', open) != -1 && text.indexOf('<br/>', open) < close) {ref = open + 1; continue;}
                                    if(pipe != -1 && pipe < close) { //is [[page|display]]
                                            if(pipe == close - 1) {
                                                    var title = text.substring(open + 2, pipe);
                                                    var display = title.substring(title.indexOf(':') + 1);
                                            }
                                            else {
                                                    var title = text.substring(open + 2, pipe);
                                                    var display = text.substring(pipe + 1, close);
                                            }
                                    }
                                    else { //is [[page]]
                                            var title = text.substring(open + 2, close);
                                            var display = title;
                                    }
                                    if(!title) {ref = open + 1; continue;} //skip [[]] and [[|<anything>]]
 
                                    for(var i = 0; i < redlinks.length; i++) {
                                            var utitle = title[0].toUpperCase() + title.substring(1);
                                            if(redlinks[i].title.indexOf(' (page does not exist)')) {var redlink = redlinks[i].title.substring(0, redlinks[i].title.length - 22);}
                                            else {var redlink = redlinks[i];}
                                            if(utitle == redlink || utitle == ':' + redlink) {
                                                    if(pipe == close - 1) {var show = title;}
                                                    else {var show = display;}
                                                    text = text.substring(0, open) + show + text.substring(close + 2);
                                                    break;
                                            }
                                    }
                                    ref = open + 2;
                            }
                            else {break;}
                    }
 
                    $.getJSON('/api.php?action=query&prop=info&titles=' + wgPageName + '&intoken=edit&indexpageids=1&format=json', function(result) {
                            var token = result.query.pages[result.query.pageids[0]].edittoken;
                            $.post('/api.php', {action: 'edit', title: wgPageName, text: text, summary: 'Fixing redlinks', token: token}, function() {window.location.reload();});
                    });
            });
    }