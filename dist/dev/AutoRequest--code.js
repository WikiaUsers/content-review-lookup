/**
 * AutoRequest
 * documentation at: https://dev.fandom.com/wiki/AutoRequest
 * Code by Parandar (https://demidieux.fandom.com/wiki/User:Parandar)
 * Version 1.1 (September 1, 2016)
 */
 var result = [];
 
function formautorequest(request) {
    //Display the form
        $(request.id).html(request.form);
        $(request.id).after('<input type="button" id="autorequestform-submit" value="Submit"/> &nbsp; <span id="LoadingGif44" style="text-align:center;display:none;"><img src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" /></span>');
        
        $(' #autorequestform-submit').click(function() {doIT()});
 
    //Deal with datas sended
        function doIT() {
            var i = -1;
            var success = true;
            //Get datas
            while(success !== undefined) {
                i++;
                success = $(request.id + ' form input')[i];
                if(success !== undefined) {
                    result.push(success.value);
                }
            }
 
            //Processing with
            var varkey = new RegExp("#result#\\d*#");
            var n = 1;
            var render = request.outcode;
            var condition = varkey.test(render);
            while(condition){
                var newREGEXP = new RegExp("#result#"+n+"#", "g");
                render=render.replace(newREGEXP, result[(n-1)]);
                console.log(render);
                n++;
                condition = varkey.test(render);
            }
            //Export datas
            console.log('rendu final : ' + render);
            var parent = $('#Wall .message-main').attr('data-id');
 
            $.nirvana.sendRequest(
                {
                controller: 'WallExternal',
                method:'replyToMessage',
                data:{
                    body:render,
                    parent:parent,
                    pagetitle:wgPageName,
                    pagenamespace:1201,
                    token:window.mw.user.tokens.get('editToken')
                },
                callback:function(){
                    $('#LoadingGif44').show();
                    window.location.reload(true);
                    },
            });
 
        }
}