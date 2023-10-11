import "./navigation.scss";

const navigation = function () {
	const init = (module) => {
		sticky(module);
		desktopSubmenus(module);
		searchInput(module);
		mobileMenu(module);
		languageSelection(module);
	};

	const languageSelection = (module) => {
		let languageBtns = module.querySelectorAll(".language");
		languageBtns.forEach((languageBtn) => {
			languageBtn.addEventListener("click", (event) => {
				event.preventDefault();
				let languageVariantMenu = module.querySelector(".language-variant");
				if (languageVariantMenu.classList.contains("hide")) {
					languageVariantMenu.classList.remove("hide");

					// Get the height of the .navigation-menu element
					let navigationMenuHeight = module.offsetHeight;

					// Calculate the height for .content
					languageVariantMenu.style.height = "calc(100vh - " + navigationMenuHeight + "px)";

					// Set overflow of the page to hidden
					document.body.style.overflow = "hidden";
				} else {
					document.body.style.overflow = "scroll";

					// Set overflow of the page to scroll
					languageVariantMenu.classList.add("hide");
				}
			});
		});
	};

	const mobileMenu = (module) => {
		// Function for navigation in mobile menu

		// SELECTORS
		// There must be document because it is out of scope -> TOLD Vojta why
		let mobileMenu = module.getElementsByClassName("mobile-navigation-menu");
		let hamburgerIcon = module.getElementsByClassName("hamburger")[0];

		hamburgerIcon.addEventListener("click", (event) => {
			event.preventDefault();
			// Showing mobile navigation
			if (Array.from(mobileMenu[0].classList).includes("hideMenu")) {
				mobileMenu[0].classList.add("showMenu");
				mobileMenu[0].classList.remove("hideMenu");
			}

			// Hide scroll bar for whole page in mobile menu
			document.body.style.overflow = "hidden";

			showNavigationContent(module);
		});

		const showNavigationContent = (module) => {
			showArrowForLinks(module);
			showFirstLvlNav(module);
		};

		const showArrowForLinks = (module) => {
			let chevronsRight = module.querySelectorAll(".icon-chevronRight");
			chevronsRight.forEach((chevronRight) => {
				chevronRight.classList.add("show");
			});
		};

		// Global variables
		let mobileMenuGroup = module.querySelector(".mobile-navigation-menu__bottom-submenu-container");
		let mobileMenuSelected = module.querySelector(".mobile-navigation-menu__items");
		let mobileMenuHeader = module.querySelector(".mobile-header-icons");
		let desktopNavigation = module.querySelector(".desktop-navigation__menu-items");

		const showFirstLvlNav = (module) => {
			desktopNavigation.classList.remove("hide");

			for (let i = 0; i < desktopNavigation.children.length; i++) {
				let menuItem = desktopNavigation.children[i].children[0];

				// Hide unnecessary submenus
				if (desktopNavigation.children[i].children[1]) {
					desktopNavigation.children[i].children[1].classList.add("hide");
				}

				// Add styleing class for menu item
				menuItem.classList.add("mobile-navigation-menu__menu-item");

				// Add prevent default on "a" tag
				menuItem.addEventListener("click", (event) => {
					event.preventDefault();
				});

				// Navigate to link only if click on text in menu item
				menuItem.children[0].addEventListener("click", () => {
					let hrefNavigation = menuItem.href;
					window.location.href = hrefNavigation;
				});
			}
			mobileMenuSelected.appendChild(desktopNavigation);
			checkSubMenuClick(module);
			backToMainMenu(module);
		};

		const showSecondLvlNav = (module, whereToGo, textFromMenuItem) => {
			console.log("Creating Level 2 Navigation");

			// Hide menu group in the bottom of submenu
			mobileMenuGroup.classList.add("hide");

			// Change title of mobile menu header
			mobileMenuHeader.children[0].classList.remove("hide");
			mobileMenuHeader.children[1].classList.add("hide");
			mobileMenuHeader.children[2].classList.remove("hide");

			// Make visible headline for submenu lvl2
			let headlineLvl2 = module.querySelector(".mobile-navigation-menu__menu-headline");
			headlineLvl2.classList.remove("hide");
			headlineLvl2.innerText = textFromMenuItem;

			// Check if submenu already exist
			if (checkIfSubNavExist(module, textFromMenuItem.toUpperCase().replace(/\s/g, ""))) {
				// Hide all previous menu items
				desktopNavigation.classList.add("hide");

				// module.querySelector(".lvl2").classList.remove("hide");
				module
					.querySelector("." + CSS.escape(textFromMenuItem.toUpperCase().replace(/\s/g, "")))
					.classList.remove("hide");
				return;
			}

			// Select new menu items
			let lvl2MenuItemsContainer = module.querySelectorAll("[id=" + CSS.escape(whereToGo) + "]");

			// Hide previous menu items
			desktopNavigation.classList.add("hide");

			// Show new menu items
			let lvl2MenuItems = lvl2MenuItemsContainer[0].children[0];

			// Add class to new ul tag
			lvl2MenuItems.classList.add("lvl2", textFromMenuItem.toUpperCase().replace(/\s/g, ""));

			for (let i = 0; i < lvl2MenuItems.children.length; i++) {
				// Add menu-item class
				lvl2MenuItems.children[i].children[0].classList.add(
					"mobile-navigation-menu__menu-item",
					"submenu-item"
				);

				// Add prevent default on "a" tag
				lvl2MenuItems.children[i].children[0].addEventListener("click", (event) => {
					event.preventDefault();
				});

				// Navigate to link only if click on text in menu item
				lvl2MenuItems.children[i].children[0].children[0].addEventListener("click", () => {
					let hrefNavigation = lvl2MenuItems.children[i].children[0].href;
					window.location.href = hrefNavigation;
				});
			}

			// Adding elements to mobile submenu
			mobileMenuSelected.appendChild(lvl2MenuItems);

			// backToMainMenu(module);
		};

		const showThirdLvlNav = (module, whereToGo, textFromMenuItem) => {
			console.log("Creating Level 3 Navigation", whereToGo);

			// Creating headline for submenu lvl2
			let headlineLvl3 = module.querySelector(".mobile-navigation-menu__menu-headline");
			headlineLvl3.classList.remove("hide");
			headlineLvl3.innerText = textFromMenuItem;

			// Check if submenu already exist
			if (checkIfSubNavExist(module, textFromMenuItem.toUpperCase().replace(/\s/g, ""))) {
				// Hide all previous menu items
				let allPreviousLvl2 = module.querySelectorAll(".lvl2");
				allPreviousLvl2.forEach((lvl2) => {
					lvl2.classList.add("hide");
				});

				module
					.querySelector("." + CSS.escape(textFromMenuItem.toUpperCase().replace(/\s/g, "")))
					.classList.remove("hide");
				return;
			}

			// Select new menu items
			let lvl2MenuItemsContainer = module.querySelectorAll("[id=" + CSS.escape(whereToGo) + "]");

			// Hide previous menu items)
			module.querySelector(".lvl2").classList.add("hide");

			// Show new menu items
			let lvl3MenuItems = lvl2MenuItemsContainer[0].children[0];

			// Add class to new ul tag
			lvl3MenuItems.classList.add("lvl3", textFromMenuItem.toUpperCase().replace(/\s/g, ""));

			for (let i = 0; i < lvl3MenuItems.children.length; i++) {
				// Add menu-item classes
				lvl3MenuItems.children[i].children[0].classList.add(
					"mobile-navigation-menu__menu-item",
					"submenu-item"
				);

				// Add prevent default on "a" tag
				lvl3MenuItems.children[i].children[0].addEventListener("click", (event) => {
					event.preventDefault();
				});

				// Navigate to link only if click on text in menu item
				lvl3MenuItems.children[i].children[0].children[0].addEventListener("click", () => {
					let hrefNavigation = lvl3MenuItems.children[i].children[0].href;
					window.location.href = hrefNavigation;
				});
			}

			// Adding elements to submenu
			mobileMenuSelected.appendChild(lvl3MenuItems);
		};

		const checkIfSubNavExist = (module, subnav) => {
			for (let i = 0; i < mobileMenuSelected.children.length; i++) {
				if ([].slice.apply(mobileMenuSelected.children[i].classList).includes(subnav)) {
					return true;
				} else {
					false;
				}
			}
		};

		const checkSubMenuClick = (module) => {
			let iconToSubmenu = module.querySelectorAll(".icon-chevronRight");
			let textFromMenuItem;
			iconToSubmenu.forEach((icon) => {
				icon.addEventListener("click", () => {
					// This variable stores value from clicked item form menu and pushes this down to submenu as headline
					textFromMenuItem = icon.parentNode.innerText;
					navigateToSubmenu(module, icon.id.slice(3), textFromMenuItem);
				});
			});
		};

		const navigateToSubmenu = (module, whereToGo, textFromMenuItem) => {
			if (whereToGo.length == 3) {
				console.log("Go To Submenu Level 2");
				showSecondLvlNav(module, whereToGo, textFromMenuItem);
			} else {
				console.log("Go To Submenu Level 3");
				showThirdLvlNav(module, whereToGo, textFromMenuItem);
			}
		};

		const backToMainMenu = (module) => {
			mobileMenuHeader.children[0].addEventListener("click", () => {
				let lvl2MobileNavs = module.querySelectorAll(".lvl2");
				let lvl3MobileNavs = module.querySelectorAll(".lvl3");

				lvl2MobileNavs.forEach((lvl2MobileNav) => {
					lvl2MobileNav.classList.add("hide");
				});

				lvl3MobileNavs.forEach((lvl3MobileNav) => {
					lvl3MobileNav.classList.add("hide");
				});

				// Hide menu group in the bottom of submenu
				mobileMenuGroup.classList.remove("hide");

				// Change title of mobile menu header
				mobileMenuHeader.children[0].classList.add("hide");
				mobileMenuHeader.children[1].classList.remove("hide");
				mobileMenuHeader.children[2].classList.add("hide");

				// Hide headline from submenus
				module.querySelector(".mobile-navigation-menu__menu-headline").classList.add("hide");

				showFirstLvlNav(module);
			});
		};
	};

	const searchInput = (module) => {
		// Show and hide search input in navigation

		// Selecting all stuff from mobile navigation
		let searchIcon = module.querySelector(".sm-device-nav .search");
		let form = module.querySelector(".sm-device-nav .com-form");
		let languageIcon = module.querySelector(".sm-device-nav .language");
		let hamburger = module.querySelector(".sm-device-nav .hamburger");
		let closeBtn = module.querySelector(".sm-device-nav .close-btn");
		let menuImg = module.querySelector(".navigation-menu__logo-container");

		// Selecting stuff for form maniplation
		let formWrapper = module.querySelector(".navigation-menu .desktop-navigation .com-form");
		let formInput = module.querySelector(".navigation-menu .desktop-navigation .com-form .search-group");
		let formIcon = module.querySelector(
			".navigation-menu .desktop-navigation .com-form .search-group-container > .icon-container"
		);

		// Adding variables for multiple class adding
		let removeFromClasses;
		let addToClasses;

		searchIcon.addEventListener("click", (event) => {
			event.preventDefault();
			if (form.classList.contains("hide")) {
				// Remove class from elements
				removeFromClasses = [form, closeBtn];
				removeFromClasses.forEach(function (el) {
					el.classList.remove("hide");
				});

				// Add class to elements
				addToClasses = [languageIcon, hamburger, searchIcon];
				addToClasses.forEach(function (el) {
					el.classList.add("hide");
				});

				// Form classes ading
				formWrapper.classList.add("com-form--open");
				formInput.classList.add("search-group--open");
				formIcon.classList.add("icon-container--open");

				if (document.documentElement.clientWidth <= 465) {
					menuImg.classList.add("hide");
				}
			}
		});
		closeBtn.addEventListener("click", (event) => {
			event.preventDefault();
			if (!closeBtn.classList.contains("hide")) {
				// Remove class from elements
				removeFromClasses = [languageIcon, hamburger, searchIcon];
				removeFromClasses.forEach(function (el) {
					el.classList.remove("hide");
				});

				// Add class to elements
				addToClasses = [form, closeBtn];
				addToClasses.forEach(function (el) {
					el.classList.add("hide");
				});

				// Form classes removeing
				formWrapper.classList.remove("com-form--open");
				formInput.classList.remove("search-group--open");
				formIcon.classList.remove("icon-container--open");

				if (document.documentElement.clientWidth <= 465) {
					menuImg.classList.remove("hide");
				}
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

	const desktopSubmenus = (module) => {
		// Function for multilevel navigation

		//  Set variables
		let prevHoverLvl2 = "";
		let navLvl2All = module.querySelectorAll(".nav-lvl2 ul li a");
		let navLvl3All = module.querySelectorAll(".nav-lvl3 ul li a");

		// Looping over nav lvl 2 navigation items
		navLvl2All.forEach((navLvl2) => {
			navLvl2.addEventListener("mouseenter", (event) => {
				navLvl2.classList.add("active");
				let dataSource = navLvl2.dataset.source;
				let navLvl3Ul = module.querySelector('.nav-lvl3 ul[data-target="' + dataSource + '"]');
				
				// Check if navigation lvl 3 is empty or not
				if (navLvl3Ul !== null) {
					navLvl3Ul.parentNode.classList.remove("hide");
					navLvl3Ul.classList.add("visible");
				} else {
					module.querySelectorAll(".nav-lvl3 ul").forEach((element) => {
						element.classList.remove("visible");
						element.parentNode.classList.add("hide")
					});
				}

				// Remove previous subnavigations lvl 3
				if (prevHoverLvl2 !== "" && prevHoverLvl2 !== event.target) {
					let navLvl3UlNot = module.querySelectorAll('.nav-lvl3 ul:not([data-target="' + dataSource + '"])');
					navLvl3UlNot.forEach((element) => {
						if (element !== null) {
							element.parentNode.classList.add("hide");
							element.classList.remove("visible");
						}
					});
					// Change active item in subnav lvl 2
					prevHoverLvl2.classList.remove("active");
				}
			});

			navLvl2.addEventListener("mouseleave", (event) => {
				prevHoverLvl2 = event.target;
			});
		});

		navLvl3All.forEach((navLvl3) => {
			// Check if we are in mobile device or not by checking presence of particular class
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
