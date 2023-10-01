import { pgTable, pgEnum, serial, text, integer, timestamp, foreignKey, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"
export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const computers = pgTable("computers", {
	id: serial("id").primaryKey().notNull(),
	brand: text("brand").notNull(),
	cores: integer("cores").notNull(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
});

export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const icons = pgTable("icons", {
	id: serial("id").primaryKey().notNull(),
	prompt: text("prompt"),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	userId: text("userId").references(() => user.id),
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationtokenIdentifierToken: primaryKey(table.identifier, table.token)
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountProviderProvideraccountid: primaryKey(table.provider, table.providerAccountId)
	}
});