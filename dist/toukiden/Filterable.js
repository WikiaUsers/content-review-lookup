importScriptPage ("MediaWiki:Highlight.js");
function contains(str,test)
{
  var str_l=str.toLowerCase();
  var test_l=test.toLowerCase();
  return str_l.indexOf(test_l)>=0;
}
$( "table.filterable" ).each(function ( i, e ) 
{
    $(e).before("<label for=\"filter_" + i + "\">Filter Table(Use double quotes to escape space)</label><input type=\"text\" id=\"filter_" + i + "\"/>");
    //$("<label for=\"filter_" + i + "\">Filter Table(Use double quotes to escape space)</label><input type=\"text\" id=\"filter_" + i + "\"/>").prependTo($(e).parent());
    $("#filter_" + i) .keyup(function () 
    {
        //var data = this.value.split(" ");
        var data =  this.value.match(/("[^"]+"|[^ ]+)/g);
        data= data||[];//prevent null results
        for (var d = 0; d < data.length; ++d) {
            data[d]=data[d].replace(/"/g,'');
        }
 
        var jo = $("tbody",e).not(':has(thead)').find("tr");
        if (this.value == "") {
            
            jo.unhighlight();
            jo.show();
            return;
        }
        jo.hide();
        jo.filter(function (i, v) 
        {
 
            var $t = $(this);
            
            $t.unhighlight();
            for (var d = 0; d < data.length; ++d) {
            
                $t.highlight(data[d], { caseSensitive: false });
                if(!contains($t.text(),data[d]))
                {
                    return false;
                }
            }
            return true;
        })
        .show();
    })
});