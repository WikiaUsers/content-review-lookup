/* <nowiki> */
/* Agent Studio V2. Native ZZZ Fanon templates; contributors' source: CC BY-SA.
 * Same-origin MediaWiki API; explicit preview/create; no existing-page edits.
 */
(function () {
  'use strict';
  if (
    !['Agent_Studio', 'User:Onironi6/Agent_Studio'].includes(mw.config.get('wgPageName')) ||
    mw.config.get('wgAction') !== 'view'
  )
    return;
  mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
    jQuery(function () {
      const mount = document.getElementById('zzz-agent-studio');
      if (!mount || mount.dataset.studioReady) return;
      mount.dataset.studioReady = '1';
      mount.dataset.studioBuild = '20261105.10';
      mount.innerHTML = `<div id="agent-studio">
    <div class="welcome"><h1>Create an agent</h1><p>Welcome to New Eridu, Citizen! Let's bring your next agent to life.</p></div>
    <nav aria-label="Creation steps" class="step-navigation"><ol id="steps"></ol></nav>
    <div class="draft-toolbar"><span id="step-count">Step 1 of 6</span><span id="save-status" role="status">New local draft</span><button class="wds-button wds-is-text wds-is-secondary" type="button" id="preview-card">Preview card</button></div>
    <form id="agent-form" novalidate>
      <div class="form-surface">
        <section data-step="0" aria-labelledby="heading-0">
          <div class="section-intro"><h2 id="heading-0" tabindex="-1">Meet your agent</h2><p>The essentials that appear at the top of their wiki page.</p><small>Fields marked <span aria-hidden="true">*</span> are required. Everything else can be added later.</small></div>
          <fieldset><legend>Name &amp; identity</legend><div class="fields" id="identity-fields"></div><details class="optional-group" id="title-badge-details"><summary>Title badge <span>Optional</span></summary><p class="group-help">An icon and a title under the agent's name — like Onironi's “The Night Horror”.</p><div class="fields" id="extra-identity-fields"></div><div id="titleIcon-picker" class="image-picker compact-icon" data-image="titleIcon"></div><div id="title-badge-sample" class="title-badge-sample" hidden><small>Badge preview</small><div><img width="24" alt="" hidden><span></span></div></div></details></fieldset>
          <fieldset><legend>Agent classification</legend><div class="fields" id="classification-fields"></div><div id="custom-classification-fields"></div></fieldset>
        </section>
        <section data-step="1" aria-labelledby="heading-1" hidden>
          <div class="section-intro"><h2 id="heading-1" tabindex="-1">Give them a face</h2><p>Add a portrait and a few personal details. These appear in the agent's infobox.</p><small>This whole step is optional.</small></div>
          <fieldset><legend>Portrait</legend><div id="portrait-picker" class="image-picker" data-image="portrait"></div></fieldset>
          <fieldset><legend>About your agent</legend><div class="fields" id="profile-fields"></div></fieldset>
          <details class="optional-group"><summary>Names, relationships &amp; voice actors <span>Optional</span></summary><div class="fields" id="extra-profile-fields"></div></details>
        </section>
        <section data-step="2" aria-labelledby="heading-2" hidden>
          <div class="section-intro"><h2 id="heading-2" tabindex="-1">Make a first impression</h2><p>A line in their own voice, then a short introduction for readers.</p><small>Shown at the start of the agent’s main page.</small></div>
          <fieldset><legend>Opening text</legend><div class="fields" id="introduction-fields"></div><div class="starter-example"><small>Suggested opening</small><p id="starter-sentence"></p></div></fieldset>
        </section>
        <section data-step="3" aria-labelledby="heading-3" hidden>
          <div class="section-intro"><h2 id="heading-3" tabindex="-1">Build their combat kit</h2><p>Add base stats and describe their skills using normal fields.</p><small>Optional. You can skip this step and return to it later.</small></div>
          <label class="section-switch"><input type="checkbox" id="combat-enabled"><span><strong>Include combat details</strong><small>Add a Combat Info section to the main page.</small></span></label>
          <div id="combat-content" hidden>
            <fieldset><legend>Base stats</legend><p class="group-help">Level 1, before promotion. Leave all three blank to omit the stats table.</p><div class="fields three-columns" id="stats-fields"></div></fieldset>
            <fieldset><legend>Stats &amp; Promotions</legend><label class="section-switch"><input type="checkbox" id="promotions-enabled"><span><strong>Include stats through level 60</strong><small>Add the full before/after promotion table and its material costs.</small></span></label><div id="promotion-details" hidden><p class="group-help">Enter HP, ATK and DEF before and after each promotion. Level 1 uses the base stats above; material quantities and totals are filled automatically.</p><p id="promotion-material-note" class="group-help"></p><label class="small-switch"><input id="promotion-materials-manual" type="checkbox"> Choose certification seals manually</label><div id="promotion-material-fields" class="fields three-columns" hidden></div><div id="promotion-material-preview" class="upgrade-materials" aria-live="polite"></div><div class="promotion-editor"><table id="promotion-stat-inputs" class="wikitable"><thead><tr><th>Promotion</th><th>Level</th><th>HP</th><th>ATK</th><th>DEF</th></tr></thead></table></div><small>Totals: 800,000 Denny · 4 basic seals · 32 advanced seals · 30 final seals.</small></div></fieldset>
            <fieldset><legend>Skills</legend><p class="group-help">Add the skills you have written. Each entry stays on this agent's main page.</p><div id="skill-list"></div><button id="add-skill" type="button" class="wds-button wds-is-secondary">＋ Add a skill</button></fieldset>
            <fieldset id="skill-enhancement-form" hidden><legend>Skill Enhancement</legend><label class="section-switch"><input type="checkbox" id="skill-enhancement-enabled"><span><strong>Include skill upgrade materials</strong><small>Add the wiki's level 1–12 enhancement table and total cost for one skill.</small></span></label><div id="skill-enhancement-details"><p id="skill-chip-note" class="group-help"></p><label class="small-switch"><input type="checkbox" id="skill-chip-manual"> Choose another chip family</label><div id="skill-chip-fields" class="fields"></div><div id="skill-chip-preview" class="upgrade-materials" aria-live="polite"></div><small>Totals per skill: 500,000 Denny · 5 basic chips · 15 advanced chips · 50 specialized chips · 1 Hamster Cage Pass.</small></div></fieldset>
            <fieldset id="core-enhancement" hidden><legend>Core Skill Enhancement</legend><p class="group-help">Available because you added a Core Skill. Choose its materials and the two bonuses that alternate from A to F.</p><label class="section-switch"><input type="checkbox" id="core-enhancement-enabled"><span><strong>Include Core Skill Enhancement</strong><small>Build the upgrade table for this agent.</small></span></label><div id="core-enhancement-content"><div class="fields" id="core-passive-fields"></div><h3 class="core-subheading">Enhancement materials</h3><div class="core-material-fields" id="core-material-fields"></div><h3 class="core-subheading">Two alternating bonuses</h3><div class="fields" id="core-bonus-fields"></div><p id="core-bonus-summary" class="core-bonus-summary" aria-live="polite"></p><small>Totals: 60 A-Rank materials, 9 S-Rank materials and 405,000 Denny. Each bonus is applied three times.</small><button type="button" id="preview-core" class="wds-button wds-is-secondary">Preview enhancement table</button></div></fieldset>
          </div>
        </section>
        <section data-step="4" aria-labelledby="heading-4" hidden>
          <div class="section-intro"><h2 id="heading-4" tabindex="-1">Six awakenings</h2><p>Give each Mindscape a title and an effect. The memory behind it is optional.</p><small>Optional. Leave this section off until your six awakenings are ready.</small></div>
          <label class="section-switch"><input type="checkbox" id="mindscape-enabled"><span><strong>Include Mindscape Cinema</strong><small>Add the wiki's six-awakening layout to the main page.</small></span></label>
          <div id="mindscape-content" hidden><fieldset><legend>Mindscape artwork</legend><div id="mindscape-picker" class="image-picker" data-image="mindscape"></div></fieldset><fieldset><legend>Awakenings <span id="mindscape-progress"></span></legend><div id="mindscape-tabs" role="tablist" aria-label="Mindscape awakening"></div><div id="mindscape-editors"></div></fieldset></div>
        </section>
        <section data-step="5" aria-labelledby="heading-5" hidden>
          <div class="section-intro"><h2 id="heading-5" tabindex="-1">Ready for a first look?</h2><p>Check the details and open the full page preview before creating your agent.</p><small>Your draft stays on this device until you select Create agent pages. Existing pages are kept.</small></div>
          <div id="review-summary"></div>
          <details class="optional-group"><summary>Names in other languages <span>Optional</span></summary><div class="fields" id="language-fields"></div></details>
          <p id="review-errors" class="form-notice" role="status" hidden></p>
          <details class="optional-group" open><summary>Optional pages</summary><p class="group-help">Create empty pages now and fill them later. Existing pages are kept.</p><div id="subpage-fields"></div></details>
<div id="image-credits-group" hidden><div class="fields" id="image-credits-fields"></div></div>
<div id="publish-plan" class="publication-plan"></div>
<div class="review-actions"><button id="preview-page" type="button" class="wds-button wds-is-secondary">Preview full page</button><button id="finish-draft" type="button" class="wds-button">Create agent pages</button></div>
          <p id="finish-status" role="status"></p>
          <details class="advanced-source"><summary>Generated page source <span>For experienced editors</span></summary><label for="page-source">Wikitext for the main page</label><textarea id="page-source" rows="14" readonly spellcheck="false"></textarea></details>
        </section>
        <div id="step-error" class="form-notice" role="alert" hidden></div>
      </div>
      <footer class="form-footer"><button id="back" type="button" class="wds-button wds-is-secondary">← Back</button><span id="footer-note">Start with the essentials</span><div class="footer-forward"><button id="skip" type="button" class="wds-button wds-is-text wds-is-secondary" hidden>Skip for now</button><button id="next" type="button" class="wds-button">Next: Profile &amp; art →</button></div></footer>
    </form>
    <p class="local-footnote">Drafts save on this device. Use Preview full page, then Create agent pages to publish on this wiki.</p>
    <dialog id="preview-dialog" class="preview-dialog" aria-labelledby="preview-heading"><div class="preview-toolbar"><div><small id="preview-kind">Card preview</small><h2 id="preview-heading">Your agent</h2></div><button id="close-preview" type="button" class="wds-button wds-is-secondary">Close preview</button></div><p id="preview-status" role="status"></p><div id="preview-content" class="mw-parser-output"></div><button id="retry-preview" type="button" class="wds-button wds-is-secondary" hidden>Retry preview</button></dialog></div>

<datalist id="attributes"><option>Physical</option><option>Fire</option><option>Ice</option><option>Electric</option><option>Ether</option><option>Warp</option></datalist>
<datalist id="specialties"><option>Attack</option><option>Stun</option><option>Anomaly</option><option>Support</option><option>Defense</option><option>Rupture</option></datalist>
<datalist id="species"><option>Human</option><option>Thiren</option><option>Intelligent Construct</option></datalist>
<datalist id="attack-types"><option>Slash</option><option>Strike</option><option>Pierce</option></datalist>
<datalist id="core-stats"><option>CRIT Rate</option><option>CRIT DMG</option><option>Base HP</option><option>Base ATK</option><option>Base DEF</option><option>Impact</option><option>Anomaly Proficiency</option><option>Anomaly Mastery</option><option>PEN Ratio</option><option>Energy Regen</option></datalist>
<datalist id="secondary-skill-types"></datalist>
`;

      /* Wiki attributes, factions and attack-type catalog (wiki-catalog.js) */
      window.AgentWikiCatalog = {
        'checkedOn': '2026-11-05',
        'attributes': [
          'Physical',
          'Fire',
          'Ice',
          'Electric',
          'Ether',
          'Wind',
          'Lumiflux',
          'Cremation',
          'Poison',
          'Special',
          'Echo',
          'Rustflame',
          'Surge',
          'Starburst',
          'Warp',
        ],
        'regularAttributes': ['Physical', 'Fire', 'Ice', 'Electric', 'Ether', 'Wind', 'Lumiflux'],
        'factions': [
          'Astreum Bar',
          'Axis Espionage',
          'Belobog Heavy Industries',
          'Castigation Dojo',
          'Chan Exchange',
          'Criminal Investigation Special Response Team',
          'Cunning Hares',
          'Fang of The Skies',
          'Free Course Cafe',
          'Heishou Pack',
          'HiveXpress',
          'Hollow Special Operations Section 0',
          'Hollow Special Operations Section 10',
          'Hollow Special Operations Section 6',
          'Hollow Wipeout Associative Agency',
          'Holy Church',
          'Hongbao Detective Agency',
          'Hyperion 11',
          'Justis Club',
          'Komakusa Pharmacy',
          'Krampus Compliance Authority',
          'Leifang Liberation Front',
          'Mercuria Boutique',
          'Mockingbird',
          'Nephalem Detective Agency',
          'New Eridu Defense Force',
          'New Eridu Ecosystem Sentries and Surveyors',
          'Nightstar Station',
          'Nightwatcher Squad',
          'Obol Squad',
          'Opredema Protection Sector',
          "Pandora's Box",
          'Plethoric Botany',
          'Pravda Family',
          'PROVIDENCE',
          'Proxies',
          'Sanctioned Actions Group',
          'Sola Office',
          'Sons of Calydon',
          'Spook Shack',
          'Stars of Lyra',
          'The Novella',
          'TOPS',
          'Underground Hollow Developers Center',
          'Victoria Housekeeping Co.',
          'Yunkui Summit',
        ],
        'specialties': ['Attack', 'Stun', 'Anomaly', 'Support', 'Defense', 'Rupture', 'Armorer'],
        'attackTypes': ['Strike', 'Slash', 'Pierce'],
        'attackIcons': {
          'Pierce':
            'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/6/69/Icon_Pierce.png/revision/latest/scale-to-width-down/32?cb=20250606152240',
          'Slash':
            'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/4/4b/Icon_Slash.png/revision/latest/scale-to-width-down/32?cb=20250606154247',
          'Strike':
            'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/3/36/Icon_Strike.png/revision/latest/scale-to-width-down/32?cb=20250606154405',
        },
        'sources': [
          {
            'title': 'Attribute',
            'revid': 4651,
          },
          {
            'title': 'Specialties',
            'revid': 4653,
          },
          {
            'title': 'Onironi',
            'revid': 5188,
          },
          {
            'title': 'Template:Icon',
            'revid': 159,
          },
          {
            'title': 'Template:Faction',
            'revid': 593,
          },
          {
            'title': 'Template:Image Template Base',
            'revid': 194,
          },
          {
            'title': 'Template:Agent Navbox',
            'revid': 4168,
          },
        ],
        'categorySources': ['Category:Attributes', 'Category:Factions'],
        'wiki': 'https://zenless-zone-zero-fanon.fandom.com',
      };

      /* Wiki icons and core-upgrade material catalog (combat-catalog.js) */
      window.AgentCombatCatalog = {
        'checkedOn': '2026-11-05',
        'wiki': 'https://zenless-zone-zero-fanon.fandom.com',
        'sources': [
          {
            'title': 'Module:Card/Items',
            'revid': 4267,
          },
          {
            'title': 'Module:Color',
            'revid': 3548,
          },
          {
            'title': 'Template:Core Skill Enhancement',
            'revid': 5178,
          },
          {
            'title': 'Onironi',
            'revid': 5188,
          },
        ],
        'icons': [
          {
            'name': 'Basic Attack',
            'label': 'Basic Attack',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/bb/Icon_Basic_Attack.png/revision/latest/scale-to-width-down/32?cb=20250606153344',
          },
          {
            'name': 'Dodge',
            'label': 'Dodge',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/bb/Icon_Dodge.png/revision/latest/scale-to-width-down/32?cb=20250606153545',
          },
          {
            'name': 'Assist',
            'label': 'Assist',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/5/56/Icon_Assist_Attack.png/revision/latest/scale-to-width-down/32?cb=20250606153705',
          },
          {
            'name': 'Special Attack',
            'label': 'Special Attack',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/d/dd/Icon_Special_Attack.png/revision/latest/scale-to-width-down/32?cb=20250606153836',
          },
          {
            'name': 'EX Special Attack',
            'label': 'EX Special Attack',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/d/df/Icon_EX_Special_Attack.png/revision/latest/scale-to-width-down/32?cb=20250610073911',
          },
          {
            'name': 'EX Special Attack Rupture',
            'label': 'EX Special Attack Rupture',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/1/1a/Icon_EX_Special_Attack_Rupture.png/revision/latest/scale-to-width-down/32?cb=20260205112105',
          },
          {
            'name': 'Chain Attack',
            'label': 'Chain Attack',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/2/20/Icon_Chain_Attack.png/revision/latest/scale-to-width-down/32?cb=20260312100926',
          },
          {
            'name': 'Ultimate Colored',
            'label': 'Ultimate',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/cd/Icon_Ultimate_Colored.png/revision/latest/scale-to-width-down/32?cb=20250611010922',
          },
          {
            'name': 'Core Skill',
            'label': 'Core Skill',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/bc/Icon_Core_Skill.png/revision/latest/scale-to-width-down/32?cb=20250806200709',
          },
          {
            'name': 'Physical',
            'label': 'Physical',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/ce/Icon_Physical.png/revision/latest/scale-to-width-down/32?cb=20250606085512',
          },
          {
            'name': 'Fire',
            'label': 'Fire',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/0/0a/Icon_Fire.png/revision/latest/scale-to-width-down/32?cb=20250606085822',
          },
          {
            'name': 'Ice',
            'label': 'Ice',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/5/52/Icon_Ice.png/revision/latest/scale-to-width-down/32?cb=20250606085617',
          },
          {
            'name': 'Electric',
            'label': 'Electric',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/1/1c/Icon_Electric.png/revision/latest/scale-to-width-down/32?cb=20250606085924',
          },
          {
            'name': 'Ether',
            'label': 'Ether',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/d/d2/Icon_Ether.png/revision/latest/scale-to-width-down/32?cb=20250606090041',
          },
          {
            'name': 'Wind',
            'label': 'Wind',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/9/9c/Icon_Wind.webp/revision/latest/scale-to-width-down/32?cb=20260701215018',
          },
          {
            'name': 'Lumiflux',
            'label': 'Lumiflux',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/9/9d/Icon_Lumiflux.png/revision/latest/scale-to-width-down/32?cb=20260802233339',
          },
          {
            'name': 'Warp',
            'label': 'Warp',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/9/94/Onironi_Attribute_Warp_Icon.png/revision/latest/scale-to-width-down/32?cb=20260905052821',
          },
        ],
        'colors': [
          {
            'key': 'physical',
            'label': 'Physical',
            'className': 'text-physical',
          },
          {
            'key': 'fire',
            'label': 'Fire',
            'className': 'text-fire',
          },
          {
            'key': 'ice',
            'label': 'Ice',
            'className': 'text-ice',
          },
          {
            'key': 'electric',
            'label': 'Electric',
            'className': 'text-electric',
          },
          {
            'key': 'ether',
            'label': 'Ether',
            'className': 'text-ether',
          },
          {
            'key': 'wind',
            'label': 'Wind',
            'className': 'text-wind',
          },
          {
            'key': 'highlight',
            'label': 'Highlight',
            'className': 'text-highlight',
          },
          {
            'key': 'green',
            'label': 'Green',
            'className': 'text-green',
          },
          {
            'key': 'red',
            'label': 'Red',
            'className': 'text-red',
          },
          {
            'key': 'whisper',
            'label': 'Whisper',
            'className': 'text-whisper',
          },
        ],
        'materials': [
          {
            'name': 'Higher Dimensional Data: Crimson Awe',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Crimson Awe.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/c6/Item_Higher_Dimensional_Data_Crimson_Awe.gif/revision/latest/scale-to-width-down/64?cb=20250727131727',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Destructive Advance',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Destructive Advance.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/3/34/Item_Higher_Dimensional_Data_Destructive_Advance.gif/revision/latest/scale-to-width-down/64?cb=20250725161318',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Ethereal Pursuit',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Ethereal Pursuit.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/e/e1/Item_Higher_Dimensional_Data_Ethereal_Pursuit.gif/revision/latest/scale-to-width-down/64?cb=20250722181238',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Murderous Obituary',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Murderous Obituary.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/4/4d/Item_Higher_Dimensional_Data_Murderous_Obituary.gif/revision/latest/scale-to-width-down/64?cb=20250607041423',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Steel Malice',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Steel Malice.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/3/3e/Item_Higher_Dimensional_Data_Steel_Malice.gif/revision/latest/scale-to-width-down/64?cb=20250725020729',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Falling Fist',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Falling Fist.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/8/81/Item_Higher_Dimensional_Data_Falling_Fist.gif/revision/latest/scale-to-width-down/64?cb=20250726190232',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Stealth Phantom',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Stealth Phantom.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/3/37/Item_Higher_Dimensional_Data_Stealth_Phantom.gif/revision/latest/scale-to-width-down/64?cb=20250726190306',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Thunderous Dragon',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Thunderous Dragon.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/f/fe/Item_Higher_Dimensional_Data_Thunderous_Dragon.gif/revision/latest/scale-to-width-down/64?cb=20250610055052',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Mortal Cleave',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Mortal Cleave.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/a/ab/Item_Higher_Dimensional_Data_Mortal_Cleave.gif/revision/latest/scale-to-width-down/64?cb=20250607153149',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Miasmic Elytron',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Miasmic Elytron.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/6/63/Item_Higher_Dimensional_Data_Miasmic_Elytron.gif/revision/latest/scale-to-width-down/64?cb=20250717142515',
            'animated': true,
          },
          {
            'name': 'Higher Dimensional Data: Toxic Edge',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Toxic Edge.png',
            'ext': 'png',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/3/36/Item_Higher_Dimensional_Data_Toxic_Edge.png/revision/latest/scale-to-width-down/64?cb=20250727132009',
            'animated': false,
          },
          {
            'name': 'Higher Dimensional Data: Corrupted Dreamsteel',
            'rank': 'A',
            'file': 'Item Higher Dimensional Data Corrupted Dreamsteel.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/d/d8/Item_Higher_Dimensional_Data_Corrupted_Dreamsteel.gif/revision/latest/scale-to-width-down/64?cb=20261105023615',
            'animated': true,
          },
          {
            'name': 'Ferocious Grip',
            'rank': 'S',
            'file': 'Item Ferocious Grip.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/f/f8/Item_Ferocious_Grip.gif/revision/latest/scale-to-width-down/64?cb=20250608115333',
            'animated': true,
          },
          {
            'name': 'Finale Dance Shoes',
            'rank': 'S',
            'file': 'Item Finale Dance Shoes.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/7/75/Item_Finale_Dance_Shoes.gif/revision/latest/scale-to-width-down/64?cb=20250607153902',
            'animated': true,
          },
          {
            'name': 'Living Drive',
            'rank': 'S',
            'file': 'Item Living Drive.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/4/46/Item_Living_Drive.gif/revision/latest/scale-to-width-down/64?cb=20250606163318',
            'animated': true,
          },
          {
            'name': 'Scarlet Engine',
            'rank': 'S',
            'file': 'Item Scarlet Engine.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/6/67/Item_Scarlet_Engine.gif/revision/latest/scale-to-width-down/64?cb=20250726190214',
            'animated': true,
          },
          {
            'name': "Sycophant's Refinement",
            'rank': 'S',
            'file': "Item Sycophant's Refinement.gif",
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/2/29/Item_Sycophant%27s_Refinement.gif/revision/latest/scale-to-width-down/64?cb=20250722181313',
            'animated': true,
          },
          {
            'name': 'Exuvia of Refinement',
            'rank': 'S',
            'file': 'Item Exuvia of Refinement.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/8/85/Item_Exuvia_of_Refinement.gif/revision/latest/scale-to-width-down/64?cb=20250717142636',
            'animated': true,
          },
          {
            'name': 'Hollowbound Spine',
            'rank': 'S',
            'file': 'Item Hollowbound Spine.gif',
            'ext': 'gif',
            'url':
              'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/b8/Item_Hollowbound_Spine.gif/revision/latest/scale-to-width-down/64?cb=20261105034506',
            'animated': true,
          },
        ],
      };

      /* Promotion seals, chip families and language catalog (schema-catalog.js) */
      window.AgentSchemaCatalog = {
        'checkedOn': '2026-11-05',
        'seals': {
          'Attack': {
            'names': [
              'Basic Attack Certification Seal',
              'Advanced Attack Certification Seal',
              "Pioneer's Certification Seal",
            ],
            'items': [
              {
                'name': 'Basic Attack Certification Seal',
                'file': 'Item Basic Attack Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/2/2e/Item_Basic_Attack_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250606122718',
              },
              {
                'name': 'Advanced Attack Certification Seal',
                'file': 'Item Advanced Attack Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/4/4c/Item_Advanced_Attack_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250606122014',
              },
              {
                'name': "Pioneer's Certification Seal",
                'file': "Item Pioneer's Certification Seal.png",
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/e/e6/Item_Pioneer%27s_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250606150734',
              },
            ],
            'available': true,
          },
          'Stun': {
            'names': [
              'Basic Stun Certification Seal',
              'Advanced Stun Certification Seal',
              'Buster Certification Seal',
            ],
            'items': [
              {
                'name': 'Basic Stun Certification Seal',
                'file': 'Item Basic Stun Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/5/53/Item_Basic_Stun_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250608205013',
              },
              {
                'name': 'Advanced Stun Certification Seal',
                'file': 'Item Advanced Stun Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/e/e1/Item_Advanced_Stun_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250608205214',
              },
              {
                'name': 'Buster Certification Seal',
                'file': 'Item Buster Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/6/67/Item_Buster_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250608205458',
              },
            ],
            'available': true,
          },
          'Anomaly': {
            'names': [
              'Basic Anomaly Certification Seal',
              'Advanced Anomaly Certification Seal',
              'Controller Certification Seal',
            ],
            'items': [
              {
                'name': 'Basic Anomaly Certification Seal',
                'file': 'Item Basic Anomaly Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/0/00/Item_Basic_Anomaly_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250610172545',
              },
              {
                'name': 'Advanced Anomaly Certification Seal',
                'file': 'Item Advanced Anomaly Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/d/dd/Item_Advanced_Anomaly_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250610172624',
              },
              {
                'name': 'Controller Certification Seal',
                'file': 'Item Controller Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/bf/Item_Controller_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250610172635',
              },
            ],
            'available': true,
          },
          'Support': {
            'names': [
              'Basic Support Certification Seal',
              'Advanced Support Certification Seal',
              'Ruler Certification Seal',
            ],
            'items': [
              {
                'name': 'Basic Support Certification Seal',
                'file': 'Item Basic Support Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/ca/Item_Basic_Support_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250722191433',
              },
              {
                'name': 'Advanced Support Certification Seal',
                'file': 'Item Advanced Support Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/0/0c/Item_Advanced_Support_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250722191454',
              },
              {
                'name': 'Ruler Certification Seal',
                'file': 'Item Ruler Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/b1/Item_Ruler_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250722191517',
              },
            ],
            'available': true,
          },
          'Defense': {
            'names': [
              'Basic Defense Certification Seal',
              'Advanced Defense Certification Seal',
              'Defender Certification Seal',
            ],
            'items': [
              {
                'name': 'Basic Defense Certification Seal',
                'file': 'Item Basic Defense Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/cb/Item_Basic_Defense_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250724234855',
              },
              {
                'name': 'Advanced Defense Certification Seal',
                'file': 'Item Advanced Defense Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/9/96/Item_Advanced_Defense_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250724234910',
              },
              {
                'name': 'Defender Certification Seal',
                'file': 'Item Defender Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/cf/Item_Defender_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20250724234925',
              },
            ],
            'available': true,
          },
          'Rupture': {
            'names': [
              'Basic Rupture Certification Seal',
              'Advanced Rupture Certification Seal',
              'Arbiter Certification Seal',
            ],
            'items': [
              {
                'name': 'Basic Rupture Certification Seal',
                'file': 'Item Basic Rupture Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/f/f6/Item_Basic_Rupture_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20251202020059',
              },
              {
                'name': 'Advanced Rupture Certification Seal',
                'file': 'Item Advanced Rupture Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/1/1c/Item_Advanced_Rupture_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20251202020201',
              },
              {
                'name': 'Arbiter Certification Seal',
                'file': 'Item Arbiter Certification Seal.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/4/45/Item_Arbiter_Certification_Seal.png/revision/latest/scale-to-width-down/48?cb=20251202224039',
              },
            ],
            'available': true,
          },
          'Armorer': {
            'names': [
              'Basic Armorer Certification Seal',
              'Advanced Armorer Certification Seal',
              'Bladebearer Certification Seal',
            ],
            'items': [null, null, null],
            'available': false,
          },
        },
        'chips': [
          {
            'attribute': 'Physical',
            'family': 'Physical',
            'items': [
              {
                'name': 'Basic Physical Chip',
                'file': 'Item Basic Physical Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/c6/Item_Basic_Physical_Chip.png/revision/latest/scale-to-width-down/48?cb=20250607154152',
              },
              {
                'name': 'Advanced Physical Chip',
                'file': 'Item Advanced Physical Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/1/16/Item_Advanced_Physical_Chip.png/revision/latest/scale-to-width-down/48?cb=20250607164943',
              },
              {
                'name': 'Specialized Physical Chip',
                'file': 'Item Specialized Physical Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/bd/Item_Specialized_Physical_Chip.png/revision/latest/scale-to-width-down/48?cb=20250607165148',
              },
            ],
            'available': true,
          },
          {
            'attribute': 'Fire',
            'family': 'Burn',
            'items': [
              {
                'name': 'Basic Burn Chip',
                'file': 'Item Basic Burn Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/8/84/Item_Basic_Burn_Chip.png/revision/latest/scale-to-width-down/48?cb=20250725020115',
              },
              {
                'name': 'Advanced Burn Chip',
                'file': 'Item Advanced Burn Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/a/a7/Item_Advanced_Burn_Chip.png/revision/latest/scale-to-width-down/48?cb=20250725020127',
              },
              {
                'name': 'Specialized Burn Chip',
                'file': 'Item Specialized Burn Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/1/1f/Item_Specialized_Burn_Chip.png/revision/latest/scale-to-width-down/48?cb=20250725020054',
              },
            ],
            'available': true,
          },
          {
            'attribute': 'Ice',
            'family': 'Freeze',
            'items': [
              {
                'name': 'Basic Freeze Chip',
                'file': 'Item Basic Freeze Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/2/2b/Item_Basic_Freeze_Chip.png/revision/latest/scale-to-width-down/48?cb=20251114224402',
              },
              {
                'name': 'Advanced Freeze Chip',
                'file': 'Item Advanced Freeze Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/6/6b/Item_Advanced_Freeze_Chip.png/revision/latest/scale-to-width-down/48?cb=20251114224440',
              },
              {
                'name': 'Specialized Freeze Chip',
                'file': 'Item Specialized Freeze Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/3/3e/Item_Specialized_Freeze_Chip.png/revision/latest/scale-to-width-down/48?cb=20250723124850',
              },
            ],
            'available': true,
          },
          {
            'attribute': 'Electric',
            'family': 'Shock',
            'items': [
              {
                'name': 'Basic Shock Chip',
                'file': 'Item Basic Shock Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/6/6c/Item_Basic_Shock_Chip.png/revision/latest/scale-to-width-down/48?cb=20250607155009',
              },
              {
                'name': 'Advanced Shock Chip',
                'file': 'Item Advanced Shock Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/4/4d/Item_Advanced_Shock_Chip.png/revision/latest/scale-to-width-down/48?cb=20250607164259',
              },
              {
                'name': 'Specialized Shock Chip',
                'file': 'Item Specialized Shock Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/9/92/Item_Specialized_Shock_Chip.png/revision/latest/scale-to-width-down/48?cb=20250607164505',
              },
            ],
            'available': true,
          },
          {
            'attribute': 'Ether',
            'family': 'Ether',
            'items': [
              {
                'name': 'Basic Ether Chip',
                'file': 'Item Basic Ether Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/b/b6/Item_Basic_Ether_Chip.png/revision/latest/scale-to-width-down/48?cb=20250608115246',
              },
              {
                'name': 'Advanced Ether Chip',
                'file': 'Item Advanced Ether Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/4/47/Item_Advanced_Ether_Chip.png/revision/latest/scale-to-width-down/48?cb=20250608115304',
              },
              {
                'name': 'Specialized Ether Chip',
                'file': 'Item Specialized Ether Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/cc/Item_Specialized_Ether_Chip.png/revision/latest/scale-to-width-down/48?cb=20250608115317',
              },
            ],
            'available': true,
          },
          {
            'attribute': 'Wind',
            'family': 'Windbite',
            'items': [
              {
                'name': 'Basic Windbite Chip',
                'file': 'Item Basic Windbite Chip.png',
                'url':
                  'https://static.wikia.nocookie.net/zenless-zone-zero-fanon/images/c/c0/Item_Basic_Windbite_Chip.png/revision/latest/scale-to-width-down/48?cb=20260701223226',
              },
              null,
              null,
            ],
            'available': false,
          },
          {
            'attribute': 'Lumiflux',
            'family': 'Lumiflux',
            'items': [null, null, null],
            'available': false,
          },
        ],
        'languages': [
          {
            'code': 'en',
            'label': 'English',
            'romanization': false,
          },
          {
            'code': 'zhs',
            'label': 'Chinese (Simplified)',
            'romanization': true,
          },
          {
            'code': 'zht',
            'label': 'Chinese (Traditional)',
            'romanization': true,
          },
          {
            'code': 'ja',
            'label': 'Japanese',
            'romanization': true,
          },
          {
            'code': 'ko',
            'label': 'Korean',
            'romanization': true,
          },
          {
            'code': 'es',
            'label': 'Spanish',
            'romanization': false,
          },
          {
            'code': 'fr',
            'label': 'French',
            'romanization': false,
          },
          {
            'code': 'ru',
            'label': 'Russian',
            'romanization': false,
          },
          {
            'code': 'th',
            'label': 'Thai',
            'romanization': true,
          },
          {
            'code': 'vi',
            'label': 'Vietnamese',
            'romanization': false,
          },
          {
            'code': 'de',
            'label': 'German',
            'romanization': false,
          },
          {
            'code': 'id',
            'label': 'Indonesian',
            'romanization': false,
          },
          {
            'code': 'pt',
            'label': 'Portuguese',
            'romanization': false,
          },
          {
            'code': 'tr',
            'label': 'Turkish',
            'romanization': false,
          },
          {
            'code': 'it',
            'label': 'Italian',
            'romanization': false,
          },
        ],
        'secondaryTypes': [
          'Dodge Counter',
          'Quick Assist',
          'Defensive Assist',
          'Assist Follow-Up',
          'EX Special Attack',
          'Ultimate',
          'Core Passive',
          'Additional Ability',
        ],
        'references': [
          {
            'title': 'Template:Custom Tabs',
            'revid': 219,
          },
          {
            'title': 'Template:Agent Promotions and Stats',
            'revid': 276,
          },
          {
            'title': 'Module:Skill Table',
            'revid': 320,
          },
          {
            'title': 'Template:Skill Enhancement',
            'revid': 5179,
          },
          {
            'title': 'Template:Other Languages',
            'revid': 350,
          },
          {
            'title': 'Module:Agent Promotions and Stats',
            'revid': 277,
          },
          {
            'title': 'Module:Card/Items',
            'revid': 4267,
          },
          {
            'title': 'Module:Other Languages',
            'revid': 2682,
          },
          {
            'title': 'Module:Card/Agents',
            'revid': 5134,
          },
          {
            'title': 'Module:Agent Promotions and Stats/data',
            'revid': 5150,
          },
        ],
      };

      /* Safe rich-text parsing and wikitext serialization (rich-wiki.js) */
      (function (root, factory) {
        const catalog =
          typeof module === 'object' && module.exports
            ? require('./combat-catalog.json')
            : root.AgentCombatCatalog;
        const api = factory(catalog);
        if (typeof module === 'object' && module.exports) module.exports = api;
        else root.AgentRichWiki = api;
      })(typeof globalThis !== 'undefined' ? globalThis : this, function (catalog) {
        'use strict';
        const escape = (value) =>
          String(value || '').replace(
            /[{}|<>]/g,
            (c) => ({ '{': '&#123;', '}': '&#125;', '|': '&#124;', '<': '&lt;', '>': '&gt;' })[c]
          );
        const icon = (name) =>
          catalog.icons.find((i) => i.name.toLowerCase() === String(name).trim().toLowerCase());
        const color = (key) =>
          /^#[0-9a-f]{6}$/i.test(key)
            ? key.toLowerCase()
            : catalog.colors.find((c) => c.key === String(key).toLowerCase())?.key;
        function templateEnd(text, start) {
          let depth = 0;
          for (let i = start; i < text.length - 1; i++) {
            if (text.slice(i, i + 2) === '{{') {
              depth++;
              i++;
            } else if (text.slice(i, i + 2) === '}}') {
              if (--depth === 0) return i + 2;
              i++;
            }
          }
          return -1;
        }
        function args(text) {
          const parts = [];
          let depth = 0,
            start = 0;
          for (let i = 0; i < text.length; i++) {
            if (text.slice(i, i + 2) === '{{') {
              depth++;
              i++;
            } else if (text.slice(i, i + 2) === '}}') {
              depth--;
              i++;
            } else if (text[i] === '|' && depth === 0) {
              parts.push(text.slice(start, i));
              start = i + 1;
            }
          }
          parts.push(text.slice(start));
          return parts;
        }
        function parse(value, level = 0) {
          const text = String(value || '').replace(/(<br\s*\/?\s*>)[ \t]*\r?\n/gi, '$1');
          if (level > 20) return [{ type: 'text', text }];
          const out = [];
          let plain = '';
          const decode = (value) =>
            value.replace(/&#(123|125|124|60|62);|&(lt|gt|amp|quot|nbsp);/g, (match, code, name) =>
              code
                ? String.fromCharCode(Number(code))
                : { lt: '<', gt: '>', amp: '&', quot: '"', nbsp: '\u00a0' }[name]
            );
          const flush = () => {
            if (plain) out.push({ type: 'text', text: decode(plain) });
            plain = '';
          };
          for (let i = 0; i < text.length; ) {
            const tail = text.slice(i);
            const br = tail.match(/^(?:<br\s*\/?\s*>|\r?\n)/i);
            if (br) {
              flush();
              out.push({ type: 'break' });
              i += br[0].length;
              continue;
            }
            const boldTag = tail.match(/^<(b|strong)>/i);
            const quoteBold = tail.startsWith("'''");
            if (boldTag || quoteBold) {
              const open = boldTag?.[0] || "'''",
                close = boldTag ? '</' + boldTag[1] + '>' : "'''";
              const end = text.toLowerCase().indexOf(close.toLowerCase(), i + open.length);
              if (end >= 0) {
                flush();
                out.push({
                  type: 'bold',
                  children: parse(text.slice(i + open.length, end), level + 1),
                });
                i = end + close.length;
                continue;
              }
            }
            if (tail.startsWith('{{')) {
              const end = templateEnd(text, i);
              if (end >= 0) {
                const parts = args(text.slice(i + 2, end - 2)),
                  name = parts[0].trim().toLowerCase();
                const data =
                  name === 'icon' ? icon(parts[1]) : name === 'ba' ? icon('Basic Attack') : null;
                if (data) {
                  flush();
                  out.push({ type: 'icon', name: data.name });
                  i = end;
                  continue;
                }
                if (name === 'color') {
                  const named = parts.slice(1).filter((x) => !/^\w+=/.test(x.trim()));
                  const content = named.length > 1 ? named[1] : named[0] || '';
                  const key =
                    named.length > 1
                      ? color(named[0].trim())
                      : catalog.colors.find((c) => content.toLowerCase().includes(c.key))?.key;
                  if (key) {
                    flush();
                    out.push({
                      type: 'color',
                      key,
                      bold: !parts.some((x) => /^nobold\s*=\s*1$/i.test(x.trim())),
                      children: parse(content, level + 1),
                    });
                    i = end;
                    continue;
                  }
                }
                // Keep unrecognized syntax visible as ordinary text, never execute it.
                plain += text.slice(i, end);
                i = end;
                continue;
              }
            }
            if (tail.startsWith('[[')) {
              const end = text.indexOf(']]', i + 2);
              if (end >= 0) {
                const inner = text.slice(i + 2, end),
                  split = inner.indexOf('|'),
                  target = (split < 0 ? inner : inner.slice(0, split)).trim();
                if (target && !/[\[\]{}<>|\x00-\x1f]/.test(target) && !/^File:/i.test(target)) {
                  flush();
                  out.push({
                    type: 'link',
                    target,
                    children: parse(split < 0 ? inner : inner.slice(split + 1), level + 1),
                  });
                  i = end + 2;
                  continue;
                }
              }
            }
            plain += text[i++];
          }
          flush();
          return out;
        }
        function emit(nodes) {
          return nodes
            .map((n) => {
              if (n.type === 'text') return escape(n.text);
              if (n.type === 'break') return '<br />';
              if (n.type === 'bold') return '<b>' + emit(n.children) + '</b>';
              if (n.type === 'icon') return '{{Icon|' + icon(n.name).name + '|size=18}}';
              if (n.type === 'color')
                return (
                  '{{Color|' + n.key + '|' + emit(n.children) + (n.bold ? '' : '|nobold=1') + '}}'
                );
              if (n.type === 'link') return '[[' + n.target + '|' + emit(n.children) + ']]';
              return '';
            })
            .join('');
        }
        function hasContent(value) {
          const check = (nodes) =>
            nodes.some(
              (n) =>
                n.type === 'icon' ||
                (n.type === 'text' && n.text.trim()) ||
                (n.children && check(n.children))
            );
          return !!check(parse(value));
        }
        return {
          catalog,
          parse,
          emit,
          compile: (value) => emit(parse(value)),
          hasContent,
          icon,
          color,
          escape,
        };
      });

      /* Core Skill Enhancement model (combat-model.js) */
      (function (root, factory) {
        const data =
          typeof module === 'object' && module.exports
            ? require('./combat-catalog.json')
            : root.AgentCombatCatalog;
        const api = factory(data);
        if (typeof module === 'object' && module.exports) module.exports = api;
        else root.AgentCombat = api;
      })(typeof globalThis !== 'undefined' ? globalThis : this, function (catalog) {
        'use strict';
        const defaults = () => ({
          enabled: true,
          passive: '',
          materialA: '',
          materialS: '',
          stat1: '',
          amount1: '',
          stat2: '',
          amount2: '',
        });
        const hasCore = (state) =>
          !!state.combatEnabled && state.skills.some((s) => s.type === 'Core Skill');
        const passive = (state) =>
          String(state.coreEnhancement?.passive || '').trim() ||
          String(state.skills.find((s) => s.type === 'Core Skill')?.name || '').trim();
        const material = (name, rank) =>
          catalog.materials.find((m) => m.name === name && m.rank === rank);
        const amount = (value) =>
          /^\d+(?:\.\d+)?%?$/.test(String(value || '').trim()) &&
          Number(String(value).replace('%', '')) > 0;
        const total = (value) =>
          amount(value)
            ? String(Number((Number(String(value).replace('%', '')) * 3).toFixed(6))) +
              (String(value).trim().endsWith('%') ? '%' : '')
            : '';
        const param = (value) =>
          String(value || '')
            .trim()
            .replace(
              /[{}|<>\r\n]/g,
              (c) =>
                ({
                  '{': '&#123;',
                  '}': '&#125;',
                  '|': '&#124;',
                  '<': '&lt;',
                  '>': '&gt;',
                  '\r': ' ',
                  '\n': ' ',
                })[c]
            );
        function errors(state) {
          const c = state.coreEnhancement || defaults(),
            out = [];
          if (!hasCore(state) || !c.enabled) return out;
          const add = (field, message) => out.push({ step: 3, field: 'core-' + field, message });
          for (const rank of ['A', 'S'])
            if (!material(c['material' + rank], rank))
              add('material' + rank, 'Choose an existing ' + rank + '-Rank Core Skill material.');
          for (const n of [1, 2]) {
            if (!String(c['stat' + n] || '').trim())
              add('stat' + n, 'Choose or name bonus ' + n + '.');
            if (!amount(c['amount' + n]))
              add('amount' + n, 'Enter a positive bonus per upgrade, for example 4.8% or 140.');
          }
          return out;
        }
        function card(name, count, mini = true, rank) {
          const m = material(name, rank);
          return m
            ? '{{Card|' +
                (mini ? 'mini=1|' : '') +
                param(name) +
                '|' +
                count +
                '|rank=' +
                m.rank +
                '|image_ext=' +
                m.ext +
                '}}'
            : '';
        }
        function wiki(state) {
          const c = state.coreEnhancement || defaults();
          if (!hasCore(state) || !c.enabled) return '';
          const out = [
            '{| class="wikitable mw-collapsible" style="text-align:center; margin-bottom:0"',
            '! colspan="4" |Core Skill Enhancement',
          ];
          for (let i = 0; i < 6; i++) {
            const n = (i % 2) + 1,
              denny = ['5,000', '12,000', '28,000', '60,000', '100,000', '200,000'][i],
              a = [0, 2, 4, 9, 15, 30][i],
              s = [0, 0, 0, 2, 3, 4][i];
            out.push(
              '|-',
              '! style="padding:6px 20px" |{{Icon|Core Skill ' +
                String.fromCharCode(65 + i) +
                '|64}}',
              "| Requires:<br />Agent Level '''" + [15, 25, 35, 45, 55, 60][i] + "'''",
              '| style="text-align:left; padding:10px" |\n* ' +
                param(c['stat' + n]) +
                ' increases by ' +
                param(c['amount' + n]) +
                '<br />\n* Core Passive: ' +
                param(passive(state)) +
                ' Skill Lv. +1',
              '| ' +
                (s ? card(c.materialS, s, true, 'S') : '') +
                (a ? card(c.materialA, a, true, 'A') : '') +
                '{{Card|mini=1|Denny|' +
                denny +
                '}}'
            );
          }
          out.push(
            '|-',
            '! colspan="4" |Totals',
            '|-',
            '! MAX',
            "| Requires:<br />Agent Level '''60'''",
            '| style="text-align:left; padding:10px" |\n* ' +
              param(c.stat1) +
              ' increases by ' +
              total(c.amount1) +
              '<br />\n* ' +
              param(c.stat2) +
              ' increases by ' +
              total(c.amount2),
            '| ' +
              card(c.materialS, 9, false, 'S') +
              card(c.materialA, 60, false, 'A') +
              '{{Card|Denny|405,000}}',
            '|}'
          );
          return out.join('\n');
        }
        return { catalog, defaults, hasCore, passive, material, amount, total, errors, wiki };
      });

      /* Promotion, skill-table, enhancement and language models (schema-model.js) */
      (function (root, factory) {
        const node = typeof module === 'object' && module.exports;
        const api = factory(
          node ? require('./schema-catalog.json') : root.AgentSchemaCatalog,
          node ? require('./rich-wiki.js') : root.AgentRichWiki
        );
        if (node) module.exports = api;
        else root.AgentSchema = api;
      })(typeof globalThis !== 'undefined' ? globalThis : this, function (catalog, R) {
        'use strict';
        const levels = [
          '1/10',
          '10/10',
          '10/20',
          '20/20',
          '20/30',
          '30/30',
          '30/40',
          '40/40',
          '40/50',
          '50/50',
          '50/60',
          '60/60',
        ];
        const tabs = '{{Custom Tabs|tab1=Overview|tab2=Lore|tab3=DMs|tab4=Fashion|tab5=Media}}';
        const promotionDefaults = () => ({
          enabled: false,
          manualMaterials: false,
          materials: ['', '', ''],
          rows: Array.from({ length: 11 }, () => ({ hp: '', atk: '', def: '' })),
        });
        const enhancementDefaults = () => ({ enabled: true, manual: false, chipType: '' });
        const esc = (value) =>
          String(value || '')
            .trim()
            .replace(/[{}|<>\[\]\r\n]/g, (c) => '&#' + c.charCodeAt(0) + ';');
        const fmt = (value) =>
          /^\d+$/.test(String(value || '')) ? Number(value).toLocaleString('en-US') : '';
        const allSeals = () => [
          ...new Set(
            Object.values(catalog.seals)
              .filter((s) => s.available)
              .flatMap((s) => s.names)
          ),
        ];
        function normalize(state) {
          const p = state.promotions || {};
          state.promotions = { ...promotionDefaults(), ...p };
          if (!Array.isArray(p.rows) || p.rows.length !== 11)
            state.promotions.rows = promotionDefaults().rows;
          if (!Array.isArray(p.materials) || p.materials.length !== 3)
            state.promotions.materials = ['', '', ''];
          state.skillEnhancement = { ...enhancementDefaults(), ...state.skillEnhancement };
          state.skills.forEach((s) => {
            if (s.secondary === undefined) s.secondary = '';
          });
          return state;
        }
        function autoSeals(state) {
          const set = catalog.seals[String(state.values.specialty || '').trim()];
          return set?.available ? set : null;
        }
        const seals = (state) =>
          state.promotions?.manualMaterials || !autoSeals(state)
            ? state.promotions?.materials || ['', '', '']
            : autoSeals(state).names;
        function autoChip(state) {
          const attr = state.values.attributeCustom
            ? state.values.customAttributeName
            : state.values.attribute;
          return catalog.chips.find((c) => c.available && c.attribute === attr)?.family || '';
        }
        const chip = (state) =>
          state.skillEnhancement?.manual || !autoChip(state)
            ? state.skillEnhancement?.chipType || ''
            : autoChip(state);
        function errors(state) {
          const out = [];
          if (!state.combatEnabled) return out;
          const add = (field, message) => out.push({ step: 3, field, message });
          if (state.promotions?.enabled) {
            state.promotions.rows.forEach((row, index) => {
              for (const stat of ['hp', 'atk', 'def'])
                if (
                  !/^\d+$/.test(String(row[stat] || '')) ||
                  Number(row[stat]) < 1 ||
                  Number(row[stat]) > 10000000
                )
                  add(
                    'promotion-' + (index + 1) + '-' + stat,
                    'Enter ' + stat.toUpperCase() + ' at level ' + levels[index + 1] + '.'
                  );
            });
            seals(state).forEach((name, index) => {
              if (!allSeals().includes(name))
                add(
                  'promotion-material' + index,
                  'Choose a wiki certification seal for tier ' + (index + 1) + '.'
                );
            });
          }
          if (
            state.skills.length &&
            state.skillEnhancement?.enabled &&
            !catalog.chips.some((c) => c.available && c.family === chip(state))
          )
            add('skill-chip', 'Choose an available skill chip family for this attribute.');
          return out;
        }
        const card = (name, count, mini = false) =>
          '{{Card|' + (mini ? 'mini=1|' : '') + esc(name) + '|' + count + '}}';
        function promotionWiki(state) {
          if (!state.combatEnabled || !state.promotions?.enabled) return '';
          const material = seals(state),
            rows = [state.values, ...state.promotions.rows];
          const out = [
            '<span class="mw-customtoggle-toggle-promotion wds-button">Toggle Promotion Materials</span>',
            '{| class="wikitable promotion-stats" style="text-align:center"',
            '! Promotion<br />Level',
            '! Level',
            '! Base<br />HP',
            '! Base<br />ATK',
            '! Base<br />DEF',
            '! class="hidden mw-collapsible" id="mw-customcollapsible-toggle-promotion" | Promotion<br />Costs',
          ];
          for (let i = 0; i < 12; i++) {
            const prom = Math.floor(i / 2);
            out.push('|- class="alternating' + ((prom % 2) + 1) + '"');
            if (i % 2 === 0) out.push('| rowspan="2" | ' + prom);
            out.push(
              '| ' + levels[i],
              '| ' + fmt(rows[i].hp),
              '| ' + fmt(rows[i].atk),
              '| ' + fmt(rows[i].def)
            );
            if (i % 2 === 0) {
              const cost = [24000, 56000, 120000, 200000, 400000][prom],
                count = [4, 12, 20, 10, 20][prom],
                name = material[[0, 1, 1, 2, 2][prom]];
              out.push(
                '| class="hidden mw-collapsible" id="mw-customcollapsible-toggle-promotion" rowspan="2" | ' +
                  (cost
                    ? '(' +
                      prom +
                      ' → ' +
                      (prom + 1) +
                      ')<br />' +
                      card('Denny', fmt(cost), true) +
                      card(name, count, true)
                    : '—')
              );
            }
          }
          out.push(
            '|}',
            "'''Total Promotion Cost (1 → 5)'''",
            card('Denny', '800,000') +
              card(material[0], 4) +
              card(material[1], 32) +
              card(material[2], 30)
          );
          return out.join('\n');
        }
        function link(target, label = target) {
          return target && !/[\[\]{}|<>\r\n]/.test(target)
            ? '[[' + target + '|' + esc(label) + ']]'
            : esc(label);
        }
        function skillsWiki(state, types) {
          const out = [];
          for (const type of types) {
            const entries = state.skills.filter((s) => s.type === type);
            if (!entries.length) continue;
            out.push(
              '{{Agent Skill Section Header|' + (type === 'Core Skill' ? 'Core' : type) + '}}',
              '<div class="skill-table-container">',
              '{| class="wikitable skill-table" style="text-align:center; width:100%"',
              '! width="33.33%" |Name',
              '! width="33.33%" |Primary Type',
              '! width="33.33%" |Secondary Type'
            );
            for (const skill of entries)
              out.push(
                '|-',
                '| ' + link(skill.pageTitle || skill.name, skill.name),
                '| ' + link(type),
                '| ' + (skill.secondary ? link(skill.secondary) : ''),
                '|-',
                '| colspan="3" style="text-align:left" | ' + R.compile(skill.description)
              );
            out.push('|}', '</div>');
          }
          return out.join('\n');
        }
        function enhancementWiki(state) {
          return state.combatEnabled &&
            state.skills.length &&
            state.skillEnhancement?.enabled &&
            chip(state)
            ? '{{Skill Enhancement|collapsed=1|chipType=' + esc(chip(state)) + '}}'
            : '';
        }
        function languageWiki(state) {
          const params = [];
          for (const lang of catalog.languages) {
            const key = 'language' + lang.code.toUpperCase(),
              value = state.values[key] || (lang.code === 'en' ? state.values.name : '');
            if (!String(value || '').trim()) continue;
            params.push('|' + lang.code + '=' + esc(value));
            const rm = state.values[key + '_RM'];
            if (lang.romanization && String(rm || '').trim())
              params.push('|' + lang.code + '_rm=' + esc(rm));
          }
          return params.length ? '{{Other Languages\n' + params.join('\n') + '\n}}' : '';
        }
        function pageBundle(state, main) {
          const name = String(state.values.name || 'Your agent').trim();
          return [
            { title: name, text: main },
            ...['Lore', 'DMs', 'Fashion', 'Media'].map((tab) => ({
              title: name + '/' + tab,
              text: tabs + '\n\n== ' + tab + ' ==\n',
              optional: true,
            })),
          ];
        }
        return {
          catalog,
          levels,
          tabs,
          promotionDefaults,
          enhancementDefaults,
          normalize,
          autoSeals,
          seals,
          allSeals,
          autoChip,
          chip,
          errors,
          fmt,
          promotionWiki,
          skillsWiki,
          enhancementWiki,
          languageWiki,
          pageBundle,
        };
      });

      /* Agent draft validation and complete page generation (model.js) */
      (function (root, factory) {
        const node = typeof module === 'object' && module.exports;
        const api = factory(
          node ? require('./wiki-catalog.json') : root.AgentWikiCatalog,
          node ? require('./rich-wiki.js') : root.AgentRichWiki,
          node ? require('./combat-model.js') : root.AgentCombat,
          node ? require('./schema-model.js') : root.AgentSchema
        );
        if (node) module.exports = api;
        else root.AgentDraft = api;
      })(typeof globalThis !== 'undefined' ? globalThis : this, function (catalog, R, C, F) {
        'use strict';
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        const steps = ['Basics', 'Profile & art', 'Introduction', 'Combat', 'Mindscape', 'Review'];
        const skillTypes = [
          'Basic Attack',
          'Dodge',
          'Assist',
          'Special Attack',
          'Chain Attack',
          'Core Skill',
        ];
        const imageKinds = ['portrait', 'mindscape', 'titleIcon', 'attributeIcon', 'factionIcon'];
        const iconKinds = ['titleIcon', 'attributeIcon', 'factionIcon'];
        const pngKinds = ['attributeIcon', 'factionIcon'];
        const dayCount = (month) =>
          [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][months.indexOf(month)] || 0;
        function blank() {
          return {
            version: 2,
            step: 0,
            furthest: 0,
            cinema: 0,
            values: { status: 'Upcoming' },
            images: Object.fromEntries(imageKinds.map((kind) => [kind, { mode: 'none' }])),
            combatEnabled: false,
            skills: [],
            promotions: F.promotionDefaults(),
            skillEnhancement: F.enhancementDefaults(),
            coreEnhancement: C.defaults(),
            mindscapeEnabled: false,
            mindscapes: Array.from({ length: 6 }, () => ({ title: '', story: '', effect: '' })),
            ready: false,
          };
        }
        function pageName(name) {
          const title = String(name || '')
            .trim()
            .replace(/_/g, ' ')
            .replace(/\s+/g, ' ');
          if (
            !title ||
            /[:/\[\]{}<>|#\x00-\x1f\x7f]/.test(title) ||
            /^\.+$/.test(title) ||
            new TextEncoder().encode(title).length > 255
          )
            throw Error('Use a plain agent name without a namespace, slash or wiki markup.');
          return title;
        }
        // Plain field values cannot escape their surrounding template. Balanced links
        // remain useful, while braces and loose pipes are rendered as literal text.
        function param(value) {
          return String(value || '')
            .trim()
            .replace(/[{}]/g, (c) => (c === '{' ? '&#123;' : '&#125;'))
            .replace(/\|/g, '{{!}}');
        }
        function birthday(v) {
          if (!v.birthMonth && !v.birthDay) return '';
          if (
            !months.includes(v.birthMonth) ||
            !/^\d{1,2}$/.test(String(v.birthDay)) ||
            Number(v.birthDay) < 1 ||
            Number(v.birthDay) > dayCount(v.birthMonth)
          )
            throw Error('Choose a month and a valid day.');
          return v.birthMonth + ' ' + Number(v.birthDay);
        }
        function tokens(value) {
          return [
            ...new Set(
              String(value || '')
                .split(';')
                .map((s) => s.trim())
                .filter(Boolean)
            ),
          ];
        }
        const attribute = (state) =>
          String(
            state.values.attributeCustom
              ? state.values.customAttributeName || ''
              : tokens(state.values.attribute)[0] || ''
          ).trim();
        const gender = (state) =>
          String(
            state.values.gender === 'Other'
              ? state.values.genderOther || 'Other'
              : state.values.gender || ''
          ).trim();
        const faction = (state) =>
          String(
            state.values.factionCustom
              ? state.values.customFactionName || ''
              : state.values.faction || ''
          ).trim();
        const cleanFilePart = (value) =>
          String(value || '')
            .trim()
            .replace(/[<>:"/\\|?*#{}\[\]]/g, '')
            .replace(/\s+/g, ' ');
        const validFilename = (value) =>
          !!String(value || '').trim() && !/[:/\\\[\]{}<>|#\x00-\x1f\x7f]/.test(String(value));
        function filename(state, kind) {
          const image = state.images[kind] || {};
          if (image.mode === 'wiki')
            return String(image.wikiName || '')
              .replace(/^File:/i, '')
              .trim();
          if (image.mode !== 'local') return '';
          const extension =
            { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' }[
              image.type
            ] || 'png';
          const name = cleanFilePart(state.values.name || 'Your Agent');
          const base = {
            portrait: 'Agent ' + name + ' Portrait',
            mindscape: 'Mindscape ' + name + ' Partial',
            titleIcon:
              'Agent ' + name + ' ' + cleanFilePart(state.values.epithet || 'Title') + ' Icon',
            attributeIcon:
              'Icon ' + cleanFilePart(state.values.customAttributeName || 'Custom Attribute'),
            factionIcon:
              'Faction ' +
              cleanFilePart(state.values.customFactionName || 'Custom Faction') +
              ' Icon',
          }[kind];
          return base + '.' + extension;
        }
        function opening(state) {
          const v = state.values,
            name = (v.name || 'Your agent').trim(),
            status = v.status || 'Upcoming';
          const role =
            status === 'Upcoming'
              ? 'an upcoming'
              : status === 'NPC'
                ? 'a non-playable'
                : 'a ' + status.toLowerCase();
          return (
            name +
            ' is ' +
            role +
            ' agent in Zenless Zone Zero' +
            (faction(state) ? ', affiliated with ' + faction(state) : '') +
            '.'
          );
        }
        function titleBadge(state, preview = false) {
          const text = String(state.values.epithet || '').trim();
          if (!text) return '';
          let image = filename(state, 'titleIcon');
          if (preview && state.images.titleIcon?.mode === 'local') image = 'Placeholder.png';
          return (
            (validFilename(image)
              ? '[[File:' + image + '|24px|link=|alt=' + param(text) + ']] '
              : '') + param(text)
          );
        }
        function activeImageKinds(state) {
          return [
            'portrait',
            ...(state.mindscapeEnabled ? ['mindscape'] : []),
            ...(state.values.epithet?.trim() ? ['titleIcon'] : []),
            ...(state.values.attributeCustom ? ['attributeIcon'] : []),
            ...(state.values.factionCustom ? ['factionIcon'] : []),
          ];
        }
        function validation(state, step) {
          const v = state.values,
            errors = [];
          const add = (field, message) => errors.push({ field, message, step });
          if (step === 0) {
            for (const [field, label] of [
              ['name', 'Agent name'],
              ['rank', 'Rank'],
              ['specialty', 'Specialty'],
            ])
              if (!String(v[field] || '').trim()) add(field, label + ' is required.');
            if (!v.attributeCustom && !attribute(state)) add('attribute', 'Choose an attribute.');
            if (v.name?.trim())
              try {
                pageName(v.name);
              } catch (e) {
                add('name', e.message);
              }
            if (!v.attributeCustom && tokens(v.attribute).length > 1)
              add('attribute', 'An agent has one attribute. Choose a single attribute.');
            for (const [key, label, field, kind, existing] of [
              [
                'attribute',
                'attribute',
                'customAttributeName',
                'attributeIcon',
                catalog.attributes,
              ],
              ['faction', 'faction', 'customFactionName', 'factionIcon', catalog.factions],
            ])
              if (v[key + 'Custom']) {
                const name = String(v[field] || '').trim();
                if (!name) add(field, 'Enter your custom ' + label + ' name.');
                else if (/[;:/\\\[\]{}<>|#\x00-\x1f]/.test(name))
                  add(field, 'Use a plain ' + label + ' name without wiki markup or separators.');
                else if (existing.some((n) => n.toLowerCase() === name.toLowerCase()))
                  add(
                    field,
                    'This ' +
                      label +
                      ' already exists. Turn off Custom and choose it from the wiki list.'
                  );
                const image = state.images[kind] || {};
                if (image.mode !== 'local' || image.type !== 'image/png')
                  add(kind + '-file', 'Choose a PNG icon for your custom ' + label + '.');
                else if (image.persisted === false)
                  add(kind + '-file', 'Choose the ' + label + ' icon again so it can be saved.');
              }
            const titleImage = state.images.titleIcon || {};
            if (titleImage.mode !== 'none' && titleImage.mode && !String(v.epithet || '').trim())
              add('epithet', 'Enter the text that belongs with your title badge icon.');
            if (titleImage.mode === 'wiki' && !validFilename(filename(state, 'titleIcon')))
              add(
                'titleIcon-wiki',
                'Enter the title icon’s wiki filename, without a URL or wiki markup.'
              );
            if (titleImage.mode === 'local' && titleImage.persisted === false)
              add('titleIcon-file', 'Choose the title badge icon again so it can be saved.');
          }
          if (step === 1) {
            try {
              birthday(v);
            } catch (e) {
              add('birthMonth', e.message);
            }
            const picture = state.images.portrait;
            if (picture.mode === 'wiki' && !filename(state, 'portrait'))
              add(
                'portrait-wiki',
                'Enter the existing wiki filename, or choose an image from your device.'
              );
            if (picture.mode === 'local' && picture.persisted === false)
              add(
                'portrait-file',
                'Choose your portrait again so it can be saved with this draft.'
              );
          }
          if (step === 3 && state.combatEnabled) {
            const stats = ['hp', 'atk', 'def'];
            if (state.promotions?.enabled || stats.some((k) => String(v[k] || '').trim()))
              for (const key of stats)
                if (
                  !/^\d+$/.test(String(v[key] || '')) ||
                  Number(v[key]) < 1 ||
                  Number(v[key]) > 10000000
                )
                  add(key, 'Enter a whole number between 1 and 10,000,000.');
            state.skills.forEach((s, i) => {
              if (!s.name.trim())
                add(
                  'skill-' + i + '-name',
                  'Give skill ' + (i + 1) + ' a name, or remove the unused entry.'
                );
              if (!R.hasContent(s.description))
                add('skill-' + i + '-description', 'Add a description for skill ' + (i + 1) + '.');
            });
            errors.push(...C.errors(state), ...F.errors(state));
          }
          if (step === 4 && state.mindscapeEnabled) {
            state.mindscapes.forEach((m, i) => {
              if (!m.title.trim())
                add('mindscape-' + i + '-title', 'Awakening ' + (i + 1) + ' needs a title.');
              if (!R.hasContent(m.effect))
                add('mindscape-' + i + '-effect', 'Awakening ' + (i + 1) + ' needs an effect.');
            });
            if (state.images.mindscape.mode === 'wiki' && !filename(state, 'mindscape'))
              add(
                'mindscape-wiki',
                'Enter an existing Mindscape image filename or choose a local file.'
              );
            if (
              state.images.mindscape.mode === 'local' &&
              state.images.mindscape.persisted === false
            )
              add(
                'mindscape-file',
                'Choose the Mindscape image again so it can be saved with this draft.'
              );
          }
          return errors;
        }
        const allErrors = (state) => [0, 1, 2, 3, 4].flatMap((i) => validation(state, i));
        function infobox(state, preview = false) {
          const v = state.values,
            map = {
              name: v.name,
              brief_name: v.briefName,
              type: v.status,
              title: titleBadge(state, preview),
              image:
                preview && state.images.portrait.mode === 'local'
                  ? 'Placeholder.png'
                  : filename(state, 'portrait'),
              rank: v.rank,
              attribute: attribute(state),
              specialty: v.specialty,
              attackType: v.attackType,
              faction: faction(state),
              realname: v.realName,
              gender: gender(state),
              species: v.species,
              speciesNote: v.speciesNote,
              height: v.height,
              birthday: (() => {
                try {
                  return birthday(v);
                } catch {
                  return '';
                }
              })(),
              'w-engine': v.wengine,
              namecard: v.namecards,
              releaseDate: v.releaseDate,
              relatives: v.relatives,
              title2: v.additionalTitle,
              voiceEN: v.voiceEN,
              voiceJP: v.voiceJP,
              voiceCN: v.voiceCN,
              voiceKR: v.voiceKR,
            };
          return (
            '{{Agent Infobox\n' +
            Object.entries(map)
              .filter(([k, value]) => String(value || '').trim())
              .map(([key, value]) => '|' + key + '=' + (key === 'title' ? value : param(value)))
              .join('\n') +
            '\n}}'
          );
        }
        function source(state, preview = false) {
          const v = state.values,
            out = [F.tabs, infobox(state, preview)];
          if (v.quote?.trim())
            out.push('{{Description|' + param(v.quote).replace(/\n/g, '<br />') + '}}');
          out.push(
            v.introduction?.trim() ||
              (
                "'''" +
                param(v.name || 'Your agent') +
                "'''" +
                opening(state).slice((v.name || 'Your agent').trim().length)
              ).replace(
                / in Zenless Zone Zero/,
                ' in [[Zenless Zone Zero Fanon Wiki|Zenless Zone Zero]]'
              )
          );
          if (state.combatEnabled) {
            const hasStats = ['hp', 'atk', 'def'].every((k) => /^\d+$/.test(String(v[k] || ''))),
              promotion = F.promotionWiki(state),
              core = C.wiki(state),
              enhancement = F.enhancementWiki(state);
            if (hasStats || promotion) out.push('== Combat Info ==');
            if (promotion) out.push('=== Stats & Promotions ===', promotion);
            else if (hasStats)
              out.push(
                '=== Base Stats ===',
                '{| class="wikitable" style="text-align:center"',
                '! Level !! HP !! ATK !! DEF',
                '|-',
                '| 1 || ' + v.hp + ' || ' + v.atk + ' || ' + v.def,
                '|}'
              );
            if (state.skills.length || enhancement || core) out.push('== Skills ==');
            if (state.skills.length) out.push(F.skillsWiki(state, skillTypes));
            if (enhancement) out.push('=== Skill Enhancement ===', enhancement);
            if (core) out.push('=== Core Skill Enhancement ===', core);
          }
          if (state.mindscapeEnabled) {
            out.push('== Mindscape Cinema ==', '{{Mindscape');
            const image =
              preview && state.images.mindscape.mode === 'local'
                ? 'Placeholder.png'
                : filename(state, 'mindscape');
            if (image) out.push('|agentImage=' + param(image));
            state.mindscapes.forEach((m, i) => {
              const n = i + 1;
              out.push(
                '|mindscapeTitle' + n + '=' + param(m.title),
                '|mindscapeDesc' +
                  n +
                  '=' +
                  (R.hasContent(m.story) ? '{{Description|' + R.compile(m.story) + '}}' : ''),
                '|mindscapeEffect' + n + '=' + R.compile(m.effect)
              );
            });
            out.push('}}');
          }
          const languages = F.languageWiki(state);
          if (languages) out.push('== Other Languages ==', languages);
          out.push('== Navigation ==', '{{Agent Navbox}}');
          return out.join('\n\n').replace(/\n\n(?=[|!])/g, '\n') + '\n';
        }
        function previewText(state, mode) {
          if (mode === 'core') return C.wiki(state);
          let text = mode === 'card' ? infobox(state, true) : source(state, true);
          for (const [key, kind, size] of [
            ['attribute', 'attributeIcon', 28],
            ['faction', 'factionIcon', 30],
          ])
            if (state.values[key + 'Custom']) {
              const label = key === 'attribute' ? attribute(state) : faction(state);
              if (!label) continue;
              const icon =
                '{{Icon|' +
                param(label) +
                '|customfile=Placeholder.png|customalt=' +
                param(label) +
                '|size=' +
                size +
                '}}';
              text +=
                '\n<div class="agent-preview-custom-' +
                key +
                '">' +
                icon +
                (key === 'faction' ? '&nbsp;' + param(label) : '') +
                '</div>';
            }
          return text;
        }
        return {
          catalog,
          months,
          steps,
          skillTypes,
          imageKinds,
          iconKinds,
          pngKinds,
          dayCount,
          blank,
          pageName,
          param,
          birthday,
          filename,
          validFilename,
          tokens,
          attribute,
          gender,
          faction,
          opening,
          titleBadge,
          activeImageKinds,
          validation,
          allErrors,
          infobox,
          source,
          previewText,
          pageBundle: (state) => F.pageBundle(state, source(state)),
        };
      });

      /* Attribute, faction and title-badge fields (identity-controls.js) */
      (function () {
        'use strict';
        window.AgentIdentityControls = {
          mount({ state, field, element, imagePicker, changed, urls }) {
            const M = window.AgentDraft,
              C = M.catalog;
            const $ = (id) => document.getElementById(id);
            const classification = $('classification-fields');
            const customPanels = $('custom-classification-fields');

            function options(select, names, placeholder, saved) {
              select.replaceChildren(new Option(placeholder, ''));
              for (const name of names) select.add(new Option(name, name));
              if (saved && !names.includes(saved)) {
                const group = element('optgroup');
                group.label = 'Saved draft value';
                group.append(new Option(saved, saved));
                select.append(group);
              }
              select.value = saved || '';
            }

            field(classification, 'attribute', 'Attribute', '', {
              options: ['', ...C.attributes],
              required: true,
              help: 'Choose from the wiki, or enable Custom below.',
            });
            const attributeInput = $('field-attribute');
            options(attributeInput, C.attributes, 'Choose an attribute', state.values.attribute);

            // Specialty still accepts existing saved/custom text, with the real wiki list.
            field(classification, 'specialty', 'Specialty', 'Choose or type a specialty', {
              required: true,
              list: 'specialties',
            });
            $('specialties').replaceChildren(...C.specialties.map((name) => new Option(name)));

            field(classification, 'faction', 'Faction', '', {
              options: ['', ...C.factions],
              optional: true,
              help: 'Choose a wiki faction, or enable Custom below.',
            });
            options($('field-faction'), C.factions, 'No faction selected', state.values.faction);

            function custom(key, label, nameKey, iconKind) {
              const input = $('field-' + key);
              const box = input.closest('.field');
              const toggleLabel = element('label', 'custom-choice-toggle');
              const toggle = element('input');
              toggle.type = 'checkbox';
              toggle.id = key + '-custom';
              toggle.checked = !!state.values[key + 'Custom'];
              toggle.setAttribute('aria-controls', key + '-custom-panel');
              toggleLabel.append(toggle, element('span', null, 'Custom ' + label.toLowerCase()));
              box.append(toggleLabel);

              const panel = element('div', 'custom-identity-panel');
              panel.id = key + '-custom-panel';
              panel.role = 'group';
              panel.setAttribute('aria-labelledby', key + '-custom-heading');
              const heading = element('h3', null, 'Custom ' + label.toLowerCase());
              heading.id = key + '-custom-heading';
              const help = element(
                'p',
                'group-help',
                'Give it a new name and a PNG icon. Existing entries belong in the wiki list above.'
              );
              const fields = element('div', 'fields');
              field(
                fields,
                nameKey,
                'Custom ' + label.toLowerCase() + ' name',
                key === 'attribute' ? 'e.g. Moonfire' : 'e.g. Lantern Couriers',
                {
                  required: true,
                  full: true,
                }
              );
              const picker = element('div', 'image-picker compact-icon');
              picker.id = iconKind + '-picker';
              picker.dataset.image = iconKind;
              panel.append(heading, help, fields, picker);
              customPanels.append(panel);
              imagePicker(iconKind);
              toggle.addEventListener('change', () => {
                state.values[key + 'Custom'] = toggle.checked;
                update();
                changed();
                if (toggle.checked) $('field-' + nameKey).focus({ preventScroll: true });
              });
            }
            custom('attribute', 'Attribute', 'customAttributeName', 'attributeIcon');
            custom('faction', 'Faction', 'customFactionName', 'factionIcon');

            const attackBox = element('div', 'field attack-choice-field');
            const attackHeading = element('div', 'choice-field-label', 'Attack type');
            attackHeading.id = 'attack-type-label';
            attackHeading.append(element('span', 'optional', 'Optional'));
            const attacks = element('div', 'attack-type-options');
            attacks.role = 'group';
            attacks.setAttribute('aria-labelledby', attackHeading.id);
            const selected = M.tokens(state.values.attackType);
            const attackNames = [...new Set([...C.attackTypes, ...selected])];
            attackNames.forEach((name) => {
              const choice = element('label', 'attack-type-choice');
              const checkbox = element('input');
              checkbox.type = 'checkbox';
              checkbox.value = name;
              checkbox.checked = selected.includes(name);
              checkbox.setAttribute('aria-label', name);
              const iconUrl = C.attackIcons[name];
              if (iconUrl) {
                const image = element('img');
                image.src = iconUrl;
                image.alt = '';
                image.width = 22;
                image.height = 22;
                choice.append(image);
              }
              choice.prepend(checkbox);
              choice.append(element('span', null, name));
              checkbox.addEventListener('change', () => {
                state.values.attackType = [...attacks.querySelectorAll('input:checked')]
                  .map((i) => i.value)
                  .join(';');
                changed();
              });
              attacks.append(choice);
            });
            attackBox.append(
              attackHeading,
              attacks,
              element('small', null, 'Choose one or more types.')
            );
            classification.append(attackBox);

            function update() {
              for (const key of ['attribute', 'faction']) {
                const custom = !!state.values[key + 'Custom'];
                $(key + '-custom-panel').hidden = !custom;
                $(key + '-custom').checked = custom;
                $('field-' + key).disabled = custom;
              }
              const sample = $('title-badge-sample');
              const text = String(state.values.epithet || '').trim();
              sample.hidden = !text;
              sample.querySelector('span').textContent = text;
              const image = sample.querySelector('img');
              const url = state.images.titleIcon?.mode === 'local' && urls.get('titleIcon');
              image.hidden = !url;
              if (url) image.src = url;
              else image.removeAttribute('src');
            }
            update();
            return { update };
          },
        };
      })();

      /* Accessible searchable selection controls (choices.js) */
      (function () {
        'use strict';
        window.AgentChoices = {
          mount(root) {
            const records = new Map();
            const popup = document.createElement('div');
            popup.className = 'wiki-choice-popup';
            popup.hidden = true;
            root.append(popup);
            let active = null,
              items = [],
              cursor = -1,
              search = null,
              list = null;
            let serial = 0,
              typed = '',
              typedAt = 0;
            const chevron =
              '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>';
            const check =
              '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg>';
            function el(tag, cls, text) {
              const node = document.createElement(tag);
              node.className = cls;
              if (text !== undefined) node.textContent = text;
              return node;
            }
            function options(record) {
              const source = record.editable
                ? document.getElementById(record.listId)?.options
                : record.source.options;
              return [...(source || [])].map((o) => ({
                value: o.value,
                label: o.label || o.textContent || o.value,
                disabled: o.disabled,
              }));
            }
            function sync(record) {
              if (!record.source.isConnected) {
                if (active === record) close();
                records.delete(record.source);
                return;
              }
              const source = record.source;
              record.trigger.disabled = source.disabled;
              record.wrap.classList.toggle('is-disabled', source.disabled);
              for (const attr of ['aria-required', 'aria-invalid', 'aria-describedby']) {
                if (!record.editable) {
                  if (source.hasAttribute(attr))
                    record.trigger.setAttribute(attr, source.getAttribute(attr));
                  else record.trigger.removeAttribute(attr);
                }
              }
              if (!record.editable) {
                const selected = [...source.options].find((o) => o.value === source.value);
                record.caption.textContent = selected?.label || 'Choose an option';
                record.trigger.classList.toggle('is-placeholder', !source.value);
              }
              if (active === record && source.disabled) close();
            }
            function close(restoreFocus = false) {
              const previous = active;
              if (!previous) return;
              active = null;
              popup.hidden = true;
              previous.control.setAttribute('aria-expanded', 'false');
              previous.control.removeAttribute('aria-activedescendant');
              previous.trigger.setAttribute('aria-expanded', 'false');
              if (restoreFocus && previous.control.isConnected)
                previous.control.focus({ preventScroll: true });
            }
            function position() {
              if (!active) return;
              if (!active.control.getClientRects().length || active.source.disabled) {
                close();
                return;
              }
              const rect = active.wrap.getBoundingClientRect();
              if (rect.bottom < 0 || rect.top > window.innerHeight) {
                close();
                return;
              }
              const gap = 6,
                edge = 12;
              const width = Math.min(Math.max(rect.width, 200), window.innerWidth - edge * 2);
              const below = window.innerHeight - rect.bottom - edge - gap;
              const above = rect.top - edge - gap;
              const up = below < 340 && above > below;
              const height = Math.min(370, Math.max(100, up ? above : below));
              popup.style.width = width + 'px';
              popup.style.left =
                Math.max(edge, Math.min(rect.left, window.innerWidth - width - edge)) + 'px';
              popup.style.top = up ? 'auto' : rect.bottom + gap + 'px';
              popup.style.bottom = up ? window.innerHeight - rect.top + gap + 'px' : 'auto';
              list.style.maxHeight =
                Math.max(64, height - (search ? 66 : 12) - (active.editable ? 36 : 0)) + 'px';
            }
            function highlight(index, scroll = true) {
              cursor = items.length ? Math.max(0, Math.min(index, items.length - 1)) : -1;
              for (let i = 0; i < items.length; i++)
                items[i].node.classList.toggle('is-active', i === cursor);
              const focus = search || active?.control;
              if (cursor >= 0) {
                focus?.setAttribute('aria-activedescendant', items[cursor].node.id);
                if (scroll) items[cursor].node.scrollIntoView({ block: 'nearest' });
              } else focus?.removeAttribute('aria-activedescendant');
            }
            function choose(item) {
              const record = active;
              if (!record || item.disabled) return;
              record.source.value = item.value;
              record.source.dispatchEvent(
                new Event(record.editable ? 'input' : 'change', { bubbles: true })
              );
              sync(record);
              close(true);
            }
            function render(query = '') {
              if (!active) return;
              const filtered = options(active).filter(
                (o) =>
                  !o.disabled &&
                  o.label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
              );
              list.replaceChildren();
              items = [];
              filtered.forEach((option) => {
                const node = el('div', 'wiki-choice-option');
                node.id = active.id + '-option-' + items.length;
                node.role = 'option';
                node.setAttribute('aria-selected', String(option.value === active.source.value));
                if (!option.value) node.classList.add('is-empty-option');
                node.append(el('span', 'wiki-choice-option-text', option.label));
                const tick = el('span', 'wiki-choice-tick');
                tick.innerHTML = check;
                node.append(tick);
                const item = { ...option, node };
                node.addEventListener('pointerdown', (e) => e.preventDefault());
                node.addEventListener('pointermove', () => highlight(items.indexOf(item), false));
                node.addEventListener('click', () => choose(item));
                items.push(item);
                list.append(node);
              });
              if (!items.length)
                list.append(el('div', 'wiki-choice-no-results', 'No matching options'));
              const selected = items.findIndex((o) => o.value === active.source.value);
              highlight(selected >= 0 ? selected : 0, false);
              position();
            }
            function open(record, key, query = '') {
              if (record.source.disabled) return;
              if (active === record) return;
              close();
              active = record;
              popup.replaceChildren();
              popup.hidden = false;
              record.control.setAttribute('aria-expanded', 'true');
              record.trigger.setAttribute('aria-expanded', 'true');
              search = null;
              if (!record.editable && options(record).length > 11) {
                const header = el('div', 'wiki-choice-search-wrap');
                search = el('input', 'wiki-choice-search');
                search.type = 'search';
                search.placeholder = 'Search ' + record.label.toLowerCase() + '…';
                search.setAttribute('aria-label', 'Search ' + record.label.toLowerCase());
                search.setAttribute('role', 'combobox');
                search.setAttribute('aria-autocomplete', 'list');
                search.setAttribute('aria-controls', record.id + '-list');
                search.setAttribute('aria-expanded', 'true');
                search.autocomplete = 'off';
                search.addEventListener('input', () => render(search.value));
                header.append(search);
                popup.append(header);
              }
              list = el('div', 'wiki-choice-options');
              list.id = record.id + '-list';
              list.role = 'listbox';
              list.setAttribute('aria-label', record.label + ' options');
              popup.append(list);
              if (record.editable)
                popup.append(
                  el('div', 'wiki-choice-hint', 'Choose a suggestion or type your own value.')
                );
              render(record.editable ? query : '');
              if (key === 'ArrowUp' || key === 'End') highlight(items.length - 1);
              else if (key === 'Home') highlight(0);
              else highlight(cursor);
              (search || record.control).focus({ preventScroll: true });
            }
            function keyboard(event, record) {
              const isOpen = active === record;
              const key = event.key;
              if (isOpen && key === 'Escape') {
                event.preventDefault();
                close(true);
                return;
              }
              if (isOpen && key === 'Tab') {
                record.control.focus({ preventScroll: true });
                close();
                return;
              }
              if (
                ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key) &&
                (!record.editable || key.startsWith('Arrow'))
              ) {
                event.preventDefault();
                if (!isOpen) open(record, key);
                else
                  highlight(
                    key === 'Home'
                      ? 0
                      : key === 'End'
                        ? items.length - 1
                        : cursor + (key === 'ArrowDown' ? 1 : -1)
                  );
                return;
              }
              if (
                (key === 'Enter' || (key === ' ' && !record.editable && !search)) &&
                (isOpen || !record.editable)
              ) {
                event.preventDefault();
                if (isOpen && cursor >= 0) choose(items[cursor]);
                else if (!isOpen) open(record);
                return;
              }
              if (
                isOpen &&
                !search &&
                !record.editable &&
                key.length === 1 &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.altKey
              ) {
                event.preventDefault();
                typed = Date.now() - typedAt < 700 ? typed + key : key;
                typedAt = Date.now();
                const match = items.findIndex((o) =>
                  o.label.toLocaleLowerCase().startsWith(typed.toLocaleLowerCase())
                );
                if (match >= 0) highlight(match);
              }
            }
            popup.addEventListener('keydown', (e) => {
              if (active) keyboard(e, active);
            });
            function enhance(source) {
              if (records.has(source)) return;
              const editable = source.tagName === 'INPUT';
              const label = [...root.querySelectorAll('label[for]')].find(
                (l) => l.htmlFor === source.id
              );
              const name =
                source.getAttribute('aria-label') ||
                label?.childNodes[0]?.textContent.trim() ||
                'Option';
              const wrap = el('div', 'wiki-choice' + (editable ? ' is-editable' : ''));
              source.before(wrap);
              wrap.append(source);
              const id = 'wiki-choice-' + ++serial;
              const trigger = el('button', editable ? 'wiki-choice-toggle' : 'wiki-choice-control');
              trigger.type = 'button';
              trigger.id = source.id ? source.id + '-control' : id + '-control';
              trigger.setAttribute('aria-expanded', 'false');
              trigger.setAttribute('aria-haspopup', 'listbox');
              trigger.setAttribute('aria-controls', id + '-list');
              const record = {
                source,
                editable,
                wrap,
                trigger,
                id,
                label: name,
                listId: source.getAttribute('list'),
              };
              if (editable) {
                source.removeAttribute('list');
                source.role = 'combobox';
                source.setAttribute('aria-autocomplete', 'list');
                source.setAttribute('aria-expanded', 'false');
                source.setAttribute('aria-controls', id + '-list');
                trigger.setAttribute('aria-label', 'Show ' + name.toLowerCase() + ' options');
                trigger.tabIndex = -1;
                record.control = source;
                source.addEventListener('input', () => {
                  if (active !== record) open(record, undefined, source.value);
                  else render(source.value);
                });
                source.addEventListener('click', () => {
                  if (active !== record) open(record);
                });
              } else {
                source.classList.add('wiki-choice-source');
                source.tabIndex = -1;
                source.setAttribute('aria-hidden', 'true');
                trigger.role = 'combobox';
                trigger.setAttribute('aria-label', name);
                record.caption = el('span', 'wiki-choice-caption');
                trigger.append(record.caption);
                record.control = trigger;
                if (label) label.htmlFor = trigger.id;
                source.addEventListener('focus', () => trigger.focus({ preventScroll: true }));
              }
              const arrow = el('span', 'wiki-choice-arrow');
              arrow.innerHTML = chevron;
              trigger.append(arrow);
              wrap.append(trigger);
              records.set(source, record);
              trigger.addEventListener('click', () =>
                active === record ? close(true) : open(record)
              );
              record.control.addEventListener('keydown', (e) => keyboard(e, record));
              source.addEventListener('change', () => {
                sync(record);
                if (active === record) render(search?.value || '');
              });
              source.addEventListener('choices:refresh', () => sync(record));
              sync(record);
            }
            function scan(container) {
              if (container.nodeType !== 1) return;
              if (container.matches('select,input[list]')) enhance(container);
              container.querySelectorAll('select,input[list]').forEach(enhance);
            }
            scan(root);
            new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (mutation.type === 'attributes') {
                  if (records.has(mutation.target)) sync(records.get(mutation.target));
                } else {
                  mutation.addedNodes.forEach(scan);
                  const source = mutation.target.closest?.('select');
                  if (records.has(source)) sync(records.get(source));
                }
              }
              if (mutations.some((m) => m.removedNodes?.length)) {
                for (const record of records.values()) if (!record.source.isConnected) sync(record);
              }
            }).observe(root, {
              subtree: true,
              childList: true,
              attributes: true,
              attributeFilter: ['disabled', 'aria-invalid', 'aria-describedby'],
            });
            document.addEventListener('pointerdown', (e) => {
              if (active && !popup.contains(e.target) && !active.wrap.contains(e.target)) close();
            });
            document.addEventListener('focusin', (e) => {
              if (active && !popup.contains(e.target) && !active.wrap.contains(e.target)) close();
            });
            window.addEventListener('resize', position);
            window.addEventListener('scroll', position, true);
          },
        };
      })();

      /* Formatting toolbar and inline wiki icons (rich-editor.js) */
      (function () {
        'use strict';
        window.AgentRichEditor = {
          mount(root) {
            const R = window.AgentRichWiki,
              records = new Map();
            const el = (tag, cls, text) => {
              const n = document.createElement(tag);
              n.className = cls;
              if (text !== undefined) n.textContent = text;
              return n;
            };
            function nodesToDOM(nodes, parent) {
              for (const node of nodes) {
                let next;
                if (node.type === 'text') next = document.createTextNode(node.text);
                else if (node.type === 'break') next = document.createElement('br');
                else if (node.type === 'icon') {
                  const data = R.icon(node.name);
                  next = el('span', 'rich-inline-icon');
                  next.contentEditable = 'false';
                  next.dataset.wikiIcon = data.name;
                  next.title = data.label;
                  const img = document.createElement('img');
                  img.src = data.url;
                  img.alt = data.label;
                  img.width = 18;
                  img.height = 18;
                  next.append(img);
                } else if (node.type === 'bold') {
                  next = document.createElement('b');
                  nodesToDOM(node.children, next);
                } else if (node.type === 'color') {
                  next = el(
                    'span',
                    R.catalog.colors.find((c) => c.key === node.key)?.className || ''
                  );
                  next.dataset.wikiColor = node.key;
                  if (node.key.startsWith('#')) next.style.color = node.key;
                  if (node.bold) {
                    const bold = document.createElement('b');
                    nodesToDOM(node.children, bold);
                    next.append(bold);
                  } else nodesToDOM(node.children, next);
                } else if (node.type === 'link') {
                  next = document.createElement('span');
                  next.dataset.wikiLink = node.target;
                  next.className = 'rich-wiki-link';
                  nodesToDOM(node.children, next);
                }
                if (next) parent.append(next);
              }
            }
            function domToNodes(parent) {
              const out = [];
              for (const node of parent.childNodes) {
                if (node.nodeType === 3) {
                  const text = node.textContent.replace(/\ufeff/g, '');
                  if (text) out.push({ type: 'text', text });
                  continue;
                }
                if (node.nodeType !== 1) continue;
                if (node.dataset.wikiIcon && R.icon(node.dataset.wikiIcon)) {
                  out.push({ type: 'icon', name: node.dataset.wikiIcon });
                  continue;
                }
                const children = domToNodes(node);
                if (node.tagName === 'BR') out.push({ type: 'break' });
                else if (['B', 'STRONG'].includes(node.tagName))
                  out.push({ type: 'bold', children });
                else if (node.dataset.wikiColor && R.color(node.dataset.wikiColor))
                  out.push({ type: 'color', key: node.dataset.wikiColor, bold: false, children });
                else if (node.dataset.wikiLink)
                  out.push({ type: 'link', target: node.dataset.wikiLink, children });
                else {
                  if (
                    ['DIV', 'P'].includes(node.tagName) &&
                    out.length &&
                    out.at(-1).type !== 'break'
                  )
                    out.push({ type: 'break' });
                  out.push(...children);
                }
              }
              return out;
            }
            function enhance(source) {
              if (records.has(source)) return;
              const label = [...source.closest('.field').querySelectorAll('label')].find(
                (l) => l.htmlFor === source.id
              );
              const name = label?.childNodes[0]?.textContent.trim() || 'Formatted text';
              const wrap = el('div', 'rich-editor'),
                toolbar = el('div', 'rich-toolbar'),
                editor = el('div', 'rich-surface');
              source.before(wrap);
              wrap.append(toolbar, editor, source);
              source.hidden = true;
              source.tabIndex = -1;
              editor.id = source.id + '-visual';
              editor.contentEditable = 'true';
              editor.role = 'textbox';
              editor.setAttribute('aria-multiline', 'true');
              editor.setAttribute('aria-label', name);
              editor.setAttribute(
                'aria-describedby',
                source.getAttribute('aria-describedby') || ''
              );
              editor.dataset.placeholder = source.placeholder;
              editor.spellcheck = true;
              if (label) label.htmlFor = editor.id;
              toolbar.setAttribute('role', 'toolbar');
              toolbar.setAttribute('aria-label', name + ' formatting');
              const record = {
                source,
                editor,
                wrap,
                range: null,
                history: [source.value],
                at: 0,
                lastTyped: 0,
              };
              records.set(source, record);
              const render = () => {
                editor.replaceChildren();
                nodesToDOM(R.parse(source.value), editor);
              };
              render();
              function save(inputType = '') {
                const value = R.emit(domToNodes(editor)).replace(/(?:<br \/>)+$/, '');
                if (value === source.value) return;
                source.value = value;
                const now = Date.now(),
                  merge =
                    inputType === 'insertText' && now - record.lastTyped < 650 && record.at > 0;
                if (merge) record.history[record.at] = value;
                else {
                  record.history = record.history.slice(0, record.at + 1);
                  record.history.push(value);
                  if (record.history.length > 100) record.history.shift();
                  record.at = record.history.length - 1;
                }
                record.lastTyped = inputType === 'insertText' ? now : 0;
                source.dispatchEvent(new Event('input', { bubbles: true }));
                undo.disabled = record.at === 0;
                redo.disabled = record.at === record.history.length - 1;
              }
              function restore(delta) {
                const next = record.at + delta;
                if (next < 0 || next >= record.history.length) return;
                record.at = next;
                record.lastTyped = 0;
                source.value = record.history[next];
                render();
                source.dispatchEvent(new Event('input', { bubbles: true }));
                editor.focus({ preventScroll: true });
                record.range = null;
                undo.disabled = record.at === 0;
                redo.disabled = record.at === record.history.length - 1;
              }
              function selection() {
                const sel = document.getSelection();
                if (sel.rangeCount && editor.contains(sel.getRangeAt(0).commonAncestorContainer))
                  record.range = sel.getRangeAt(0).cloneRange();
                return sel;
              }
              function useRange() {
                editor.focus({ preventScroll: true });
                const sel = document.getSelection();
                sel.removeAllRanges();
                if (record.range && editor.contains(record.range.commonAncestorContainer))
                  sel.addRange(record.range);
                else {
                  const range = document.createRange();
                  range.selectNodeContents(editor);
                  range.collapse(false);
                  sel.addRange(range);
                }
                return sel.getRangeAt(0);
              }
              function button(text, name, action) {
                const b = el('button', 'rich-tool', text);
                b.type = 'button';
                b.setAttribute('aria-label', name);
                b.title = name;
                b.addEventListener('pointerdown', (e) => {
                  selection();
                  e.preventDefault();
                });
                b.addEventListener('click', action);
                toolbar.append(b);
                return b;
              }
              const bold = button('B', 'Bold', () => {
                useRange();
                document.execCommand('bold');
                selection();
                save('formatBold');
              });
              bold.classList.add('rich-bold');
              const colors = button('Color', 'Text color', () => toggle(colorPanel, colors));
              const icons = button('＋ Icon', 'Insert wiki icon', () => toggle(iconPanel, icons));
              const spacer = el('span', 'rich-toolbar-spacer');
              toolbar.append(spacer);
              const undo = button('↶', 'Undo formatting or text', () => restore(-1)),
                redo = button('↷', 'Redo formatting or text', () => restore(1));
              undo.disabled = true;
              redo.disabled = true;
              const colorPanel = el('div', 'rich-palette rich-colors'),
                iconPanel = el('div', 'rich-palette rich-icons');
              colorPanel.hidden = iconPanel.hidden = true;
              colors.setAttribute('aria-expanded', 'false');
              icons.setAttribute('aria-expanded', 'false');
              function toggle(panel, opener) {
                const show = panel.hidden;
                colorPanel.hidden = iconPanel.hidden = true;
                colors.setAttribute('aria-expanded', 'false');
                icons.setAttribute('aria-expanded', 'false');
                panel.hidden = !show;
                opener.setAttribute('aria-expanded', String(show));
                if (show && panel === iconPanel) filter.focus({ preventScroll: true });
              }
              function hidePalettes() {
                colorPanel.hidden = iconPanel.hidden = true;
                colors.setAttribute('aria-expanded', 'false');
                icons.setAttribute('aria-expanded', 'false');
              }
              for (const color of R.catalog.colors) {
                const b = el('button', 'rich-color ' + color.className, color.label);
                b.type = 'button';
                b.setAttribute('aria-label', color.label + ' text color');
                b.addEventListener('pointerdown', (e) => e.preventDefault());
                b.addEventListener('click', () => {
                  const range = useRange(),
                    span = el('span', color.className);
                  span.dataset.wikiColor = color.key;
                  if (range.collapsed) {
                    span.append(document.createTextNode('\ufeff'));
                    range.insertNode(span);
                    range.selectNodeContents(span);
                    range.collapse(false);
                  } else {
                    span.append(range.extractContents());
                    range.insertNode(span);
                    range.selectNodeContents(span);
                  }
                  const sel = document.getSelection();
                  sel.removeAllRanges();
                  sel.addRange(range);
                  record.range = range.cloneRange();
                  hidePalettes();
                  save('formatColor');
                });
                colorPanel.append(b);
              }
              const filter = el('input', 'rich-icon-search');
              filter.type = 'search';
              filter.placeholder = 'Find an icon…';
              filter.setAttribute('aria-label', 'Search wiki icons');
              const grid = el('div', 'rich-icon-grid');
              iconPanel.append(filter, grid);
              for (const icon of R.catalog.icons) {
                const b = el('button', 'rich-icon-option');
                b.type = 'button';
                b.dataset.search = icon.label.toLowerCase();
                b.setAttribute('aria-label', 'Insert ' + icon.label + ' icon');
                const img = document.createElement('img');
                img.src = icon.url;
                img.alt = '';
                img.width = 24;
                img.height = 24;
                img.loading = 'lazy';
                b.append(img, document.createTextNode(icon.label));
                b.addEventListener('pointerdown', (e) => e.preventDefault());
                b.addEventListener('click', () => {
                  const range = useRange(),
                    fragment = document.createDocumentFragment();
                  nodesToDOM([{ type: 'icon', name: icon.name }], fragment);
                  range.deleteContents();
                  const added = fragment.firstChild;
                  range.insertNode(fragment);
                  range.setStartAfter(added);
                  range.collapse(true);
                  const sel = document.getSelection();
                  sel.removeAllRanges();
                  sel.addRange(range);
                  record.range = range.cloneRange();
                  hidePalettes();
                  save('insertIcon');
                });
                grid.append(b);
              }
              filter.addEventListener('input', () => {
                for (const b of grid.children)
                  b.hidden = !b.dataset.search.includes(filter.value.toLowerCase().trim());
              });
              wrap.insertBefore(colorPanel, editor);
              wrap.insertBefore(iconPanel, editor);
              const help = el(
                'small',
                'rich-help',
                'Select text to format it. Insert icons anywhere in the text.'
              );
              wrap.append(help);
              editor.addEventListener('input', (e) => {
                selection();
                save(e.inputType);
              });
              editor.addEventListener('keyup', selection);
              editor.addEventListener('mouseup', selection);
              editor.addEventListener('blur', selection);
              editor.addEventListener('paste', (e) => {
                e.preventDefault();
                document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
                save('insertFromPaste');
              });
              editor.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                  e.preventDefault();
                  restore(e.shiftKey ? 1 : -1);
                } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                  e.preventDefault();
                  restore(1);
                } else if (e.key === 'Escape') hidePalettes();
              });
              wrap.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                  hidePalettes();
                  editor.focus({ preventScroll: true });
                }
              });
              source.addEventListener('focus', () => editor.focus({ preventScroll: true }));
              new MutationObserver(() => {
                if (source.hasAttribute('aria-invalid'))
                  editor.setAttribute('aria-invalid', source.getAttribute('aria-invalid'));
                else editor.removeAttribute('aria-invalid');
              }).observe(source, { attributes: true, attributeFilter: ['aria-invalid'] });
            }
            function scan(container) {
              if (container.nodeType !== 1) return;
              const selector =
                'textarea[id^="field-skill-"][id$="-description"],textarea[id^="field-mindscape-"][id$="-effect"],textarea[id^="field-mindscape-"][id$="-story"]';
              if (container.matches(selector)) enhance(container);
              container.querySelectorAll(selector).forEach(enhance);
            }
            scan(root);
            new MutationObserver((changes) => {
              for (const change of changes) change.addedNodes.forEach(scan);
              if (changes.some((c) => c.removedNodes.length))
                for (const [source] of records) if (!source.isConnected) records.delete(source);
            }).observe(root, { subtree: true, childList: true });
          },
        };
      })();

      /* Core Skill Enhancement fields (combat-controls.js) */
      (function () {
        'use strict';
        window.AgentCombatControls = {
          mount({ state, field, element, changed, preview }) {
            const C = window.AgentCombat,
              $ = (id) => document.getElementById(id),
              panel = $('core-enhancement');
            const toggle = $('core-enhancement-enabled');
            toggle.checked = state.coreEnhancement.enabled;
            toggle.addEventListener('change', () => {
              state.coreEnhancement.enabled = toggle.checked;
              changed();
            });
            const data = state.coreEnhancement;
            field(
              $('core-passive-fields'),
              'core-passive',
              'Core Passive name',
              'Uses the first Core Skill name',
              {
                optional: true,
                full: true,
                help: 'Leave blank to use the name of your first Core Skill.',
              },
              { get: () => data.passive, set: (value) => (data.passive = value) }
            );
            for (const rank of ['A', 'S']) {
              const box = element('div', 'core-material-field');
              $('core-material-fields').append(box);
              const fields = element('div', 'fields');
              box.append(fields);
              field(
                fields,
                'core-material' + rank,
                rank + '-Rank material',
                '',
                {
                  required: true,
                  full: true,
                  options: [
                    '',
                    ...C.catalog.materials.filter((m) => m.rank === rank).map((m) => m.name),
                  ],
                  emptyLabel: 'Choose an ' + rank + '-Rank material',
                },
                {
                  get: () => data['material' + rank],
                  set: (value) => (data['material' + rank] = value),
                }
              );
              const sample = element('div', 'core-material-sample');
              sample.id = 'core-material-' + rank + '-sample';
              sample.setAttribute('aria-live', 'polite');
              box.append(sample);
            }
            for (const n of [1, 2]) {
              field(
                $('core-bonus-fields'),
                'core-stat' + n,
                'Bonus ' + n + ' · stat',
                n === 1 ? 'e.g. CRIT Rate' : 'e.g. Base HP',
                {
                  required: true,
                  list: 'core-stats',
                  help: n === 1 ? 'Applies at A, C and E.' : 'Applies at B, D and F.',
                },
                { get: () => data['stat' + n], set: (value) => (data['stat' + n] = value) }
              );
              field(
                $('core-bonus-fields'),
                'core-amount' + n,
                'Increase per upgrade',
                n === 1 ? 'e.g. 4.8%' : 'e.g. 140',
                { required: true, help: 'Enter a number, with % when appropriate.' },
                { get: () => data['amount' + n], set: (value) => (data['amount' + n] = value) }
              );
            }
            $('preview-core').addEventListener('click', () => preview($('preview-core')));
            function update() {
              panel.hidden = !C.hasCore(state);
              $('core-enhancement-content').hidden = !data.enabled;
              $('field-core-passive').placeholder =
                state.skills.find((s) => s.type === 'Core Skill')?.name ||
                'Uses the first Core Skill name';
              for (const rank of ['A', 'S']) {
                const sample = $('core-material-' + rank + '-sample'),
                  name = data['material' + rank];
                if (sample.dataset.value === name) continue;
                sample.dataset.value = name;
                sample.replaceChildren();
                const m = C.material(name, rank);
                if (!m) {
                  sample.append(element('small', null, 'Choose a material to see its wiki image.'));
                  continue;
                }
                const card = element('div', 'card-container card-rank-' + rank + ' mini-card'),
                  wrapper = element('div', 'card-wrapper'),
                  body = element('div', 'card-body'),
                  image = element('div', 'card-image-container'),
                  img = element('img');
                img.src = m.url;
                img.alt = m.name;
                img.width = 48;
                img.height = 48;
                image.append(img);
                body.append(image);
                wrapper.append(body);
                card.append(wrapper);
                const caption = element('div');
                caption.append(
                  element('strong', null, m.name),
                  element('small', null, rank + '-Rank' + (m.animated ? ' · Animated' : ''))
                );
                sample.append(card, caption);
              }
              $('core-bonus-summary').textContent = [
                data.stat1 && C.amount(data.amount1)
                  ? 'A / C / E: ' +
                    data.stat1 +
                    ' +' +
                    data.amount1 +
                    ' → total +' +
                    C.total(data.amount1)
                  : '',
                data.stat2 && C.amount(data.amount2)
                  ? 'B / D / F: ' +
                    data.stat2 +
                    ' +' +
                    data.amount2 +
                    ' → total +' +
                    C.total(data.amount2)
                  : '',
              ]
                .filter(Boolean)
                .join('\n');
            }
            update();
            return { update };
          },
        };
      })();

      /* Promotion, chip-family and language fields (schema-controls.js) */
      (function () {
        'use strict';
        window.AgentSchemaControls = {
          mount({ state, field, element, changed }) {
            const F = window.AgentSchema,
              $ = (id) => document.getElementById(id),
              p = state.promotions,
              e = state.skillEnhancement;
            const enabled = $('promotions-enabled');
            enabled.checked = p.enabled;
            enabled.addEventListener('change', () => {
              p.enabled = enabled.checked;
              changed();
            });
            const manual = $('promotion-materials-manual');
            manual.addEventListener('change', () => {
              p.manualMaterials = manual.checked;
              changed();
            });
            for (let tier = 0; tier < 3; tier++) {
              const names = [
                ...new Set(
                  Object.values(F.catalog.seals)
                    .filter((s) => s.available)
                    .map((s) => s.names[tier])
                ),
              ];
              field(
                $('promotion-material-fields'),
                'promotion-material' + tier,
                ['Basic seal', 'Advanced seal', 'Final seal'][tier],
                '',
                { required: true, options: ['', ...names], emptyLabel: 'Choose a seal' },
                { get: () => p.materials[tier], set: (value) => (p.materials[tier] = value) }
              );
            }
            const table = $('promotion-stat-inputs'),
              body = element('tbody');
            table.append(body);
            for (let index = 0; index < 12; index++) {
              const row = element('tr');
              if (index % 2 === 0) {
                const phase = element('th', null, String(index / 2));
                phase.rowSpan = 2;
                phase.scope = 'rowgroup';
                row.append(phase);
              }
              const level = element('th', null, F.levels[index]);
              level.scope = 'row';
              row.append(level);
              for (const stat of ['hp', 'atk', 'def']) {
                const cell = element('td', 'promotion-number');
                if (index === 0) {
                  cell.dataset.baseStat = stat;
                  cell.textContent = F.fmt(state.values[stat]) || '—';
                } else
                  field(
                    cell,
                    'promotion-' + index + '-' + stat,
                    stat.toUpperCase() + ' at ' + F.levels[index],
                    '',
                    { type: 'number', required: true },
                    {
                      get: () => p.rows[index - 1][stat],
                      set: (value) => (p.rows[index - 1][stat] = value),
                    }
                  );
                row.append(cell);
              }
              body.append(row);
            }
            const skillEnabled = $('skill-enhancement-enabled');
            skillEnabled.checked = e.enabled;
            skillEnabled.addEventListener('change', () => {
              e.enabled = skillEnabled.checked;
              changed();
            });
            const chipManual = $('skill-chip-manual');
            chipManual.addEventListener('change', () => {
              e.manual = chipManual.checked;
              changed();
            });
            const families = F.catalog.chips.filter((c) => c.available);
            field(
              $('skill-chip-fields'),
              'skill-chip',
              'Skill chip family',
              '',
              {
                required: true,
                full: true,
                options: ['', ...families.map((c) => c.family)],
                emptyLabel: 'Choose a chip family',
              },
              { get: () => e.chipType, set: (value) => (e.chipType = value) }
            );
            for (const option of $('field-skill-chip').options) {
              const c = families.find((c) => c.family === option.value);
              if (c) option.label = c.attribute + ' · ' + c.family;
            }
            for (const lang of F.catalog.languages) {
              const key = 'language' + lang.code.toUpperCase();
              field(
                $('language-fields'),
                key,
                lang.label + ' name',
                lang.code === 'en' ? 'Uses the agent name if blank' : 'Optional',
                { optional: true }
              );
              if (lang.romanization)
                field(
                  $('language-fields'),
                  key + '_RM',
                  lang.label + ' · romanization',
                  'Optional',
                  {
                    optional: true,
                    help: ['ja', 'ko'].includes(lang.code)
                      ? 'Leave blank to use the wiki’s automatic romanization.'
                      : '',
                  }
                );
            }
            $('secondary-skill-types').replaceChildren(
              ...F.catalog.secondaryTypes.map((name) => new Option(name))
            );
            function cards(container, items, ranks) {
              const key = JSON.stringify(items.map((i) => i?.name));
              if (container.dataset.rendered === key) return;
              container.dataset.rendered = key;
              container.replaceChildren();
              items.forEach((item, index) => {
                if (!item) return;
                const tile = element('div', 'upgrade-material'),
                  card = element(
                    'div',
                    'card-container card-rank-' + (ranks?.[index] || 'C') + ' mini-card'
                  ),
                  wrapper = element('div', 'card-wrapper'),
                  b = element('div', 'card-body'),
                  image = element('div', 'card-image-container'),
                  img = element('img');
                img.src = item.url;
                img.width = 48;
                img.height = 48;
                img.alt = item.name;
                image.append(img);
                b.append(image);
                wrapper.append(b);
                card.append(wrapper);
                tile.append(card, element('small', null, item.name));
                container.append(tile);
              });
            }
            function update() {
              $('promotion-details').hidden = !p.enabled;
              const automatic = F.autoSeals(state),
                useManual = p.manualMaterials || !automatic;
              manual.checked = useManual;
              manual.disabled = !automatic;
              $('promotion-material-fields').hidden = !useManual;
              $('promotion-material-note').textContent =
                automatic && !p.manualMaterials
                  ? 'Certification seals are selected automatically for ' +
                    state.values.specialty +
                    '.'
                  : 'Choose the three existing certification seals used by this specialty.';
              const names = F.seals(state),
                pool = Object.values(F.catalog.seals)
                  .filter((s) => s.available)
                  .flatMap((s) => s.items);
              cards(
                $('promotion-material-preview'),
                names.map((name) => pool.find((i) => i.name === name))
              );
              for (const cell of table.querySelectorAll('[data-base-stat]'))
                cell.textContent = F.fmt(state.values[cell.dataset.baseStat]) || '—';
              $('skill-enhancement-form').hidden = !state.skills.length;
              $('skill-enhancement-details').hidden = !e.enabled;
              const auto = F.autoChip(state),
                choose = e.manual || !auto;
              chipManual.checked = choose;
              chipManual.disabled = !auto;
              const select = $('field-skill-chip');
              select.disabled = !choose;
              select.value = choose ? e.chipType : auto;
              select.dispatchEvent(new Event('choices:refresh'));
              const attr = state.values.attributeCustom
                ? state.values.customAttributeName
                : state.values.attribute;
              $('skill-chip-note').textContent =
                auto && !e.manual
                  ? 'Selected automatically from ' + attr + '.'
                  : 'Choose the chip family used by ' + (attr || 'this attribute') + '.';
              cards(
                $('skill-chip-preview'),
                F.catalog.chips.find((c) => c.family === F.chip(state))?.items || [],
                ['C', 'B', 'A']
              );
            }
            update();
            return { update };
          },
        };
      })();

      /* Native preview table interactions (native-preview.js) */
      (function () {
        'use strict';
        window.AgentNativePreview = {
          activate(container) {
            for (const table of container.querySelectorAll('table.mw-collapsible')) {
              const rows = [...table.rows].filter((row) => row.closest('table') === table);
              if (rows.length < 2) continue;
              const header = rows[0].cells[rows[0].cells.length - 1],
                button = document.createElement('button');
              button.type = 'button';
              button.className = 'native-table-toggle';
              let collapsed = table.classList.contains('mw-collapsed');
              function update() {
                button.textContent = collapsed ? '[Expand]' : '[Collapse]';
                button.setAttribute('aria-expanded', String(!collapsed));
                table.classList.toggle('mw-collapsed', collapsed);
                rows.slice(1).forEach((row) => (row.hidden = collapsed));
              }
              button.addEventListener('click', () => {
                collapsed = !collapsed;
                update();
              });
              header.append(button);
              update();
            }
            const toggle = container.querySelector('.mw-customtoggle-toggle-promotion'),
              cells = container.querySelectorAll(
                '.promotion-stats [id="mw-customcollapsible-toggle-promotion"]'
              );
            if (toggle && cells.length) {
              let shown = true;
              toggle.role = 'button';
              toggle.tabIndex = 0;
              function update() {
                for (const cell of cells) {
                  cell.classList.remove('hidden', 'mw-collapsible');
                  cell.hidden = !shown;
                }
                toggle.setAttribute('aria-expanded', String(shown));
              }
              const change = () => {
                shown = !shown;
                update();
              };
              toggle.addEventListener('click', change);
              toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  change();
                }
              });
              update();
            }
          },
        };
      })();

      /* Same-origin publishing, image checks and partial-save journal (publisher.js) */
      (function (root, factory) {
        if (typeof module === 'object' && module.exports) module.exports = factory();
        else root.AgentWikiPublisher = factory();
      })(typeof globalThis !== 'undefined' ? globalThis : this, function () {
        'use strict';
        const subpages = ['Lore', 'DMs', 'Fashion', 'Media'];
        const missing = (page) => page && (page.missing === true || page.missing === '');
        const key = (title) => String(title).replace(/_/g, ' ').trim().toLowerCase();
        function failure(code, result) {
          return new Error(
            result?.error?.info ||
              result?.error?.message ||
              (result?.upload?.warnings
                ? 'Image upload needs attention: ' +
                  Object.keys(result.upload.warnings).join(', ') +
                  '. Choose an existing wiki image or another filename.'
                : typeof code === 'string'
                  ? code
                  : code?.message || 'The wiki request failed.')
          );
        }
        function request(promise) {
          return new Promise((resolve, reject) =>
            promise.then(resolve, (code, result) => reject(failure(code, result)))
          );
        }
        function create({ model: M, api, user, digest }) {
          function plan(state) {
            const name = M.pageName(state.values.name);
            return M.pageBundle(state)
              .filter((p, i) => !i || state.subpages?.[p.title.split('/').pop()] !== false)
              .map((p, i) => ({ ...p, title: i ? name + '/' + p.title.split('/').pop() : name }));
          }
          async function query(titles, extra = {}) {
            const data = await request(
              api.get({
                action: 'query',
                titles: titles.join('|'),
                prop: 'info|revisions|imageinfo',
                rvprop: 'ids',
                iiprop: 'sha1',
                formatversion: 2,
                ...extra,
              })
            );
            if (!data.query?.pages) throw Error('The wiki did not return page information.');
            return data.query.pages;
          }
          async function parse(text, title) {
            return request(
              api.post({
                action: 'parse',
                text,
                title,
                contentmodel: 'wikitext',
                prop: 'text|modules|modulestyles',
                disableeditsection: 1,
                formatversion: 2,
              })
            );
          }
          async function publish(state, pictures, progress = () => {}, record = () => {}) {
            if (!user) throw Error('Sign in to Fandom before creating your agent.');
            const errors = M.allErrors(state);
            if (errors.length) throw Error(errors[0].message);
            const pages = plan(state),
              source = pages[0].text,
              journal = state.publication || { title: pages[0].title, source, pages: [] };
            if (journal.title !== pages[0].title || journal.source !== source)
              throw Error(
                'This draft already started publishing a different version. Open the saved page to continue editing it.'
              );
            const lookup = await query(
              pages.map((p) => p.title),
              { assertuser: user }
            );
            const toCreate = [];
            for (const [i, p] of pages.entries()) {
              const found = lookup.find((q) => key(q.title) === key(p.title));
              if (!found || found.invalid !== undefined || found.ns !== 0)
                throw Error('The wiki rejected the page name ' + p.title + '.');
              p.title = found.title;
              if (missing(found)) {
                toCreate.push(p);
                continue;
              }
              const own = journal.pages.find((q) => key(q.title) === key(p.title));
              if (!i && !own)
                throw Error(
                  'A page named ' + p.title + ' already exists. Choose another agent name.'
                );
              if (!i && own.revid !== found.revisions?.[0]?.revid)
                throw Error('The saved agent page has changed. Open it to continue editing.');
              progress((own ? 'Already created: ' : 'Keeping existing page: ') + p.title);
            }
            const uploads = [];
            for (const kind of M.activeImageKinds(state)) {
              const image = state.images[kind],
                filename = M.filename(state, kind);
              if (!filename) continue;
              if (!M.validFilename(filename))
                throw Error('Check the image filename for ' + kind + '.');
              const blob = pictures.get(kind);
              if (image.mode === 'local' && !blob)
                throw Error('Choose your ' + kind + ' image again.');
              uploads.push({ kind, filename, blob, local: image.mode === 'local' });
            }
            const files = uploads.length
              ? await query(
                  uploads.map((f) => 'File:' + f.filename),
                  { assertuser: user }
                )
              : [];
            for (const file of uploads) {
              const existing = files.find((p) => key(p.title) === key('File:' + file.filename));
              if (file.local) {
                file.sha1 = await digest(file.blob);
                if (existing?.imageinfo?.[0]) {
                  if (existing.imageinfo[0].sha1 !== file.sha1)
                    throw Error(
                      'File:' +
                        file.filename +
                        ' already exists with different artwork. Choose an existing image or change the agent/custom name.'
                    );
                  file.reuse = true;
                } else if (!missing(existing))
                  throw Error('The wiki could not check File:' + file.filename + '.');
              } else if (!existing?.imageinfo?.[0])
                throw Error(
                  'File:' + file.filename + ' was not found on the wiki. Check its filename.'
                );
            }
            if (uploads.some((f) => f.local) && !String(state.values.imageCredits || '').trim())
              throw Error('Add image source and credits before uploading.');
            record(journal);
            for (const file of uploads.filter((f) => f.local && !f.reuse)) {
              progress('Uploading ' + file.filename + '…');
              const data = await request(
                api.postWithToken(
                  'csrf',
                  {
                    action: 'upload',
                    filename: file.filename,
                    file: file.blob,
                    comment: 'Agent Studio: artwork for ' + pages[0].title,
                    text:
                      '== Description ==\nArtwork for [[' +
                      pages[0].title +
                      ']].\n\n== Source and credits ==\n' +
                      M.param(state.values.imageCredits) +
                      '\n',
                    watchlist: 'nochange',
                    assertuser: user,
                    formatversion: 2,
                  },
                  { contentType: 'multipart/form-data' }
                )
              );
              if (data.upload?.result !== 'Success' || data.upload.warnings)
                throw failure('The wiki did not confirm the upload.', data);
              progress('Uploaded ' + file.filename);
            }
            for (const page of toCreate) {
              progress('Creating ' + page.title + '…');
              const data = await request(
                api.postWithToken('csrf', {
                  action: 'edit',
                  title: page.title,
                  text: page.text,
                  summary:
                    'Create ' +
                    (page.optional ? 'agent subpage' : 'agent overview') +
                    ' with Agent Studio',
                  createonly: 1,
                  assertuser: user,
                  watchlist: 'nochange',
                  notminor: 1,
                  formatversion: 2,
                })
              );
              if (data.edit?.result !== 'Success')
                throw Error(
                  data.edit?.captcha
                    ? 'Fandom requires a CAPTCHA. Use the regular wiki editor to finish this page.'
                    : 'The wiki did not confirm ' +
                        page.title +
                        '. Check page history before retrying.'
                );
              journal.pages.push({ title: data.edit.title, revid: data.edit.newrevid });
              record(journal);
            }
            return { title: pages[0].title, pages: pages.map((p) => p.title), journal };
          }
          return { plan, parse, publish };
        }
        return { create, subpages, failure };
      });

      /* Questionnaire initialization, fields, preview and explicit create action (app.built.js) */
      (async function () {
        'use strict';
        const M = window.AgentDraft,
          $ = (id) => document.getElementById(id),
          root = $('agent-studio');
        const STORAGE = 'zzz-agent-studio-wiki-v2:' + (mw.config.get('wgUserName') || 'anonymous');
        let DB = 'zzz-agent-studio-wiki-images-v2:' + (mw.config.get('wgUserName') || 'anonymous');
        let state = M.blank(),
          db = null,
          returnFocus = null,
          previewMode = 'card',
          requestId = 0,
          identityUI = null,
          coreUI = null,
          schemaUI = null;
        const pictures = new Map(),
          urls = new Map(),
          imageMessages = new Map();
        try {
          const saved = JSON.parse(localStorage.getItem(STORAGE) || 'null');
          if (
            saved?.version === 2 &&
            saved.values &&
            saved.images &&
            Array.isArray(saved.skills) &&
            Array.isArray(saved.mindscapes) &&
            saved.mindscapes.length === 6
          ) {
            state = saved;
            state.step = Math.max(0, Math.min(5, Number(state.step) || 0));
            state.furthest = Math.max(0, Math.min(5, Number(state.furthest) || 0));
            state.cinema = Math.max(0, Math.min(5, Number(state.cinema) || 0));
          }
        } catch {}
        if (state.publication?.complete) state = M.blank();
        state.draftId ||= crypto.randomUUID();
        DB += ':' + state.draftId;
        for (const kind of M.imageKinds) state.images[kind] ||= { mode: 'none' };
        state.coreEnhancement = { ...window.AgentCombat.defaults(), ...state.coreEnhancement };
        window.AgentSchema.normalize(state);
        if (M.tokens(state.values.attribute).length > 1) {
          state.previousAttributeSelections = M.tokens(state.values.attribute);
          state.values.attribute = state.previousAttributeSelections[0];
        }
        if (state.values.gender) {
          const known = ['Male', 'Female', 'Other'].find(
            (x) => x.toLowerCase() === String(state.values.gender).trim().toLowerCase()
          );
          if (known) state.values.gender = known;
          else {
            state.values.genderOther = state.values.gender;
            state.values.gender = 'Other';
          }
        }
        try {
          db = await new Promise((resolve, reject) => {
            const req = indexedDB.open(DB, 1);
            req.onupgradeneeded = () => req.result.createObjectStore('images');
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
          });
        } catch {}
        function imageStore(kind, blob) {
          return new Promise((resolve, reject) => {
            if (!db) return reject(Error('Image storage is unavailable.'));
            const tx = db.transaction('images', 'readwrite');
            const store = tx.objectStore('images');
            if (blob) store.put(blob, kind);
            else store.delete(kind);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
          });
        }
        if (db)
          for (const kind of M.imageKinds) {
            const blob = await new Promise((resolve) => {
              const r = db.transaction('images').objectStore('images').get(kind);
              r.onsuccess = () => resolve(r.result);
              r.onerror = () => resolve(null);
            });
            if (blob) {
              pictures.set(kind, blob);
              urls.set(kind, URL.createObjectURL(blob));
            } else if (state.images[kind]?.mode === 'local') {
              state.images[kind].persisted = false;
              imageMessages.set(kind, {
                text: 'Please choose this image again. The saved file could not be restored.',
                error: true,
              });
            }
          }
        const wikiUser = mw.config.get('wgUserName'),
          wikiApi = new mw.Api();
        let approved = null,
          publishing = false;
        state.subpages = { Lore: true, DMs: true, Fashion: true, Media: true, ...state.subpages };
        const publisher = window.AgentWikiPublisher.create({
          model: M,
          api: wikiApi,
          user: wikiUser,
          digest: async (blob) => {
            const hash = new Uint8Array(
              await crypto.subtle.digest('SHA-1', await blob.arrayBuffer())
            );
            return BigInt('0x' + [...hash].map((n) => n.toString(16).padStart(2, '0')).join(''))
              .toString(36)
              .padStart(31, '0');
          },
        });
        const stamp = () =>
          JSON.stringify([
            M.source(state),
            M.activeImageKinds(state).map((k) => [k, state.images[k]]),
            state.subpages,
            state.values.imageCredits,
          ]);
        function publishingStatus(text, error = false) {
          $('finish-status').textContent = text;
          $('finish-status').dataset.error = String(error);
        }
        function publicationReview() {
          const holder = $('publish-plan');
          holder.replaceChildren();
          let pages = [];
          try {
            pages = publisher.plan(state);
          } catch {}
          holder.append(element('strong', null, 'Pages to create'));
          const list = element('ul');
          for (const page of pages)
            list.append(
              element('li', null, page.title + (page.optional ? ' · empty page to fill later' : ''))
            );
          holder.append(list);
          const files = M.activeImageKinds(state).filter((k) => state.images[k]?.mode === 'local');
          $('image-credits-group').hidden = !files.length;
          if (files.length) {
            holder.append(element('strong', null, 'Images to upload'));
            const images = element('ul');
            for (const kind of files) images.append(element('li', null, M.filename(state, kind)));
            holder.append(images);
          }
          $('finish-draft').disabled =
            !wikiUser || !approved || approved !== stamp() || !!state.publication?.complete;
          if (!wikiUser)
            publishingStatus(
              'Sign in to Fandom to create your agent. You can fill and preview this draft first.'
            );
        }
        async function publishDraft() {
          if (publishing) return;
          const errors = M.allErrors(state);
          if (errors.length) {
            showErrors(errors);
            return;
          }
          if (!approved || approved !== stamp()) {
            publishingStatus('Preview the current page before creating it.', true);
            return;
          }
          publishing = true;
          $('agent-form').inert = true;
          $('steps').inert = true;
          $('preview-card').disabled = true;
          try {
            const result = await publisher.publish(
              JSON.parse(JSON.stringify(state)),
              pictures,
              publishingStatus,
              (journal) => {
                state.publication = JSON.parse(JSON.stringify(journal));
                save();
              }
            );
            state.publication = { ...result.journal, complete: true };
            state.ready = true;
            save();
            publishingStatus('Created ' + result.title + ' and its selected pages on the wiki. ');
            for (const [i, title] of result.pages.entries()) {
              const link = element(
                'a',
                null,
                i ? ' · ' + title.split('/').pop() : 'Open agent page'
              );
              link.href = mw.util.getUrl(title);
              link.target = '_blank';
              link.rel = 'noopener';
              $('finish-status').append(link);
            }
            const another = element('a', null, ' · Create another agent');
            another.href = mw.util.getUrl('Agent Studio');
            $('finish-status').append(another);
          } catch (error) {
            approved = null;
            publishingStatus(
              error.message +
                (state.publication?.pages?.length
                  ? ' Pages already created are listed below. Retry after previewing, or continue in the wiki editor.'
                  : ''),
              true
            );
            if (state.publication?.pages?.length) {
              const list = element('ul');
              for (const page of state.publication.pages) {
                const li = element('li'),
                  a = element('a', null, page.title);
                a.href = mw.util.getUrl(page.title);
                li.append(a);
                list.append(li);
              }
              $('finish-status').append(list);
            }
          } finally {
            publishing = false;
            $('agent-form').inert = false;
            $('steps').inert = false;
            $('preview-card').disabled = false;
            publicationReview();
          }
        }

        const definitions = {
          'identity-fields': [
            [
              'name',
              'Agent name',
              'e.g. Aster Vale',
              { required: true, full: true, help: 'This becomes the title of the wiki page.' },
            ],
          ],
          'extra-identity-fields': [
            [
              'epithet',
              'Badge text',
              'e.g. The Night Horror',
              {
                optional: true,
                full: true,
                help: 'The title shown under the agent’s name. Add its icon below.',
              },
            ],
          ],
          'classification-fields': [
            [
              'status',
              'Agent status',
              '',
              { options: ['Upcoming', 'Playable', 'NPC', 'Protagonist', 'Historical', 'Deceased'] },
            ],
            ['rank', 'Rank', '', { options: ['', 'S', 'A'], required: true }],
          ],
          'profile-fields': [
            [
              'gender',
              'Gender',
              '',
              {
                optional: true,
                options: ['', 'Male', 'Female', 'Other'],
                emptyLabel: 'Not specified',
              },
            ],
            [
              'species',
              'Species',
              'Human, Thiren, or your own species',
              { optional: true, list: 'species' },
            ],
            ['speciesNote', 'Species detail', 'e.g. Fox, Chimera', { optional: true }],
            ['height', 'Height', 'e.g. 180 cm', { optional: true }],
            ['birthday', 'Birthday', '', { optional: true, birthday: true }],
            ['releaseDate', 'Release date', '', { type: 'date', optional: true }],
          ],
          'extra-profile-fields': [
            [
              'briefName',
              'Short name',
              'e.g. Oni or Aster',
              {
                optional: true,
                help: 'A shorter version of the agent’s name; separate from the title badge.',
              },
            ],
            ['realName', 'Real name', 'If different from their agent name', { optional: true }],
            [
              'additionalTitle',
              'Additional name or username',
              'e.g. an Inter-Knot handle',
              { optional: true },
            ],
            ['wengine', 'Signature W-Engine', 'W-Engine name', { optional: true }],
            [
              'namecards',
              'Namecards',
              'Separate multiple names with a semicolon',
              { optional: true },
            ],
            [
              'relatives',
              'Relationships',
              'Person — relationship',
              { rows: 3, full: true, optional: true },
            ],
            ['voiceEN', 'English voice', 'Actor name', { optional: true }],
            ['voiceJP', 'Japanese voice', 'Actor name', { optional: true }],
            ['voiceCN', 'Chinese voice', 'Actor name', { optional: true }],
            ['voiceKR', 'Korean voice', 'Actor name', { optional: true }],
          ],
          'introduction-fields': [
            [
              'quote',
              'Character quote',
              'What would your agent say?',
              {
                rows: 4,
                full: true,
                optional: true,
                help: 'Shown in the quote box near the top of the page.',
              },
            ],
            [
              'introduction',
              'Introduction',
              'Introduce your agent in a few sentences.',
              {
                rows: 6,
                full: true,
                optional: true,
                help: 'Leave blank to use the suggested opening below. This is the main-page introduction.',
              },
            ],
          ],
          'stats-fields': [
            ['hp', 'Base HP', 'e.g. 1100', { type: 'number' }],
            ['atk', 'Base ATK', 'e.g. 95', { type: 'number' }],
            ['def', 'Base DEF', 'e.g. 50', { type: 'number' }],
          ],
          'language-fields': [],
        };
        function element(tag, cls, text) {
          const e = document.createElement(tag);
          if (cls) e.className = cls;
          if (text !== undefined) e.textContent = text;
          return e;
        }
        function field(container, key, label, placeholder, opt = {}, access) {
          const wrap = element('div', 'field' + (opt.full ? ' full' : ''));
          const l = element('label');
          l.htmlFor = 'field-' + key;
          l.append(document.createTextNode(label));
          if (opt.required || opt.optional) {
            const hint = element(
              'span',
              opt.required ? 'required' : 'optional',
              opt.required ? '*' : 'Optional'
            );
            hint.setAttribute('aria-hidden', 'true');
            l.append(hint);
          }
          wrap.append(l);
          if (opt.birthday) {
            l.htmlFor = 'field-birthMonth';
            const pair = element('div', 'birthday-fields');
            for (const [name, aria] of [
              ['birthMonth', 'Birthday month'],
              ['birthDay', 'Birthday day'],
            ]) {
              const s = element('select');
              s.id = 'field-' + name;
              s.dataset.field = name;
              s.setAttribute('aria-label', aria);
              pair.append(s);
            }
            wrap.append(pair);
            wrap.append(element('small', null, 'Month and day only. Saved as “March 1”.'));
            container.append(wrap);
            return;
          }
          let input;
          if (opt.options) {
            input = element('select');
            for (const v of opt.options)
              input.add(new Option(v || opt.emptyLabel || 'Choose a rank', v));
          } else if (opt.rows) {
            input = element('textarea');
            input.rows = opt.rows;
          } else {
            input = element('input');
            input.type = opt.type || 'text';
            if (opt.type === 'number') {
              input.min = '1';
              input.max = '10000000';
              input.step = '1';
            }
          }
          input.id = 'field-' + key;
          input.placeholder = placeholder;
          input.autocomplete = 'off';
          if (opt.list) input.setAttribute('list', opt.list);
          if (opt.required) input.setAttribute('aria-required', 'true');
          const read = access?.get || (() => state.values[key] || '');
          input.value = read();
          const err = element('div', 'field-error');
          err.id = 'error-' + key;
          err.hidden = true;
          input.setAttribute('aria-describedby', err.id + (opt.help ? ' help-' + key : ''));
          input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', () => {
            if (access) access.set(input.value);
            else state.values[key] = input.value;
            input.removeAttribute('aria-invalid');
            err.hidden = true;
            state.ready = false;
            changed();
          });
          wrap.append(input);
          if (opt.help) {
            const h = element('small', null, opt.help);
            h.id = 'help-' + key;
            wrap.append(h);
          }
          wrap.append(err);
          container.append(wrap);
        }
        for (const [id, defs] of Object.entries(definitions))
          for (const def of defs) field($(id), ...def);
        const genderOther = element('div', 'field full');
        genderOther.id = 'gender-other-wrap';
        const genderOtherFields = element('div', 'fields');
        genderOther.append(genderOtherFields);
        $('profile-fields').append(genderOther);
        field(genderOtherFields, 'genderOther', 'Gender · Other', 'Describe it if you would like', {
          optional: true,
          full: true,
        });
        genderOther.hidden = state.values.gender !== 'Other';
        function setBirthdayDays() {
          const day = $('field-birthDay'),
            previous = state.values.birthDay || '';
          day.replaceChildren(new Option('Day', ''));
          for (let n = 1; n <= M.dayCount(state.values.birthMonth); n++) day.add(new Option(n, n));
          if (previous && state.values.birthMonth)
            state.values.birthDay = String(
              Math.min(Number(previous), M.dayCount(state.values.birthMonth))
            );
          else state.values.birthDay = '';
          day.value = state.values.birthDay;
          day.disabled = !state.values.birthMonth;
        }
        const month = $('field-birthMonth');
        month.add(new Option('Month', ''));
        M.months.forEach((m) => month.add(new Option(m, m)));
        month.value = state.values.birthMonth || '';
        setBirthdayDays();
        month.addEventListener('change', () => {
          state.values.birthMonth = month.value;
          setBirthdayDays();
          changed();
        });
        $('field-birthDay').addEventListener('change', () => {
          state.values.birthDay = $('field-birthDay').value;
          changed();
        });
        function save() {
          try {
            state.updatedAt = new Date().toISOString();
            localStorage.setItem(STORAGE, JSON.stringify(state));
            $('save-status').textContent =
              'Saved on this device · ' +
              new Date(state.updatedAt).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              });
          } catch {
            $('save-status').textContent = 'Device storage unavailable';
          }
        }
        function changed() {
          approved = null;
          state.ready = false;
          $('finish-status').textContent = '';
          $('step-error').hidden = true;
          $('starter-sentence').textContent = M.opening(state);
          $('page-source').value = M.source(state);
          $('mindscape-progress').textContent =
            state.mindscapes.filter(
              (m) => m.title.trim() && window.AgentRichWiki.hasContent(m.effect)
            ).length + ' / 6 complete';
          for (const kind of M.imageKinds) renderImageInfo(kind);
          identityUI?.update();
          coreUI?.update();
          schemaUI?.update();
          genderOther.hidden = state.values.gender !== 'Other';
          refreshSteps();
          if (state.step === 5) renderSummary();
          save();
          publicationReview();
        }
        function refreshSteps() {
          [...$('steps').children].forEach((li, i) => {
            const b = li.querySelector('button');
            const done = i < state.furthest && M.validation(state, i).length === 0;
            li.classList.toggle('step-complete', done);
            b.querySelector('.step-number').textContent = done ? '✓' : String(i + 1);
            if (i === state.step) b.setAttribute('aria-current', 'step');
            else b.removeAttribute('aria-current');
          });
        }
        M.steps.forEach((title, i) => {
          const li = element('li'),
            b = element('button');
          b.type = 'button';
          b.setAttribute('aria-label', i + 1 + '. ' + title);
          b.append(element('span', 'step-number', i + 1), element('span', null, title));
          b.addEventListener('click', () => go(i));
          li.append(b);
          $('steps').append(li);
        });
        function clearErrors() {
          root.querySelectorAll('.field-error').forEach((e) => (e.hidden = true));
          root
            .querySelectorAll('[aria-invalid="true"]')
            .forEach((e) => e.removeAttribute('aria-invalid'));
          $('step-error').hidden = true;
        }
        function showErrors(errors) {
          clearErrors();
          if (!errors.length) return;
          const first = errors[0];
          if (first.step !== state.step) showStep(first.step, false);
          for (const error of errors) {
            const input = $('field-' + error.field) || $(error.field);
            if (input) {
              input.setAttribute('aria-invalid', 'true');
              const fieldError = $('error-' + error.field);
              if (fieldError) {
                fieldError.textContent = error.message;
                fieldError.hidden = false;
              }
            }
          }
          $('step-error').textContent = first.message;
          $('step-error').hidden = false;
          if (first.field.startsWith('mindscape-')) chooseCinema(Number(first.field.split('-')[1]));
          const target =
            $('field-' + first.field + '-visual') ||
            $('field-' + first.field + '-control') ||
            $('field-' + first.field) ||
            $(first.field) ||
            $(first.field.replace('-file', '-picker'))?.querySelector('[data-choose]');
          if (target) {
            for (
              let parent = target.closest('details');
              parent;
              parent = parent.parentElement?.closest('details')
            )
              parent.open = true;
            target.focus();
          }
        }
        function showStep(index, focus = true) {
          state.step = index;
          root
            .querySelectorAll('section[data-step]')
            .forEach((s) => (s.hidden = Number(s.dataset.step) !== index));
          $('step-count').textContent = 'Step ' + (index + 1) + ' of 6';
          $('back').disabled = index === 0;
          $('next').hidden = index === 5;
          $('skip').hidden = ![1, 2, 3, 4].includes(index);
          $('skip').textContent = [3, 4].includes(index) ? 'Skip for now' : 'Continue without this';
          $('next').textContent = 'Next: ' + (M.steps[index + 1] || 'Review') + ' →';
          $('footer-note').textContent =
            index === 0
              ? 'Start with the essentials'
              : index === 5
                ? 'Overview + page tabs'
                : 'Your draft is saved on this device';
          refreshSteps();
          if (index === 5) renderSummary();
          if (focus) {
            $('heading-' + index).focus({ preventScroll: true });
            $('steps').scrollIntoView({ block: 'start', behavior: 'instant' });
          }
          save();
        }
        function go(index) {
          if (index > state.step) {
            const errors = Array.from({ length: index }, (_, i) => i).flatMap((i) =>
              M.validation(state, i)
            );
            if (errors.length) {
              showErrors(errors);
              return;
            }
            state.furthest = Math.max(state.furthest, index);
          }
          clearErrors();
          showStep(index);
        }
        $('next').addEventListener('click', () => go(state.step + 1));
        $('back').addEventListener('click', () => go(Math.max(0, state.step - 1)));
        $('skip').addEventListener('click', () => {
          if (state.step === 3) {
            state.combatEnabled = false;
            $('combat-enabled').checked = false;
            $('combat-content').hidden = true;
          }
          if (state.step === 4) {
            state.mindscapeEnabled = false;
            $('mindscape-enabled').checked = false;
            $('mindscape-content').hidden = true;
          }
          if (state.step === 1 && M.validation(state, 1).length) {
            showErrors(M.validation(state, 1));
            return;
          }
          changed();
          go(state.step + 1);
        });
        $('agent-form').addEventListener('submit', (e) => e.preventDefault());
        function imagePicker(kind) {
          const box = $(kind + '-picker'),
            icon = M.iconKinds.includes(kind),
            pngOnly = M.pngKinds.includes(kind),
            allowWiki = !pngOnly;
          const label = {
            portrait: 'Portrait',
            mindscape: 'Mindscape artwork',
            titleIcon: 'Title badge icon',
            attributeIcon: 'Custom attribute icon',
            factionIcon: 'Custom faction icon',
          }[kind];
          const noun = icon ? 'icon' : 'image';
          box.innerHTML =
            '<div class="image-methods"' +
            (allowWiki ? '' : ' hidden') +
            '><button type="button" data-method="local" aria-pressed="true">From your device</button><button type="button" data-method="wiki" aria-pressed="false">Existing wiki ' +
            noun +
            '</button></div><div class="image-local"><div class="image-drop"><div class="image-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/></svg></div><div class="image-info"><strong data-image-name>No ' +
            noun +
            ' selected</strong><small data-image-description></small><div class="image-buttons"><button type="button" class="wds-button wds-is-secondary" data-choose>Choose ' +
            (pngOnly ? 'PNG icon' : noun) +
            '</button><button type="button" class="wds-button wds-is-text wds-is-secondary" data-remove hidden>Remove ' +
            noun +
            '</button></div></div></div><input type="file" accept="' +
            (pngOnly ? 'image/png' : 'image/png,image/jpeg,image/webp,image/gif') +
            '" hidden aria-label="' +
            label +
            ' file"></div><div class="image-wiki" hidden></div><small class="image-status" role="status"></small>';
          const wiki = box.querySelector('.image-wiki');
          if (allowWiki)
            field(
              wiki,
              kind + '-wiki',
              'Existing ' + label.toLowerCase() + ' filename',
              icon
                ? 'e.g. Onironi The Night Horror Icon Black.png'
                : 'e.g. Agent Your Agent Portrait.png',
              { full: true, help: 'Use a file already on this wiki, without the File: prefix.' },
              {
                get: () => state.images[kind].wikiName || '',
                set: (value) => {
                  state.images[kind] = { ...state.images[kind], mode: 'wiki', wikiName: value };
                },
              }
            );
          function method(value) {
            box.querySelector('.image-local').hidden = value === 'wiki';
            wiki.hidden = value !== 'wiki';
            box
              .querySelectorAll('[data-method]')
              .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.method === value)));
          }
          box.querySelectorAll('[data-method]').forEach((b) =>
            b.addEventListener('click', () => {
              method(b.dataset.method);
              state.images[kind].mode =
                b.dataset.method === 'wiki' ? 'wiki' : pictures.has(kind) ? 'local' : 'none';
              changed();
            })
          );
          const input = box.querySelector('input[type=file]');
          box.querySelector('[data-choose]').addEventListener('click', () => input.click());
          input.addEventListener('change', () => {
            if (input.files[0]) attach(kind, input.files[0]);
            input.value = '';
          });
          box.querySelector('[data-remove]').addEventListener('click', async () => {
            await imageStore(kind, null).catch(() => {});
            pictures.delete(kind);
            if (urls.has(kind)) URL.revokeObjectURL(urls.get(kind));
            urls.delete(kind);
            state.images[kind] = { mode: 'none' };
            imageMessages.delete(kind);
            box.querySelector('.image-thumb').replaceChildren();
            changed();
          });
          const drop = box.querySelector('.image-drop');
          drop.addEventListener('dragover', (e) => {
            e.preventDefault();
            drop.classList.add('is-dragging');
          });
          drop.addEventListener('dragleave', () => drop.classList.remove('is-dragging'));
          drop.addEventListener('drop', (e) => {
            e.preventDefault();
            drop.classList.remove('is-dragging');
            if (e.dataTransfer.files[0]) attach(kind, e.dataTransfer.files[0]);
          });
          method(allowWiki && state.images[kind].mode === 'wiki' ? 'wiki' : 'local');
          renderImageInfo(kind);
        }
        async function attach(kind, file) {
          const box = $(kind + '-picker'),
            status = box.querySelector('.image-status');
          try {
            if (M.pngKinds.includes(kind) && file.type !== 'image/png')
              throw Error(
                'Choose a PNG icon. The wiki uses PNG files for custom attribute and faction icons.'
              );
            if (!['image/png', 'image/jpeg', 'image/webp', 'image/gif'].includes(file.type))
              throw Error('Choose a PNG, JPG, WebP or GIF image.');
            if (file.size > 10 * 1024 * 1024)
              throw Error('This image is larger than 10 MB. Choose a smaller copy.');
            const url = URL.createObjectURL(file),
              img = new Image();
            try {
              img.src = url;
              await img.decode();
              if (img.naturalWidth * img.naturalHeight > 12500000)
                throw Error('This image exceeds 12.5 million pixels. Choose a smaller copy.');
            } catch (e) {
              URL.revokeObjectURL(url);
              throw Error(
                e.message.includes('pixels')
                  ? e.message
                  : 'This file could not be opened as an image.'
              );
            }
            if (urls.has(kind)) URL.revokeObjectURL(urls.get(kind));
            urls.set(kind, url);
            pictures.set(kind, file);
            state.images[kind] = {
              mode: 'local',
              originalName: file.name,
              type: file.type,
              size: file.size,
              width: img.naturalWidth,
              height: img.naturalHeight,
              persisted: false,
            };
            imageMessages.delete(kind);
            try {
              await imageStore(kind, file);
              state.images[kind].persisted = true;
              imageMessages.set(kind, {
                text: 'Image saved on this device. It has not been uploaded to the wiki.',
                error: false,
              });
            } catch {
              imageMessages.set(kind, {
                text: 'Image selected for this session. Device storage could not save it; choose it again after reloading.',
                error: true,
              });
            }
            changed();
          } catch (e) {
            imageMessages.set(kind, { text: e.message, error: true });
            renderImageInfo(kind);
          }
        }
        function renderImageInfo(kind) {
          const box = $(kind + '-picker');
          if (!box?.querySelector('[data-image-name]')) return;
          const picture = state.images[kind] || {},
            local = picture.mode === 'local',
            icon = M.iconKinds.includes(kind),
            noun = icon ? 'icon' : 'image';
          box.querySelector('[data-image-name]').textContent = local
            ? M.filename(state, kind)
            : 'No ' + noun + ' selected';
          box.querySelector('[data-image-description]').textContent = local
            ? picture.width +
              ' × ' +
              picture.height +
              ' · ' +
              (picture.size / 1024 / 1024).toFixed(1) +
              ' MB'
            : (M.pngKinds.includes(kind) ? 'PNG icon' : 'PNG, JPG, WebP or GIF') +
              ' · up to 10 MB. Choose a file or drop it here.';
          const thumb = box.querySelector('.image-thumb');
          if (local && urls.has(kind)) {
            let img = thumb.querySelector('img');
            if (!img) {
              img = new Image();
              thumb.replaceChildren(img);
            }
            img.src = urls.get(kind);
            img.alt = (state.values.name || 'Agent') + ' ' + kind + ' preview';
          } else if (thumb.querySelector('img')) thumb.replaceChildren();
          box.querySelector('[data-remove]').hidden = !local;
          const message = imageMessages.get(kind) || {
            text: local
              ? 'Saved on this device. This ' + noun + ' has not been uploaded to the wiki.'
              : picture.mode === 'wiki'
                ? 'This file will be read from the wiki for preview.'
                : 'Your ' + noun + ' stays on this device until you create the agent.',
            error: false,
          };
          box.querySelector('.image-status').textContent = message.text;
          box.querySelector('.image-status').dataset.error = String(message.error);
        }
        imagePicker('portrait');
        imagePicker('mindscape');
        imagePicker('titleIcon');
        identityUI = window.AgentIdentityControls.mount({
          state,
          field,
          element,
          imagePicker,
          changed,
          urls,
        });
        function renderSkills() {
          const list = $('skill-list');
          list.replaceChildren();
          state.skills.forEach((skill, index) => {
            const box = element('div', 'skill-entry'),
              head = element('div', 'entry-heading'),
              remove = element('button', 'wds-button wds-is-text wds-is-secondary', 'Remove');
            remove.type = 'button';
            remove.setAttribute('aria-label', 'Remove skill ' + (index + 1));
            remove.addEventListener('click', () => {
              state.skills.splice(index, 1);
              renderSkills();
              changed();
            });
            head.append(element('h3', null, 'Skill ' + (index + 1)), remove);
            const fields = element('div', 'fields');
            box.append(head, fields);
            for (const [key, label, placeholder, opt] of [
              ['name', 'Skill name', 'e.g. Special Delivery', { full: true }],
              ['type', 'Primary type', '', { options: M.skillTypes }],
              [
                'secondary',
                'Secondary type',
                'e.g. Ultimate or Core Passive',
                { optional: true, list: 'secondary-skill-types' },
              ],
              [
                'description',
                'What does this skill do?',
                'Describe the attack, effect or special rules.',
                { rows: 5, full: true },
              ],
            ])
              field(fields, 'skill-' + index + '-' + key, label, placeholder, opt, {
                get: () => skill[key] || '',
                set: (value) => (skill[key] = value),
              });
            list.append(box);
          });
        }
        $('add-skill').addEventListener('click', () => {
          state.skills.push({ type: 'Basic Attack', secondary: '', name: '', description: '' });
          renderSkills();
          changed();
          $('field-skill-' + (state.skills.length - 1) + '-name').focus();
        });
        renderSkills();
        $('combat-enabled').checked = state.combatEnabled;
        $('combat-content').hidden = !state.combatEnabled;
        $('combat-enabled').addEventListener('change', () => {
          state.combatEnabled = $('combat-enabled').checked;
          $('combat-content').hidden = !state.combatEnabled;
          changed();
        });
        for (let i = 0; i < 6; i++) {
          const b = element('button', 'wds-button wds-is-secondary', String(i + 1));
          b.type = 'button';
          b.id = 'awakening-tab-' + i;
          b.role = 'tab';
          b.setAttribute('aria-controls', 'awakening-panel-' + i);
          b.addEventListener('click', () => {
            chooseCinema(i);
            save();
          });
          $('mindscape-tabs').append(b);
          const panel = element('div', 'fields');
          panel.id = 'awakening-panel-' + i;
          panel.role = 'tabpanel';
          panel.setAttribute('aria-labelledby', b.id);
          for (const [key, label, placeholder, opt] of [
            [
              'title',
              'Awakening ' + (i + 1) + ' title',
              'A name for this awakening',
              { full: true },
            ],
            [
              'story',
              'Memory / story',
              'The moment behind this awakening.',
              { rows: 4, full: true, optional: true },
            ],
            [
              'effect',
              'Gameplay effect',
              'What changes when it is unlocked?',
              { rows: 4, full: true },
            ],
          ])
            field(panel, 'mindscape-' + i + '-' + key, label, placeholder, opt, {
              get: () => state.mindscapes[i][key],
              set: (value) => (state.mindscapes[i][key] = value),
            });
          $('mindscape-editors').append(panel);
        }
        function chooseCinema(index) {
          state.cinema = index;
          for (let i = 0; i < 6; i++) {
            const b = $('awakening-tab-' + i);
            b.setAttribute('aria-selected', String(i === index));
            b.tabIndex = i === index ? 0 : -1;
            b.classList.toggle('wds-is-secondary', i !== index);
            $('awakening-panel-' + i).hidden = i !== index;
          }
        }
        $('mindscape-tabs').addEventListener('keydown', (e) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
          e.preventDefault();
          chooseCinema(
            e.key === 'Home'
              ? 0
              : e.key === 'End'
                ? 5
                : (state.cinema + (e.key === 'ArrowRight' ? 1 : 5)) % 6
          );
          $('awakening-tab-' + state.cinema).focus();
          save();
        });
        chooseCinema(state.cinema);
        $('mindscape-enabled').checked = state.mindscapeEnabled;
        $('mindscape-content').hidden = !state.mindscapeEnabled;
        $('mindscape-enabled').addEventListener('change', () => {
          state.mindscapeEnabled = $('mindscape-enabled').checked;
          $('mindscape-content').hidden = !state.mindscapeEnabled;
          changed();
        });
        function renderSummary() {
          const summary = $('review-summary');
          summary.replaceChildren();
          const v = state.values;
          for (const [title, detail, step] of [
            [
              v.name || 'Agent name needed',
              [v.rank && v.rank + '-Rank', M.attribute(state), v.specialty, M.faction(state)]
                .filter(Boolean)
                .join(' · ') || 'Complete the required basics first.',
              0,
            ],
            [
              'Profile & portrait',
              M.filename(state, 'portrait') || 'No portrait selected · optional',
              1,
            ],
            [
              'Introduction',
              v.quote?.trim()
                ? 'Character quote and introduction included'
                : 'Suggested opening will be used',
              2,
            ],
            [
              'Combat',
              state.combatEnabled
                ? state.skills.length +
                  (state.skills.length === 1 ? ' skill entry' : ' skill entries') +
                  (state.promotions?.enabled
                    ? ' · 12 stat rows included'
                    : v.hp
                      ? ' · base stats included'
                      : '')
                : 'Skipped · can be added later',
              3,
            ],
            [
              'Mindscape Cinema',
              state.mindscapeEnabled
                ? state.mindscapes.filter(
                    (m) => m.title.trim() && window.AgentRichWiki.hasContent(m.effect)
                  ).length + ' of 6 awakenings complete'
                : 'Skipped · can be added later',
              4,
            ],
          ]) {
            const row = element('div', 'review-card'),
              text = element('div'),
              edit = element('button', 'wds-button wds-is-text wds-is-secondary', 'Edit');
            text.append(element('strong', null, title), element('small', null, detail));
            edit.type = 'button';
            edit.setAttribute('aria-label', 'Edit ' + (step === 0 ? 'agent basics' : title));
            edit.addEventListener('click', () => {
              clearErrors();
              showStep(step);
            });
            row.append(text, edit);
            summary.append(row);
          }
          summary.append(
            element('small', null, 'Page tabs: Overview · Lore · DMs · Fashion · Media')
          );
          const errors = M.allErrors(state);
          $('review-errors').hidden = !errors.length;
          $('review-errors').textContent = errors.length
            ? 'There are ' +
              errors.length +
              ' details to check. Use Edit to return to the relevant step.'
            : '';
          $('page-source').value = M.source(state);
          $('mindscape-progress').textContent =
            state.mindscapes.filter(
              (m) => m.title.trim() && window.AgentRichWiki.hasContent(m.effect)
            ).length + ' / 6 complete';
        }
        function activateTabs(container) {
          container.querySelectorAll('.pi-section-navigation').forEach((nav) => {
            nav.querySelectorAll('.pi-section-tab').forEach((tab) =>
              tab.addEventListener('click', () => {
                const group = tab.closest('.pi-section-navigation'),
                  panel = group.parentElement;
                group
                  .querySelectorAll('.pi-section-tab')
                  .forEach((t) => t.classList.toggle('pi-section-active', t === tab));
                panel
                  .querySelectorAll(':scope > .pi-section-content')
                  .forEach((content, i) =>
                    content.classList.toggle(
                      'pi-section-active',
                      i === [...group.children].indexOf(tab)
                    )
                  );
              })
            );
          });
        }
        const dialog = $('preview-dialog');
        async function preview(mode, opener) {
          previewMode = mode;
          returnFocus = opener || returnFocus;
          dialog.classList.toggle('card-only', mode === 'card');
          $('preview-kind').textContent =
            mode === 'card'
              ? 'Card preview'
              : mode === 'core'
                ? 'Core Skill Enhancement'
                : 'Main page preview';
          $('preview-heading').textContent = state.values.name || 'Your agent';
          $('preview-content').replaceChildren();
          $('preview-status').textContent = 'Preparing the preview with the wiki’s templates…';
          $('retry-preview').hidden = true;
          if (!dialog.open) dialog.showModal();
          $('close-preview').focus();
          const id = ++requestId;
          const snapshot = JSON.stringify(state);
          try {
            let title = 'New agent';
            try {
              title = M.pageName(state.values.name);
            } catch {}
            const result = await publisher.parse(M.previewText(state, mode), title);
            if (!result.parse?.text) throw Error('The preview could not be loaded.');
            if (result.parse.modulestyles?.length) mw.loader.load(result.parse.modulestyles);
            if (id !== requestId || !dialog.open) return;
            if (snapshot !== JSON.stringify(state)) {
              throw Error('Your draft changed. Open the preview again to see the latest version.');
            }
            const doc = new DOMParser().parseFromString(result.parse.text, 'text/html');
            doc.querySelectorAll('script').forEach((s) => s.remove());
            const host = $('preview-content');
            if (mode === 'card') {
              const infobox = doc.querySelector('.portable-infobox');
              if (!infobox) throw Error('The wiki returned no agent card.');
              host.append(infobox);
            } else host.append(...doc.body.childNodes);
            host.querySelectorAll('a[href]').forEach((a) => {
              const href = a.getAttribute('href');
              if (href.startsWith('#')) return;
              a.href = new URL(href, 'https://zenless-zone-zero-fanon.fandom.com').href;
              a.target = '_blank';
              a.rel = 'noopener';
            });
            host.querySelectorAll('img').forEach((img) => {
              const src = img.getAttribute('data-src');
              if (src) img.src = new URL(src, 'https://zenless-zone-zero-fanon.fandom.com').href;
              const srcset = img.getAttribute('data-srcset');
              if (srcset) img.srcset = srcset;
              img.removeAttribute('data-src');
              img.removeAttribute('data-srcset');
              img.classList.remove('lazyload');
              img.loading = 'eager';
            });
            for (const key of ['attribute', 'faction']) {
              const helper =
                host.querySelector('.agent-preview-custom-' + key) ||
                doc.querySelector('.agent-preview-custom-' + key);
              const slot =
                host.querySelector('.pi-data-value[data-source="' + key + '"]') ||
                host.querySelector('[data-source="' + key + '"] .pi-data-value');
              if (helper && slot) slot.replaceChildren(...helper.childNodes);
              helper?.remove();
            }
            const targets = {
              portrait: '.portable-infobox .pi-image img',
              mindscape: '.msp-bg img',
              titleIcon: '[data-item-name="secondary_title"] img',
              attributeIcon:
                '.pi-data-value[data-source="attribute"] img,[data-source="attribute"] .pi-data-value img',
              factionIcon:
                '.pi-data-value[data-source="faction"] img,[data-source="faction"] .pi-data-value img',
            };
            for (const kind of M.activeImageKinds(state))
              if (state.images[kind]?.mode === 'local' && urls.has(kind))
                host.querySelectorAll(targets[kind]).forEach((img) => {
                  img.src = urls.get(kind);
                  img.removeAttribute('srcset');
                  img.removeAttribute('height');
                  img.style.height = 'auto';
                  img.alt =
                    kind === 'attributeIcon'
                      ? M.attribute(state)
                      : kind === 'factionIcon'
                        ? M.faction(state)
                        : kind === 'titleIcon'
                          ? state.values.epithet
                          : (state.values.name || 'Agent') + ' ' + kind;
                  const link = img.closest('a');
                  if (link) {
                    link.removeAttribute('href');
                    link.removeAttribute('target');
                  }
                });
            if (host.querySelector('.error,.scribunto-error'))
              throw Error(
                'The wiki reported a template error. Check the highlighted section before creating the page.'
              );
            if (mode === 'page') {
              approved = stamp();
              publicationReview();
              publishingStatus(
                'Preview ready. Create agent pages will publish the pages and images listed above.'
              );
            }
            activateTabs(host);
            window.AgentNativePreview.activate(host);
            const localImage =
              mode !== 'core' &&
              M.activeImageKinds(state).some((k) => state.images[k]?.mode === 'local');
            $('preview-status').textContent = localImage
              ? 'Wiki templates with your local image preview. No image or page has been published.'
              : 'Rendered with the wiki’s templates. No page has been published.';
          } catch (e) {
            if (id !== requestId) return;
            $('preview-status').textContent = 'Preview unavailable: ' + e.message;
            $('retry-preview').hidden = false;
          }
        }
        $('preview-card').addEventListener('click', () => preview('card', $('preview-card')));
        $('preview-page').addEventListener('click', () => {
          const errors = M.allErrors(state);
          if (errors.length) {
            showErrors(errors);
            return;
          }
          preview('page', $('preview-page'));
        });
        $('retry-preview').addEventListener('click', () => preview(previewMode));
        $('close-preview').addEventListener('click', () => dialog.close());
        dialog.addEventListener('close', () => {
          requestId++;
          returnFocus?.focus({ preventScroll: true });
        });
        dialog.addEventListener('click', (e) => {
          if (e.target === dialog) {
            const r = dialog.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              dialog.close();
          }
        });
        $('finish-draft').addEventListener('click', publishDraft);
        coreUI = window.AgentCombatControls.mount({
          state,
          field,
          element,
          changed,
          preview: (opener) => {
            const errors = window.AgentCombat.errors(state);
            if (errors.length) {
              showErrors(errors);
              return;
            }
            preview('core', opener);
          },
        });
        schemaUI = window.AgentSchemaControls.mount({ state, field, element, changed });
        for (const name of window.AgentWikiPublisher.subpages) {
          const label = element('label', 'small-switch'),
            input = element('input');
          input.type = 'checkbox';
          input.checked = state.subpages[name];
          input.id = 'create-subpage-' + name.toLowerCase();
          input.addEventListener('change', () => {
            state.subpages[name] = input.checked;
            changed();
          });
          label.append(input, document.createTextNode(' ' + name));
          $('subpage-fields').append(label);
        }
        field(
          $('image-credits-fields'),
          'imageCredits',
          'Image source, credits and license',
          'Artist/source URL and permission or license for the selected artwork',
          { rows: 3, full: true }
        );
        $('starter-sentence').textContent = M.opening(state);
        $('page-source').value = M.source(state);
        renderSummary();
        showStep(state.step, false);
        if (state.publication?.complete)
          publishingStatus(
            'This draft created ' +
              state.publication.title +
              '. Continue editing on the agent page.'
          );
        publicationReview();
        window.AgentChoices.mount(root);
        window.AgentRichEditor.mount(root);
      })();
    });
  });
})();
/* </nowiki> */