import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ShopMatchLogo from "@/components/ui/ShopMatchLogo";
import { 
  MessageSquare, 
  TrendingDown, 
  Clock, 
  Brain, 
  Send, 
  LayoutDashboard,
  Zap,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/15 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6">
        <ShopMatchLogo size="md" variant="light" />
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
              Iniciar sesión
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-xl">
              Registrarse
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 pt-12 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Plataforma de Venta Inteligente</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            De Chat a Venta: <br />
            <span className="text-primary">Automatiza tu Éxito</span> en TikTok Live
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10">
            Transforma cada comentario de interés en una compra real. Nuestra IA detecta, responde y gestiona ventas automáticamente mientras tú haces tu live.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="h-14 px-8 rounded-xl text-lg font-semibold">
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 rounded-xl text-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              El Problema: <span className="text-red-400">Ventas Perdidas</span> en TikTok Live
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Los vendedores pierden oportunidades valiosas cada día
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Problem Card 1 */}
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-400/20 rounded-2xl p-8 hover:bg-red-500/15 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
                <MessageSquare className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Oportunidades Desaprovechadas</h3>
              <p className="text-white/60">
                Los vendedores pierden clientes por respuestas lentas o nulas en el chat durante los lives.
              </p>
            </div>

            {/* Problem Card 2 */}
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-400/20 rounded-2xl p-8 hover:bg-red-500/15 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Gestión Manual Ineficiente</h3>
              <p className="text-white/60">
                Es imposible gestionar múltiples compradores y cerrar ventas en tiempo real sin automatización.
              </p>
            </div>

            {/* Problem Card 3 */}
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-400/20 rounded-2xl p-8 hover:bg-red-500/15 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
                <TrendingDown className="h-7 w-7 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Tasa de Conversión Típica: 2-3%</h3>
              <p className="text-white/60">
                El proceso manual y la fricción en la compra limitan las ventas efectivas drásticamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              La Solución: <span className="text-primary">Flujo de Venta Automatizado</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Así transformamos el interés en una compra en tiempo real
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-lg">
                  1
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mb-6">
                  <Brain className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Detectar</h3>
                <p className="text-white/70">
                  La IA identifica el interés de compra en los comentarios del chat en vivo automáticamente.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative md:mt-8">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-lg">
                  2
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/30 to-teal-500/30 flex items-center justify-center mb-6">
                  <Send className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Actuar</h3>
                <p className="text-white/70">
                  Envía automáticamente un mensaje personalizado con un enlace de pago directo.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-bold text-lg">
                  3
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/30 to-yellow-500/30 flex items-center justify-center mb-6">
                  <LayoutDashboard className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Gestionar</h3>
                <p className="text-white/70">
                  El vendedor monitorea todas las interacciones desde un panel centralizado e intuitivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Escalabilidad para <span className="text-primary">Crecer</span>
                </h2>
                <p className="text-white/60 text-lg mb-8">
                  Opera en varios streams y con múltiples vendedores de forma simultánea. Sin límites.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-white/80">Múltiples streams simultáneos</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-white/80">Panel centralizado de ventas</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-white/80">Analíticas en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span className="text-white/80">Integración con TikTok, Instagram y más</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="backdrop-blur-md bg-primary/20 border border-primary/30 rounded-2xl p-6 text-center">
                  <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-1">10x</div>
                  <div className="text-white/60 text-sm">Más rápido</div>
                </div>
                <div className="backdrop-blur-md bg-primary/20 border border-primary/30 rounded-2xl p-6 text-center">
                  <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-1">∞</div>
                  <div className="text-white/60 text-sm">Clientes simultáneos</div>
                </div>
                <div className="backdrop-blur-md bg-primary/20 border border-primary/30 rounded-2xl p-6 text-center">
                  <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-1">+300%</div>
                  <div className="text-white/60 text-sm">Conversión</div>
                </div>
                <div className="backdrop-blur-md bg-primary/20 border border-primary/30 rounded-2xl p-6 text-center">
                  <MessageSquare className="h-10 w-10 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-white/60 text-sm">Automatización</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para transformar tus ventas?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Únete a los vendedores que ya están automatizando sus ventas en TikTok Live
          </p>
          <Link to="/register">
            <Button size="lg" className="h-16 px-12 rounded-2xl text-xl font-bold">
              Comenzar Ahora
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 lg:px-12 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <ShopMatchLogo size="sm" variant="light" />
          <p className="text-white/40 text-sm">
            © 2024 Shop Match. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
