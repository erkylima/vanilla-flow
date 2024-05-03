const rspack = require("@rspack/core");
/**
 * @type {import('@rspack/cli').Configuration}
 */

module.exports = {
	context: __dirname,
	entry: {
	  main: './src/main.tsx',
	},
	mode:'development',
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx",".css"]
	},
	optimization: {
		minimize: true 
	},
	module: {
	  rules: [
				{
					test: /\.less$/,
					use: [
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'less-loader',
					},
					],
					type: 'css',
				},				
				{
					test: /\.svg$/,
					type: "asset/resource"
				},
				{
					test: /\.tsx$/,
					use: [
						{
							loader: 'builtin:swc-loader',
							/**
							 * @type {import('@rspack/core').SwcLoaderOptions}
							 */
							options: {
								jsc: {
									parser:{
										syntax: 'typescript'
									}
								}
							}
						}
					]
				},
				{
					test: /\.jsx$/,
					loader: 'builtin:swc-loader',
					options: {
					  jsc: {
						parser: {
							syntax: 'ecmascript',
							jsx: true,

						},
					  },
					},
					type: 'javascript/auto',
				}
			
	  	],
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: "./public/index.html"
		})
	]
  };
  