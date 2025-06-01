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

    // Only modify actual text nodes inside these elements
    const elements = $('p, li, span, td, th, h1, h2, h3, h4');

    elements.contents().each(function () {
        if (this.nodeType === 3) { // TEXT_NODE
            let text = this.nodeValue;

            for (let keyword in styles) {
                const style = styles[keyword];
                const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                const replacement = `<span style="color: ${style.color}; text-shadow: ${style.textShadow};">$1</span>`;
                text = text.replace(regex, replacement);
            }

            // Only replace if needed
            if (text !== this.nodeValue) {
                $(this).replaceWith(text);
            }
        }
    });
});