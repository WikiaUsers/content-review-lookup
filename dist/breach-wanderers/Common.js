/* Tooltips configuration */
window.tooltips_config = {
    offsetX: 40,
    offsetY: 20,
    waitForImages: true,
	noCSS: true,
};

/* Custom Tooltips */
window.tooltips_list = [
    {
        classname: 'item-tooltip',
        parse: '{'+'{Item-Tooltip-Caller|<#name#>}}',
    },
	{
        classname: 'card-tooltip',
        parse: '{'+'{Card-Tooltip-Caller|<#name#>}}',
    },
	{
        classname: 'keyword-tooltip',
        parse: '{'+'{Keyword-Tooltip-Caller|<#name#>}}',
    },
	{
        classname: 'monster-tooltip',
        parse: '{'+'{Monster-Tooltip-Caller|<#name#>}}',
    },
];

/* Sets the top property for stickyHeader tables */
function setStickyHeaderTop() {
  const stickyTables = document.getElementsByClassName('stickyHeader');
  const headHeight = document.getElementById('mw-header-container').offsetHeight;
  for (var i = 0; i < stickyTables.length; i++) {
    const firstRow = stickyTables[i].getElementsByClassName('headerRow-0');
    const secondRow = stickyTables[i].getElementsByClassName('headerRow-1');
    var firstHeight = 0;
    if (firstRow.length > 0) {
      firstHeight = firstRow[0].offsetHeight;
      const firstHeaders = firstRow[0].getElementsByTagName('th');
      for (var j = 0; j < firstHeaders.length; j++) {
        firstHeaders[j].style.top = headHeight + 'px';
      }
      if (secondRow.length > 0) {
        const secondHeaders = secondRow[0].getElementsByTagName('th');
        var secondHeight = headHeight + firstHeight;
        for (var j = 0; j < secondHeaders.length; j++) {
          secondHeaders[j].style.top = secondHeight + 'px';
        }
      }
    }
  }
}
$(document).ready(function () {
	if (document.getElementsByClassName("stickyHeader").length > 0) {
		setStickyHeaderTop();
		$(window).resize(setStickyHeaderTop);
	}
});