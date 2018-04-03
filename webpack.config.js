const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ElectronConnectWebpackPlugin = require('electron-connect-webpack-plugin');

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
					},
				},
				{
					test: /\.(scss|sass|css)$/,
					// this handles .scss translation
					use: [
						{ loader: 'style-loader' },
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
							name: 'imgs/[name].[ext]',
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
			new webpack.ExternalsPlugin('commonjs', [
				'electron',
			]),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				// For details on `!!` see https://webpack.github.io/docs/loaders.html#loader-order
				template: '!!handlebars-loader!app/renderer/index.hbs',
			}),
		],
	},
	{
		entry: './app/main/index.js',
		output: {
			path: path.resolve(__dirname, './dist/main'),
			filename: 'build.js',
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
						extractCSS: true,
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
