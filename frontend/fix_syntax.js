const fs = require('fs');
const file = 'src/app/features/habits/components/habit-list/habit-list.component.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace using regex that ignores the exact mangled characters
content = content.replace(/this\.toastService\.show\(Voc.*?perdeu 10 XP e 10 Moedas!, 'danger'\);/, "this.toastService.show('Voc\\u00EA perdeu 10 XP e 10 Moedas!', 'danger');");

fs.writeFileSync(file, content, 'utf8');