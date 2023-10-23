import React, { ReactElement, CSSProperties } from 'react';

interface ButtonProps {
  text: string;
  onClick?: (e: any) => void;
  color?: string;
  size?: string;
  icon?: ReactElement;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color,
  size,
  icon,
  disabled,
}: ButtonProps) => {
  const buttonStyle: CSSProperties = {
    borderWidth: 1,
    backgroundColor: color,
    fontSize: size,
  };

  return (
    <button
      className="custom-button"
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
