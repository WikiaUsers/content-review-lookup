(function() {
	if (window.WhatReallyLinksHereLoaded) {
        return;
    }
	window.WhatReallyLinksHereLoaded = true;

	mw.loader.using( 'mediawiki.api' ).then(function() {
		var api = new mw.Api();
		var actualPageLinks = "No Links Found";
		var linkBase = location.protocol + '//' + location.host + '/wiki/';
		var whatReallyLinksHerePage = "Special:WhatReallyLinksHere";
		var processingLinks = false;
		var maxNumProcessingAtOnce = 250
		var numLinks = 0;
		numLinks = 0;
		var totalLinks = 0;
		var currNumProcessing = 0;
		var lasthash = location.hash;
		var mainLinkArea = '#AllWhatLinksHere';
		var RedirectArea = '#AllRedirectArea';
        var hasRedirects = false;
        var linkData = { links: [], Redirects: [] };
        var wgPageName = mw.config.get('wgPageName');
		function generateSpecialPage() {
            var WhatReallyLinksHereContainer = $('<div id="WhatReallyLinksHere" style="width:100%; min-height: 300px; position:relative;">');

            var inputBox = $('<div class="mw-inputbox-centered" style="margin-left: auto; margin-right: auto; text-align: center;">');
            inputBox.append($('<div id="LinksFoundCount" style="position: absolute;left: 9px;top: 5px;text-align: left;">').append($('<span id="LinkCount">')).append($('<br />')).append($('<span id="RedirectCount">')).append($('<br />')).append($('<span id="FilterCount">')));
            var searchBoxForm = $('<form name="searchbox" class="searchbox" id="WhatReallyLinksHereForm">');
            var searchBoxInput = $('<input id="searchBox" class="mw-inputbox-input searchboxInput mw-ui-input mw-ui-input-inline" name="search" type="text" value="" placeholder="" size="50" dir="ltr" style="box-sizing: border-box;border: 1px solid #a2a9b1;border-radius: 2px;padding: 0.57142857em 0.57142857em 0.5em;box-shadow: inset 0 0 0 0.1em #fff;font-family: inherit;font-size: inherit;line-height: 1.07142857em;vertical-align: middle;text-align:center;border-width: 0 0 1px;"/>');
            var searchBoxButton = $('<input type="submit" name="fulltext" class="mw-ui-button" style="background-color: #f8f9fa;color: #222222;display: inline-block;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;min-width: 4em;max-width: 28.75em;margin: 0;padding: 0.57142857em 0.9375em;border: 1px solid #a2a9b1;border-radius: 2px;font-family: inherit;font-size: 1em;font-weight: bold;line-height: 1;text-align: center;-webkit-appearance: none;zoom: 1;vertical-align: middle;cursor: pointer;" value="What Really Links Here" />');
            searchBoxForm.append($('<div>').append(searchBoxInput).append($('<br />')).append(searchBoxButton));

            var filterForm = $('<div style="width:300px; position:absolute;top:0;right:0;">').append(searchBoxInput.clone().prop('name','filter').prop('id','FilterTxt').css('width','300px')).append($('<br />')).append(searchBoxButton.clone().prop('type','button').prop('name','filter').prop('id','FilterBtn').val('Link Text Filter').css('margin-top','5px')).append(searchBoxButton.clone().prop('type','button').prop('name','clearfilter').prop('id','ClearFilterBtn').val('Clear Filter').css({'margin-top':'5px','margin-left':'3px'}));
            filterForm.append($('<br />')).append($('<div style="width: 50%;height: 20px;margin-top: 5px;float: left;">').append($('<div style="width:20px;height:20px;background-color: #FFC107;display: inline-block;">')).append($('<span style="font-size:11px;vertical-align: top;line-height: 20px;display: inline-block;margin-left: 5px;">').text('No Display Text')));
            filterForm.append($('<div style="width: 50%;height: 20px;margin-top: 5px;float: right;">').append($('<div style="width:20px;height:20px;background-color: #5ff765;display: inline-block;">')).append($('<span style="font-size:11px;vertical-align: top;line-height: 20px;display: inline-block;margin-left: 5px;">').text('Partial Match')));

            searchBoxForm.append(filterForm);

            searchBoxForm.submit(function(e) {
                e.preventDefault();
                if (processingLinks) {
                    return;
                }
                processingLinks = true;
                $('#LoadingInfo').show();
                $(mainLinkArea).html('');
                $(RedirectArea).html('');
                var searchText = $('#WhatReallyLinksHereForm').find('#searchBox').val();
                if (searchText !== '') {
                	updateTitleHeading('What Really Links Here');
                    setTimeout(function() {
                        getLinksFromPage(decodeURIComponent(searchText), '', false);
                    }, 200);
                } else {
                	updateTitleHeading(searchText);
                }
                return false;
            });
            searchBoxForm.find('#FilterBtn').click(function(e) {
                var inputInfo = $('#FilterTxt').val();
                if (inputInfo !== '') {
                    highlightFilters(inputInfo);
                }
            });
            searchBoxForm.find('#ClearFilterBtn').click(function(e) {
            	$('#FilterCount').text('');
                $('.filterHighlights').css('background-color','').removeClass('filterHighlights');
            });
            inputBox.append(searchBoxForm);
            WhatReallyLinksHereContainer.append(inputBox).append($('<div id="AllWhatLinksHere" style="width:100%; margin-top: 40px; padding-left: 5px;">')).append($('<div id="AllRedirectArea" style="width:100%; margin-top: 10px; margin-left: 10px;">'));

            var loadingInfoBox = $('<div style="width:100%;height:100%;z-index:10;position: absolute;top: 75px; display:none;background-color:rgb(58 58 58 / 13%);" id="LoadingInfo">');
            var center = $('<center>').append($('<br />Loading. Please wait.<br /><span id="RecordInfo">0/0 Done</span><br />')).append($('<img alt="Infinity.gif" src="https://static.wikia.nocookie.net/fallout/images/f/f9/Infinity.gif/revision/latest/scale-to-width-down/100?cb=20170710213102" decoding="async" width="100" height="100" data-image-name="Infinity.gif" data-image-key="Infinity.gif">'));
            loadingInfoBox.append(center);
            WhatReallyLinksHereContainer.append(loadingInfoBox);

            $('#mw-content-text').children().remove();
            $('#mw-content-text').append(WhatReallyLinksHereContainer);
			var firstHeadingText = 'What Really Links Here';

			if (mw.config.get("wgPageName").indexOf('/') != -1) {
				var subSearchPage = wgPageName.substr(wgPageName.indexOf('/')+1);
                if (subSearchPage !== '') {
                    $('#WhatReallyLinksHereForm').find('#searchBox').val(subSearchPage);
                    $('#WhatReallyLinksHereForm').submit();
                    firstHeadingText = 'Pages that really link to "' + subSearchPage + '"';
                }
            }

            updateTitleHeading(firstHeadingText);
        }

        function highlightFilters(filterText) {
            $('.filterHighlights').css('background-color','').removeClass('filterHighlights');
            var filterCount = 0;
            if (linkData.links.length > 0) {
                $.each(linkData.links, function(link) {
                    for (var i = 0; i < linkData.links[link].arr.length; i++) {
                        if (linkData.links[link].arr[i].indexOf('|') > -1) {
                            var linkText = linkData.links[link].arr[i].substr(linkData.links[link].arr[i].indexOf('|')+1);
                            linkText = linkText.substr(0,linkText.indexOf(']'));
                            if (linkText.toLowerCase().indexOf(filterText) > -1) {
                            	filterCount++;
                                $('#'+linkData.links[link].id).addClass('filterHighlights').css('background-color','#5ff765');
                            }
                        } else {
                        	$('#'+linkData.links[link].id).addClass('filterHighlights').css('background-color','#FFC107');
                        }
                    }
                });
            }

            if (linkData.Redirects.length > 0) {
                $.each(linkData.Redirects, function(link) {
                    for (var i = 0; i < linkData.Redirects[link].arr.length; i++) {
                        if (linkData.Redirects[link].arr[i].indexOf('|') > -1) {
                            var linkText = linkData.Redirects[link].arr[i].substr(linkData.Redirects[link].arr[i].indexOf('|')+1);
                            linkText = linkText.substr(0,linkText.indexOf(']'));
                            if (linkText.toLowerCase().indexOf(filterText) > -1) {
                            	filterCount++;
                                $('#'+linkData.Redirects[link].id).addClass('filterHighlights').css('background-color','#5ff765');
                            }
                        }
                    }
                });
            }

            $('#FilterCount').text(filterCount+' Matches from filters.');
        }

        function updateTitleHeading(newText) {
        	$('#firstHeading').text(newText);
        	document.title = newText + ' - The Fallout Wiki';
        }

		function getLinksFromPage(pageName, lhContinue, isRedirectPage) {
			var apiParams = {
				action: 'query',
				prop: 'linkshere',
				format: 'json',
				lhlimit: 500,
				titles: pageName
			};
			if (lhContinue !== undefined && lhContinue !== '') {
				apiParams['lhcontinue'] = lhContinue;
			}

			api.get(apiParams).done(function(e) {
				linkData = { links: [], Redirects: [] };
				$('#LinkCount').html('');
				$('#RedirectCount').html('');
				$('#FilterCount').html('');
				if (e.continue !== undefined) {
					getLinksFromPage(pageName, e.continue.lhcontinue, isRedirectPage);
                }
				var linkInfos = e.query.pages;
		        for (var titleLink in linkInfos) {
		        	if (linkInfos[titleLink].linkshere !== undefined) {
			            numLinks += linkInfos[titleLink].linkshere.length;
			            totalLinks += linkInfos[titleLink].linkshere.length;
			            for (var linkInf in linkInfos[titleLink].linkshere) {
			            	if (linkInfos[titleLink].linkshere[linkInf].redirect !== undefined) {
                                numLinks -= 1;
                                if (!hasRedirects) {
                                    $(RedirectArea).append('<div><h2>Redirects:</h2></div>');
                                    
                                    
                                    hasRedirects = true;
                                }
                                var redirectLink = linkBase+encodeURIComponent(linkInfos[titleLink].linkshere[linkInf].title.replace(/[ _]/g,'_'));
			            		$(RedirectArea).append('<div style="padding-left:5px;"><a href="'+redirectLink+'">'+linkInfos[titleLink].linkshere[linkInf].title+'</a><div id="'+stripRegExp(linkInfos[titleLink].linkshere[linkInf].title)+'" style="margin-left: 20px;border-left: 1px solid darkgray;border-bottom: 1px solid darkgray;padding-left: 20px;"></div></div>');
			            		getLinksFromPage(linkInfos[titleLink].linkshere[linkInf].title, undefined, true);
			            	} else {
			                	checkIfLinksReal(linkInfos[titleLink].linkshere[linkInf], pageName, isRedirectPage);
			            	}
			            }
		        	} else {
                        if (!isRedirectPage) {
                        	$('#LinkCount').html('0 Page Links Found');
                            $(mainLinkArea).append(actualPageLinks);
                            $('#LoadingInfo').hide();
                            $('#LoadingInfo').find('#RecordInfo').text('0/0 Records Done.');
                            processingLinks = false;
                        }
		        	}
		        }
			});
		}

		function checkIfLinksReal(pageLinks, basePageName, IsRedirectPage) {
			if (currNumProcessing >= maxNumProcessingAtOnce)
			{
				setTimeout(function() { checkIfLinksReal(pageLinks,basePageName, IsRedirectPage) }, 100);
				return;
			}
			currNumProcessing += 1;
			api.get({
				action: 'parse',
				prop: 'wikitext',
				format: 'json',
				page: pageLinks.title
			}).done(function(data) {
				if (data.error === undefined) {
		            var wikitext = data.parse.wikitext['*'];
                    var pageLinkArr = findLinkInPage(basePageName, wikitext);
		            if (pageLinkArr !== null) {
                        var linkDataID = stripRegExp(basePageName)+'_'+stripRegExp(pageLinks.title);
                        var checkContainer = mainLinkArea;
                        var ContainerID = ' id="'+linkDataID+'"';
                        if (IsRedirectPage) {
                            checkContainer = '#'+stripRegExp(basePageName);
                        }

                        if (IsRedirectPage) {
                            linkData.Redirects[linkData.Redirects.length] = { id: linkDataID, arr: pageLinkArr};
                        } else {
                            linkData.links[linkData.links.length] = { id: linkDataID, arr: pageLinkArr};
                        }

		                $(checkContainer).append($('<div'+ContainerID+' style="padding-left:5px;"><a href="'+linkBase+encodeURIComponent(pageLinks.title.replace(/[ _]/g,'_'))+'">'+pageLinks.title+'</a></div>'));
		                var allLinks = $(checkContainer+' div').sort(function (a,b) { 
		                	var aText = $(a).find('a').text();
		                	var bText = $(b).find('a').text();
							if (aText > bText) {
								return 1;
                            }
							if (aText < bText) {
								return -1;
                            }
							return 0;
						});
						$(checkContainer).append(allLinks);
		            }

		            numLinks -= 1;
		            currNumProcessing -= 1;
		            $('#LoadingInfo').find('#RecordInfo').text((totalLinks-numLinks).toString()+'/'+totalLinks.toString()+ ' Records Done.');
		            if (numLinks <= 0) {
		            	if ($(mainLinkArea).children('div').length === 0 && $(RedirectArea).children('div').length === 0) {
		            		$(mainLinkArea).append(actualPageLinks);
                        }
                        if ($(RedirectArea).children('div').length > 0) {
                            $(RedirectArea).children('div').children('div').each(function(i, e) {
                                if ($(e).children('div').length === 0) {
                                    $(e).append(actualPageLinks);
                                }
                            });
                        }
		                $('#LoadingInfo').hide();
		                $('#LoadingInfo').find('#RecordInfo').text('0/0 Records Done.');
		                $('#LinkCount').text(linkData.links.length+' page links found.');
		                $('#RedirectCount').text(linkData.Redirects.length+' from redirects.');
		                totalLinks = 0;
		                processingLinks = false;
		            }
		        } else {
		        	numLinks -= 1;
		        	currNumProcessing -= 1;
                    if (numLinks <= 0) {
		            	if ($(mainLinkArea).children('div').length === 0 && $(RedirectArea).children('div').length === 0) {
		            		$(mainLinkArea).append(actualPageLinks);
                        }
                        if ($(RedirectArea).children('div').length > 0) {
                            $(RedirectArea).children('div').children('div').each(function(i, e) {
                                if ($(e).children('div').length === 0) {
                                    $(e).append(actualPageLinks);
                                }
                            });
                        }
		                $('#LoadingInfo').hide();
		                $('#LoadingInfo').find('#RecordInfo').text('0/0 Records Done.');
		                $('#LinkCount').text(linkData.links.length+' page links found.');
		                $('#RedirectCount').text(linkData.Redirects.length+' from redirects.');
		                totalLinks = 0;
		                processingLinks = false;
		            }
		        	//console.log(parseWikiTextUrl+pageLinks.title);
		        	console.log(data.error);
		        }
			});
		}

		function concatPageLink() {
			return linkBase+whatReallyLinksHerePage+'/'+wgPageName;
		}

		function escapeRegExp(text) {
		  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
		}

		function stripRegExp(text) {
		  return text.replace(/[-[\]{}()*+?.,\\^$|#\s'":\/]/g, '');
		}

		function findLinkInPage(SearchPageTitle, wikiText) {
		    var modPageTitle = escapeRegExp(SearchPageTitle).replace(/\\*[ _]/g,'[ _]');
		    var regexStr = '\\[{2}' + modPageTitle + '([#\\|](([^\\]]|\\](?=[^\\]]))*))?\\]{2}';
		    var testReg = new RegExp(regexStr, 'g');
            var matches = wikiText.match(testReg);
		    return matches;
		}

		$(document).ready(function() {
			if (wgPageName.indexOf(whatReallyLinksHerePage) === 0) {
				generateSpecialPage();
			}

            var whatReallyLinksHereElem = $('<li class="overflow">').append($('<a href="' + concatPageLink() + '" data-name="whatreallylinkshere">').text('What really links here'));
			var baseLink = $('#WikiaBarWrapper').find('[data-name=whatlinkshere]');
			if (baseLink.length > 0) {
				baseLink = baseLink.parent();
				whatReallyLinksHereElem.insertAfter(baseLink);
			} else {
				baseLink = $('#WikiaBarWrapper').find('.tools-customize');
				whatReallyLinksHereElem.insertBefore(baseLink);
            }
		});
	});
}());