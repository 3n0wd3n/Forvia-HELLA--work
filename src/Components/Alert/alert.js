import "./alert.scss";

const comAlert = function () {
	const alertControls = (module) => {
		module.querySelectorAll(".closeBtn").forEach((item) => {
			item.addEventListener("click", () => {
				module.classList.add("hide");
			});
		});
	};
	const init = (module) => {
		alertControls(module);
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".com-alert";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		comAlert().init(module);
	});
};
