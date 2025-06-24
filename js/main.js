// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Função para alternar a classe 'active' no menu de navegação
    hamburgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Fechar o menu quando um link é clicado (útil para navegação em uma única página ou para uma melhor UX)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Opcional: Fechar o menu se clicar fora dele (para desktop em modo responsivo ou tablets)
    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !hamburgerMenu.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});