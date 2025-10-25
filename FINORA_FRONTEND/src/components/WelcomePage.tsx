import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  TrendingUp, 
  Target, 
  PieChart, 
  Shield, 
  Smartphone, 
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Control Total',
      description: 'Registra y visualiza todos tus ingresos y gastos en un solo lugar',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: PieChart,
      title: 'Reportes Visuales',
      description: 'Gráficas interactivas que te ayudan a entender tus finanzas',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Target,
      title: 'Metas de Ahorro',
      description: 'Define objetivos y monitorea tu progreso hacia ellos',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Seguro y Privado',
      description: 'Tus datos están protegidos con los más altos estándares',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Smartphone,
      title: '100% Responsive',
      description: 'Accede desde cualquier dispositivo, móvil o computadora',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Rápido y Fácil',
      description: 'Interfaz intuitiva diseñada para usuarios sin experiencia técnica',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  const benefits = [
    'Categorías personalizables para tus transacciones',
    'Filtros avanzados por fecha y categoría',
    'Alertas de metas de ahorro',
    'Reportes mensuales detallados',
    'Interfaz en español adaptada a Latinoamérica',
    'Sin publicidad ni cargos ocultos'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Header/Logo */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="text-6xl sm:text-7xl md:text-8xl animate-bounce-slow">💰</div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              FINORA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-3 max-w-3xl mx-auto px-4">
              Tu aliado financiero personal
            </p>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Toma el control de tus finanzas de manera simple, rápida y efectiva
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-16 sm:mb-20 animate-slide-down">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 sm:px-12 py-6 sm:py-7 text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Gratis • Sin tarjeta de crédito • Comienza en 30 segundos
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Benefits Section */}
          <div className="max-w-4xl mx-auto mb-16 sm:mb-20">
            <Card className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 border-0 shadow-2xl">
              <CardContent className="p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ¿Por qué elegir FINORA?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-3 p-4 rounded-lg hover:bg-white/80 transition-colors duration-200"
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 max-w-4xl mx-auto">
            <div className="text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-sm sm:text-base text-gray-600">Gratis</p>
            </div>
            <div className="text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                99%
              </div>
              <p className="text-sm sm:text-base text-gray-600">Disponibilidad</p>
            </div>
            <div className="text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {'<3s'}
              </div>
              <p className="text-sm sm:text-base text-gray-600">Tiempo de carga</p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6">
              ¿Listo para tomar el control?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Únete a FINORA hoy y comienza tu viaje hacia la libertad financiera
            </p>
            <Button 
              onClick={onGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 sm:px-12 py-6 sm:py-7 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Crear Mi Cuenta Gratis
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 sm:mt-16 text-sm text-gray-500">
            <p>© 2025 FINORA - Control Financiero Personal</p>
            <p className="mt-2">Diseñado especialmente para usuarios hispanohablantes en Colombia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
