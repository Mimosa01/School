import { useState } from "react";
import Button from "../../../shared/ui/atoms/Button/Button";
import Input from "../../../shared/ui/molecules/Input/Input";
import Text from "../../../shared/ui/atoms/Text/Text";
import SegmentedControl from "../../../shared/ui/atoms/SegmentedControl/SegmentedControl";


interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSubmit?: (data: { name: string; email: string; password: string }) => void;
}

const RegisterForm = ({ onSwitchToLogin, onSubmit }: RegisterFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Введите имя';
    }
    
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
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      await onSubmit?.({ name, email, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrors({ submit: 'Ошибка при регистрации. Попробуйте снова.' });
    } finally {
      setIsLoading(false);
    }
  };

  const [ typeUser, setTypeUser ] = useState<string>('student');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Имя"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Иван Иванов"
        error={errors.name}
        disabled={isLoading}
      />

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

      <Input
        label="Подтверждение пароля"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
        error={errors.confirmPassword}
        disabled={isLoading}
      />

      {errors.submit && (
        <Text color="danger" size="sm" className="text-center">
          {errors.submit}
        </Text>
      )}

      <SegmentedControl
        options={[
          { label: 'Ученик', value: 'student' },
          { label: 'Родитель', value: 'parent' },
          { label: 'Учитель', value: 'admin' },
        ]}
        value={typeUser}
        onChange={(val) => setTypeUser(val as string)}
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full py-2.5"
        disabled={isLoading}
      >
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>

      <div className="text-center">
        <Text size="sm" color="muted">
          Уже есть аккаунт?{' '}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSwitchToLogin();
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Войти
          </button>
        </Text>
      </div>
    </form>
  );
};

export default RegisterForm;