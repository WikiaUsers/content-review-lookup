/* Any JavaScript here will be loaded for all users on every page load. */
/*Testing: Cursor changing while clicking*/
function change() {
    document.body.style.cursor="url('https://vignette.wikia.nocookie.net/dreamworks-school-of-dragons/images/c/c1/Wiki_cursor_2.png/revision/latest?cb=20190707175219'), auto";
}
/*end of testing*/
/*Back-to-Top*/
window.BackToTopModern = true;

/*Portal*/
mw.loader.using( ['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs 
= $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            setTimeout(function() {
    $(window).scroll();
}, 1000);
            return false;
        });
    });
});


mw.hook('wikipage.content').add(function($content){
    logToConsole("contentHook triggered.");
    if(pageContainsColorGuide()){
        colorGuide_initialize();
    }
});



function logToConsole(message){
    if(window.console && window.console.log){
        console.log(message);
    }
}


/*Color Guide*/
//-------------

/**
 * Utility function for checking whether all required colorGuide elements are present
 * @returns boolean value
 */
function pageContainsColorGuide(){
    var requiredElementStructure = {
        'colorPreviewCanvasHolder': ['detailImgSrc', 'colorImgSrc', 'canvasWidth', 'canvasHeight', 'style'],
        'primaryColorPickerHolder': ['style'],
        'secondaryColorPickerHolder': ['style'],
        'tertiaryColorPickerHolder': ['style'],
        'backgroundColorPickerHolder': ['style'],
        'colorGuideApplyColorButtonHolder': ['style'],
    };

    var foundElement, requiredId, requiredAttributes, i;
    for(requiredId in requiredElementStructure){
        foundElement = document.getElementById(requiredId);
        if(!foundElement){
            logToConsole("page is missing element: " + requiredId);
            return false;
        }
        requiredAttributes = requiredElementStructure[requiredId];
        if(!requiredAttributes){
            continue;
        }

        for(i = 0; i < requiredAttributes.length; i++){
            if(!(requiredAttributes[i] in foundElement.dataset)){
                logToConsole("page is missing attribute: " + requiredAttributes[i] + " in element: " + requiredId);
                return false;
            }
        }
    }
    return true;
}

function addColorPicker(divID, targetID, value){
    var div = document.getElementById(divID);
    if(!div){
        //div does not exist!
        return;
    }

    if(document.getElementById(targetID)){
        //exists already
        return;
    }

    //<input type="color" id="targetID" value="value">
    var picker = document.createElement("input");
    picker.id = targetID;
    picker.type = "color";
    picker.value = value;
    picker.style = div.dataset.style;
    div.appendChild(picker);
}

function addImageHolder(divID, targetID, srcAttr, onloadCallback){
    var div = document.getElementById(divID);
    if(!div || !(srcAttr in div.dataset)){
        //div does not exist or does not have srcAttr!
        return;
    }

    if(document.getElementById(targetID)){
        //exists already
        return;
    }

    var image = new Image();
    image.onload = onloadCallback;
    image.crossOrigin = "anonymous";
    image.style = "display:none";
    image.id = targetID;

    queryImageSource(div.dataset[srcAttr], function(data){
        if(data == null){
            logToConsole("image query callback data was undefined or null!");
            return;
        }

        var imageSource = getImageSource(data);
        if(imageSource == null){
            logToConsole("unabled to find imageSource in query result! (probably invalid fileName specified)");
            return;
        }

        image.src = imageSource;
        div.appendChild(image);
    });
}

function colorGuide_initialize(){
    if(!pageContainsColorGuide() || document.getElementById("colorPreviewCanvas")){
        return;
    }

    var canvasHolder = document.getElementById("colorPreviewCanvasHolder");
    var colorPreviewCanvas = document.createElement("CANVAS");
    colorPreviewCanvas.id = "colorPreviewCanvas";
    colorPreviewCanvas.style = canvasHolder.dataset.style;
    colorPreviewCanvas.width = canvasHolder.dataset.canvasWidth;
    colorPreviewCanvas.height = canvasHolder.dataset.canvasHeight;
    document.getElementById("colorPreviewCanvasHolder").appendChild(colorPreviewCanvas);

    var applyColorsButtonHolder = document.getElementById("colorGuideApplyColorButtonHolder");
    var applyColorsButton = document.createElement("input");
    applyColorsButton.id = "colorGuideApplyColorButton";
    applyColorsButton.type = "button";
    applyColorsButton.value = "Apply Colors";
    applyColorsButton.style = applyColorsButtonHolder.dataset.style;
    applyColorsButton.onclick = function(){
        colorGuide_updateCanvas();
    };
    applyColorsButtonHolder.appendChild(applyColorsButton);

    var imagesToLoad = 2;
    var onloadCallback = function(){
        imagesToLoad--;
        if(imagesToLoad <= 0){
            colorGuide_updateCanvas();
        }
    };

    addImageHolder("colorPreviewCanvasHolder", "detailRenderImage", "detailImgSrc", onloadCallback);
    addImageHolder("colorPreviewCanvasHolder", "colorRenderImage", "colorImgSrc", onloadCallback);

    addColorPicker("primaryColorPickerHolder", "primaryColorPicker", "#ff0000");
    addColorPicker("secondaryColorPickerHolder", "secondaryColorPicker", "#00ff00");
    addColorPicker("tertiaryColorPickerHolder", "tertiaryColorPicker", "#0000ff");
    addColorPicker("backgroundColorPickerHolder", "backgroundColorPicker", "transparent");
}

function colorGuide_updateCanvas(){
    var canvas = document.getElementById("colorPreviewCanvas");
    if(!canvas){
        return;
    }
    
    var detailCanvas = document.createElement("CANVAS");
    var colorCanvas = document.createElement("CANVAS");

    var detailImage = document.getElementById("detailRenderImage");
    var colorImage = document.getElementById("colorRenderImage");

    if(detailImage.width != colorImage.width || detailImage.height != colorImage.height){
        //unworkable textures
        return;
    }

    var targetDimensions = fitImageToCanvas(detailImage, canvas);
    canvas.width = targetDimensions.width;
    canvas.height = targetDimensions.height;
    loadImageToCanvas(detailImage, detailCanvas, targetDimensions);
    loadImageToCanvas(colorImage, colorCanvas, targetDimensions);

    if(allDimensionsMatching(targetDimensions, detailCanvas, colorCanvas, canvas)){
        var color1 = hexToRgb(document.getElementById("primaryColorPicker").value);
        var color2 = hexToRgb(document.getElementById("secondaryColorPicker").value);
        var color3 = hexToRgb(document.getElementById("tertiaryColorPicker").value);

        if(color1 == null || color2 == null || color3 == null){
            logToConsole("unable to parse colors from color pickers");
            return;
        }

        canvas.style.backgroundColor = document.getElementById("backgroundColorPicker").value;
        colorGuide_buildResultCanvasData(detailCanvas, colorCanvas, canvas, color1, color2, color3);
    }
}

/**
 * builds the displayCanvas given a loaded detail- and color-canvas, along with the target primary, secondary and tertiary colors
 * @param {*} detailCanvas a canvas with a loaded detail-texture-render image
 * @param {*} colorCanvas a canvas with a loaded color-mask-render image
 * @param {*} displayCanvas the canvas that is to be rendered to (must be same size as detailCanvas AND colorCanvas)
 * @param {*} primaryColor 
 * @param {*} secondaryColor 
 * @param {*} tertiaryColor 
 */
function colorGuide_buildResultCanvasData(detailCanvas, colorCanvas, displayCanvas, primaryColor, secondaryColor, tertiaryColor){
    var detailData = detailCanvas.getContext("2d").getImageData(0, 0, displayCanvas.width, displayCanvas.height);
    var colorData = colorCanvas.getContext("2d").getImageData(0, 0, displayCanvas.width, displayCanvas.height);
    var displayData = new ImageData(displayCanvas.width, displayCanvas.height);

    var redFactor, greenFactor, blueFactor, blackFactor, targetRed, targetGreen, targetBlue, detailRed, detailGreen, detailBlue;
    for(var i = 0; i < detailData.data.length; i += 4){
        redFactor = colorData.data[i] * 1.0 / 255;
        greenFactor = colorData.data[i + 1] * 1.0 / 255;
        blueFactor = colorData.data[i + 2] * 1.0 / 255;
        blackFactor = 1.0 - Math.min(redFactor + greenFactor + blueFactor, 1.0);

        targetRed = blackFactor * primaryColor.r + blueFactor * secondaryColor.r + greenFactor * tertiaryColor.r;
        targetGreen = blackFactor * primaryColor.g + blueFactor * secondaryColor.g + greenFactor * tertiaryColor.g;
        targetBlue = blackFactor * primaryColor.b + blueFactor * secondaryColor.b + greenFactor * tertiaryColor.b;

        detailRed = detailData.data[i];
        detailGreen = detailData.data[i + 1];
        detailBlue = detailData.data[i + 2];

        displayData.data[i] = detailRed * lerp(targetRed, detailRed, redFactor) / 255;
        displayData.data[i + 1] = detailGreen * lerp(targetGreen, detailGreen, redFactor) / 255;
        displayData.data[i + 2] = detailBlue * lerp(targetBlue, detailBlue, redFactor) / 255;
        displayData.data[i + 3] = detailData.data[i + 3];
    }

    displayCanvas.getContext("2d").putImageData(displayData, 0, 0);
}



/*Utility functions (mostly just for the color guide)*/
//-----------------------------------------------------

/**
 * validates that all passed canvases have the same dimensions as targetDimensions
 * @param {*} targetDimensions 
 * @param {*} arguments variable amount of canvases to be checked
 * @returns boolean value, true when all Dimensions match, false when they don't
 */
function allDimensionsMatching(targetDimensions){
    for(var i = 1; i < arguments.length; i++){
        if(arguments[i].width != targetDimensions.width){
            return false;
        }
        if(arguments[i].height != targetDimensions.height){
            return false;
        }
    }
    return true;
}

/**
 * works just like unity's lerp (minus the clamping)
 * @param {*} a startValue (mapped to t = 0)
 * @param {*} b endValue (mapped to t = 1)
 * @param {*} t 
 * @returns the value of f(t) given f(0) = a and f(1) = b, where f is a linear function
 */
function lerp(a, b, t){
    return a + ((b - a) * t);
}

/**
 * takes a hex color (#rrggbb) and turns it into an rgb object
 * @param {*} hex 
 * @returns null if the hex color was invalid or an object containing keys{'r', 'g', 'b'}
 */
function hexToRgb(hex){
    var result = /^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/**
 * uses the mediaWiki api to acquire an object containing the url of an image-file from the wiki
 * @param {*} imageName fileName of the image to find
 * @param {*} callback function to be called with the queried json object
 */
function queryImageSource(imageName, callback){
    var api = new mw.Api();
    api.get( {
        action: 'query',
        titles: imageName,
        prop: 'imageinfo',
        iiprop: 'url',
        format: 'json'
    } )
    .done(callback)
    .fail(function(jqXHR, textStatus, errorThrown){
        logToConsole("query failed, error: " + errorThrown);
    });
}

/**
 * acquires the image url from a (json) data-object obtained by using `queryImageSource`
 * @param {*} data json data object containing the path `query.pages.{pageid}.imageinfo[0].url`
 * @returns url of image or null if path not found
 */
function getImageSource(data){
    if(!data.hasOwnProperty('query') || !data.query.hasOwnProperty('pages') || Object.keys(data.query.pages).length <= 0){
        return null;
    }

    var pageKeys = Object.keys(data.query.pages);
    if(pageKeys.length <= 0){
        return null;
    }

    //we only expect one page, so just get whatever the first page happens to be
    var page = data.query.pages[pageKeys[0]];
    if(!page.hasOwnProperty('imageinfo') || page.imageinfo.length <= 0 || !page.imageinfo[0].hasOwnProperty('url')){
        return null;
    }

    return page.imageinfo[0].url;
}

/**
 * determines the dimensions of the image with the maximal surface area fitting into the canvas
 * @param {*} image 
 * @param {*} canvas 
 * @returns the target dimensions of the image scaled to fit the canvas
 */
function fitImageToCanvas(image, canvas){
    var ratio = image.width / image.height;
    var targetHeight = canvas.height;
    var targetWidth = canvas.height * ratio;
    if(targetWidth > canvas.width){
        targetWidth = canvas.width;
        targetHeight = canvas.width / ratio;
    }
    return {
        width: Math.floor(targetWidth),
        height: Math.floor(targetHeight)
    };
}

/**
 * loads an image to the canvas and rescales both to the targetDimensions
 * @param {*} image 
 * @param {*} canvas 
 * @param {*} dimensions (obtained from fitImageToCanvas())
 */
function loadImageToCanvas(image, canvas, dimensions){
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, dimensions.width, dimensions.height);
}