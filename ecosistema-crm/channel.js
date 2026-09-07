//Contact by WhatsApp

popupWhatsApp = () => {
    
    let btnClosePopup = document.querySelector('.closePopup');
    let btnOpenPopup = document.querySelector('.whatsapp-button');
    let popup = document.querySelector('.popup-whatsapp');
    let sendBtn = document.getElementById('send-btn');

    // Recuperar el estado guardado en localStorage
    let isPopupActive = localStorage.getItem('isPopupActive') === 'true';
    let hasSeenPopup = localStorage.getItem('hasSeenPopup') === 'true';

    // Establecer el estado inicial del popup
    if (isPopupActive) {
        popup.classList.add('is-active-whatsapp-popup');
    } else {
        popup.classList.remove('is-active-whatsapp-popup');
    }

    // Mostrar el popup automáticamente después de 3 segundos, solo si no se ha visto antes
    if (!hasSeenPopup) {
        setTimeout(() => {
            popup.classList.add('is-active-whatsapp-popup');
            localStorage.setItem('isPopupActive', 'true'); // Guardar estado abierto
            localStorage.setItem('hasSeenPopup', 'true'); // Marcar que ya se mostró una vez
        }, 3000);
    }

    btnClosePopup.addEventListener("click",  () => {
      popup.classList.toggle('is-active-whatsapp-popup');
      localStorage.setItem('isPopupActive', 'false'); // Guardar estado cerrado
    })
    
    btnOpenPopup.addEventListener("click",  () => {
      popup.classList.toggle('is-active-whatsapp-popup');
      popup.style.animation = "fadeIn .6s 0.0s both";
      // Guardar estado abierto/cerrado
      if (popup.classList.contains('is-active-whatsapp-popup')) {
        localStorage.setItem('isPopupActive', 'true');
        } else {
            localStorage.setItem('isPopupActive', 'false');
        }
    });
    
    sendBtn.addEventListener("click", () => {
    let msg = document.getElementById('whats-in').value;
    let relmsg = msg.replace(/ /g,"%20");
      
    window.open('https://wa.me/573213900071?text='+relmsg, '_blank'); 
    
    });
  }

  popupWhatsApp();

  //CHATBOT WEB
  // Variables globales
  let isTyping = false;
  let isOpen = false;

  // DOM elements
  const chatToggle = document.getElementById('chatToggle');
  const chatIcon = document.getElementById('chatIcon');
  const chatWidget = document.getElementById('chatWidget');
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const messagesContainer = document.getElementById('messagesContainer');

  // Toggle del chat
  function toggleChat() {
      isOpen = !isOpen;
      chatWidget.classList.toggle('open', isOpen);
      chatToggle.classList.toggle('open', isOpen);
      
      chatIcon.textContent = isOpen ? '✕' : '💬';

      if (isOpen) focusInput();
  }

  // Eventos
  chatToggle.addEventListener('click', toggleChat);

  chatForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const messageText = messageInput.value.trim();
      
      if (messageText && !isTyping) {
          await sendMessage(messageText);
      }
  });

  messageInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          if (!isTyping) {
              chatForm.dispatchEvent(new Event('submit'));
          }
      }
  });

  messageInput.addEventListener('input', function() {
      adjustTextareaHeight(this);
  });

  // 🚀 FUNCIÓN PRINCIPAL (CORREGIDA)
  async function sendMessage(message) {
  try {
    isTyping = true;
    sendButton.disabled = true;
    messageInput.disabled = true;

    addMessage(message, 'user');
    messageInput.value = '';

    showTypingIndicator();

    const response = await fetch("https://chatbot-web-chi-nine.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        channel: "web",
        user_id: userId
      })
    });

    if (!response.ok) {
      throw new Error("Error en el servidor");
    }

    const data = await response.json();

    hideTypingIndicator();

    const botMessageElement = addMessage("", 'bot');

    const reply = data?.reply?.trim()
        ? data.reply
        : "⚠️ No pude generar respuesta";

    await simulateTypingWithFormat(botMessageElement, reply);

  } catch (error) {
    console.error("❌ Error:", error);

    hideTypingIndicator();
    addMessage("⚠️ Error conectando con la IA", "bot");

  } finally {
    isTyping = false;
    sendButton.disabled = false;
    messageInput.disabled = false;
    focusInput();
  }
}

  // ✨ EFECTO DE ESCRITURA
  async function simulateTypingWithFormat(element, text) {
      const words = text.split(' ');
      let currentText = '';
      
      for (let i = 0; i < words.length; i++) {
          currentText += (i ? ' ' : '') + words[i];
          
          element.innerHTML = formatBotMessage(currentText);
          scrollToBottom();
          
          await new Promise(r => setTimeout(r, Math.random() * 60 + 30));
      }
  }

  // ➕ AGREGAR MENSAJES
  function addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${sender}`;
      
      const avatarDiv = document.createElement('div');
      avatarDiv.className = `message-avatar ${sender}-avatar`;
      avatarDiv.textContent = sender === 'user' ? 'Tú' : 'AI';
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'message-content';
      
      if (sender === 'bot') {
          contentDiv.innerHTML = formatBotMessage(text);
      } else {
          contentDiv.textContent = text;
      }
      
      messageDiv.appendChild(avatarDiv);
      messageDiv.appendChild(contentDiv);
      
      messagesContainer.appendChild(messageDiv);
      scrollToBottom();
      
      return contentDiv;
  }

  // 🎨 FORMATO DE TEXTO
  function formatBotMessage(text) {
      if (!text) return '';

      // =====================================================
      // 1. LIMPIEZA INICIAL
      // =====================================================

      let formatted = text.trim();

      // Eliminar caracteres accidentales alrededor de Markdown
      formatted = formatted
          .replace(/<\s*(?=\[)/g, '')
          .replace(/(?<=\))\s*>/g, '');

      // Eliminar %3E accidental al final de URLs Markdown
      formatted = formatted.replace(
          /(https?:\/\/[^\s)]+?)%3E(?=\))/gi,
          '$1'
      );

      // Eliminar %3C accidental al final/inicio de URLs Markdown
      formatted = formatted.replace(
          /(https?:\/\/[^\s)]+?)%3C(?=\))/gi,
          '$1'
      );

      // Eliminar > accidental antes del cierre del Markdown
      formatted = formatted.replace(
          /(https?:\/\/[^\s)]+?)[>]+(?=\))/gi,
          '$1'
      );

      // =====================================================
      // 2. ESCAPAR HTML
      // =====================================================

      formatted = formatted
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');

      // =====================================================
      // 3. LIMPIAR MARKDOWN MALFORMADO
      // =====================================================

      // [&lt;texto...] → [texto...]
      formatted = formatted.replace(
          /&lt;(\[[^\]]+\]\(https?:\/\/[^)]+\))/gi,
          '$1'
      );

      // [texto](url)&gt; → [texto](url)
      formatted = formatted.replace(
          /(\[[^\]]+\]\(https?:\/\/[^)]+\))&gt;/gi,
          '$1'
      );

      // =====================================================
      // 4. MARKDOWN DE ENLACES
      // =====================================================

      formatted = formatted.replace(
          /\[([^\]]+)\]\\?\((https?:\/\/[^\s)]+)\\?\)/gi,
          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      );

      // =====================================================
      // 5. NEGRITA
      // =====================================================

      formatted = formatted.replace(
          /\*\*([^*]+)\*\*/g,
          '<strong>$1</strong>'
      );

      // =====================================================
      // 6. CURSIVA
      // =====================================================

      formatted = formatted.replace(
          /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
          '$1<em>$2</em>'
      );

      // =====================================================
      // 7. SALTOS DE LÍNEA
      // =====================================================

      formatted = formatted.replace(/\n/g, '<br>');

      return `<p>${formatted}</p>`;
  }

  // ⏳ TYPING INDICATOR
  function showTypingIndicator() {
      const div = document.createElement('div');
      div.id = 'typingIndicator';
      div.className = 'message bot';
      div.innerHTML = `
          <div class="message-avatar bot-avatar">AI</div>
          <div class="message-content">Escribiendo...</div>
      `;
      messagesContainer.appendChild(div);
      scrollToBottom();
  }

  function hideTypingIndicator() {
      const el = document.getElementById('typingIndicator');
      if (el) el.remove();
  }

  // 🔽 SCROLL
  function scrollToBottom() {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // 📏 TEXTAREA
  function adjustTextareaHeight(textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';
  }

  // 🎯 FOCUS
  function focusInput() {
      setTimeout(() => {
          if (!isTyping && isOpen) {
              messageInput.focus();
          }
      }, 100);
  }

  let userId = localStorage.getItem("user_id");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("user_id", userId);
  }