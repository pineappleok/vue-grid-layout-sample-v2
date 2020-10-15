const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: './src/app.js',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vue: 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },		{
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
            }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: process.env.npm_package_description
        })
    ],
    optimization: {}
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.stats = {
            children: false,
            modules: false
        };
    } else {
        config.devServer = {
            stats: {
                children: false,
                modules: false
            }
        };
        config.devtool = 'cheap-module-eval-source-map';
    }
    return config;
};
