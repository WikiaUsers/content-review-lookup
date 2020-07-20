var chatDesc="Pod Elder Scrolls Wiki<br /></p><p style=\"font-size: x-small; font-weight: normal; line-height: 100%;\">Przed wejściem na czat, przeczytaj proszę <a href=\"http://pl.elderscrolls.wikia.com/wiki/Elder_Scrolls_Wiki:Regulamin#Czat\">zasady</a> obowiązujące na nim.</p>";
 
function changeChatDesc() {
    try {
        if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
            $('p.chat-name').html(''+chatDesc+''); 
            setTimeout("changeChatDesc()", 50000);
        }
    }catch (err){
        setTimeout("changeChatDesc()", 5000);
    }
}
$(document).ready(function() {changeChatDesc()});