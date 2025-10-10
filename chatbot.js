

lucide.createIcons();

    // --- LÓGICA DO CHATBOT (COPIADA E ADAPTADA) ---
    document.addEventListener('DOMContentLoaded', () => {
        // Inicialização de Socket.IO
        // Note que o caminho da imagem do mascote foi corrigido para 'static/img/ortofix.png' se necessário
        const socket = io('https://chatortofix.onrender.com/');
       
        const chatButton = document.getElementById('chat-button');
        const chatbotPopup = document.getElementById('chatbot-popup');
        const closeButton = document.getElementById('close-button');
        const sendButton = document.getElementById('send-button');
        const userInput = document.getElementById('user-input');
        const messagesContainer = document.getElementById('messages-container');
        const loadingDots = document.querySelector('.loading-dots');

        // --- Lógica de exibição e ocultação do pop-up ---
        if (chatButton && chatbotPopup) {
    chatButton.addEventListener('click', () => {
        chatbotPopup.classList.toggle('visible');
        if (chatbotPopup.classList.contains('visible')) {
            userInput.focus(); // Adiciona foco ao input quando o chat abre
        }
    });
        }

        if (closeButton && chatbotPopup) {
            closeButton.addEventListener('click', () => {
                chatbotPopup.classList.remove('visible');
            });
        }

        // --- Lógica de comunicação com o servidor ---
        socket.on('connect', () => {
            console.log('Conectado ao servidor WebSocket');
        });

        socket.on('disconnect', () => {
            console.log('Desconectado do servidor WebSocket');
        });

        socket.on('nova_mensagem', (data) => {
            loadingDots.style.display = 'none'; // Esconde os pontos de carregamento
            const botMessage = data.texto;
            appendMessage('bot', botMessage);
        });

        socket.on('erro', (data) => {
            loadingDots.style.display = 'none'; // Esconde os pontos de carregamento
            console.error('Erro do servidor:', data.erro);
            appendMessage('bot', `Ocorreu um erro: ${data.erro}`);
        });

        // --- Lógica para enviar mensagens ---
        if (sendButton) sendButton.addEventListener('click', sendMessage);
        if (userInput) userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const userMessage = userInput.value.trim();
            if (userMessage === '') return;

            appendMessage('user', userMessage);
            userInput.value = '';
            loadingDots.style.display = 'block'; // Mostra os pontos de carregamento
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Rola para ver o loading

            // Emite um evento 'enviar_mensagem' com o texto para o servidor
            socket.emit('enviar_mensagem', { mensagem: userMessage });
        }

        function appendMessage(sender, text) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', `${sender}-message`);
            messageElement.textContent = text;
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });
