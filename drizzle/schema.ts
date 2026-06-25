import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, json, float } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ============================================================================
// TIPOS BASE
// ============================================================================

export type UserRole = "client" | "therapist" | "admin";
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
export type SessionStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type MaterialType = 'audio' | 'decree' | 'exercise' | 'symbol' | 'message';

// ============================================================================
// TABELA: USERS (Autenticação)
// ============================================================================

/**
 * Tabela de usuários do sistema (terapeutas e clientes)
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).unique(), // OAuth ID (pode ser null para login local)
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }), // Para login local (bcrypt)
  loginMethod: varchar("loginMethod", { length: 64 }), // 'oauth', 'local', 'google', etc.
  role: mysqlEnum("role", ["client", "therapist", "admin"]).default("client").notNull(),
  avatarUrl: text("avatarUrl"),
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================================================
// TABELA: CLIENTS (Consulentes)
// ============================================================================

/**
 * Dados completos dos clientes/consulentes
 */
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(), // Relação 1:1 com users
  fullName: text("fullName").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }),
  phone: varchar("phone", { length: 20 }),
  birthDate: timestamp("birthDate"),
  city: text("city"),
  state: varchar("state", { length: 2 }),
  country: varchar("country", { length: 100 }).default("Brasil"),
  photoUrl: text("photoUrl"),
  audioTestimonyUrl: text("audioTestimonyUrl"),
  mainProblem: text("mainProblem"),
  observations: text("observations"),
  consentAccepted: mysqlEnum("consentAccepted", ["true", "false"]).default("false").notNull(),
  consentDate: timestamp("consentDate"),
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

// ============================================================================
// TABELA: SESSIONS (Atendimentos)
// ============================================================================

/**
 * Sessões de atendimento terapêutico
 */
export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  therapistId: int("therapistId").notNull(),
  sessionDate: timestamp("sessionDate").notNull(),
  status: mysqlEnum("status", ["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled").notNull(),
  duration: int("duration"), // em minutos
  mainComplaint: text("mainComplaint"),
  observations: text("observations"),
  reportGenerated: mysqlEnum("reportGenerated", ["true", "false"]).default("false").notNull(),
  cycleStarted: mysqlEnum("cycleStarted", ["true", "false"]).default("false").notNull(),
  cycleStartDate: timestamp("cycleStartDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

// ============================================================================
// TABELA: SPHERE_MAPPINGS (Mapeamentos das 12 Esferas)
// ============================================================================

/**
 * Mapeamento individual de cada esfera (12 registros por sessão)
 */
export const sphereMappings = mysqlTable("sphere_mappings", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  sphere: mysqlEnum("sphere", [
    'corpo', 'energia_vital', 'emocoes', 'mente', 'espiritualidade',
    'relacionamentos', 'familia', 'trabalho', 'prosperidade',
    'missao', 'protecao', 'legado'
  ]).notNull(),
  intensity: int("intensity").notNull(), // 0-100
  nucleo: mysqlEnum("nucleo", ['identidade', 'seguranca', 'merecimento']).notNull(),
  observations: text("observations"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SphereMapping = typeof sphereMappings.$inferSelect;
export type InsertSphereMapping = typeof sphereMappings.$inferInsert;

// ============================================================================
// TABELA: REPORTS (Relatórios Sagrados)
// ============================================================================

/**
 * Relatórios sagrados gerados após cada sessão
 */
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull().unique(),
  pdfUrl: text("pdfUrl"),
  top3Spheres: json("top3Spheres"), // Array de { sphere, intensity, nucleo }
  predominantNucleo: mysqlEnum("predominantNucleo", ['identidade', 'seguranca', 'merecimento']),
  dominantArchetype: text("dominantArchetype"),
  thothMessage: text("thothMessage"),
  recommendedFrequencies: json("recommendedFrequencies"), // Array de números
  mesaCommands: json("mesaCommands"), // Array de strings
  oracleCards: json("oracleCards"), // Array de 3 cartas
  cycle21DaysPlan: json("cycle21DaysPlan"), // Plano completo
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;

// ============================================================================
// TABELA: CYCLE_21_DAYS (Progresso do Ciclo)
// ============================================================================

/**
 * Progresso diário do Ciclo de 21 Dias
 */
export const cycle21Days = mysqlTable("cycle_21_days", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull(),
  dayNumber: int("dayNumber").notNull(), // 1-21
  phase: mysqlEnum("phase", ['limpeza', 'reorganizacao', 'ancoragem']).notNull(),
  date: timestamp("date").notNull(),
  completed: mysqlEnum("completed", ["true", "false"]).default("false").notNull(),
  decree: text("decree"),
  exercise: text("exercise"),
  symbolUrl: text("symbolUrl"),
  audioUrl: text("audioUrl"),
  feedback: text("feedback"),
  observations: text("observations"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Cycle21Day = typeof cycle21Days.$inferSelect;
export type InsertCycle21Day = typeof cycle21Days.$inferInsert;

// ============================================================================
// TABELA: MATERIALS (Materiais de Apoio)
// ============================================================================

/**
 * Materiais de apoio (áudios, decretos, exercícios, símbolos)
 */
export const materials = mysqlTable("materials", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ['audio', 'decree', 'exercise', 'symbol', 'message']).notNull(),
  title: text("title").notNull(),
  content: text("content"), // Texto do decreto, exercício ou mensagem
  audioUrl: text("audioUrl"),
  imageUrl: text("imageUrl"),
  sphere: mysqlEnum("sphere", [
    'corpo', 'energia_vital', 'emocoes', 'mente', 'espiritualidade',
    'relacionamentos', 'familia', 'trabalho', 'prosperidade',
    'missao', 'protecao', 'legado'
  ]),
  nucleo: mysqlEnum("nucleo", ['identidade', 'seguranca', 'merecimento']),
  duration: int("duration"), // Duração em segundos (para áudios)
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Material = typeof materials.$inferSelect;
export type InsertMaterial = typeof materials.$inferInsert;

// ============================================================================
// TABELA: ORACLE_CARDS (Cartas do Oráculo)
// ============================================================================

/**
 * As 36 cartas do Oráculo THOTH 12
 */
export const oracleCards = mysqlTable("oracle_cards", {
  id: int("id").autoincrement().primaryKey(),
  cardNumber: int("cardNumber").notNull().unique(), // 1-36
  sphere: mysqlEnum("sphere", [
    'corpo', 'energia_vital', 'emocoes', 'mente', 'espiritualidade',
    'relacionamentos', 'familia', 'trabalho', 'prosperidade',
    'missao', 'protecao', 'legado'
  ]).notNull(),
  nucleo: mysqlEnum("nucleo", ['identidade', 'seguranca', 'merecimento']).notNull(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl"),
  archetype: text("archetype"),
  frequency: int("frequency"),
  diagnosis: text("diagnosis"),
  decree: text("decree"),
  exercise: text("exercise"),
  thothMessage: text("thothMessage"),
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OracleCard = typeof oracleCards.$inferSelect;
export type InsertOracleCard = typeof oracleCards.$inferInsert;

// ============================================================================
// RELACIONAMENTOS
// ============================================================================

/**
 * Relações entre as tabelas
 */

// Users → Clients
export const usersRelations = relations(users, ({ one }) => ({
  client: one(clients, {
    fields: [users.id],
    references: [clients.userId],
  }),
}));

// Clients → Sessions
export const clientsRelations = relations(clients, ({ one, many }) => ({
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
  sessions: many(sessions),
}));

// Sessions → Client, Therapist, Mappings, Report, Cycle
export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  client: one(clients, {
    fields: [sessions.clientId],
    references: [clients.id],
  }),
  therapist: one(users, {
    fields: [sessions.therapistId],
    references: [users.id],
  }),
  sphereMappings: many(sphereMappings),
  report: one(reports),
  cycle21Days: many(cycle21Days),
}));

// Sphere Mappings → Session
export const sphereMappingsRelations = relations(sphereMappings, ({ one }) => ({
  session: one(sessions, {
    fields: [sphereMappings.sessionId],
    references: [sessions.id],
  }),
}));

// Reports → Session
export const reportsRelations = relations(reports, ({ one }) => ({
  session: one(sessions, {
    fields: [reports.sessionId],
    references: [sessions.id],
  }),
}));

// Cycle 21 Days → Session
export const cycle21DaysRelations = relations(cycle21Days, ({ one }) => ({
  session: one(sessions, {
    fields: [cycle21Days.sessionId],
    references: [sessions.id],
  }),
}));

// Materials (sem relações diretas, mas podem ser filtrados por sphere/nucleo)
export const materialsRelations = relations(materials, () => ({}));

// Oracle Cards (sem relações diretas, mas podem ser filtrados por sphere/nucleo)
export const oracleCardsRelations = relations(oracleCards, () => ({}));