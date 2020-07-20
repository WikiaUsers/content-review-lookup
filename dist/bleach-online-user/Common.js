switch (mw.config.get('wgPageName'))
{
    case 'Bleach_Online_User_Wiki':
        console.log('Initializing clocks');
        
        // Clocks
        
        var clockPlaceholder = document.getElementById('EUclock');
        var clockFrame = document.createElement('iframe');
        clockFrame.setAttribute('src', 'http://free.timeanddate.com/clock/i5nyo7jg/n195/fn7/fs18/fcfff/tct/pct/ftb/tt0/tw0/th1/tb2');
        clockFrame.setAttribute('frameborder', '0');
        clockFrame.setAttribute('width', '275');
        clockFrame.setAttribute('height', '27');
        clockFrame.setAttribute('allowTransparency', 'true');
        clockPlaceholder.innerHTML = '';
        clockPlaceholder.appendChild(clockFrame);
        
        clockPlaceholder = document.getElementById('USclock');
        clockFrame = document.createElement('iframe');
        clockFrame.setAttribute('src', 'http://free.timeanddate.com/clock/i57oeobv/n64/fn7/fs18/fcfff/tct/pct/ftb/tt0/tw0/th1/tb2');
        clockFrame.setAttribute('frameborder', '0');
        clockFrame.setAttribute('width', '275');
        clockFrame.setAttribute('height', '27');
        clockFrame.setAttribute('allowTransparency', 'true');
        clockPlaceholder.innerHTML = '';
        clockPlaceholder.appendChild(clockFrame);
        
        clockPlaceholder = document.getElementById('CNclock');
        clockFrame = document.createElement('iframe');
        clockFrame.setAttribute('src', 'http://free.timeanddate.com/clock/i57odlez/n33/fn7/fs18/fcfff/tct/pct/ftb/tt0/tw0/th1/tb2');
        clockFrame.setAttribute('frameborder', '0');
        clockFrame.setAttribute('width', '275');
        clockFrame.setAttribute('height', '27');
        clockFrame.setAttribute('allowTransparency', 'true');
        clockPlaceholder.innerHTML = '';
        clockPlaceholder.appendChild(clockFrame);

        // Discord chat
        
        var chatPlaceholder = document.getElementById('chat');
        var chatFrame = document.createElement('iframe');
        chatFrame.setAttribute('src', 'https://discordapp.com/widget?id=274289430355771394&theme=dark');
        chatFrame.setAttribute('frameborder', '0');
        chatFrame.setAttribute('width', '284');
        chatFrame.setAttribute('height', '500');
        chatFrame.setAttribute('allowTransparency', 'true');
        chatPlaceholder.innerHTML = '';
        chatPlaceholder.appendChild(chatFrame);
        break;
    case 'some other page':
        // JS here will be applied to "some other page"
        break;
}