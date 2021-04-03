/**
/* Fix height on search when no ul is present in the `#right-navigation` (special pages)
/* This has no effect on `#right-navigation`s that already have a ul inside.
/**/
var search = document.getElementById('p-search');
search.innerHTML = search.innerHTML + '<ul></ul>';