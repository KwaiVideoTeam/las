// Karma configuration
// Generated on Fri Jun 16 2017 16:14:44 GMT+0800 (CST)
const merge = require('webpack-merge');
const conf = require('./webpack.config.js')({ debug: true })[0];
delete conf.entry;
delete conf.output;

const mergeConfig = merge(conf, {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                exclude: /(node_modules|test)\//,
                enforce: 'post',
                use: [
                    {
                        loader: 'istanbul-instrumenter-loader',
                        options: {
                            esModules: true
                        }
                    }
                ]
            }
        ]
    }
});

const unit = {
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: ['src/index.ts', 'test/index.js'],
    // list of files to exclude
    exclude: ['node_modules'],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/index.ts': ['webpack', 'sourcemap'],
        'test/index.js': ['webpack']
    },

    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage-istanbul'],
    // coverageReporter
    coverageIstanbulReporter: {
        reports: ['lcov', 'text-summary'],
        fixWebpackSourcePaths: true
    },

    webpack: mergeConfig,

    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
};

module.exports = function (config) {
    const conf = unit;
    if (config.functional) {
        conf.files = ['test/functional/*.js'];
        conf.preprocessors = {
            'test/functional/*.js': ['webpack']
        };
        conf.coverageIstanbulReporter = {
            reports: ['text-summary'],
            fixWebpackSourcePaths: true
        };
        conf.browsers = ['Chrome', 'Firefox'];
    }
    conf.logLevel = config.LOG_INFO;
    config.set(conf);
};
