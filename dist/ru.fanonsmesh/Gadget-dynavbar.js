// <pre> ============================================================
/* 12 May 2012 -- adapted for ResourceLoader & jQuery by XPQ */
 
window.dynavbar  = {
 
  // set up the words in your language
  Hide: '[скрыть]',
  Show: '[показать]',
 
 
  // Максимальное число развёрнутых шаблонов
  // (если их будет больше, чем dynavbar.Max,
  // то они все будут свёрнуты автоматически)
  // Пример:
  // Max: 0, // сворачивать всегда
  // Max: 1, // сворачивать, если на странице более одного шаблона
 
  Max: 2,
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     idx: the index of navigation bar to be toggled
  toggle: function(idx) {
     var NavToggle = $("#NavToggle" + idx)[0];
     var NavFrame = $("#NavFrame" + idx)[0];
 
     if(!NavFrame || !NavToggle)
       return false;
 
     if(NavToggle.firstChild.data == dynavbar.Hide)
     {
         $(NavFrame).children().filter('.NavContent, .NavPic').hide();
         NavToggle.firstChild.data = dynavbar.Show;
     }
     else if(NavToggle.firstChild.data == dynavbar.Show)
     {
         $(NavFrame).children().filter('.NavContent, .NavPic').show();
         NavToggle.firstChild.data = dynavbar.Hide;
     }
  },
 
  collapseTable: function( tableIndex )
  {
     var Button = $("#collapseButton" + tableIndex)[0];
     var Table = $("#collapsibleTable" + tableIndex)[0];
 
     if(!Table || !Button)
       return false;
 
     var Rows = $($(Table).find('tr').toArray().splice(1));
 
     if ( Button.firstChild.data == dynavbar.Hide ) {
         Rows.hide();
         Button.firstChild.data = dynavbar.Show;
     }
     else
     {
         Rows.show();
         Button.firstChild.data = dynavbar.Hide;
     }
  }
};
 
/* Добавить ссылки [показать]/[скрыть] */
$(function() {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = $("div.NavFrame");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {  
             indexNavigationBar++;
 
            /* Автоматическое сворачивание */
            var isCollapsed = $(NavFrame).hasClass("collapsed");
            if(isCollapsed)
                $(NavFrame).children().filter('.NavContent, .NavPic').hide();
 
            var NavToggle = $('<a/>')
                 .attr('class', 'NavToggle')
                 .attr('id', 'NavToggle' + indexNavigationBar)
                 .attr('href', 'javascript:dynavbar.toggle(' + indexNavigationBar + ')')
                 .append(isCollapsed ? dynavbar.Show : dynavbar.Hide);
 
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if ($(NavFrame.childNodes[j]).hasClass("NavHead"))
                 NavFrame.childNodes[j].appendChild(NavToggle[0]);
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
     }
 
     // if more Navigation Bars found than Default: hide all
     if (dynavbar.Max < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) dynavbar.toggle(i);
     }
});
 
$(function(){
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = $("table.collapsible");
 
     for ( var i = 0; i < Tables.length; i++ ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button = $('<span/>')
                 .attr('style', 'float: right; font-weight: normal; text-align: right; width: 6em;')
                 .append($('<a/>')
                     .attr('id', 'collapseButton' + tableIndex)
                     .attr('href', 'javascript:dynavbar.collapseTable(' + tableIndex + ');')
                     .append(dynavbar.Hide)
                 )[0];
 
             var Header = $($(Tables[i]).find('tr')[0]).find('th')[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
     }
 
     for(var i = 0;  i < tableIndex; i++ )
     {
         if ( $(NavigationBoxes[i]).hasClass("collapsed") || ( tableIndex >= dynavbar.Max && $(NavigationBoxes[i]).hasClass( "autocollapse" ) ) )
             dynavbar.collapseTable( i );
     }
});
 
/* </pre> */