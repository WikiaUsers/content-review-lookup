/* Buradaki tüm JavaScriptler mobil siteyi kullanan kullanıcılar için yüklenecek */
/************************************
/* Ana Sayfa Mobil Betiği *
/************************************/
// Yazar:  Shawn Bruckner
// Tarih:   7 Haziran 2018
// Lisans: CC-BY 3.0

// MediaWiki:Mobile.css dosyasında .mobilecollapsible stilleriyle eşlenen bu betiği, hem standart hem de mobil görünümde .fp-box'ın daraltılabilir olmasını // destekler
// 2 veya 3 sütunlu duyarlı ön sayfalar.

// Bir .fp-box mobil görünümde daraltılabilir yapmak aşağıdakileri içerir:
//   1. "fp-box" yanında başka bir sınıf olarak "mobilecollapsible" ekleniyor.
//   2. "fp-heading" sınıfı tarafından tanımlanan bir başlık olduğundan emin olun.
//      * Başlıkların içindeki bağlantılar yine de çalışabilir, ancak kutuyu daraltmaya / genişletmeye çalışırken kolayca parmak izi bırakacakları için 
//        önerilmez.
//      * Betik birden fazla başlığa izin verir ve otomatik olarak "nomobile" veya "notoggle" sınıfını yok sayar.
//      * Bunları hariç tuttuktan sonra hala birden fazla başlık varsa, yalnızca ilk başlık daraltılmış bir geçiş bağlantısına dönüştürülür.
//   3. "fp-body" sınıfıyla bir div veya başka bir blok içine daraltıldığında gizlenmesi gereken alanı yerleştirme.
//      * Bunun için başlık hariç her şeyin kutudaki olması genellikle en iyisidir.
//   4. İsteğe bağlı olarak, kutuyu varsayılan olarak genişletmek için "mobilecollapsible" ifadesinin yanına "expanded" ifadesini ekleyin.

var fpmobilecollapse = fpmobilecollapse || {
    initialize : function() {
        var index = 0;
        $( '.fp-box.mobilecollapsible' ).each( function() {
            var heading = $( this ).children( '.fp-heading' ).not( '.nomobile, .notoggle' );
            if ( heading.length > 0 && $( this ).children( '.fp-body' ).length > 0 ) {
                $( this ).addClass( 'mobilecollapsible' + index );
                if ( !( $( this ).hasClass( 'expanded') ) ) {
                    $( this ).addClass( 'collapsed' );
                }
                heading.first().html( $( '<a class="togglecollapse" href="javascript:fpmobilecollapse.toggle( ' + index + ' )"></a>' ).html( heading.html() ) );
            }
            ++index;
        } );
    },
    toggle : function( index ) {
        $( '.fp-box.mobilecollapsible' + index ).each( function() {
            if ( $( this ).hasClass( 'collapsed' ) ) {
                $( this ).removeClass( 'collapsed' );
                $( this ).addClass( 'expanded' );
            } else {
                $( this ).removeClass( 'expanded' );
                $( this ).addClass( 'collapsed' );
            }
        } );
    }
}

window.fpmobilecollapse = fpmobilecollapse;

$( document ).ready( fpmobilecollapse.initialize );

/****************************************
/* Son Ana Sayfa Mobil Daraltma Betiği *
/****************************************/