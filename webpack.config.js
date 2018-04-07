const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ElectronConnectWebpackPlugin = require('electron-connect-webpack-plugin');
const { dependencies, devDependencies } = require('./package.json');

module.exports = [
	{
		devtool: '#cheap-module-eval-source-map',
		entry: './app/renderer/main.js',
		output: {
			path: path.resolve(__dirname, './dist/renderer'),
			filename: 'build.js',
			libraryTarget: 'commonjs2',
		},
		module: {
			rules: [
				{
					test: /\.(js)$/,
					enforce: 'pre',
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						formatter: require('eslint-friendly-formatter'),
					},
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						loaders: {
							sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
							scss: 'vue-style-loader!css-loader!sass-loader',
						},
					},
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						presets: ['es2015'],
						plugins: ['transform-runtime'],
						cacheDirectory: true,
					},
				},
				{
					test: /\.(scss|sass|css)$/,
					// this handles .scss translation
					use: [
						{ loader: 'style-loader' },
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								minimize: true,
							},
						},
					],
				},
				{
					test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
					use: {
						loader: 'url-loader',
						query: {
							limit: 10000,
							name: 'img/[name].[ext]',
						},
					},
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					use: {
						loader: 'url-loader',
						query: {
							limit: 10000,
							name: 'fonts/[name].[ext]',
						},
					},
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].css',
			}),
			new webpack.ExternalsPlugin('commonjs', [
				'electron',
			]),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'app/renderer/index.html',
			}),
			new ElectronConnectWebpackPlugin({
				path: __dirname,
				logLevel: 0,
				reload: true,
			}),
			new webpack.ProvidePlugin({
				// jquery
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				semantic: 'semantic-ui-css',
				Semantic: 'semantic-ui-css',
				'semantic-ui': 'semantic-ui-css',
			}),
		],
		resolve: {
			extensions: ['.js', '.vue'],
			alias: {
				semantic: 'node_modules/semantic-ui-css/semantic.min.js',
			},
		},
		target: 'electron-renderer',
	},
	{
		entry: './app/main/index.js',
		output: {
			path: path.resolve(__dirname, './dist/main'),
			filename: 'build.js',
			libraryTarget: 'commonjs2',
		},
		externals: Object.keys({ ...dependencies, ...devDependencies } || {}),
		module: {
			rules: [
				{
					test: /\.(js)$/,
					enforce: 'pre',
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						formatter: require('eslint-friendly-formatter'),
					},
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					options: {
						presets: ['es2015'],
						plugins: ['transform-runtime'],
					},
				},
			],
		},
		plugins: [
			new webpack.ExternalsPlugin('commonjs', [
				'electron',
			]),
		],
		target: 'electron-main',
		node: {
			__dirname: false,
		},
	},
];
