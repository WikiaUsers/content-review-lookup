a = [];
b = $(".TablePager tbody tr");
for (c = 2; c < b.length; c++) {
	d = $(b[c]);
	e = $(d).children()[1].innerHTML;
	a.push(e);
}
f = [];
for (g = 0; g < a.length; g++) {
	h = a[g].replace(",", "");
	i = parseInt(h);
	f.push(i);
}
j = 0;
for (k = 0; k < f.length; k++) {
	j += f[k];
}