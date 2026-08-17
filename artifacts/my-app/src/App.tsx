import { useEffect } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { tickManager } from '@/gameEngine/tickManager';
import { initGame } from '@/lib/saveManager';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { TopBar } from '@/components/TopBar';
import { SideMenu } from '@/components/SideMenu';
import { NotificationToast } from '@/components/NotificationToast';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { SplashScreen } from '@/components/SplashScreen';
import StartPage from './pages/StartPage';  // ← правильный импорт (default)
import { AuthModal } from '@/components/AuthModal';
import { UI_ICONS } from '@/lib/icons';

// ── Активные страницы ──
import { DashboardPage } from '@/pages/DashboardPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { StubPage } from '@/pages/StubPage';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-black text-destructive">404</h1>
        <p className="text-muted-foreground font-mono text-sm">Area not found</p>
      </div>
    </div>
  );
}

function Router() {
  const updateScrollPosition = useUIStore(s => s.updateScrollPosition);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollPosition(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateScrollPosition]);

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <SideMenu />

      <main className="flex-1 md:ml-60 min-h-screen overflow-x-hidden">
        <TopBar />
        <NotificationToast />

        <div className="w-full max-w-[1440px] mx-auto px-3 py-4 pb-20 sm:px-4 md:pb-28 md:px-6 lg:px-8">
          <Switch>
            <Route path="/" component={DashboardPage} />
            <Route path="/inventory" component={InventoryPage} />
            <Route path="/settings" component={SettingsPage} />

            <Route path="/shop">
              <StubPage title="Магазин" iconName="shop" />
            </Route>
            <Route path="/bank">
              <StubPage title="Банк" iconName="bank" />
            </Route>
            <Route path="/combat">
              <StubPage title="Бой" iconName="combat" />
            </Route>
            <Route path="/woodcutting">
              <StubPage title="Лесорубство" iconName="woodcutting" />
            </Route>
            <Route path="/mining">
              <StubPage title="Шахтёрство" iconName="mining" />
            </Route>
            <Route path="/fishing">
              <StubPage title="Рыбалка" iconName="fishing" />
            </Route>
            <Route path="/cooking">
              <StubPage title="Кулинария" iconName="cooking" />
            </Route>
            <Route path="/smithing">
              <StubPage title="Кузнечное дело" iconName="smithing" />
            </Route>
            <Route path="/firemaking">
              <StubPage title="Огонь" iconName="firemaking" />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </div>
      </main>

      <MobileNav />
      <Toaster />
    </div>
  );
}

function App() {
  const isSplashVisible = useUIStore(s => s.isSplashVisible);
  const { isAuthenticated, checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    initGame();
    tickManager.start();
    document.documentElement.classList.add('dark');
    return () => {
      tickManager.stop();
    };
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <StartPage />
        <AuthModal />
      </>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
      <AuthModal />
    </TooltipProvider>
  );
}

export default App;