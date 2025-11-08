import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Edit, Save, User, Mail, Target, Calendar, BarChart3, Settings, Sliders } from 'lucide-react';
import { User as UserType, Transaction, Goal } from '../types';

interface ProfilePageProps {
  user: UserType;
  transactions: Transaction[];
  goals: Goal[];
}

export function ProfilePage({ user, transactions, goals }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    monthlyGoal: user.monthlyGoal?.toString() || ''
  });

  const handleSave = () => {
    // En una implementación real, aquí se actualizaría el usuario
    setIsEditing(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calcular estadísticas dinámicamente
  const userStats = useMemo(() => {
    // Total de transacciones
    const totalTransactions = transactions.length;

    // Total ahorrado (ingresos - gastos)
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
   
    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
   
    const totalSaved = totalIncome - totalExpenses;

    // Metas completadas (donde currentAmount >= targetAmount)
    const goalsCompleted = goals.filter(g => g.currentAmount >= g.targetAmount).length;

    // Fecha de creación de la cuenta
    const memberSince = user.createdAt || new Date().toISOString().split('T')[0];

    return {
      memberSince,
      totalTransactions,
      totalSaved,
      goalsCompleted
    };
  }, [transactions, goals, user.createdAt]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-2">
        <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mi Perfil</h2>
        <p className="text-muted-foreground mt-1">Gestiona tu información personal y preferencias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Información principal del perfil */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Información Personal</span>
                </span>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
                  className={isEditing ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : "hover:bg-blue-50"}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                  <AvatarFallback className="text-xl sm:text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="truncate">{user.name}</h3>
                  <p className="text-muted-foreground truncate text-sm">{user.email}</p>
                  <Badge variant="secondary" className="text-xs">Usuario activo</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        />
                      ) : (
                        <span>{user.name}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <span>{user.email}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyGoal">Meta de ahorro mensual</Label>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        id="monthlyGoal"
                        type="number"
                        placeholder="200000"
                        value={formData.monthlyGoal}
                        onChange={(e) => setFormData(prev => ({ ...prev, monthlyGoal: e.target.value }))}
                      />
                    ) : (
                      <span>
                        {user.monthlyGoal ? formatCurrency(user.monthlyGoal) : 'No configurada'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Miembro desde</Label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{(() => {
                      const [year, month, day] = userStats.memberSince.split('-');
                      const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                                      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                      return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
                    })()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de estadísticas */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Estadísticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl text-blue-600 mb-1">{userStats.totalTransactions}</div>
                <p className="text-sm text-blue-800">Transacciones registradas</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl text-green-600 mb-1">{formatCurrency(userStats.totalSaved)}</div>
                <p className="text-sm text-green-800">Total ahorrado</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl text-purple-600 mb-1">{userStats.goalsCompleted}</div>
                <p className="text-sm text-purple-800">Metas completadas</p>
              </div>
            </CardContent>
          </Card>

          {/* Sección de configuración de cuenta */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Configuración de Cuenta</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Cambiar contraseña
              </Button>
             
              <Button variant="outline" className="w-full justify-start">
                Configurar notificaciones
              </Button>
             
              <Button variant="outline" className="w-full justify-start">
                Exportar datos
              </Button>
             
              <Separator />
             
              <Button variant="destructive" className="w-full">
                Eliminar cuenta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sección de preferencias */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <Sliders className="h-5 w-5 text-blue-600" />
            <span>Preferencias de la Aplicación</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <h4>Notificaciones</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Recordatorios de registro de gastos</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Alertas de metas próximas a vencer</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Resumen semanal por email</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4>Privacidad</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Permitir análisis de gastos</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span>Compartir estadísticas anónimas</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Recordar sesión</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}