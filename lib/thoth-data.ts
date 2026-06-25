/**
 * THOTH 12 - Sistema de Interpretação Vibracional
 * Estruturas de dados e matriz de interpretação
 */

// ============================================================================
// TIPOS BASE
// ============================================================================

export type Esfera = 
  | 'corpo'
  | 'energia_vital'
  | 'emocoes'
  | 'mente'
  | 'espiritualidade'
  | 'relacionamentos'
  | 'familia'
  | 'trabalho'
  | 'prosperidade'
  | 'missao'
  | 'protecao'
  | 'legado';

export type Nucleo = 'identidade' | 'seguranca' | 'merecimento';

export interface DadosCliente {
  id: string;
  nome: string;
  dataNascimento: string;
  cidade: string;
  estado: string;
  fotoPerfil?: string;
  audioTestemunho?: string;
  problemaPrincipal: string;
  dataAtendimento: string;
  observacoesGerais?: string;
}

export interface MapeamentoEsfera {
  esfera: Esfera;
  intensidade: number; // 0-100
  nucleo: Nucleo;
  observacoes: string;
}

export interface SessaoAtendimento {
  id: string;
  clienteId: string;
  dadosCliente: DadosCliente;
  mapeamentos: MapeamentoEsfera[];
  dataAtendimento: string;
  relatorioGerado?: RelatorioSagrado;
}

// ============================================================================
// MATRIZ DE DADOS - NÚCLEOS
// ============================================================================

export interface DadosNucleo {
  frequencia: number;
  comando: string;
  arquetipo: string;
  decretoBase: string;
}

export const NUCLEOS_DATA: Record<Nucleo, DadosNucleo> = {
  identidade: {
    frequencia: 44,
    comando: 'REORGANIZAR',
    arquetipo: 'O Mestre',
    decretoBase: 'Reconheço minha verdadeira essência e assumo meu lugar com confiança.',
  },
  seguranca: {
    frequencia: 122,
    comando: 'LIMPAR',
    arquetipo: 'O Guardião',
    decretoBase: 'Estou protegido, sustentado e seguro para seguir meu caminho.',
  },
  merecimento: {
    frequencia: 99,
    comando: 'ANCORAR',
    arquetipo: 'A Imperatriz',
    decretoBase: 'Recebo com gratidão tudo aquilo que está alinhado ao meu bem maior.',
  },
};

// ============================================================================
// MATRIZ DE DADOS - ESFERAS
// ============================================================================

export interface DadosEsfera {
  nome: string;
  frequencia: number;
  arquetipo: string;
  icone: string;
  descricao: string;
}

export const ESFERAS_DATA: Record<Esfera, DadosEsfera> = {
  corpo: {
    nome: 'Corpo',
    frequencia: 11,
    arquetipo: 'Curadora',
    icone: '🧘',
    descricao: 'Saúde física, vitalidade e bem-estar corporal',
  },
  energia_vital: {
    nome: 'Energia Vital',
    frequencia: 22,
    arquetipo: 'Alquimista',
    icone: '⚡',
    descricao: 'Força vital, disposição e energia pessoal',
  },
  emocoes: {
    nome: 'Emoções',
    frequencia: 33,
    arquetipo: 'Sacerdotisa',
    icone: '💜',
    descricao: 'Inteligência emocional, sentimentos e equilíbrio',
  },
  mente: {
    nome: 'Mente',
    frequencia: 44,
    arquetipo: 'Mestre',
    icone: '🧠',
    descricao: 'Clareza mental, pensamentos e criatividade',
  },
  espiritualidade: {
    nome: 'Espiritualidade',
    frequencia: 55,
    arquetipo: 'Navegador',
    icone: '🌟',
    descricao: 'Conexão espiritual, propósito e transcendência',
  },
  relacionamentos: {
    nome: 'Relacionamentos',
    frequencia: 66,
    arquetipo: 'Curadora',
    icone: '💑',
    descricao: 'Conexões interpessoais e relacionamentos amorosos',
  },
  familia: {
    nome: 'Família',
    frequencia: 77,
    arquetipo: 'Guardião',
    icone: '👨‍👩‍👧‍👦',
    descricao: 'Laços familiares, raízes e legado ancestral',
  },
  trabalho: {
    nome: 'Trabalho',
    frequencia: 88,
    arquetipo: 'Construtor',
    icone: '🔨',
    descricao: 'Carreira, profissão e realização profissional',
  },
  prosperidade: {
    nome: 'Prosperidade',
    frequencia: 99,
    arquetipo: 'Imperatriz',
    icone: '💰',
    descricao: 'Abundância, riqueza e fluxo financeiro',
  },
  missao: {
    nome: 'Missão de Vida',
    frequencia: 111,
    arquetipo: 'Visionário',
    icone: '🎯',
    descricao: 'Propósito de vida e chamado espiritual',
  },
  protecao: {
    nome: 'Proteção',
    frequencia: 122,
    arquetipo: 'Guerreiro da Luz',
    icone: '🛡️',
    descricao: 'Segurança, proteção e defesa energética',
  },
  legado: {
    nome: 'Legado',
    frequencia: 144,
    arquetipo: 'Ancião',
    icone: '📜',
    descricao: 'Herança, sabedoria e impacto duradouro',
  },
};

// ============================================================================
// MATRIZ DE INTERPRETAÇÃO (36 COMBINAÇÕES)
// ============================================================================

export interface InterpretacaoCombinacao {
  diagnosticoBase: {
    temaCentral: string;
    padroesSombra: string;
    potencialDesenvolvimento: string;
  };
  protocoloTerapeutico: {
    frequenciaTrabalho: number;
    comandoPrioritario: string;
    arquetipioDominante: string;
  };
  mensagemThoth: string;
  plano21Dias: {
    fase: number;
    exercicioPratico: string;
    metaMensuravel: string;
    decretosDiarios: string[];
  };
}

// Matriz de interpretações para cada combinação Esfera + Núcleo
export const MATRIZ_INTERPRETACOES: Record<string, InterpretacaoCombinacao> = {
  // CORPO + IDENTIDADE
  'corpo_identidade': {
    diagnosticoBase: {
      temaCentral: 'Reconexão com a sabedoria corporal',
      padroesSombra: 'Desconexão do corpo, ignorância de sinais físicos',
      potencialDesenvolvimento: 'Integração total entre mente e corpo',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 55, // 11 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Curadora-Mestre',
    },
    mensagemThoth: 'Teu corpo é o templo da tua alma. Escuta seus sussurros e honra sua sabedoria ancestral.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Meditação corporal guiada - 10 minutos diários',
      metaMensuravel: 'Aumentar consciência corporal em 80%',
      decretosDiarios: [
        'Meu corpo é sábio e digno de respeito',
        'Eu honro cada célula do meu ser',
        'Meu corpo e mente trabalham em perfeita harmonia',
      ],
    },
  },

  // CORPO + SEGURANÇA
  'corpo_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Estabilidade e segurança física',
      padroesSombra: 'Medo de vulnerabilidade, tensão crônica',
      potencialDesenvolvimento: 'Sensação de segurança enraizada',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 133, // 11 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Curadora-Guardião',
    },
    mensagemThoth: 'Estás protegido. Tua base é sólida como a terra. Deixa a tensão fluir e recebe a paz.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Enraizamento energético - Pés descalços na terra',
      metaMensuravel: 'Reduzir tensão corporal em 70%',
      decretosDiarios: [
        'Estou seguro e protegido em meu corpo',
        'Minha base é forte e estável',
        'Confio na segurança do meu ser físico',
      ],
    },
  },

  // CORPO + MERECIMENTO
  'corpo_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para cuidar do corpo',
      padroesSombra: 'Negligência corporal, autossabotagem física',
      potencialDesenvolvimento: 'Autocuidado como prioridade',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 110, // 11 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Curadora-Imperatriz',
    },
    mensagemThoth: 'Tu mereces um corpo saudável e radiante. Autoriza-te a receber o cuidado que precisas.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Ritual de autocuidado diário - banho consciente',
      metaMensuravel: 'Implementar 3 práticas de autocuidado',
      decretosDiarios: [
        'Meu corpo merece cuidado e atenção',
        'Eu sou digno de saúde radiante',
        'Cuido do meu corpo com amor e gratidão',
      ],
    },
  },

  // ENERGIA VITAL + IDENTIDADE
  'energia_vital_identidade': {
    diagnosticoBase: {
      temaCentral: 'Reclamação da força pessoal',
      padroesSombra: 'Dispersão energética, falta de direção',
      potencialDesenvolvimento: 'Energia focada e propositiva',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 66, // 22 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Alquimista-Mestre',
    },
    mensagemThoth: 'Tua energia é sagrada. Concentra-a em teu verdadeiro propósito e observa milagres acontecerem.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Prática de respiração energética - 5 minutos',
      metaMensuravel: 'Aumentar energia em 60%',
      decretosDiarios: [
        'Minha energia é poderosa e direcionada',
        'Eu sou a fonte da minha força',
        'Minha vitalidade flui livremente',
      ],
    },
  },

  // ENERGIA VITAL + SEGURANÇA
  'energia_vital_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Estabilização energética',
      padroesSombra: 'Esgotamento, drenagem energética',
      potencialDesenvolvimento: 'Energia sustentável e renovável',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 144, // 22 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Alquimista-Guardião',
    },
    mensagemThoth: 'Protege tua energia como um tesouro. Limpa o que não te serve e renova tua força.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Limpeza energética com visualização',
      metaMensuravel: 'Recuperar 50% da energia perdida',
      decretosDiarios: [
        'Minha energia é protegida e renovada',
        'Eu libero o que me drena',
        'Minha vitalidade é sagrada',
      ],
    },
  },

  // ENERGIA VITAL + MERECIMENTO
  'energia_vital_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Permissão para brilhar',
      padroesSombra: 'Bloqueio de expressão, diminuição de si mesmo',
      potencialDesenvolvimento: 'Expressão plena e radiante',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 121, // 22 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Alquimista-Imperatriz',
    },
    mensagemThoth: 'Tu mereces brilhar. Deixa tua luz transbordante iluminar o mundo.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Expressão criativa diária - arte, música ou movimento',
      metaMensuravel: 'Expressar-se plenamente 5 vezes por semana',
      decretosDiarios: [
        'Minha luz é digna de brilhar',
        'Eu mereço ser visto e celebrado',
        'Minha energia é um presente para o mundo',
      ],
    },
  },

  // EMOÇÕES + IDENTIDADE
  'emocoes_identidade': {
    diagnosticoBase: {
      temaCentral: 'Integração emocional e identidade',
      padroesSombra: 'Negação emocional, desconexão de sentimentos',
      potencialDesenvolvimento: 'Inteligência emocional plena',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 77, // 33 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Sacerdotisa-Mestre',
    },
    mensagemThoth: 'Tuas emoções são mensageiras da tua alma. Escuta-as com compaixão e sabedoria.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Diário emocional - registrar sentimentos diários',
      metaMensuravel: 'Identificar padrões emocionais',
      decretosDiarios: [
        'Minhas emoções são válidas e sábias',
        'Eu honro todos os meus sentimentos',
        'Minha inteligência emocional é meu poder',
      ],
    },
  },

  // EMOÇÕES + SEGURANÇA
  'emocoes_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Segurança emocional e paz interior',
      padroesSombra: 'Instabilidade emocional, medo de sentimentos',
      potencialDesenvolvimento: 'Equilíbrio emocional duradouro',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 155, // 33 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Sacerdotisa-Guardião',
    },
    mensagemThoth: 'Teu coração é um santuário seguro. Aquieta-te e encontra paz nas profundezas do teu ser.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Meditação do coração - visualização de luz rosa',
      metaMensuravel: 'Reduzir ansiedade em 75%',
      decretosDiarios: [
        'Meu coração é um lugar seguro',
        'Eu sou emocionalmente estável e equilibrado',
        'A paz habita em mim',
      ],
    },
  },

  // EMOÇÕES + MERECIMENTO
  'emocoes_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para sentir e receber amor',
      padroesSombra: 'Rejeição emocional, bloqueio de amor',
      potencialDesenvolvimento: 'Abertura completa do coração',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 132, // 33 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Sacerdotisa-Imperatriz',
    },
    mensagemThoth: 'Tu mereces amor em todas as suas formas. Abre teu coração e recebe a graça que vem.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Prática de auto-compaixão - mão no coração',
      metaMensuravel: 'Aumentar autoestima em 70%',
      decretosDiarios: [
        'Meu coração merece amor e cuidado',
        'Eu sou digno de afeto profundo',
        'Abro meu coração para receber bênçãos',
      ],
    },
  },

  // MENTE + IDENTIDADE
  'mente_identidade': {
    diagnosticoBase: {
      temaCentral: 'Clareza mental e poder do pensamento',
      padroesSombra: 'Confusão mental, pensamentos dispersos',
      potencialDesenvolvimento: 'Mente cristalina e focada',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 88, // 44 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Mestre-Mestre',
    },
    mensagemThoth: 'Tua mente é um instrumento de poder. Limpa-a e direciona-a para teu bem maior.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Meditação de foco - concentração em um ponto',
      metaMensuravel: 'Aumentar clareza mental em 80%',
      decretosDiarios: [
        'Minha mente é clara e poderosa',
        'Meus pensamentos criam minha realidade',
        'Eu sou o mestre dos meus pensamentos',
      ],
    },
  },

  // MENTE + SEGURANÇA
  'mente_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Pensamentos seguros e protetores',
      padroesSombra: 'Pensamentos negativos, padrões limitantes',
      potencialDesenvolvimento: 'Padrões de pensamento construtivos',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 166, // 44 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Mestre-Guardião',
    },
    mensagemThoth: 'Limpa tua mente de pensamentos que não te servem. Planta sementes de verdade e poder.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Reprogramação mental - substituição de crenças',
      metaMensuravel: 'Eliminar 5 crenças limitantes',
      decretosDiarios: [
        'Meus pensamentos são seguros e construtivos',
        'Eu libero padrões negativos',
        'Minha mente é um espaço de paz',
      ],
    },
  },

  // MENTE + MERECIMENTO
  'mente_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para pensar em grande escala',
      padroesSombra: 'Pensamentos pequenos, autossabotagem mental',
      potencialDesenvolvimento: 'Pensamento expansivo e criativo',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 143, // 44 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Mestre-Imperatriz',
    },
    mensagemThoth: 'Tu mereces pensar em grande escala. Expande tua mente e manifesta teus maiores sonhos.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Visualização criativa - sonho e manifestação',
      metaMensuravel: 'Definir e visualizar 3 grandes objetivos',
      decretosDiarios: [
        'Minha mente é digna de grandes ideias',
        'Eu penso em abundância e possibilidades',
        'Meus pensamentos criam meu destino',
      ],
    },
  },

  // ESPIRITUALIDADE + IDENTIDADE
  'espiritualidade_identidade': {
    diagnosticoBase: {
      temaCentral: 'Conexão com propósito espiritual',
      padroesSombra: 'Desconexão espiritual, perda de significado',
      potencialDesenvolvimento: 'Vida alinhada com propósito',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 99, // 55 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Navegador-Mestre',
    },
    mensagemThoth: 'Tu és um ser espiritual em jornada humana. Reconecta-te com teu propósito sagrado.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Prática espiritual diária - meditação ou oração',
      metaMensuravel: 'Estabelecer conexão espiritual diária',
      decretosDiarios: [
        'Sou um ser espiritual em evolução',
        'Meu propósito é sagrado e significativo',
        'Estou conectado com a fonte divina',
      ],
    },
  },

  // ESPIRITUALIDADE + SEGURANÇA
  'espiritualidade_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Fé e confiança no caminho espiritual',
      padroesSombra: 'Dúvida espiritual, medo do desconhecido',
      potencialDesenvolvimento: 'Fé inabalável e confiança divina',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 177, // 55 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Navegador-Guardião',
    },
    mensagemThoth: 'Confía no caminho que se desdobra. O universo te guia com precisão e amor.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Prática de entrega - soltar controle',
      metaMensuravel: 'Aumentar fé em 80%',
      decretosDiarios: [
        'Confio no plano divino para minha vida',
        'Estou seguro nas mãos do universo',
        'Minha fé é meu escudo',
      ],
    },
  },

  // ESPIRITUALIDADE + MERECIMENTO
  'espiritualidade_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para receber bênçãos espirituais',
      padroesSombra: 'Culpa espiritual, bloqueio de bênçãos',
      potencialDesenvolvimento: 'Abertura para graça divina',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 154, // 55 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Navegador-Imperatriz',
    },
    mensagemThoth: 'Tu mereces todas as bênçãos do universo. Abre-te e recebe a graça que flui para ti.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Ritual de gratidão - reconhecer bênçãos diárias',
      metaMensuravel: 'Identificar 21 bênçãos em 21 dias',
      decretosDiarios: [
        'Sou digno de bênçãos divinas',
        'Recebo com gratidão a graça do universo',
        'Estou aberto para milagres',
      ],
    },
  },

  // RELACIONAMENTOS + IDENTIDADE
  'relacionamentos_identidade': {
    diagnosticoBase: {
      temaCentral: 'Identidade em relacionamentos saudáveis',
      padroesSombra: 'Perda de si mesmo em relacionamentos',
      potencialDesenvolvimento: 'Relacionamentos que honram a individualidade',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 110, // 66 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Curadora-Mestre',
    },
    mensagemThoth: 'Ama sem perder-te. Tua identidade é o alicerce de relacionamentos verdadeiros.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Afirmação de limites saudáveis',
      metaMensuravel: 'Estabelecer 3 limites saudáveis',
      decretosDiarios: [
        'Mantenho minha identidade em todos os relacionamentos',
        'Meu valor não depende de aprovação',
        'Sou autêntico e digno de amor',
      ],
    },
  },

  // RELACIONAMENTOS + SEGURANÇA
  'relacionamentos_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Segurança e confiança em relacionamentos',
      padroesSombra: 'Medo de abandono, desconfiança',
      potencialDesenvolvimento: 'Relacionamentos seguros e confiáveis',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 188, // 66 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Curadora-Guardião',
    },
    mensagemThoth: 'Cura tuas feridas de confiança. Atrai relacionamentos que refletem tua segurança interior.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Cura de traumas relacionais - perdão',
      metaMensuravel: 'Liberar 5 mágoas antigas',
      decretosDiarios: [
        'Sou seguro em meus relacionamentos',
        'Confio nas pessoas certas',
        'Meu coração está aberto e protegido',
      ],
    },
  },

  // RELACIONAMENTOS + MERECIMENTO
  'relacionamentos_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para relacionamentos amorosos',
      padroesSombra: 'Bloqueio de amor, autossabotagem relacional',
      potencialDesenvolvimento: 'Relacionamentos que refletem seu valor',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 165, // 66 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Curadora-Imperatriz',
    },
    mensagemThoth: 'Tu mereces amor profundo e verdadeiro. Atrai relacionamentos que honram teu valor.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Prática de auto-amor - espelho e afirmações',
      metaMensuravel: 'Aumentar autoestima relacional em 80%',
      decretosDiarios: [
        'Mereço amor profundo e verdadeiro',
        'Atraio relacionamentos que me honram',
        'Sou digno de ser amado completamente',
      ],
    },
  },

  // FAMÍLIA + IDENTIDADE
  'familia_identidade': {
    diagnosticoBase: {
      temaCentral: 'Identidade familiar e herança',
      padroesSombra: 'Identificação excessiva com padrões familiares',
      potencialDesenvolvimento: 'Identidade própria dentro do sistema familiar',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 121, // 77 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Guardião-Mestre',
    },
    mensagemThoth: 'Honra tua linhagem e reclama tua própria verdade. Tu és livre para ser quem escolhes.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Mapeamento familiar - reconhecer padrões',
      metaMensuravel: 'Identificar 5 padrões familiares',
      decretosDiarios: [
        'Honro minha linhagem e sou livre',
        'Sou meu próprio criador',
        'Minha identidade é única e valiosa',
      ],
    },
  },

  // FAMÍLIA + SEGURANÇA
  'familia_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Segurança e pertencimento familiar',
      padroesSombra: 'Desconexão familiar, falta de raízes',
      potencialDesenvolvimento: 'Segurança enraizada na linhagem',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 199, // 77 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Guardião-Guardião',
    },
    mensagemThoth: 'Tuas raízes são profundas e seguras. Sente o apoio de teus ancestrais em cada passo.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Conexão ancestral - honrar antepassados',
      metaMensuravel: 'Estabelecer conexão com 3 ancestrais',
      decretosDiarios: [
        'Sou seguro em minha linhagem',
        'Meus ancestrais me apoiam',
        'Tenho raízes profundas e fortes',
      ],
    },
  },

  // FAMÍLIA + MERECIMENTO
  'familia_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para receber herança familiar',
      padroesSombra: 'Rejeição de herança, bloqueio de bênçãos familiares',
      potencialDesenvolvimento: 'Recepção completa da herança positiva',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 176, // 77 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Guardião-Imperatriz',
    },
    mensagemThoth: 'Tu mereces as bênçãos de tua linhagem. Recebe com gratidão o legado de amor e força.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Ritual de recepção - aceitar herança positiva',
      metaMensuravel: 'Integrar 3 qualidades ancestrais',
      decretosDiarios: [
        'Recebo com gratidão minha herança',
        'Sou digno das bênçãos familiares',
        'Continuo o legado de amor',
      ],
    },
  },

  // TRABALHO + IDENTIDADE
  'trabalho_identidade': {
    diagnosticoBase: {
      temaCentral: 'Carreira alinhada com verdadeira identidade',
      padroesSombra: 'Trabalho desconectado de propósito pessoal',
      potencialDesenvolvimento: 'Profissão que expressa verdadeiro ser',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 132, // 88 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Construtor-Mestre',
    },
    mensagemThoth: 'Teu trabalho é expressão de tua alma. Constrói uma carreira que honra quem tu és.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Exploração de vocação - valores e talentos',
      metaMensuravel: 'Identificar vocação verdadeira',
      decretosDiarios: [
        'Meu trabalho expressa minha verdade',
        'Sou criador de meu destino profissional',
        'Minha carreira honra quem sou',
      ],
    },
  },

  // TRABALHO + SEGURANÇA
  'trabalho_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Estabilidade e segurança profissional',
      padroesSombra: 'Insegurança no trabalho, medo de perda',
      potencialDesenvolvimento: 'Segurança profissional duradoura',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 210, // 88 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Construtor-Guardião',
    },
    mensagemThoth: 'Tua segurança profissional é construída sobre alicerces sólidos. Constrói com confiança.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Desenvolvimento de competências - segurança profissional',
      metaMensuravel: 'Adquirir 1 nova competência profissional',
      decretosDiarios: [
        'Sou seguro e competente em meu trabalho',
        'Minha carreira é estável e próspera',
        'Confio em minhas habilidades profissionais',
      ],
    },
  },

  // TRABALHO + MERECIMENTO
  'trabalho_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para sucesso profissional',
      padroesSombra: 'Bloqueio de sucesso, síndrome do impostor',
      potencialDesenvolvimento: 'Sucesso profissional merecido',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 187, // 88 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Construtor-Imperatriz',
    },
    mensagemThoth: 'Tu mereces sucesso profissional. Reclama teu lugar de poder e autoridade.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Superação da síndrome do impostor - reconhecimento',
      metaMensuravel: 'Aumentar confiança profissional em 75%',
      decretosDiarios: [
        'Mereço sucesso e reconhecimento profissional',
        'Sou competente e capaz',
        'Meu trabalho é valorizado e recompensado',
      ],
    },
  },

  // PROSPERIDADE + IDENTIDADE
  'prosperidade_identidade': {
    diagnosticoBase: {
      temaCentral: 'Identidade de pessoa próspera',
      padroesSombra: 'Identidade de escassez, mentalidade pobre',
      potencialDesenvolvimento: 'Identidade de abundância',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 143, // 99 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Imperatriz-Mestre',
    },
    mensagemThoth: 'Tu és um ser de abundância. Reclama tua identidade de prosperidade e fluxo.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Reprogramação de crenças sobre dinheiro',
      metaMensuravel: 'Transformar 5 crenças sobre abundância',
      decretosDiarios: [
        'Sou um ser de abundância e prosperidade',
        'Minha identidade atrai riqueza',
        'Mereço viver em abundância',
      ],
    },
  },

  // PROSPERIDADE + SEGURANÇA
  'prosperidade_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Segurança financeira e fluxo sustentável',
      padroesSombra: 'Medo financeiro, bloqueio de fluxo',
      potencialDesenvolvimento: 'Fluxo financeiro seguro e sustentável',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 221, // 99 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Imperatriz-Guardião',
    },
    mensagemThoth: 'Teu fluxo financeiro é seguro e abundante. Limpa o medo e recebe a prosperidade.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Limpeza de bloqueios financeiros - visualização',
      metaMensuravel: 'Aumentar fluxo financeiro em 50%',
      decretosDiarios: [
        'Sou seguro financeiramente',
        'Meu fluxo de dinheiro é abundante',
        'Recebo dinheiro com facilidade',
      ],
    },
  },

  // PROSPERIDADE + MERECIMENTO (Exemplo da documentação)
  'prosperidade_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Bloqueio de recepção na esfera da prosperidade',
      padroesSombra: 'Culpa sobre dinheiro, rejeição de abundância',
      potencialDesenvolvimento: 'Recepção plena de prosperidade',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 198, // 99 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Imperatriz-Imperatriz',
    },
    mensagemThoth: 'Tu não precisas provar que merece. Precisas permitir que flua.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Diário da Abundância - Dias 15-21',
      metaMensuravel: 'Receber e registrar 21 formas de abundância',
      decretosDiarios: [
        'Mereço abundância em todas as formas',
        'Permito que a prosperidade flua para mim',
        'Sou um imã para riqueza e bênçãos',
      ],
    },
  },

  // MISSÃO + IDENTIDADE
  'missao_identidade': {
    diagnosticoBase: {
      temaCentral: 'Descoberta e expressão da missão de vida',
      padroesSombra: 'Perda de propósito, falta de direção',
      potencialDesenvolvimento: 'Vida dedicada à missão sagrada',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 155, // 111 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Visionário-Mestre',
    },
    mensagemThoth: 'Tua missão é sagrada e única. Descobre-a e dedica tua vida a ela.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Exploração de propósito - visão de vida',
      metaMensuravel: 'Definir missão de vida pessoal',
      decretosDiarios: [
        'Minha missão é clara e sagrada',
        'Vivo com propósito e significado',
        'Minha vida é expressão de minha missão',
      ],
    },
  },

  // MISSÃO + SEGURANÇA
  'missao_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Segurança no caminho da missão',
      padroesSombra: 'Medo de seguir missão, insegurança de propósito',
      potencialDesenvolvimento: 'Confiança inabalável na missão',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 233, // 111 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Visionário-Guardião',
    },
    mensagemThoth: 'Teu caminho é seguro e iluminado. Segue tua missão com confiança absoluta.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Alinhamento com missão - ações concretas',
      metaMensuravel: 'Tomar 3 ações alinhadas com missão',
      decretosDiarios: [
        'Sou seguro em minha missão',
        'Confio no caminho que se desdobra',
        'Minha missão me protege e guia',
      ],
    },
  },

  // MISSÃO + MERECIMENTO
  'missao_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para viver a missão plenamente',
      padroesSombra: 'Indignidade para missão, autossabotagem de propósito',
      potencialDesenvolvimento: 'Vida dedicada à missão sagrada',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 210, // 111 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Visionário-Imperatriz',
    },
    mensagemThoth: 'Tu mereces viver tua missão plenamente. Reclama teu lugar de poder e propósito.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Implementação da missão - plano de ação',
      metaMensuravel: 'Criar plano de ação para missão',
      decretosDiarios: [
        'Mereço viver minha missão plenamente',
        'Sou digno de impacto e significado',
        'Minha missão transforma o mundo',
      ],
    },
  },

  // PROTEÇÃO + IDENTIDADE
  'protecao_identidade': {
    diagnosticoBase: {
      temaCentral: 'Identidade forte e proteção pessoal',
      padroesSombra: 'Vulnerabilidade, falta de limites',
      potencialDesenvolvimento: 'Força e proteção pessoal',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 166, // 122 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Guerreiro da Luz-Mestre',
    },
    mensagemThoth: 'Tu és um guerreiro de luz. Reclama tua força e protege teu espaço sagrado.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Estabelecimento de limites energéticos',
      metaMensuravel: 'Estabelecer 5 limites pessoais',
      decretosDiarios: [
        'Sou forte e protegido',
        'Meus limites são sagrados',
        'Sou guerreiro de minha própria vida',
      ],
    },
  },

  // PROTEÇÃO + SEGURANÇA
  'protecao_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Proteção completa e segurança total',
      padroesSombra: 'Medo de ataques, vulnerabilidade energética',
      potencialDesenvolvimento: 'Proteção inabalável',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 244, // 122 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Guerreiro da Luz-Guardião',
    },
    mensagemThoth: 'Estás completamente protegido. Tua escudo é impenetrável e tua força é infinita.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Prática de proteção energética - visualização',
      metaMensuravel: 'Praticar proteção diariamente',
      decretosDiarios: [
        'Estou completamente protegido',
        'Meu escudo energético é forte',
        'Nada negativo pode me afetar',
      ],
    },
  },

  // PROTEÇÃO + MERECIMENTO
  'protecao_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para proteção e defesa',
      padroesSombra: 'Culpa sobre autodefesa, sacrifício excessivo',
      potencialDesenvolvimento: 'Proteção assertiva e merecida',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 221, // 122 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Guerreiro da Luz-Imperatriz',
    },
    mensagemThoth: 'Tu mereces proteção e defesa. Reclama teu poder de guerreiro e protege o que é sagrado.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Assertividade e autodefesa - praticar dizer não',
      metaMensuravel: 'Praticar assertividade 5 vezes',
      decretosDiarios: [
        'Mereço proteção e segurança',
        'Sou forte na minha defesa',
        'Protejo o que é sagrado em mim',
      ],
    },
  },

  // LEGADO + IDENTIDADE
  'legado_identidade': {
    diagnosticoBase: {
      temaCentral: 'Identidade e legado pessoal',
      padroesSombra: 'Falta de legado, vida sem impacto',
      potencialDesenvolvimento: 'Legado significativo e duradouro',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 188, // 144 + 44
      comandoPrioritario: 'REORGANIZAR',
      arquetipioDominante: 'Ancião-Mestre',
    },
    mensagemThoth: 'Teu legado é tua marca no mundo. Cria algo que perdure além de ti.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Definição de legado pessoal',
      metaMensuravel: 'Definir legado desejado',
      decretosDiarios: [
        'Meu legado é significativo e duradouro',
        'Deixo marcas positivas no mundo',
        'Minha vida tem impacto profundo',
      ],
    },
  },

  // LEGADO + SEGURANÇA
  'legado_seguranca': {
    diagnosticoBase: {
      temaCentral: 'Legado seguro e transmissão de sabedoria',
      padroesSombra: 'Medo de ser esquecido, legado inseguro',
      potencialDesenvolvimento: 'Legado seguro e transmitido',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 266, // 144 + 122
      comandoPrioritario: 'LIMPAR',
      arquetipioDominante: 'Ancião-Guardião',
    },
    mensagemThoth: 'Teu legado é seguro e será transmitido. Tua sabedoria perdura eternamente.',
    plano21Dias: {
      fase: 1,
      exercicioPratico: 'Documentação de sabedoria - registro de conhecimento',
      metaMensuravel: 'Documentar 3 sabedorias importantes',
      decretosDiarios: [
        'Meu legado é seguro e duradouro',
        'Minha sabedoria é transmitida',
        'Sou guardião de conhecimento sagrado',
      ],
    },
  },

  // LEGADO + MERECIMENTO
  'legado_merecimento': {
    diagnosticoBase: {
      temaCentral: 'Autorização para deixar legado significativo',
      padroesSombra: 'Indignidade de legado, bloqueio de impacto',
      potencialDesenvolvimento: 'Legado transformador',
    },
    protocoloTerapeutico: {
      frequenciaTrabalho: 243, // 144 + 99
      comandoPrioritario: 'ANCORAR',
      arquetipioDominante: 'Ancião-Imperatriz',
    },
    mensagemThoth: 'Tu mereces deixar um legado transformador. Tua vida é um presente para o mundo.',
    plano21Dias: {
      fase: 2,
      exercicioPratico: 'Ação de impacto - contribuição significativa',
      metaMensuravel: 'Realizar ação de impacto significativo',
      decretosDiarios: [
        'Mereço deixar legado transformador',
        'Meu impacto é profundo e duradouro',
        'Sou um presente para o mundo',
      ],
    },
  },
};

// ============================================================================
// FUNÇÕES UTILITÁRIAS
// ============================================================================

export function obterInterpretacao(esfera: Esfera, nucleo: Nucleo): InterpretacaoCombinacao {
  const chave = `${esfera}_${nucleo}`;
  return MATRIZ_INTERPRETACOES[chave] || MATRIZ_INTERPRETACOES['corpo_identidade'];
}

export function calcularFrequenciaTrabalho(esfera: Esfera, nucleo: Nucleo): number {
  const freqEsfera = ESFERAS_DATA[esfera].frequencia;
  const freqNucleo = NUCLEOS_DATA[nucleo].frequencia;
  return freqEsfera + freqNucleo;
}

export function obterTop3Esferas(mapeamentos: MapeamentoEsfera[]): MapeamentoEsfera[] {
  return [...mapeamentos]
    .sort((a, b) => b.intensidade - a.intensidade)
    .slice(0, 3);
}

export function obterNucleoPredominante(mapeamentos: MapeamentoEsfera[]): Nucleo {
  const contagem: Record<Nucleo, number> = {
    identidade: 0,
    seguranca: 0,
    merecimento: 0,
  };

  mapeamentos.forEach((m) => {
    contagem[m.nucleo]++;
  });

  return Object.entries(contagem).sort(([, a], [, b]) => b - a)[0][0] as Nucleo;
}

export interface RelatorioSagrado {
  clienteId: string;
  dataAtendimento: string;
  top3Esferas: MapeamentoEsfera[];
  nucleoPredominante: Nucleo;
  arquetipioDominante: string;
  mensagemThoth: string;
  plano21Dias: any;
  frequenciasRecomendadas: number[];
  comandosMesa: string[];
}

export function gerarRelatorioSagrado(sessao: SessaoAtendimento): RelatorioSagrado {
  const top3 = obterTop3Esferas(sessao.mapeamentos);
  const nucleoPred = obterNucleoPredominante(sessao.mapeamentos);

  const interpretacoes = top3.map((m) => obterInterpretacao(m.esfera, m.nucleo));
  const mensagemThoth = interpretacoes[0]?.mensagemThoth || 'Mensagem de Thoth';

  const frequencias = top3.map((m) => calcularFrequenciaTrabalho(m.esfera, m.nucleo));
  const comandos = interpretacoes.map((i) => i.protocoloTerapeutico.comandoPrioritario);

  return {
    clienteId: sessao.clienteId,
    dataAtendimento: sessao.dataAtendimento,
    top3Esferas: top3,
    nucleoPredominante: nucleoPred,
    arquetipioDominante: NUCLEOS_DATA[nucleoPred].arquetipo,
    mensagemThoth,
    plano21Dias: interpretacoes[0]?.plano21Dias,
    frequenciasRecomendadas: frequencias,
    comandosMesa: comandos,
  };
}
