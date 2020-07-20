mw.util.addCSS('\
.mw-abuselog-var tt {font-weight:bold}\
.mw-abuselog-details-summary td.mw-abuselog-var-value div {background-color: #CCCCFF}\
tr.mw-abuselog-details-added_lines td div,\
tr.mw-abuselog-details-added_links td div\
 {background-color: #CFC}\
.mw-abuselog-details-removed_lines td div,\
.mw-abuselog-details-removed_links td div\
 {background-color: #FCC}\
tr.mw-abuselog-details-new_html td.mw-abuselog-var-value,\
tr.mw-abuselog-details-new_text td.mw-abuselog-var-value,\
tr.mw-abuselog-details-new_wikitext td.mw-abuselog-var-value\
 {background-color: #EFE}\
.mw-abuselog-details-old_html td.mw-abuselog-var-value,\
.mw-abuselog-details-old_text td.mw-abuselog-var-value,\
.mw-abuselog-details-old_wikitext td.mw-abuselog-var-value\
 {background-color: #FEE}\
div.mw-abuselog-edit-summary {font-style:italic}\
a[href*="&diff="] {font-weight:bold}\
')


//copy edit summary to the top
$(function(){
 mw.util.$content
 .find('tr.mw-abuselog-details-summary')
 .find('div.mw-abuselog-var-value')
 .clone()
 .attr('class', 'mw-abuselog-edit-summary')
 .insertBefore( mw.util.$content.find('table.diff') )
})