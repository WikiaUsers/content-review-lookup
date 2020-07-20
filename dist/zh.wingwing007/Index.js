var nekowiz_events = [], nekowiz_weekly = [];
function init(){
    $.when(loadEvent('weekly'), loadEvent('events'))
    .then(function(weekly_s, events_s){
        nekowiz_weekly = weekly_s[0];
        nekowiz_events = parseData(events_s[0]);
        startCalendar(nekowiz_events);
    });
}
function setTimeline(){
  if(jQuery(".timeline").length == 0){
      jQuery(".fc-time-grid-container").prepend("<div style='width:100%;overflow: visible;'><hr class='timeline'/></div>") 
    }
    var timeline = jQuery(".timeline");  

    if(jQuery(".fc-today").length <= 0){
        timeline.hide()
        return;
    }
    else{
      timeline.show()
    }

    var now = moment();
    var day = parseInt(now.format("e"));
    var width =  jQuery(".fc-minor").width();
    var height =  jQuery(".fc-today:last").height();
    var left = (day*width) + jQuery(".fc-axis").outerWidth()-1;
    var top = ( (now.hours()*3600)+(now.minutes()*60)+now.seconds() )/86400;

    top = height*top-2;
    timeline
    .css('width',width+"px")
    .css('top',top+"px") 
}
function dailyButton(){
    if($('#event-toggle-btn').length == 0){
        $('#calendar .fc-toolbar .fc-right').append('<button id="event-toggle-btn" class="fc-button fc-state-default fc-corner-left fc-corner-right" data-eventtype="daily" type="button">曜日</button>');
        $('#event-toggle-btn').bind('click', function(){
            console.log($(this).data('eventtype'));
            switch($(this).data('eventtype')){
                case 'daily': 
                    $(this).text("活動");
                    $('#calendar').fullCalendar( 'removeEventSource', nekowiz_weekly );
                    $('#calendar').fullCalendar( 'changeView', 'basicWeek' );
                    $(this).data('eventtype', 'events');
                    break;
                case 'events':
                    $(this).text("曜日");
                    $('#calendar').fullCalendar( 'changeView', 'agendaDay' );
                    $('#calendar').fullCalendar( 'addEventSource', nekowiz_weekly );
                    $(this).data('eventtype', 'daily');
                    break;
                default:
            }
        });
    }
}
function loadEvent(type){
    if(type === 'weekly'){
        return $.getJSON('./assets/json/weekly.json');
    }else if('events'){
        return $.ajax({
              url: "http://zh.nekowiz.wikia.com/api.php",
              crossDomain: true,
              dataType: "jsonp",
              data: {
                format: "json",
                action: "query",
                prop: "revisions",
                titles: "模板:Event_Timeline",
                rvprop: "content"
              }
            });
    }else return;
}
function parseData(data){
    var src, res = [];
    src = YAML.parse(data.query.pages[50134].revisions[0]['*']);
    for(var i in src){
        var start = moment(src[i].start), end = moment(src[i].end);
        if(moment(end).diff(moment(start)) < 86400000){
            res.push({
                title: src[i].title,
                url: "http://zh.nekowiz.wikia.com/wiki/活動任務/"+src[i].title,
                allDay: false,
                start: start.format(),
                end: end.format()
            });
        }else{
            res.push({
                title: src[i].title,
                url: "http://zh.nekowiz.wikia.com/wiki/活動任務/"+src[i].title,
                allDay: true,
                start: start.hour(0).format(),
                end: end.hour(24).format()
            });
        }
    }
    return res;
}
function startCalendar(events){
    $('#calendar').fullCalendar({
        lang: 'zh-tw',
        theme:false,
        editable: false,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        views: {
            month: { // name of view
                titleFormat: 'YYYY 年 MM 月'
                // displayEventEnd: true
                // other view-specific options here
            }
        },
        axisFormat: "HH:mm",
        scrollTime: moment.max(moment().startOf('day'), moment().subtract(3, 'hours')).format("HH:mm"),
        defaultView: 'agendaDay',
        timeFormat: 'HH:mm',
        eventLimit: true, // allow "more" link when too many events
        eventRender: function(event, element) {
            element.qtip({
                position: {
                    my: 'top left',
                    at: 'bottom right',
                    target: 'mouse',
                    adjust: {x:15, y:15}
                },
                content: {
                    text: function (e) {
                        var start_m = moment(event.start);
                        var end_m = moment(event.end);
                        // check same day
                        var is_same_day = ((start_m.dayOfYear() == end_m.dayOfYear()) && (start_m.year() == end_m.year()));
                        // check all day
                        if (start_m.hour() == 0 && start_m.minute() == 0 && end_m.hour() == 0 && end_m.minute() == 0) {
                            if (end_m.diff(start_m, 'days') == 1) {
                                return start_m.format("MM月DD日");
                            } else {
                                return start_m.format("MM月DD日") + " ~ " + end_m.format("MM月DD日");
                            }
                        } else {
                            if (is_same_day) {
                                return start_m.format("HH:mm") + " ~ " + end_m.format("HH:mm");
                            } else {
                                return start_m.format("MM月DD日 HH:mm") + " ~ " + end_m.format("MM月DD日 HH:mm");
                            }
                        }
                    },
                    title: event.title
                },
                style: {
                    classes: 'qtip-rounded qtip-shadow'
                }
            });
        },
        style: {
            classes: 'qtip-blue qtip-shadow'
        },
        viewRender: function (view) {
            try {
                setTimeline();
                dailyButton();
            } catch (err) {}
        },
        events: events
    });
    $('#calendar').fullCalendar( 'addEventSource', nekowiz_weekly );
}
$(document).ready(function() {
    init();
});