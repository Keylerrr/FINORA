import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Plus, Target, Calendar, DollarSign, TrendingUp, Trash2 } from 'lucide-react';
import { Goal } from '../types';
import { toast } from 'sonner';
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
} from './ui/alert-dialog';

interface GoalsPageProps {
  goals: Goal[];
  onUpdateGoal: (id: string, amount: number) => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'userId'>) => void;
  onDeleteGoal: (id: string) => void;
}

export function GoalsPage({ goals, onUpdateGoal, onAddGoal, onDeleteGoal }: GoalsPageProps) {
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
      toast.success('¡Aporte agregado exitosamente!');
    }
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.targetDate) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    const targetAmount = parseInt(newGoal.targetAmount);
    if (targetAmount <= 0) {
      toast.error('El monto objetivo debe ser mayor a cero');
      return;
    }

    onAddGoal({
      title: newGoal.title,
      targetAmount: targetAmount,
      currentAmount: 0,
      targetDate: newGoal.targetDate,
      description: newGoal.description
    });

    setNewGoal({
      title: '',
      targetAmount: '',
      targetDate: '',
      description: ''
    });
    setShowForm(false);
    toast.success('¡Meta creada exitosamente!');
  };

  const handleDeleteGoal = (goalId: string, goalTitle: string) => {
    onDeleteGoal(goalId);
    toast.success(`Meta "${goalTitle}" eliminada`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-2">
        <div>
          <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mis Metas de Ahorro</h2>
          <p className="text-muted-foreground mt-1">Establece y monitorea tus objetivos financieros</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Meta
        </Button>
      </div>

      {showForm && (
        <Card className="shadow-lg border-0 animate-slide-down">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span>Crear Nueva Meta</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button type="button" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg" onClick={handleCreateGoal}>
                  Crear Meta
                </Button>
                <Button type="button" variant="outline" className="sm:w-auto hover:bg-gray-100 transition-colors" onClick={() => setShowForm(false)}>
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
              <Card key={goal.id} className="overflow-hidden shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 flex-shrink-0" />
                      <span className="break-words">{goal.title}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      {getStatusBadge(goal)}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar meta?</AlertDialogTitle>
                            <AlertDialogDescription>
                              ¿Estás seguro de que deseas eliminar la meta "{goal.title}"? Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteGoal(goal.id, goal.title)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
                        <span>Fecha objetivo: {goal.targetDate.split('-').reverse().join('/')}</span>
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
                          className="flex-1"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleAddContribution(goal.id)}
                          disabled={!contributions[goal.id] || parseInt(contributions[goal.id]) <= 0}
                          className="flex-shrink-0"
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
      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-lg">
        <CardHeader className="border-b border-blue-100">
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <span>Consejos para el Ahorro</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 pt-6">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <span>Establece metas específicas y realistas con fechas claras</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <span>Ahorra un porcentaje fijo de tus ingresos cada mes</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <span>Automatiza tus ahorros para mantener la consistencia</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <span>Revisa y ajusta tus metas según cambien tus circunstancias</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <span>Celebra los pequeños logros en el camino hacia tu meta</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}