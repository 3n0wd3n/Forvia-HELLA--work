import "./chip.scss";
const comChip = function () {
	const init = (module) => {
		module.addEventListener("click", () => {
			module.parentNode.classList.add("hide");
		});
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".icon-cancel";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		comChip().init(module);
	});
};
