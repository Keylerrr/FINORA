import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Edit, Save, User, Mail, Target, Calendar } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfilePageProps {
  user: UserType;
}

export function ProfilePage({ user }: ProfilePageProps) {
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

  // Estadísticas mock del usuario
  const userStats = {
    memberSince: '2024-01-01',
    totalTransactions: 24,
    totalSaved: 450000,
    goalsCompleted: 1
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Mi Perfil</h2>
        <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información principal del perfil */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Información Personal</span>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  size="sm"
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
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3>{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary">Usuario activo</Badge>
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
                    <span>{new Date(userStats.memberSince).toLocaleDateString('es-CO', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de estadísticas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
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
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
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
      <Card>
        <CardHeader>
          <CardTitle>Preferencias de la Aplicación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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