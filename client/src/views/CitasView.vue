<template>
  <div class="citas-page">
    <!-- Hero Section -->
    <section class="citas-hero">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Agenda tu consulta
        </div>
        <h1>Reserva tu <span class="text-highlight">Cita Médica</span></h1>
        <p>Evaluación nutricional y metabólica personalizada. Tu bienestar es nuestra prioridad.</p>
      </div>
    </section>

    <!-- Form Section -->
    <section class="citas-form-section">
      <div class="container form-layout">

        <!-- Info Cards -->
        <aside class="info-panel">
          <div class="info-card">
            <div class="info-icon">📍</div>
            <h3>Ubicación</h3>
            <p>Consultorio Bioclinik, Ciudad de Guatemala</p>
          </div>
          <div class="info-card">
            <div class="info-icon">🕐</div>
            <h3>Horarios de atención</h3>
            <p>Lunes a Viernes<br><strong>8:00 AM – 6:00 PM</strong></p>
          </div>
          <div class="info-card">
            <div class="info-icon">📞</div>
            <h3>¿Necesitas ayuda?</h3>
            <p>Llámanos y con gusto te orientamos para elegir el mejor horario.</p>
          </div>
          <div class="info-steps">
            <h3>¿Cómo funciona?</h3>
            <div class="step">
              <div class="step-num">1</div>
              <span>Completa el formulario con tus datos</span>
            </div>
            <div class="step">
              <div class="step-num">2</div>
              <span>Elige una fecha y horario disponible</span>
            </div>
            <div class="step">
              <div class="step-num">3</div>
              <span>Recibirás confirmación de tu cita</span>
            </div>
          </div>
        </aside>

        <!-- Main Form -->
        <div class="form-card">

          <!-- Success State -->
          <transition name="fade-scale">
            <div v-if="enviado" class="success-state">
              <div class="success-icon-wrap">
                <svg viewBox="0 0 52 52" class="checkmark-svg">
                  <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                  <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              <h2>¡Cita agendada!</h2>
              <p>Tu cita ha sido registrada exitosamente para el</p>
              <div class="success-details">
                <span class="success-badge">📅 {{ formatearFecha(form.fecha) }}</span>
                <span class="success-badge">🕐 {{ form.horario }} hrs</span>
              </div>
              <p class="success-note">Te esperamos en Bioclinik. Ante cualquier cambio, contáctanos con anticipación.</p>
              <button class="btn btn-primary" @click="reiniciar">Agendar otra cita</button>
            </div>
          </transition>

          <!-- Form -->
          <transition name="fade-up">
            <form v-if="!enviado" @submit.prevent="submitForm" novalidate>
              <div class="form-header">
                <h2>Datos de tu cita</h2>
                <p>Todos los campos marcados con * son obligatorios</p>
              </div>

              <!-- Error Banner -->
              <transition name="slide-down">
                <div v-if="errorMsg" class="error-banner" role="alert">
                  <div class="error-icon">⚠️</div>
                  <div class="error-content">
                    <strong>No se pudo agendar tu cita</strong>
                    <p>{{ errorMsg }}</p>
                    <button type="button" class="error-close" @click="errorMsg = ''">×</button>
                  </div>
                </div>
              </transition>

              <!-- Sección 1: Datos personales -->
              <fieldset class="form-section">
                <legend>
                  <span class="section-num">1</span>
                  Datos personales
                </legend>
                <div class="field-grid">
                  <div class="field-group" :class="{ 'has-error': errores.cliente_nombre }">
                    <label for="cliente_nombre">Nombre completo *</label>
                    <div class="input-wrap">
                      <span class="input-icon">👤</span>
                      <input
                        id="cliente_nombre"
                        v-model="form.cliente_nombre"
                        type="text"
                        placeholder="Tu nombre completo"
                        @blur="validarCampo('cliente_nombre')"
                      />
                    </div>
                    <span v-if="errores.cliente_nombre" class="field-error">{{ errores.cliente_nombre }}</span>
                  </div>
                  <div class="field-group" :class="{ 'has-error': errores.cliente_telefono }">
                    <label for="cliente_telefono">Teléfono *</label>
                    <div class="input-wrap">
                      <span class="input-icon">📱</span>
                      <input
                        id="cliente_telefono"
                        v-model="form.cliente_telefono"
                        type="tel"
                        placeholder="Ej. 5555-1234"
                        @blur="validarCampo('cliente_telefono')"
                      />
                    </div>
                    <span v-if="errores.cliente_telefono" class="field-error">{{ errores.cliente_telefono }}</span>
                  </div>
                </div>
              </fieldset>

              <!-- Sección 2: Fecha y Horario -->
              <fieldset class="form-section">
                <legend>
                  <span class="section-num">2</span>
                  Fecha y Horario
                </legend>

                <div class="field-grid">
                  <div class="field-group" :class="{ 'has-error': errores.fecha }">
                    <label for="fecha">Fecha de la cita *</label>
                    <div class="input-wrap">
                      <span class="input-icon">📅</span>
                      <input
                        id="fecha"
                        v-model="form.fecha"
                        type="date"
                        :min="fechaMinima"
                      />
                    </div>
                    <span v-if="errores.fecha" class="field-error">{{ errores.fecha }}</span>
                  </div>

                  <div class="field-group" :class="{ 'has-error': errores.horario }">
                    <label for="horario">
                      Horario *
                      <span v-if="cargandoHorarios" class="loading-chip ml-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">Consultando...</span>
                    </label>
                    <div class="input-wrap">
                      <span class="input-icon">🕒</span>
                      <select
                        id="horario"
                        v-model="form.horario"
                        :disabled="!form.fecha || cargandoHorarios"
                        class="select-input"
                      >
                        <option value="" disabled>
                          {{ !form.fecha ? 'Selecciona una fecha primero' : (cargandoHorarios ? 'Cargando...' : 'Elige tu horario') }}
                        </option>
                        <option
                          v-for="h in TODOS_LOS_HORARIOS"
                          :key="h"
                          :value="h"
                          :disabled="horariosOcupados.includes(h)"
                        >
                          {{ h }} {{ horariosOcupados.includes(h) ? '(Ocupado)' : 'hrs' }}
                        </option>
                      </select>
                    </div>
                    <span v-if="errores.horario" class="field-error">{{ errores.horario }}</span>
                  </div>
                </div>
              </fieldset>

              <!-- Sección 3: Datos médicos (opcionales) -->
              <fieldset class="form-section">
                <legend>
                  <span class="section-num">3</span>
                  Información de salud <span class="optional-tag">Opcional</span>
                </legend>

                <div class="field-group atencion-group">
                  <label>¿Has tenido atención previa en Bioclinik?</label>
                  <div class="radio-group">
                    <label class="radio-option" :class="{ active: form.atencion_previa === 'si' }">
                      <input type="radio" v-model="form.atencion_previa" value="si" />
                      <span class="radio-check"></span>
                      Sí, soy paciente previo
                    </label>
                    <label class="radio-option" :class="{ active: form.atencion_previa === 'no' }">
                      <input type="radio" v-model="form.atencion_previa" value="no" />
                      <span class="radio-check"></span>
                      No, es mi primera vez
                    </label>
                  </div>
                </div>

                <div class="field-grid medico-grid">
                  <div class="field-group">
                    <label for="peso">Peso (kg)</label>
                    <div class="input-wrap">
                      <span class="input-icon">⚖️</span>
                      <input
                        id="peso"
                        v-model="form.peso"
                        type="number"
                        min="1"
                        max="300"
                        step="0.1"
                        placeholder="Ej. 70.5"
                      />
                    </div>
                  </div>
                  <div class="field-group">
                    <label for="estatura">Estatura (m)</label>
                    <div class="input-wrap">
                      <span class="input-icon">📏</span>
                      <input
                        id="estatura"
                        v-model="form.estatura"
                        type="number"
                        min="0.5"
                        max="2.5"
                        step="0.01"
                        placeholder="Ej. 1.70"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>

              <!-- Submit -->
              <div class="form-footer">
                <p class="privacy-note">🔒 Tu información es confidencial y está protegida.</p>
                <button
                  type="submit"
                  class="btn btn-primary submit-btn"
                  :disabled="enviando"
                  :class="{ 'is-loading': enviando }"
                >
                  <span v-if="!enviando">Confirmar cita →</span>
                  <span v-else class="spinner-wrap">
                    <svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4" stroke-dashoffset="10"/></svg>
                    Agendando...
                  </span>
                </button>
              </div>
            </form>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const TODOS_LOS_HORARIOS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30'
]

// ── Estado ─────────────────────────────────────────────
const form = reactive({
  cliente_nombre: '',
  cliente_telefono: '',
  fecha: '',
  horario: '',
  atencion_previa: 'no',
  peso: '',
  estatura: ''
})

const errores = reactive({})
const errorMsg = ref('')
const enviando = ref(false)
const enviado = ref(false)
const cargandoHorarios = ref(false)
const horariosOcupados = ref([])

// ── Computed ────────────────────────────────────────────
const fechaMinima = computed(() => {
  const hoy = new Date()
  hoy.setDate(hoy.getDate() + 1) // mínimo mañana
  return hoy.toISOString().split('T')[0]
})

const horariosDisponibles = computed(() =>
  TODOS_LOS_HORARIOS.filter(h => !horariosOcupados.value.includes(h))
)

watch(() => form.fecha, async (newVal) => {
  form.horario = ''
  errores.fecha = ''
  if (!newVal) return

  cargandoHorarios.value = true
  horariosOcupados.value = []

  try {
    const res = await fetch(`${API_URL}/api/citas/horarios-ocupados?fecha=${newVal}`)
    if(res.ok) {
      const data = await res.json()
      horariosOcupados.value = data.ocupados || []
    }
  } catch (e) {
    console.error('Error al consultar horarios:', e)
  } finally {
    cargandoHorarios.value = false
  }
})

function validarCampo(campo) {
  const valor = form[campo]?.trim()
  if (campo === 'cliente_nombre') {
    errores.cliente_nombre = !valor ? 'El nombre es requerido.' : ''
  }
  if (campo === 'cliente_telefono') {
    errores.cliente_telefono = !valor ? 'El teléfono es requerido.' : ''
  }
}

function validarFormulario() {
  let valido = true
  validarCampo('cliente_nombre')
  validarCampo('cliente_telefono')

  if (!form.fecha) {
    errores.fecha = 'Selecciona una fecha.'
    valido = false
  }
  if (!form.horario) {
    errores.horario = 'Selecciona un horario.'
    valido = false
  }
  if (errores.cliente_nombre || errores.cliente_telefono) valido = false
  return valido
}

async function submitForm() {
  errorMsg.value = ''
  if (!validarFormulario()) return

  enviando.value = true
  try {
    const payload = {
      cliente_nombre: form.cliente_nombre.trim(),
      cliente_telefono: form.cliente_telefono.trim(),
      fecha: form.fecha,
      horario: form.horario,
      atencion_previa: form.atencion_previa,
      peso: form.peso && !isNaN(form.peso) ? parseFloat(form.peso) : null,
      estatura: form.estatura && !isNaN(form.estatura) ? parseFloat(form.estatura) : null
    }

    const res = await fetch(`${API_URL}/api/citas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      // Si el horario está ocupado u otro error del servidor
      errorMsg.value = data.error || 'Ocurrió un error. Por favor intenta de nuevo.'
      // Refrescar horarios ocupados por si alguien más tomó el horario
      if (data.codigo === 'HORARIO_OCUPADO') {
        await onFechaChange()
      }
      return
    }

    enviado.value = true
  } catch (e) {
    errorMsg.value = 'Error de conexión. Verifica tu internet e intenta de nuevo.'
  } finally {
    enviando.value = false
  }
}

function reiniciar() {
  Object.assign(form, {
    cliente_nombre: '', cliente_telefono: '', fecha: '',
    horario: '', atencion_previa: 'no', peso: '', estatura: ''
  })
  Object.keys(errores).forEach(k => delete errores[k])
  errorMsg.value = ''
  horariosOcupados.value = []
  enviado.value = false
}

function formatearFecha(fecha) {
  if (!fecha) return ''
  return new Date(fecha + 'T12:00:00').toLocaleDateString('es-MX', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

<style scoped>
/* ── Page Layout ─────────────────────────────────────── */
.citas-page {
  min-height: 100vh;
}

/* ── Hero ────────────────────────────────────────────── */
.citas-hero {
  position: relative;
  background: linear-gradient(135deg, var(--color-secondary) 0%, #0d347a 60%, var(--color-primary) 100%);
  padding: 5rem 0 7rem;
  overflow: hidden;
  text-align: center;
}

.hero-bg-shapes { position: absolute; inset: 0; pointer-events: none; }
.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  background: white;
  animation: float 8s ease-in-out infinite;
}
.shape-1 { width: 400px; height: 400px; top: -100px; right: -100px; animation-delay: 0s; }
.shape-2 { width: 250px; height: 250px; bottom: -80px; left: 5%; animation-delay: 2s; }
.shape-3 { width: 150px; height: 150px; top: 30%; left: 55%; animation-delay: 4s; }

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-20px) scale(1.05); }
}

.hero-content {
  position: relative;
  z-index: 1;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.25);
  backdrop-filter: blur(10px);
  padding: 0.4rem 1.2rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}
.badge-dot {
  width: 8px; height: 8px;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.4); }
}

.hero-content h1 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}
.text-highlight {
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-content p {
  font-size: 1.1rem;
  opacity: 0.85;
  max-width: 500px;
  margin: 0 auto;
}

/* ── Form Section ────────────────────────────────────── */
.citas-form-section {
  padding: 0 0 5rem;
  margin-top: -3.5rem;
}

.form-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  align-items: flex-start;
}

/* ── Info Panel ──────────────────────────────────────── */
.info-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 100px;
}

.info-card {
  background: white;
  border-radius: var(--radius-md);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid rgba(25, 98, 200, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}
.info-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.info-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
.info-card h3 { font-size: 0.9rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.3rem; }
.info-card p { font-size: 0.85rem; color: var(--color-text-light); line-height: 1.5; }

.info-steps {
  background: linear-gradient(135deg, var(--color-secondary), #0d347a);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  color: white;
}
.info-steps h3 { font-size: 0.9rem; font-weight: 700; margin-bottom: 1rem; opacity: 0.85; }
.step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  opacity: 0.9;
}
.step-num {
  width: 26px; height: 26px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 0.8rem; flex-shrink: 0;
}

/* ── Form Card ───────────────────────────────────────── */
.form-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid rgba(25, 98, 200, 0.08);
}

form { padding: 2.5rem; }

.form-header { margin-bottom: 2rem; }
.form-header h2 { font-size: 1.5rem; font-weight: 800; color: var(--color-secondary); }
.form-header p { color: var(--color-text-light); font-size: 0.9rem; margin-top: 0.25rem; }

/* ── Error Banner ────────────────────────────────────── */
.error-banner {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: #fff5f5;
  border: 1.5px solid #feb2b2;
  border-left: 4px solid #e53e3e;
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  margin-bottom: 2rem;
  position: relative;
}
.error-icon { font-size: 1.25rem; flex-shrink: 0; margin-top: 2px; }
.error-content { flex: 1; }
.error-content strong { display: block; color: #c53030; font-size: 0.95rem; margin-bottom: 0.25rem; }
.error-content p { color: #742a2a; font-size: 0.875rem; line-height: 1.5; margin: 0; }
.error-close {
  background: none; border: none; cursor: pointer;
  font-size: 1.25rem; color: #e53e3e; line-height: 1;
  position: absolute; top: 0.75rem; right: 0.75rem;
  opacity: 0.7; transition: opacity 0.2s;
}
.error-close:hover { opacity: 1; }

/* ── Fieldsets ───────────────────────────────────────── */
fieldset {
  border: none;
  padding: 0;
  margin: 0 0 2rem;
}

legend {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-secondary);
  margin-bottom: 1.25rem;
  width: 100%;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--color-bg);
}

.section-num {
  width: 28px; height: 28px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 800; flex-shrink: 0;
}

.optional-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-light);
  background: var(--color-bg);
  padding: 0.15rem 0.6rem;
  border-radius: var(--radius-full);
  margin-left: 0.5rem;
}

/* ── Field Grid ──────────────────────────────────────── */
.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.medico-grid { margin-top: 1.25rem; }

/* ── Field Group ─────────────────────────────────────── */
.field-group { display: flex; flex-direction: column; gap: 0.4rem; }

.field-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text);
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.9rem;
  font-size: 1rem;
  pointer-events: none;
  z-index: 1;
}

.input-wrap input,
.select-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  font-family: var(--font-main);
  color: var(--color-text);
  background: #fafbff;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  outline: none;
}

.input-wrap input:focus,
.select-input:focus {
  border-color: var(--color-primary);
  background: white;
  box-shadow: 0 0 0 3px rgba(25, 98, 200, 0.12);
}

.has-error .input-wrap input,
.has-error .select-input {
  border-color: #e53e3e;
  background: #fff5f5;
}

.field-error {
.atencion-group { margin-bottom: 1.25rem; }
.atencion-group > label { margin-bottom: 0.75rem; }

.radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1.25rem;
  border: 1.5px solid #e2e8f0;
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-light);
  transition: all 0.2s;
  user-select: none;
}
.radio-option input { display: none; }
.radio-check {
  width: 16px; height: 16px;
  border: 2px solid #cbd5e0;
  border-radius: 50%;
  transition: all 0.2s;
  flex-shrink: 0;
  position: relative;
}
.radio-option.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: #f0f5ff;
}
.radio-option.active .radio-check {
  border-color: var(--color-primary);
  background: var(--color-primary);
}
.radio-option.active .radio-check::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 5px; height: 5px;
  background: white;
  border-radius: 50%;
}

/* ── Form Footer ─────────────────────────────────────── */
.form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--color-bg);
  flex-wrap: wrap;
}

.privacy-note {
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.submit-btn {
  padding: 0.9rem 2.5rem;
  font-size: 1rem;
  min-width: 200px;
  border-radius: var(--radius-full);
  position: relative;
}
.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}
.spinner-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.spinner {
  width: 18px; height: 18px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Success State ───────────────────────────────────── */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 2.5rem;
  gap: 1rem;
}

.success-icon-wrap {
  width: 80px; height: 80px;
  margin-bottom: 0.5rem;
}

.checkmark-svg { width: 80px; height: 80px; }
.checkmark-circle {
  stroke: var(--color-primary);
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}
.checkmark-check {
  stroke: var(--color-primary);
  stroke-width: 3;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke-check 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
}
@keyframes stroke-circle {
  to { stroke-dashoffset: 0; }
}
@keyframes stroke-check {
  to { stroke-dashoffset: 0; }
}

.success-state h2 { font-size: 1.75rem; font-weight: 800; color: var(--color-secondary); }
.success-state > p { color: var(--color-text-light); }

.success-details {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem 0;
}
.success-badge {
  background: #f0f5ff;
  color: var(--color-primary);
  border: 1px solid #c3d4f5;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 700;
}
.success-note {
  font-size: 0.875rem;
  color: var(--color-text-light);
  max-width: 380px;
  line-height: 1.6;
}

/* ── Transitions ─────────────────────────────────────── */
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.35s ease;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0; transform: scale(0.95);
}

.fade-up-enter-active { transition: all 0.35s ease; }
.fade-up-enter-from { opacity: 0; transform: translateY(12px); }

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0; transform: translateY(-10px); max-height: 0;
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 900px) {
  .form-layout {
    grid-template-columns: 1fr;
  }
  .info-panel {
    position: static;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .info-steps { grid-column: 1 / -1; }
}

@media (max-width: 640px) {
  form { padding: 1.5rem; }
  .field-grid { grid-template-columns: 1fr; }
  .info-panel { grid-template-columns: 1fr; }
  .form-footer { flex-direction: column; align-items: stretch; }
  .submit-btn { width: 100%; }
  .horarios-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
