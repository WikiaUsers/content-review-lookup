//Redirect Special:Chat to Discord
if (mw.config.get('wgPageName') === 'Special:Chat') {
    window.location = 'https://community.fandom.com/wiki/Discord';
}

//LockForums - lock after 60 days (default: 30)
window.LockForums = {
    expiryDays: 60
};

window.AddRailModule = [{
    page: 'MediaWiki:DiscordAMA',
    prepend: true
}];

// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: [
        'de',
        'es',
        'fr',
        'id',
        'it',
        'ja',
        'nl',
        'pl',
        'pt',
        'pt-br',
        'ru',
        'zh',
        'zh-tw',
        'zh-hk'
    ],
    adoptionConfig: {
        activityDays: 10,
        adminsDays: 60,
        permissionTypes: [
            'bureaucrat',
            'sysop'
        ],
    },
    pageConfig: {
        namespace: 'Adoption',
        namespaceId: 118,
        adoptionsPage: 'Adoption:Requests'
    },
    /**
     * Wikitext schema for adoption requests created by this form
     * It uses Mustache.js template form
     *
     * You add variables using the following syntax: `{{variableName}}`.
     * If you want your variable to be unescaped (e.g. include HTML tags or URLs), you need to use `{{{variableName}}}`.
     *
     * This format doesn't particularly work with wikitext templates and magic words, thus I added `bStart` and `bEnd`
     * variables, which correspond to "{{" and "}}" characters repsectively, but are to be used for *wikitext* syntax only.
     *
     * Example:
     * `{{wikiURL}}` will produce: "https:&#x2F;&#x2F;wiki.fandom.com&#x2F;xx&#x2F;f&#x2F;p&#x2F;420"
     * `{{{wikiURL}}}` will produce: "https://wiki.fandom.com/xx"
     * `{{bStart}}wikiURL{{bEnd}}` will produce: "{{wikiURL}}" (wikitext)
     *
     * List of available variables:
     * {{userName}} - Currently logged user
     * {{wikiName}} - name of the wiki they want to adopt
     * {{{wikiURL}}} - URL of the wiki they want to adopt
     * {{permissionsType}} - Type of permissions they request
     * {{numDays}} - Number of days they were active in within last 10 days
     * {{numAdmins}} - Number of admins active in last 60 days
     * {{comments}} - Their comments and rationale for adoption
     * {{{communityVote}}} - URL to Discussions post with community vote for their request
     *
     * Technical:
     * - {{bStart}} - replaced with "{{"
     * - {{bEnd}} - replaced with "}}"
     */
    wikitextSchema: "{{bStart}}Adoption request\n" +
    "|1-User            = {{userName}}\n" +
    "|2-Link to wiki    = {{{wikiURL}}}\n" +
    "|3-Rights type     = {{permissionsType}}\n" +
    "|4-Your activity   = {{numDays}}\n" +
    "|5-Admin activity  = {{numAdmins}}\n" +
    "|6-Your motivation = <nowiki>{{comments}}</nowiki>\n" +
    "|7-Community vote  = {{{communityVote}}}\n" +
    "{{bEnd}}"
};