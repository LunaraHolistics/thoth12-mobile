import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

/**
 * Home Screen - THOTH 12 Main Entry
 * Tela inicial com design egípcio ornamental
 */
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="bg-gradient-to-b from-thothBlue to-[#0F0F1E]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-6 p-6">
          {/* Hero Section com Ornamentos */}
          <View className="items-center gap-3 mt-8">
            {/* Ornamento Superior */}
            <View className="flex-row items-center mb-2">
              <View className="h-px w-12 bg-thothGold/50" />
              <Text className="mx-3 text-thothGold text-2xl">𓂀</Text>
              <View className="h-px w-12 bg-thothGold/50" />
            </View>

            <Text className="text-5xl font-bold text-thothGold tracking-wider">THOTH 12</Text>
            <Text className="text-xl text-thothRoseGold/80 text-center font-semibold">
              Sistema de Reprogramação Vibracional
            </Text>
            <Text className="text-sm text-muted text-center leading-relaxed px-4">
              Mapeamento radiônico das 12 esferas para autoconhecimento e transformação profunda
            </Text>

            {/* Ornamento Inferior */}
            <View className="flex-row items-center mt-2">
              <View className="h-px w-12 bg-thothGold/50" />
              <Text className="mx-3 text-thothGold text-xl">☥</Text>
              <View className="h-px w-12 bg-thothGold/50" />
            </View>
          </View>

          {/* Features Grid */}
          <View className="gap-3">
            {/* Feature 1 */}
            <View className="bg-surface border border-thothGold/30 rounded-lg p-4">
              <View className="flex-row items-start gap-3">
                <Text className="text-3xl">✨</Text>
                <View className="flex-1">
                  <Text className="text-base font-bold text-thothGold mb-1">
                    Mapeamento Radiônico
                  </Text>
                  <Text className="text-sm text-foreground">
                    Avalie a intensidade de cada uma das 12 esferas da vida
                  </Text>
                </View>
              </View>
            </View>

            {/* Feature 2 */}
            <View className="bg-surface border border-thothGold/30 rounded-lg p-4">
              <View className="flex-row items-start gap-3">
                <Text className="text-3xl">🔮</Text>
                <View className="flex-1">
                  <Text className="text-base font-bold text-thothGold mb-1">
                    Interpretação Automática
                  </Text>
                  <Text className="text-sm text-foreground">
                    Receba diagnósticos, mensagens de Thoth e planos personalizados
                  </Text>
                </View>
              </View>
            </View>

            {/* Feature 3 */}
            <View className="bg-surface border border-thothGold/30 rounded-lg p-4">
              <View className="flex-row items-start gap-3">
                <Text className="text-3xl">📊</Text>
                <View className="flex-1">
                  <Text className="text-base font-bold text-thothGold mb-1">
                    Relatório Sagrado
                  </Text>
                  <Text className="text-sm text-foreground">
                    Exporte relatórios em PDF com design egípcio ornamental
                  </Text>
                </View>
              </View>
            </View>

            {/* Feature 4 */}
            <View className="bg-surface border border-thothGold/30 rounded-lg p-4">
              <View className="flex-row items-start gap-3">
                <Text className="text-3xl">📈</Text>
                <View className="flex-1">
                  <Text className="text-base font-bold text-thothGold mb-1">
                    Histórico Completo
                  </Text>
                  <Text className="text-sm text-foreground">
                    Acompanhe evolução com comparação antes/depois de sessões
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* CTA Buttons */}
          <View className="flex-1 justify-end gap-3">
            {/* Botão Principal */}
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/input-screen")}
              className="bg-gradient-to-r from-thothGold to-thothRoseGold p-4 rounded-lg items-center active:opacity-80 shadow-lg"
            >
              <Text className="text-thothBlue font-bold text-lg">🌟 Iniciar Novo Atendimento</Text>
            </TouchableOpacity>

            {/* Botão Secundário */}
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/history-screen")}
              className="bg-surface border border-thothGold p-4 rounded-lg items-center active:opacity-80"
            >
              <Text className="text-thothGold font-bold text-lg">📋 Ver Histórico</Text>
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
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}