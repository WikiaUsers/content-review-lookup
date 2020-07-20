/** <nowiki>
 * Charm log add script
 * 
 * @notes This uses 5 abusefilters:
 *        - [[Special:AbuseFilter/48]]: Tag all charm ns edits
 *        - [[Special:AbuseFilter/49]]: Tag non-script charm log edits
 *        - [[Special:AbuseFilter/50]]: Tag new charm log submissions (logs with < 250 kills)
 *        - [[Special:AbuseFilter/51]]: Tag suspect charm log submissions
 *        - [[Special:AbuseFilter/52]]: Block rejected charm log submissions
 * @notes Charm images have been converted to base64
 *        A converter can be found at <http://dopiaza.org/tools/datauri/index.php>
 *        Using the "Retrieve file from a URL" and "Use base64 encoding" options
 * @notes This script contains an API available under the global `rs.charmTest`
 *        See the `charmTest` method below for usage
 *
 * @todo CSS for form
 * @todo complete docs for self.addLogLine
 * @todo allow certain users to submit blocked charm logs from [[RS:CVU/C]] in case of false positives
 * @todo add a method for reverting submissions via page history/diffs
 * @todo add something for double/triple(?) charm drops (charm drop weekends, familiarisation, etc.)
 */

;(function ($, mw, rs) {

    'use strict';

    var conf = mw.config.get([
            'wgArticlePath',
            'wgPageName',
            'wgUserName'
        ]),

        userWhitelist = ['Mattila22'],

        self = {
            /**
             * Placeholders for later use
             */
            isVorago: false,
            index: null,
            page: null,
            blocked: false,
            logged: false,
            reason: null,
            
            /**
             * Testing method
             * 
             * This method will cause alerts to be output detailing the action that would be taken if
             * the sample data were submitted through the normal form.
             * 
             * @param monster {string} The name of the monster
             * @param kills {number} The number of kills in the sample
             * @param gold {number} The number of gold charms dropped in the sample
             * @param green {number} The number of green charms dropped in the sample
             * @param crimson {number} The number of crimson charms dropped in the sample
             * @param blue {number} the number of blue charms dropped in the sample
             */
            charmTest: function (monster, kills, gold, green, crimson, blue) {
                var sample = {
                        kills: kills,
                        gold: gold,
                        green: green,
                        crimson: crimson,
                        blue: blue
                    };
                    
                // ensure index is always unset
                self.index = null;
                    
                self.getData(sample, monster);
            },

            /**
             * Initial loading method
             */
            init: function () {
                var $charmtable = $('.charmtable');

                if (!$charmtable.length) {
                    return;
                }

                // store boolean for easy reference
                // Vorago drops 1–5 sets of 5 charms, 5 charms per drop slot
                // this is used to alter the form slightly and skip a check for charm multiples
                self.isVorago = conf.wgPageName.toLowerCase().indexOf('vorago') > -1;

                // give each charm table an id
                $charmtable.each(function (index) {
                    $(this).attr('id', 'charmtable' + index);
                });

                // add event handlers to log submission links
                $charmtable
                    .find('a[href*="log_edit=true"]')
                    .on('click', function (e) {
                        e.preventDefault();

                        var $charmtable = $(this).parents('.charmtable'),
                            index = $charmtable.attr('id').slice(-1),
                            $form = $('#charmform' + index);

                        if (!$form.length) {
                            // remove any existing forms
                            // @todo ask if the user want to remove any existing forms first
                            $('.charmform').remove();

                            // insert new form
                            $form = self.buildForm(index);
                            $charmtable.after($form);
                        }
                    });
            },

            /**
             * Create the charm log form
             *
             * @param index {number} An index to identify associated tables and forms
             *
             * @return {jQuery.object} jQuery object representing the HTML of the charm log form
             */
            buildForm: function (index) {
                var $form = $('<form>')
                        .addClass('charmform')
                        .attr({
                            action: '#',
                            id: 'charmform' + index
                        })
                        .on('submit', self.submitForm),
                    $table = $('<table>')
                        .addClass('wikitable'),
                    $tr1 = $('<tr>')
                        .append(
                            $('<th>')
                                .text(self.isVorago ? 'Charm sets' : 'Total kills'),
                            $('<th>')
                                .append(
                                    $('<img>')
                                        .attr({
                                            alt: 'Gold charm.png',
                                            // [[:File:Gold charm.png]]
                                            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAbCAYAAACEP1QvAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AgeAAcWkgs+DwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAD8klEQVRIx6WX3U9bZRjAf+flQMuAUgoXq4VaMVGXhQBRY7xYYkyMUbNEk4m47GJbCFl24YX/kH+Bid4sWUjmDHFTGwKTqMhWCqWlTgmU8rFyPt7jRXvennNaaMHnpu97+p78ns/3eY4WiSdBCIToYDeXQdM0IvERXCkX8w7nlEh8WAOQlgmA6AqBlCAEALp7cDeXoX84BWz4wDdvfIaoHRZC86wFQgh2S3tYloVlWpiWhVn7lbbk4XzaiSSSmtA76xrV3gfQIvEkAHtbuarViZcRooPSZtb54tpH9PX2KBDA78uLPuv6YxfVuq+vVymid+ocHh5x7/48kURSQ8oGuO6C+19KApsgJaVCzvly6hM6hKBSOWYju9qWm/f3D9R6YCBKqKuLjz+8wr37845SwKOEFokn61bHRygX8wpc2itXvbLztw8y+dpQA3htW0VQnb90eRzDMPnn3+2qB2o5UHd7IlWNb2ED0Jwb01cV1CujQ1bbiba4uu3bv35pjK3i83oIAKT0wnPO3dnr5DYL54aepgBAuCfG3IPHSgEdKSkX887d2essP1lo6d6gfPPdUtPntz6daAiHMqgT1kzQ3RoMymngk4DBM64CrnR3h+sbKdHdGpRuFp7DynblxYsK7115W9W/Xi7mna+/ukX6l0cnWn0aNGhds0T1uv7ChbByvQ5gWe0nVStYK+kOh/2XTKlU9t1UYJ0au2bPm3nH/X90yPJl/wfvv8vcg8eO7t7TZ7E0CArug+94wZfHJvnhx5+rl1wzeLPyCIJOcn+rsEgpMQyjDtf1DmIDUf6vNAMHrZZSkt3YYiKV1JTluq63bf1ZPBG0WkrHn3DVlqkRG4iSzazUtd5pLLuzZPvatu5L5Cq8fp8IgMzqMrFYlFgsytj4my3v6Hbc7fVcbCBKtD/C/sEhh0dHfngo1Mlmvkg4FCIcDjE++VbbCrQDllJiS8lGdpW1Z3/5W2q5kHNmbl6jUjlmOBHHsi0Mw2Rx4deGaSUowV7vPe8msWlZZDMrmKaNYVos/5lnIpXUtEgipcam2dtTNQUuYpgmhmFiWXZDm20FB3jl1TdUnJ89/QPTtFn4bR2AiVS1paoZzh0YZ29PYRimUmBnp4SUjkqWnd3SiXBvvhwcHCqwbUvSS1kFhWpLVcOEO1uVi3nnzsw0lcoxx4bBYCzqg7vl4q57e3tO9MqTxTQAP6WfKvC63RGYXmtzu5Q27nBxZ2YawzDZfp5taLneWu0fHK4rZUt11paS8m6Rh49WFHjNxGeoggelXMg5AJ9ffUeBXagt65Do4Ihv71Xi2+/nmoOFqM1wAbjXA6MhwdJ67txfLD6w50vFtfw/AmNHnsG0YvAAAAAASUVORK5CYII='
                                        })
                                ),
                            $('<th>')
                                .append(
                                    $('<img>')
                                        .attr({
                                            alt: 'Green charm.png',
                                            // [[:File:Green charm.png]]
                                            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAMAAACXfxyGAAAAsVBMVEX///8AAAJaYVRkbF1GUD1SXUheZlhgaFpcZFZocGFicFZSWU1GS0FqcmNASThUW09WXVFialxWYUtrdGRQV0tveGhBRj1dalJYX1NxemlkclhmdFlpeFxbaFBXZE1KUEUODQ1wf2JvdmZgblU5QTJsfF9UX0lzfGttdmY1PC5DST86PzZ0fW07RDROVEl2f25CSzpxgWRzg2Vrel49QThZZk4/RDtmbl8gJRxfbFNKVEGCGoJtAAAAAXRSTlMAQObYZgAAARhJREFUeF6F08eOhTAMhWHsJHRu7316733e/8HGB8uRLpv5WRDp44gFIrHoqKQTcZ6m2dANqsd9PXvvOPVh3vsQgjwxuT1yGixYTFnK++pRQxA7RQHHjOvoJCgJHeSSvJSak1MUFVZHM1LFWdDYXrE3NoXBlStlG9sQDg534jSGdlKvwYWNUbyBJ2CWA7ibrD4podwYS4yjZt/CWZxDxE19inc7zIMB3MY5uMjYS8rmWKQMvpw2Di5sQXnRr8Dzcjn+at1SHfTOhRO6WF1dF/alPRJl0Rth8ZP1/bQZGiPmRe+BRNU3T8thmrOyc475uQfU6GVTNoXDE07zHhr99W27/djtRqOzn7kcRr+q0WlVtrLWu+k/v8Ef7a4ta/YTfxkAAAAASUVORK5CYII='
                                        })
                                ),
                            $('<th>')
                                .append(
                                    $('<img>')
                                        .attr({
                                            alt: 'Crimson charm.png',
                                            // [[:File:Crimson charm.png]]
                                            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAMAAACXfxyGAAAA+VBMVEX///8AAAJLLCpZPTtyY2NsVFNqU1JsXl1oUVBEKCZ0W1lqXFxmT05wYmFuYF9bIBxhTEtXREN8bGt2Z2ZNPTxoWlp4Xlx/b25kOjhqSUdkTk1sSkh9bW1uS0poR0VJKilfODZdNzRbNTN0ZWRfS0lmWVhQRkV8YV9ZNDJbT096amlNRENwV1aBcXBGNzY8IyJ2UU9SQD+DcnJUQkE3IB94UlBdSUiFdHN4aGh6VFJwTUuHdnVyWVhuVlV8VVNyTkwODQ19YmF6X15hVVR9VlR0UE5hOTdJPz9JOTgiFxZmRkRkRENhQ0FfQUBdQD5NLStqPjtoPTpmPDmOnDOkAAAAAXRSTlMAQObYZgAAASlJREFUeF6F09WOhjAUBGBOBf/dXdfd3d3l/R9mO0Ab4GbnquE7k5OG1NKhTKxcqBE4TrFQCMuHlZ36c86pC2OMcc7VxMpaxil0bWXgKMFd2sm1OVdWQjiOxYVF42RzpGTCVBztJDReI9pZPXKa4ZwgWK+oxCwiTb6nuBxzXEbASbBvUzlVoZoMo74HrpnN+eVzsMzcCXVzuyeyaD3Npg8tvij2UU8jHMoc7G6iDjdFXQ7AS740VzNBw2mAl1urAp5T6Xbn4HZnozqDZ9UOvS3FFm33dvs1/acZolQq3QdbdDA46h8LzYiUrupC4SenZy3//MKOWQghbc8DJn55Nby5bWJCxBmNoMbvHx7H48lkOu0MX9/ePz6/oCmn75/fthoZ9KIBrf88gz+z8S/5xgNNfAAAAABJRU5ErkJggg=='
                                        })
                                ),
                            $('<th>')
                                .append(
                                    $('<img>')
                                        .attr({
                                            alt: 'Blue charm.png',
                                            // [[:File:Blue charm.png]]
                                            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAbCAYAAACEP1QvAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3AgeAAcb7LpCsgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAEB0lEQVRIx6WXT0wbRxTGf7s2fwLNYkJ7oCaOS4D2VBE1jUJ7ps2hVaQeKrW3SFFE1EppwqlISaPeOXCPRM49tKKtokjccomgqRS1qpIGY4gxcQoFbxZqbO94tof1jnfXGAyMtNrZ3Zn53ve992beakY8CVKCrvMqu4ymaRi9J0HXAbBWMw6HbEY8oYXf6XoEKSsARJESgFfZZbr6ksDzAPDHV8fQqs/eXfc9b2xtI4WgIgRS2FRsgRQCUSrx5P59x+jt03zIChhAM3oTLviLjMs6fkoBj1y+TOxYewDw98V0gEl3LKb6sfZ2ZUgHUNzaYn5mxlWgqq6/RT25u95MACsgJVYu63xw5QqarrNVkaQymaZkNotF1e85/hqRlijnLl5kfmbGUS6oGqHrETQjngz42g+8ub0NQN40AyCfn323Dng2VTPQG3/mrSSiXMZaX2fux58Iu0Az4smqzM8BzflwbEyB+tvoQKLpQPvh0R+B5+FTCfK5XNAAD1zXI5grS84n179hcf3fOtDpyakDRfml8Wt1BgD0aPDXL78qA6JIibmacT4dv8Fvfz/bV95mgP1z/e5oLZcA6G/TSdugws+pptxuwN6CR22tHZ3BnG8Efpi2n5GWELzz0SiPl92NS7dyWeeziYlA/vpZe/4+CPvpySk1LxyobccNV/qWKvNKudxwkaOw3m1+a2dnUPaNQoHuWExd4YkHYR8GnJ6cYnQgQd40yZsmK5ubnLlwgcfLGUf379nN+O8g8l8av1aXdu+d7iebe1FjHolGd92t/EB7ucAb5x/TyEgpJWJnpwauR6P0GEbTTPdj7/8eZu1ISf7ZAsPJhKZkb8S+EbNG3/YyTEoZSGnF3GPvBUbeNANWhxdtRpHZVCYQyI6USB+4BrrT98WXjAwOIMpl7FKRRwupI2+zfuV6DAMp3CLDkZK5u3drskc6OkiZJi3t7bQe6+D9t4f2PKUOCuxU5U6vrJBKp32VTDyJtZpxzn07gdgpMHTihKtAscjc06d11Uq4hc96/3gviKUQpJaWqJRKOLbN5sOHDCcTmiqjrFzWOX/zFvZ/2wx1dyNsG7tYRNjlumN2P3CAgUSiDnjjwQP3fE+6VY0CR9exVjPO+Zu3qBSLDMa6ELbNumUp2SpCsGFZDcHPDg7USqpSGUdKFhYXAVibnVWgAGmbWiWjTp7VjDPy3W1EoYAoFXmj6jMvWLy+lzaxttZdmWu6zvwT123/3LungNOlUA0XSka3jrv9PWKnwMu1NfXef/R699e73RSiaoz/2tjM8/LnmRqwTWAtV3Zvb/eVt97PQv9XX6vF/ACEwHcb8+edO0HgUM2gxU6eRgpb+d0/oL9NVwf/YVpA6ur66o9FSv4HPGJ2PjgM5xEAAAAASUVORK5CYII='
                                        })
                                )
                        ),
                    $tr2 = $('<tr>')
                        .attr('id', 'ch-inputs')
                        .css('text-align', 'center')
                        .append(
                            $('<td>')
                                .append(
                                    $('<input>')
                                        .css('width', '50px')
                                        .attr({
                                            id: 'ch-kills',
                                            type: 'text'
                                        })
                                ),
                            $('<td>')
                                .append(
                                    $('<input>')
                                        .css('width', '50px')
                                        .attr({
                                            id: 'ch-gold',
                                            type: 'text'
                                        })
                                ),
                            $('<td>')
                                .append(
                                    $('<input>')
                                        .css('width', '50px')
                                        .attr({
                                            id: 'ch-green',
                                            type: 'text'
                                        })
                                ),
                            $('<td>')
                                .append(
                                    $('<input>')
                                        .css('width', '50px')
                                        .attr({
                                            id: 'ch-crimson',
                                            type: 'text'
                                        })
                                ),
                            $('<td>')
                                .append(
                                    $('<input>')
                                        .css('width', '50px')
                                        .attr({
                                            id: 'ch-blue',
                                            type: 'text'
                                        })
                                )
                        ),
                    $tr3 = $('<tr>')
                        .append(
                            $('<td>')
                                .attr('colspan', 5)
                                .css('text-align', 'center')
                                .append(
                                    $('<input>')
                                        .attr({
                                            id: 'cf-submit',
                                            type: 'submit'
                                        })
                                        .val('Submit')
                                )
                        );

                $table.append($tr1, $tr2, $tr3);
                $form.append($table);

                return $form;
            },

            /**
             * Form submit handler
             *
             * - Gets the data from the form
             * - Fills in any blanks with 0's
             * - Rejects any non-numeric data
             *
             * @param e {jQuery.event} jQuery event object
             */
            submitForm: function (e) {
                e.preventDefault();

                var $this = $(this),
                    index = $this.attr('id').slice(-1),
                    $submit = $this.find('#cf-submit'),
                    sample = {
                        kills: $this.find('#ch-kills').val(),
                        gold: $this.find('#ch-gold').val(),
                        green: $this.find('#ch-green').val(),
                        crimson: $this.find('#ch-crimson').val(),
                        blue: $this.find('#ch-blue').val()
                    },
                    // used to track if the user has confirmed that any empty inputs
                    // should default to 0
                    zeroChecked = false,
                    x,
                    y;

                self.index = index;

                // disable the submit button
                $submit.prop('disabled', true);

                // performs very basic checks on data before continuing
                // @example making sure all numbers have been filled in
                //          or preventing non-positive numbers/non-integers from being submitted
                // anything that we might want to log as vandalism gets handled by `self.checkSubmission`
                for (x in sample) {
                    if (sample.hasOwnProperty(x)) {
                        y = sample[x];

                        if (!y.trim()) {
                            if (
                                !zeroChecked &&
                                !confirm('The inputs that were left empty will default to 0. Continue?')
                            ) {
                                $submit.prop('disabled', false);
                                return;
                            }

                            zeroChecked = true;
                            y = 0;
                        } else {
                            y = parseInt(y, 10);

                            if (isNaN(y)) {
                                self.resetForm('You have entered a non-number into the form. Please check your submission and try again.');
                                return;
                            }

                            if (y < 0) {
                                self.resetForm('You have entered a negative number into the form. Please check your submission and try again.');
                                return;
                            }
                        }

                        sample[x] = y;
                    }
                }

                mw.log(sample);
                self.getData(sample);
            },

            /**
             * Output an error message and reset the charm log form
             *
             * @param message {string} The message to output to the user
             * @param reset {boolean} Reset the values in the inputs
             */
            resetForm: function (message, reset) {
                // set blocked status here
                //
                // this will be set if there are any erorrs with the input such as negative numbers
                // despite it being here for API usage
                // however, as it's not checked until actually submitting the edit (which the API won't do)
                // it should be fine
                //
                // this is also set after the submission has been made
                // but by then it's too late and the page will be reloaded anyway
                self.blocked = true;
                self.reason = message;
                
                // check if index is set to see if this is being used via the form or through it's API
                if (self.index !== null) {
                    if (reset) {
                        $('#ch-inputs input').val('');
                    }
                    
                    alert(message);

                    $('#cf-submit').prop('disabled', false);
                }
            },

            /**
             * Get current charm log data for comparison to new sample
             *
             * @param sample {object} An object containing the submitted charm data
             *                        Expected keys: kills, gold, green, crimson, blue
             *                        where each value is an integer
             * @param monster {string} The name of the monster to get data for
             *                         Only used for API usage, never through the normal form usage
             */
            getData: function (sample, monster) {
                var page = monster || $('#charmtable' + self.index).data('monster');
                mw.log(page);
                self.page = 'Charm:' + page;

                (new mw.Api())
                    .get({
                        action: 'query',
                        prop: 'revisions',
                        rvprop: 'content',
                        titles: self.page
                    })
                    .done(function (res) {
                        var pages = res.query.pages,
                            keys = ['kills', 'charms', 'gold', 'green', 'crimson', 'blue'],
                            content,
                            data;
                        
                        if (pages[-1]) {
                            alert('Charm data has not been set up for ' + page + '. If you believe this is an error, please contact an administrator.');
                            return;
                        }
                        
                        content = pages[Object.keys(pages)[0]].revisions[0]['*'];
                        data = rs.parseTemplate('charm data', content);

                        if ($.isEmptyObject(data)) {
                            alert('Charm data could not be found for ' + page + '. If you believe this is an error, please contact an administrator.');
                            return;
                        }

                        // convert number strings to actual numbers
                        keys.forEach(function (elem) {
                            data[elem] = parseInt(data[elem] || 0, 10);
                        });

                        mw.log(data);
                        self.checkSubmission(data, sample);
                    });
            },

            /**
             * Perform a number of basic checks on the log submission
             *
             * @param data {object} An object containing the current charm data
             *                      Expected keys:
             *                          string values: view, notes, log, monster
             *                          integer values: kills, gold, green, crimson, blue, charms
             *                      Optional keys: rare
             *                      where each value is a string
             *                      See [[Template:Charm data]] for more details
             * @param sample {object} An object containing the submitted charm data
             *                        Expected keys: kills, gold, green, crimson, blue
             *                        where each value is an integer
             */
            checkSubmission: function (data, sample) {
                var minKills = ((data.rare || '').trim().toLowerCase() === 'yes') ? 15 : 50,
                    max = sample.kills * data.charms;
                
                // reset private variables for repeat submissions/API usage
                self.logged = false;
                self.blocked = false;

                // enforce upper kill limit (5000)
                if (sample.kills > 5000) {
                    self.resetForm('The number of kills you have submitted is above the allowed amount per submission.');
                    return;
                }

                // enforce lower kill limit
                if (sample.kills < minKills) {
                    self.resetForm('The total amount of kills you submitted is below the required amount of ' + minKills + '. You can only submit charm data for ' + minKills + ' kills or more.');
                    return;
                }

                // make sure there are charms to add to the log
                if ((sample.gold + sample.green + sample.crimson + sample.blue) === 0) {
                    self.resetForm('The total amount of charms you received was 0. You can only submit when you\'ve received charms in your monster kills (increasing the sample size by killing more monsters).');
                    return;
                }

                // check the correct multiples of charms have been submitted
                // @example multiples of 2 for a monster that drops 2 charms at a time
                if (
                    (
                        sample.gold % data.charms !== 0 ||
                        sample.green % data.charms !== 0 ||
                        sample.crimson % data.charms !== 0 ||
                        sample.blue % data.charms !== 0
                    // @todo document why we do this
                    ) && !self.isVorago
                ) {
                    self.resetForm('It is not possible to receive that amount of charms. You ' + ((sample.gold + sample.green + sample.crimson + sample.blue) / data.charms > sample.kills ? 'submitted more charm drops than kills' : 'submitted an amount of charms that can\'t be divided by ' + data.charms + ', the amount of charms you get per kill'));
                    return;
                }
                
                // enforce a maximum limit to how many charms can be submitted
                // simply: kills * no._of_charms_per_kill
                // not having this can cause the standard score test to fail as well
                if ((sample.gold + sample.green + sample.crimson + sample.blue) > max) {
                    self.resetForm('It is not possible to receive that amount of charms.');
                    return;
                }

                self.calcScore(data, sample);
                
                // check if index is set to see if this is being used via the form or through it's API
                if (self.index !== null) {
                    self.submitLogEntry(data, sample);
                }
            },

            /**
             * Calculate standard score for the submission based on existing log entries
             * 
             * We're using a two-proportion z-test for this
             * @notes <http://en.wikipedia.org/wiki/Statistical_hypothesis_testing#Common_test_statistics>
             * 
             * This has been separated out of `self.checkSubmission` as it's a bit more complicated than other checks
             * 
             * @param data {object} An object containing the current charm data
             *                      Expected keys:
             *                          string values: view, notes, log, monster
             *                          integer values: kills, gold, green, crimson, blue, charms
             *                      Optional keys: rare
             *                      where each value is a string
             *                      See [[Template:Charm data]] for more details
             * @param sample {object} An object containing the submitted charm data
             *                        Expected keys: kills, gold, green, crimson, blue
             *                        where each value is an integer
             */
            calcScore: function (data, sample) {
                    // calculate constants here where possible
                var n1 = sample.kills * data.charms,
                    n2 = data.kills * data.charms,
                    // i for invert
                    n1i = 1 / n1,
                    n2i = 1/ n2,
                    charms = ['gold', 'green', 'crimson', 'blue'],
                    prob = {},
                    logline = [sample.kills];
                
                charms.forEach(function (el) {
                    var x1 = sample[el],
                        x2 = data[el],
                        p = (x1 + x2) / (n1 + n2),
                        p1 = x1 / n1,
                        p2 = x2 / n2,
                        z = (p1 - p2) / Math.sqrt(p * (1 - p) * (n1i + n2i));
                        
                    // round to 2 d.p. and absolute it
                    z = Math.abs(Math.round(z * 100) / 100);
                    
                    prob[el] = z;
                    logline.push(sample[el], z, '');
                });

                // test if sample is within 2 standard deviations of the current data
                // as long as the current data contains more than 500 kills
                // if this fails, the edit is logged
                if (
                    (prob.gold > 2 || prob.green > 2 || prob.crimson > 2 || prob.blue > 2) &&
                    data.kills > 500
                ) {
                    // test if sample is within 3 standard deviations of the current data
                    // as long as the current data contains more than 1000 kills
                    // if this fails, the edit is logged and blocked
                    if (
                        (prob.gold > 3 || prob.green > 3 || prob.crimson > 3 || prob.blue > 3) &&
                        data.kills > 1000
                    ) {
                        if (!(conf.wgUserName && userWhitelist.indexOf(conf.wgUserName) > -1)) {
                            self.blocked = true;
                            self.message = 'Part(s) of the submitted data are 3 or more standard deviations above the known data.';
                        }
                    }

                    self.logged = true;
                    
                    // check if index is set to see if this is being used via the form or through it's API
                    if (self.index !== null) {
                        self.addLogLine(logline);
                    }
                }
                
                if (self.index !== null) {
                    return;
                }
                
                mw.log(logline);
                
                // API output done here due to async API requests
                if (self.blocked) {
                    alert('Sample would be blocked with the following reason:' + self.message);
                } else if (self.logged) {
                    alert('Sample would be logged as suspicious.');
                } else {
                    alert('Sample would be submitted with no problems.');
                }
            },

            /**
             * Log the submission to [[RS:CVU/C]]
             * 
             * @param data {array}
             */
            addLogLine: function (data) {
                var line = '\n|-\n' +
                        '| [[Special:Contributions/{{subst:REVISIONUSER}}|{{subst:REVISIONUSER}}]]' +
                        ' || ' + data.join(' || ') +
                        ' || [[' + self.page + '|]]' +
                        ' || ' + (self.blocked ? 'Disallowed' : '[{{fullurl:' + self.page + '|action=history}} History]') +
                        ' || {{subst:#time:Y-m-d H:i:s}}';

                mw.log(line);

                (new mw.Api())
                    .post({
                        action: 'edit',
                        title: 'RuneScape:Counter-Vandalism Unit/Charms',
                        summary: '',
                        minor: 'yes',
                        appendtext: line,
                        token: mw.user.tokens.get('editToken'),
                    })
                    .done(function (resp) {
                        mw.log(resp);
                    });
            },

            /**
             * Merge the submission into the main charm log
             *
             * @param data {object} An object containing the current charm data
             *                      Expected keys:
             *                          string values: view, notes, log, monster
             *                          integer values: kills, gold, green, crimson, blue, charms
             *                      Optional keys: rare
             *                      where each value is a string
             *                      See [[Template:Charm data]] for more details
             * @param sample {object} An object containing the submitted charm data
             *                        Expected keys: kills, gold, green, crimson, blue
             *                        where each value is an integer
             */
            submitLogEntry: function (data, sample) {
                var isNewLog = (data.kills < 250);
                
                data.kills += sample.kills;
                data.gold += sample.gold;
                data.green += sample.green;
                data.crimson += sample.crimson;
                data.blue += sample.blue;

                var template = '{{Charm data\n' +
                        '|view={{{view}}}\n' +
                        '|monster=' + self.page.replace(/charm:/i, '').trim() + '\n' +
                        '|charms=' + data.charms + '\n' +
                        (data.action ? ('|action=' + data.action + '\n') : '') +
                        ((data.rare || '').toLowerCase().trim() === 'yes' ? '|rare=yes\n' : '') +
                        '|kills=' + data.kills + '\n' +
                        '|gold=' + data.gold + '\n' +
                        '|green=' + data.green + '\n' +
                        '|crimson=' + data.crimson + '\n' +
                        '|blue=' + data.blue + '\n' +
                        '}}',
                    summary = 'Submitted charm data using the form;',
                    // multiple by 100 once to convert to a percentage
                    // the second time to get around rounding issues in Math.round
                    divisor = 100 * 100 / (sample.kills * data.charms);
                    
                if (isNewLog) {
                    summary += ' new charm log;';
                }

                if (self.blocked) {
                    summary += ' blocked;';
                } else if (self.logged) {
                    // @todo merge into normal vandalism filter like previous script?
                    summary += ' potential vandalism;';
                }

                // round each percentage to 2 d.p.
                summary += ' kills=' + sample.kills + ', ' +
                    'gold=' + sample.gold + ' (' + Math.round(sample.gold * divisor) / 100 + '%), ' +
                    'green=' + sample.green + ' (' + Math.round(sample.green * divisor) / 100 + '%), ' +
                    'crimson=' + sample.crimson + ' (' + Math.round(sample.crimson * divisor) / 100 + '%), ' +
                    'blue=' + sample.blue + ' (' + Math.round(sample.blue * divisor) / 100 + '%);';

                mw.log(template);
                mw.log(summary);

                (new mw.Api())
                    .post({
                        action: 'edit',
                        title: self.page,
                        summary: summary,
                        minor: 'yes',
                        text: template,
                        token: mw.user.tokens.get('editToken')
                    })
                    .done(function (resp) {
                        mw.log(resp);
                        self.resetForm('Thank you for your submission! The page will now be reloaded.');
                        location.replace(conf.wgArticlePath.replace('$1', conf.wgPageName));
                    });
            }
        };

    mw.loader.using(['mediawiki.api'], function () {
        $(self.init);
    });
    
    // exports
    rs.charmTest = self.charmTest;

}(this.jQuery, this.mediaWiki, this.rswiki));