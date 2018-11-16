//
// Optimizes all images
// (takes only those that have no corresponding @2x)
//

const im = require('imagemagick');
const glob = require('glob');
const fs = require('fs');
const { exec } = require('child_process');

function args (inputPath, outputPath, width) {
  return [
    inputPath,
    '-filter', 'Triangle',
    '-define', 'filter:support=2',
    '-thumbnail', width,
    '-unsharp', '0.25x0.25+8+0.065',
    '-dither', 'None',
    '-posterize', 136,
    '-quality', 82,
    '-define', 'jpeg:fancy-upsampling=off',
    '-define', 'png:compression-filter=5',
    '-define', 'png:compression-level=9',
    '-define', 'png:compression-strategy=1',
    '-define', 'png:exclude-chunk=all',
    '-interlace', 'none',
    '-colorspace', 'sRGB',
    '-strip',
    outputPath
  ];
}

glob(`${__dirname}/../src/images/**/*@3x.*`, (er, files) => {
  files.forEach((file3x) => {
    const file2x = file3x.replace('@3x', '@2x');

    if (!fs.existsSync(file2x)) {
      // @2x
      im.convert(args(file3x, file2x, 750), () => {
        console.log(`${file3x} => ${file2x}`);
        exec(`open -a ImageOptim ${file2x}`);
      });

      // @3x
      im.convert(args(file3x, file3x, 1242), () => {
        console.log(`${file3x} => ${file3x}`);
        exec(`open -a ImageOptim ${file3x}`);
      });
    }
  });
});
