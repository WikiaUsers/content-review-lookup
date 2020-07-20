window.DateParser = window.DateParser || function DateParser(date){
    this.DotW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    this.MotY = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (date instanceof Date){
        this.date = date;
    } else {
        this.date = typeof date !== 'undefined' ? new Date(date) : null;
    }
    this.getMonth = function getMonth(type){
        var _date = this.date;
        if (['', 'number'].indexOf(type) > -1 || typeof type === 'undefined'){
            return _date.getMonth() + 1;
        } else if (['name'].indexOf('type') > -1){
            return this.MotY[_date.getMonth()];
        } else {
            return void _date;
        }
    };
    this.getMonthName = function getMonthName(){
        return this.getMonth('name');
    };
    this.getDayOfTheWeek = this.getDotW = function getDotW(){
        var _date = this.date;
        return this.DotW[_date.getDay()];
    };
    this.getDay = function getDay(){
        return this.date.getDate();
    };
    this.getYear = function getYear(type){
        if (type === 'full'){
            return this.date.getFullYear();
        } else {
            return this._get('year').pad(0, 2);
        }
    };
    this._get = function _get(dateType){
        var dateTypes = {
            'year': {
                target: this.date.getFullYear(),
                parse: function(target){
                    return {
                        pad: function(minmax){
                            var min_s = String(min),
                                max_s = String(max)
                        }
                    };
                }
            }
        };
    };
};