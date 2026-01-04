export type TypographyVariant = {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700';
  lineHeight: number;
  letterSpacing?: number;
};

export const Typography: Record<string, TypographyVariant> = {
  h1: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.02,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 31,
    letterSpacing: -0.01,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h4: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  button: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
} as const;
