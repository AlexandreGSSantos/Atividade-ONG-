// js/cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroNecessidadeForm');
    const cepInput = document.getElementById('cep');
    const enderecoRuaInput = document.getElementById('enderecoRua');
    const enderecoBairroInput = document.getElementById('enderecoBairro');
    const enderecoCidadeInput = document.getElementById('enderecoCidade');
    const enderecoEstadoInput = document.getElementById('enderecoEstado');
    const formMessageContainer = document.getElementById('formMessageContainer'); // NOVO: Elemento para mensagens

    // Função para limpar os campos de endereço
    const limparEndereco = () => {
        enderecoRuaInput.value = '';
        enderecoBairroInput.value = '';
        enderecoCidadeInput.value = '';
        enderecoEstadoInput.value = '';
    };

    // Função para preencher os campos de endereço
    const preencherEndereco = (data) => {
        if (!("erro" in data)) {
            enderecoRuaInput.value = data.logradouro;
            enderecoBairroInput.value = data.bairro;
            enderecoCidadeInput.value = data.localidade;
            enderecoEstadoInput.value = data.uf;
            // Remover mensagem de erro de CEP inválido se houver
            hideMessage(); // Esconde qualquer mensagem anterior
        } else {
            limparEndereco();
            showMessage('error', 'CEP não encontrado. Por favor, verifique.'); // Mensagem de erro
        }
    };

    // NOVO: Função para exibir mensagens
    const showMessage = (type, message) => {
        formMessageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        const messageElement = formMessageContainer.querySelector('.message');
        setTimeout(() => {
            messageElement.classList.add('show');
        }, 10); // Pequeno atraso para a transição funcionar

        // Opcional: esconder a mensagem após alguns segundos
        setTimeout(() => {
            hideMessage();
        }, 5000); // Mensagem some após 5 segundos
    };

    // NOVO: Função para esconder mensagens
    const hideMessage = () => {
        const messageElement = formMessageContainer.querySelector('.message');
        if (messageElement) {
            messageElement.classList.remove('show');
            // Remove o elemento após a transição para limpar o DOM
            messageElement.addEventListener('transitionend', () => {
                if (messageElement.parentNode) {
                    messageElement.parentNode.removeChild(messageElement);
                }
            }, { once: true });
        }
    };


    // Event listener para o campo CEP
    cepInput.addEventListener('blur', () => {
        let cep = cepInput.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (cep != "") {
            const validaCep = /^[0-9]{8}$/; // Expressão regular para validar o CEP

            if(validaCep.test(cep)) {
                hideMessage(); // Esconde qualquer mensagem anterior ao tentar buscar
                // Preenche os campos com "..." enquanto consulta
                enderecoRuaInput.value = "...";
                enderecoBairroInput.value = "...";
                enderecoCidadeInput.value = "...";
                enderecoEstadoInput.value = "...";

                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => preencherEndereco(data))
                    .catch(error => {
                        console.error('Erro ao buscar CEP:', error);
                        limparEndereco();
                        showMessage('error', 'Erro ao buscar o CEP. Tente novamente.'); // Mensagem de erro
                    });
            } else {
                limparEndereco();
                showMessage('error', 'Formato de CEP inválido. Use 8 dígitos numéricos.'); // Mensagem de erro
            }
        } else {
            limparEndereco(); // Limpa se o CEP estiver vazio
            hideMessage(); // Esconde a mensagem se o campo ficar vazio
        }
    });

    // Event listener para o submit do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
        hideMessage(); // Esconde qualquer mensagem anterior ao tentar submeter

        // Coletar os dados do formulário
        const necessidade = {
            id: Date.now(), // Adiciona um ID único baseado no timestamp
            nomeInstituicao: document.getElementById('nomeInstituicao').value,
            tipoAjuda: document.getElementById('tipoAjuda').value,
            tituloNecessidade: document.getElementById('tituloNecessidade').value,
            descricaoDetalhada: document.getElementById('descricaoDetalhada').value,
            cep: cepInput.value,
            enderecoRua: enderecoRuaInput.value,
            enderecoBairro: enderecoBairroInput.value,
            enderecoCidade: enderecoCidadeInput.value,
            enderecoEstado: enderecoEstadoInput.value,
            contato: document.getElementById('contato').value
        };

        // Validação simples dos campos obrigatórios (além do 'required' do HTML)
        if (!necessidade.nomeInstituicao || !necessidade.tipoAjuda || !necessidade.tituloNecessidade || !necessidade.descricaoDetalhada || !necessidade.cep || !necessidade.contato) {
            showMessage('error', 'Por favor, preencha todos os campos obrigatórios (*).'); // Mensagem de erro
            return; // Impede a continuação se a validação falhar
        }

        // --- Lógica de Salvar no LOCALSTORAGE ---
        let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        necessidades.push(necessidade);
        localStorage.setItem('necessidades', JSON.stringify(necessidades));

        showMessage('success', 'Necessidade cadastrada com sucesso!'); // Mensagem de sucesso

        form.reset(); // Limpa o formulário após o cadastro
        limparEndereco(); // Garante que o endereço também seja limpo

        // Opcional: Redirecionar para a página de visualização após um pequeno delay
        // setTimeout(() => {
        //     window.location.href = 'visualizar-necessidades.html';
        // }, 2000);
    });
});