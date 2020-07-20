/***********************************************************************/
/****************************** Doc & ToC ******************************/
/***********************************************************************/
/*
Documentation
    @Compiler = TheGoldenPatrik1
    @Authors  = Various
    @Purpose  = Archive of Random Interesting Code
*/
/***********************************************************************/
/*************************** Interesting Code **************************/
/***********************************************************************/

/*
    @Purpose = Biglist Button
    @Author  = Kocka
*/
$('#WikiaBar .toolbar .tools').append(
    $('<li>').append(
        $('<a>', {
            href: mw.util.getUrl('Report:Spam/Biglist'),
            text: 'Biglist'
        })
    )
);

/*
    @Purpose = Creates a List of Pages
    @Author  = TheGoldenPatrik1
*/
var num = 1;
var abc = [];
while (num < 148) {
    abc.push('File:Episode 1 - ' + num + '.jpg ');
    num += 1;
}
$('#mw-content-text').prepend(
    $('<textarea>').val(abc.join('\n'))
);

/*
    @Purpose = Auto Adds New Page Name for MassRename
    @Author  = TheGoldenPatrik1
*/
var txt = document.getElementById('text-rename');
var val = txt.value.split('\n');
var num = 1;
$.each(val, function (k, v) {
    val[k] = 'File:' + v + ' File:Episode_1_-_' + num + '.jpg';
    num += 1;
});
txt.value = val.join('\n');