import "./navigation.scss";

/* TODO: resolve problem with moving between submenu's -> now it crashes because I removed child in every submenu when I jumped to lower one -> use visibility = hidden */

const navigation = function () {
	const init = (module) => {
		sticky(module);
		displayLvl3(module);
		searchInput(module);
		mobileMenu(module);
	};

	const mobileMenu = (module) => {
		// Function for navigation in mobile menu

		// SELECTORS
		// There must be document because it is out of scope
		let mobileMenu = document.getElementsByClassName("mobile-navigation-menu");
		// Close icon in scope of mobile navigation
		let closeIcon = document.querySelector(".mobile-navigation-menu").querySelector(".icon-close");
		// First level of navigation
		let nav = module.querySelector(".navigation");
		let navLvl2 = module.getElementsByClassName("nav-lvl2")[0].children[0].children;
		// let navLvl2 = module.getElementsByClassName("nav-lvl2");
		let navLvl3 = module.getElementsByClassName("nav-lvl3");
		let hamburgerIcon = module.getElementsByClassName("hamburger")[0];
		// Refactor -> makeing more easy to use
		let mobileMenuArr = Array.from(mobileMenu);
		let visibility = [].slice.apply(mobileMenuArr[0].classList).includes("showMenu");

		// TODO: add move up in submenu
		// TODO: replace module for document when geting this from scope

		hamburgerIcon.addEventListener("click", (event) => {
			event.preventDefault();
			// Showing mobile navigation
			if (visibility === false) {
				mobileMenu[0].classList.add("showMenu");
				mobileMenu[0].classList.remove("hideMenu");
			}

			showNavigationContent(module);
		});

		const showNavigationContent = (module) => {
			// Creating of ul
			let mobileMenuSelected = document.querySelector(".mobile-navigation-menu");

			// Old nodes
			let oldNodes = []; // type of undefined

			const firstLevlNav = (nav, mobileMenuSelected, firstPass = true, oldNodes) => {
				if (firstPass) {
					let ul = document.createElement("ul");
					ul.classList.add("lvl1");
					mobileMenuSelected.appendChild(ul);

					// Generate first level of navigation
					for (let i = 0; i < nav.children.length; i++) {
						nav.children[i].children[0].classList.add("mobile-navigation-menu__menu-item");
						mobileMenuSelected.children[1].appendChild(nav.children[i].children[0]);
					}
				} else {
					let mobileNavHeaderChildren = mobileMenuSelected.children[0].children[0].children;
					// Check if there is icon or not inside of the navigation
					if (mobileNavHeaderChildren.length == 2) {
						// Change header of the second level nav
						mobileNavHeaderChildren[1].innerHTML = "Main Menu";
						mobileNavHeaderChildren[0].style.display = "none";
					}
					let lvl1Nav = document.getElementsByClassName("nav-lvl1");

					// Remoe previous uls and append uls from firstLevel navigation
					if (oldNodes) {
						// Check from wich level oldNode is
						let oldNode = mobileMenuSelected.children[1].remove();
						oldNodes.push(oldNode);
						mobileMenuSelected.appendChild(oldNodes[0]);
					}
				}
			};

			firstLevlNav(nav, mobileMenuSelected, oldNodes);

			// TODO: think about reusibility of old class for desktop menu items
			const defineAsLinkOrSubmenuItem = (mobileMenuSelected, levelOfMenu) => {
				// Show if menu items is link or another submenu item
				for (let i = 0; i < mobileMenuSelected.children[1].children.length; i++) {
					if (levelOfMenu == 1) {
						if (mobileMenuSelected.children[1].children[i].href.includes("javascript")) {
							let span = document.createElement("span");
							span.classList.add("icon-chevronRight");
							mobileMenuSelected.children[1].children[i].appendChild(span);
						}
					}
					if (levelOfMenu == 2) {
						if (mobileMenuSelected.children[1].children[i].children[0].href.includes("javascript")) {
							let span = document.createElement("span");
							span.classList.add("icon-chevronRight");
							mobileMenuSelected.children[1].children[i].appendChild(span);
						}
					}
				}
			};

			defineAsLinkOrSubmenuItem(mobileMenuSelected, 1);

			const redirectingToAnotherLevel = (mobileMenuSelected, oldNodes) => {
				// Redirecting to another level of menu
				for (let i = 0; i < mobileMenuSelected.children[1].children.length; i++) {
					mobileMenuSelected.children[1].children[i].addEventListener("click", () => {
						let mobileMenuItem = mobileMenuSelected.children[1].children[i];
						let breaker = false;

						// Check if the href leads to somewhere (outside of the menu -> google.com etc.) with nodeName
						if (mobileMenuItem.nodeName == "A") {
							mobileMenuItem.href.includes("https://") ? (breaker = true) : (breaker = false);
						} else if (mobileMenuItem.nodeName == "LI") {
							mobileMenuItem.children[0].href.includes("https://") ? (breaker = true) : (breaker = false);
						}

						if (breaker) {
							return;
						}
						// Selecting just where to go based on length of id
						let idToSubMenu = mobileMenuItem.id.slice(3);
						if (idToSubMenu.length == 3) {
							secondLevelNav(mobileMenuSelected, idToSubMenu, oldNodes);
						}
						if (idToSubMenu.length == 5) {
							thirdLevelNav(mobileMenuSelected, idToSubMenu, oldNodes);
						}
					});
				}
				// Redirecting back to another level of menu
				mobileMenuSelected.children[0].children[0].addEventListener("click", () => {
					firstLevlNav(nav, mobileMenuSelected, false, oldNodes);
				});
			};

			redirectingToAnotherLevel(mobileMenuSelected, oldNodes);

			const secondLevelNav = (mobileNavMenu, idToSubMenu, oldNodes) => {
				// Second level of navigation

				if (oldNodes[0]) {
					console.log("aaaa", typeof oldNodes[0], oldNodes[0]);
				}

				// Using id to get item for second level nav content
				let lvl2Nav = document.getElementById(idToSubMenu).children[0].children;

				//Remove previous ul and replace for new one with second level nav content
				let oldNode = mobileNavMenu.removeChild(mobileNavMenu.children[1]);
				oldNodes.push(oldNode);

				let ul = document.createElement("ul");
				ul.classList.add("lvl2");
				mobileNavMenu.appendChild(ul);

				// Change header of the second level nav
				let lvl2HeaderNav = mobileNavMenu.children[0].children[0];
				let span = document.createElement("span");
				lvl2HeaderNav.id = "to-1.1";
				span.classList.add("icon-chevronLeft", "com-icon", "icon-color--white");
				lvl2HeaderNav.insertBefore(span, lvl2HeaderNav.children[0]);
				lvl2HeaderNav.children[1].innerHTML = "Back To Main Menu";

				let navLen = lvl2Nav.length;
				for (let i = 0; i < navLen; i++) {
					lvl2Nav[i].classList.add("mobile-navigation-menu__menu-item");
				}
				for (let i = 0; i < navLen; i++) {
					mobileNavMenu.children[1].appendChild(lvl2Nav[0]);
				}
				defineAsLinkOrSubmenuItem(mobileMenuSelected, 2);
				// Waiting if click on menu item for redirecting
				redirectingToAnotherLevel(mobileMenuSelected, oldNodes);
			};

			const thirdLevelNav = (mobileNavMenu, idToSubMenu) => {
				// Second level of navigation

				// Using id to get item for third level nav content
				let lvl3Nav = document.getElementById(idToSubMenu).children[0].children;

				// Remove previous ul and replace for new one with third level nav content
				oldNodes[1] = mobileNavMenu.removeChild(mobileNavMenu.children[1]);
				let ul = document.createElement("ul");
				mobileNavMenu.appendChild(ul);

				// Adding class mobile to first element in ul in third level of mobile menu to differentiate between desktop item and mobile item
				lvl3Nav[0].children[0].classList.add("mobile-item");

				let navLen = lvl3Nav.length;
				for (let i = 0; i < navLen; i++) {
					lvl3Nav[i].classList.add("mobile-navigation-menu__menu-item");
				}
				for (let i = 0; i < navLen; i++) {
					mobileNavMenu.children[1].appendChild(lvl3Nav[0]);
				}
			};
		};

		// Hiding mobile navigation
		/*
		// TODO: in html it is solved with href (navigation.html line 137) for now
		closeIcon.addEventListener("click", () => {
			if (visibility === true) {
				mobileMenu[0].classList.add("hideMenu");
				mobileMenu[0].classList.remove("showMenu");
			}
		});
		*/
	};

	const searchInput = (module) => {
		// Show and hide search input in navigation
		let searchIcon = module.getElementsByClassName("search")[0];
		searchIcon.addEventListener("click", (event) => {
			event.preventDefault();
			let navComponent = module.getElementsByClassName("sm-device-nav")[0].children[0];
			if ([].slice.apply(navComponent.classList).includes("hide")) {
				navComponent.classList.add("show");
				navComponent.classList.remove("hide");
			} else {
				navComponent.classList.add("hide");
				navComponent.classList.remove("show");
			}
		});
	};

	const sticky = (module) => {
		// Turn navigation into sticky after scroll
		let stickyPosition = window.scrollY + module.getBoundingClientRect().top + 1;
		window.onscroll = function () {
			if (window.pageYOffset >= stickyPosition) {
				module.classList.add("sticky");
			} else {
				module.classList.remove("sticky");
			}
		};
	};

	const displayLvl3 = (module) => {
		// Function for multilevel navigation
		let prevHoverLvl2 = "";
		let navLvl2All = module.querySelectorAll(".nav-lvl2 ul li a");
		let navLvl3All = module.querySelectorAll(".nav-lvl3 ul li a");

		navLvl2All.forEach((navLvl2) => {
			navLvl2.addEventListener("mouseenter", (event) => {
				navLvl2.classList.add("active");
				let dataSource = navLvl2.dataset.source;
				let navLvl3Ul = module.querySelector('.nav-lvl3 ul[data-target="' + dataSource + '"]');
				if (navLvl3Ul !== null) {
					navLvl3Ul.classList.add("visible");
				} else {
					module.querySelectorAll(".nav-lvl3 ul").forEach((element) => {
						element.classList.remove("visible");
					});
				}

				if (prevHoverLvl2 !== "" && prevHoverLvl2 !== event.target) {
					let navLvl3UlNot = module.querySelector('.nav-lvl3 ul:not([data-target="' + dataSource + '"])');
					if (navLvl3UlNot !== null) {
						navLvl3UlNot.classList.remove("visible");
					}
					prevHoverLvl2.classList.remove("active");
				}
			});

			navLvl2.addEventListener("mouseleave", (event) => {
				prevHoverLvl2 = event.target;
			});
		});

		navLvl3All.forEach((navLvl3) => {
			if (Array.from(navLvl3.classList).includes("mobile-item") === false) {
				return;
			} else {
				navLvl3.addEventListener("mouseenter", () => {
					let dataTarget = navLvl3.closest("ul").dataset.target;
					module.querySelector('.nav-lvl2 a[data-source="' + dataTarget + '"]').classList.add("selected");
				});
				navLvl3.addEventListener("mouseleave", () => {
					navLvl2All.forEach((element) => {
						element.classList.remove("selected");
					});
				});
			}
		});
	};

	return {
		init: (module) => init(module),
	};
};

export const modules = "nav";
export const loadModule = () => {
	let module = document.querySelector(modules);
	if (module) {
		navigation().init(module);
	}
};
