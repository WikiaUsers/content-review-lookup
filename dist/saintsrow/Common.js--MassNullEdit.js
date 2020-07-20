/* 
* Mass Null Edit 
* From https://dev.wikia.com/wiki/MassNullEdit/code.js
* @description Null edit listed multiple pages. Similar to Ajax Batch Delete.
* Scripts used to help create:
* https://dev.wikia.com/wiki/NullEditButton/code.js
* https://dev.wikia.com/wiki/AjaxBatchDelete/code.js
* https://dev.wikia.com/wiki/ChatBlockButton/code.js
* @author Ozuzanna

* Forked by 452 for the Saints Row Wiki due to the dev implementation not meeting my requirements. 
*/

;(function($, mw) {

if ($('#t-me').length)
  return;

  var FormMNE = '\
  <form method="" name="" class="WikiaForm "> \
    <fieldset> \
      <p>Put the name of each page you want to null edit on a <b>separate line</b>.<br/>Remember to include the namespace too if it is not in main.</p> \
      <textarea style="height: 25em; width: 80%;" id="text-null-edit"/> \
      <div id="text-error-output" style="height:4em; width: 80%; margin: 5px auto 0px auto; color: #000; background-color: #ffbfbf; font-weight: bold;">Any errors encountered are logged in the console.<br/></div> \
    </fieldset> \
  </form>',
  delay = 1000,
  userbtn = window.nullEditUserButton;

  //Support for Monobook
  if (mw.config.get('skin') === 'monobook') {
    mw.util.addPortletLink('p-tb', '#', 'Mass Null Edit', 't-mne');
  } else {
    $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-mne">Mass Null Edit</a></li>');
  }

  //Optional user drop-down button
  if (userbtn == true) {
    $('#AccountNavigation > li > .subnav > li:last-child').after(
      $('<li/>').append('<a style="cursor:pointer" id="user-mne">Mass Null Edit</a>')
    );
  }

  $('#t-mne,#user-mne').click(function () {
    $.showCustomModal('Mass Null Edit', FormMNE, {
	id: 'null-edit',
	width: 500,
	buttons: [{
		message: 'Cancel',
		handler: function() {
		  $('#null-edit').closeModal();
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
                  $('#text-null-edit').append("\n\n");
		  init(); 
		}
	}]
    });
    $("#text-null-edit").css("height",$(window).height() - 350);
    $(".modalWrapper .wikia-button").addClass("button");
  //Autocomplete support for [[Special:WhatLinksHere]]
    if (mw.config.get('wgCanonicalSpecialPageName') === "Whatlinkshere") {
	$('#mw-whatlinkshere-list a').each(function (){ 
		link = $(this).prop("href");
		linktext = $(this).text().trim(); 
		page = $(this).attr("title");

		if (linktext == '← links' || linktext == 'edit' || link.indexOf("/Thread") != -1 || link.indexOf("/Message_Wall") != -1 ) return;
		$('#text-null-edit').append(page+"\n"); 

if (wgUserName == "452" && linktext != page) {
  alert("linktext doesn't match title attribute");
  console.log(linktext);
  console.log(page);
}
	});
    }

  //Autocomplete support for Categories
    if (wgCanonicalNamespace === "Category") {
	$('#text-error-output').append("Contents of "+wgPageName+" loaded automatically");
	addCategoryContents(wgPageName);
    }

    return false;
  });

  function init() {
    var txt = document.getElementById('text-null-edit'),
    pages = txt.value.split('\n'),	
    page = pages[0];

    document.getElementById('startButton').setAttribute('disabled','disabled');
    
    if (page === '' ) {
      document.getElementById('startButton').removeAttribute("disabled");
      $.showCustomModal('Finished!', 'Nothing left to do, or next line is blank.', {
	id: 'null-edit-complete',
	width: 200,
	buttons: [{
		message: 'Close',
		defaultButton: true,
		handler: function() {
			$('#null-edit-complete').closeModal();
		}
	}]
      });
    } else {
	nullEdit(page);  
    }
    pages = pages.slice(1,pages.length);
    txt.value = pages.join('\n');
  }

  function addCategoryContents(category) {
    if (typeof category == "undefined") { 
      var category = prompt('Please enter the category name');
    }

    if (category == null) { console.log("null2"); return; }
    if (typeof category == "undefined") { console.log("undefined2"); return; }
    if (!category.length) { return; }

    if (category.toLowerCase().indexOf("category:") != 0) category = "Category:"+category;
    category = category.replace(/_/g, " ");
    new mw.Api().get({
	action: 'query',
	list: 'categorymembers',
	cmtitle: category,
	cmlimit: 5000
    })
    .done(function(d) {
      if (!d.error) {
	var data = d.query;

	$('#text-null-edit').html($('#text-null-edit').val());
	for (var i in data.categorymembers) {
		$('#text-null-edit').append(data.categorymembers[i].title+'\n');
        }
	$('#text-null-edit').val($('#text-null-edit').html());
      } else {
	console.log('Failed to get contents of '+ category +' : '+ d.error.code);
	$('#text-error-output').text('Last error: Failed to get contents of '+ category +' : '+ d.error.code);
      }
    })
    .fail(function() {
	console.log('Failed to get contents of '+ category);
	$('#text-error-output').text('Last error: Failed to get contents of '+ category);
    });
  } 

  function nullEdit(pageNullEdit) {
    new mw.Api().post({
	format: 'json',
	action: 'edit',
	title: pageNullEdit,
	token: mw.user.tokens.get('editToken'),
	prependtext: ''
    })
    .done(function(d) { 
      if (!d.error) {
	console.log('Null edit of '+pageNullEdit+' successful!');
      } else {
	console.log('Failed to null edit '+pageNullEdit+': '+ d.error.code);
	$('#text-error-output').text('Last error: Failed to null edit '+pageNullEdit+': '+ d.error.code);
	$('#text-null-edit').val($('#text-null-edit').val()+'\n'+pageNullEdit);
      }
    })
    .fail(function() {
      console.log('Failed to null edit '+pageNullEdit);
      $('#text-error-output').text('Last error: Failed to null edit '+pageNullEdit);
      $('#text-null-edit').val($('#text-null-edit').val()+'\n'+pageNullEdit);
    });
    setTimeout(init,delay);
  }
}) (this.jQuery, this.mediaWiki);