const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = env => ({
    entry: './src/index.js',
    output: {
        filename: 'main.[contenthash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            // {
            //     test: /\.html$/i,
            //     loader: 'html-loader'
            // },
            {
                test: /\.pug$/,
                use: [{
                    loader: 'html-loader'
                }, {
                    loader: 'pug-html-loader',
                    options: {
                        exports: false
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.scss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env'
                                    ]
                                ]
                            }
                        }
                    },
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.pug'
        }),
        new HtmlWebpackPugPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css'
        })
    ],

    devServer: {
        historyApiFallback: true,
        hot: true
    }
});
