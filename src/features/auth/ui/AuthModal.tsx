import { useState } from 'react';
import Modal from '../../../shared/ui/organisms/Modal/Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (data: { email: string; password: string }) => Promise<void>;
  onRegister?: (data: { name: string; email: string; password: string }) => Promise<void>;
}

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) => {
  const [mode, setMode] = useState<AuthMode>('login');

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await onLogin?.(data);
      onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    try {
      await onRegister?.(data);
      setMode('login');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
    >
      <div className="space-y-6">
        {mode === 'login' ? (
          <LoginForm
            onSubmit={handleLogin}
            onSwitchToRegister={() => setMode('register')}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            onSwitchToLogin={() => setMode('login')}
          />
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;