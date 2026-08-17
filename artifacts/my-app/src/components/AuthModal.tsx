import { useState } from 'react';
import { Root, Portal, Overlay, Content, Title, Description, Close } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { useTranslation } from '@/hooks/useTranslation';

export function AuthModal() {
  const isOpen = useUIStore(s => s.isAuthModalOpen);
  const closeAuthModal = useUIStore(s => s.closeAuthModal);
  const { login, register } = useAuthStore();
  const { t } = useTranslation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!username.trim() || !email.trim() || !password.trim()) {
        setError(t('auth.error.fillAll'));
        return;
      }
      const success = await register(username.trim(), email.trim(), password);
      if (success) {
        closeAuthModal();
        setUsername('');
        setEmail('');
        setPassword('');
        setIsSignUp(false);
      } else {
        setError(t('auth.error.emailExists'));
      }
    } else {
      // для входа используем единое поле identifier
      const identifier = username.trim(); // поле называется "username", но содержит email или username
      if (!identifier || !password.trim()) {
        setError(t('auth.error.usernameOrEmailRequired'));
        return;
      }
      const success = await login(identifier, password);
      if (success) {
        closeAuthModal();
        setUsername('');
        setPassword('');
      } else {
        setError(t('auth.error.invalidCredentials'));
      }
    }
  };

  return (
    <Root open={isOpen} onOpenChange={closeAuthModal}>
      <Portal>
        <Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Content className="fixed left-[50%] top-[50%] z-50 w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-card border border-white/10 p-6 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Title className="text-xl font-bold text-foreground mb-1">
            {isSignUp ? t('auth.signUpTitle') : t('auth.loginTitle')}
          </Title>
          <Description className="text-sm text-muted-foreground mb-4">
            {isSignUp ? t('auth.signUpDescription') : t('auth.loginDescription')}
          </Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{t('auth.username')}</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition"
                  placeholder={t('auth.username')}
                />
              </div>
            )}
            {!isSignUp && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{t('auth.username')} / Email</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition"
                  placeholder={`${t('auth.username')} / Email`}
                />
              </div>
            )}
            {isSignUp && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">{t('auth.email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition"
                  placeholder={t('auth.email')}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-indigo-500"
                  />
                  {t('auth.rememberMe')}
                </label>
                <button
                  type="button"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                  onClick={() => alert(t('auth.forgotPassword'))}
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>
            )}

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] transition active:scale-[0.98]"
            >
              {isSignUp ? t('auth.signUpButton') : t('auth.loginButton')}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {isSignUp ? t('auth.alreadyMember') : t('auth.notMember')}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-indigo-400 hover:text-indigo-300 transition font-medium"
            >
              {isSignUp ? t('auth.loginLink') : t('auth.signUpLink')}
            </button>
          </div>

          <Close asChild>
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition"
              aria-label={t('ui.close')}
            >
              <X className="w-4 h-4" />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
}