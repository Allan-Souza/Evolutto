# 🎬 Roteiro de Vídeo para LinkedIn: Projeto Evolutto

**Duração Estimada:** 2 a 3 minutos
**Formato:** Você no canto da tela (webcam) e a tela do PC sendo compartilhada (mostrando o app rodando, o código e o Docker).

---

## 1. O Gancho (0:00 - 0:30)
*O que falar (Câmera focada em você ou na tela inicial do app):*
"Olá pessoal! Hoje quero compartilhar com vocês um projeto fullstack que venho desenvolvendo: o **Evolutto**. 
Ele é um rastreador de hábitos gamificado, mas com um diferencial focado em acompanhamento parental ou de mentoria, onde uma pessoa (o Aventureiro) completa tarefas, e outra (o Guardião) acompanha o progresso e aprova recompensas. O objetivo aqui foi aplicar conceitos complexos de regras de negócio em uma arquitetura limpa e escalável."

## 2. A Stack Tecnológica (0:30 - 0:50)
*O que falar (Mostre rapidamente o VS Code com o backend e frontend lado a lado, ou o Docker Desktop rodando os containers):*
"Para construir isso, utilizei uma stack bem robusta:
No **Frontend**, utilizei **Angular** com TypeScript, focando na reatividade com RxJS e componentização para criar essa interface imersiva de RPG.
No **Backend**, optei pelo ecossistema Java com **Spring Boot 3**. O banco de dados é o **PostgreSQL**, e toda a infraestrutura está rodando localmente orquestrada com **Docker Compose**."

## 3. A Demonstração do Produto e Código (0:50 - 1:50)
*O que falar (Vá para o navegador, mostre a tela de Hábitos. Crie um hábito novo e marque-o como concluído. Mostre o XP subindo):*
"Aqui no frontend, o usuário tem a sua lista de hábitos. Quando eu completo um 'Hábito Bom', o Angular faz uma requisição HTTP para a minha API REST no Spring Boot. 

*(Opcional: mostre rapidamente o arquivo `HabitService.java` na tela)*
No backend, eu construí o que chamo de 'Motor de RPG' no service layer. O Spring Boot valida o usuário, calcula a dificuldade da tarefa, e processa a matriz de recompensas. O banco de dados é atualizado via Spring Data JPA, e o usuário ganha XP e Moedas, podendo até subir de nível se atingir a meta calculada de forma dinâmica.

Se eu cometer um 'Hábito Ruim', o motor aplica um 'Debuff', que é uma penalidade que será enviada para a análise do Guardião."

## 4. O Desafio Técnico (1:50 - 2:20)
*O que falar (Volte o foco para você ou para um pedaço de código que você tem orgulho):*
"Um dos maiores desafios técnicos desse projeto foi garantir a integridade dessas regras de gamificação. A matemática de progressão de nível e controle de 'streaks' (ofensivas diárias) precisava estar fortemente isolada e transacional no backend, garantindo que o frontend atue apenas como uma camada de apresentação burra (dumb client), o que torna a aplicação muito mais segura contra trapaças dos usuários."

## 5. Fechamento e Call to Action (2:20 - 2:40)
*O que falar (Sorria, tela focada em você):*
"O projeto ainda está em evolução, e as próximas fases envolvem implementar a lógica completa da Lojinha de Recompensas e o sistema de notificações em tempo real.
Se você trabalha com Java, Angular ou curte arquitetura de software, o que achou dessa abordagem para as regras de negócio? Deixe um comentário, feedbacks são sempre bem-vindos! O link do repositório está no post. Um abraço!"

---

## 💡 Dicas para a Gravação:
1. **Ligue tudo antes:** Antes de gravar, dê um `docker-compose up -d`, rode o backend (`mvn spring-boot:run`) e o frontend (`ng serve`). Garanta que o app está abrindo lisinho.
2. **Deixe o VS Code no jeito:** Deixe as abas do `HabitService.java` e do `habit.service.ts` (ou a tela do frontend) abertas para você só clicar e mostrar na hora que estiver falando.
3. **Não precisa ser perfeito:** Se você gaguejar um pouco, não tem problema. O mercado valoriza a autenticidade e a capacidade de explicar a lógica por trás do código.
