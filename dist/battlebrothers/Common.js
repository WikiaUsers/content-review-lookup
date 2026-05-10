/* Any JavaScript here will be loaded for all users on every page load. */
// called when page loads
$(document).ready(function() {
    initEventCyclers();
});
// usage: <span class="event-cycler">[[File:Icon.png|link=]]<span>Opt1</span><span>Opt2</span></span>
// first child = button, rest = switchable fragments
function initEventCyclers() {
    document.querySelectorAll('.event-cycler').forEach(function(cycler) {
        // prevent double-binding
        if (cycler.dataset.cyclerInit === 'true') return;
        cycler.dataset.cyclerInit = 'true';
        
        // get direct children only
        var children = Array.from(cycler.children);
        if (children.length < 3) return; // need at least button + 2 fragments
        var button = children[0];
        var fragments = children.slice(1);
        
        // hide all fragments initially
        fragments.forEach(function(frag) {
            frag.style.display = 'none';
        });
        
        // random selection on page load
        var currentIndex = Math.floor(Math.random() * fragments.length);
        fragments[currentIndex].style.display = 'inline';
        
        // add handler to the button and style it, state object is captured in closure
        button.style.cursor = 'pointer';
        var state = {
            index: currentIndex,
            fragments: fragments
        };
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            state.fragments[state.index].style.display = 'none';
            state.index = (state.index + 1) % state.fragments.length;
            state.fragments[state.index].style.display = 'inline';
        }, { passive: false });
    });
}
// re-initialize if content is loaded dynamically (e.g., via ajax)
if (typeof mw !== 'undefined' && mw.hook) {
    mw.hook('wikipage.content').add(function() {
        initEventCyclers();
    });
}