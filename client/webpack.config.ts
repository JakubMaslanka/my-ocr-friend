import path from "node:path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const webpackConfig = (environment): Configuration => ({
	entry: "./src/index.tsx",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		plugins: [new TsconfigPathsPlugin()]
	},
	output: {
		path: path.join(__dirname, "/build"),
		filename: "build.js"
	},
	...(environment.production || !environment.development
		? {
				performance: {
					hints: false,
					maxEntrypointSize: 512_000,
					maxAssetSize: 512_000
				}
		  }
		: {
				devtool: "eval-source-map"
		  }),
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				loader: "ts-loader",
				options: {
					transpileOnly: true
				},
				exclude: /build/
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, "src"),
				use: ["style-loader", "css-loader", "postcss-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		new webpack.DefinePlugin({
			"process.env.PRODUCTION": environment.production || !environment.development,
			"process.env.NAME": JSON.stringify(require("./package.json").name),
			"process.env.VERSION": JSON.stringify(require("./package.json").version)
		}),
		new ForkTsCheckerWebpackPlugin(),
		new ESLintPlugin({ files: "./src/**/*.{ts,tsx,js,jsx}" })
	]
});

export default webpackConfig;
