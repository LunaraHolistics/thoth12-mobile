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

interface EsferaState {
  intensidade: number;
  nucleo: Nucleo;
  observacoes: string;
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
      // Criar mapeamentos
      const mapeamentos: MapeamentoEsfera[] = ESFERAS_LIST.map((esfera) => ({
        esfera,
        intensidade: esferas[esfera].intensidade,
        nucleo: esferas[esfera].nucleo,
        observacoes: esferas[esfera].observacoes,
      }));

      // Criar sessão
      const sessao: SessaoAtendimento = {
        id: Date.now().toString(),
        clienteId: params.sessionId as string,
        dadosCliente: {
          id: params.sessionId as string,
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

      // Gerar relatório
      const relatorio = gerarRelatorioSagrado(sessao);
      sessao.relatorioGerado = relatorio;

      // Salvar sessão
      await saveSessao(sessao);

      router.push({
        pathname: '/(tabs)/report-screen',
        params: { sessionId: sessao.id },
      });
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao gerar o relatório');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer className="bg-gradient-to-b from-[#1B1B3A] to-[#0F0F1E]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="p-6"
      >
        {/* Header */}
        <View className="mb-6 items-center">
          <Text className="text-3xl font-bold text-[#D4AF37] mb-1">Mapeamento Radiônico</Text>
          <Text className="text-sm text-[#E8D4A8]">Ajuste a intensidade de cada esfera</Text>
        </View>

        {/* Esferas Grid */}
        <View className="gap-3 mb-6">
          {ESFERAS_LIST.map((esfera) => {
            const data = ESFERAS_DATA[esfera];
            const state = esferas[esfera];
            const isExpanded = expandedEsfera === esfera;

            return (
              <View key={esfera}>
                {/* Card da Esfera */}
                <TouchableOpacity
                  onPress={() => setExpandedEsfera(isExpanded ? null : esfera)}
                  className={cn(
                    'bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4',
                    isExpanded && 'border-[#D4AF37]'
                  )}
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center gap-3 flex-1">
                      <Text className="text-2xl">{data.icone}</Text>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-[#D4AF37]">{data.nome}</Text>
                        <Text className="text-xs text-[#9BA1A6]">{data.arquetipo}</Text>
                      </View>
                    </View>
                    <View className="items-center">
                      <Text className="text-lg font-bold text-[#D4AF37]">{state.intensidade}%</Text>
                      <Text className="text-xs text-[#9BA1A6]">{state.nucleo}</Text>
                    </View>
                  </View>

                  {/* Slider */}
                  <View className="mb-2">
                    <Slider
                      style={{ height: 40 }}
                      minimumValue={0}
                      maximumValue={100}
                      value={state.intensidade}
                      onValueChange={(value: number) => handleIntensidadeChange(esfera, value)}
                      minimumTrackTintColor="#D4AF37"
                      maximumTrackTintColor="#1B1B3A"
                      thumbTintColor="#D4AF37"
                    />
                  </View>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <View className="mt-4 pt-4 border-t border-[#D4AF37]/20 gap-4">
                      {/* Seleção de Núcleo */}
                      <View>
                        <Text className="text-xs font-semibold text-[#D4AF37] mb-2">Núcleo Predominante</Text>
                        <View className="flex-row gap-2">
                          {NUCLEOS_LIST.map((nucleo) => (
                            <TouchableOpacity
                              key={nucleo}
                              onPress={() => handleNucleoChange(esfera, nucleo)}
                              className={cn(
                                'flex-1 p-2 rounded border',
                                state.nucleo === nucleo
                                  ? 'bg-[#D4AF37] border-[#D4AF37]'
                                  : 'bg-transparent border-[#D4AF37]/30'
                              )}
                            >
                              <Text
                                className={cn(
                                  'text-xs font-semibold text-center capitalize',
                                  state.nucleo === nucleo ? 'text-[#1B1B3A]' : 'text-[#D4AF37]'
                                )}
                              >
                                {nucleo === 'identidade' && 'Identidade'}
                                {nucleo === 'seguranca' && 'Segurança'}
                                {nucleo === 'merecimento' && 'Merecimento'}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>

                      {/* Observações */}
                      <View>
                        <Text className="text-xs font-semibold text-[#D4AF37] mb-2">Observações</Text>
                        <TextInput
                          className="bg-[#1B1B3A] text-white p-3 rounded border border-[#D4AF37]/30 h-20"
                          placeholder="Observações do terapeuta..."
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
          className="bg-gradient-to-r from-[#D4AF37] to-[#E8D4A8] p-4 rounded-lg items-center mb-4"
        >
          <Text className="text-[#1B1B3A] font-bold text-lg">
            {loading ? 'Gerando Relatório...' : 'Gerar Relatório Sagrado'}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="pt-4 border-t border-[#D4AF37]/20">
          <Text className="text-xs text-[#9BA1A6] text-center">
            Toque em cada esfera para ajustar intensidade e núcleo
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
