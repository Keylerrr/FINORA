import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { Transaction, Category } from '../types';

interface TransactionFormProps {
  categories: Category[];
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'userId'>) => void;
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export function TransactionForm({ 
  categories, 
  onAddTransaction, 
  transactions, 
  onDeleteTransaction 
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: '',
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const [activeTab, setActiveTab] = useState('add');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount && formData.description && formData.categoryId) {
      onAddTransaction({
        amount: parseInt(formData.amount),
        description: formData.description,
        categoryId: formData.categoryId,
        type: formData.type,
        date: formData.date
      });
      setFormData({
        amount: '',
        description: '',
        categoryId: '',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const availableCategories = formData.type === 'income' ? incomeCategories : expenseCategories;

  // Ordenar transacciones por fecha (más recientes primero)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-2">
        <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Gestión de Transacciones</h2>
        <p className="text-muted-foreground mt-1">Registra tus ingresos y gastos</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Agregar</TabsTrigger>
          <TabsTrigger value="list">Ver</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="animate-fade-in">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <span>Nueva Transacción</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label>Tipo de transacción</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value: 'income' | 'expense') => {
                        setFormData(prev => ({ ...prev, type: value, categoryId: '' }));
                      }}
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
                    <Label htmlFor="amount">Monto (COP)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="50000"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select 
                      value={formData.categoryId} 
                      onValueChange={(value: string) => setFormData(prev => ({ ...prev, categoryId: value }))}
                    >
                      <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                      {availableCategories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </div>
                        </SelectItem>
                      ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu transacción..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Transacción
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="animate-fade-in">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
              <CardTitle>Historial de Transacciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedTransactions.length > 0 ? (
                  sortedTransactions.map((transaction) => {
                    const category = getCategoryInfo(transaction.categoryId);
                    return (
                      <div key={transaction.id} className="flex items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg gap-2 hover:shadow-md transition-all duration-200 hover:border-blue-200 bg-white">
                        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          <div className="text-xl sm:text-2xl flex-shrink-0">{category?.icon || '💰'}</div>
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate">{transaction.description}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
                              <span className="truncate">{category?.name}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>{new Date(transaction.date).toLocaleDateString('es-CO')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                          <div className={`text-sm sm:text-lg whitespace-nowrap ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteTransaction(transaction.id)}
                            className="p-1 sm:p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📊</div>
                    <h3>No hay transacciones</h3>
                    <p className="text-muted-foreground">Comienza agregando tu primera transacción</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}