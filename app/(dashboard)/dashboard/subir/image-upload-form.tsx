"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { compressAndResizeImage } from "@/lib/image-processing";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageUploadSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Por favor selecciona una imagen")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "La imagen no puede superar los 10MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "El archivo debe ser una imagen en formato JPEG, PNG o WebP"
    ),
});

type ImageUploadFormValues = z.infer<typeof imageUploadSchema>;

interface ImageUploadFormProps {
  onUploadComplete: (formData: FormData) => Promise<void>;
}

export function ImageUploadForm({ onUploadComplete }: ImageUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<ImageUploadFormValues>({
    resolver: zodResolver(imageUploadSchema),
  });

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("El archivo debe ser una imagen en formato JPEG, PNG o WebP");
      return;
    }

    // Create preview from original file
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Update form value with original file
    form.setValue("image", files);
    form.clearErrors("image");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleClearImage = () => {
    setPreviewUrl(null);
    form.reset();
  };

  const onSubmit = async (data: ImageUploadFormValues) => {
    try {
      setIsCompressing(true);

      const originalFile = data.image[0];

      console.log(
        `Iniciando compresión. Tamaño original: ${(
          originalFile.size / 1024
        ).toFixed(2)} KB`
      );

      // Compress and resize image
      // Aggressive compression: 800px max, 0.7 quality
      const compressedFile = await compressAndResizeImage(
        originalFile,
        800,
        0.7
      );

      console.log(
        `Compresión finalizada. Nuevo tamaño: ${(
          compressedFile.size / 1024
        ).toFixed(2)} KB`
      );

      if (compressedFile.size > 1024 * 1024) {
        toast.error(
          "La imagen optimizada sigue siendo demasiado grande (>1MB). Intenta con una imagen más simple."
        );
        setIsCompressing(false);
        return;
      }

      console.log(
        `Imagen optimizada: ${(compressedFile.size / 1024).toFixed(0)} KB`
      );

      setIsUploading(true);

      const formData = new FormData();
      formData.append("image", compressedFile);

      await onUploadComplete(formData);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Hubo un error al procesar o subir la imagen.");
    } finally {
      setIsCompressing(false);
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Imagen de tu vidriera</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!previewUrl ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`
                        border-2 border-dashed rounded-lg p-8
                        flex flex-col items-center justify-center
                        transition-colors cursor-pointer
                        ${
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50"
                        }
                      `}
                      onClick={() =>
                        document.getElementById("file-input")?.click()
                      }
                    >
                      <IconPhoto
                        size={48}
                        className="text-muted-foreground mb-4"
                      />
                      <p className="text-center text-sm font-medium mb-2">
                        Arrastra tu imagen aquí o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-muted-foreground text-center">
                        Formatos aceptados: JPEG, PNG, WebP (máximo 10MB)
                      </p>
                    </div>
                  ) : (
                    <div className="relative border rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Vista previa"
                        className="w-full h-auto max-h-96 object-contain"
                      />
                    </div>
                  )}

                  <Input
                    id="file-input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    {...field}
                    // Override onChange from field to prevent double setting and race conditions
                    // handleFileChange will take care of setting the form value after compression
                    onChange={(e) => {
                      handleFileChange(e.target.files);
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Toma una foto clara de tu escaparate. Nuestro sistema analizará
                la composición, iluminación y presentación de productos.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {previewUrl && (
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClearImage}
              disabled={isUploading}
              className="shrink-0"
            >
              <IconX size={20} className="mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isUploading || isCompressing}
              className="flex-1"
            >
              {isUploading || isCompressing ? (
                <Spinner className="mr-2" />
              ) : (
                <IconUpload className="mr-2" size={20} />
              )}
              {isCompressing ? "Procesando..." : "Subir imagen"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
