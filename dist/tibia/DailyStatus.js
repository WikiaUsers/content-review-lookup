$(function() {
    'use strict';
    
    /* General vars */
    
    var ds_utc_set_hours = parseInt($('#dst').html()),
    ds_utc_cet_diff =  ds_utc_set_hours * 3600 * 1000,
    ds_current_date = new Date(),
    ds_adjusted_date = new Date(ds_current_date.getTime() - 10 * 3600 * 1000 + ds_utc_cet_diff); //Date as if the SS was 0am on CET/CEST to match the day and the SS
    
    /* Server Time */
    
    var ds_server_hour = (ds_current_date.getUTCHours() + ds_utc_set_hours) % 24,
    ds_server_min = ds_current_date.getUTCMinutes(),
    ds_last_ss_hour = (ds_server_hour + 14) % 24,
    ds_next_ss_hour = (33 - ds_server_hour) % 24;
    
    $('#server_time').html(ds_server_hour.toString().padStart(2, 0) + ':' + ds_server_min.toString().padStart(2, 0) + ' ' + (ds_utc_set_hours == 1 ? 'CET' : 'CEST'));
    $('#local_ss').html((10 - ds_current_date.getTimezoneOffset() / 60 - ds_utc_set_hours).toString().padStart(2, 0));
    $('#last_ss').html(ds_last_ss_hour + ' hours and ' + ds_server_min + ' minutes');
    $('#next_ss').html(ds_next_ss_hour + ' hours and ' + (60 - ds_server_min) + ' minutes');
    
    /* Rashid */
    
    var ds_rashid_location = ['Carlin', 'Svargrond', 'Liberty Bay', 'Port Hope', 'Ankrahmun', 'Darashia', 'Edron'],
    ds_weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ds_rashid_town = ds_rashid_location[ds_adjusted_date.getUTCDay()];
    $('#rashid_weekday').html(ds_weekdays[ds_adjusted_date.getUTCDay()]);
    $('#rashid_out').html(ds_rashid_town);
    $('#rashid_map_' + ds_rashid_town.replace(" ", "_")).show();
    
    /* Dream Scar Boss */
    
    var ds_arena_bosses = ['Maxxenius', 'Alptramun', 'Izcandar the Banished', 'Plagueroot', 'Malofur Mangrinder'],
    ds_arena_offset = parseInt($('#dreambossoffset').html()),
    ds_arena_boss_i = Math.ceil((ds_adjusted_date.getTime() / 1000 / 60 / 60 / 24) + ds_arena_offset) % 5;
    
    $('#dream_boss_img').html('<img src="/wiki/Special:Filepath?file=' + ds_arena_bosses[ds_arena_boss_i] + '.gif">');
    $('#arena_out').html('<a href="/wiki/' + ds_arena_bosses[ds_arena_boss_i] + '">' + ds_arena_bosses[ds_arena_boss_i] + '</a>');
});