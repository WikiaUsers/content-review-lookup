$(function () {
    var vkElements = document.querySelectorAll(".vk-widget");

    if (vkElements.length !== 0) {
        init();
    } else {
        return;
    }

    function init() {
        mw.loader.getScript("https://vk.com/js/api/openapi.js?168").then(
            function () {
                for (var i in vkElements) {
                    var d = vkElements[i].dataset;

                    if (d.widget) {
                        switch (d.widget) {
                            case "community":
                                vkElements[i].id += "vk-element-" + i;

                                var mode, nocover, height, width, color1, color2, color3;

                                if (d.mode) {
                                    switch (d.mode) {
                                        case "users":
                                            mode = 3;
                                            break;
                                        case "feed":
                                            mode = 4;
                                            break;
                                        case "basic":
                                        default:
                                            mode = 1;
                                            break;
                                    }
                                } else {
                                    mode = 1;
                                }

                                if (d.nocover) {
                                    switch (d.nocover) {
                                        case "true":
                                            nocover = 1;
                                            break;
                                        case "false":
                                            nocover = 0;
                                            break;
                                        default:
                                            nocover = 0;
                                            break;
                                    }
                                } else {
                                    mode = 1;
                                    soft = 0;
                                }

                                if (d.height) {
                                    height = d.height;
                                } else {
                                    height = "400";
                                }

                                if (d.width) {
                                    width = d.width;
                                } else {
                                    width = "300";
                                }

                                VK.Widgets.Group("vk-element-" + i, {
                                    mode: mode,
                                    no_cover: nocover,
                                    height: height,
                                    width: width,
                                    color1: d.colorBg,
                                    color2: d.colorText,
                                    color3: d.colorButton
                                }, d.id);
                                break;
                            case "poll":
                                vkElements[i].id += "vk-element-" + i;

                                VK.Widgets.Poll("vk-element-" + i, {}, d.id)
                                break;
                            case "subscribe":
                                vkElements[i].id += "vk-element-" + i;

                                var mode, soft;

                                if (d.mode) {
                                    switch (d.mode) {
                                        case "button":
                                            mode = 1;
                                            soft = 0;
                                            break;
                                        case "button-soft":
                                            mode = 1;
                                            soft = 1;
                                            break;
                                        case "link":
                                            mode = 2;
                                            soft = 0;
                                            break;
                                        case "link-soft":
                                            mode = 2;
                                            soft = 1;
                                            break;
                                        default:
                                            mode = 1;
                                            soft = 0;
                                            break;
                                    }
                                } else {
                                    mode = 1;
                                    soft = 0;
                                }

                                VK.Widgets.Subscribe("vk-element-" + i, {
                                    mode: mode,
                                    soft: soft
                                }, d.id);
                                break;
                            case "app":
                                vkElements[i].id += "vk-element-" + i;

                                var mode;

                                if (d.mode) {
                                    switch (d.mode) {
                                        case "card":
                                            mode = 1;
                                            break;
                                        case "users":
                                            mode = 2;
                                            break;
                                        case "button":
                                            mode = 3;
                                            break;
                                        default:
                                            mode = 1;
                                            break;
                                    }
                                } else {
                                    mode = 1;
                                }

                                VK.Widgets.App("vk-element-" + i, d.id, {
                                    mode: mode
                                });
                                break;
                            case "article":
                                vkElements[i].id += "vk-element-" + i;

                                VK.Widgets.Article("vk-element-" + i, d.link);
                                break;
                            case "podcast":
                                vkElements[i].id += "vk-element-" + i;

                                VK.Widgets.Podcast("vk-element-" + i, d.link);
                                break;
                        }
                    }
                }
            }
        )
    };
});