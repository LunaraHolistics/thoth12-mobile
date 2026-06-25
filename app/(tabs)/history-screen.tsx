import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { getSessoes, deleteSessao } from '@/lib/storage-service';
import { SessaoAtendimento } from '@/lib/thoth-data';

// Cores dos núcleos
const NUCLEO_COLORS = {
  identidade: { bg: '#6B21A8', text: '#FFFFFF' },
  seguranca: { bg: '#008000', text: '#FFFFFF' },
  merecimento: { bg: '#FFD700', text: '#1B1B3A' },
};

export default function HistoryScreen() {
  const router = useRouter();
  const [sessoes, setSessoes] = useState<SessaoAtendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadSessoes();
    }, [])
  );

  const loadSessoes = async () => {
    try {
      setLoading(true);
      const data = await getSessoes();
      setSessoes(
        data.sort(
          (a, b) =>
            new Date(b.dataAtendimento).getTime() - new Date(a.dataAtendimento).getTime()
        )
      );
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao carregar o histórico');
    } finally {
      setLoading(false);
    }
  };

  const handleViewRelatorio = (sessaoId: string) => {
    router.push({
      pathname: '/(tabs)/report-screen',
      params: { sessionId: sessaoId },
    });
  };

  const handleDeleteSessao = async (sessaoId: string, clienteName: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja deletar a sessão de ${clienteName}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              await deleteSessao(sessaoId);
              await loadSessoes();
              Alert.alert('Sucesso', 'Sessão deletada com sucesso');
            } catch (error) {
              Alert.alert('Erro', 'Ocorreu um erro ao deletar a sessão');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E] items-center justify-center">
        <Text className="text-4xl mb-4">☥</Text>
        <Text className="text-thothGold text-lg">Carregando histórico...</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="p-4"
      >
        {/* Header com Ornamentos */}
        <View className="mb-6 items-center">
          <Text className="text-4xl mb-2">📋</Text>
          <Text className="text-3xl font-bold text-thothGold mb-1">Histórico de Atendimentos</Text>
          <Text className="text-sm text-thothRoseGold/80 text-center">
            Visualize e gerencie sessões anteriores
          </Text>
          <View className="flex-row items-center mt-2">
            <View className="h-px w-16 bg-thothGold/50" />
            <Text className="mx-2 text-thothGold">☥</Text>
            <View className="h-px w-16 bg-thothGold/50" />
          </View>
        </View>

        {/* Sessions List */}
        {sessoes.length === 0 ? (
          <View className="flex-1 items-center justify-center gap-4">
            <Text className="text-5xl">📋</Text>
            <Text className="text-lg text-foreground text-center">Nenhuma sessão registrada</Text>
            <Text className="text-sm text-muted text-center">
              Comece um novo atendimento para criar o primeiro registro
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/input-screen')}
              className="bg-gradient-to-r from-thothGold to-thothRoseGold px-6 py-3 rounded-lg mt-4"
            >
              <Text className="text-thothBlue font-bold">✨ Novo Atendimento</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-3 mb-6">
            {sessoes.map((sessao) => {
              const nucleoColor = sessao.relatorioGerado
                ? NUCLEO_COLORS[sessao.relatorioGerado.nucleoPredominante]
                : null;

              return (
                <View
                  key={sessao.id}
                  className="bg-surface border border-thothGold/30 rounded-lg overflow-hidden"
                >
                  {/* Session Header */}
                  <TouchableOpacity
                    onPress={() => handleViewRelatorio(sessao.id)}
                    className="p-4 active:opacity-70"
                  >
                    <View className="flex-row items-start justify-between mb-2">
                      <View className="flex-1">
                        <Text className="text-lg font-bold text-thothGold">
                          {sessao.dadosCliente.nome}
                        </Text>
                        <Text className="text-xs text-muted mt-1">
                          📅 {formatDate(sessao.dataAtendimento)}
                        </Text>
                      </View>
                      <View
                        className="px-3 py-1 rounded"
                        style={{
                          backgroundColor: sessao.relatorioGerado ? '#D4AF37' : '#2A2A4A',
                        }}
                      >
                        <Text
                          className="text-xs font-semibold"
                          style={{
                            color: sessao.relatorioGerado ? '#1B1B3A' : '#D4AF37',
                          }}
                        >
                          {sessao.relatorioGerado ? '✓ Relatório' : 'Pendente'}
                        </Text>
                      </View>
                    </View>

                    {/* Problem Summary */}
                    <Text className="text-sm text-foreground leading-relaxed">
                      {sessao.dadosCliente.problemaPrincipal}
                    </Text>

                    {/* Stats */}
                    {sessao.relatorioGerado && nucleoColor && (
                      <View className="flex-row gap-4 mt-3 pt-3 border-t border-thothGold/20">
                        <View>
                          <Text className="text-xs text-muted">Núcleo Predominante</Text>
                          <View
                            className="px-2 py-1 rounded mt-1"
                            style={{ backgroundColor: nucleoColor.bg }}
                          >
                            <Text
                              className="text-xs font-semibold capitalize"
                              style={{ color: nucleoColor.text }}
                            >
                              {sessao.relatorioGerado.nucleoPredominante === 'identidade' &&
                                'Identidade'}
                              {sessao.relatorioGerado.nucleoPredominante === 'seguranca' &&
                                'Segurança'}
                              {sessao.relatorioGerado.nucleoPredominante === 'merecimento' &&
                                'Merecimento'}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text className="text-xs text-muted">Arquétipo</Text>
                          <Text className="text-sm font-semibold text-thothGold mt-1">
                            {sessao.relatorioGerado.arquetipioDominante}
                          </Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>

                  {/* Actions */}
                  <View className="flex-row border-t border-thothGold/20">
                    <TouchableOpacity
                      onPress={() => handleViewRelatorio(sessao.id)}
                      className="flex-1 p-3 items-center border-r border-thothGold/20 active:opacity-70"
                    >
                      <Text className="text-sm font-semibold text-thothGold">📊 Ver Relatório</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteSessao(sessao.id, sessao.dadosCliente.nome)}
                      className="flex-1 p-3 items-center active:opacity-70"
                    >
                      <Text className="text-sm font-semibold text-error">🗑️ Deletar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Footer */}
        {sessoes.length > 0 && (
          <View className="pt-4 border-t border-thothGold/20 items-center mt-auto">
            <Text className="text-xs text-muted text-center">
              Total de {sessoes.length} sessão{sessoes.length !== 1 ? 's' : ''} registrada
              {sessoes.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}