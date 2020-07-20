 var wgBabelTrans;

 wgBabelTrans = {
     'en' : { 'zh' : [
                       [ 'bac', '中文', '英语对汉语simp (sjekkes)' ],
                       [ 'tgc', '中文', '英语对汉语simp (sjekkes)' ]
                     ],
              'zt' : [ [ 'bac', '英語對漢語', '英語對漢語trad (sjekkes)' ] ],
              'nl' : [
                       [ 'bac', 'Nederlands', 'Het Engels aan het Nederlands' ],
                       [ 'tgc', 'Nederlands', 'Het Engels aan het Nederlands' ]
                     ],
              'fr' : [
                       [ 'bac', 'Français', 'Anglais au français' ],
                       [ 'tgc', 'Français', 'Anglais au français' ]
                     ],
              'da' : [
                       [ 'wgc', 'Dansk', 'Engelsk til Dansk', 'eng', 'dan' ]
                     ],
              'de' : [
                       [ 'bac', 'Deutsch', 'Englisch zum Deutschen' ],
                       [ 'tgc', 'Deutsch', 'Englisch zum Deutschen' ]
                     ],
              'el' : [
                       [ 'bac', 'Ελληνικά', 'Αγγλικά στα ελληνικά' ],
                       [ 'tgc', 'Ελληνικά', 'Αγγλικά στα ελληνικά' ]
                     ],
              'eo' : [
                       [ 'wgc', 'Deutsch', 'Engelsk til Esperanto (translate)', 'epo', 'dan' ]
                     ],
              'it' : [
                       [ 'bac', 'Italiano', 'Inglese ad italiano' ],
                       [ 'tgc', 'Italiano', 'Inglese ad italiano' ]
                     ],
              'ja' : [
                       [ 'bac', '日本語', '英語から日本語' ],
                       [ 'tgc', '日本語', '英語から日本語' ]
                     ],
              'ko' : [
                       [ 'bac', '한국어', '영어를 한국어로' ],
                       [ 'tgc', '한국어', '영어를 한국어로' ]
                     ],
              'no' : [
                       [ 'tgc', 'Norsk', 'Engelsk til Norsk' ],
                       [ 'wgc', 'Norsk', 'Engelsk til Norsk', 'eng', 'nor' ]
                     ],
              'pt' : [
                       [ 'bac', 'Português', 'Inglês ao português' ],
                       [ 'tgc', 'Português', 'Inglês ao português' ]
                     ],
              'ru' : [
                       [ 'bac', 'Русский', 'English to Russian (uoversatt)' ],
                       [ 'tgc', 'Русский', 'English to Russian (uoversatt)' ]
                     ],
              'es' : [
                       [ 'bac', 'Español', 'Inglés al español' ],
                       [ 'tgc', 'Español', 'Inglés al español' ]
                     ]
            },
     'zh' : { 'en' : [
                       [ 'bac', 'English', 'Chinese-simp to English' ],
                       [ 'tgc', 'English', 'Chinese-simp to English' ]
                     ],
              'zt' : [
                       [ 'tgc', 'Chinese-trad', 'Chinese-simp to Chinese-trad', 'zh-TW', 'zh-CN' ]
                     ]
            },
     'zt' : { 'en' : [
                       [ 'bac', 'English', 'Chinese-trad to English' ]
                     ],
              'zh' : [
                       [ 'tgc', 'Chinese-simp', 'Chinese-trad to Chinese-simp', 'zh-CN', 'zh-TW' ]
                     ]
            },
     'nl' : { 'en' : [
                       [ 'bac', 'English', 'Dutch to English' ],
                       [ 'tgc', 'English', 'Dutch to English' ]
                     ],
              'fr' : [ [ 'bac', 'Français', 'Néerlandais au Français' ] ]
            },
     'no' : { 'da' : [
                       [ 'wgc', 'Dansk', 'Norsk til Dansk', 'nor', 'dan' ]
                     ],
              'en' : [
                       [ 'wgc', 'English', 'Morwegian to English', 'nor', 'eng' ]
                     ]
            },
     'fi' : {
              'no' : [
                       [ 'tgc', 'Norsk', 'Finsk til Norsk' ]
                     ]
            },
     'fr' : { 'en' : [
                       [ 'bac', 'English', 'French to English' ],
                       [ 'tgc', 'English', 'French to English' ]
                     ],
              'de' : [
                       [ 'bac', 'Deutsch', 'Franzosen zum Deutschen' ],
                       [ 'tgc', 'Deutsch', 'Franzosen zum Deutschen' ]
                     ],
              'el' : [ [ 'bac', 'Ελληνικά', 'Γαλλικά στα ελληνικά' ] ],
              'it' : [ [ 'bac', 'Italiano', 'Francese ad italiano' ] ],
              'pt' : [ [ 'bac', 'Português', 'Francês ao português' ] ],
              'nl' : [ [ 'bac', 'Nederlands', 'Het Frans aan het Nederlands' ] ],
              'es' : [ [ 'bac', 'Español', 'Francés al español' ] ]
            },
     'da' : { 'en' : [
                       [ 'wgc', 'English', 'Danish to English', 'dan', 'eng' ]
                     ],
              'eo' : [
                       [ 'wgc', 'Esperanto', 'Danish to Esperanto (translate)', 'dan', 'epo' ]
                     ],
              'no' : [
                       [ 'wgc', 'Norsk', 'Dansk til Norsk', 'dan', 'nor' ]
                     ]
            },
     'de' : { 'en' : [
                       [ 'bac', 'English', 'German to English' ],
                       [ 'tgc', 'English', 'German to English' ]
                     ],
              'fr' : [
                       [ 'bac', 'Français', 'Allemand au Français' ],
                       [ 'tgc', 'Français', 'Allemand au Français' ],
                     ]
            },
     'el' : { 'en' : [
                       [ 'bac', 'English', 'Greek to English' ],
                       [ 'tgc', 'English', 'Greek to English' ]
                     ],
              'fr' : [ [ 'bac', 'Français', 'Grec au Français' ] ]
            },
     'it' : { 'en' : [
                       [ 'bac', 'English', 'Italian to English' ],
                       [ 'tgc', 'English', 'Italian to English' ]
                     ],
              'fr' : [ [ 'bac', 'Français', 'Italien au Français' ] ]
            },
     'ja' : { 'en' : [
                       [ 'bac', 'English', 'Japanese to English' ],
                       [ 'tgc', 'English', 'Japanese to English' ]
                     ]
            },
     'ko' : { 'en' : [
                       [ 'bac', 'English', 'Korean to English' ],
                       [ 'tgc', 'English', 'Korean to English' ]
                     ]
            },
     'pt' : { 'en' : [
                       [ 'bac', 'English', 'Portuguese to English' ],
                       [ 'tgc', 'English', 'Portuguese to English' ]
                     ],
              'fr' : [ [ 'bac', 'Français', 'Portugais au Français' ] ]
            },
     'ru' : { 'en' : [
                       [ 'bac', 'English', 'Russian to English' ],
                       [ 'tgc', 'English', 'Russian to English' ]
                     ]
            },
     'es' : { 'en' : [
                       [ 'bac', 'English', 'Spanish to English' ],
                       [ 'tgc', 'English', 'Spanish to English' ]
                     ],
              'fr' : [ [ 'bac', 'Français', 'Espagnol au Français' ] ]
            },
     'ar' : { 'en' : [ [ 'tgc', 'English', 'Spanish to English' ] ]
            },
     'sv' : { 'en' : [
                       [ 'wgc', 'English', 'Swedish to English', 'swe', 'eng' ]
                     ],
              'da' : [
                       [ 'wgc', 'Dansk', 'Svensk til Dansk', 'swe', 'dan' ]
                     ],
              'no' : [
                       [ 'wgc', 'Norsk', 'Svensk til Norsk', 'swe', 'nor' ]
                     ]
            }
 };