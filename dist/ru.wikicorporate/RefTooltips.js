const cloneReferences = () => {
    const refs = document.querySelectorAll('[id^="cite_ref"]');
    
    refs.forEach(ref => {
        const hash = ref.querySelector('a')?.hash;
        if (!hash) return;

        const targetId = decodeURIComponent(hash.substring(1));
        const targetNode = document.getElementById(targetId);
        const targetElement = targetNode?.querySelector('.reference-text');

        if (targetElement) {
            ref.appendChild(targetElement.cloneNode(true));
        }
    });
};

if (document.querySelector('[id^="cite_ref"]')) {
    cloneReferences();
} else {
    const observer = new MutationObserver(() => {
        if (document.querySelector('[id^="cite_ref"]')) {
            observer.disconnect(); 
            cloneReferences();
        }
    });

    const config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(document.body, config);
}