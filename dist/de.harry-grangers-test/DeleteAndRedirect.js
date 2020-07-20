if(wgAction === 'delete') {
	$('#mw-deleteconfirm-table tr:nth-child(3) .mw-input').append(
        $('<input />',{name: 'wpRedirect', type:'checkbox', value:'1', checked:false, id:'wpRedirect', tabindex:'3'}).click(function() {
            $('#mw-deleteconfirm-table .wpTargetRow').toggle();
        }),
        '&nbsp;',
        $('<label />',{for: 'wpRedirect'}).text('Redirect')
    );
    $('#mw-deleteconfirm-table tr:nth-child(3)').after(
        $('<tr />',{class: 'wpTargetRow'}).css('display','none').append(
            $('<td />',{class: 'mw-label'}).append(
                $('<label />',{for: 'wpTarget'}).text('Target:')
            ),
            $('<td />',{class: 'mw-input'}).append(
                $('<input />',{type: 'text', id: 'wpTarget', size:60})
            )
        )
    );
    $('#wpConfirmB').click(function(e) {
        e.preventDefault();
        wpRedirect = !!parseInt($('#wpRedirect').val());
        wpTarget = $('#wpTarget').val();
        $.post('/api.php',{
            action: 'delete',
            title: wgPageName,
            token: mw.user.tokens.get('editToken'),
            reason: $('#wpReason').val(),
            watchlist: !!parseInt($('#wpWatch').val()) ? 'watch' : 'unwatch',
            format: 'json'
        },function(res) {
            if(wpRedirect && !!wpTarget.length) {
                $.post('/api.php',{
                    action: 'edit',
                    title: wgPageName,
                    summary: 'Redirect to:' + wpTarget,
                    text: '#REDIRECT [[' + wpTarget + ']]',
                    watch: true,
                    token: mw.user.tokens.get('editToken')
                },function(res) {
                    console.log(res);
                },'json');
            }
        },'json');
    });
}