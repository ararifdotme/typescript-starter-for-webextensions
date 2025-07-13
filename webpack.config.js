import fs from 'fs';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default function (env = {}) {
  const target = env?.target;
  if (!['chrome', 'firefox'].includes(target)) {
    throw new Error(
      `Unsupported target: ${target}. Supported targets are 'chrome' and 'firefox'.`
    );
  }

  return {
    entry: {
      'scripts/background': './src/scripts/background.ts',
      'scripts/content': './src/scripts/content.ts',
      'scripts/popup': './src/scripts/popup.ts',
      'scripts/options': './src/scripts/options.ts',
    },
    output: {
      path: path.resolve('dist', target),
      filename: '[name].js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    '@tailwindcss/postcss',
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ManifestMergePlugin(target),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/html', to: 'html' },
          { from: 'src/icons', to: 'icons' },
        ],
      }),
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
  };
}

class ManifestMergePlugin {

  constructor(target) {
    this.target = target;
  }

  apply(compiler) {
    const outputManifestFile = 'manifest.json';
    const baseManifestFile = './src/manifest.base.json';
    const targetManifestFile = this.target === 'chrome' ? './src/manifest.chrome.json' : './src/manifest.firefox.json';

    compiler.hooks.thisCompilation.tap('ManifestMergePlugin', async compilation => {

      const baseManifest = await this.readFile(baseManifestFile);
      const targetManifest = await this.readFile(targetManifestFile);

      const mergedManifest = { ...baseManifest, ...targetManifest };
      const mergedManifestJson = JSON.stringify(mergedManifest, null, 2);

      compilation.emitAsset(outputManifestFile, new compiler.webpack.sources.RawSource(mergedManifestJson));
    });

    compiler.hooks.thisCompilation.tap('ManifestMergePlugin', (compilation) => {
      compilation.fileDependencies.add(path.resolve(baseManifestFile));
      compilation.fileDependencies.add(path.resolve(targetManifestFile));
    });
  }

  readFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  }
}
