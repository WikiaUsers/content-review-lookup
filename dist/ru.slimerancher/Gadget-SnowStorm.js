mw.loader.getScript("https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js").then(
	function () {
		var particles = document.createElement("div");
		particles.id = "particles";

		Object.assign(particles.style, {
			position: "fixed",
			top: 0,
			width: "100%",
			height: "100%",
			zIndex: -2,
			pointerEvents: "none"
		});

		document.body.after(particles);

		particlesJS("particles", {
			"particles": {
				"number": {
					"value": 400,
					"density": {
						"enable": true,
						"value_area": 3000
					}
				},
				"color": {
					"value": "#ffffff"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#ffffff"
					},
					"polygon": {
						"nb_sides": 3
					},
					"image": {
						"src": "img/github.svg",
						"width": 100,
						"height": 100
					}
				},
				"opacity": {
					"value": 0.8,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 1,
						"opacity_min": 0.8,
						"sync": false
					}
				},
				"size": {
					"value": 2,
					"random": true,
					"anim": {
						"enable": true,
						"speed": 5,
						"size_min": 0,
						"sync": false
					}
				},
				"line_linked": {
					"enable": false,
					"distance": 500,
					"color": "#ffffff",
					"opacity": 1,
					"width": 2
				},
				"move": {
					"enable": true,
					"speed": 4,
					"direction": "bottom",
					"random": true,
					"straight": false,
					"out_mode": "out",
					"bounce": false,
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": false,
						"mode": "bubble"
					},
					"onclick": {
						"enable": false,
						"mode": "repulse"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 400,
						"line_linked": {
							"opacity": 0.5
						}
					},
					"bubble": {
						"distance": 400,
						"size": 4,
						"duration": 0.3,
						"opacity": 1,
						"speed": 3
					},
					"repulse": {
						"distance": 200,
						"duration": 0.4
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true
		});
	}
);