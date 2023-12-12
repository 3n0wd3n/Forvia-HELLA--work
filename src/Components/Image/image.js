import "./image.scss";
const comImage = function () {
	const init = (module) => {
		zoom(module);
	};

	const zoom = (module) => {
		// Zoom effect
		let zoomBtns = module.querySelectorAll(".image-zoom");
		zoomBtns.forEach((zoomBtn) => {
			zoomBtn.addEventListener("click", () => {
				module.children[0].classList.add("zoomed");
				zoomBtn.nextElementSibling.classList.remove("hide");
				zoomBtn.classList.add("hide");
				module.querySelector("img").classList.remove("with-caption");

				if (document.querySelector(".overlay-image") === null) {
					overlay();
				}

				document.querySelector(".overlay-image").style.display = "block";
				zoomOut(module);
			});
		});
	};

	const zoomOut = (module) => {
		let zoomOutBtn = module.querySelector(".image-close-icon");

		zoomOutBtn.addEventListener("click", () => {
			module.children[0].classList.remove("zoomed");
			zoomOutBtn.classList.add("hide");
			document.querySelector(".overlay-image").style.display = "none";
			zoomOutBtn.previousElementSibling.classList.remove("hide");
			if (module.querySelector("img").classList.contains("no-caption")) {
				return;
			}
			module.querySelector("img").classList.add("with-caption");
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && module.classList.contains("zoomed")) {
				module.classList.remove("zoomed");
				zoomOutBtn.classList.add("hide");
				document.querySelector(".overlay-image").style.display = "none";
				zoomOutBtn.previousElementSibling.classList.remove("hide");
				if (module.querySelector("img").classList.contains("no-caption")) {
					return;
				}
				module.querySelector("img").classList.add("with-caption");
			}
		});
	};

	const overlay = () => {
		const el = document.createElement("div");
		el.classList.add("overlay-image");
		document.body.appendChild(el);
	};

	return {
		init: (module) => init(module),
		zoom: (module) => zoom(module),
		zoomOut: (module) => zoomOut(module),
	};
};

// Export module to be accessible from outside
export const modules = ".com-image";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		comImage().init(module);
	});
};
