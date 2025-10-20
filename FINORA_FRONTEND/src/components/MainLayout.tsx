import { ReactNode } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Home, 
  PlusCircle, 
  FolderOpen, 
  BarChart3, 
  Target, 
  User, 
  LogOut 
} from 'lucide-react';
import { PageType, User as UserType } from '../types';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  user: UserType;
  onLogout: () => void;
}

export function MainLayout({ children, currentPage, onPageChange, user, onLogout }: MainLayoutProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'transactions', label: 'Transacciones', icon: PlusCircle },
    { id: 'categories', label: 'Categorías', icon: FolderOpen },
    { id: 'reports', label: 'Reportes', icon: BarChart3 },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'profile', label: 'Perfil', icon: User }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💰</div>
              <h1 className="text-xl">FINORA</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Avatar>
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onPageChange(item.id as PageType)}
                  >
                    <IconComponent className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}