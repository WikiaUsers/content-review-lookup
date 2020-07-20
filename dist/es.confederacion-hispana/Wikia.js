/**
 * <nowiki>
 * @name SenadoFeedbackForm
 * @version 06192020.01
 * @author Xakuzyo
 * 
 * @staff if you gonna reject it, please leave the reason at the discussion page.
 * 
 * @privacy notice: we are not trying to collect users' info, a notice in the form will warn to user of DO NOT put his personal info in the form.
*/
(function(){
    window.senadoFeedbackForm = window.senadoFeedbackForm || {
        /**
         * Getting basic info of current user's sesion
        */
        username: mw.config.get('wgUserName'),
        version: '06192020.01',
        /**
         * Prints something with the "SenadoFeedbackForm" label.
        */
        log: function(str, type) {
            type = type || 'info';
            var stl = 'color: #$1; font-weight: 700;';
            if (typeof str === 'object') str = JSON.stringify(str, null, 4);
            
            switch(type) {
                case 'warn':
                    stl = stl.replace(/\$1/g, 'FDA114');
                break;
                case 'error':
                case 'danger':
                    stl = stl.replace(/\$1/g, 'FF4A65');
                break;
                default:
                    stl = stl.replace(/\$1/g, '4A96FF');
            }
            console.log('%c[SenadoFeedbackForm]%c '+str, stl, '');  
        },
        /**
         * Verifies if the page is the correct to inject the form.
         * Automatically it will inject if the id of page is 254 (Senado Confederado)
        */
        verifyPage: function() {
            mw.config.get('wgArticleId') === 254 ? this.inject() : this.log('No feedback page');
        },
        /**
         * Returns a div element with label and input.
         * @param {Object} o Options object
         * @utility
        */
        newInput: function(o) {
            return $('<div>', {
                class: 'ff-input'
            }).append([
                $('<label>', {
                    class: 'ff-'+o.name+'-label',
                    text: o.label,
                    'for': 'ff-'+o.name
                }),
                
                $('<input>', {
                    class: 'ff-'+o.name,
                    id: 'ff-'+o.name,
                    type: o.type || 'text',
                    name: o.name,
                    disabled: o.disabled || false,
                    value: o.value ? mw.html.escape(o.value) : '',
                    required: o.required || true
                })
            ]);
        },
        /**
         * Replaces the content of the "#feedback-form" element with a form.
         * It will stop if the user isn't logged in.
        */
        inject: function() {
            this.log(this.version);
            var frm = $('#feedback-form');
            var self = this;
            
            if (!this.username) {
                this.log('Anon user detected', 'warn');
                frm.append($('<div>', {
                    class: 'ff-anon',
                    text: 'Para acceder a este formulario tienes que iniciar sesión con una cuenta de FANDOM.'
                }));
                return false;
            }
            
            // Preparing form
            var frmCont = $('<form>', {
                class: 'ff-container',
                action: '#'
            });
            
            frm.empty(); // Clear the form
            this.log('Injecting...');
            
            // Form elements
            var frmElements = [
                // Username (disabled by default)
                $('<div>', { class: 'ff-row ff-userdetails' }).append(
                    this.newInput({
                        name: 'username',
                        label: 'Nombre de usuario',
                        value: this.username,
                        disabled: true
                    })
                ),
                
                $('<div>', { class: 'ff-row ff-wikidetails' }).append([
                    // Interwiki link (e.g. terraria, minecraft, runescape, etc...)
                    this.newInput({
                        name: 'interwiki',
                        label: 'Interwiki'
                    }),
                    // Community name (e.g. Wiki Terraria, Minecraft Wiki, RuneScape Wiki, etc...)
                    this.newInput({
                        name: 'community',
                        label: 'Nombre del wiki'
                    })
                ]),
                
                $('<div>', { class: 'ff-col' }).append([
                    // Title of the feedback
                    this.newInput({
                        name: 'title',
                        label: 'Título'
                    }),
                    
                    $('<div>', { class: 'ff-col ff-description-container' }).append([
                        $('<label>', {
                            class: 'ff-description-label',
                            text: 'Descripción',
                            'for': 'ff-description'
                        }),
                        
                        // Body text of the feedback
                        $('<textarea>', {
                            class: 'ff-description',
                            id: 'ff-description',
                            name: 'description',
                            placeholder: 'Descripción y cuerpo del asunto',
                            required: true
                        })
                    ]),
                    
                    $('<button>', {
                        class: 'ff-submit',
                        id: 'ff-submit',
                        type: 'submit',
                        text: 'Enviar'
                    }),
                    
                    // Privacy notice
                    $('<div>', {
                        class: 'ff-notice',
                        id: 'ff-notice1',
                        html: 'Por favor intente no insertar datos personales dentro de este formulario. Una vez que haya enviado este formulario usted está cumpliendo con los <a href="https://www.fandom.com/es/terms-of-use-es">Términos de Uso de FANDOM</a> y los requisitos previamente mencionados en esta página.'
                    })
                ])
            ].forEach(function(el) {
                frmCont.append(el); // append all to the form container
            });
            
            frm.append(frmCont); // append form container to the page
            
            // submit function
            $('form.ff-container').submit(function(e) {
                e.preventDefault();
                $('form.ff-container button#ff-submit').attr('disabled', true);
                
                var feedbackObj = {}
                var feedbackFields = $('#feedback-form input, #feedback-form textarea').serializeArray().forEach(function(a) {
                        feedbackObj[a.name] = mw.html.escape(a.value)
                });
                
                self.log('Form submitted, initializing MW API...');
                
                var _api = new mw.Api();
                var _date = new Date();
                
                // format of the title: SE:DDMMYYYY.interiki-link
                var feedbackTitle = 'SE:'
                    +('0' + _date.getDate()).slice(-2)
                    +('0' + (_date.getMonth()+1)).slice(-2)
                    +_date.getFullYear()+'.'
                    +feedbackObj.interwiki;
                
                // page content, data provided by the form
                var feedbackContent = [
                    '{{FeedbackDialog',
                    '|wiki='+feedbackObj.interwiki,
                    '|comunidad='+feedbackObj.community,
                    '|estado=nueva',
                    '|título='+feedbackObj.title,
                    '|descripción='+feedbackObj.description,
                    '|autor='+self.username+'}}'
                ].join('\n');
                
                // creates the page with content
                _api.post({
                    action: 'edit',
                    title: feedbackTitle,
                    text: feedbackContent,
                    token: mw.user.tokens.values.editToken,
                    createonly: true
                }).done(function(){
                    self.log('Should be done, redirecting...');
                    window.location.href='/es/'+feedbackTitle;
                });
            })
        }
    }

    mw.loader.using('mediawiki.api').then(senadoFeedbackForm.verifyPage.bind(senadoFeedbackForm));
})();
/*</nowiki>*/