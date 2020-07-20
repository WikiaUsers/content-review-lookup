/* Il codice JavaScript inserito qui viene caricato da tutti gli utenti ad ogni visualizzazione di pagina. */

/*RailWAM from dev.fandom.com  */
window.railWAM = {
    logPage: "Project:WAM Log",
    lang: "it",
    showLogAlert: false,
    autoLogForUsers: "Daeron_del_Doriath",
};

/*Rail discussion feed from dev.fandom.com*/
window.discussionsModuleConfig = {
	size : 5,
	mostrecent : false,
	/*catid: */ 
};

/*in standard pages appended after wiki activity module; in wiki activity page appended right before insigths module */
mw.hook('discussionsModule.added').add(function($module) {
    // Module addition
    if ($('.insights-module').exists()) {
        $module.insertBefore('.insights-module');
    } else {
        $module.appendTo('#WikiaRail');
    }
});