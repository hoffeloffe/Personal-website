import React from "react";
import styled, { css } from "styled-components";

type CardVariant = 'default' | 'elevated' | 'outlined';

interface CardProps {
  children?: React.ReactNode;
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
}

const StyledCard = styled.div<CardProps>`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme, variant }) =>
    variant === 'outlined' ? theme.colors.border.default : 'transparent'};
  box-shadow: ${({ theme, variant }) =>
    variant === 'elevated' ? theme.shadows.lg : theme.shadows.base};
  transition: all ${({ theme }) => theme.transitions.base};
  overflow: hidden;

  /* Padding variants */
  ${({ padding, theme }) => {
    switch (padding) {
      case 'sm':
        return css`padding: ${theme.spacing[4]};`;
      case 'lg':
        return css`padding: ${theme.spacing[8]};`;
      default: // md
        return css`padding: ${theme.spacing[6]};`;
    }
  }}

  /* Subtle hover effects */
  ${({ hover, theme }) => hover && css`
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      hover={hover}
      className={className}
      {...props}
    >
      {children}
    </StyledCard>
  );
};
