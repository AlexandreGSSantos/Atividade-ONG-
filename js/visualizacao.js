// js/visualizacao.js

document.addEventListener('DOMContentLoaded', () => {
    const necessidadesContainer = document.getElementById('necessidades-container');
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const closeModalBtn = document.querySelector('.close-button');

    // NOVO: Elementos de filtro
    const searchKeywordInput = document.getElementById('searchKeyword');
    const filterTipoAjudaSelect = document.getElementById('filterTipoAjuda');
    const filterCidadeInput = document.getElementById('filterCidade');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    let idNecessidadeParaExcluir = null;

    // Função para exibir as necessidades (AGORA RECEBE UMA LISTA OPCIONAL)
    const exibirNecessidades = (necessidadesParaExibir = null) => {
        let necessidades = necessidadesParaExibir || JSON.parse(localStorage.getItem('necessidades')) || [];

        necessidadesContainer.innerHTML = ''; 

        if (necessidades.length === 0) {
            necessidadesContainer.innerHTML = `
                <p class="no-necessities-message">Nenhuma necessidade encontrada com os filtros aplicados.</p>
            `;
            // Se não houver necessidades, mas o filtro for o padrão, mostra a mensagem original
            if (!necessidadesParaExibir && !searchKeywordInput.value && filterTipoAjudaSelect.value === "" && !filterCidadeInput.value) {
                 necessidadesContainer.innerHTML = `
                    <p class="no-necessities-message">Nenhuma necessidade cadastrada ainda. Seja o primeiro a ajudar!</p>
                `;
            }
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
                    confirmDeleteModal.classList.add('active'); 
                });
            });
        }
    };

    // Função para excluir uma necessidade
    const excluirNecessidade = (id) => {
        let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        
        necessidades = necessidades.filter(necessidade => necessidade.id !== id);
        
        localStorage.setItem('necessidades', JSON.stringify(necessidades));
        
        // Chama exibirNecessidades() sem argumentos para recarregar todas as necessidades
        // ou com os filtros atuais aplicados se houver.
        aplicarFiltros(); 
        alert('Necessidade excluída com sucesso!');
    };

    // NOVO: Função para aplicar os filtros
    const aplicarFiltros = () => {
        const todasNecessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        let necessidadesFiltradas = todasNecessidades;

        const keyword = searchKeywordInput.value.toLowerCase().trim();
        const tipoAjuda = filterTipoAjudaSelect.value;
        const cidade = filterCidadeInput.value.toLowerCase().trim();

        if (keyword) {
            necessidadesFiltradas = necessidadesFiltradas.filter(necessidade => 
                necessidade.tituloNecessidade.toLowerCase().includes(keyword) ||
                necessidade.descricaoDetalhada.toLowerCase().includes(keyword)
            );
        }

        if (tipoAjuda) {
            necessidadesFiltradas = necessidadesFiltradas.filter(necessidade => 
                necessidade.tipoAjuda === tipoAjuda
            );
        }

        if (cidade) {
            necessidadesFiltradas = necessidadesFiltradas.filter(necessidade => 
                necessidade.enderecoCidade.toLowerCase().includes(cidade)
            );
        }

        exibirNecessidades(necessidadesFiltradas); // Exibe apenas as necessidades filtradas
    };

    // NOVO: Função para limpar os filtros
    const limparFiltros = () => {
        searchKeywordInput.value = '';
        filterTipoAjudaSelect.value = ''; // Reseta para a opção padrão
        filterCidadeInput.value = '';
        exibirNecessidades(); // Reexibe todas as necessidades
    };

    // Event listeners para o modal de confirmação (sem alterações aqui)
    confirmDeleteBtn.addEventListener('click', () => {
        if (idNecessidadeParaExcluir !== null) {
            excluirNecessidade(idNecessidadeParaExcluir);
            idNecessidadeParaExcluir = null;
        }
        confirmDeleteModal.classList.remove('active'); 
    });

    cancelDeleteBtn.addEventListener('click', () => {
        idNecessidadeParaExcluir = null; 
        confirmDeleteModal.classList.remove('active'); 
    });

    closeModalBtn.addEventListener('click', () => {
        idNecessidadeParaExcluir = null; 
        confirmDeleteModal.classList.remove('active'); 
    });

    window.addEventListener('click', (event) => {
        if (event.target == confirmDeleteModal) {
            idNecessidadeParaExcluir = null; 
            confirmDeleteModal.classList.remove('active');
        }
    });

    // NOVO: Event listeners para os botões de filtro
    applyFiltersBtn.addEventListener('click', aplicarFiltros);
    clearFiltersBtn.addEventListener('click', limparFiltros);

    // Opcional: Aplicar filtros ao digitar/selecionar (melhora a UX, mas pode ser mais custoso)
    searchKeywordInput.addEventListener('input', aplicarFiltros); // Filtra em tempo real
    filterTipoAjudaSelect.addEventListener('change', aplicarFiltros); // Filtra ao mudar o tipo
    filterCidadeInput.addEventListener('input', aplicarFiltros); // Filtra em tempo real

    // Chama a função para exibir as necessidades quando a página é carregada (AGORA COM OS FILTROS INICIAIS)
    aplicarFiltros(); // Chama aplicarFiltros para carregar as necessidades (e aplicar filtros vazios inicialmente)
});