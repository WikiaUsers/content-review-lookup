/* Any JavaScript here will be loaded for all users on every page load. */

//Function to properly get the class name
document.getElementsByClassNameC = function(cl)
{
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++)
	{
		var classes = elem[i].className;
			if (myclass.test(classes))
 			{
				retnode.push(elem[i]);
			}
	}
	return retnode;
};

// Check if there is at least one instance of the class "source-xml" on the page
if(document.getElementsByClassNameC('source-xml')[0].innerHTML)
{
	// Cycle through each instance of the occurance
	for(var i=0; i < document.getElementsByClassNameC('source-xml').length; i++)
	{
		// Make GAE Only features red
		document.getElementsByClassNameC('source-xml')[i].innerHTML = document.getElementsByClassNameC('source-xml')[i].innerHTML.replace(/\n?\s*<span class="sc-1">&lt;!-- Start GAE Only --&gt;<\/span>\n?/gi, '<div style="background-color: #F99;">');
		document.getElementsByClassNameC('source-xml')[i].innerHTML = document.getElementsByClassNameC('source-xml')[i].innerHTML.replace(/\n?\s*<span class="sc-1">&lt;!-- End GAE Only --&gt;<\/span>\n?/gi, '</div>');
		// Make MG Only features blue
		document.getElementsByClassNameC('source-xml')[i].innerHTML = document.getElementsByClassNameC('source-xml')[i].innerHTML.replace(/\n?\s*<span class="sc-1">&lt;!-- Start MG Only --&gt;<\/span>\n?/gi, '<div style="background-color: #90E5D8;">');
		document.getElementsByClassNameC('source-xml')[i].innerHTML = document.getElementsByClassNameC('source-xml')[i].innerHTML.replace(/\n?\s*<span class="sc-1">&lt;!-- End MG Only --&gt;<\/span>\n?/gi, '</div>');
		// Make GAE + MG Only features purple
		document.getElementsByClassNameC('source-xml')[i].innerHTML = document.getElementsByClassNameC('source-xml')[i].innerHTML.replace(/\n?\s*<span class="sc-1">&lt;!-- Start GAE\+MG Only --&gt;<\/span>\n?/gi, '<div style="background-color: #E6BFFF;">');
		document.getElementsByClassNameC('source-xml')[i].innerHTML = document.getElementsByClassNameC('source-xml')[i].innerHTML.replace(/\n?\s*<span class="sc-1">&lt;!-- End GAE\+MG Only --&gt;<\/span>\n?/gi, '</div>');
	}
}