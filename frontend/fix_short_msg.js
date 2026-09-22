const fs = require('fs');
const file = 'src/app/features/habits/components/habit-list/habit-list.component.ts';
let content = fs.readFileSync(file, 'utf8');

// Usamos regex para achar qualquer toast que comece com Missão Reportada!
content = content.replace(/this\.toastService\.show\('Miss[^]+?Guardi.*?', 'warning'\);/, "this.toastService.show('Miss\\u00E3o Reportada! \\uD83D\\uDCDC', 'warning');");

fs.writeFileSync(file, content, 'utf8');