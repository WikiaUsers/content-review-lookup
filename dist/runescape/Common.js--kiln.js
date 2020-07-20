//<nowiki>
// Fight Kiln map script
// makes [[Template:Fight Kiln map]] interactive
;(function($, mw) {
    // required dependancy
    mw.loader.using(['mediawiki.api'], function () {
        var api = new mw.Api(), $wrapper, $buttons, $msgs, $map, i, $left, $right, $select, $button, curr = 1, width;

        // loads the map for the given wave using an api query
        function get_map(wave) {
            var params = {
                action: 'parse',
                text: '{{Fight Kiln map|' + wave + '}}',
                prop: 'text',
                title: 'Fight Kiln map',
                disablepp: 'true'
            };

            // disable the buttons and show a loading text while waiting for the query
            setDisabledAll(true);
            $msgs.empty()
                .text('Loading...');

            // do the query
            api.post(params).done(
                // success, put the response into the form, check the buttons and remove the message
                function (response) {
                    $map.html(response.parse.text['*']);
                    check_buttons();
                    $msgs.empty();
                }
            ).fail(
                // failure, show a message and the retry button
                function (_,err) {
                    $msgs.empty()
                        .append('There was an error loading the map')
                        .append('<br />')
                        .append(retry_button());
                    check_buttons();
                    console.log(err);
                }
            );
        }

        // if curr is 1-, disable the decrement button; if 37+, disable the increment button; update value in the select
        function check_buttons() {
            setDisabledAll(false);
            if (curr <= 1) {
                $left.attr('disabled', 'disabled');
            } else if (curr >= 37) {
                $right.attr('disabled', 'disabled');
            }
            $select.val(curr);
        }

        // mass disable/enable: true = disabled, false = enabled
        function setDisabledAll(dis) {
            if (dis) {
                $left.attr('disabled', 'disabled');
                $select.attr('disabled', 'disabled');
                $right.attr('disabled', 'disabled');
            } else {
                $left.removeAttr('disabled');
                $select.removeAttr('disabled');
                $right.removeAttr('disabled');
            }
        }

        // retry button, only shown in event of error
        // $msg.empty() removes the click event, so re-make it each time in case of repeated errors
        function retry_button() {
            var $retry = $('<button id="kilnmap-button-retry">')
                .removeAttr('disabled')
                .text('Retry')
                .addClass('button');
            $retry.click(function () { console.log('retrying...'); get_map(curr); });
            return $retry;
        }

        //remove the 'you need js' notice
        $('#kilnmap-js-notice').remove();
        // set the width so the buttons appear in the right place
        width = $('#kilnmap table').width();
        $wrapper = $('#kilnmap')
            .css('width', (width+2) + 'px');
        // setup the 'sections': buttons, messages, map
        $buttons = $('<div id="kilnmap-buttons" style="text-align:center;">');
        $msgs = $('<div id="kilnmap-msg" style="font-weight:bold; text-align:center;">');
        $map = $('<div id="kilnmap-map">').html($wrapper.html());
        $wrapper.empty()
            .append($buttons)
            .append($msgs)
            .append($map);

        // left button, decrement
        $left = $('<button id="kilnmap-button-left">')
            .text('←')
            .addClass('button');
        $left.click(function () { curr--; get_map(curr); });

        //right button, increment
        $right = $('<button id="kilnmap-button-right">')
            .text('→')
            .addClass('button');
        $right.click(function () { curr++; get_map(curr); });
        
        //select box
        $select = $('<input id="kilnmap-field" type="number" value="1" style="text-align:center; width:3.5em; margin:auto 0.5em;">');
        $select.change(function () { var $val = parseInt($(this).val(), 10); if (!isNaN($val) && $val <= 37 && $val >= 1) { curr = $val; get_map(curr); } else { $msgs.text('Error: please enter a number between 1 and 37.'); check_buttons(); } });

        //attach buttons and select
        $buttons.append($left)
            .append($select)
            .append($right);

        // initial check
        check_buttons();
    });
}(this.jQuery, this.mediaWiki));
//</nowiki>