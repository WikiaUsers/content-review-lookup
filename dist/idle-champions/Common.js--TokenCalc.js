/* Any JavaScript here will be loaded only when imported by another JS file */
$(function() {
    $( ".BTN_CALCULATE" ).on("click", function() {  UpdateFinalTokens();  }  );
    $(".TXT_TOKENS_CURRENT").on("keydown", function() {   if (event.keyCode === 13) { UpdateFinalTokens(); return false; } }  );
    $(".TXT_NUM_CONTRACT_SML").on("keydown", function() {   if (event.keyCode === 13) { UpdateFinalTokens(); return false; } }  );
    $(".TXT_NUM_CONTRACT_MED").on("keydown", function() {   if (event.keyCode === 13) { UpdateFinalTokens(); return false; } }  );
    $(".TXT_NUM_CONTRACT_LRG").on("keydown", function() {   if (event.keyCode === 13) { UpdateFinalTokens(); return false; } }  );
    $(".TXT_TIME_DAYS").on("keydown", function() {   if (event.keyCode === 13) { UpdateFinalTokens(); return false; } }  );
    $(".TXT_TIME_HOURS").on("keydown", function() {   if (event.keyCode === 13) { UpdateFinalTokens(); return false; } }  );
    $(".TXT_TIME_MINUTES").on("keydown", function() {   if (event.keyCode === 13) { UpdateFinalTokens(); return false; } }  );

    GetEventInfo();
    UpdateDates();
    GetTimeRemaining();
    UpdateFinalTokens();	
});
        
function GetEventInfo()
{
    var sTitle = $( ".EVENT_NAME" ).text();
    var sStartTime = $( ".EVENT_STARTTIME" ).text();
    var sEndTime = $( ".EVENT_ENDTIME" ).text();
    
    $( ".LBL_EVENTNAME" ).text(sTitle);
    $( ".LBL_TIME_START_PST" ).text(sStartTime);
    $( ".LBL_TIME_END_PST" ).text(sEndTime);
}

function GetTimeRemaining()
{
    var sStartDate = $( ".LBL_TIME_START_PST" ).text();
    var sEndDate = $( ".LBL_TIME_END_PST" ).text();
    var dtStart = new Date(sStartDate);
    var dtEnd = new Date(sEndDate);

    //alert(dtStart + " " + dtEnd)
    var diff = dtEnd.getTime() - dtStart.getTime();
    var second_ticks = 1000;
    var minute_ticks = 60 * second_ticks;
    var hour_ticks = 60 * minute_ticks;
    var day_ticks = 24 * hour_ticks;

    var days = Math.floor(diff /  day_ticks);
    diff -=  days * day_ticks;

    var hours = Math.floor(diff / hour_ticks);
    diff -= hours * hour_ticks;

    var mins = Math.floor(diff / minute_ticks);
    diff -= mins * minute_ticks;

    var sResult = days + " days " + hours + " Hours " + mins + " Minutes" ;
    var nTokens = (((((days * 24)  + hours ) * 60 ) + mins ) * 2.4);
    var nFP = Math.floor(nTokens / 2500);

    //alert("Time Remaining: " + sResult);
    $( ".LBL_TIME_REMAINING" ).text(sResult);
    $( ".LBL_TOKENS_REMAINING" ).text(nTokens);
    $( ".LBL_FPS_REMAINING" ).text(nFP);

    return;	
}


function UpdateDates()
{
    var sStartDate = $( ".LBL_TIME_START_PST" ).text();
    var sEndDate = $( ".LBL_TIME_END_PST" ).text();
    
    var dtStart = new Date(sStartDate);
    var dtEnd = new Date(sEndDate);
    
    dtStart = Convert_PSTtoLocal(dtStart);
    dtEnd = Convert_PSTtoLocal(dtEnd);
    
    dtLocal = new Date();
    if (dtStart < dtLocal)
    {
    var dtLocal_PST = Convert_LocalToPST(dtLocal);
    $( ".LBL_TIME_START_PST" ).text(FormatDate(dtLocal_PST));
    dtStart = dtLocal;
    }
    
    $( ".LBL_TIME_START_LOCAL" ).text(FormatDate(dtStart));
    $( ".LBL_TIME_END_LOCAL").text(FormatDate(dtEnd));
    
    return;
}

function UpdateFinalTokens()
{
    var nRemainingTokens = Number($( ".LBL_TOKENS_REMAINING" ).text());
    var nDays = Number($( ".TXT_TIME_DAYS" ).text());
    var nHours = Number($( ".TXT_TIME_HOURS" ).text());
    var nMinutes = Number($( ".TXT_TIME_MINUTES" ).text());
    
    var nCurrentTokens = Number($( ".TXT_TOKENS_CURRENT" ).text());
    var nContract_Count_SML = Number($( ".TXT_NUM_CONTRACT_SML" ).text());
    var nContract_Count_MED = Number($( ".TXT_NUM_CONTRACT_MED" ).text());
    var nContract_Count_LRG = Number($( ".TXT_NUM_CONTRACT_LRG" ).text());

    var rate_per_min = 2.4;
    var tokens_per_small = 30 * rate_per_min; 	//30 min
    var tokens_per_medium = 4 * 60 * rate_per_min; 	//4 hrs
    var tokens_per_large = 8 * 60 * rate_per_min; 	//8 hrs

    var nTokens = (((((nDays * 24)  + nHours ) * 60 ) + nMinutes ) * 2.4);
    
    var nFinalTokens = nTokens + nCurrentTokens + (nContract_Count_SML * tokens_per_small) + (nContract_Count_MED * tokens_per_medium) +  (nContract_Count_LRG * tokens_per_large);

    var nFinalFPs = Math.floor(nFinalTokens / 2500);

    $( ".LBL_TOKENS_FINAL" ).text(nFinalTokens);
    $( ".LBL_FPS_FINAL" ).text(nFinalFPs);

    return;
}