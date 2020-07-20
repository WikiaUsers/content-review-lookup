//                                                      //
//          Выборочная активация скриптов               //
//          Автор: АбырвалГ#3393 (Discord)              //
//      [[w:c:ru.dungeoncrusher:Участник:Абырвалг11]]   //
//                                                      //
 
window.onload = function () {
    if (document.getElementById("calc_table_out") &&
        document.getElementById("hero_calc_param")) {
        init();
        updateHeroStats();
       } 
    if (document.getElementById("siegeClock")) {
        initSiegeTimer();
       }
 
};