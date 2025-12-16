/**
 * Compresses and resizes an image file to a maximum dimension and specific format.
 *
 * @param file - The original image file.
 * @param maxWidth - The maximum width in pixels (default: 1000).
 * @param quality - The image quality from 0 to 1 (default: 0.8).
 * @returns A Promise that resolves to the processed File object.
 */
export async function compressAndResizeImage(
  file: File,
  maxWidth = 1000,
  quality = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions maintaining aspect ratio
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        // If height is still too large (optional, usually width constraint is enough but good to be safe)
        // Let's stick to the user request of "1000px max" which usually implies the largest dimension
        // But strictly user said "1000px max", often applying to width.
        // Let's ensure the largest dimension is 1000px just to be safe if it's a portrait image.
        const maxDimension = maxWidth;
        if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Could not compress image"));
              return;
            }

            // Create a new File object
            const newFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, "") + ".webp",
              {
                type: "image/webp",
                lastModified: Date.now(),
              }
            );
            resolve(newFile);
          },
          "image/webp",
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
