const path = require('path');
module.exports = {
    entry: path.join(__dirname, "src/index.js"),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            react: path.resolve(path.join(__dirname, './node_modules/react')),
        }
    },
    externals: {
        'react': 'commonjs react' 
    }
};