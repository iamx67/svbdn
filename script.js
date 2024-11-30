document.addEventListener('DOMContentLoaded', () => {
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString().slice(2)}`;
    const reportText = document.getElementById('reportText');
    const output = document.getElementById('output');
    const generateReport = document.getElementById('generateReport');
    const violatorsSection = document.getElementById('violatorSection');
    const violatorRadioButtons = document.getElementsByName('violators');

    violatorRadioButtons.forEach(button => {
        button.addEventListener('change', () => {
            violatorsSection.classList.toggle('hidden', button.value !== 'yes');
        });
    });

    generateReport.addEventListener('click', () => {
        const time = document.getElementById('time').value;
        const userInput = document.getElementById('userInput').value;
        const route = document.getElementById('route').value;
        const screenshot = document.getElementById('screenshot').value;
        const checkerName = document.getElementById('checkerName').value;
        const violators = document.getElementById('violators').value;

        let genderedDuty = userInput.match(/(а|ая|ь)$/i) ? 'Дежурила' : 'Дежурил';
        let userOutput = userInput.match(/^\d+$/) ? `[code][cat${userInput}][/code]` : userInput;

        let routeLink = screenshot ? `([url=${screenshot}]${route} маршрут[/url])` : `(${route} маршрут)`;

        let report = `[code][i]${formattedDate}[/i][/code]\n[code][u]Свободный дозор[/u][/code]\n[code][b]${time}[/b][/code]\n${genderedDuty}: ${userOutput} ${routeLink}.`;

        if (checkerName) {
            let genderedCheck = checkerName.match(/(а|ая|ь)$/i) ? 'Проверяла' : 'Проверял';
            report += `\n${genderedCheck}: ${checkerName}.`;
        }

        if (violatorRadioButtons[1].checked && violators) {
            report += `\nНарушители: ${violators}.`;
        } else {
            report += `\nНарушители: —.`;
        }

        reportText.textContent = report;
        output.classList.remove('hidden');
    });
});