mw.hook('wikipage.content').add(function() {
    
    var el = document.getElementById('ic-ooc-date');
    if (el) {
        var cached = el.getAttribute('data-date');
        var now = new Date();
        var today = now.getUTCFullYear() + '-' 
                  + String(now.getUTCMonth()+1).padStart(2,'0') + '-' 
                  + String(now.getUTCDate()).padStart(2,'0');
        
        if (cached !== today) {
            // ใช้ API purge แทน redirect
            $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                data: {
                    action: 'purge',
                    titles: mw.config.get('wgPageName'),
                    format: 'json'
                },
                success: function() {
                    location.reload(); // reload หลัง purge
                }
            });
        }
    }

    // นาฬิกา
    function updateICTime() {
        var clock = document.getElementById('ic-clock');
        if (!clock) return;
        var now = new Date();
        var utc7 = new Date(now.getTime() + 7 * 3600 * 1000);
        var h = String(utc7.getUTCHours()).padStart(2, '0');
        var m = String(utc7.getUTCMinutes()).padStart(2, '0');
        var s = String(utc7.getUTCSeconds()).padStart(2, '0');
        clock.textContent = h + ':' + m + ':' + s;
    }
    setInterval(updateICTime, 1000);
    updateICTime();

});