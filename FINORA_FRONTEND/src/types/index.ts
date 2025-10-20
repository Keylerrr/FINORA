export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  monthlyGoal?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  type: 'income' | 'expense';
  date: string;
  userId: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  userId: string;
}

export type PageType = 'dashboard' | 'transactions' | 'categories' | 'reports' | 'goals' | 'profile';