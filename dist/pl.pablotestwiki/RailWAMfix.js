
;(function (window, $, mw) {
    
    'use strict';
    
    // Import CSS
    window.importArticle(
        {
            type: "style",
            article: "u:dev:MediaWiki:RailWAM.css"
        }
    );
    
    // Initialize railWAM object
    window.railWAM = window.railWAM || {};
            
    if (window.railWAM.load === false || typeof wgIsMainPage !== 'undefined' || $('body').hasClass('editor')) {
 
        // Exit function to prevent second load.
        return;
 
    }
    window.railWAM.load = false;
    
    // Variable values
    var botFlag = false,
        dateCreated,
        dpStartDate = '',
        dpEndDate = '';
    
    // MediaWiki values and global constants
    const mwConfig = mw.config.get([
                        'wgCityId',
                        'wgNamespaceNumber',
                        'wgPageName',
                        'wgSiteName',
                        'wgUserLanguage',
                        'wgUserName',
                    ]),
            
        anonFlag = typeof mwConfig.wgUserName === 'object' ? true : false,
        body = $('body'),
        charts = {},
        curDate = new Date(),
        fandomTitle = ' | ' + mwConfig.wgSiteName + ' | Fandom',
        wamDate = Math.floor(new Date().getTime() / 1000 / 86400) * 86400,
        railWAM = $.extend({
            appendAfter: ['.content-review-module'],
            autoLogForUsers: [],
            botUsers: [],
            doubleCheckDelay: 4,
            logPage: 'User:' + mwConfig.wgUserName + '/WAM Log',
            loadOnPage: '__*__',
            loadOnNamespace: '__*__',
            lang: mwConfig.wgUserLanguage,
            showChange: true,
            showLogAlert: true,
            showToAnons: true,
            top5000Mode: true,
        }, window.railWAM),
        
        timezone = curDate.toLocaleTimeString(railWAM.lang, {timeZoneName:'short'}).split(' ')[2],
        
        // Dropdown arrow path
        dropdownDef = '<path id="railwam-dropdown-arrow" d="M 23.13,17.82 C 25.53,18.50 27.55,15.92 29.08,14.42 31.94,11.61 40.81,0.40 44.79,2.17 48.06,3.60 46.34,6.99 44.79,8.91 44.79,8.91 31.89,21.55 31.89,21.55 30.27,23.22 27.11,26.82 24.87,27.30 20.89,28.14 12.26,17.74 9.41,14.92 6.01,11.55 -1.75,6.81 3.19,2.17 10.81,1.46 17.11,16.11 23.13,17.82 Z" />',
                    
        // WAM logo path
        wamLogoDef = '<path id="railwam-modal-logo" d="M 8.63,2.95 C 8.63,2.95 11.40,1.60 11.40,1.60 11.40,1.60 10.98,4.79 10.98,4.79 10.98,4.79 10.25,9.48 10.25,9.48 10.25,9.48 9.91,11.72 9.91,11.72 9.91,11.72 9.67,12.76 9.67,12.76 9.67,12.76 8.84,13.34 8.84,13.34 8.84,13.34 7.14,14.17 7.14,14.17 7.14,14.17 5.19,9.80 5.19,9.80 5.19,9.80 3.41,5.75 3.41,5.75 3.41,5.75 8.63,2.95 8.63,2.95 Z M 11.20,11.93 C 11.20,11.93 12.05,8.31 12.05,8.31 12.05,8.31 12.65,6.24 12.65,6.24 12.65,6.24 14.38,5.24 14.38,5.24 14.38,5.24 18.00,3.41 18.00,3.41 17.86,4.18 16.79,5.90 16.38,6.71 16.38,6.71 14.10,10.97 14.10,10.97 13.83,11.45 13.42,12.41 13.08,12.76 12.79,13.04 11.21,13.84 10.76,14.06 10.76,14.06 11.20,11.93 11.20,11.93 Z M 3.73,10.33 C 3.73,10.33 5.84,14.06 5.84,14.06 6.01,14.35 6.59,15.22 6.52,15.53 6.45,15.83 5.72,16.17 5.43,16.18 5.26,16.19 5.15,16.14 5.01,16.06 5.01,16.06 1.49,13.54 1.49,13.54 0.97,13.16 0.30,12.83 0.00,12.25 0.00,12.25 3.73,10.33 3.73,10.33 Z" />',
        
        // Log error icon SVG path
        alertIconDef = '<path id="railwam-log-alert-icon" d="M 9.00,10.00 C 10.00,10.00 10.00,10.00 10.00,11.00 10.00,12.00 10.00,12.00 9.00,12.00 8.00,12.00 8.00,12.00 8.00,11.00 8.00,10.00 8.00,10.00 9.00,10.00 Z M 8.00,6.00 C 8.00,6.00 8.00,8.00 8.00,8.00 8.00,9.00 8.00,9.00 9.00,9.00 10.00,9.00 10.00,9.00 10.00,8.00 10.00,8.00 10.00,6.00 10.00,6.00 10.00,5.00 10.00,5.00 9.00,5.00 8.00,5.00 8.00,5.00 8.00,6.00 Z M 9.00,3.00 C 5.69,3.00 3.00,6.69 3.00,10.00 3.00,11.19 3.99,12.69 3.99,11.00 3.99,11.00 4.00,11.00 4.00,11.00 4.00,10.45 4.44,10.00 4.99,10.00 5.55,10.00 5.99,10.45 5.99,11.00 5.99,11.00 5.99,15.00 5.99,15.00 5.99,15.55 5.55,16.00 4.99,16.00 4.99,16.00 1.00,16.00 1.00,16.00 0.45,16.00 0.00,15.55 0.00,15.00 0.00,14.45 0.45,14.00 1.00,14.00 1.00,14.00 2.77,14.00 2.77,14.00 1.67,12.63 1.00,10.89 1.00,9.00 1.00,4.59 4.59,1.00 9.00,1.00 9.00,1.00 9.00,3.00 9.00,3.00 Z M 9.00,14.00 C 12.31,14.00 15.00,10.31 15.00,7.00 15.00,5.81 14.01,4.30 14.01,6.00 14.01,6.00 14.00,6.00 14.00,6.00 14.00,6.55 13.56,7.00 13.01,7.00 12.45,7.00 12.01,6.55 12.01,6.00 12.01,6.00 12.01,2.00 12.01,2.00 12.01,1.45 12.45,1.00 13.01,1.00 13.01,1.00 17.00,1.00 17.00,1.00 17.55,1.00 18.00,1.45 18.00,2.00 18.00,2.55 17.55,3.00 17.00,3.00 17.00,3.00 15.23,3.00 15.23,3.00 16.33,4.37 17.00,6.11 17.00,8.00 17.00,12.41 13.41,16.00 9.00,16.00 9.00,16.00 9.00,14.00 9.00,14.00 Z" />',
        
        // Log old data icon path
        logOldDef = '<path id="railwam-log-old" d="M 66.00,197.00 C 66.00,197.00 41.00,172.00 41.00,172.00 38.87,169.87 32.54,162.97 30.00,162.34 26.89,161.56 23.97,165.07 22.00,167.00 22.00,167.00 6.02,183.00 6.02,183.00 3.79,185.35 1.24,187.50 2.58,191.00 3.54,193.52 8.02,197.99 10.00,200.00 10.00,200.00 27.00,217.00 27.00,217.00 27.00,217.00 55.96,246.00 55.96,246.00 55.96,246.00 66.00,257.00 66.00,257.00 66.00,257.00 86.00,276.00 86.00,276.00 94.68,269.79 106.53,256.12 114.09,248.00 114.09,248.00 148.00,214.00 148.00,214.00 148.00,214.00 163.96,198.00 163.96,198.00 165.65,196.23 169.31,192.40 169.75,190.00 170.51,185.85 160.92,177.92 158.00,175.00 155.32,172.32 146.38,162.20 143.00,162.20 140.04,162.20 135.09,167.91 133.00,170.00 133.00,170.00 109.00,194.00 109.00,194.00 109.00,194.00 121.31,161.00 121.31,161.00 133.72,133.96 153.30,108.71 176.00,89.59 200.83,68.69 224.82,55.48 256.00,46.58 267.67,43.25 280.84,40.02 293.00,40.00 293.00,40.00 335.00,40.00 335.00,40.00 358.72,40.28 397.66,54.62 418.00,66.80 447.89,84.70 471.73,106.79 490.92,136.00 501.43,151.99 508.65,168.94 514.67,187.00 518.71,199.13 522.98,215.24 523.00,228.00 523.00,228.00 523.00,272.00 523.00,272.00 522.96,298.95 505.96,340.39 491.56,363.00 473.35,391.62 447.99,415.21 419.00,432.60 397.07,445.76 358.70,459.96 333.00,460.00 333.00,460.00 291.00,460.00 291.00,460.00 280.99,459.88 265.76,456.21 256.00,453.42 227.15,445.19 204.47,433.30 181.00,414.55 170.11,405.86 163.39,399.53 154.28,389.00 142.96,375.92 145.46,375.02 135.00,375.00 135.00,375.00 94.00,375.00 94.00,375.00 96.16,381.82 102.24,389.97 106.34,396.00 119.03,414.63 136.44,432.73 154.00,446.80 180.76,468.25 213.64,485.49 247.00,493.87 258.20,496.69 270.43,499.98 282.00,500.00 282.00,500.00 314.00,500.00 314.00,500.00 314.00,500.00 344.00,500.00 344.00,500.00 354.41,499.98 364.94,497.39 375.00,494.87 399.33,488.79 422.46,479.24 444.00,466.40 494.60,436.23 533.37,387.85 552.00,332.00 556.72,317.85 562.98,295.75 563.00,281.00 563.00,281.00 563.00,217.00 563.00,217.00 562.81,200.67 553.05,169.50 546.80,154.00 518.14,82.92 457.73,28.46 384.00,7.43 372.48,4.14 355.83,0.02 344.00,0.00 344.00,0.00 282.00,0.00 282.00,0.00 262.25,0.03 229.34,10.81 211.00,18.72 137.42,50.46 81.83,118.30 66.00,197.00 Z M 293.00,125.00 C 293.00,125.00 293.00,258.00 293.00,258.00 293.01,261.43 292.67,265.04 295.31,267.69 297.55,269.92 300.07,269.94 303.00,270.00 303.00,270.00 327.00,270.00 327.00,270.00 327.00,270.00 438.00,270.00 438.00,270.00 438.00,270.00 438.00,230.00 438.00,230.00 438.00,230.00 333.00,230.00 333.00,230.00 333.00,230.00 333.00,125.00 333.00,125.00 333.00,125.00 293.00,125.00 293.00,125.00 Z" />',
        
        // Docs icon path
        docsDef = '<path id="railwam-docs" d="M 450.00,150.00 C 450.00,150.00 343.00,150.00 343.00,150.00 343.00,150.00 332.02,148.43 332.02,148.43 332.02,148.43 326.15,142.00 326.15,142.00 326.15,142.00 325.00,114.00 325.00,114.00 325.00,114.00 325.00,0.00 325.00,0.00 325.00,0.00 73.00,0.00 73.00,0.00 57.31,0.02 50.02,7.31 50.00,23.00 50.00,23.00 50.00,111.00 50.00,111.00 50.00,111.00 50.00,477.00 50.00,477.00 50.02,492.69 57.31,499.98 73.00,500.00 73.00,500.00 137.00,500.00 137.00,500.00 137.00,500.00 427.00,500.00 427.00,500.00 441.75,499.98 449.93,493.22 450.00,478.00 450.00,478.00 450.00,419.00 450.00,419.00 450.00,419.00 450.00,150.00 450.00,150.00 Z M 352.00,28.00 C 348.62,34.40 350.00,47.46 350.00,55.00 350.00,55.00 350.00,113.00 350.00,113.00 350.02,122.53 352.47,124.98 362.00,125.00 362.00,125.00 418.00,125.00 418.00,125.00 425.35,125.00 440.65,125.80 447.00,124.00 447.00,124.00 436.00,111.00 436.00,111.00 436.00,111.00 417.00,92.00 417.00,92.00 417.00,92.00 376.00,51.00 376.00,51.00 376.00,51.00 352.00,28.00 352.00,28.00 Z M 325.00,175.00 C 325.00,175.00 325.00,200.00 325.00,200.00 325.00,200.00 75.00,200.00 75.00,200.00 75.00,200.00 75.00,175.00 75.00,175.00 75.00,175.00 325.00,175.00 325.00,175.00 Z M 275.00,250.00 C 275.00,250.00 275.00,275.00 275.00,275.00 275.00,275.00 75.00,275.00 75.00,275.00 75.00,275.00 75.00,250.00 75.00,250.00 75.00,250.00 275.00,250.00 275.00,250.00 Z M 425.00,250.00 C 425.00,250.00 425.00,375.00 425.00,375.00 425.00,375.00 325.00,375.00 325.00,375.00 325.00,375.00 325.00,250.00 325.00,250.00 325.00,250.00 425.00,250.00 425.00,250.00 Z M 275.00,300.00 C 275.00,300.00 275.00,325.00 275.00,325.00 275.00,325.00 75.00,325.00 75.00,325.00 75.00,325.00 75.00,300.00 75.00,300.00 75.00,300.00 275.00,300.00 275.00,300.00 Z M 275.00,350.00 C 275.00,350.00 275.00,375.00 275.00,375.00 275.00,375.00 75.00,375.00 75.00,375.00 75.00,375.00 75.00,350.00 75.00,350.00 75.00,350.00 275.00,350.00 275.00,350.00 Z" />',
        
        // FAQ icon path
        faqDef = '<path id="railwam-faq" d="M 211.00,0.14 C 125.44,14.43 53.34,67.75 18.72,148.00 10.81,166.34 0.03,199.25 0.00,219.00 0.00,219.00 0.00,281.00 0.00,281.00 0.02,292.83 4.14,309.48 7.43,321.00 28.46,394.73 82.92,455.14 154.00,483.80 169.50,490.05 200.67,499.81 217.00,500.00 217.00,500.00 281.00,500.00 281.00,500.00 292.04,499.98 303.33,497.04 314.00,494.37 344.32,486.79 373.63,472.78 399.00,454.57 441.22,424.27 472.93,380.19 489.33,331.00 493.95,317.16 499.98,295.42 500.00,281.00 500.00,281.00 500.00,219.00 500.00,219.00 499.98,205.33 494.38,184.13 490.00,171.00 478.02,135.06 459.24,102.47 432.96,75.00 403.86,44.57 368.80,23.26 329.00,10.00 315.87,5.62 294.67,0.02 281.00,0.14 281.00,0.14 247.00,0.14 247.00,0.14 247.00,0.14 211.00,0.14 211.00,0.14 Z M 367.00,74.00 C 362.52,80.26 350.05,91.95 344.00,98.00 341.70,100.30 335.82,106.79 333.00,107.59 329.56,108.57 318.69,102.00 315.00,100.31 304.10,95.32 286.95,90.02 275.00,90.00 275.00,90.00 225.00,90.00 225.00,90.00 216.56,90.01 210.07,91.94 202.00,94.15 193.04,96.60 186.25,99.63 178.00,103.75 175.29,105.11 169.95,108.43 167.00,107.59 164.18,106.79 158.30,100.30 156.00,98.00 149.95,91.95 137.48,80.26 133.00,74.00 133.00,74.00 148.00,65.31 148.00,65.31 162.00,57.72 176.81,51.75 192.00,47.02 215.72,39.65 226.98,40.00 251.00,40.00 270.74,40.00 280.24,39.53 300.00,44.73 317.35,49.30 336.24,56.76 352.00,65.31 352.00,65.31 367.00,74.00 367.00,74.00 Z M 229.00,130.14 C 229.00,130.14 264.00,130.14 264.00,130.14 288.34,130.04 318.73,146.72 335.72,163.42 351.82,179.26 369.73,210.93 370.00,234.00 370.00,234.00 370.00,264.00 370.00,264.00 369.99,273.55 368.31,279.06 365.33,288.00 356.30,315.11 338.76,338.79 314.00,353.55 300.22,361.76 280.17,369.97 264.00,370.00 264.00,370.00 234.00,370.00 234.00,370.00 222.84,369.87 206.98,364.22 197.00,359.25 166.61,344.09 145.81,321.41 135.00,289.00 131.89,279.67 130.02,274.00 130.00,264.00 130.00,264.00 130.00,236.00 130.00,236.00 130.02,223.10 135.03,208.48 140.75,197.00 158.40,161.62 189.60,136.81 229.00,130.14 Z M 73.00,367.00 C 73.00,367.00 63.31,350.00 63.31,350.00 56.85,338.06 49.18,318.14 45.43,305.00 38.95,282.30 40.00,272.72 40.00,250.00 40.00,227.18 38.89,218.87 45.15,196.00 48.69,183.06 56.54,162.83 62.78,151.00 62.78,151.00 73.00,133.00 73.00,133.00 79.76,136.19 93.92,151.91 100.00,158.00 102.29,160.29 107.53,164.94 108.19,168.00 108.85,171.05 105.17,177.16 103.75,180.00 99.51,188.50 97.04,194.85 94.43,204.00 92.06,212.29 90.01,220.35 90.00,229.00 90.00,229.00 90.00,271.00 90.00,271.00 90.02,282.92 95.15,300.99 99.87,312.00 101.62,316.09 108.97,328.40 108.19,332.00 107.53,335.06 102.29,339.71 100.00,342.00 93.92,348.09 79.76,363.81 73.00,367.00 Z M 427.00,133.00 C 427.00,133.00 437.22,151.00 437.22,151.00 443.46,162.83 451.31,183.06 454.85,196.00 461.11,218.87 460.00,227.18 460.00,250.00 460.00,272.72 461.05,282.30 454.57,305.00 450.82,318.14 443.15,338.06 436.69,350.00 436.69,350.00 427.00,367.00 427.00,367.00 420.24,363.81 406.08,348.09 400.00,342.00 397.71,339.71 392.47,335.06 391.81,332.00 391.03,328.40 398.38,316.09 400.13,312.00 404.85,300.99 409.98,282.92 410.00,271.00 410.00,271.00 410.00,228.00 410.00,228.00 409.96,219.85 407.80,211.80 405.57,204.00 402.96,194.85 400.49,188.50 396.25,180.00 394.83,177.16 391.15,171.05 391.81,168.00 392.47,164.94 397.71,160.29 400.00,158.00 406.08,151.91 420.24,136.19 427.00,133.00 Z M 367.00,426.00 C 367.00,426.00 352.00,434.69 352.00,434.69 338.00,442.28 323.19,448.25 308.00,452.98 284.28,460.35 273.02,460.00 249.00,460.00 229.26,460.00 219.76,460.47 200.00,455.27 182.65,450.70 163.76,443.24 148.00,434.69 148.00,434.69 133.00,426.00 133.00,426.00 137.48,419.74 149.95,408.05 156.00,402.00 158.30,399.70 164.18,393.21 167.00,392.41 170.44,391.43 181.31,398.00 185.00,399.69 195.90,404.68 213.05,409.98 225.00,410.00 225.00,410.00 275.00,410.00 275.00,410.00 283.44,409.99 289.93,408.06 298.00,405.85 306.96,403.40 313.75,400.37 322.00,396.25 324.71,394.89 330.05,391.57 333.00,392.41 335.82,393.21 341.70,399.70 344.00,402.00 350.05,408.05 362.52,419.74 367.00,426.00 Z" />',
        
        // Sort icon paths
        unsortedDef = '<path id="railwam-unsorted" d="M 25.00,0.00 C 25.00,0.00 0.00,35.00 0.00,35.00 0.00,35.00 50.00,35.00 50.00,35.00 50.00,35.00 25.00,0.00 25.00,0.00 25.00,0.00 25.00,0.00 25.00,0.00 Z M 0.00,65.00 C 0.00,65.00 25.00,100.00 25.00,100.00 25.00,100.00 25.00,100.00 25.00,100.00 25.00,100.00 50.00,65.00 50.00,65.00 50.00,65.00 0.00,65.00 0.00,65.00 Z" />',
        
        sortedAscDef = '<path id="railwam-sorted-asc" d="M 0.00,35.00 C 0.00,35.00 25.00,0.00 25.00,0.00 25.00,0.00 50.00,35.00 50.00,35.00 50.00,35.00 0.00,35.00 0.00,35.00 Z" />',
        
        sortedDscDef = '<path id="railwam-sorted-dsc" d="M 0.00,65.00 C 0.00,65.00 50.00,65.00 50.00,65.00 50.00,65.00 25.00,100.00 25.00,100.00 25.00,100.00 0.00,65.00 0.00,65.00 Z" />';
    
    // Append SVG defs to document body
    body.append('<svg id="railwam-svg-defs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0"><defs>' + dropdownDef + wamLogoDef + alertIconDef + logOldDef + docsDef + faqDef + unsortedDef + sortedAscDef + sortedDscDef + '</defs></svg>');
    
    // More reliable wgServer for non-English wikis
    mwConfig.wgServer = window.location.href.split(/(\/wiki\/)|(\/index)/)[0];
    
    // Ensure appendAfter is an array
    railWAM.appendAfter = $.isArray(railWAM.appendAfter) === true ? railWAM.appendAfter : [railWAM.appendAfter.toString()];
    
    // Check if log edits should be marked as bot edits
    if ($.isArray(railWAM.botUsers) === true) {
        if (railWAM.botUsers.indexOf(mwConfig.wgUserName) > -1) {
            botFlag = true;
        }
    } else {
        
        if (railWAM.botUsers === mwConfig.wgUserName) {
            botFlag = true;
        }
        
    }
                
    // Load RailWAM library, Chart.js, I18n-js  
    $.when(
        $.getScript('/load.php?mode=articles&articles=u:dev:Chart.js&only=scripts'),
        $.getScript('/load.php?mode=articles&articles=u:dev:RailWAM/lib.js&only=scripts'),
        $.getScript('/load.php?mode=articles&articles=u:dev:I18n-js/code.js&only=scripts')
    ).done(function() {
        
        $.when(
            window.dev.i18n.loadMessages('RailWAM', {
                language: railWAM.lang
            }),
            rw.init()
        ).done(function(i18n) {
            
            const local = {
                
                color: {
                    
                    /**
                     * Changes opacity of a color.
                     * 
                     * @param {string} color - RGB, hex, or HSL color
                     * @param {number} opacity - new opacity
                     * 
                     * @returns {string} color in HSL or RGB
                     */
                    changeOpacity: function(color, opacity) {
                        
                        switch (color.charAt(0)) {
                            case '#':
                                color = (local.color.toRGB(color)).replace('rgb', 'rgba').replace(')', ', ' + opacity + ')');
                                break;
                                
                            case 'r':
                                if (color.indexOf('rgba') === -1) {
                                    color = color.replace('rgb', 'rgba').replace(')', ', ' + opacity + ')');
                                } else {
                                    color = color.replace(/,\s?[\d.]*\)/, ', ' + opacity + ')');
                                }
                                break;
                                
                            case 'h':
                                if (color.indexOf('hsla') === -1) {
                                    color = color.replace('hsl', 'hsla').replace(')', ', ' + opacity + ')');
                                } else {
                                    color = color.replace(/,\s?[\d.]*\)/, ', ' + opacity + ')');
                                }
                                break;
                        }
                        
                        return color;
                        
                    },
                    
                    /**
                     * Gets background-color of element.
                     * 
                     * @param {Object} elm - Element
                     * 
                     * @returns {string} background-color
                     */
                    getBgColor: function(elm) {
 
                        if (elm.css('background-color') === 'rgba(0, 0, 0, 0)') {
                            return 'transparent';
                        } else {
                            return elm.css('background-color');
                        }
 
                    },
                    
                    /**
                     * Lightens an HSL color by a percentage.
                     * 
                     * @param {string} color - HSL color
                     * @param {number} inc - % to increase lightness by
                     * 
                     * @returns {string} lightened color in HSL
                     */
                    lighten: function(color, inc) {
                        
                        inc = local.math.parseNum(inc);
                        
                        const hsl = local.color.toHSL(color);
                        
                        var lightness;
                        if (hsl.split(',').length === 4) {
                            lightness = local.math.parseNum(hsl.match(/[0-9]{1,3}(?=%,\s?[0-9]{1,3}\))/)[0]) + inc;
                            return hsl.replace(/[0-9]{1,3}(?=%,\s?[0-9]{1,3}\))/, lightness);
                        } else {
                            lightness = local.math.parseNum(hsl.match(/[0-9]{1,3}(?=%\))/)[0]) + inc;
                            return hsl.replace(/[0-9]{1,3}(?=%\))/, lightness);
                        }
                        
                    },
                    
                    /**
                     * Converts color in RGB or hex format to HSL format.
                     * 
                     * @param {string} color - RGB or hex color
                     * 
                     * @returns {string} color in HSL
                     */
                    toHSL: function(color) {
                        
                        var r, g, b, a, max, min, h, s, l, d;
                        
                        switch (color.charAt(0)) {
                            case 'r' :
                                color = color.replace('rgb(', '')
                                            .replace(')', '')
                                                .split(',');
                                
                                r = local.math.parseNum(color[0]) / 255;
                                g = local.math.parseNum(color[1]) / 255;
                                b = local.math.parseNum(color[2]) / 255;
                                a = local.math.parseNum(color[3]) || '';
                                max = Math.max(r, g, b);
                                min = Math.min(r, g, b);
                                l = (max + min) / 2;
                                
                                if (max == min) {
                                    h = s = 0;
                                } else {
                                    d = max - min;
                                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                                
                                    switch (max){
                                        case r: 
                                            h = (g - b) / d + (g < b ? 6 : 0);
                                            break;
                                        case g: 
                                            h = (b - r) / d + 2; 
                                            break;
                                        case b: 
                                            h = (r - g) / d + 4; 
                                            break;
                                    }
                                    
                                    h = h * 60 < 0 ? h * 60 + 360 : h * 60;
                                }
                                
                                return a === '' ? 'hsl(' + Math.round(h) + ', ' + ((s * 100 + 0.5)|0) + '%, ' + ((l * 100 + 0.5)|0) + '%)' : 'hsla(' + Math.round(h) + ', ' + ((s * 100 + 0.5)|0) + '%, ' + ((l * 100 + 0.5)|0) + '%,' + a + ')';
                            
                            case '#':
                                const hexSplit = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
                                r = parseInt(hexSplit[1], 16) / 255;
                                g = parseInt(hexSplit[2], 16) / 255;
                                b = parseInt(hexSplit[3], 16) / 255;
                                max = Math.max(r, g, b);
                                min = Math.min(r, g, b);
                                l = (max + min) / 2;
                            
                                if (max === min){
                                    h = s = 0;
                                } else {
                                    d = max - min;
                                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                                    
                                    switch(max) {
                                        
                                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                                        case g: h = (b - r) / d + 2; break;
                                        case b: h = (r - g) / d + 4; break;
                                        
                                    }
                                    
                                    h /= 6;
                                }
                            
                                h = Math.round(h * 360);
                                s = Math.round(s * 100);
                                l = Math.round(l * 100);
                            
                                return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
                            
                            case 'h':
                                return color;
                        }
                    },
                    
                    /**
                     * Converts color in HSL or hex format to RGB format.
                     * 
                     * @param {string} color - HSL or hex color
                     * 
                     * @returns {string} color in RGB
                     */
                    toRGB: function(color) {
                        switch (color.charAt(0)) {
                            
                            // HSL color
                            case 'h' :
                                
                                color = color.replace(/^.*?\(/, '').replace(/[\)%]/g, '').split(',');
                                var h = local.math.parseNum(color[0]);
                                const s = local.math.parseNum(color[1]) / 100,
                                    l = local.math.parseNum(color[2]) / 100,
                                    a = local.math.parseNum(color[3]) || '';
                                    
                                // Hue must be postive
                                h = (Math.abs((h % 360) + 360) % 360) / 60;
                                    
                                const chroma = (1 - Math.abs(2 * l - 1)) * s,
                                
                                    // Intermediate
                                    x = chroma * (1 - Math.abs((h % 2) - 1));
                                    
                                var r, g, b;
                                    
                                if (h <= 1) {
                                    r = chroma;
                                    g = x;
                                    b = 0;
                                } else if (h <= 2) {
                                    r = x;
                                    g = chroma;
                                    b = 0;
                                } else if (h <= 3) {
                                    r = 0;
                                    g = chroma;
                                    b = x;
                                } else if (h <= 4) {
                                    r = 0;
                                    g = x;
                                    b = chroma;
                                } else if (h <= 5) {
                                    r = x;
                                    g = 0;
                                    b = chroma;
                                } else if (h <= 6) {
                                    r = chroma;
                                    g = 0;
                                    b = x;
                                }
                                
                                // Adjust colors for lightness
                                const lightnessAdj = l - (chroma / 2);
                                r = Math.round((r + lightnessAdj) * 255);
                                g = Math.round((g + lightnessAdj) * 255);
                                b = Math.round((b + lightnessAdj) * 255);
                                
                                return a === '' ? 'rgb(' + r + ', ' + g + ', ' + b + ')' : 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
                            
                            // Hex color
                            case '#':
                                const hexSplit = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
                                r = parseInt(hexSplit[1], 16);
                                g = parseInt(hexSplit[2], 16);
                                b = parseInt(hexSplit[3], 16);
                                return 'rgb(' + r + ', ' + g + ', ' + b + ')';
                                
                            case 'r':
                                return color;
                        }
                    },
                    
                },
                
                css: {
                    
                    /**
                     * Returns the width of string in px
                     * 
                     * @param {string} str - string to calculate width of
                     * @param {string} font - font properties
                     * 
                     * @returns {number} width of text (px)
                     */
                    getTextWidth: function(str, font) {
                        
                        // Ensure font is defined
                        font = font || body.css('font');
                        
                        // Unique id for element
                        const id = $('.railwam-getTextWidth').length;
                        
                        body.append('<span id="railwam-getTextWidth-' + id + '" class="railwam-getTextWidth" style="font:' + font + ';">' + str.replace(/\s/, '&nbsp;') + '</span>');
                        const textWidth = $('#railwam-getTextWidth-' + id).width();
                        $('#railwam-getTextWidth-' + id).remove();
                        return textWidth;
                        
                    },
                    
                },
                
                date: {
                    
                    /**
                     * Formats numeric date id into string.
                     * 
                     * @param {number} dateId - Date of data in seconds
                     * @param {boolean} useLocal - Whether to format date with local time or UTC
                     * 
                     * @returns {string} formatted date
                     */
                    formatDate: function(dateId, useLocal) {
                        
                        if (Number.isNaN(local.math.parseNum(dateId)) === false) {
                            const dateObj = new Date(dateId * 1000);
                            var monthName,
                                displayDate;
                            
                            if (useLocal === true) {
                                monthName = local.date.getMonthName(dateObj.getMonth());
                                displayDate = monthName + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear(); 
                            } else{
                                monthName = local.date.getMonthName(dateObj.getUTCMonth());
                                displayDate = monthName + ' ' + dateObj.getUTCDate() + ', ' + dateObj.getUTCFullYear(); 
                            }
                            
                            return displayDate;
                        } else {
                            return '';
                        }
                        
                    },
                    
                    /**
                     * Gets wiki creation date.
                     * 
                     * @param {function} callback - Function executed after date is retrieved
                     *  {number} dateCreated- Retrieved creation date in seconds
                     * 
                     * @returns {void}
                     */
                    getCreationDate: function(callback) {
                        
                        // Get date of wiki creation
                        var yearMin,
                            monthMin,
                            dayMin;
                        
                        // Use date of main page creation as date of wiki creation
                        $.get('https://community.fandom.com/api/v1/Wikis/Details?ids=' + mwConfig.wgCityId)
                            .done(
                                function(data) {
                                    
                                    if (typeof data === 'object' && $.isEmptyObject(data.items) === false) {
                                
                                        var dateStr = data.items[mwConfig.wgCityId].creation_date.split(' ')[0],
                                            dateArray = dateStr.split('-');
                                       
                                       // Determine maximum and minimum dates for search
                                        yearMin = dateArray[0];
                                        monthMin = local.math.parseNum(dateArray[1]) - 1;
                                        dayMin = dateArray[2];
                                        dateCreated = Date.UTC(yearMin, monthMin, dayMin) / 1000 > rw.config.minDate ? Date.UTC(yearMin, monthMin, dayMin) / 1000 : rw.config.minDate;
                                        
                                        if (typeof callback === 'function') {
                                            callback(dateCreated);
                                        }
                                        
                                    }
                                    
                                }
                            );
                    },
                    
                    /**
                     * Gets the # of days in a specified month.
                     * 
                     * @param {number} m - Month #
                     * @param {number} y - Year #
                     * 
                     * @returns {number} # of days in month
                     */
                    getDaysInMonth: function(m, y) {
                        
                        y = y + Math.floor(m / 12);
                        m = Math.abs((m % 12) + 12) % 12;
                        
                        const date = new Date(y, m, 28);
                        var days = 27;
                        
                         while (date.getMonth() === m) {
                             
                            date.setDate(date.getDate() + 1);
                            days++;
                            
                         }
                         
                         return days;
                        
                    },
                    
                    /**
                     * Gets name of month from month #.
                     * 
                     * @param {number} m - Month #
                     * 
                     * @returns {string} Month name
                     */
                    getMonthName: function(m) {
                        
                        m = Math.abs((m % 12) + 12) % 12;
                        
                        switch (m) {
                            
                            case 0:
                                
                                return i18n.msg('jan').plain();
                                
                            case 1:
                                
                                return i18n.msg('feb').plain();
                                
                            case 2:
                                
                                return i18n.msg('mar').plain();
                                
                            case 3:
                                
                                return i18n.msg('apr').plain();
                            
                            case 4:
                                
                                return i18n.msg('may').plain();
                            
                            case 5:
                                
                                return i18n.msg('june').plain();
                                
                            case 6:
                                
                                return i18n.msg('july').plain();
                                
                            case 7:
                                
                                return i18n.msg('aug').plain();
                                
                            case 8:
                                
                                return i18n.msg('sept').plain();
                                
                            case 9:
                                
                                return i18n.msg('oct').plain();
                                
                            case 10:
                                
                                return i18n.msg('nov').plain();
                                
                            case 11:
                                
                                return i18n.msg('dec').plain();
                                
                        }
                                    
                    },
                    
                },
                
                input: {
                    
                    /**
                     * Clears all errors in a container.
                     * 
                     * @param {string} container - Selector of error container
                     * 
                     * @returns {void}
                     */
                    clearErrors: function(container) {
                        
                        $('.railwam-util-error', $(container)).addClass('railwam-util-error-hidden');
                        $('.railwam-util-error', $(container)).fadeOut(200, 
                            function() {
                                
                                $(this).remove();
                                
                            }
                        );
                        
                    },
                    
                    /**
                     * Displays an error upon invalid user input.
                     * 
                     * @param {string} text - Error text to display to user.
                     * @param {string} type - Type of error; used to prevent duplicate errors.
                     * @param {string} container - Selector of error container
                     * 
                     * @returns {void}
                     */
                    error: function(text, type, container) {
                        
                        if ($('#railwam-util-error-' + type, $(container)).length === 0 || ($('#railwam-util-error-' + type, $(container)).length > 0 && $('#railwam-util-error-' + type, $(container)).hasClass('railwam-util-error-hidden') === true)) {
                            $('<div class="railwam-util-error" id="railwam-util-error-' + type + '">' + text + '</div>')
                                .prependTo($(container))
                                    .slideDown(500);
                        }
                        
                    },
                    
                },
                
                math: {
                    
                    /**
                     * Parses numbers more strictly than Number().
                     * 
                     * @param {string} n - Number as a string
                     * 
                     * @returns {number}
                     */
                    parseNum: function(n) {
                        
                        switch (typeof n) {
                            case 'number':
                                return n;
                            case 'string':
                                
                                // Ensure that value matches number pattern
                                if ((/^(\-|\+)?([0-9]+(\.[0-9]*)?((e(\+|\-)[0-9]+)?)?|Infinity)$/).test(n.trim()) === true) {
                                    return parseFloat(n.trim());
                                } else {
                                    return NaN;
                                }
                                
                                break;
                                
                            default:
                                return NaN;
                        }
                        
                    },
                    
                },
                
                time: {
                    
                    /**
                     * Creates an HTML timer.
                     * 
                     * @param {Object} time - Use the following properties:
                     *  d - days
                     *  h - hours
                     *  m - minutes
                     *  s - seconds
                     * 
                     * @returns {string} HTML of timer
                     */
                    createTimer: function(time) {
                        
                        const days = time.d > 0 ? time.d + ' ' + i18n.msg('days').plain() + ', ' : '',
                            hours = time.h > 0 ? time.h + ' ' + i18n.msg('hours').plain() + ', ' : '',
                            min = time.m > 0 ? time.m + ' ' + i18n.msg('minutes').plain() + ', ' : '';
                        
                        return days + hours + min + time.s + ' ' + i18n.msg('seconds').plain();
                    
                    },
                    
                },
                
            };
            
            // CSS vars
            const bodyOverflow = body.css('overflow') || 'auto',
                bodyTextColor = body.css('color'),
                headerBgColor = local.color.getBgColor($('.wds-community-header')),
                headerTextColor = $('.wds-community-header .wds-tabs__tab-label').css('color'),
                link = $('<div style="display: none;"><a></a></div>').appendTo('body'),
                linkTextColor = $('a', link).css('color'),
                pageBgElm = $('.WikiaPage .WikiaPageBackground'),
                pageBgColor = local.color.getBgColor(pageBgElm) === 'transparent' ? pageBgElm.css('background-image') : local.color.getBgColor(pageBgElm),
                scrollbarContainer = $('<div style="overflow: scroll; position: absolute; visibility: hidden; width: 100px;"></div>').appendTo('body'),
                scrollbarWidth = 100 - $('<div style="width: 100%"></div>').appendTo(scrollbarContainer).width(),
                wds = $('<div class="WikiaPage" style="display: none;"><div class="page-header"><div class="wds-button"></div></div></div>').appendTo('body'),
                wdsBgColor = $('.wds-button', wds).css('background-color'),
                wdsTextColor = $('.wds-button', wds).css('color');
            var windowWidth = $(window).width();
            
            // Remove extra elements
            link.remove();
            scrollbarContainer.remove();
            wds.remove();
                
            // Update windowWidth on resize
            $(window).resize(
                function() {
                    
                    windowWidth = $(window).width();
                    
                }
            );
            
            // Create chart plugins
            Chart.defaults.plugins = Chart.defaults.plugins || {};
            
            // Average line plugin
            Chart.plugins.register([{
                id: 'avgLine',
                
                afterDatasetDraw: function (chart) {
            
                    const dataset = chart.data.datasets[0] || {data: []},
                        scale = chart.scales['x-axis-0'],
                        options = chart.config.options.plugins.avgLine || {};
                        
                    if (options.showAvgLine === true) {
                        
                        // Calculate average of data
                        var i = dataset.data.length,
                            avgVal = 0,
                            avgY = 0,
                            validVals = 0;
                            
                        const meta = chart.getDatasetMeta(0);
                            
                        while (i--) {
                            if (isNaN(local.math.parseNum(dataset.data[i])) === false) {
                                avgVal += local.math.parseNum(dataset.data[i]);
                                avgY += local.math.parseNum(meta.data[i]._model.y);
                                validVals++;
                            }
                        }
                        avgVal /= validVals;
                        avgY /= validVals;
                        
                        // Draw line
                        chart.ctx.beginPath();
                        chart.ctx.moveTo(scale.left, avgY);
                        chart.ctx.strokeStyle = local.color.changeOpacity(linkTextColor, 0.5);
                        chart.ctx.lineWidth = 2;
                        chart.ctx.lineTo(chart.chartArea.right, avgY);
                        chart.ctx.stroke();
                        
                        // Average text
                        chart.ctx.textBaseline = 'bottom';
                        chart.ctx.textAlign = 'center';
                        chart.ctx.fillStyle = local.color.changeOpacity(linkTextColor, 0.5);
                        chart.ctx.fillText('average', scale.left + 35, avgY);
                        
                    }
                    
                }
            },
            {
                id: 'vertPosLine',
                
                afterDraw: function(chart) {
                    
                    const options = chart.config.options.plugins.vertPosLine || {};
                    
                    if (options.showVertPosLine === true && chart.tooltip._active && chart.tooltip._active.length > 0) {
                        
                        var activePt = chart.tooltip._active[0],
                            xPos = activePt.tooltipPosition().x,
                            topY = chart.scales['y-axis-0'].top,
                            bottomY = chart.scales['y-axis-0'].bottom;
                            
                        // Draw vertical line
                        chart.ctx.save();
                        chart.ctx.beginPath();
                        chart.ctx.moveTo(xPos, topY);
                        chart.ctx.lineTo(xPos, bottomY);
                        chart.ctx.setLineDash([6, 6]);
                        chart.ctx.lineWidth = 2;
                        chart.ctx.strokeStyle = local.color.changeOpacity(linkTextColor, 0.4);
                        chart.ctx.stroke();
                        chart.ctx.restore();
                        
                    }
                    
                },
            }]);
            
            // Tab click events
            body.on('click', '.railwam-util-tab',
                function() {
                    
                    $('.railwam-util-tab-active').removeClass('railwam-util-tab-active');
                    $(this).addClass('railwam-util-tab-active');
                    
                    mw.hook('rw.tab.changed').fire();
                    
                }
            );
                
            $.extend(local, {
                
                /**
                 * Inserts site-color-based CSS rules.
                 * 
                 * @returns {void}
                 */
                insertCSS: function() {
            
                    // Add CSS
                    mw.util.addCSS(
                        
                        // FAQ modal
                        '#railwam-modal-sidebar, #railwam-modal-footer { background-color: ' + headerBgColor + '; color: ' + headerTextColor + '; }' +
                        
                        '#railwam-modal-footer > a { color: ' + headerTextColor +  '; }' +
                        
                        '#railwam-modal-title { color: ' + bodyTextColor + '; }' +
                        
                        '#railwam-modal-content-banner { color: ' + headerTextColor + '; background-color: ' + local.color.changeOpacity(headerBgColor, 0.7) + '; }' + 
                        
                        '.railwam-modal-navlink { color: ' + linkTextColor + '; }' +
                        
                        '.railwam-modal-sidebar-item-mobile {  background-color: ' + headerBgColor + ' ; }' +
                        
                        // Database
                        '.railwam-database-check { background-color: ' + pageBgColor + '; box-shadow: 0 0 0 2px ' + pageBgColor + ', ' + headerBgColor + ' 0 0 0 4px; }' +
                        
                        '.railwam-database-entrytable:nth-child(even) { background-color: ' + local.color.changeOpacity(headerBgColor, 0.05) + ' }' +
                        
                        '#railwam-database-searchside-container { background-color: ' + local.color.changeOpacity(headerBgColor, 0.05) + '; }' +
                        
                        '.railwam-database-tablehead:hover { background-color: ' + local.color.changeOpacity(headerBgColor, 0.05) + ' }' +
                        
                        '.railwam-database-tablehead:active { background-color: ' + local.color.changeOpacity(headerBgColor, 0.1) + ' }' +
                        
                        // Datepicker
                        '.railwam-datepicker { background-color: ' + pageBgColor + '; color: ' + bodyTextColor + '; }' +
                        
                        '#railwam-datepicker-startdate, #railwam-datepicker-enddate { background-color: ' + local.color.lighten(headerBgColor, 20) + '; color: ' + headerTextColor + '; }' +
                        
                        // Dashboard
                        '.railwam-dashboard-card { background: ' + pageBgColor + '; }' +  
                        
                        '#railwam-dashboard-database-container { background-image: linear-gradient(to top, ' + local.color.changeOpacity(local.color.lighten(wdsBgColor, 10), 0.9) + ' 50%, ' + local.color.changeOpacity(local.color.lighten(wdsBgColor, 10), 0.5) + '), url("https://vignette.wikia.nocookie.net/bniceshottest/images/5/56/Dashboard-database-bg.jpg/revision/latest"); color: ' + headerTextColor + '; }' +
                        
                        '.railwam-dashboard-svg { fill: ' + wdsBgColor + '; }' + 
                        
                        '.railwam-dashboard-util-container { border-top: 4px solid ' + wdsBgColor + '; }' + 
                        
                        '.railwam-wds:not(.wds-is-text):not(.wds-is-secondary) { background-color: ' + wdsBgColor + '; border-color: ' + wdsBgColor + '; color: ' + wdsTextColor + '; }' +
                        
                        '.railwam-wds:hover:not(.wds-is-text):not(.wds-is-secondary):not(:disabled), .railwam-wds:focus:not(.wds-is-text):not(.wds-is-secondary):not(:disabled), .railwam-wds:active:not(.wds-is-text):not(.wds-is-secondary):not(:disabled) { background-color: ' + local.color.lighten(wdsBgColor, 20) + '; border-color: ' + local.color.lighten(wdsBgColor, 20) + '; }' +
                        
                        // Graphs
                        '#railwam-graph-options { background-color: ' + local.color.changeOpacity(headerBgColor, 0.05) + '; }' + 
                        
                        // Log old
                        '#railwam-log-options { background-color: ' + local.color.changeOpacity(headerBgColor, 0.05) + '; }' +
                        
                        // Util
                        '.railwam-util-disabled { background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, ' + local.color.changeOpacity(headerBgColor, 0.1) + ' 10px, ' + local.color.changeOpacity(headerBgColor, 0.1) + ' 20px); }' +
                        
                        '.railwam-util-btn-hasbg { background-color: ' + local.color.changeOpacity(headerBgColor, 0.12) + '; color: ' + headerBgColor + '; }' +
                        
                        '.railwam-util-filter-input { background: ' + pageBgColor + '; border: 1px solid ' + local.color.changeOpacity(headerBgColor, 0.25) + '; }' +
                        
                        '.railwam-util-placeholder { color: ' + linkTextColor + '; }' +
                        
                        '.railwam-util-spinner > g > circle { stroke: ' + headerBgColor + '; }' +
                        
                        '.railwam-util-tab-active { border-bottom: 2px solid ' + linkTextColor + '; }' +
                        
                        '.railwam-util-tab-container { border-bottom: 1px solid ' + local.color.changeOpacity(headerBgColor, 0.25) + '; }'
                    
                    );
                    
                },
                
                /**
                 * Executes initial code for util based on page name.
                 * 
                 * @returns {void}
                 */
                start: function() {
                    
                    // Insert SVG
                    rw.svg.insert('body');
                    
                    // Insert CSS
                    local.insertCSS();
                    
                    // Determine if user has configured this page to be skipped
                    var skipPage = true;
                    
                    if (railWAM.loadOnNamespace === '__*__' && railWAM.loadOnPage === '__*__') {
                        skipPage = false;
                    } else if ($.isArray(railWAM.loadOnNamespace) === true) {
                        if (railWAM.loadOnNamespace.indexOf(mwConfig.wgNamespaceNumber) > -1) {
                            skipPage = false;
                        }
                    } else if (local.math.parseNum(railWAM.loadOnNamespace) === mwConfig.wgNamespaceNumber) {
                        skipPage = false;
                    }
                    
                    if (skipPage === true) {
                        const underscorePageName = mwConfig.wgPageName.replace(/_/g, ' ');
                        if ($.isArray(railWAM.loadOnPage) === true) {
                            if (railWAM.loadOnPage.indexOf(underscorePageName) > -1) {
                                skipPage = false;
                            }
                        } else if (railWAM.loadOnPage.toString() === underscorePageName) {
                            skipPage = false;
                        }
                    }
                    
                    /**
                     * Load RailWAM module if
                     *  RailWAM is set to load in the user's settings
                     *  the page is not the database page
                     *  the page or its namespace is specified in the user's settings
                     */
                    if ((/\/RailWAM\/(Database|Dashboard|Graph|Log)/).test(mwConfig.wgPageName) === false && 
                        (anonFlag === false || railWAM.showToAnons === true) && 
                        skipPage === false) {
                            
                        local.module.init();
                        
                        // Log page warning
                        $('.railwam-data-element:first-of-type').after(i18n.msg('logPageWarning').plain());
                        
                    // Load database if this page is the RailWAM Database's blank special page
                    } else if (mwConfig.wgPageName.indexOf('/RailWAM/Database') > -1) {
                        
                        local.date.getCreationDate(local.database.init);
                        
                    } else if (mwConfig.wgPageName.indexOf('/RailWAM/Dashboard') > -1) {
                        
                        local.dashboard.init();
                        
                    } else if (mwConfig.wgPageName.indexOf('/RailWAM/Graph') > -1) {
                        
                        local.date.getCreationDate(local.graph.init);
                        
                    } else if (mwConfig.wgPageName.indexOf('/RailWAM/Log') > -1) {
                        
                        local.date.getCreationDate(local.logOld.init);
                        
                    } else if (skipPage === true) {
                        
                        // This page or its namespace is not set to load RailWAM in the user's settings.
                        console.log('RailWAM: RailWAM ' + i18n.msg('errorPage').plain());
                        
                    }
                        
                },
                
            });
                
            local.module = {
                    
                    /**
                     * Initializes rail module.
                     * 
                     * @returns {void}
                     */
                    init: function() {
                        
                        if (railWAM.top5000Mode === true) {
                            
                            // Get score and rank data from WAM Index API
                            rw.data.getLogged(
                                {
                                    log: railWAM.logPage, 
                                    success: local.module.getFullData, 
                                    error: local.module.getFullData,
                                }
                            );
                            
                        } else if (railWAM.top5000Mode === false) {
                            
                            // Get score data only from Wiki Data API
                            rw.data.getLogged(
                                {
                                    log: railWAM.logPage, 
                                    success: local.module.getMinData, 
                                    error: local.module.getMinData,
                                }
                            );
                            
                        }
                        
                    },
                    
                    /**
                     * Retrieves data from the WAM index and displays rail module.
                     * 
                     * @param {Object} logged - Logged data
                     */
                    getFullData: function(logged) {
                        
                        rw.data.get(
                            {
                                wikiId: mwConfig.wgCityId, 
                                startDate: rw.config.maxDate,
                                endDate: rw.config.maxDate, 
                                logged: logged, 
                                wikis: 1,
                                
                                // Complete
                                callback: function(data) {
                                    
                                    data[rw.config.maxDate] = data[rw.config.maxDate] || {};
                                    
                                    if (isNaN(local.math.parseNum(data[rw.config.maxDate].wam_rank)) === false) {
                                        
                                        // No change - WAM has not been updated
                                        if (wamDate - rw.config.maxDate > 86400 * 2) {
                                            data[rw.config.maxDate - 86400] = data[rw.config.maxDate];
                                        }
                                        
                                        // Insert rail module
                                        local.module.insertModule(data, rw.config.maxDate);
                                        
                                    } else {
                                        
                                        // Get data from wiki data API
                                        local.module.getMinData(logged);
                                        
                                    }
                                
                                }
                            }
                        );
                            
                    },
                    
                    /**
                     * Retrieves data from wiki data and displays rail module.
                     * 
                     * @param {Object} logged - Logged data
                     */
                    getMinData: function(logged) {
                        
                        // Check if WAM servers updated for user-specified time after midnight UTC
                        const loggedForCheck = JSON.parse(JSON.stringify(logged)),
                            hrsToday = (curDate.getTime() / 1000 - wamDate) / 3600;
                        
                        if (railWAM.doubleCheckDelay > 0 && hrsToday % railWAM.doubleCheckDelay === hrsToday % (railWAM.doubleCheckDelay * 2)) {
                            loggedForCheck[wamDate] = null;
                        }
                        
                        rw.data.getLess(
                            {
                                
                                fixedWamDate: true,
                                wikiId: mwConfig.wgCityId, 
                                logged: loggedForCheck,
                                callback: function(data) {
                                    
                                    if ($.isEmptyObject(data[wamDate]) === false) {
                                        
                                        // Check if WAM servers updated late
                                        if (typeof logged[wamDate] === 'object' && logged[wamDate] !== null && local.math.parseNum(data[wamDate].wam) === local.math.parseNum(logged[wamDate].wam)) {
                                            data[wamDate].logged = true;
                                        }
                                        
                                        // Insert rail module
                                        local.module.insertModule(data, wamDate);
                                        
                                    } else {
                                        
                                        local.module.error();
                                        
                                    }
                                
                                },
                                
                                // Error
                                error: function() {
                                    
                                    local.module.error();
                                    
                                }
                            }
                        );
                        
                    },
                    
                    /**
                     * Adds the RailWAM module to the right rail.
                     * 
                     * @param {Object} data - WAM data
                     * @param {number} dateId - Date of data in seconds
                     * 
                     * @returns {void}
                     */
                    insertModule: function(data, dateId) {
                        
                        data[dateId - 86400] = $.extend({},
                                                        {
                                                            vertical_wam_rank: null,
                                                            wam: null,
                                                            wam_rank: null,
                                                        },
                                                        data[dateId - 86400]);
                        
                        // Ensure values are numerical
                        $.each(data, 
                            function(id, obj) {
                                
                                $.each(obj, 
                                    function(key, val) {
                                        
                                        if (key === 'wam' && (isNaN(local.math.parseNum(val)) === true || local.math.parseNum(val) > 100 || local.math.parseNum(val) < 0)) {
                                            data[id][key] = i18n.msg('unknown').plain();
                                        } else if (key === 'wam_rank' && (isNaN(local.math.parseNum(val)) === true || local.math.parseNum(val) > 5000 || local.math.parseNum(val) < 0)) {
                                            data[id][key] = i18n.msg('unknown').plain();
                                        }
                                        
                                    }
                                );
                                
                            }
                        );
                                                        
                        // SVG definition of WAM logo
                        const wamLogoSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" id="railwam-wam-logo"><use xlink:href="#railwam-modal-logo"/></svg>',
                                
                            // HTML of links
                            links = '<span id="railwam-link-container"><a id="railwam-faq" class="railwam-module-main-link">' + i18n.msg('faq').plain() + '</a><a href="//community.fandom.com/wiki/WAM" id="railwam-offical-page" class="railwam-module-main-link">' + i18n.msg('wamPage').plain() + '</a><a id="railwam-dashboard-link" class="railwam-module-main-link" href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Dashboard">' + i18n.msg('dashboard').plain() + '</a><br>' + i18n.msg('poweredBy').plain() + ' <a href="//dev.fandom.com/wiki/RailWAM">RailWAM</a></span>',
                                
                            // HTML of rank element if rank data is available
                            rankElm = isNaN(local.math.parseNum(data[dateId].wam_rank)) === false ? '<div id="railwam-rank-container"><div class="railwam-inline-block"><div class="railwam-module-label">' + i18n.msg('rank').plain() + '</div><div class="railwam-module-val">' + data[dateId].wam_rank + '</div></div><div class="railwam-module-data-container"><span id="railwam-rank-difference">+/- ' + i18n.msg('unknown').plain() + '</span></div></div>' : '',
                            
                            module = '<section class="rail-module" id="railwam-rail-mod"><h2 class="has-icon">' + wamLogoSvg + i18n.msg('todayTitle').plain() + '</h2><div id="railwam-module-center"><div id="railwam-score-container"><div class="railwam-inline-block"><div class="railwam-module-label">' + i18n.msg('score').plain() + '</div><div class="railwam-module-val">' + data[dateId].wam + '</div></div><div class="railwam-module-data-container"><span id="railwam-score-difference">+/- ' + i18n.msg('unknown').plain() + '</span></div></div>' + rankElm + '</div><span id="railwam-not-logged">' + i18n.msg('yesterdayNotLogged').plain() +'</span>' + links + '</section>';
                            
                        var appendElms = '';
                        
                        // Append RailWAM module after these modules
                        $.each(railWAM.appendAfter, function(i, elm) {
                            appendElms += elm + ', ';
                        });
                        
                        // Always append after ads
                        appendElms += '#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL';
                            
                        // Bottommost specified element
                        const appendAfter = $(appendElms).last();
                            
                        // Add module to right rail
                        if (appendAfter.length > 0) {
                                
                            // Append after specified modules
                            $(appendAfter).after(module);
                                    
                        } else {
                                
                            // Prepend to right rail - no ads present
                            $('#WikiaRail').prepend(module);
                                
                        }
                        
                        // Border CSS
                        mw.util.addCSS('#railwam-rank-container { border-left: 1px solid ' + $('.WikiaRail .rail-module h2').css('border-bottom-color') + '; }');
                            
                            
                        // Make FAQ link clickable
                        $('#railwam-faq').click(
                            
                            function(){
                            
                                local.faq.display();
                            
                            }
                        
                        );
                        
                        
                        // Calculate and display changes in score and rank
                        const scoreDiff = rw.math.diff(data[dateId].wam, data[dateId - 86400].wam);
                        var scorePercent = (((Math.abs(local.math.parseNum(data[dateId].wam) - local.math.parseNum(data[dateId - 86400].wam)) / local.math.parseNum(data[dateId - 86400].wam)) * 100).toFixed(1) + '%').replace('NaN', 'N/A');
                        
                        if (local.math.parseNum(data[dateId - 86400].wam) === 0) {
                            if (local.math.parseNum(data[dateId].wam === 0)) {
                                scorePercent = '0.0%';
                            } else {
                                scorePercent = 'N/A%';
                            }
                        }
                        
                        const scoreDiffElm = '<div class="railwam-inline-block">' + scoreDiff + '<br>' + scorePercent + '</div>';
                        
                        const rankDiff = rw.math.diff(data[dateId - 86400].wam_rank, data[dateId].wam_rank);
                        var rankPercent = (((Math.abs(local.math.parseNum(data[dateId].wam_rank) - local.math.parseNum(data[dateId - 86400].wam_rank)) / local.math.parseNum(data[dateId - 86400].wam_rank)) * 100).toFixed(1) + '%').replace('NaN', 'N/A');
                        
                        if (local.math.parseNum(data[dateId - 86400].wam_rank) === 0) {
                            if (local.math.parseNum(data[dateId].wam_rank === 0)) {
                                rankPercent = '0.0%';
                            } else {
                                rankPercent = 'N/A%';
                            }
                        }
                        const rankDiffElm = '<div class="railwam-inline-block">' + rankDiff + '<br>' + rankPercent,
                            notLoggedElm = $('#railwam-not-logged');
                        
                        if (railWAM.showChange === true) {
                            
                            if (typeof scoreDiff === 'string') {
                                $('#railwam-score-difference').html(scoreDiffElm);
                            }
                            
                            if (typeof rankDiff === 'string') {
                                $('#railwam-rank-difference').html(rankDiffElm);
                            } 
                            
                            if (typeof scoreDiff === 'string' || typeof rankDiff === 'string') {
                                notLoggedElm.css('display', 'none');
                            } else {
                                notLoggedElm.css('display', 'block');
                            }
                            
                        } else {
                            $('#railwam-score-difference').remove();
                            $('#railwam-rank-difference').remove();
                        }
                        
                        // Move arrows
                        const scoreArrow = $('#railwam-score-difference .railwam-arrow');
                        scoreArrow.remove();
                        $('#railwam-score-difference > div').before(scoreArrow);
                        
                        const rankArrow = $('#railwam-rank-difference .railwam-arrow');
                        rankArrow.remove();
                        $('#railwam-rank-difference > div').before(rankArrow);
                        
                        const showAlert = data[dateId].logged === false ? true : false;
                            
                        if (railWAM.autoLogForUsers.toString().indexOf(mwConfig.wgUserName) !== -1 && showAlert === true) {
                                
                            // Auto log WAM data
                            rw.data.log(
                                {
                                    data: data, 
                                    log: railWAM.logPage, 
                                    summary: '[[w:c:dev:RailWAM|RailWAM]]: ' + i18n.msg('logSummary').plain(), 
                                    types: ['wiki_id', 'wam', 'wam_rank', 'vertical_wam_rank'],
                                    addedBy: 'RailWAM',
                                    version: 3,
                                    bot: botFlag,
                                    override: true,
                                }
                            );
                                
                        } else if (railWAM.showLogAlert === true && showAlert === true) {
                            
                            data[dateId - 86400] = null;
                            
                            $.each(data, 
                            
                                function(key, wamObj) {
                                    
                                    if (wamObj !== null) {
                                        
                                        $.each(wamObj, 
                                        
                                            function(type, val) {
                                                
                                                if (val === i18n.msg('unknown').plain()) {
                                                    
                                                    data[key][type] = null;
                                                    
                                                }
                                                
                                            }
                                        
                                        );
                                        
                                        if ($.isEmptyObject(data[key]) === true) {
                                            
                                            data[key] = null;
                                            
                                        }
                                    
                                    }
                                    
                                }
                            
                            );
                                
                            // Show log alert if it is enabled in user's settings and data is not logged
                            local.module.logAlert(data);
                                
                        }
                        
                        // Module ready
                        mw.hook('rw.mod.moduleAdded').fire();
                            
                    },
                    
                    /**
                     * Shows alert with buttons to log WAM data.
                     * 
                     * @param {number} data - WAM data
                     * 
                     * @returns {void}
                     */
                    logAlert: function(data) {
                        
                        // Check if cookie to prevent alert is set
                        if (document.cookie.replace(/(?:(?:^|.*;\s*)railwamShowAlert\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "false") {
                            
                            $('#railwam-rail-mod').prepend('<div id="railwam-log-alert"><div id="railwam-log-alert-header"><div id="railwam-log-alert-icon-container" class="railwam-log-alert-header-element"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" id="railwam-log-alert-icon-svg"><use xlink:href="#railwam-log-alert-icon"/></svg></div><div id="railwam-log-alert-header-text" class="railwam-log-alert-header-element">' + i18n.msg('notLogged').plain() + '</div><div id="railwam-log-alert-drop-container" class="railwam-log-alert-header-element"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 48 28" id="railwam-log-alert-dropdown-svg"><use xlink:href="#railwam-dropdown-arrow"/></svg></div></div><div id="railwam-log-alert-body"><span id="railwam-log-alert-body-importanttext">' + i18n.msg('notLoggedDetails').plain() + '</span> ' + i18n.msg('notLoggedWarning').plain() + '<div id="railwam-log-alert-button-container"><button class="wds-button wds-is-secondary" id="railwam-log-alert-dismiss"><span>' + i18n.msg('dismiss').plain() + '</span></button><button class="wds-button" id="railwam-log-alert-log"><span>' + i18n.msg('logBtn').plain() + '</span></button></div></div></div>');
                            
                            const logAlertElm = $('#railwam-log-alert');
                            
                            var degrees = 0;
                            logAlertElm.click(function() {
                                
                                $('#railwam-log-alert-body').slideToggle(200);
                                
                                degrees += 180;
                                $('#railwam-log-alert-dropdown-svg', $(this)).css('transform', 'rotate(' + degrees + 'deg)');
                                
                            });
                            
                            // Make log link clickable and show done message on click
                            logAlertElm.on('click', '#railwam-log-alert-log', function(evt) {
                                
                                evt.stopPropagation();
                                
                                rw.data.log(
                                    {
                                        data: data, 
                                        log: railWAM.logPage, 
                                        summary: '[[w:c:dev:RailWAM|RailWAM]]: ' + i18n.msg('logSummary').plain(), 
                                        types: ['wiki_id', 'wam', 'wam_rank', 'vertical_wam_rank'],
                                        addedBy: 'RailWAM',
                                        version: 3,
                                        bot: botFlag,
                                        override: true,
                                    }
                                );
                                
                                $('#railwam-log-alert-body').html(i18n.msg('scoreLogged').plain());
                                logAlertElm.delay(3800).fadeOut(200, 
                                    function() {
                                        
                                        $(this).remove();
                                        
                                    }
                                );
                                
                            });
                            
                            // Make dismiss link clickable
                            logAlertElm.on('click', '#railwam-log-alert-dismiss', function(evt) {
                                
                                evt.stopPropagation();
                                
                                $('#railwam-log-alert-body').html(i18n.msg('cookieWarning').plain() + '<div id="railwam-log-alert-button-container"><button class="wds-button wds-is-secondary" id="railwam-log-alert-cancel"><span>' + i18n.msg('cancel').plain() + '</span></button><button class="wds-button" id="railwam-log-alert-confirmDismiss"><span>' + i18n.msg('dismiss').plain() + '</span></button></div>');
                                
                            });
                            
                            logAlertElm.on('click', '#railwam-log-alert-confirmDismiss', function(evt) {
                                
                                evt.stopPropagation();
                                
                                document.cookie = 'railwamShowAlert=false; domain=' + window.location.hostname + '; max-age=' + 86400;
                                
                                logAlertElm.fadeOut(500, 
                                    function() {
                                        
                                        $(this).remove();
                                        
                                    }
                                );
                                
                                // Alert hidden
                                mw.hook('rw.mod.alertHidden').fire();
                                
                            });
                            
                            logAlertElm.on('click', '#railwam-log-alert-cancel', function(evt) {
                                
                                evt.stopPropagation();
                                
                                $('#railwam-log-alert-body').html('<span id="railwam-log-alert-body-importanttext">' + i18n.msg('notLoggedDetails').plain() + '</span> ' + i18n.msg('notLoggedWarning').plain() + '<div id="railwam-log-alert-button-container"><button class="wds-button wds-is-secondary" id="railwam-log-alert-dismiss"><span>' + i18n.msg('dismiss').plain() + '</span></button><button class="wds-button" id="railwam-log-alert-log"><span>' + i18n.msg('logBtn').plain() + '</span></button></div>');
                                
                            });
                            
                        }
                        
                        // Alert ready
                        mw.hook('rw.mod.alertAdded').fire();
                            
                    },
                    
                    /**
                     * Creates module with error message in right rail.
                     * 
                     * @returns {void}
                     */
                    error: function() {
                        
                        if ($('#railwam-error-mod').length < 1) {
                            
                            const module = '<section class="rail-module" id="railwam-error-mod"><h2>' + i18n.msg('onErrorHeading').plain() + '</h2>' + i18n.msg('onError', '<a href="//dev.fandom.com/wiki/Talk:RailWAM" target="_blank" rel="noopener noreferrer">' + i18n.msg('talkLinkText').plain() + '</a>').plain() + '</section>';
                                
                            var appendElms = '';
                            
                            // Append RailWAM module after these modules
                            $.each(railWAM.appendAfter, function(i, elm) {
                                appendElms += elm + ', ';
                            });
                            
                            // Always append after ads
                            appendElms += '#top-right-boxad-wrapper, #top-boxad-wrapper, #NATIVE_TABOOLA_RAIL';
                                
                            // Bottommost specified element
                            const appendAfter = $(appendElms).last();
                                
                            // Add module to right rail
                            if (appendAfter.length > 0) {
                                    
                                // Append after specified modules
                                $(appendAfter).after(module);
                                        
                            } else {
                                    
                                // Prepend to right rail - no ads present
                                $('#WikiaRail').prepend(module);
                                    
                            }
                                
                        }
                        
                        // Error message added
                        mw.hook('rw.mod.errorAdded').fire();
                        
                    }
                    
                };
            
            local.database = {
                    
                    /**
                     * Initializes WAM database.
                     * 
                     * @param {number} dateCreated - Date of wiki creation in seconds
                     * 
                     * @returns {void}
                     */
                    init: function(dateCreated) {
                        
                        rw.data.getLogged(
                            {
                                log: railWAM.logPage, 
                                
                                callback: function(logged) {
                                    
                                    // Change title of page
                                    $('title').text('RailWAM: ' + i18n.msg('databaseAlt').plain() + fandomTitle);
                                    $('.page-header__title').text('RailWAM: ' + i18n.msg('databaseAlt').plain());
                                    
                                    // Dashboard backlink
                                    $('.page-header__page-subtitle').html('< <a href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Dashboard">' + i18n.msg('dashboard').plain() + '</a>');
                                    
                                    // Add main HTML
                                    const sortSvg = '<span class="railwam-database-sort-icon-container"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100" class="railwam-sort-icon"><use xlink:href="#railwam-unsorted"/></span>',
                                        searchfieldElm = '<div class="railwam-database-searchfield-container"><span><input type="text" id="railwam-database-searchfield-min" class="railwam-util-input railwam-util-filter-input" required><span class="railwam-util-placeholder railwam-util-filter-ph" id="railwam-database-searchfield-min-ph">' + i18n.msg('minScore').plain() + '</span><div id="railwam-database-searchfield-min-errors" class="railwam-database-searchfield-errors"></div></span></div><div class="railwam-database-searchfield-container"><span><input type="text" id="railwam-database-searchfield-max" class="railwam-util-input railwam-util-filter-input" required><span class="railwam-util-placeholder railwam-util-filter-ph" id="railwam-database-searchfield-max-ph">' + i18n.msg('maxScore').plain() + '</span><div id="railwam-database-searchfield-max-errors" class="railwam-database-searchfield-errors"></div></span></div>',
                                        loggedOnlyElm = '<div id="railwam-database-loggedonly-container"><input type="checkbox" id="railwam-database-loggedonly" checked><label for="railwam-database-loggedonly">' + i18n.msg('loggedOnly').plain() + '</label></div>';
                                    
                                    $('#mw-content-text').html('<div class="railwam-flex-container"><div class="railwam-database-searcharea-container" id="railwam-database-searchside-container"><div class="railwam-util-tab-container"><div class="railwam-util-tab railwam-util-tab-active" tabval="range">' + i18n.msg('dateRange').plain() + '</div><div class="railwam-util-tab" tabval="score">' + i18n.msg('score').plain() + '</div><div class="railwam-util-tab" tabval="rank">' + i18n.msg('rank').plain() + '</div><div class="railwam-util-tab" tabval="vertRank">' + i18n.msg('vertRank').plain() + '</div></div>' + searchfieldElm + '<span class="railwam-util-filter" id="railwam-database-daterange-filter-cont"><input class="railwam-util-filter-input railwam-util-input" id="railwam-database-daterange" type="text" required readonly="readonly"><div class="railwam-datepicker" id="railwam-datepicker-daterange"></div><span class="railwam-util-placeholder railwam-util-filter-ph">' + i18n.msg('dateRange').plain() + '</span><div id="railwam-database-daterange-errors"></div></span>' + loggedOnlyElm + '<a class="railwam-wds wds-button railwam-database-search-active" id="railwam-database-search">' + i18n.msg('search').plain() + '</a></div><div class="railwam-database-searcharea-container" id="railwam-database-seemorebox"><span class="railwam-util-heading">' + i18n.msg('databaseSeeMoreHeader').plain() + '</span><div>' + i18n.msg('dashGraphDesc').plain() + '</div><a class="railwam-wds wds-button" href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Graph">' + i18n.msg('dashGraphBtn').plain() + '</a></div></div><div id="railwam-database-tablehead-container"><div class="railwam-database-tablehead railwam-sort-selected" sort-id="date-id">' + i18n.msg('date').plain() + '<span class="railwam-smalltext">(' + timezone + ')</span><span class="railwam-database-sort-icon-container"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100" class="railwam-sort-icon"><use xlink:href="#railwam-sorted-dsc"/></span></div><div class="railwam-database-tablehead" sort-id="score">' + i18n.msg('score').plain() + sortSvg + '</div><div class="railwam-database-tablehead" sort-id="score-diff">' + i18n.msg('change').plain() + sortSvg + '</div><div class="railwam-database-tablehead" sort-id="rank">' + i18n.msg('rank').plain() + sortSvg + '</div><div class="railwam-database-tablehead" sort-id="rank-diff">' + i18n.msg('change').plain() + sortSvg + '</div><div class="railwam-database-tablehead" sort-id="vertRank">' + i18n.msg('vertRank').plain() + sortSvg + '</div><div class="railwam-database-tablehead" sort-id="vertRank-diff">' + i18n.msg('change').plain() + sortSvg + '</div></div><div id="railwam-database-loading"><svg class="railwam-util-spinner" width="25" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg"> <g> <circle fill="none" stroke-width="1" stroke-linecap="round" r="10"></circle></g></svg><span id="railwam-database-loading-text"></span></div><div id="railwam-database-noentry"><span id="railwam-database-noentry-text"></span></div><div id="railwam-util-logafter"><div id="railwam-util-logafter-text"><span class="railwam-bold">' + i18n.msg('logAfterHeader').plain() + '</span> <span id="railwam-notlogged-text-warning">' + i18n.msg('notLoggedWarning').plain() + '</span></div><div class="railwam-util-btn" id="railwam-util-logafter-dismiss">' + i18n.msg('dismiss').plain() + '</div><div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-logafter-log">' + i18n.msg('logBtn').plain() + '</div></div><div id="railwam-database-entries"></div>');
                                    
                                    const maxLabelWidth = local.css.getTextWidth([i18n.msg('minVertRank').plain(), i18n.msg('maxVertRank').plain()].sort(function (a, b) { return b.length - a.length; })[0], $('.railwam-database-searchfield-container .railwam-util-filter-input').css('font')),
                                        maxScoreWidth = local.css.getTextWidth('99.9999', $('.railwam-database-searchfield-container .railwam-util-filter-input').css('font')),
                                        searchfieldInputWidth = maxLabelWidth > maxScoreWidth ? maxLabelWidth : maxScoreWidth;
                                    
                                    $('.railwam-database-searchfield-container .railwam-util-filter-input').css('width', searchfieldInputWidth);
                                    
                                    // Placeholder hasVal class
                                    $('.railwam-database-searchfield-container .railwam-util-filter-input').change(
                                        function() {
                                            
                                            if ($(this).val() === '') {
                                                $(this).removeClass('railwam-util-hasVal');
                                            } else {
                                                $(this).addClass('railwam-util-hasVal');
                                            }
                                            
                                        }
                                    );
                                    
                                    // Search type change
                                    mw.hook('rw.tab.changed').add(
                                        function() {
                                            
                                            var minField = $('#railwam-database-searchfield-min').val('').change(),
                                                maxField = $('#railwam-database-searchfield-max').val('').change();
                                            
                                            // Clear input fields
                                            minField.val('').change();
                                            maxField.val('').change();
                                            
                                            // Clear errors
                                            minField.removeClass('railwam-util-input-error');
                                            maxField.removeClass('railwam-util-input-error');
                                            local.input.clearErrors('#railwam-database-searchfield-errors');
                                            
                                            const minPlaceholderElm = $('#railwam-database-searchfield-min-ph'),
                                                maxPlaceholderElm = $('#railwam-database-searchfield-max-ph');
                                            
                                            // Change placeholders
                                            switch ($('.railwam-util-tab-active').attr('tabval')) {
                                                case 'score':
                                                    minPlaceholderElm.text(i18n.msg('minScore').plain());
                                                    maxPlaceholderElm.text(i18n.msg('maxScore').plain());
                                                    break;
                                                case 'rank':
                                                    minPlaceholderElm.text(i18n.msg('minRank').plain());
                                                    maxPlaceholderElm.text(i18n.msg('maxRank').plain());
                                                    break;
                                                case 'vertRank':
                                                    minPlaceholderElm.text(i18n.msg('minVertRank').plain());
                                                    maxPlaceholderElm.text(i18n.msg('maxVertRank').plain());
                                                    break;
                                            }
                                                                                        
                                            // Make date range input read-only
                                            switch ($('.railwam-util-tab-active').attr('tabval')) {
                                                case 'range':
                                                    
                                                    // Hide searchfield
                                                    $('.railwam-database-searchfield-container').slideUp(200);
                                                    
                                                    break;
                                                case 'score':
                                                case 'rank':
                                                case 'vertRank':
                                                    
                                                    // Remove search field datepicker
                                                    $('.railwam-database-searchfield-container .railwam-datepicker').fadeOut(200,
                                                        function() {
                                                            
                                                            $(this).remove();
                                                            
                                                        }
                                                    );
                                                    
                                                    // Show searchfield
                                                    $('.railwam-database-searchfield-container').slideDown(200);
                                                    
                                                    break;
                                            }
                                            
                                            local.datepicker.init('daterange', dateCreated);
                                            
                                        }
                                    );
                                    
                                    // Check if ready to search on datepicker click
                                    mw.hook('rw.dp.dayClicked').add(
                                        function() {
                                            
                                            const displayRange = local.date.formatDate(dpStartDate) + ' - ' + local.date.formatDate(dpEndDate);
                                            $('#railwam-database-daterange').val(displayRange).change();
                                            
                                        }
                                    );
                                    
                                    // Table sorting
                                    $('.railwam-database-tablehead').click(
                                        function() {
                                            
                                            const sortId = $(this).attr('sort-id'),
                                                sortIcon = $('.railwam-sort-icon', $(this));
                                            
                                            if (this.asc === true) {
                                                this.asc = false;
                                                local.database.sortEntries(sortId, 'dsc');
                                                sortIcon.html('<use xlink:href="#railwam-sorted-dsc"/>');
                                            } else {
                                                this.asc = true;
                                                local.database.sortEntries(sortId, 'asc');
                                                sortIcon.html('<use xlink:href="#railwam-sorted-asc"/>');
                                            }
                                            
                                        }
                                    );
                                    
                                    // Validate on blur
                                    $('#railwam-database-searchfield-min').blur(
                                        function() {
                                            
                                            const searchType = $('.railwam-util-tab-active').attr('tabval');
                                            
                                            if (local.database.validate($(this), searchType, '#railwam-database-searchfield-min-errors') === true && local.database.validate($('#railwam-database-searchfield-max'), searchType, '#railwam-database-searchfield-max-errors') === true && $(this).val() > local.math.parseNum($('#railwam-database-searchfield-max').val())) {
                                                local.input.error(i18n.msg('errorAboveMax').plain(), 'aboveMax', '#railwam-database-searchfield-min-errors');
                                                $(this).addClass('railwam-util-input-error');
                                                
                                                // Clear any too high errors from max (yes, max) input
                                                local.input.clearErrors('#railwam-database-searchfield-max-errors');
                                                
                                            }
                                            
                                        }
                                    );
                                    
                                    // Validate on blur
                                    $('#railwam-database-searchfield-max').blur(
                                        function() {
                                            
                                            const searchType = $('.railwam-util-tab-active').attr('tabval');
                                            
                                            if (local.database.validate($(this), searchType, '#railwam-database-searchfield-max-errors') === true && local.database.validate($('#railwam-database-searchfield-min'), searchType, '#railwam-database-searchfield-in-errors') === true && $(this).val() < local.math.parseNum($('#railwam-database-searchfield-min').val())) {
                                                local.input.error(i18n.msg('errorBelowMin').plain(), 'belowMin', '#railwam-database-searchfield-max-errors');
                                                $(this).addClass('railwam-util-input-error');
                                                
                                                // Clear any too high errors from min (yes, min) input
                                                local.input.clearErrors('#railwam-database-searchfield-min-errors');
                                                
                                            }
                                            
                                        }
                                    );
                                    
                                    mw.hook('rw.dp.datepickerClosed').add(
                                        function() {
                                            
                                            local.database.validate($('#railwam-database-daterange'), 'range', '#railwam-database-daterange-errors');
                                            
                                        }
                                    );
                                    
                                    // Search button click events
                                    body.on('click', '.railwam-database-search-active',
                                
                                        function() {
                                            
                                            const dateRangeElm = $('#railwam-database-daterange'),
                                                minSearchfieldElm = $('#railwam-database-searchfield-min'),
                                                maxSearchfieldElm = $('#railwam-database-searchfield-max'),
                                                searchType = $('.railwam-util-tab-active').attr('tabval'),
                                                logAfterElm = $('#railwam-util-logafter');
                                            var input,
                                                showLogAfter = false;
                                            
                                            // Input fallbacks if no values are entered
                                            switch (searchType) {
                                                case 'range':
                                                    input = [dpStartDate, dpEndDate];
                                                    break;
                                                case 'score':
                                                    input = [minSearchfieldElm.val().trim() || 0, maxSearchfieldElm.val().trim() || 100];
                                                    break;
                                                case 'rank':
                                                case 'vertRank':
                                                    input = [minSearchfieldElm.val().trim() || 1, maxSearchfieldElm.val().trim() || 5000];
                                                    break;
                                            }
                                            
                                            if (((searchType !== 'range' && local.database.validate(minSearchfieldElm, searchType, '#railwam-database-searchfield-min-errors') === true && local.database.validate(maxSearchfieldElm, searchType, '#railwam-database-searchfield-max-errors') === true) || searchType === 'range') && local.database.validate(dateRangeElm, 'range', '#railwam-database-daterange-errors') === true) {
                                                
                                                mw.hook('rw.db.searchStarted').fire();
                                                
                                                // Clear database entries
                                                $('.railwam-database-entrytable').remove();
                                                
                                                // Disable search interface
                                                minSearchfieldElm.attr('readonly', 'readonly');
                                                maxSearchfieldElm.attr('readonly', 'readonly');
                                                $('#railwam-database-searchside-container .railwam-util-tab-container').css('pointer-events', 'none');
                                                $('#railwam-database-searchtype option:not(:checked)').attr('disabled', true);
                                                $('#railwam-database-loggedonly').attr('disabled', true);
                                                $('#railwam-database-searchside-container').addClass('railwam-util-disabled');
                                                $('.railwam-datepicker').css('display', 'none');
                                                
                                                // Search for logged data
                                                if ($('#railwam-database-loggedonly').is(':checked') === true) {
                                                    $.each(logged, 
                                                        
                                                        function(id, dayData) {
                                                            
                                                            if (typeof dayData === 'object' && local.database.checkEntry({input: input, data: logged, dateId: id, startDate: dpStartDate, endDate: dpEndDate}) === true) {
                                                                local.database.newEntry(logged, id);
                                                            }
                                                                        
                                                        }
                                                                
                                                    );
                                                    
                                                    logAfterElm.css('display', 'none');
                                                    local.database.timeLeft(0);
                                                    
                                                    mw.hook('rw.db.searchDone').fire();
                                                
                                                // Search for not logged data
                                                } else {
                                                    
                                                    rw.data.get(
                                                        {
                                                            wikiId: mwConfig.wgCityId, 
                                                            startDate: dpStartDate,
                                                            endDate: dpEndDate, 
                                                            logged: logged, 
                                                            wikis: 1,
                                                        
                                                            // Complete
                                                            callback: function(data) {
                                                                
                                                                $.each(data, 
                                                                
                                                                    function(id, dayData) {
                                                                        
                                                                        if (typeof dayData === 'object' && local.database.checkEntry({input: input, data: data, dateId: id, startDate: dpStartDate, endDate: dpEndDate}) === true) {
                                                                            local.database.newEntry(data, id);
                                                                        }
                                                                        
                                                                    }
                                                                
                                                                );
                                                                
                                                                local.database.timeLeft(0);
                                                                
                                                                mw.hook('rw.db.searchDone').fire();
                                                                
                                                                if (showLogAfter === true && railWAM.showLogAlert === true && $('.railwam-database-entrytable').length > 0) {
                                                                        
                                                                    // Show log data text
                                                                    logAfterElm.css('display', 'block');
                                                                    
                                                                } else {
                                                                    
                                                                    // Hide log data text
                                                                    logAfterElm.css('display', 'none');
                                                                    
                                                                }
                                                                
                                                                $.extend(logged, data);
                                                            
                                                            },
                                                                
                                                            // Done
                                                            success: function(data, dateId, requests) {
                                                                
                                                                local.database.timeLeft(requests * 10);
                                                                
                                                                showLogAfter = true;
                                                                
                                                            },
                                                            
                                                            // Error
                                                            error: function(data, dateId, requests) {
                                                                
                                                                local.database.timeLeft(requests * 10);
                                                                
                                                            },
                                                            
                                                            // Already exists
                                                            exists: function(data, dateId, requests) {
                                                                
                                                                if (data[dateId].logged === false) {
                                                                    showLogAfter = true;
                                                                }
                                                                
                                                            },
                                                        }
                                                    );
                                                }
                                                
                                            }
                                        
                                        }
                                    
                                    );
                                    
                                    // Create initial datepicker
                                    mw.hook('rw.tab.changed').fire();
                                    
                                    // Make FAQ link clickable
                                    $('#railwam-database-faq').click(function() {
                                        
                                        local.faq.display();
                                    
                                    });
                                    
                                    // Logafter click events
                                    
                                    // Dismiss button
                                    $('#railwam-util-logafter-dismiss').click(
                                        function(){
                                            
                                            $('#railwam-util-logafter').fadeOut(200);
                                            
                                            mw.hook('rw.db.logAlertDismissed').fire();
                                            
                                        }
                                    );
                                    
                                    // Log button
                                    body.on('click', '#railwam-util-logafter-log',
                                        function() {
                                            
                                            rw.data.log(
                                                {
                                                    data: logged, 
                                                    log: railWAM.logPage, 
                                                    summary: '[[w:c:dev:RailWAM|RailWAM]]: ' + i18n.msg('logSummary').plain(),
                                                    types: ['wiki_id', 'wam', 'wam_rank', 'vertical_wam_rank'],
                                                    addedBy: 'RailWAM',
                                                    version: 3,
                                                    bot: botFlag,
                                                    override: true,
                                                }
                                            );
                                            
                                            $('#railwam-util-logafter-text').text(i18n.msg('scoreLogged').plain());
                                            $('#railwam-util-logafter-log').remove();
                                            
                                            mw.hook('rw.db.dataLogged').fire();
                                            
                                        }
                                    );
                        
                                    // Click search on enter
                                    $(document).keydown(function(evt) {
                                        
                                        if (evt.key.trim() === 'Enter') {
                                            $('#railwam-database-search').trigger('click');
                                        } 
                                        
                                    });
                                    
                                    mw.hook('rw.db.uiAdded').fire();
                                    
                                }
                            }
                        );
                        
                    },
                    
                    /**
                     * Checks if retrieved data meets user's search.
                     * 
                     * @param {Object} entry - Object with following properties:
                     * - {Object|Array} input - [min, max]
                     * - {Object} data - WAM data
                     * - {number} dateId - Date of data in seconds
                     * - {number} startDate - First date in range
                     * - {number} endDate - Last date in range
                     * 
                     * @returns {boolean} Show (true) or do not show (false)
                     */
                    checkEntry: function(entry) {
                            
                        var wamVal;
                        
                        if (entry.dateId < local.math.parseNum(entry.startDate) || entry.dateId > local.math.parseNum(entry.endDate) || entry.dateId > rw.config.maxDate) {
                            return false;
                        }
                            
                        switch ($('.railwam-util-tab-active').attr('tabval')) {
                            case 'range':
                                return true;
                            case 'score':
                                wamVal = entry.data[entry.dateId].wam;
                                break;
                            case 'rank':
                                wamVal = entry.data[entry.dateId].wam_rank;
                                break;
                            case 'vertRank':
                                wamVal = entry.data[entry.dateId].vertical_wam_rank;
                                break;
                        }
                            
                        if (wamVal >= local.math.parseNum(entry.input[0]) && wamVal <= local.math.parseNum(entry.input[1])) {
                            return true;
                        } else {
                            return false;
                        }
                            
                    },
                    
                    /**
                     * Adds a new database entry.
                     * 
                     * @param {Object} data - WAM data
                     * @param {number} dateId - Date of data in seconds
                     * 
                     * @returns {void}
                     */
                    newEntry: function(data, dateId) {
                        
                        data[dateId] = $.extend( 
                                    {
                                        wam: null,
                                        wam_rank: null,
                                        vertical_wam_rank: null
                                    },
                                    data[dateId]
                                );
                                
                        data[dateId - 86400] = $.extend(
                                    {
                                        wam: null,
                                        wam_rank: null,
                                        vertical_wam_rank: null
                                    },
                                    data[dateId - 86400]
                                );
                        
                        const displayDate = local.date.formatDate(local.math.parseNum(dateId) + (curDate.getTimezoneOffset() * 60) + 3600, true),
                        
                            // Score
                            score = isNaN(local.math.parseNum(data[dateId].wam)) === false ? data[dateId].wam : i18n.msg('unknown').plain();
                            
                        var scoreDiff = rw.math.diff(data[dateId].wam, data[dateId - 86400].wam) || '+/- ' + i18n.msg('unknown').plain(),
                            scorePercent = scoreDiff !== '+/- ' + i18n.msg('unknown').plain() ? ('<span class="railwam-smalltext">(' + ((Math.abs(local.math.parseNum(data[dateId].wam) - local.math.parseNum(data[dateId - 86400].wam)) / local.math.parseNum(data[dateId - 86400].wam)) * 100).toFixed(1) + '%)</span>').replace('NaN', 'N/A') : '';
                            
                            // Rank
                        const rank = isNaN(local.math.parseNum(data[dateId].wam_rank)) === false ? data[dateId].wam_rank : i18n.msg('unknown').plain();
                        
                        var rankDiff = rw.math.diff(data[dateId - 86400].wam_rank, data[dateId].wam_rank) || '+/- ' + i18n.msg('unknown').plain(),
                            rankPercent = rankDiff !== '+/- ' + i18n.msg('unknown').plain() ? ('<span class="railwam-smalltext">(' + ((Math.abs(local.math.parseNum(data[dateId].wam_rank) - local.math.parseNum(data[dateId - 86400].wam_rank)) / local.math.parseNum(data[dateId - 86400].wam_rank)) * 100).toFixed(1) + '%)</span>').replace('NaN', 'N/A') : '';
                            
                            // Vertical rank
                        const vertRank = isNaN(local.math.parseNum(data[dateId].vertical_wam_rank)) === false ? data[dateId].vertical_wam_rank : i18n.msg('unknown').plain();
                            
                        var vertRankDiff = rw.math.diff(data[dateId - 86400].vertical_wam_rank, data[dateId].vertical_wam_rank) || '+/- ' + i18n.msg('unknown').plain(),
                            vertRankPercent = vertRankDiff !== '+/- ' + i18n.msg('unknown').plain() ? ('<span class="railwam-smalltext">(' + ((Math.abs(local.math.parseNum(data[dateId].vertical_wam_rank) - local.math.parseNum(data[dateId - 86400].vertical_wam_rank)) / local.math.parseNum(data[dateId - 86400].vertical_wam_rank)) * 100).toFixed(1) + '%)</span>').replace('NaN', 'N/A') : '';
                            
                        // Ensure percents are defined
                        if (local.math.parseNum(data[dateId - 86400].wam) === 0) {
                            
                            if (local.math.parseNum(data[dateId].wam === 0)) {
                                scorePercent = '<span class="railwam-smalltext">(0.0%)</span>';
                            } else {
                                scorePercent = '<span class="railwam-smalltext">(N/A%)</span>';
                            }
                            
                        }
                        
                        if (local.math.parseNum(data[dateId - 86400].wam_rank) === 0) {
                            
                            if (local.math.parseNum(data[dateId].wam_rank === 0)) {
                                rankPercent = '<span class="railwam-smalltext">(0.0%)</span>';
                            } else {
                                rankPercent = '<span class="railwam-smalltext">(N/A%)</span>';
                            }
                            
                        }
                        
                        if (local.math.parseNum(data[dateId - 86400].vertical_wam_rank) === 0) {
                            
                            if (local.math.parseNum(data[dateId].vertical_wam_rank === 0)) {
                                vertRankPercent = '<span class="railwam-smalltext">(0.0%)</span>';
                            } else {
                                vertRankPercent = '<span class="railwam-smalltext">(N/A%)</span>';
                            }
                            
                        }
                        
                        // Ensure score diff has 4 decimal places
                        if (scoreDiff !== '+/- ' + i18n.msg('unknown').plain()) {
                            scoreDiff = scoreDiff.replace(/> (\d|\.)*$/, '> ' + (local.math.parseNum((scoreDiff.match(/> (\d|\.)*$/)[0]).replace('> ', ''))).toFixed(4));
                        }
                        
                        // Create entry
                        if (score !== i18n.msg('unknown').plain() || rank !== i18n.msg('unknown').plain() || vertRank !== i18n.msg('unknown').plain()) {
        
                            // HTML
                            const entriesElm = $('#railwam-database-entries');
                            
                            entriesElm.append('<div class="railwam-database-entrytable" id="railwam-entrytable-' + dateId + '" date-id="' + dateId + '" score="' + score + '" score-diff="' + scoreDiff.replace(/<svg.*?xlink:href="#railwam-arrow-down".*?<\/svg> /, '-').replace(/^<.*>/, '').trim() + '" rank="' + rank + '"rank-diff="' + rankDiff.replace(/<svg.*?xlink:href="#railwam-arrow-up".*?<\/svg> /, '-').replace(/^<.*>/, '').trim() + '" vertRank="' + vertRank + '" vertRank-diff="' + vertRankDiff.replace(/<svg.*?xlink:href="#railwam-arrow-up".*?<\/svg> /, '-').replace(/^<.*>/, '').trim() + '"><div class="railwam-database-entrytable-column">' + displayDate + '</div><div class="railwam-database-entrytable-column">' + score  + '</div><div class="railwam-database-entrytable-column">' + scoreDiff + scorePercent  + '</div><div class="railwam-database-entrytable-column">' + rank + '</div><div class="railwam-database-entrytable-column">' + rankDiff + rankPercent  + '</div><div class="railwam-database-entrytable-column">' + vertRank + '</div><div class="railwam-database-entrytable-column">' + vertRankDiff + vertRankPercent + '</div></div>');
                            
                            mw.hook('rw.db.entryAdded').fire();
                            
                            // Sort entries
                            const sortSelected = document.querySelector('.railwam-sort-selected'),
                                sortDir = sortSelected.asc === true ? 'asc' : 'dsc';
                            local.database.sortEntries(sortSelected.getAttribute('sort-id'), sortDir);
                            
                        }
                            
                    },
                    
                    /**
                     * Sorts database entries.
                     * 
                     * @param {string} id - column to sort by
                     * @param {string} dir - asc or desc/dsc
                     * 
                     * @returns {void}
                     */
                    sortEntries: function(id, dir) {
                        
                        const sortIcon = $('.railwam-sort-icon', $('.railwam-database-tablehead[sort-id="' + id + '"]')),
                            tblHeads = Array.prototype.slice.call(document.querySelectorAll('.railwam-database-tablehead'));
                            
                            tblHeads.forEach(
                                function(elm) {
                                    if (elm.getAttribute('sort-id') === id) {
                                        
                                        if (elm.className.indexOf('railwam-sort-selected') === -1) {
                                            elm.className += ' railwam-sort-selected';
                                        }
                                        
                                    } else {
                                        elm.asc = true;
                                        elm.className = elm.className.replace(' railwam-sort-selected', '');
                                    }
                                }
                            );
                                            
                        $('.railwam-sort-icon').not(sortIcon).html('<use xlink:href="#railwam-unsorted"/>');
                        
                        const entriesElm = $('#railwam-database-entries');
                        
                        // Sort database entries based on attribute
                        entriesElm.find('.railwam-database-entrytable').sort(function (a, b) {
                            
                            // One or more values unknown
                            if (isNaN(local.math.parseNum($(a).attr(id))) === true && isNaN(local.math.parseNum($(b).attr(id))) === true) {
                                
                                // Sort by date if other value is unknown
                                if (dir === 'asc') {
                                    return local.math.parseNum($(a).attr('date-id')) - local.math.parseNum($(b).attr('date-id'));
                                } else {
                                    return local.math.parseNum($(b).attr('date-id')) - local.math.parseNum($(a).attr('date-id'));
                                }
                                
                            } if (isNaN(local.math.parseNum($(a).attr(id))) === true) {
                                return 1;
                            } else if (isNaN(local.math.parseNum($(b).attr(id))) === true) {
                                return -1;
                            }
                            
                            // Both values known
                            if (dir === 'asc') {
                                return local.math.parseNum($(a).attr(id)) - local.math.parseNum($(b).attr(id));
                            } else {
                                
                                // Default: Descending
                                return local.math.parseNum($(b).attr(id)) - local.math.parseNum($(a).attr(id));
                                
                            }
                            
                        }).appendTo(entriesElm);
                        
                        mw.hook('rw.db.entriesSorted').fire();
                        
                    },
                    
                    /**
                     * Shows time left label on database search and removes it when finished.
                     * 
                     * @param {number} sec - Seconds remaining in search
                     * 
                     * @returns {void}
                     */
                    timeLeft: function(sec) {
                        
                        const cancelBtnElm = $('#railwam-database-cancel'),
                            loadingElm = $('#railwam-database-loading'),
                            loadingTextElm = $('#railwam-database-loading-text'),
                            noEntryElm = $('#railwam-database-noentry'),
                            noEntryTextElm = $('#railwam-database-noentry-text'),
                            logAfterElm = $('#railwam-util-logafter');
                            
                        if (sec === 0) { 
                                
                            // Done
                            loadingTextElm.empty();
                            loadingElm.css('display', 'none');
                                
                            // No matching entries
                            if ($('.railwam-database-entrytable').length < 1) {
                                
                                // Show no results text
                                noEntryElm.css('display', 'block');
                                noEntryTextElm.text(i18n.msg('noEntry').plain());
                                
                                // Hide log data text
                                logAfterElm.css('display', 'none');
                                
                            } else {
                                
                                // Hide no results text
                                noEntryElm.css('display', 'none');
                                
                            }
                            
                            $('#railwam-database-searchfield-min').removeAttr('readonly');
                            $('#railwam-database-searchfield-max').removeAttr('readonly');
                            $('#railwam-database-searchside-container .railwam-util-tab-container').css('pointer-events', 'auto');
                            $('#railwam-database-searchtype option:not(:checked)').attr('disabled', false);
                            $('#railwam-database-loggedonly').attr('disabled', false);
                            $('#railwam-database-searchside-container').removeClass('railwam-util-disabled');
                            $('.railwam-datepicker').css('display', 'block');
                                
                        } else {  
                            
                            // Show loading text
                            loadingTextElm.text(local.time.createTimer(rw.math.convertTime(sec)));
                            
                            if (cancelBtnElm.length < 1) {
                                
                                loadingElm.append('<div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-database-cancel">' + i18n.msg('cancel').plain() + '</div>');
                                $('#railwam-database-cancel').click(
                                    function() {
                                
                                        rw.data.cancel('get');
                                        
                                        loadingTextElm.text(i18n.msg('duringCancel').plain());
                                        
                                        $(this).remove();
                                        
                                    }
                                );
                            }
                            
                            loadingElm.css('display', 'block');
                            noEntryElm.css('display', 'none');
                            logAfterElm.css('display', 'none');
                                
                        }
                    },
                    
                    /**
                     * Validates user's database search input.
                     * 
                     * @param {string} input - Search input
                     * @param {string} type - Type of input
                     * @param {string} errorContainer - Class or ID of error container
                     * 
                     * @returns {boolean} Whether input is valid
                     */
                    validate: function(inputElm, type, errorContainer) {
                        
                        var input = inputElm.val().trim().length > 0 ? local.math.parseNum(inputElm.val().trim()) : '',
                            isValid = false;
                        
                        local.input.clearErrors(errorContainer);
                        
                        switch (type) {
                            case 'range':
                                
                                if (typeof dpStartDate !== 'number' || typeof dpEndDate !== 'number') {
                                    
                                    local.input.error(i18n.msg('errorSelectRange').plain(), 'range', errorContainer);
                                    inputElm.addClass('railwam-util-input-error');
                                }
                                
                                inputElm.removeClass('railwam-util-input-error');
                                
                                isValid = true;
                                break;
                                
                            case 'score':
                                
                                if (input !== '') {
                                    if (isNaN(input) === true) {
                                        local.input.error(i18n.msg('errorScoreValidChars').plain(), 'char', errorContainer);
                                        inputElm.addClass('railwam-util-input-error');
                                    } else if (input < 0 || input > 100) {
                                        local.input.error(i18n.msg('errorScoreValidRange').plain(), 'tooHighOrLow', errorContainer);
                                        inputElm.addClass('railwam-util-input-error');
                                    }
                                }
                                
                                inputElm.removeClass('railwam-util-input-error');
                                
                                isValid = true;
                                break;
                                
                            case 'rank':
                            case 'vertRank':
                                
                                if (input !== '') {
                                    if (isNaN(input) === true) {
                                        local.input.error(i18n.msg('errorRankValidChars').plain(), 'char', errorContainer);
                                        inputElm.addClass('railwam-util-input-error');
                                    } else if (input < 1 || input > 5000) {
                                        local.input.error(i18n.msg('errorRankValidRange').plain(), 'tooHighOrLow', errorContainer);
                                        inputElm.addClass('railwam-util-input-error');
                                    }
                                }
                                
                                inputElm.removeClass('railwam-util-input-error');
                                
                                isValid = true;
                                
                        }
                        
                        if (isValid === true) {
                            mw.hook('rw.db.inputValid').fire();
                        } else {
                            mw.hook('rw.db.inputInvalid').fire();
                        }
                        
                        return isValid;
                            
                    },
                    
                };
                
            local.datepicker = {
                
                /**
                 * Initializes datepicker with given id.
                 * 
                 * @param {string} id - Unique id after "railwam-datepicker-"
                 * @param {number} min - Minimum date in datepicker (in seconds)
                 * @param {number} y - Year datepicker should start at; defaults to current year
                 * 
                 * @returns {void}
                 */
                init: function(id, min, y) {
                    
                    min = isNaN(local.math.parseNum(min)) === false ? min : rw.config.minDate;
                    
                    // Set up datepicker
                    const datepicker = $('#railwam-datepicker-' + id),
                        minY = new Date(min * 1000).getUTCFullYear();
                    
                    // Make sure datepicker has not already been set up
                    if (datepicker.children().length === 0) {
                        
                        y = y || curDate.getUTCFullYear();
                        
                        // Add month/day headings
                        datepicker.append('<div class="railwam-datepicker-year-select-cont"><select class="railwam-datepicker-year-selector"></select></div><table class="railwam-datepicker-week-header"><thead><tr><th>' + i18n.msg('sundayAbbrev').plain() + '</th><th>' + i18n.msg('mondayAbbrev').plain() + '</th><th>' + i18n.msg('tuesdayAbbrev').plain() + '</th><th>' + i18n.msg('wednesdayAbbrev').plain() + '</th><th>' + i18n.msg('thursdayAbbrev').plain() + '</th><th>' + i18n.msg('fridayAbbrev').plain() + '</th><th>' + i18n.msg('saturdayAbbrev').plain() + '</th></tr></thead></table><div class="railwam-datepicker-scroll-container"></div>');
                        
                        for (var i = curDate.getUTCFullYear(); i >= minY; i--) {
                            $('.railwam-datepicker-year-selector').append('<option val="' + i + '">' + i + '</option>');
                        }
                        
                        $('.railwam-datepicker-week-header').css('width', datepicker.width() - scrollbarWidth);
                        datepicker.css('padding-left', scrollbarWidth);
                        $('.railwam-datepicker-year-select-cont', datepicker).css('padding-right', scrollbarWidth);
                        
                        // Add days
                        local.datepicker.populateYear(y, dpStartDate, dpEndDate, id, min);
                        
                        // Add datepicker events
                        local.datepicker.addEvents(id, min);
                        
                    }
                    
                },
                
                /**
                 * Adds events for datepicker
                 * 
                 * @param {string} id - Unique ID of datepicker
                 * @param {number} min - Date of minimum date for datepicker in seconds
                 * 
                 * @returns {void}
                 */
                addEvents: function(id, min) {
                    
                    var curMonth = curDate.getUTCMonth(),
                        curYear = curDate.getUTCFullYear();
                    
                    // Placeholder hasVal class
                    $('#railwam-datepicker-' + id).siblings('.railwam-util-input').change(
                        function() {
                            
                            if ($(this).val() === '') {
                                $(this).removeClass('railwam-util-hasVal');
                            } else {
                                $(this).addClass('railwam-util-hasVal');
                            }
                            
                        }
                    );
                    
                    $('#railwam-datepicker-' + id).siblings('.railwam-util-input').focus(
                        function() {
                            
                            $(this).addClass('railwam-util-hasVal');
                            $('#railwam-datepicker-' + id).css({'opacity': 1, 'pointer-events': 'auto', 'visibility': 'visible'});
                            
                        }
                    );
                    
                    body.on('click', '#railwam-datepicker-' + id + ' .railwam-datepicker-days th:not(:empty)',
                        function() {
                            
                            // Adjust year
                            const adjY = curYear + Math.floor(curMonth / 12);
                            
                            var m = local.math.parseNum($(this).parents('.railwam-datepicker-month-calendar').attr('month-id'));
                            
                            if ($(this).text() !== '') {
                                
                                const dpStartDateElm = $('#railwam-datepicker-startdate', $('#railwam-datepicker-' + id)),
                                    dpEndDateElm = $('#railwam-datepicker-enddate', $('#railwam-datepicker-' + id)),
                                    rangeInputElm = $('#railwam-datepicker-' + id).siblings('.railwam-util-input');
                                
                                if (typeof dpStartDate === 'number' && Date.UTC(adjY, m, $(this).text()) / 1000 > dpStartDate) {
                                    
                                    if (dpEndDate !== '') {
                                        dpStartDateElm.attr('id', '');
                                        dpEndDateElm.attr('id', '');
                                        $('#railwam-datepicker-' + id + ' .railwam-datepicker-selected').css('background', '').removeClass('railwam-datepicker-selected');
                                        $(this).attr('id', 'railwam-datepicker-startdate');
                                        dpStartDate = Date.UTC(adjY, m, $(this).text()) / 1000;
                                        dpEndDate = '';
                                    } else {
                                                        
                                        if (dpStartDateElm.length > 0) {
                                            
                                            if (local.math.parseNum(dpStartDateElm.parents('.railwam-datepicker-month-calendar').attr('month-id')) === m) {
                                                
                                               if (dpStartDateElm.parent()[0] === $(this).parent()[0]) {
                                                    (dpStartDateElm.nextUntil($(this))).addClass('railwam-datepicker-selected');
                                                } else {
                                                    $('th:not(:empty)', ((dpStartDateElm.parent()).nextUntil($(this).parent()))).addClass('railwam-datepicker-selected');
                                                    dpStartDateElm.nextAll('th:not(:empty)').addClass('railwam-datepicker-selected');
                                                    $(this).prevAll('#railwam-datepicker-' + id + ' .railwam-datepicker-days th:not(:empty)').addClass('railwam-datepicker-selected');
                                                } 
                                                
                                            } else {
                                                dpStartDateElm.nextAll('th:not(:empty)').addClass('railwam-datepicker-selected');
                                                dpStartDateElm.parent().nextUntil($('.railwam-datepicker-days tr:last-child')).addClass('railwam-datepicker-selected');
                                                
                                                // If start date elm is not in the last row
                                                if (typeof dpStartDateElm.parent().siblings('tr:last-child')[0] === 'object') {
                                                    $('.railwam-datepicker-days tr:last-child th:not(:empty)', $('#railwam-datepicker-month-' + dpStartDateElm.parents('.railwam-datepicker-month-calendar').attr('month-id'))).addClass('railwam-datepicker-selected');
                                                }
                                                
                                                $(this).prevAll('#railwam-datepicker-' + id + ' .railwam-datepicker-days th:not(:empty)').addClass('railwam-datepicker-selected');
                                                $('th:not(:empty)', $(this).parent().prevAll()).addClass('railwam-datepicker-selected');
                                                
                                                // Select intermediate months
                                                for (var i = local.math.parseNum(dpStartDateElm.parents('.railwam-datepicker-month-calendar').attr('month-id')) + 1; i < m; i++) {
                                                    
                                                    $('#railwam-datepicker-month-' + i + ' .railwam-datepicker-days th:not(:empty)').addClass('railwam-datepicker-selected');
                                                    
                                                }
                                                
                                            }
                                            
                                        } else {
                                            $(this).prevAll('#railwam-datepicker-' + id + ' .railwam-datepicker-days th:not(:empty)').addClass('railwam-datepicker-selected');
                                            $('th:not(:empty)', $(this).parent().prevAll()).addClass('railwam-datepicker-selected');
                                            $('th:not(:empty)', $(this).parents('.railwam-datepicker-month-calendar').prevAll()).addClass('railwam-datepicker-selected');
                                        }
                                        
                                        $('#railwam-datepicker-' + id + ' .railwam-datepicker-selected').css('background', local.color.changeOpacity(local.color.lighten(headerBgColor, 60), 0.7));
                                        $(this).attr('id', 'railwam-datepicker-enddate');
                                        dpEndDate = Date.UTC(adjY, m, $(this).text()) / 1000;
                                        
                                        // Expand input if necessary
                                        const minWidth = local.css.getTextWidth(local.date.formatDate(dpStartDate) + ' - ' + local.date.formatDate(dpEndDate), rangeInputElm.css('font'));
                                        if (minWidth > rangeInputElm.width()) {
                                            rangeInputElm.width(minWidth);
                                        }
                                        
                                    }
                                    
                                } else {
                                    dpStartDateElm.attr('id', '');
                                    dpEndDateElm.attr('id', '');
                                    $(this).attr('id', 'railwam-datepicker-startdate');
                                    dpStartDate = Date.UTC(adjY, m, $(this).text()) / 1000;
                                    dpEndDate = '';
                                    $('#railwam-datepicker-' + id + ' .railwam-datepicker-selected').css('background', '').removeClass('railwam-datepicker-selected');
                                }
                                            
                            }
                            
                            // Add/remove hasVal class
                            $('#railwam-datepicker-' + id).siblings('.railwam-util-input').change();
                            
                            mw.hook('rw.dp.dayClicked').fire();
                            
                        }
                    );
                    
                    body.on('change', '.railwam-datepicker-year-selector',
                        function() {
                            
                            curYear = local.math.parseNum($(this).val());
                            
                            local.datepicker.populateYear(curYear, dpStartDate, dpEndDate, id, min);
                            
                            mw.hook('rw.dp.yearChanged').fire();
                            
                        }
                    );
                    
                    body.on('mousedown',
                        function(evt) {
                            
                            if ($(evt.target).closest('#railwam-datepicker-' + id).length === 0 && $(evt.target).closest($('#railwam-datepicker-' + id).siblings('.railwam-util-input')).length === 0) {
                                
                                if ($('#railwam-datepicker-' + id).css('visibility') === 'visible') {
                                    $('#railwam-datepicker-' + id).css({'opacity': 0, 'pointer-events': 'none', 'visibility': 'hidden'});
                                    
                                    mw.hook('rw.dp.datepickerClosed').fire();
                                }
                                
                                if ($('#railwam-datepicker-' + id).siblings('.railwam-util-input').val() === '') {
                                    $('#railwam-datepicker-' + id).siblings('.railwam-util-input').removeClass('railwam-util-hasVal');
                                }
                                
                            } else {
                                
                                if ($('#railwam-datepicker-' + id).css('visibility') === 'hidden') {
                                    $('#railwam-datepicker-' + id).css({'opacity': 1, 'pointer-events': 'auto', 'visibility': 'visible'});
                                    
                                    mw.hook('rw.dp.datepickerOpened').fire();
                                }
                                
                                mw.hook('rw.dp.datepickerClicked').fire();
                                
                            }
                            
                        }
                    );
                    
                },
                
                /**
                 * Populates datepicker with year data
                 * 
                 * @param {number} y - year
                 * @param {number} startDate - id of starting date
                 * @param {number} endDate - id of ending date
                 * @param {string} id - unique id of datepicker after "railwam-datepicker-"
                 * @param {number} min - minimum date of datepicker (in seconds)
                 * 
                 * @returns {void}
                 */
                populateYear: function(y, startDate, endDate, id, min) {
                    
                    if ($('.railwam-datepicker').length > 0) {
                        
                        // Get datepicker by id
                        const datepicker = $('#railwam-datepicker-' + id).length > 0 ? $('#railwam-datepicker-' + id) : $('.railwam-datepicker'),
                            minDate = new Date(min * 1000);
                        
                        // Clear old months
                        $('.railwam-datepicker-scroll-container', datepicker).empty();
                        
                        var m = 0;
                        
                        while ((m <= 11 && y < curDate.getUTCFullYear()) || (m <= curDate.getUTCMonth() && y === curDate.getUTCFullYear())) {
                            
                            if (y > minDate.getUTCFullYear() || (m >= minDate.getUTCMonth() && y === minDate.getUTCFullYear())) {
                                
                                $('.railwam-datepicker-scroll-container', datepicker).append('<div class="railwam-datepicker-month-calendar" id="railwam-datepicker-month-' + m + '" month-id="' + m + '"><div class="railwam-datepicker-month-container"><span class="railwam-datepicker-monthname"></span></div><table class="railwam-datepicker-day-table"><tbody class="railwam-datepicker-days"></tbody></table></div>');
                            
                                const dayContainerElm = $('#railwam-datepicker-month-' + m + ' .railwam-datepicker-days', datepicker);
                                
                                $('#railwam-datepicker-month-' + m + ' .railwam-datepicker-monthname', datepicker).text(local.date.getMonthName(m) + ' ' + y);
                                
                                $('.WikiaArticle').css('overflow', 'visible');
                                dayContainerElm.append('<tr></tr>');
                                
                                const firstDate = new Date(y, m, 1);
                                
                                // Add in previous month's days in first week
                                if (firstDate.getDay() > 0) {
            
                                    while (firstDate.getDay() > 0) {
                                        
                                        $('#railwam-datepicker-month-' + m + ' .railwam-datepicker-days tr', datepicker).prepend('<th></th>');
                                        firstDate.setDate(firstDate.getDate() - 1);
                                        
                                    }
                                }
                                    
                                // Add this month's days
                                const startDateObj = new Date(startDate * 1000),
                                    endDateObj = new Date(endDate * 1000);
                                for (var i = 0; i < local.date.getDaysInMonth(m, y); i++) {
                                    
                                    var startEndId = '',
                                        day = i + 1;
                                    
                                    if (startDateObj.getUTCDate() === day && startDateObj.getUTCMonth() === m && startDateObj.getUTCFullYear() === y) {
                                        startEndId = ' id="railwam-datepicker-startdate"';
                                    }
                                    
                                    if (endDateObj.getUTCDate() === day && endDateObj.getUTCMonth() === m && endDateObj.getUTCFullYear() === y) {
                                        startEndId = ' id="railwam-datepicker-enddate"';
                                    }
                                    
                                    if ((curDate.getUTCMonth() === m && curDate.getUTCFullYear() === y && curDate.getUTCDate() < day) || (minDate.getUTCMonth() === m && minDate.getUTCFullYear() === y && minDate.getUTCDate() > day)) {
                                        day = '';
                                    }
                                    
                                    if (typeof day === 'number') {
                                        
                                        if ($('#railwam-datepicker-month-' + m + ' .railwam-datepicker-days tr:last-child th', datepicker).length === 7) {
                                            dayContainerElm.append('<tr><th' + startEndId + '>' + day + '</th></tr>');
                                        } else {
                                            $('#railwam-datepicker-month-' + m + ' .railwam-datepicker-days tr:last-child', datepicker).append('<th' + startEndId + '>' + day + '</th>');
                                        }
                                        
                                    }
                                    
                                }
                                
                                // Fill rest of calendar
                                while ($('#railwam-datepicker-month-' + m + ' .railwam-datepicker-days tr:last-child th', datepicker).length < 7) {
                                    
                                    $('#railwam-datepicker-month-' + m + ' .railwam-datepicker-days tr:last-child', datepicker).append('<th></th>');
                                    
                                }
                                
                                const startDateElm = $('#railwam-datepicker-month-' + m + ' #railwam-datepicker-startdate', datepicker),
                                    endDateElm = $('#railwam-datepicker-month-' + m + ' #railwam-datepicker-enddate', datepicker);
                                if (startDateElm.length > 0) {
                                    
                                    if (endDateElm.length > 0) {
                                        if (startDateElm.parent()[0] === endDateElm.parent()[0]) {
                                            (startDateElm.nextUntil(endDateElm)).addClass('railwam-datepicker-selected');
                                        } else {
                                            $('#railwam-datepicker-month-' + m + ' th:not(:empty)', (startDateElm.parent()).nextUntil(endDateElm.parent())).addClass('railwam-datepicker-selected');
                                            startDateElm.nextAll('th:not(:empty)').addClass('railwam-datepicker-selected');
                                            endDateElm.prevAll('.railwam-datepicker-days th:not(:empty)').addClass('railwam-datepicker-selected');
                                        }
                                    } else if (isNaN(local.math.parseNum(endDate)) === false) {
                                        startDateElm.nextAll('th:not(:empty)').addClass('railwam-datepicker-selected');
                                        $('th:not(:empty)', (startDateElm.parent()).nextAll()).addClass('railwam-datepicker-selected');
                                    }
                                    
                                } else {
                                    
                                    if (endDateElm.length > 0) {
                                        endDateElm.prevAll('.railwam-datepicker-days th:not(:empty)').addClass('railwam-datepicker-selected');
                                        $('th:not(:empty)', (endDateElm.parent()).prevAll()).addClass('railwam-datepicker-selected');
                                    } else if (new Date(y, m, 1).getTime() / 1000 > startDate && new Date(y, m + 1, -1).getTime() / 1000 < endDate) {
                                        $('#railwam-datepicker-month-' + m + ' .railwam-datepicker-days th:not(:empty)').addClass('railwam-datepicker-selected');
                                    }
                                    
                                }
                                $('#railwam-datepicker-month-' + m + ' .railwam-datepicker-selected', datepicker).css('background', local.color.changeOpacity(local.color.lighten(headerBgColor, 60), 0.7));
                            
                            }
                            
                            m++;
                        
                        }
                    
                    }
                    
                    mw.hook('rw.dp.yearPopulated').fire();
                    
                },
                
            };
                
            local.dashboard = {
                
                    /**
                     * Initializes dashboard.
                     * 
                     * @returns {void}
                     */
                    init: function() {
                        
                        if (railWAM.top5000Mode === true) {
                            
                            // Get score and rank data from WAM Index API
                            rw.data.getLogged(
                                {
                                    log: railWAM.logPage, 
                                    success: local.dashboard.getFullData, 
                                    error: local.dashboard.getFullData,
                                }
                            );
                                    
                        } else if (railWAM.top5000Mode === false) {
                            
                            // Get score data only from Wiki Data API
                            rw.data.getLogged(
                                {
                                    log: railWAM.logPage, 
                                    success: local.dashboard.getMinData, 
                                    error: local.dashboard.getMinData,
                                }
                            );
                                    
                        }
                        
                    },
                    
                    /**
                     * Retrieves data from the WAM index for dashboard cards.
                     * 
                     * @param {Object} logged - Logged data
                     */
                    getFullData: function(logged) {
                        
                        rw.data.get(
                            {
                                wikiId: mwConfig.wgCityId, 
                                startDate: rw.config.maxDate,
                                endDate: rw.config.maxDate, 
                                logged: logged, 
                                wikis: 1,
                                
                                // Complete
                                callback: function(data) {
                                    
                                    if ($.isEmptyObject(data[rw.config.maxDate]) === false) {
                                        
                                        // No change - WAM has not been updated
                                        if (wamDate - rw.config.maxDate > 86400 * 2) {
                                            data[rw.config.maxDate - 86400] = data[rw.config.maxDate];
                                        }
                                        
                                        // Insert rail module
                                        local.dashboard.insertHTML(data, rw.config.maxDate);
                                        
                                    } else {
                                        
                                        // Get data from wiki data API
                                        local.dashboard.getMinData(logged);
                                        
                                    }
                                
                                }
                            }
                        );
                        
                    },
                    
                    /**
                     * Retrieves data from wiki data and displays sidebar.
                     * 
                     * @param {Object} logged - Logged data
                     */
                    getMinData: function(logged) {
                        
                        rw.data.getLess(
                            {
                            
                                fixedWamDate: true,
                                wikiId: mwConfig.wgCityId, 
                                logged: logged, 
                                callback: function(data) {
                                    
                                    // Insert rail module
                                    local.dashboard.insertHTML(data, wamDate);
                                
                                },
                            }
                        );
                        
                    },
                    
                    /**
                     * Inserts dashboard HTML content into page.
                     * 
                     * @param {Object} data - WAM data
                     * @param {number} dateId - Date of data in seconds
                     * 
                     * @returns {void}
                     */
                    insertHTML: function(data, dateId) {
                        
                        data[dateId] = $.extend({},
                                            {
                                                vertical_wam_rank: null,
                                                wam: null,
                                                wam_rank: null,
                                            },
                                            data[dateId]);
                        
                        data[dateId - 86400] = $.extend({},
                                            {
                                                vertical_wam_rank: null,
                                                wam: null,
                                                wam_rank: null,
                                            },
                                            data[dateId - 86400]);
                        
                        // Ensure values are defined
                        $.each(data, 
                            function(id, obj) {
                                
                                $.each(obj, 
                                    function(key, val) {
                                        
                                        if (key === 'wam' && (isNaN(local.math.parseNum(val)) === true || local.math.parseNum(val) > 100 || local.math.parseNum(val) < 0)) {
                                            data[id][key] = i18n.msg('unknown').plain();
                                        } else if ((key === 'wam_rank' || key === 'vertical_wam_rank') && (isNaN(local.math.parseNum(val)) === true || local.math.parseNum(val) > 5000 || local.math.parseNum(val) < 0)) {
                                            data[id][key] = i18n.msg('unknown').plain();
                                        }
                                        
                                    }
                                );
                                
                            }
                        );
                        
                        // Change title of page
                        $('title').text('RailWAM: ' + i18n.msg('dashboard').plain() + fandomTitle);
                        $('.page-header__title').text('RailWAM: ' + i18n.msg('dashboard').plain());
                        
                        const scoreElm = '<div id="railwam-dashboard-score-container" class="railwam-dashboard-data-flex-item railwam-dashboard-card"><div class="railwam-inline-block"><div class="railwam-module-label">' + i18n.msg('score').plain() + '</div><div class="railwam-module-val">' + data[dateId].wam + '</div></div><div class="railwam-module-data-container"><span id="railwam-score-difference">+/- ' + i18n.msg('unknown').plain() + '</span></div></div>',
                            rankElm = '<div id="railwam-dashboard-rank-container" class="railwam-dashboard-data-flex-item railwam-dashboard-card"><div class="railwam-inline-block"><div class="railwam-module-label">' + i18n.msg('rank').plain() + '</div><div class="railwam-module-val">' + data[dateId].wam_rank + '</div></div><div class="railwam-module-data-container"><span id="railwam-rank-difference">+/- ' + i18n.msg('unknown').plain() + '</span></div></div>',
                            vertRankElm = '<div id="railwam-dashboard-vertRank-container" class="railwam-dashboard-data-flex-item railwam-dashboard-card"><div class="railwam-inline-block"><div class="railwam-module-label">' + i18n.msg('vertRank').plain() + '</div><div class="railwam-module-val">' + data[dateId].vertical_wam_rank + '</div></div><div class="railwam-module-data-container"><span id="railwam-vertRank-difference">+/- ' + i18n.msg('unknown').plain() + '</span></div></div>';
                        
                        // Add main HTML
                        $('#mw-content-text').html('<div class="railwam-flex-container" id="railwam-dashboard-wam-container">' + scoreElm + rankElm + vertRankElm + '</div><span id="railwam-not-logged">' + i18n.msg('yesterdayNotLogged').plain() +'</span><div class="railwam-flex-container railwam-dashboard-card"><div id="railwam-dashboard-wam-graph-container"><canvas id="railwam-dashboard-wam-chart"></canvas></div><div id="railwam-dashboard-graph-link-container"><span class="railwam-dashboard-jumbo-heading">' + i18n.msg('dashGraphHeading').plain() + '</span><span class="railwam-dashboard-jumbo-desc">' + i18n.msg('dashGraphDesc').plain() + '</span><a class="railwam-wds wds-button" href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Graph">' + i18n.msg('dashGraphBtn').plain() + '</a></div></div><div id="railwam-dashboard-database-container" class="railwam-dashboard-card"><span class="railwam-dashboard-jumbo-heading">' + i18n.msg('database').plain() + '</span><span class="railwam-dashboard-jumbo-desc">' + i18n.msg('dashDatabaseDesc').plain() + '</span><a class="railwam-wds wds-button" href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Database">' + i18n.msg('wamDatabase').plain() + '</a></div><div id="railwam-dashboard-util-section-container"><div class="railwam-flex-container"><div class="railwam-dashboard-util-container railwam-dashboard-card"><div class="railwam-dashboard-util-icon-container"><svg class="railwam-dashboard-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 563 500" id="railwam-log-old-icon"><use xlink:href="#railwam-log-old"/></svg></div><div class="railwam-dashboard-util-desc">' + i18n.msg('dashLogDesc').plain() + '</div><a class="railwam-wds wds-button" href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Log">' + i18n.msg('dashLogBtn').plain() + '</a></div><div class="railwam-dashboard-util-container railwam-dashboard-card"><div class="railwam-dashboard-util-icon-container"><svg class="railwam-dashboard-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" id="railwam-docs-icon"><use xlink:href="#railwam-docs"/></svg></div><div class="railwam-dashboard-util-desc">' + i18n.msg('dashDocsDesc').plain() + '</div><a class="railwam-wds wds-button" href="//dev.fandom.com/wiki/RailWAM">' + i18n.msg('dashDocsBtn').plain() + '</a></div><div class="railwam-dashboard-util-container railwam-dashboard-card"><div class="railwam-dashboard-util-icon-container"><svg class="railwam-dashboard-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" id="railwam-faq-icon"><use xlink:href="#railwam-faq"/></svg></div><div class="railwam-dashboard-util-desc">' + i18n.msg('dashFaqDesc').plain() + '</div><a class="railwam-wds wds-button" id="railwam-dashboard-faq-link">' + i18n.msg('dashFaqBtn').plain() + '</a></div></div></div>');
                        
                        // FAQ link
                        $('#railwam-dashboard-faq-link').click(
                            function() {
                                
                                local.faq.display();
                                
                            }
                        );
                        
                        // Calculate and display change in score
                        const scoreDiff = data[dateId].wam - data[dateId - 86400].wam;
                        var scoreDiffSvg = rw.math.diff(scoreDiff),
                            scorePercent = (((Math.abs(local.math.parseNum(data[dateId].wam) - local.math.parseNum(data[dateId - 86400].wam)) / local.math.parseNum(data[dateId - 86400].wam)) * 100).toFixed(1) + '%').replace('NaN', 'N/A');
                        
                        if (local.math.parseNum(data[dateId - 86400].wam) === 0) {
                            if (local.math.parseNum(data[dateId].wam === 0)) {
                                scorePercent = '0.0%';
                            } else {
                                scorePercent = 'N/A%';
                            }
                        }
                        
                        // Ensure score diff has 4 decimal places
                        scoreDiffSvg = typeof scoreDiffSvg === 'string' ? scoreDiffSvg.replace(/> (\d|\.)*$/, '> ' + (local.math.parseNum((scoreDiffSvg.match(/> (\d|\.)*$/)[0]).replace('> ', ''))).toFixed(4)) : NaN;
                        
                        const scoreDiffElm = '<div class="railwam-inline-block">' + scoreDiffSvg + '<br>' + scorePercent + '</div>';
                        if (railWAM.showChange === true) {
                            
                            if (typeof scoreDiffSvg === 'string') {
                                $('#railwam-score-difference').html(scoreDiffElm);
                            }
                            
                        } else {
                            $('#railwam-score-difference').remove();
                        }
                        
                        // Move arrow
                        const scoreArrow = $('#railwam-score-difference .railwam-arrow');
                        scoreArrow.remove();
                        $('#railwam-score-difference > div').before(scoreArrow);
                        
                        // Card background
                        if (scoreArrow.length > 0) {
                            const scoreContainer = $('#railwam-dashboard-score-container');
                            scoreContainer.css('border-top', '4px solid ' + local.color.changeOpacity(scoreArrow.css('fill'), 0.5));
                        }
                        
                        
                        // Calculate and display change in rank
                        const rankDiff = data[dateId].wam_rank - data[dateId - 86400].wam_rank,
                            rankDiffSvg = rw.math.diff(0, rankDiff);
                        var rankPercent = (((Math.abs(local.math.parseNum(data[dateId].wam_rank) - local.math.parseNum(data[dateId - 86400].wam_rank)) / local.math.parseNum(data[dateId - 86400].wam_rank)) * 100).toFixed(1) + '%').replace('NaN', 'N/A');
                        
                        if (local.math.parseNum(data[dateId - 86400].wam_rank) === 0) {
                            if (local.math.parseNum(data[dateId].wam_rank === 0)) {
                                rankPercent = '0.0%';
                            } else {
                                rankPercent = 'N/A%';
                            }
                        }
                        
                        // Add rank difference
                        const rankDiffElm = '<div class="railwam-inline-block">' + rankDiffSvg + '<br>' + rankPercent;
                        
                        if (railWAM.showChange === true) {
                            
                            if (typeof rankDiffSvg === 'string') {
                                $('#railwam-rank-difference').html(rankDiffElm);
                            }
                            
                        } else {
                            $('#railwam-rank-difference').remove();
                        }
                        
                        // Move arrow
                        const rankArrow = $('#railwam-rank-difference .railwam-arrow');
                        rankArrow.remove();
                        $('#railwam-rank-difference > div').before(rankArrow);
                        
                        // Card background
                        if (rankArrow.length > 0) {
                            const rankContainer = $('#railwam-dashboard-rank-container');
                            rankContainer.css('border-top', '4px solid ' + local.color.changeOpacity(rankArrow.css('fill'), 0.5));
                        }
                        
                        
                        // Calculate and display change in vertical rank
                        const vertRankDiff = data[dateId].vertical_wam_rank - data[dateId - 86400].vertical_wam_rank,
                            vertRankDiffSvg = rw.math.diff(0, vertRankDiff);
                        var vertRankPercent = (((Math.abs(local.math.parseNum(data[dateId].vertical_wam_rank) - local.math.parseNum(data[dateId - 86400].vertical_wam_rank)) / local.math.parseNum(data[dateId - 86400].vertical_wam_rank)) * 100).toFixed(1) + '%').replace('NaN', 'N/A');
                        
                        if (local.math.parseNum(data[dateId - 86400].vertical_wam_rank) === 0) {
                            if (local.math.parseNum(data[dateId].vertical_wam_rank === 0)) {
                                vertRankPercent = '0.0%';
                            } else {
                                vertRankPercent = 'N/A%';
                            }
                        }
                        
                        // Add vertical rank difference
                        const vertRankDiffElm = '<div class="railwam-inline-block">' + vertRankDiffSvg + '<br>' + vertRankPercent;
                        
                        if (railWAM.showChange === true) {
                            
                            if (typeof vertRankDiffSvg === 'string') {
                                $('#railwam-vertRank-difference').html(vertRankDiffElm);
                            }
                            
                        } else {
                            $('#railwam-vertRank-difference').remove();
                        }
                        
                        // Move arrow
                        const vertRankArrow = $('#railwam-vertRank-difference .railwam-arrow');
                        vertRankArrow.remove();
                        $('#railwam-vertRank-difference > div').before(vertRankArrow);
                        
                        // Card background
                        if (vertRankArrow.length > 0) {
                            const vertRankContainer = $('#railwam-dashboard-vertRank-container');
                            vertRankContainer.css('border-top', '4px solid ' + local.color.changeOpacity(vertRankArrow.css('fill'), 0.5));
                        }
                        
                        // Not logged text
                        if (typeof scoreDiffSvg === 'string' || typeof rankDiffSvg === 'string' || typeof vertRankDiffSvg === 'string' || railWAM.showChange === false) {
                            $('#railwam-not-logged').css('display', 'none');
                        } else {
                            $('#railwam-not-logged').css('display', 'block');
                        }
                        
                        // Insert WAM chart
                        local.graph.insertChart({
                            name: 'railwam-dashboard-wam-chart',
                            data: data,
                            startDate: rw.config.maxDate - (29 * 86400),
                            endDate: rw.config.maxDate,
                            type: 'score',
                            selector: '#railwam-dashboard-wam-chart',
                            title: i18n.msg('dashGraphTitle').plain(),
                        });
                        
                        mw.hook('rw.dash.uiAdded').fire();
                        
                    }
                    
                };
                
            local.faq = {
                    
                    /**
                     * Displays a frequently asked questions module.
                     * 
                     * @returns {void}
                     */
                    display: function() {
                              
                        // Create object to store FAQ content
                        const faqObj = {
                            title:'RailWAM: ' + i18n.msg('faqTitle').plain(),
                            items: [{
                                name: i18n.msg('sectionWAM').plain(),
                                head1: i18n.msg('quesWhatIsWAM').plain(),
                                cnt1: i18n.msg('ansWhatIsWAM').plain(),
                                head2: i18n.msg('quesCalcWAM').plain(),
                                cnt2: i18n.msg('ansCalcWAM').plain(),
                                head3: i18n.msg('quesImproveWAM').plain(),
                                cnt3: i18n.msg('ansImproveWAM', '<a href="//' + i18n.msg('communityLinkPrefix').plain() + '.fandom.com" target="_blank" rel="noopener noreferrer">' + i18n.msg('communityLinkText').plain() + '</a>').plain(),
                                head4: i18n.msg('quesScoreZero').plain(),
                                cnt4: i18n.msg('ansScoreZero').plain()
                            }, { 
                                name: 'RailWAM',
                                head1: i18n.msg('quesWhatIsRailWAM').plain(),
                                cnt1: i18n.msg('ansWhatIsRailWAM', '<a href="//dev.fandom.com/wiki/RailWAM" target="_blank" rel="noopener noreferrer">' + i18n.msg('docLinkText').plain() + '</a>').plain(),
                                head2: i18n.msg('quesInstallRailWAM').plain(),
                                cnt2: i18n.msg('ansInstallRailWAM', '<a href="//dev.fandom.com/wiki/RailWAM" target="_blank" rel="noopener noreferrer">' + i18n.msg('docLinkText').plain() + '</a>').plain(),
                                head3: i18n.msg('quesCreators').plain(),
                                cnt3: i18n.msg('ansCreators', '<a href="//community.fandom.com/wiki/User:Blaster_Niceshot" target="_blank" rel="noopener noreferrer">Blaster Niceshot</a>', '<a href="//community.fandom.com/wiki/User:Demotivator" target="_blank" rel="noopener noreferrer">Demotivator</a>').plain(),
                            }, {
                                name: i18n.msg('databaseAlt').plain(),
                                head1: i18n.msg('quesWhatIsDatabase').plain(),
                                cnt1: '<p>' + i18n.msg('ansWhatIsDatabaseIntro').plain() + '</p><h2>' + i18n.msg('ansWhatIsDatabaseUseHeading').plain() + '</h2><p>' + i18n.msg('ansWhatIsDatabaseInstructions').plain() + '</p><p>' + i18n.msg('ansWhatIsDatabaseMoreInfo').plain() + '</p>',
                                head2: i18n.msg('quesSearchTime').plain(),
                                cnt2: '<p>' + i18n.msg('searchTimeSummary').plain() + '</p><h2>' + i18n.msg('detailedFormula').plain() + '</h2>' + i18n.msg('searchTimeExp1').plain() + '<span class="railwam-math">T<sub>' + i18n.msg('requests').plain() + '</sub> = T<sub>' + i18n.msg('days').plain() + '</sub> + 1</span>' + i18n.msg('searchTimeExp2').plain()  + '<span class="railwam-math">t<sub>' + i18n.msg('seconds').plain() + '</sub> = (T<sub>' + i18n.msg('requests').plain() + '</sub> - 2) ⋅ 10</span><p>' + i18n.msg('or').plain() + '</p><span class="railwam-math">t<sub>' + i18n.msg('seconds').plain() + '</sub> = (T<sub>' + i18n.msg('days').plain() + '</sub> - 1) ⋅ 10</span>',
                            },
                            {
                                name: i18n.msg('dashGraphHeading').plain(),
                                head1: i18n.msg('quesHowToGraph').plain(),
                                cnt1: i18n.msg('ansHowToGraph').plain(),
                                head2: i18n.msg('quesGraphBlank').plain(),
                                cnt2: i18n.msg('ansGraphBlank').plain(),
                            },
                            {
                                name: i18n.msg('logOldHeading').plain(),
                                head1: i18n.msg('quesHowToLogOldData').plain(),
                                cnt1: i18n.msg('ansHowToLogOldData').plain(),
                                head2: i18n.msg('quesNoOldData').plain(),
                                cnt2: i18n.msg('ansNoOldData').plain(),
                            }]
                        };
                        
                        if (windowWidth > 768) {
                                
                            // Desktop modal
                            local.faq.createModal(faqObj);
                                
                        } else {
                                
                            // Mobile modal
                            $.showCustomModal('RailWAM: ' + i18n.msg('faqTitle').plain(), i18n.msg('faqWelcome', '<a href="//community.fandom.com/wiki/WAM/FAQ" target="_blank" rel="noopener noreferrer">' + i18n.msg('faqLinkText').plain() + '</a>').plain() + '<br>', {
                                id: 'railwam-modal-body-mobile',
                                width: windowWidth * 0.7,
                            });
                                
                            local.faq.addHeaders(faqObj, '#railwam-modal-body-mobile .modalContent', true);
                                
                        }
                        
                        mw.hook('rw.faq.modalAdded').fire();
                        
                    },
                        
                    /**
                     * Creates and displays a custom modal window.
                     * 
                     * @param {Object} dataObj - Use the following properties:
                     *  title - modal title
                     *  items - contains menu and content items
                     *  items.name - section heading
                     *  items.head# - menu item # text
                     *  items.cnt# - content item # text
                     * 
                     * @returns {void}
                     */
                    createModal: function(dataObj) {
                        const modalBase = '<div id="railwam-modal-overlay"><div id="railwam-modal-body"><div id="railwam-modal-sidebar"><span class="railwam-modal-sidebar-item" id="railwam-modal-sidebar-home">' + i18n.msg('home').plain() + '</span></div><div id="railwam-modal-content-container"><div id="railwam-modal-footer">RailWAM | <a href="//dev.fandom.com/wiki/RailWAM" target="_blank">' + i18n.msg('documentation').plain() + '</a> | <a href="//dev.fandom.com/wiki/Talk:RailWAM" target="_blank">' + i18n.msg('reportBug').plain() + '</a></div></div></div></div>';
                                
                        // Fade in modal
                        $(modalBase).hide().appendTo('body').fadeIn(100);
                        
                        // Set modal width
                        $('#railwam-modal-body').css({'width': (0.7 * windowWidth) + 'px', 'background': pageBgColor});
                        
                        // Disable scroll
                        body.css('overflow', 'hidden');
                            
                        // Close button SVG
                        $('#railwam-modal-body').append('<svg id="railwam-modal-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 43"><path id="railwam-x" fill="' + bodyTextColor + '" stroke-width="0" d="M 7.82,0.60 C 11.11,1.98 17.11,14.21 19.45,17.73 21.15,13.93 27.71,2.16 31.32,0.57 32.95,-0.14 35.91,-0.36 36.27,2.36 36.27,2.36 24.36,21.00 24.36,21.00 24.36,21.00 30.00,29.00 30.00,29.00 30.00,29.00 36.91,40.73 36.91,40.73 36.00,42.82 33.89,43.12 32.09,42.40 27.97,40.75 21.84,28.75 19.36,24.64 17.84,28.61 10.49,40.88 6.73,42.45 4.99,43.18 2.45,42.55 2.27,39.64 2.27,39.64 9.00,29.00 9.00,29.00 9.00,29.00 14.91,21.36 14.91,21.36 14.91,21.36 2.82,2.64 2.82,2.64 3.00,-0.27 6.09,-0.13 7.82,0.60 Z" /></svg>');
                            
                        // Make close button clickable
                        $('#railwam-modal-close').click(function(){
                            
                            $('#railwam-modal-overlay').fadeOut(100, function(){
                                
                                $(this).remove();
                                body.css('overflow', bodyOverflow);
                                
                            });
                            
                        });
                            
                        // Set modal title
                        $('#railwam-modal-content-container').append('<span id="railwam-modal-title">' + dataObj.title + '</span>');
                            
                        // Add sidebar items
                        local.faq.addHeaders(dataObj, '#railwam-modal-sidebar', false);
                            
                        // Collapse if expanded height creates scrollbar
                        if ($('#railwam-modal-sidebar').height() !== $('#railwam-modal-sidebar')[0].scrollHeight) {
                            $('.railwam-modal-sidebar-item').trigger('click');
                        }
                            
                        // Append nav links to top of content container
                        $('#railwam-modal-content-container').append('<span id="railwam-modal-navlink-container"><span class="railwam-modal-navlink" id="railwam-modal-navlink-home">' + i18n.msg('home').plain() + '</span><span> / </span></span>');
                            
                        // Append banner below nav links
                        $('#railwam-modal-content-container').append('<span id="railwam-modal-content-banner">' + i18n.msg('faqWelcomeShort').plain() + '</span>');
                            
                        // Append content area below banner
                        var contentHeight = $('#railwam-modal-body').height();
                        $('#railwam-modal-content-container').append('<span id="railwam-modal-content-area">' + i18n.msg('faqWelcome', '<a href="//community.fandom.com/wiki/WAM/FAQ" target="_blank" rel="noopener noreferrer">' + i18n.msg('faqLinkText').plain() + '</a>').plain() + '</span>');
                            
                        /* Content area height = modal body height - 
                           banner, nav links, etc. heights */
                        $.each($('#railwam-modal-content-area').siblings(), function(i, thisSibling){
                            contentHeight -= $(thisSibling).height();
                            contentHeight -= $(thisSibling).css('margin-top').replace('px', '');
                            contentHeight -= $(thisSibling).css('margin-bottom').replace('px', '');
                            contentHeight -= $(thisSibling).css('padding-top').replace('px', '');
                            contentHeight -= $(thisSibling).css('padding-bottom').replace('px', '');
                        });
                        contentHeight -= $('#railwam-modal-content-area').css('padding-top').replace('px', '');
                        contentHeight -= $('#railwam-modal-content-area').css('padding-bottom').replace('px', '');
                        $('#railwam-modal-content-area').height(contentHeight);
                            
                        // Make home nav link clickable
                        $('#railwam-modal-navlink-home').click(function(){
                            local.faq.changePage(i18n.msg('faqWelcomeShort').plain(), i18n.msg('faqWelcome', '<a href="//community.fandom.com/wiki/WAM/FAQ" target="_blank" rel="noopener noreferrer">' + i18n.msg('faqLinkText').plain() + '</a>').plain());
                        });
                            
                        // Make home header clickable
                        $('#railwam-modal-sidebar-home').click(function(){
                            local.faq.changePage(i18n.msg('faqWelcomeShort').plain(), i18n.msg('faqWelcome', '<a href="//community.fandom.com/wiki/WAM/FAQ" target="_blank" rel="noopener noreferrer">' + i18n.msg('faqLinkText').plain() + '</a>').plain());
                        });
                        
                    },
                        
                    /**
                     * Adds headers and page links to FAQ modules.
                     * 
                     * @param {Object} dataObj - Use the following properties:
                     *  title - modal title
                     *  items - contains menu and content items
                     *  items.name - section heading
                     *  items.head# - menu item # text
                     *  items.cnt# - content item # text
                     * @param {string} appendTo - selector to append headers to
                     * @param {boolean} isMobile - is the FAQ module mobile
                     * 
                     * @returns {void}
                     */
                    addHeaders: function(dataObj, appendTo, isMobile) {
                            
                        const mobileFlag = isMobile === true ? '-mobile' : '';
                            
                        // Add nav items
                        $.each(dataObj.items, function(i, cur) {
                                    
                            // Append heading
                            $(appendTo).append('<ul id="railwam-modal-sidehead-' + i + mobileFlag + '" class="railwam-modal-sidehead' + mobileFlag + '"><span class="railwam-modal-sidebar-item' + mobileFlag + '">' + cur.name + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" class="railwam-modal-dropdown-arrow"><use xlink:href="#railwam-dropdown-arrow" fill="' + headerTextColor + '"/></svg></span><span class="railwam-modal-sidehead-container' + mobileFlag + '"></span></ul>');
                                    
                            // Collapsible behavior - open by default
                            var degrees = 180;
                            $('#railwam-modal-sidehead-' + i + mobileFlag + ' .railwam-modal-sidebar-item' + mobileFlag + ' .railwam-modal-dropdown-arrow').css('transform', 'rotate(180deg)');
                                    
                            // Make header clickable
                            $('#railwam-modal-sidehead-' + i + mobileFlag + ' .railwam-modal-sidebar-item' + mobileFlag).click(function () {
                                    
                                // Slide page list open
                                const headerContent = $(this).siblings('.railwam-modal-sidehead-container' + mobileFlag);
                                headerContent.slideToggle(100);
                                    
                                // Rotate arrow
                                degrees += 180;
                                $('.railwam-modal-dropdown-arrow', $(this)).css('transform', 'rotate(' + degrees + 'deg)');
                                    
                            });
                                    
                            // Add sidehead sub (page) items
                            $.each(cur, function (prop, val) {
                                        
                                // Property name must be head#
                                if (prop.indexOf('head') !== -1) {
                                    if (isMobile === false) {
                                            
                                        // Append page item
                                        $('#railwam-modal-sidehead-' + i + ' .railwam-modal-sidehead-container').append('<li class="railwam-modal-sidehead-sub">' + val + '</li>');
                                            
                                        // Change page on page item click
                                        $('.railwam-modal-sidehead-sub:contains("' + val + '")').click(function(){
                                            local.faq.changePage(val, cur['cnt' + prop.replace('head', '')]);
                                        });
                                            
                                    } else {
                                            
                                        // Append page item
                                        $('#railwam-modal-sidehead-' + i + mobileFlag + ' .railwam-modal-sidehead-container' + mobileFlag).append('<span><li class="railwam-modal-sidehead-sub' + mobileFlag + '">' + val + '</li><span class="railwam-modal-content' + mobileFlag + '">' + cur['cnt' + prop.replace('head', '')] + '</span></span>');
                                            
                                        const modalWrapColor = local.color.getBgColor($('.modalWrapper'));
                                        $('.railwam-modal-sidebar-item-mobile').css('color', modalWrapColor);
                                        $('.railwam-modal-dropdown-arrow').css('fill', modalWrapColor);
                                            
                                        // Focus
                                        $('.railwam-modal-sidebar-item-mobile').focus(function() {
                                            $(this).css('background-color', local.color.changeOpacity(headerBgColor, 0.4));
                                        });
                                            
                                        // Focus out
                                        $('.railwam-modal-sidebar-item-mobile').focusout(function() {
                                            $(this).css('background-color', headerBgColor);
                                        });
                                            
                                    }
                                }
                                    
                            });
                                
                        });
                            
                        if (isMobile === true) {
                            $('.railwam-modal-sidebar-item-mobile').trigger('click');
                        }
                            
                    },
                        
                    /**
                     * Changes page of custom modal.
                     * 
                     * @param {string} banner - Text to display in banner (e.g., the question)
                     * @param {string} text - Content text
                     * 
                     * @returns {void}
                     */
                    changePage: function(banner, text) {
                        
                        // Remove active class from no longer active page
                        $('.railwam-modal-sidehead-sub-active').removeClass('railwam-modal-sidehead-sub-active');
                            
                            
                        if (banner != i18n.msg('faqWelcomeShort').plain()) {
                                
                            // Page is active
                            $('.railwam-modal-sidehead-sub:contains("' + banner + '")').addClass('railwam-modal-sidehead-sub-active');
                                
                        } else {
                                
                            // Home is active
                            $('.railwam-modal-sidebar-item:contains("' + i18n.msg('home').plain() + '")').addClass('railwam-modal-sidehead-sub-active');
                                
                        }
                            
                        // Set banner text
                        $('#railwam-modal-content-banner').text(banner);
                            
                        // Set content text
                        $('#railwam-modal-content-area').html(text);
                            
                            
                        if ($('#railwam-modal-navlink-page').length > 0) {
                            if (banner != i18n.msg('faqWelcomeShort').plain()) {
                                    
                                // Set page nav link text
                                $('#railwam-modal-navlink-page').text(
                                    $('.railwam-modal-sidebar-item', $('.railwam-modal-sidehead-sub:contains("' + banner + '")').closest('.railwam-modal-sidehead'))
                                        .text()
                                );
                                    
                            } else {
                                    
                                // Home page is selected; no page nav link
                                $('#railwam-modal-navlink-page').remove();
                                $('#railwam-modal-navlink-page-slash').remove();
                                    
                            }
                        } else {
                            if (banner != i18n.msg('faqWelcomeShort').plain()) {
                                    
                                // Add page navigation link
                                $('#railwam-modal-navlink-container').append('<span class="railwam-modal-navlink" id="railwam-modal-navlink-page">' + $('.railwam-modal-sidebar-item', $('.railwam-modal-sidehead-sub:contains("' + banner + '")').closest('.railwam-modal-sidehead')).text() + '</span><span id="railwam-modal-navlink-page-slash"> / </span></span>');
                                    
                            }
                        }
                        
                        mw.hook('rw.faq.pageChanged').fire();
                        
                    },
                    
                };
                
            local.graph = {
                
                    /**
                     * Initializes graphing interface.
                     * 
                     * @param {number} dateCreated- Date of wiki creation in seconds
                     * 
                     * @returns {void}
                     */
                    init: function(dateCreated) {
                        
                        // Change title of page
                        $('title').text('RailWAM: ' + i18n.msg('dashGraphHeading').plain() + fandomTitle);
                        $('.page-header__title').text('RailWAM: ' + i18n.msg('dashGraphHeading').plain());
                        
                        // Dashboard backlink
                        $('.page-header__page-subtitle').html('< <a href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Dashboard">' + i18n.msg('dashboard').plain() + '</a>');
                        
                        // Get score and rank data from WAM Index API
                        rw.data.getLogged(
                            {
                                log: railWAM.logPage, 
                                success: function(logged) {
                                    local.graph.insertHTML(logged, dateCreated);
                                }, 
                                error: function() {
                                    local.graph.insertHTML({}, dateCreated);
                                },
                            }
                        );
                        
                    },
                    
                    /**
                     * Creates a graph in a canvas.
                     * 
                     * @param {Object} settings - With properties:
                     *  {string} type - score, rank, or vertRank
                     *  {number} startDate - Date to start graph at
                     *  {number} endDate - Date to end graph at
                     *  {Object} data - Data to graph
                     *  {string} canvas - ID or class of canvas element
                     *  {string} title - Graph title
                     * 
                     * @returns {void}
                     */
                    insertChart: function(settings) {
                        
                        var typeProp;
                        switch (settings.type) {
                            case 'score':
                                typeProp = 'wam';
                                break;
                            case 'rank':
                                typeProp = 'wam_rank';
                                break;
                            case 'vertRank':
                                typeProp = 'vertical_wam_rank';
                                break;
                        }
                                    
                        const chartData = [],
                            chartLabels = [];
                        var validPts = 0,
                        
                            // Check if dates have diff years
                            sameYear = new Date(settings.startDate * 1000).getUTCFullYear() === new Date(settings.endDate * 1000).getUTCFullYear();
                        
                        for (var id = settings.startDate; id <= settings.endDate; id += 86400) {
                            
                            // Adjust for time zone
                            if (sameYear === true) {
                                chartLabels.push(local.date.formatDate(id + (curDate.getTimezoneOffset() * 60) + 3600, true).replace(/,.*$/, ''));
                            } else {
                                chartLabels.push(local.date.formatDate(id + (curDate.getTimezoneOffset() * 60) + 3600, true));
                            }
                            
                            if (typeof settings.data[id] === 'object' && settings.data[id] !== null && isNaN(local.math.parseNum(settings.data[id][typeProp])) === false) {
                                
                                chartData.push(settings.data[id][typeProp]);
                                
                                // Count number of valid points for graph
                                validPts++;
                                
                            } else {
                                chartData.push(null);
                            }
                            
                        }
                        
                        if (validPts > 0) {
                            
                            $(settings.selector).css('display', 'block');
                            $(settings.selector).parent().removeClass('railwam-graph-nograph');
                            $('.railwam-graph-nopoints-text', $(settings.selector).parent()).css('display', 'none');
                            
                            if (typeof charts[settings.name] === 'undefined' || charts[settings.name] === null) {
                            
                                charts[settings.name] = new Chart($(settings.selector), {
                                    type: 'line',
                                    data: {
                                        labels: chartLabels,
                                        datasets: [{
                                            label: i18n.msg(settings.type).plain(),
                                            data: chartData,
                                            backgroundColor: local.color.changeOpacity(linkTextColor, 0.7),
                                            borderColor: linkTextColor,
                                            fill: false,
                                        }]
                                    },
                                    options: {
                                        elements: {
                                            line: {
                                                tension: 0,
                                            },
                                            point: {
                                                radius: 1,
                                                pointBackgroundColor: local.color.lighten(linkTextColor, 10),
                                                pointBorderColor: local.color.lighten(linkTextColor, 20),
                                            },
                                        },
                                        layout: {
                                            padding: {
                                                left: 10
                                            }
                                        },
                                        legend: {
                                            display: false,
                                        },
                                        plugins: {
                                            avgLine: {
                                                showAvgLine: true,
                                            },
                                            vertPosLine: {
                                                showVertPosLine: true,
                                            },
                                        },
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    fontColor: bodyTextColor,
                                                },
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    fontColor: bodyTextColor,
                                                    reverse: settings.type === 'rank' || settings.type === 'vertRank' ? true : false,
                                                },
                                            }]
                                        },
                                        title: {
                                            display: true,
                                            fontColor: bodyTextColor,
                                            text: settings.title,
                                        },
                                        tooltips: {
                                            mode: 'index',
                                            intersect: false,
                                            callbacks: {
                                                label: function(tooltipItem, data) {
                                                    if (settings.type === 'score') {
                                                        return local.math.parseNum(tooltipItem.yLabel).toFixed(4);
                                                    } else {
                                                        return tooltipItem.yLabel;
                                                    }
                                                },
                                            },
                                        },
                                    },
                                });
                                
                                mw.hook('rw.graph.chartAdded').fire();
                            
                            } else {
                                
                                charts[settings.name].data.labels = chartLabels;
                                charts[settings.name].data.datasets[0].data = chartData;
                                charts[settings.name].options.title.text = settings.title;
                                charts[settings.name].options.scales.yAxes[0].ticks.reverse = settings.type === 'rank' || settings.type === 'vertRank' ? true : false;
                                charts[settings.name].options.tooltips.callbacks.label = function(tooltipItem, data) {
                                        if (settings.type === 'score') {
                                            return local.math.parseNum(tooltipItem.yLabel).toFixed(4);
                                        } else {
                                            return tooltipItem.yLabel;
                                        }
                                    };
                                charts[settings.name].update();
                                
                                mw.hook('rw.graph.chartUpdated').fire();
                                
                            }
                            
                            if (validPts < (settings.endDate - settings.startDate) / 86400 + 1) {
                                
                                if ($('.railwam-graph-notlogged-text', $(settings.selector).parent()).length === 0) {
                                    $(settings.selector).after('<div class="railwam-graph-notlogged-text">' + i18n.msg('graphMissingPoints').plain() + '</div>');
                                }
                                
                                $('.railwam-graph-notlogged-text', $(settings.selector).parent()).css('display', 'block');
                            } else {
                                $('.railwam-graph-notlogged-text', $(settings.selector).parent()).css('display', 'none');
                            }
                        
                        } else {
                            
                            if (typeof charts[settings.name] === 'object' && charts[settings.name] !== null) {
                                charts[settings.name].destroy();
                                charts[settings.name] = null;
                                
                                mw.hook('rw.graph.chartDestroyed').fire();
                            }
                            
                            if ($('.railwam-graph-nopoints-text', $(settings.selector).parent()).length === 0) {
                                $(settings.selector).after('<span class="railwam-graph-nopoints-text">' + i18n.msg('graphNotEnoughPoints').plain() + '</span>');
                            }
                            
                            $('.railwam-graph-nopoints-text', $(settings.selector).parent()).css('display', 'block');
                            $(settings.selector).css('display', 'none');
                            $('.railwam-graph-notlogged-text', $(settings.selector).parent()).css('display', 'none');
                            $(settings.selector).parent().addClass('railwam-graph-nograph');
                            
                            mw.hook('rw.graph.noPoints').fire();
                        }
                        
                    },
                    
                    /**
                     * Inserts graphing interface.
                     * 
                     * @param {Object} logged - Logged WAM data
                     * @param {number} dateCreated- Date of wiki creation in seconds
                     * 
                     * @returns {void}
                     */
                    insertHTML: function(logged, dateCreated) {
                        
                        $('#mw-content-text').html('<div class="railwam-flex-container"><div id="railwam-graph-options" class="railwam-graph-main-cont"><span class="railwam-util-heading">' + i18n.msg('customizeGraphHeading').plain() + '</span><div class="railwam-util-tab-container"><div class="railwam-util-tab railwam-util-tab-active" tabval="score">' + i18n.msg('score').plain() + '</div><div class="railwam-util-tab" tabval="rank">' + i18n.msg('rank').plain() + '</div><div class="railwam-util-tab" tabval="vertRank">' + i18n.msg('vertRank').plain() + '</div></div><span class="railwam-util-filter railwam-graph-filter" id="railwam-graph-daterange-filter-cont"><input class="railwam-util-filter-input railwam-util-input" id="railwam-graph-daterange" type="text" required readonly="readonly"><div class="railwam-datepicker" id="railwam-datepicker-graphrange"></div><span class="railwam-util-placeholder railwam-util-filter-ph">' + i18n.msg('dateRange').plain() + '</span></span><div id="railwam-graph-errors"></div><div id="railwam-graph-loggedonly-container"><input type="checkbox" id="railwam-graph-loggedonly" checked><label for="railwam-graph-loggedonly">' + i18n.msg('graphLoggedOnly').plain() + '</label></div><a class="railwam-wds wds-button railwam-graph-create-btn-active" id="railwam-graph-create-btn">' + i18n.msg('graphBtn').plain() + '</a></div><div id="railwam-graph-container" class="railwam-graph-main-cont"><div id="railwam-util-logafter"><div id="railwam-util-logafter-text"><span class="railwam-bold">' + i18n.msg('logAfterHeader').plain() + '</span> <span id="railwam-notlogged-text-warning">' + i18n.msg('notLoggedWarning').plain() + '</span></div><div class="railwam-util-btn" id="railwam-util-logafter-dismiss">' + i18n.msg('dismiss').plain() + '</div><div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-logafter-log">' + i18n.msg('logBtn').plain() + '</div></div><canvas id="railwam-graph-wam-chart"></canvas><div id="railwam-graph-loading"><svg class="railwam-util-spinner" width="25" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg"> <g> <circle fill="none" stroke-width="1" stroke-linecap="round" r="10"></circle></g></svg><span id="railwam-graph-loading-text"></span></div></div></div>');
                        
                        // Set up datepicker
                        local.datepicker.init('graphrange', dateCreated);
                        mw.hook('rw.dp.dayClicked').add(
                            function() {
                                
                                const displayRange = local.date.formatDate(dpStartDate) + ' - ' + local.date.formatDate(dpEndDate);
                                $('#railwam-graph-daterange').val(displayRange).change();
                                
                            }
                        );
                        
                        // Logafter click events
                        
                        // Dismiss button
                        $('#railwam-util-logafter-dismiss').click(
                            function(){
                                
                                $('#railwam-util-logafter').fadeOut(200);
                                
                                mw.hook('rw.graph.logAlertDismissed').fire();
                                
                            }
                        );
                        
                        // Log button
                        body.on('click', '#railwam-util-logafter-log',
                            function() {
                                
                                rw.data.log(
                                    {
                                        data: logged, 
                                        log: railWAM.logPage, 
                                        summary: '[[w:c:dev:RailWAM|RailWAM]]: ' + i18n.msg('logSummary').plain(),
                                        types: ['wiki_id', 'wam', 'wam_rank', 'vertical_wam_rank'],
                                        addedBy: 'RailWAM',
                                        version: 3,
                                        bot: botFlag,
                                        override: true,
                                    }
                                );
                                
                                $('#railwam-util-logafter-text').text(i18n.msg('scoreLogged').plain());
                                $('#railwam-util-logafter-log').remove();
                                
                                mw.hook('rw.graph.dataLogged').fire();
                                
                            }
                        );
                        
                        body.on('click', '.railwam-graph-create-btn-active',
                            function() {
                                    
                                    const canvasSelector = 'railwam-graph-wam-chart',
                                        displayRange = local.date.formatDate(dpStartDate) + ' - ' + local.date.formatDate(dpEndDate),
                                        graphType = $('.railwam-util-tab-active').attr('tabval'),
                                        graphTitle = (function() {
                                            switch (graphType) {
                                                case 'score':
                                                    return i18n.msg('scoreGraphTitle', displayRange).plain();
                                                case 'rank':
                                                    return i18n.msg('rankGraphTitle', displayRange).plain();
                                                case 'vertRank':
                                                    return i18n.msg('vertRankGraphTitle', displayRange).plain();
                                            }
                                        })(),
                                        loggedOnly = $('#railwam-graph-loggedonly').is(':checked');
                                        
                                    var showLogAfter = false;
                                    
                                if (typeof dpStartDate !== 'number' || typeof dpEndDate !== 'number') {
                                    
                                    local.input.error(i18n.msg('errorSelectRange').plain(), 'range', '#railwam-graph-errors');
                                    
                                } else {
                                    
                                    local.input.clearErrors('#railwam-graph-errors');
                                    
                                    // Hide no points text
                                    $('.railwam-graph-nopoints-text').css('display', 'none');
                                    
                                    if (loggedOnly === true) {
                                        
                                        for (var id = dpStartDate; id <= dpEndDate; id += 86400) {
                                            
                                            if (typeof logged[id] === 'object' && logged[id].logged === false) {
                                                showLogAfter = true;
                                            }
                                            
                                        }
                                        
                                        if (showLogAfter === true && railWAM.showLogAlert === true) {
                                            
                                            // Show log data text
                                            $('#railwam-util-logafter').css('display', 'block');
                                            
                                            if ($('#railwam-util-logafter-log').length === 0) {
                                                $('#railwam-util-logafter').html('<div id="railwam-util-logafter-text"><span class="railwam-bold">' + i18n.msg('logAfterHeader').plain() + '</span> <span id="railwam-notlogged-text-warning">' + i18n.msg('notLoggedWarning').plain() + '</span></div><div class="railwam-util-btn" id="railwam-util-logafter-dismiss">' + i18n.msg('dismiss').plain() + '</div><div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-logafter-log">' + i18n.msg('logBtn').plain() + '</div></div>');
                                            }
                                            
                                        } else {
                                            
                                            // Hide log data text
                                            $('#railwam-util-logafter').css('display', 'none');
                                            
                                        }
                                    
                                        // Insert WAM chart
                                        local.graph.insertChart({
                                            name: canvasSelector,
                                            data: logged,
                                            startDate: dpStartDate,
                                            endDate: dpEndDate,
                                            type: graphType,
                                            selector: '#' + canvasSelector,
                                            title: graphTitle,
                                        });
                                    
                                    } else {
                                        
                                        mw.hook('rw.graph.searchStarted').fire();
                                        
                                        // Deactivate graph form
                                        $(this).removeClass('railwam-graph-create-btn-active');
                                        $('#railwam-graph-graphtype option:not(:checked)').attr('disabled', true);
                                        $('#railwam-graph-loggedonly').attr('disabled', true);
                                        $('.railwam-datepicker').css('display', 'none');
                                        $('#railwam-graph-options').addClass('railwam-util-disabled');
                                        $('#railwam-graph-options .railwam-util-tab-container').css('pointer-events', 'none');
                                        
                                        $('.railwam-graph-notlogged-text').css('display', 'none');
                                        
                                        rw.data.get({
                                            wikiId: mwConfig.wgCityId,
                                            startDate: dpStartDate,
                                            endDate: dpEndDate,
                                            logged: logged,
                                            wikis: 1,
                                            
                                            success: function(data, dateId, requests) {
                                                
                                                local.graph.timeLeft(requests * 10);
                                                
                                                showLogAfter = true;
                                                
                                            },
                                            
                                            error: function(data, dateId, requests) {
                                                
                                                local.graph.timeLeft(requests * 10);
                                                
                                            },
                                            
                                            exists: function(data, dateId, requests) {
                                                
                                                if (data[dateId].logged === false) {
                                                    showLogAfter = true;
                                                }
                                                
                                            },
                                            
                                            callback: function(data) {
                                                
                                                // Reactivate graph form
                                                $('#railwam-graph-create-btn').addClass('railwam-graph-create-btn-active');
                                                $('#railwam-graph-graphtype option:not(:checked)').attr('disabled', false);
                                                $('#railwam-graph-loggedonly').attr('disabled', false);
                                                $('.railwam-datepicker').css('display', 'block');
                                                
                                                local.graph.timeLeft(0);
                                                
                                                mw.hook('rw.graph.searchDone').fire();
                                                
                                                // Insert WAM chart
                                                local.graph.insertChart({
                                                    name: canvasSelector,
                                                    data: data,
                                                    startDate: dpStartDate,
                                                    endDate: dpEndDate,
                                                    type: graphType,
                                                    selector: '#' + canvasSelector,
                                                    title: graphTitle,
                                                });
                                                
                                                if (showLogAfter === true && railWAM.showLogAlert === true) {
                                                    
                                                    // Show log data text
                                                    $('#railwam-util-logafter').css('display', 'block');
                                                    
                                                    if ($('#railwam-util-logafter-log').length === 0) {
                                                        $('#railwam-util-logafter').html('<div id="railwam-util-logafter-text"><span class="railwam-bold">' + i18n.msg('logAfterHeader').plain() + '</span> <span id="railwam-notlogged-text-warning">' + i18n.msg('notLoggedWarning').plain() + '</span></div><div class="railwam-util-btn" id="railwam-util-logafter-dismiss">' + i18n.msg('dismiss').plain() + '</div><div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-logafter-log">' + i18n.msg('logBtn').plain() + '</div></div>');
                                                    }
                                                    
                                                } else {
                                                    
                                                    // Hide log data text
                                                    $('#railwam-util-logafter').css('display', 'none');
                                                    
                                                }
                                                
                                                $.extend(logged, data);
                                                
                                            },
                                        });
                                        
                                    }
                                    
                                }
                                
                            }
                        );
                        
                        // First chart - last 30 days
                        dpStartDate = rw.config.maxDate - (29 * 86400);
                        dpEndDate = rw.config.maxDate;
                        local.datepicker.populateYear(curDate.getUTCFullYear(), dpStartDate, dpEndDate, 'graphrange', dateCreated);
                        
                        // Update date range input
                        mw.hook('rw.dp.dayClicked').fire();
                        
                        // Insert initial chart
                        const initRange = local.date.formatDate(dpStartDate) + ' - ' + local.date.formatDate(dpEndDate),
                            initWidth = local.css.getTextWidth(initRange, $('#railwam-graph-daterange').css('font'));
                        
                        $('#railwam-graph-daterange').width(initWidth);
                        
                        local.graph.insertChart({
                            name: 'railwam-graph-wam-chart',
                            data: logged,
                            startDate: dpStartDate,
                            endDate: dpEndDate,
                            type: 'score',
                            selector: '#railwam-graph-wam-chart',
                            title: i18n.msg('scoreGraphTitle', initRange).plain(),
                        });
                        
                        mw.hook('rw.graph.uiAdded').fire();
                        
                    },
                    
                    /**
                     * Shows time left label on graph and removes it when finished.
                     * 
                     * @param {number} sec - Seconds remaining in search
                     * 
                     * @returns {void}
                     */
                    timeLeft: function(sec) {
                        
                        const cancelBtnElm = $('#railwam-util-cancel'),
                            canvasElm = $('#railwam-graph-wam-chart'),
                            loadingElm = $('#railwam-graph-loading'),
                            loadingTextElm = $('#railwam-graph-loading-text'),
                            logAfterElm = $('#railwam-util-logafter');
                            
                        if (sec === 0) { 
                                
                            // Done
                            canvasElm.css('display', 'block');
                            canvasElm.parent().removeClass('railwam-graph-nograph');
                            loadingTextElm.empty();
                            loadingElm.css('display', 'none');
                            $('#railwam-graph-options').removeClass('railwam-util-disabled');
                            $('#railwam-graph-options .railwam-util-tab-container').css('pointer-events', 'auto');
                                
                        } else {
                            
                            // Show loading text
                            loadingTextElm.text(local.time.createTimer(rw.math.convertTime(sec)));
                            
                            if (cancelBtnElm.length < 1) {
                                
                                loadingElm.append('<div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-cancel">' + i18n.msg('cancel').plain() + '</div>');
                                $('#railwam-util-cancel').click(
                                    function() {
                                
                                        rw.data.cancel('get');
                                        
                                        loadingTextElm.text(i18n.msg('duringCancel').plain());
                                        
                                        $(this).remove();
                                        
                                    }
                                );
                            }
                            
                            canvasElm.css('display', 'none');
                            canvasElm.parent().addClass('railwam-graph-nograph');
                            loadingElm.css('display', 'block');
                            logAfterElm.css('display', 'none');
                                
                        }
                    },
                        
            };
            
            local.logOld = {
                    
                    /**
                     * Initializes logging interface.
                     * 
                     * @param {number} dateCreated- Date of wiki creation in seconds
                     * 
                     * @returns {void}
                     */
                    init: function(dateCreated) {
                        
                        // Change title of page
                        $('title').text('RailWAM: ' + i18n.msg('logOldHeading').plain() + fandomTitle);
                        $('.page-header__title').text('RailWAM: ' + i18n.msg('logOldHeading').plain());
                        
                        // Dashboard backlink
                        $('.page-header__page-subtitle').html('< <a href="' + mwConfig.wgServer + '/wiki/Special:BlankPage/RailWAM/Dashboard">' + i18n.msg('dashboard').plain() + '</a>');
                        
                        // Insert UI
                        local.logOld.insertHTML(dateCreated);
                        
                    },
                    
                    /**
                     * Inserts logger UI.
                     * 
                     * @param {number} dateCreated- Date of wiki creation in seconds
                     * 
                     * @returns {void}
                     */
                    insertHTML: function(dateCreated) {
                        
                        $('#mw-content-text').html('<div id="railwam-log-options"><span class="railwam-util-heading">' + i18n.msg('logSelectRangeHeader').plain() + '</span><span class="railwam-util-filter railwam-log-filter" id="railwam-log-daterange-filter-cont"><input class="railwam-util-filter-input railwam-util-input" id="railwam-log-daterange" type="text" required readonly="readonly"><div class="railwam-datepicker" id="railwam-datepicker-logrange"></div><span class="railwam-util-placeholder railwam-util-filter-ph">' + i18n.msg('dateRange').plain() + '</span></span><div id="railwam-log-overwrite-cont"><input type="checkbox" id="railwam-log-overwrite"><label for="railwam-log-overwrite">' + i18n.msg('overwriteLogged').plain() + '<span class="railwam-smalltext-lowercase">' + i18n.msg('logTimeIncrease').plain() + '</span></label></div><a class="railwam-wds wds-button railwam-log-log-btn-active" id="railwam-log-log-btn">' + i18n.msg('logBtn').plain() + '</a><div id="railwam-log-errors"></div><div id="railwam-log-notlogged-warning">' + i18n.msg('notLoggedWarning').plain() + '</div></div><div id="railwam-log-loading"><svg class="railwam-util-spinner" width="25" viewBox="-15 -15 30 30" xmlns="http://www.w3.org/2000/svg"> <g> <circle fill="none" stroke-width="1" stroke-linecap="round" r="10"></circle></g></svg><span id="railwam-log-loading-text"></span></div><div id="railwam-log-cancel-confirmation"><span id="railwam-log-confirmation-text">' + i18n.msg('logCancelConfirmationText').plain() + '</span><div class="railwam-util-btn" id="railwam-util-logafter-dismiss">' + i18n.msg('dismiss').plain() + '</div><div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-logafter-log">' + i18n.msg('logBtn').plain() + '</div></div></div><div id="railwam-log-console"><span class="railwam-util-heading">' + i18n.msg('logConsoleHeader').plain() + '</span><div id="railwam-log-console-entries"></div></div>');
                        
                        local.datepicker.init('logrange', dateCreated);
                        mw.hook('rw.dp.dayClicked').add(
                            function() {
                                
                                const displayRange = local.date.formatDate(dpStartDate) + ' - ' + local.date.formatDate(dpEndDate);
                                $('#railwam-log-daterange').val(displayRange).change();
                                
                            }
                        );
                        
                        body.on('click', '.railwam-log-log-btn-active', 
                            function() {
                                
                                if (typeof dpStartDate !== 'number' || typeof dpEndDate !== 'number') {
                                        
                                    local.input.error(i18n.msg('errorSelectRange').plain(), 'range', '#railwam-log-errors');
                                        
                                } else {
                                    
                                    $('#railwam-log-options').addClass('railwam-util-disabled');
                                    mw.hook('rw.graph.searchStarted').fire();
                                    
                                    local.input.clearErrors('#railwam-log-errors');
                                    $('#railwam-log-console-entries').empty();
                                    
                                    // Deactivate log form
                                    $(this).removeClass('railwam-log-log-btn-active');
                                    $('#railwam-log-overwrite').attr('disabled', true);
                                    $('.railwam-datepicker').css('display', 'none');
                                    
                                    var dataExists = false,
                                        foundData = false,
                                        lastId;
                                    
                                    $('#railwam-log-cancel-confirmation').css('display', 'none');
                                    
                                    rw.data.getLogged(
                                        {
                                            log: railWAM.logPage, 
                                            complete: function(logged) {
                                                
                                                rw.data.get({
                                                    wikiId: mwConfig.wgCityId,
                                                    startDate: dpStartDate,
                                                    endDate: dpEndDate,
                                                    logged: $('#railwam-log-overwrite').is(':checked') === true ? {} : logged,
                                                    wikis: 1,
                                                    
                                                    callback: function(data) {
                                                        
                                                        local.logOld.timeLeft(0);
                                                        
                                                        mw.hook('rw.graph.searchDone').fire();
                                                        
                                                        // Reactivate log form
                                                        $('#railwam-log-options').removeClass('railwam-util-disabled');
                                                        $('#railwam-log-log-btn').addClass('railwam-log-log-btn-active');
                                                        $('#railwam-log-overwrite').attr('disabled', false);
                                                        $('.railwam-datepicker').css('display', 'block');
                                                        
                                                        $.extend(logged, data);
                                                        
                                                        if (foundData === true) {
                                                            
                                                            if (lastId === dpEndDate || lastId === rw.config.maxDate) {
                                                        
                                                                rw.data.log(
                                                                    {
                                                                        data: data, 
                                                                        log: railWAM.logPage, 
                                                                        summary: '[[w:c:dev:RailWAM|RailWAM]]: ' + i18n.msg('logSummary').plain(), 
                                                                        types: ['wiki_id', 'wam', 'wam_rank', 'vertical_wam_rank'],
                                                                        addedBy: 'RailWAM',
                                                                        version: 3,
                                                                        bot: botFlag,
                                                                        override: true,
                                                                        
                                                                        callback: function() {
                                                                            
                                                                            local.logOld.newConsoleEntry(i18n.msg('logLoggedText').plain(), true);
                                                                            
                                                                        },
                                                                    }
                                                                );
                                                                
                                                                mw.hook('rw.graph.dataLogged').fire();
                                                            
                                                            } else {
                                                                
                                                                // Data retrieval canceled
                                                                $('#railwam-log-cancel-confirmation').css('display', 'block');
                                                                
                                                                if ($('#railwam-util-logafter-log').length === 0) {
                                                                    $('#railwam-log-cancel-confirmation').html('<span id="railwam-log-confirmation-text">' + i18n.msg('logCancelConfirmationText').plain() + '</span><div class="railwam-util-btn" id="railwam-util-logafter-dismiss">' + i18n.msg('dismiss').plain() + '</div><div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-logafter-log">' + i18n.msg('logBtn').plain() + '</div>');
                                                                }
                                                                
                                                            }
                                                        
                                                        } else if (dataExists === true) {
                                                            
                                                            local.logOld.newConsoleEntry(i18n.msg('logAlreadyLoggedText').plain(), false);
                                                            
                                                        } else {
                                                            
                                                            local.logOld.newConsoleEntry(i18n.msg('logNotLoggedText').plain(), false);
                                                            
                                                        }
                                                        
                                                        // Cancelled logafter button click event
                                                        $('#railwam-util-logafter-log').off('click').click(
                                                            function() {
                                                                
                                                                rw.data.log(
                                                                    {
                                                                        data: logged, 
                                                                        log: railWAM.logPage, 
                                                                        summary: '[[w:c:dev:RailWAM|RailWAM]]: ' + i18n.msg('logSummary').plain(), 
                                                                        types: ['wiki_id', 'wam', 'wam_rank', 'vertical_wam_rank'],
                                                                        addedBy: 'RailWAM',
                                                                        version: 3,
                                                                        bot: botFlag,
                                                                        override: true,
                                                                    }
                                                                );
                                                                
                                                                $('#railwam-log-confirmation-text').text(i18n.msg('scoreLogged').plain());
                                                                $('#railwam-util-logafter-log').remove();
                                                                
                                                                local.logOld.newConsoleEntry(i18n.msg('logLoggedText').plain(), true);
                                                                
                                                                mw.hook('rw.log.dataLogged').fire();
                                                                
                                                            }
                                                        );
                                                        
                                                    },
                                                    
                                                    complete: function(data, dateId, requests) {
                                                        
                                                        lastId = dateId;
                                                        
                                                    },
                                                    
                                                    success: function(data, dateId, requests) {
                                                        
                                                        foundData = true;
                                                        
                                                        local.logOld.timeLeft(requests * 10);
                                                        
                                                        if (dateId > dpStartDate - 86400) {
                                                            
                                                            local.logOld.newConsoleEntry(i18n.msg('logFoundText').plain(), true, dateId);
                                                            
                                                        }
                                                        
                                                    },
                                                    
                                                    error: function(data, dateId, requests) {
                                                        
                                                        local.logOld.timeLeft(requests * 10);
                                                        
                                                        if (dateId > dpStartDate - 86400) {
                                                            
                                                            local.logOld.newConsoleEntry(i18n.msg('logMissingText').plain(), false, dateId);
                                                            
                                                        }
                                                        
                                                    },
                                                    
                                                    exists: function(data, dateId, requests) {
                                                        
                                                        dataExists = true;
                                                        lastId = dateId;
                                                        
                                                        if (dateId > dpStartDate - 86400) {
                                                            
                                                            if (data[dateId].logged === true) {
                                                            
                                                                local.logOld.newConsoleEntry(i18n.msg('logExistsText').plain(), false, dateId);
                                                            
                                                            } else {
                                                                
                                                                local.logOld.newConsoleEntry(i18n.msg('logFoundText').plain(), true, dateId);
                                                                
                                                            }
                                                            
                                                        }
                                                        
                                                    }
                                                    
                                                });
                                                
                                            },
                                        }
                                    );
                                    
                                }
                                
                            }
                        );
                        
                        body.on('click', '#railwam-util-logafter-dismiss',
                            function() {
                                
                                $('#railwam-log-cancel-confirmation').fadeOut(200);
                                
                                mw.hook('rw.graph.logAlertDismissed').fire();
                                
                            }
                        );
                        
                    },
                    
                    /**
                     * Inserts a new log page console entry.
                     * 
                     * @param {string} text - Text of entry.
                     * @param {boolean} retrieved - If any data was retrieved.
                     * @param {number} dateId - ID of data pertaining to entry.
                     * 
                     * @returns {void}
                     */
                    newConsoleEntry: function(text, retrieved, dateId) {
                        
                        var typeId;
                        
                        if (retrieved === true) {
                            typeId = 'found';
                        } else {
                            typeId = 'missing';
                        }
                        
                        var dateElm = isNaN(local.math.parseNum(dateId)) === true ? '' : '<span class="railwam-log-entry-date">' + local.date.formatDate(dateId + (curDate.getTimezoneOffset() * 60) + 3600, true) + '<span class="railwam-smalltext">(' + timezone + ')</span></span>';
                        
                        $('<div class="railwam-log-console-entry railwam-log-console-entry-' + typeId + '">' + dateElm + '<span class="railwam-log-console-entry-text">' + text + '</span></div>').prependTo('#railwam-log-console-entries').slideDown(500);
                        
                        mw.hook('rw.log.consoleEntryAdded').fire();
                        
                    },
                    
                    /**
                     * Shows time left label on database search and removes it when finished.
                     * 
                     * @param {number} sec - Seconds remaining in search
                     * 
                     * @returns {void}
                     */
                    timeLeft: function(sec) {
                        
                        const cancelBtnElm = $('#railwam-util-cancel'),
                            loadingElm = $('#railwam-log-loading'),
                            loadingTextElm = $('#railwam-log-loading-text');
                            
                        if (sec === 0) { 
                                
                            // Done
                            loadingTextElm.empty();
                            loadingElm.css('display', 'none');
                            
                        } else {
                            
                            // Show loading text
                            loadingTextElm.text(local.time.createTimer(rw.math.convertTime(sec)));
                            
                            if (cancelBtnElm.length < 1) {
                                
                                loadingElm.append('<div class="railwam-util-btn railwam-util-btn-hasbg" id="railwam-util-cancel">' + i18n.msg('cancel').plain() + '</div>');
                                $('#railwam-util-cancel').click(
                                    function() {
                                
                                        rw.data.cancel('get');
                                        
                                        loadingTextElm.text(i18n.msg('duringCancel').plain());
                                        
                                        $(this).remove();
                                        
                                    }
                                );
                            }
                            
                            loadingElm.css('display', 'block');
                                
                        }
                    },
                
                };
            
            mw.hook('rw.api.ready').add(local.start);
                
        });
        
    });
        
})(window, $, mw);