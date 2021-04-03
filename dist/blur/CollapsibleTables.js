/*<nowiki>*/
/**** class CollapsibleTables.js
 * (c) 2007 by Patrick Westerhoff [poke]
 *
 * This class allows to make tables collapsible and adds a show/hide button to
 * affected tables. Tables which class attribute contains 'collapsible' or
 * 'expandable' are affected by this class and can be collapsed; the latter
 * automatically hides the content of all sections.
 * Header rows are used to divide the table into sections which can be collapsed
 * separately. By default the first row of the table is interpreted as a header
 * row, however this can be overwritten by adding 'collapsible' to the class
 * attribute of header rows. You can also hide a section individually by default
 * when in 'collapsible' mode by using 'expandable' as the row's class name
 * instead.
 */

function CollapsibleTables ()
{
  var classCollapsible = 'collapsible';
  var classExpandable  = 'expandable';
  var linkTextShow     = '[show]';
  var linkTextHide     = '[hide]';
  
  var reCollapsible    = new RegExp( '(?:\\s|^)' + classCollapsible + '(?:\\s|$)' );
  var reExpandable     = new RegExp( '(?:\\s|^)' + classExpandable  + '(?:\\s|$)' );
  var sections         = new Array();
  
  // link element
  var linkElement               = document.createElement( 'a' );
  linkElement.style.fontSize    = '85%';
  linkElement.style.fontWeight  = 'normal';
  linkElement.style.width       = '3em';
  linkElement.style.cssFloat    = 'right';
  linkElement.style.styleFloat  = 'right';
  linkElement.style.textAlign   = 'center';
  linkElement.style.marginLeft  = '1em';
  linkElement.style.padding     = '0px 3px';
  linkElement.href              = 'javas' + 'cript:void(0);';
  
  initialize();
  
  /** private void initialize () :: initializes CollapsibleTables class **/
  function initialize ()
  {
    if ( wgIsArticle == false && window.location.href.indexOf( 'action=submit' ) < 0 )
      return;
    
    var docContent    = document.getElementById( 'bodyContent' ) || document.getElementById( 'article' ) || document.getElementById( 'mw_contentholder' );
    var tables        = docContent.getElementsByTagName( 'table' );
    var sectionId     = -1;
    var defaultStatus;
    
    for ( var i = 0, n = tables.length; i < n; i++ )
    {
      if ( reCollapsible.test( tables[i].className ) )
        defaultStatus = true;
      else if ( reExpandable.test( tables[i].className ) )
        defaultStatus = false;
      else
        continue;
      
      var tableRows    = tables[i].rows;
      var sectionFound = false;
      var status       = false;
      
      for ( var j = 0, m = tableRows.length; j < m; j++ )
      {
        if ( reCollapsible.test( tableRows[j].className ) )
          status = true;
        else if ( reExpandable.test( tableRows[j].className ) )
          status = false;
        else
        {
          if ( sectionFound )
          {
            sections[ sectionId ].content.push( tableRows[j] );
            tableRows[j].style.display = sections[ sectionId ].status ? '' : 'none';
          }
          
          continue;
        }
        
        var section     = new Object();
        section.header  = tableRows[j];
        section.content = new Array();
        section.status  = defaultStatus ? status : false;
        
        sections[ ++sectionId ] = section;
        sectionFound            = true;
        
        initHeaderRow( tableRows[j], sectionId, section.status );
      }
      
      if ( sectionFound == false )
      {
        var section       = new Object();
        section.header    = tableRows[0];
        section.content   = new Array();
        section.status    = defaultStatus;
        
        for ( var j = 1; j < tableRows.length; j++ )
        {
          section.content.push( tableRows[j] );
          tableRows[j].style.display = section.status ? '' : 'none';
        }
        
        sections[ ++sectionId ] = section;
        
        initHeaderRow( tableRows[0], sectionId, defaultStatus );
      }
    }
  }
  
  /** private void initHeaderRow ( headerRow, sectionId, sectionStatus ) :: adds show/hide button **/
  function initHeaderRow ( headerRow, sectionId, sectionStatus )
  {
    var lastCell, link;
    
    headerRow.id = 'collapsible-section_' + sectionId;
    lastCell     = headerRow.cells[ headerRow.cells.length - 1 ];
    link         = linkElement.cloneNode( false );
    link.onclick = toggleSection;
    link.appendChild( document.createTextNode( sectionStatus ? linkTextHide : linkTextShow ) );
    
    lastCell.insertBefore( link, lastCell.firstChild );
  }
  
  /** private void toggleSection () :: onclick event handler **/
  function toggleSection ()
  {
    var trHead  = this.parentNode.parentNode;
    var section = sections[ trHead.id.substr( 20 ) ];
    var content = section.content;
    var display = section.status ? 'none' : '';
      
    for ( var i = 0, n = content.length; i < n; i++ )
      content[i].style.display = display;
    
    section.status       = !section.status;
    this.firstChild.data = section.status ? linkTextHide : linkTextShow;
  }
}
/*</nowiki>*/