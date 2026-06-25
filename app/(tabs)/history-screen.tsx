import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Text, TouchableOpacity, Alert, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { getSessoes, deleteSessao } from '@/lib/storage-service';
import { SessaoAtendimento } from '@/lib/thoth-data';
import { cn } from '@/lib/utils';


export default function HistoryScreen() {
  const router = useRouter();
  const [sessoes, setSessoes] = useState<SessaoAtendimento[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar sessões quando a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      loadSessoes();
    }, [])
  );

  const loadSessoes = async () => {
    try {
      setLoading(true);
      const data = await getSessoes();
      setSessoes(data.sort((a, b) => 
        new Date(b.dataAtendimento).getTime() - new Date(a.dataAtendimento).getTime()
      ));
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
      <ScreenContainer className="bg-gradient-to-b from-[#1B1B3A] to-[#0F0F1E] items-center justify-center">
        <Text className="text-[#D4AF37] text-lg">Carregando histórico...</Text>
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
          <Text className="text-3xl font-bold text-[#D4AF37] mb-1">Histórico de Atendimentos</Text>
          <Text className="text-sm text-[#E8D4A8]">Visualize e gerencie sessões anteriores</Text>
        </View>

        {/* Sessions List */}
        {sessoes.length === 0 ? (
          <View className="flex-1 items-center justify-center gap-4">
            <Text className="text-3xl">📋</Text>
            <Text className="text-lg text-[#E8D4A8] text-center">Nenhuma sessão registrada</Text>
            <Text className="text-sm text-[#9BA1A6] text-center">
              Comece um novo atendimento para criar o primeiro registro
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/input-screen')}
              className="bg-[#D4AF37] px-6 py-3 rounded-lg mt-4"
            >
              <Text className="text-[#1B1B3A] font-bold">Novo Atendimento</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="gap-3 mb-6">
            {sessoes.map((sessao) => (
              <View
                key={sessao.id}
                className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg overflow-hidden"
              >
                {/* Session Header */}
                <TouchableOpacity
                  onPress={() => handleViewRelatorio(sessao.id)}
                  className="p-4 active:opacity-70"
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-[#D4AF37]">
                        {sessao.dadosCliente.nome}
                      </Text>
                      <Text className="text-xs text-[#9BA1A6] mt-1">
                        {formatDate(sessao.dataAtendimento)}
                      </Text>
                    </View>
                    <View className="bg-[#1B1B3A] px-3 py-1 rounded">
                      <Text className="text-xs font-semibold text-[#D4AF37]">
                        {sessao.relatorioGerado ? '✓ Relatório' : 'Pendente'}
                      </Text>
                    </View>
                  </View>

                  {/* Problem Summary */}
                  <Text className="text-sm text-[#E8D4A8] leading-relaxed">
                    {sessao.dadosCliente.problemaPrincipal}
                  </Text>

                  {/* Stats */}
                  {sessao.relatorioGerado && (
                    <View className="flex-row gap-4 mt-3 pt-3 border-t border-[#D4AF37]/20">
                      <View>
                        <Text className="text-xs text-[#9BA1A6]">Núcleo Predominante</Text>
                        <Text className="text-sm font-semibold text-[#D4AF37] capitalize">
                          {sessao.relatorioGerado.nucleoPredominante}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-xs text-[#9BA1A6]">Arquétipo</Text>
                        <Text className="text-sm font-semibold text-[#D4AF37]">
                          {sessao.relatorioGerado.arquetipioDominante}
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Actions */}
                <View className="flex-row border-t border-[#D4AF37]/20">
                  <TouchableOpacity
                    onPress={() => handleViewRelatorio(sessao.id)}
                    className="flex-1 p-3 items-center border-r border-[#D4AF37]/20 active:opacity-70"
                  >
                    <Text className="text-sm font-semibold text-[#D4AF37]">Ver Relatório</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteSessao(sessao.id, sessao.dadosCliente.nome)}
                    className="flex-1 p-3 items-center active:opacity-70"
                  >
                    <Text className="text-sm font-semibold text-[#F87171]">Deletar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        {sessoes.length > 0 && (
          <View className="pt-4 border-t border-[#D4AF37]/20 mt-auto">
            <Text className="text-xs text-[#9BA1A6] text-center">
              Total de {sessoes.length} sessão{sessoes.length !== 1 ? 's' : ''} registrada{sessoes.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
