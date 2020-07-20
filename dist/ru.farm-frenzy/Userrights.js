//for [[special:userrights]], called from [[MediaWiki:Group-sysop.js]]

$(function(){

 mw.util.addCSS('label.unnecessary {color:red}')

 //per [[MediaWiki:Userrights-groups-help]]
 var dep = { //all: + sysop
  autoeditor: ['editor', 'bot'],
  uploader:   ['filemover', 'closer'],
  suppressredirect: ['filemover', 'closer', 'bot'],
  rollbacker: [],    
  filemover: [], 
  closer: []
 } 

 var frm = $('#mw-userrights-form2')

 checkFlags()
 frm.on('click keyup', checkFlags)

 
 function checkFlags(){
   frm.find('label').removeClass('unnecessary')
   for( var flag in dep ){
     var deps = dep[flag]
     deps.push('sysop')     
     for( var i=0; i<deps.length; i++ )
       if( $('#wpGroup-'+flag   ).prop('checked')
        && $('#wpGroup-'+deps[i]).prop('checked') )
           frm.find('label[for="wpGroup-'+flag+'"]').addClass('unnecessary')
   }
 }

})