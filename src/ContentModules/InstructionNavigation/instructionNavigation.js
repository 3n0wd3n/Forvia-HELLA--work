import "./instructionNavigation.scss";
const modOffScreenMenu = function () {
	const init = (module) => {
		offScreenMenuLogic(module);
	};

	// Function for closing off screen menu
	const closeOffScreenMenu = (menuItems) => {
		menuItems.classList.add("table-of-content");
		menuItems.classList.remove("content-item");
		menuItems.children[0].classList.add("hide");
		for (let i = 0; i <= menuItems.children.length - 1; i++) {
			menuItems.children[i].classList.add("table-of-content");
		}
		document.querySelector("#overlay-instruction-nav").classList.add("hide");

		document.querySelectorAll(".content-item").forEach((item) => {
			item.classList.add("sticky");
		});
	};

	// Close Off Screen Menu With ESC
	const closeOffScreenMenuWithEsc = (menuItems) => {
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") {
				if (menuItems.classList.contains("content-item")) {
					closeOffScreenMenu(menuItems);
				}
			}
		});
	};

	// Close Off Screen Menu When Clicking Anywhere outside of the Menu Itself
	const closeOffScreenMenuByClickingAnywhere = (menuItems) => {
		document.querySelector("#overlay-instruction-nav").addEventListener("click", () => {
			if (menuItems.classList.contains("content-item")) {
				closeOffScreenMenu(menuItems);
			}
		});
	};

	const offScreenMenuLogic = (module) => {
		let menuItems = module.querySelector("ul");
		let instructionNavigationItems = module.querySelectorAll(".mod-instruction-navigation .content-item");
		let closeBtn = module.querySelectorAll(".closeOffScreenMenu");

		// Open Off Screen Menu
		instructionNavigationItems.forEach((item) => {
			item.addEventListener("click", () => {
				menuItems.classList.remove("table-of-content");
				menuItems.classList.add("content-item");
				menuItems.children[0].classList.remove("hide");
				for (let i = 0; i <= menuItems.children.length - 1; i++) {
					menuItems.children[i].classList.remove("table-of-content");
				}
				document.querySelector("#overlay-instruction-nav").classList.remove("hide");

				document.querySelectorAll(".sticky").forEach((item) => {
					item.classList.remove("sticky");
				});
				closeOffScreenMenuWithEsc(menuItems);
				closeOffScreenMenuByClickingAnywhere(menuItems);
			});
		});

		// Close Off Screen Menu
		closeBtn.forEach((item) => {
			item.addEventListener("click", () => {
				closeOffScreenMenu(menuItems);
			});
		});

		// Close Off Screen Menu With Item
		module.querySelectorAll(".anchor").forEach((item) => {
			item.addEventListener("click", () => {
				if (menuItems.classList.contains("content-item")) {
					closeOffScreenMenu(menuItems);
				}
			});
		});
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".mod-instruction-navigation-refactor-fs";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		modOffScreenMenu().init(module);
	});
};
