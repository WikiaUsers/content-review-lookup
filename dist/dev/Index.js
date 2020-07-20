//Thanks to Fngplg for help with parsing templates/html.
//<nowiki>
//This is just for testing so i can see if the new version is loaded, hence it is commented out.
//$('#testing_button').replaceWith('<input type="button" id="Submit" value="V1.0.0">');

//On document ready, Find a div called index-units and set its children as var: commands,
//and the index-output's child as output variable.
$(document).ready(function() {
  var commands = $('#index-units').children();
  var output = $('#index-units').children("#index-output");
  Index(commands, output);
});

// This is a container so if i ever re-write the above to loop over each index-units div, they won't
//cross-talk... since this script is async in nature, i want to keep it like that but isolate it.
function Index(commands, output) {
  //set the integer to 0, execute the AJAX loop
  //It loops via re-calling the command to force it to run in-order otherwise since the a in ajax
  //stands for asynchronous, we're going to have javascript executing in odd times. 
  var i = 0;
  loadNext(commands, output, []); 
  
  //TL;DR it gets the Queries each category api page, gets a list and either adds to, removes from 
  //or filters the main array with it. Then it turns it into a template command which can be
  //set to different templates and methods of seperation / extra args so the script's output can be 
  //modified using different templates.
  function loadNext(commands, output, mainarray) {
      var command = $(commands[i]), //Command, or basically just the div.
          mode = command.data("command"), //Add, Remove or Filter.
          category = command.data("cat"),
          base_url = 'https://aigis.wikia.com/api.php?format=json&action=query';
      base_url += '&list=categorymembers&cmlimit=5000&cmtitle=Category:'; //OCD
      
     //Makes the loop go for as long as there are divs, makes sure the div has a category and mode
    //to work with. Basically, making sure it's not the output, really.
    if (i < commands.length && mode && category) {
      $.get(base_url+category, function(data, textStatus, jqXHR) { //AJAX. Query the MW API.
          var pagelist = data.query.categorymembers; //list of pages in the category
          var temp = [];
          if (mode && mode != 'add') { //checks if there is a mode, then makes sure it is not add.
            for (var ii = 0; ii < mainarray.length; ii++) {
              var a = mainarray[ii];                         //we grab a value from the main array
              var match = false;                            //and make sure match is set to false
              for (var iii = 0; iii < pagelist.length; iii++) { //then iterate through the new cat
                var b = pagelist[iii].title;                   //value by value
                if (a == b) {               //and check each value to see if there is a duplicate
                  match = true;            //and if there is we set match to true
                }
              } //We check what mode we are on and determine if we add to the main array if it 
                //matches or not.
              if (mode === "remove" && match === false) {
                temp.push(a);
              } else if (mode === "filter" && match === true) {
                temp.push(a);
              }
            }  //But if the mode is add we basically just add them and make sure there are no 
              //dupicate entries. Same methodology as before, really. not much point explaining.
          } else if (mode && mode == 'add') {
            temp = mainarray;
            for (var ii = 0; ii < pagelist.length; ii++) {
              var a = pagelist[ii].title;
              var match = false;
              for (var iii = 0; iii< temp.length; iii++){
                var b = temp[iii];
                if(a == b){
                  match = true;
                }
              }
              if (match === false){
                temp.push(pagelist[ii].title);
              }
            }
          }
          if (!mode) {temp = mainarray}
          loadNext(commands, output, temp);
        }
      );
      i++; //incriments our integer each loop.
    } else {
      var output_text,
          prefix = command.data("prefix") || '',      //Prefix, aka what template to feed output to.
          suffix = command.data("suffix") || '',     //Suffix, Any additional modes, basically.
          spacer = command.data("seperator") || ''; //Do we want a massive list or individual args?
      output_text = prefix; // start making the command, start with the template head
                           //then we fill the template with arguments
      $.each(mainarray, function(i, val){
        if (val.length>0){
          output_text += spacer + val;
        }
      });
      output_text += suffix; //and we close it off with any extra modes
       //now we give it the old curley sandwitch and send it off to be parsed by the API, after
      //we escape it so page-vandals can't execute random html code inside it maliciously. 
      parse_wikitext(mw.html.escape('{{'+output_text+'}}'), output); 
    }
  }
   //This is the last function. It takes the template and makes the api parse it, then it
  //turns it into html since if it parses it alone, it still won't be html for us to display.
  function parse_wikitext (template, output){
    var api = new mw.Api();
    api.get( {
      action: 'parse',
      text: template
    } ).done ( function ( data ) {
      $('<div>', {class: 'xss-div', html: data.parse.text['*']}).appendTo($(output));
    } );
  }
}