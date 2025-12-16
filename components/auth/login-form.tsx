"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { IconLogin } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginUser } from "@/actions/auth/login-user";

const loginSchema = z.object({
  email: z.string().email("Por favor, ingresa un correo electrónico válido"),
  password: z.string().min(1, "Por favor, ingresa tu contraseña"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await loginUser(values.email, values.password);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      // Store token in localStorage for client-side API calls
      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      toast.success(
        "¡Qué bueno verte de nuevo! Sesión iniciada correctamente."
      );
      router.push("/dashboard");
    } catch {
      toast.error(
        "Ups, algo salió mal. Por favor, inténtalo de nuevo en unos momentos."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="ejemplo@tuempresa.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Tu contraseña segura"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Spinner className="mr-2" />
          ) : (
            <IconLogin className="mr-2" size={20} />
          )}
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
}
