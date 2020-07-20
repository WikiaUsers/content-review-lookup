/* Any JavaScript here will be loaded for all users on every page load. */

//get the elements trying to load data (if any)
eles = $('.DynamicData'); 

//Dynamic Data Elements Exist => load custom Javascript
if(eles && eles.length > 0)
{
    articles = [
        'MediaWiki:Common.js/DynamicData.js',
    ];
    
    // Use Wikia's importArticles() function to load JavaScript files
    window.importArticles({
        type: 'script',
        articles: articles
    });
}

switch(mw.config.get('wgPageName')){

    /* JS for the Event Countdown on the main page */
    case 'Idle_Champions_of_the_Forgotten_Realms_Wiki':
    {
        var sDate = $( ".countdowndate" ).text();
        var dtDate = DST_Checck(sDate);
        $( ".countdowndate" ).text(dtDate);     
        break;
    }

    /* JS for the Event Token Calculator */
    case 'Event_Token_Calculator':
    {
        //load Custom JS when on Event Token Calc Page
        articles = [
            'MediaWiki:Common.js/TokenCalc.js',
        ];
        
        // Use Wikia's importArticles() function to load JavaScript files
        window.importArticles({
            type: 'script',
            articles: articles
        });
        break;
    }
}

function DST_Check(sDate)
{
    var dtDate = new Date(sDate);
    
    if (dtDate.isDstObserved())
    {
        dtDate = new Date(dtDate.getFullYear(), dtDate.getMonth(), dtDate.getDate(), dtDate.getHours(), dtDate.getMinutes() - 60, dtDate.getSeconds());
    }
     
    return dtDate;
}
        
Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

function FormatDate(date)
{
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear() - 2000;
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var AM_PM = 'AM';
   
   if (hour > 12)
    {
        hour = hour - 12;
        AM_PM = 'PM';
    }
    
    if (month < 10)
    {
        month = '0' + month;
    }
    if (day < 10)
    {
        day = '0' + day;
    }
    if (hour < 10)
    {
        hour = '0' + hour;
    }
    if (minutes < 10)
    {
        minutes = '0' + minutes;
    }
    
    return month + '/' + day + '/' + year + ' ' + hour + ':' + minutes  + ' ' + AM_PM;
}

function Convert_PSTtoLocal(date)
{
    var d = new Date();
    var nOffSet_LOCAL = d.getTimezoneOffset(); //Local TZ from GMT
    var Offset_PST = 480;  //8-7(dst) hrs behind GMT
    if (d.isDstObserved())
    {
      Offset_PST = 420;
    }
    var minutes_diff = Offset_PST - nOffSet_LOCAL;
    var dt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + minutes_diff);

    return dt;
}

function Convert_LocalToPST(date)
{
    var d = new Date();
    var nOffSet_LOCAL = d.getTimezoneOffset(); //Local TZ from GMT
    var Offset_PST = 480;  //8-7(dst) hrs behind GMT
    if (d.isDstObserved())
    {
      Offset_PST = 420;
    }
    var minutes_diff = Offset_PST - nOffSet_LOCAL;
    var dt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() - minutes_diff);

    return dt;
}