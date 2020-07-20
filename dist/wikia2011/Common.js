/* Any JavaScript here will be loaded for all users on every page load. */

if(wgPageName == 'Top_10_list:Best_Wikis_of_2011' ) {

$('#article-comm').attr('disabled','disabled').text('Voting has been closed per Xean\'s comment below.');
$('#article-comm-submit').attr('disabled','disabled');
$('button.VoteButton').attr('disabled','disabled');
$('button.VoteButton').remove();
$('.article-comm-reply').remove();
$('.NewItemForm').remove();
}