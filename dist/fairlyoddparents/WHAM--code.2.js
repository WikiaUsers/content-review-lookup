//<syntaxhighlight lang="javascript">
/* 
* A modified version of WHAM with a more up-to-date modal
* Includes functionality to delete forum/message wall threads and selective deleting of pages, which the original doesn't have
* Original "WHAM" - http://dev.wikia.com/wiki/WHAM/code.js 
* @author Ozuzanna 
* @TODO interlang message translations
*/
 
;(function($, mw) {
  var ug = mw.config.get("wgUserGroups");
  if (mw.config.get("wgCanonicalSpecialPageName") === "Contributions" && (ug.indexOf('rollback') + ug.indexOf('sysop') + ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -5)) {
 
/* 
* Message wall equivalents list, used to prevent deletion of message walls (causes glitches and not necessary)
* Acquired from https://github.com/Wikia/app/blob/ae6cd75a04ba92270931d8fee70f14d40146091b/extensions/wikia/Wall/Wall.namespaces.php
*/	
    var walls = [ 
	        "Message Wall",
		"Nachrichtenseite",
		"Muro",
                "Viestiseinä",
                "Mur",
                "Üzenőfal",
                "Bacheca",
                "メッセージ ウォール",
                "Prikbord",
                "Tablica wiadomości",
                "Mural de mensagens",
                "Стіна обговорення",
                "Стена обсуждения",
                "留言墙"
    ],
    username = mw.config.get("wgPageName").split("/")[1],
    token = mw.user.tokens.get("editToken"),
    delay = window.WHAMDelay || 100,
    deleteReason,
    duration,
    blockReason,
    deleteArray,
    Api = new mw.Api(),
    revDel = 0;
 
    if ($('.mw-revdelundel-link').length)
      revDel = 1;
 
    $("#contentSub").append(' <a style="color:red;cursor:pointer" id="contribs-wham" title="Super Tool">Quick Tools</a>');
 
    $('#contribs-wham').click(function() {
      $.showCustomModal('WHAM!', '', {
        id: 'form-main',
        width: 660,
        buttons: [{
          message: 'Delete all pages',
          defaultButton: true,
          handler: function () {
            doDelete();    
          }	
        },{		 
          message: 'Delete selected',
          defaultButton: true,
          handler: function () {
            startSelectiveDelete();    
          }
        },{		 
          message: 'Rollback all edits',
          defaultButton: true,
          handler: function () {
            doRollback();    
          }
        },{		 
          message: 'Quick block',
          defaultButton: true,
          handler: function () {
            doBlock();    
          }
        },{		 
          message: 'All of the options',
          defaultButton: true,
          handler: function () {
            doBlock(); 
            if (!duration || !blockReason) return;
            doDelete();
            if (!deleteReason) return;
            doRollback();
          }
        },{
          message: 'Cancel',
          id: 'close-wham'
        }]
      });
      mw.util.addCSS('.modalWrapper .modalContent .modalToolbar {text-align:left;}');
      $('#close-wham').after('<div id="status-wham"/>');
      $('#close-wham,.close').click(function() {
        $('#form-main').closeModal();
        location.reload();
      });
 
      //Bot button
      if (window.WHAMBotMe == true || ug.indexOf('vstf') + ug.indexOf('staff') + ug.indexOf('helper') > -3) {
        $('#form-main .modalContent div .modalToolbar .wikia-button:nth-child(5)').after('<a id="wham-bot" class="wikia-button">Bot me</a>');
        $('#form-main').css('width','800px');
 
        if (ug.indexOf('bot') != -1)
          $('#wham-bot').text('Unbot me');
 
        $('#wham-bot').click(function() {
          var user = mw.config.get('wgUserName');
	  $.getJSON("/api.php?action=query&list=users&ustoken=userrights&ususers=" + user + "&format=json", function(token) {
 
            var config = {
                action: 'userrights',
                user: user,
                add: 'bot',
		reason: window.WHAMBotReason || 'Cleanup',
		bot: true,
	        token: token.query.users[0].userrightstoken
            };
 
            if ($('#wham-bot').text() == "Bot me") {
	      $('#wham-bot').text('Unbot me');
	    } else {
	      config.remove = config.add;
	      delete config.add;
	      $('#wham-bot').text('Bot me');		  
            }
 
	    Api.post(config)
            .done(function(d) { 
              if (!d.error) {
                console.log('Bot status changed!');
              } else {
                console.log('Failed to change bot status: '+ d.error.code);
              }
            })
            .fail(function() {
              console.log('Failed to change bot status!');
            });
          });
	});
      }
    });
 
    function apiDelete(page,reason) {
      Api.post({
      action: 'delete',
      title: page,
      reason: reason,
      bot: true,
      token: token
      })
      .done(function(d) { 
        if (!d.error) {
          console.log('Deletion of '+page+' successful!');
        } else {
          console.log('Failed to delete '+page+': '+ d.error.code);
        }
      })
      .fail(function() {
        console.log('Failed to delete '+page+'!');
      });
    }
 
    function doRollback() {
      $('.mw-rollback-link a').each(function(i) {
        var href = $(this).attr('href') + "&bot=1";
        setTimeout(function() {
	  $.get(href);
          if ($('.mw-rollback-link a').length > 0)
            $('#status-wham').html('Rollbacking... please wait <img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif"/>');
          if (i === $('.mw-rollback-link a').length - 1)
            $('#status-wham').html('Rollbacks complete!');
        }, i*delay);
      });
    }
 
    function doDelete() {    
      deleteReason = prompt('Please enter the delete reason','cleanup');
      if (!deleteReason) return;
      deleteArray = [];
 
      $('#mw-content-text ul li').each(function() {
        var title = $(this).children('a').first().attr('title');
	if (title.split('-').length == 1 || title.split('/@comment').length == 1) return; 
          deleteArray.push(title);
      });
 
      $('li .newpage ~ a').each(function() {
        var title = $(this).attr('title');
        if (walls.indexOf(title.split(':')[0]) !== -1 || (title.split(':')[0] === "Thread" && title.split(':')[1].length < 8)) return;
          deleteArray.push(title);
      });
 
      if (deleteArray) {
        $.each(deleteArray, function(i,v) {
          setTimeout(function() {
            $('#status-wham').html('Deleting... please wait <img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif"/>');
            apiDelete(v,deleteReason);
            if (i === deleteArray.length - 1)
              $('#status-wham').html('Deletions complete!');
          }, i*delay);
        });
      }
    }
 
    function doBlock() {
      duration = prompt('Please state the block duration','2 weeks');
      if (!duration) return;
      blockReason = prompt('Please state the block reason','Vandalism');
      if (!blockReason) return;
 
      Api.post({
      action: 'block',
      user: username,
      expiry: duration,
      nocreate: 0,
      autoblock: 0,
      reason: blockReason,
      bot: true,
      token: token
      })
      .done(function(d) { 
        if (!d.error) {
          console.log(username+' has been blocked successfully!');
        } 
        else {
          alert('Failed to block '+username+': '+ d.error.code);
        }
      })
      .fail(function() {
        alert('Failed to block '+username+'!');
      });
    }
 
    function startSelectiveDelete() {
      var chk = '<input class="selectiveDel" type="checkbox"/> ';
      $('#form-main').closeModal();
      if ($('#btn-wham-del').length && $('#btn-wham-check').length) return;
      $('#mw-content-text').find('ul').last().before('<a class="button" style="cursor:pointer" id="btn-wham-del">Delete Selected</a> <a class="button" style="cursor:pointer" id="btn-wham-check">Check All</a>');
 
      $('li .newpage ~ a').each(function() {
        if (!$(this).parent().find('input').length)
          $(this).parent().prepend(chk);
      });
 
      $('#mw-content-text ul li').each(function() {
        var title = $(this).children('a').first().attr('title');
	if (title.split('-').length != 1 && title.split('/@comment').length != 1 && !$(this).find('input').length && title.split(username) != -1)
          $(this).prepend(chk);	
      });
 
      $('#btn-wham-del').click(function() {
        var deleteReason = prompt('Please enter the delete reason','cleanup');
        if (!deleteReason) return;
        $('.selectiveDel').each(function() {
          var chkObj = $(this);
          if (revDel == 0) {
            var title = $(this).parent().find('a').first().attr('title');
          }
          else {
            var title = $(this).parent().children('a').eq(0).attr('title');
          }
          if (chkObj.attr('Checked') && walls.indexOf(title.split(':')[0]) == -1) {  
            apiDelete(title,deleteReason);
            $(this).parent().css({'color':'grey','text-decoration':'line-through'}).children().removeAttr('href').css({'color':'grey','text-decoration':'line-through'});
          }
        });
        setTimeout((function(){
          location.reload();
        }), 5000);
      });
 
      $('#btn-wham-check').click(function() {
        var btn = $(this);
        if (btn.text() == 'Uncheck All') {
          $('.selectiveDel').each(function() {
            var chkObj = $(this);
            if (chkObj.attr('checked'))
              chkObj.removeAttr('checked');        
          });
          btn.text('Check All');
        }
        else {
          $('.selectiveDel').each(function() {
            var chkObj = $(this); 
            if (!chkObj.attr('checked'))
              chkObj.attr('checked','checked');        
          });
          btn.text('Uncheck All'); 
        }
      }); 
    }
}
 
}) (this.jQuery, this.mediaWiki);
//</syntaxhighlight>