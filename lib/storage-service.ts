/**
 * Storage Service - AsyncStorage wrapper for THOTH 12
 * Handles persistence of sessions, clients, and reports
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessaoAtendimento, DadosCliente, RelatorioSagrado } from './thoth-data';

const STORAGE_KEYS = {
  SESSIONS: 'thoth_sessions',
  CLIENTS: 'thoth_clients',
  CURRENT_SESSION: 'thoth_current_session',
  REPORTS: 'thoth_reports',
};

/**
 * Salvar nova sessão
 */
export async function saveSessao(sessao: SessaoAtendimento): Promise<void> {
  try {
    const sessoes = await getSessoes();
    sessoes.push(sessao);
    await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessoes));
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
    throw error;
  }
}

/**
 * Obter todas as sessões
 */
export async function getSessoes(): Promise<SessaoAtendimento[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao obter sessões:', error);
    return [];
  }
}

/**
 * Obter sessão por ID
 */
export async function getSessaoById(id: string): Promise<SessaoAtendimento | null> {
  try {
    const sessoes = await getSessoes();
    return sessoes.find((s) => s.id === id) || null;
  } catch (error) {
    console.error('Erro ao obter sessão:', error);
    return null;
  }
}

/**
 * Atualizar sessão
 */
export async function updateSessao(sessao: SessaoAtendimento): Promise<void> {
  try {
    const sessoes = await getSessoes();
    const index = sessoes.findIndex((s) => s.id === sessao.id);
    if (index !== -1) {
      sessoes[index] = sessao;
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessoes));
    }
  } catch (error) {
    console.error('Erro ao atualizar sessão:', error);
    throw error;
  }
}

/**
 * Deletar sessão
 */
export async function deleteSessao(id: string): Promise<void> {
  try {
    const sessoes = await getSessoes();
    const filtered = sessoes.filter((s) => s.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao deletar sessão:', error);
    throw error;
  }
}

/**
 * Salvar cliente
 */
export async function saveCliente(cliente: DadosCliente): Promise<void> {
  try {
    const clientes = await getClientes();
    const index = clientes.findIndex((c) => c.id === cliente.id);
    if (index !== -1) {
      clientes[index] = cliente;
    } else {
      clientes.push(cliente);
    }
    await AsyncStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clientes));
  } catch (error) {
    console.error('Erro ao salvar cliente:', error);
    throw error;
  }
}

/**
 * Obter todos os clientes
 */
export async function getClientes(): Promise<DadosCliente[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CLIENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    return [];
  }
}

/**
 * Obter cliente por ID
 */
export async function getClienteById(id: string): Promise<DadosCliente | null> {
  try {
    const clientes = await getClientes();
    return clientes.find((c) => c.id === id) || null;
  } catch (error) {
    console.error('Erro ao obter cliente:', error);
    return null;
  }
}

/**
 * Obter sessões de um cliente
 */
export async function getSessoesByClienteId(clienteId: string): Promise<SessaoAtendimento[]> {
  try {
    const sessoes = await getSessoes();
    return sessoes.filter((s) => s.clienteId === clienteId);
  } catch (error) {
    console.error('Erro ao obter sessões do cliente:', error);
    return [];
  }
}

/**
 * Salvar relatório
 */
export async function saveRelatorio(
  sessaoId: string,
  relatorio: RelatorioSagrado
): Promise<void> {
  try {
    const sessao = await getSessaoById(sessaoId);
    if (sessao) {
      sessao.relatorioGerado = relatorio;
      await updateSessao(sessao);
    }
  } catch (error) {
    console.error('Erro ao salvar relatório:', error);
    throw error;
  }
}

/**
 * Obter relatório de uma sessão
 */
export async function getRelatorio(sessaoId: string): Promise<RelatorioSagrado | null> {
  try {
    const sessao = await getSessaoById(sessaoId);
    return sessao?.relatorioGerado || null;
  } catch (error) {
    console.error('Erro ao obter relatório:', error);
    return null;
  }
}

/**
 * Limpar todos os dados (CUIDADO!)
 */
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.SESSIONS,
      STORAGE_KEYS.CLIENTS,
      STORAGE_KEYS.CURRENT_SESSION,
      STORAGE_KEYS.REPORTS,
    ]);
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
    throw error;
  }
}

/**
 * Exportar dados para análise
 */
export async function exportarDados(): Promise<{
  sessoes: SessaoAtendimento[];
  clientes: DadosCliente[];
}> {
  try {
    const sessoes = await getSessoes();
    const clientes = await getClientes();
    return { sessoes, clientes };
  } catch (error) {
    console.error('Erro ao exportar dados:', error);
    throw error;
  }
}
