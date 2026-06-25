import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";

/**
 * Home Screen - THOTH 12 Main Entry
 */
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="bg-gradient-to-b from-[#1B1B3A] to-[#0F0F1E]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 gap-8 p-6">
          {/* Hero Section */}
          <View className="items-center gap-4 mt-12">
            <Text className="text-5xl font-bold text-[#D4AF37]">THOTH 12</Text>
            <Text className="text-xl text-[#E8D4A8] text-center font-semibold">
              Sistema de Interpretação Vibracional
            </Text>
            <Text className="text-sm text-[#9BA1A6] text-center leading-relaxed">
              Mapeamento radiônico das 12 esferas para autoconhecimento e transformação
            </Text>
          </View>

          {/* Features Grid */}
          <View className="gap-4">
            <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4">
              <Text className="text-lg font-bold text-[#D4AF37] mb-2">✨ Mapeamento Radiônico</Text>
              <Text className="text-sm text-[#E8D4A8]">
                Avalie a intensidade de cada uma das 12 esferas da vida
              </Text>
            </View>

            <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4">
              <Text className="text-lg font-bold text-[#D4AF37] mb-2">🔮 Interpretação Automática</Text>
              <Text className="text-sm text-[#E8D4A8]">
                Receba diagnósticos, mensagens de Thoth e planos personalizados
              </Text>
            </View>

            <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4">
              <Text className="text-lg font-bold text-[#D4AF37] mb-2">📊 Relatório Sagrado</Text>
              <Text className="text-sm text-[#E8D4A8]">
                Exporte relatórios em PDF com design egípcio ornamental
              </Text>
            </View>

            <View className="bg-[#2A2A4A] border border-[#D4AF37]/30 rounded-lg p-4">
              <Text className="text-lg font-bold text-[#D4AF37] mb-2">📈 Histórico Completo</Text>
              <Text className="text-sm text-[#E8D4A8]">
                Acompanhe evolução com comparação antes/depois de sessões
              </Text>
            </View>
          </View>

          {/* CTA Button */}
          <View className="flex-1 justify-end gap-4">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/input-screen")}
              className="bg-gradient-to-r from-[#D4AF37] to-[#E8D4A8] p-4 rounded-lg items-center active:opacity-80"
            >
              <Text className="text-[#1B1B3A] font-bold text-lg">Iniciar Novo Atendimento</Text>
            </TouchableOpacity>


          </View>

          {/* Footer */}
          <View className="pt-4 border-t border-[#D4AF37]/20">
            <Text className="text-xs text-[#9BA1A6] text-center">
              Sistema THOTH 12 - LUNARA {"\n"}
              Interpretação Vibracional Sagrada
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
