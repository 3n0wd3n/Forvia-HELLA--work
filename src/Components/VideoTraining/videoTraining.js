import "./videoTraining.scss";

const comVideoTraining = function () {
	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = Math.floor(timeInSeconds % 60);
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	const videoTrainingLogic = (module) => {
		let video = module.querySelector("video");
		let videoDurationSpan = module.querySelector(".videoDuration");
		video.addEventListener("loadedmetadata", () => {
			let durationInSeconds = video.duration;
			let formattedTime = formatTime(durationInSeconds);
			videoDurationSpan.innerHTML = formattedTime;
		});
	};

	const init = (module) => {
		videoTrainingLogic(module);
	};

	return {
		init: (module) => init(module),
	};
};

// Export module to be accessible from outside
export const modules = ".com-video-training";
export const loadModule = () => {
	let module = document.querySelector(modules);
	if (module) {
		comVideoTraining().init(module);
	}
};
