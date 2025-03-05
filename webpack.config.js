const path = require("path");
const HtmlWebpackPlugin  = require("html-webpack-plugin")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true, // empty output directory before re-bundling
    },
    plugins: [
        // add html to build. automatically adds script tag of output
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
        rules: [
            { // make css work
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            { // make strings in html src, href... attributes work
                test: /\.html$/i,
                loader: "html-loader",
            },
            { // load images
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            { // load fonts
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
};
