$(document).ready(function () {
    const styles = {
        'Kills': {
            color: 'red',
            textShadow: '0 0 10px rgba(255,0,0,1), 0 0 10px rgba(255,0,0,1)'
        },
        'Killstreak: Verse': {
            color: 'red',
            textShadow: '0 0 10px rgba(255,0,0,1)'
        },
        'Slaps': {
            color: 'pink',
            textShadow: '0 0 10px rgba(255,105,180,1), 0 0 10px rgba(255,105,180,1)'
        },
        'Time': {
            color: 'blue',
            textShadow: '0 0 10px rgba(0,0,255,1), 0 0 10px rgba(0,0,139,1)'
        },
        'EXP': {
            color: 'Lime',
            textShadow: '0 0 10px rgba(0,255,0,1), 0 0 10px rgba(0,255,0,1)'
        },
        'MHD': {
            color: 'OrangeRed',
            textShadow: '0 0 10px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,1)'
        }
    };

    // Loop through all elements
    $('p, li, span, td, th, h1, h2, h3, h4').each(function () {
        let html = $(this).html();

        // Check for each keyword and apply its style
        for (let keyword in styles) {
            const style = styles[keyword];
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            if (regex.test(html)) {
                const styledHTML = `<span style="color: ${style.color}; text-shadow: ${style.textShadow};">${keyword}</span>`;
                html = html.replace(regex, styledHTML);
            }
        }

        $(this).html(html);
    });
});