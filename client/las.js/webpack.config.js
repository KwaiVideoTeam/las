const path = require('path');
const { version } = require('./package.json');
const webpack = require('webpack');
const merge = require('webpack-merge');

const buildConstants = {
    __VERSION__: JSON.stringify(version)
};
const plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(buildConstants),
    new webpack.BannerPlugin({ entryOnly: true, raw: true, banner: 'typeof window !== "undefined" &&' }) // SSR
];

const base = {
    mode: 'development',
    entry: './src/index',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: [path.resolve(__dirname, './node_modules')],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                '@babel/preset-typescript',
                                [
                                    '@babel/preset-env',
                                    {
                                        loose: true,
                                        modules: false,
                                        targets: {
                                            browsers: ['chrome >= 42', 'firefox >= 42', 'ie >= 11', 'safari >= 10.1']
                                        }
                                    }
                                ]
                            ],
                            plugins: [
                                '@babel/plugin-transform-object-assign',
                                [
                                    '@babel/plugin-proposal-class-properties',
                                    {
                                        loose: true
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    }
};

const multiConfig = [
    {
        name: 'debug',
        mode: 'development',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index.js',
            library: 'Las',
            libraryTarget: 'umd',
            libraryExport: 'default',
            globalObject: 'this' // https://github.com/webpack/webpack/issues/6642
        },
        plugins,
        devtool: 'source-map'
    },
    {
        name: 'dist',
        mode: 'production',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index.min.js',
            library: 'Las',
            libraryTarget: 'umd',
            libraryExport: 'default',
            globalObject: 'this'
        },
        plugins,
        devtool: 'source-map'
    }
].map(config => merge(base, config));

module.exports = env => {
    let configs;
    if (!env) {
        configs = multiConfig;
    } else {
        const enabledConfigName = Object.keys(env).find(envName => env[envName]);
        const enabledConfig = multiConfig.find(config => config.name === enabledConfigName);
        if (!enabledConfig) {
            throw new Error(
                `Couldn't find a valid config with the name "${enabledConfigName}". Known configs are: ${multiConfig
                    .map(config => config.name)
                    .join(', ')}`
            );
        }
        configs = [enabledConfig];
    }

    console.log(`Building configs: ${configs.map(config => config.name).join(', ')}.\n`);
    return configs;
};
