function wiki_auth(login, pass, ref){
    $.post('/api.php?action=login&lgname=' + login + 
            '&lgpassword=' + pass + '&format=json', function(data) {
        if(data.login.result == 'NeedToken') {
            $.post('/api.php?action=login&lgname=' + login + 
                    '&lgpassword=' + pass + '&lgtoken='+data.login.token+'&format=json', 
                    function(data) {
                if(!data.error){
                   if (data.login.result == "Success") { 
                        document.location.href=ref; 
                   } else {
                        console.log('Result: '+ data.login.result);
                   }
                } else {
                   console.log('Error: ' + data.error);
                }
            });
        } else {
            console.log('Result: ' + data.login.result);
        }
        if(data.error) {
            console.log('Error: ' + data.error);
        }
    });
}