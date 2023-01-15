/*
 
    Discord module loader.
    Code taken from http://bokunoheroacademia.wikia.com/wiki/MediaWiki:Wikia.js
 
*/

;(function ($, mw) {
    'use strict';
 
    // add module for Sparklepedia
    function addModule() {
        $('<section>')
            .attr('id', 'rsw-discord')
            .addClass('rsw-custom-module rail-module')
            .append(
                $('<div>')
                    .append(
                        $('<h2>', {
                        'class': 'activity-heading has-icon',
                        html: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="m 11.384408,2.621475 c -0.03463,0.0486 -0.09797,0.09305 -0.108016,0.15172 1.336851,0.428475 2.650173,1.007527 3.747483,1.896854 0.104092,0.07693 0.0141,0.05323 -0.04975,0.01473 C 14.127806,4.253533 13.249396,3.8783 12.329928,3.632708 10.820047,3.212463 9.2324947,3.093745 7.6746608,3.254629 c -0.801889,0.07314 -1.603479,0.183863 -2.376932,0.414565 -0.901445,0.252247 -1.7642,0.622804 -2.599752,1.041192 -0.107917,0.06499 -0.05273,-0.007 0.0015,-0.04427 0.864256,-0.711474 1.88428,-1.208723 2.923577,-1.610017 0.337352,-0.134475 0.693571,-0.228244 1.032252,-0.350082 -0.02219,-0.06672 -0.08686,-0.148691 -0.146097,-0.174509 -1.51539,0.09022 -2.984078,0.667585 -4.202941,1.562272 -0.20826,0.190905 -0.282879,0.478613 -0.413877,0.721402 -0.743632,1.634999 -1.28118003,3.364499 -1.60097703,5.131621 -0.173449,1.034861 -0.303645,2.083108 -0.29047099257,3.133908 C 0.06837277,13.299742 0.25461377,13.460673 0.39803677,13.63399 c 0.97155403,1.082266 2.40051903,1.671077 3.83156603,1.803686 0.15392,0.02 0.309121,0.02406 0.46415,0.02521 0.3356,-0.420537 0.674431,-0.838488 1.011821,-1.257591 -1.033948,-0.32425 -2.026911,-0.899511 -2.669552,-1.789914 -0.05441,-0.08497 0.07248,0.0033 0.09809,0.0176 0.922469,0.597305 1.957559,1.002749 3.013997,1.293789 0.941335,0.251475 1.9128069,0.411093 2.8894729,0.396212 0.612178,0.01426 1.2243503,-0.02847 1.8275553,-0.134779 1.180088,-0.192803 2.320206,-0.598151 3.386031,-1.134999 0.28165,-0.136196 0.540954,-0.319116 0.816206,-0.462321 -0.247228,0.399874 -0.616379,0.715508 -0.993599,0.991947 -0.51587,0.372982 -1.101305,0.636394 -1.703781,0.835062 -0.110862,0.01514 0.0036,0.100458 0.02664,0.145056 0.290632,0.377173 0.598261,0.740828 0.901852,1.107552 1.41054,-0.05207 2.838852,-0.51221 3.908197,-1.454917 0.292726,-0.268004 0.566588,-0.558685 0.793292,-0.885311 -0.01271,-1.44202 -0.191099,-2.882314 -0.524409,-4.285374 C 17.100637,7.268125 16.565839,5.724548 15.837791,4.275132 15.690723,4.030609 15.411644,3.914451 15.18766,3.753161 14.07004,3.055697 12.786516,2.603013 11.466116,2.5295 c -0.02723,0.03066 -0.05447,0.06132 -0.0817,0.09198 z m 0.403908,5.652248 c 0.779494,0.0056 1.433995,0.692529 1.51501,1.446908 0.07186,0.535944 -0.07071,1.109846 -0.453365,1.504128 -0.334465,0.360561 -0.845767,0.540883 -1.332318,0.462264 -0.682461,-0.08975 -1.210603,-0.705075 -1.328567,-1.362544 -0.06088,-0.443954 -0.0094,-0.916344 0.239549,-1.29908 0.281881,-0.468738 0.808878,-0.772187 1.359691,-0.751676 z m -5.6433462,4.63e-4 c 0.713368,6.16e-4 1.347017,0.566623 1.496068,1.252485 0.128919,0.527992 0.02204,1.107543 -0.30088,1.547029 -0.284162,0.401053 -0.775166,0.661391 -1.271411,0.623387 -0.641351,0.01678 -1.201834,-0.473487 -1.417492,-1.053203 -0.144517,-0.351171 -0.140818,-0.749279 -0.06494,-1.115855 0.13516,-0.528144 0.513919,-1.007236 1.043135,-1.178901 0.164661,-0.0583 0.341705,-0.07627 0.515524,-0.07494 z"/></svg> Official Sparklecare Discord'
                    })
                    )
                    .append(
                        $('<p>')
                            .append(
                                'Sparklepedia has an official Discord server! Click the button below to join and chat with fellow fans, or click ',
                                $('<a>')
                                    .attr('href', mw.util.wikiGetlink('Project:Discord'))
                                    .text('here'),
                                ' to read our chat rules.'
                            ),
                        $('<a>')
                            .attr('href', 'https://discord.gg/Y7QvY8x')
                            .addClass('wds-button')
                            .text('Connect')
                    )
          )
          .insertBefore('#activities');
    }
 
    function init() {
        //load once
        if ($('#rsw-discord').length) {
            mw.log('Discord module already loaded');
            return;
        }
 
        if ($('#WikiaRail').hasClass('loaded')) {
            addModule();
        } else {
            $('#WikiaRail').on('afterLoad.rail', addModule);
        }
    }
 
    mw.log('Loading Discord module');
    mw.loader.using(['mediawiki.util'], function () {
        $(init);
    });
 
}(this.jQuery, this.mediaWiki));