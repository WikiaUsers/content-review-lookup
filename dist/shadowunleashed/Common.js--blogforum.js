/* Any JavaScript here will be loaded for all users on every page load. */

/* lock blog comments for blogs that haven't been commented on for more than 30 days.
   by: [[User:Joeyaa|Joey Ahmadi]]
*/
 
$(function () {
        if (wgNamespaceNumber == 500 && $('#article-comments-ul li').size() > 1) {
            var then = $('#article-comments-ul > .SpeechBubble:first .permalink').attr('href');
            then = new String(then.match(/\d{8}/));
            var monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var year = then.match(/^\d{4}/);
            var month = then.substring(4, 6);
            var now = new Date();
            month--;
            month = monthnames[month];
            var day = then.match(/\d{2}$/);
            then = new Date(month + '' + day + ', ' + year);
            var old = parseInt(now - then);
            old = Math.floor(old / (1000 * 60 * 60 * 24));
            if (old > 30) {
                $('#article-comm-form').attr('disabled', 'disabled');
                $('#article-comm').attr('disabled', 'disabled').text('This blog post hasn\'t been commented on for over 30 days. There is no need to comment.');
                $('#article-comm-submit').attr('disabled', 'disabled');
                $('.article-comm-reply .wikia-button .secondary').remove();
            }
        }
    });