/* Any JavaScript here will be loaded for all users on every page load. */
// 11:15, August 19, 2013 (UTC)
// <source lang="JavaScript">
// Coded by Cblair91
 
// All the amazing javascript for calculating the IP range blocking
var nAddr = new Array(10, 0, 0, 0);
var nMask = new Array(255, 0, 0, 0);
function displayInfo() {
	var wc = wildcardMask(nMask);
	var cidr = octet2cidr(nMask);
	var aStart = startingIP(nAddr, nMask);
	var aEnd = endingIP(nAddr, wc);
	document.getElementById("networkbit").value = cidr;
	document.getElementById("hosts").value = hostCount(nMask);
	document.getElementById("startIP").value = aStart[0] + "." + aStart[1] + "." + aStart[2] + "." + aStart[3];
	document.getElementById("endIP").value = aEnd[0] + "." + aEnd[1] + "." + aEnd[2] + "." + aEnd[3];
	populateHostsSelect(document.getElementById('hostsSelect'), nAddr, cidr);
}
function populateHostsSelect(s, aNet, cidr) {
	s.length = 0;
	var pow = 8;
	var t = 2;
	while(pow > 2) {
		t = Math.pow(2, pow) - 2;
		addOption(s, t, 32 - pow);
		pow--;
	}
	selectOption(s, cidr);
}
function calculateHosts(cidr) {
	nMask = cidr2octet(cidr);
	displayInfo();
}
function addOption(s, t, v) {
	var o = document.createElement('option');
	o.text = t;
	o.value = v;
	try {
		s.add(o, null);
	} catch(e) {
		s.add(o);
	}
}
function selectOption(s, v) {
	for (var i = 0; i < s.length; i++) {
		if(s[i].value == v) {
			s.selectedIndex = i;
			break;
		}
	}
}
function wildcardMask(aMask) {
	var a = new Array(0, 0, 0, 0);
	for(var i = 0; i < 4; i++)
		a[i] = 255 - aMask[i];
	return a;
}
function endingIP(aNet, aWild) {
	var a = new broadcast(aNet, aWild);
	var d = octet2dec(a);
	return dec2octet(d);
}
function broadcast(aNet, aWild) {
	var a = new Array(0, 0, 0, 0);
	for(var i = 0; i < 4; i++)
		a[i] = aNet[i] | aWild[i];
	return a;
}
function startingIP(aNet, aMask) {
	var a = subnetID(aNet, aMask);
	var d = octet2dec(a);
	return dec2octet(d);
}
function subnetID(aNet, aMask) {
	var a = new Array(0, 0, 0, 0);
	for(var i = 0; i < 4; i++)
		a[i] = aNet[i] & aMask[i];
	return a;
}
function octet2cidr(aMask) {
	var mask = octet2dec(aMask);
	mask = mask.toString(2);
	return mask.indexOf(0);
}
function hostCount(aMask) {
	var bits = 32 - octet2cidr(aMask);
	return Math.pow(2, bits) - 2;
}
function octet2dec(a) {
	var d = 0;
	d = d + parseInt(a[0]) * 16777216;
	d = d + a[1] * 65536;
	d = d + a[2] * 256;
	d = d + a[3];
	return d;
}
function dec2octet(d) {
	var zeros = "00000000000000000000000000000000";
	var b = d.toString(2);
	var b = zeros.substring(0, 32 - b.length) + b;
	var a = new Array(
		parseInt(b.substring(0, 8), 2)
		, (d & 16711680) / 65536
		, (d & 65280) / 256
		, (d & 255)
	);
	return a;
}
function cidr2octet(bits) {
	var bits = parseInt(bits);
	if(bits < 0 | bits > 32) {
		alert("Invalid 32 bit DIDR mask.  You entered " + bits);
		return false;
	}
	var ones = "11111111111111111111111111111111";
	var mask = parseInt(ones.substring(0, bits), 2);
	var shift = 32 - bits;
	mask = mask * Math.pow(2, shift);
	return dec2octet(mask);
}
function calculateIPCIDR() {
	var ip = document.getElementById("network").value;
	var value = document.getElementById("networkbit").value;
	nAddr = ip.split('.');
	if(value.length > 0)
		nMask = cidr2octet(value);
	displayInfo();
}
 
// And then the table for importing
 
var iptable = '<table><tr><td>Network IP</td><td><input id="network" type="text" onchange="calculateIPCIDR();" /> / <input id="networkbit" type="text" onchange="calculateIPCIDR();" value="16" /></td></tr><tr><td>Hosts</td><td><input id="hosts" type="text" readonly="readonly" /><select id="hostsSelect" onchange="calculateHosts(this.options[this.selectedIndex].value);"><option value="2">loading...</select></td></tr><tr><td>Start</td><td><input id="startIP" type="text" readonly="readonly" /></td></tr><tr><td>End</td><td><input id="endIP" type="text" readonly="readonly" /></td></tr></table>';
 
// Update ~ For when updating a IP in the Special:Block
if(wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Block") {
	$('#mw-bi-target').change(function() {
		var ip = $(this).val();
		iptest = ip.split('.');
		if(iptest.length == 4) {
			var ipa = ip.split('/');
			if(ipa.length == 2) {
				document.getElementById("network").value = ipa[0];
				document.getElementById("networkbit").value = ipa[1];
			} else
				document.getElementById("network").value = ip;
			calculateIPCIDR();
		}
	});
}
 
// When page loads, load ip range detector, and if there's an ip existing in there, do as above
$(document).ready(function() {
	$('.krisiprange').html(iptable);
	if(wgCanonicalNamespace == "Special" && wgCanonicalSpecialPageName == "Block") {
		var ip = $('#mw-bi-target').val();
		iptest = ip.split('.');
		if(iptest.length == 4) {
			var ipa = ip.split('/');
			if(ipa.length == 2) {
				document.getElementById("network").value = ipa[0];
				document.getElementById("networkbit").value = ipa[1];
			} else
				document.getElementById("network").value = ip;
			calculateIPCIDR();
		}
	}
});
 
// </source>