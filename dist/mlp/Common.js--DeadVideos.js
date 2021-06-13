// DeadVideos script by Bobogoobo
$(function() {
    var catList = (window.deadVideosCategories || ['Videos']), //necessary to get subcategories
      videoList = {}, noId = [], nonYT = [], pending = catList.length;

    $('#mw-content-text p').html('This page displays any videos that no longer exist at the source. You must be logged in to a Google account for it to work properly. Also, this may not work on older versions of Internet Explorer. Note that the YouTube API which this script uses has a daily quota, though it is not likely to be reached. Please report any bugs or suggestions <a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>. If results do not appear after a long time, it may have crashed; check your browser console for errors.<div id="dv-results" style="margin-top:2em;"></div>');

    $.each(catList, function(index, value) {
        function getList(cmcontinue) {
            $.getJSON('/api.php?action=query&prop=imageinfo&iiprop=metadata&generator=categorymembers&gcmtitle=Category:' +
              value + (mw.config.get('wgDBname') === 'mlp' ? (value ? ' ' : '') + 'videos' : '') +
              '&gcmprop=title&gcmtype=file&gcmlimit=max&format=json&gcmcontinue=' + cmcontinue, function(data) {
                if (data.query) {
                    $.each(data.query.pages, function(key, value) {
                        var toAdd = false;
                        
                        //Those lovable Wikia bugs
                        if (!value.imageinfo) {
                            return true;
                        }

                        $.each(value.imageinfo[0].metadata, function(mdindex, mdvalue) {
                            if (mdvalue.name === 'videoId') {
                                toAdd = [mdvalue.value, value.title];
                            } else if (mdvalue.name === 'provider' && mdvalue.value !== 'youtube') {
                                toAdd = false;
                                nonYT.push({'title':value.title, 'provider':mdvalue.value});
                                return false;
                            } else if (mdindex === value.imageinfo[0].metadata.length - 1) {
                                if (toAdd && toAdd[0].length !== 11) {
                                    nonYT.push({'title':toAdd[1], 'provider':'unknown'});
                                    toAdd = false;
                                } else if (! toAdd) {
                                    noId.push(value.title);
                                }
                            }
                        });

                        if (toAdd) {
                            videoList[toAdd[0]] = toAdd[1];
                        }
                    });
                }

                if (data.continue) {
                    getList(data.continue.gcmcontinue);
                } else {
                    pending -= 1;
                    if (pending === 0) {
                        stepTwo();
                    }
                }
            });
        }

        getList('');
    });

    function stepTwo() {
        var IDlists = [[]], keys = Object.keys(videoList), counter = 0, pending = 0;

        for (var i = 0; i < keys.length; i++) {
            IDlists[IDlists.length - 1].push(keys[i]);
            counter += 1;
            if (counter === 50) {
                IDlists.push([]);
                counter = 0;
            }
        }

        pending = IDlists.length;
        $.each(IDlists, function(index, value) {
            $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=status,contentDetails&id=' + 
              value.join(',') + '&key=AIzaSyB9m40QxbD9iq9zM9_eXiBfmwJ3dZrvdgg', function(data) {
                $.each(data.items, function(index, value) {
                    if (
                    	value.status.uploadStatus !== 'rejected' &&
                    	(// number of ISO country codes
                    		value.contentDetails.regionRestriction && value.contentDetails.regionRestriction.blocked ?
                    		value.contentDetails.regionRestriction.blocked.length < 249 :
                    		true
                    	)
                    ) {
                        delete videoList[value.id];
                    }
                });
                pending -= 1;

                if (pending === 0) {
                    results();
                }
            });
        });
    }

    function results() {
        if (! $.isEmptyObject(videoList)) {
            $('#dv-results').append('<h3>Dead videos</h3><ol id="dv-results-1"></ol>');
            $.each(videoList, function(key, value) {
                $('#dv-results-1').append('<li><a href="/wiki/' + encodeURIComponent(value.replace(/ /g, '_')) +
                  '" title="' + value + '">' + value + '</a> (YTID: ' + '<a href="https://www.youtube.com/watch?v=' +
                  key + '">' + key + '</a>)</li>');
            });
        }

        if (noId.length) {
            $('#dv-results').append('<h3 style="margin-top:2em;">Videos with no ID</h3><ol id="dv-results-2"></ol>');
            $.each(noId, function(index, value) {
                $('#dv-results-2').append('<li><a href="/wiki/' + encodeURIComponent(value.replace(/ /g, '_')) +
                  '" title="' + value + '">' + value + '</a></li>');
            });
        }

        if (nonYT.length) {
            $('#dv-results').append('<h3 style="margin-top:2em;">Non-YouTube videos (check manually)</h3>' +
              '<ol id="dv-results-3"></ol>');
            $.each(nonYT, function(index, value) {
                $('#dv-results-3').append('<li><a href="/wiki/' + encodeURIComponent(value.title.replace(/ /g, '_')) +
                  '" title="' + value.title + '">' + value.title + '</a> (' + value.provider + ')</li>');
            });
        }
    }
});