/*
**@name         Reference Form
**@author        T3CHNOCIDE
**@description Add reference buttons to the editor which allow users to add references to an article by filling out forms.
**@notes         Buttons do not always append to RTE, requires further refinement.
**@license       CC-BY-SA - http://creativecommons.org/licenses/by-sa/3.0/
*/

//Places buttons into editor
$( document ).ready(function() {
  if ( mw.config.get( 'wgAction' ) === 'edit') {
	$(".cke_buttons.cke_toolbar_insert").append('<span class="cke_button cke_button_big cke_off"><a id="refbuttonmedia" class="cke_off" title="Add Source/Reference" onclick="RefOptions()" tabindex="-1" hidefocus="true" role="button"><span class="cke_icon" style="background-image:url(\'https://images.wikia.nocookie.net/operation-neogenesis/images/1/18/Reference_Button_Media_and_Features.png\') !important; background-position: 7px 0px !important;">&nbsp;</span><span id="uielem_5_label" class="cke_label">Reference</span></a></span>');
	$(".cke_toolbar_source").prepend('<img src="https://images.wikia.nocookie.net/operation-neogenesis/images/a/a5/Reference_Button_Source_Mode.png" alt="Add a source/reference" title="Add a source/reference" onclick="RefOptions()" id="refbuttonsource" style="width: 23px; height: 22px;">');
	$(".cke_buttons.cke_toolbar_format").append('<span class="cke_separator">&nbsp;</span><span class="cke_button cke_button_undo cke_off"><a id="refbuttonvisual" onclick="RefOptions()" title="Add source/reference" tabindex="-1" hidefocus="true" role="button"><span style="background-image:url(\'https://images.wikia.nocookie.net/operation-neogenesis/images/8/8a/Reference_Button_Visual_Mode.png\') !important; background-position:0px 0px !important;" class="cke_icon">&nbsp;</span><span id="refbuttonvisual" class="cke_label">Source/Reference</span></a></span>')
  }
});

//Forces buttons into RTE with while loop
$( document ).ready(function() {
	if ( mw.config.get( 'wgAction' ) === 'edit' && ($('.module_insert').length == 1)) {
		while (/Reference/i.test($('.module_insert').text()) == false) {
			$(".cke_buttons.cke_toolbar_insert").append('<span class="cke_button cke_button_big cke_off"><a id="refbuttonmedia" class="cke_off" title="Add Source/Reference" onclick="RefOptions()" tabindex="-1" hidefocus="true" role="button"><span class="cke_icon" style="background-image:url(\'https://images.wikia.nocookie.net/operation-neogenesis/images/1/18/Reference_Button_Media_and_Features.png\') !important; background-position: 7px 0px !important;">&nbsp;</span><span id="uielem_5_label" class="cke_label">Reference</span></a></span>');
			$(".cke_buttons.cke_toolbar_format").append('<span class="cke_separator">&nbsp;</span><span class="cke_button cke_button_undo cke_off"><a id="refbuttonvisual" onclick="RefOptions()" title="Add source/reference" tabindex="-1" hidefocus="true" role="button"><span style="background-image:url(\'https://images.wikia.nocookie.net/operation-neogenesis/images/8/8a/Reference_Button_Visual_Mode.png\') !important; background-position:0px 0px !important;" class="cke_icon">&nbsp;</span><span id="refbuttonvisual" class="cke_label">Source/Reference</span></a></span>')
		}
	}
});

//Sets access date
var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1; //January is 0!
var year = date.getFullYear();
var months = new Array("","January","February","March","April","May","June","July","August","September","October","November","December");
if(day<10){day='0'+day} 
var month = months[month]
var date = day+' '+month+' '+year;

//Detects editor by UltimateSupreme
//http://naruto.wikia.com/wiki/User:UltimateSupreme
var editor = window.WikiaEditor && window.WikiaEditor.getInstance('wpTextbox1');
if (editor && editor.ck) {
	if (editor.ck.document) { //Visual Editor
		var editorVersion = 'Visual'
	} else if (editor.ck.textarea) { //Source Editor
		var editorVersion = 'Source'
	}
} else {
	var editorVersion = 'Source'
}

//Reference options
function RefOptions() {
	$.showCustomModal("References<br/><span style=\"font-size:small; color:white;\">What is the source of your information?</span>", '<div style=\"width:460px; text-align:center;\"><table cellpadding=\"5px\"><tr><td style=\"cursor:pointer;\"><img id=\"refbuttongame\" src=\"https://images.wikia.nocookie.net/operation-neogenesis/images/6/63/Game_Icon.png\" onclick="GameSource()" width=\"80px\" height=\"80px\"/></td><td style=\"cursor:pointer;\"><img id=\"refbuttonbook\" src=\"https://images.wikia.nocookie.net/operation-neogenesis/images/3/34/Book_Icon.png\" onclick="BookSource()" width=\"80px\" height=\"80px\"/></td><td style=\"cursor:pointer;\"><img id=\"refbuttonvideo\" src=\"https://images.wikia.nocookie.net/operation-neogenesis/images/3/38/Videon_Icon.png\" onclick="VideoSource()" width=\"80px\" height=\"80px\"/></td><td style=\"cursor:pointer;\"><img id=\"refbuttonarticle\" src=\"https://images.wikia.nocookie.net/operation-neogenesis/images/8/84/Article_Icon.png\" onclick="ArticleSource()" width=\"80px\" height=\"80px\"/></td><td style=\"cursor:pointer;\"><img id=\"refbuttonwebsite\" src=\"https://images.wikia.nocookie.net/operation-neogenesis/images/b/b0/Website_Icon.png\" onclick="WebsiteSource()" width=\"80px\" height=\"80px\"/></td></tr><tr><td width=\"80px\">Game</td><td width=\"80px\">Book</td><td width=\"80px\">Video</td><td width=\"80px\">Article</td><td width=\"80px\">Website</td></tr></table></div>', {
		id: "referenceOptions",
		width: 460
	});
}

//Reference code popup
function referenceCode(code) {
	$.showCustomModal( "Reference Code", "Paste the following code after your sourced information in order to cite it:<br><div style='background:rgba(0,0,0,0.5); border:1px solid rgba(56,75,107,0.6);'>" +code+ "</div>", {
	id: "referenceCode",
	width: 472,
	buttons: [
		{
			id: "cancelCode",
			message: "Close",
			handler: function () {
			$("#referenceCode").closeModal();
			}
		}
	]
	});
}

//Game source form
function GameSource() {
	$("#referenceOptions").closeModal();
	$.showCustomModal( "Game Citation Form", "<table cellspacing='0' cellpadding='5px'><tr><td><img src='https://images.wikia.nocookie.net/operation-neogenesis/images/6/63/Game_Icon.png' width='50px' height='50px'/></td><td>Fill out all the relevant data fields with the source of your information, leaving any unknown fields blank.</td></tr></table><table cellspacing='0' cellpadding='5px'><tr><td>Title:</td><td class='toolTip' data-tooltip='Name/title of the game'><input type='text' id='GameName' value='Destiny'></input></td><td>Mission:</td><td class='toolTip' data-tooltip='Specific mission or map where the information was seen'><input type='text' id='GameMission'></input></td></tr><tr><td>Console:</td><td class='toolTip' data-tooltip='Gaming console/platform used by editor (e.g. Xbox One or PlayStation 4)'><input type='text' id='GameConsole'></input></td><td>Release:</td><td class='toolTip' data-tooltip='Date of game release. (DD-MM-YYYY)'><table style='margin-left:-8px; padding-right:5px; padding-left:5px;'><tr><td><select id='publishDay'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select></td><td><select id='publishMonth'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td><td><select id='publishYear'><option>2016</option><option>2015</option><option>2014</option><option>2013</option><option>2012</option><option>2011</option><option>2010</option><option>2009</option><option>2008</option><option>2007</option><option>2006</option><option>2005</option><option>2004</option><option>2003</option><option>2002</option><option>2001</option><option>2000</option></select></td></tr></table></td></tr><tr><td>Edition:</td><td colspan=\"3\" class='toolTip' data-tooltip='Edition of game (e.g. Standard or Game of the Year)'><input type='text' id='GameEdition' style='margin-left:2px; width:384px;'></input></td></tr><tr><td>Developer:</td><td class='toolTip' data-tooltip='Developer of the game'><input type='text' id='GameDeveloper' value='Bungie'></input></td><td>Publisher:</td><td class='toolTip' data-tooltip='Publisher of the game'><input type='text' id='GamePublisher' value='Activision Blizzard'></input></td></tr></table>", {
	id: "referenceGame",
	width: 472,
	buttons: [
		{
			id: "returnReferenceMenu",
			message: "Back",
			handler: function () {
			$("#referenceGame").closeModal();
			RefOptions()
			}
		},
		{
			id: "cancelReference",
			message: "Cancel",
			handler: function () {
			$("#referenceGame").closeModal();
			}
		},
		{
			id: "addGameReference",
			defaultButton: true,
			message: "Add Source",
			handler: function () {
			addGameReference();
			}
		}
	]
	});
}

//Book source form
function BookSource() {
	$("#referenceOptions").closeModal();
	$.showCustomModal( "Book Citation Form", "<table cellspacing='0' cellpadding='5px'><tr><td><img src='https://images.wikia.nocookie.net/operation-neogenesis/images/3/34/Book_Icon.png' width='50px' height='50px'/></td><td>Fill out all the relevant data fields with the source of your information, leaving any unknown fields blank.</td></tr></table><table cellspacing='0' cellpadding='5px'><tr><td>Title:</td><td class='toolTip' data-tooltip='Name/title of the book'><input type='text' id='BookTitle'></input></td><td>Page(s):</td><td class='toolTip' data-tooltip='Pages of the book used'><input type='text' id='BookPages'></input></td></tr><tr><td>First name:</td><td class='toolTip' data-tooltip='Book author&apos;s first name'><input type='text' id='BookFirstName'></input></td><td>Last name:</td><td class='toolTip' data-tooltip='Book author&apos;s last name'><input type='text' id='BookLastName'></input></td></tr><tr><td>Co-author(s):</td><td colspan=\"3\" class='toolTip' data-tooltip='Co-authors, separated by semi-colons.'><input type='text' id='BookCoAuthors' style='margin-left:2px; width:384px;'></input></td></tr><tr><td>Publisher:</td><td class='toolTip' data-tooltip='Book publisher'><input type='text' id='BookPublisher'></input></td><td>City:</td><td class='toolTip' data-tooltip='City of publication'><input type='text' id='BookCity'></input></td></tr><tr><td>Year:</td><td class='toolTip' data-tooltip='Date of publication'><table style='margin-left:-8px; padding-right:5px; padding-left:5px;'><tr><td><select id='publishDay'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select></td><td><select id='publishMonth'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td><td><select id='publishYear'><option>2016</option><option>2015</option><option>2014</option><option>2013</option><option>2012</option><option>2011</option><option>2010</option><option>2009</option><option>2008</option><option>2007</option><option>2006</option><option>2005</option><option>2004</option><option>2003</option><option>2002</option><option>2001</option><option>2000</option></select></td></tr></table></td><td>ISBN:</td><td class='toolTip' data-tooltip='ISBN number of the book'><input type='text' id='BookISBN'></input></td></tr></table>", {
	id: "referenceBook",
	width: 472,
	buttons: [
		{
			id: "returnReferenceMenu",
			message: "Back",
			handler: function () {
			$("#referenceBook").closeModal();
			RefOptions()
			}
		},
		{
			id: "cancelReference",
			message: "Cancel",
			handler: function () {
			$("#referenceBook").closeModal();
			}
		},
		{
			id: "addBookReference",
			defaultButton: true,
			message: "Add Source",
			handler: function () {
			addBookReference();
			}
		}
	]
	});
}

//Video source form
function VideoSource() {
	$("#referenceOptions").closeModal();
	$.showCustomModal( "Video Citation Form", "<table cellspacing='0' cellpadding='5px'><tr><td><img src='https://images.wikia.nocookie.net/operation-neogenesis/images/3/38/Videon_Icon.png' width='50px' height='50px'/></td><td>Fill out all the relevant data fields with the source of your information, leaving any unknown fields blank.</td></tr></table><table cellspacing='0' cellpadding='5px'><tr><td>Username:</td><td class='toolTip' data-tooltip='Username of uploader, leave blank if uploader is host site.'><input type='text' id='VideoUsername'></input></td><td>Host:</td><td class='toolTip' data-tooltip='Website where video is hosted (YouTube)'><input type='text' id='VideoHost'></input></td></tr><tr><td>Title:</td><td colspan=\"3\" class='toolTip' data-tooltip='Name of the video'><input type='text' id='VideoName' style='margin-left:2px; width:357px;'></input></td></tr><tr><td>URL:</td><td colspan=\"3\" class='toolTip' data-tooltip='URL/address of video, including timestamp'><input type='text' id='VideoURL' style='margin-left:2px; width:357px;'></input></td></tr><tr><td>Time:</td><td class='toolTip' data-tooltip='Timestamp where information is seen on video (MM:SS)'><input type='text' id='VideoTime'></input></td><td>Year:</td><td class='toolTip' data-tooltip='Date of video publication or upload'><table style='margin-left:-8px; padding-right:5px; padding-left:5px;'><tr><td><select id='publishDay'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select></td><td><select id='publishMonth'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td><td><select id='publishYear'><option>2016</option><option>2015</option><option>2014</option><option>2013</option><option>2012</option><option>2011</option><option>2010</option><option>2009</option><option>2008</option><option>2007</option><option>2006</option><option>2005</option><option>2004</option><option>2003</option><option>2002</option><option>2001</option><option>2000</option></select></td></tr></table></td></tr></table>", {
	id: "referenceVideo",
	width: 472,
	buttons: [
		{
			id: "returnReferenceMenu",
			message: "Back",
			handler: function () {
			$("#referenceVideo").closeModal();
			RefOptions()
			}
		},
		{
			id: "cancelReference",
			message: "Cancel",
			handler: function () {
			$("#referenceVideo").closeModal();
			}
		},
		{
			id: "addVideoReference",
			defaultButton: true,
			message: "Add Source",
			handler: function () {
			addVideoReference();
			}
		}
	]
	});
}

//Article source form
function ArticleSource() {
	$("#referenceOptions").closeModal();
	$.showCustomModal( "Article Citation Form", "<table cellspacing='0' cellpadding='5px'><tr><td><img src='https://images.wikia.nocookie.net/operation-neogenesis/images/8/84/Article_Icon.png' width='50px' height='50px'/></td><td>Fill out all the relevant data fields with the source of your information, leaving any unknown fields blank.</td></tr></table><table cellspacing='0' cellpadding='5px'><tr><td>Title:</td><td colspan=\"3\" class='toolTip' data-tooltip='Name/title of the article'><input type='text' id='ArticleName' style='margin-left:2px; width:384px;'></input></td></tr><tr><td>URL:</td><td colspan=\"3\" class='toolTip' data-tooltip='URL/address of the article'><input type='text' id='ArticleURL' style='margin-left:2px; width:384px;'></input></td></tr><tr><td>First name:</td><td class='toolTip' data-tooltip='Article author&apos;s first name'><input type='text' id='ArticleFirstName'></input></td><td>Last name:</td><td class='toolTip' data-tooltip='Article author&apos;s last name'><input type='text' id='ArticleLastName'></input></td></tr><tr><td>Co-authors:</td><td colspan=\"3\" class='toolTip' data-tooltip='Co-authors of article, separated by semi-colons.'><input type='text' id='ArticleCoAuthors' style='margin-left:2px; width:384px;'></input></td></tr><tr><td>Publisher:</td><td class='toolTip' data-tooltip='Article publisher/host website'><input type='text' id='ArticlePublisher'></input></td><td>Year:</td><td class='toolTip' data-tooltip='Date of publication'><table style='margin-left:-8px; padding-right:5px; padding-left:5px;'><tr><td><select id='publishDay'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option></select></td><td><select id='publishMonth'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option></select></td><td><select id='publishYear'><option>2016</option><option>2015</option><option>2014</option><option>2013</option><option>2012</option><option>2011</option><option>2010</option><option>2009</option><option>2008</option><option>2007</option><option>2006</option><option>2005</option><option>2004</option><option>2003</option><option>2002</option><option>2001</option><option>2000</option></select></td></tr></table></td></tr></table>", {
	id: "referenceArticle",
	width: 472,
	buttons: [
		{
			id: "returnReferenceMenu",
			message: "Back",
			handler: function () {
			$("#referenceArticle").closeModal();
			RefOptions()
			}
		},
		{
			id: "cancelReference",
			message: "Cancel",
			handler: function () {
			$("#referenceArticle").closeModal();
			}
		},
		{
			id: "addArticleReference",
			message: "Add Source",
			handler: function () {
			addArticleReference();
			}
		}
	]
	});
}

//Website source form
function WebsiteSource() {
	$("#referenceOptions").closeModal();
	$.showCustomModal( "Website Citation Form", "<table cellspacing='0' cellpadding='5px'><tr><td><img src='https://images.wikia.nocookie.net/operation-neogenesis/images/b/b0/Website_Icon.png' width='50px' height='50px'/></td><td>Fill out all the relevant data fields with the source of your information, leaving any unknown fields blank.</td></tr></table><table cellspacing='0' cellpadding='5px'><tr><td>Website:</td><td class='toolTip' data-tooltip='Name of the website'><input type='text' id='WebsiteWebsite'></input></td><td>Title:</td><td class='toolTip' data-tooltip='Name/title of the web page'><input type='text' id='WebsiteTitle'></input></td></tr><tr><td>URL:</td><td colspan=\"3\" class='toolTip' data-tooltip='URL/address of website'><input type='text' id='WebsiteURL' style='margin-left:2px; width:357px;'></input></td></tr></table>", {
	id: "referenceWebsite",
	width: 472,
	buttons: [
		{
			id: "returnReferenceMenu",
			message: "Back",
			handler: function () {
			$("#referenceWebsite").closeModal();
			RefOptions()
			}
		},
		{
			id: "cancelReference",
			message: "Cancel",
			handler: function () {
			$("#referenceWebsite").closeModal();
			}
		},
		{
			id: "addWebsiteReference",
			defaultButton: true,
			message: "Add Source",
			handler: function () {
			addWebsiteReference();
			}
		}
	]
	});
}

//Adding sources
function addGameReference() {
	var gameDeveloperInput = document.getElementById("GameDeveloper").value;
		var dayValue = $("#publishDay").val();
		var monthValue = $("#publishMonth").val();
		var yearValue = $("#publishYear").val();
	var gameDateInput = yearValue+'-'+monthValue+'-'+dayValue
	var gameNameInput = document.getElementById("GameName").value;
	var gameEditionInput = document.getElementById("GameEdition").value;
	var gameMissionInput = document.getElementById("GameMission").value;
	var gameConsoleInput = document.getElementById("GameConsole").value;
	var gamePublisherInput = document.getElementById("GamePublisher").value;
	$("#referenceGame").closeModal();
	if (editorVersion == 'Source') {
		$("textarea.cke_source").insertAtCaret("<ref name=\"" +gameConsoleInput+ " - " +gameNameInput+ ": " +gameMissionInput+ "\">{{RefGame |developer=" +gameDeveloperInput+ " |year=" +gameDateInput+ " |game=" +gameNameInput+ " |edition=" +gameEditionInput+ " |mission=" +gameMissionInput+ " |console=" +gameConsoleInput+ " |publisher=" +gamePublisherInput+ "}}</ref>");
		$("#editform, #toolbar, #wpTextbox1").insertAtCaret("<ref name=\"" +gameConsoleInput+ " - " +gameNameInput+ ": " +gameMissionInput+ "\">{{RefGame |developer=" +gameDeveloperInput+ " |year=" +gameDateInput+ " |game=" +gameNameInput+ " |edition=" +gameEditionInput+ " |mission=" +gameMissionInput+ " |console=" +gameConsoleInput+ " |publisher=" +gamePublisherInput+ "}}</ref>");
	} else if  (editorVersion == 'Visual') {
		pasteHtmlAtCaret("&lt;ref name=\"" +gameConsoleInput+ " - " +gameNameInput+ ": " +gameMissionInput+ "\"&gt;{{RefGame |developer=" +gameDeveloperInput+ " |year=" +gameDateInput+ " |game=" +gameNameInput+ " |edition=" +gameEditionInput+ " |mission=" +gameMissionInput+ " |console=" +gameConsoleInput+ " |publisher=" +gamePublisherInput+ "}}&lt;/ref&gt;",iframeWindow);
	}
}

function addBookReference() {
	var BookFirstNameInput = document.getElementById("BookFirstName").value;
	var BookLastNameInput = document.getElementById("BookLastName").value;
	var BookCoAuthorsInput = document.getElementById("BookCoAuthors").value;
		var dayValue = $("#publishDay").val();
		var monthValue = $("#publishMonth").val();
		var yearValue = $("#publishYear").val();
	var BookDateInput = yearValue+'-'+monthValue+'-'+dayValue
	var BookTitleInput = document.getElementById("BookTitle").value;
	var BookPublisherInput = document.getElementById("BookPublisher").value;
	var BookCityInput = document.getElementById("BookCity").value;
	var BookPagesInput = document.getElementById("BookPages").value;
	var BookISBNInput = document.getElementById("BookISBN").value;
	$("#referenceBook").closeModal();
	if (editorVersion == 'Source') {
		$("textarea.cke_source").insertAtCaret("<ref name=\"" +BookTitleInput+ ": " +BookPagesInput+ "\">{{RefBook |firstname=" +BookFirstNameInput+ " |lastname=" +BookLastNameInput+ " |coauthors=" +BookCoAuthorsInput+ " |year=" +BookDateInput+ " |title=" +BookTitleInput+ " |publisher=" +BookPublisherInput+ " |city=" +BookCityInput+ " |pages=" +BookPagesInput+ " |isbn=" +BookISBNInput+ "}}</ref>");
		$("#editform, #toolbar, #wpTextbox1").insertAtCaret("<ref name=\"" +BookTitleInput+ ": " +BookPagesInput+ "\">{{RefBook |firstname=" +BookFirstNameInput+ " |lastname=" +BookLastNameInput+ " |coauthors=" +BookCoAuthorsInput+ " |year=" +BookDateInput+ " |title=" +BookTitleInput+ " |publisher=" +BookPublisherInput+ " |city=" +BookCityInput+ " |pages=" +BookPagesInput+ " |isbn=" +BookISBNInput+ "}}</ref>");
	} else if  (editorVersion == 'Visual') {
		pasteHtmlAtCaret("&lt;ref name=\"" +BookTitleInput+ ": " +BookPagesInput+ "\"&gt;{{RefBook |firstname=" +BookFirstNameInput+ " |lastname=" +BookLastNameInput+ " |coauthors=" +BookCoAuthorsInput+ " |year=" +BookDateInput+ " |title=" +BookTitleInput+ " |publisher=" +BookPublisherInput+ " |city=" +BookCityInput+ " |pages=" +BookPagesInput+ " |isbn=" +BookISBNInput+ "}}&lt;/ref&gt;",iframeWindow);
	}
}

function addVideoReference() {
	var VideoUsernameInput = document.getElementById("VideoUsername").value;
		var dayValue = $("#publishDay").val();
		var monthValue = $("#publishMonth").val();
		var yearValue = $("#publishYear").val();
	var VideoDateInput = yearValue+'-'+monthValue+'-'+dayValue
	var VideoHostInput = document.getElementById("VideoHost").value;
	var VideoURLInput = document.getElementById("VideoURL").value;
	var VideoNameInput = document.getElementById("VideoName").value;
	var VideoTimeInput = document.getElementById("VideoTime").value;
	$("#referenceVideo").closeModal();
	if (editorVersion == 'Source') {
		$("textarea.cke_source").insertAtCaret("<ref name=\"" +VideoHostInput+ ": " +VideoUsernameInput+ " - " +VideoNameInput+ "\">{{RefVideo |username=" +VideoUsernameInput+ " |year=" +VideoDateInput+ " |hostsite=" +VideoHostInput+ " |url=" +VideoURLInput+ " |title=" +VideoNameInput+ " |time=" +VideoTimeInput+ " |accessed=" +date+ "}}</ref>");
		$("#editform, #toolbar, #wpTextbox1").insertAtCaret("<ref name=\"" +VideoHostInput+ ": " +VideoUsernameInput+ " - " +VideoNameInput+ "\">{{RefVideo |username=" +VideoUsernameInput+ " |year=" +VideoDateInput+ " |hostsite=" +VideoHostInput+ " |url=" +VideoURLInput+ " |title=" +VideoNameInput+ " |time=" +VideoTimeInput+ " |accessed=" +date+ "}}</ref>");
	} else if  (editorVersion == 'Visual') {
		pasteHtmlAtCaret("&lt;ref name=\"" +VideoHostInput+ ": " +VideoUsernameInput+ " - " +VideoNameInput+ "\"&gt;{{RefVideo |username=" +VideoUsernameInput+ " |year=" +VideoDateInput+ " |hostsite=" +VideoHostInput+ " |url=" +VideoURLInput+ " |title=" +VideoNameInput+ " |time=" +VideoTimeInput+ " |accessed=" +date+ "}}&lt;/ref&gt;",iframeWindow);
	}
}

function addArticleReference() {
	var ArticleFirstNameInput = document.getElementById("ArticleFirstName").value;
	var ArticleLastNameInput = document.getElementById("ArticleLastName").value;
	var ArticleCoAuthorsInput = document.getElementById("ArticleCoAuthors").value;
		var dayValue = $("#publishDay").val();
		var monthValue = $("#publishMonth").val();
		var yearValue = $("#publishYear").val();
	var ArticleDateInput = yearValue+'-'+monthValue+'-'+dayValue
	var ArticleURLInput = document.getElementById("ArticleURL").value;
	var ArticleNameInput = document.getElementById("ArticleName").value;
	var ArticlePublisherInput = document.getElementById("ArticlePublisher").value;
	$("#referenceArticle").closeModal();
	if (editorVersion == 'Source') {
		$("textarea.cke_source").insertAtCaret("<ref name=\"" +ArticlePublisherInput+ ": " +ArticleNameInput+ " - " +ArticleLastNameInput+ "\">{{RefArticle |firstname=" +ArticleFirstNameInput+ " |lastname=" +ArticleLastNameInput+ " |coauthors=" +ArticleCoAuthorsInput+ " |year=" +ArticleDateInput+ " |url=" +ArticleURLInput+ " |title=" +ArticleNameInput+ " |publisher=" +ArticlePublisherInput+ " |accessed=" +date+ "}}</ref>");
		$("#editform, #toolbar, #wpTextbox1").insertAtCaret("<ref name=\"" +ArticlePublisherInput+ ": " +ArticleNameInput+ " - " +ArticleLastNameInput+ "\">{{RefArticle |firstname=" +ArticleFirstNameInput+ " |lastname=" +ArticleLastNameInput+ " |coauthors=" +ArticleCoAuthorsInput+ " |year=" +ArticleDateInput+ " |url=" +ArticleURLInput+ " |title=" +ArticleNameInput+ " |publisher=" +ArticlePublisherInput+ " |accessed=" +date+ "}}</ref>");
	} else if  (editorVersion == 'Visual') {
		pasteHtmlAtCaret("&lt;ref name=\"" +ArticlePublisherInput+ ": " +ArticleNameInput+ " - " +ArticleLastNameInput+ "\"&gt;{{RefArticle |firstname=" +ArticleFirstNameInput+ " |lastname=" +ArticleLastNameInput+ " |coauthors=" +ArticleCoAuthorsInput+ " |year=" +ArticleDateInput+ " |url=" +ArticleURLInput+ " |title=" +ArticleNameInput+ " |publisher=" +ArticlePublisherInput+ " |accessed=" +date+ "}}&lt;/ref&gt;",iframeWindow);
	}
}

function addWebsiteReference() {
	var WebsiteWebsiteInput = document.getElementById("WebsiteWebsite").value;
	var WebsiteTitleInput = document.getElementById("WebsiteTitle").value
	var WebsiteURLInput = document.getElementById("WebsiteURL").value;
	$("#referenceWebsite").closeModal();
	if (editorVersion == 'Source') {
		$("textarea.cke_source").insertAtCaret("<ref name=\"" +WebsiteWebsiteInput+ ": " +WebsiteTitleInput+ "\">{{RefWebsite |website=" + WebsiteWebsiteInput + " |url=" + WebsiteURLInput + " |title=" + WebsiteTitleInput + " |accessed=" + date + "}}</ref>");
		$("#editform, #toolbar, #wpTextbox1").insertAtCaret("<ref name=\"" +WebsiteWebsiteInput+ ": " +WebsiteTitleInput+ "\">{{RefWebsite |website=" + WebsiteWebsiteInput + " |url=" + WebsiteURLInput + " |title=" + WebsiteTitleInput + " |accessed=" + date + "}}</ref>");
	} else if  (editorVersion == 'Visual') {
		pasteHtmlAtCaret("&lt;ref name=\"" +WebsiteWebsiteInput+ ": " +WebsiteTitleInput+ "\"&gt;{{RefWebsite |website=" + WebsiteWebsiteInput + " |url=" + WebsiteURLInput + " |title=" + WebsiteTitleInput + " |accessed=" + date + "}}&lt;/ref&gt;",iframeWindow);
	}
}

//Post text at caret by ob (textarea) - http://stackoverflow.com/users/56829/ob
//http://stackoverflow.com/questions/4456545/how-to-insert-text-at-the-current-caret-position-in-a-textarea
$.fn.insertAtCaret = function(text) {
    return this.each(function() {
        if (document.selection && this.tagName == 'TEXTAREA') {
            //IE textarea support
            this.focus();
            sel = document.selection.createRange();
            sel.text = text;
            this.focus();
        } else if (this.selectionStart || this.selectionStart == '0') {
            //MOZILLA/NETSCAPE support
            startPos = this.selectionStart;
            endPos = this.selectionEnd;
            scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos) + text + this.value.substring(endPos, this.value.length);
            this.focus();
            this.selectionStart = startPos + text.length;
            this.selectionEnd = startPos + text.length;
            this.scrollTop = scrollTop;
        } else {
            // IE input[type=text] and other browsers
            this.value += text;
            this.focus();
            this.value = this.value;    // forces cursor to end
        }
    });
};

//Post text at caret (iframe) by Shreyas - http://stackoverflow.com/users/113865/shreyas
//http://stackoverflow.com/questions/20002063/javascript-pasting-text-at-caret-in-wysiwyg-editor
if (editorVersion == 'Visual') {
	var iframeWindow = document.getElementById('cke_contents_wpTextbox1').getElementsByTagName('iframe')[0].contentWindow;
	function pasteHtmlAtCaret(html,windo) {
		windo = windo || window;
		var sel, range;
		if (windo.getSelection) {
			// IE9 and non-IE
			sel = windo.getSelection();
			console.log(sel);
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				console.log(range);
				range.deleteContents();

				// Range.createContextualFragment() would be useful here but is
				// non-standard and not supported in all browsers (IE9, for one)
				var el = windo.document.createElement("div");
				el.innerHTML = html;
				var frag = windo.document.createDocumentFragment(), node, lastNode;
				while ( (node = el.firstChild) ) {
					lastNode = frag.appendChild(node);
				}
				range.insertNode(frag);

				// Preserve the selection
				if (lastNode) {
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		} else if (windo.document.selection && windo.document.selection.type != "Control") {
			// IE < 9
			windo.document.selection.createRange().pasteHTML(html);
		}
	}
}