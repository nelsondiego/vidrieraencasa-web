"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconLogout } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logoutUser } from "@/actions/auth/logout-user";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const result = await logoutUser();

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      // Remove token from localStorage
      localStorage.removeItem("token");

      toast.success("Sesión cerrada exitosamente");
      router.push("/");
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast.error("Ocurrió un error inesperado. Por favor, intenta nuevamente");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="outline" className={className} disabled={isLoading}>
            {isLoading ? (
              <Spinner className="mr-2" />
            ) : (
              <IconLogout className="mr-2" size={20} />
            )}
            Cerrar sesión
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Ya te vas?</AlertDialogTitle>
          <AlertDialogDescription>
            Esperamos verte pronto. ¿Estás seguro de que quieres cerrar sesión?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={isLoading}>
            {isLoading ? <Spinner className="mr-2" /> : null}
            Sí, cerrar sesión
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
