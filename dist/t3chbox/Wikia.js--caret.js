//USAGE:
//before the save:
insertAtCursor("myIframe",'<img src="images/marker-autosave.gif" id="caret" />', 0); //change 0 to 1 if you want the user's selection to be replaced by the img

//after the save:
resetCaret("myIframe");


function insertAtCursor(iframename, text, replaceContents) {
      if(replaceContents==null){replaceContents=false;}
      if(!replaceContents){//collapse selection:
         var sel=document.getElementById(iframename).contentWindow.getSelection()
         sel.collapseToStart()
      }
      document.getElementById(iframename).contentWindow.document.execCommand('insertHTML', false, text);
};


function resetCaret(iframename){
      var iframe=document.getElementById(iframename).contentWindow
      var referenceNode = iframe.document.getElementById("caret");
      if(referenceNode){
         var sel=document.getElementById(iframename).contentWindow.getSelection()
         //alert(sel.focusNode)
     
         if(sel.focusNode){//firefox:
  var range=sel.getRangeAt(0);
         }else{//chrome:
  var range=iframe.document.createRange()
         }
      range.selectNode(referenceNode);
      range.deleteContents();
      }
}