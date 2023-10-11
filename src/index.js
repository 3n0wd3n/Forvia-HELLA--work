const cache = {};
import "url-search-params-polyfill";
import "./GlobalStyles/styles.scss";
importAll(require.context("./Components/", true, /^\.\/.*.*$/));
importAll(require.context("./SystemModules/", true, /^\.\/.*.*$/));
importAll(require.context("./ContentModules/", true, /^\.\/.*.*$/));
//importAll(require.context("./FormModules/", true, /^\.\/.*.*$/));

function importAll(r) {
	r.keys().forEach((key) => {
		cache[key] = r(key);
		if (typeof r(key).modules !== "undefined") {
			if (r(key).modules.length) {
				if (typeof r(key).loadModule !== "undefined") {
					r(key).loadModule();
				}
			}
		}
	});
}
