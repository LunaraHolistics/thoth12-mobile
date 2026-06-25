import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  RelatorioSagrado,
  ESFERAS_DATA,
  Esfera,
  obterInterpretacao,
} from "@/lib/thoth-data";
import { getSessaoById } from "@/lib/storage-service";
import { cn } from "@/lib/utils";

// Lista das 12 esferas (definida localmente)
const ESFERAS_LIST: Esfera[] = [
  "corpo",
  "energia_vital",
  "emocoes",
  "mente",
  "espiritualidade",
  "relacionamentos",
  "familia",
  "trabalho",
  "prosperidade",
  "missao",
  "protecao",
  "legado",
];

// Cores dos núcleos
const NUCLEO_COLORS = {
  identidade: { bg: "#6B21A8", text: "#FFFFFF" },
  seguranca: { bg: "#008000", text: "#FFFFFF" },
  merecimento: { bg: "#FFD700", text: "#1B1B3A" },
};

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [relatorio, setRelatorio] = useState<RelatorioSagrado | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllSpheres, setShowAllSpheres] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sessao = await getSessaoById(params.sessionId as string);
        if (sessao && sessao.relatorioGerado) {
          setRelatorio(sessao.relatorioGerado);
        } else {
          Alert.alert("Erro", "Relatório não encontrado");
        }
      } catch (error) {
        console.error("Erro ao carregar relatório:", error);
        Alert.alert("Erro", "Ocorreu um erro ao carregar o relatório");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.sessionId]);

  const handleExportarPDF = async () => {
    if (!relatorio) return;

    try {
      const { exportReportToPDF, shareReport } =
        await import("@/lib/pdf-export");

      // Mostrar opções
      Alert.alert(
        "Exportar Relatório",
        "O que você deseja fazer com o relatório?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "📄 Visualizar PDF",
            onPress: async () => {
              const { viewReport } = await import("@/lib/pdf-export");
              const success = await viewReport(relatorio, {
                clientName: "Cliente THOTH 12",
              });

              if (success) {
                Alert.alert("Sucesso", "PDF aberto para visualização");
              } else {
                Alert.alert("Erro", "Não foi possível abrir o PDF");
              }
            },
          },
          {
            text: "📤 Compartilhar",
            onPress: async () => {
              const success = await shareReport(relatorio, {
                clientName: "Cliente THOTH 12",
              });

              if (success) {
                console.log("Relatório compartilhado");
              } else {
                Alert.alert(
                  "Erro",
                  "Não foi possível compartilhar o relatório",
                );
              }
            },
          },
          {
            text: "💾 Salvar PDF",
            onPress: async () => {
              const result = await exportReportToPDF(relatorio, {
                clientName: "Cliente THOTH 12",
              });

              if (result) {
                Alert.alert("Sucesso", `PDF salvo em:\n${result.uri}`);
              } else {
                Alert.alert("Erro", "Não foi possível salvar o PDF");
              }
            },
          },
        ],
      );
    } catch (error) {
      console.error("Erro ao exportar:", error);
      Alert.alert("Erro", "Ocorreu um erro ao exportar o relatório");
    }
  };

  const handleIniciarCiclo21 = () => {
    Alert.alert(
      "Ciclo de 21 Dias",
      "Você está prestes a iniciar sua jornada de transformação de 21 dias. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Iniciar Jornada",
          onPress: () => {
            router.push({
              pathname: "/(tabs)/cycle-screen",
              params: { sessionId: params.sessionId },
            });
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E] items-center justify-center">
        <Text className="text-4xl mb-4">☥</Text>
        <Text className="text-thothGold text-lg">
          Preparando seu Relatório Sagrado...
        </Text>
      </ScreenContainer>
    );
  }

  if (!relatorio) {
    return (
      <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E] items-center justify-center">
        <View className="gap-4 items-center">
          <Text className="text-4xl">𓁹</Text>
          <Text className="text-thothGold text-lg">
            Relatório não encontrado
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            className="bg-thothGold px-6 py-3 rounded-lg"
          >
            <Text className="text-thothBlue font-bold">Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const nucleoColor = NUCLEO_COLORS[relatorio.nucleoPredominante];

  return (
    <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="p-4"
      >
        {/* Header Ornamental */}
        <View className="mb-6 items-center">
          <Text className="text-4xl mb-2">𓂀</Text>
          <Text className="text-3xl font-bold text-thothGold mb-1">
            Relatório Sagrado
          </Text>
          <Text className="text-sm text-thothRoseGold/80 text-center">
            Sistema de Reprogramação Vibracional
          </Text>
          <View className="flex-row items-center mt-2">
            <View className="h-px w-16 bg-thothGold/50" />
            <Text className="mx-2 text-thothGold">☥</Text>
            <View className="h-px w-16 bg-thothGold/50" />
          </View>
        </View>

        {/* Top 3 Esferas Prioritárias */}
        <View className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-2">🎯</Text>
            <Text className="text-lg font-bold text-thothGold">
              Top 3 Esferas Prioritárias
            </Text>
          </View>
          {relatorio.top3Esferas.map((esfera, index) => {
            const dados = ESFERAS_DATA[esfera.esfera];
            const nucleoColors = NUCLEO_COLORS[esfera.nucleo];
            const medalhas = ["🥇", "🥈", "🥉"];

            return (
              <View
                key={index}
                className="mb-3 pb-3 border-b border-thothGold/20 last:border-b-0 last:mb-0 last:pb-0"
              >
                <View className="flex-row items-center justify-between mb-1">
                  <View className="flex-row items-center gap-2 flex-1">
                    <Text className="text-2xl">{medalhas[index]}</Text>
                    <Text className="text-2xl">{dados.icone}</Text>
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-thothGold">
                        {dados.nome}
                      </Text>
                      <Text className="text-xs text-muted">
                        {dados.arquetipo}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-lg font-bold text-thothGold">
                      {esfera.intensidade}%
                    </Text>
                    <View
                      className="px-2 py-0.5 rounded mt-1"
                      style={{ backgroundColor: nucleoColors.bg }}
                    >
                      <Text
                        className="text-xs font-semibold"
                        style={{ color: nucleoColors.text }}
                      >
                        {esfera.nucleo === "identidade" && "Identidade"}
                        {esfera.nucleo === "seguranca" && "Segurança"}
                        {esfera.nucleo === "merecimento" && "Merecimento"}
                      </Text>
                    </View>
                  </View>
                </View>
                {esfera.observacoes ? (
                  <Text className="text-xs text-muted ml-12 italic">
                    {esfera.observacoes}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>

        {/* Gráfico de Todas as Esferas */}
        <TouchableOpacity
          onPress={() => setShowAllSpheres(!showAllSpheres)}
          className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4"
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-2">📊</Text>
              <Text className="text-sm font-semibold text-thothGold">
                Mapa Completo das 12 Esferas
              </Text>
            </View>
            <Text className="text-thothGold">{showAllSpheres ? "▲" : "▼"}</Text>
          </View>

          {showAllSpheres && (
            <View className="mt-2">
              {ESFERAS_LIST.map((esfera: Esfera) => {
                const dados = ESFERAS_DATA[esfera];
                const mapeamento = relatorio.top3Esferas.find(
                  (m) => m.esfera === esfera,
                );
                const intensidade = mapeamento?.intensidade || 0;

                return (
                  <View key={esfera} className="mb-2">
                    <View className="flex-row items-center justify-between mb-1">
                      <View className="flex-row items-center flex-1">
                        <Text className="text-lg mr-2">{dados.icone}</Text>
                        <Text className="text-xs text-foreground flex-1">
                          {dados.nome}
                        </Text>
                      </View>
                      <Text className="text-xs font-bold text-thothGold w-10 text-right">
                        {intensidade}%
                      </Text>
                    </View>
                    <View className="h-2 bg-background rounded-full overflow-hidden">
                      <View
                        className="h-full bg-thothGold rounded-full"
                        style={{ width: `${intensidade}%` }}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </TouchableOpacity>

        {/* Núcleo Predominante */}
        <View
          className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4"
          style={{ borderLeftWidth: 4, borderLeftColor: nucleoColor.bg }}
        >
          <View className="flex-row items-center mb-2">
            <Text className="text-2xl mr-2">🔮</Text>
            <Text className="text-sm font-semibold text-thothGold">
              Núcleo Predominante
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                className="text-2xl font-bold capitalize"
                style={{ color: nucleoColor.bg }}
              >
                {relatorio.nucleoPredominante === "identidade" && "Identidade"}
                {relatorio.nucleoPredominante === "seguranca" && "Segurança"}
                {relatorio.nucleoPredominante === "merecimento" &&
                  "Merecimento"}
              </Text>
              <Text className="text-sm text-muted mt-1">
                Arquétipo: {relatorio.arquetipioDominante}
              </Text>
            </View>
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: nucleoColor.bg }}
            >
              <Text className="text-3xl" style={{ color: nucleoColor.text }}>
                ☥
              </Text>
            </View>
          </View>
        </View>

        {/* Mensagem de Thoth */}
        <View className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-2">📜</Text>
            <Text className="text-sm font-semibold text-thothGold">
              Mensagem de Thoth
            </Text>
          </View>
          <View className="bg-background/50 rounded-lg p-3 border-l-4 border-thothGold">
            <Text className="text-base text-foreground leading-relaxed italic">
              "{relatorio.mensagemThoth}"
            </Text>
          </View>
        </View>

        {/* Frequências Recomendadas */}
        <View className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-2">🎵</Text>
            <Text className="text-sm font-semibold text-thothGold">
              Frequências Recomendadas (Hz)
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {relatorio.frequenciasRecomendadas.map((freq, index) => (
              <View
                key={index}
                className="bg-thothBlue border border-thothGold rounded-lg px-3 py-2"
              >
                <Text className="text-sm font-semibold text-thothGold">
                  {freq} Hz
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Comandos da Mesa */}
        <View className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-2xl mr-2">⚡</Text>
            <Text className="text-sm font-semibold text-thothGold">
              Comandos da Mesa Radiônica
            </Text>
          </View>
          <View className="flex-row gap-2">
            {relatorio.comandosMesa.map((comando, index) => (
              <View
                key={index}
                className="flex-1 bg-thothGold/10 border border-thothGold/50 rounded-lg p-3 items-center"
              >
                <Text className="text-xs text-muted mb-1">
                  Fase {index + 1}
                </Text>
                <Text className="text-sm font-bold text-thothGold">
                  {comando}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Plano de 21 Dias */}
        {relatorio.plano21Dias && (
          <View className="bg-surface border border-thothGold/30 rounded-lg p-4 mb-4">
            <View className="flex-row items-center mb-3">
              <Text className="text-2xl mr-2">📅</Text>
              <Text className="text-sm font-semibold text-thothGold">
                Plano de 21 Dias
              </Text>
            </View>

            <View className="gap-3">
              <View className="bg-background/50 rounded-lg p-3">
                <Text className="text-xs text-muted mb-1">FASE</Text>
                <Text className="text-base font-semibold text-foreground">
                  Fase {relatorio.plano21Dias.fase}
                </Text>
              </View>

              <View className="bg-background/50 rounded-lg p-3">
                <Text className="text-xs text-muted mb-1">
                  EXERCÍCIO PRÁTICO
                </Text>
                <Text className="text-sm text-foreground">
                  {relatorio.plano21Dias.exercicioPratico}
                </Text>
              </View>

              <View className="bg-background/50 rounded-lg p-3">
                <Text className="text-xs text-muted mb-1">META MENSURÁVEL</Text>
                <Text className="text-sm text-foreground">
                  {relatorio.plano21Dias.metaMensuravel}
                </Text>
              </View>

              <View className="bg-background/50 rounded-lg p-3">
                <Text className="text-xs text-muted mb-2">
                  DECRETOS DIÁRIOS
                </Text>
                {relatorio.plano21Dias.decretosDiarios.map(
                  (decreto: string, idx: number) => (
                    <View
                      key={idx}
                      className="flex-row items-start mb-2 last:mb-0"
                    >
                      <Text className="text-thothGold mr-2">☥</Text>
                      <Text className="text-sm text-foreground flex-1 italic">
                        {decreto}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>
        )}

        {/* Botões de Ação */}
        <View className="gap-3 mb-6">
          <TouchableOpacity
            onPress={handleIniciarCiclo21}
            className="bg-gradient-to-r from-thothGreen to-thothGold p-4 rounded-lg items-center shadow-lg"
          >
            <Text className="text-thothBlue font-bold text-lg">
              🌟 Iniciar Ciclo de 21 Dias
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleExportarPDF}
            className="bg-gradient-to-r from-thothGold to-thothRoseGold p-4 rounded-lg items-center"
          >
            <Text className="text-thothBlue font-bold text-lg">
              📄 Exportar PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            className="bg-surface border border-thothGold p-4 rounded-lg items-center"
          >
            <Text className="text-thothGold font-bold text-lg">
              ☥ Voltar ao Início
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="pt-4 border-t border-thothGold/20 items-center">
          <Text className="text-xs text-muted text-center">
            Sistema THOTH 12 - LUNARA
          </Text>
          <Text className="text-xs text-thothGold/50 mt-1">
            ✨ Interpretação Vibracional Sagrada ✨
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
