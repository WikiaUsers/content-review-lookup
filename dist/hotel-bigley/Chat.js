// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to Hotel Bigley!'
 
// SCRIPT SETTINGS
// Due to how these scripts work, variable-type settings should be set before import
ajaxEmoticonsInterval = 180000; /* 3 minutes = 180 seconds = 180,000ms */
 
 
 
 
// IMPORTS
importArticles({
  type: 'script',
  articles: [
    'u:dev:ChatOptions/code.js',
    'u:dev:ChatTags/code.js',
    'u:dev:AjaxEmoticons/code.js',
  ]
});
 
// Add the topic to the page
// Credit to MLP:FiM Wiki for this
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()