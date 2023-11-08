import "./carousel.scss";
const modCarousel = function () {
	const init = (module) => {
		sliderLogic(module);
	};

	const sliderLogic = (module) => {
		const showSlides = (n) => {
			let i;
			let slides = module.querySelectorAll(".mod-carousel__slides");
			let dots = module.querySelectorAll(".dot");

			// Set index to one when we go beyond to count of slides
			if (n > slides.length) {
				slideIndex = 1;
			}
			// Set index to length of count of slides when we have negative number in variable slideIndex
			if (n < 1) {
				slideIndex = slides.length;
			}
			for (i = 0; i < slides.length; i++) {
				// Set dispaly for all slides to none
				slides[i].style.display = "none";
				// Remove styling for all dots
				dots[i].classList.remove("active");
			}

			slides[slideIndex - 1].style.display = "flex";
			dots[slideIndex - 1].classList.add("active");
		};

		let slideIndex = 1;
		let toggleHover = false;
		let interval = module.getAttribute("data-interval");
		showSlides(slideIndex);

		// Slideshow
		let i = 0;
		// TODO: add -> clean interval
		setInterval(() => {
			// Set changing image in rotation inside slideshow
			if (i > slides.length) {
				i = 0;
			} else {
				if (toggleHover == false) {
					showSlides((slideIndex += 1));
				}
			}
			i++;
		}, interval);

		// TODO: refactor -> think about puting all events to one fucntion events
		// If hover over module than it stops interval
		module.addEventListener("mouseenter", () => {
			toggleHover = true;
		});

		// If hover over module than it starts interval again
		module.addEventListener("mouseleave", () => {
			toggleHover = false;
		});

		// Variables for arrows next/previous
		let nxtSlideIcon = module.querySelector(".next-slide");
		let prvSlideIcon = module.querySelector(".previous-slide");

		// Change icon color on hover
		nxtSlideIcon.addEventListener("mouseenter", () => {
			nxtSlideIcon.children[0].classList.add("icon-color--white");
		});
		module.querySelector(".previous-slide").addEventListener("mouseenter", () => {
			module.querySelector(".previous-slide").children[0].classList.add("icon-color--white");
		});

		// Change icon color on hover
		nxtSlideIcon.addEventListener("mouseleave", () => {
			nxtSlideIcon.children[0].classList.remove("icon-color--white");
		});
		prvSlideIcon.addEventListener("mouseleave", () => {
			prvSlideIcon.children[0].classList.remove("icon-color--white");
		});

		// Previous slide controls
		let previousSlide = module.querySelector(".previous-slide");
		previousSlide.addEventListener("click", () => {
			showSlides((slideIndex += -1));
		});

		// Previous slide controls using keydown
		document.addEventListener("keydown", (event) => {
			if (event.key === "ArrowLeft" && module.classList.contains("zoomed")) {
				showSlides((slideIndex += -1));
			}
		});

		// Next slide controls
		let nextSlide = module.querySelector(".next-slide");
		nextSlide.addEventListener("click", () => {
			showSlides((slideIndex += 1));
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "ArrowRight" && module.classList.contains("zoomed")) {
				showSlides((slideIndex += 1));
			}
		});

		// Thumbnail image controls using dots
		let slides = module.querySelectorAll(".dot");
		slides.forEach((slideDot, index) => {
			slideDot.addEventListener("click", () => {
				showSlides((slideIndex = index + 1));
			});
		});

		// Thumbnail image controls using images
		let slideImages = module.querySelectorAll(".thumbnails-image");
		slideImages.forEach((slideImage, index) => {
			slideImage.addEventListener("click", () => {
				showSlides((slideIndex = index + 1));
			});
		});

		// Zoom effect
		let zoomBtns = module.querySelectorAll(".carousel-zoom");
		zoomBtns.forEach((zoomBtn) => {
			zoomBtn.addEventListener("click", () => {
				module.classList.add("zoomed");
				if (module.classList.contains("full-width")) {
					module.classList.remove("full-width");
					module.classList.add("fw");
				}
				zoomBtn.nextElementSibling.classList.remove("hide");
				zoomBtn.classList.add("hide");
				document.querySelector(".overlay").style.display = "block";
				zoomOut(module);
			});
		});

		const zoomOut = (zoomOutImage) => {
			// Zoom out effect
			let zoomOutBtn = zoomOutImage.querySelector(".carousel-close-icon");
			// Zoom out effect with click
			zoomOutBtn.addEventListener("click", () => {
				zoomOutImage.classList.remove("zoomed");
				if (module.classList.contains("fw")) {
					module.classList.add("full-width");
					module.classList.remove("fw");
				}
				zoomOutBtn.classList.add("hide");
				document.querySelector(".overlay").style.display = "none";
				zoomOutBtn.previousElementSibling.classList.remove("hide");
			});
			// Zoom out effect with keydown
			document.addEventListener("keydown", (event) => {
				if (event.key === "Escape" && zoomOutImage.classList.contains("zoomed")) {
					zoomOutImage.classList.remove("zoomed");
					if (module.classList.contains("fw")) {
						module.classList.add("full-width");
						module.classList.remove("fw");
					}
					zoomOutBtn.classList.add("hide");
					document.querySelector(".overlay").style.display = "none";
					zoomOutBtn.previousElementSibling.classList.remove("hide");
				}
			});
		};
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".mod-carousel";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		modCarousel().init(module);
	});
};
