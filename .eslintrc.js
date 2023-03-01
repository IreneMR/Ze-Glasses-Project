module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:prettier/recommended'],
    ignorePatterns: [
        '**/*.min.js',
        'web/modules/custom/tck_ckeditor5_plugins/**/*.js',
    ],
    rules: {
        'no-console': 'error',
        'no-debugger': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'space-before-function-paren': 0,
        'comma-dangle': 0,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/preset-env'],
        },
    },
};