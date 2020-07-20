/* See Powerless Wiki:Spoilers to enable this. */
$(function () {
    if (/spoiler/i.test(document.title)) { 
        $('body').append(
        '<div id="blackout" style="position: absolute; top: 0; left: 0; width: 100%; height: ' + $(document).height() + 'px; opacity: 1.0; background-color: black; z-index: 1000;">' +
            '<table id="dialog" border="0" cellpadding="20" style="position: absolute; left: 50%; width: 500px; margin-left: -250px; top: ' + parseInt($(window).height()/2 - 75) + 'px; height: 150px; background-color: white;">' +
                '<tr>' +
                    '<td colspan="2" style="text-align: center;">This page contains spoilers. Are you sure you want to read it?</td>' +
                '</tr>' +
                '<tr>' +
                    '<td style="text-align: center;"><button id="no">No, not yet</button></td>' +
                    '<td style="text-align: center;"><button id="yes">Yes, why not?</button></td>' +
                '</tr>' +
            '</table>' +
        '</div>');
        $('#no').click(function () {
            $('#dialog').remove();
            history.back();
        });
        $('#yes').click(function () {
            $('#dialog').remove();
            $('#blackout').fadeOut(2000, function () {
                $('#blackout').remove();
            });
        });
    }
});