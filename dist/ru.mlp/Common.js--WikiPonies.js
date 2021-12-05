/* WIKI PONIES v1.1
 * @author: Kopcap94
 * @idea: Negatif22
 *
 * Ablity to hide ponies by clicking button on toolbox panel [Cookie required]
 *
 * Port of desktop ponies to wiki
 * All logics and actions of script written on my own
 *
 * All image's source was taken from (by CC BY-NC-SA 3.0):
 * - https://desktop-pony-team.deviantart.com/
 * - https://github.com/RoosterDragon/Desktop-Ponies
 */

!function( $, mw ) {
    if (
        [ 0 ].indexOf( mw.config.get( 'wgNamespaceNumber') ) === -1 ||
        [ 'edit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1
    ) return;

    var status = wpReadCookie(),
        btn_text = 'Скрыть пони',
        btn_act = 'hide';

    if ( typeof( status ) == 'undefined' ) {
    	btn_text = 'Показать пони';
        btn_act = 'show';

    	wpSetCookie( 'hide' );
    }

    if ( status == 'hide' ) {
        btn_text = 'Показать пони';
        btn_act = 'show';
    }

    $( '#p-views' ).prepend(
        '<a id="pony-hide" class="wds-button wds-is-text page-header__action-button has-label" data-action="' + btn_act + '">' + btn_text + '</a>'
    );

    $( '#pony-hide' ).on( 'click', function() {
    var act = $( this ).attr( 'data-action' );

    switch ( act ) {
        case 'hide':
            $( this )
              .attr( 'data-action', 'show' )
              .text( 'Показать пони' );
            $( '#pony' ).hide();

            wpSetCookie( 'hide' );

            break;
        case 'show':
            $( this )
              .attr( 'data-action', 'hide' )
              .text( 'Скрыть пони' );
            $( '#pony' ).show();

            wpSetCookie( 'show' );
            // Сюда надо будешь ещё вкрутить перезагрузку страницы для поддержания штанов
            break;
        } 
    });

    if ( status == 'hide' || typeof( status ) == 'undefined' ) return;

    var pers_list = {
        /* Луна */
        'luna': {
            'actions': {
                'fly': '5/5a/Luna_fly.gif',
                'stay': '2/28/Luna_stay.gif',
                'wings': '7/76/Luna_wings.gif'
            }
        },
        'luna2': {
            'actions': {
                'walk': 'd/df/Luna_2_walk.gif',
                'walk2': 'a/ae/Luna_2_walk_2.gif',
                'stay': '5/50/Luna_2_stay.gif'
            },
            'isReverse': true
        },
        'luna3': {
            'actions': {
                'fly': 'e/e1/Luna-flight-right.gif',
                'stay': '1/14/Luna_idle_right.gif',
                'walk': '6/6f/Luna_walk_right.gif'
            }
        },
        'nm': {
            'actions': {
                'fly': '0/0a/Nmm-_fly-right.gif',
                'stay': '5/59/NmmStand_right.gif',
                'walk': '2/20/NmmWalk_right.gif'
            }
        },
        /* Селестия */
        'celest': {
            'actions': {
                'fly': '7/73/SelFly_right.gif',
                'stay': '4/46/SelStand_right.gif',
                'walk': 'f/ff/SelWalk_right.gif'
            }
        },
        'celest2': {
            'actions': {
                'fly': 'd/d6/SseFly_right.gif',
                'stay': '0/02/SseStand_right.gif',
                'walk': '6/69/SseWalking_right.gif',
                'sleep': '4/4e/SseSleep_right.gif'
            }
        },
        'celest3': {
            'actions': {
                'stay': 'b/b7/SsseStand_right.gif',
                'stay2': 'e/ed/Flap_right.gif',
                'walk': '8/85/SsseWalk_right.gif',
                'sit': '7/78/Sit_right.gif',
                'sleep': '3/32/Sleep_right.gif'
            }
        },
        'cadance': {
            'actions': {
                'stay': 'b/bd/CadStand_right.gif',
                'walk': '4/46/Cadance-trot-right.gif',
                'walk2': 'a/a7/Cadance-dance-right.gif',
                'fly': 'b/bf/Cadance-flight-right.gif'
            }
        },
        'cadance2': {
            'actions': {
                'stay': '7/79/CadsStand_right.gif',
                'walk': '1/12/CadsTrot_right.gif'
            }
        },
        /* Искорка */
        'ts': {
            'actions': {
                'fly': 'b/b1/TS_fly.gif',
                'stay': 'd/de/TS_stay.gif',
                'walk': 'd/d5/TS_walk.gif',
                'walk2': '9/92/TS_walk_2.gif'
            }
        },
        'ts gala': {
            'actions': {
                'fly': '1/1b/TS_gala_fly.gif',
                'stay': '6/67/TS_gala_stay.gif',
                'walk': 'e/e5/TS_gala_walk.gif',
                'walk2': '5/59/TS_gala_walk_2.gif'
            }
        },
        'ts science': {
            'actions': {
                'walk': 'e/e5/TS_science_walk.gif',
                'stay': '8/84/TS_science_stay.gif'
            }
        },
        'ts masked': {
            'actions': {
                'walk': '1/1f/TS_masked_walk.gif',
                'stay': '0/0b/TS_masked_stay.gif',
                'fly': 'c/c5/TS_masked_fly.gif'
            }
        },
        /* Рарити */
        'rarity farm': {
            'actions': {
                'walk': '3/34/Farm_Rarity_walk.gif',
                'stay': 'f/ff/Farm_Rarity_stay.gif',
                'scratch': 'b/b4/Farm_Rarity_scratch.gif'
            }
        },
        'rarity radiance': {
            'actions': {
                'walk': 'f/ff/Rarity_radiance_walk.gif',
                'stay': '6/6d/Rarity_radiance_stay.gif'
            }
        },
        /* Пинки Пай */
        'pinkie': {
            'actions': {
                'walk': '3/31/Pinkie_walk.gif',
                'walk2': '9/92/Pinkie_walk_2.gif',
                'ton': '2/2e/Pinkie_tongue.gif',
                'jump': 'e/ed/Pinkie_jump.gif',
                'stay': '6/61/Stay.gif',
                'flower': 'b/b8/Pinkie_flower.gif'
            }
        },
        'pinkamina': {
            'actions': {
                'walk': '8/87/Pinkamina_walk.gif',
                'stay': 'e/e6/Pinkamina_stay.gif'
            }
        },
        'gala pinkie': {
            'actions': {
                'walk': 'd/d6/Gala_Pinkie_walk.gif',
                'jump': '3/30/Gala_Pinkie_jump.gif',
                'stay': 'c/cf/Gala_Pinkie_stay.gif'
            }
        },
        'pinkie fili': {
            'actions': {
                'walk': '2/2d/Pinkie_fili_walk.gif',
                'stay': '5/55/Pinkie_fili_stay.gif'
            }
        },
        /* Флаттершай */
        'fluttershy': {
            'actions': {
                'walk': '0/00/Trotcycle_fluttershy_right.gif',
                'fly': 'b/b3/Fly_fluttershy_right.gif',
                'fly2': '1/17/Fly_fluttershy_updown_right.gif',
                'stay': '7/7f/Stand_fluttershy_right.gif',
                'shy': 'c/ce/Flutter_mouseover_right.gif',
                'stare': '0/0b/Fluttershy_stare_right.gif'
            }
        },
        'fluttershy rager': {
            'actions': {
                'walk': '5/50/Fluttershy_rager_walk.gif',
                'fly': '1/1d/Fluttershy_rager_fly.gif',
                'stay': 'a/a0/Fluttershy_rager_stay.gif'
            }
        },
        'flutterbat': {
            'actions': {
                'walk': 'f/f5/Flutterbat_walk.gif',
                'fly': '0/02/Flutterbat_fly.gif',
                'stay': '3/3c/Flutterbat_stay.gif'
            }
        },
        'gala fluttershy': {
            'actions': {
                'walk': '7/75/Gala_Fluttershy_walk.gif',
                'stay': 'b/ba/Gala_Fluttershy_stay.gif'
            },
            'isReverse': true
        },
        /* Радуга */
        'rd': {
            'actions': {
                'fly': 'c/c1/Fly_rainbow_right.gif',
                'fly2': '7/76/Rd-swim-right.gif',
                'stay': '6/6d/Stand_rainbow_right.gif',
                'run': 'f/ff/Dashing_right.gif',
                'walk': '3/3a/Trotcycle_rainbow_right.gif'
            }
        },
        'rainbow zapp': {
            'actions': {
                'fly': '3/33/Rainbow_zapp_fly.gif',
                'stay': '8/89/Rainbow_zapp_stay.gif'
            }
        },
        /* Эпплджек */
        'aj': {
            'actions': {
                'sleep': '1/11/AJ_sleep.gif',
                'posing': '1/13/AJ_posing.gif',
                'run': '9/9e/AJ_walk.gif',
                'walk': '8/8a/Trotcycle_aj_right.gif',
                'bango': 'd/d4/Aj-banjo.gif',
                'buck': '3/3c/Buck.gif'
            }
        },
        'aj mistress': {
            'actions': {
                'walk': '9/92/AJ_mistress_walk.gif',
                'stay': '5/58/AJ_mistress_stay.gif'
            }
        },
        'aj nm': {
            'actions': {
                'walk': '6/6d/AJ_nm_walk.gif',
                'stay': 'a/a2/AJ_nm_stay.gif'
            }
        },
        /* Спайк */
        'spike' : {
            'actions': {
                'walk': '2/2c/Running_spike_right.gif',
                'stay': '0/06/Spike_idle_right.gif',
                'stay2': '7/77/Spike_stand_right.gif',
                'fly': 'c/cd/Spike_floating_right.gif',
                'must': 'f/f9/Moustache_stand_right.gif'
            }
        },
        'spike hum' : {
            'actions': {
                'walk': 'c/c8/Humdrum-walk-right.gif',
                'stay': '3/37/Humdrum-idle-right.gif'
            }
        },
        'starlight': {
            'actions': {
                'walk': '2/2f/Starlight_Glimmer_walk.gif',
                'rest': '3/33/Starlight_Glimmer_rest.gif',
                'stay': '1/18/Starlight_Glimmer_stay.gif'
            }
        },
        'serenada': {
            'actions': {
                'walk': 'a/ab/Serenada_walk.gif',
                'fly': '2/22/Serenada_fly.gif',
                'stay': 'f/fe/Serenada_stay.gif'
            }
        },
        'torax': {
            'actions': {
                'fly': '9/98/Torax_fly.gif',
                'stay': '9/9d/Torax_stay.gif',
                'walk': '4/41/Torax_walk.gif',
                'wings': '6/61/Torax_wings.gif'
            }
        },
        'mrs sparkle': {
            'actions': {
                'walk': 'b/bc/Mrs._Sparkle_walk.gif',
                'stay': '0/0e/Mrs._Sparkle_stay.gif'
            }
        },
        'mr sparkle': {
            'actions': {
                'walk': 'a/a9/Mr._Sparkle_walk.gif',
                'stay': '5/5a/Mr_Sparkle_stay.gif'
            }
        },
        'adagio': {
            'actions': {
                'walk': '5/5b/Adagio-trot-right.gif',
                'stay': '7/75/Adagio-idle-right.gif'
            }
        },
        'aloe': {
            'actions': {
                'walk': 'f/fa/Trotcycle_aloe_right.gif',
                'stay': 'a/a7/Stand_aloe_right.gif'
            }
        },
        'applebloom': {
            'actions': {
                'run': 'f/fb/Applebloom-gallop-right.gif',
                'walk': '0/08/Walking_right.gif',
                'stay': '5/53/Stand_right_AB.gif',
                'unhappy': '7/72/Aww.gif',
                'spin': '7/71/Spin.gif'
            }
        },
        'applebumkin': {
            'actions': {
                'walk': '4/45/Applebumkin_trot_right.gif',
                'wait': '9/97/Applebumkin_sleep_right.gif'
            }
        },
        'applefritter': {
            'actions': {
                'walk': 'b/b7/Applefritter_trot_right.gif',
                'stay': '8/89/Applefritter_stand_right.gif',
                'sit': '0/05/Applefritter_sit_right.gif',
                'sleep': '3/3e/Applefritter_sleep_right.gif'
            }
        },
        'bigmac': {
            'actions': {
                'walk': '1/10/Bigmac_trot_right.gif',
                'stay': '3/37/Bigmac_idle_right.gif',
                'sleep': 'e/e8/Bigmac_sleep_right.gif'
            }
        },
        'orange aunt': {
            'actions': {
                'walk': '3/3e/Auntorange-trot-right.gif',
                'stay': '9/96/Auntorange-idle-right.gif'
            }
        },
        'aria blaze': {
            'actions': {
                'walk': 'd/d9/Aria-trot-right.gif',
                'stay': '7/76/Aria-idle-right.gif'
            }
        },
        'babs': {
            'actions': {
                'walk': 'e/ee/Babs-trot-right.gif',
                'stay': 'a/a9/Babs-idle-right.gif'
            }
        },
        'berryshine': {
            'actions': {
                'walk': '0/04/Trotcycle_oppp_right.gif',
                'stay': '1/17/Stand_oppp_right.gif',
                'sit': '2/29/Sit_oppp_right.gif',
                'sleep': '1/15/Sleep_berry_right.gif'
            }
        },
        'blossomfort': {
            'actions': {
                'fly': 'd/d5/Blossomforth_fly_right.gif',
                'walk': '4/4f/Blossomforth_trot_right.gif',
                'stay': 'f/fd/Blossomforth_wing_stand_right.gif',
                'sit': '3/31/Blossomforth_sit_right.gif',
                'sleep': 'd/d8/Blossomforth_sleep_right.gif',
                'exe': '5/57/Blossomforth_too_flexible_right.gif'
            }
        },
        'bonbon': {
            'actions': {
                'walk': '9/91/Bonbon_walk_right.gif',
                'stay': 'e/eb/Bonbon-idle-right.gif',
                'sleep': '6/66/Bonbon_sleep_right.gif',
            }
        },
        'braeburn': {
            'actions': {
                'walk': '5/5c/Br_Walk_right.gif',
                'stay': '6/63/Br_Stand_right.gif'
            }
        },
        'bulk': {
            'actions': {
                'fly': '6/66/Bulk-fly-right.gif',
                'stay': '2/21/Bulk-idle-right.gif',
                'musc': 'c/cf/Bulk-muscles-right.gif',
                'yeah': '3/3c/Bulk-yeah-right.gif'
            }
        },
        'candymane': {
            'actions': {
                'walk': '8/89/Trot_right.gif',
                'stay': '6/6f/Candymane-idle-right.gif'
            }
        },
        'carrottop': {
            'actions': {
                'eat': '4/41/Carrotchompsp_right.gif',
                'stay': 'd/d4/Carrottop_idle_right.gif',
                'stare': '8/85/Carrotblinkblink_right.gif',
                'walk': '7/74/Carrottop_trotright.gif'
            }
        },
        'cheerilee': {
            'actions': {
                'walk': '2/2a/Trotcycle_cheerilee_right.gif',
                'stay': '9/97/Stand_cheerilee_right.gif'
            }
        },
        'cheerilee80': {
            'actions': {
                'walk': '4/4a/Trotcycle_80s_cherilee_right.gif',
                'stay': 'c/c8/Stand_80s_cherilee_right.gif'
            }
        },
        'cheese': {
            'actions': {
                'walk': 'e/e8/Cheese-sandwich-right.gif',
                'stay': 'a/ae/Cheese-sandwich-idle-right.gif',
                'play': 'a/a9/Cheese-sandwich-accordion-right.gif'
            }
        },
        'cherryberry': {
            'actions': {
                'sit': '3/36/Cherry_berry_sitting_right.gif',
                'walk': 'a/ac/Cherry_berry_trot_right_blink.gif',
                'stay': 'd/da/Cherry_berry_stand_right.gif',
                'sleep': '5/5a/Cherry_berry_sleeping_right.gif'
            }
        },
        'cloudkicker' : {
            'actions': {
                'derp': '2/26/Derp_face_right.gif',
                'walk': '2/26/Trotcycle_right.gif',
                'stay': '5/51/Idle_right.gif',
                'fly': 'a/aa/Flying_right.gif'
            }
        },
        'cloudchaser': {
            'actions': {
                'walk': '5/5f/Trotcycle_cloudchaser_right_blinking.gif',
                'stay': 'f/fa/Stand_cloudchaser_right.gif',
                'fly': '2/2a/Cloudchaser_fly_right.gif',
                'sit': 'a/a3/Cloudchaser_sit_right.gif',
                'exe': 'e/eb/Cloudchaser_stretch_right.gif',
                'sleep': '7/71/Cloudchaser_sleep_right.gif'
            }
        },
        'quartz': {
            'actions': {
                'walk': '5/5f/Qa_Trot_right.gif',
                'stay': '8/81/Qa_Idle_right.gif'
            }
        },
        'ignous': {
            'actions': {
                'walk': 'a/ac/Clyde_pie_by_anonycat-d49ohhf.gif',
                'stay': '5/51/Clyde_pie_by_anonycat-d49oh2b.gif'
            }
        },
        'coco': {
            'actions': {
                'walk': 'c/ce/Trot_coco_right.gif',
                'stay': '7/77/Stand_coco_right.gif',
                'sew': '3/33/Coco_sew_right.gif'
            }
        },
        'coloratura': {
            'actions': {
                'walk': '6/6b/TrotRight.gif',
                'stay': '7/79/IdleRight.gif'
            }
        },
        'cranky': {
            'actions': {
                'walk': '5/57/Crankydoodle-walk-right.gif',
                'stay': '2/29/Crankydoodle-idle-right.gif'
            }
        },
        'daisy': {
            'actions': {
                'walk': 'b/b2/Daisy_trot_right.gif',
                'stay': '2/27/Daisy_blink_right.gif'
            }
        },
        'daring': {
            'actions': {
                'walk': '3/3d/Trotcycle_daringdo_right.gif',
                'stay': '9/9a/Standingright.gif',
                'fly': '0/03/Fly_right.gif'
            }
        },
        'daring2': {
            'actions': {
                'walk': 'a/a6/A.k.yearling-trot-right.gif',
                'stay': '7/71/A.k.yearling-idle-right.gif'
            }
        },
        'derpy': {
            'actions': {
                'walk': '6/6d/Derpy_walking_wing_right.gif',
                'stay': '9/94/Derpy_stand_wing_right.gif',
                'fly': '6/65/Derpy_fly_right.gif',
                'fly2': '0/0f/Derpy_flyupsidedown_right.gif',
                'fly3': '9/96/Derpy_mail_right.gif',
                'mail': 'e/ea/Derpy_grabmail_right.gif'
            }
        },
        'mint': {
            'actions': {
                'walk': '7/70/MintTrot_right.gif',
                'stay': '1/10/MintStand_right.gif',
                'walk2': 'b/b1/Galatrot_right.gif'
            }
        },
        'diamond tiara': {
            'actions': {
                'walk': '9/92/DiamondTrot_right.gif',
                'stay': '6/6b/DiamondStand_right.gif',
                'scoof': '2/2a/Scoff_right.gif'
            }
        },
        'discord': {
            'actions': {
                'walk': '0/06/Discord_walk_right.gif',
                'stay': '7/76/Discord_puppet.gif',
                'shuffle': '4/45/Discord_shuffle_right.gif'
            }
        },
        'doctor hooves': {
            'actions': {
                'walk': '8/89/Trot_right.gif',
                'stay': '9/9f/Stand_right.gif'
            }
        },
        'donutjoe': {
            'actions': {
                'walk': '5/54/Donutjoe_trot_right.gif',
                'stay': '5/54/Donutjoe_idle_right.gif'
            }
        },
        'fancy': {
            'actions': {
                'walk': '6/61/Fancy_walk_right_8.gif',
                'stay': '1/18/Fancy_blink5_right_8.gif'
            }
        },
        'featherweight': {
            'actions': {
                'walk': '4/49/Featherweight-trot-right.gif',
                'stay': '8/8a/Featherweight-idle-right.gif',
                'fly': 'b/ba/Featherweight-fly-right.gif'
            }
        },
        'dinky': {
            'actions': {
                'walk': 'd/d3/Dinky_trot_r.gif',
                'stay': '1/18/Dinky-idle-right.gif'
            }
        },
        'fiddle': {
            'actions': {
                'walk': '5/54/Fiddlesticks-trot-right.gif',
                'stay': '4/4f/Fiddlesticks-idle-right.gif',
                'play': '9/90/Fiddlesticks-pose-right.gif'
            }
        },
        'fido': {
            'actions': {
                'walk': '2/26/Fido_treat_right.gif',
                'stay': '0/08/Fido_idle_right.gif',
                'walk2': 'b/bb/Fido_walk_right.gif'
            }
        },
        'filci': {
            'actions': {
                'walk': '7/7e/Filthy_rich_trot_right.gif',
                'stay': 'a/a2/Filthy_rich_standing_right.gif'
            }
        },
        'flam': {
            'actions': {
                'walk': '8/8a/Flam_trot_right.gif',
                'stay': 'b/b9/Flam_idle_right.gif'
            }
        },
        'flim': {
            'actions': {
                'walk': 'e/ed/Flim_trot_right.gif',
                'stay': '9/98/Flim_idle_right.gif'
            }
        },
        'flash': {
            'actions': {
                'walk': '0/0d/Flashsentry-trot-right.gif',
                'stay': 'b/b2/Flashsentry-idle-right.gif',
                'fly': 'c/cd/Flashsentry-flight-right.gif'
            }
        },
        'fleet': {
            'actions': {
                'walk': 'c/c2/Fleetfoot-right.gif',
                'stay': 'f/f1/Fleetfoot-idle-right.gif',
                'fly': '2/2d/Fleetfoot-fly-right.gif'
            }
        },
        'fleet2': {
            'actions': {
                'walk': 'e/ec/Fleetfoot-wonderbolt-trot-right.gif',
                'stay': '1/16/Fleetfoot-wonderbolt-idle-right.gif',
                'fly': '0/0d/Fleetfoot-wonderbolt-fly-right.gif'
            }
        },
        'fleur': {
            'actions': {
                'walk': '9/9d/Fleur_walk_right_8.gif',
                'stay': '7/74/Fleur_portrait_right.gif',
                'stay2': '7/70/Fleur_idle1_right.gif',
                'sit': 'a/a6/Fleur_idle2_right.gif'
            }
        },
        'flitter': {
            'actions': {
                'fly': 'e/e6/Flitter_fly_right.gif',
                'walk': 'd/d3/Flitter_trotcycle_right_blinking.gif',
                'stay': '0/0d/Flitter_stand_right.gif',
                'exe': 'e/e5/Flitter_stretch_right.gif',
                'sit': '3/30/Flitter_sit_right.gif',
                'sleep': '9/9e/Flitter_sleep_right.gif'
            }
        },
        'flurry': {
            'actions': {
                'happy': 'e/e9/Flurryheart-happy-right.gif',
                'stay': '8/85/Flurryheart-idle-right.gif',
                'fly': '0/0e/Flurryheart-fly-right.gif'
            }
        },
        'gilda': {
            'actions': {
                'walk': 'b/b5/Mlp_gilda_walk_right_big.gif',
                'stay': '7/79/Mlp_gilda_idle_right_big.gif',
                'fly': 'd/db/Mlp_gilda_flight_right_big.gif',
                'cheer': 'd/d7/Mlp_gilda_cheer_right.gif'
            }
        },
        'grandpa grif': {
            'actions': {
                'walk': '7/7b/Grampagruff-walk-right.gif',
                'stay': 'a/a8/Grampagruff-idle-right.gif',
                'fly': 'e/e3/Grampagruff-fly-right.gif'
            }
        },
        'gismo': {
            'actions': {
                'walk': '3/39/Gizmo-trot-right.gif',
                'stay': '6/67/Gizmo-idle-right.gif'
            }
        },
        'goldie': {
            'actions': {
                'walk': '4/46/Goldiedelicious-walk-right.gif',
                'stay': '5/52/Goldiedelicious-idle-right.gif'
            }
        },
        'grannysm': {
            'actions': {
                'walk': '6/67/Granny-smith-trot-right.gif',
                'stay': '6/6a/Granny-smith-idle-right.gif',
                'sleep': 'c/cd/Granny-smith-snoozing-right.gif'
            }
        },
        'grannysm2': {
            'actions': {
                'walk': '2/2a/Grannysmith-trot-right.gif',
                'stay': '2/2f/Grannysmith-idle-right.gif'
            }
        },
        'grannysm3': {
            'actions': {
                'walk': 'a/ae/Grannysmith-trot2-right.gif',
                'stay': '4/48/Grannysmith-idle2-right.gif'
            }
        },
        'gretta': {
            'actions': {
                'walk': '2/25/Greta-walk-right.gif',
                'stay': 'c/c7/Greta-idle-right.gif',
                'fly': '9/94/Greta-fly-right.gif'
            }
        },
        'gummy': {
            'actions': {
                'walk': 'a/a3/Walkcycle_gummy_right.gif',
                'stay': 'a/ad/Stand_gummy_right.gif',
                'fly': '3/38/Bouncing_right.gif',
                'dance': 'e/e0/Dance_gummy_right.gif'
            }
        },
        'ht': {
            'actions': {
                'walk': 'd/d2/HTWalk_right.gif',
                'stay': 'd/d7/HTStand_right.gif',
                'appl': 'f/fa/Hoidyapplausersize.gif'
            }
        },
        'ahuizotl': {
            'actions': {
                'walk': '5/5a/Ahuizotl-walk-right.gif',
                'stay': '3/39/Ahuizotl-idle-right.gif'
            }
        },
        'iron': {
            'actions': {
                'walk': '2/26/Ironwill_walk_right.gif',
                'walk2': '2/26/Ironwill_walk_right.gif'
            }
        },
        'ladyjuic': {
            'actions': {
                'walk': '8/8c/Ladyjustice-trot-right.gif',
                'stay': '1/17/Ladyjustice-idle-right.gif'
            }
        },
        'sombra': {
            'actions': {
                'walk': 'c/ce/Sombra-trot-right.gif',
                'stay': 'a/af/Sombra-idle-right.gif'
            }
        },
        'lemonh': {
            'actions': {
                'walk': '8/87/Lemon_hearts_trot_right_blink.gif',
                'stay': '7/79/Lemon_hearts_stand_right.gif',
                'sit': '2/25/Lemon_hearts_sit_right.gif',
                'sleep': 'f/f2/Lemon_hearts_sleep_right.gif',
                'sweep': '0/04/Lemon_hearts_sweeping_right.gif'
            }
        },
        'whitelight': {
            'actions': {
                'walk': 'e/ec/Lightning_bolt_walk_right.gif',
                'stay': '3/33/Lightning_bolt_stand_right.gif',
                'hover': 'd/d7/Lightning_bolt_hover_right.gif',
                'fly': '2/24/Lightning_bolt_fly_right.gif',
                'sleep': 'c/c0/Lightning_bolt_sleep_right.gif'
            }
        },
        'lightdust': {
            'actions': {
                'walk': 'c/cb/Lightning-dust-trot-right.gif',
                'stay': '1/19/Lightning-dust-idle-right.gif',
                'fly': '6/62/Lightning-dust-fly-right.gif'
            }
        },
        'lily': {
            'actions': {
                'walk': '7/7e/Lily_trot_right.gif',
                'stay': '9/9f/Lily_idle_right.gif',
                'panic': 'd/d7/Lily-panic-right.gif',
                'run': 'b/b4/Lily-panicrun-right.gif'
            }
        },
        'limestone': {
            'actions': {
                'walk': 'e/e6/Limestone-trot-right.gif',
                'stay': '6/6d/Limestone-idle-right.gif'
            }
        },
        'maud': {
            'actions': {
                'walk': '4/4c/Maud-walk-right.gif',
                'stay': '9/96/Maud-idle-right.gif',
                'sit': '0/0b/Maud-lying-right.gif'
            }
        },
        'marble': {
            'actions': {
                'walk': 'b/b4/Marble-trot-right.gif',
                'stay': '6/6f/Marble-idle-right.gif'
            }
        },
        'lilstrong': {
            'actions': {
                'walk': '3/3b/Little_strongheart_trot_right.gif',
                'stay': 'c/c3/Little_strongheart_stand_right.gif',
                'nerv': '3/3c/Little_strongheart_nervous_right.gif'
            }
        },
        'lotus': {
            'actions': {
                'walk': 'a/a0/Trotcycle_lotus_right.gif',
                'stay': 'd/dd/Stand_lotus_right.gif'
            }
        },
        'lyra': {
            'actions': {
                'walk': 'f/f0/Walk_right.gif',
                'stay': '4/41/Lyra_stand_right.gif',
                'jump': '5/5c/Lyra_jump_right.gif',
                'sit': 'f/fd/Lyra_sit_right.gif',
                'lyre': '0/0b/Lyra-lyre-right.gif'
            }
        },
        'mane iac': {
            'actions': {
                'walk': 'f/f5/Mane-iac-walk-right.gif',
                'stay': 'c/c8/Mane-iac-idle-right.gif',
                'sit': '0/08/Mane-iac-lying-right.gif',
                'sleep': 'e/ef/Mane-iac-sleep-right.gif'
            }
        },
        'manticore': {
            'actions': {
                'walk': '1/15/Manticore-walk-right.gif',
                'walk2': '7/71/Manticore-smilewalk-right.gif',
                'stay': '0/0b/Manticore-idle-right.gif',
                'lick': 'e/e2/Manticore-lick-right.gif',
                'purr': 'a/a8/Manticore-purr-right.gif'
            }
        },
        'matilda': {
            'actions': {
                'walk': 'd/d5/Matilda-walk-right.gif',
                'stay': '4/42/Matilda-idle-right.gif'
            }
        },
        'mayor': {
            'actions': {
                'walk': '2/28/MayWalk_right.gif',
                'stay': '2/23/MayStand_right.gif'
            }
        },
        'colgate': {
            'actions': {
                'walk': '5/53/Colgate_walk_right.gif',
                'stay': 'b/ba/Colgate_stand_right.gif',
                'sit': '8/82/Colgate_sit_right.gif',
                'exe': '3/3d/Colgate_stretch_right.gif'
            }
        },
        'mjolna': {
            'actions': {
                'walk': '3/3f/Trottingmjolnaright.gif',
                'stay': '1/13/Standingmjolnaright.gif'
            }
        },
        'moondancer': {
            'actions': {
                'walk': 'e/e9/Moondancer-trot-right.gif',
                'stay': '8/89/Moondancer-idle-right.gif'
            }
        },
        'moonlightraven': {
            'actions': {
                'walk': 'e/e2/Moonlightraven-trot-right.gif',
                'stay': '4/45/Moonlightraven-idle-right.gif',
                'both': '3/30/Moonlightraven-hug-right.gif'
            }
        },
        'mr breeze': {
            'actions': {
                'walk': 'd/d3/Mister_breezy_trot_right.gif',
                'stay': '1/12/Mister_breezy_blink_right.gif'
            }
        },
        'greenhoves': {
            'actions': {
                'walk': '0/01/Greenhooves_walk_right.gif',
                'stay': 'f/f6/Greenhooves_blink_right.gif'
            }
        },
        'mr cake': {
            'actions': {
                'walk': 'd/d2/Mr_cake_trot_right.gif',
                'stay': '0/0a/Mr_cake_idle_right.gif'
            }
        },
        'mrs cake': {
            'actions': {
                'walk': '3/34/Mrs_cake_trot_right.gif',
                'stay': 'e/ea/Mrs_cake_idle_right.gif'
            }
        },
        'mr shy': {
            'actions': {
                'walk': 'f/f9/Mrshy-trot-right.gif',
                'stay': '3/3e/Mrshy-idle-right.gif',
                'fly': '2/21/Mrshy-fly-right.gif'
            }
        },
        'mrs shy': {
            'actions': {
                'walk': 'a/a0/Mrsshy-trot-right.gif',
                'stay': 'd/d9/Mrsshy-idle-right.gif',
                'fly': '9/94/Mrsshy-fly-right.gif'
            }
        },
        'harshwhinny': {
            'actions': {
                'walk': 'f/ff/Harshwhinny-trot-right.gif',
                'stay': '6/6c/Harshwhinny-stand-right.gif'
            }
        },
        'peachbottom': {
            'actions': {
                'walk': '6/64/Ms-Peachbottom-Trot-Right.gif',
                'stay': '8/8a/Ms-Peachbottom-Stand-Right.gif'
            }
        },
        'mystery': {
            'actions': {
                'fly': '1/11/MistFly_right.gif',
                'walk': '1/15/MistTrot_right.gif',
                'run': '5/5b/MistGallop_right.gif',
                'stay': 'f/f7/MistStand_right.gif',
                'magic': 'c/c2/MistMagic_right.gif'
            }
        },
        'neon': {
            'actions': {
                'walk': '2/2c/Neonlights-trot-right.gif',
                'stay': '8/83/Neonlights-idle-right.gif'
            }
        },
        'night glide': {
            'actions': {
                'walk': 'b/b3/Nightglider-trot-right.gif',
                'stay': '9/92/Nightglider-idle-right.gif',
                'fly': '3/30/Nightglider-fly-right.gif'
            }
        },
        'redheart': {
            'actions': {
                'walk': '2/28/Redheart-trot-right.gif',
                'stay': '4/48/Redheart-idle2-right.gif',
                'stay2': '2/28/Redheart-idle-right.gif'
            }
        },
        'snowheart': {
            'actions': {
                'walk': '3/38/Snowheart-right.gif',
                'stay': '3/35/Snowheart-idle-right.gif'
            }
        },
        'sweetheart': {
            'actions': {
                'walk': 'e/e8/Sweetheart-right.gif',
                'stay': 'f/f3/Sweetheart-idle-right.gif'
            }
        },
        'tenderheart': {
            'actions': {
                'walk': '8/84/Tenderheart-trot-right.gif',
                'stay': 'a/a6/Tenderheart-idle2-right.gif',
                'stay2': '2/27/Tenderheart-idle-right.gif'
            }
        },
        'nurse rhyme': {
            'actions': {
                'walk': '0/03/Nurseryrhyme-trot-right.gif',
                'stay': 'd/d6/Nurseryrhyme-idle-right.gif'
            }
        },
        'parcel': {
            'actions': {
                'walk': 'b/b9/Parcelpost-trot-right.gif',
                'stay': '0/06/Parcelpost-idle-right.gif'
            }
        },
        'octavia': {
            'actions': {
                'walk': '2/2b/Octavia_walk_right.gif',
                'stay': 'd/da/Octavia_stand_right.gif',
                'play': '4/48/Octavia_cello.gif'
            }
        },
        'party favor': {
            'actions': {
                'walk': '0/0f/Partyfavor-trot-right.gif',
                'stay': '1/1a/Partyfavor-idle-right.gif'
            }
        },
        'perf pace': {
            'actions': {
                'walk': '7/7a/Perfect_pace_trot_right.gif',
                'stay': '2/20/Perfect_pace_idle_right.gif'
            }
        },
        'photo finish': {
            'actions': {
                'run': '5/55/Photorun_right.gif',
                'stay': 'c/ce/PpIdle_right.gif'
            }
        },
        'plaid str': {
            'actions': {
                'walk': 'd/dd/Plaidstripes-trot-right.gif',
                'stay': '8/84/Plaidstripes-idle-right.gif',
                'stay2': '1/17/Plaidstripes-idle1-right.gif',
                'eye': '2/2b/Plaidstripes-eyebrows-right.gif'
            }
        },
        'pipsk': {
            'actions': {
                'walk': '9/9f/PipTrot_left.gif',
                'stay': '5/5f/PipStand_left.gif'
            },
            'isReverse': true
        },
        'pokey': {
            'actions': {
                'walk': 'f/f3/PokTrot_right.gif',
                'stay': '1/14/PokStand_right.gif'
            }
        },
        'police': {
            'actions': {
                'walk': '6/62/Policepony-trot-right.gif',
                'stay': '7/73/Policepony-idle-right.gif'
            }
        },
        'pound': {
            'actions': {
                'walk': 'c/c4/Pound-cake-trot-right.gif',
                'stay': '7/78/Pound-idle-right.gif',
                'fly': '0/09/Pound-flight-right.gif',
                'happy': '8/85/Pound-happy-right.gif'
            }
        },
        'blueblood': {
            'actions': {
                'walk': '4/49/Blueblood-trot-right.gif',
                'stay': '4/4a/Blueblood-idle-right.gif'
            }
        },
        'ember': {
            'actions': {
                'fly': 'b/b3/Ember-fly-right.gif',
                'stay': 'a/ae/Ember-idle-right.gif'
            }
        },
        'pumpkin': {
            'actions': {
                'walk': 'd/d6/Pumpkin-cake-trot-right.gif',
                'stay': '6/60/Pumpkin-idle-right.gif',
                'happy': 'b/b5/Pumpkin-happy-right.gif'
            }
        },
        'chrysalis': {
            'actions': {
                'walk': 'f/f4/Chrysalis-trot-right.gif',
                'stay': 'd/d4/Chrysalis-idle-right.gif',
                'fly': '4/44/Chrysalis-flight-right.gif'
            }
        },
        'rainblaze': {
            'actions': {
                'walk': '4/47/Rainbowblaze-trot-right.gif',
                'stay': '4/41/Rainbowblaze-idle-right.gif',
                'fly': 'c/c1/Rainbowblaze-fly-right.gif'
            }
        },
        'rainbowshine': {
            'actions': {
                'walk': '8/84/Rainbowshine_trot_right.gif',
                'stay': '1/13/Rainbowshine_idle_right.gif',
                'fly': '6/64/Rainbowshine_flight_right.gif'
            }
        },
        'raindrops': {
            'actions': {
                'walk': 'a/af/Raindrops_walkrights.gif',
                'stay': 'a/ad/Raindrops_standright.gif',
                'stay2': 'e/e3/Raindrops_hoverright.gif',
                'fly': '4/46/Raindrops_flyright.gif'
            }
        },
        'rar dad': {
            'actions': {
                'walk': '5/59/Raritys_dad_right.gif',
                'stay': 'e/ef/R_dad_idle_right.gif'
            }
        },
        'rar mom': {
            'actions': {
                'walk': 'f/fc/Raritysmom_trot_right.gif',
                'stay': '5/5e/R_mom_idle_right.gif'
            }
        },
        'raven': {
            'actions': {
                'walk': '4/44/Raven-trot-right.gif',
                'stay': 'd/d3/Raven-idle-right.gif'
            }
        },
        'rose': {
            'actions': {
                'walk': '2/2e/Rose_trot_right.gif',
                'stay': '3/39/Rose_stand_right.gif'
            }
        },
        'rover': {
            'actions': {
                'walk': '8/84/Rover_walk_right.gif',
                'stay': '0/00/Rover_idle_right.gif',
                'fun': '4/42/Rover_pokpok_right.gif',
                'walk2': 'f/fb/Rover_threatning_right.gif'
            }
        },
        'guard': {
            'actions': {
                'walk': '5/54/Royalguard_trot_right.gif',
                'stay': '8/8d/Royalguard_stand_right.gif',
                'fly': '8/8b/Royalguard_fly_right.gif'
            }
        },
        'night guard': {
            'actions': {
                'walk': 'd/d1/Nightguard_trot_right.gif',
                'stay': 'b/b9/Nightguard_right.gif',
                'fly': 'f/fa/Nightguard_fly_right.gif'
            }
        },
        'rumble': {
            'actions': {
                'walk': '5/53/Rumble_trot_right.gif',
                'stay': 'b/b4/Rumble_stand_right.gif',
                'sleep': 'b/b1/Rumble_sleep_right.gif',
                'sit': '8/83/Rumble_sit_right.gif'
            }
        },
        'ruby pinch': {
            'actions': {
                'walk': '0/08/Ruby_trot_r.gif',
                'stay': '4/40/Ruby_idle_right.gif',
                'sleep': '0/0e/Ruby_sleep_right.gif',
                'sit': '0/0e/Ruby_sit_right.gif'
            }
        },
        'saffron': {
            'actions': {
                'walk': 'f/f2/Saffronmasala-trot-right.gif',
                'stay': 'e/e8/Saffronmasala-idle-right.gif'
            }
        },
        'coriander': {
            'actions': {
                'walk': '4/4a/Coriandercumin-trot-right.gif',
                'stay': '6/62/Coriandercumin-idle-right.gif'
            }
        },
        'sapphire': {
            'actions': {
                'walk': '1/1a/Sapphire_trot_right.gif',
                'stay': '8/8b/Sapphire_idle_right.gif',
                'sens': 'd/df/Sensational_right.gif'
            }
        },
        'scootaloo': {
            'actions': {
                'walk': 'a/ae/ScotWalk_right.gif',
                'walk2': '2/27/Scootaloo_skipright.gif',
                'stay': 'f/f3/ScotStand_right.gif',
                'busket': '1/12/Basket_right.gif',
                'run': '1/1d/Scoot_right.gif',
                'run2': '4/49/Scootaloo-gallop-right.gif',
                'fly': '4/49/Scootaloo-fly-right.gif'
            }
        },
        'seaswirl': {
            'actions': {
                'walk': '6/6b/Seaswirl_trot_right.gif',
                'exe': '5/55/Seaswirl_stretch_right.gif',
                'stay': '0/0d/Seaswirl_stand_right.gif',
                'sit': 'd/d6/Seaswirl_sit_right.gif',
                'magic': 'e/ed/Seaswirl_horn1_right.gif'
            }
        },
        'shadowbolt': {
            'actions': {
                'run': 'c/cd/Shadowbolt_run_right.gif',
                'stay': '3/3c/Shadowbolt_stand_right.gif',
                'fly': '3/3e/Shadowbolt_fly_right.gif'
            }
        },
        'sherif': {
            'actions': {
                'walk': '4/4a/SherTrot_right.gif',
                'stay': '0/07/SherStand_right.gif'
            }
        },
        'shining': {
            'actions': {
                'walk': '1/1a/ShineTrot_right.gif',
                'stay': '7/71/ShineStand_right.gif'
            }
        },
        'shoshine': {
            'actions': {
                'walk': 'a/a7/Shoeshine-trot-right.gif',
                'stay': '6/6f/Shoeshine-idle-right.gif',
                'dance': '4/47/Shoeshine-dance-right.gif',
                'sleep': '3/37/Benchshoeshine.gif'
            }
        },
        'silvershil': {
            'actions': {
                'walk': 'b/b8/Silvershill-trot-right.gif',
                'stay': 'c/c4/Silvershill-idle-right.gif'
            }
        },
        'silverspoon': {
            'actions': {
                'walk': 'e/ec/SilvTrot_right.gif',
                'stay': 'c/c6/SilvStand_right.gif',
                'scoof': '9/9a/SilvScoff_right.gif'
            }
        },
        'silverspeed': {
            'actions': {
                'walk': 'b/b9/Silverspeed_trot_right_blink.gif',
                'walk2': 'e/ed/Silverspeed_trot_right_wing_blink.gif',
                'stay': 'b/b2/Silverspeed_stand_right.gif',
                'sit': '4/44/Silverspeed_sit_right.gif',
                'sleep': 'b/b6/Silverspeed_sleep_right.gif',
                'fly': '3/39/Silverspeed_fly_right.gif'
            }
        },
        'smooze': {
            'actions': {
                'walk': 'f/fe/Smooze-slide-right.gif',
                'stay': 'd/d4/Smooze-idle-right.gif'
            }
        },
        'snails': {
            'actions': {
                'walk': '3/35/SnailWalk_right.gif',
                'stay': '4/47/Snails_stand_right.gif'
            }
        },
        'snips': {
            'actions': {
                'walk': '3/3c/Snips_walk_right.gif',
                'stay': 'a/ac/Snips_stand_right.gif'
            }
        },
        'soarin': {
            'actions': {
                'walk': 'c/ce/SoarTrot_right.gif',
                'stay': 'c/c2/SoarIdle_right.gif',
                'fly': '0/06/SoarFly_right.gif',
                'pie': '9/9d/SoarPie_right.gif'
            }
        },
        'soigno': {
            'actions': {
                'walk': 'e/e4/SoiTrot_right.gif',
                'stay': '1/13/SoiStand_right.gif',
                'run': '7/72/Soignerun_right.gif'
            }
        },
        'sonata': {
            'actions': {
                'walk': '9/9c/Sonata-trot-right.gif',
                'stay': 'b/ba/Sonata-idle-right.gif'
            }
        },
        'ameth': {
            'actions': {
                'walk': 'd/dc/Sparkler_walk_right.gif',
                'stay': '6/61/Sparkler_stand_right.gif',
                'jar': '8/89/Sparkler_jar_open_right.gif',
                'sit': '1/15/Sparkler_sit_right.gif'
            }
        },
        'spitfire': {
            'actions': {
                'walk': 'a/aa/Suitless_spitfire_trotcycle_right.gif',
                'stay': 'f/f6/Suitless_spitfire_stand_right.gif',
                'fly': '5/5e/Suitless_spitfire_fly_right.gif'
            }
        },
        'spitfire2': {
            'actions': {
                'walk': '8/89/Spitfire_trotcycle_right.gif',
                'stay': 'e/ed/Spitfire_stand_right.gif',
                'fly': 'e/e0/Spitfire_fly_right.gif'
            }
        },
        'spolied rich': {
            'actions': {
                'walk': '8/8e/Spoiledrich-trot-right.gif',
                'stay': 'd/df/Spoiledrich-idle-right.gif'
            }
        },
        'spot': {
            'actions': {
                'walk': 'b/bc/Spot_walk_right.gif',
                'stay': '7/7b/Spot_blink_right.gif',
                'walk2': '2/20/Spot_threat_right.gif'
            }
        },
        'stella': {
            'actions': {
                'walk': '3/33/StellaTrot_right.gif',
                'stay': '2/21/StellaStand_right.gif',
                'run': '1/11/Stella_speed_right.gif'
            }
        },
        'stellar': {
            'actions': {
                'walk': '3/3b/Stellareclipse-trot-right.gif',
                'stay': '9/90/Stellareclipse-idle-right.gif'
            }
        },
        'shugarbell': {
            'actions': {
                'walk': '0/01/Sugarbelle-trot-right.gif',
                'stay': '0/0a/Sugarbelle-idle-right.gif'
            }
        },
        'sunburst': {
            'actions': {
                'walk': 'f/f1/Sunburst-trot-right.gif',
                'stay': '6/65/Sunburst-idle-right.gif'
            }
        },
        'sunburst2': {
            'actions': {
                'walk': '0/0b/Sunburst-cape-trot-right.gif',
                'stay': '2/2d/Sunburst-cape-idle-right.gif'
            }
        },
        'sunsetsh': {
            'actions': {
                'walk': '5/52/Sunsetshimmer-right.gif',
                'stay': '8/85/Sunsetshimmer-idle-right.gif',
                'run': '5/5d/Sunsetshimmer-gallop-right.gif'
            }
        },
        'sunshine': {
            'actions': {
                'walk': '4/4e/Sunshinesmiles-trot-right.gif',
                'stay': '9/98/Sunshinesmiles-idle-right.gif',
                'both': '3/30/Moonlightraven-hug-right.gif'
            }
        },
        'suri': {
            'actions': {
                'walk': 'b/ba/Suri-trot-right.gif',
                'stay': 'f/f2/Suri-idle-right.gif'
            }
        },
        'surprise': {
            'actions': {
                'walk': '9/92/Trotcycle_surprise_right.gif',
                'stay': '3/31/Stand_surprise_right.gif',
                'fly': '6/6d/Fly_surprise_right.gif',
                'tong': '9/98/Tonguedance_surprise_right.gif'
            }
        },
        'surprise2': {
            'actions': {
                'walk': 'a/a8/Surprise-trot-right.gif',
                'stay': '9/99/Surprise-idle-right.gif',
                'fly': '3/36/Surprise-fly-right.gif'
            }
        },
        'svenga': {
            'actions': {
                'walk': '4/4c/SvenTrot_right.gif',
                'stay': '9/9b/SvenStand_right.gif'
            }
        },
        'sweetie': {
            'actions': {
                'walk': '4/44/SwetWalk_right.gif',
                'walk2': 'c/cb/SwetScoot_right.gif',
                'stay': 'a/a4/SweetStand_right.gif',
                'sit': 'c/cc/SwetSit_right.gif',
                'run': 'd/db/Sweetiebelle-gallop-right.gif'
            }
        },
        'thunderl': {
            'actions': {
                'walk': '9/98/Thunderlane_jogging_right.gif',
                'fly': '9/9f/Thunderlane_fly_right.gif',
                'stay': 'd/d3/Thunderlane_wing_stand_right.gif',
                'sit': '4/47/Thunderlane_sit_right.gif',
                'sleep': '5/52/Thunderlane_sleep_right.gif'
            }
        },
        'tirek': {
            'actions': {
                'walk': '4/4f/Tirek-trot-right.gif',
                'stay': 'c/ca/Tirek-idle-right.gif'
            }
        },
        'toetupper': {
            'actions': {
                'walk': 'a/ad/Toetapper1-trot-right.gif',
                'stay': '8/82/Toetapper1-idle-right.gif'
            }
        },
        'toetupper2': {
            'actions': {
                'walk': 'a/a1/Toetapper-trot-right.gif',
                'stay': 'f/f7/Toetapper-idle-right.gif'
            }
        },
        'torchsong': {
            'actions': {
                'walk': '7/7e/Torchsong1-trot-right.gif',
                'stay': 'b/b2/Torchsong1-idle-right.gif'
            }
        },
        'torchsong2': {
            'actions': {
                'walk': '9/9f/Torchsong-trot-right.gif',
                'stay': '7/7b/Torchsong-idle-right.gif'
            }
        },
        'treehug': {
            'actions': {
                'walk': '0/02/Treehugger-walk-right.gif',
                'stay': 'c/ca/Treehugger-idle-right.gif',
                'act': '8/84/Treehugger-neigh-right.gif'
            }
        },
        'trixie': {
            'actions': {
                'walk': 'd/d3/Trixie_naked_trot_right.gif',
                'stay': '2/2b/Trixie_naked_stand_rights.gif'
            }
        },
        'trixie2': {
            'actions': {
                'walk': '9/94/TrixWalking_right.gif',
                'fire': 'f/fa/Trixie_fireworks_right.gif',
                'stay': '7/7e/TrixSit_right.gif'
            }
        },
        'trender': {
            'actions': {
                'walk': '9/93/Trenderhoof-right.gif',
                'stay': 'e/e5/Trenderhoof-idle-right.gif'
            }
        },
        'troubleshoes': {
            'actions': {
                'walk': 'b/b9/Troubleshoes-trot-right.gif',
                'stay': '0/09/Troubleshoes-idle-right.gif'
            }
        },
        'twinklshine': {
            'actions': {
                'walk': 'c/c0/Twinkleshine_trot_right_blink.gif',
                'stay': '2/29/Twinkleshine_stand_right.gif',
                'sit': 'e/ec/Twinkleshine_sit_right.gif',
                'sleep': '9/91/Twinkleshine_sleep_right.gif'
            }
        },
        'twist': {
            'actions': {
                'walk': 'e/e6/TwistTrot_right.gif',
                'stay': 'f/ff/TwistIdle_right.gif'
            }
        },
        'uncle orange': {
            'actions': {
                'walk': 'f/f6/Orange_trot_right.gif',
                'stay': '6/68/Orange_stand_right.gif'
            }
        },
        'vynil': {
            'actions': {
                'walk': 'b/b2/Trotcycle_scratch_right.gif',
                'stay': '0/05/Idle_scratch_right.gif',
                'dance': '9/97/Dancestomp_scratch_right.gif',
                'dance2': '8/83/Updown_scratch_right.gif'
            }
        },
        'nelli': {
            'actions': {
                'walk': '3/38/Whoanelly-trot-right.gif',
                'stay': 'c/cd/Whoanelly-idle-right.gif'
            }
        },
        'wild fire': {
            'actions': {
                'walk': '6/60/Wild_fire_trot_right.gif',
                'stay': '8/80/Wild_fire_idle_right.gif',
                'fly': '8/85/Wild_fire_flight_right.gif'
            }
        },
        'biff': {
            'actions': {
                'walk': '5/54/Biff-trot-right.gif',
                'stay': '0/0a/Biff-idle-right.gif'
            }
        },
        'rogue': {
            'actions': {
                'walk': 'e/e7/Rogue-trot-right.gif',
                'stay': 'e/e0/Rogue-idle-right.gif'
            }
        },
        'wither': {
            'actions': {
                'walk': '2/2a/Withers-trot-right.gif',
                'stay': '7/74/Withers-idle-right.gif'
            }
        },
        'zephyr': {
            'actions': {
                'walk': 'e/ed/Zephyrbreeze-trot-right.gif',
                'stay': 'e/e0/Zephyrbreeze-idle-right.gif',
                'fly': '2/2e/Zephyrbreeze-fly-right.gif'
            }
        },
        'script': {
            'actions': {
                'walk': '3/31/Writtenscript-trot-right.gif',
                'stay': '7/78/Writtenscript-idle-right.gif',
                'nuzzle': 'd/d2/Writtenscript-nuzzle-right.gif'
            }
        },
        'zekora': {
            'actions': {
                'walk': '5/55/Trotcycle_zecora_right.gif',
                'stay': '2/25/Stand_zecora_right.gif',
                'balance': 'd/d8/Balance_zecora.gif'
            }
        },
        'zippor': {
            'actions': {
                'walk': 'f/fc/Zipporwhill-trot-right.gif',
                'stay': '2/2b/Zipporwhill-idle-right.gif'
            }
        },
        'ace': {
            'actions': {
                'walk': '7/7c/Ace-trot-right.gif',
                'stay': 'd/d9/Ace-idle-right.gif'
            }
        },
        'applesplit': {
            'actions': {
                'walk': '3/34/Apple-split-trot-right.gif',
                'stay': '5/59/Apple-split-idle-right.gif'
            }
        },
        'beautibras': {
            'actions': {
                'walk': 'd/d3/Beauty_brass_trotcycle_right.gif',
                'stay': '1/11/Beauty_brass_stand_right.gif',
                'play': '6/63/Beauty_brass_tuba.gif'
            }
        },
        'caesar': {
            'actions': {
                'walk': 'c/c3/CaesTrot_right.gif',
                'stay': 'f/f4/CaesStand_right.gif'
            }
        },
        'caramel': {
            'actions': {
                'walk': 'b/b2/Caramel_walk_right.gif',
                'stay': 'd/d0/Caramel_stand_right.gif',
                'sad': '7/77/Caramel_sad_right.gif',
                'sleep': '1/1f/Caramel_sleep_right.gif'
            }
        },
        'dochorse': {
            'actions': {
                'walk': 'a/a0/Doctorhorse-trot-right.gif',
                'stay': 'e/e0/Doctorhorse-idle-right.gif'
            }
        },
        'doublediamond': {
            'actions': {
                'walk': 'a/aa/Doublediamond-trot-right.gif',
                'stay': 'a/a8/Doublediamond-idle-right.gif'
            }
        },
        'doc cabal': {
            'actions': {
                'walk': 'a/ac/Caballeron-right.gif',
                'stay': 'f/f1/Caballeron-idle-right.gif'
            }
        },
        'donny': {
            'actions': {
                'walk': 'f/fd/Donny-trot-right.gif',
                'stay': 'a/a1/Donny-idle-right.gif'
            }
        },
        'dude': {
            'actions': {
                'walk': 'b/b0/Dude-trot-right.gif',
                'stay': '3/33/Dude-idle-right.gif'
            }
        },
        'dumb bell': {
            'actions': {
                'walk': '3/3a/Dumbbell-trot-right.gif',
                'stay': 'e/ee/Dumbbell-idle-right.gif'
            }
        },
        'hoop': {
            'actions': {
                'walk': '9/96/Hoops-trot-right.gif',
                'stay': '0/0f/Hoops-idle-right.gif'
            }
        },
        'scoop': {
            'actions': {
                'walk': '5/5d/Score-trot-right.gif',
                'stay': '1/1f/Score-idle-right.gif'
            }
        },
        'walter': {
            'actions': {
                'walk': 'c/cb/Walter-trot-right.gif',
                'stay': '2/26/Walter-idle-right.gif'
            }
        },
        'winona': {
            'actions': {
                'run': '8/8d/Winona_run_right.gif',
                'stay': '6/6c/Winona_stand_right.gif'
            }
        },
        'owl': {
            'actions': {
                'fly': 'a/af/Owl_fly.gif',
                'stay': '0/03/Owl_stay.gif'
            }
        },
        'opal': {
            'actions': {
                'walk': '4/4c/Opal_walk.gif',
                'stay': 'b/bf/Opal_stay.gif',
                'play': '8/8c/Opal_play.gif'
            }
        },
        'angel': {
            'actions': {
                'run': 'e/ee/Angel_hop_right.gif',
                'stay': '0/0d/Angel_stand_right.gif',
                'happy': 'a/a7/Angel_stand_unannoyed_right.gif'
            }
        },
        'tank': {
            'actions': {
                'fly': '3/3b/Tank_fly_right.gif',
                'fly2': '3/3b/Tank_fly_right.gif'
            }
        }
    };

    var page = mw.config.get( 'wgTitle' ).replace( /\/.*/g, '' );

    var page_list = {
        'Принцесса Луна': [ 'luna', 'luna2', 'luna3', 'nm' ],
        'Лунная пони': 'nm',
        'Принцесса Каденс': [ 'cadance', 'cadance2' ],
        'Принцесса Селестия': [ 'celest', 'celest2', 'celest3' ],
        'Сумеречная Искорка': [ 'ts', 'ts gala', 'ts masked', 'ts science' ],
        'Рарити': [ 'rarity farm', 'rarity radiance' ],
        'Пинки Пай': [ 'pinkie', 'pinkamina', 'gala pinkie', 'pinkie fili' ],
        'Флаттершай': [ 'fluttershy', 'flutterbat', 'fluttershy rager', 'gala fluttershy' ],
        'Радуга Дэш': [ 'rd', 'rainbow zapp' ],
        'Эпплджек': [ 'aj', 'aj mistress', 'aj nm' ],
        'Спайк': [ 'spike', 'spike hum' ],
        'Старлайт Глиммер': 'starlight',
        'Серенада': 'serenada',
        'Торакс': 'torax',
        'Твайлайт Велвет и Найт Лайт': [ 'mrs sparkle', 'mr sparkle' ],
        'Адажио Дэззл': 'adagio',
        'Спа-пони': [ 'aloe', 'lotus' ],
        'Эппл Блум': 'applebloom',
        'Эппл Бампкин': 'applebumkin',
        'Пирожок': 'applefritter',
        'Большой Маки': 'bigmac',
        'Дядя и Тётя Орандж': [ 'orange aunt', 'uncle orange' ],
        'Ария Блейз': 'aria blaze',
        'Бэпс Сид': 'babs',
        'Берришайн': 'berryshine',
        'Блоссомфорт': 'blossomfort',
        'Свити Дропс': 'bonbon',
        'Брейбёрн': 'braeburn',
        'Большой Бицепс': 'bulk',
        'Голден Харвест': 'carrottop',
        'Кэнди Мэйн': 'candymane',
        'Чирайли': [ 'cheerilee', 'cheerilee80' ],
        'Чиз Сэндвич': 'cheese',
        'Черри Берри': 'cherryberry',
        'Клауд Кикер': 'cloudkicker',
        'Клауд Чейзер': 'cloudchaser',
        'Игноус Рок Пай и Клауди Кварц': [ 'quartz', 'ignous' ],
        'Графиня Колоратура': 'coloratura',
        'Коко Поммэл': 'coco',
        'Кренки Дудл': 'cranky',
        'Дейзи': 'daisy',
        'Дэринг Ду': [ 'daring', 'daring2' ],
        'Дерпи': 'derpy',
        'Даймонд Минт': 'mint',
        'Даймонд Тиара': 'diamond tiara',
        'Дискорд': 'discord',
        'Доктор Хувз': 'doctor hooves',
        'Джо': 'donutjoe',
        'Фэнси Пэнтс': 'fancy',
        'Фезервейт': 'featherweight',
        'Динки Ду': 'dinky',
        'Фидли Тванг': 'fiddle',
        'Алмазные псы': [ 'fido', 'rover', 'spot' ],
        'Филси Рич': 'filci',
        'Флим и Флэм': [ 'flam', 'flim' ],
        'Флэш Сентри': 'flash',
        'Флитфут': [ 'fleet', 'fleet2' ],
        'Флиттер': 'flitter',
        'Флурри Харт': 'flurry',
        'Флёр де Лис': 'fleur',
        'Джильда': 'gilda',
        'Дедушка Граф': 'grandpa grif',
        'Гизмо': 'gizmo',
        'Голди Делишес': 'goldie',
        'Бабуля Смит': [ 'grannysm', 'grannysm2', 'grannysm3' ],
        'Грета': 'gretta',
        'Зубастик': 'gummy',
        'Хойти Тойти': 'ht',
        'Ауисотль': 'ahuizotl',
        'Айрон Вилл': 'iron',
        'Леди Правосудие': 'ladyjuic',
        'Король Сомбра': 'sombra',
        'Лемон Хартс': 'lemonh',
        'Вайт Лайтнинг': 'whitelight',
        'Лайтнинг Даст': 'lightdust',
        'Лили Вайли': 'lily',
        'Мод Пай': 'maud',
        'Марбл Пай и Лаймстоун Пай': [ 'limestone', 'marble' ],
        'Сильное Сердце': 'lilstrong',
        'Лира Хартстрингс': 'lyra',
        'Мэйн-як': 'mane iac',
        'Мантикора': 'manticore',
        'Матильда': 'matilda',
        'Мэр Понивилля': 'mayor',
        'Мундэнсер': 'moondancer',
        'Мьёльна': 'mjolna',
        'Менуэтт': 'colgate',
        'Саншайн Смайлс и Мунлайт Рейвен': [ 'moonlightraven', 'sunshine' ],
        'Мистер Бризи': 'mr breeze',
        'Мистер Гринхувз': 'greenhoves',
        'Мистер и Миссис Пирожок': [ 'mr cake', 'mrs cake' ],
        'Мистер и Миссис Шай': [ 'mr shy', 'mrs shy' ],
        'Мисс Харшвинни': 'harshwhinny',
        'Мисс Пичботтом': 'peachbottom',
        'Таинственный защитник (персонаж)': 'mystery',
        'Неон Лайтс': 'neon',
        'Найт Глайдер': 'night glide',
        'Медсестра Редхарт': 'redheart',
        'Медсестра Рэдхарт': 'redheart',
        'Пони-медсёстры': [ 'snowheart', 'sweetheart', 'tenderheart', 'nurse rhyme' ],
        'Парсел Пост': 'parcel',
        'Октавия Мелоди': 'octavia',
        'Пати Фэйвор': 'party favor',
        'Перфект Пейс': 'perf pace',
        'Фото Финиш': 'photo finish',
        'Мистер Страйпс и Плейд Страйпс': [ 'plaid str' ],
        'Пипсквик': 'pipsk',
        'Роял Пин': 'pokey',
        'Паунд и Пампкин': [ 'pound', 'pumpkin' ],
        'Принц Голубая Кровь': 'blueblood',
        'Эмбер': 'ember',
        'Королева Крисалис': 'chrysalis',
        'Рэйнбоу Блейз': 'rainblaze',
        'Рэйнбоушайн': 'rainbowshine',
        'Саншауэр Рэйндропс': 'raindrops',
        'Хондо Флэнкс и Куки Крамблс': [ 'rar dad', 'rar mom' ],
        'Роз': 'rose',
        'Рэйвен Инквелл': 'raven',
        'Королевские стражники': [ 'guard', 'night guard' ],
        'Раби Пинч': 'ruby pinch',
        'Рамбл': 'rumble',
        'Кориандр Кумин и Сафрон Масала': [ 'saffron', 'coriander' ],
        'Сапфир Шорс': 'sapphire',
        'Скуталу': 'scootaloo',
        'Си Свирл': 'seaswirl',
        'Шэдоуболты': 'shadowbolt',
        'Шериф Сильверстар': 'sherif',
        'Шайнинг Армор': 'shining',
        'Шушайн': 'shoshine',
        'Сильвер Шилл': 'silvershil',
        'Силвер Спун': 'silverspoon',
        'Сильверспид': 'silverspeed',
        'Смузи': 'smooze',
        'Снэйлс': 'snails',
        'Снипс': 'snips',
        'Соарин': 'soarin',
        'Ассистентки Фотофиниш': [ 'soigno', 'stella' ],
        'Аметист Стар': 'ameth',
        'Соната Даск': 'sonata',
        'Спитфайр': [ 'spitfire', 'spitfire2' ],
        'Спойлд Рич': 'spolied rich',
        'Стеллар Эклипс': 'stellar',
        'Шугар Белль': 'shugarbell',
        'Санбёрст': [ 'sunburst', 'sunburst2' ],
        'Сансет Шиммер': 'sunsetsh',
        'Сури Поломэйр': 'suri',
        'Сюрпрайз': [ 'surprise', 'surprise2' ],
        'Свенгалоп': 'svenga',
        'Крошка Бель': 'sweetie',
        'Тандерлейн': 'thunderl',
        'Лорд Тирек': 'tirek',
        'Понитоунс': [ 'toetupper', 'torchsong', 'toetupper2', 'torchsong2' ],
        'Три Хаггер': 'treehug',
        'Трикси': [ 'trixie', 'trixie2' ],
        'Трендерхуф': 'trender',
        'Несчастная Подкова': 'troubleshoes',
        'Твинклшайн': 'twinklshine',
        'Твист': 'twist',
        'DJ Pon-3': 'vynil',
        'Хуа Нелли': 'nelli',
        'Вайлд Файр': 'wild fire',
        'Вайнона': 'winona',
        'Приспешники Доктора Кабаллерона': [ 'wither', 'rogue', 'biff' ],
        'Вриттен Скрипт': 'script',
        'Зекора': 'zekora',
        'Зефир Бриз': 'zephyr',
        'Зиппорвил': 'zippor',
        'Эйс Пойнт': 'ace',
        'Эппл Сплит': 'applesplit',
        'Бьюти Брас': 'beautibras',
        'Граф Цезарь': 'caesar',
        'Карамелька': 'caramel',
        'Доктор Хорс': 'dochorse',
        'Дабл Даймонд': 'doublediamond',
        'Доктор Кабаллерон': 'doc cabal',
        'Теодор Дональд "Донни" Керабатсос': 'donny',
        'Джефф Летротски': 'dude',
        'Задиры': [ 'dumb bell', 'hoop', 'scoop' ],
        'Уолтер': 'walter',
        'Сова': 'owl',
        'Опалесенс': 'opal',
        'Энджел': 'angel',
        'Тэнк': 'tank'
    };

    var start_top = Math.floor( 125 * Math.random() ) + 46,
        start_left = Math.floor( 500 * Math.random() ) + 100;

    $( 'body' ).append( '<div id="pony" style="position: absolute; top: ' + start_top + 'px; left: ' + start_left + 'px; z-index: 490; pointer-events: none;" />' );

    var frm_width = $( 'body' ).width() - 100,
        frm_height = $( window ).height();

    var pers, past_actions;

    if ( typeof( page_list[ page ] ) !== 'undefined' ) {
        var r = page_list[ page ];

        if ( typeof( r ) === 'object' ) {
            var rand = Math.floor( r.length * Math.random() );

            pers = pers_list[ r[ rand ] ];
        } else {
            pers = pers_list[ r ];
        }
    } else {
        var list = Object.keys( pers_list ),
            rand = Math.floor( list.length * Math.random() );
        
        pers = pers_list[ list[ rand ] ];
    }

    pers.images = {};
    pers.list = Object.keys( pers.actions );

    pers.list.forEach( function( v ) {
        pers.images[ v ] = new Image();
        pers.images[ v ].src = 'https://images.wikia.nocookie.net/siegenax/ru/images/' + pers.actions[ v ];
        if ( typeof( pers.isReverse ) !== 'undefined' && pers.isReverse ) {
            pers.images[ v ].style = "transform: scaleX(-1);";
        }
    });

    function makeAction() {
        var r_a = pers.list[ Math.floor( pers.list.length * Math.random() ) ];

        if ( past_actions !== r_a ) {
            past_actions = r_a;
        } else {
            makeAction();
            return;
        }

        $( '#pony' ).html( pers.images[ r_a ] );

        if ( /^(fly|walk|run)\d?/.test( r_a ) ) {
            var off = $( '#pony' ).offset(),
                move_action_x = [ true, false ], // true for left
                move_action_y = [ true, false ]; // true for top

            var move_to_x = move_action_x[ Math.floor( move_action_x.length * Math.random() ) ],
                move_to_y = move_action_y[ Math.floor( move_action_y.length * Math.random() ) ];

            var move_to_x_px = Math.floor( 600 * Math.random() ) + 50,
                move_to_y_px = Math.floor( 500 * Math.random() ) + 65,
                hypotenuse = Math.pow( move_to_x_px, 2 ) + Math.pow( move_to_y_px, 2 ),
                lng = Math.sqrt( hypotenuse );

            var time;
            if ( /^walk\d?/.test( r_a ) ) {
                time = lng*10 + Math.floor( 500 * Math.random() );
            } else {
                time = lng*8 + Math.floor( 250 * Math.random() );
            }

            if ( move_to_x ) {
                $( '#pony' ).css( 'transform', 'scaleX(-1)' );

                var move_x = off.left - move_to_x_px;

                if ( move_x < 100 ) {
                    $( '#pony' ).css( 'transform', 'scaleX(1)' );
                    move_x = off.left;
                }
            } else {
                $( '#pony' ).css( 'transform', 'scaleX(1)' );
    
                var move_x = off.left + move_to_x_px;

                if ( move_x > ( frm_width - 80 ) ) {
                    $( '#pony' ).css( 'transform', 'scaleX(-1)' );
                    move_x = off.left - 100;
                }
            }

            if ( move_to_y ) {
                var move_y = off.top - move_to_y_px;

                if ( move_y < 80 ) {
                    move_y = off.top + 100;
                }
            } else {
                var move_y = off.top + move_to_y_px;

                if ( move_y > ( frm_height - 40 ) ) {
                    move_y = off.top - 100;
                }
            } 

            $( '#pony' ).animate({
                left: move_x,
                top: move_y
            }, time, "linear", function() {
                makeAction();
            });
        } else {
            var time = Math.floor( 10000 * Math.random() ) + 3000;

            setTimeout(function() {
                makeAction();
            }, time );
        }
    }

    function wpSetCookie( val ) {
        var d = new Date();
        d.setTime( d.getTime() + (30*24*60*60*1000) );

        document.cookie = "mlpponies=" + encodeURIComponent( val ) + "; path=/ru/wiki/; expires=" + d.toUTCString() + "; domain=.fandom.com;";
    }

    function wpReadCookie() {
        var matches = document.cookie.match( new RegExp( "(?:^|; )mlpponies=([^;]*)" ) ),

        cookie = matches ? decodeURIComponent( matches[ 1 ] ) : undefined;
        return cookie;
    }

    $( makeAction );
}( jQuery, mediaWiki );