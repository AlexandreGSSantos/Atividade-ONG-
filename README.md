# Ajuda Voluntária

Este projeto é uma plataforma simples desenvolvida em HTML, CSS e JavaScript puro para conectar instituições e pessoas que precisam de ajuda (necessidades) com voluntários ou doadores. Ele conta com um layout responsivo, interatividade e boas práticas de acessibilidade.

## 🚀 Visão Geral

Uma instituição social (ONG) dedicada a diversas causas na comunidade tem enfrentado desafios para conectar-se com voluntários que desejam ajudar. Atualmente, a captação é feita de forma manual e descentralizada, o que dificulta a organização e a divulgação das necessidades reais. Essa instituição inspirou a criação de uma plataforma que aproxima ONGs de voluntários.

## 📌 Funcionalidades

* **Página Inicial:** Uma breve apresentação sobre a plataforma e seu propósito.
* **Cadastro de Necessidades:**
    * Formulário intuitivo para instituições cadastrarem suas demandas por ajuda.
    * Integração com a **API ViaCEP** para preenchimento automático de endereço com base no CEP.
    * **Feedback visual** de sucesso ou erro (mensagens na tela) após a submissão do formulário.
    * Validação básica de campos obrigatórios.
* **Visualização de Necessidades:**
    * Exibição dinâmica de todas as necessidades cadastradas em formato de cards.
    * Armazenamento das necessidades no `localStorage` do navegador, persistindo os dados mesmo após o fechamento da página.
    * Funcionalidade de **exclusão de necessidades individuais**, com um **modal de confirmação** para evitar exclusões acidentais.
* **Navegação Responsiva:**
    * Navegação intuitiva e responsiva com **menu hambúrguer** para dispositivos móveis, garantindo boa usabilidade em diferentes tamanhos de tela.
* **Acessibilidade Básica:** Utiliza semântica HTML para melhorar a acessibilidade.

## 📂 Estrutura de Arquivos

seu_projeto/
├── css/
│   └── main.css
├── html/
│   ├── cadastrar-necessidade.html
│   ├── index.html
│   └── visualizar-necessidades.html
├── Imagens/
│   ├── download (1).jpg
│   ├── download (2).jpg
│   └── Logo-ONG.png
├── js/
│   ├── cadastro.js
│   ├── main.js
│   └── visualizacao.js
└── README.md

## 🚀 Como Executar

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/AlexandreGSSantos/Atividade-ONG-.git] (https://alexandregssantos.github.io/Atividade-ONG-/) # 
    cd ATIVIDADE-ONG-
    ```
2.  **Abra os arquivos no navegador:**
    Navegue até a pasta do projeto e abra os arquivos `.html` (ex: `index.html`, `cadastrar-necessidade.html`, `visualizar-necessidades.html`) diretamente no seu navegador. Nenhuma instalação de dependências é necessária, pois o projeto é todo em HTML/CSS/JS puro.

## 💻 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (vanilla)
* API ViaCEP

## 🛠️ Ferramentas e Recursos

* VS Code (editor de código)
* Git e GitHub (controle de versão e hospedagem do repositório)
* GitHub Pages (para hospedagem, se aplicável)
* Google Gemini (Para comentários durante o código)

## 🧑‍💻 Autor

* Alexandre G. S. Santos
