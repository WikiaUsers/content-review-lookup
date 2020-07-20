var time_d = new Date();
switch (time_d.getDay()){
    case 0: document.getElementsByTagName('body')[0].setAttribute("data-Day","Sonntag");    break;
    case 1: document.getElementsByTagName('body')[0].setAttribute("data-Day","Montag");     break;
    case 2: document.getElementsByTagName('body')[0].setAttribute("data-Day","Dienstag");   break;
    case 3: document.getElementsByTagName('body')[0].setAttribute("data-Day","Mittwoch");   break;
    case 4: document.getElementsByTagName('body')[0].setAttribute("data-Day","Donnerstag"); break;
    case 5: document.getElementsByTagName('body')[0].setAttribute("data-Day","Freitag");    break;
    case 6: document.getElementsByTagName('body')[0].setAttribute("data-Day","Samstag");    break;
    default: document.getElementsByTagName('body')[0].setAttribute("data-Day","Error");     break;
}