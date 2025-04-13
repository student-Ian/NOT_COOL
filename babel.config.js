module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './', // Or wherever your root is
                        '@config': './config',
                        '@components': './components',
                        '@screens': './screens',
                        '@assets': './assets',
                        // add more if needed
                    },
                },
            ],
        ],
    };
};
