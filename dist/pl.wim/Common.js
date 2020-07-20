/* <pre> */
/* tooltips and access keys */
ta = new Object();
ta['pt-userpage'] = new Array('.','Moja strona użytkownika, tylko moja!');
ta['pt-anonuserpage'] = new Array('.','Strona użytkownika dla numeru ip, spod którego edytujesz');
ta['pt-mytalk'] = new Array('n','Moja dyskusja');
ta['pt-anontalk'] = new Array('n','Dyskusja adresu IP');
ta['pt-preferences'] = new Array('','Preferencje');
ta['pt-watchlist'] = new Array('l','Lista stron, na których obserwujesz zmiany');
ta['pt-mycontris'] = new Array('y','Wkład użytkownika');
ta['pt-login'] = new Array('o','Jest zalecane, abyś się zalogował, aczkolwiek logowanie nie jest konieczne.');
ta['pt-anonlogin'] = new Array('o','Jest zalecane, abyś się zalogował, aczkolwiek logowanie nie jest konieczne.');
ta['pt-logout'] = new Array('o','Wylogowanie');
ta['ca-talk'] = new Array('t','Dyskusja tej strony');
ta['ca-edit'] = new Array('e','Możesz edytować tę stronę. Użyj podglądu przed zapisaniem.');
ta['ca-addsection'] = new Array('+','Dodaj komentarz do tej dyskusji.');
ta['ca-viewsource'] = new Array('e','Ta strona jest zabezpieczona. Możesz zobaczyć jej źródło.');
ta['ca-history'] = new Array('h','Wcześniejsza wersja strony.');
ta['ca-protect'] = new Array('=','Zabezpiecz stronę');
ta['ca-delete'] = new Array('d','Usuń stronę');
ta['ca-undelete'] = new Array('d','Odtwórz edycje tej strony sprzed usunięcia');
ta['ca-move'] = new Array('m','Przenieś tę stronę');
ta['ca-watch'] = new Array('w','Dodaj stronę do listy obserwowanych');
ta['ca-unwatch'] = new Array('w','Usuń stronę z listy obserwowanych');
ta['search'] = new Array('f','Przeszukaj wiki');
ta['p-logo'] = new Array('','Strona główna');
ta['n-mainpage'] = new Array('z','Odwiedź stronę główną');
ta['n-portal'] = new Array('','O projekcie, o to, co możesz pisać i gdzie znaleźć potrzebne rzeczy');
ta['n-currentevents'] = new Array('','Tak, tutaj jest artykuł na medal. Co tydzień inny, jeszcze lepszy.');
ta['n-recentchanges'] = new Array('r','Lista ostatnich zmian na tej Wikii.');
ta['n-randompage'] = new Array('x','Wybierz stronę za mnie!');
ta['n-help'] = new Array('','Strony pomocy.');
ta['n-sitesupport'] = new Array('','Wspomóż nas, no śmiało.');
ta['t-whatlinkshere'] = new Array('j','Lista wszystkich stron, które zawierają link do tej strony');
ta['t-recentchangeslinked'] = new Array('k','Ostatnie zmiany na stronach, które linkują do tej strony');
ta['feed-rss'] = new Array('','RSS feed dla tej strony');
ta['feed-atom'] = new Array('','Atom feed dla tej strony');
ta['t-contributions'] = new Array('','Zobacz wkład tego użytkownika.');
ta['t-emailuser'] = new Array('','Wyślij e-mail do tego użytkownika.');
ta['t-upload'] = new Array('u','Załaduj grafikę lub media');
ta['t-specialpages'] = new Array('q','Lista wszystkich stron specjalnych');
ta['ca-nstab-main'] = new Array('c','Zobacz stronę');
ta['ca-nstab-user'] = new Array('c','Zobacz stronę użytkownika');
ta['ca-nstab-media'] = new Array('c','Zobacz stronę z mediami');
ta['ca-nstab-special'] = new Array('','To jest stona specjalna. Nie możesz jej samodzielnie edytować.');
ta['ca-nstab-wp'] = new Array('a','Zobacz stronę meta');
ta['ca-nstab-image'] = new Array('c','Zobacz stronę grafiki');
ta['ca-nstab-mediawiki'] = new Array('c','Zobacz komunikat systemowy');
ta['ca-nstab-template'] = new Array('c','Zobacz szablon');
ta['ca-nstab-help'] = new Array('c','Zobacz stronę pomocy');
ta['ca-nstab-category'] = new Array('c','Zobacz stronę kategorii');


// ============================================================
 // BEGIN Dynamic Navigation Bars (experimantal)
 // pochodzi z http://en.wikipedia.org/wiki/MediaWiki:Monobook.js
 // autorzy: http://en.wikipedia.org/w/index.php?title=MediaWiki:Monobook.js&action=history
 // licencja: GFDL
 // set up the words in your language
 var NavigationBarHide = '[ Ukryj ]';
 var NavigationBarShow = '[ Pokaż ]';
 
 // set up max count of Navigation Bars on page,
 // if there are more, all will be hidden
 // NavigationBarShowDefault = 0; // all bars will be hidden
 // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
 var NavigationBarShowDefault = 1; 
 
 // shows and hides content and picture (if available) of navigation bars
 // Parameters:
 //     indexNavigationBar: the index of navigation bar to be toggled
 function toggleNavigationBar(indexNavigationBar)
 {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
    if (!NavFrame || !NavToggle) {
        return false;
    }
 
    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
        }
    NavToggle.firstChild.data = NavigationBarHide;
    }
 }
 
 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {
 
            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
            
            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(
              var j=0; 
              j < NavFrame.childNodes.length; 
              j++
            ) {
              if (NavFrame.childNodes[j].className == "NavHead") {
                NavFrame.childNodes[j].appendChild(NavToggle);
              }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    // if more Navigation Bars found than Default: hide all
    if (NavigationBarShowDefault < indexNavigationBar) {
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
        }
    }
 
 }
 
 addOnloadHook(function(){createNavigationBarToggleButton();});
 
 // END Dynamic Navigation Bars
 // ============================================================


/*</pre>*/