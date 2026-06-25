/**
 * PDF Export Utility for THOTH 12 Reports
 * Funciona em Web, iOS e Android
 */

import { Platform } from 'react-native';
import { RelatorioSagrado, ESFERAS_DATA } from './thoth-data';

interface PDFGeneratorOptions {
  filename?: string;
  clientName?: string;
  clientDate?: string;
}

/**
 * Gerar HTML para relatório PDF
 */
export function generateReportHTML(
  relatorio: RelatorioSagrado,
  options: PDFGeneratorOptions = {}
): string {
  const {
    clientName = 'Cliente',
    clientDate = new Date().toLocaleDateString('pt-BR'),
  } = options;

  const nucleoColors: Record<string, string> = {
    identidade: '#6B21A8',
    seguranca: '#008000',
    merecimento: '#FFD700',
  };

  const nucleoColor = nucleoColors[relatorio.nucleoPredominante] || '#D4AF37';

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Relatório Sagrado - THOTH 12</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@400;600&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'Inter', sans-serif;
    background: #ffffff;
    color: #11181C;
    line-height: 1.6;
  }
  
  .page {
    max-width: 210mm;
    margin: 0 auto;
    padding: 20mm;
    background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  }
  
  .header {
    text-align: center;
    border-top: 4px double #D4AF37;
    border-bottom: 4px double #D4AF37;
    padding: 25px 0;
    margin-bottom: 30px;
    background: linear-gradient(to right, rgba(212, 175, 55, 0.08), transparent, rgba(212, 175, 55, 0.08));
  }
  
  .header .ornament {
    font-size: 28px;
    color: #D4AF37;
    margin: 10px 0;
    letter-spacing: 8px;
  }
  
  .header h1 {
    font-family: 'Cinzel', serif;
    font-size: 36px;
    color: #D4AF37;
    letter-spacing: 4px;
    margin: 10px 0;
    text-transform: uppercase;
  }
  
  .header p {
    font-size: 14px;
    color: #1B1B3A;
    font-style: italic;
    letter-spacing: 2px;
  }
  
  .client-info {
    background: #f9f6ee;
    border-left: 5px solid #D4AF37;
    padding: 20px;
    margin-bottom: 25px;
    font-size: 13px;
    border-radius: 4px;
  }
  
  .client-info p { margin: 6px 0; }
  .client-info strong { color: #1B1B3A; letter-spacing: 1px; }
  
  .section { margin-bottom: 28px; }
  
  .section-title {
    font-family: 'Cinzel', serif;
    font-size: 18px;
    color: #D4AF37;
    border-bottom: 2px solid #D4AF37;
    padding-bottom: 8px;
    margin-bottom: 18px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .spheres-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .sphere-card {
    border: 2px solid #D4AF37;
    padding: 18px 12px;
    background: #fff;
    text-align: center;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(212, 175, 55, 0.1);
  }
  
  .sphere-icon { font-size: 36px; margin-bottom: 8px; }
  .sphere-name { font-weight: bold; color: #1B1B3A; font-size: 14px; margin-bottom: 6px; }
  .sphere-intensity { font-size: 22px; color: #D4AF37; font-weight: bold; }
  .sphere-archetype { font-size: 11px; color: #687076; margin-top: 6px; font-style: italic; }
  
  .core-archetype {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 25px;
  }
  
  .core-box, .archetype-box {
    border: 2px solid #D4AF37;
    padding: 18px;
    background: #fff;
    border-radius: 8px;
  }
  
  .core-box h3, .archetype-box h3 {
    font-family: 'Cinzel', serif;
    font-size: 12px;
    color: #D4AF37;
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .core-value, .archetype-value {
    font-size: 20px;
    font-weight: bold;
    text-transform: capitalize;
    font-family: 'Cinzel', serif;
  }
  
  .thoth-message {
    background: linear-gradient(to right, rgba(212, 175, 55, 0.08), transparent, rgba(212, 175, 55, 0.08));
    border-left: 5px solid #D4AF37;
    padding: 20px;
    margin-bottom: 25px;
    font-style: italic;
    color: #1B1B3A;
    line-height: 1.9;
    font-size: 15px;
    border-radius: 0 8px 8px 0;
  }
  
  .frequencies {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .frequency-badge {
    background: #1B1B3A;
    color: #D4AF37;
    padding: 10px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: bold;
    border: 1px solid #D4AF37;
  }
  
  .commands-list { list-style: none; }
  
  .commands-list li {
    padding: 10px 0 10px 25px;
    position: relative;
    color: #1B1B3A;
    font-size: 14px;
    border-bottom: 1px dashed #D4AF37/30;
  }
  
  .commands-list li:before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #D4AF37;
    font-weight: bold;
    font-size: 18px;
  }
  
  .plan-section {
    background: #f9f6ee;
    padding: 20px;
    border-left: 5px solid #D4AF37;
    border-radius: 0 8px 8px 0;
  }
  
  .plan-item { margin-bottom: 14px; }
  
  .plan-label {
    font-size: 11px;
    color: #687076;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
  }
  
  .plan-value {
    font-size: 14px;
    color: #1B1B3A;
    margin-top: 4px;
  }
  
  .decrees-list { list-style: none; margin-top: 10px; }
  
  .decrees-list li {
    padding: 6px 0 6px 20px;
    position: relative;
    font-size: 13px;
    color: #1B1B3A;
    font-style: italic;
  }
  
  .decrees-list li:before {
    content: "✦";
    position: absolute;
    left: 0;
    color: #D4AF37;
  }
  
  .footer {
    text-align: center;
    border-top: 4px double #D4AF37;
    padding-top: 20px;
    margin-top: 40px;
    font-size: 11px;
    color: #687076;
  }
  
  .footer-ornament {
    color: #D4AF37;
    margin: 12px 0;
    font-size: 18px;
    letter-spacing: 6px;
  }
  
  @media print {
    body { margin: 0; padding: 0; }
    .page { margin: 0; padding: 15mm; }
  }
</style>
</head>
<body>
<div class="page">
  <div class="header">
    <div class="ornament">✦ ☥ ✦</div>
    <h1>THOTH 12</h1>
    <p>Sistema de Reprogramação Vibracional</p>
    <div class="ornament">✦ ☥ ✦</div>
  </div>

  <div class="client-info">
    <p><strong>CONSULENTE:</strong> ${clientName}</p>
    <p><strong>DATA DO ATENDIMENTO:</strong> ${clientDate}</p>
    <p><strong>TERAPEUTA:</strong> Celso Luiz - LUNARA</p>
  </div>

  <div class="section">
    <h2 class="section-title">🎯 Top 3 Esferas Prioritárias</h2>
    <div class="spheres-grid">
      ${relatorio.top3Esferas
        .map((esfera) => {
          const dados = ESFERAS_DATA[esfera.esfera];
          return `
          <div class="sphere-card">
            <div class="sphere-icon">${dados.icone}</div>
            <div class="sphere-name">${dados.nome}</div>
            <div class="sphere-intensity">${esfera.intensidade}%</div>
            <div class="sphere-archetype">${dados.arquetipo}</div>
          </div>`;
        })
        .join('')}
    </div>
  </div>

  <div class="core-archetype">
    <div class="core-box" style="border-left: 5px solid ${nucleoColor}">
      <h3>🔮 Núcleo Predominante</h3>
      <div class="core-value" style="color: ${nucleoColor}">${relatorio.nucleoPredominante}</div>
    </div>
    <div class="archetype-box">
      <h3>✨ Arquétipo Dominante</h3>
      <div class="archetype-value" style="color: #D4AF37">${relatorio.arquetipioDominante}</div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">📜 Mensagem de Thoth</h2>
    <div class="thoth-message">"${relatorio.mensagemThoth}"</div>
  </div>

  <div class="section">
    <h2 class="section-title">🎵 Frequências Recomendadas</h2>
    <div class="frequencies">
      ${relatorio.frequenciasRecomendadas
        .map((freq) => `<div class="frequency-badge">${freq} Hz</div>`)
        .join('')}
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">⚡ Comandos da Mesa</h2>
    <ul class="commands-list">
      ${relatorio.comandosMesa.map((cmd) => `<li>${cmd}</li>`).join('')}
    </ul>
  </div>

  ${
    relatorio.plano21Dias
      ? `
  <div class="section">
    <h2 class="section-title">📅 Plano de 21 Dias</h2>
    <div class="plan-section">
      <div class="plan-item">
        <div class="plan-label">Fase</div>
        <div class="plan-value">${relatorio.plano21Dias.fase}</div>
      </div>
      <div class="plan-item">
        <div class="plan-label">Exercício Prático</div>
        <div class="plan-value">${relatorio.plano21Dias.exercicioPratico}</div>
      </div>
      <div class="plan-item">
        <div class="plan-label">Meta Mensurável</div>
        <div class="plan-value">${relatorio.plano21Dias.metaMensuravel}</div>
      </div>
      <div class="plan-item">
        <div class="plan-label">Decretos Diários</div>
        <ul class="decrees-list">
          ${relatorio.plano21Dias.decretosDiarios
            .map((d: string) => `<li>${d}</li>`)
            .join('')}
        </ul>
      </div>
    </div>
  </div>`
      : ''
  }

  <div class="footer">
    <div class="footer-ornament">✦ ☥ ✦</div>
    <p><strong>Sistema THOTH 12 - LUNARA</strong></p>
    <p>Interpretação Vibracional Sagrada</p>
    <p style="margin-top: 8px;">Documento gerado em ${new Date().toLocaleDateString('pt-BR')}</p>
  </div>
</div>
</body>
</html>`;
}

/**
 * Exportar/Visualizar relatório
 * Funciona em Web (abre nova aba), iOS e Android (expo-print)
 */
export async function exportReportToPDF(
  relatorio: RelatorioSagrado,
  options: PDFGeneratorOptions = {}
): Promise<{ uri: string } | null> {
  try {
    const html = generateReportHTML(relatorio, options);

    // WEB: abrir em nova aba para impressão
    if (Platform.OS === 'web') {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(html);
        newWindow.document.close();
        // Disparar impressão automaticamente
        setTimeout(() => {
          newWindow.print();
        }, 500);
        return { uri: 'web-print' };
      }
      return null;
    }

    // MOBILE: usar expo-print
    const Print = await import('expo-print');
    const { uri } = await Print.printToFileAsync({ html, base64: false });
    return { uri };
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    return null;
  }
}

/**
 * Compartilhar relatório
 */
export async function shareReport(
  relatorio: RelatorioSagrado,
  options: PDFGeneratorOptions = {}
): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      // Web: abrir para impressão
      await exportReportToPDF(relatorio, options);
      return true;
    }

    const pdfResult = await exportReportToPDF(relatorio, options);
    if (!pdfResult) throw new Error('Falha ao gerar PDF');

    const Sharing = await import('expo-sharing');
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) throw new Error('Compartilhamento não disponível');

    await Sharing.shareAsync(pdfResult.uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Compartilhar Relatório Sagrado',
    });
    return true;
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    return false;
  }
}

/**
 * Visualizar PDF
 */
export async function viewReport(
  relatorio: RelatorioSagrado,
  options: PDFGeneratorOptions = {}
): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      const html = generateReportHTML(relatorio, options);
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(html);
        newWindow.document.close();
        return true;
      }
      return false;
    }

    const Print = await import('expo-print');
    const html = generateReportHTML(relatorio, options);
    await Print.printAsync({ html });
    return true;
  } catch (error) {
    console.error('Erro ao visualizar PDF:', error);
    return false;
  }
}