/**
 * PDF Export Utility for THOTH 12 Reports
 * Generates beautiful PDF reports with Egyptian ornamental design
 */

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import { RelatorioSagrado, ESFERAS_DATA, NUCLEOS_DATA } from './thoth-data';

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
    filename = 'relatorio-thoth12.pdf',
    clientName = 'Cliente',
    clientDate = new Date().toLocaleDateString('pt-BR'),
  } = options;

  // Cores dos núcleos
  const nucleoColors = {
    identidade: '#6B21A8',
    seguranca: '#008000',
    merecimento: '#FFD700',
  };

  const nucleoColor = nucleoColors[relatorio.nucleoPredominante] || '#D4AF37';

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório Sagrado - THOTH 12</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Georgia', serif;
            background: #ffffff;
            color: #11181C;
            line-height: 1.6;
        }

        .page {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            margin: 0 auto;
            background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
        }

        /* Header com ornamentação egípcia */
        .header {
            text-align: center;
            border-top: 3px solid #D4AF37;
            border-bottom: 3px solid #D4AF37;
            padding: 20px 0;
            margin-bottom: 30px;
            background: linear-gradient(to right, rgba(212, 175, 55, 0.1), transparent, rgba(212, 175, 55, 0.1));
        }

        .header h1 {
            font-size: 32px;
            color: #D4AF37;
            letter-spacing: 2px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .header p {
            font-size: 14px;
            color: #1B1B3A;
            font-style: italic;
        }

        .ornament {
            text-align: center;
            font-size: 24px;
            color: #D4AF37;
            margin: 15px 0;
        }

        /* Client Info */
        .client-info {
            background: #f5f5f5;
            border-left: 4px solid #D4AF37;
            padding: 15px;
            margin-bottom: 20px;
            font-size: 12px;
        }

        .client-info p {
            margin: 5px 0;
        }

        .client-info strong {
            color: #1B1B3A;
        }

        /* Section */
        .section {
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 18px;
            color: #D4AF37;
            border-bottom: 2px solid #D4AF37;
            padding-bottom: 8px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Top 3 Spheres */
        .spheres-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        .sphere-card {
            border: 1px solid #D4AF37;
            padding: 12px;
            background: #f5f5f5;
            text-align: center;
        }

        .sphere-icon {
            font-size: 32px;
            margin-bottom: 8px;
        }

        .sphere-name {
            font-weight: bold;
            color: #1B1B3A;
            font-size: 14px;
            margin-bottom: 5px;
        }

        .sphere-intensity {
            font-size: 18px;
            color: #D4AF37;
            font-weight: bold;
        }

        .sphere-archetype {
            font-size: 11px;
            color: #687076;
            margin-top: 5px;
        }

        /* Core and Archetype */
        .core-archetype {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }

        .core-box, .archetype-box {
            border: 1px solid #D4AF37;
            padding: 15px;
            background: #f5f5f5;
        }

        .core-box h3, .archetype-box h3 {
            font-size: 12px;
            color: #D4AF37;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .core-value, .archetype-value {
            font-size: 16px;
            color: #1B1B3A;
            font-weight: bold;
            text-transform: capitalize;
        }

        /* Thoth Message */
        .thoth-message {
            background: linear-gradient(to right, rgba(212, 175, 55, 0.1), transparent, rgba(212, 175, 55, 0.1));
            border-left: 4px solid #D4AF37;
            padding: 15px;
            margin-bottom: 20px;
            font-style: italic;
            color: #1B1B3A;
            line-height: 1.8;
        }

        /* Frequencies */
        .frequencies {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }

        .frequency-badge {
            background: #1B1B3A;
            color: #D4AF37;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }

        /* Commands */
        .commands-list {
            list-style: none;
            margin-bottom: 20px;
        }

        .commands-list li {
            padding: 8px 0;
            padding-left: 20px;
            position: relative;
            color: #1B1B3A;
            font-size: 13px;
        }

        .commands-list li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #D4AF37;
            font-weight: bold;
        }

        /* 21 Day Plan */
        .plan-section {
            background: #f5f5f5;
            padding: 15px;
            border-left: 4px solid #D4AF37;
        }

        .plan-item {
            margin-bottom: 12px;
        }

        .plan-label {
            font-size: 11px;
            color: #687076;
            text-transform: uppercase;
            font-weight: bold;
        }

        .plan-value {
            font-size: 13px;
            color: #1B1B3A;
            margin-top: 3px;
        }

        .decrees-list {
            list-style: none;
            margin-top: 8px;
        }

        .decrees-list li {
            padding: 5px 0;
            padding-left: 15px;
            position: relative;
            font-size: 12px;
            color: #1B1B3A;
        }

        .decrees-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            color: #D4AF37;
        }

        /* Footer */
        .footer {
            text-align: center;
            border-top: 2px solid #D4AF37;
            padding-top: 15px;
            margin-top: 30px;
            font-size: 11px;
            color: #687076;
        }

        .footer-ornament {
            color: #D4AF37;
            margin: 10px 0;
            font-size: 16px;
        }

        /* Print styles */
        @media print {
            body {
                margin: 0;
                padding: 0;
            }

            .page {
                margin: 0;
                padding: 15mm;
                page-break-after: always;
            }
        }
    </style>
</head>
<body>
    <div class="page">
        <!-- Header -->
        <div class="header">
            <div class="ornament">✦ ☥ ✦</div>
            <h1>THOTH 12</h1>
            <p>Sistema de Reprogramação Vibracional</p>
            <div class="ornament">✦ ☥ ✦</div>
        </div>

        <!-- Client Info -->
        <div class="client-info">
            <p><strong>Cliente:</strong> ${clientName}</p>
            <p><strong>Data do Atendimento:</strong> ${clientDate}</p>
            <p><strong>Sistema:</strong> THOTH 12 - LUNARA</p>
        </div>

        <!-- Top 3 Spheres -->
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
                    </div>
                  `;
                  })
                  .join('')}
            </div>
        </div>

        <!-- Core and Archetype -->
        <div class="core-archetype">
            <div class="core-box" style="border-left: 4px solid ${nucleoColor}">
                <h3>🔮 Núcleo Predominante</h3>
                <div class="core-value" style="color: ${nucleoColor}">${relatorio.nucleoPredominante}</div>
            </div>
            <div class="archetype-box">
                <h3>✨ Arquétipo Dominante</h3>
                <div class="archetype-value">${relatorio.arquetipioDominante}</div>
            </div>
        </div>

        <!-- Thoth Message -->
        <div class="section">
            <h2 class="section-title">📜 Mensagem de Thoth</h2>
            <div class="thoth-message">
                "${relatorio.mensagemThoth}"
            </div>
        </div>

        <!-- Frequencies -->
        <div class="section">
            <h2 class="section-title">🎵 Frequências Recomendadas</h2>
            <div class="frequencies">
                ${relatorio.frequenciasRecomendadas
                  .map((freq) => `<div class="frequency-badge">${freq} Hz</div>`)
                  .join('')}
            </div>
        </div>

        <!-- Commands -->
        <div class="section">
            <h2 class="section-title">⚡ Comandos da Mesa</h2>
            <ul class="commands-list">
                ${relatorio.comandosMesa.map((cmd) => `<li>${cmd}</li>`).join('')}
            </ul>
        </div>

        <!-- 21 Day Plan -->
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
                          .map((decreto: string) => `<li>${decreto}</li>`)
                          .join('')}
                    </ul>
                </div>
            </div>
        </div>
        `
            : ''
        }

        <!-- Footer -->
        <div class="footer">
            <div class="footer-ornament">✦ ☥ ✦</div>
            <p>Sistema THOTH 12 - LUNARA</p>
            <p>Interpretação Vibracional Sagrada</p>
            <p>Documento gerado automaticamente - ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
    </div>
</body>
</html>
  `;

  return html;
}

/**
 * Exportar relatório como PDF usando expo-print
 */
export async function exportReportToPDF(
  relatorio: RelatorioSagrado,
  options: PDFGeneratorOptions = {}
): Promise<{ uri: string } | null> {
  try {
    const html = generateReportHTML(relatorio, options);
    
    // Gerar PDF usando expo-print
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    console.log('PDF gerado com sucesso:', uri);
    return { uri };
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    return null;
  }
}

/**
 * Compartilhar relatório via sistema nativo (WhatsApp, Email, etc)
 */
export async function shareReport(
  relatorio: RelatorioSagrado,
  options: PDFGeneratorOptions = {}
): Promise<boolean> {
  try {
    // Gerar PDF primeiro
    const pdfResult = await exportReportToPDF(relatorio, options);
    
    if (!pdfResult) {
      throw new Error('Falha ao gerar PDF');
    }

    // Compartilhar usando expo-sharing
    const isAvailable = await Sharing.isAvailableAsync();
    
    if (!isAvailable) {
      throw new Error('Compartilhamento não disponível neste dispositivo');
    }

    await Sharing.shareAsync(pdfResult.uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Compartilhar Relatório Sagrado',
      UTI: 'com.adobe.pdf',
    });

    console.log('Relatório compartilhado com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao compartilhar:', error);
    return false;
  }
}

/**
 * Visualizar PDF (abrir no visualizador do sistema)
 */
export async function viewReport(
  relatorio: RelatorioSagrado,
  options: PDFGeneratorOptions = {}
): Promise<boolean> {
  try {
    const html = generateReportHTML(relatorio, options);
    
    // Usar expo-print para visualizar
    await Print.printAsync({
      html,
    });

    return true;
  } catch (error) {
    console.error('Erro ao visualizar PDF:', error);
    return false;
  }
}