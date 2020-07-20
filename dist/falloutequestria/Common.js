/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide2/code.js', 'dev');
importScriptPage("MediaWiki:FeaturedStories.js", "falloutequestria");
importStylesheet("Template:Ambox/code.css");

/*###############################################################################
#
# TagSearch Plugin
#
################################################################################*/

(function( $ ) {
	var tagSearchPlugin = {
		init:function(elem,config){
			this.conf = config;
			this.elem = $(elem);
			this.resultSet = $(this.conf.resultSet);
		},
		buildSearch:function(){
		    var self = this;
			var input = $('<input type="text"/>');
			var button = $('<button/>');
			var maxResultItems = $('<select id="tagSearchMaxResults"/>');
			var maxResultOption12 = $('<option value="12"/>');
			var maxResultOption24 = $('<option value="24"/>');
			var maxResultOption36 = $('<option value="36"/>');
			var maxResultOption48 = $('<option value="48"/>');
			var filter = $('<select id="tagSearchFilter"/>');
			var filterPages = $('<option value="1"/>');
			var filterFiles = $('<option value="2"/>');
			var filterEverything = $('<option value="0"/>');
			
button.text('Go!');
			input.attr('autocomplete',self.conf.autocomplete);
			input.attr('name',self.conf.inputName);
			input.val(self.conf.exampleText);
			maxResultItems.append(maxResultOption12.text('12'));
			maxResultItems.append(maxResultOption24.text('24'));
			maxResultItems.append(maxResultOption36.text('36'));
			maxResultItems.append(maxResultOption48.text('48'));
			filter.append(filterPages.text('Pages'));
			filter.append(filterFiles.text('Files'));
			filter.append(filterEverything.text('Everything'));
			
			if (self.conf.filter == 0)
				filter.val('Everything');
			else if (self.conf.filter == 1)
				filter.val('Pages');
			else 
				filter.val('Files');
			
			input.focus(function(){
				if (!self.conf.inputLock) {
					input.val('');
					input.css('color','black');
					self.conf.inputLock = true;
				}
			});
			
			maxResultItems.change(function(){
				self.conf.limit = $(this).find(":selected").val();
			});
			
			filter.change(function(){
				self.conf.filter = $(this).find(":selected").val();
			});
			
			button.click(function(){
				self.queryCategoryIntersection();
			});
			
			self.elem.addClass(self.conf.wrapperClass);

var note = $('<p style="font-size: 12px;line-height: 14px;margin: 12px 0px 12px 0px;padding: 3px;" />');
note.text("Please note that the search isn't yet finished. A lot of categories need to be refactored for the search to properly read them. However, you may still use it. But i would strongly suggest to use the regular wiki search at the upper right corner for the moment. Thanks for your patience.");
self.elem.prepend(note);
			self.elem.prepend(filter);
			self.elem.prepend(maxResultItems);
			self.elem.prepend(button);
			self.elem.prepend(input);
		},
		queryCategoryIntersection:function() {
			var self = this;
			var limit = '&limit=' + self.conf.limit;
			var tags = this.fetchTags();
			var url = this.conf.url+tags + limit;
			var tagContainer = $('<ul/>');

			$.ajax({
			   type: 'GET',
				url: url,
				async: true,
				contentType: "text/xml",
				dataType: "text",
				success: function(data) {
					var xmlDoc = $($.parseXML(data));
					xmlDoc.find('categoryintersection').children().each(function(){
					    var title = $(this).attr('title');
						var isFile = title.indexOf('File:') > -1;
						var result = $('<li/>');
						var resultLink = $('<a/>');
						
						if (self.conf.filter == 1 && isFile) 
							return;
						if (self.conf.filter == 2 && !isFile) 
							return;
						
						resultLink.attr('href',self.conf.baseUrl+title);
						resultLink.text(title);
						result.attr('class',self.conf.resultClass);

						result.append(resultLink);
						tagContainer.append(result);
					});
					self.resultSet.html(tagContainer).hide().fadeIn('fast');
				},
				error: function(e) {
					self.resultSet.html("<p><b>Whelp, something derped out, please try again.</b></p>");
				}
			 });
		},
		fetchTags: function() {
		    var self = this;
			var tags = new Array();
			var rawTags = this.elem.children('input[name="'+this.conf.inputName+'"]').val();
			var rawTags = rawTags.split(',');
			$.each(rawTags, function(){
				var item = this.trim().replace(' ', '_');
				tags.push(self.conf.categoryPrefix+item);
			});

			return tags.join(this.conf.categorySeperator);
		}
	};
 
    $.fn.tagsearch = function(config) {
        var conf = $.extend({
            inputName: 'tagtSearch',
			autocomplete: 'off',
			wrapperClass: 'tagSearchWrap',
			limit: 12,
			url: 'http://falloutequestria.wikia.com/api.php?action=query&list=categoryintersection&format=xml&categories=',
			baseUrl: 'http://falloutequestria.wikia.com/wiki/',
			categoryPrefix: 'Category:',
			categorySeperator: '|',
			resultSet: '#tagSearchResultset',
			resultClass: 'resultItem',
			exampleText: 'Characters, Unicorns, ...',
			inputLock: false,
			filter: 1
        }, config );

		var plugin = Object.create(tagSearchPlugin);
		plugin.init(this,conf);
		return plugin.buildSearch();
    };
 
}( jQuery ));

$('#tagSearch').tagsearch({wrapperClass:'tagSearchWrap cf'});



/*###############################################################################
#
# Fimcition Plugin
#
# How to use:
#             .(id, data, configuration);
#                 id: Numeric id of the story you want to call. 
#                 data: String or array of strings containing all nodes you want
#                       to fetch. 
#                 configuration: Object containing overwrite for default settings.
#                                This parameter is OPTIONAL.
#                                Avaiable options:
#                                     append: Append to selector true/false.
#                                     seperator: For multiple results in one container.
#                                     grace: Ms before trying to re-call api after error.
#                                     api: URI for fimfiction api.
#                                     placeholder: Icon during load process.
#                                     callback: Function, recieves result. 
#
################################################################################*/

(function($) {
    var fimficPlugin = {
        init: function(elem, config) {
            this.conf = config;
            this.elem = elem;
        },
        //Traverse an object recursively. Look for first occurence of key, return the value.
        traverseObjForKey: function(obj, key) {
            var self = this;
            for (var i in obj) {
                if (i == key)
                    return obj[i];
                if (typeof(obj[i]) == 'object')
                    var found = self.traverseObjForKey(obj[i], key);
                if (found) return found;
            }
            return undefined;
        },
        //Call Fimfiction.net api with given story id. 
        fetchFromFimfic: function(storyId, keys) {
            var self = this;
            var url = self.conf.api + storyId;
            var result = new Array();
            //var isAsync = self.conf.append;
            keys = Array.isArray(keys) ? keys : [keys];

            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                crossDomain: true,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                    $.each(keys, function(i, v) {
                        var found = self.traverseObjForKey(json, v);
                        found = found ? found : 'N/A';
                        if (typeof(found) == 'object')
                            result.push(found);
                        else
                            result.push(self.format(v, found) + self.conf.seperator);
                    });
                    if (self.conf.append)
                        self.elem.innerHTML = result;
                    if (typeof self.conf.callback == 'function') {
                        self.conf.callback.call(this, result);
                    }
                },
                error: function(e) {
                    setTimeout(function() {
                        self.fetchFromFimfic(storyId, keys);
                    }, self.conf.grace);
                }
            });

            return result;
        },
        //If you need to compute a result, add it here.
        format: function(key, data) {
            if (key == 'date_modified') {
                var modified = new Date(parseInt(data * 1000));
                return isNaN(modified.getTime()) ? 'N/A' : ((modified.getDay() + 1) + '-' + (modified.getMonth() + 1) + '-' + modified.getFullYear());
            } else if (key == 'words')
                return isNaN(Number(data)) ? 'N/A' : Number(data).toLocaleString('en');
            return data;
        }
    };

    $.fn.fimfic = function(storyId, keys, config) {
        var conf = $.extend({
            append: true,
            seperator: ' ',
            grace: 200,
            api: 'http://www.fimfiction.net/api/story.php?story=',
            placeholder: 'http://www.artisticmink.de/public/live/temp/ajax-loader.gif',
            callback: undefined
        }, config);

        if (conf.append)
            return this.each(function(i) {
                var elem = this;

                $(elem).html('<img width="16" height="16" id="fimfic-icon-ajax" src="' + conf.placeholder + '" />');
                var plugin = Object.create(fimficPlugin);
                plugin.init(elem, conf);
                var result = plugin.fetchFromFimfic(storyId, keys);
            });
        else {
            var plugin = Object.create(fimficPlugin);
            plugin.init(undefined, conf);
            return plugin.fetchFromFimfic(storyId, keys);
        }
    };

    $(document).ready(function() {

        //Fix for a very weird issue with sortable th. May be removed at some point.
        $('.headerSort').find('p').remove();

        //Find synposis, then look for fimfiction link. If found, extract story ID and continue.
        $('.side-stories-synopsis').each(function() {
            var row = this;

            // This loop walks trough all synopsis links, then checks if the link is viable for further processing. Finally, calls a plugin function to fetch data from the api.
            $(this).find('a').each(function() {
                var url = $(this).attr('href');
                var storyId;

                var storyRow = $(row).parent().prev();
                var useFimfic = storyRow.find('.side-stories-title').data('fimfic-enabled') == true ? 1 : 0;

                if (url.match(new RegExp('fimfiction.net')) && useFimfic) {
                    storyId = $(this).attr('href').match(/[0-9]+/);

                    var chapters = storyRow.find('.side-stories-chapters');
                    var words = storyRow.find('.side-stories-words');
                    var date = storyRow.find('.side-stories-date');
                    var placeholder = '<img width="16" height="16" id="fimfic-icon-ajax" src="http://www.artisticmink.de/public/live/temp/ajax-loader.gif" />';

                    chapters.html(placeholder);
                    words.html(placeholder);
                    date.html(placeholder);

                    $.fn.fimfic(storyId[0], ['date_modified', 'words', 'chapter_count'], {
                        append: false,
                        callback: function(result) {
                            chapters.text(result[2]);
                            words.text(result[1]);
                            date.text(result[0]);
                        }
                    });
                }
            });
        });

        $('.mink-toggleSynopsis').click(function() {
            var thisButton = $(this);
            var thisId = thisButton.attr('id');
            var synopsis = $('#mw-customcollapsible-' + thisId);

            if (!synopsis.is(':visible')) {
                var row = $('#' + thisId).closest('tr');
                $(synopsis).insertAfter(row);
                synopsis.show('fast');
            } else {
                synopsis.hide('fast');
            }
        });
    });

}(jQuery));