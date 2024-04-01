import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const compress = async (filepath) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const files = await imagemin([`${filepath}`], {
    destination: path.join(__dirname, "/compressed/"),
    plugins: [
      imageminMozjpeg({
        quality: 35,
      }),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });
  return files[0];
};
