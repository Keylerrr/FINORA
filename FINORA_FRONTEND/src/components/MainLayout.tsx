import { ReactNode, useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Home, 
  PlusCircle, 
  FolderOpen, 
  BarChart3, 
  Target, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { PageType, User as UserType } from '../types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  user: UserType;
  onLogout: () => void;
}

export function MainLayout({ children, currentPage, onPageChange, user, onLogout }: MainLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { id: 'dashboard', label: 'Inicio', icon: Home },
    { id: 'transactions', label: 'Transacciones', icon: PlusCircle },
    { id: 'categories', label: 'Categorías', icon: FolderOpen },
    { id: 'reports', label: 'Reportes', icon: BarChart3 },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'profile', label: 'Perfil', icon: User }
  ] as const;

  const handleNavigation = (page: PageType) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const NavigationButtons = ({ onClick }: { onClick?: (page: PageType) => void }) => (
    <>
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentPage === item.id;
        return (
          <Button
            key={item.id}
            variant={isActive ? "default" : "ghost"}
            className={`w-full justify-start transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700'
            }`}
            onClick={() => onClick ? onClick(item.id as PageType) : onPageChange(item.id as PageType)}
          >
            <IconComponent className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden p-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 bg-gradient-to-b from-white to-gray-50">
                  <SheetHeader className="p-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                    <SheetTitle className="flex items-center space-x-2">
                      <img
                        src="icon.png"
                        alt="FINORA"
                        className="w-6 h-6 inline-block align-middle"
                      />
                      <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FINORA</span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="p-4 space-y-2">
                    <NavigationButtons onClick={handleNavigation} />
                  </nav>
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                    <Button variant="outline" className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors" onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <img className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse-slow" src="icon.png" alt="FINORA"></img>
                <h1 className="text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">FINORA</h1>
              </div>
            </div>
            
            {/* User Info - Desktop */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="hidden md:block text-right">
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

            {/* User Info - Mobile (just avatar and logout) */}
            <div className="flex sm:hidden items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={onLogout} className="p-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation - Desktop Only */}
          <aside className="hidden lg:block lg:w-64">
            <nav className="space-y-2 sticky top-20 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200/50">
              <NavigationButtons />
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}