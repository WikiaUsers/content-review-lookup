var bars = document.getElementsByClassName('progressbar');
for(i = 0; i < bars.length; i++) {
    const childNode = bars[i].childNodes[1]
    const width = Number(childNode.style.width.slice(0,-1));
    if (width > 66) {
        childNode.style.backgroundColor = 'green';
    }
    else if (width > 33) {
        childNode.style.backgroundColor = 'yellow';
    }
    else {
        childNode.style.backgroundColor = 'red';
    }
}