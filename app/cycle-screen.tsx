import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getSessaoById } from '@/lib/storage-service';
import { SessaoAtendimento, RelatorioSagrado } from '@/lib/thoth-data';

// Cores das fases
const PHASE_COLORS = {
  limpeza: { bg: '#3B82F6', text: '#FFFFFF', name: 'Limpeza' },
  reorganizacao: { bg: '#F59E0B', text: '#FFFFFF', name: 'Reorganização' },
  ancoragem: { bg: '#10B981', text: '#FFFFFF', name: 'Ancoragem' },
};

export default function CycleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [sessao, setSessao] = useState<SessaoAtendimento | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessao();
  }, [params.sessionId]);

  const loadSessao = async () => {
    try {
      const data = await getSessaoById(params.sessionId as string);
      if (data) {
        setSessao(data);
        // Carregar dias concluídos do storage (simulado)
        setCompletedDays([]); // TODO: Carregar do storage real
      } else {
        Alert.alert('Erro', 'Sessão não encontrada');
      }
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados');
    } finally {
      setLoading(false);
    }
  };

  const getPhase = (day: number): keyof typeof PHASE_COLORS => {
    if (day <= 7) return 'limpeza';
    if (day <= 14) return 'reorganizacao';
    return 'ancoragem';
  };

  const handleCompleteDay = () => {
    if (!feedback.trim()) {
      Alert.alert('Atenção', 'Por favor, registre seu feedback antes de concluir');
      return;
    }

    const newCompletedDays = [...completedDays, currentDay];
    setCompletedDays(newCompletedDays);
    setFeedback('');

    Alert.alert(
      '✨ Dia Concluído!',
      `Parabéns! Você completou o dia ${currentDay} do seu ciclo de transformação.`,
      [
        {
          text: 'Continuar',
          onPress: () => {
            if (currentDay < 21) {
              setCurrentDay(currentDay + 1);
            } else {
              Alert.alert(
                '🎉 Ciclo Completo!',
                'Parabéns! Você completou todo o Ciclo de 21 Dias! Sua transformação está apenas começando.',
                [{ text: 'Celebrar', onPress: () => router.push('/(tabs)') }]
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E] items-center justify-center">
        <Text className="text-4xl mb-4">☥</Text>
        <Text className="text-thothGold text-lg">Carregando seu ciclo...</Text>
      </ScreenContainer>
    );
  }

  if (!sessao || !sessao.relatorioGerado) {
    return (
      <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E] items-center justify-center">
        <View className="gap-4 items-center">
          <Text className="text-4xl">📅</Text>
          <Text className="text-thothGold text-lg">Ciclo não encontrado</Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)')}
            className="bg-thothGold px-6 py-3 rounded-lg"
          >
            <Text className="text-thothBlue font-bold">Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const phase = getPhase(currentDay);
  const phaseColor = PHASE_COLORS[phase];
  const progress = (completedDays.length / 21) * 100;

  return (
    <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="p-4"
      >
        {/* Header */}
        <View className="mb-6 items-center">
          <Text className="text-4xl mb-2">📅</Text>
          <Text className="text-3xl font-bold text-thothGold mb-1">Ciclo de 21 Dias</Text>
          <Text className="text-sm text-thothRoseGold/80 text-center">
            Sua jornada de transformação diária
          </Text>
          <View className="flex-row items-center mt-2">
            <View className="h-px w-16 bg-thothGold/50" />
            <Text className="mx-2 text-thothGold">☥</Text>
            <View className="h-px w-16 bg-thothGold/50" />
          </View>
        </View>

        {/* Progress Bar */}
        <View className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm font-semibold text-thothGold">Progresso Geral</Text>
            <Text className="text-sm font-bold text-thothGold">
              {completedDays.length}/21 dias
            </Text>
          </View>
          <View className="h-3 bg-background rounded-full overflow-hidden">
            <View
              className="h-full bg-thothGold rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>

        {/* Current Day Card */}
        <View
          className="bg-surface border-2 rounded-lg p-4 mb-4"
          style={{ borderColor: phaseColor.bg }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-xs text-muted mb-1">DIA ATUAL</Text>
              <Text className="text-3xl font-bold text-thothGold">Dia {currentDay}</Text>
            </View>
            <View
              className="px-4 py-2 rounded-lg"
              style={{ backgroundColor: phaseColor.bg }}
            >
              <Text className="text-sm font-bold" style={{ color: phaseColor.text }}>
                FASE {phaseColor.name.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Decreto do Dia */}
          <View className="bg-background/50 rounded-lg p-3 mb-3 border-l-4 border-thothGold">
            <Text className="text-xs text-muted mb-1">📿 DECRETO DO DIA</Text>
            <Text className="text-sm text-foreground italic leading-relaxed">
              {sessao.relatorioGerado.plano21Dias?.decretosDiarios[0] || 
               'Reconheço minha verdadeira essência e permito que a transformação floresça.'}
            </Text>
          </View>

          {/* Exercício do Dia */}
          <View className="bg-background/50 rounded-lg p-3 mb-3">
            <Text className="text-xs text-muted mb-1">🎯 EXERCÍCIO PRÁTICO</Text>
            <Text className="text-sm text-foreground">
              {sessao.relatorioGerado.plano21Dias?.exercicioPratico || 
               'Meditação guiada de 10 minutos'}
            </Text>
          </View>

          {/* Meta do Dia */}
          <View className="bg-background/50 rounded-lg p-3 mb-3">
            <Text className="text-xs text-muted mb-1">🎯 META DO DIA</Text>
            <Text className="text-sm text-foreground">
              {sessao.relatorioGerado.plano21Dias?.metaMensuravel || 
               'Completar o exercício e registrar feedback'}
            </Text>
          </View>

          {/* Feedback */}
          <View className="mb-3">
            <Text className="text-xs text-muted mb-1">💭 SEU FEEDBACK</Text>
            <TextInput
              className="bg-background text-foreground p-3 rounded-lg border border-thothGold/30 h-24"
              placeholder="Como você se sentiu hoje? O que observou?"
              placeholderTextColor="#9BA1A6"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>

          {/* Botão Concluir Dia */}
          <TouchableOpacity
            onPress={handleCompleteDay}
            className="bg-gradient-to-r from-thothGold to-thothRoseGold p-4 rounded-lg items-center"
          >
            <Text className="text-thothBlue font-bold text-lg">
              ✨ Concluir Dia {currentDay}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Days Grid */}
        <View className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4">
          <Text className="text-sm font-semibold text-thothGold mb-3">CALENDÁRIO DO CICLO</Text>
          <View className="flex-row flex-wrap gap-2">
            {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => {
              const isCompleted = completedDays.includes(day);
              const isCurrent = day === currentDay;
              const dayPhase = getPhase(day);
              const dayColor = PHASE_COLORS[dayPhase];

              return (
                <View
                  key={day}
                  className={`w-10 h-10 rounded-lg items-center justify-center border-2 ${
                    isCompleted
                      ? 'bg-thothGold border-thothGold'
                      : isCurrent
                      ? 'bg-transparent border-thothGold'
                      : 'bg-background border-muted/30'
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      isCompleted
                        ? 'text-thothBlue'
                        : isCurrent
                        ? 'text-thothGold'
                        : 'text-muted'
                    }`}
                  >
                    {day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)')}
          className="bg-surface border border-thothGold p-4 rounded-lg items-center mb-6"
        >
          <Text className="text-thothGold font-bold text-lg">☥ Voltar ao Início</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="pt-4 border-t border-thothGold/20 items-center">
          <Text className="text-xs text-muted text-center">
            Sistema THOTH 12 - LUNARA
          </Text>
          <Text className="text-xs text-thothGold/50 mt-1">
            ✨ Sua transformação é diária ✨
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}