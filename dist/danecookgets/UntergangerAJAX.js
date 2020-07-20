// from stackoverflow
function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 4) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
 
$(".page-List_of_Untergangers table.untergangers tr td:nth-child(2) .Update").click(function(){
    // please note the number of levels of parent nodes the <tr> is
    $row = $(this).parent().parent().parent();
    handleRow($row);
});
 
function handleRow(element) {
    // do not handle rows with noAJAX class. theoretically this can be used to mark suicidals and verraters
    if (element.hasClass("noAJAX") !== 'true') {
        channelname = element.find("td:last-child a").attr("href").split("/user/")[1].split("/")[0];
        // console.log(channelname);
        if (typeof channelname !== 'undefined') {
            // replace 'update' with a throbber
            $("td:nth-child(2) .Update",element).html('<img class="rowLoading" src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" alt="..." />');
            $.ajax({
                type:"GET",
                url:"http://gdata.youtube.com/feeds/api/users/"+channelname,
                dataType:"xml",
                success: function(ytdata) {
                    if (ytdata == 'User not found') {
                        // this is more to indicate that the channel does not exist anymore (suicidal)
                        $("td:nth-child(5), td:nth-child(6), td:nth-child(7)",element).text("-");
                    } else {
                        // retrieve stats
                        vid = $(ytdata).find('gd\\:feedLink[rel$="#user.uploads"]').attr("countHint");
                        view = $(ytdata).find("yt\\:statistics").attr("totalUploadViews");
                        sub = $(ytdata).find("yt\\:statistics").attr("subscriberCount");
                        // still need to figure out how to parse the date
                        last = $(ytdata).find("yt\\:statistics").attr("lastWebAccess");
                        gender = $(ytdata).find("yt\\:gender").text();
                        console.log(channelname+": vid:"+vid+" view:"+view+" sub:"+sub+" g:"+gender);
 
                        // note that some channels do not specify their gender, so the string is empty
                        if ($("td:nth-child(2) span.gender",element).length == 0 ) {
                            $("td:nth-child(2)",element).append('<span class="gender '+gender+'">' + gender.toUpperCase() + '</span>');
                        } else {
                            $("td:nth-child(2) span.gender",element).addClass(gender).text(gender.toUpperCase());
                        }
                        // do not update if text is "N/A" or "?" (to mark channels with a majority of non-parody videos)
                        if ( $.trim( $("td:nth-child(5)",element).text() ) !== "?" ) $("td:nth-child(5)",element).text( commafy(vid) );
                        if ( $.trim( $("td:nth-child(6)",element).text() ) !== "N/A" ) $("td:nth-child(6)",element).text( commafy(view) );
                        if ( $.trim( $("td:nth-child(7)",element).text() ) !== "N/A" ) $("td:nth-child(7)",element).text( commafy(sub) );
                    }
                },
                complete: function() {
                    $("td:nth-child(2) .Update",element).text('update');
                }
            });
        }
    }
}