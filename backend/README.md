# Evolutto — Backend API (Spring Boot & Java 21)

Esta é a API REST Monolítica Modular responsável pela inteligência, persistência e gamificação do sistema **Evolutto**.

## 🚀 Como Executar o Ambiente Local

### 1. Subir Banco de Dados e Cache (Docker Compose)
Na raiz do diretório `backend`, abra um terminal e execute:
```bash
docker-compose up -d
```
Isso irá inicializar o **PostgreSQL** na porta `5432` e o **Redis** na porta `6379`.

### 2. Rodar a Aplicação Spring Boot
Como o projeto está configurado para OpenJDK 21+ (testado e compatível com OpenJDK 24), você pode compilar e rodar utilizando o seu Maven ou diretamente pela sua IDE (Eclipse, IntelliJ ou VS Code) executando a classe principal `EvoluttoApplication.java`.
Se preferir por linha de comando no terminal do backend:
```bash
mvn spring-boot:run
```
A API iniciará de forma stateless na porta `http://localhost:8080` com CORS devidamente autorizado para receber requisições do front-end Angular (`http://localhost:4200`).
