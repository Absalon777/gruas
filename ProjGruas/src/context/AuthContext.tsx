import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  updateProfile: (displayName: string, photoURL?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

// Usuario mock para simular autenticación
const mockUser: User = {
  uid: 'user-123',
  email: 'usuario@demo.com',
  displayName: 'Usuario Demo',
  phoneNumber: '+54 11 1234-5678'
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simular login con datos mock
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular login exitoso
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  // Simular registro con datos mock
  const register = async (email: string, password: string) => {
    try {
      setLoading(true);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular registro exitoso
      const newUser: User = {
        uid: 'new-user-456',
        email: email,
        displayName: email.split('@')[0],
        phoneNumber: '+54 11 9876-5432'
      };

      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.error('Error al registrar usuario:', error);
      throw new Error('Error al crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  // Simular cierre de sesión
  const logout = async () => {
    try {
      setLoading(true);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));

      setUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Simular envío de correo de restablecimiento
  const sendPasswordResetEmail = async (email: string) => {
    try {
      setLoading(true);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Correo de restablecimiento enviado a:', email);
    } catch (error: any) {
      console.error('Error al enviar correo de restablecimiento:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Simular actualización de perfil
  const updateProfile = async (displayName: string, photoURL?: string) => {
    try {
      setLoading(true);

      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));

      if (user) {
        const updatedUser: User = {
          ...user,
          displayName: displayName,
        };

        setUser(updatedUser);
      }
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        sendPasswordResetEmail,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
