/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
jQuery(document).ready(function ($) {
        $('#wpTextbox1').wikiEditor('addToToolbar', {
                section: 'advanced',
                group: 'format',
                tools: {
                        buttonId: {
                                label: 'Avisa de que esta pagina se esta remodelando',
                                type: 'button',
                                icon: '//upload.wikimedia.org/wikipedia/commons/f/f9/Toolbaricon_regular_S_stroke.png',
                                action: {
                                        type: '{{working}}',
                                        }
                                }
                        }
                }
        });
});