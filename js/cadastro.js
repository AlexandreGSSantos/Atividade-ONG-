// js/cadastro.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroNecessidadeForm');
    const cepInput = document.getElementById('cep');
    const enderecoRuaInput = document.getElementById('enderecoRua');
    const enderecoBairroInput = document.getElementById('enderecoBairro');
    const enderecoCidadeInput = document.getElementById('enderecoCidade');
    const enderecoEstadoInput = document.getElementById('enderecoEstado');

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
        } else {
            limparEndereco();
            alert("CEP não encontrado.");
        }
    };

    // Event listener para o campo CEP
    cepInput.addEventListener('blur', () => {
        let cep = cepInput.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (cep != "") {
            const validaCep = /^[0-9]{8}$/; // Expressão regular para validar o CEP

            if(validaCep.test(cep)) {
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
                        alert("Erro ao buscar o CEP. Tente novamente.");
                    });
            } else {
                limparEndereco();
                alert("Formato de CEP inválido.");
            }
        } else {
            limparEndereco(); // Limpa se o CEP estiver vazio
        }
    });

    // Event listener para o submit do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

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
            alert('Por favor, preencha todos os campos obrigatórios (*).');
            return; // Impede a continuação se a validação falhar
        }

        // --- NOVA LÓGICA DE SALVAR NO LOCALSTORAGE ---
        let necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        necessidades.push(necessidade);
        localStorage.setItem('necessidades', JSON.stringify(necessidades));

        alert('Necessidade cadastrada com sucesso!');

        form.reset(); // Limpa o formulário após o cadastro
        limparEndereco(); // Garante que o endereço também seja limpo
    });
});