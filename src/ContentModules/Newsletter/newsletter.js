import "./newsletter.scss";
const modNewsletter = function () {
	const init = (module) => {
		runNewsletter(module);
	};

	const runNewsletter = (module) => {
		let openModalBtn = module.querySelector(".openModal");
		let closeModalBtn = module.querySelector(".closeModal");
		openModalBtn.addEventListener("click", (event) => {
			// Here will be also logic for sending mail to customer
			event.preventDefault(module);
			openModal(module);
		});
		closeModalBtn.addEventListener("click", (event) => {
			// Here will be also logic for sending mail to customer
			event.preventDefault(module);
			closeModal(module);
		});
	};

	const openModal = (module) => {
		// Logic for opening confirmation modal
		module.querySelector("#overlay").classList.remove("hide");
	};

	const closeModal = (module) => {
		// Logic for closing confirmation modal
		module.querySelector("#overlay").classList.add("hide");
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".mod-newsletter";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		modNewsletter().init(module);
	});
};
