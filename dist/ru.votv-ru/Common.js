// Example configuration for MapsExtended - This applies to ALL maps
window.mapsExtendedConfig =
{
    sortMarkers: "unsorted",
    openPopupsOnHover: false,
    enableFullscreen: true,
    enableSidebar: true,
    sidebarOverlay: false,
    sidebarSide: "left",
    sidebarBehaviour: "autoInitial",
    sidebarInitialState: "show",
    fullscreenMode: "window",
    enableSearch: true,
    hiddenCategories: [ "examinable" ],
    disabledCategories: [],
    collectibleCategories: [ "poi", "container" ],
    categoryGroups:
    [
        {
            label: "General",
            children:
            [
                {
                    label: "Points of interest",
                    children: [ "poi", "exit", "examinable" ]
                }, 
                "trap"
            ]
        },
        {
            label: "Interactable",
            children: [ "npc", "container", "usable" ],
        }
    ]
};

// Example configuration for MapsExtended - This applies to specific maps
window.mapsExtendedConfigs = 
{
    "Castle": {
        collectibleCategories: [ "poi", "container", "enemies" ]
    },
    "Bridge": {
        collectibleCategories: [ "container" ],
        hiddenCategories: [ "poi" ]
    }
}

//Discord
window.DiscordBannerSettings = {
    bannerStyle: '4',
    inviteLink: 'CnREzhvGyw',
    prependToRail: true
};