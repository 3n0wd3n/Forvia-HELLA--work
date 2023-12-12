import "./video.scss";

const comVideo = function () {
	const videoLogic = (module) => {};

	const init = (module) => {
		videoLogic(module);
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".com-video";
export const loadModule = () => {
	let module = document.querySelector(modules);
	if (module) {
		comVideo().init(module);
	}
};
