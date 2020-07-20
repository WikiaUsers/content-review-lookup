$('.rateable')
.each(function () {
    $(this)
    .rateable({
        votes: Math.floor(Math.random() * 999) + 1,
        avg:   Math.random() * 10,
        change: function (rating) {
            console.log('current value: ' + rating);
        },
        submit: function (rating) {
            console.log('final value: ' + rating);
        }
    });
});
 
$('.rated')
.each(function () {
    $(this).rated(Math.max(1, Math.round(Math.random() * 10)));
});