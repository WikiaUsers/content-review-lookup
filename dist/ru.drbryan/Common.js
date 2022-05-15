$(function() {
    var d = new Date();
    if (d.getHours() < 4) {
        document.body.className += ' BG1';
    } else if (d.getHours() < 6) {
        document.body.className += ' BG2';
    } else if (d.getHours() < 10) {
        document.body.className += ' BG3';
    } else if (d.getHours() < 16) {
        document.body.className += ' BG4';
    } else if (d.getHours() < 20) {
        document.body.className += ' BG5';
    } else if (d.getHours() < 22) {
        document.body.className += ' BG6';
    } else if (d.getHours() < 24) {
        document.body.className += ' BG1';
    }
});