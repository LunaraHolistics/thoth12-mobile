import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RelatorioSagrado, ESFERAS_DATA } from '@/lib/thoth-data';
import { getSessaoById } from '@/lib/storage-service';
import { cn } from '@/lib/utils';

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [relatorio, setRelatorio] = useState<RelatorioSagrado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sessao = await getSessaoById(params.sessionId as string);
        if (sessao && sessao.relatorioGerado) {
          setRelatorio(sessao.relatorioGerado);
        } else {
          Alert.alert('Erro', 'Relatório não encontrado');
        }
      } catch (error) {
        console.error('Erro ao carregar relatório:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao carregar o relatório');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.sessionId]);

  const handleExportarPDF = async () => {
    Alert.alert('PDF', 'Funcionalidade de exportação em desenvolvimento');
    // TODO: Implementar exportação de PDF
  };

  if (loading) {
    return (
      <ScreenContainer className="bg-gradient-to-b from-[#1B1B3A] to-[#0F0F1E] items-center justify-center">
        <Text className="text-[#D4AF37] text-lg">Carregando relatório...</Text>
      </ScreenContainer>
    );
  }

  if (!relatorio) {
    return (
      <ScreenContainer className="bg-gradient-to-b from-[#1B1B3A] to-[#0F0F1E] items-center justify-center">
        <View className="gap-4 items-center">
          <Text className="text-[#D4AF37] text-lg">Relatório não encontrado</Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)')}
            className="bg-[#D4AF37] px-6 py-3 rounded-lg"
          >
            <Text className="text-[#1B1B3A] font-bold">Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-gradient-to-b from-[#1B1B3A] to-[#0F0F1E]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="p-6"
      >
        {/* Header */}
        <View className="mb-6 items-center">
          <Text className="text-3xl font-bold text-[#D4AF37] mb-1">Relatório Sagrado</Text>
          <Text className="text-sm text-[#E8D4A8]">THOTH 12 - Interpretação Vibracional</Text>
        </View>

        {/* Top 3 Esferas */}
        <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4 mb-6">
          <Text className="text-lg font-bold text-[#D4AF37] mb-4">Top 3 Esferas Prioritárias</Text>
          {relatorio.top3Esferas.map((esfera, index) => {
            const dados = ESFERAS_DATA[esfera.esfera];
            return (
              <View key={index} className="mb-3 pb-3 border-b border-[#D4AF37]/20 last:border-b-0 last:mb-0 last:pb-0">
                <View className="flex-row items-center justify-between mb-1">
                  <View className="flex-row items-center gap-2 flex-1">
                    <Text className="text-2xl">{dados.icone}</Text>
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-[#D4AF37]">{dados.nome}</Text>
                      <Text className="text-xs text-[#9BA1A6]">{dados.arquetipo}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-lg font-bold text-[#D4AF37]">{esfera.intensidade}%</Text>
                    <Text className="text-xs text-[#E8D4A8] capitalize">{esfera.nucleo}</Text>
                  </View>
                </View>
                {esfera.observacoes && (
                  <Text className="text-xs text-[#9BA1A6] ml-8">{esfera.observacoes}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Núcleo Predominante */}
        <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4 mb-6">
          <Text className="text-sm font-semibold text-[#D4AF37] mb-2">Núcleo Predominante</Text>
          <Text className="text-2xl font-bold text-[#E8D4A8] capitalize mb-2">
            {relatorio.nucleoPredominante}
          </Text>
          <Text className="text-sm text-[#9BA1A6]">Arquétipo: {relatorio.arquetipioDominante}</Text>
        </View>

        {/* Mensagem de Thoth */}
        <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4 mb-6">
          <Text className="text-sm font-semibold text-[#D4AF37] mb-3">Mensagem de Thoth</Text>
          <Text className="text-base text-[#E8D4A8] leading-relaxed italic">
            "{relatorio.mensagemThoth}"
          </Text>
        </View>

        {/* Frequências Recomendadas */}
        <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4 mb-6">
          <Text className="text-sm font-semibold text-[#D4AF37] mb-3">Frequências Recomendadas (Hz)</Text>
          <View className="flex-row flex-wrap gap-2">
            {relatorio.frequenciasRecomendadas.map((freq, index) => (
              <View
                key={index}
                className="bg-[#1B1B3A] border border-[#D4AF37] rounded-lg px-3 py-2"
              >
                <Text className="text-sm font-semibold text-[#D4AF37]">{freq} Hz</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Comandos da Mesa */}
        <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4 mb-6">
          <Text className="text-sm font-semibold text-[#D4AF37] mb-3">Comandos da Mesa</Text>
          {relatorio.comandosMesa.map((comando, index) => (
            <View key={index} className="mb-2 pb-2 border-b border-[#D4AF37]/20 last:border-b-0 last:mb-0 last:pb-0">
              <Text className="text-sm text-[#E8D4A8]">
                <Text className="font-bold">{index + 1}. </Text>
                {comando}
              </Text>
            </View>
          ))}
        </View>

        {/* Plano de 21 Dias */}
        {relatorio.plano21Dias && (
          <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4 mb-6">
            <Text className="text-sm font-semibold text-[#D4AF37] mb-3">Plano de 21 Dias</Text>
            <View className="gap-2">
              <View>
                <Text className="text-xs text-[#9BA1A6]">Fase</Text>
                <Text className="text-base font-semibold text-[#E8D4A8]">
                  {relatorio.plano21Dias.fase}
                </Text>
              </View>
              <View>
                <Text className="text-xs text-[#9BA1A6]">Exercício Prático</Text>
                <Text className="text-sm text-[#E8D4A8]">{relatorio.plano21Dias.exercicioPratico}</Text>
              </View>
              <View>
                <Text className="text-xs text-[#9BA1A6]">Meta Mensurável</Text>
                <Text className="text-sm text-[#E8D4A8]">{relatorio.plano21Dias.metaMensuravel}</Text>
              </View>
              <View>
                <Text className="text-xs text-[#9BA1A6] mb-2">Decretos Diários</Text>
                {relatorio.plano21Dias.decretosDiarios.map((decreto: string, idx: number) => (
                  <Text key={idx} className="text-sm text-[#D4AF37] mb-1">
                    • {decreto}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Botões de Ação */}
        <View className="gap-3 mb-6">
          <TouchableOpacity
            onPress={handleExportarPDF}
            className="bg-gradient-to-r from-[#D4AF37] to-[#E8D4A8] p-4 rounded-lg items-center"
          >
            <Text className="text-[#1B1B3A] font-bold text-lg">Exportar PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(tabs)')}
            className="bg-[#2A2A4A] border border-[#D4AF37] p-4 rounded-lg items-center"
          >
            <Text className="text-[#D4AF37] font-bold text-lg">Voltar ao Início</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="pt-4 border-t border-[#D4AF37]/20">
          <Text className="text-xs text-[#9BA1A6] text-center">
            Sistema THOTH 12 - LUNARA {'\n'}
            Interpretação Vibracional Sagrada
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
