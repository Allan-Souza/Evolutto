const fs = require('fs');

// 1. Mudar o redirecionamento principal para a tela de Login
const routesFile = 'src/app/app.routes.ts';
let routesContent = fs.readFileSync(routesFile, 'utf8');
routesContent = routesContent.replace(`redirectTo: '/habits'`, `redirectTo: '/login'`);
fs.writeFileSync(routesFile, routesContent, 'utf8');

// 2. Remover o cache do token (forçar a exigencia de login ao iniciar)
const authFile = 'src/app/core/auth/auth.service.ts';
let authContent = fs.readFileSync(authFile, 'utf8');

// Substitui a leitura do token pelo null padrão
authContent = authContent.replace(`localStorage.getItem(this.TOKEN_KEY)`, `null`);
// Remove a escrita do token no localStorage
authContent = authContent.replace(`localStorage.setItem(this.TOKEN_KEY, response.token);`, `// Sessão temporária sem cache no localStorage (MVP)`);
// Limpar também no logout
authContent = authContent.replace(`localStorage.removeItem(this.TOKEN_KEY);`, `// Limpo`);

fs.writeFileSync(authFile, authContent, 'utf8');
console.log("Rotas e Auth consertados!");