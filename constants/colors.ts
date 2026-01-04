export const Colors = {
  primary: {
    green: '#1DBF73',
    greenDark: '#0F8F55',
    greenPastel: '#DCF9EA',
  },
  secondary: {
    lavender: '#8F9BFF',
    orangePastel: '#FFE8CC',
    orangeText: '#F59E0B',
  },
  neutral: {
    gray900: '#1A1A1A',
    gray600: '#6C6C6C',
    gray300: '#E5E5E5',
    gray100: '#F8F8F8',
    white: '#FFFFFF',
  },
  status: {
    error: '#EF4444',
    success: '#1DBF73',
    warning: '#F59E0B',
    info: '#5B8DEF',
  },
  chart: {
    blue: '#3B82F6',
    red: '#EF4444',
    orange: '#F59E0B',
  },
} as const;

export type ColorTokens = typeof Colors;
