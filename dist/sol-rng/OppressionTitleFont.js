mw.hook('wikipage.content').add(function() {
    function update() {
        let divs = document.querySelectorAll(`#oppressiontitle span`);
        divs.forEach(span => {
            span.className = [`uppercase`, `lowercase`][Math.floor(Math.random() * 2)] + ` ` + [`black`, `white`][Math.floor(Math.random() * 2)];
        });
    }
    //update();
    setInterval(function () {
        if (document.getElementById('oppressiontitle')) {
    		update();
		}		
    }, 25);
});