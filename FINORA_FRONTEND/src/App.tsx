import { useState } from 'react';
import { AuthPage } from './components/AuthPage';
import { MainLayout } from './components/MainLayout';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { CategoriesManager } from './components/CategoriesManager';
import { ReportsPage } from './components/ReportsPage';
import { GoalsPage } from './components/GoalsPage';
import { ProfilePage } from './components/ProfilePage';
import { useFinanceData } from './hooks/useFinanceData';
import { PageType } from './types';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard' as PageType);
  
  const {
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
    login,
    register,
    logout
  } = useFinanceData();

  if (!isAuthenticated) {
    return <AuthPage onLogin={login} onRegister={register} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            transactions={transactions}
            categories={categories}
            user={user!}
            goals={goals}
          />
        );
      case 'transactions':
        return (
          <TransactionForm
            categories={categories}
            onAddTransaction={addTransaction}
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
          />
        );
      case 'categories':
        return (
          <CategoriesManager
            categories={categories}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        );
      case 'reports':
        return (
          <ReportsPage
            transactions={transactions}
            categories={categories}
          />
        );
      case 'goals':
        return (
          <GoalsPage
            goals={goals}
            onUpdateGoal={updateGoal}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            user={user!}
          />
        );
      default:
        return (
          <Dashboard 
            transactions={transactions}
            categories={categories}
            user={user!}
            goals={goals}
          />
        );
    }
  };

  return (
    <>
      <MainLayout
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        user={user!}
        onLogout={logout}
      >
        {renderCurrentPage()}
      </MainLayout>
      <Toaster />
    </>
  );
}