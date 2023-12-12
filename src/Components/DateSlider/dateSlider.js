import "./dateSlider.scss";

const comDateSlider = function () {
	const dateSliderLogic = (module) => {
		let leftArrow = module.querySelector(".com-date-slider-container__left-arrow");
		let rightArrow = module.querySelector(".com-date-slider-container__right-arrow");
		let items = module.querySelector(".com-date-slider-container__items");
		let scrollStep = 150;

		leftArrow.addEventListener("click", () => {
			let sl = items.scrollLeft;

			if (sl - scrollStep <= 0) {
				items.scrollTo(0, 0);
			} else {
				items.scrollTo(sl - scrollStep, 0);
			}
		});

		rightArrow.addEventListener("click", () => {
			let sl = items.scrollLeft;
			let cw = items.scrollWidth;

			if (sl + scrollStep >= cw) {
				items.scrollTo(cw, 0);
			} else {
				items.scrollTo(sl + scrollStep, 0);
			}
		});
	};

	const scrollWithWheel = (module) => {
		let itemsContainer = module.querySelector(".com-date-slider-container__items");
		itemsContainer.addEventListener("wheel", (event) => {
			if (event.deltaY != 0) {
				itemsContainer.scrollLeft += event.deltaY;
			}
			event.preventDefault();
		});
	};

	const setNumberOfAvailableCurses = (module) => {
		let numberOfCurses = module.querySelector(".com-date-slider-container__items").childNodes.length;
		module.querySelector(".numberOfCurses").innerHTML = numberOfCurses;
	};

	const init = (module) => {
		dateSliderLogic(module);
		setNumberOfAvailableCurses(module);
		scrollWithWheel(module);
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".com-date-slider";
export const loadModule = () => {
	let module = document.querySelector(modules);
	if (module) {
		comDateSlider().init(module);
	}
};
