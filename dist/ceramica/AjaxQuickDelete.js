// Original code written by [[User:Ilmari Karonen]]
// Rewritten & extended by [[User:DieBuche]]. Botdetection and encoding fixer by [[User:Lupo]]

// Ajax-based replacement for [[MediaWiki:Quick-delete-code.js]]

// DONE: use prependtext/appendtext API parameters for more reliable editing
// DONE: display detailed progress;
// TODO: better error handling/reporting
// DONE: (somehow) detect bots, don't notify them // Most common ones are checked, but there might still be some smaller bots...
// DONE: try to find an actual user to notify for bot-uploaded files (maybe not perfect, see above)
// DONE: follow talk page redirects // see also https://bugzilla.wikimedia.org/show_bug.cgi?id=24330
// DONE: Add the ability to be extended by more userdefined buttons
// <source lang="JavaScript">

if (typeof (AjaxQuickDelete) == 'undefined' && wgNamespaceNumber >= 0) {

var AjaxQuickDelete = {

      /**
      ** Set up the AjaxQuickDelete object and add the toolbox link.  Called via addOnloadHook() during page loading.
      **/
      install : function () {
          // Abort if the user opted out, or is using an antique skin & load the legacy version
          if (window.AjaxDeleteOptOut || (skin != 'vector' && skin != 'monobook')) {
              importScript('MediaWiki:Quick-delete-code.js');
              return;
          }
          // Import stylesheet
          importStylesheet('MediaWiki:AjaxQuickDelete.css');

          //jQuery UI is not loaded on all pages:
          if (jQuery.ui == undefined){
              importStylesheetURI( wgServer + '/w/extensions/UsabilityInitiative/css/vector/jquery-ui-1.7.2.css' );
              importScriptURI( wgServer + '/w/extensions/UsabilityInitiative/js/js2stopgap/jui.combined.min.js');
          }
          // Set up toolbox link
          if (wgNamespaceNumber != 14) {
            addPortletLink('p-tb', 'javascript:AjaxQuickDelete.nominateForDeletion();', this.i18n.toolboxLinkDelete, 't-ajaxquickdelete', null);
          } else {
            addPortletLink('p-tb', 'javascript:AjaxQuickDelete.discussCategory();', this.i18n.toolboxLinkDiscuss, 't-ajaxquickdiscusscat', null);
          }
          
          // Check user group. Attention: Array.prototype.indexOf does not exist on IE! See also
          // https://bugzilla.wikimedia.org/show_bug.cgi?id=24083 .
          if (wgUserGroups && (' ' + wgUserGroups.join(' ') + ' ').indexOf(' sysop ') != -1 ) {
             this.userRights='sysop';
          } else if (wgUserGroups && (' ' + wgUserGroups.join(' ') + ' ').indexOf(' filemover ') != -1 ) {
             this.userRights='filemover';
          }
          
          // Install AjaxMoveButton
          if ((this.userRights == 'filemover' || this.userRights == 'sysop') && wgNamespaceNumber == 6) {

              // Also add a "Move & Replace" button to dropdown menu
              addPortletLink('p-cactions', 'javascript:AjaxQuickDelete.moveFile("", "");', this.i18n.dropdownMove, 'ca-quickmove', 'ca-move');

              //Add quicklinks to template
              if ($j('#AjaxRenameLink').length) {
                $j('#AjaxRenameLink').append('<a href="javascript:AjaxQuickDelete.moveFile();">Move file and replace all usage</a>')
                  .append('<a href="javascript:AjaxQuickDelete.moveFile(1);"><sup> Simple move unused files</sup></a>')
                  .append('<a href="javascript:AjaxQuickDelete.declineMoveFile();" class="ajaxDeleteDeclineMove"><sup> Decline request</sup></a>');
              }
          }

          // Define optional buttons
          if (window.QuickDeleteEnhanced && wgNamespaceNumber==6) {
              var insertTagButtons = [
              {
                  label       : this.i18n.toolboxLinkCopyvio,
                  tag         : '{{copyvio|1=%PARAMETER%}}',
                  talk_tag    : '{{subst:copyvionote|1=%FILE%}}',
                  img_summary : 'Marking as possible copyvio because %PARAMETER%',
                  talk_summary: 'Notification of possible copyright violation',
                  prompt_text : this.i18n.reasonForCopyvio

              },
              {
                  label        : this.i18n.toolboxLinkSource,
                  tag          : '{{subst:nsd}}',
                  talk_tag     : '{{subst:image source|1=%FILE%}}',
                  img_summary  : 'File has no source',
                  talk_summary : '%FILE% does not have a source'

              },

              {
                  label        : this.i18n.toolboxLinkPermission,
                  tag          : '{{subst:npd}}',
                  talk_tag     : '{{subst:image permission|1=%FILE%}}',
                  img_summary  : 'Missing permission',
                  talk_summary : 'Please send a permission for %FILE% to [[COM:OTRS|OTRS]]'

              },
              {
                  label        : this.i18n.toolboxLinkLicense,
                  tag          : '{{subst:nld}}',
                  talk_tag     : '{{subst:image license|1=%FILE%}}',
                  img_summary  : 'Missing license',
                  talk_summary : '%FILE% does not have a license'

              }
              ];
              if (window.AjaxDeleteExtraButtons) insertTagButtons = insertTagButtons.concat(window.AjaxDeleteExtraButtons);
              
              $j.each(insertTagButtons, function(k, v) { 
                  addPortletLink('p-tb', 'javascript:AjaxQuickDelete.insertTagOnPage("' + v.tag + '","' + v.img_summary + '","' + v.talk_tag + '","' + v.talk_summary + '","' + v.prompt_text + '");', v.label); 
              });
          }
      },
      /**
      ** For moving files
      **/
      moveFile: function(simplemove) {

          // 'simplemove': Dont leave redirect, dont replace usage and go to new location instead of reload old page
          
          if ($j('#AjaxRenameLink').length) {
              this.possibleDestination = this.cleanFileName( $j('#AjaxRenameDestination').html() );
              this.possibleReason      = this.cleanReason  ( $j('#AjaxRenameReason').html() );
          }

          this.wpLeaveRedirect = simplemove ? 0: 1;

          // Prompt for details
          this.tasks = [];
          this.addTask('showProgress');
          this.addTask('getMoveToken');
          this.addTask('removeTemplate');
          this.addTask('movePage');
          if (!simplemove) this.addTask('replaceUsage');
          
          // finally reload the page to show changed page
          this.addTask('reloadPage');

          //TODO: Should be unified into one window
          this.prompt (this.i18n.moveDestination, (this.possibleDestination || ''), 'destination', false, true, true);

      },

      /**
      ** For declining request
      **/
      declineMoveFile : function () {
          // No valid reason stated, see the rename guidelines
          this.tasks = [];
          this.addTask('showProgress');
          this.addTask('getMoveToken');
          this.addTask('removeTemplate');

          // finally reload the page to show the deletion tag
          this.addTask('reloadPage');

          this.prompt (this.i18n.declineMove, 'No valid reason stated, see the [[COM:MOVE|rename guidelines]]', 'declineReason', true, true, false);
      },

      insertTagOnPage : function (tag, img_summary, talk_tag, talk_summary, prompt_text) {
           this.tag=tag + '\n';
           this.img_summary = img_summary;

           // first schedule some API queries to fetch the info we need...
           this.tasks = [];

           // get token
           this.addTask( 'showProgress');
           this.addTask( 'findCreator' );
           this.addTask( 'resolveRedirects' );

           this.addTask( 'prependTemplate' );

           if (talk_tag != "undefined") {
               this.talk_tag=talk_tag.replace('%FILE%', wgPageName);
               this.talk_summary=talk_summary.replace('%FILE%', '[[:'+wgPageName+']]');

               this.usersNeeded = true;
               this.addTask( 'notifyUploaders' );
           }
           this.addTask( 'reloadPage' );

           if(tag.indexOf("%PARAMETER%") != -1) {
               this.prompt (prompt_text || this.i18n.reasonForDeletion,'', 'reason', true, true, true);
           }else{
               this.nextTask();
           }
      },

      discussCategory : function () {
          this.startDate = new Date ();
          this.tag = '{{subst:cfd}}';
          this.img_summary = 'This category needs discussion';
          this.talk_tag = "{{subst:cdw|" + wgPageName + "}}";
          this.talk_summary = "[[:" + wgPageName + "]] needs discussion";

          // set up some page names we'll need later
          this.requestPage = 'Commons:Categories for discussion/' + this.formatDate( "YYYY/MM/" ) + wgPageName;
          this.dailyLogPage = 'Commons:Categories for discussion/' + this.formatDate( "YYYY/MM" );

          // first schedule some API queries to fetch the info we need...
          this.tasks = [];  // reset task list in case an earlier error left it non-empty

          // ...then schedule the actual edits
          this.addTask( 'showProgress');
          this.addTask( 'findCreator' );
          this.addTask( 'notifyUploaders' );
          this.addTask( 'prependTemplate' );
          this.addTask( 'createRequestSubpage' );
          this.addTask( 'listRequestSubpage' );

          // finally reload the page to show the deletion tag
          this.addTask( 'reloadPage' );

          this.prompt (this.i18n.reasonForDiscussion,'', 'reason', true, true, true);

      },
      nominateForDeletion : function () {
          this.startDate = new Date ();

          // set up some page names we'll need later
          this.requestPage = this.requestPagePrefix + wgPageName;
          this.dailyLogPage = this.requestPagePrefix + this.formatDate( "YYYY/MM/DD" );

          this.tag = "{{delete|reason=%PARAMETER%|subpage=" + wgPageName + this.formatDate("|year=YYYY|month=MON|day=DAY}}\n");
          this.img_summary = 'Nominating for deletion';
          this.talk_tag = "{{subst:idw|" + wgPageName + "}}";
          this.talk_summary = "[[:" + wgPageName + "]] has been nominated for deletion";

          // first schedule some API queries to fetch the info we need...
          this.tasks = [];  // reset task list in case an earlier error left it non-empty

          this.addTask( 'showProgress');
          this.addTask( 'findCreator' );
          this.addTask( 'resolveRedirects' );

          // ...then schedule the actual edits
          this.addTask( 'prependTemplate' );
          this.addTask( 'createRequestSubpage' );
          this.addTask( 'listRequestSubpage' );
          this.addTask( 'notifyUploaders' );

          // finally reload the page to show the deletion tag
          this.addTask( 'reloadPage' );

          this.prompt (this.i18n.reasonForDeletion,'', 'reason', true, true, true);
      },

      /**
      * Edit the current page to add the specified tag.  Assumes that the page hasn't
      * been tagged yet; if it is, a duplicate tag will be added.
      **/
      prependTemplate : function () {
        var page = [];
        page.title = wgPageName;
        page.text = this.tag;
        page.editType = 'prependtext';
        if (window.AjaxDeleteWatchFile) page.watchlist = 'watch';

        this.updateProgress( this.i18n.addingAnyTemplate );
        this.savePage(page, this.img_summary, 'nextTask');
    },

      /**
      * Create the DR subpage (or append a new request to an existing subpage).  The request
      * page will always be watchlisted.
      **/
      createRequestSubpage : function () {
        this.templateAdded = true;  // we've got this far; if something fails, user can follow instructions on template to finish

        var page = [];
        page.title = this.requestPage;
        page.text = "\n\n=== [[:" + wgPageName + "]] ===\n" + this.reason + " ~~"+"~~\n";
        page.watchlist = 'watch';
        page.editType = 'appendtext';

        this.updateProgress( this.i18n.creatingNomination );

        this.savePage( page, "Starting deletion request", 'nextTask' );
    },

      /**
      * Transclude the nomination page onto today's DR log page, creating it if necessary.
      * The log page will never be watchlisted (unless the user is already watching it).
      **/
      listRequestSubpage : function () {
        var page = [];
        page.title = this.dailyLogPage;

        // Impossible when using appendtext. Shouldn't not be severe though, since DRBot creates those pages before they are needed.
        // if (!page.text) page.text = "{{"+"subst:" + this.requestPagePrefix + "newday}}";  // add header to new log pages

        page.text = "\n{{" + this.requestPage + "}}\n";
        page.watchlist = 'nochange';
        page.editType = 'appendtext';

        this.updateProgress( this.i18n.listingNomination );

        this.savePage( page, "Listing [[" + this.requestPage + "]]", 'nextTask' );
    },

      /**
      * Notify any uploaders/creators of this page using {{idw}}.
      * TODO: follow talk page redirects (including {{softredirect}}) // Should we really append a commons template on some user page in another wiki? Probably wouldn't work.
      * DONE: obey {{nobots}} and/or other opt-out mechanisms // Not perfect though, to avoid another timely API call, I just put in the list of current users; needs to updated everyonce awhile
      **/
      notifyUploaders : function () {
          this.uploadersToNotify = 0;
          for (var user in this.uploaders) {
              var page = [];
              page.title = this.userTalkPrefix + user;
              page.text = "\n"+ this.talk_tag +  " ~~"+"~~\n";
              page.editType = 'appendtext';
              if (window.AjaxDeleteWatchUserTalk) page.watchlist = 'watch';
              this.savePage( page, this.talk_summary, 'uploaderNotified' );

              this.updateProgress( this.i18n.notifyingUploader.replace('%USER%', user) );

              this.uploadersToNotify++;
          }
          if (this.uploadersToNotify == 0) this.nextTask();
      },

      uploaderNotified : function () {
          this.uploadersToNotify--;
          if (this.uploadersToNotify == 0) this.nextTask();
      },

    /**
     * Compile a list of uploaders to notify.  Users who have only reverted the file to an
     * earlier version will not be notified.
     * DONE: notify creator of non-file pages
    ***/
    findCreator : function () {
        if (wgNamespaceNumber == 6) {
            var query = {
              action : 'query',
              prop : 'imageinfo|revisions|info',
              rvprop: 'content|timestamp',
              intoken : 'edit',
              iiprop : 'user|sha1|comment',
              iilimit : 50,
              titles : wgPageName
              };
          
        } else {
            var query = {
              action  : 'query',
              prop    : 'info|revisions',
              rvprop  : 'user|timestamp',
              rvlimit : 1,
              rvdir   : 'newer',
              intoken : 'edit',
              titles  : wgPageName
              };
        }
        this.doAPICall( query, 'findCreatorCB' );
    },
    findCreatorCB : function (result) {
        this.uploaders = {};
        var pages = result.query.pages;
        for (var id in pages) {  // there should be only one, but we don't know its ID

            // The edittoken only changes between logins
            this.edittoken=pages[id].edittoken;
            
            //First handle non-file pages
            if (wgNamespaceNumber != 6) {
                    
              this.pageCreator = pages[id].revisions[0]['user'];
              this.starttimestamp = pages[id].starttimestamp;
              this.timestamp = pages[id].revisions[0]['timestamp'];

              this.uploaders[this.pageCreator] = true;
            
            } else {
              var info = pages[id].imageinfo;
            
              var content = pages[id].revisions[0]['*'];
            
              var seenHashes = {};
              for (var i = info.length-1; i >= 0; i--) {  // iterate in reverse order
                  if (info[i].sha1 && seenHashes[ info[i].sha1 ]) continue;  // skip reverts

                  // Now exclude bots which only reupload a new version:
                  this.excludedBots='FlickreviewR, Rotatebot, Cropbot, Picasa Review Bot';
                  if(this.excludedBots.indexOf(info[i].user) != -1) continue;

                  // Now exclude users with a {{nobots}} template as well as the user itself:
                  this.excludedUsers='Arch dude, Avicennasis, BetacommandBot, Blood Red Sandman, Blurpeace, Captmondo, Coffee, Connormah, Denis Barthel, Editor at Large, Elvey, File Upload Bot (Kaldari), Grillo, Guandalug, IngerAlHaosului, Iune, Kbh3rd, Load, LobStoR, Megapixie, Michiel1972, Noodle snacks, OhanaUnited, Peteforsyth, Qwerty0, RenéV, Robinsonsmay, Rocket000, Sarkana, Shereth, Shoy, Sicherlich, Stepshep, The Earwig, V85, William S. Saturn, WJBscribe' + wgUserName;
                  if(this.excludedUsers.indexOf(info[i].user) != -1) continue;

                  // Handle some special cases, most of the code by [[User:Lupo]]
                  if (info[i].user == 'File Upload Bot (Magnus Manske)') {
                      // CommonsHelper
                      match = /transferred to Commons by \[\[User:([^\]\|]*)(\|([^\]]*))?\]\] using/.exec(info[i].comment);

                      // geograph_org2commons, regex accounts for typo ("transferd") and it's possible future correction
                      if (!match) match = /geograph.org.uk\]; transferr?e?d by \[\[User:([^\]\|]*)(\|([^\]]*))?\]\] using/.exec(info[i].comment);

                      // flickr2commons
                      if (!match) match = /\* Uploaded by \[\[User:([^\]\|]*)(\|([^\]]*))?\]\]/.exec(content);

                      if (match) match = match[1];
                      // Really necessary?
                      match = this.fixDoubleEncoding (match);
                   } else if (info[i].user == 'FlickrLickr') {
                      match = /\n\|reviewer=\s*(.*)\n/.exec(content);
                      if (match) match = match[1];
                   } else if (info[i].user == 'Flickr upload bot') {
                      // Check for the bot's upload template
                      match = /\{\{User:Flickr upload bot\/upload(\|[^\|\}]*)?\|reviewer=([^\}]*)\}\}/.exec(content);
                      if (match) match = match[2];
                   } else {
                      // No special case applies, just continue;
                      this.uploaders[ info[i].user ] = true;
                      continue;
                   }
                    if (match){
                        this.uploaders[ match ] = true;
                    }
              }
            }
        }

        // FIXME: How do we get the length of an associative array?
        this.updateProgress( this.i18n.preparingToEdit.replace('%COUNT%', '') );
        this.nextTask();
    },

    /**
     * Now query the redirect status of all user talk pages, and, if necessary, replace them in this.uploaders
     * Otherwise we would appendText to redirected pages, thus breaking them..
     **/

    resolveRedirects : function () {
        var pages = [];
        for (var user in this.uploaders) pages.push( this.userTalkPrefix + user );
        var query = {
            action : 'query',
            redirects : '',
            titles : pages.join('|') };
        this.doAPICall( query, 'resolveRedirectsCB' );
    },

    resolveRedirectsCB : function (result) {
        if (result.query && result.query.redirects) {
            for (var i in result.query.redirects) {
                redirect = result.query.redirects[i];
                delete this.uploaders[redirect['from'].replace(this.userTalkPrefix, '')];

                this.uploaders[ redirect['to'].replace(this.userTalkPrefix, '') ] = true;
            }
        }
        this.nextTask();
    },

    getMoveToken : function () {
        var query = {
            action  : 'query',
            prop    : 'info|revisions',
            rvprop  : 'content|timestamp',
            intoken : 'edit|move',
            titles  : wgPageName
            };
        this.doAPICall( query, 'getMoveTokenCB' );
    },

     getMoveTokenCB : function (result) {
        var pages = result.query.pages;
        for (var id in pages) {  // there should be only one, but we don't know its ID

            // The edittoken only changes between logins
            this.edittoken=pages[id].edittoken;
            this.movetoken=pages[id].movetoken;
            this.pageContent = pages[id].revisions[0]['*'];
            this.starttimestamp = pages[id].starttimestamp;
            this.timestamp = pages[id].revisions[0]['timestamp'];
          }

        this.updateProgress( this.i18n.preparingToEdit.replace('%COUNT%', '') );
        this.nextTask();
      },

    removeTemplate : function () {
        var page = [];
        page.title = wgPageName;
        page.text = this.pageContent.replace( /\{\{(rename|rename media|move)\|.*?\}\}/i, "" );
        page.editType = 'text';
        page.starttimestamp = this.starttimestamp;
        page.timestamp = this.timestamp;

        this.updateProgress (this.i18n.removingTemplate);
        this.savePage(page, (this.declineReason || this.i18n.renameDone), 'nextTask');
    },

    replaceUsage : function () {
        var page = [];
        page.title = 'User:CommonsDelinker/commands';
        if (this.userRights=='filemover') page.title = 'User talk:CommonsDelinker/commands';

        page.text = '\n{{universal replace|' + wgPageName.replace("File:", "") + '|' + this.destination.replace("File:", "") + '|reason=[[Commons:File renaming|File renamed]]: ' + this.reason + '}}';
        page.editType = 'appendtext';

        this.updateProgress( this.i18n.replacingUsage );
        this.savePage(page, 'universal replace: [[:' + wgPageName + ']] → [[:' + this.destination +']]', 'nextTask');
    },

    /**
     * Submit an edited page.
     **/
    savePage : function (page, summary, callback) {
        var edit = {
            action : 'edit',
            summary : summary,
            watchlist : (page.watchlist || 'preferences'),
            title : page.title,
            token : this.edittoken
            };

        edit[page.editType]=page.text;
        this.doAPICall( edit, callback );
    },

    movePage : function () {
        var edit = {
            action   : 'move',
            reason   : this.reason,
            from     : wgPageName,
            to       : this.destination,
            movetalk : '',
            token    : this.movetoken
            };
        // Option to not leave a redirect behind, MediaWiki default does leave one behind
        // Just like movetalk, an empty parameter sets it to true (true to not leave a redirect behind)
        if (this.wpLeaveRedirect === 0) {
            edit.noredirect = '';
        }

        this.updateProgress( this.i18n.movingFile );

        this.doAPICall( edit, 'nextTask');
    },

    /**
     * Does a MediaWiki API request and passes the result to the supplied callback (method name).
     * Uses POST requests for everything for simplicity.
     * TODO: better error handling
     **/
    doAPICall : function ( params, callback ) {
        var o = this;
        
        params.format='json';
        $j.ajax({
          url: this.apiURL,
          cache: false,
          dataType: 'json',
          data: params,
          type: 'POST',
          success: function(result, status, x) {
            if (!result) return o.fail( "Receive empty API response:\n" + x.responseText );

            // In case we get the mysterious 231 unknown error, just try again
            if (result.error && result.error.info.indexOf('231') != -1) return setTimeout(function(){o.doAPICall(params, callback);},500);
            if (result.error) return o.fail( "API request failed (" + result.error.code + "): " + result.error.info );
            if (result.edit && result.edit.spamblacklist) return o.fail( "The edit failed because " +  result.edit.spamblacklist + " is on the Spam Blacklist");
            try { o[callback](result); } catch (e) { return o.fail(e); }
          },
          error: function(x, status, error) {
            return o.fail( "API request returned code " + x.status + " " + status + "Error code is " + error);
          }
        });
    },

      /**
      * Simple task queue.  addTask() adds a new task to the queue, nextTask() executes
      * the next scheduled task.  Tasks are specified as method names to call.
      **/
      tasks : [],  // list of pending tasks
      currentTask : '',  // current task, for error reporting
      addTask : function ( task ) {
          this.tasks.push( task );
      },
      nextTask : function () {
          var task = this.currentTask = this.tasks.shift();
          try { this[task](); } catch (e) { this.fail(e); }
      },

      /**
       * Once we're all done, reload the page.
       **/
      reloadPage : function () {
          location.href = wgServer + wgArticlePath.replace("$1", encodeURIComponent(this.destination || wgPageName));
      },

      /**
      ** Double encoding fixer by Lupo. This is necessary for some older uploads of Magnus' bot.
      **/
      fixDoubleEncoding : function (match) {
          if (!match) return match;
          var utf8 = /[u00C2-u00F4][u0080-u00BF][u0080-u00BF]?[u0080-u00BF]?/g;
          if (!utf8.test(match)) return match;
          // Looks like we have a double encoding. At least it contains character
          // sequences that might be legal UTF-8 encodings. Translate them into %-
          // syntax and try to decode again.
          var temp = "",
          curr = 0,
          m,
          hex_digit = "0123456789ABCDEF";
          var str = match.replace(/%/g, '%25');
          utf8.lastIndex = 0;
          // Reset regexp to beginning of string
          try {
              while ((m = utf8.exec(str)) != null) {
                  temp += str.substring(curr, m.index);
                  m = m[0];
                  for (var i = 0; i < m.length; i++) {
                      temp += '%'
                      + hex_digit.charAt(m.charCodeAt(i) / 16)
                      + hex_digit.charAt(m.charCodeAt(i) % 16);
                  }
                  curr = utf8.lastIndex;
              }
              if (curr < str.length) temp += str.substring(curr);
              temp = decodeURIComponent(temp);
              return temp;
          } catch(e) {
          }
          return match;
      },

      cleanFileName : function (uncleanName){
          uncleanName = uncleanName.replace(/Image:/i, 'File:');
          uncleanName = uncleanName.replace(/.jpe*g/i, '.jpg');
          uncleanName = uncleanName.replace(/.png/i, '.png');
          uncleanName = uncleanName.replace(/.gif/i, '.gif');

          // If new file name is without extension, add the one from the old name
          if (uncleanName.toLowerCase().indexOf(wgPageName.toLowerCase().replace(/.*./, '').replace(/jpe*g/i, 'jpg')) == -1) {
              uncleanName += '.' + wgPageName.toLowerCase().replace(/.*./, '').replace(/jpe*g/i, 'jpg');
          }
          if (uncleanName.indexOf('File:') == -1) uncleanName = 'File:' + uncleanName;
          return uncleanName;
      },
      cleanReason : function (uncleanReason){
          // trim whitespace
          uncleanReason = uncleanReason.replace(/^\s*(.+)\s*$/,'$1');
          // remove signature
          uncleanReason = uncleanReason.replace(/(.+)(--)?~{3,5}$/,'$1');
          return uncleanReason;
      },

      /**
      * For display of progress messages.
      **/
      showProgress : function () {
          document.body.style.cursor = 'wait';

          $progress = $j('<div></div>')
          .html('<div id="feedbackContainer">'+ this.i18n.preparingToEdit + '</div>')
          .dialog({
              width: 450,
              height: 90,
              minHeight: 90,
              modal: true,
              resizable: false,
              draggable: false,
              closeOnEscape: false,
              dialogClass: "ajaxDeleteFeedback"
          });
          $j('.ui-dialog-titlebar').hide();

          this.nextTask();

      },

      updateProgress : function (message) {
          $j('#feedbackContainer').html(message);
      },

      /**
      * Pseudo-Modal JS windows.
      **/
      prompt: function(message, prefill, returnvalue, proceed, noEmpty, cleanup) {
          var $dialog = $j('<div></div>')
          .html('<input type="text" id="AjaxQuestion" style="width: 98%;" value="' + prefill + '">')
          .dialog({
              width: 600,
              modal: true,
              title: message,
              draggable: false,
              dialogClass: "wikiEditor-toolbar-dialog",
              close: function() { $j(this).dialog("destroy"); $j(this).remove();},
              buttons: {
                  "Proceed": function() {
                      response = $j('#AjaxQuestion').val();
                      if (cleanup) {
                          if (returnvalue == 'reason') response = AjaxQuickDelete.cleanReason(response);
                          if (returnvalue == 'destination') response = AjaxQuickDelete.cleanFileName(response);
                      }

                      AjaxQuickDelete[returnvalue] = response;
                      if (returnvalue == 'reason' && AjaxQuickDelete.tag) {
                          AjaxQuickDelete.tag = AjaxQuickDelete.tag.replace('%PARAMETER%', response);
                          AjaxQuickDelete.img_summary = AjaxQuickDelete.img_summary.replace('%PARAMETER%', response);
                          AjaxQuickDelete.img_summary = AjaxQuickDelete.img_summary.replace('%PARAMETER-LINKED%', '[[:' + response + ']]');
                      }
                      $j('#AjaxQuestion').remove();
                      $j(this).dialog("destroy");
                      $j(this).remove();
                      if (proceed == true) AjaxQuickDelete.nextTask();
                      //TODO: Dirty. We really should display one window, not two.
                      if (returnvalue == 'destination') AjaxQuickDelete.prompt(AjaxQuickDelete.i18n.reasonForMove, (AjaxQuickDelete.possibleReason || ''), 'reason', true, false, true);
                  },
                  "Cancel": function() {
                     $j(this).dialog("close");
                  }
              }
          });

          var submitButton = $j('.ui-dialog-buttonpane button:first');
          $j('#AjaxQuestion').keyup(function(event) {
              if ($j(this).val().length < 4 && noEmpty) {
                  submitButton.addClass('ui-state-disabled');
              } else {
                  submitButton.removeClass('ui-state-disabled');
              }
              if (event.keyCode == '13') submitButton.click();
          });
          $j('#AjaxQuestion').keyup();

      },

      /**
      * Crude error handler. Just throws an alert at the user and (if we managed to
      * add the {{delete}} tag) reloads the page.
      **/
      fail : function ( err ) {
          document.body.style.cursor = 'default';
          var msg = this.i18n.taskFailure[this.currentTask] || this.i18n.genericFailure;
          var fix = (this.templateAdded ? this.i18n.completeRequestByHand : this.i18n.addTemplateByHand );
          
          $j('#feedbackContainer').html(msg + " " + fix + "<br>" + this.i18n.errorDetails + "<br>" + err + "<br><a href=" + wgServer + "/wiki/MediaWiki_talk:AjaxQuickDelete.js>" + this.i18n.errorReport +"</a>");
          $j('#feedbackContainer').addClass('ajaxDeleteError');

          // Allow some time to read the message
          if (this.templateAdded) setTimeout(this.reloadPage(), 5000);
      },

      /**
      * Very simple date formatter.  Replaces the substrings "YYYY", "MM" and "DD" in a
      * given string with the UTC year, month and day numbers respectively.  Also
      * replaces "MON" with the English full month name and "DAY" with the unpadded day.
      **/
    formatDate : function ( fmt, date ) {
        var pad0 = function ( s ) { s = "" + s; return (s.length > 1 ? s : "0" + s); };  // zero-pad to two digits
        if (!date) date = this.startDate;
        fmt = fmt.replace( /YYYY/g, date.getUTCFullYear() );
        fmt = fmt.replace( /MM/g, pad0( date.getUTCMonth()+1 ) );
        fmt = fmt.replace( /DD/g, pad0( date.getUTCDate() ) );
        fmt = fmt.replace( /MON/g, this.months[ date.getUTCMonth() ] );
        fmt = fmt.replace( /DAY/g, date.getUTCDate() );
        return fmt;
    },
    months : "January February March April May June July August September October November December".split(" "),

    // Constants
    // DR subpage prefix
    requestPagePrefix: "Commons:Deletion requests/",
    // user talk page prefix
    userTalkPrefix: wgFormattedNamespaces[3] + ":",
    // MediaWiki API script URL
    apiURL: wgServer + wgScriptPath + "/api.php",

    // Translatable strings
    i18n : {
        toolboxLinkDelete     : "Nominate for deletion",
        toolboxLinkDiscuss    : "Nominate category for discussion",

        // GUI reason prompt form
        reasonForDeletion     : "Why should this file be deleted?",
        reasonForDiscussion   : "Why does this category need discussion?",
        submitButtonLabel     : "Nominate",
        cancelButtonLabel     : "Cancel",

        // GUI progress messages
        preparingToEdit       : "Preparing to edit pages... ",
        creatingNomination    : "Creating nomination page... ",
        listingNomination     : "Adding nomination page to daily list... ",
        addingAnyTemplate     : "Adding template to " + wgCanonicalNamespace.toLowerCase() + " description page... ",
        notifyingUploader     : "Notifying %USER%... ",

        // Extended version
        toolboxLinkSource     : "No source",
        toolboxLinkLicense    : "No license",
        toolboxLinkPermission : "No permission",
        toolboxLinkCopyvio    : "Report copyright violation",
        reasonForCopyvio      : "Why is this file a copyright violation?",

        // For moving files
        renameDone            : "Removing template; rename actioned",
        removingTemplate      : "Removing rename template",
        notAllowed            : "You do not have the neccessary rights to move files",
        reasonForMove         : "Why do you want to move this file?",
        moveDestination       : "What should be the new file name?",
        movingFile            : "Moving file",
        replacingUsage        : "Ordering CommonsDelinker to replace all usage",
        declineMove           : "Why do you want to decline the request?",
        dropdownMove          : "Move & Replace",

        // Errors
        genericFailure        : "An error occurred while nominating this " + wgCanonicalNamespace.toLowerCase() + " for deletion.",
        taskFailure : {
            listUploaders           : "An error occurred while determining the " + (6==wgNamespaceNumber ? " uploader(s) of this file" : "creator of this page") + ".",
            loadPages               : "An error occurred while preparing to nominate this " + wgCanonicalNamespace.toLowerCase() + " for deletion.",
            prependDeletionTemplate : "An error occurred while adding the {{delete}} template to this " + wgCanonicalNamespace.toLowerCase() + ".",
            createRequestSubpage    : "An error occurred while creating the request subpage.",
            listRequestSubpage      : "An error occurred while adding the deletion request to today's log.",
            notifyUploaders         : "An error occurred while notifying the " + (6==wgNamespaceNumber ? " uploader(s) of this file" : "creator of this page") + "."
        },
        addTemplateByHand     : "To nominate this " + wgCanonicalNamespace.toLowerCase() + " for deletion, please edit the page to add the {{delete}} template and follow the instructions shown on it.",
        completeRequestByHand : "Please follow the instructions on the deletion notice to complete the request.",
        errorDetails          : "A detailed description of the error is shown below:",
        errorReport           : "Report the error here"
    }
};

if (wgUserLanguage != 'en') importScript( 'MediaWiki:AjaxQuickDelete.js/' + wgUserLanguage);
addOnloadHook (function () { AjaxQuickDelete.install(); });

} // end if (guard)

// </source>