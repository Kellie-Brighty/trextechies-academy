import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1e40af',
    colorSuccess: '#10b981',
    colorWarning: '#f59e0b',
    colorError: '#ef4444',
    colorInfo: '#3b82f6',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: 16,
    borderRadius: 8,
  },
  components: {
    Button: {
      primaryColor: '#1e40af',
      colorPrimary: '#1e40af',
      algorithm: true,
    },
    Input: {
      borderRadius: 8,
    },
    Card: {
      borderRadiusLG: 12,
    },
  },
};
