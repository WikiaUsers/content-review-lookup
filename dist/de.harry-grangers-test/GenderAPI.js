function getGender(name,type,country,callback) {
    $.get('https://gender-api.com/get?' + type + '=' + name + '&country=' + country + '&key=MMUctLuaJfShwfvluM').done(callback);
};

if($('.api-gender').length > 1) {
        for(i = 0; i < $('.api-gender').length; i++) {
            console.log($('.api-gender').eq(i));
            el = $('.api-gender').eq(i);
            type = $('.api-gender').text().search(' ') ? 'split' : 'name';
            getGender(el.text(), type, 'GB', function(data) {
               console.log(data,data.gender,el);
               if(data.gender == 'male') {
                   data.gender = 'männlich';
               }
               else if(data.gender == 'female') {
                   date.gender = 'weiblich';
               }
               el.text(data.gender);
            },el);
        }
    }
else if($('.api-gender').length != 0) {
    if($('.api-gender').length > 1) {
        names = '';
        for(i = 0; i < $('.api-gender').length; i++) {
            console.log($('.api-gender').eq(i));
            names += $('.api-gender').eq(i).text();
            if(i< $('.api-gender').length-1) { names += ';' }
        }
        getGender(names,'name', 'GB', function(data) {
           console.log(data);
           for(x = 0; x < data.result.length; x++) {
               el = $('.api-gender').eq(x);
               console.log('Result',data.result[x],data.result[x].gender,el);
           }
           console.log(data,data.gender,el);
           if(data.gender == 'male') {
               data.gender = 'männlich';
           }
           else if(data.gender == 'female') {
               date.gender = 'weiblich';
           }
           el.text(data.gender);
        });
    }
    else {
        console.log('eins');
        type = $('.api-gender').text().search(' ') ? 'split' : 'name';
        getGender($('.api-gender').text(), type, 'GB', function(data) {
            $('.api-gender').text(data.gender);
        });
    }
}