//Что-то, что мы можем предварительно настроить без задержек проверки в день
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //Январь 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd='0'+dd
} 
if(mm<10) {
    mm='0'+mm
} 
today = dd+'/'+mm+'/'+yyyy;
//Дата в полном объеме DMY
var inputDate = new Date("01/04/2017");
var todaysDate = new Date(today);
if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // если дата равна afd's дате
    importStylesheet('Wiki/Mediawiki:AFD.css');
    //Только если необходимо, еще нужно пройти проверку
    //importscript('Wiki/Mediawiki:Foo.js')
}
//else
//{
//alert("Что-то произошло, проверьте еще раз");
//}