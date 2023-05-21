var time_d = new Date();
switch (time_d.getDay()){
    case 0: document.getElementsByTagName('body')[0].setAttribute("data-Day","Dimanche");    break;
    case 1: document.getElementsByTagName('body')[0].setAttribute("data-Day","Lundi");     break;
    case 2: document.getElementsByTagName('body')[0].setAttribute("data-Day","Mardi");   break;
    case 3: document.getElementsByTagName('body')[0].setAttribute("data-Day","Mercredi");   break;
    case 4: document.getElementsByTagName('body')[0].setAttribute("data-Day","Jeudi"); break;
    case 5: document.getElementsByTagName('body')[0].setAttribute("data-Day","Vendredi");    break;
    case 6: document.getElementsByTagName('body')[0].setAttribute("data-Day","Samedi");    break;
    default: document.getElementsByTagName('body')[0].setAttribute("data-Day","Error");     break;
}