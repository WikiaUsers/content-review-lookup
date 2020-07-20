;(function($, mw) {
    if (!$('#title_tables').length) { return; }
    
    Titles = {
        
        init: function() {
            obj_selections = {};
            obj_data = {};
        
            $.get('/wiki/Project:ListTitles', {action: 'raw', cb: Math.ceil(Math.random() * 1000)}, function(d) {
                $('#title_tables').html(
                    '<div id="selections"></div>'+
                    '<div id="tableTitles"></div>'
                );
                
                $.each(d.split(';@'), function(num, val) {
                    if (val === '') { return; }
                    var type = (/^Отборы/.test(val)) ? 'Selections' : 'Titles';
                    
                    $.each(val.replace(/^Отборы\n/, '').split('*@'), function(i, v) {
                        Titles.buildObjOrders(i, v);
                    });
                    
                    $.each(val.replace(/^Титулы\n/, '').split('*@'), function(i, v) {
                        Titles.buildObj(i, v);
                    });
                });
                
                Titles.createOrders();
                createTable("Max. HP");
                
            });
        },
        buildObjOrders: function(i, v) {
            if (v === '') { return; }
            v = v.split('\n');

            var name = v[0].replace(/\n/g, '');
            obj_selections[name] = {};

            $.each(v, function(i, val) {
                if (i === 0 || val === '') { return; }

                val = val.replace(/(\*\*|\n)/g, '').split(': ');

                if(val.length==3){
                    obj_selections[name][val[0]] = val[1] + ":" + val[2];
                }else{
                    obj_selections[name][val[0]] = val[1];
                }
            });
        },
        createOrders: function() {
            Object.keys(obj_selections).map(function(key, index) {
                var val = obj_selections[key]["name"];
                if (val !== undefined) {
                    var divOrder = document.createElement('div');
                    divOrder.id = key;
                    divOrder.innerHTML = val;
                    divOrder.onclick = function() { createTable(key); };
                    document.getElementById('selections').appendChild(divOrder);
                }    
            });
        },
        buildObj: function(i, v) {
            if (v === '') { return; }
            v = v.split('\n');

            var name = v[0].replace(/\n/g, '');
            obj_data[name] = {};

            $.each(v, function(i, val) {
                if (i === 0 || val === '') { return; }

                val = val.replace(/(\*\*|\n)/g, '').split(': ');

                obj_data[name][val[0]] = val[1];
            });
        },

    };
    
    try {
        $(Titles.init);
    }
    catch(e) {
        $('#title_tables').text('Ошибка! Проверьте консоль.');
        console.log(e);
    }
})(this.jQuery, this.mediaWiki);

function createTable(bonus) {
    var newHtml = "";
    newHtml = newHtml +
    '<table class="wikitable sortable" style="width:100%;">'+
    '<thead><tr>' +
    '<th style="width:100px;">Номер</th>' +
    '<th>Титул</th>' +
    '<th>Тип</th>' +
    '<th>'+ obj_selections[bonus].name +'</th>'+
    '</tr><thead><tbody>';
    if($('div#selections .active').length>0){
        $('div#selections .active')[0].classList.remove("active");
    }
    document.getElementById(bonus).classList.add("active");
    Object.keys(obj_data).map(function(key, index) {
        try {
            var val = obj_data[key][bonus];
            if (val !== undefined) {
                newHtml = newHtml+ 
                '<tr><td>'+ obj_data[key]["Number"] + '</td>'+
                '<td>'+ key + '</td>'+
                '<td>'+ obj_data[key]["Type"] + '</td>'+
                '<td>' + val +'</td></tr>';
            }
        } catch {}
        
    });
    $('#tableTitles').html(newHtml + '</tbody><tfoot></tfoot></table>');   
}