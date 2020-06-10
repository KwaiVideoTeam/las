const path = require('path');
const { version } = require('./package.json');
const importHelper = require('@babel/helper-module-imports');
module.exports = {
    mode: 'development',
    entry: './tools/index',
    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        path: path.resolve(__dirname, './demo'),
        filename: 'tools.js',
        library: 'LasTools',
        libraryTarget: 'umd',
        libraryExport: 'default'
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
                                        modules: 'umd',
                                        targets: {
                                            browsers: [
                                                'chrome >= 47',
                                                'firefox >= 51',
                                                'ie >= 11',
                                                'safari >= 8'
                                            ]
                                        }
                                    }
                                ]
                            ],
                            plugins: [
                                [
                                    '@babel/plugin-proposal-class-properties',
                                    {
                                        loose: true
                                    }
                                ],
                                '@babel/plugin-proposal-object-rest-spread',
                                {
                                    visitor: {
                                        CallExpression: function (espath) {
                                            if (espath.get('callee').matchesPattern('Number.isFinite')) {
                                                espath.node.callee = importHelper.addNamed(
                                                    espath,
                                                    'isFiniteNumber',
                                                    path.resolve('src/polyfills/number-isFinite')
                                                );
                                            }
                                            if (espath.get('callee').matchesPattern('Object.assign')) {
                                                espath.node.callee = importHelper.addNamed(
                                                    espath,
                                                    'ObjectAssign',
                                                    path.resolve('src/polyfills/object-assign')
                                                );
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        loader: 'string-replace-loader',
                        query: {
                            search: '__VERSION__',
                            replace: JSON.stringify(version)
                        }
                    }
                ]
            }
        ]
    }
};
