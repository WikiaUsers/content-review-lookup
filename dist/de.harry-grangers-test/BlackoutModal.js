function showBlackoutModal(title,content)
    return $('<div />').addClass('modal-blackout visible').append(
        $('<div />').addClass('modal content-size').append(
            $('<header />').append(
                $('<a />').addClass('close').attr('title','close').text('close'),
                $('<h3 />').text(title)
            ),
            $('<section />').append(
                $('<p />').text(content)
            ),
            $('<footer />').append(
                $('<div />').addClass('buttons')
            )
        )
    ).appendTo($('body'))

}