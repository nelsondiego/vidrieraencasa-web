import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  IconSparkles,
  IconPhoto,
  IconFileDownload,
  IconCoins,
  IconCheck,
  IconArrowRight,
  IconCamera,
} from "@tabler/icons-react";

export default function LandingPage() {
  const features = [
    {
      icon: IconCamera,
      title: "1. Análisis de la vidriera",
      description:
        "Analizamos tu vidriera a partir de una foto y detectamos qué atrae y qué confunde al que pasa.",
    },
    {
      icon: IconSparkles,
      title: "2. Diagnóstico claro",
      description:
        "Te mostramos qué productos destacan, qué sobra y qué conviene reorganizar.",
    },
    {
      icon: IconFileDownload,
      title: "3. Reporte en PDF",
      description:
        "Recibís un PDF claro con recomendaciones prácticas para aplicar en el momento.",
    },
    {
      icon: IconCoins,
      title: "4. Planes simples",
      description:
        "Elegí cuántas veces querés analizar tu vidriera según tu ritmo de cambios.",
    },
  ];

  const plans = [
    {
      name: "Análisis único",
      price: "$6.000",
      credits: "1 crédito",
      description: "Ideal para probar el servicio.",
    },
    {
      name: "Pack 3 análisis",
      price: "$9.000",
      credits: "3 créditos",
      description: "Para comercios con cambios frecuentes.",
      popular: true,
    },
    {
      name: "Pack 10 análisis",
      price: "$15.000",
      credits: "10 créditos",
      description: "Para negocios con alta rotación de vidriera.",
    },
    {
      name: "Crédito adicional",
      price: "$3.000",
      credits: "1 crédito",
      description: "Sumá análisis extra a tu pack.",
    },
  ];

  const benefits = [
    "Lográ que tu vidriera se entienda en pocos segundos",
    "Sabé exactamente qué cambiar y por qué",
    "Probá mejoras sin gastar en consultoría",
    "Ahorrá tiempo y evitá prueba y error",
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="absolute top-0 w-full z-50">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="font-bold text-xl text-white tracking-tight drop-shadow-md">
            Vidriera en Casa
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="secondary">Ingresar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Vidriera de tienda moderna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm">
              <IconSparkles size={14} className="mr-1" />
              Análisis instantáneo para comercios
            </Badge>
            <h1 className="text-4xl pb-2 md:text-6xl font-bold mb-6 text-white drop-shadow-md">
              Hacé que tu vidriera haga entrar más gente
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-sm">
              Subí una foto de tu vidriera y recibí recomendaciones claras para
              que se entienda mejor qué vendés y atraiga más clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registro">
                <Button>
                  Analizar mi vidriera
                  <IconArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="#planes">
                <Button variant="outline">Ver planes</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tres pasos simples para mejorar tu vidriera sin contratar a nadie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background/50 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon
                      size={32}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Beneficios para tu negocio
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors bg-card/50"
                >
                  <div className="shrink-0 p-2 rounded-full bg-primary/10 text-primary">
                    <IconCheck size={24} aria-hidden="true" />
                  </div>
                  <p className="text-lg font-medium text-foreground">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans Preview Section */}
      <section
        id="planes"
        className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950/50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Planes
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Pagás solo por lo que usás. Sin contratos ni compromiso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 relative flex flex-col border-none shadow-lg transition-all duration-300 overflow-visible ${
                  plan.popular
                    ? "scale-105 z-10 shadow-xl ring-2 ring-primary bg-background"
                    : "hover:shadow-xl hover:-translate-y-1 bg-background/60 backdrop-blur-sm"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-sm font-semibold">
                    Más elegido
                  </Badge>
                )}
                <div className="text-center flex flex-col h-full">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {plan.name}
                  </h3>
                  <div className="mb-6 pb-6 border-b border-border/50">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">ARS</span>
                  </div>
                  <p className="font-semibold text-primary mb-3 text-lg">
                    {plan.credits}
                  </p>
                  <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                    {plan.description}
                  </p>
                  <Link href="/planes" className="w-full mt-auto">
                    <Button
                      className="w-full font-semibold"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Elegir plan
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-violet-600 opacity-90" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
              ¿Querés saber qué cambiar para que tu vidriera venda más?
            </h2>
            <p className="text-xl mb-10 opacity-90 leading-relaxed max-w-2xl mx-auto">
              Subí una foto de tu vidriera y recibí recomendaciones claras para
              mejorarla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registro">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  Analizar mi vidriera
                  <IconArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium">
              © {new Date().getFullYear()} Vidriera en Casa. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
