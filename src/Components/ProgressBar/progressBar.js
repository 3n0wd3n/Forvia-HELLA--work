import "./progressBar.scss";
const comProgressBar = function () {
	function runProgress(module) {
		let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		let scrolled = (winScroll / height) * 100;
		module.style.width = scrolled + "%";
	}
	const init = (module) => {
		window.onscroll = function () {
			runProgress(module);
		};
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".bar";
export const loadModule = () => {
	let module = document.querySelector(modules);
	if (module) {
		comProgressBar().init(module);
	}
};
