
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
    const config = {
        entry: [
            '@client/'
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: 'dist',
        },
        plugins: [
            new HTMLWebpackPlugin({
            template: path.resolve(__dirname,'views/index.html'),
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
                chunkFilename: "[id].css",
            })
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options : {
                                esModule: false
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                            sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                additionalData: [
                                    `@import "@scss/public";`,
                                ].join("\n")
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg)$/,
                    use: [
                        {
                            loader : 'url-loader',
                            options: {
                                name: '[name].[contenthash].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            alias : {
                "@client": path.resolve(__dirname, "views/"),
                "@scss": path.resolve(__dirname, "public/stylesheets/"),
                "@img": path.resolve(__dirname, "public/images/"),
                "@component": path.resolve(__dirname, "views/componenets/"),
                "@core": path.resolve(__dirname, "views/core/")
            },
            extensions: ['js','.js','.json']
        }
    }

    if (options.mode === 'development') {
        config.plugins = [...config.plugins, new webpack.HotModuleReplacementPlugin()];
        config.devtool = 'inline-source-map';
    }

    return config
}