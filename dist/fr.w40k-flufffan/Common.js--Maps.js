// This applies to ALL maps
window.mapsExtendedConfig =
{
	sortMarkers: "unsorted",
	enableFullscreen: true,
	fullscreenMode: "window",
	enableSearch: true,
}
// This applies to specific maps
window.mapsExtendedConfigs = 
{
    "Galaxie": {
    	enableSidebar: true,
    	sidebarInitialState: "hide",
        categoryGroups:
    	[
        	{
            	label: "Imperium",
            	collapsed: true,
            	children: [ "Adepta Sororitas", "Adeptus Astartes", "Adeptus Mechanicus", "Adeptus Ministorum", "Astra Militarum", "Collegia Titanica", "Inquisition", "Libre-Marchand", "Questor Imperialis", "Serres de l'Empereur",
            		{
                		"label": "Flottes",
                		"children": [ "Flotte Imp\u00e9riale", "Force A\u00e9rienne Imp\u00e9riale" ],
                		"hidden": true
            		}
            	]
        	},
        	{
            	label: "Chaos",
            	collapsed: true,
            	children: [ "Hereticus Astartes", "Mechanicum Noir", "Legiones Daemonica", "Perdus et Damn\u00e9s", "Questor Traitoris", "Titanicus Traitoris",
            	    {
                		"label": "Flottes",
                		"children": [ "Flotte Chaotique", "Force A\u00e9rienne Chaotique" ],
                		"hidden": true
            		}
            	]
        	},
        	{
            	label: "Xenos",
            	collapsed: true,
            	children: [ "Anhrathe", "Arlequin", "Asuryani", "Drukhari", "Exodite", "Ynnari", "Empire T'au", "Ligue de Votann", "N\u00e9cron", "Orks", "Culte G\u00e9novore", "Tyranides", "Xenos",
            	    {
                		"label": "Flottes",
                		"children": [ "Flotte Xenos", "Force A\u00e9rienne Xenos" ],
                		"hidden": true
            		}
            	]
        	},
        	{
            	label: "Autres Factions",
            	collapsed: true,
            	children: [ "Sécessionniste" ]
        	},
        	{
            	label: "G\u00e9ographie",
            	collapsed: true,
            	children: [ "Secteur", "Sous-Secteur", "Syst\u00e8me", "Monde", "Station Spatiale", "B\u00e2timent" ]
        	},
        	{
            	label: "Autres Elements",
            	collapsed: true,
            	children: [ "Campagne", "Gang", "Institution Plan\u00e9taire", "Kill Team", "Vaisseau Spatial", "Autres" ]
        	}
    	]
    }
}