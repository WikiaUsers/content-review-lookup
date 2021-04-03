// codice preso da it.onepiece
//==========================================
//    Personalizzazioni dell'interfaccia
//==========================================

$(window).load(function() {
    //====================================
    //          Immagine casuale
    //====================================
    /* Mostra un'immagine casuale nella */
    /* barra laterale (Oasis)           */

    /* Lista immagini */
    var WikiaRailImageArray = [
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/2/20/Rail-Image_1.png/revision/latest/scale-to-width-down/300?cb=20200205100039&path-prefix=it" alt="Devil Kazumi">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/a/ae/Rail-Image_2.png/revision/latest/scale-to-width-down/300?cb=20200205100143&path-prefix=it" alt="Kazumi">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/5/5f/Nina_tekken_7_junny.png/revision/latest/scale-to-width-down/300?cb=20200408133330&path-prefix=it/300?cb=20200316225216&path-prefix=it" alt="Nina">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/e/e1/Zafina_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316224342&path-prefix=it" alt="Zafina">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/3/34/Jin_kazama_junny.png/revision/latest/scale-to-width-down/300?cb=20200316225330&path-prefix=it" alt="Jin">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/8/8a/Alisa_2.2.jpg/revision/latest/scale-to-width-down/300?cb=20191027125959&path-prefix=it" alt="Alisa">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/6/64/Unknown_by_yamashita.jpg/revision/latest/scale-to-width-down/300?cb=20200122180200&path-prefix=it" alt="Unknown">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/3/3c/Leroy_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316230742&path-prefix=it" alt="Leroy">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/1/17/Kunimitsu-ttt2-artwork-by-junny-white.jpg/revision/latest/scale-to-width-down/300?cb=20191026123021&path-prefix=it" alt="Kunimitsu">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/8/81/Julia_chang_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316231332&path-prefix=it" alt="Julia">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/e/eb/Lili_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316231803&path-prefix=it" alt="Lili">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/4/49/Anna_by_junny_3.png/revision/latest/scale-to-width-down/300?cb=20200408133230&path-prefix=it" alt="Anna">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/6/64/Asuka_by_junny.jpg/revision/latest/scale-to-width-down/300?cb=20200408132328&path-prefix=it" alt="Asuka">',
            '<img id="RailImg" src="//images.wikia.nocookie.net/tekkenpedia-ita/images/2/20/Rail-Image_1.png/revision/latest/scale-to-width-down/300?cb=20200205100039&path-prefix=it" alt="Devil Kazumi">',
            '<img id="RailImg" src="//images.wikia.nocookie.net/tekkenpedia-ita/images/a/ae/Rail-Image_2.png/revision/latest/scale-to-width-down/300?cb=20200205100143&path-prefix=it" alt="Kazumi">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/5/5f/Nina_tekken_7_junny.png/revision/latest/scale-to-width-down/300?cb=20200408133330&path-prefix=it/300?cb=20200316225216&path-prefix=it" alt="Nina">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/e/e1/Zafina_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316224342&path-prefix=it" alt="Zafina">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/3/34/Jin_kazama_junny.png/revision/latest/scale-to-width-down/300?cb=20200316225330&path-prefix=it" alt="Jin">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/8/8a/Alisa_2.2.jpg/revision/latest/scale-to-width-down/300?cb=20191027125959&path-prefix=it" alt="Alisa">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/6/64/Unknown_by_yamashita.jpg/revision/latest/scale-to-width-down/300?cb=20200122180200&path-prefix=it" alt="Unknown">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/3/3c/Leroy_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316230742&path-prefix=it" alt="Leroy">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/1/17/Kunimitsu-ttt2-artwork-by-junny-white.jpg/revision/latest/scale-to-width-down/300?cb=20191026123021&path-prefix=it" alt="Kunimitsu">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/8/81/Julia_chang_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316231332&path-prefix=it" alt="Julia">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/e/eb/Lili_by_junny.png/revision/latest/scale-to-width-down/300?cb=20200316231803&path-prefix=it" alt="Lili">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/4/49/Anna_by_junny_3.png/revision/latest/scale-to-width-down/300?cb=20200408133230&path-prefix=it" alt="Anna">',
            '<img id="RailImg" src="//vignette.wikia.nocookie.net/tekkenpedia-ita/images/6/64/Asuka_by_junny.jpg/revision/latest/scale-to-width-down/300?cb=20200408132328&path-prefix=it" alt="Asuka">',
        
            
        ];

    /* Scelta immagine */
    var chosenWikiaRailImage = Math.round(Math.random() * (WikiaRailImageArray.length - 1));

    /* Aggiunta immagine */
    $('#WikiaRail').append(WikiaRailImageArray[chosenWikiaRailImage]);

});