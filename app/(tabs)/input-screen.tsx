import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import type { DocumentPickerAsset } from 'expo-document-picker';
import { ScreenContainer } from '@/components/screen-container';
import { useRouter } from 'expo-router';
import { cn } from '@/lib/utils';
import { DadosCliente } from '@/lib/thoth-data';
import { saveCliente } from '@/lib/storage-service';

export default function InputScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<DadosCliente>>({
    nome: '',
    dataNascimento: '',
    cidade: '',
    estado: '',
    problemaPrincipal: '',
  });

  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [audioTestemunho, setAudioTestemunho] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAudioTestemunho(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar o áudio');
    }
  };

  const handleInputChange = (field: keyof DadosCliente, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = async () => {
    // Validação básica
    if (!formData.nome?.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome do cliente');
      return;
    }

    if (!formData.dataNascimento?.trim()) {
      Alert.alert('Erro', 'Por favor, preencha a data de nascimento');
      return;
    }

    if (!formData.problemaPrincipal?.trim()) {
      Alert.alert('Erro', 'Por favor, descreva o problema principal');
      return;
    }

    setLoading(true);

    try {
      // Salvar dados no AsyncStorage e navegar para próxima tela
      const sessionData = {
        ...formData,
        fotoPerfil,
        audioTestemunho,
        id: Date.now().toString(),
        dataAtendimento: new Date().toISOString(),
      };

      // Salvar cliente
      await saveCliente(sessionData as DadosCliente);

      router.push({
        pathname: '/(tabs)/mapping-screen',
        params: { sessionId: sessionData.id, clienteId: sessionData.id },
      });
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao processar os dados');
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
        <View className="mb-8 items-center">
          <Text className="text-4xl font-bold text-[#D4AF37] mb-2">THOTH 12</Text>
          <Text className="text-base text-[#E8D4A8] text-center">
            Sistema de Interpretação Vibracional
          </Text>
        </View>

        {/* Form Section */}
        <View className="gap-6">
          {/* Nome */}
          <View>
            <Text className="text-sm font-semibold text-[#D4AF37] mb-2">Nome do Cliente</Text>
            <TextInput
              className="bg-[#2A2A4A] text-white p-4 rounded-lg border border-[#D4AF37]/30"
              placeholder="Digite o nome completo"
              placeholderTextColor="#9BA1A6"
              value={formData.nome}
              onChangeText={(value) => handleInputChange('nome', value)}
            />
          </View>

          {/* Data de Nascimento */}
          <View>
            <Text className="text-sm font-semibold text-[#D4AF37] mb-2">Data de Nascimento</Text>
            <TextInput
              className="bg-[#2A2A4A] text-white p-4 rounded-lg border border-[#D4AF37]/30"
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#9BA1A6"
              value={formData.dataNascimento}
              onChangeText={(value) => handleInputChange('dataNascimento', value)}
            />
          </View>

          {/* Cidade e Estado */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-[#D4AF37] mb-2">Cidade</Text>
              <TextInput
                className="bg-[#2A2A4A] text-white p-4 rounded-lg border border-[#D4AF37]/30"
                placeholder="Cidade"
                placeholderTextColor="#9BA1A6"
                value={formData.cidade}
                onChangeText={(value) => handleInputChange('cidade', value)}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-[#D4AF37] mb-2">Estado</Text>
              <TextInput
                className="bg-[#2A2A4A] text-white p-4 rounded-lg border border-[#D4AF37]/30"
                placeholder="UF"
                placeholderTextColor="#9BA1A6"
                maxLength={2}
                value={formData.estado}
                onChangeText={(value) => handleInputChange('estado', value.toUpperCase())}
              />
            </View>
          </View>

          {/* Foto de Perfil */}
          <View>
            <Text className="text-sm font-semibold text-[#D4AF37] mb-2">Foto de Perfil (Opcional)</Text>
            <TouchableOpacity
              onPress={pickImage}
              className="bg-[#2A2A4A] border-2 border-dashed border-[#D4AF37]/50 rounded-lg p-6 items-center"
            >
              {fotoPerfil ? (
                <Image
                  source={{ uri: fotoPerfil }}
                  className="w-24 h-24 rounded-lg"
                />
              ) : (
                <View className="items-center">
                  <Text className="text-3xl mb-2">📷</Text>
                  <Text className="text-[#E8D4A8] text-center">Toque para selecionar foto</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Áudio Testemunho */}
          <View>
            <Text className="text-sm font-semibold text-[#D4AF37] mb-2">
              Áudio Testemunho Quântico (até 3 min)
            </Text>
            <TouchableOpacity
              onPress={pickAudio}
              className="bg-[#2A2A4A] border-2 border-dashed border-[#D4AF37]/50 rounded-lg p-6 items-center"
            >
              {audioTestemunho ? (
                <View className="items-center">
                  <Text className="text-3xl mb-2">🎙️</Text>
                  <Text className="text-[#E8D4A8]">Áudio selecionado</Text>
                </View>
              ) : (
                <View className="items-center">
                  <Text className="text-3xl mb-2">🎵</Text>
                  <Text className="text-[#E8D4A8] text-center">Toque para selecionar áudio</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Problema Principal */}
          <View>
            <Text className="text-sm font-semibold text-[#D4AF37] mb-2">Problema Principal Relatado</Text>
            <TextInput
              className="bg-[#2A2A4A] text-white p-4 rounded-lg border border-[#D4AF37]/30 h-24"
              placeholder="Descreva o principal desafio ou questão..."
              placeholderTextColor="#9BA1A6"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={formData.problemaPrincipal}
              onChangeText={(value) => handleInputChange('problemaPrincipal', value)}
            />
          </View>

          {/* Botão Iniciar */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={loading}
            className={cn(
              'bg-gradient-to-r from-[#D4AF37] to-[#E8D4A8] p-4 rounded-lg items-center mt-4',
              loading && 'opacity-50'
            )}
          >
            <Text className="text-[#1B1B3A] font-bold text-lg">
              {loading ? 'Processando...' : 'Iniciar Mapeamento'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8 pt-6 border-t border-[#D4AF37]/20">
          <Text className="text-xs text-[#9BA1A6] text-center">
            Sistema THOTH 12 - LUNARA {'\n'}
            Interpretação Vibracional Sagrada
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
