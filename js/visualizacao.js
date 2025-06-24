// js/visualizacao.js

document.addEventListener('DOMContentLoaded', () => {
    const necessidadesContainer = document.getElementById('necessidades-container');

    // Função para exibir as necessidades
    const exibirNecessidades = () => {
        let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];

        // Limpa o container antes de adicionar novas necessidades
        necessidadesContainer.innerHTML = ''; 

        if (necessidades.length === 0) {
            // Exibe a mensagem se não houver necessidades
            necessidadesContainer.innerHTML = `
                <p class="no-necessities-message">Nenhuma necessidade cadastrada ainda. Seja o primeiro a ajudar!</p>
            `;
        } else {
            // Cria e adiciona um card para cada necessidade
            necessidades.forEach(necessidade => {
                const card = document.createElement('div');
                card.classList.add('necessidade-card');
                card.dataset.id = necessidade.id; // Armazena o ID no dataset do elemento

                card.innerHTML = `
                    <h3>${necessidade.tituloNecessidade}</h3>
                    <p class="tipo-ajuda">Tipo de Ajuda: ${necessidade.tipoAjuda}</p>
                    <p class="instituicao">Instituição: ${necessidade.nomeInstituicao}</p>
                    <p class="descricao">${necessidade.descricaoDetalhada}</p>
                    <p class="localizacao">Local: ${necessidade.enderecoCidade} - ${necessidade.enderecoEstado}</p>
                    <p class="contato">Contato: ${necessidade.contato}</p>
                    `;
                // Botão de exemplo, você pode estilizar ou mudar
                // <button class="btn btn-card">Ver Detalhes</button>

                necessidadesContainer.appendChild(card);
            });
        }
    };

    // Chama a função para exibir as necessidades quando a página é carregada
    exibirNecessidades();
});