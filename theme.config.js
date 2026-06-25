/** @type {const} */
const themeColors = {
  // Cores base do sistema
  primary: { light: '#D4AF37', dark: '#D4AF37' },
  background: { light: '#ffffff', dark: '#0F0F1E' },
  surface: { light: '#f5f5f5', dark: '#2A2A4A' },
  foreground: { light: '#11181C', dark: '#E8D4A8' },
  muted: { light: '#687076', dark: '#9BA1A6' },
  border: { light: '#E5E7EB', dark: '#D4AF37' },
  success: { light: '#22C55E', dark: '#4ADE80' },
  warning: { light: '#F59E0B', dark: '#FBBF24' },
  error: { light: '#EF4444', dark: '#F87171' },
  
  // ============================================================================
  // CORES ESPECÍFICAS DO THOTH 12
  // ============================================================================
  
  // Dourado principal - cor de destaque e poder
  thothGold: { light: '#D4AF37', dark: '#D4AF37' },
  
  // Azul profundo - cor de fundo e mistério
  thothBlue: { light: '#1B1B3A', dark: '#0F0F1E' },
  
  // Preto - contraste e elegância
  thothBlack: { light: '#000000', dark: '#000000' },
  
  // Branco - pureza e clareza
  thothWhite: { light: '#FFFFFF', dark: '#FFFFFF' },
  
  // Verde - Núcleo Segurança
  thothGreen: { light: '#008000', dark: '#00A000' },
  
  // Rosa-dourado - Núcleo Merecimento
  thothRoseGold: { light: '#FFD700', dark: '#FFC700' },
  
  // Roxo - Núcleo Identidade
  thothPurple: { light: '#6B21A8', dark: '#8B5CF6' },
  
  // Cores para as 12 esferas (gradientes)
  sphereBody: { light: '#FF6B6B', dark: '#FF5252' },
  sphereEnergy: { light: '#FFA500', dark: '#FF8C00' },
  sphereEmotions: { light: '#9B59B6', dark: '#8E44AD' },
  sphereMind: { light: '#3498DB', dark: '#2980B9' },
  sphereSpirituality: { light: '#9B59B6', dark: '#8E44AD' },
  sphereRelationships: { light: '#E91E63', dark: '#C2185B' },
  sphereFamily: { light: '#795548', dark: '#5D4037' },
  sphereWork: { light: '#607D8B', dark: '#455A64' },
  sphereProsperity: { light: '#4CAF50', dark: '#388E3C' },
  sphereMission: { light: '#FF9800', dark: '#F57C00' },
  sphereProtection: { light: '#2196F3', dark: '#1976D2' },
  sphereLegacy: { light: '#9C27B0', dark: '#7B1FA2' },
};

module.exports = { themeColors };