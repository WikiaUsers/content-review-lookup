///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
////// BlockedByChatUsers - See who blocked your private messages. //////
/////                    Author: Doork                             /////
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
 
    if (!$("#blockedByChatUsers").length) {
        $('.Write').prepend('<div id="blockedByChatUsers" align="center"><button onclick="openBlocks()">PrivateBlocked</button></div>');
    }
 
    function openBlocks() {
        $.ajax({
            crossDomain: true,
            url: wgServer + '/index.php?action=ajax&rs=ChatAjax&method=getPrivateBlocks',
            type: 'GET',
            success: function(data) {
                var list = $('<ul>').append(data.blockedByChatUsers.map(function(el) {
                    return $('<li>').text(el);
                }));
                $.showCustomModal('Blocked users', 'This is a list of users who blocked your private messages: <br/> <br/> ' + list.prop('outerHTML'));
            },
            error: function() {
                alert('An error occured while fetching the users!');
            },
        });
    }