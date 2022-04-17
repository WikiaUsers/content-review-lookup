/* Config for [[w:c:dev:PreloadFileDescription]] */

PFD_templates = [
    {
        label: 'For Games',
        desc: '{{File\n|desc = <!-- file description -->\n|source = <!-- source url/filename/etc. -->}}',
        altdesc: '{{File\n|game = <!-- defaults to first filename segment -->\n|type = <!-- defaults to second filename segment -->\n|desc = <!-- file description -->\n|source = <!-- source url/filename/etc. -->}}',
        tip: 'Filenames should be formatted as:\n<pre><Game> - <Type> - <Name> (<Optional Qualifier>).<File Extension></pre>'
    }
];

PFD_requireLicense = true;
PFD_discourageEditorFileUpload = true;