/* <pre> */

var DEBUGMSG = '';
//alert('Debug Tools loaded');

function qDebugMsgLn(message){
    DEBUGMSG += message + '<br>';
}

function printDebugMsg(){
    document.getElementById('debugBody').innerHTML += DEBUGMSG;
    DEBUGMSG = '';
}


/* </pre> */