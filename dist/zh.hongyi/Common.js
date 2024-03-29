/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
var titles = document.getElementById('tab-header').getElementsByTagName('li');
var divs = document.getElementById('tab-content').getElementsByClassName('dom');

  
$(document).on('click', '#zero',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[0].className = 'selected';
            divs[0].style.display = 'block';
});
$(document).on('click', '#one',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[1].className = 'selected';
            divs[1].style.display = 'block';
});
$(document).on('click', '#two',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[2].className = 'selected';
            divs[2].style.display = 'block';
});
$(document).on('click', '#three',function(){ 
           for(var j=0; j<titles.length; j++){
                titles[j].className = '';
                divs[j].style.display = 'none';
            }
            titles[3].className = 'selected';
            divs[3].style.display = 'block';
});

/* Any JavaScript here will be loaded for all users on every page load. */
/*模板来自 CyberPunk
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.ui.tabs'], function() {
  $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
 
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.match(/portal_sliderlink-(\d+)/)[1]);
    
    // Allow links as tabs
    $(".ui-tabs li a.ui-tabs-anchor").each(function(_, e) {
      if (!$(e).attr("href").startsWith("#"))
        $(e).unbind("click");
    });
    
    console.log("Sliding to " + this.className.match(/portal_sliderlink-(\d+)/)[1]);
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});

/* lockdown for reference popup configuration */
((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;