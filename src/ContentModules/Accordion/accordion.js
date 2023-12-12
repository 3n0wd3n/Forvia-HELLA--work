import "./accordion.scss";
const modAccordion = function () {
	const init = (module) => {
		// Set event listeners for arrow icons UP
		let arrowsIconDown = module.querySelectorAll(".icon-chevronDown");
		arrowsIconDown.forEach((arrowIconDown) => {
			let grandparentNode = arrowIconDown.parentNode.parentNode;
			let parentNode = arrowIconDown.parentNode;
			arrowIconDown.addEventListener("click", () => {
				clearChoosens();
				showContentRoundedAccordion(module, grandparentNode, parentNode, arrowIconDown);
				closeContentOfOthersRoundedAccordions();
			});
		});

		// Clear class "choosen" in elemnt's class list
		const clearChoosens = () => {
			arrowsIconUp.forEach((arrowIconUp) => {
				let grandparentNode = arrowIconUp.parentNode.parentNode;
				grandparentNode.classList.remove("choosen");
			});
		};

		// It goes through all the elements and closes all the ones with function "hideContentRoundedAccordion"  that don't have the "chosen" class in the classList
		const closeContentOfOthersRoundedAccordions = () => {
			arrowsIconUp.forEach((arrowIconUp) => {
				let grandparentNode = arrowIconUp.parentNode.parentNode;
				let parentNode = arrowIconUp.parentNode;
				if (!grandparentNode.classList.contains("choosen")) {
					hideContentRoundedAccordion(module, arrowIconUp, grandparentNode, parentNode);
				}
			});
		};

		// Opens particular accordion
		const showContentRoundedAccordion = (module, grandparentNode, parentNode, arrowIconDown) => {
			arrowIconDown.classList.add("hide");
			parentNode.children[2].classList.remove("hide");
			grandparentNode.children[1].classList.remove("hide");
			grandparentNode.classList.add("choosen");
			parentNode.classList.add("accordion-element__header--open");
		};

		// Set event listeners for arrow icons DOWN
		let arrowsIconUp = module.querySelectorAll(".icon-chevronUp");
		arrowsIconUp.forEach((arrowIconUp) => {
			let grandparentNode = arrowIconUp.parentNode.parentNode;
			let parentNode = arrowIconUp.parentNode;
			arrowIconUp.addEventListener("click", () => {
				hideContentRoundedAccordion(module, arrowIconUp, grandparentNode, parentNode);
			});
		});

		// Closess particular accordion
		const hideContentRoundedAccordion = (module, arrowIconUp, grandparentNode, parentNode) => {
			arrowIconUp.classList.add("hide");
			parentNode.children[1].classList.remove("hide");
			parentNode.classList.remove("accordion-element__header--open");
			grandparentNode.children[1].classList.add("hide");
		};
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".mod-accordion";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		modAccordion().init(module);
	});
};
