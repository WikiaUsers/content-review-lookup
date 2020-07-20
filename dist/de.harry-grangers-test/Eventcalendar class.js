function Eventcalendar() {
    if(typeof this.init == 'function') {
        this.init();
    }
}
//Config
Eventcalendar.prototype.URL = 'MediaWiki:' + Eventcalendar.constructor.name + '.js?action=raw;

//Date
Eventcalendar.prototype.currentDate = new Date();
Eventcalendar.prototype.currentMonth = Eventcalendar.prototype.currentDate.getMonth();
Eventcalendar.prototype.currentDay = Eventcalendar.prototype.currentDate.getDate();
Eventcalendar.prototype.currentWeekDay = Eventcalendar.prototype.currentDate.getDay();
Eventcalendar.prototype.currentWeek = Math.ceil((Eventcalendar.prototype.currentDay - 1 - Eventcalendar.prototype.currentWeekDay) / 7);
Eventcalendar.prototype.currentYear = Eventcalendar.prototype.currentDate.getFullYear();

//Getter/Setter
Eventcalendar.prototype.get = function get() {
    $.get('/wiki/
}
Eventcalendar.prototype.set = function set() {

}