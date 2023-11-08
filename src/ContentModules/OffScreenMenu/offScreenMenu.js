import "./offScreenMenu.scss";
const modOffScreenMenu = function () {
	const init = (module) => {
		offScreenMenuLogic(module);
	};

	const offScreenMenuLogic = (module) => {
		let contentToggle = module.querySelector("ul").classList;

		// Open Off Screen Menu
		module.querySelectorAll(".icon-listNumbered").forEach((item) => {
			item.addEventListener("click", () => {
				if (contentToggle.contains("hide")) {
					contentToggle.remove("hide");
				}

				document.querySelectorAll(".sticky").forEach((item) => {
					item.classList.remove("sticky");
				});

				document.querySelector("#overlay").classList.remove("hide");
				zoomOutESC(module);
				zoomOutClickingAnywhere(module);
			});
		});
		// Close Off Screen Menu
		module.querySelectorAll(".icon-close").forEach((item) => {
			item.addEventListener("click", () => {
				if (!contentToggle.contains("hide")) {
					contentToggle.add("hide");
				}

				document.querySelectorAll(".content-item").forEach((item) => {
					item.classList.add("sticky");
				});

				document.querySelector("#overlay").classList.add("hide");
			});
		});
		// Close Off Screen Menu With Item
		module.querySelectorAll(".anchor").forEach((item) => {
			item.addEventListener("click", () => {
				if (!contentToggle.contains("hide")) {
					contentToggle.add("hide");
				}

				document.querySelectorAll(".content-item").forEach((item) => {
					item.classList.add("sticky");
				});

				document.querySelector("#overlay").classList.add("hide");
			});
		});
		// Close Off Screen Menu With ESC
		const zoomOutESC = (zoomOut) => {
			let contentToggle = zoomOut.querySelector("ul").classList;
			document.addEventListener("keydown", (event) => {
				if (event.key === "Escape") {
					if (!contentToggle.contains("hide")) {
						contentToggle.add("hide");
					}

					document.querySelectorAll(".content-item").forEach((item) => {
						item.classList.add("sticky");
					});

					document.querySelector("#overlay").classList.add("hide");
				}
			});
		};
		// Close Off Screen Menu When Clicking Anywhere outside of the Menu Itself
		const zoomOutClickingAnywhere = (zoomOut) => {
			let contentToggle = zoomOut.querySelector("ul").classList;
			document.querySelector("#overlay").addEventListener("click", () => {
				if (!contentToggle.contains("hide")) {
					contentToggle.add("hide");
				}

				document.querySelectorAll(".content-item").forEach((item) => {
					item.classList.add("sticky");
				});

				document.querySelector("#overlay").classList.add("hide");
			});
		};
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".mod-off-screen-menu";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		modOffScreenMenu().init(module);
	});
};
