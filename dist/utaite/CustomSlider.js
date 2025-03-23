/*=======================================================================
Originally brought from DEV Wiki.
Original author: https://dev.fandom.com/wiki/User:TRJ-VoRoN
Customizer: https://utaite.fandom.com/wiki/User:Makudoumee
=======================================================================*/

(function ($, mw) {
    'use strict';
    // Create a global namespace for the slider
    window.SliderControl = {
        SlideNow: 1,
        SlideCount: 0,
        SlideInterval: 0,
        TranslateWidth: 0,
        TimerPause: false,
        ele: null,
        isVertical: false,
        initialized: false,
        sliderWidth: null,
        
        // Function to go to next slide
        NextSlide: function() {
            var self = this;
            
            // Guard against invalid state
            if (!self.ele || !self.ele.sliderWrapper || self.SlideCount <= 0) {
                ////console.log('Skipping NextSlide: Invalid slider state');
                return;
            }
            
            ////console.log('NextSlide function called, current slide:', self.SlideNow, 'of', self.SlideCount);
            
            if (self.SlideNow === self.SlideCount || self.SlideNow > self.SlideCount) {
                ////console.log('Reached last slide or invalid state, resetting to first slide');
                self.ele.sliderWrapper.css('transform', 'translate(0, 0)');
                self.SlideNow = 1;
            } else {
                if (self.isVertical) {
                    self.TranslateWidth = -self.ele.sliderView.height() * (self.SlideNow);
                    self.ele.sliderWrapper.css({
                        'transform': 'translate(0, ' + self.TranslateWidth + 'px)',
                        '-webkit-transform': 'translate(0, ' + self.TranslateWidth + 'px)',
                        '-ms-transform': 'translate(0, ' + self.TranslateWidth + 'px)',
                    });
                } else {
                    self.TranslateWidth = -self.ele.sliderView.width() * (self.SlideNow);
                    self.ele.sliderWrapper.css({
                        'transform': 'translate(' + self.TranslateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + self.TranslateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + self.TranslateWidth + 'px, 0)',
                    });
                }
                self.SlideNow++;
            }
            
            if (self.ele.navBtns && self.ele.navBtns.children().length > 0) {
                var nextBtn = self.ele.navBtns.children().eq(self.SlideNow - 1);
                if (nextBtn.length > 0) {
                    self.SelectSlide(nextBtn);
                }
            }
        },
        
        // Function to select a slide
        SelectSlide: function(ActiveBtn) {
            var self = this;
            
            // Guard against invalid state
            if (!self.ele || !self.ele.navBtn || !ActiveBtn || ActiveBtn.length === 0) {
                ////console.log('Skipping SelectSlide: Invalid arguments');
                return;
            }
            
            ////console.log('SelectSlide function called for button at index:', ActiveBtn.index());
            $(window).trigger('scroll');
            
            // Remove all active classes
            ////console.log('Removing all active classes from navigation buttons');
            self.ele.navBtn.removeClass('nbActiveLeft');
            self.ele.navBtn.removeClass('nbActiveRight');
            self.ele.navBtn.removeClass('nbActiveTop');
            self.ele.navBtn.removeClass('nbActiveBottom');
            
            // Add appropriate active class based on navigation position
            if (self.ele.navBtns.hasClass('nmRight')) {
                ActiveBtn.addClass('nbActiveRight');
            } else if (self.ele.navBtns.hasClass('nmTop')) {
                ActiveBtn.addClass('nbActiveTop');
            } else if (self.ele.navBtns.hasClass('nmBottom')) {
                ActiveBtn.addClass('nbActiveBottom');
            } else {
                ActiveBtn.addClass('nbActiveLeft');
            }
        },
        
        // Parse slider data from the DOM
        parseSliderData: function() {
            var self = this;
            
            // Parse SliderData element for configuration
            var Slides = 0;
            var HeightSize = 'auto';
            var WidthSize = '100%';
            var CaptionPosition = 'bottom'; // Default caption position
            var Data = [];
            
            // Get SliderData content - try class attribute first, then text content
            var dataSource = (self.ele.sliderData.attr('class') || '').trim();
            
            // If class attribute doesn't contain valid data, try getting it from text content
            if (!dataSource || dataSource === '') {
                dataSource = self.ele.sliderData.text().trim();
            }
            
            //console.log('SliderData source:', dataSource);
            
            if (dataSource) {
                Data = dataSource.split('|');
            }
            
            // Parse slider data configuration
            if (Data.length >= 6) {
                // Format: SlideCount|Interval|Height|Orientation|Width|CaptionPosition
                Slides = parseInt(Data[0], 10);
                self.SlideInterval = parseInt(Data[1], 10);
                HeightSize = Data[2];
                self.isVertical = Data[3].toLowerCase() === 'down';
                WidthSize = Data[4];
                CaptionPosition = Data[5].toLowerCase();
                //console.log('Parsed SliderData (6 parts):', {
                //     Slides: Slides,
                //     SlideInterval: self.SlideInterval,
                //     HeightSize: HeightSize,
                //     isVertical: self.isVertical,
                //     WidthSize: WidthSize,
                //     CaptionPosition: CaptionPosition
                // });
            } else if (Data.length >= 5) {
                // Format: SlideCount|Interval|Height|Orientation|Width
                Slides = parseInt(Data[0], 10);
                self.SlideInterval = parseInt(Data[1], 10);
                HeightSize = Data[2];
                self.isVertical = Data[3].toLowerCase() === 'down';
                WidthSize = Data[4];
                // console.log('Parsed SliderData (5 parts):', {
                //     Slides: Slides,
                //     SlideInterval: self.SlideInterval,
                //     HeightSize: HeightSize,
                //     isVertical: self.isVertical,
                //     WidthSize: WidthSize,
                //     CaptionPosition: CaptionPosition
                // });
            } else if (Data.length === 4) {
                // Format: SlideCount|Interval|Height|Orientation
                Slides = parseInt(Data[0], 10);
                self.SlideInterval = parseInt(Data[1], 10);
                HeightSize = Data[2];
                self.isVertical = Data[3].toLowerCase() === 'down';
                // console.log('Parsed SliderData (4 parts):', {
                //     Slides: Slides,
                //     SlideInterval: self.SlideInterval,
                //     HeightSize: HeightSize,
                //     isVertical: self.isVertical,
                //     WidthSize: WidthSize,
                //     CaptionPosition: CaptionPosition
                // });
            } else if (Data.length === 3) {
                // Format: SlideCount|Interval|Height
                Slides = parseInt(Data[0], 10);
                self.SlideInterval = parseInt(Data[1], 10);
                HeightSize = Data[2];
                // console.log('Parsed SliderData (3 parts):', {
                //     Slides: Slides,
                //     SlideInterval: self.SlideInterval,
                //     HeightSize: HeightSize,
                //     isVertical: self.isVertical,
                //     WidthSize: WidthSize,
                //     CaptionPosition: CaptionPosition
                // });
            } else {
                //console.log('SliderData parsing issue - using direct slide count');
                // Fall back to counting slides directly
                Slides = self.ele.sld.length;
                //console.log('Direct slide count:', Slides);
            }
            
            // Always ensure we have a valid slide count
            if (isNaN(Slides) || Slides <= 0) {
                Slides = self.ele.sld.length;
                //console.log('Invalid slide count, using direct count:', Slides);
            }
            
            // Set default interval if invalid
            if (self.SlideInterval < 1000 || isNaN(self.SlideInterval)) {
                //console.log('SlideInterval invalid or too small, setting default 3000ms');
                self.SlideInterval = 3000;
            }
            
            // Validate caption position
            var validPositions = ['top', 'bottom', 'overlay'];
            if (validPositions.indexOf(CaptionPosition) === -1) {
                CaptionPosition = 'bottom';
                //console.log('Invalid caption position, defaulting to bottom');
            }
            
            self.SlideCount = Slides;
            self.sliderWidth = WidthSize;
            //console.log('Final slide count:', self.SlideCount, 'Width:', self.sliderWidth, 'Caption position:', CaptionPosition);
            
            return {
                slides: Slides,
                heightSize: HeightSize,
                widthSize: WidthSize,
                captionPosition: CaptionPosition
            };
        },
        
        // Add captions to slides based on data-desc attributes
		addCaptionsToSlides: function(captionPosition) {
		    var self = this;
		    
		    if (!self.ele || !self.ele.sld || self.ele.sld.length === 0) {
		        //console.log('Cannot add captions: Invalid elements');
		        return;
		    }
		    
		    //console.log('Adding captions with position:', captionPosition);
		    
		    // Process each slide
		    self.ele.sld.each(function(index) {
		        var slide = $(this);
		        var caption = slide.attr('data-desc');
		        
		        // Skip if no caption provided
		        if (!caption || caption.trim() === '') {
		            //console.log('No caption for slide', index);
		            return;
		        }
		        
		        // Remove any existing caption
		        slide.find('.slide-caption').remove();
		        
		        // Create caption element
		        var captionElement = $('<div class="slide-caption"></div>').text(caption);
		        
		        // Style caption based on position
		        captionElement.css({
		            'padding': '8px 12px',
		            'text-align': 'center',
		            'font-family': 'Arial, sans-serif',
		            'font-size': '14px',
		            'width': '100%',
		            'box-sizing': 'border-box',
		            'z-index': '100', // Very high z-index to ensure it's on top
		            'position': 'relative' // Required for z-index to work
		        });
		        
		        if (captionPosition === 'overlay') {
		            captionElement.css({
		                'position': 'absolute',
		                'bottom': '0',
		                'left': '0',
		                'background-color': 'rgba(0, 0, 0, 0.6)',
		                'color': 'white',
		                'z-index': '100' // Ensure it's above everything else
		            });
		            
		            // Ensure slide has position relative for absolute positioning
		            if (slide.css('position') !== 'relative' && slide.css('position') !== 'absolute') {
		                slide.css('position', 'relative');
		            }
		        } else if (captionPosition === 'top') {
		            captionElement.css({
		                'background-color': '#f5f5f5',
		                'color': '#333',
		                'border-bottom': '1px solid #ddd',
		                'z-index': '100' // Ensure it's above everything else
		            });
		            
		            // Add to top
		            slide.prepend(captionElement);
		        } else { // Default: bottom
		            captionElement.css({
		                'background-color': '#f5f5f5',
		                'color': '#333',
		                'border-top': '1px solid #ddd',
		                'z-index': '100' // Ensure it's above everything else
		            });
		            
		            // Add to bottom
		            slide.append(captionElement);
		        }
		        
		        // Add to slide if overlay (not yet added)
		        if (captionPosition === 'overlay') {
		            slide.append(captionElement);
		        }
		        
		        //console.log('Added caption to slide', index, ':', caption);
		    });
		},
        
        // Add links to slides based on data attributes
        addLinksToSlides: function() {
            var self = this;
            
            if (!self.ele || !self.ele.sld || self.ele.sld.length === 0) {
                //console.log('Cannot add links: Invalid elements');
                return;
            }
            
            //console.log('Adding links to slides');
            
            // Process each slide
            self.ele.sld.each(function(index) {
                var slide = $(this);
                
                // Get link attributes
                var slideLink = slide.attr('data-slider-link');
                var slideFandomWiki = slide.attr('data-slider-link-fandom-wiki');
                var slideExternalLink = slide.attr('data-slider-link-external');
                
                // Skip if no link attributes provided
                if ((!slideLink && !slideFandomWiki && !slideExternalLink) || 
                    (slideLink === "" && slideFandomWiki === "" && slideExternalLink === "")) {
                    //console.log('No link data for slide', index);
                    return;
                }
                
                // Determine the target URL based on the provided attributes
                var targetUrl = '';
                
                if (slideExternalLink && slideExternalLink !== "") {
                    // External link takes precedence
                    targetUrl = slideExternalLink;
                    // Add protocol if missing
                    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                        targetUrl = 'https://' + targetUrl;
                    }
                    //console.log('Using external link:', targetUrl);
                } else if (slideLink && slideLink !== "") {
                    // Internal Fandom link
                    if (slideFandomWiki && slideFandomWiki !== "") {
                        // Custom wiki
                        targetUrl = 'https://' + slideFandomWiki + '.fandom.com/wiki/' + slideLink;
                        //console.log('Using custom fandom wiki link:', targetUrl);
                    } else {
                        // Default to utaite wiki
                        targetUrl = 'https://utaite.fandom.com/wiki/' + slideLink;
                        //console.log('Using default utaite wiki link:', targetUrl);
                    }
                } else if (slideFandomWiki && slideFandomWiki !== "") {
                    // Just the Fandom wiki with no specific page
                    targetUrl = 'https://' + slideFandomWiki + '.fandom.com';
                    //console.log('Using fandom wiki home link:', targetUrl);
                }
                
                // If a target URL was determined, make the slide clickable
                if (targetUrl) {
                    // Add cursor style to indicate clickable
                    slide.css('cursor', 'pointer');
                    
                    // Make the entire slide clickable
                    slide.on('click', function(e) {
                        // Don't trigger if clicking on navigation buttons
                        if ($(e.target).closest('.NavBtn, #NavBtns').length === 0) {
                            window.location.href = targetUrl;
                        }
                    });
                    
                    //console.log('Made slide', index, 'clickable with link to', targetUrl);
                }
            });
        },
        
        // Center images without stretching
        centerImagesWithoutStretching: function(containerHeight, captionPosition) {
            var self = this;
            
            if (!self.ele || !self.ele.sld || self.ele.sld.length === 0) {
                //console.log('Cannot center images: Invalid elements');
                return;
            }
            
            //console.log('Centering images without stretching, container height:', containerHeight);
            
            // Process each slide
            self.ele.sld.each(function(index) {
                var slide = $(this);
                var img = slide.find('img').first();
                
                if (img.length === 0) return;
                
                // Calculate available height for image (accounting for caption if present)
                var captionHeight = 0;
                var caption = slide.find('.slide-caption');
                if (caption.length > 0 && (captionPosition === 'top' || captionPosition === 'bottom')) {
                    captionHeight = caption.outerHeight(true);
                }
                
                var availableHeight = containerHeight - captionHeight;
                
                // Set container styling
                slide.css({
                    'height': containerHeight + 'px',
                    'overflow': 'hidden',
                    'position': 'relative',
                    'text-align': 'center', // Center image horizontally
                    'display': 'block' // Changed from flex to support overlay captions better
                });
                
                // Create a div to center the image
                var imageContainer = slide.find('.image-container');
                if (imageContainer.length === 0) {
                    imageContainer = $('<div class="image-container"></div>');
                    // Insert before caption if bottom, after if top, or just append if overlay
                    if (captionPosition === 'bottom' && caption.length > 0) {
                        caption.before(imageContainer);
                    } else if (captionPosition === 'top' && caption.length > 0) {
                        caption.after(imageContainer);
                    } else {
                        slide.append(imageContainer);
                    }
                }
                
                // Style the image container for centering
                imageContainer.css({
                    'height': availableHeight + 'px',
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'overflow': 'hidden'
                });
                
                // Move the image into the container if it's not already there
                if (img.parent().hasClass('image-container') === false) {
                    imageContainer.append(img);
                }
                
                // Function to center image without stretching
                var centerImage = function() {
                    var imgNaturalWidth = img.prop('naturalWidth');
                    var imgNaturalHeight = img.prop('naturalHeight');
                    
                    // Skip if natural dimensions aren't available yet
                    if (!imgNaturalWidth || !imgNaturalHeight) {
                        //console.log('Natural dimensions not available for image', index);
                        return;
                    }
                    
                    var containerWidth = slide.width();
                    var aspectRatio = imgNaturalWidth / imgNaturalHeight;
                    
                    // Calculate dimensions to maintain aspect ratio without stretching
                    var imgWidth, imgHeight;
                    
                    if (imgNaturalHeight <= availableHeight) {
                        // If original image is smaller than available height, display at original size
                        imgHeight = imgNaturalHeight;
                        imgWidth = imgNaturalWidth;
                    } else {
                        // Fit image to available height while maintaining aspect ratio
                        imgHeight = availableHeight;
                        imgWidth = availableHeight * aspectRatio;
                    }
                    
                    // Limit width if needed
                    if (imgWidth > containerWidth) {
                        imgWidth = containerWidth;
                        imgHeight = containerWidth / aspectRatio;
                    }
                    
                    // Apply calculated dimensions
                    img.css({
                        'height': imgHeight + 'px',
                        'width': imgWidth + 'px',
                        'max-height': availableHeight + 'px',
                        'max-width': containerWidth + 'px',
                        'object-fit': 'contain'
                    });
                    
                    //console.log('Centered image', index, 'aspect ratio:', aspectRatio, 
                    //            'size:', imgWidth, 'x', imgHeight, 
                    //            'available height:', availableHeight);
                };
                
                // Try to center immediately
                centerImage();
                
                // Center again when image loads
                img.on('load', centerImage);
            });
        },

        // Set slider dimensions based on configuration
        setSliderDimensions: function(widthSize, heightSize, captionPosition) {
            var self = this;
            
            if (!self.ele || !self.ele.sliderView || !self.ele.sld || self.ele.sld.length === 0) {
                //console.log('Cannot set dimensions: Invalid elements');
                return;
            }
            
            // Apply width to slider container
            if (widthSize && widthSize !== '100%') {
                // Check if widthSize is a pixel value or percentage
                var isPixelWidth = /^\d+(?:px)?$/.test(widthSize);
                var isPercentWidth = /^\d+%$/.test(widthSize);
                
                if (isPixelWidth) {
                    // Convert to number if it's a pixel value with 'px'
                    var numericWidth = parseInt(widthSize.replace('px', ''), 10);
                    self.ele.sliderView.css('width', numericWidth + 'px');
                    //console.log('Set slider width to', numericWidth, 'px');
                } else if (isPercentWidth) {
                    self.ele.sliderView.css('width', widthSize);
                    //console.log('Set slider width to', widthSize);
                } else {
                    // Try to parse as a number
                    var parsedWidth = parseInt(widthSize, 10);
                    if (!isNaN(parsedWidth)) {
                        self.ele.sliderView.css('width', parsedWidth + 'px');
                        //console.log('Set slider width to', parsedWidth, 'px');
                    } else {
                        // Default to 100% if invalid width
                        self.ele.sliderView.css('width', '100%');
                        //console.log('Invalid width format, defaulting to 100%');
                    }
                }
            } else {
                // Default to 100% width
                self.ele.sliderView.css('width', '100%');
                //console.log('Using default width: 100%');
            }
            
            // Add captions to slides
            self.addCaptionsToSlides(captionPosition);
            
            // Get the first image to determine height
            var firstSlide = self.ele.sld.first();
            var firstImg = firstSlide.find('img').first();
            
            if (firstImg.length === 0) {
                //console.log('No images found in slides');
                return;
            }
            
            // Calculate extra height needed for captions
            var calculateExtraHeight = function() {
                var extraHeight = 0;
                var firstCaption = firstSlide.find('.slide-caption');
                
                if (firstCaption.length > 0 && (captionPosition === 'top' || captionPosition === 'bottom')) {
                    extraHeight = firstCaption.outerHeight(true);
                    //console.log('Caption requires extra height:', extraHeight, 'px');
                }
                
                return extraHeight;
            };
            
            // If a fixed height is specified and not "auto", use it
            if (heightSize && heightSize !== 'auto' && /^\d+(?:px)?$/.test(heightSize)) {
                var parsedHeight = parseInt(heightSize.replace('px', ''), 10);
                
                // Adjust for caption if needed
                var extraHeight = calculateExtraHeight();
                var totalHeight = parsedHeight + extraHeight;
                
                self.ele.sliderView.css('height', totalHeight + 'px');
                self.centerImagesWithoutStretching(totalHeight, captionPosition);
                //console.log('Set fixed height:', parsedHeight, 'px + caption:', extraHeight, 'px = total:', totalHeight, 'px');
            } else {
                // Auto height based on first image
                var getFirstImageHeight = function() {
                    var imgNaturalHeight = firstImg.prop('naturalHeight');
                    
                    if (imgNaturalHeight) {
                        // Calculate extra height for caption
                        var extraHeight = calculateExtraHeight();
                        var totalHeight = imgNaturalHeight + extraHeight;
                        
                        self.ele.sliderView.css('height', totalHeight + 'px');
                        self.centerImagesWithoutStretching(totalHeight, captionPosition);
                        //console.log('Using first image height:', imgNaturalHeight, 'px + caption:', extraHeight, 'px = total:', totalHeight, 'px');
                        return totalHeight;
                    } else {
                        // Default height if image hasn't loaded yet
                        var defaultHeight = 400;
                        var extraHeight = calculateExtraHeight();
                        var totalHeight = defaultHeight + extraHeight;
                        
                        self.ele.sliderView.css('height', totalHeight + 'px');
                        //console.log('Using default height temporarily:', defaultHeight, 'px + caption:', extraHeight, 'px = total:', totalHeight, 'px');
                        return totalHeight;
                    }
                };
                
                // Initial setup
                var initialHeight = getFirstImageHeight();
                
                // Update when image loads
                firstImg.on('load', function() {
                    var loadedHeight = firstImg.prop('naturalHeight');
                    if (loadedHeight) {
                        var extraHeight = calculateExtraHeight();
                        var totalHeight = loadedHeight + extraHeight;
                        
                        self.ele.sliderView.css('height', totalHeight + 'px');
                        self.centerImagesWithoutStretching(totalHeight, captionPosition);
                        //console.log('First image loaded, updated height to:', loadedHeight, 'px + caption:', extraHeight, 'px = total:', totalHeight, 'px');
                    }
                });
            }
        },
        
        // Initialize the slider
        init: function($content) {
            var self = this;
            
            //console.log('Initializing SliderControl...');
            
            // Reset instance properties to avoid conflicts with previous initializations
            self.SlideNow = 1;
            self.SlideCount = 0;
            self.SlideInterval = 0;
            self.TranslateWidth = 0;
            self.TimerPause = false;
            self.isVertical = false;
            self.sliderWidth = null;
            
            // Skip if already initialized to prevent duplicate timers
            if (self.initialized) {
                //console.log('SliderControl already initialized, skipping');
                return;
            }
            
            // Collect elements
            self.ele = {
                sld: $content.find('.Sld'),
                sliderData: $content.find('#SliderData'),
                navBtn: $content.find('.NavBtn'),
                navBtns: $content.find('#NavBtns'),
                navBtnsLi: $content.find('#NavBtns li'),
                sliderView: $content.find('#SliderView'),
                sliderWrapper: $content.find('#SliderWrapper')
            };
            
            // console.log('Elements found:', {
            //     slidesCount: self.ele.sld.length,
            //     hasSliderData: self.ele.sliderData.length > 0,
            //     navBtnCount: self.ele.navBtn.length,
            //     hasNavBtns: self.ele.navBtns.length > 0,
            //     hasSliderView: self.ele.sliderView.length > 0,
            //     hasSliderWrapper: self.ele.sliderWrapper.length > 0
            // });
            
            // Verify we have the necessary elements before continuing
            if (!self.ele.sliderView.length || !self.ele.sliderWrapper.length || !self.ele.sld.length) {
                //console.log('Required slider elements missing, aborting initialization');
                return;
            }
            
            // Parse slider configuration data
            var sliderConfig = self.parseSliderData();
            
            // Remove excess slides and buttons
            self.ele.sld.each(function (index) {
                if (index + 1 > self.SlideCount) {
                    $(this).remove();
                }
            });
            self.ele.navBtn.each(function (index) {
                if (index + 1 > self.SlideCount) {
                    $(this).remove();
                }
            });
            
            // Ensure there's at least one slide
            if (self.SlideCount <= 0) {
                //console.log('No slides available, aborting initialization');
                return;
            }
            
            // Set CSS for vertical or horizontal slider
            if (self.isVertical) {
                self.ele.sliderWrapper.css({
                    'height': 100 * self.SlideCount + '%',
                    'width': '100%'
                });
                self.ele.sld.css({
                    'height': 100 / self.SlideCount + '%',
                    'width': '100%'
                });
                self.ele.navBtns.css({
                    'position': 'absolute',
                    'right': '10px',
                    'top': '50%',
                    'transform': 'translateY(-50%)',
                    'list-style': 'none',
                    'margin': '0',
                    'padding': '0',
                    'z-index': '10'
                });
                self.ele.navBtnsLi.css({
                    'margin': '5px 0'
                });
            } else {
                self.ele.sliderWrapper.css('width', 100 * self.SlideCount + '%');
                self.ele.sld.css('width', 100 / self.SlideCount + '%');
            }
            
            // Set slider dimensions and add captions
            self.setSliderDimensions(
                sliderConfig.widthSize, 
                sliderConfig.heightSize, 
                sliderConfig.captionPosition
            );
            
            // Add links to slides
            self.addLinksToSlides();
            
            if (self.ele.navBtns.hasClass('nmBottom')) {
			    // Get the height of the navigation area
			    var navHeight = self.ele.navBtns.outerHeight(true);
			    
			    // Add padding to the slider view to make room for navigation buttons
			    self.ele.sliderView.css({
			        'padding-bottom': (navHeight + 10) + 'px' // Add extra 10px for spacing
			    });
			    
			    // Ensure navigation buttons are positioned properly
			    self.ele.navBtns.css({
			        'position': 'absolute', 
			        'bottom': '0',
			        'left': '0',
			        'width': '100%',
			        'z-index': '100' // High z-index to ensure visibility
			    });
			    // Adjust caption position for overlay style
                if (sliderConfig.captionPosition === 'overlay') {
                    // Adjust all overlay captions to appear above bottom area
                    self.ele.sld.find('.slide-caption').css({
                        'bottom': navHeight + 'px'
                    });
                }
            }
            
            // Mark as initialized to prevent duplicate initializations
            self.initialized = true;
            
            // Set up mouse events to pause the timer
            self.ele.sliderView.mouseenter(function () {
                self.TimerPause = true;
            });
            self.ele.sliderView.mouseleave(function () {
                self.TimerPause = false;
            });
            
            // Set up click events for navigation buttons
            self.ele.navBtn.click(function () {
                var navBtnId = $(this).index();
                self.SlideNow = navBtnId + 1;
                //console.log('Navigation button clicked, going to slide:', self.SlideNow);
                
                if (self.isVertical) {
                    self.TranslateWidth = -self.ele.sliderView.height() * navBtnId;
                    self.ele.sliderWrapper.css({
                        'transform': 'translate(0, ' + self.TranslateWidth + 'px)',
                        '-webkit-transform': 'translate(0, ' + self.TranslateWidth + 'px)',
                        '-ms-transform': 'translate(0, ' + self.TranslateWidth + 'px)',
                    });
                } else {
                    self.TranslateWidth = -self.ele.sliderView.width() * navBtnId;
                    self.ele.sliderWrapper.css({
                        'transform': 'translate(' + self.TranslateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + self.TranslateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + self.TranslateWidth + 'px, 0)',
                    });
                }
                self.SelectSlide($(this));
            });
            
            // Adjust navigation button positioning
            var SSlider = 0;
            var BtnCount = self.ele.navBtn.length;
            var SBtn = 0;
            
            if (self.ele.navBtns.hasClass('nmLeft')) {
                SSlider = self.ele.navBtns.outerHeight(true);
                SBtn = self.ele.navBtnsLi.outerHeight(true);
                if (self.ele.navBtns.hasClass('nmP2')) {
                    self.ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
                } else if (self.ele.navBtns.hasClass('nmP3')) {
                    self.ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) + 'px)');
                }
            } else if (self.ele.navBtns.hasClass('nmRight')) {
                SSlider = self.ele.navBtns.outerHeight(true);
                SBtn = self.ele.navBtnsLi.outerHeight(true);
                if (self.ele.navBtns.hasClass('nmP2')) {
                    self.ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
                } else if (self.ele.navBtns.hasClass('nmP3')) {
                    self.ele.navBtnsLi.css('transform', 'translateY(' + (SSlider - SBtn * BtnCount) + 'px)');
                }
            } else if (self.ele.navBtns.hasClass('nmTop')) {
                SSlider = self.ele.navBtns.outerWidth(true);
                SBtn = self.ele.navBtnsLi.outerWidth(true);
                if (self.ele.navBtns.hasClass('nmP2')) {
                    self.ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
                } else if (self.ele.navBtns.hasClass('nmP3')) {
                    self.ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) + 'px)');
                }
            } else if (self.ele.navBtns.hasClass('nmBottom')) {
                SSlider = self.ele.navBtns.outerWidth(true);
                SBtn = self.ele.navBtnsLi.outerWidth(true);
                if (self.ele.navBtns.hasClass('nmP2')) {
                    self.ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) / 2 + 'px)');
                } else if (self.ele.navBtns.hasClass('nmP3')) {
                    self.ele.navBtnsLi.css('transform', 'translateX(' + (SSlider - SBtn * BtnCount) + 'px)');
                }
            }
            
            // Set initial active button
            if (self.ele.navBtn.length > 0) {
                //console.log('Setting initial active button');
                self.SelectSlide(self.ele.navBtn.first());
            }
            
            // Start the timer for automatic sliding
            //console.log('Starting slideshow timer with interval:', self.SlideInterval, 'ms');
            
            // Clear any existing timer
            if (self.timerId) {
                clearTimeout(self.timerId);
            }
            
            // Start a new timer with self-referencing setTimeout
            (function startTimer() {
                self.timerId = setTimeout(function() {
                    //console.log('Timer tick, pause status:', self.TimerPause);
                    if (self.TimerPause === false) {
                        //console.log('Advancing to next slide...');
                        self.NextSlide();
                    }
                    startTimer(); // Re-call the timer setup function
                }, self.SlideInterval);
            })();
            
            //console.log('SliderControl initialized successfully');
        }
    };
    
    // Hook into MediaWiki content loading - use both 'ready' and 'wikipage.content' hooks
    $(document).ready(function() {
        //console.log('Document ready, initializing SliderControl if elements exist');
        var $content = $(document);
        try {
            window.SliderControl.init($content);
        } catch (error) {
            console.error('Error initializing SliderControl on document ready:', error);
        }
    });
    
    mw.hook('wikipage.content').add(function($content) {
        //console.log('MediaWiki content hook triggered');
        // Initialize the slider when content is loaded
        try {
            window.SliderControl.init($content);
            //console.log('SliderControl initialized via MediaWiki hook');
        } catch (error) {
            console.error('Error initializing SliderControl:', error);
        }
    });
})(window.jQuery, window.mediaWiki);