<template>
  <!-- Burbuja flotante -->
  <div class="chat-widget">
    <!-- Botón flotante -->
    <button
      class="chat-fab"
      :class="{ 'chat-fab--open': isOpen }"
      @click="toggleChat"
      aria-label="Abrir chat de ayuda"
    >
      <transition name="icon-fade" mode="out-in">
        <svg v-if="!isOpen" class="chat-fab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c5.5 0 10 4 10 9s-4.5 9-10 9a11.1 11.1 0 0 1-4.7-1L2 22l2.3-5A8 8 0 0 1 2 12c0-5 4.5-9 10-9zm-4 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
        </svg>
        <svg v-else class="chat-fab-icon chat-fab-icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </transition>
      <!-- Badge de notificación -->
      <span v-if="!isOpen && hasUnread" class="chat-fab-badge"></span>
    </button>

    <!-- Ventana de chat -->
    <transition name="chat-slide">
      <div v-if="isOpen" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-avatar">
            <span class="chat-header-initial">B</span>
          </div>
          <div class="chat-header-info">
            <h3>NutriKer</h3>
            <span class="chat-status">
              <span class="chat-status-dot"></span>
              En línea · Responde rápido
            </span>
          </div>
        </div>

        <!-- Mensajes -->
        <div class="chat-messages" ref="messagesEl">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="['chat-message', msg.from === 'bot' ? 'chat-message--bot' : 'chat-message--user']"
          >
            <div v-if="msg.from === 'bot'" class="chat-message-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z"/>
              </svg>
            </div>
            <div class="chat-bubble">
              <p>{{ msg.text }}</p>
              <span class="chat-time">{{ msg.time }}</span>
            </div>
          </div>

          <!-- Indicador de "escribiendo" -->
          <div v-if="isTyping" class="chat-message chat-message--bot">
            <div class="chat-message-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z"/>
              </svg>
            </div>
            <div class="chat-bubble chat-bubble--typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <!-- Input de texto libre -->
        <div class="chat-input-area">
          <input
            v-model="userInput"
            type="text"
            placeholder="Escribe tu mensaje..."
            @keydown.enter="sendFreeText"
          />
          <button @click="sendFreeText" :disabled="!userInput.trim()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// ─── Webhook n8n ────────────────────────────────────────────────────────────
const N8N_WEBHOOK = 'https://yaywiin.app.n8n.cloud/webhook/agente-nutriologa'

// ─── Estado ────────────────────────────────────────────────────────────────
const isOpen      = ref(false)
const hasUnread   = ref(true)
const isTyping    = ref(false)
const messages    = ref([])
const userInput   = ref('')
const messagesEl  = ref(null)

// ─── Helpers ────────────────────────────────────────────────────────────────
const now = () => {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

const addBotMessage = (text) => {
  messages.value.push({ from: 'bot', text, time: now() })
  scrollToBottom()
}

const addUserMessage = (text) => {
  messages.value.push({ from: 'user', text, time: now() })
  scrollToBottom()
}

const initChat = async () => {
  isTyping.value = true
  await new Promise(r => setTimeout(r, 600))
  isTyping.value = false
  addBotMessage('¡Hola! 👋 Bienvenido a NutriKer. Escribe tu consulta y nuestro agente virtual te atenderá.')
}

// ─── Acciones ────────────────────────────────────────────────────────────────
const toggleChat = () => {
  isOpen.value = !isOpen.value
  hasUnread.value = false
  if (isOpen.value && messages.value.length === 0) {
    initChat()
  }
}

const sendFreeText = async () => {
  const text = userInput.value.trim()
  if (!text || isTyping.value) return

  addUserMessage(text)
  userInput.value = ''
  isTyping.value = true

  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput: text, sessionId: sessionId.value })
    })

    if (!res.ok) throw new Error('Error en el servidor')
    const data = await res.json()

    // n8n devuelve un array: [{ "output": "..." }]
    const item = Array.isArray(data) ? data[0] : data
    const reply =
      item?.output ||
      item?.text ||
      item?.message ||
      (typeof item === 'string' ? item : null) ||
      'Lo siento, no pude procesar tu mensaje. Intenta de nuevo.'

    isTyping.value = false
    addBotMessage(reply)
  } catch (err) {
    console.error('[ChatWidget] Error al llamar n8n:', err)
    isTyping.value = false
    addBotMessage('Hubo un problema al conectar con el asistente. Por favor intenta de nuevo. 🙏')
  }
}

// ID de sesión único por visita (para mantener contexto en n8n)
const sessionId = ref(`session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`)
</script>

<style scoped>
/* ── Widget container ─────────────────────────────────────── */
.chat-widget {
  position: fixed;
  bottom: 1.75rem;
  right: 1.75rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  font-family: var(--font-main);
}

/* ── FAB Button ──────────────────────────────────────────── */
.chat-fab {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(74, 140, 91, 0.45);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, box-shadow 0.3s ease;
  transform-origin: center;
}

.chat-fab:hover {
  transform: scale(1.1) translateY(-4px);
  box-shadow: 0 12px 35px rgba(74, 140, 91, 0.55);
}

.chat-fab--open {
  background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
  transform: rotate(360deg) scale(0.95);
}

.chat-fab--open:hover {
  transform: rotate(360deg) scale(1.05);
}

.chat-fab-icon {
  width: 26px;
  height: 26px;
}

.chat-fab-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  background: var(--color-secondary);
  border-radius: 50%;
  border: 2px solid white;
  animation: pulse-badge 1.5s infinite;
}

@keyframes pulse-badge {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* ── Chat Window ─────────────────────────────────────────── */
.chat-window {
  width: 360px;
  max-height: 540px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Slide animation */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;
}
.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.3);
  pointer-events: none;
}

/* Icon Fade Animation */
.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: rotate(-90deg) scale(0.2);
}

/* ── Header ──────────────────────────────────────────────── */
.chat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
}

.chat-header-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-header-initial {
  font-family: var(--font-main);
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  line-height: 1;
}

.chat-header-info {
  flex: 1;
}

.chat-header-info h3 {
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.2;
}

.chat-status {
  font-size: 0.75rem;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.chat-status-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* ── Messages ─────────────────────────────────────────────── */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar { width: 4px; }
.chat-messages::-webkit-scrollbar-track { background: transparent; }
.chat-messages::-webkit-scrollbar-thumb { background: rgba(74, 140, 91, 0.3); border-radius: 4px; }

.chat-message {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.chat-message--bot { justify-content: flex-start; }
.chat-message--user { justify-content: flex-end; flex-direction: row-reverse; }

.chat-message-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-message-avatar svg {
  width: 14px;
  height: 14px;
  fill: white;
}

.chat-bubble {
  max-width: 78%;
  padding: 0.6rem 0.875rem;
  border-radius: 16px;
  line-height: 1.5;
  font-size: 0.875rem;
  position: relative;
}

.chat-message--bot .chat-bubble {
  background: white;
  color: var(--color-text);
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chat-message--user .chat-bubble {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  border-bottom-right-radius: 4px;
}

.chat-bubble p {
  white-space: pre-line;
}

.chat-time {
  display: block;
  font-size: 0.65rem;
  margin-top: 0.3rem;
  opacity: 0.55;
  text-align: right;
}

/* Typing indicator */
.chat-bubble--typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0.75rem 1rem;
  background: white;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chat-bubble--typing span {
  width: 7px;
  height: 7px;
  background: var(--color-primary);
  border-radius: 50%;
  animation: typing-dot 1.2s infinite;
  opacity: 0.5;
}

.chat-bubble--typing span:nth-child(2) { animation-delay: 0.2s; }
.chat-bubble--typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing-dot {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-5px); opacity: 1; }
}

/* ── Options ──────────────────────────────────────────────── */
.chat-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-bg);
  border-top: 1px solid rgba(74, 140, 91, 0.15);
}

.chat-option-btn {
  background: white;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
  border-radius: 999px;
  padding: 0.4rem 0.875rem;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: var(--font-main);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.chat-option-btn:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 140, 91, 0.3);
}

/* ── Input Area ───────────────────────────────────────────── */
.chat-input-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border-top: 1px solid rgba(74, 140, 91, 0.15);
}

.chat-input-area input {
  flex: 1;
  border: 1.5px solid rgba(74, 140, 91, 0.3);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-family: var(--font-main);
  font-size: 0.875rem;
  color: var(--color-text);
  background: var(--color-bg);
  outline: none;
  transition: border-color 0.2s;
}

.chat-input-area input:focus {
  border-color: var(--color-primary);
  background: white;
}

.chat-input-area button {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.2s;
}

.chat-input-area button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.chat-input-area button:not(:disabled):hover {
  transform: scale(1.08);
}

.chat-input-area button svg {
  width: 18px;
  height: 18px;
}

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 420px) {
  .chat-widget {
    bottom: 1rem;
    right: 1rem;
  }
  .chat-window {
    width: calc(100vw - 2rem);
    max-height: 480px;
  }
}
</style>
