// tracking.js

// Inicializa o objeto de rastreamento
const Tracking = {
    investments: [], // Array para armazenar os dados de investimento

    // Método para rastrear visualizações de projetos
    trackProjectView: function(projectName) {
        const timestamp = new Date().toISOString();
        this.investments.push({
            event: 'project_view',
            project: projectName,
            time: timestamp
        });
        console.log(`Projeto visualizado: ${projectName} em ${timestamp}`);
    },

    // Método para rastrear investimentos
    trackInvestment: function(projectName, amount) {
        const timestamp = new Date().toISOString();
        this.investments.push({
            event: 'investment',
            project: projectName,
            amount: amount,
            time: timestamp
        });
        console.log(`Investimento de R$${amount} realizado em ${projectName} em ${timestamp}`);
    },

    // Método para exibir o histórico de rastreamento
    displayTrackingHistory: function() {
        console.log('Histórico de rastreamento:');
        this.investments.forEach(investment => {
            console.log(investment);
        });
    }
};

// Exemplo de uso
// Rastreando visualizações de projetos
document.querySelectorAll('.projeto img').forEach(img => {
    img.addEventListener('click', function() {
        const projectName = this.alt; // Usa o texto alternativo da imagem como nome do projeto
        Tracking.trackProjectView(projectName);
    });
});

// Rastreando investimentos (exemplo fictício)
document.getElementById('investirButton').addEventListener('click', function() {
    const projectName = 'Nome do Projeto'; // Altere para obter o nome do projeto em questão
    const amount = 100; // Altere para obter o valor investido
    Tracking.trackInvestment(projectName, amount);
});
