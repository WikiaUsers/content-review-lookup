//Должности
$(function() {
 var rights = {};
 
 
   //Участники, имеющие более одного статуса
 rights["MorganFyres"]                     = ["БОТ"];
 
  if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {
 
        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
});