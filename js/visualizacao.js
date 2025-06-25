// js/visualizacao.js

document.addEventListener('DOMContentLoaded', () => {
    const necessidadesContainer = document.getElementById('necessidades-container');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const closeModalBtn = document.querySelector('.close-button');

    let idNecessidadeParaExcluir = null;

    // Função para exibir as necessidades
    const exibirNecessidades = () => {
        let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];

        necessidadesContainer.innerHTML = ''; 

        if (necessidades.length === 0) {
            necessidadesContainer.innerHTML = `
                <p class="no-necessities-message">Nenhuma necessidade cadastrada ainda. Seja o primeiro a ajudar!</p>
            `;
        } else {
            necessidades.forEach(necessidade => {
                const card = document.createElement('div');
                card.classList.add('necessidade-card');
                card.dataset.id = necessidade.id; 

                card.innerHTML = `
                    <h3>${necessidade.tituloNecessidade}</h3>
                    <p class="tipo-ajuda">Tipo de Ajuda: ${necessidade.tipoAjuda}</p>
                    <p class="instituicao">Instituição: ${necessidade.nomeInstituicao}</p>
                    <p class="descricao">${necessidade.descricaoDetalhada}</p>
                    <p class="localizacao">Local: ${necessidade.enderecoCidade} - ${necessidade.enderecoEstado}</p>
                    <p class="contato">Contato: ${necessidade.contato}</p>
                    <button class="btn btn-card btn-excluir" data-id="${necessidade.id}">Excluir</button>
                `;
                
                necessidadesContainer.appendChild(card);
            });

            // Adiciona event listeners aos botões de excluir
            document.querySelectorAll('.btn-excluir').forEach(button => {
                button.addEventListener('click', (event) => {
                    idNecessidadeParaExcluir = parseInt(event.target.dataset.id);
                    confirmDeleteModal.classList.add('active'); // Exibe o modal
                });
            });
        }
    };

    // Função para excluir uma necessidade (chamada após a confirmação do modal)
    const excluirNecessidade = (id) => {
        let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        
        necessidades = necessidades.filter(necessidade => necessidade.id !== id);
        
        localStorage.setItem('necessidades', JSON.stringify(necessidades));
        
        exibirNecessidades(); // Reexibe as necessidades para atualizar a tela
        alert('Necessidade excluída com sucesso!'); // Feedback ao usuário
    };

    // Event listeners para o modal de confirmação
    confirmDeleteBtn.addEventListener('click', () => {
        if (idNecessidadeParaExcluir !== null) {
            excluirNecessidade(idNecessidadeParaExcluir);
            idNecessidadeParaExcluir = null; // Reseta a variável
        }
        confirmDeleteModal.classList.remove('active'); // Esconde o modal
    });

    cancelDeleteBtn.addEventListener('click', () => {
        idNecessidadeParaExcluir = null; // Reseta a variável
        confirmDeleteModal.classList.remove('active'); // Esconde o modal
    });

    closeModalBtn.addEventListener('click', () => {
        idNecessidadeParaExcluir = null; // Reseta a variável
        confirmDeleteModal.classList.remove('active'); // Esconde o modal
    });

    // Fechar o modal clicando fora dele
    window.addEventListener('click', (event) => {
        if (event.target == confirmDeleteModal) {
            idNecessidadeParaExcluir = null; // Reseta a variável
            confirmDeleteModal.classList.remove('active');
        }
    });

    // Chama a função para exibir as necessidades quando a página é carregada
    exibirNecessidades();
});