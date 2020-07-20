/* Railgun Demos */
if (mediaWiki.config.get('wgPageName') === 'Demo/Liquid_Rail_and_Rotate_Rail') {
    importScript('Demo/Liquid_Rail_and_Rotate_Rail/code.js');
}



/* Hack to fix links in MediaWiki:Noarticletext that are
getting broken by Wikia's "Create a new article" pop up feature */
if ($('#Noarticletext-span-1')) {
    $(function () {
        console.log('234234243234235234234234234234234234');
        var u1 = 'http://railgunscript.wikia.com/wiki/Railgun_Wiki';

        var u2 = document.referrer;

        var u3 = 'http://railgunscript.wikia.com/wiki/Special:WikiaSearch?search='+$('#Noarticletext-span-3 a').text()+'&fulltext=Search&ns0=1&ns1=1&ns2=1&ns3=1&ns4=1&ns5=1&ns6=1&ns7=1&ns8=1&ns9=1&ns10=1&ns11=1&ns12=1&ns13=1&ns14=1&ns15=1&ns110=1&ns111=1&ns500=1&ns501=1&ns502=1&ns503=1&ns1100=1&ns1200=1&ns1201=1&ns1202=1&redirs=1';

        $('#Noarticletext-span-1 a')
        .attr('href', u1)
        .click(
        function () {
            window.location.href = u1;
        });

        $('#Noarticletext-span-2 a')
        .attr('href', u2)
        .click(
        function () {
            window.location.href = u2;
        });

        $('#Noarticletext-span-3 a')
        .attr('href', u3)
        .click(
        function () {
            window.location.href = u3;
        });
    });
}