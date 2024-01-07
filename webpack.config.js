const path = require("path");

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, "src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    /*plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/template.html"),
            inject: "body",
            favicon: "./src/img/favicon.ico"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],

                    }
                }
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "./build")
        },
        devtool: 'source-map',
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },*/
}
