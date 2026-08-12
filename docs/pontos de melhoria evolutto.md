# Análise Completa do Estado Atual — Evolutto 🔍

Auditoria realizada em 12/08/2026 cobrindo **Frontend**, **Backend** e **Integrações**.

---

## 1. Estado do Frontend (Angular)

### ✅ O Que Já Está Pronto e Funcionando

| Módulo | Status | Detalhes |
|---|---|---|
| **Auth (Login/Cadastro)** | 🟢 Completo | Login direto como tela inicial, seleção de perfil no cadastro, tela "Entenda os Perfis", Guards (`authGuard` + `roleGuard`), JWT Interceptor pronto |
| **Hábitos (CRUD + Execução)** | 🟢 Completo | Criar, editar, excluir hábitos. Execução com cálculo de XP/Moedas, Debuffs, Streaks 🔥 |
| **Lojinha (CRUD + Compra)** | 🟢 Completo | Criar, editar, excluir recompensas. Comprar com validação de saldo |
| **Missões Inteligentes** | 🟢 Completo | Board com agrupamento (Diária/Semanal/Mensal), progresso automático via hábitos, resgate de prêmios |
| **Social (Leaderboard)** | 🟡 Básico | Apenas exibe ranking mockado estático de um grupo fixo. Não há CRUD de grupos, entrada em grupo nem ranking real |
| **Painel Guardião** | 🟡 Básico | Protegido pelo `roleGuard`, mas as funcionalidades dependem do backend (aprovação de logs, freeze de loja) |
| **Shared Components** | 🟢 Completo | Toast, ConfirmModal, LevelUpModal, ProfileModal (com logout) |
| **UserStore (Signals)** | 🟢 Completo | XP, Moedas, Nível, Debuffs, Avatar, Level Up animation |

---

### 🔴 Lacunas e Melhorias Pendentes no Frontend

#### A) Funcionalidades Faltantes

| # | O Que Falta | Impacto | Prioridade |
|---|---|---|---|
| 1 | **Persistência de sessão (token)** — O `AuthService` usa `signal` em memória. Ao recarregar a página, o usuário perde a sessão e precisa logar novamente. | UX Crítico | 🔴 Alta |
| 2 | **Carregar dados do usuário no login** — Ao logar, os Signals do `UserStoreService` começam zerados (XP=0, Nível=1, Moedas=0) em vez de buscar os dados reais do usuário. | UX Crítico | 🔴 Alta |
| 3 | **Social: CRUD de Grupos** — Não existe UI para criar grupo, buscar grupos, entrar/sair de um grupo. Só mostra ranking fixo. | Feature incompleta | 🟡 Média |
| 4 | **Missões: CRUD de Missões** — As missões são fixas em memória. Não há UI para o usuário (ou Guardião) criar missões customizadas. | Feature incompleta | 🟡 Média |
| 5 | **Guardião: Tela de vinculação de protegidos** — Não existe fluxo para um Guardião vincular/desvincular contas de Aventureiros ao seu painel. | Feature incompleta | 🟡 Média |

#### B) Melhorias de UX/Polish

| # | Melhoria | Detalhe |
|---|---|---|
| 6 | **Loading global / Skeleton para troca de rota** | Ao navegar entre abas, não há feedback visual de carregamento enquanto o lazy-loading resolve o chunk |
| 7 | **Empty States nos Hábitos e Lojinha** | Se o usuário excluir todos os hábitos ou recompensas, a tela fica completamente vazia sem nenhuma mensagem amigável |
| 8 | **Responsividade da barra de navegação** | Com 5 abas (Hábitos, Lojinha, Missões, Social, Guardião), os ícones ficam apertados em telas muito estreitas |

---

## 2. Estado do Backend (Spring Boot)

### ✅ O Que Já Está Pronto (Fase 0 Concluída)

| Componente | Status |
|---|---|
| `docker-compose.yml` (PostgreSQL 16 + Redis 7) | 🟢 Pronto |
| `pom.xml` (Spring Boot 3.3.2, JPA, Security, Redis, JWT, Lombok) | 🟢 Pronto |
| `application.yml` (Conexões, CORS, JWT secret) | 🟢 Pronto |
| `EvoluttoApplication.java` | 🟢 Pronto |
| `SecurityConfig.java` (Stateless, BCrypt, CSRF off) | 🟢 Pronto |
| `CorsConfig.java` (Angular localhost:4200) | 🟢 Pronto |

### 🔴 O Que Falta no Backend (Fases 1–7)

| Fase | Domínio | Status | O Que Precisa Ser Feito |
|---|---|---|---|
| **Fase 1** | Auth & Usuários | 🔴 Não iniciada | Entidade `User` (JPA), `JwtService`, `JwtAuthenticationFilter`, `AuthController` (register + login), BCrypt encoding |
| **Fase 2** | Hábitos & RPG Engine | 🔴 Não iniciada | Entidades `Habit` + `HabitLog`, `HabitService` (regras de XP/Moedas/Debuff/Streak/Level), `HabitController` (CRUD + execute) |
| **Fase 3** | Lojinha & Recompensas | 🔴 Não iniciada | Entidades `Reward` + `RewardRedemption`, `ShopService` (validação transacional), `ShopController` |
| **Fase 4** | Missões | 🔴 Não iniciada | Entidade `Mission` + relação com hábitos, `MissionService` (progresso automático + claim), `MissionController` |
| **Fase 5** | Controle Parental | 🔴 Não iniciada | `ParentalRelationship`, fluxo Maker/Checker (`PENDING_APPROVAL`), freeze de loja, `ParentalController` |
| **Fase 6** | Social & Leaderboard | 🔴 Não iniciada | Entidades `Group` + `GroupMember`, Redis ZSET para ranking, `GroupController` |
| **Fase 7** | Integração Front↔Back | 🔴 Não iniciada | Substituir todos os `of().pipe(delay())` dos services Angular por `HttpClient` real apontando para `localhost:8080/api/v1/...` |

---

## 3. Estado das Integrações (Front ↔ Back)

| Ponto de Integração | Status Atual | O Que Precisa Acontecer |
|---|---|---|
| **JWT Interceptor** (`jwt.interceptor.ts`) | 🟢 Código pronto, mas inativo | Já injeta `Authorization: Bearer <token>` em toda requisição HTTP. Só vai funcionar quando trocarmos os mocks por `HttpClient`. |
| **DTOs / Interfaces** (`core/models/`) | 🟢 Prontos e alinhados com os docs | Os 6 arquivos de model (`auth`, `habit`, `mission`, `shop`, `social`, `parental`) já espelham os Records Java dos PDFs. |
| **Services Mockados** → **HttpClient Real** | 🔴 Não migrado | Todos os 6 services (`AuthService`, `HabitService`, `ShopService`, `MissionService`, `SocialService`, `ParentalService`) usam `of().pipe(delay())`. Precisam virar `this.http.get/post/put/delete()`. |
| **UserStore hydration** | 🔴 Inexistente | Após login, o backend deveria retornar os dados completos do perfil (XP, moedas, nível, debuff, avatar) e o `UserStoreService` deveria ser populado com esses valores em vez de começar zerado. |
| **CORS** | 🟢 Configurado | `CorsConfig.java` já libera `localhost:4200` com os métodos e headers necessários. |

---

## 4. Priorização Recomendada — O Que Fazer Agora?

### Caminho A: "Backend First" (Recomendado ⭐)
Seguir executando as Fases 1→7 do plano de backend. O frontend já está maduro e completo para um MVP visual. O maior valor agora está em **dar vida real aos dados**.

**Ordem sugerida:**
1. **Fase 1 (Auth)** → Primeiro endpoint real, token JWT circulando
2. **Fase 2 (Hábitos)** → O core do produto rodando no banco
3. **Fase 3 (Lojinha)** → Economia de moedas persistida
4. **Fase 7 parcial** → Integrar os 3 domínios acima no front-end e validar o fluxo end-to-end
5. **Fase 4 (Missões)** → Persistir missões no banco
6. **Fase 5 (Parental)** → Fluxo Maker/Checker real
7. **Fase 6 (Social)** → Redis + Leaderboard
8. **Fase 7 completa** → Integração final de todos os módulos

### Caminho B: "Frontend Polish"
Antes de ir para o backend, corrigir os 2 pontos críticos de UX (sessão perdida no reload e dados zerados no login) e adicionar empty states.

> [!IMPORTANT]
> **Minha recomendação: ir direto pelo Caminho A.** Os dois problemas de UX (itens 1 e 2 da lista de lacunas) se resolvem **naturalmente** quando fizermos a Fase 1 do backend + integração, pois o token JWT será armazenado de forma adequada e os dados do usuário virão do banco de dados real.
