/* A (highly unoptimsed, sorry) script that makes Template:Buildmenu function as if it were one of Total Annihilation's actual build menus */
if ($('div#build-menu')[0]) {
    $('body').append('<span id="sound" style="display:none;"></span>');
}
$('div#buildmenul').click(function() {
    document.getElementById('sound').innerHTML = '<audio src="https://vignette.wikia.nocookie.net/totalannihilation/images/f/fb/BUTSCRO1.ogg/revision/latest" autoplay=""></audio>';
    if ($('div#build2')[0]) {
        if ($('div#build2').hasClass('active')) {
            $('div#build2').addClass('inactive');
            $('div#build2').removeClass('active');
            $('div#build1').addClass('active');
            $('div#build1').removeClass('inactive');
        } else if ($('div#build3')[0]) {
            if ($('div#build3').hasClass('active')) {
                $('div#build3').addClass('inactive');
                $('div#build3').removeClass('active');
                $('div#build2').addClass('active');
                $('div#build2').removeClass('inactive');
            } else if ($('div#build4')[0]) {
                if ($('div#build4').hasClass('active')) {
                    $('div#build4').addClass('inactive');
                    $('div#build4').removeClass('active');
                    $('div#build3').addClass('active');
                    $('div#build3').removeClass('inactive');
                } else if ($('div#build5')[0]) {
                    if ($('div#build5').hasClass('active')) {
                        $('div#build5').addClass('inactive');
                        $('div#build5').removeClass('active');
                        $('div#build4').addClass('active');
                        $('div#build4').removeClass('inactive');
                    } else if ($('div#build6')[0]) {
                        if ($('div#build6').hasClass('active')) {
                            $('div#build6').addClass('inactive');
                            $('div#build6').removeClass('active');
                            $('div#build5').addClass('active');
                            $('div#build5').removeClass('inactive');
                        } else if ($('div#build7')[0]) {
                            if ($('div#build7').hasClass('active')) {
                                $('div#build7').addClass('inactive');
                                $('div#build7').removeClass('active');
                                $('div#build6').addClass('active');
                                $('div#build6').removeClass('inactive');
                            } else if ($('div#build8')[0]) {
                                if ($('div#build8').hasClass('active')) {
                                    $('div#build8').addClass('inactive');
                                    $('div#build8').removeClass('active');
                                    $('div#build7').addClass('active');
                                    $('div#build7').removeClass('inactive');
                                } else if ($('div#build1').hasClass('active')) {
                                    $('div#build1').addClass('inactive');
                                    $('div#build1').removeClass('active');
                                    $('div#build8').addClass('active');
                                    $('div#build8').removeClass('inactive');
                                }
                            } else {
                                if ($('div#build1').hasClass('active')) {
                                    $('div#build1').addClass('inactive');
                                    $('div#build1').removeClass('active');
                                    $('div#build7').addClass('active');
                                    $('div#build7').removeClass('inactive');
                                }
                            }
                        } else {
                            if ($('div#build1').hasClass('active')) {
                                $('div#build1').addClass('inactive');
                                $('div#build1').removeClass('active');
                                $('div#build6').addClass('active');
                                $('div#build6').removeClass('inactive');
                            }
                        }
                    } else {
                        if ($('div#build1').hasClass('active')) {
                            $('div#build1').addClass('inactive');
                            $('div#build1').removeClass('active');
                            $('div#build5').addClass('active');
                            $('div#build5').removeClass('inactive');
                        }
                    }
                } else {
                    if ($('div#build1').hasClass('active')) {
                        $('div#build1').addClass('inactive');
                        $('div#build1').removeClass('active');
                        $('div#build4').addClass('active');
                        $('div#build4').removeClass('inactive');
                    }
                }
            } else {
                if ($('div#build1').hasClass('active')) {
                    $('div#build1').addClass('inactive');
                    $('div#build1').removeClass('active');
                    $('div#build3').addClass('active');
                    $('div#build3').removeClass('inactive');
                }
            }
        } else {
            if ($('div#build1').hasClass('active')) {
                $('div#build1').addClass('inactive');
                $('div#build1').removeClass('active');
                $('div#build2').addClass('active');
                $('div#build2').removeClass('inactive');
            }
        }
    }
});

$('div#buildmenur').click(function() {
    document.getElementById('sound').innerHTML = '<audio src="https://vignette.wikia.nocookie.net/totalannihilation/images/f/fb/BUTSCRO1.ogg/revision/latest" autoplay=""></audio>';
    if ($('div#build2')[0]) {
        if ($('div#build1').hasClass('active')) {
            $('div#build1').addClass('inactive');
            $('div#build1').removeClass('active');
            $('div#build2').addClass('active');
            $('div#build2').removeClass('inactive');
        } else if ($('div#build3')[0]) {
            if ($('div#build2').hasClass('active')) {
                $('div#build2').addClass('inactive');
                $('div#build2').removeClass('active');
                $('div#build3').addClass('active');
                $('div#build3').removeClass('inactive');
            } else if ($('div#build4')[0]) {
                if ($('div#build3').hasClass('active')) {
                    $('div#build3').addClass('inactive');
                    $('div#build3').removeClass('active');
                    $('div#build4').addClass('active');
                    $('div#build4').removeClass('inactive');
                } else if ($('div#build5')[0]) {
                    if ($('div#build4').hasClass('active')) {
                        $('div#build4').addClass('inactive');
                        $('div#build4').removeClass('active');
                        $('div#build5').addClass('active');
                        $('div#build5').removeClass('inactive');
                    } else if ($('div#build6')[0]) {
                        if ($('div#build5').hasClass('active')) {
                            $('div#build5').addClass('inactive');
                            $('div#build5').removeClass('active');
                            $('div#build6').addClass('active');
                            $('div#build6').removeClass('inactive');
                        } else if ($('div#build7')[0]) {
                            if ($('div#build6').hasClass('active')) {
                                $('div#build6').addClass('inactive');
                                $('div#build6').removeClass('active');
                                $('div#build7').addClass('active');
                                $('div#build7').removeClass('inactive');
                            } else if ($('div#build8')[0]) {
                                if ($('div#build7').hasClass('active')) {
                                    $('div#build7').addClass('inactive');
                                    $('div#build7').removeClass('active');
                                    $('div#build8').addClass('active');
                                    $('div#build8').removeClass('inactive');
                                } else if ($('div#build8').hasClass('active')) {
                                    $('div#build8').addClass('inactive');
                                    $('div#build8').removeClass('active');
                                    $('div#build1').addClass('active');
                                    $('div#build1').removeClass('inactive');
                                }
                            } else {
                                if ($('div#build7').hasClass('active')) {
                                    $('div#build7').addClass('inactive');
                                    $('div#build7').removeClass('active');
                                    $('div#build1').addClass('active');
                                    $('div#build1').removeClass('inactive');
                                }
                            }
                        } else {
                            if ($('div#build6').hasClass('active')) {
                                $('div#build6').addClass('inactive');
                                $('div#build6').removeClass('active');
                                $('div#build1').addClass('active');
                                $('div#build1').removeClass('inactive');
                            }
                        }
                    } else {
                        if ($('div#build5').hasClass('active')) {
                            $('div#build5').addClass('inactive');
                            $('div#build5').removeClass('active');
                            $('div#build1').addClass('active');
                            $('div#build1').removeClass('inactive');
                        }
                    }
                } else {
                    if ($('div#build4').hasClass('active')) {
                        $('div#build4').addClass('inactive');
                        $('div#build4').removeClass('active');
                        $('div#build1').addClass('active');
                        $('div#build1').removeClass('inactive');
                    }
                }
            } else {
                if ($('div#build3').hasClass('active')) {
                    $('div#build3').addClass('inactive');
                    $('div#build3').removeClass('active');
                    $('div#build1').addClass('active');
                    $('div#build1').removeClass('inactive');
                }
            }
        } else {
            if ($('div#build2').hasClass('active')) {
                $('div#build2').addClass('inactive');
                $('div#build2').removeClass('active');
                $('div#build1').addClass('active');
                $('div#build1').removeClass('inactive');
            }
        }
    }
});