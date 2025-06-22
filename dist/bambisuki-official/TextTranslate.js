function createTranslationItem(originalText, translatedText) {
    // Create the main container
    const container = document.createElement('div');
    container.className = 'translation-grid-item';
    container.style.cssText = `
        display: grid; 
        grid-template-columns: 1fr auto 1fr; 
        align-items: center; 
        background: linear-gradient(135deg, #ff0050, rgba(0, 0, 0, 0.5)); 
        color: white; 
        padding: 15px; 
        border-radius: 15px; 
        margin: 5px; 
        box-shadow: 0 4px 20px rgba(255, 0, 80, 0.25); 
        transition: all 0.3s ease; 
        cursor: pointer; 
        position: relative; 
        overflow: hidden;
    `;
    
    // Hover effects
    container.onmouseover = function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 25px rgba(255, 0, 80, 0.35)';
    };
    container.onmouseout = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(255, 0, 80, 0.25)';
    };
    
    // Original text div
    const originalDiv = document.createElement('div');
    originalDiv.className = 'original-side';
    originalDiv.style.cssText = 'text-align: center; font-size: 16px; font-weight: 600; padding: 5px;';
    originalDiv.textContent = originalText;
    
    // Toggle button
    const button = document.createElement('div');
    button.className = 'separator';
    button.style.cssText = `
        width: 40px; 
        height: 40px; 
        background: rgba(255, 255, 255, 0.2); 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 14px; 
        font-weight: bold; 
        cursor: pointer; 
        transition: all 0.3s ease; 
        backdrop-filter: blur(10px);
    `;
    button.textContent = 'Show';
    
    // Button hover effects
    button.onmouseover = function() {
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'scale(1.1)';
    };
    button.onmouseout = function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'scale(1)';
    };
    
    // Translated text div
    const translatedDiv = document.createElement('div');
    translatedDiv.className = 'translated-side';
    translatedDiv.style.cssText = 'text-align: center; font-size: 16px; font-weight: 600; padding: 5px; display: none;';
    translatedDiv.textContent = translatedText;
    
    // Button click functionality
    button.onclick = function() {
        if (translatedDiv.style.display === 'none' || !translatedDiv.style.display) {
            translatedDiv.style.display = 'block';
            this.textContent = 'Hide';
        } else {
            translatedDiv.style.display = 'none';
            this.textContent = 'Show';
        }
    };
    
    // Add all elements to container
    container.appendChild(originalDiv);
    container.appendChild(button);
    container.appendChild(translatedDiv);
    
    return container;
}

// How to use it:
// const translationItem = createTranslationItem("Hello", "Hola");
// document.body.appendChild(translationItem);