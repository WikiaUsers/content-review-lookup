/*
@name           Poll Archive Add-on
@namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
@author         T3CHNOCIDE
@description    Automatically archives main page polls to a selected page.
@include        http://*.wikia.com/*

Copyright (C) 2015 T3CHNOCIDE <http://community.wikia.com/wiki/User:T3CHNOCIDE>

This program is free software: you can copy and redistribute the
material in any medium or format, and/or remix, transform, and build
upon the material so long as the original author is attributed and 
resulting software is published under the same license.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

This software is published under the terms of the Creative Commons 
Attribution-ShareAlike 3.0 Unported license. If you did not receive
a copy of this license see <https://creativecommons.org/licenses/by-sa/3.0/>
*/

//Sets page title of polls and section location of poll table
var pollPage = "Project:Polls";
		
//Places archive button on main page poll for SYSOPs
if (wgUserGroups.indexOf("sysop") > -1 && wgPageName == "Main_Page") { 
	var userIsAdmin = true;
	$('div.ajax-poll').prepend('<input type="submit" id="archivePoll" value="Archive Poll" onclick="archivePoll()" style="float:right;">');
} else {
	var userIsAdmin = false;
}

//Fetches the names and total votes for each ballot options
//Parsing and returning them as an array
function pollResults() {	
	//Creates array of ballot option names
	var pollNames = $('.pollAnswerName').children('label');
	var namesArray = [];

	for (i = 0; i < pollNames.length; i++) { 
		namesArray.push(pollNames[i].innerHTML.split(">")[1].trim());
	}
	
	//Creates array of ballot option vote values
	var pollVotes = $(".pollAnswerVotes").children('span');
	var votesArray = [];

	for (i = 0; i < pollVotes.length; i++) { 
		votesArray.push(pollVotes[i].innerHTML);
	}
	
	//Matches ballot option names and vote values storing
	//results as array items
	var voteInfoArray = [];
	
	for (i = 0; i < namesArray.length; i++) {
		voteInfoArray.push(namesArray[i] + "[$%^&]" + votesArray[i]);
	}

	//Returns results as array
	return voteInfoArray;
}

//Fetches start date of current poll and converts to correct format
function pollDate() {	
	//Sets month names as list for indexing later
	var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	//Grabs and splits poll start date into array
	var pollStatement = $('div#ajax-poll-area').children().last().text();
	var statementDate = pollStatement.split('on ')[1].split(',')[0];
	var dateArray = statementDate.split(" ")
	
	//Saves day and month as integer through matching index on monthArray
	var statementDay = dateArray[0];
	var statementMonth = monthArray.indexOf(dateArray[1]) + 1;
	
	//Zero buffers day and month integers
	if (statementDay < 10) {
		statementDay = "0" + statementDay;
	}
	
	if (statementMonth < 10) {
		statementMonth = "0" + statementMonth;
	}
	
	//Returns data as DD/MM/YYYY format
	return statementDay + "/" + statementMonth + "/" + dateArray[2];
}

//Formats poll data and prepends to poll history on Project:Polls/Previous_polls
function archivePoll() {	
	if (userIsAdmin == true) {
		//Grabs the page contents of the current version, parses table and prepends
		//data from current main page poll in a readable format.
		$.get( "http://t3chbox.wikia.com/api.php", {'action':'query', 'prop':'revisions', 'titles':pollPage, 'rvprop':'timestamp|content', 'format':'json'}, 
			function( data ) { 
				//ajax get requests are asynchronous so all functions have to be performed
				//while the get request is in progress!
				
				//Sets the JSON response to relevant variable
				var jsonResponse = data; 
				
				//Retrieves the pageId of poll page by reading JSON key
				var pageId = Object.keys(jsonResponse["query"]["pages"])[0]; 
				
				//Parses JSON response to get page contents of current revision
				var pageContent = jsonResponse["query"]["pages"][pageId]["revisions"][0]["*"];
				
				//Divides poll page at start of table in order to prepend new poll results to table.
				var pageStart = pageContent.split("<!-- poll divide start -->")[0];
				var pageEnd = pageContent.split("<!-- poll divide start -->")[1];
				
				//Pulls results of current poll:
				//Total votes
				var totalVotes = $('div#ajax-poll-area').children().last().children().text();
				
				//Vote question and date
				var voteQuestion = $('.ajax-poll').children('.header').text();
				var voteDate = pollDate();
				
				//Ballot choice names and votes
				var pollVoteResults = pollResults();
				
				//Converts ballot results as percentage bars
				var pollPageResults = "";
				
				for (i = 0; i < pollVoteResults.length; i++) {
					pollPageResults += "{{PollResult\n|name=" + pollVoteResults[i].split("[$%^&]")[0] + "\n|value=" + pollVoteResults[i].split("[$%^&]")[1] + "\n|total=" + totalVotes + "\n}}\n"
				}
				
				//Collates poll data as table row
				var pollTotalResults = "\n\n|-\n|" + voteDate + "\n|" + voteQuestion + "\n|\n" + pollPageResults;
				
				//Reconstructs parsed page with new table data
				var reconstructedPollPage = pageStart + "<!-- poll divide start -->" + pollTotalResults + pageEnd;
				
				//Grabs edit tokens and posts new data back to Wikia server as an edit
				$.get( "http://t3chbox.wikia.com/api.php", {'action':'query', 'prop':'info', 'titles':'Main Page', 'intoken':'edit|delete|protect|move|block|unblock|email|import', 'format':'json'}, function( data ) {
					//Parses JSON response and saves edit token for later post request
					var tokenResponse = data;
					var pageId = Object.keys(tokenResponse["query"]["pages"])[0];
					var allTokens = tokenResponse["query"]["pages"][pageId];
					var editToken = allTokens["edittoken"];
					
					//Feeds collated data as edit to Wikia server using edit token
					$.post( "http://t3chbox.wikia.com/api.php", {'action':'edit', 'title':pollPage, 'summary':'Automated archive of main page poll using archive add-on.', 'text':reconstructedPollPage, 'token':editToken, 'format':'json'}, function( data ) {
						//Feeds back success data to original user
						if (data["edit"]["result"] == "Success") {
							alert("Poll successfully archived!");
						} else {
							alert("DE Error: 004 - Edit request unsuccessful. Please report to T3CHNOCIDE.");
						}
					}).fail(
						function() { 
							alert( "DW Error: 003 - Could not post collated poll data to server. Please report to T3CHNOCIDE." );
						});
				}).fail(
					function() { 
						alert( "DW Error: 002 - Could not retrieve edit token from API. Please report to T3CHNOCIDE." );
					});
				
			} , "json").fail(
				function() { 
					alert( "DW Error: 001 - Cannot fetch poll page contents. Please report to T3CHNOCIDE." );
				});
	} else {
		alert("DW Error: 000 - User does not have correct rights to archive poll. Please report to T3CHNOCIDE.")
	}
}

//Sets poll value to change to percentage on hover over. 
$('.poll-page-percent').hover(
  function() {
    $( this ).text( $( this ).data("poll-percent") );
  }, function() {
    $( this ).text( $( this ).data("poll-value") )
  }
);