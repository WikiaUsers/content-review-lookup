/* 
* Clean Wanted Files
* Removes dead file links on the pages that the files on [[Special:WantedFiles]] are used on.
* Should work for videos, images, as well as those piped with captions or other parameters.
* Note: Please check the edits as it may do something it shouldn't e.g. https://mlp.fandom.com/wiki/User:Arabs15?curid=175459&diff=1344192&oldid=906076
* @author Ozank Cx
* @todo: 
* - make it work for pages using <​gallery>
* - improve regex efficiency
*/

mw.loader.using('mediawiki.api', function() {

if (mw.config.get('wgCanonicalSpecialPageName') != "Wantedfiles") return;

$('.mw-spcontent').find('p').first().append('<br/><a class="wds-button wds-is-squished" style="cursor:pointer" id="clean-button">Clean Files</a><br/><div id="text-error-output" style="height:10em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll">Any errors encountered will appear below<br/></div>');

  $('#clean-button').click(function() {
    $('.special > li').each(function() {
      var page = $(this).children('a').first().text();
      new mw.Api().get({
      action: 'query',
      list: 'imageusage',
      iutitle: page,
      iulimit: 5000
      })
      .done(function(d) {
        if (!d.error) {
          var data = d.query;
	  for (var i in data.imageusage) {
	    if (data.imageusage[i].title) {
              cleanPage(data.imageusage[i].title,page);
            }
            else {
	      $('#text-error-output').append('No usage found for '+page+'!<br/>');
	      return;              
            }
          }
        }
        else {
	  console.log('Failed to get image usage for '+page+' : '+d.error.code);
	  $('#text-error-output').append('Failed to get image usage for '+page+' : '+d.error.code+'<br/>');
        }
      })
      .fail(function() {
        console.log('Failed to get image usage for '+page+'!');
	$('#text-error-output').append('Failed to get image usage for '+page+'!<br/>');
      });
    });
  });	
  
  function cleanPage(title,oldFile) {
      //get page contents
      new mw.Api().get({
      action: 'query',
      prop: 'revisions',
      rvprop: 'content',
      titles: title
      })
      .done(function(d) {
	if (!d.error) {
          for (var i in d.query.pages) {
            if (d.query.pages[i].revisions) {
	      var content = d.query.pages[i].revisions[0]["*"];
            }
            else {
	      $('#text-error-output').append('Page '+title+' does not exist!<br/>');
	      return;
            }
          }

          //let's not mess with redirects
          if (/#REDIRECT/gi.test(content)) {
	    $('#text-error-output').append('Page '+title+' is a redirect and has been skipped.');
            return;         
          }
		  
	  //remove the file
          oldFile = oldFile.split(':')[1];
          var underscoreOldFile = oldFile.replace(' ','_'),
          fileRegex = new RegExp ("\\[\\[(File|Image):_?.*?"+oldFile+"\\|?.*?\\]\\]","gi"),
          //@TODO make this fit in with the regex above, it is inefficient but my regex skills lack the knowledge
          underscoreFileRegex = new RegExp ("\\[\\[(File|Image):_?.*?"+underscoreOldFile+"\\|?.*?\\]\\]","gi"),   
	  changedContent = content.replace(fileRegex,'').replace(underscoreFileRegex,'');
		  
	  //don't submit if new and old contents are equal (no file found)
	  if (changedContent.valueOf() == content.valueOf()) {
	    $('#text-error-output').append(oldFile+' was not found on '+title+'!<br/>');
	    return;
	  }
		  
	  //submit new page
          var config = {
            format: 'json',
            action: 'edit',
            watchlist: 'nochange',
            title: title,
            summary: 'Removing defunct file (automatic)',
            nocreate: '',
	    text: changedContent,
	    bot: true,
            token: mw.user.tokens.get('editToken')
          };
	
          if (mw.config.get("wgUserGroups").join(' ').indexOf('bot') == -1)
            delete config.bot;
	
          $.ajax({
              url: mw.util.wikiScript('api'),
              data: config,
              dataType: 'json',
              type: 'POST',
              success: function(d) {
                if (!d.error) {
                  console.log('File successfully removed from '+title+'!');
                } 
	        else {
	          console.log('Failed to remove file from '+title+': '+ d.error.code);
	          $('#text-error-output').append('Failed to remove file from '+title+': '+ d.error.code +'<br/>');
                }
              },
              error: function() {
                console.log('Failed to remove file from '+title+'!');
	        $('#text-error-output').append('Failed to remove file from '+title+'!<br/>');
              }
          });
        }
        else { 
          console.log('Failed to get contents for '+title+' : '+d.error.code);
          $('#text-error-output').append('Failed to get contents for '+title+' : '+d.error.code+'<br/>');
        }
      })
      .fail(function() {
        console.log('Failed to get contents for '+title+'!');
        $('#text-error-output').append('Failed to get contents for '+title+'!<br/>');
      });
  }

});