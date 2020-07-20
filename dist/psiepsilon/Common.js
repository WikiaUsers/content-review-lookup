/**Testing**/ 


$("#mw-input-wp-skin option[value='monobook']").replaceWith('<option value="monobook">Psuedo-Vector</option>');   
 
/************************************************************************************/                                                                   
//Use DD/MM/YY format for blog time listing 
$(function() {
    $('.WikiaBlogListingPost .author-details span').each(function() {
        var $a = $(this).children('a'), date = $(this).text().split(' by ')[0].split(' ');
        $(this).html(date[1].replace(',', ' ') + date[0] + ' ' + date[2] + ' by ' + $a[0].outerHTML);
    });
});  
/************************************************************************************/                                                                                     
   





/************************************************************************************/                                                                                                        
//Dev Tools           
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: 'MediaWiki:StdSums'
}; 
window.monoBookText = "Pseudo-Vector"; 
importArticles({
    type: 'script',
    articles: [
         'u:dev:ExternalImageLoader/code.js',                   
         'u:dev:NullEditButton/code.js',
         'u:dev:Standard_Edit_Summary/code.js', 
         'u:dev:SkinSwitchButton/code.js',        
         'u:dev:QQX/code.js',
         'u:dev:View_Source/code.js', 
         'w:c:dev:ReferencePopups/code.js',
         'w:c:dev:RevealAnonIP/code.js'
    ]
}); 
/************************************************************************************/