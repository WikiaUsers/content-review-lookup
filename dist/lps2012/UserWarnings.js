if (/rigby3000/ig.test(document.getElementById('AccountNavigation').getElementsByTagName('img')[0].nextSibling.data)) {
		document.getElementById('WikiaPage').innerHTML = document.getElementById('WikiaPage').innerHTML.replace(/action=edit/g, '#');
		var vandalMessage = document.createElement('div');
		vandalMessage.innerHTML = "<div style='color:white; background-color:red; width:100%; height: 150px; text-align: center; position: fixed; top: 0;'><h2>Congratulations!</h2><p>Due to excessive vandals you made on canon pages, and ignoring the warnings of admins. You are now nearly going to be block, as much as possible, we don\'t want to do this. But due to your behaviour and obssession on adding fanon on the canon pages, we don\'t have any options. But if you can't help it, use your own page for your fanon stuffs. Thank You! <br/>If you don\'t want to received a message like this, BEHAVE! and contact the admin.</p></div>";
		document.body.appendChild(vandalMessage);
}

if (/Kyurem147/ig.test(document.getElementById('AccountNavigation').getElementsByTagName('img')[0].nextSibling.data)) {
		var newMessage = document.createElement('div');
		newMessage.innerHTML = "<div style='color:white; background-color:orange; width:100%; height: 150px; text-align: center; position: fixed; top: 0;'><h2>If you receive this message!</h2><p>Talk to Flippy_Bear about this.</p></div>";
		document.body.appendChild(newMessage);
}