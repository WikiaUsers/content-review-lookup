mw.hook('wikipage.content').add(function(){
    if (!document.querySelector('.game-clock')){return;}
    
    var s = {
        // clock delay (IRL:8.3s; Game:10min)
        delay: 8333,
        
        // clock reference
        unix: 1648803051333,
        min: 0,
        hrs: 0,
        day: 93,
        sea: 1,
        yrs: 1,
    };
    function update(){
        scheduleUpdate();
        var t = Math.floor(((new Date()).getTime()-s.unix)/s.delay*10);
        var u = {
            min: ((s.min+t) % 60).toString().padStart(2,0),
            hrs: ((s.hrs+Math.floor(t / 60)) % 24).toString().padStart(2,0),
            '12hrs': ((s.hrs+Math.floor(t / 60)) % 12).toString().padStart(2,0),
            'ampm': ((s.hrs+Math.floor(t / 60)) % 24) > 12 ? 'pm' : 'am',
            day: (((s.day+Math.floor(t / 60 / 24)) % 93)+1).toString().padStart(2,0),
            sea: ['Kış', 'İlkbahar', 'Yaz', 'Sonbahar'][((s.sea+Math.floor(t / 60 / 24 / 93)) % 4)],
            yrs: s.yrs+Math.floor(t / 60 / 24 / 93 / 4),
        };
        $('.game-clock').each(function(_, el) {
            var format = el.getAttribute('data-clockformat') || '%hrs:%min';
            el.innerHTML = format.replace(new RegExp('%('+Object.keys(u).join('|')+')', 'g'), function(_, unit){return (u[unit] || '');});
        });
    }
    function scheduleUpdate() {
        setTimeout(update, s.delay-(((new Date()).getTime()-s.unix) % s.delay));
    }
    scheduleUpdate();
});