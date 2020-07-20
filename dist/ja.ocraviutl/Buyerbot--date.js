tDateInt = {};
tDateInt.shift = function(tShift,tDaysave){
    var time = new Date();
    var year = time.getUTCFullYear();
    var leap = (year%4 === 0) && (year%100 !== 0) || (year%400 === 0) ? true : false;
    var month = time.getMonth();
    var date = time.getUTCDate();
    var hour = time.getUTCHours() + tShift;
    if (tDaysave){hour = hour+1}
    if (hour>=24){
        date = date+1;
        hour = hour%24;
    }else if(hour<1){
        date = date-1;
        hour = hour+24;
    }
    if (leap&&month == 2&&date>29){
        month = month+1;
        date = date-29;
    }else if (leap&&month == 2&&date>28){
        month = month+1;
        date = date-28;
    }else if (month != 2&&date>tDateInt.month[month-1]){
        date = date-tDateInt.month[month-1];
        month = month+1;
    }else if(date<1){
        month = month-1;
        date = date+tDateInt.month[month-1];
        if (leap){date = date+1}
    }
    if (month>12){
        year = year+1;
        month = 1;
    }else if(month<1){
        year = year-1;
        month = 12;
    }
    return {year, month, date};
};
tDateInt.month = [31,28,31,30,31,30,31,31,30,31,30,31];