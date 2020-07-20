$(function() {
    if ($('#StartSpy').length && wgUserGroups.toString().search('vstf') > -1 || $('#StartSpy').length && wgUserGroups.toString().search('helper') > -1 ) {
        $('#onError').replaceWith('<div id="SpyFrame" style="width:500px; height:100px; background-color:#fff; margin:0 auto;"></div>');
        $('#SpyFrame').append('<div id="WatchList" style="position:relative; top:4px; left:4px; width:130px; height:90px; border:1px solid;"><select id="ListOfUsers" style="width:126px; margin:2px;"><option value="Empty">-----</option></select></div>');
        $('#SpyFrame').append('<div id="WatchLinks" style="position:relative; top:-88px; left:140px; width:346px; height:82px; border:1px solid; padding:4px;"></div>');
        $('#ListOfUsers').after('<input style="width:122px; margin:2px;" id="GetWiki" type="text" placeholder="WikiName"/><center style="font-size:12px; color:grey;">Enter - refresh&#010;ESC - clean</center>');
        var users = $('#StartSpy').attr('data-id').split(','),
            wikiLink = '<a class="wikia-menu-button" style="margin:3px 2px; padding:2px; display:inline-block;" target="_blank" href="',
            c = 'http://community.wikia.com/wiki/Special:',
            s = '.wikia.com/wiki/Special:',
            getLinks = function() {
                $('#GettedLinks').remove();
                var lc = wikiLink + c + 'LookupContribs?target=' + nickname + '">LookUp</a>',
                    mwf = wikiLink + c + 'Multiwikifinder?target=User+talk:' + nickname + '">MWF Talk</a>',
                    mwfw = wikiLink + c + 'Multiwikifinder?target=Message+Wall:' + nickname + '">MWF Wall</a>',
                    mwfu = wikiLink + c + 'Multiwikifinder?target=User:' + nickname + '">MWF User</a>',
                    phlx = wikiLink + c + 'Phalanx?target=' + nickname + '">Phalanx</a>';
                    collect = lc + mwf + mwfw + mwfu + phlx;
                    if ($('#GetWiki').val() !== "") {
                        var wikiname = $('#GetWiki').val();
                            nuke = wikiLink + 'http://' + wikiname + s + 'Nuke?target=' + nickname + '>Nuke</a>',
                            blc = wikiLink + 'http://' + wikiname + s + 'Block/' + nickname + '">Block</a>',
                            cu = wikiLink + 'http://' + wikiname + s + 'CheckUser?user=' + nickname + '">CheckUser</a>',
                            cntr = wikiLink + 'http://' + wikiname + s + 'Contributions/' + nickname + '">Contribution</a>';
                        collect += cntr + cu + nuke + blc;
                    }
                $('#WatchLinks').append('<div id="GettedLinks"><center>'+collect+'</center></div>');
            },
            clean = function() {
                $('#GetWiki').val('');
                $('#ListOfUsers').val('Empty');
                $('#GettedLinks').remove();
            };
        for (var i=0; i<users.length; i++) {
            $('#ListOfUsers').append('<option value="'+users[i]+'">'+users[i]+'</option>');
        }
        $('#RefreshButton').hide();
        $('body').keyup(function (e) {
            if (e.keyCode == 13) { getLinks(); }
            else if (e.keyCode == 27) { clean(); }
        });
        $('#ListOfUsers').change(function() {
            $('#ListOfUsers option').each(function() {
                if ($(this).attr('selected') == 'selected' && $(this).attr('value') != 'Empty') {
                    nickname = $(this).attr('value');
                    getLinks();
                }
            });
        });
    }
});