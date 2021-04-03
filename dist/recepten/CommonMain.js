//<nowiki>
console.log('Begin of http://recepten.wikia.com/wiki/MediaWiki/CommonMain.js');
/*--Ruler-------------------------------------------------------------------------------------------
0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789
--------------------------------------------------------------------------------------------------*/

////////////////////////////////////////////////////////////////////////////////////////////////////
// Module: Track
// This module is used to write information to the console that can be used to trace this program.
//
// Dependencies
// These files shall be included before this file is included:
// - Utilities
////////////////////////////////////////////////////////////////////////////////////////////////////

/***************************************************************************************************
User-Defined Object: Track
***************************************************************************************************/
function Track(logEnter, logLeave, logOther) {
  var mLogEnter;
  var mLogLeave;
  var mLogOther;
  /*------------------------------------------------------------------------------------------------
  Publications:                                                                                  */
  this.enter = enter;
  this.leave = leave;
  this.log = log;
  this.setAll = setAll;
  this.setEnter = setEnter;
  this.setLeave = setLeave;
  this.setLog = setLog;
  /*----------------------------------------------------------------------------------------------*/
  function enter(name) {
    if (mLogEnter) {
      write('Entering ' + name + '".');
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function leave(name) {
    if (mLogLeave) {
      write('Leaving ' + name + '".');
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function log(message) {
    if (mLogOther) write(message);
  }
  /*----------------------------------------------------------------------------------------------*/
  function setAll(logEnter, logLeave, logOther) {
    assert('setAll01', true, logEnter === true || logEnter === false);
    assert('setAll02', true, logLeave === true || logLeave === false);
    assert('setAll03', true, logOther === true || logOther === false);
    if ((mLogEnter == null || !mLogEnter) &&  logEnter) {
      write('Logging of entering functions is enabled.');
    }
    if ((mLogEnter == null || mLogEnter) &&  !logEnter) {
      write('Logging of entering functions is disabled.');
    }
    if ((mLogLeave == null || !mLogLeave) &&  logLeave) {
      write('Logging of leaving functions is enabled.');
    }
    if ((mLogLeave == null || mLogLeave) &&  !logLeave) {
      write('Logging of leaving functions is disabled.');
    }
    if ((mLogOther == null || !mLogOther) &&  logOther) {
      write('Logging of other messages is enabled.');
    }
    if ((mLogOther == null || mLogOther) &&  !logOther) {
      write('Logging of other messages is disabled.');
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function setEnter(logEnter) {
    mLogEnter = logEnter;
  }
  /*----------------------------------------------------------------------------------------------*/
  function setLeave(logLeave) {
    mLogLeave = logLeave;
  }
  /*----------------------------------------------------------------------------------------------*/
  function setLog(logOther) {
    mLogOther = logOther;
  }
  /*----------------------------------------------------------------------------------------------*/
  function write(message) {
    var now = new Date();
    console.log(now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' +
      now.getMilliseconds() + " "  + message);
  }
  /*----------------------------------------------------------------------------------------------*/
  setAll(logEnter, logLeave, logOther);
}
var track = new Track(true, true, true);

////////////////////////////////////////////////////////////////////////////////////////////////////
// Module: Localization
// Localization is used to translate text fragments that appear in the user interface from English
// to the language of the user.
//
// Dependencies
// These files shall be included before this file is included:
// - Utilities
////////////////////////////////////////////////////////////////////////////////////////////////////

  /*to do: copy quoted text from English to translation without using the dictionary. Remove such entries from the dictionary.*/
  /*to do: define rules for capitalised words.
  A capitalised word, at the beginning of a sentence, that otherwise cannot be translated, can be
  translated by a capitalized translation of the undercapitalised English word.
  A capitalised word, not at the beginning of the sentence, otherwise cannot be translated, can be
  considered to be a name. Names can be copied from the English to the translation without using
  the dictionary.*/
  /*to do: build-in a self test that checks that no dictionary entry (or part of it) can be translated correctly
  using the remainder of the dictionary. Such dictionary entries are obsolete.*/
  
/***************************************************************************************************
User-Defined Object: DictEntry
***************************************************************************************************/
function DictEntry(English, translation) {
  this.mEnglish = English;
  this.mTranslation = translation;
} //DictEntry

/***************************************************************************************************
User-Defined Object: Localization
***************************************************************************************************/
function Localization() {
  track.enter('Localization()');
  var mLanguage;
  /*------------------------------------------------------------------------------------------------
  Publications                                                                                    */
  this.translate = translate;
  /*----------------------------------------------------------------------------------------------*/
  function setLanguage(language) {
    assert('setLanguage01', true, language === 'en' || language === 'nl');
    mLanguage = language;
    mDict = new Array;
    if (mLanguage === 'nl') {
      mDict.push(new DictEntry('a', 'een'));
      mDict.push(new DictEntry('an', 'een'));
      mDict.push(new DictEntry('and', 'en'));
      mDict.push(new DictEntry('and you\'ll land', 'en komt u terecht'));
      mDict.push(new DictEntry('at that board', 'bij dat bord'));
      mDict.push(new DictEntry('board', 'prikbord'));
      mDict.push(new DictEntry('Answers', 'Antwoorden'));
      mDict.push(new DictEntry('Create a new recipe page', 'Maak een nieuwe receptpagina aan'));
      mDict.push(new DictEntry('Delete', 'Verwijderen'));
      mDict.push(new DictEntry('discussion', 'discussie'));
      mDict.push(new DictEntry('Dispatch', 'Verwijzing'));
      mDict.push(new DictEntry('Due to', 'Vanwege'));
      mDict.push(new DictEntry('Due to technical problems this board is', 'Vanwege technische probl' +
        'emen is dit bord'));
      mDict.push(new DictEntry('Edit', 'Bewerk'));
      mDict.push(new DictEntry('Exit without saving', 'Sluiten zonder op te slaan'));
      mDict.push(new DictEntry('file your request', 'uw verzoek in te dienen'));
      mDict.push(new DictEntry('file your request there', 'uw verzoek daar in te dienen'));
      mDict.push(new DictEntry('h', 'h'));
      mDict.push(new DictEntry('If you click the OK-button, this page will close', 'Als u op de OK-' +
        'button klikt, wordt deze pagina gesloten'));
      mDict.push(new DictEntry('Insert row', 'Voeg rij in'));
      mDict.push(new DictEntry('is', 'is'));
      mDict.push(new DictEntry('is the best spot to', 'is de beste plek om'));
      mDict.push(new DictEntry('Move down', 'Verplaats omlaag'));
      mDict.push(new DictEntry('Move up', 'Verplaats omhoog'));
      mDict.push(new DictEntry('OK', 'OK'));
      mDict.push(new DictEntry('on', 'op'));
      mDict.push(new DictEntry('Publish', 'Publiseren'));
      mDict.push(new DictEntry('Questions', 'Vragen'));
      mDict.push(new DictEntry('Save and exit', 'Opslaan en sluiten'));
      mDict.push(new DictEntry('Service_Desk_Front_Page', 'Service_Balie_Start_Pagina'));
      mDict.push(new DictEntry('Something else', 'Iets anders'));
      mDict.push(new DictEntry('sorry', 'onze excuses'));
      mDict.push(new DictEntry('Special', 'Speciaal'));
      mDict.push(new DictEntry('start', 'start'));
      mDict.push(new DictEntry('technical problems', 'technische problemen'));
      mDict.push(new DictEntry('that', 'dat'));
      mDict.push(new DictEntry('Thank you for using', 'Dank u wel voor het gebruik van'));
      mDict.push(new DictEntry('The Board: "Service Balie, overige vragen"', 'Het Prikbord: "Serv' +
        'ice Balie, overige vragen"'));
      mDict.push(new DictEntry('the newly created page', 'de net gecreëerde pagina'));
      mDict.push(new DictEntry('the Service Desk Front Page', 'de Service Balie Start Pagina'));
      mDict.push(new DictEntry('this board', 'dit prikbord'));
      mDict.push(new DictEntry('This is the place to ask for help from other members of this wiki\'' +
        's community', 'Dit is de plek om hulp te vragen aan andere leden van deze wikigemeenschap'));
      mDict.push(new DictEntry('To', 'Om'));
      mDict.push(new DictEntry('To create a new Service Request, answer these questions', 'Om een S' +
        'ervice Verzoek in te dienen, beantwoord de volgende vragen'));
      mDict.push(new DictEntry('unavailable', 'niet beschikbaar'));
      mDict.push(new DictEntry('Welcome to the Service Desk', 'Welkom bij de Service Balie'));
      mDict.push(new DictEntry('What can we do for you', 'Wat kunnen we voor u doen'));
      mDict.push(new DictEntry('What shall be the name of the new page', 'Wat zal de naam van de ni' +
        'euwe pagina worden'));
      mDict.push(new DictEntry('Your request will be handled by the Service Desk Wizard', 'Uw verz' +
        'oek zal behandeld worden door de Service Desk Wizard'));
    }
  }
  /*------------------------------------------------------------------------------------------------
  This function returns the translation of the specified English word, phrase, sentence or text.  */
  function translate(English) {
    track.enter('Localization::translate("' + English + '")');
    track.setLog(false);
    var translation = "";
    if (mLanguage === 'en') {
      translation = English;
    } else {
      assert('translate01', true, mDict != null);
      //Punctuation markers are in Unicode sequence, for maintenance reasons only.
      var punctuationMarkers = '\t\n\r !"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~☐☑';
      var remainder = English;
      while (remainder.length > 0 && punctuationMarkers.indexOf(remainder[0]) >= 0) {
        translation += remainder[0];
        remainder = remainder.substr(1);
      }
      while (remainder.length > 0) {
        var bestMatch = null;
        track.log('remainder: "' + remainder + '", remainder.length: ' + remainder.length + '.');
        for (var i = 0; i < mDict.length; ++i) {
          track.log('considering: "' + mDict[i].mEnglish + '", length: ' + mDict[i].mEnglish.length +
            '.');
          if (mDict[i].mEnglish.length > remainder.length) {
            track.log('too long.');
            continue;
          } else if (mDict[i].mEnglish.length < remainder.length) {
            track.log('shorter.');
            if (remainder.substr(0, mDict[i].mEnglish.length) == mDict[i].mEnglish) {
              if (punctuationMarkers.indexOf(remainder[(mDict[i].mEnglish.length)]) >= 0) {
                if (bestMatch == null || bestMatch.mEnglish.length < mDict[i].mEnglish.length) {
                  bestMatch = mDict[i];
                  track.log('bestMatch.mEnglish: "' + bestMatch.mEnglish + '".');
                }
              } else {
                track.log('next character "' + English[(mDict[i].mEnglish.length)] +
                  '" is not a punctuation marker.');
              }
            } else {
              track.log('unequal.');
            }
          } else {
            if (remainder == mDict[i].mEnglish &&
              (!bestMatch || bestMatch.mEnglish.length < mDict[i].mEnglish.length)
            ) {
              bestMatch = mDict[i];
              track.log('bestMatch.mEnglish: "' + bestMatch.mEnglish + '".');
            }
          }
        }
        if (bestMatch == null) {
          console.warn('No translation found for "' + remainder + '".');
          translation += remainder;
          remainder = '';
        } else {
          translation += bestMatch.mTranslation;
          remainder = remainder.substr(bestMatch.mEnglish.length);
          while (remainder.length > 0 && punctuationMarkers.indexOf(remainder[0]) >= 0) {
            translation += remainder[0];
            remainder = remainder.substr(1);
          }
        }
      }
    }
    track.setLog(true);
    track.leave('Localization::translate()');
    return translation;
  }
  /*Examples:*/ {
    setLanguage('nl');
    assert('translate01', 'Antwoorden', translate('Answers'));
    assert('translate02',
      'Vanwege technische problemen is dit prikbord niet beschikbaar, onze excuses.',
      translate('Due to technical problems this board is unavailable, sorry.'));
    assert('translate03',
      'Uw verzoek zal behandeld worden door de Service Desk Wizard. Als u op de OK-button klikt, ' +
        'wordt deze pagina gesloten, en komt u terecht op de net gecreeerde pagina.',
      translate('Your request will be handled by the Service Desk Wizard. If you click the OK-but' +
        'ton, this page will close, and you\'ll land on the newly created page.'));
    assert('translate04', '☑ Iets anders.', translate('☑ Something else.'));
  } //Example of translate

  setLanguage(mw.config.get('wgUserLanguage'));
  track.log('User: "' + mw.config.get('wgUserName') + '", language preference: "' + mLanguage +
    '".');
  track.leave('Localization()');
} //Localization()
var localization = new Localization();

////////////////////////////////////////////////////////////////////////////////////////////////////
// Module: HTML
// HTML is used to create HTML text. It intentionally uses style attributes in the elements,
// although a bit blunt, it's in the Wikia's often to only way to get control on the style of the
// HTML elements. A cascading style sheet is often not good enough.
//
// Dependencies
// These files shall be included before this file is included:
// - none
////////////////////////////////////////////////////////////////////////////////////////////////////
/*------------------------------------------------------------------------------------------------*/
function A(href, onclick, innerHTML) {
  track.enter("A()");
  var HTML = "<a href=\"" + href + "\" onclick=\"" + onclick + "\" style=\"margin: 0; padding: 0;" +
    " font-size: 14; line_height: 22px; \">" + innerHTML + "</a>";
  track.log("Returning: " + HTML);
  return HTML;
}
/*------------------------------------------------------------------------------------------------*/
function Button(onclick, innerHTML) {
  track.enter("Button()");
  var HTML = "<button onclick=\"" + onclick + "\" style=\"width: 100%; padding: 0 5px; \">" +
    innerHTML + "</button>";
  track.log("Returning: " + HTML);
  return HTML;
}
/*------------------------------------------------------------------------------------------------*/
function InputText(id, value) {
  track.enter("InputText()");
  var HTML = "<input id=\"" + id + "\" value=\"" + value +"\" style=\"width: 98%; \" type=\"text" +
    "\"/>";
  track.log("Returning: " + HTML);
  return HTML;
}
/*------------------------------------------------------------------------------------------------*/
function P(innerHTML) {
  track.enter("P()");
  var HTML = "<p style=\"margin: 0; padding: 0; font-size: 14; line_height: 22px; \">" + innerHTML +
    "</p>";
  track.log("Returning: " + HTML);
  return HTML;
}
/*------------------------------------------------------------------------------------------------*/
function Table(innerHTML) {
  track.enter("Table()");
  var HTML = "<table cellspacing=\"0\" cellpadding=\"0\" style=\"margin: 0; border: 0px solid red" +
    "; padding: 0; font-size: 14; line_height: 22px; \">\n" + innerHTML + "</table>\n";
  track.log("Returning: " + HTML);
  return HTML;
}
/*------------------------------------------------------------------------------------------------*/
function td(colspan, innerHTML) {
  track.enter("td()");
  var HTML = "<td colspan=\"" + colspan + "\" style=\"height: 22px; margin: 0; border: 0px solid " +
    "red; padding: 0; font-size: 14; line_height: 22px; \">" + innerHTML + "</td>"
  track.log("Returning: " + HTML);
  return HTML;
}
/*------------------------------------------------------------------------------------------------*/
function th(width, innerHTML) {
  track.enter("th()");
  var HTML = "<th scope=\"col\" style=\"margin: 0 0 0 10px; border: 0px solid red; padding: 0; fo" +
    "nt-size: 14; line_height: 22px; width: " + width + "px; \">" + innerHTML + "</th>"
  track.log("Returning: " + HTML);
  return HTML;
}
/*------------------------------------------------------------------------------------------------*/
function tr(innerHTML) {
  track.enter("tr()");
  var HTML = "<tr style=\"margin: 0; padding: 0; font-size: 14; line_height: 22px; vertical-align" +
    ": top; \">\n" + innerHTML + "\n</tr>\n";
  track.log("Returning: " + HTML);
  return HTML;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Module: Editing Assistent
// This add-on will be renamed to "Instructive Forms", and is a WYSIWYG form editor with
// integrated help, validation and guidelines.
//
// Documentation
// http://documentalists-sandbox.wikia.com/wiki/Instructive_Form
//
// Dependencies
// These files shall be included before this file is included:
// - Utilities
// - Localization
// - HTML
////////////////////////////////////////////////////////////////////////////////////////////////////

/***************************************************************************************************
User-defined object: EditingAssistant
***************************************************************************************************/
function EditingAssistant() {
  track.enter('EditingAssistant()');
  this.mIgnoreNextActivation = false;
  var mIdOfLastElementThatHadFocus;
  var mLastUsedId = 0;
  /*------------------------------------------------------------------------------------------------
  Publications:                                                                                   */
  this.exit = exit;
                                                                                                    //incomplete
  /*------------------------------------------------------------------------------------------------
  This function initializes the specified button.                                                 */
  function initializeButton(button, caption) {
    track.enter('EditingAssistant.initializeButton(button: "' + button + '", caption: "' + caption +
      '")');
    var id = ++mLastUsedId;
    button.setAttribute('id', id);
    button.setAttribute('class', 'ea-button');
    button.setAttribute('caption', caption);
    button.setAttribute('onclick', 'editingAssistant.handleOnClick(' + id + ')');
    button.style.display = 'inline-block';
    button.style.paddingTop = '0';
    button.style.paddingRight = '5px';
    button.style.paddingBottom = '0';
    button.style.paddingLeft = '5px';
    button.style.borderRadius = '5px';
    button.style.marginTop = '0';
    button.style.marginRight = '5px';
    button.style.marginBottom = '0';
    button.style.marginLeft = '5px';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.fontFamily = 'Helvetica,Arial,sans-serif';
    button.style.fontSize = '14px';
    button.style.lineHeight = '22px';
    button.style.backgroundImage = '-moz-linear-gradient(center top , #008BE3 35%, #006CB0 65%)';
    button.style.textAlign = 'center';
    if (caption === 'cancel') button.innerHTML = localization.translate('Exit without saving');
    if (caption === 'delete') button.innerHTML = localization.translate('Delete');
    if (caption === 'down') button.innerHTML = localization.translate('Move down');
    if (caption === 'new') button.innerHTML = localization.translate('Insert row');
    if (caption === 'save') button.innerHTML = localization.translate('Save and exit');
    if (caption === 'up') button.innerHTML = localization.translate('Move up');
    track.leave('EditingAssistant.initializeButton()');
  }
  /*----------------------------------------------------------------------------------------------*/
  function finalizeEditable(editable) {
    track.enter('EditingAssistant.finalizeEditable()');
    assert('finalizeEditable01', 'P', editable.tagName);
    var input = editable.previousSibling;
    assert('finalizeEditable02', 'INPUT', input.tagName);
    editable.innerHTML = input.value;
    input.parentNode.removeChild(input);
    if (editable.parentNode.parentNode.tagName === 'OL') {
      var downButton = editable.nextSibling;
      assert('finalizeEditable03', 'down', downButton.getAttribute('caption'));
      downButton.parentNode.removeChild(downButton);
      var upButton = editable.nextSibling;
      assert('finalizeEditable04', 'up', upButton.getAttribute('caption'));
      upButton.parentNode.removeChild(upButton);
    }
    if (editable.parentNode.tagName === 'LI') {
      var deleteButton = editable.nextSibling;
      assert('finalizeEditable05', 'delete', deleteButton.getAttribute('caption'));
      deleteButton.parentNode.removeChild(deleteButton);
    }
    editable.removeAttribute('id');
    editable.style.display = 'inline';
  }
  /*----------------------------------------------------------------------------------------------*/
  function initializeEditable(editable) {
    track.enter('EditingAssistant.initializeEditable()');
    assert('initializeEditable01', 'P', editable.tagName);
    var id = ++mLastUsedId;
    track.log('id: ' + id);
    editable.setAttribute('id', id);
    var input;
    if (editable.previousSibling && editable.previousSibling.tagName == 'INPUT') {
      input = editable.previousSibling;
    } else {
      input = document.createElement('input');
    }
    input.setAttribute('value', editable.innerHTML);
    input.setAttribute('onfocus', 'editingAssistant.handleOnFocus(' + id + ')');
    input.setAttribute('onkeypress', 'editingAssistant.handleOnKeyPress(event, ' + id + ')');
    input.style.height = '22px';
    input.style.width = editable.style.width;
    input.style.margin = editable.style.margin;
    input.style.fontFamily = 'Helvetica,Arial,sans-serif';
    input.style.fontSize = '14px';
    input.style.lineHeight = '22px';
    editable.parentNode.insertBefore(input, editable);
    if (editable.parentNode.tagName === 'LI') {
      track.log('parent = LI-element');
      var deleteButton = document.createElement('div');
      initializeButton(deleteButton, 'delete');
      deleteButton.style.display = 'none';
      editable.parentNode.insertBefore(deleteButton, editable.nextSibling);
      if (editable.parentNode.parentNode.tagName === 'OL' )
      {
        var upButton = document.createElement('div');
        editable.parentNode.insertBefore(upButton, editable.nextSibling);
        initializeButton(upButton, 'up');
        upButton.style.display = 'none';
        var downButton = document.createElement('div');
        editable.parentNode.insertBefore(downButton, editable.nextSibling);
        initializeButton(downButton, 'down');
        downButton.style.display = 'none';
      }
    }
    editable.style.display = 'none';
    track.leave('EditingAssistant.initializeEditable()');
  }
  /*----------------------------------------------------------------------------------------------*/
  function finalizeEditables() {
    track.enter('EditingAssistant.finalizeEditables()');
    var editables = document.getElementsByClassName("ea-editable");
    for (var i = 0; i < editables.length; ++i) {
      finalizeEditable(editables[i]);
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function initializeEditables() {
    track.enter('EditingAssistant.initializeEditables()');
    var editables = document.getElementsByClassName("ea-editable");
    for (var i = 0; i < editables.length; ++i) {
      initializeEditable(editables[i]);
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function finalizeLists() {
    track.enter('EditingAssistant.finalizeLists()');
    var lists = document.getElementsByClassName("ea-list");
    for (var iList = 0; iList < lists.length; ++iList) {
      var buttons = lists[iList].getElementsByClassName('ea-button');
      for (var i = 0; i < buttons.length; ++i) {
        if (buttons[i].getAttribute('caption') === 'new') {
          buttons[i].parentNode.removeChild(buttons[i]);
        }
      }
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function initializeLists() {
    track.enter('EditingAssistant.initializeLists()');
    var lists = document.getElementsByClassName("ea-list");
    for (var i = 0; i < lists.length; ++i) {
      var button = document.createElement('div');
      initializeButton(button, 'new');
      lists[i].appendChild(button);
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function finalizeInstructions() {
    track.enter('EditingAssistant.finalizeInstructions()');
    var instructions = document.getElementsByClassName("ea-instruction");
    for (var i = 0; i < instructions.length; ++i) {
      instructions[i].removeAttribute('style');
      instructions[i].style.display = 'none';
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function initializeInstructions() {
    track.enter('EditingAssistant.initializeInstructions()');
    var instructions = document.getElementsByClassName("ea-instruction");
    for (var i = 0; i < instructions.length; ++i) {
      instructions[i].style.display = 'none';
      instructions[i].style.width = 'auto';
      instructions[i].style.paddingTop = '0';
      instructions[i].style.paddingRight = '5px';
      instructions[i].style.paddingBottom = '0';
      instructions[i].style.paddingLeft = '5px';
      instructions[i].style.borderWidth = '1px';
      instructions[i].style.borderStyle = 'solid';
      instructions[i].style.borderColor = 'grey';
      instructions[i].style.borderRadius = '5px';
      instructions[i].style.marginTop = '0';
      instructions[i].style.marginRight = '5px';
      instructions[i].style.marginBottom = '0';
      instructions[i].style.marginLeft = '5px';
      instructions[i].style.backgroundColor = 'khaki';
      instructions[i].style.fontFamily = 'Helvetica,Arial,sans-serif';
      instructions[i].style.fontSize = '14px';
      instructions[i].style.lineHeight = '22px';
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function hideEAShows() {
    track.enter('EditingAssistant.hideEAshows()');
    var shows = document.getElementsByClassName("ea-show");
    for (var i = 0; i < shows.length; ++i) {
      shows[i].style.display = 'none';
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function showEAShows() {
    track.enter('EditingAssistant.showEAshows()');
    var shows = document.getElementsByClassName("ea-show");
    for (var i = 0; i < shows.length; ++i) {
      shows[i].style.display = 'inline';
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function showEAHides() {
    track.enter('EditingAssistant.showEAHides()');
    var hides = document.getElementsByClassName("ea-hide");
    for (var i = 0; i < hides.length; ++i) {
      hides[i].style.display = 'inline';
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function hideEAHides() {
    track.enter('EditingAssistant.hideEAHides()');
    var hides = document.getElementsByClassName("ea-hide");
    for (var i = 0; i < hides.length; ++i) {
      hides[i].style.display = 'none';
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function removeToolbar() {
    track.enter('EditingAssistant.removeToolbar()');
    var toolbar = document.getElementById("ea-toolbar");
    toolbar.parentNode.removeChild(toolbar);
    track.leave('EditingAssistant.removeToolbar()');
  }
  /*----------------------------------------------------------------------------------------------*/
  function insertToolbar() {
    track.enter('EditingAssistant.insertToolbar()');
    var cancelButton = document.createElement('div');
    initializeButton(cancelButton, 'cancel');
    cancelButton.style.cssFloat = 'right';

    var saveButton = document.createElement('div');
    initializeButton(saveButton, 'save');
    saveButton.style.cssFloat = 'right';

    var toolbar = document.createElement('div');
    toolbar.setAttribute('id', 'ea-toolbar');
    toolbar.style.display = 'block';
    toolbar.style.width = '100%';
    toolbar.style.paddingTop = '0';
    toolbar.style.paddingRight = '5px';
    toolbar.style.paddingBottom = '0';
    toolbar.style.paddingLeft = '5px';
    toolbar.style.borderWidth = '1px';
    toolbar.style.borderStyle = 'solid';
    toolbar.style.borderColor = 'gray';
    toolbar.style.marginTop = '0';
    toolbar.style.marginRight = '0';
    toolbar.style.marginBottom = '0';
    toolbar.style.marginLeft = '0';
    toolbar.style.fontStyle = 'inherit';
    toolbar.style.fontWeight = 'inherit';
    toolbar.innerHTML = '<div style="display: inline-block; " onclick="editingAssistant.exit(true' +
      ', false)' + '"><a href="#1">View source</a></div>';
    toolbar.appendChild(cancelButton);
    toolbar.appendChild(saveButton);
    var root = document.getElementById('ea-root');
    root.insertBefore(toolbar, root.firstChild);
  }
  /*------------------------------------------------------------------------------------------------
  This function enables all up and down buttons od the given list, except the up button of the first
  item and the down button of the last item.*/
  function setDisabledOfButtons(list) {
    track.enter('EditingAssistant.setDisabledOfButtons(list : ' + list + ')');
    if (list.tagName === 'OL') {
      var items = list.getElementsByTagName('LI');
      for (var iItem = 0; iItem < items.length; ++iItem) {
        var buttons = items[iItem].getElementsByClassName('ea-button');
        for (var i = 0; i < buttons.length; ++i) {
          var caption = buttons[i].getAttribute('caption');
          if ((iItem === 0 && caption === 'up') ||
            (iItem === items.length - 1 && caption === 'down')
          ) {
            buttons[i].disable = true;
            buttons[i].style.color = 'grey';
          } else {
            buttons[i].disable = false;
            buttons[i].style.color = 'white';
          }
        }
      }
    }
    track.leave('EditingAssistant.setDisabledOfButtons()');
  }
  /*------------------------------------------------------------------------------------------------
  This function shows (when show is true) or hides (when show is false) all buttons and
  instructions that are direct children of a parent of the editable with the specified id.        */
  function showOrHideButtonsAndInstructionForEditable(id, show) {
    track.enter('EditingAssistant.showOrHideButtonsAndInstructionForEditable(id: ' + id +
      ', show: ' + show + ').');
    assert('showOrHideButtonsAndInstructionForEditable01', true, show === true || show === false);
    var editable = document.getElementById(id);
    var parentOfEditable = editable.parentNode;
    for (;;) {
      var directChildren = parentOfEditable.childNodes;
      for (var i = 0; i < directChildren.length; ++i) {
        //track.log('nodeType:' + directChildren[i].nodeType);
        if (directChildren[i].nodeType != 1) continue;
        if ((directChildren[i].getAttribute('class') == 'ea-button') ||
          (directChildren[i].getAttribute('class') == 'ea-instruction')
        ) {
          if (show === true) {
            directChildren[i].style.display = 'inline-block';
          } else {
            directChildren[i].style.display = 'none';
          }
        }
      }
      if (parentOfEditable.getAttribute('class') == 'WikiaArticle') break;
      parentOfEditable = parentOfEditable.parentNode;
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  this.activate = function() {
    track.enter('EditingAssistant.activate()');
    mIdOfLastElementThatHadFocus = null;
    if (this.mIgnoreNextActivation) {
      track.log('Ignoring this activation.');
      this.mIgnoreNextActivation = false;
    } else {
      if (document.URL.indexOf('?action=edit') !== -1) {
        track.log('Edit view.');
        var editform = document.getElementById('editform');
        var wpTextbox1 = document.getElementById('wpTextbox1');
        if (editform && wpTextbox1) {
          track.log('editform && wpTextbox1 found.');
          var root = document.createElement('div');
          root.setAttribute('id', 'ea-root');
          root.setAttribute('class', 'WikiaArticle');
          root.style.display= 'none';
          root.style.backgroundColor = '#e6e6e6';
          var HTML = wpTextbox1.value;
          if (HTML.substr(0, 9) === '__NOTOC__') HTML = HTML.substr(9);
          root.innerHTML = HTML;
          editform.parentNode.insertBefore(root, editform);
          var editables = document.getElementsByClassName("ea-editable");
          if (editables.length === 0) {
            track.log('This page is no ea-form.');
          } else {
            root.style.display = 'block';
            editform.style.display = "none";
            insertToolbar();
            initializeLists();
            initializeEditables();
            var lists = document.getElementsByClassName("ea-list");
            for (var i = 0; i < lists.length; ++i) {
              setDisabledOfButtons(lists[i]);
            }
            initializeInstructions();
            hideEAHides();
            showEAShows();
          }
        } else {
          track.log('Textbox1 not found.');
        }
      }
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function exit(saveForm, saveSource) {
    track.enter('EditingAssistant.exit()');
    assert('exit01', true, saveForm === true || saveForm === false);
    assert('exit02', true, saveSource === true || saveSource === false);
    var root = document.getElementById('ea-root');
    var editform = document.getElementById('editform');
    var wpTextbox1 = document.getElementById('wpTextbox1');
    //Save form data to the wiki editor's text box.
    if (saveForm) {
      //Change the form to a wiki source page.
      hideEAShows();
      showEAHides();
      finalizeInstructions();
      finalizeEditables();
      finalizeLists();
      removeToolbar();
      //Save form data to the wiki editor's text box.
      wpTextbox1.innerHTML = '__NOTOC__' + root.innerHTML;
      root.style.display= 'none';
      editform.style.display = "block";
    }
    //Save wiki data to the server.
    if (saveSource) {
      //Create a dummy button inside editform.
      var button = document.getElementById('wpSave'); //createElement('button');
      //button.setAttribute('onclick', 'console.log(\'byebye\')');
      //button.innerHTML = 'Exit';
      //root.style.display= 'block';
      //root.appendChild(button);
      //Click it to save and exit the wiki editor.
      var event = new MouseEvent('click', {'view': window, 'bubbles': true, 'cancelable': true});
      var canceled = !button.dispatchEvent(event);
      this.mIgnoreNextActivation = true;
    }
    track.leave('EditingAssistant.exit()');
  }
  /*----------------------------------------------------------------------------------------------*/
  this.handleOnClick = function(id) {
    track.enter('EditingAssistant.handleOnClick(id: "' + id + '")');
    var button = document.getElementById(id);
    var caption = button.getAttribute('caption');
    assert('handleOnClick01', true, caption != null);
    if (caption === 'cancel') {
      track.log('cancel');
      exit(false, true);
    } else if (caption === 'delete') {
      track.log('delete');
      button.parentNode.parentNode.removeChild(button.parentNode);
    } else if (caption === 'down') {
      track.log('down');
      if (!button.disabled) {
        var list = button.parentNode.parentNode;
        var newNode = button.parentNode.cloneNode(true);
        list.insertBefore(newNode, button.parentNode.nextSibling.nextSibling);
        list.removeChild(button.parentNode);
        setDisabledOfButtons(list);
        list.parentNode.getElementsByTagName('INPUT')[0].focus();
      }
    } else if (caption === 'new') {
      track.log('new');
      var newParagraph = document.createElement('p'); //shall be function insertRow()
      newParagraph.setAttribute('class', 'ea-editable');
      newParagraph.style.width = '500px';
      var newItem = document.createElement('li');
      newItem.style.width = 'auto';
      newItem.appendChild(newParagraph);
      var list = button.parentNode;
      list.insertBefore(newItem, button);
      initializeEditable(newParagraph);
      newItem.getElementsByTagName('INPUT')[0].focus();
      setDisabledOfButtons(list);
    }
    if (caption === 'save') {
      track.log('save');
      exit(true, true);
    } else if (caption === 'up') {
      track.log('up');
      if (!button.disabled) {
        var list = button.parentNode.parentNode;
        var newNode = button.parentNode.cloneNode(true);
        list.insertBefore(newNode, button.parentNode.previousSibling);
        list.removeChild(button.parentNode);
        setDisabledOfButtons(list);
        list.parentNode.getElementsByTagName('INPUT')[0].focus();
      }
    }
    track.leave('EditingAssistant.handleOnClick()');
  }
  /*----------------------------------------------------------------------------------------------*/
  this.handleOnFocus = function(id) {
    track.enter('EditingAssistant.handleOnFocus(id: "' + id + '")');
    if (mIdOfLastElementThatHadFocus != null) {
      showOrHideButtonsAndInstructionForEditable(mIdOfLastElementThatHadFocus, false);
      mIdOfLastElementThatHadFocus = null;
    }
    showOrHideButtonsAndInstructionForEditable(id, true);
    mIdOfLastElementThatHadFocus = id;
    track.leave('EditingAssistant.handleOnFocus()');
  }
  /*----------------------------------------------------------------------------------------------*/
  this.handleOnKeyPress = function(event, editableId) {
    track.enter('EditingAssistant.handleOnKeyPress(event: "' + event + '", editableId: "' +
      editableId + '")');
    track.log(event.key);
//    if (event.key === 'Enter') {
//      var editable = document.getElementById(editableId);
//      var list = editable.parentNode.parentNode;
//      var buttons = list.getElementsByClassName('ea-button');
//      for (var i = 0; i < buttons.length; ++i) {
//        if (buttons[i].getAttribute('caption') === 'new') {
//          this.handleOnClick(buttons[i].getAttribute('id')); //shall be function insertRow()
//          var newParagraph = document.createElement('p');
//          newParagraph.setAttribute('class', 'ea-editable');
//          newParagraph.style.width = '500px';
//          var newItem = document.createElement('li');
//          newItem.style.width = 'auto';
//          newItem.appendChild(newParagraph);
//          list.insertBefore(newItem, buttons[i]);
//          initializeEditable(newParagraph);
//          newItem.getElementsByTagName('INPUT')[0].focus();
//          setDisabledOfButtons(list);
//        }
//      }
//    }
  }
} //EditingAssistant
var editingAssistant = new EditingAssistant();

////////////////////////////////////////////////////////////////////////////////////////////////////
// Module: Service Desk
// This add-on replaces the content of a page named:
// * "Service Desk Front Page" (English)
// * "Service Balie Start Pagina" (Dutch)
// with a help navigator (=Service Desk Front Page) in the same language.
//
// Documentation
// http://documentalists-sandbox.wikia.com/wiki/Service_Desk
//
// Dependencies
// These files shall be included before this file is included:
// - Utilities
// - Localization
// - HTML
// - Editing Assistant
////////////////////////////////////////////////////////////////////////////////////////////////////

/***************************************************************************************************
User-defined object ServiceDeskWizard
This object replaces the content of the source editor with the predefined text, when the next page
loads and the wizard is active.
***************************************************************************************************/
function ServiceDeskWizard() {
  /*----------------------------------------------------------------------------------------------*/
  /*Publications:                                                                                 */
  this.activate = activate;
  /*----------------------------------------------------------------------------------------------*/
  function activate() {
    track.enter('ServiceDeskWizard.activate()');
    var key = 'wizard=1';
    if (document.URL.substr(document.URL.length - key.length) === key) {
      track.log('Key found');
      var textBox = document.getElementById('wpTextbox1');
      textBox.innerHTML =
        '__NOTOC__\n' +
        '<!--Ruler-------------------------------------------------------------------------------------------\n' +
        '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789\n' +
        '--------------------------------------------------------------------------------------------------->\n' +
        '\n' +
        '<!--Aantal personen-------------------------------------------------------------------------------->\n' +
        '<div style="position: relative; float: left; width: auto; "><!--\n' +
        '  --><div style="display: none;" class="ea-instruction">Het aantal porties dat met dit recept\n' +
        '      gemaakt wordt.</div><!--\n' +
        '  --><span class="ea-hide" style="display: inline;"><!--\n' +
        '    -->[[File:Aantal_porties.png|16px|Aantal porties]]<!--\n' +
        '  --></span><!--\n' +
        '  --><span class="ea-show" style="display: none; margin: 0px 0px 0px 10px;"><!--\n' +
        '    --><img src="http://static2.wikia.nocookie.net/__cb20131208073454/recepten/nl/images/f/f3/Aantal_porties.png" alt="Aantal porties" height="16"><!--\n' +
        '  --></span><!--\n' +
        '  --><p class="ea-editable" style="display: inline; width: 40px; margin: 0px 10px 0px 14px;">4</p><!--\n' +
        '--></div><!--\n' +
        '\n' +
        '<!--Bereidingstijd--------------------------------------------------------------------------------->\n' +
        '<div style="position: relative; float: left; display: inline; width: auto; "><!--\n' +
        '  --><div style="display: none;" class="ea-instruction">Het aantal minuten dat de bereiding van dit\n' +
        '    gerecht duurt, inclusief eventuele voorbereidingstijd en wachttijd.</div><!--\n' +
        '  --><span class="ea-hide" style="display: inline;"><!--\n' +
        '    -->[[File:Bereidingstijd.png|16px|Bereidingstijd]]<!--\n' +
        '  --></span><!--\n' +
        '  --><span class="ea-show" style="display: none; margin: 0px 0px 0px 10px;"><!--\n' +
        '    --><img src="http://static1.wikia.nocookie.net/__cb20131208074019/recepten/nl/images/2/2e/Bereidingstijd.png" alt="Bereidingstijd" height="16"><!--\n' +
        '  --></span><!--\n' +
        '  --><p class="ea-editable" style="display: inline; width: 40px; margin: 0px 10px 0px 14px;">20</p>minuten<!--\n' +
        '--></div><!--\n' +
        '\n' +
        '--><h2>Ingrediënten</h2>\n' +
        '<!--Ingrediënten----------------------------------------------------------------------------------->\n' +
        '<div style="width: auto; ">\n' +
        '  <div style="display: none;" class="ea-instruction">Per regel één ingredient. Per ingredient de\n' +
        '    hoeveelheid, de eenheid en de naam.</div>\n' +
        '  <ul class="ea-list"></ul>\n' +
        '</div>\n' +
        '\n' +
        '<h2>Voorbereiding</h2>\n' +
        '<!--Voorbereiding---------------------------------------------------------------------------------->\n' +
        '<div style="width: auto; ">\n' +
        '  <div style="display: none;" class="ea-instruction">Per regel één stap. Begin elke stap met een werkwoord.</div>\n' +
        '  <ol class="ea-list"></ol>\n' +
        '</div>\n' +
        '\n' +
        '<h2>Bereiding</h2>\n' +
        '<!--Bereiding-------------------------------------------------------------------------------------->\n' +
        '<div style="width: auto; ">\n' +
        '  <div style="display: none;" class="ea-instruction">Per regel één stap. Begin elke stap met een werkwoord.</div>\n' +
        '  <ol class="ea-list"></ol>\n' +
        '</div>\n' +
        '\n' +
        '<h2>Serveertips</h2>\n' +
        '<!--Serveertips------------------------------------------------------------------------------------>\n' +
        '<div style="width: auto; ">\n' +
        '  <div style="display: none;" class="ea-instruction">Per regel één tip.</div>\n' +
        '  <ol class="ea-list"></ol>\n' +
        '</div>\n' +
        '\n' +
        '<h2>Variaties</h2>\n' +
        '<!--Variaties-------------------------------------------------------------------------------------->\n' +
        '<div style="width: auto; ">\n' +
        '  <ol class="ea-list"></ol>\n' +
        '</div>\n';
    }
  }
}; //ServiceDeskWizard
serviceDeskWizard = new ServiceDeskWizard;

/***************************************************************************************************
User-defined object: ServiceDeskFrontPage
***************************************************************************************************/
function ServiceDeskFrontPage() {
  track.enter('ServiceDeskFrontPage()');
  var mPath = '';
  var mNewPageName = '';
  /*------------------------------------------------------------------------------------------------
  Publications                                                                                    */
  this.activate = activate;
  this.setDocumentLocation = setDocumentLocation;
  this.setNewPageName = setNewPageName;
  this.setPath = setPath;
  /*----------------------------------------------------------------------------------------------*/
  function activate() {
    track.enter('ServiceDeskFrontPage::activate()');
    var enPageName = 'Service_Desk_Front_Page';
    var nlPageName = 'Service_Balie_Start_Pagina';
    var url = document.URL;
    if (
      (url.substr(url.length - enPageName.length) == enPageName) ||
      (url.substr(url.length - nlPageName.length) == nlPageName)
    ) {
      track.log('URL matches.');
      var content = document.getElementById('mw-content-text');
      content.innerHTML = '<div>' + getHTML() + '</div>';
      if (mPath === '1.') {
        document.getElementById('What shall be the name of the new page?').focus();
      }
    }
    track.leave('ServiceDeskFrontPage::activate()');
  }
  /*------------------------------------------------------------------------------------------------
  In this function the controls have a postfix number of 2 or 3 digits. The first 2 digit is the
  row, the second, if present, the column index of this control in the table. Example button032
  is a button that will be displayed on the second column of the third row in the table.          */
  function getHTML() {
    track.enter('getHTML()');
    track.log('mPath: "' + mPath + '"');
    /*Common part for all paths.------------------------------------------------------------------*/
    var HTML = '<!--Style attributes are used to get control over the style used. A cascading sty' +
      'lesheet that defines a style for a class of elements wasn\'t good enough.-->\n';
    var p01 = P(localization.translate('Welcome to the Service Desk.\n'));
    var tr01 = tr(td(3, p01));
    var p02 = P(localization.translate('This is the place to ask for help from other members of t' +
      'his wiki\'s community.\n'));
    var tr02 = tr(td(3, p02));
    var p03 = P(localization.translate('To create a new Service Request, answer these questions.\n')
      );
    var tr03 = tr(td(3, p03));
    var tr04 = tr(td(3, ''));
    var tr05 = tr(th(325, localization.translate('Questions')) + th(250, localization.translate(
      'Answers')) + th(75, ' '));
    var p061 = P(localization.translate('What can we do for you?'));
    if (mPath == '') {
      var p062 = P(localization.translate('☐ Create a new recipe page.'));
      var td062 = '<td colspan="1" onclick="serviceDeskFrontPage.setPath(&quot;1.&quot;)" style="' +
        'height: 22px; margin: 0; border: 0px solid red; padding: 0; font-size: 14; line_height: ' +
        '22px; cursor: pointer; ">' + p062 + '</td>';
      var tr06 = tr(td(1, p061) + td062 + td(1, ''));
      var p072 = P(localization.translate('☐ Something else.'));
      var td072 = '<td colspan="1" onclick="serviceDeskFrontPage.setPath(&quot;2.&quot;)" style="' +
        'height: 22px; margin: 0; border: 0px solid red; padding: 0; font-size: 14; line_height: ' +
        '22px; cursor: pointer; ">' + p072 + '</td>';
      var tr07 = tr(td(1, '') + td072 + td(1, ''));
      HTML += Table(tr01 + tr02 + tr03 + tr04 + tr05 + tr06 + tr07);
      return HTML;
    }
    /*Branch: 1."Create a new recipe page."-------------------------------------------------------*/
    if (mPath.substr(0,2) == '1.') {
      var p062 = P(localization.translate('☑ Create a new recipe page.'));
      var button063 = Button('serviceDeskFrontPage.setPath(&quot;&quot;)', '<div style="position: relative; float: lef' +
        't; "><img src="http://static1.wikia.nocookie.net/recepten/nl/images/5/57/Transparent_pen' +
        'cil.png"/></div>' + localization.translate(' Edit'));
      var tr06 = tr(td(1, p061) + td(1, p062) + td(1, button063));
      var p071 = P(localization.translate('What shall be the name of the new page?'));
      if (mPath == '1.') {
        var i072 = InputText('What shall be the name of the new page?', mNewPageName);
        var button073 = Button('serviceDeskFrontPage.setNewPageName()', localization.translate('OK'));
        var tr07 = tr(td(1, p071) + td(1, i072) + td(1, button073));
        HTML += Table(tr01 + tr02 + tr03 + tr04 + tr05 + tr06 + tr07);
        return HTML;
      }
      var p072 = P(mNewPageName);
      var button073 = Button('serviceDeskFrontPage.setPath(&quot;1.&quot;)', '<div style="position: relative; float: l' +
        'eft; "><img src="http://static1.wikia.nocookie.net/recepten/nl/images/5/57/Transparent_p' +
        'encil.png"/></div>' + localization.translate(' Edit'));
      var tr07 = tr(td(1, p071) + td(1, p072) + td(1, button073));
      var h08 = localization.translate('<h2>Dispatch</h2>\n');
      var tr08 = tr(td(3, h08));
      var p091 = P(localization.translate('Your request will be handled by the Service Desk Wizar' +
        'd. If you click the OK-button, this page will close and you\'ll land on the newly create' +
        'd page.'));
      var button093 = Button('serviceDeskFrontPage.setDocumentLocation(&quot;http://recepten.wiki' +
        'a.com/wiki/' + mNewPageName + '?action=edit&redlink=1&wizard=1&quot;)', localization.translate('OK')
        );
      var tr09 = tr(td(2, p091) + td(1, button093));
      var p10 = P(localization.translate('Thank you for using the Service Desk Front Page.'));
      var tr10 = tr(td(3, p10));
      HTML += Table(tr01 + tr02 + tr03 + tr04 + tr05 + tr06 + tr07 + tr08 + tr09 + tr10);
      return HTML;
    }
    /*Branch: 2."Something else."-----------------------------------------------------------------*/
    if (mPath.substr(0,2) == "2.") {
      var p062 = P(localization.translate('☑ Something else.'));
      var button063 = Button('serviceDeskFrontPage.setPath(&quot;&quot;)', '<div style=\"position' +
        ': relative; float: left; \"><img src=\"http://static1.wikia.nocookie.net/recepten/nl/ima' +
        'ges/5/57/Transparent_pencil.png\"/></div> ' + localization.translate('Edit'));
      var tr06 = tr(td(1, p061) + td(1, p062) + td(1, button063));
      var h07 = "<h2>" + localization.translate('Dispatch') + '</h2>\n';
      var tr07 = tr(td(3, h07));
      var p081 = P(localization.translate('The Board: "Service Balie, overige vragen" is the best ' +
        'spot to file your request. If you click the OK-button, this page will close and you\'ll ' +
        'land at that board. To file your request there, start a discussion.'));
      var button083 = Button('document.location=&quot;http://recepten.wikia.com/wiki/Board:Service_Balie,_overige_vragen&quot;', localization.translate('OK'));
      var tr08 = tr(td(2, p081) + td(1, button083));
      var p09 = P(localization.translate('Thank you for using the Service Desk Front Page.'));
      var tr09 = tr(td(3, p09));
      HTML += Table(tr01 + tr02 + tr03 + tr04 + tr05 + tr06 + tr07 + tr08 + tr09);
      return HTML;
    }
  }
  /*----------------------------------------------------------------------------------------------*/
  function setDocumentLocation(url) {
    track.enter('ServiceDeskFrontPage::setDocumentLocation(URL: "' + url + '")');
    document.location = url;
  }
  /*----------------------------------------------------------------------------------------------*/
  function setNewPageName() {
    track.enter('ServiceDeskFrontPage::setNewPageName()');
    var input = document.getElementById('What shall be the name of the new page?');
    mNewPageName = input.value;
    mPath = '1.1.';
    activate();
    track.leave('ServiceDeskFrontPage::setNewPageName()');
  }
  /*----------------------------------------------------------------------------------------------*/
  function setPath(path) {
    mPath = path;
    activate();
  }
  track.leave('ServiceDeskFrontPage()');
}; //ServiceDeskFrontPage
var serviceDeskFrontPage = new ServiceDeskFrontPage();

/***************************************************************************************************
main
***************************************************************************************************/
function main() {
  track.enter('main()');
  serviceDeskWizard.activate();
  serviceDeskFrontPage.activate();
  editingAssistant.activate();
  track.leave('main()');
};
main();

console.log('End of http://recepten.wikia.com/wiki/MediaWiki/CommonMain.js');
//</nowiki>