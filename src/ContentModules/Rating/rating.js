import "./rating.scss";
const modRating = function () {
	const init = (module) => {
		startRating(module);
	};

	const startRating = (module) => {
		let order;
		let ratingStars = module.querySelectorAll(".rating__container");
		// Add event listner to each star
		ratingStars.forEach((star) => {
			star.addEventListener("click", () => {
				// Get the number of star
				order = star.children[1].innerText;
				// Function that sets rating
				rate(order, ratingStars);
			});
		});
	};
	const rate = (order, ratingStars) => {
		for (let i = 0; i < ratingStars.length; i++) {
			// Set variable that stores class list of star
			let starClassList = ratingStars[i].children[0].classList;

			// Check if we are about to set right star
			if (i < order) {
				if (starClassList.contains("unrated")) {
					starClassList.remove("unrated");
				}
				starClassList.add("rated");
			} else {
				if (starClassList.contains("rated")) {
					starClassList.remove("rated");
				}
				starClassList.add("unrated");
			}
		}
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".mod-rating";
export const loadModule = () => {
	let modulesArray = document.querySelectorAll(modules);
	modulesArray.forEach((module) => {
		modRating().init(module);
	});
};
