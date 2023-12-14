import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

const __dirname = path.resolve();
const distDir = path.resolve(__dirname, 'dist');
const publicDir = path.resolve(__dirname, 'public');

export default {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: distDir,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: publicDir, to: distDir }
      ]
    })
  ]
};