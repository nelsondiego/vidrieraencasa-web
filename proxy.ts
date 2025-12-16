import { NextRequest, NextResponse } from "next/server";

// Rutas públicas que son accesibles para todos (logueados o no)
const PUBLIC_ROUTES = ["/", "/planes", "/pago/exito", "/pago/error"];

// Rutas de autenticación (solo accesibles si NO estás logueado)
const AUTH_ROUTES = ["/login", "/registro"];

/**
 * Dashboard proxy - Protege las rutas y maneja redirecciones
 * Reemplaza middleware para Next.js 16 según instrucciones del usuario
 * Valida sesión antes de permitir acceso a páginas
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 1. If it's a public route -> continue
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 2. Get the auth-token
  const authToken = request.cookies.get("session")?.value;
  // 3. If has token and is auth route -> redirect to dashboard
  if (authToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!authToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // // Obtener token de sesión
  // const cookieStore = await cookies();
  // const sessionToken = cookieStore.get("session")?.value;

  // // Verificar si la ruta es pública o de autenticación
  // const isPublicRoute = publicRoutes.some((route) => {
  //   if (route === "/") return pathname === "/";
  //   return pathname.startsWith(route);
  // });

  // const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // // 1. Si hay sesión y el usuario intenta ir a login/registro -> Redirigir a dashboard
  // if (sessionToken && isAuthRoute) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // // 2. Si NO hay sesión y la ruta NO es pública ni de auth -> Redirigir a login
  // if (!sessionToken && !isPublicRoute && !isAuthRoute) {
  //   const loginUrl = new URL("/login", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // Permitir request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|avif|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
