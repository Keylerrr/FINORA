import { useState, useEffect } from 'react';
import { User, Category, Transaction, Goal } from '../types';

// Datos mock para demostración
const mockUser: User = {
  id: '1',
  name: 'Keyler Arias',
  email: 'keylerarias005@gmail.com',
  monthlyGoal: 200000,
  createdAt: '2024-01-01'
};

const mockCategories: Category[] = [
  { id: '1', name: 'Alimentación', icon: '🍽️', color: '#ef4444', type: 'expense' },
  { id: '2', name: 'Transporte', icon: '🚗', color: '#3b82f6', type: 'expense' },
  { id: '3', name: 'Entretenimiento', icon: '🎮', color: '#8b5cf6', type: 'expense' },
  { id: '4', name: 'Servicios', icon: '💡', color: '#f59e0b', type: 'expense' },
  { id: '5', name: 'Salud', icon: '🏥', color: '#10b981', type: 'expense' },
  { id: '6', name: 'Salario', icon: '💼', color: '#059669', type: 'income' },
  { id: '7', name: 'Freelance', icon: '💻', color: '#06b6d4', type: 'income' },
  { id: '8', name: 'Inversiones', icon: '📈', color: '#8b5cf6', type: 'income' }
];

const mockTransactions: Transaction[] = [
  
];

const mockGoals: Goal[] = [
  
];

export function useFinanceData() {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simular autenticación automática para demo
    setUser(mockUser);
    setCategories(mockCategories);
    setTransactions(mockTransactions);
    setGoals(mockGoals);
    setIsAuthenticated(true);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'userId'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      userId: user?.id || '1'
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, currentAmount: Math.min(goal.targetAmount, goal.currentAmount + amount) } : goal
    ));
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'userId'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      userId: user?.id || '1',
      currentAmount: goal.currentAmount || 0
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const login = (email: string, password: string) => {
    // Mock login
    setUser(mockUser);
    setIsAuthenticated(true);
    return true;
  };

  const register = (name: string, email: string, password: string) => {
    // Mock register
    const newUser = { ...mockUser, name, email };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    categories,
    transactions,
    goals,
    isAuthenticated,
    addTransaction,
    addCategory,
    deleteTransaction,
    deleteCategory,
    updateGoal,
    addGoal,
    deleteGoal,
    login,
    register,
    logout
  };
}