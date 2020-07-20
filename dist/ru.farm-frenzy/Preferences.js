
//prevent linkless signature
$('#mw-input-wpfancysig').change( checkFancySig )

checkFancySig()

function checkFancySig(){
 if(
   $('#mw-input-wpfancysig').attr('checked')
   && ! /\[\[|{{/.test( $('#mw-input-wpnickname').val() ) 
 ){
   $('#mw-input-wpfancysig').removeAttr('checked')
   $('#need-link').addClass('error')
 }else{
   $('#need-link').removeClass('error')
 }
}


//make "interwiki" gadgets act like radio buttons
rG =  $('#mw-input-wpgadgets-iwhints').nextUntil('h1','input').andSelf()

rG.change( function(e){
 if( ! this.checked ) return
 for (var i=0; i<rG.length; i++)
    if( rG[i] != this )  rG[i].checked = false
})