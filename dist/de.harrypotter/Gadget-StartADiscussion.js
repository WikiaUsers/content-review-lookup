if($('.js-start-a-discussion').length) {
    $('.js-start-a-discussion').append(
        $('<form />').append(
            $('<textarea />'),
            $('<div />',{class: 'wds-button-group'}).append(
                $('<div />',{
                    class: 'wds-button',
                    'data-action': 'submit-new-discussion'
                }).text('Post!')
            )
        )
    );
}