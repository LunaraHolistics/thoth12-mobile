import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'] as any,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setFotoPerfil(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
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
    // Máscara para data de nascimento
    if (field === 'dataNascimento') {
      const numbers = value.replace(/\D/g, '');
      let formatted = numbers;
      if (numbers.length > 2) {
        formatted = `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
      }
      if (numbers.length > 4) {
        formatted = `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
      }
      setFormData((prev) => ({ ...prev, [field]: formatted }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    if (!formData.nome?.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o nome do cliente');
      return;
    }
    if (!formData.dataNascimento?.trim() || formData.dataNascimento.length < 10) {
      Alert.alert('Atenção', 'Por favor, preencha a data de nascimento (DD/MM/AAAA)');
      return;
    }
    if (!formData.problemaPrincipal?.trim()) {
      Alert.alert('Atenção', 'Por favor, descreva o problema principal');
      return;
    }

    setLoading(true);

    try {
      const sessionData = {
        ...formData,
        fotoPerfil,
        audioTestemunho,
        id: Date.now().toString(),
        dataAtendimento: new Date().toISOString(),
      };

      await saveCliente(sessionData as DadosCliente);

      router.push({
        pathname: '/mapping-screen',
        params: { sessionId: sessionData.id, clienteId: sessionData.id },
      });
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao processar os dados');
    } finally {
      setLoading(false);
    }
  };

  // Componente de campo de input reutilizável
  const InputField = ({
    label,
    icon,
    value,
    onChangeText,
    placeholder,
    multiline = false,
    maxLength,
    fieldKey,
    keyboardType = 'default',
  }: any) => (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        <Text className="text-lg mr-2">{icon}</Text>
        <Text className="text-sm font-bold text-thothGold tracking-wide">{label}</Text>
      </View>
      <View
        className={cn(
          'bg-surface rounded-xl border-2 transition-all',
          focusedField === fieldKey
            ? 'border-thothGold shadow-lg'
            : 'border-thothGold/20'
        )}
      >
        <TextInput
          className="text-foreground p-4 text-base"
          placeholder={placeholder}
          placeholderTextColor="#687076"
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          maxLength={maxLength}
          keyboardType={keyboardType}
          onFocus={() => setFocusedField(fieldKey)}
          onBlur={() => setFocusedField(null)}
          style={{ minHeight: multiline ? 120 : undefined }}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );

  return (
    <ScreenContainer className="bg-gradient-to-b from-thothBlue via-[#15152E] to-[#0F0F1E]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          className="p-5"
        >
          {/* Header Ornamental */}
          <View className="items-center mb-8 mt-4">
            {/* Ornamento Superior */}
            <View className="flex-row items-center mb-3">
              <View className="h-px w-16 bg-gradient-to-r from-transparent to-thothGold" />
              <Text className="mx-3 text-thothGold text-3xl">𓂀</Text>
              <View className="h-px w-16 bg-gradient-to-l from-transparent to-thothGold" />
            </View>

            <Text className="text-4xl font-bold text-thothGold tracking-wider mb-2">
              NOVO ATENDIMENTO
            </Text>
            <Text className="text-sm text-thothRoseGold/80 text-center px-6 leading-relaxed">
              Preencha os dados para iniciar a jornada de transformação
            </Text>

            {/* Ornamento Inferior */}
            <View className="flex-row items-center mt-3">
              <View className="h-px w-20 bg-thothGold/50" />
              <Text className="mx-3 text-thothGold text-xl">☥</Text>
              <View className="h-px w-20 bg-thothGold/50" />
            </View>
          </View>

          {/* Card Principal */}
          <View className="bg-surface/80 rounded-2xl p-5 border border-thothGold/30 shadow-2xl mb-6">
            {/* Foto de Perfil - Destaque */}
            <View className="items-center mb-6">
              <Text className="text-xs font-bold text-thothGold tracking-widest mb-3">
                ✦ FOTO DO CONSULENTE ✦
              </Text>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                className="relative"
              >
                <View
                  className={cn(
                    'w-32 h-32 rounded-full border-4 items-center justify-center overflow-hidden',
                    fotoPerfil
                      ? 'border-thothGold'
                      : 'border-thothGold/40 border-dashed bg-thothBlue/50'
                  )}
                >
                  {fotoPerfil ? (
                    <Image source={{ uri: fotoPerfil }} className="w-full h-full" />
                  ) : (
                    <View className="items-center">
                      <Text className="text-5xl mb-1">📷</Text>
                      <Text className="text-xs text-muted text-center px-2">
                        Toque para adicionar
                      </Text>
                    </View>
                  )}
                </View>
                {!fotoPerfil && (
                  <View className="absolute -bottom-1 -right-1 bg-thothGold rounded-full w-8 h-8 items-center justify-center">
                    <Text className="text-thothBlue font-bold">+</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Separador Ornamental */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-thothGold/20" />
              <Text className="mx-3 text-thothGold text-xs">✦</Text>
              <View className="flex-1 h-px bg-thothGold/20" />
            </View>

            {/* Nome - Campo Principal */}
            <InputField
              label="NOME COMPLETO"
              icon="👤"
              value={formData.nome}
              onChangeText={(v: string) => handleInputChange('nome', v)}
              placeholder="Digite o nome completo do consulente"
              fieldKey="nome"
            />

            {/* Data de Nascimento e Estado - Linha Compacta */}
            <View className="flex-row gap-3 mb-4">
              <View className="flex-[2]">
                <View className="flex-row items-center mb-2">
                  <Text className="text-lg mr-2">📅</Text>
                  <Text className="text-sm font-bold text-thothGold tracking-wide">
                    NASCIMENTO
                  </Text>
                </View>
                <View
                  className={cn(
                    'bg-surface rounded-xl border-2 transition-all',
                    focusedField === 'nascimento'
                      ? 'border-thothGold shadow-lg'
                      : 'border-thothGold/20'
                  )}
                >
                  <TextInput
                    className="text-foreground p-4 text-base"
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#687076"
                    value={formData.dataNascimento}
                    onChangeText={(v) => handleInputChange('dataNascimento', v)}
                    maxLength={10}
                    keyboardType="numeric"
                    onFocus={() => setFocusedField('nascimento')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>

              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-lg mr-2">📍</Text>
                  <Text className="text-sm font-bold text-thothGold tracking-wide">UF</Text>
                </View>
                <View
                  className={cn(
                    'bg-surface rounded-xl border-2 transition-all',
                    focusedField === 'estado'
                      ? 'border-thothGold shadow-lg'
                      : 'border-thothGold/20'
                  )}
                >
                  <TextInput
                    className="text-foreground p-4 text-base text-center uppercase"
                    placeholder="SP"
                    placeholderTextColor="#687076"
                    value={formData.estado}
                    onChangeText={(v) => handleInputChange('estado', v.toUpperCase())}
                    maxLength={2}
                    onFocus={() => setFocusedField('estado')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
            </View>

            {/* Cidade - Campo Completo */}
            <InputField
              label="CIDADE"
              icon="🏙️"
              value={formData.cidade}
              onChangeText={(v: string) => handleInputChange('cidade', v)}
              placeholder="Cidade de residência"
              fieldKey="cidade"
            />

            {/* Separador Ornamental */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-thothGold/20" />
              <Text className="mx-3 text-thothGold text-xs">✦ ✦ ✦</Text>
              <View className="flex-1 h-px bg-thothGold/20" />
            </View>

            {/* Áudio Testemunho */}
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <Text className="text-lg mr-2">🎙️</Text>
                <Text className="text-sm font-bold text-thothGold tracking-wide">
                  TESTEMUNHO QUÂNTICO
                </Text>
                <Text className="text-xs text-muted ml-2">(opcional)</Text>
              </View>
              <TouchableOpacity
                onPress={pickAudio}
                activeOpacity={0.8}
                className={cn(
                  'bg-surface rounded-xl border-2 border-dashed p-5',
                  audioTestemunho
                    ? 'border-thothGold bg-thothGold/5'
                    : 'border-thothGold/40'
                )}
              >
                <View className="flex-row items-center">
                  <View className="w-14 h-14 rounded-full bg-thothBlue items-center justify-center mr-4">
                    <Text className="text-3xl">
                      {audioTestemunho ? '✓' : '🎵'}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-foreground font-semibold mb-1">
                      {audioTestemunho ? 'Áudio Selecionado' : 'Grave até 3 minutos'}
                    </Text>
                    <Text className="text-xs text-muted">
                      {audioTestemunho
                        ? 'Toque para trocar o arquivo'
                        : 'Compartilhe sua intenção para esta jornada'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Separador Ornamental */}
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-thothGold/20" />
              <Text className="mx-3 text-thothGold text-xs">✦</Text>
              <View className="flex-1 h-px bg-thothGold/20" />
            </View>

            {/* Problema Principal - Campo Grande */}
            <View className="mb-2">
              <View className="flex-row items-center mb-2">
                <Text className="text-lg mr-2">📜</Text>
                <Text className="text-sm font-bold text-thothGold tracking-wide">
                  QUESTÃO PRINCIPAL
                </Text>
              </View>
              <Text className="text-xs text-muted mb-3 leading-relaxed">
                Descreva com suas palavras o que trouxe você até aqui. Este é o ponto de partida
                da sua transformação.
              </Text>
              <View
                className={cn(
                  'bg-surface rounded-xl border-2 transition-all',
                  focusedField === 'problema'
                    ? 'border-thothGold shadow-lg'
                    : 'border-thothGold/20'
                )}
              >
                <TextInput
                  className="text-foreground p-4 text-base"
                  placeholder="Qual desafio ou questão você deseja transformar?"
                  placeholderTextColor="#687076"
                  value={formData.problemaPrincipal}
                  onChangeText={(v) => handleInputChange('problemaPrincipal', v)}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  onFocus={() => setFocusedField('problema')}
                  onBlur={() => setFocusedField(null)}
                  style={{ minHeight: 140 }}
                />
              </View>
            </View>
          </View>

          {/* Botão Principal */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={loading}
            activeOpacity={0.85}
            className={cn(
              'bg-gradient-to-r from-thothGold via-thothRoseGold to-thothGold p-5 rounded-2xl items-center shadow-2xl mb-4',
              loading && 'opacity-60'
            )}
            style={{
              shadowColor: '#D4AF37',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 10,
            }}
          >
            <View className="flex-row items-center">
              <Text className="text-2xl mr-2">✨</Text>
              <Text className="text-thothBlue font-bold text-lg tracking-wide">
                {loading ? 'PREPARANDO JORNADA...' : 'INICIAR MAPEAMENTO'}
              </Text>
              <Text className="text-2xl ml-2">✨</Text>
            </View>
          </TouchableOpacity>

          {/* Footer Ornamental */}
          <View className="pt-4 items-center">
            <View className="flex-row items-center mb-2">
              <View className="h-px w-12 bg-thothGold/30" />
              <Text className="mx-2 text-thothGold/50 text-xs">☥</Text>
              <View className="h-px w-12 bg-thothGold/30" />
            </View>
            <Text className="text-xs text-muted text-center">
              Sistema THOTH 12 - LUNARA
            </Text>
            <Text className="text-xs text-thothGold/40 mt-1 italic">
              "Conhece-te a ti mesmo"
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}