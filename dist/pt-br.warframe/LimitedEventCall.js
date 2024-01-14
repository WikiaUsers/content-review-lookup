//Something we can pre-setup w/out on-day validation delays
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
} 
if(mm<10) {
    mm='0'+mm
} 
today = dd+'/'+mm+'/'+yyyy;
//Date in full DMY
var inputDate = new Date("01/04/2017");
var todaysDate = new Date(today);
if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // if the date equals afd's date
    importStylesheet('Wiki/Mediawiki:AFD.css');
    //Only if needed, still needs to go through review
    //importscript('Wiki/Mediawiki:Foo.js')
}
//else
//{
//alert("Somethings borked, check again");
//}