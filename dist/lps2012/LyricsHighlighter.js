function highlight() {
    document.getElementById('mw-content-text').style.display = 'inline-block';
    document.getElementById('mw-content-text').addEventListener('mouseover', function (e) {
        if (e.target.tagName == 'DD' && !/<dl>/ig.test(e.target.innerHTML)) {
            e.target.style.backgroundColor = '#BA02FF';
            e.target.style.display = 'inline-block';
            e.target.style.padding = '10px';
            e.target.style.borderRadius = '10px';
            e.target.style.fontWeight = 'bold';
            e.target.style.color = '#FFD800';
            e.target.style.cursor = 'none';


            e.target.addEventListener('mouseout', function (f) {
                f.target.style.backgroundColor = '';
                f.target.style.display = '';
                f.target.style.padding = '';
                f.target.style.borderRadius = '';
                f.target.style.fontWeight = '';
                f.target.style.color = '';
                e.target.style.cursor = 'default';
            }, false);
        }
    }, false);
}
/*
if (/songs/ig.test(document.getElementsByClassName('categories')[0].innerHTML)) {
    highlight();
}
*/