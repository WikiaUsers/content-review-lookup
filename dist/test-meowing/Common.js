$(function() {
    // Only load on pages that have the slider container
    if ($('#pjsekai-slider-container').length) {
        // Load React dependencies
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:React.js',
                'u:dev:MediaWiki:ReactDOM.js'
            ]
        }, {
            type: 'style',
            articles: [
                'u:dev:MediaWiki:SliderStyles.css'
            ]
        });
        
        // Wait for React to load
        window.dev = window.dev || {};
        window.dev.reactSlider = window.dev.reactSlider || {
            loaded: false,
            callbacks: []
        };
        
        if (window.dev.reactSlider.loaded) {
            initSlider();
        } else {
            window.dev.reactSlider.callbacks.push(initSlider);
        }
    }
});

function initSlider() {
    // Create React component
    const ProjectSekaiSlider = function() {
        const [currentSlide, setCurrentSlide] = React.useState(0);
        const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
        const sliderRef = React.useRef(null);
        const intervalRef = React.useRef();
        
        // Your banner configuration
        const banners = [
            { page: 'Creators_Festa_2025', image: 'path/to/bnr_creatorsfesta2025.png' },
            { page: '4th_Anniversary', image: 'path/to/bnr_4th.png' },
            { page: 'Movie', image: 'path/to/bnr_movie.png' },
            { page: 'Webstore', image: 'path/to/bnr_webstore_open.png' },
            { page: 'Sekarai_4th', image: 'path/to/bnr_sekarai4th.png' },
            { page: 'Tournament_Support', image: 'path/to/bnr_tournament_support.png' }
        ];
        
        // Rest of your component logic...
        // (Copy all the React component code here, but:
        // 1. Change import statements to React.useState, React.useEffect etc.
        // 2. Remove TypeScript type annotations
        // 3. Use mw.config.get('wgScriptPath') for paths)
        
        return (
            // Your JSX return statement
        );
    };