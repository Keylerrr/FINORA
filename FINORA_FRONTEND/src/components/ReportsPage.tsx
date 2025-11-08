import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CalendarDays, Filter, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Transaction, Category } from '../types';

interface ReportsPageProps {
  transactions: Transaction[];
  categories: Category[];
}

export function ReportsPage({ transactions, categories }: ReportsPageProps) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reportType, setReportType] = useState<'overview' | 'expenses' | 'income' | 'trends'>('overview');

  // Filtrar transacciones por rango de fechas y categoría
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    
    const inDateRange = transactionDate >= startDate && transactionDate <= endDate;
    const inCategory = selectedCategory === 'all' || transaction.categoryId === selectedCategory;
    
    return inDateRange && inCategory;
  });

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

  // Datos para gráfica circular de gastos por categoría
  const expensesByCategory = categories
    .filter(category => category.type === 'expense')
    .map(category => {
      const total = filteredTransactions
        .filter(t => t.categoryId === category.id && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        name: category.name,
        value: total,
        color: category.color,
        icon: category.icon
      };
    })
    .filter(item => item.value > 0);

  // Datos para gráfica circular de ingresos por categoría
  const incomeByCategory = categories
    .filter(category => category.type === 'income')
    .map(category => {
      const total = filteredTransactions
        .filter(t => t.categoryId === category.id && t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        name: category.name,
        value: total,
        color: category.color,
        icon: category.icon
      };
    })
    .filter(item => item.value > 0);

  const monthlyData = () => { 
  const months: { [key: string]: { month: string; income: number; expenses: number } } = {};
  const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
 
  filteredTransactions.forEach(transaction => {
    const dateParts = transaction.date.split('-');
    const monthIndex = parseInt(dateParts[1], 10) - 1; // 0-indexed
    const month = monthNames[monthIndex];
   
    if (!months[month]) {
      months[month] = { month, income: 0, expenses: 0 };
    }

    if (transaction.type === 'income') {
      months[month].income += transaction.amount;
    } else {
      months[month].expenses += transaction.amount;
    }
  });

  return Object.values(months);
};


  // Calcular totales
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="text-sm">{`${label}: ${formatCurrency(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pb-2">
        <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Reportes y Análisis</h2>
        <p className="text-muted-foreground mt-1">Visualiza el comportamiento de tus finanzas</p>
      </div>

      {/* Filtros */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Tipo de reporte</Label>
              <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Resumen general</SelectItem>
                  <SelectItem value="expenses">Análisis de gastos</SelectItem>
                  <SelectItem value="income">Análisis de ingresos</SelectItem>
                  <SelectItem value="trends">Tendencias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fecha inicio</Label>
              <Input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha fin</Label>
              <Input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de totales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl sm:text-3xl text-green-600 mb-2">{formatCurrency(totalIncome)}</div>
              <p className="text-sm text-muted-foreground">Total Ingresos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-red-50/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="inline-flex p-3 bg-red-100 rounded-full mb-3">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-2xl sm:text-3xl text-red-600 mb-2">{formatCurrency(totalExpenses)}</div>
              <p className="text-sm text-muted-foreground">Total Gastos</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className={`inline-flex p-3 rounded-full mb-3 ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                <Wallet className={`h-6 w-6 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
              </div>
              <div className={`text-2xl sm:text-3xl mb-2 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                {formatCurrency(balance)}
              </div>
              <p className="text-sm text-muted-foreground">Balance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficas según el tipo de reporte */}
      {reportType === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
              <CardTitle>Distribución de Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              {expensesByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No hay datos de gastos para mostrar
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
              <CardTitle>Comparación Mensual</CardTitle>
            </CardHeader>
            <CardContent>
              {monthlyData().length > 0 ? (
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <BarChart data={monthlyData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="income" fill="#22c55e" name="Ingresos" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Gastos" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No hay datos mensuales para mostrar
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {reportType === 'expenses' && expensesByCategory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis Detallado de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3 sm:space-y-4">
                {expensesByCategory.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg gap-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div>{formatCurrency(category.value)}</div>
                      <div className="text-xs text-muted-foreground">
                        {((category.value / totalExpenses) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === 'income' && incomeByCategory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Análisis Detallado de Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                <PieChart>
                  <Pie
                    data={incomeByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    className="sm:innerRadius-[80] sm:outerRadius-[150]"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {incomeByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3 sm:space-y-4">
                {incomeByCategory.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg gap-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div>{formatCurrency(category.value)}</div>
                      <div className="text-xs text-muted-foreground">
                        {((category.value / totalIncome) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {reportType === 'trends' && (
        <Card>
          <CardHeader>
            <CardTitle>Tendencias Temporales</CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyData().length > 0 ? (
              <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                <LineChart data={monthlyData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} name="Ingresos" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Gastos" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No hay suficientes datos para mostrar tendencias
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}