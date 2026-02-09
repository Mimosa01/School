import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModalContent = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // TODO: Заменить на реальные вызовы API после реализации бэкенда
  const handleLogin = async (data: { email: string; password: string }) => {
    console.log('Login attempt:', data);
    alert('Вы успешно вошли в приложение. Но это тестовый режим и ничего не изменилось')
    // await authService.login(data);
    // onSuccess?.();
  };

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    console.log('Register attempt:', data);
    alert('Вы успешно зарегистрировались в приложении. Но это тестовый режим и ничего не изменилось')
    // await authService.register(data);
    // setMode('login'); // После регистрации переключаемся на форму входа
  };

  return (
    <div className="space-y-6 py-2">
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
  );
};

export default AuthModalContent;