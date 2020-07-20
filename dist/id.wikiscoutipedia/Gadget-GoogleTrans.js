// does google toolbar like translation of words and selected text
// works on ie and firefox, epiphany, safari, chrome, and opera but still has bugs on
// Konqueror (in fact the code is disabled on Konqueror)
// selected text translation (up to 500 characters) only on IE, Firefox, and Epiphany, and chrome

// this has only been tested on the monobook and vector skins

/*
DisClaimer

The author of this code is not responsible for any 
use of it, but will endeavor to fix any problems that is
reported to him.  (messages to Endo999) 

*/



// default from and to language
// the languages must be the same as in google.language.Languages array.
// these are normally the international defaults but note:
//  portuguese: pt-PT
//  traditional chinese: zh-TW
//  simplified chinese: zh-CN
//
// must be set in this routine for dictionarylookup.js
/*
var SCLanguageDefaultTo = 'fr';
var SCLanguageDefaultFrom='en';
*/
var SCLanguageTo='en';
var SCLanguageDefaultTo = SCLanguageTo;
var SCLanguageDefaultFrom='id';

var SCGoogleTransPersistString = 'GoogleTrans';
//var SCGoogleTransPersistString = 'TranslationPopups'; // if pt or es wikis

if(typeof wgUserLanguage != "undefined" &&
   typeof wgContentLanguage!= "undefined")
{
   if(wgUserLanguage != wgContentLanguage)
      SCLanguageDefaultTo = wgUserLanguage;
}


var SCShiftKeyNeeded = true;

// need to set document.domain here, each language should set this field here

document.domain = wgServer.substring( wgServer.lastIndexOf("//")+2);




// default literals for system
// must be set in this routine for dictionarylookup.js
// the gadget manager can change these to the language he wishes
var SCstrLanguage = "Language";
var SCstrSource = "Source";
var SCstrGoogle = "Google";
var SCstrCloseWindow = "Close window";
var SCstrSelectLanguage = "Select language (to)";
var SCstrWikipedialanguage = "Wikipedia language";
var SCstrDictionary = "Dictionary";
var SCstrWikipedia = "Wikipedia";
var SCstrPopupHelp = "GoogleTrans help?";
var SCstrTurnOffPopups = "Turn GoogleTrans off?";
var SCstrTurnOnPopups = "Turn GoogleTrans on?";
var SCstrGoogleTrans ="GoogleTrans";
var SCstrOff = " (off)";
var SCstrOn = " (on)";
var SCstrChangeOptions = "Change options for GoogleTrans";
var SCstrTranslatePage = "Google: translate page?";
var SCstrHelpUrl = 
"http://en.wikipedia.org/w/index.php?title=User:Endo999/dictionarylookuphelp.html&ctype=text/html";

var SCstrSingleWord = "Translation of single words";
var SCstrSelectedText = "Translation of selected text (> 500 characters)";
var SCstrKonqueror = "This feature is not supported on Konqueror";
var SCstrTextTooLarge =  "Text element too large to parse!";
var SCstrGuessLanguage = "Any language";
var SCstrShiftKeyNeeded = "Shift key down to bring up Popup? Turn Option ";
var SCstrNextSentence = "Translate Next Sentence?";

var SCbNoShiftKeyBrowser = false;

var SCPopupBackgroundColor = "beige";  // you can set the popup background color here




appendCSS(
'.SCuserData { behavior:url(#default#userdata);} ' +

'#SCitem div small, #SCitem small,#SCitem div div small,#SCitem div div div small {font-size:65%;color:black}' +

'#SCitem div a:hover, #SCitem a:hover, #SCitem div div a:hover {text-decoration:underline;}' +

'.SCPopup {background-color:' + SCPopupBackgroundColor +';border: 1px solid blue;position:absolute;font-size:14pt;z-index:9999;' +'overflow:visible;line-height:normal;padding:.5em;display:block;}' +

'.SCxWindow {font-size:70%;color:black;' +
 'position:absolute;right:.5em;}'+
'.SCyWindow{font-size:50%;color:black;position:absolute;right:.5em;'+
'bottom:.5em}' +
'.SCxTranslation {font-size:70%;color:black;' +
'position:absolute;left:.5em;top;.5em;}' +
'.SCxText {color:black;}'+

'.SCPopupIE {position:absolute;background-color: ' +
 SCPopupBackgroundColor +
';border: 1px solid blue;font-size:14pt;z-index:9999; ' +
'overflow:visible;display:block;line-height:normal;padding:.5em;width:auto;}'
+
'.SCPopupIEA {position:absolute;background-color: ' +
 SCPopupBackgroundColor +
';border: 1px solid blue;font-size:14pt;z-index:9998; ' +
'overflow:visible;display:block;line-height:normal;padding:.5em;width:auto;}'
+
'.SChidestuff {display:none;}' + 
'.SCitemclass {position:static;}'

);
/*
function SCGoogleLanguageLoaded() {
  
  SCMakeGoogleLanguages();
}

function SCloadGoogleLanguage() {
  google.load("language", "1", {"callback" : SCGoogleLanguageLoaded});
}
*/



// this api key is not strictly necessary, but Google maintains they will email
// you if, for some reason, they withdraw the Google translation services
// the gadget manager is welcome to log onto code.google.com and get his own
// api key.  

var SCGoogleAPIKey = "ABQIAAAAIL6lIdsFmMh3QB6iZZYqHBT5zsu4IrEqi6aTPGb6EkJ6C2zK0BQyWgLmv16JfxNy3RYUKg7GyR6XAg";

//var SCGoogleAPIKeyV2 = "AIzaSyCiO2o0J3CvQ-BNTMnDB5KRsHXZ2byriFk";
var SCGoogleAPIKeyV2 = // "AIzaSyDn710ovCpo7O35SLjVp4hb_NYsaM3AK0A";
 "AIzaSyDqOGje0v4Qzf5dtIyGwYSIT_w59dlPCyY";
//var SCGoogleAPIKeyV2 = "AIzaSyD7LfuEQC4me04VsPWhFzPaleTf1P_a5wg";
//var SCGoogleAPIKeyV2 = "AIzaSyBUpyYOT_9D8lzlKXRWqeVKN8tFshTZXps";
                       
//importScriptURI("http://www.google.com/jsapi?callback=SCloadGoogleLanguage&key=" +
//   SCGoogleAPIKey);



 



addOnloadHook(
    function () {
        var span1 = document.createElement('DIV');
        span1.setAttribute('id','SCitem');
        //span1.setAttribute('class','SCitemclass');
        var thebody = document.getElementsByTagName('BODY');
        thebody[0].appendChild(span1);

        var span2 = document.createElement('SPAN');
        span2.setAttribute('id','SCPersistElement');
        span2.setAttribute('class','SCuserData');
        thebody[0].appendChild(span2);

    }
);

//var SCGoogleLanguageCodes = new Array();
//var SCGoogleLanguageNames = new Array();

function SCGoogleLanguageLoaded(response) {
  
  if(1== 0 && response.data && response.data.languages)
  {
     var i;
     for(i=0;i<response.data.languages.length;i++)
     {
       SCGoogleLanguageCodes[i] = 
          response.data.languages[i].language;
       SCGoogleLanguageNames[i] = 
          response.data.languages[i].name;
     }
     
  }


  SCbGoogleLanguageLoaded = true;
  
  //SCMakeGoogleLanguages();
  
}
var SCbGoogleLanguageLoaded = false;
var SCloadedScripts = {}; // included-scripts tracker
function SCimportScriptURI(url) {
	if (SCloadedScripts[url]) {
	//	return null;
	}
	SCloadedScripts[url] = true;
	var s = document.createElement('script');
	s.setAttribute('src',url);
	s.setAttribute('type','text/javascript');
        s.setAttribute("charset","utf-8");
       // s.setAttribute("charset","utf-8");
	document.getElementsByTagName('head')[0].appendChild(s);
//	return s;
        return;
}


function SCloadGoogleLanguage() {
  
      var source = 'https://www.googleapis.com/language/translate/v2/languages?target=en&key=' +
       SCGoogleAPIKeyV2 +
       '&callback=SCGoogleLanguageLoaded';

       SCimportScriptURI(source);

}



// 90 percent of Google requests are for the language list
// better to hardcode it in this case
// list made 8/10/2011
// may have to remake list if Indian regional languages become supported.
var SCGoogleLanguageNames = [
'Afrikaans',
'Albanian',
'Arabic',
'Armenian',
'Azerbaijani',
'Basque',
'Belarusian',
'Bulgarian',
'Bengali',
'Bosnian',
'Catalan',
'Cebuano',
'Chinese (traditional)',
'Chinese (simplified)',
'Croatian',
'Czech',
'Danish',
'Dutch',
'English',
'Esperanto',
'Estonian',
'Filipino',
'Finnish',
'French',
'Galician',
'Georgian',
'German',
'Greek',
'Gujarati',
'Haitian creole',
'Hausa',
'Hebrew',
'Hindi',
'Hmong',
'Hungarian',
'Icelandic',
'Igbo',
'Indonesian',
'Irish',
'Italian',
'Japanese',
'Javanese',
'Kannada',
'Khmer',
'Korean',
'Lao',
'Latin',
'Latvian',
'Lithuanian',
'Macedonian',
'Malay',
'Maltese',
'Marathi',
'Maori',
'Mongolian',
'Nepali',
'Norwegian',
'Persian',
'Polish',
'Portuguese',
'Punjabi',
'Romanian',
'Russian',
'Serbian',
'Slovak',
'Slovenian',
'Somali',
'Spanish',
'Swahili',
'Swedish',
'Tamil',
'Telugu',
'Thai',
'Turkish',
'Ukrainian',
'Urdu',
'Vietnamese',
'Welsh',
'Yiddish',
'Yoruba',
'Zulu'
];
var SCGoogleLanguageCodes = [
'af',
'sq',
'ar',
'hy',
'az',
'eu',
'be',
'bg',
'bn',
'bs',
'ca',
'ceb',
'zh-TW',
'zh-CN',
'hr',
'cs',
'da',
'nl',
'en',
'eo',
'et',
'tl',
'fi',
'fr',
'gl',
'ka',
'de',
'el',
'gu',
'ht',
'ha',
'iw',
'hi',
'hmn',
'hu',
'is',
'ig',
'id',
'ga',
'it',
'ja',
'jv',
'kn',
'km',
'ko',
'lo',
'la',
'lv',
'lt',
'mk',
'ms',
'mt',
'mr',
'mi',
'mn',
'ne',
'no',
'fa',
'pl',
'pt',
'pa',
'ro',
'ru',
'sr',
'sk',
'sl',
'so',
'es',
'sw',
'sv',
'ta',
'te',
'th',
'tr',
'uk',
'ur',
'vi',
'cy',
'yi',
'yo',
'zu'
];
var SCnewoptions = 
'<option value="af">Afrikaans</option>'+
'<option value="sq">Albanian</option>'+
'<option value="ar">Arabic</option>'+
'<option value="hy">Armenian</option>'+
'<option value="az">Azerbaijani</option>'+
'<option value="eu">Basque</option>'+
'<option value="be">Belarusian</option>'+
'<option value="bs">Bosnian</option>'+
'<option value="bg">Bulgarian</option>'+
'<option value="bn">Bengali</option>' +
'<option value="ca">Catalan</option>'+
'<option value="ceb">Cebuano</option>'+
'<option value="zh-TW">Chinese (traditional)</option>'+
'<option value="zh-CN">Chinese (simplified)</option>'+
'<option value="hr">Croatian</option>'+
'<option value="cs">Czech</option>'+
'<option value="da">Danish</option>'+
'<option value="nl">Dutch</option>'+
'<option value="en">English</option>'+
'<option value="eo">Esperanto</option>'+
'<option value="et">Estonian</option>'+
'<option value="tl">Filipino</option>'+
'<option value="fi">Finnish</option>'+
'<option value="fr">French</option>'+
'<option value="gl">Galician</option>'+
'<option value="ka">Georgian</option>'+
'<option value="de">German</option>'+
'<option value="el">Greek</option>'+
'<option value="gu">Gujarati</option>' +
'<option value="ht">Haitian creole</option>'+
'<option value="ha">Hausa</option>'+
'<option value="iw">Hebrew</option>'+
'<option value="hi">Hindi</option>'+
'<option value="hmn">Hmong</option>'+
'<option value="hu">Hungarian</option>'+
'<option value="is">Icelandic</option>'+
'<option value="ig">Igbo</option>'+
'<option value="id">Indonesian</option>'+
'<option value="ga">Irish</option>'+
'<option value="it">Italian</option>'+
'<option value="ja">Japanese</option>'+
'<option value="jv">Javanese</option>'+
'<option value="kn">Kannada</option>' +
'<option value="km">Khmer</option>' +
'<option value="ko">Korean</option>' +
'<option value="lo">Lao</option>'+
'<option value="la">Latin</option>'+
'<option value="lv">Latvian</option>'+
'<option value="lt">Lithuanian</option>'+
'<option value="mk">Macedonian</option>'+
'<option value="ms">Malay</option>'+
'<option value="mt">Maltese</option>'+
'<option value="mi">Maori</option>'+
'<option value="mr">Marathi</option>'+
'<option value="mn">Mongolian</option>'+
'<option value="ne">Nepali</option>'+
'<option value="no">Norwegian</option>'+
'<option value="fa">Persian</option>'+
'<option value="pl">Polish</option>'+
'<option value="pt">Portuguese</option>'+
'<option value="pa">Punjabi</option>'+
'<option value="ro">Romanian</option>'+
'<option value="ru">Russian</option>'+
'<option value="sr">Serbian</option>'+
'<option value="sk">Slovak</option>'+
'<option value="sl">Slovenian</option>'+
'<option value="es">Spanish</option>'+
'<option value="so">Somali</option>'+
'<option value="sw">Swahili</option>'+
'<option value="sv">Swedish</option>'+
'<option value="ta">Tamil</option>' +
'<option value="te">Telugu</option>' +
'<option value="th">Thai</option>'+
'<option value="tr">Turkish</option>'+
'<option value="uk">Ukrainian</option>'+
'<option value="ur">Urdu</option>'+
'<option value="vi">Vietnamese</option>'+
'<option value="cy">Welsh</option>'+
'<option value="yi">Yiddish</option>' +
'<option value="yo">Yoruba</option>'+
'<option value="zu">Zulu</option>'
;

var SCTranslateableLanguages = [
'af',
'sq',
'ar',
'hy',
'az',
'eu',
'be',
'bg',
'bn',
'bs',
'ca',
'ceb',
'zh-TW',
'zh-CN',
'hr',
'cs',
'da',
'nl',
'en',
'eo',
'et',
'tl',
'fi',
'fr',
'gl',
'ka',
'de',
'el',
'gu',
'ht',
'iw',
'hi',
'hmn',
'hu',
'is',
'id',
'ga',
'it',
'ja',
'jv',
'kn',
'km',
'ko',
'lo',
'la',
'lv',
'lt',
'mk',
'ms',
'mt',
'mr',
'no',
'fa',
'pl',
'pt',
'ro',
'ru',
'sr',
'sk',
'sl',
'es',
'sw',
'sv',
'ta',
'te',
'th',
'tr',
'uk',
'ur',
'vi',
'cy',
'yi',
'ha',
'ig',
'mi',
'mn',
'ne',
'pa',
'so',
'yo',
'zu'
];

function SCMakeGoogleLanguages()
{
 var l;
 var lcode;
 var newoptions = "";
 var bLangNotSupported = true;
 var b2digitsLangNotSupported = true;
 var language2digits = "";
// alert("scmakegooglelanguages");


 var i;
 var j;
 for (i=0;i<SCGoogleLanguageCodes.length;i++)
 {
     l = SCGoogleLanguageNames[i];
     lcode = SCGoogleLanguageCodes[i];
     var bTranslateable=false;
     for(j=0;j<SCTranslateableLanguages.length;j++)
     {
       if(SCTranslateableLanguages[j].toLowerCase()
          == lcode.toLowerCase() )
         bTranslateable = true;
     }
     if(!bTranslateable)
       continue;

     if(!l.match(/UNKNOWN/i)) 
      newoptions += 
   '<option value="' + lcode + '">' + (l.substring(0,1).toUpperCase() + l.substring(1).toLowerCase()) + '</option>'+"\n";
 }
 
 SCnewoptions = newoptions; 


}

function SCMakeGoogleLanguages1()
{
 var l;
 var lcode;
 var newoptions = "";
 var bLangNotSupported = true;
 var b2digitsLangNotSupported = true;
 var language2digits = "";
 
 for (l in google.language.Languages)
 {
   lcode = google.language.Languages[l];
   if(google.language.isTranslatable(lcode))
   {
     if(!l.match(/UNKNOWN/i)) 
      newoptions += 
   '<option value="' + lcode + '">' + (l.substring(0,1).toUpperCase() + l.substring(1).toLowerCase()) + '</option>'+"\n";

   if(lcode.toUpperCase() == SCLanguageDefaultTo.toUpperCase())
      bLangNotSupported = false;
   var twodigitlang = "";
   if(lcode.match(/^(..)/))
      twodigitlang = RegExp.$1;
   if(twodigitlang.length == 2 && SCLanguageDefaultTo.match("^" + twodigitlang,"i"))
   {
      b2digitsLangNotSupported = false;
      language2digits = lcode;
   }

   }
 }
 
 SCnewoptions = newoptions; 
 if(bLangNotSupported)
 {
   var olddefaultlang = SCLanguageDefaultTo;
   var bSameAsContent = false;
   if(typeof wgContentLanguage != "undefined" && wgContentLanguage == language2digits)
      bSameAsContent = true;
   if(!b2digitsLangNotSupported && !bSameAsContent)
   {
      SCLanguageDefaultTo = language2digits;
   }
   else
    SCLanguageDefaultTo = SCLanguageTo;
   if(olddefaultlang == SCtranslateTo)
     SCtranslateTo = SCLanguageDefaultTo;
   
 }

}

// contents of dictionarylookup1.js follow
// this javascript isolates the text word under the 
//cursor when it rests on a word for 1.5 seconds
// works in Firefox 1,2.0,3 and IE 6.0,7,8, chrome
// works in Windows Safari, and Opera
// does not work in Konqueror(that I know of, code is disabled for Konqueror)
// with the Google language javascript api this does dictionary lookup
// in several languages.
// the word isolated  is translated
// and the translation is placed back in the new window
// on IE, Firefox, chrome, and Epiphany a cursor place over
// selected text (up to 500 characters) will use
// that text

// author: endo999
// author: Paul Cheffers
// email: paul@securecottage.com
// 2008
// 
// this webpage is placed in the public domain by the author


// the default languages(the from language is redundant as Google guesses 
// the language) but SCLanguageDefaultTo is important is you are porting
// to another Wikipedia Language



// set this in main gadget file
// restrictive environments don't like wikipedia.org to set cookies with
//document.domain = "wikipedia.org"



var SCSourcestrlength = SCstrSource.length + SCstrGoogle + 2;
var SCMinLength = 22;

var SCgooglereference1 = 
//'<span onMouseover="javascript:SCdonthide=true;">' +
'<small class="SCyWindow">'+ SCstrSource +': <a href="#" ' +
'onMouseover="javascript:SCdonthide=true;" ' +
'onclick="javascript:window.open(\'';
var SCgooglereference1a =
'\')">' + SCstrGoogle + '</a></small> ';

var SCgooglereference2 = 
'<a class="SCxWindow" href="javascript:SCdonthide=false;SChidespan(\'';

var SCgooglereference3 = '\')">X</a>';

var SCgooglereference4 =
'';





var SClanguageprompt1 = 
'<small class="SCxTranslation"><a ' + 'href="javascript:SCmakevisiblelanguagechange()" ' +
'onMouseover="javascript:SCdonthide=true;" ' +
'>';

var SClanguageprompt2 =
'</a></small>&nbsp;';

var SCnextsentencestr =
'\&nbsp;\&nbsp;<small><a class="SCyWikipedia"  href="javascript:SCnextsentence(\'translate\')">' + SCstrNextSentence +'</a></small>';



var SClabel="";
var SCtext="";


var SCtranslate="FrenchToEnglish";
var SCtranslateFrom = SCLanguageDefaultFrom;
var SCtranslateTo = SCLanguageDefaultTo;
var SCTooManyTextElements=450;

var SCdonthide = false; // for change of language
var SCdontposition=false; // automatic next sentence
var SCwindows = 0; // number of yellow windows
var SCMaxwindows = 1; // max number of yellow windows

var SCscreenWidth = 0, SCscreenHeight = 0;
var SCwrheight=250, SCwrwidth=300;
var SCscrOfX = 0, SCscrOfY = 0;
var SCWikihtml="", SCDicthtml="";
var SCbInsertSpan=false;
var SCalttranslate="";
var SCWikipedialanguage="en.wikipedia.org";
var SCshowwrad = false;
var SCbIsIE = false;
var SCbIsIE8 = false;
var SCbIsKonqueror = false;
var SCbIsOpera = false;
var SCbIsMozilla = false;
var SCdebug = false;
var SCclientX=0;
var SCclientY=0;
var SCposx = 0;  // position of cursor
var SCposy = 0;
var SCPosYAdjust = 42; // if over link with title drop popup window a little
var SCpposx = -1; // previous position of cursor
var SCpposy = -1;
var SCsrcElement=null;
var SCbIsKonquerorEvent=false;
var SCbMouseClicked=false;
var SChInterval = null;
//var SCMaxWordLength = 50;
var SCselectedText = "";
var SCrangeCurx = 0;
var SCrangeCury = 0;
var SCrangeCurx1 = 0;
var SCrangeCury1 = 0;
var SCselectionarray = new Array();
var SCselectionstart = new Array();
var SCselectionend = new Array();
var SCselectionarrayposition = new Array();
var SCselection = new Array();
var SCMaxWordLength=495;
var SCIeRange;
var SCSelectionType;
var SCbIsWordInSelection=false;
var SCGoogleTrans=true;
var SCbIsChrome=false;
var SCShiftKey=false;
var SCbIsIE9=false;
var SCbIsIE6=false;
var SCbIsOpera11=false;
var SCbIsFirefox35Like=false;
var SCbIsFirefox35 = false;

if(SCPersistantLoad(SCGoogleTransPersistString) == "1")
   SCGoogleTrans = true;
else SCGoogleTrans = false;



if(navigator.appVersion.match(/MSIE/i))
{
  SCbIsIE = true;
  if(navigator.userAgent.indexOf('MSIE 8') != -1 ||
     navigator.userAgent.indexOf('MSIE 9') != -1
    )
     SCbIsIE8 = true;
  if(navigator.userAgent.indexOf('MSIE 6') != -1)
     SCbIsIE6 = true;
  if(navigator.userAgent.match(/MSIE ([0-9]+)/))
  {
    
     var version1 = new Number(RegExp.$1);
     
     if(version1 >= 8)
       SCbIsIE8 = true;
     if(version1 >= 9)
       SCbIsIE9 = true;
     
  }
  
}

var SCbIsSafari = false;
var SCbIsPre4Safari = false;
if(navigator.appVersion.match(/Safari/i))
{
  SCbIsSafari = true;
if(navigator.userAgent.indexOf('Version/3.')!= -1 ||
   navigator.userAgent.indexOf('Version/2.')!= -1
  )
{
     SCbIsPre4Safari = true;
     SCbNoShiftKeyBrowser = true; 
}

}

if(navigator.userAgent.indexOf('Epiphany/1.')!= -1 ||
   navigator.userAgent.indexOf('Firefox/1.') != -1
  )
  SCbNoShiftKeyBrowser = true;

if(navigator.appVersion.match(/Chrome/i))
{
  SCbIsSafari = false;
  SCbIsChrome = true;
}

if(navigator.appVersion.match(/Konqueror/i))
{
  SCbIsKonqueror = true;
}
if(navigator.appName.match(/Opera/i))
{
  SCbIsOpera = true;

if(navigator.userAgent.match(/Version\/([0-9]+)\.([0-9]+)/))
{
     var version1 = new Number(RegExp.$1);
     var version2 = new Number(RegExp.$2);
   //  if(version1 >= 11)
   //      SCbIsOpera11 = true;
       SCbIsOpera11 = false;
}

}
if(navigator.appName.match(/Netscape/i))
{
  SCbIsMozilla = true;
}
if(navigator.userAgent.match(/Firefox\/([0-9]+)\.([0-9]+)/))
{
     var version1 = new Number(RegExp.$1);
     var version2 = new Number(RegExp.$2);
     if(version1 >= 3 && version2 >= 5)
         SCbIsFirefox35 = true;
     if(version1 >= 4)
         SCbIsFirefox35 = true;
}

if(SCbIsFirefox35 || SCbIsSafari || SCbIsChrome||SCbIsOpera11)
  SCbIsFirefox35Like = true;



var SCnn=(document.layers)?true:false;
var SCie=(document.all)?true:false;

function SCkeyUp(e) 
{ 
var evt=(e)?e:(window.event)?window.event:null; 
if(evt)
{ 
 //var key=(evt.charCode)?evt.charCode: ((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
}
if(!evt)
  return;

try {
//alert("keyup:shiftkey:"+evt.shiftKey);
 if (evt.shiftKey==1 && !navigator.appVersion.match(/X11/i))
    SCShiftKey = true;
 else SCShiftKey = false;
} 
catch(e)
{
  
  SCShiftKey = false;
  SCShiftKeyNeeded = false;
}
}
var SCsetshiftkeyfunc = null; 
function SCsetshiftkey()
{
   SCShiftKey = true;
   SCsetshiftkeyfunc = null;
}

var SCarrowstart = 37;
var SCarrowstop = 40;

function SCkeyDown(e) 
{ 

var evt=(e)?e:(window.event)?window.event:null; 
var key=0;
if(evt)
{ 
  key=(evt.charCode)?evt.charCode: ((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
}
if(!evt)
  return;
try {
 if (((evt.shiftKey==1||evt.shiftKey==true)&&key==16) ||
    (navigator.appVersion.match(/X11/i) && key == 16)
    )
    {
      SCShiftKey = true; 
    }
 else 
    {
      if(key >= SCarrowstart && key <= SCarrowstop && SCShiftKey)
      {   
          if(!SCbIsIE || SCbIsIE9)
            SChidespan(SCcurrentLink);

          SCbMouseClicked = false;
      }
         
      SCShiftKey = false;
    }

 //alert("keydown:shiftkey:"+evt.shiftKey);
/*
 if (((evt.shiftKey==1||evt.shiftKey==true)&&key==16) ||
    (navigator.appVersion.match(/X11/i) && key == 16)
    )
    {
    //SCShiftKey = true;
      SCsetshiftkeyfunc = setTimeout("SCsetshiftkey()",250);
    }
 else 
    {
      clearTimeout(SCsetshiftkeyfunc);
      SCsetshiftkeyfunc = null;
      SCShiftKey = false;
    }
*/
}
catch(e)
{
  //alert("shiftkey keydown problem");
  SCShiftKey = false;
  SCShiftKeyNeeded = false;
} 



if(key == 27 && SCdebug == false) // escape key
{
 // SCdebug = true; 
 // SCdeleteEvents();
}
else if(key == 27 && SCdebug == true)
{
//  SCdebug = false;
//  SCcreateEvents();
}
} 
 
function SCdeleteEvents()
{
document.onkeydown=null;

document.onmousedown = null;

document.body.onmousemove = null;

document.body.onmouseout = null;

}
function SCeventhook(hook,func)
{
if(document.addEventListener/* && !SCbIsIE */)
	document.addEventListener(hook, func, false);
else
	document.attachEvent("on" + hook, func);

}
function SCcreateEvents()
{
SCeventhook("keyup",SCkeyUp);
SCeventhook("keydown",SCkeyDown);
SCeventhook("mousedown",SCcaptureMousedown);
SCeventhook("mousemove",SCcaptureMousemove);
SCeventhook("mouseout",SCcaptureMouseout);
}

var shiftkeyneeded = SCPersistantLoad('shiftkeyneeded');
if(shiftkeyneeded == "0")
   SCShiftKeyNeeded = false;
else SCShiftKeyNeeded = true;

if(SCbNoShiftKeyBrowser)
     SCShiftKeyNeeded = false;


var SCpersistlangFrom = SCPersistantLoad('languageFrom');
if(SCpersistlangFrom != "")
   SCtranslateFrom = SCpersistlangFrom;
var SCpersistlangTo = SCPersistantLoad('languageTo');
if(SCpersistlangTo != "")
   SCtranslateTo = SCpersistlangTo;
   
var SCwikilang = SCPersistantLoad('Wikipedialanguage');
if(SCwikilang != "")
   SCWikipedialanguage = SCwikilang;
else SCPersistantSave('Wikipedialanguage',SCWikipedialanguage);

SCsetInterval();

function SCsetInterval()
{
if(SChInterval)
   clearInterval(SChInterval);
SChInterval = null;
if(SCShiftKeyNeeded)
   SChInterval = setInterval("SCinterval()",250);
else SChInterval = setInterval("SCinterval()",1000);
}


var SCbIsOutsideClientArea = false;

function SCcaptureMouseout(evt)
{
    SCbIsOutsideClientArea = true;
    SCbMouseClicked = false;
}

var SClastposx=0;
var SClastposy=0;
var SCbInSCInterval = false;
var SCintervalsession=0;

function SCinterval()
{

 if(SCbIsKonqueror)
   return; // current dont work on Konqueror

 SCintervalsession++;

 try {
 if(SCbInSCInterval)
    return;
 SCbInSCInterval = true;
    

 if(SCbIsMozilla)
 {
   if(SCsrcElement && 
      SCsrcElement.toString().match(/HTMLHtmlElement/i))
     SCbIsOutsideClientArea = true;

 }

 if(SCbIsKonqueror||SCbIsOpera)
 {
   if(SCsrcElement && 
      SCsrcElement.toString().match(/HTMLBodyElement/i))
     SCbIsOutsideClientArea = true;
   else SCbIsOutsideClientArea = false;
 }
 else
 if(SCbIsIE)
 {
    SCgetScrollXY();
    SCScreenSize();
    if(SCposx > SCscreenWidth+SCscrOfX-4 ||
       SCposy > SCscreenHeight+SCscrOfY-4)
       SCbIsOutsideClientArea = true;

 }
 var mes = document.getElementById("SCmessage");
  if(mes && SCsrcElement)
    mes.innerHTML = SCbIsOutsideClientArea + ":" +
     SCbMouseClicked + ":" +
     SCposx+","+SCposy+"::"+SCsrcElement.toString();


var posx = SCpposx - SCposx;
if(posx < 0) posx = - posx;
var posy = SCpposy - SCposy;
if(posy < 0) posy = - posy;



if(!SCbMouseClicked && posx < 4 &&
   posy < 4 
 && (SCcurrentLink == "" || SCcurrentLink == null ||!document.getElementById(SCcurrentLink)))
{
    if(SCsrcElement &&
       !(SClastposx == SCposx
        && SClastposy == SCposy)
        && !SCbIsOutsideClientArea
      )
    {
     SCFindElementUnderMouseOver(SCsrcElement);
     if(!SCShiftKeyNeeded)
     {
       SClastposx = SCposx;
       SClastposy = SCposy;
     }
     
    }
}
else if((SCcurrentLink != "" && SCcurrentLink != null && document.getElementById(SCcurrentLink))
      &&
       (posx > 4 || posy > 4)
      && !SCbIsOutsideClientArea
      && ((SCShiftKeyNeeded && SCintervalsession%4==0)||!SCShiftKeyNeeded)
       )

     SChidespan(SCcurrentLink);



  if(!SCdonthide && !SCbMouseClicked
      && ((SCShiftKeyNeeded && SCintervalsession%4==0)||!SCShiftKeyNeeded)
    )
  {
    SCpposx = SCposx;
    SCpposy = SCposy;
  }
  SCbInSCInterval = false;
  } catch(e) {SCbInSCInterval = false; }
}


function SCcaptureMousemove(evt)
{
   SCbIsOutsideClientArea = false;

   SCFindPositionOfMouseClick(evt);
   var posx = SCposx - SCpposx;
   var posy = SCposy - SCpposy;
   if(posx < 0) posx = - posx;
   if(posy < 0) posy = - posy;
  
   if(!(posx < 4 && posy < 4))
     SCbMouseClicked = false;
}

// capture right mouse click

function SCcaptureMousedown(evt)
{
var mouseClick;


if(evt) mouseClick = evt.which;
else mouseClick = window.event.button;

if(/*mouseClick == 1 &&*/ SCbIsOutsideClientArea==false)
{
  
    SCbMouseClicked = true;
    
    if(SCShiftKey && (!SCbIsIE||SCbIsIE9))
            SChidespan(SCcurrentLink);
    SCShiftKey = false;

}

}
//http://www.quirksmode.org/js/events_properties.html
function SCFindPositionOfMouseClick(e) {
	SCposx = 0;
	SCposy = 0;
 
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) {
 
 
		SCposx = e.pageX;
		SCposy = e.pageY;
	}
	if (e.clientX || e.clientY) 	{
             if(1==1)
             {
 
 
                SCclientX=e.clientX;
                SCclientY=e.clientY;
 
		SCposx = e.clientX +  document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		SCposy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
              }
              else
              {
                SCposx = window.event.x+document.body.scrollLeft;
                SCposy = window.event.y+document.body.scrollTop;
              }      
	}
	// SCposx and SCposy contain the mouse position relative to the document
 
 
	if (e.target) 
        {
         SCsrcElement = e.target;
        }
	else if (e.srcElement) 
        {
         SCsrcElement = e.srcElement;
        }
 
}


// find the element under the mouse click
// see http://www.quirksmode.org/js/events_properties.html
function SCFindElementUnderMouseOver(targ) {

        if(!targ)
          return;
        if(!SCGoogleTrans)
          return;
        if(SCShiftKeyNeeded && SCShiftKey == false)
          return;
        if(SCwindows >= SCMaxwindows)
          return;

        

	if (targ.nodeType == 3) // defeat Safari bug
        {
		targ = targ.parentNode;
        }
 
        if(targ.nodeName == "TEXTAREA" ||
           targ.nodeName == "INPUT")
             return; // if input area just return
        
         // only scan through text elements
         var SelectionNode=null;
         var SelectionOffset=null;
         var SelectionAnchorNode = null;
         var SelectionAnchorOffset=null;

        if(SCbIsIE8 && targ.childNodes.length > SCTooManyTextElements*2)
        {
            return;
        }

         var children = targ.childNodes;
         var ntextchildren = 0;
         
         if(SCbIsIE && children.length > SCTooManyTextElements*2)
            return;

         for(i=0;i<children.length;i++)
         {
   		if(children.item(i).nodeType == 3)
                     ntextchildren++;
                if(ntextchildren > SCTooManyTextElements)
                {
                    window.status = SCstrTextTooLarge;
                    return;
                }
         }
         // if there are too many text elements to parse just return
         
         if(ntextchildren > SCTooManyTextElements)
         {
             window.status = SCstrTextTooLarge;
             return;
         }
         
         
         if(!(SCbIsIE||SCbIsOpera||SCbIsPre4Safari) && window.getSelection)
         {
         
	 var userSelection = window.getSelection();
         SCselectedText = userSelection.toString();
         SelectionNode = userSelection.focusNode;
         SelectionOffset = userSelection.focusOffset;
         SelectionAnchorNode = userSelection.anchorNode;
         SelectionAnchorOffset = userSelection.anchorOffset;

         for(i=0;i<children.length;i++)
         {
           /*
           if(userSelection.containsNode(children[i],false))
            SCselection[i] = true;
           else
           */
           
           if(userSelection.containsNode(children[i],true))
           {
              SCselectionarray[i] = new Array();
              SCselectionstart[i] = -1;
              SCselectionend[i] = -1;
              SCAreWordsInSelection(userSelection,SCselectionarray[i],
              children[i],i)
              SCselection[i] = false;
           }
           else 
           {
              SCselectionarray[i] = new Array();
              SCselection[i] = false;
              SCselectionstart[i] = -1;
              SCselectionend[i] = -1;
           }
         }
         }
         else if(SCbIsIE)
         {
            SCIeRange = document.selection.createRange();
            SCIeRange1 = SCIeRange.duplicate();
            SCSelectionType = document.selection.type;
         }
         
         /*
         var userSelection="";
         if(!SCbIsIE && window.getSelection)
         {
	   userSelection = window.getSelection();
         }
         */
         for(i=0;i<children.length;i++)
         {

             if(children.item(i).nodeType == 3)
             {
                 var bBreak = false;
               
                 if(SCfindwordin(targ,children.item(i),i)==true) bBreak = true;


                 if(bBreak) break;

               
             }
       
            
         }
           if(SelectionNode && window.getSelection && window.getSelection.toString()!="")
           {
              try {
              var userSelection = window.getSelection();
              if(userSelection)
              {

                userSelection.collapse(SelectionAnchorNode,SelectionAnchorOffset);
                userSelection.extend(SelectionNode,SelectionOffset);
              }
              } catch(e) { }
             
           }
        //   else if(SCbIsIE)
             // SCIeRange1.select();
         
        

}

// parent is tag, child must be text node
// 1) separate child text element into
//    a) SCleft span of all words left of current 
//    b) SCcurrent: span of current word
//    c) SCright: span of all words right of current word
// 2) do binarylookup-like search of SCcurrent
//    span to see if it is over the cursor position
// 


function SCfindwordin(parent,child,childindex)
{

         

         var debug = false;

         SCbIsWordInSelection = false;
         var words;
         
         if(SCLanguageDefaultFrom.match(/ja|zh/i))
         {
            var words1 = new Array;
            var words2 = new Array;
            var words3 = new Array;
            words = child.nodeValue.split(/[\s\r\n]+/);
           // alert(child.nodeValue);
            var i,j;
            for(i=0,j=0;i<words.length;i++)
            {
              if(words[i].match(/[、。，]/))
              {
var ii;
var aword="";
for(ii=0;ii<words[i].length;ii++)
{
  var c = words[i].charAt(ii);
  
  if(!c.toString().match(/[、。，]/))
  {
    aword += c;
    
  }
  else 
  {
   
    if(aword!="")
    {
       
       words3[j] = aword;
       j++;
       aword = "";
       
    }
    words3[j] = c;
    
    j++;

  }
}
if(aword!="")
{
  words3[j] = aword;
  aword = "";
 
  j++;
}
  
}


              if(!words[i].match(/[、。，]/))
              {
                 words3[j] = words[i];
                 j++;
                 continue;
              }
}
            words = words3;

         }
         else        
            words = child.nodeValue.split(/[\s\r\n]+/);

         var delimiter = " ";
         var firstcharacter = "";
         var lastcharacter = "";
        
         // put a limit on the size of the text element: 4000 words
         
         if(words.length > 4000)
         {
             window.status = SCstrTextTooLarge;
             return false;
         }


  // if a selection text item then we dont have to do 
  // the search, we can proceed from here
  // if Wikipedia then dont do
  // only check here if IE
  
 // if(typeof SCtranslateFrom != "undefined" &&
  //   SCtranslateFrom != "Wikipedia")
 {
  
 
  if(SCbIsIE)
  {
     
     SCselectedText = SCNotTooBigAndInSelection(parent,child,words);    
     if(SCselectedText != "")
     {
       SCbIsWordInSelection = true;
       SCSetInLink(SCselectedText,parent,child,mid,delimiter,words,false);
       return true;
     }
     
  }
  }


    

         if(child.nodeValue.substring(0,1).match(/[\s\r\n]/))
            firstcharacter = delimiter;
         if(child.nodeValue.match(/[\s\r\n]$/))
            lastcharacter = delimiter;

        
         // no sense in searching
         if(words.length <= 0)
            return false;


         var html1="",html2="",currentword="";
         var i,j;

         var high = words.length;
         var mid = Math.floor(high/2);
         var low = 0;
         var oldmid = -1;
         
         var iRepetition = 0;

         
         while(1)
         {

            if(oldmid == mid)
               break; // have failed, don't repeat
            if(++iRepetition > 20)
               break; // no element is that large
            if(typeof words[mid] == "undefined")
               break; // have failed, don't repeat

            html1 = firstcharacter; // usually nil

            // create SCleft text string
            if(SCLanguageDefaultFrom.match(/ja|zh/i))
            {
            
            for(j=0;j<mid;j++)
            {
               var ii,jj;
               ii = j;
               jj = j+1;
               if(jj>mid)
                   jj = ii;
               
               html1 += words[j] + ((words[jj].match(/[、。，]/)||words[ii].match(/[、。，]/))?"":delimiter);
               
            }
            
            }
            else
            if(mid > 0)
            {
               html1 += words.slice(0,mid).join(delimiter);
               html1 += delimiter;
            }

            // create SCright text string
            if(SCLanguageDefaultFrom.match(/ja|zh/i))
            {
            html2 = "";
            
            for(j=mid+1;j<words.length;j++)
            {
               var ii,jj;
               ii=j;
               jj=j+1;
               if(jj>=words.length)
                  jj=ii;
               html2 += words[j] + 
               ((j!=words.length-1)?
                ((words[jj].match(/[、。，]/)||words[ii].match(/[、。，]/))?"":delimiter)
                  :"");
            }
           
            
            }
            else
            if(mid+1 < words.length)
            {
              html2 = words.slice(mid+1,words.length).join(delimiter);
             
            }
            if(html2 != "")
                 html2 += lastcharacter;
            // SCcurrent text string
            currentword = words[mid];
           
            if(!SCLanguageDefaultFrom.match(/ja|zh/i))
            {
              if(html2 != "")
                 currentword += delimiter;
            }

            if(html2 == "" && lastcharacter != "")
               currentword += lastcharacter;
      
            // sometimes words[mid] is nil
            // if the case just back up one and continue
           if(1==0&&currentword == delimiter) // ie, space after period
            {
               if(debug)    alert("resetting currentword");
               if(mid<high)
               {
                 mid++;
                 if(oldmid == mid)
                    oldmid-=2;
               }
               else break;
               continue;
            }
          

            var left = document.createElement('SPAN');
            left.setAttribute("id","SCleft");
            
         
            var right = document.createElement('SPAN');
            right.setAttribute("id","SCright");
            
         
            var current = document.createElement('SPAN');
            current.setAttribute("id","SCcurrent");
           
            
            var str1 = document.createTextNode(html1);
            var str2 = document.createTextNode(html2);
            var str3 = document.createTextNode(currentword);
            left.appendChild(str1);
            right.appendChild(str2);
            current.appendChild(str3);



            // replace child text region with
            // left,current, and right span elements
            // TO GET CURSOR POSITIONING
            
           
            
            parent.replaceChild(right,child);
            parent.insertBefore(current,right);
            parent.insertBefore(left,current);
            

            

            var SCcurrent = document.getElementById("SCcurrent");
            var SCleft = document.getElementById("SCleft");
            var SCright = document.getElementById("SCright");

            if(debug)
           {
      // debugging code
            SCcurrent.style.backgroundColor = "yellow";
            SCleft.style.backgroundColor="red";
            SCright.style.backgroundColor="orange";
           }
            var Curx = SCfindPosX(SCcurrent);
            var Cury = SCfindPosY(SCcurrent);
            var Curx1 = Curx + SCcurrent.offsetWidth;
            var Cury1 = Cury + SCcurrent.offsetHeight;

            var Leftx = SCfindPosX(SCleft);
            var Lefty = SCfindPosY(SCleft);
            var Leftx1 = Leftx + SCleft.offsetWidth;
            var Lefty1 = Lefty + SCleft.offsetHeight;

            var Rightx = SCfindPosX(SCright);
            var Righty = SCfindPosY(SCright);
            var Rightx1 = Rightx + SCright.offsetWidth;
            var Righty1 = Righty + SCright.offsetHeight;

// special processing for IE
           
            var bInsertForIE = false;
            var bUpForIE = false;
            var bDownForIE = false;
            var bBreakForIE = false;
   
            if(SCbIsIE)
            {
               
               
               var sElem = "";
               sElem = SCcurrent.componentFromPoint(
                       SCclientX,SCclientY);
               
               if(sElem == "")
               {
                 bInsertForIE = true;
               }
               else
               {
                 var sElem1 = "";
                 var sElem2 = "";
                 sElem1 = SCleft.componentFromPoint(
                       SCclientX,SCclientY);
                 sElem2 = SCright.componentFromPoint(
                       SCclientX,SCclientY);
                 
                 
                 if(sElem1 == "outside" &&
                    sElem2 == "outside")
                   bBreakForIE=true;
                 if(sElem1 == "")
                   bUpForIE = true;
                 if(sElem2 == "")
                   bDownForIE = true;
               }
 
            }
            else if(SCcurrent.getClientRects)
            {
               if(SCIsInElement(SCcurrent))
               {
                 bInsertForIE = true;
               }
               else if(SCIsInElement(SCleft))
               {
                 bUpForIE = true;
               }
               else if(SCIsInElement(SCright))
               {
                 bDownForIE = true;
               }
               else bBreakForIE = true;

            }

  if(debug)
{

  alert(Curx+","+Curx1+":"+Cury+","+Cury1+"::"+SCposx+","+SCposy +
      ":::" + high+","+mid+","+low);

  alert(Lefty+","+Lefty1+":"+Righty+","+Righty1+"::"+SCposx+","+SCposy +
      ":::" + high+","+mid+","+low);
  
}
            var currentHeight = SCcurrent.offsetHeight;
            var currentWidth = SCcurrent.offsetWidth;

            

            parent.removeChild(right);
            parent.removeChild(current);
            parent.replaceChild(child,left);
           // parent.replaceChild(child,span1);
           



     // if cursor below whole element then fail
            if(1==0 && SCposy > Righty1 && Righty < Righty1 &&
               Lefty1 != Righty1
              )
             {
               if(debug)alert("left break");
               break;
             }
    //  if cursor before whole element then fail
            if(1==0 &&SCposy < Lefty && Lefty < Lefty1)
            {
              if(debug)alert("right break");
               break;
            }
           
            if(bBreakForIE)
               break;
            
            oldmid = mid;

            var SCbCursorOverSelection=false;
            if(!SCbIsIE&&!SCbIsOpera&&!SCbIsPre4Safari)
            {
              
               if(SCselection[childindex] == true)
               {
                 SCbCursorOverSelection=true;
               
               }
               else if(SCselectionarray[childindex].length>=mid &&
                  SCselectionarray[childindex][mid] == true)
               {
                 SCbCursorOverSelection=true;
                 
               }
           //    alert(mid+":"+SCselectionarray[childindex].toString());
               
              
            }


            if((SCposx >= Curx && SCposx <= Curx1 
              && SCposy >= Cury && SCposy <= Cury1) ||
                 bInsertForIE)
            {
              
               var linkText = words[mid];

               if(!SCbIsIE && SCbCursorOverSelection)
               {
                   linkText = SCselectedText;
                   SCbIsWordInSelection = true;
               }
	       
               SCSetInLink(linkText,parent,child,mid,delimiter,words,true);
               
               return true;
            }
            if(bUpForIE)
            {
               high = mid;
               mid = Math.floor((low + high)/2);
            }
            else if(bDownForIE)
            {
               low = mid;
               mid = Math.floor((low + high)/2);
            }
            else
            if(Cury > SCposy) // go up in element
            {
               high = mid;
               mid = Math.floor((low + high)/2);
            }
            else if(Cury1 < SCposy) // go down in element
            {
               low = mid;
               mid = Math.floor((low + high)/2);
            }
            else if(SCposx < Curx) // go up in element
            {
               high = mid;
               mid = Math.floor((low + high)/2);
            }
            else if(SCposx > Curx1)  // go down in element
            {
               low = mid;
               mid = Math.floor((low + high)/2);
            }
      
         }
     return false;
          
}
var SCindex = 0;  // for ids of translation windows
// put the translation window near the cursor point
var SCcurrentLink = "";
var SClinkword = "";
function SCSetInLink(word,parent,child,wordindex,delimiter,words,bIsSearchDone)
{
  
  if(SCwindows >= SCMaxwindows)
     return;
  SCwindows++;
  
  var linkname = "SC" + (++SCindex);
  SCcurrentLink = linkname;

  // take out punctuation if single word 
  if(word.split(/\s/).length==1)
     word = word.replace(/[.;:?!,]/g,"");

  SClinkword = word;

  if(word.length > SCMaxWordLength)
  {
    word = word.substring(0,SCMaxWordLength);
    word += "...";
  }
  
  
  var str1 = document.createTextNode(word);

  var a1 = document.createElement("DIV");

  a1.setAttribute("id",linkname); 
  if(!SCbIsIE||SCbIsIE9)
  	a1.setAttribute("class","SCPopup");
  else  a1.className = "SCPopupIE";
  if(!SCbIsIE) 
  {
    a1.setAttribute("onMousedown",'SChidespan("' + linkname + '")');
  }
  a1.setAttribute("onMouseover","SCdonthide=true;");
  a1.setAttribute("onMouseout","SCdonthide=false;");

  
  SCbInsertSpan = false;
  
  if(SCtranslateFrom != "Wikipedia")
  {
     
     a1.appendChild(str1);
     SCWikihtml = SCWikipediaLink(wordindex,delimiter,words).innerHTML;
     SCDicthtml = "";
     
     
  }
  else
  { 
    
    a1.appendChild(SCWikipediaLink(wordindex,delimiter,words));
    
    SCWikihtml="";
    SCDicthtml=word;
   if(!SCbIsIE) 
   {
            a1.setAttribute("onMousedown","");
            a1.firstChild.setAttribute("onMousedown","");
   }
  
  }

  
  var thebody = document.getElementsByTagName("BODY");
  //var thehtml = document.getElementsByTagName("HTML");
   
    
      var item = document.getElementById("SCitem");
      if(item)
        item.appendChild(a1);
      //else thebody[0].appendChild(a1);
      
    

    if(SCtranslateFrom == "Wikipedia")
    {
       SCsetLanguageDefault("wikipedialanguageoptions",
                       "Wikipedialanguage")
    
    }
 
  // cursorposition is absolute, positioning of 
  // webpage elements may upset translation window 
  // positioning, so append this window to body.
 
  // position window
  SCPositionPopup(linkname,true);
  var debug1 = false;
  if(debug1)
  {
    alert(SCposx+":"+SCposy);
    alert(a1.currentStyle.left);
    alert(item.currentStyle.left);
    alert(document.body.currentStyle.left);
  }
  if(SCtranslateFrom != "Wikipedia")
  {
    var theword = word;
   
       
    
    SCasyncGet(linkname, theword);
  }
   
}

// is the current element in a link and does this link have a title?
function SCIsSrcElementInALink()
{
   if(!SCsrcElement)
      return false;
   

   if(SCsrcElement.nodeName.match(/^a$/i)
      && ((SCsrcElement.getAttribute("title") != null &&
          SCsrcElement.getAttribute("title") != "")
          ||
          typeof popupVersion != "undefined")
         )
      return true;

   var Elem = SCsrcElement;

   while(Elem.parentNode)
   {
      if(Elem.nodeName.match(/^a$/i)
      && ((Elem.getAttribute("title") != null &&
          Elem.getAttribute("title") != "")
          ||
          typeof popupVersion != "undefined")
         )
      return true;

      Elem = Elem.parentNode;
   }
   return false;
   
}

function SCPositionPopup(linkname,bAdjust)
{
  var a2 = document.getElementById(linkname);
  var thebody = document.getElementsByTagName("BODY");

  var posyadjust = 0;
  var posxadjust = 0;
  var xadjust = 5;
  var yadjust = 5;

  var bAdjustPosition = SCIsSrcElementInALink();

  if(bAdjustPosition && typeof popupVersion != "undefined" && bAdjust)
      posyadjust = -SCPosYAdjust;
  else if(bAdjustPosition)
      posyadjust = SCPosYAdjust;
 
  if(a2 && a2.style)
  {
    
    if(SCbIsIE)
    {
      // for ie
      // body overflow needs to be set
      var px = "";
      if(SCbIsIE9)
        px = "px";

      a2.style.position = "absolute";
      a2.style.left = (SCposx+xadjust) + px;
      a2.style.top = (SCposy + posyadjust+yadjust) + px;

      a2.onMouseover=new Function("SCdonthide=true;");
      a2.onMouseout=new Function("SCdonthide=false;");

	// if in ie the initial span goes over the right
        // side of screen
	var doclength = SCfinddoclength(a2);
	var a2overflow = (SCposx+a2.scrollWidth+1) - doclength;
        //alert(SCposx+":"+SCposy+":"+posyadjust+":"+doclength+":"+a2overflow+":"+px);
        
	if(a2overflow > 0)
	{
	  var newposx =  SCposx - a2overflow;
//	  a2.style.position="absolute";
	  a2.style.left = (newposx+xadjust) + px;
	  a2.style.top=(SCposy + posyadjust+yadjust) + px;
       
	}
    }
    else
    {
        // a2 element returns 0 for following function
        var doclength = SCfinddoclength(thebody[0]);
        
	var a2overflow = (SCposx+a2.scrollWidth+1) - doclength;
	if(a2overflow > 0)
	{
	  var newposx =  SCposx - a2overflow;
//	  a2.style.position="absolute";
	  a2.style.left = (newposx + xadjust)+ "px";
	  a2.style.top=(SCposy + posyadjust+yadjust) + "px";
//    
	}
      else
      {
          a2.style.left = (SCposx+xadjust) + "px";
          a2.style.top = (SCposy + posyadjust+yadjust) + "px";
      }
     

    }
//    a2.style.display="block";
      
  }

}

// after translation window has been left clicked
// remove it
function SChidespan(id)
{
  
 
  if(SCdonthide)
    return; // so change of language can be done
  
  try
  {
  
  SCwindows--;
  if(SCwindows < 0) SCwindows = 0;
  
  var ob = document.getElementById(id);
  //alert(ob.innerHTML)
  if(SCbIsOpera && !ob && 1==0)
     alert("ob not found");
  if(SCbIsOpera && 1==0)
  {
     ob = document.getElementById("SCitem");
	// delete all children
	while(ob.childNodes.length>0)
	{
	ob.removeChild(ob.childNodes[0]);
	}
  }
  else
  {
    var styl = ob.style;
    styl.display = "none";
  
  if(ob && ob.parentNode)
     ob.parentNode.removeChild(ob);
  else if(1==0)
     if(SCbIsOpera) alert("maybe no parentnode");
  }
  }
  catch(err)
  {
    if(SCbIsOpera && 1==0)
      alert("unable to hide " + id);
  }
  
  // clear the html
  SCWikihtml = "";
  SCDicthtml = "";
  

}
function SCfinddoclength(obj)
{
        var ScrollBarOffset = 0;
        if(SCbIsIE)
        {
            ScrollBarOffset = 20;
        }

	if(SCbIsOpera)
          return window.innerWidth;
        else
          return document.body.clientWidth-ScrollBarOffset; // minus the scroll bar if IE

	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			
			obj = obj.offsetParent;
		}
        
	}
       
        return obj.offsetWidth;

}
// code from http://www.quirksmode.org/js/findpos.html
function SCfindPosX(obj)
{
	var curleft = 0;
        if(!obj)
           return 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
{
		curleft += obj.x;
}
	return curleft;
}
// code from http://www.quirksmode.org/js/findpos.html
function SCfindPosY(obj)
{
	var curtop = 0;
        if(!obj)
           return 0;
        
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
        {
		curtop += obj.y;
        }
	return curtop;
}

// place meaning within translation window
function SCInsertTranslation(label,text1,translatedword)
{
	// var translatedword = SCrequest.responseText;
        var xadjust = 5;
        var yadjust = 5;
        
        
	// var translation = translatedword.split("|");
	// translation[0] id of window
	// translation[1] word
	// translation[2] translated word
		  
        //  var meaning = translation[2];
          var meaning = translatedword;
	  if(meaning == '\n')
	     meaning = "NOT FOUND!!";
          meaning = meaning.replace(/\\u0026#39;/gi,"'");
          meaning = meaning.replace(/\\u0026quot;/gi,'"');

          
          if(SCtranslateFrom == "Wikipedia" && !SCbInsertSpan)
          {
            SCDicthtml = meaning;
            return;
          }
          SCbInsertSpan = true;
          // SCbInsertSpan = false;

          var ob = document.getElementById(label);
	  if(ob)
	  {
			
		try{
                      
     
                     var span1 = document.createElement("SPAN");
                     var newid = "x" + label;
                     span1.setAttribute("id",newid);
                          
                     span1.innerHTML = 
                             meaning;
		     if(SCbIsIE)
                     {
                         var newfunction = new Function("SCdonthide=false;");
                         span1.onmouseout = newfunction; 
                         var newfunction1 = new Function("SCdonthide=true;");
                         span1.onmouseover = newfunction1; 
                     }
                          
		     ob.replaceChild(span1,ob.firstChild);
 

                     var span2 = document.getElementById(newid);
 		     var bIsInLink = SCIsSrcElementInALink();
                     var pixelstring = "px";
                     if(SCbIsIE)
                         pixelstring = "";
                     if(SCbIsIE9)
                         pixelstring = "px";


                     // the following code handles the IE 
                     // case where the yellow window goes
                     // to the right of the body
                    if(!SCbIsSafari)
                     {
                     var doclength = SCfinddoclength(span2.parentNode);
                     var span2overflow = (SCposx+span2.scrollWidth+1) - doclength;
                  
                     if(span2overflow > 0&&!SCdontposition)
                     {
                       
                       var newposx =  SCposx - span2overflow;
                       span2.parentNode.style.position="absolute";
                       span2.parentNode.style.left = (newposx)+pixelstring;
                       span2.parentNode.style.top=(SCposy+yadjust)+pixelstring;
		       if(bIsInLink && typeof popupVersion == "undefined")
                          span2.parentNode.style.top = (SCposy + SCPosYAdjust+yadjust) + pixelstring;
                     }

                    }

                    if(bIsInLink && typeof popupVersion != "undefined" && !SCdontposition)
                    {
                       span2.parentNode.style.top = (SCposy - span2.parentNode.offsetHeight + yadjust) + pixelstring;
                    }

		   }
		catch(err)
		{
		//  alert("unable to set innerHTML");
		}
	}
        //else alert("no id:" + translatedword);
        SCdontposition = false;

}

// issue Google Ajax request

function SCasyncGet(id,word)
{
   var languagepath = "en|fr";
   // consult SCtranslate for language translation
   if(typeof SCtranslateFrom != "undefined"
      && typeof SCtranslateTo != "undefined"
     )
   {
       languagepath = SCtranslateFrom + "|" + 
                      SCtranslateTo;
   }
   
   var persistantlanguagepathFrom = SCPersistantLoad('languageFrom');
   var persistantlanguagepathTo = SCPersistantLoad('languageTo');

   

   if(persistantlanguagepathFrom != "" &&
      persistantlanguagepathTo != "")
        languagepath = persistantlanguagepathFrom + 
             "|" + persistantlanguagepathTo;
   if(languagepath=="Wikipedia")
        languagepath = "en|fr";

//   if(languagepath == "Wikipedia")
//   {
//   }
//   else
   {
     // google limits to 500 characters of translation
     if(word.length > SCMaxWordLength)
        word = word.substring(0,SCMaxWordLength);
     var bIsSelectedText = "NO";
     if(SCbIsWordInSelection)
         bIsSelectedText = "YES";

     SCgoogleLookup(word,id);
   }
}
function SCreplaceHtml(obj,newhtml)
{
 while(obj.childNodes.length>0)
 {
   obj.removeChild(obj.childNodes[0]);
 }
 var newspan = document.createElement("SPAN");
 newspan.innerHTML = newhtml
 obj.appendChild(newspan);
}
function SClanguageChange(obj,id)
{
 var langoptions = 
 obj.options[
     obj.selectedIndex
     ].value;
 if(id.match(/From/))
 {
   SCtranslateFrom = langoptions;
   SCPersistantSave('languageFrom',SCtranslateFrom);
 }
 else if(id.match(/To/))
 {
   SCtranslateTo = langoptions;
   SCPersistantSave('languageTo',SCtranslateTo);
 }
// SCtranslate = langoptions;

 //SCdonthide = false;
 //SChidespan(SCcurrentLink);
}
function SCwikipedialanguageChange(obj)
{
 var langoptions = 
 obj.options[
     obj.selectedIndex
     ].value;
 SCWikipedialanguage = langoptions;
 SCPersistantSave('Wikipedialanguage',SCWikipedialanguage);
 var objWiki = document.getElementById(SCcurrentLink);
 if(!objWiki && 1==0)
 {
   alert("objWiki failed: " + SCcurrentLink);
   
 }
 
 var arrLinks = objWiki.getElementsByTagName("A");
 var i;
 for(i=0;i<arrLinks.length;i++)
 {
   var theonclick = arrLinks[i].getAttribute("onclick");
  
   if(!theonclick)
      continue;

   if(theonclick.toString().match(/^(.*)..\.wikipedia\.org\?(.*)$/mi))
   {
     
      var newonclick =
       RegExp.$1 +
          SCWikipedialanguage +".wikipedia.org" + '?' + RegExp.$2;
    
     
      if(SCbIsIE)
      {
         
         
         if(newonclick.match(/\{(\s*javascript:)?(.*)\}/mi) ||
            newonclick.match(/(javascript:)?(.*)/mi))
         {
           
           var newfunction = new Function("return " + RegExp.$2 + ";");
           arrLinks[i].onclick = newfunction; 
         }
      }
      else
         arrLinks[i].setAttribute("onclick",newonclick);
   }
 } 
}
function SCSettings()
{
  var linkname = "SC" + (++SCindex);
  SCcurrentLink = linkname;

  var str1 = document.createTextNode("");
  var a1 = document.createElement("DIV");
  a1.setAttribute("id",linkname); 
  if(!SCbIsIE) // firefox accepts these attributes
                    // ie does not
  {
    a1.setAttribute("onMousedown",'SChidespan("' + linkname + '")');
    a1.setAttribute("class","SCPopup");
    /*
    a1.setAttribute("style","text-decoration:none;background-color:" + SCPopupBackgroundColor + ";border: 1px solid blue;position:absolute;font-size:14pt;z-index:9999;overflow:visible;display:none;line-height:normal;");
  */
  }
  
  if(SCbIsIE) 
  {
       if(SCbIsIE9)
         a1.setAttribute("class","SCPopupIE");
       else
         a1.className="SCPopupIE";
  //   a1.setAttribute("href",'javascript:SChidespan("' + linkname +  '")');
  }
  a1.setAttribute("onMouseover","SCdonthide=true;");
  a1.setAttribute("onMouseout","SCdonthide=false;");

  a1.appendChild(str1); 
   if(!SCbIsIE) 
   {
            a1.setAttribute("onMousedown","");
           // a1.firstChild.setAttribute("onMousedown","");
   }
  var thebody = document.getElementsByTagName("BODY");
//  var html = document.getElementsByTagName("HTML");
   
      var item = document.getElementById("SCitem");
      if(item)
        item.appendChild(a1);
      SCPositionPopup(linkname,false);

      SCmakevisiblelanguagechange();    
}
function SCHideSettings()
{
  SCdonthide=false;
  SCPersistantSave(SCGoogleTransPersistString,(SCGoogleTrans)?"1":"0");
  var popsid = document.getElementById("ca-TransPopsId");
  if(!popsid)
      return;
  
  var anchor1 = popsid.getElementsByTagName( "a" )[0];
  if(!anchor1)
     return;

  var text1; 
  if(SCGoogleTrans)
    text1 = document.createTextNode(SCstrGoogleTrans  + SCstrOn);
  else 
    text1 = document.createTextNode(SCstrGoogleTrans + SCstrOff);
  

 // delete text from anchor in tab
 while(anchor1.childNodes.length>0)
 {
   anchor1.removeChild(anchor1.childNodes[0]);
 }
 // replace text in anchor in tab
 anchor1.appendChild(text1);
   
  SChidespan(SCcurrentLink);
}
function SCSaveShiftKeyNeeded()
{
   if(SCbNoShiftKeyBrowser)
   {
     SCShiftKeyNeeded = false;
     return;
   }
   SCsetInterval();

   SCPersistantSave("shiftkeyneeded",SCShiftKeyNeeded?"1":"0");
}
var SCnewhtml = "";
function SCmakevisiblelanguagechange()
{

var obj = document.getElementById(SCcurrentLink);
if(!obj)
{
  alert("unable to get object: SCmakevisiblelanguagechange " + SCcurrentLink);
  return;
}
SCdonthide = true;



var persistantlanguageFrom = SCPersistantLoad('languageFrom');
if(persistantlanguageFrom == "")
   persistantlanguageFrom = SCLanguageDefaultFrom;
var persistantlanguageTo = SCPersistantLoad('languageTo');
if(persistantlanguageTo == "")
   persistantlanguageTo = SCLanguageDefaultTo;


var newhtml = 

'<a class="SCxWindow" href="javascript:SCdonthide=false;SChidespan(\'' +
SCcurrentLink +
'\')">X</a>' +

'<small><a href="javascript:;"' +
' style="text-decoration:underline;" ' +
' onclick="javascript:SCGoogleTrans=' +
((SCGoogleTrans)?"false":"true") + 
';SCHideSettings();">' +
((SCGoogleTrans)?SCstrTurnOffPopups:
SCstrTurnOnPopups) +
'</a>' + 
'&nbsp;&nbsp;<a style="text-decoration:underline" href="javascript:;"  onclick="javascript:window.open(\''+SCstrHelpUrl+'\');">' + SCstrPopupHelp+'</a>'+
'<br><a href="javascript:;"' +
' style="text-decoration:underline;" ' +
' onclick="javascript:SCShiftKeyNeeded=' +
((SCShiftKeyNeeded)?"false":"true") +
';SCSaveShiftKeyNeeded()' +
';SCHideSettings();">' +
SCstrShiftKeyNeeded +
((SCShiftKeyNeeded)?SCstrOff:SCstrOn) +
'</a></small>' +
'<br>&nbsp;&nbsp;' + 
'<small>' + SCstrSelectLanguage + '</small><br>' +
'<SELECT name="languageoptionsFrom" id="languageoptionsFrom"' +
 'onchange="SClanguageChange(this,\'languageFrom\')"' +
' onMouseover="javascript:SCdonthide=true;" class="SChidestuff">' +
//' onMouseout="javascript:SCdonthide=false;">' +
 SCnewoptions + 
'</select>' +
'<SELECT name="languageoptionsTo" id="languageoptionsTo"' +
 'onchange="SClanguageChange(this,\'languageTo\')">' +
' onMouseover="javascript:SCdonthide=true;">' +
//' onMouseout="javascript:SCdonthide=false;">' +
 SCnewoptions + 
'</select>&nbsp;&nbsp;<br><small>' +
SCstrSingleWord + SCstrOn + '<br>' +
SCstrSelectedText + ((SCbIsIE || (SCbIsMozilla&&!(SCbIsOpera||SCbIsKonqueror||SCbIsPre4Safari )))?SCstrOn:SCstrOff) +
((SCbIsKonqueror)?SCstrKonqueror + '<br>' : '') +
'<br>'
;
 var newspan = document.createElement("DIV");


  newspan.setAttribute("onMouseover","javascript:SCdonthide=true;");
  if(SCbIsIE)
  {
     newspan.onmouseover = new Function("SCdonthide=true;");
  }
 newspan.innerHTML = newhtml;

 var i;
 
 while(obj.childNodes.length>0)
 {
   obj.removeChild(obj.childNodes[0]);
 }
 
 
// obj.replaceChild(newspan,obj.firstChild);
  obj.appendChild(newspan);

if(SCbIsSafari) 
   obj.setAttribute("onMousedown","");
 
// obj.innerHTML = newhtml;
   SCsetLanguageDefault("languageoptionsFrom","languageFrom");
   SCsetLanguageDefault("languageoptionsTo","languageTo");

  
 
}

function SCsetLanguageDefault(id,key)
{
  var i;
  var obj = document.getElementById(id);
  if(!obj)
      return;
  
  var defaultlanguage = SCPersistantLoad(key);
  if(defaultlanguage == "")
  {
     
//     if(typeof SCtranslate == "undefined")
     {
        if(key.match(/From/))
          defaultlanguage = SCLanguageDefaultFrom;
        else if(key.match(/To/))
          defaultlanguage = SCLanguageDefaultTo;
    
     }
//     else defaultlanguage = SCtranslate;
  }
 
 if(!obj || (obj && !obj.options))
  {
   //  alert("setLanguageDefault: bad object passed!" +
   //   id + ":" +
   //   key);
  }
  for(i=0;i<obj.options.length;i++)
  {
     obj.options[i].selected = false;
     if(obj.options[i].value.match(defaultlanguage,"i"))
     {
        obj.options[i].selected = true; 
        
     }
  }
 
  if(SCbIsSafari)
  {
     obj.setAttribute("style","text-decoration:underline");
  }
}


function SCPersistantSave(key,value)
{
/*
   if(SCbIsIE)
       SCUserDataSave(key,value);
   else if(typeof globalStorage != "undefined") 
       SCGlobalStorageSave(key,value);
   else */
   SCsetcookieVal(key,value);
}
function SCPersistantLoad(key)
{
   /*
   if(SCbIsIE)
       return SCUserDataLoad(key);
   else if(typeof globalStorage != "undefined") 
       return SCGlobalStorageLoad(key);
   else */
    return SCgetcookieVal(key);
 
}

function SCUserDataSave(key,value)
{
  SCPersistElement.setAttribute(key,value);
  SCPersistElement.save("oXMLStore");
}
function SCUserDataLoad(key)
{
  SCPersistElement.load("oXMLStore");
  var retc = SCPersistElement.getAttribute(key);
  if(retc == null)
    retc = "";
  return retc;
}
function SCGlobalStorageSave(key,value)
{
  if(globalStorage)
  {
    eval ("globalStorage['www.securecottage.com']." +
          key + "='" + value + "'");
  }
}
function SCGlobalStorageLoad(key)
{
  var retc = "";
  if(globalStorage)
  {
     retc =     eval ("globalStorage['wikipedia.org']." +
          key );
     if (retc == null)
        return "";
     
     return retc.value;
     
  }
  return "";
}
function SCsetcookieVal(cookieKey,cookieValue)
{
   var ExpireDate = new Date();
//   ExpireDate.setYear(ExpireDate.getYear() + 1910);
   ExpireDate.setYear(ExpireDate.getUTCFullYear() + 10);

   document.cookie =  cookieKey + '=' + cookieValue + 
          "; path=/; " 
        //  + "domain=" + document.domain + "; " 
          + "expires=" + ExpireDate.toGMTString();
  

}
function SCgetcookieVal(cookieName)
{
  
  var aCookie = "";
  var thisCookie;
  
  
  aCookie = document.cookie;
  thisCookie = aCookie.split(/; /);
  

  var i;
  var retCookie = "";
  for(i=0;i<thisCookie.length;i++)
  {
     if(cookieName == thisCookie[i].split("=")[0].substring(0,cookieName.length))
     {
           retCookie = thisCookie[i].split("=")[1];
           break;
     }
  }

  if(retCookie == null || retCookie == "undefined")
     retCookie = "";
  
  return retCookie;

}
function SCwikichange(obj)
{
  var parobj = document.getElementById(SCcurrentLink);
  if(parobj && SCWikihtml != "")
  {
     SCalttranslateFrom = SCtranslateFrom;
     SCalttranslateTo = SCtranslateTo;
     SCtranslateFrom = "Wikipedia";
     SCDicthtml = parobj.innerHTML;
     if(SCbIsIE||SCbIsSafari)
        SCreplaceHtml(parobj,SCWikihtml);
     else
        parobj.innerHTML = SCWikihtml;
    SCsetLanguageDefault("wikipedialanguageoptions",
                       "Wikipedialanguage")

   if(SCbIsSafari) 
            parobj.setAttribute("onMousedown","");

  //  SChidewradd();
  }
}
function SCdictionarychange(obj)
{
  var parobj = document.getElementById(SCcurrentLink);
  
  if(parobj && SCDicthtml != "")
  {
     SCtranslateFrom = SCalttranslateFrom;
     SCtranslateTo = SCalttranslateTo;
     SCtranslateFrom = SCPersistantLoad('languageFrom');
     SCtranslateTo = SCPersistantLoad('languageTo');

     if(SCtranslateFrom == "")
         SCtranslateFrom = SCLanguageDefaultFrom;
     if(SCtranslateTo == "")
         SCtranslateTo = SCLanguageDefaultTo;

     SCWikihtml = parobj.innerHTML;
     if(SCbIsIE||SCbIsSafari)
       SCreplaceHtml(parobj,SCDicthtml);
     else
       parobj.innerHTML = SCDicthtml;

     if(parobj && !SCbIsIE)
     {
        parobj.setAttribute("onMousedown",'SChidespan("' + SCcurrentLink + '")');
     }

     if(!SCbInsertSpan)
     {
      
       SCasyncGet(SCcurrentLink,SCDicthtml);
       SCbInsertSpan=true;
      
     }
    
  }
}

function SCWikipediaLink(wordindex,delimiter,words)
{
  var i,j;
  
  var newhtml = 
'<span ' +
' onMouseover="javascript:SCdonthide=true;"' +
' onMouseout="javascript:SCdonthide=false;">' +
'<a href="javascript:SCmakevisiblelanguagechange()"' +
' style="text-decoration:underline"' +
' onMouseover="javascript:SCdonthide=true;"' +
'>' +
'Wikipedia</a>';

  newhtml +=
  '&nbsp;&nbsp;<a href="javascript:SCdictionarychange(this)"' +
' style="text-decoration:underline"' +
' onMouseover="javascript:SCdonthide=true;"' +
'>' +
'Dictionary?</a>';
  newhtml += 
'<br><small>Wikipedia language</small><br>' +
'<SELECT name="Wikipedialanguageoptions" id="wikipedialanguageoptions"' +
 'onchange="SCwikipedialanguageChange(this)">' +
' onMouseover="javascript:SCdonthide=true;"' +
'>' +
SCnewoptions +
'</select><br>';

  var numwords=4;
  if((SCtranslateFrom.match("zh","i") 
      || SCtranslateFrom == "ja"
     )
       ||
     (SCtranslateFrom == "Wikipedia" && 
      (SCalttranslateFrom.match("zh","i") ||
       SCalttranslateFrom == "ja"
        ))
     )
      numwords = 10;

  var wordindexend = wordindex + numwords;
  if(wordindexend > words.length-1)
     wordindexend = words.length-1;
  for(i=wordindex;i<=wordindexend;i++)
  {
     var linktext = "";
     for(j=wordindex;j<=i;j++)
     {
        var theword="";
        if(words[j].match(/^(.*)\'s$/))
           theword = RegExp.$1;
        else theword = words[j];
        theword = theword.replace(/\'/g,"\u0026#39;");
        theword = theword.replace(/\"/g,"\u0026quot;");
        linktext += theword;
        if(j<i)
          linktext += delimiter;
     }
     newhtml += '<br>';
     
	var linkobj = $( document.createElement('a') );
	linkobj.attr({
		href: 'javascript:SCdonthide=false;SChidespan(\'' + SCcurrentLink + '\');',
		onMouseover: "javascript:SCdonthide=true;",
		onclick: 'javascript:window.open(\"http://' + SCWikipedialanguage.substring(0, 2) + '.wikipedia.org?go=Go&search=' + encodeURIComponent(linktext) + '\")'
	});
	linkobj.text( linktext );
	newhtml += linkobj.wrap('<div></div>')[0].outerHTML;

  }
  newhtml +='<br><a href="javascript:SCdonthide=false;SChidespan(' + '\'' + SCcurrentLink +'\')"><small>Close Window</small></a></span>';

  var newspan = document.createElement("SPAN");
  newspan.innerHTML = newhtml;
  return newspan;
}
//http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function SCScreenSize() {
  
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    SCscreenWidth = window.innerWidth;
    SCscreenHeight = window.innerHeight;

  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    SCscreenWidth = document.documentElement.clientWidth;
    SCscreenHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    SCscreenWidth = document.body.clientWidth;
    SCscreenHeight = document.body.clientHeight;
  }
 
}
//http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function SCgetScrollXY() {
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    SCscrOfY = window.pageYOffset;
    SCscrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    SCscrOfY = document.body.scrollTop;
    SCscrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    SCscrOfY = document.documentElement.scrollTop;
    SCscrOfX = document.documentElement.scrollLeft;
  }

}
// is the current cursor position inside 
// a selected area.  The selected area must be 
// within one node and be on the same line
// only works for IE

function SCNotTooBigAndInSelection(theparent,thechild)
{
  if(!SCbIsIE)
      return "";
  var retWordList = SCIsInSelection(theparent,thechild);
  if(retWordList == "" || retWordList == null)
      return "";
//  var retWordArray = retWordList.split(/[\r\n\s]+/);
  return retWordList;
}
// only works for IE
function SCIsInSelection(theparent,thechild)
{
var returnSelectedText="";
var debug = false;
var userSelection;


if(SCbIsIE) // IE
{
  
 
  if(SCSelectionType.match(/none/i)||SCSelectionType == ""||SCSelectionType == null)
    return "";
 
  if(SCSelectionType.match(/text/i))
  {
    var range = SCIeRange;
    var s = range.text;
    var collection = range.getClientRects();
    var i;

    var zoomSCposx = SCposx;
    var zoomSCposy = SCposy;
    

   
    for(i=0;i<collection.length;i++)
    {
        var topp = collection[i].top;
        var bottomm = collection[i].bottom;
        var leftt = collection[i].left;
        var rightt = collection[i].right;

if(SCbIsIE && typeof screen.deviceXDPI != "undefined")
    {
        topp = Math.floor(topp *(screen.logicalYDPI/screen.deviceYDPI));
        bottomm = Math.floor(bottomm *(screen.logicalYDPI/screen.deviceYDPI));
        leftt = Math.floor(leftt *(screen.logicalXDPI/screen.deviceXDPI));
        rightt = Math.floor(rightt *(screen.logicalXDPI/screen.deviceXDPI));


    }

       leftt += 
           document.body.scrollLeft+
           document.documentElement.scrollLeft;
       rightt +=  
           document.body.scrollLeft+
           document.documentElement.scrollLeft;
       topp +=
           document.body.scrollTop+
           document.documentElement.scrollTop;
       bottomm += 
           document.body.scrollTop+
           document.documentElement.scrollTop;

   
     if(1==0 && SCbIsIE8 && typeof screen.deviceXDPI != "undefined")
    {
    
        leftt = Math.floor(leftt *(screen.logicalXDPI/screen.deviceXDPI));
        rightt = Math.floor(rightt *(screen.logicalXDPI/screen.deviceXDPI));

        topp = Math.floor(topp *(screen.deviceYDPI/screen.logicalYDPI));
        bottomm = Math.floor(bottomm *(screen.deviceYDPI/screen.logicalYDPI));

    }


    if(zoomSCposx >= leftt
    && zoomSCposx <= rightt
    && zoomSCposy >= topp
    && zoomSCposy <= bottomm
    )
       return s;
  if(debug)
       alert(collection[i].left+"-"+collection[i].right+"_"+
             collection[i].top +"_"+collection[i].bottom+"__"+
        leftt+":"
       + ":" + rightt + ":" +
       ":"+document.body.scrollLeft +":"+
           document.documentElement.scrollLeft +
       ":"+topp+":"
        +bottomm+":"+":"
         +document.body.scrollTop+":" +
        document.documentElement.scrollTop +":"
       +zoomSCposx+":"+zoomSCposy+":"+screen.systemYDPI+":"+screen.deviceYDPI+":"+screen.logicalYDPI);
    }


    return "";
   }

  }

}
function SCgetRangeObject(selectionObject) 
{
	 // Safari!
		var range = document.createRange();
		range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
		range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
		return range;
	
}

function SCAreWordsInSelection(userSelection,SCselectionarray,child,childindex)
{
 
   if(SCLanguageDefaultFrom.match(/ja|zh/i))
        return SCJaZhAreWordsInSelection(userSelection,SCselectionarray,child,childindex);

 var range = SCgetRangeObject(userSelection);
  var str = child.nodeValue;
  if(str == "" || str == null)
    return;
  var delimiter = /^[\r\n ]+/
  var delimiter1 = /^\S+/;
  var bNoSpace = false;
  if(SCtranslateFrom.match("zh","i") ||
     SCtranslateFrom == "ja")
  {
    bNoSpace = true;
  }
  SCselectionstart[childindex] = -1;
  SCselectionend[childindex] = -1;
  var range1 = document.createRange();
 
  var i,j,k;
  i=0;j=0;
  for(i=0,j=0;i<str.length;i++)
  {
      if(!str.charAt(i).match(/[\r\n\t ]/))
          break;
  }
  for(;i<str.length;i++)
  {
 
    if(SCisPointInRange(range,range1,child,i))
    {
       if(SCselectionstart[childindex] == -1)
         SCselectionstart[childindex] = i;
       SCselectionend[childindex] = i;
    }
 
    if(str.substring(i).match(delimiter))
      continue;
    else
    { 
      if(SCisPointInRange(range,range1,child,i))
      {
        SCselectionarray[j] = true;
      }
      else SCselectionarray[j] = false;
      j++;
    }
    k=i;
    for(k=i;!bNoSpace && k<str.length;k++)
    {
      if(SCisPointInRange(range,range1,child,k))
        SCselectionend[childindex] = k;
      if(!str.substring(k).match(delimiter1))
        break;
    }
    i=k;
 
 
  }
}
function SCJaZhAreWordsInSelection(userSelection,SCselectionarray,child,childindex)
{
  var debug = false;
  var range = SCgetRangeObject(userSelection);
  var str = child.nodeValue;
  
  if(str == "" || str == null)
    return;
  var delimiter = /[\r\n ]+/
  var delimiter1 = /\S+/;
  var bNoSpace = false;
  if(SCtranslateFrom.match("zh","i") ||
     SCtranslateFrom == "ja")
  {
 //   bNoSpace = true;
  }

  var jazhpuncts = /[、。， ]/;

  SCselectionstart[childindex] = -1;
  SCselectionend[childindex] = -1;
  var range1 = document.createRange();

  var i,j,k;
  
  for(i=0,j=0;i<str.length;i++)
  {
      if(!str.charAt(i).match(/[\r\n\t ]/))
          break;
  }
  if(i!=j)
  {
     
      if(SCisPointInRange(range,range1,child,i))
      {
        SCselectionarray[j] = true;
        SCselectionend[childindex] = i;
      }
      else SCselectionarray[j] = false;
      j++;

  }
  else
  SCselectionarray[0] = false;

  for(;i<str.length;i++)
  {
    
    if(SCisPointInRange(range,range1,child,i))
    {
       if(SCselectionstart[childindex] == -1)
         SCselectionstart[childindex] = i;
       SCselectionend[childindex] = i;
    }
    
    if(SCLanguageDefaultFrom.match(/ja|zh/i)
          && str.charAt(i).match(jazhpuncts))
    {
      if(debug)alert("punct:"+j+":"+str.charAt(i));
      if(str.charAt(i).match(/[\s\r\n]/))
        continue;
      if(SCisPointInRange(range,range1,child,i))
      {
        SCselectionarray[j] = true;
        SCselectionend[childindex] = i;
      }
      else SCselectionarray[j] = false;
      j++;
      SCselectionarray[j] = false;
    
      continue;
    }
    else if(!str.charAt(i).match(/[\r\n]/)
          && !(SCLanguageDefaultFrom.match(/ja|zh/i)
          && i +1 < str.length && str.charAt(i+1).match(jazhpuncts))
         )
     {
      if(SCisPointInRange(range,range1,child,i))
      {
        SCselectionarray[j] = true;
      }

      if(debug)alert("ordinary:"+j+":"+str.charAt(i));
      continue;
     }
    else if(i +1 < str.length && str.charAt(i+1).match(jazhpuncts))
    {
      if(SCisPointInRange(range,range1,child,i))
      {
        SCselectionarray[j] = true;
      }
      if(str.charAt(i).match(/[\s\r\n]/))
        continue;

      j++;
      SCselectionarray[j] = false;
      continue;

    }
    else
    {
      if(debug)alert("delimiter:"+j+":"+str.charAt(i));
 
      if(SCisPointInRange(range,range1,child,i))
      {
        SCselectionarray[j] = true;
      }
      else SCselectionarray[j] = false;
      j++;
      SCselectionarray[j] = false;
    }
    k=i;
    for(k=i;k<str.length;k++)
    {
      if(SCisPointInRange(range,range1,child,i))
      {
        SCselectionarray[j] = true;
        SCselectionend[childindex] = k;
      }

      if(k+1<str.length && str.charAt(k+1).match(jazhpuncts))
        break;
      if(str.charAt(k).match(delimiter1))
        break;
      
    }
    i=k;
    
      
  }
}
function SCisPointInRange(range,range1,child,i)
{

    if(SCbIsMozilla)
    {
       return range.isPointInRange(child,i);
    }

    range1.setStart(child,i);
    range1.setEnd(child,i);
    if(range.compareBoundaryPoints(Range.START_TO_START,range1) <= 0 &&
       range.compareBoundaryPoints(Range.END_TO_END,range1) >= 0)
       return true;
    else return false;
}
function SCgoogleLookup(text,label) 
{
      
      SClabel = label;
      SCtext = text;
      
    if(typeof SCbaseurl != "undefined")
    {
    SCgoogletranslate =
      "http://translate.google.com/translate?hl=en" + "&tl=" + SCtranslateTo +"&u=" +
          encodeURIComponent(SCbaseurl + "?" + SCbaseparamlist);
    }
    else
    {
   SCgoogletranslate =
       "http://translate.google.com/translate?hl=en" + "&tl=" + SCtranslateTo +"&u=" +
          encodeURIComponent(document.location.href);
    }

      var sourceText = encodeURIComponent(text);
        

      var source = 'https://www.googleapis.com/language/translate/v2?key=' +
       SCGoogleAPIKeyV2 /*+'&source='+SCtranslateFrom*/+'&target=' + 
       SCtranslateTo + 
       '&callback=SCTranslatedText&q=' + sourceText
       ;

       SCimportScriptURI(source);

       
       
    
} 
var SCtextDetect="";
function SCGoogleDetectV2(text)
{
      
      SCtextDetect = text;
      var sourceText = encodeURIComponent(text);
        

      var source = 'https://www.googleapis.com/language/translate/v2?key=' +
       SCGoogleAPIKeyV2 /*+'&source='+SCtranslateFrom*/+'&target=' + 
       SCtranslateTo + 
       '&callback=SCDetectedText&q=' + sourceText
       ;

       SCimportScriptURI(source);

}
function SCDetectedText(response)
{
  
  
 
  if(response.error)
   alert(response.error.message);
  else 
   if(response.data && response.data.translations)
   {
     SCTranslatedFromLanguage=response.data.translations[0].detectedSourceLanguage;
//     SCTTS(SCtextDetect,"en");
     
   }
}
var SCTranslatedFromLanguage="";

function SCTranslatedText(response) {  
          
//            if (result.translation||result.error)
       if(response.error && SCtranslateFrom!=SCTranslatedFromLanguage )
       {
           SCGoogleDetectV2(SCtext);
           if(SCtranslateFrom != SCTranslatedFromLanguage)
           {
             SCtranslateFrom = SCTranslatedFromLanguage;
             SCgoogleLookup(SCtext,SClabel); 
           }
           return;
       }
       else if(response.error)
          return;
       { 
       var nbspstr = "";
       var i;
       var SClanguagestrlength = SCGetGoogleLanguage(SCtranslateTo).length + 10;
       if(SClanguagestrlength < SCSourcestrlength)
          SClanguagestrlength = SCSourcestrlength+10;
  //     if(result.translation)
       {
        
       for(i=response.data.translations[0].translatedText.length;i<SClanguagestrlength;i++)
       {  
            nbspstr+="&nbsp;";
       }
       }

       var pretranslatedword = "";
       var numofwords = SClinkword.split(/\s/).length;
       if(numofwords == 1)
           pretranslatedword = SClinkword + ": ";

   //    var insertstring = SClabel + '|' + SCtext + '|' +
        var insertstring = SClanguageprompt1 + '-> ' + SCGetGoogleLanguage(SCtranslateTo) + SClanguageprompt2 + SCgooglereference2 + SClabel + SCgooglereference3;
	var respDiv = $( '<div class="SCxText"></div>' );
	var respText = ((response.data) ? (pretranslatedword + response.data.translations[0].translatedText) : response.error.message);
	respDiv.text( respText );
	insertstring += respDiv.wrap('<div></div>')[0].outerHTML;
        insertstring += '<div><br>' + SCgooglereference4 + SCgooglereference1 + SCgoogletranslate + SCgooglereference1a + ((numofwords > 1) ? SCnextsentencestr : "") + '</div>';
             
             SCInsertTranslation(SClabel,SCtext,insertstring);

       }
      
} 

function SCMakeGoogleLanguagesOptions(obj)
{
 var i;
 var l,lcode;
 var i=0,j=0;
 for(j=0;j<SCGoogleLanguageCodes.length;j++)
   {
      lcode = SCGoogleLanguageCodes[j];
      l = SCGoogleLanguageNames[j];

      if(lcode=="")
          continue;
      	var newoption = new Option(l,lcode);
        obj.options[i] = newoption;
        i++;
   }
}


function SCgoogleLookup1(text,label) 
{
      SClabel = label;
      SCtext = text;

      SCgoogletranslate =
       "http://translate.google.com/translate?hl=en" + "&tl=" + SCtranslateTo +"&u=" +
          encodeURIComponent(document.location.href);
      var fromlanguage = "";
      if(SCLanguageDefaultFrom.match(/hi/i))
          fromlanguage = "hi";
       
          google.language.translate(text, fromlanguage, SCtranslateTo, 
            function(result) {  
            
            if (result.translation||result.error) 
       { 
       var nbspstr = "";
       var i;
       var SClanguagestrlength = SCGetGoogleLanguage(SCtranslateTo).length + 10;
       if(SClanguagestrlength < SCSourcestrlength)
          SClanguagestrlength = SCSourcestrlength+10;
       if(result.translation)
       {
       for(i=result.translation.length;i<SClanguagestrlength;i++)
       {  
            nbspstr+="&nbsp;";
       }
       }

       var pretranslatedword = "";
       var numofwords = SClinkword.split(/\s/).length;
       if(numofwords == 1)
           pretranslatedword = SClinkword + ": ";

 //      var insertstring = SClabel + '|' + SCtext + '|' +
      var insertstring =
      SClanguageprompt1 +  '→ ' +   SCGetGoogleLanguage(SCtranslateTo) + 	    SClanguageprompt2 + 
  SCgooglereference2 +
      SClabel + SCgooglereference3 + 
      '<div class="SCxText">' +
      
      ((result.translation)?
            (pretranslatedword + result.translation)
            :result.error.message) + nbspstr +'</div>' +
      '<div><br>' +
      SCgooglereference1 + 
      SCgoogletranslate +
      SCgooglereference1a +
      ((numofwords>1)?
      SCnextsentencestr:"")
      + '</div>'
      ;

             SCInsertTranslation(SClabel,SCtext,insertstring); 

       }
      
          }); 
    
} 


SCScreenSize();
function SCGetGoogleLanguage(lcode)
{
  var l;
  var i;
  for (i=0;i<SCGoogleLanguageCodes.length;i++)
  {
     l = SCGoogleLanguageNames[i];
     if(lcode == SCGoogleLanguageCodes[i])
       return (l.substring(0,1).toUpperCase() + l.substring(1).toLowerCase()); 
  }
  return "undefined";
}

function SCGetGoogleLanguage1(lcode)
{
  var l;
  for (l in google.language.Languages)
  {
     if(lcode == google.language.Languages[l])
       return (l.substring(0,1).toUpperCase() + l.substring(1).toLowerCase()); 
  }
  return "undefined";
}
function SCIsInElement(elem)
{
   var debug=false;

   if(!elem)
       return false;

   if(!elem.getClientRects)
       return false;

    var collection = elem.getClientRects();
    var i;
    for(i=0;i<collection.length;i++)
    {
       var leftt = collection[i].left +
           document.body.scrollLeft+
           document.documentElement.scrollLeft;
       var rightt =  collection[i].right +
           document.body.scrollLeft+
           document.documentElement.scrollLeft;
       var topp = collection[i].top +
           document.body.scrollTop+
           document.documentElement.scrollTop;
       var bottomm = collection[i].bottom +
           document.body.scrollTop+
           document.documentElement.scrollTop;
 
    if(SCposx >= leftt
    && SCposx <= rightt
    && SCposy >= topp
    && SCposy <= bottomm
    )
       return true;
  if(debug)
       alert(collection[i].left+"-"+collection[i].right+"_"+
             collection[i].top +"_"+collection[i].bottom+"__"+
        leftt+":"
       + ":" + rightt + ":" +
       ":"+document.body.scrollLeft +":"+
           document.documentElement.scrollLeft +
       ":"+topp+":"
        +bottomm+":"+":"
         +document.body.scrollTop+":" +
        document.documentElement.scrollTop +":"
       +SCposx+":"+SCposy);
    }
 
 
    return false;
 
}


SCScreenSize();

addOnloadHook(
    function () {
        SCcreateEvents();
    }
);
addOnloadHook(
    function () {
        var bPops = SCPersistantLoad(SCGoogleTransPersistString);
        
        var title = SCstrGoogleTrans;
        if(bPops == "1" || bPops == "")
        {
           SCGoogleTrans = true;
           title += SCstrOn;
           if(bPops == "")
              SCPersistantSave(SCGoogleTransPersistString,'1');
        }
        else
        {
           SCGoogleTrans = false;
           title += SCstrOff;
        }
    //    SCMakeGoogleLanguages();
        addPortletLink('p-cactions',"javascript:SCSettings()", title, "ca-TransPopsId", SCstrChangeOptions, "");
    }
);

// next sentence processing
    var SCselnode;
    var SCseloffset;
    var SCselnodeend;
    var SCseloffsetend;
var SCffrange=null;
var SCffrecursioncounter=0;
var SCffrecursionbreak=1000;


function SCgetnextcharacterinffrange()
{
    var debug=false;    
    if(++SCffrecursioncounter > SCffrecursionbreak)
        return "";

    var rangeset = "";
    if(debug)
      alert("0:" + SCselnodeend.nodeType+":"+SCselnodeend.nodeName+":"+SCselnodeend.length);
    if(SCselnodeend.nodeType != 3)
    {
       var children = SCselnodeend.childNodes;
       var i;
       
       for(i=0;i<children.length;i++)
       {
         SCselnodeend = children[i];
         SCseloffsetend=0;
         if(debug)alert("to 1:"+SCselnodeend.nodeName);
         rangeset = SCgetnextcharacterinffrange();
         if(debug)alert("from 1:"+SCselnodeend.nodeName);

         if(rangeset != "")
           break;
       }
       
       
    }
    else if(SCselnodeend.nodeType==3 && 
            SCselnodeend.length <=SCseloffsetend
           )
    {
        var node = SCselnodeend;
        while(node.parentNode)
        {

           if(++SCffrecursioncounter > SCffrecursionbreak)
               return "";

           var nextsibling = node.nextSibling;
           if(nextsibling != null)
           {
             SCselnodeend = nextsibling;
             node = node.nextSibling;
             SCseloffsetend = 0;
              if(debug)alert("to 2:"+SCselnodeend.nodeName);

             rangeset = SCgetnextcharacterinffrange();
             if(debug)alert("from 2:"+SCselnodeend.nodeName);

             if(rangeset != "")
               break;
           }
           else
           {
               SCselnodeend = node.parentNode.nextSibling;
               SCseloffsetend = 0;
               
               while(node && !SCselnodeend)
               {
                  node = node.parentNode;
                  SCselnodeend = node.nextSibling;
               }
               if(!node || !SCselnodeend)
               {
                  rangeset = "";
                  break;
               }
             if(debug)alert("to 3:"+SCselnodeend.nodeName);

             rangeset = SCgetnextcharacterinffrange();
             if(debug)alert("from 3:"+SCselnodeend.nodeName+":"+rangeset);

             if(rangeset != "")
               break;
             node = SCselnodeend;
           }
        }
    }
    else if(SCselnodeend.nodeType==3 && 
                SCselnodeend.length > SCseloffsetend)
    {
      SCffrange.setEnd(SCselnodeend,++SCseloffsetend)
      rangeset = SCffrange.toString().substr(
         SCffrange.toString().length-1,1); 
    }
    return rangeset; 
}
function SCFFnextsentence(action)
{

    var sel = window.getSelection();
    if(sel == null || sel.toString() == "")
        return false;
    
    SCffrange = sel.getRangeAt(0);
    try {
    window.getSelection().removeRange(SCffrange);
    } catch(err) { }
    
    var retc = SCffrange.collapse(false);

    SCseloffset=SCffrange.startOffset;
    SCseloffsetend=SCffrange.endOffset;
    SCselnodeend=SCffrange.endContainer
    SCselnode = SCffrange.startContainer

    var nextchar = SCgetnextcharacterinffrange();
    var loopbreak=10000;
    var loopcounter = 0;
    var minsentencelength = 10;
    var sentencelength = 0;
    while((nextchar != "" && nextchar != '.' && nextchar != '?' && nextchar != ';')|| sentencelength < minsentencelength)
    {
       sentencelength++;
       SCffrecursioncounter = 0;
       nextchar = SCgetnextcharacterinffrange();
       if(1==0 && nextchar.match(/\./))
       {
         
         var answer=confirm(nextchar);
         if(answer)
           break;
       }
       if(++loopcounter > loopbreak)
       {
         //alert("loop break set");
         break;
       }
    }

    try {
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(SCffrange);
    } catch(err){
    // alert("failure1");
   }
  

    var containernode= SCselnodeend;
    
    while(containernode && !containernode.offsetHeight)
    {
       containernode = containernode.parentNode;
    }
    
    if(containernode && action.match(/tts|translate/))
    {

      SCposx = SCfindPosX(containernode)+
      Math.floor(containernode.offsetWidth/2);
      
      SCposy = SCfindPosY(containernode) +
        containernode.offsetHeight;
    }
    if(action.match(/tts/i))
      SCTTS(SCffrange.toString(),"en");
    else if(action.match(/translate/))
    {
       SCdonthide = false;
       SCdonthide1 = false;
       SChidespan(SCcurrentLink);
    //   SCpposx = SCposx;
    //   SCpposy = SCpoxy;
       SCShiftKey = true;
       SCSetInLink(SCffrange.toString(),null,null,0," ",
         SCffrange.toString().split(/\s+/),false);
       SCShiftKey = false;
   //    SCpposx = SCposx;
   //    SCpposy = SCpoxy;
       SClastposx = SCposx;
       SClastposy = SCposy;
       SCdonthide = true;
       SCdontposition = true;
       
    }

       
}
function SCnextsentence(action)
{
  var debug = false;
  var obj;
  if(SCbIsFirefox35Like)
  {
    SCFFnextsentence(action);
    return;
  }
  else
  if(SCbIsIE||SCbIsOpera11)
  {
    obj = SCIeRange.duplicate();
    var objtext = SCIeRange.text;
    
    obj.collapse(false);
  //  var obj1 = obj.duplicate();
    // check for [99] -- wikipedia footnotes

    obj.expand("character");
    var loopbreak = 5000;
    var loopcounter = 0;
    while(obj.text.substr(obj.text.length-1,1).match(/\s|\[/))
    {
       if(++loopcounter > loopbreak)
         break;
       obj.expand("character");
       if(debug)alert("0:"+obj.text);
    }
    if(1==1)
    {
       //obj.expand("character");
       //if(debug)alert("1:"+obj.text);

       loopcounter = 0;
       while(obj.text.substr(obj.text.length-1,1).match(/\s|[0-9]/))
      {
       if(++loopcounter > loopbreak)
         break;
       obj.expand("character");
       if(debug)alert("2:"+obj.text);

      }
//      if(obj.text.substr(obj.text.length-1,1).match(/\]/))
      {
        if(obj.text.substr(obj.text.length-1,1).match(/\]/))
          obj.collapse(false);
        if(debug)alert("3:"+obj.text);
        obj.expand("character");
        var minsentencelength = 10;
        var sentencelength=0;
        while(!obj.text.substr(obj.text.length-1,1).match(/[.?;一，。、]/)|| sentencelength < minsentencelength)
        {
          sentencelength++;
          obj.expand("character");
          if(++loopcounter > loopbreak)
            break;
        }

        
      }

    }
    else
    {
       var retc = obj.expand("sentence");
       if(debug)alert("4:"+obj.text);
    }

    SCIeRange = obj;
    try {
    retc = SCIeRange.select();
    if(debug)alert("done");
    } catch(err) {
   //   alert("select fail: "+retc);
   }
    SCIERangeBottom(); // set SCposx and SCposy


    if(action.match(/tts/i))
      SCTTS(SCIeRange.text,"en");
    else if(action.match(/translate/))
    {
       SCdonthide = false;
       SCdonthide1 = false;
       SChidespan(SCcurrentLink);

      
       
       SCShiftKey = true;
       SCSetInLink(SCIeRange.text,null,null,0," ",
         SCIeRange.text.split(/\s+/),false);
       SCShiftKey = false;

   //    SCpposx = SCposx;
   //    SCpposy = SCposy;
       SClastposx = SCposx;
       SClastposy = SCposy;
       SCdonthide = true;
       SCdontposition=true;
       
    }

  }
}

// only works for IE
function SCIERangeBottom()
{
var returnSelectedText="";
var debug = false;
var userSelection;


if(SCbIsIE||SCbIsOpera11) // IE
{
  
 
  if(SCSelectionType.match(/none/i)||SCSelectionType == ""||SCSelectionType == null)
    return "";
 
  if(SCSelectionType.match(/text/i))
  {
    var range = SCIeRange;
    var s = range.text;
    var collection = range.getClientRects();
    var i;
    if(collection.length == 0)
    {
      range = document.selection.createRange();
      collection = range.getClientRects();
      s = range.text;
      if(collection.length == 0 && 1==0)
         alert("unbingo!");
    }
    

    var zoomSCposx = SCposx;
    var zoomSCposy = SCposy;
    

   
    for(i=0;i<collection.length;i++)
    {
        var topp = collection[i].top;
        var bottomm = collection[i].bottom;
        var leftt = collection[i].left;
        var rightt = collection[i].right;

if((SCbIsIE||SCbIsOpera11) && typeof screen.deviceXDPI != "undefined")
    {
        topp = Math.floor(topp *(screen.logicalYDPI/screen.deviceYDPI));
        bottomm = Math.floor(bottomm *(screen.logicalYDPI/screen.deviceYDPI));
        leftt = Math.floor(leftt *(screen.logicalXDPI/screen.deviceXDPI));
        rightt = Math.floor(rightt *(screen.logicalXDPI/screen.deviceXDPI));


    }

       leftt += 
           document.body.scrollLeft+
           document.documentElement.scrollLeft;
       rightt +=  
           document.body.scrollLeft+
           document.documentElement.scrollLeft;
       topp +=
           document.body.scrollTop+
           document.documentElement.scrollTop;
       bottomm += 
           document.body.scrollTop+
           document.documentElement.scrollTop;

     if(i==collection.length-1)
     {
        SCposx = Math.floor(leftt + (rightt-leftt)/2);
        SCposy = Math.floor(bottomm);
        return true;
     }
 
    
   }

  }
 }
}

//SCloadGoogleLanguage();