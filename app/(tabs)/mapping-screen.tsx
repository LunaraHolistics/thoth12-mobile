import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, Alert, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  ESFERAS_DATA,
  NUCLEOS_DATA,
  MapeamentoEsfera,
  Esfera,
  Nucleo,
  SessaoAtendimento,
  gerarRelatorioSagrado,
} from '@/lib/thoth-data';
import { saveSessao, getClienteById } from '@/lib/storage-service';
import { cn } from '@/lib/utils';

const ESFERAS_LIST: Esfera[] = [
  'corpo',
  'energia_vital',
  'emocoes',
  'mente',
  'espiritualidade',
  'relacionamentos',
  'familia',
  'trabalho',
  'prosperidade',
  'missao',
  'protecao',
  'legado',
];

const NUCLEOS_LIST: Nucleo[] = ['identidade', 'seguranca', 'merecimento'];

// Cores dos núcleos
const NUCLEO_COLORS = {
  identidade: { bg: '#6B21A8', border: '#8B5CF6', text: '#FFFFFF' },
  seguranca: { bg: '#008000', border: '#00A000', text: '#FFFFFF' },
  merecimento: { bg: '#FFD700', border: '#FFC700', text: '#1B1B3A' },
};

interface EsferaState {
  intensidade: number;
  nucleo: Nucleo;
  observacoes: string;
  comando: 'LIMPAR' | 'REORGANIZAR' | 'ANCORAR';
}

export default function MappingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [esferas, setEsferas] = useState<Record<Esfera, EsferaState>>(() => {
    const initial: Record<Esfera, EsferaState> = {} as any;
    ESFERAS_LIST.forEach((esfera) => {
      initial[esfera] = {
        intensidade: 50,
        nucleo: 'identidade',
        observacoes: '',
        comando: 'REORGANIZAR',
      };
    });
    return initial;
  });

  const [expandedEsfera, setExpandedEsfera] = useState<Esfera | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIntensidadeChange = (esfera: Esfera, value: number) => {
    setEsferas((prev) => ({
      ...prev,
      [esfera]: {
        ...prev[esfera],
        intensidade: Math.round(value),
      },
    }));
  };

  const handleNucleoChange = (esfera: Esfera, nucleo: Nucleo) => {
    setEsferas((prev) => ({
      ...prev,
      [esfera]: {
        ...prev[esfera],
        nucleo,
      },
    }));
  };

  const handleComandoChange = (esfera: Esfera, comando: 'LIMPAR' | 'REORGANIZAR' | 'ANCORAR') => {
    setEsferas((prev) => ({
      ...prev,
      [esfera]: {
        ...prev[esfera],
        comando,
      },
    }));
  };

  const handleObservacoesChange = (esfera: Esfera, text: string) => {
    setEsferas((prev) => ({
      ...prev,
      [esfera]: {
        ...prev[esfera],
        observacoes: text,
      },
    }));
  };

  const handleGerarRelatorio = async () => {
    setLoading(true);

    try {
      const mapeamentos: MapeamentoEsfera[] = ESFERAS_LIST.map((esfera) => ({
        esfera,
        intensidade: esferas[esfera].intensidade,
        nucleo: esferas[esfera].nucleo,
        observacoes: esferas[esfera].observacoes,
      }));

      const sessao: SessaoAtendimento = {
        id: Date.now().toString(),
        clienteId: (params.sessionId as string) || 'default',
        dadosCliente: {
          id: (params.sessionId as string) || 'default',
          nome: '',
          dataNascimento: '',
          cidade: '',
          estado: '',
          problemaPrincipal: '',
          dataAtendimento: new Date().toISOString(),
        },
        mapeamentos,
        dataAtendimento: new Date().toISOString(),
      };

      const relatorio = gerarRelatorioSagrado(sessao);
      sessao.relatorioGerado = relatorio;

      await saveSessao(sessao);

      router.push({
        pathname: '/(tabs)/report-screen',
        params: { sessionId: sessao.id },
      });
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao gerar o relatório');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter cor da intensidade
  const getIntensidadeColor = (intensidade: number) => {
    if (intensidade >= 75) return '#EF4444'; // Vermelho - alta intensidade
    if (intensidade >= 50) return '#F59E0B'; // Amarelo - média
    if (intensidade >= 25) return '#22C55E'; // Verde - baixa
    return '#3B82F6'; // Azul - muito baixa
  };

  return (
    <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="p-4"
      >
        {/* Header com Ornamento */}
        <View className="mb-6 items-center">
          <Text className="text-4xl mb-2">𓂀</Text>
          <Text className="text-3xl font-bold text-thothGold mb-1">Mesa Radiônica</Text>
          <Text className="text-sm text-thothRoseGold/80 text-center px-4">
            Mapeamento das 12 Esferas da Vida
          </Text>
          <View className="flex-row items-center mt-2">
            <View className="h-px w-16 bg-thothGold/50" />
            <Text className="mx-2 text-thothGold">☥</Text>
            <View className="h-px w-16 bg-thothGold/50" />
          </View>
        </View>

        {/* Legenda dos Núcleos */}
        <View className="bg-surface/50 rounded-lg p-3 mb-4 border border-thothGold/20">
          <Text className="text-xs text-thothGold font-semibold mb-2 text-center">
            NÚCLEOS PRIMÁRIOS
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <View className="w-3 h-3 rounded-full bg-thothPurple mb-1" />
              <Text className="text-xs text-foreground">Identidade</Text>
            </View>
            <View className="items-center">
              <View className="w-3 h-3 rounded-full bg-thothGreen mb-1" />
              <Text className="text-xs text-foreground">Segurança</Text>
            </View>
            <View className="items-center">
              <View className="w-3 h-3 rounded-full bg-thothRoseGold mb-1" />
              <Text className="text-xs text-foreground">Merecimento</Text>
            </View>
          </View>
        </View>

        {/* Esferas Grid */}
        <View className="gap-3 mb-6">
          {ESFERAS_LIST.map((esfera, index) => {
            const data = ESFERAS_DATA[esfera];
            const state = esferas[esfera];
            const isExpanded = expandedEsfera === esfera;
            const nucleoColor = NUCLEO_COLORS[state.nucleo];
            const intensidadeColor = getIntensidadeColor(state.intensidade);

            return (
              <View key={esfera}>
                {/* Card da Esfera */}
                <TouchableOpacity
                  onPress={() => setExpandedEsfera(isExpanded ? null : esfera)}
                  activeOpacity={0.8}
                  className={cn(
                    'bg-surface border rounded-lg p-4',
                    isExpanded ? 'border-thothGold' : 'border-thothGold/20'
                  )}
                  style={{
                    borderLeftWidth: 4,
                    borderLeftColor: nucleoColor.bg,
                  }}
                >
                  {/* Cabeçalho da Esfera */}
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center gap-3 flex-1">
                      <View className="w-10 h-10 rounded-full bg-thothBlue/50 items-center justify-center">
                        <Text className="text-2xl">{data.icone}</Text>
                      </View>
                      <View className="flex-1">
                        <View className="flex-row items-center gap-2">
                          <Text className="text-xs text-muted">#{index + 1}</Text>
                          <Text className="text-base font-semibold text-thothGold">{data.nome}</Text>
                        </View>
                        <Text className="text-xs text-muted">{data.arquetipo}</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text className="text-lg font-bold" style={{ color: intensidadeColor }}>
                        {state.intensidade}%
                      </Text>
                      <View
                        className="px-2 py-0.5 rounded mt-1"
                        style={{ backgroundColor: nucleoColor.bg }}
                      >
                        <Text className="text-xs font-semibold" style={{ color: nucleoColor.text }}>
                          {state.nucleo === 'identidade' && 'Identidade'}
                          {state.nucleo === 'seguranca' && 'Segurança'}
                          {state.nucleo === 'merecimento' && 'Merecimento'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Barra de Progresso */}
                  <View className="h-2 bg-background rounded-full mb-2 overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${state.intensidade}%`,
                        backgroundColor: intensidadeColor,
                      }}
                    />
                  </View>

                  {/* Slider */}
                  <Slider
                    style={{ height: 30 }}
                    minimumValue={0}
                    maximumValue={100}
                    value={state.intensidade}
                    onValueChange={(value: number) => handleIntensidadeChange(esfera, value)}
                    minimumTrackTintColor={intensidadeColor}
                    maximumTrackTintColor="#2A2A4A"
                    thumbTintColor={nucleoColor.bg}
                  />

                  {/* Conteúdo Expandido */}
                  {isExpanded && (
                    <View className="mt-4 pt-4 border-t border-thothGold/20 gap-4">
                      {/* Seleção de Núcleo */}
                      <View>
                        <Text className="text-xs font-semibold text-thothGold mb-2">
                          NÚCLEO PREDOMINANTE
                        </Text>
                        <View className="flex-row gap-2">
                          {NUCLEOS_LIST.map((nucleo) => {
                            const isSelected = state.nucleo === nucleo;
                            const colors = NUCLEO_COLORS[nucleo];
                            return (
                              <TouchableOpacity
                                key={nucleo}
                                onPress={() => handleNucleoChange(esfera, nucleo)}
                                className={cn(
                                  'flex-1 p-2 rounded-lg border-2',
                                  isSelected ? 'border-transparent' : 'border-muted/30'
                                )}
                                style={{
                                  backgroundColor: isSelected ? colors.bg : 'transparent',
                                }}
                              >
                                <Text
                                  className="text-xs font-bold text-center capitalize"
                                  style={{
                                    color: isSelected ? colors.text : '#9BA1A6',
                                  }}
                                >
                                  {nucleo === 'identidade' && 'Identidade'}
                                  {nucleo === 'seguranca' && 'Segurança'}
                                  {nucleo === 'merecimento' && 'Merecimento'}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>

                      {/* Comandos da Mesa */}
                      <View>
                        <Text className="text-xs font-semibold text-thothGold mb-2">
                          COMANDO DA MESA
                        </Text>
                        <View className="flex-row gap-2">
                          {(['LIMPAR', 'REORGANIZAR', 'ANCORAR'] as const).map((comando) => {
                            const isSelected = state.comando === comando;
                            return (
                              <TouchableOpacity
                                key={comando}
                                onPress={() => handleComandoChange(esfera, comando)}
                                className={cn(
                                  'flex-1 p-2 rounded-lg border-2',
                                  isSelected
                                    ? 'bg-thothGold border-thothGold'
                                    : 'bg-transparent border-thothGold/30'
                                )}
                              >
                                <Text
                                  className={cn(
                                    'text-xs font-bold text-center',
                                    isSelected ? 'text-thothBlue' : 'text-thothGold'
                                  )}
                                >
                                  {comando}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>

                      {/* Observações */}
                      <View>
                        <Text className="text-xs font-semibold text-thothGold mb-2">
                          OBSERVAÇÕES DO TERAPEUTA
                        </Text>
                        <TextInput
                          className="bg-background text-foreground p-3 rounded-lg border border-thothGold/30 h-20"
                          placeholder="Registre suas observações..."
                          placeholderTextColor="#9BA1A6"
                          multiline
                          numberOfLines={3}
                          textAlignVertical="top"
                          value={state.observacoes}
                          onChangeText={(text) => handleObservacoesChange(esfera, text)}
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Botão Gerar Relatório */}
        <TouchableOpacity
          onPress={handleGerarRelatorio}
          disabled={loading}
          activeOpacity={0.8}
          className="bg-gradient-to-r from-thothGold to-thothRoseGold p-4 rounded-lg items-center mb-4 shadow-lg"
        >
          <Text className="text-thothBlue font-bold text-lg">
            {loading ? '⏳ Gerando Relatório...' : '✨ Gerar Relatório Sagrado'}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="pt-4 border-t border-thothGold/20 items-center">
          <Text className="text-xs text-muted text-center">
            Toque em cada esfera para ajustar os parâmetros
          </Text>
          <Text className="text-xs text-thothGold/50 mt-1">☥ THOTH 12 ☥</Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}