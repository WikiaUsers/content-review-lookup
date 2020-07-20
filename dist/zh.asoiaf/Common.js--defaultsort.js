  /* this script supports the function of DEFAULTSORT button on classic editor page */
  if (wgAction == 'submit' || wgAction == 'edit')  {
    var $save = $('#wpSave');
    var $combo = $('<a id="translate"  href="javascript:Button2_onclick();"><span class ="button translate control-button even secondary">DEFAULTSORT</span></a>')
    .insertAfter($save);
    /* Common.js/pinyin.js  is our pinyin table.*/
    if (typeof CC2PY == 'undefined'){
      importArticles({
        type: "script",
        articles: [
        "MediaWiki:Common.js/pinyin.js",
        ]
      });}
    }
    /* handle DEFAULTSORT button onclick event */
    function Button2_onclick() {
      try{
        var hz = wgPageName;
        var i = hz.indexOf(":");
        if (i>-1){
          hz = hz.substring(i+1);
        }
        var temp = capitaliseFirstLetter(trim1(CC2PY(hz)));
        var str = "{{DEFAULTSORT:"+temp+"}}";
        var text = $('#wpTextbox1').val();
        $('#wpTextbox1').val(text+str);
        alert("添加"+str+"成功");
      }
      catch(e){
       alert("拼音表加载中，请10S后再试");
     }
   }
   function trim1 (str) {
    return str.replace(/\s/g,'').toLowerCase();
  }
  function capitaliseFirstLetter(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }