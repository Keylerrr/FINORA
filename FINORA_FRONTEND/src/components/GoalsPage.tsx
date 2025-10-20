import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Plus, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Goal } from '../types';

interface GoalsPageProps {
  goals: Goal[];
  onUpdateGoal: (id: string, amount: number) => void;
}

export function GoalsPage({ goals, onUpdateGoal }: GoalsPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    targetDate: '',
    description: ''
  });
  const [contributions, setContributions] = useState<{ [key: string]: string }>({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'text-green-600';
    if (progress >= 75) return 'text-blue-600';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getStatusBadge = (goal: Goal) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const daysRemaining = calculateDaysRemaining(goal.targetDate);
    
    if (progress >= 100) {
      return <Badge className="bg-green-100 text-green-800">Completada</Badge>;
    } else if (daysRemaining < 0) {
      return <Badge variant="destructive">Vencida</Badge>;
    } else if (daysRemaining <= 30) {
      return <Badge className="bg-orange-100 text-orange-800">Próxima a vencer</Badge>;
    } else {
      return <Badge variant="secondary">En progreso</Badge>;
    }
  };

  const handleAddContribution = (goalId: string) => {
    const amount = parseInt(contributions[goalId] || '0');
    if (amount > 0) {
      onUpdateGoal(goalId, amount);
      setContributions(prev => ({ ...prev, [goalId]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>Mis Metas de Ahorro</h2>
          <p className="text-muted-foreground">Establece y monitorea tus objetivos financieros</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Meta
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Crear Nueva Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la meta</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Vacaciones, Laptop nueva..."
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Monto objetivo (COP)</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="1000000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetDate">Fecha objetivo</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe tu meta..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="button" className="flex-1">
                  Crear Meta
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de metas */}
      <div className="space-y-6">
        {goals.length > 0 ? (
          goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysRemaining = calculateDaysRemaining(goal.targetDate);
            const remaining = goal.targetAmount - goal.currentAmount;
            
            return (
              <Card key={goal.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>{goal.title}</span>
                    </CardTitle>
                    {getStatusBadge(goal)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Progreso visual */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span className={getProgressColor(progress)}>
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(goal.currentAmount)}</span>
                        <span>{formatCurrency(goal.targetAmount)}</span>
                      </div>
                    </div>

                    {/* Información de la meta */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {daysRemaining > 0 
                            ? `${daysRemaining} días restantes`
                            : daysRemaining === 0 
                              ? 'Vence hoy'
                              : `Venció hace ${Math.abs(daysRemaining)} días`
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-4 w-4" />
                        <span>Faltan {formatCurrency(remaining)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>Fecha objetivo: {new Date(goal.targetDate).toLocaleDateString('es-CO')}</span>
                      </div>
                    </div>

                    {/* Agregar contribución */}
                    <div className="space-y-3">
                      <Label htmlFor={`contribution-${goal.id}`}>Agregar aporte</Label>
                      <div className="flex space-x-2">
                        <Input
                          id={`contribution-${goal.id}`}
                          type="number"
                          placeholder="Monto"
                          value={contributions[goal.id] || ''}
                          onChange={(e) => setContributions(prev => ({ 
                            ...prev, 
                            [goal.id]: e.target.value 
                          }))}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleAddContribution(goal.id)}
                          disabled={!contributions[goal.id] || parseInt(contributions[goal.id]) <= 0}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Barra de progreso extendida */}
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3>No tienes metas configuradas</h3>
              <p className="text-muted-foreground mb-6">
                Establece metas de ahorro para alcanzar tus objetivos financieros
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Crear tu primera meta
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips para el ahorro */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <TrendingUp className="h-5 w-5" />
            <span>Consejos para el Ahorro</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Establece metas específicas y realistas con fechas claras</li>
            <li>• Ahorra un porcentaje fijo de tus ingresos cada mes</li>
            <li>• Automatiza tus ahorros para mantener la consistencia</li>
            <li>• Revisa y ajusta tus metas según cambien tus circunstancias</li>
            <li>• Celebra los pequeños logros en el camino hacia tu meta</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}