/**Testing**/ 
 
 
$("#mw-input-wp-skin option[value='monobook']").replaceWith('<option value="monobook">Psuedo-Vector</option>');   

$('.username').text(mw.config.get('wgUserName'));

window.MessageWallUserTags = {
    tagColor: 'red',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'Admin',
        'Zurlaw': 'Onision Admin'
    }
};