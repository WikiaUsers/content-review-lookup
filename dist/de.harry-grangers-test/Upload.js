if(!!$('.upload-button').length) {
    $('.upload-button').replaceWith($('<input />').attr('type','file').on('change', function() {
        files = $(this).get(0).files;
        console.log('files',$(this).val(),files[0].name);
        confirmed = confirm('Wollen Sie die Datei "' + files[0].name + '" wirklich hochladen?');
        if(confirmed) {
            $.ajax({
                url: '/api.php?action=upload&filename=' + files[0].name + '&file=file_contents_here&format=json&token=' + mw.user.tokens.get('editToken'),
                contentType: 'multipart/form-data'
            }).always(function(data) {
                console.log(data);
            });
        }
        /*for(i in files) {
            console.log('file',files[i].name);
        }*/
    }));
}