export const Typography = {
  h1: {
    fontSize: 28, // reduced for mobile
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  h4: {
    fontSize: 18,
    fontWeight: '500' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  small: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  italic:{
     fontSize: 16,
    fontWeight: '400' as const,
   fontStyle:'italic'
  }
};


export const Colors = {
  background: '#FAFAFA',           // light soft background
  card: '#FFFFFF',                 // clean white card
  textPrimary: '#1F2937',          // dark gray-blue (not black)
  textSecondary: '#6B7280',        // muted gray
  accent: '#00BFA6',               // Deno-style mint
  border: '#E5E7EB',               // soft light gray
  error: '#F87171',
  buttonBg:"#70FFAF",
  black:"#0B0D11",
  gray:"#E5EAEA",           // soft red,
  ligtgray:"#6B7280",
  grayBlack:"#1F2937",
}

export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 20
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32
};
