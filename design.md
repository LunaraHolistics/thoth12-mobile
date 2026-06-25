# THOTH 12 - Design de Interface Móvel

## Visão Geral
Aplicativo móvel para interpretação vibracional com estética egípcia ornamental. Design otimizado para retrato (9:16) e uso com uma mão.

## Paleta de Cores
- **Dourado Primário**: #D4AF37 (títulos, destaques, ícones)
- **Azul Escuro**: #1B1B3A (backgrounds, cards)
- **Preto**: #000000 (texto, bordas)
- **Branco**: #FFFFFF (texto em fundos escuros)
- **Dourado Suave**: #E8D4A8 (backgrounds secundários)

## Lista de Telas

### 1. **Tela de Entrada (Input Screen)**
- Nome do cliente
- Data de nascimento
- Cidade/Estado
- Upload de foto (opcional)
- Upload de áudio (Testemunho Quântico - até 3 min)
- Campo de problema principal
- Botão "Iniciar Mapeamento"

### 2. **Tela de Mapeamento Radiônico (Radionic Mapping)**
- Grid de 12 cards interativos (esferas)
- Para cada esfera:
  - Slider de intensidade (0-100%)
  - Seleção de Núcleo (Identidade, Segurança, Merecimento)
  - Campo de observações
- Botão "Gerar Relatório Sagrado"

### 3. **Tela de Relatório (Report Screen)**
- Visualização do relatório completo
- Gráfico de radar das 12 esferas
- Top 3 esferas prioritárias
- Núcleo predominante
- Arquétipo dominante
- Mensagem de Thoth personalizada
- Plano de 21 dias
- Botão "Exportar PDF"

### 4. **Tela de Histórico (History Screen)**
- Lista de atendimentos anteriores
- Comparação antes/depois
- Acesso rápido aos relatórios

### 5. **Tela de Painel do Terapeuta (Therapist Dashboard)**
- Upload em lote de conteúdo (21 dias)
- Acompanhamento de engajamento
- Gerenciamento de clientes

## Funcionalidades Principais

### Fluxo Principal
1. Usuário preenche tela de entrada
2. Navega para mapeamento radiônico
3. Ajusta sliders e seleciona núcleos
4. Gera relatório automático
5. Visualiza e exporta PDF

### Interpretação Automática
- Matriz de 36 combinações (12 esferas × 3 núcleos)
- Geração automática de:
  - Diagnóstico base
  - Protocolo terapêutico
  - Mensagem de Thoth
  - Plano de 21 dias

### Banco de Dados
- Salvar todos os atendimentos
- Permitir comparação de sessões
- Exportar dados para análise
- Identificar padrões recorrentes

## Tipografia
- **Títulos**: Serifada elegante (ex: Playfair Display)
- **Corpo**: Sans-serif legível (ex: Inter, Roboto)
- **Tamanhos**: 
  - H1: 28px
  - H2: 24px
  - H3: 20px
  - Body: 16px
  - Caption: 12px

## Componentes de UI

### Cards das Esferas
- Ícone simbólico (Thoth/egípcio)
- Nome da esfera
- Slider de intensidade
- Dropdown para núcleo
- Campo de observações (expandível)

### Gráfico de Radar
- Visualização das 12 esferas
- Intensidades como raios
- Cores diferenciadas por núcleo

### Relatório PDF
- Cabeçalho com logo THOTH 12
- Dados do cliente
- Gráfico de radar
- Seções estruturadas
- Design egípcio ornamental

## Ícones Simbólicos
- **Corpo**: Silhueta humana
- **Energia Vital**: Raio/chama
- **Emoções**: Coração
- **Mente**: Cérebro
- **Espiritualidade**: Lótus
- **Relacionamentos**: Dois corações
- **Família**: Árvore genealógica
- **Trabalho**: Ferramentas
- **Prosperidade**: Moeda/abundância
- **Missão**: Bússola
- **Proteção**: Escudo
- **Legado**: Pergaminho

## Padrões de Interação
- Sliders com feedback tátil
- Transições suaves entre telas
- Confirmação visual de seleções
- Loading states durante processamento
- Toast notifications para ações
- Swipe para voltar (iOS)

## Responsividade
- Layout otimizado para retrato
- Suporte a diferentes tamanhos de tela
- Texto legível em todas as resoluções
- Botões com tamanho mínimo de 44x44pt
