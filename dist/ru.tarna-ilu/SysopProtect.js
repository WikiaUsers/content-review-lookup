//avoid [move=autoconfirmed] in protection logs
 var inp = document.getElementById('mwProtect-level-edit') 
 if (inp) addHandler(inp, 'change', noMoveAutoconfirmedProtection)
 function noMoveAutoconfirmedProtection(){
   var inp = document.getElementById('mwProtectUnchained')
   if (!inp || inp.checked) return
   inp = document.getElementById('mwProtect-level-move')
   if (inp && inp.selectedIndex==1) inp.selectedIndex = 0
 }