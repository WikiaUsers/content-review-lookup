batchDeleteDelay = 200;
massCategorizationDelay = 200;
massProtectDelay = 200;
massRedirectDelay = 200;
massRenameDelay = 200;
massRenameSummary = "Renaming Pages (automatic)";
nullEditUserButton = true;
WHAMBotMe = true;
WHAMBotReason = "Cleanup (automatic)";
WHAMDelay = 200;

window.linkSweepConfirmation = false;
window.linkSweeperDelay = 1000;
window.linkSweeperRedlist = {
      "wantedpages": 1,
      "whatlinkshere": 1,
      "wantedfiles": 1,
      "listredirects": 1,
      "uncategorizedpages": 1
};

window.AjaxCommentDeleteConfig = {
    fastDelete: "Comment removed."
};

window.lastEdited = {
    avatar: true,
    avatarsize: 15,
    size: false,
    diff: true,
    comment: true,
    time: 'timestamp',
    timezone: 'UTC',
    lang: 'en',
    position: {
        element: document.getElementById('WikiaPageHeader'),
        method: 'append'
    },
    namespaces: {
        exclude: []
    },
    pages: []
};

window.massEditConfig = {
    editSummary: "Editing Page Content (automatic)",
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxPatrol/code.js',
        'u:dev:AutoEditPages/code.js',
        'u:dev:Linksweeper/code.js',
        'u:dev:MassCategorization/code.js',
        'u:dev:MassProtect/code.js',
        'u:dev:MassRedirect/code.1.js',
        'u:dev:MediaWiki:AjaxBatchDelete/code.2.js',
        'u:dev:MediaWiki:AjaxBatchUndelete/code.js',
        'u:dev:MediaWiki:AjaxCommentDelete/code.js',
        'u:dev:MediaWiki:AjaxDiff/code.js',
        'u:dev:MediaWiki:AjaxRC/code.js',
        'u:dev:MediaWiki:AjaxRedirect/code.js',
        'u:dev:MediaWiki:AjaxRename/code.js',
        'u:dev:MediaWiki:AjaxThreadDelete/code.js',
        'u:dev:MediaWiki:AnchoredRollback/code.js',
        'u:dev:MediaWiki:CategoryRenameAuto-update/code.js',
        'u:dev:MediaWiki:CatNav/code.js',
        'u:dev:MediaWiki:FileUsageAuto-update/code.js',
        'u:dev:MediaWiki:LastEdited/code.js',
        'u:dev:MediaWiki:ListFiles/code.js',
        'u:dev:MediaWiki:MassEdit/code.js',
        'u:dev:MediaWiki:MassNullEdit/code.js',
        'u:dev:MediaWiki:MassPatrol/code.js',
        'u:dev:MediaWiki:MassRename/code.js',
        'u:dev:MediaWiki:MassRenameRevert/code.js',
        'u:dev:MediaWiki:NullEditButton/code.js',
        'u:dev:MediaWiki:PurgeButton/code.js',
        'u:dev:MediaWiki:RedirectManagement/code.js',
        'u:dev:Message/code.js',
        'u:dev:PageRenameAuto-update/code.js',
        'u:dev:Sine/code.js',
        'u:dev:Thread Inspection/code.js',
        'u:dev:WHAM/code.2.js',
    ]
});

;(function($, mw) {
 
if ($('#t-mred-b').length)
  return;
 
  var FormHTML = '\
  <form method="" name="" class="WikiaForm "> \
    <fieldset> \
      <p>Put the names of each page pair you want to redirect on a <b>separate line</b>.<br/>Remember to include the namespace too if it is not in main.</p> \
      <textarea style="height: 20em; width: 80%;" id="text-mass-redirect-b"/> \
      <div id="text-error-output" style="height:10em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll">Any errors encountered will appear below<br/></div> \
    </fieldset> \
  </form>',
  delay = window.massRedirectDelay || 1000;
 
  //Support for Monobook
  if (mw.config.get('skin') == 'monobook') {
    mw.util.addPortletLink('p-tb', '#', 'Mass Redirect v2', 't-mred-b');
  } else {
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-mred-b">Mass Redirect v2</a></li>');
  }

  $('#t-mred-b').click(function () {
    $.showCustomModal('Mass Redirect v2', FormHTML, {
      id: 'mass-redirect',
      width: 500,
      buttons: [{
          message: 'Cancel',
          handler: function() {
            $('#mass-redirect').closeModal();
          }
      }, {
          message: 'Add category contents',
          defaultButton: true,
          handler: function() {
            addCategoryContents();
          }
      }, {
          id: 'startButton',
          message: 'Initiate',
          defaultButton: true,
          handler: function () {
            init(); 
          }
      }]
    });
  });
 
   function init() {
      var txt = document.getElementById('text-mass-redirect-b'),
      pages = txt.value.split('\n'),	
      page = pages[0];
 
      document.getElementById('startButton').setAttribute('disabled','disabled');      
 
      if (!page) {
        document.getElementById('startButton').removeAttribute("disabled");
        $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
           id: 'mass-redirect-complete',
           width: 200,
           buttons: [{
              message: 'Close',
              defaultButton: true,
              handler: function() {
                $('#mass-redirect-complete').closeModal();
              }
           }]
        });
      } 
      else {
        redirect(page);  
      }
      pages = pages.slice(1,pages.length);
      txt.value = pages.join('\n');
   }
 
    function addCategoryContents() {
      var category = prompt('Please enter the category name (no category prefix):');
      new mw.Api().get({
      action: 'query',
      list: 'categorymembers',
      cmtitle: "Category:"+category,
      cmlimit: 5000
      })
      .done(function(d) {
        if (!d.error) {
        for (var i in d.query.categorymembers) {
            $('#text-mass-redirect-a').append(d.query.categorymembers[i].title+'\n');
          }
        }
        else {
          $('#text-error-output').append('Failed to get contents of '+ category +' : '+ d.error.code +'<br/>');
        }
      })
      .fail(function() {
        $('#text-error-output').append('Failed to get contents of '+ category +'!<br/>');
      });
    } 
 
   function redirect(pages) {
     if (pages.split(' ').length != 2) {
       $('#text-error-output').append(pages+' is invalid input!<br/>');
     }  
     else {
       var page1 = pages.split(' ')[0].replace('_',' '),
       page2 = pages.split(' ')[1].replace('_',' ');
 
       new mw.Api().post({
       action: 'edit',
       title: page1,
       watchlist: 'nochange',
       text: '#REDIRECT [['+page2+']]',
       bot: true,
       token: mw.user.tokens.get('editToken')
       })
       .done(function(d) { 
         if (!d.error) {
           console.log('Redirection of '+page1+' successful!');
         } else {
           console.log('Failed to redirect '+page1+': '+ d.error.code);
        $('#text-error-output').append('Failed to redirect '+page1+': '+d.error.code+'<br/>');
         }
       })
       .fail(function() {
         console.log('Failed to redirect '+page1+'!');
         $('#text-error-output').append('Failed to redirect '+page1+'!<br/>');
       });
     }
    setTimeout(init,delay);
  }
 
}) (this.jQuery, this.mediaWiki);