function checkDaylightSavings(d){
    var nextDaylightSavings = new Date("Nov 01 2015 02:00:00")
    var curServerOffset = -4 * 60;
    
    // d should be UTC prior to setting
    d.setMinutes(d.getMinutes() + curServerOffset);
    
    if (d >= nextDaylightSavings) {
        d.setMinutes(d.getMinutes() - 60);
        window.DisplayClockJS = '%2I:%2M:%2S %p | %{January;February;March;April;May;June;July;August;September;October;November;December}m %2d, %Y (EST)';
        return d;
    }
    else {
        return d;
    }
}