import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {
      borderRadius: theme.radius.md,
      paddingVertical: size === 'small' ? 8 : size === 'large' ? 16 : 12,
      paddingHorizontal: size === 'small' ? 12 : size === 'large' ? 24 : 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: disabled ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        buttonStyle.backgroundColor = theme.colors.primary;
        break;
      case 'secondary':
        buttonStyle.backgroundColor = theme.colors.secondary;
        break;
      case 'outline':
        buttonStyle.backgroundColor = 'transparent';
        buttonStyle.borderWidth = 1;
        buttonStyle.borderColor = theme.colors.primary;
        break;
      case 'text':
        buttonStyle.backgroundColor = 'transparent';
        break;
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyle: TextStyle = {
      textAlign: 'center',
      fontWeight: '600',
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        textStyle.color = '#FFFFFF';
        break;
      case 'outline':
      case 'text':
        textStyle.color = theme.colors.primary;
        break;
    }

    switch (size) {
      case 'small':
        textStyle.fontSize = 12;
        break;
      case 'large':
        textStyle.fontSize = 18;
        break;
      default:
        textStyle.fontSize = 16;
    }

    return textStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : theme.colors.primary} 
        />
      ) : (
        <>
          {icon && <>{icon} </>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
