function FindLiEbene(CurrentEbene, SearchEbene, UL){
    while (CurrentEbene > SearchEbene) {
        UL = UL.parentNode;
        CurrentEbene --;
    }
    while (CurrentEbene < SearchEbene) {
        var newUL = document.createElement("ol");
        UL.insertBefore(newUL, UL.lastChild);
        UL = newUL;
        CurrentEbene ++;
    }
    return UL;
}

TabVersion = document.getElementsByTagName("div");
for (var i=0; i < TabVersion.length; i++) {
    if (TabVersion[i].classList.contains("Version")) {
        TabVersion = TabVersion[i];
        break;
    }
}

Toc = TabVersion.getElementsByTagName("div")
for (var i=0; i < Toc.length; i++) {
    if (Toc[i].classList.contains("SWTabber")) {
        // Hier befinden wir uns in einem Legends oder Kanon-Tabber.
        var FindTOCPlace = Toc[i].getElementsByTagName("div")
        var NoTOCPlace = true;
        for (var j=0; j < FindTOCPlace.length; j++) {
            if (FindTOCPlace[j].classList.contains("TOC")) {
                FindTOCPlace = FindTOCPlace[j];
                NoTOCPlace = false;
                break;
            }
        }
        if (NoTOCPlace) { 
            var DIV_Box = document.createElement("div");
            DIV_Box.className = "TOC";
            Toc[i].insertBefore(DIV_Box, Toc[i].firstChild);
            FindTOCPlace = DIV_Box; 
        }
        var Inhaltsverzeichnis = document.createElement("ol");
        FindTOCPlace.insertBefore(Inhaltsverzeichnis, FindTOCPlace.lastChild);
        
        var Ebene = 0;
        for (var n=0; n < Toc[i].childNodes.length; n++){
            switch (Toc[i].childNodes[n].tagName){
                case "H2": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 0, Inhaltsverzeichnis);
                    Ebene = 0;
                    Listeneintrag = document.createElement("li");
                    Listeneintrag.innerHTML = Toc[i].childNodes[n].getElementsByTagName("span")[0].innerHTML;
                    Inhaltsverzeichnis.insertBefore(Listeneintrag, Inhaltsverzeichnis.lastChild);
                    break;
                case "H3": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 1, Inhaltsverzeichnis);
                    Ebene = 1;
                    Listeneintrag = document.createElement("li");
                    Listeneintrag.innerHTML = Toc[i].childNodes[n].getElementsByTagName("span")[0].innerHTML;
                    Inhaltsverzeichnis.insertBefore(Listeneintrag, Inhaltsverzeichnis.lastChild);
                    break;
                case "H4": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 2, Inhaltsverzeichnis);
                    Ebene = 2;
                    Listeneintrag = document.createElement("li");
                    Listeneintrag.innerHTML = Toc[i].childNodes[n].getElementsByTagName("span")[0].innerHTML;
                    Inhaltsverzeichnis.insertBefore(Listeneintrag, Inhaltsverzeichnis.lastChild);
                    break;
                case "H5": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 3, Inhaltsverzeichnis);
                    Ebene = 3;
                    Listeneintrag = document.createElement("li");
                    Listeneintrag.innerHTML = Toc[i].childNodes[n].getElementsByTagName("span")[0].innerHTML;
                    Inhaltsverzeichnis.insertBefore(Listeneintrag, Inhaltsverzeichnis.lastChild);
                    break;
                case "H6": 
                    Inhaltsverzeichnis = FindLiEbene(Ebene, 4, Inhaltsverzeichnis);
                    Ebene = 4;
                    Listeneintrag = document.createElement("li");
                    Listeneintrag.innerHTML = Toc[i].childNodes[n].getElementsByTagName("span")[0].innerHTML;
                    Inhaltsverzeichnis.insertBefore(Listeneintrag, Inhaltsverzeichnis.lastChild);
                    break;
            }
        }
    }
}