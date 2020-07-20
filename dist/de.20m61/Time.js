var time_d = new Date();
var Wochentag = '';
switch (time_d.getDay()){
    case 0: Wochentag = "Sonntag";    break;
    case 1: Wochentag = "Montag";     break;
    case 2: Wochentag = "Dienstag";   break;
    case 3: Wochentag = "Mittwoch";   break;
    case 4: Wochentag = "Donnerstag"; break;
    case 5: Wochentag = "Freitag";    break;
    case 6: Wochentag = "Samstag";    break;
    default: Wochentag = "Error";     break;
}
document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className + ' ' + Wochentag; 
if ( time_d.getTime() > 1413226376466) location.href = "http://de.thewalkingdeadtv.wikia.com/";