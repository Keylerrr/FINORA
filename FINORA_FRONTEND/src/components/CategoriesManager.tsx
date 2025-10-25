import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import { Category } from '../types';

interface CategoriesManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (id: string) => void;
}

const availableIcons = [
  '🍽️', '🚗', '🎮', '💡', '🏥', '👕', '🏠', '📱', 
  '✈️', '🎬', '📚', '💪', '🎵', '🛒', '🍕', '☕',
  '💼', '💻', '📈', '🎯', '🏦', '💰', '💳', '🎁'
];

const availableColors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e'
];

export function CategoriesManager({ categories, onAddCategory, onDeleteCategory }: CategoriesManagerProps) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '💰',
    color: '#3b82f6',
    type: 'expense' as 'income' | 'expense'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAddCategory(formData);
      setFormData({
        name: '',
        icon: '💰',
        color: '#3b82f6',
        type: 'expense'
      });
    }
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-2">
        <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Gestión de Categorías</h2>
        <p className="text-muted-foreground mt-1">Organiza tus transacciones con categorías personalizadas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Formulario para agregar categoría */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5 text-blue-600" />
              <span>Crear Nueva Categoría</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la categoría</Label>
                <Input
                  id="name"
                  placeholder="Ej: Alimentación, Transporte..."
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'income' | 'expense') => 
                    setFormData(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">💸 Gasto</SelectItem>
                    <SelectItem value="income">💰 Ingreso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ícono</Label>
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {availableIcons.map((icon) => (
                    <Button
                      key={icon}
                      type="button"
                      variant={formData.icon === icon ? "default" : "outline"}
                      size="sm"
                      className="p-2 h-10"
                      onClick={() => setFormData(prev => ({ ...prev, icon }))}
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${
                        formData.color === color ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                Crear Categoría
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de categorías existentes */}
        <div className="space-y-6">
          {/* Categorías de ingresos */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-green-600">💰</span>
                </div>
                <span>Categorías de Ingresos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {incomeCategories.length > 0 ? (
                  incomeCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg gap-2">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          <span>{category.icon}</span>
                        </div>
                        <span className="flex-1 truncate">{category.name}</span>
                        <Badge variant="secondary" className="flex-shrink-0 text-xs hidden sm:inline-flex" style={{ backgroundColor: category.color + '20', color: category.color }}>
                          Ingreso
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteCategory(category.id)}
                        className="p-2 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderOpen className="mx-auto h-8 w-8 mb-2" />
                    <p>No hay categorías de ingresos</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categorías de gastos */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <span className="text-red-600">💸</span>
                </div>
                <span>Categorías de Gastos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenseCategories.length > 0 ? (
                  expenseCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg gap-2">
                      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          <span>{category.icon}</span>
                        </div>
                        <span className="flex-1 truncate">{category.name}</span>
                        <Badge variant="secondary" className="flex-shrink-0 text-xs hidden sm:inline-flex" style={{ backgroundColor: category.color + '20', color: category.color }}>
                          Gasto
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteCategory(category.id)}
                        className="p-2 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderOpen className="mx-auto h-8 w-8 mb-2" />
                    <p>No hay categorías de gastos</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}