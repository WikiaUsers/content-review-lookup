/* Таймер */
;(function( $ ) {
    function plural( i, t ) {
        if ( 10 <= ( i%100 ) && ( i%100 ) <= 20 ) return obj_plural[t][2];

        switch( i%10 ){
            case 1:
                return obj_plural[t][0];
            case 2:
            case 3:
            case 4:
                return obj_plural[t][1];
            default:
                return obj_plural[t][2];
        }
    }
    
    function updateTimer() {
        $( '.timer:not(.stop)' ).each(function() {
            var dataTo = $( this ).data( 'data-to' ),
                dataEnd = $( this ).attr( 'data-end' ),
                dataDelimFull = $( this ).attr( 'data-delim-full' ),
                //dataShowMonth = $(this).attr('data-show-month'),
                diff = Math.floor( (dataTo - now)/1000 );

            if ( diff < 0 ) {
                if ( dataEnd === 'text' ) {
                    $(this)
                      .text( $( this ).attr( 'data-text' ) )
                      .addClass( 'stop' );
                    return;
                } else if ( dataEnd === 'stop' ) {
                    diff = 0; 
                    $( this ).addClass( 'stop' );
                } else {
                    diff = -diff;
                }
            }

            // Секунды
            $( '.second .num', this ).text( diff%60 );
            if ( dataDelimFull ) {
                $( '.second .small',this ).text( plural( diff%60, 's') );
            }
            $( '.minute', this ).attr( 'title', 'или ' + diff + ' ' + plural( diff, 's') );
            diff = Math.floor( diff/60 );
            // Минуты
            $( '.minute .num', this ).text( diff%60 );
            if ( dataDelimFull ) {
                $('.minute .small',this).text( plural( diff%60, 'm') );
            }
            $( '.hour', this ).attr( 'title', 'или ' + diff + ' ' + plural( diff, 'm') );
            diff = Math.floor( diff/60 );
            // Часы
            $( '.hour .num', this ).text( diff%24 );
            if ( dataDelimFull ) {
                $( '.hour .small', this ).text( plural( diff%24, 'h' ) );
            }
            $( '.day', this ).attr( 'title', 'или ' + diff + ' '+plural( diff, 'h' ) );
            diff = Math.floor( diff/24 );
            // Дни
            $( '.day .num', this ).text( diff );
            if (dataDelimFull) {
                $( '.day .small', this ).text( plural( diff, 'd' ) );
            }
        });
    }

    var now = new Date(),
        obj_plural = {
            's' : ['секунда', 'секунды', 'секунд'],
            'm' : ['минута', 'минуты', 'минут'],
            'h' : ['час', 'часа', 'часов'],
            'd' : ['день', 'дня', 'дней']
        };

    $( '.timer' ).each( function() {
        var dataTo = new Date( $(this).attr('data-to') ),
            dataEnd = $(this).attr('data-end'),
            dataRepeat = $(this).attr('data-repeat'),
            dataRepeatCount = $(this).attr('data-repeat-count')*1,
            diff = Math.floor( (dataTo - now)/1000 );

        $(this).append(
            '<span class="month">' +
                '<span class="num"></span>' +
                '<span class="small" style="font-size: 30%; margin: 0px 4px;">Минут</span>' +
            '</span>' +
            '<span class="day">' +
                '<span class="num"></span>' +
                '<span class="small" style="font-size: 85%; margin: 0px 4px;"></span>' +
            '</span>'
        );
        $( this ).find( '.month' ).css( 'display', $(this).attr('data-show-month') ? '':'none' );
        $(this).find('.day .small').text( plural( Math.floor(diff / 86400), 'd') );
        
        if (dataEnd === 'repeat') 
            while ( diff<0 ) {
                switch( dataRepeat.toLowerCase() ) {
                    case 'year':
                        dataTo.setFullYear(dataTo.getFullYear()+dataRepeatCount); break;
                    case 'month':
                        dataTo.setMonth(dataTo.getMonth()+dataRepeatCount); break;
                    case 'day':
                        dataTo.setDate(dataTo.getDate()+dataRepeatCount); break;
                }
            diff = Math.floor((dataTo - now)/1000);
        }

        $(this).data('data-to',dataTo);
    });

    updateTimer();
    setInterval(updateTimer, 1000);
})( this.jQuery );