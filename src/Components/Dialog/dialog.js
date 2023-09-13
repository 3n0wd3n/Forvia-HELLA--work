import "./dialog.scss";
const comDialog = function () {
	let dialogsOpen, dialogsClose, dialogElement;
	const init = (module) => {
		dialogsOpen = document.getElementsByClassName("com-dialog--open");

		for (let dialogOpen of dialogsOpen) {
			dialogOpen.addEventListener("click", (event) => {
				event.preventDefault;
				let dialogId = event.tartget || event.srcElement;
				// alert(dialogId.getAttribute("href"));
				dialogElement = document.getElementById(dialogId.getAttribute("href"));
				dialogElement.showModal();
			});
		}

		dialogsClose = document.getElementsByClassName("com-dialog--close");

		for (let dialogClose of dialogsClose) {
			dialogClose.addEventListener("click", (event) => {
				event.preventDefault;
				let dialogElementId = dialogClose.getAttribute("id").slice(11);
				dialogElement = document.getElementById(`dialog-${dialogElementId}`);
				dialogElement.close();
			});
		}
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".com-dialog";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		comDialog().init(module);
	});
};
