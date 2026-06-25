import { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ESFERAS_DATA, NUCLEOS_DATA } from "@/lib/thoth-data";
import type { Esfera, Nucleo, MapeamentoEsfera } from "@/lib/thoth-data";

/**
 * Tela do Questionário THOTH 12
 * Avalia as 12 esferas da vida com intensidade e núcleo
 */
export default function QuestionnaireScreen() {
  const router = useRouter();
  
  // Estado para armazenar os mapeamentos
  const [mapeamentos, setMapeamentos] = useState<MapeamentoEsfera[]>(
    Object.keys(ESFERAS_DATA).map((esfera) => ({
      esfera: esfera as Esfera,
      intensidade: 50,
      nucleo: "identidade" as Nucleo,
      observacoes: "",
    }))
  );

  // Estado para observações gerais
  const [observacoesGerais, setObservacoesGerais] = useState("");

  /**
   * Atualiza a intensidade de uma esfera
   */
  const updateIntensidade = (esfera: Esfera, valor: number) => {
    setMapeamentos((prev) =>
      prev.map((m) => (m.esfera === esfera ? { ...m, intensidade: valor } : m))
    );
  };

  /**
   * Atualiza o núcleo de uma esfera
   */
  const updateNucleo = (esfera: Esfera, nucleo: Nucleo) => {
    setMapeamentos((prev) =>
      prev.map((m) => (m.esfera === esfera ? { ...m, nucleo } : m))
    );
  };

  /**
   * Atualiza as observações de uma esfera
   */
  const updateObservacoes = (esfera: Esfera, texto: string) => {
    setMapeamentos((prev) =>
      prev.map((m) => (m.esfera === esfera ? { ...m, observacoes: texto } : m))
    );
  };

  /**
   * Salva o questionário e navega para a próxima tela
   */
  const handleSalvar = () => {
    // Validação básica
    const temIntensidadeZero = mapeamentos.some((m) => m.intensidade === 0);
    
    if (temIntensidadeZero) {
      Alert.alert(
        "Atenção",
        "Por favor, avalie todas as esferas antes de continuar.",
        [{ text: "OK" }]
      );
      return;
    }

    // Aqui vai salvar no banco de dados (quando configurarmos)
    console.log("Mapeamentos:", mapeamentos);
    console.log("Observações gerais:", observacoesGerais);

    // Navegar para a próxima tela (Mesa Radiônica)
    router.push("/(tabs)/mapping-screen");
  };

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <View className="bg-thothBlue dark:bg-thothBlue px-6 py-8">
        <Text className="text-thothGold text-3xl font-bold text-center font-cinzel">
          Questionário THOTH 12
        </Text>
        <Text className="text-white text-center mt-2 text-sm">
          Avalie cada esfera da sua vida
        </Text>
      </View>

      {/* Instruções */}
      <View className="px-6 py-4 bg-surface-light dark:bg-surface-dark">
        <Text className="text-foreground-light dark:text-foreground-dark text-base">
          Para cada esfera, avalie a intensidade (0-100) e identifique o núcleo predominante.
        </Text>
      </View>

      {/* Lista de Esferas */}
      <View className="px-4 py-4">
        {mapeamentos.map((mapeamento, index) => {
          const esferaData = ESFERAS_DATA[mapeamento.esfera];
          
          return (
            <View
              key={mapeamento.esfera}
              className="bg-surface-light dark:bg-surface-dark rounded-lg p-4 mb-4 shadow-md"
            >
              {/* Cabeçalho da Esfera */}
              <View className="flex-row items-center mb-3">
                <Text className="text-2xl mr-2">{esferaData.icone}</Text>
                <View className="flex-1">
                  <Text className="text-foreground-light dark:text-foreground-dark text-lg font-bold">
                    {index + 1}. {esferaData.nome}
                  </Text>
                  <Text className="text-muted-light dark:text-muted-dark text-xs">
                    {esferaData.descricao}
                  </Text>
                </View>
              </View>

              {/* Slider de Intensidade */}
              <View className="mb-3">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-foreground-light dark:text-foreground-dark text-sm">
                    Intensidade:
                  </Text>
                  <Text className="text-thothGold font-bold">
                    {mapeamento.intensidade}%
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Pressable
                    onPress={() => updateIntensidade(mapeamento.esfera, Math.max(0, mapeamento.intensidade - 10))}
                    className="bg-thothBlue px-3 py-1 rounded mr-2"
                  >
                    <Text className="text-white font-bold">-</Text>
                  </Pressable>
                  <View className="flex-1 h-2 bg-muted-light dark:bg-muted-dark rounded mx-2">
                    <View
                      className="h-full bg-thothGold rounded"
                      style={{ width: `${mapeamento.intensidade}%` }}
                    />
                  </View>
                  <Pressable
                    onPress={() => updateIntensidade(mapeamento.esfera, Math.min(100, mapeamento.intensidade + 10))}
                    className="bg-thothBlue px-3 py-1 rounded ml-2"
                  >
                    <Text className="text-white font-bold">+</Text>
                  </Pressable>
                </View>
              </View>

              {/* Seleção de Núcleo */}
              <View className="mb-3">
                <Text className="text-foreground-light dark:text-foreground-dark text-sm mb-2">
                  Núcleo Predominante:
                </Text>
                <View className="flex-row">
                  {(Object.keys(NUCLEOS_DATA) as Nucleo[]).map((nucleo) => {
                    const isSelected = mapeamento.nucleo === nucleo;
                    const nucleoData = NUCLEOS_DATA[nucleo];
                    
                    return (
                      <Pressable
                        key={nucleo}
                        onPress={() => updateNucleo(mapeamento.esfera, nucleo)}
                        className={`flex-1 py-2 px-3 rounded-lg mx-1 ${
                          isSelected
                            ? "bg-thothGold"
                            : "bg-muted-light dark:bg-muted-dark"
                        }`}
                      >
                        <Text
                          className={`text-center text-xs font-bold ${
                            isSelected ? "text-white" : "text-foreground-light dark:text-foreground-dark"
                          }`}
                        >
                          {nucleo.charAt(0).toUpperCase() + nucleo.slice(1)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Campo de Observações */}
              <View>
                <Text className="text-foreground-light dark:text-foreground-dark text-sm mb-1">
                  Observações:
                </Text>
                <TextInput
                  value={mapeamento.observacoes}
                  onChangeText={(text) => updateObservacoes(mapeamento.esfera, text)}
                  placeholder="Descreva o que você sente nesta área..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={2}
                  className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark p-2 rounded-lg text-sm"
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Observações Gerais */}
      <View className="px-4 pb-4">
        <View className="bg-surface-light dark:bg-surface-dark rounded-lg p-4">
          <Text className="text-foreground-light dark:text-foreground-dark text-lg font-bold mb-2">
            Observações Gerais
          </Text>
          <TextInput
            value={observacoesGerais}
            onChangeText={setObservacoesGerais}
            placeholder="Conte-nos mais sobre sua situação atual, desafios e objetivos..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark p-3 rounded-lg"
          />
        </View>
      </View>

      {/* Botão Salvar */}
      <View className="px-4 pb-8">
        <Pressable
          onPress={handleSalvar}
          className="bg-thothGold py-4 rounded-lg shadow-lg"
        >
          <Text className="text-white text-center text-lg font-bold">
            Continuar para Mesa Radiônica
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}