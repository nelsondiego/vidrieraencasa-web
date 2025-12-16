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

interface ImageUploadProps {
  onUploadComplete?: (imageId: string) => void;
  className?: string;
}

export function ImageUpload({
  onUploadComplete,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
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

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("La imagen no puede superar los 10MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Set form value
    form.setValue("image", files);
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
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Call upload action (to be implemented)
      // const result = await uploadImageAction(formData);

      // Simulated for now - replace with actual action call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("¡Imagen subida exitosamente!");

      if (onUploadComplete) {
        onUploadComplete("mock-image-id");
      }

      // Reset form
      handleClearImage();
    } catch {
      toast.error("No se pudo subir la imagen. Por favor, intenta nuevamente");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
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
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleClearImage}
                        >
                          <IconX size={16} className="mr-1" />
                          Eliminar
                        </Button>
                      </div>
                    )}

                    <Input
                      id="file-input"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        handleFileChange(e.target.files);
                        onChange(e.target.files);
                      }}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Toma una foto clara de tu escaparate. Nuestro sistema
                  analizará la composición, iluminación y presentación de
                  productos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {previewUrl && (
            <Button type="submit" disabled={isUploading} className="w-full">
              {isUploading ? (
                <Spinner className="mr-2" />
              ) : (
                <IconUpload className="mr-2" size={20} />
              )}
              Subir imagen
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
