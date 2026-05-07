// src/components/ui/Button.tsx
import React from "react";
import styled, { css } from "styled-components";

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border: none;
  outline: none;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  /* Size variants */
  ${({ size, theme }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.sm};
          min-height: ${theme.spacing[8]};
        `;
      case 'lg':
        return css`
          padding: ${theme.spacing[4]} ${theme.spacing[8]};
          font-size: ${theme.typography.fontSize.lg};
          min-height: ${theme.spacing[12]};
        `;
      default: // md
        return css`
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.base};
          min-height: ${theme.spacing[10]};
        `;
    }
  }}

  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background: ${theme.colors.gray[100]};
          color: ${theme.colors.text.primary};
          border: 1px solid ${theme.colors.border.default};

          &:hover {
            background: ${theme.colors.gray[200]};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }

          &:active {
            transform: translateY(0);
          }
        `;
      case 'tertiary':
        return css`
          background: transparent;
          color: ${theme.colors.primary[500]};
          border: 1px solid ${theme.colors.primary[500]};

          &:hover {
            background: ${theme.colors.primary[50]};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }

          &:active {
            transform: translateY(0);
          }
        `;
      default: // primary
        return css`
          background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.primary[600]} 100%);
          color: ${theme.colors.text.inverse};
          box-shadow: ${theme.shadows.base};

          &:hover {
            background: linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.primary[700]} 100%);
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.lg};
          }

          &:active {
            transform: translateY(0);
            box-shadow: ${theme.shadows.base};
          }
        `;
    }
  }}

  /* Full width */
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  /* Loading state */
  ${({ loading }) => loading && css`
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  `}

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Focus styles */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Subtle hover lift effect */
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      loading={loading}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span>⏳</span>}
      {children}
    </StyledButton>
  );
};
