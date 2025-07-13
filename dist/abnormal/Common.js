/* Any JavaScript here will be loaded for all users on every page load. */
document.addEventListener('DOMContentLoaded', () => {
    const tooltipContainers = document.querySelectorAll('.advanced-tooltip');
    tooltipContainers.forEach(container => {
        const tooltipContent = container.querySelector('.tooltip-contents');
        if (tooltipContent) {
            tooltipContent.classList.add('hidden');
            container.addEventListener('mouseenter', () => {
                tooltipContent.classList.remove('hidden');
            });
            container.addEventListener('mouseleave', () => {
                tooltipContent.classList.add('hidden');
            });
        }
    });
});