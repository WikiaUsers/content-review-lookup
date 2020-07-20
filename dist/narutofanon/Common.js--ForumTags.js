// Orginal script (http://dev.wikia.com/wiki/MessageWallUserTags/code.js)
// by User:RyaNayR (http://dev.wikia.com/wiki/User:RyaNayR)
// based on the version by User:UltimateSupreme (http://naruto.wikia.com/wiki/User:UltimateSupreme)
// this version by User:Ten_Tailed_Fox (http://narutofanon.wikia.com/wiki/User:Ten_Tailed_Fox)

(function($, config) {

    users = {

        // Tag all bureaucrats
        Ten_Tailed_Fox: 'Bureaucrat • Kazekage',
        LaviBookman: 'Bureaucrat • Wiki Founder',

        // Tag all sysops
        Berserkchart486: 'Sysop • Operator • Raikage',
        Ash9876: 'Sysop • Operator',
        Chix777: 'Sysop • Operator',
        Old_Deus: 'Sysop',

        // Operators
        Dal101: 'Operator',

        // Kage
        Silver-Haired_Seireitou: 'Hokage',
    }

    $.each(users, function(name, v) {
        $('a.subtle[href$="User_talk:' + name + '"]').after('<span class="ForumTags">(' + v + ')</span>');
        $('.ForumTags').css({
            color: 'red',
            marginLeft: '-2px',
            fontFamily: 'arial',
            fontSize: '12px',
            textShadow: '0 0 20px #f77',
        });
    });
}(jQuery, window.MessageWallUserTags));