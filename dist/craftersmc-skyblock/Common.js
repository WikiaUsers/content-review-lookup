mw.hook('wikipage.content').add(function(){
    if (!document.querySelector('.game-clock')){return;}
    
    var s = {
        // clock delay (IRL:7s; Game:10min)
        delay: 8333,
        
        // clock reference (IRL - 11:24am 26/7/2024)/(Game: 5:40am Winter d80 y164)
        unix: 1648804126000,
        min: 0,
        hrs: 0,
        day: 94,
        sea: 1,
        yrs: 1,
    };
    function update(){
        scheduleUpdate();
        var t = Math.floor(((new Date()).getTime()-s.unix)/s.delay*10);
        var u = {
            min: ((s.min+t) % 60).toString().padStart(2,0),
            hrs: ((s.hrs+Math.floor(t / 60)) % 24).toString().padStart(2,0),
            day: (((s.day+Math.floor(t / 60 / 24)) % 93)+1).toString().padStart(2,0),
            sea: ['Winter', 'Spring', 'Summer', 'Autumn'][((s.sea+Math.floor(t / 60 / 24 / 93)) % 4)],
            yrs: s.yrs+Math.floor(t / 60 / 24 / 93 / 4),
        };
        $('.game-clock').each(function(_, el) {
            var format = el.getAttribute('data-clockformat') || '%hrs:%min';
            el.innerHTML = format.replace(/%(\w+)/g, function(_, unit){return (u[unit] || '');});
        });
    }
    function scheduleUpdate() {
        setTimeout(update, s.delay-(((new Date()).getTime()-s.unix) % s.delay));
    }
    scheduleUpdate();
});