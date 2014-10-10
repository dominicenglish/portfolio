module.exports = function(config) {
    config.set({
        basePath: '../',
        files: [
            'client/lib/bower/angular/angular.js',
            'client/lib/bower/angular-mocks/angular-mocks.js',
            'client/lib/bower/angular-messages/angular-messages.js',
            'client/lib/bower/angular-ui-router/release/angular-ui-router.js',
            'client/app.js',
            'client/modules/**/*.module.js',
            'client/modules/**/*.js',
            'test/unit/**/*.js'
        ],
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    })
};