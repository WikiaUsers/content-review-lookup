//<source lang="javascript">

var License = function(str) {
  var res = str.split('').reverse().join('').split('|');

  this.text = res[0].split('').reverse().join('');
  this.template = res.slice(1).join('|').split('').reverse().join('');
}

var Licenses = function(str, selecttag) {
  this.msg = str;
  this.select = selecttag;
  this.licenses = new Array();

  this.trimStars = function( _str ) {

    var count = _str.split('*').length-1;
    return [count, _str.replace(/^\*+/,"").replace(/^\s+/,"")];
  }
  
  this.stackItem = function ( list, path, item ) {
    var position = list;
    for( var i=0; i< path.length; ++i ) {
      var found = false;
      var j = 0;
      for (; j<position.length; ++j)
      {
        if (position[j].length == 2) {
          if (position[j][0] == path[i]) {
            found = true;
            break;
          }
        }
      }
      if (found) {
        position = position[j][1];
      } else {
        position.push([path[i],new Array()]);
        position = position[position.length-1][1];
      }
    }
    position.push(item);
  }

  this.makeLicenses = function() {
    var levels = new Array();
    var lines = this.msg.split( "\n" );
    for (var i = 0; i < lines.length; ++i) {
      line = lines[i];
      if ( line.indexOf( '*' ) == -1 )
    continue;
      else {
        var arr = this.trimStars(line);
        var level = arr[0];
        var line = arr[1];
        if ( line.indexOf('|') != -1 ) {
          var obj = new License( line );
          this.stackItem( this.licenses, levels, obj );
        } else {
          if ( level < levels.length )
          {
            levels = levels.slice(0,level);
          }
          if ( level == levels.length )
          {
            levels[level - 1] = line;
          } else if (level > levels.length) {
            levels.push(line);
          }
        }
      }
    }
  }

  this.outputOption = function( val, depth) {
    return Array((depth*2)+1).join('&nbsp;') + val;
  }

  this.makeHtml = function(tagset, depth) {
    if (depth == null) {
      depth = 0;
    }
    for (var i = 0; i < tagset.length; ++i)
    {
      if (tagset[i].length == 2) {
        optiontag = document.createElement('option');
        optiontag.innerHTML = this.outputOption(tagset[i][0],depth);
        optiontag.value = '';
        optiontag.disabled = 'disabled';
        optiontag.style.color = 'GrayText';
        this.select.appendChild(optiontag);
        this.makeHtml(tagset[i][1],depth+1);
      } else {
        optiontag = document.createElement('option');
        optiontag.innerHTML = this.outputOption(tagset[i].text,depth);
        optiontag.value = tagset[i].template;
        optiontag.title = '{{' + tagset[i].template + '}}';
        this.select.appendChild(optiontag);
      }
    }
  }

  this.getHtml = function() {
    return this.html;
  }

  this.makeLicenses();
  this.makeHtml(this.licenses);
}

function processLicenses(text, dropdown) {
  var licenses = new Licenses(text,dropdown);
}

function LicenseDropdownEdit() {
  //check if we already have a licensing section
  if (document.getElementById('Licensing:') || document.getElementById('Licensing')) {
    appendtext = '';
  } else {
    appendtext = '\n==Licensing==\n';
  }
  //figure out which license to save
  var selector = document.getElementById( "wpLicense" );
  var selection = selector.options[selector.selectedIndex].value;
  if (selection != "" ) {
    appendtext += '\n{{' + selection + '}}';
    //prettyness
    injectSpinner(document.getElementById( 'wpLicenseSave' ),'licensesave');
    //get an edit token
    var api = sajax_init_object();
    api.open('GET', wgServer + wgScriptPath + '/api.php?format=json&action=query&prop=info&indexpageids=1&intoken=edit&titles=' + wgPageName, true);
    api.onreadystatechange = extract_token;
    api.send(null);
  }
  var token='';

  function extract_token() {
    if(api.readyState==4) {
      if(api.status==200) {
        var response = eval('(' + api.responseText + ')');
        token = response['query']['pages'][response['query']['pageids'][0]]['edittoken'];
        //check for nolicense template
        var nolicenses = getElementsByClassName(document.getElementById('bodyContent'),"*","nolicense");
        var unknownlicenses = getElementsByClassName(document.getElementById('bodyContent'),"*","unknownlicense");
        if ((nolicenses.length + unknownlicenses.length) > 0) {
          //we have to go fetch the contents of the article. Oh well...
          replace_content(token);
        } else {
          edit_page(appendtext,token,false);
        }
      } else {
        alert('The token query returned an error.');
        removeSpinner('licensesave')
      }
    }
  }

  function replace_content(_token) {  

    var anotherapi = sajax_init_object();
    anotherapi.open('GET', wgServer + wgScriptPath + '/index.php?title=' + wgPageName + '&action=raw' , true);
    anotherapi.onreadystatechange = got_content;
    anotherapi.send(null);

    function got_content() {
      if(anotherapi.readyState==4) {
        if(anotherapi.status==200) {
          var pagetext = anotherapi.responseText.replace(/{{(?:Nolicense|Unknown)[^}]*}}/g,"") + appendtext;
          edit_page(pagetext,_token,true);
        } else {
          alert('Getting page contents failed.');
        }
      }
    }
  }

  function edit_page(text,_token,replace) {
    if ( replace ) {
      var parameters = 'action=edit&title=' + encodeURIComponent(wgPageName) + '&text=' + encodeURIComponent(text) + '&summary=Adding%20license%20{{' + encodeURIComponent(selection) + '}}%20and%20removing%20{{nolicense}}%20and%20{{unknown}}&token=' + encodeURIComponent(_token);
    } else {
      var parameters = 'action=edit&title=' + encodeURIComponent(wgPageName) + '&appendtext=' + encodeURIComponent(text) + '&summary=Adding%20license%20{{' + encodeURIComponent(selection) + '}}&token=' + encodeURIComponent(_token);
    }
    api.open('POST', wgServer + wgScriptPath + '/api.php', true);
    api.onreadystatechange = edit_done;
    api.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    api.setRequestHeader('Connection', 'keep-alive');
    api.setRequestHeader('Content-length', parameters.length);
    api.send(parameters);
 
    // process response
    function edit_done() {
      if(api.readyState==4) {
        if(api.status==200) {
          window.location.reload();
        } else {
          alert('Page edit failed.');
        }
      }
    }
  }
}

function setupLicenseDropdown() {
  var api = sajax_init_object();
  api.open('GET', wgServer+wgScriptPath + '/index.php?title=Mediawiki:Licenses&action=raw');
  api.onreadystatechange = addLicenseDropdown;
  api.send(null);

  function addLicenseDropdown() {
  if(api.readyState==4 && api.status==200) {
    var filehist = document.getElementById('filehistory');
    if (filehist) {
      var label = document.createElement('label');
      label.innerHTML = 'Add license: ';
      label.htmlFor = 'wpLicense';
      var licensedrop = document.createElement('select');
      licensedrop.name = 'wpLicense';
      licensedrop.id = 'wpLicense';
      licensedrop.onchange = licenseSelectorCheck;
      processLicenses(api.responseText, licensedrop);
      var preview = document.createElement('div');
      preview.id = 'mw-license-preview';
      submitbutton = document.createElement('a');
      submitbutton.innerHTML = 'Add';
      submitbutton.style.cursor = "pointer";
      submitbutton.id = "wpLicenseSave";
      submitbutton.onclick = LicenseDropdownEdit;
      wpDestFile = document.createElement('hidden');
      wpDestFile.id = 'wpDestFile';
      wpDestFile.name = 'wpDestFile';
      wpDestFile.value = wgTitle;
      filehist.parentNode.insertBefore(wpDestFile, filehist);
      filehist.parentNode.insertBefore(label, filehist);
      filehist.parentNode.insertBefore(licensedrop, filehist);
      filehist.parentNode.insertBefore(preview, filehist);
      filehist.parentNode.insertBefore(submitbutton, filehist);
    }
  }
}

}

if (mw.config.get("wgNamespaceNumber") == 6) {
  wgAjaxLicensePreview = true;
  wgAjaxUploadDestCheck = false;
  importScriptURI(stylepath + '/common/upload.js?195');
  addOnloadHook(setupLicenseDropdown);
}

//</source>