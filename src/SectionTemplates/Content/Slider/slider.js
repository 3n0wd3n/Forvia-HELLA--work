import "./slider.scss";
const modSlider = function () {
	const sliderLogic = (module) => {
		module.addEventListener("wheel", (event) => {
			if (event.deltaY != 0) {
				module.scrollLeft += event.deltaY;
			}
			event.preventDefault();
		});
	};

	const init = (module) => {
		sliderLogic(module);
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".mod-slider-fs";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		modSlider().init(module);
	});
};
