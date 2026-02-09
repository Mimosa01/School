import { useState } from "react";
import Button from "../../../shared/ui/atoms/Button/Button";
import Input from "../../../shared/ui/molecules/Input/Input";
import Text from "../../../shared/ui/atoms/Text/Text";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSubmit?: (data: { email: string; password: string }) => void;
}

const LoginForm = ({ onSwitchToRegister, onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = 'Введите почту';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Неверный формат почты';
    }
    
    if (!password) {
      newErrors.password = 'Введите пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await onSubmit?.({ email, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrors({ submit: 'Неверная почта или пароль' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Почта"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
        error={errors.email}
        disabled={isLoading}
      />

      <Input
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        error={errors.password}
        disabled={isLoading}
      />

      {errors.submit && (
        <Text color="danger" size="sm" className="text-center">
          {errors.submit}
        </Text>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full py-2.5"
        disabled={isLoading}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>

      <div className="text-center">
        <Text size="sm" color="muted">
          Нет аккаунта?{' '}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSwitchToRegister();
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Зарегистрироваться
          </button>
        </Text>
      </div>
    </form>
  );
};

export default LoginForm;