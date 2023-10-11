const path = require("path");
//Load webpack shell plugin for copying files to delivery servers
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
//Load mini css extraxt plugin to compile all scss files from javascript files to single css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
	//Mode of the webpack see https://webpack.js.org/configuration/mode/
	mode: "development",
	//Configure how modules are resolved, get webpack to know where to look for the files/plugins
	resolve: {
		//Order of resolved extensions, If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
		extensions: ["", ".js"],
		//Set alias with path to commonly used modules/plugins https://webpack.js.org/configuration/resolve/#resolvealias
		alias: {
			//'project': path.resolve(__dirname, './src/project'),
			//'utils': path.resolve(__dirname, './src/utils'),
			//'debug': path.resolve(__dirname, './src/debug'),
		},
	},
	watch: true,
	stats: {
		errorDetails: true,
	},
	//Array of plugins used during the build
	plugins: [
		//For copying files after certain event. See https://www.npmjs.com/package/webpack-shell-plugin-next

		new WebpackShellPluginNext({
			//Event, after which the script should start

			onBuildEnd: {
				//Script
				scripts: ["copy-to-devel.bat"],
				//Blocks webpack until scipt finishes exection
				blocking: false,
				//Execute scripts in parallel, otherwise execute scripts in the order in which they are specified in the scripts array.
				parallel: true,
			},
			onDoneWatch: {
				//Script
				scripts: ["copy-to-devel.bat"],
				//Blocks webpack until scipt finishes exection
				blocking: false,
				//Execute scripts in parallel, otherwise execute scripts in the order in which they are specified in the scripts array.
				parallel: true,
			},
		}),

		//Automatically load modules instead of having to import or require them everywhere. See https://webpack.js.org/plugins/provide-plugin/
		/*
        new webpack.ProvidePlugin({
            //For project,utils,debug, we are using alias we defined in resolve block, these files will be accessible under the "key" phrase ($, Project, Utils...)
            $: "jquery",
            //Project: 'project',
            //Utils: 'utils',
            //Debug: 'debug',
        }),
        */
		//For compiling all scss files from javascript files into single css file. See https://webpack.js.org/plugins/mini-css-extract-plugin
		new MiniCssExtractPlugin({
			//File name of the compiled css. [name] is the variable containing the name of scss file (first in this case - Is it possible to do multiple css files?)
			filename: "./css/[name].min.css",
		}),
	],
	//These options determine how the different types of modules within a project will be treated. See https://webpack.js.org/configuration/module/
	module: {
		//An array of Rules which are matched to requests when modules are created. These rules can modify how the module is created.
		rules: [
			{
				//Include all modules that pass test assertion
				test: /\.s[ac]ss$/i,
				//Exclude node modules
				exclude: /node_modules/,
				//Array of loaders. Loaders will be applied from right to left (last to first configured).
				use: [
					//Used for compiling all scss from javascript to single file (css is compiled into index.js file by default)
					MiniCssExtractPlugin.loader,
					//Css loader
					"css-loader",
					{
						//Run post css actions
						loader: "postcss-loader",
					},
					{
						//Compiles Sass to CSS
						loader: "sass-loader",
					},
					{
						//This loader will load your SASS resources
						//into every required SASS module. So you can
						//use your shared variables, mixins and functions
						//across all SASS styles without manually loading
						//them in each file.
						loader: "sass-resources-loader",
						options: {
							resources: "./src/GlobalStyles/imports.scss",
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "images/[hash][ext][query]",
				},
			},
		],
	},
	//Entry file, the main file
	entry: {
		index: "./src/index.js",
		//ccm: './src/Tracking/CCM/ccm.js',
		//tracking: './src/Tracking/CustomTracking/customTracking.js',
	},
	//Allow dev server webpack-dev-server dependency is required
	devServer: {
		//Path to folder
		static: "./Samples",
		//Hot module replacement
		hot: true,
	},
	optimization: {
		//Handle output files and filenames
		splitChunks: {
			cacheGroups: {
				//Put all dependency javascripts into separate file
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all",
					priority: 1,
				},
				//Put all scss across the whole project into separate file
				styles: {
					name: "styles",
					type: "css/mini-extract",
					chunks: "all",
					enforce: true,
				},
				//Test if module can be splitted
				module_text: {
					test: /[\\/]text.js[\\/]/,
					name: "module_text",
					chunks: "all",
					enforce: true,
				},
			},
		},
	},
	//The top-level output key contains a set of options instructing webpack on how and where it should output bundles, assets, and anything else you bundle or load with webpack. See https://webpack.js.org/configuration/output/
	output: {
		//[name] contains name of the src file
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
};
