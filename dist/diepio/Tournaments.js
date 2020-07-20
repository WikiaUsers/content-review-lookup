/**
 * @Name:           Tournaments
 * @Description:    Embeds a Challonge.com iFrame onto a page
 * @Usage:          {{CH|iFrameID}}
 * @Authors:        Eizen <https://dev.wikia.com/wiki/User:Eizen>
                    Ursuul <https://diepio.wikia.com/wiki/User:Ursuul>
                    Zathsu <https://diepio.wikia.com/wiki/User:Zathsu>
 */
jQuery(document).ready(function () {
    var $elements = [
        // Fanon Tournaments
        {
            id: "#tankscategory1",
            src: "https://challonge.com/jro6v9km/module",
            height: "580"
        },
        {
            id: "#tankscategory2",
            src: "https://challonge.com/398l8a5e/module",
            height: "580"
        },
        {
            id: "#tankscategory3",
            src: "https://challonge.com/m9uja5nz/module",
            height: "580"
        },
        {
            id: "#polygonscategory2",//2 is correct
            src: "https://challonge.com/vgi3d8rg/module",
            height: "520"
        },
        {
            id: "#polygonscategory3",
            src: "https://challonge.com/aripvhtf/module",
            height: "520"
        },
        {
            id: "#enemiescategory2",//2 is correct
            src: "https://challonge.com/ggo91dsv/module",
            height: "520"
        },
        {
            id: "#enemiescategory3",
            src: "https://challonge.com/eajv9v9u/module",
            height: "280"
        },
        {
            id: "#gamemodescategory1",
            src: "https://challonge.com/5d9wkuq/module",
            height: "580"
        },
        {
            id: "#gamemodescategory2",
            src: "https://challonge.com/l3cztnyb/module",
            height: "580"
        },
        {
            id: "#gamemodescategory3",
            src: "https://challonge.com/mpq45ifa/module",
            height: "520"
        },
        {
            id: "#mechanicscategory1",
            src: "https://challonge.com/jdzlwjub/module",
            height: "520"
        },
        {
            id: "#mechanicscategory2",
            src: "https://challonge.com/fk32t9r0/module",
            height: "520"
        },
        {
            id: "#mechanicscategory3",
            src: "https://challonge.com/yijqjpb3/module",
            height: "520"
        },
        {
            id: "#othercategory1",
            src: "https://challonge.com/unn3gkxa/module",
            height: "520"
        },
        {
            id: "#othercategory2",
            src: "https://challonge.com/p83ynk7y/module",
            height: "280"
        },
        {
            id: "#simplecategory1",
            src: "https://challonge.com/qqwagofs/module",
            height: "580"
        },
        {
            id: "#simplecategory2",
            src: "https://challonge.com/g8p781bz/module",
            height: "580"
        },
        {
            id: "#simplecategory3",
            src: "https://challonge.com/s2017xav/module",
            height: "520"
        },
        {
            id: "#complexcategory1",
            src: "https://challonge.com/f6gmg3gb/module",
            height: "580"
        },
        {
            id: "#complexcategory2",
            src: "https://challonge.com/fu7b1921/module",
            height: "580"
        },
        {
            id: "#complexcategory3",
            src: "https://challonge.com/xtxequ5o/module",
            height: "520"
        },
        {
            id: "#finale1",
            src: "https://challonge.com/xil9b2hl/module",
            height: "520"
        },
        {
            id: "#finale2",
            src: "https://challonge.com/syckv2k/module",
            height: "580"
        },
        // Diep.io Tournaments
        {
            id: "#tournament1",
            src: "https://challonge.com/diepio_general_tournament_eight_participants/module",
            height: "1090"
        },
        {
            id: "#minitournament1",
            src: "https://challonge.com/ghostbattle/module",
            height: "550"
        },
        {
            id: "#esven",
            src: "https://challonge.com/spanishenglish/module",
            height: "520"
        },
        // Chinese Diep.io Tournaments
        {
            id: "#diepiowikia1",
            src: "https://challonge.com/diepiowikia1/module",
            height: "410"
        }
    ];

    $elements.forEach(function ($element) {
        $($element.id).replaceWith(
            $("<iframe>", {
                src: $element.src,
                width: "100%",
                height: $element.height,
                frameborder: "0",
                scrolling: "auto",
                allowtransparency: "true"
            })
        );
    });
});//End Tournaments*/