// my weather thing 
(function() {
    'use strict';
    
    if (mw.config.get('wgTitle') !== 'BeyondPaper' || mw.config.get('wgCanonicalNamespace') !== 'User') {
        return;
    }
    
    const API_PARTS = [
        atob('aHR0cHM6Ly9hcGkub3Blbi1tZXRlby5jb20vdjEvZm9yZWNhc3Q/bGF0aXR1ZGU9'),
        atob('NTIuNjAyNDcwNA=='),
        atob('JmxvbmdpdHVkZT0='),
        atob('LTEuMTIwNjY1Ng=='),
        atob('JmhvdXJseT1yYWluLHRlbXBlcmF0dXJlXzJtLHNub3dmYWxsLHNob3dlcnMsYXBwYXJlbnRfdGVtcGVyYXR1cmUsaXNfZGF5'),
        atob('JnRpbWV6b25lPUdNVCZmb3JlY2FzdF9kYXlzPTE=')
    ];
    const API_URL = API_PARTS.join('');
    const MY_TIMEZONE = 'Europe/London';
    
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createWidget);
        } else {
            createWidget();
        }
    }
    
    function createWidget() {
        const widget = document.createElement('div');
        widget.id = 'status-widget';
        updateWidgetTheme(widget);
        
        const contentArea = document.querySelector('#mw-content-text') || 
                           document.querySelector('.page__main') ||
                           document.querySelector('.page-content');
        
        if (contentArea) {
            contentArea.appendChild(widget);
            updateWidget();
            setInterval(updateWidget, 60000);
        }
    }
    
    function updateWidgetTheme(widget, isDay) {
        if (isDay === undefined) {
            const hour = new Date().getHours();
            isDay = hour >= 6 && hour < 20;
        }
        
        if (isDay) {
            widget.style.cssText = `
                background: #f9f9f9;
                border: 1px solid #c5c5c5;
                border-radius: 2px;
                padding: 12px 14px;
                margin: 16px 0;
                font-family: Rubik, Helvetica, Arial, sans-serif;
                font-size: 12px;
                color: #3a3a3a;
                line-height: 1.5;
            `;
        } else {
            widget.style.cssText = `
                background: #1a1a1a;
                border: 1px solid #3a3a3a;
                border-radius: 2px;
                padding: 12px 14px;
                margin: 16px 0;
                font-family: Rubik, Helvetica, Arial, sans-serif;
                font-size: 12px;
                color: #e0e0e0;
                line-height: 1.5;
            `;
        }
    }
    
    function getTimeInfo() {
        const myTime = new Date().toLocaleTimeString('en-GB', {
            timeZone: MY_TIMEZONE,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        
        const visitorTime = new Date().toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        
        return { myTime, visitorTime };
    }
    
    function getCurrentWeather(data) {
        const now = new Date();
        const currentHour = now.getHours();
        
        return {
            temp: data.hourly.temperature_2m[currentHour],
            rain: data.hourly.rain[currentHour],
            snowfall: data.hourly.snowfall[currentHour],
            showers: data.hourly.showers[currentHour],
            isDay: data.hourly.is_day[currentHour],
            tempUnit: data.hourly_units.temperature_2m
        };
    }
    
    function getWeatherStatement(weather) {
        const statements = [];
        
        if (weather.isDay) {
            statements.push("☀️ It's daytime here");
        } else {
            statements.push("🌙 It's nighttime here");
        }
        
        if (weather.snowfall > 0) {
            statements.push("❄️ It's snowing");
        } else if (weather.rain > 1.0) {
            statements.push("🌧️ It's raining heavily");
        } else if (weather.rain > 0.3) {
            statements.push("🌦️ It's raining");
        } else if (weather.showers > 0) {
            statements.push("🌦️ There are showers");
        } else {
            statements.push("✨ It's clear outside");
        }
        
        statements.push(`🌡️ ${weather.temp}${weather.tempUnit}`);
        
        return statements;
    }
    
    function displayWidget(weatherData) {
        const widget = document.getElementById('status-widget');
        if (!widget) return;
        
        const times = getTimeInfo();
        const weather = getCurrentWeather(weatherData);
        const statements = getWeatherStatement(weather);
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour < 20;
        
        updateWidgetTheme(widget, isDay);
        
        const timeStatement = times.myTime === times.visitorTime 
            ? `For me, it's currently <strong>${times.myTime}</strong>`
            : `For me, it's currently <strong>${times.myTime}</strong>, but for you, it's <strong>${times.visitorTime}</strong>`;
        
        const textColor = isDay ? '#3a3a3a' : '#e0e0e0';
        const borderColor = isDay ? '#e0e0e0' : '#3a3a3a';
        const mutedColor = isDay ? '#888' : '#999';
        
        const content = document.createElement('div');
        content.innerHTML = `
            <div style="margin-bottom: 8px; color: ${textColor};">
                ${timeStatement}
            </div>
            
            ${statements.map(statement => `
                <div style="margin-bottom: 6px; color: ${textColor};">
                    ${statement}
                </div>
            `).join('')}
            
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid ${borderColor}; font-size: 11px; color: ${mutedColor}; text-align: right;">
                Updated ${new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}
            </div>
        `;
        
        while (widget.childNodes.length > 0) {
            widget.removeChild(widget.lastChild);
        }
        widget.appendChild(content);
    }
    
    function updateWidget() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => displayWidget(data))
            .catch(error => {
                const widget = document.getElementById('status-widget');
                if (widget) {
                    const times = getTimeInfo();
                    const hour = new Date().getHours();
                    const isDay = hour >= 6 && hour < 20;
                    
                    updateWidgetTheme(widget, isDay);
                    
                    const timeStatement = times.myTime === times.visitorTime 
                        ? `For me, it's currently <strong>${times.myTime}</strong>`
                        : `For me, it's currently <strong>${times.myTime}</strong>, but for you, it's <strong>${times.visitorTime}</strong>`;
                    
                    const textColor = isDay ? '#3a3a3a' : '#e0e0e0';
                    const mutedColor = isDay ? '#888' : '#999';
                    
                    const content = document.createElement('div');
                    content.innerHTML = `
                        <div style="margin-bottom: 8px; color: ${textColor};">
                            ${timeStatement}
                        </div>
                        <div style="color: ${mutedColor};">
                            ⚠️ Weather data unavailable
                        </div>
                    `;
                    
                    while (widget.childNodes.length > 0) {
                        widget.removeChild(widget.lastChild);
                    }
                    widget.appendChild(content);
                }
            });
    }
    
    init();
})();