<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="appStore.isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content scale-in">
          <button class="close-btn" @click="closeModal" aria-label="Cerrar modal"><X :size="24" /></button>
          
          <div class="modal-header">
            <h2>Agendar Cita</h2>
            <p>Completa este breve formulario para conocerte mejor.</p>
            
            <!-- Progress indicator -->
            <div class="progress-bar mt-3">
              <div class="progress" :style="{ width: step === 1 ? '50%' : '100%' }"></div>
            </div>
            <div class="step-indicator">Paso {{ step }} de 2</div>
          </div>

          <form @submit.prevent="submitForm">
            <!-- STEP 1 -->
            <div v-show="step === 1" class="step-content">
              <div class="form-group">
                <label>Nombre Completo</label>
                <div class="input-with-icon">
                  <User :size="18" class="input-icon" />
                  <input type="text" v-model="formData.nombre" placeholder="Ej. Ana Pérez" required />
                </div>
              </div>
              
              <div class="form-group">
                <label>Teléfono</label>
                <div class="input-with-icon">
                  <Phone :size="18" class="input-icon" />
                  <input type="tel" v-model="formData.telefono" placeholder="Ej. 33 1234 5678" required />
                </div>
              </div>

              <div class="form-group">
                <label>Fecha Deseada</label>
                <div class="input-with-icon">
                  <CalendarDays :size="18" class="input-icon" />
                  <input type="date" v-model="formData.fecha" required />
                </div>
              </div>
              
              <div class="modal-actions">
                <button type="button" class="btn btn-primary btn-full flex-center gap-2" @click="nextStep" :disabled="!canProceedStep1">
                  Siguiente <ArrowRight :size="18" />
                </button>
              </div>
            </div>

            <!-- STEP 2 -->
            <div v-show="step === 2" class="step-content">
              <div class="form-group mb-3 text-left">
                <label>¿Has tenido atención en nutrición antes?</label>
                <div class="radio-group mt-2">
                  <label class="radio-label">
                    <input type="radio" v-model="formData.atencionPrevia" value="si" />
                    <span>Sí</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" v-model="formData.atencionPrevia" value="no" />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div class="flex gap-3">
                <div class="form-group flex-1">
                  <label>Peso Aprox. (kg)</label>
                  <input type="number" step="0.1" v-model="formData.peso" placeholder="Ej. 70" />
                </div>
                
                <div class="form-group flex-1">
                  <label>Estatura (cm)</label>
                  <input type="number" v-model="formData.estatura" placeholder="Ej. 170" />
                </div>
              </div>
              
              <div class="modal-actions mt-4 flex gap-2">
                <button type="button" class="btn btn-outline flex-1" @click="step = 1">Atrás</button>
                <button type="submit" class="btn btn-secondary flex-2 flex-center gap-2">
                  <CheckCircle :size="18" /> Confirmar Cita
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../../stores/app'
import { X, User, Phone, CalendarDays, ArrowRight, CheckCircle } from 'lucide-vue-next'

const appStore = useAppStore()

const step = ref(1)

const formData = ref({
  nombre: '',
  telefono: '',
  fecha: '',
  atencionPrevia: 'no',
  peso: '',
  estatura: ''
})

const closeModal = () => {
  appStore.toggleModal(false)
  // reset form eventually when closed
  setTimeout(() => { step.value = 1 }, 300)
}

const canProceedStep1 = computed(() => {
  return formData.value.nombre && formData.value.telefono && formData.value.fecha
})

const nextStep = () => {
  if (canProceedStep1.value) {
    step.value = 2
  }
}

const submitForm = () => {
  // Aquí se enviaría el form al backend
  alert('¡Cita solicitada con éxito!\nNos pondremos en contacto muy pronto.')
  closeModal()
}
</script>

<style scoped>
/* Modal Base */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 32, 39, 0.7);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 450px;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 10;
}

.close-btn:hover {
  color: var(--color-secondary);
}

.modal-header {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #1a3a41 100%);
  color: var(--color-white);
  padding: 2.5rem 2rem 1.5rem;
  text-align: center;
}

.modal-header h2 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.modal-header p {
  color: rgba(255,255,255,0.8);
  font-size: 0.95rem;
}

/* Progress Bar */
.progress-bar {
  background: rgba(255,255,255,0.1);
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: var(--color-primary);
  transition: width 0.4s ease;
}

.step-indicator {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-top: 0.5rem;
  letter-spacing: 1px;
}

/* Form Styles */
form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.25rem;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="tel"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: var(--radius-md);
  font-size: 1rem;
  color: var(--color-text);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-with-icon {
  position: relative;
}

.input-with-icon input {
  padding-left: 2.8rem;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: #999;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(117, 203, 190, 0.2);
}

.radio-group {
  display: flex;
  gap: 1.5rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  color: #555;
}

.radio-label input[type="radio"] {
  accent-color: var(--color-primary);
  width: 1.2rem;
  height: 1.2rem;
}

.modal-actions {
  margin-top: 2rem;
}

/* Utilities */
.btn-full { width: 100%; }
.flex { display: flex; }
.flex-1 { flex: 1; }
.flex-2 { flex: 2; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 1rem; }
.mb-3 { margin-bottom: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mt-4 { margin-top: 1.5rem; }
.flex-center { display: flex; justify-content: center; align-items: center; }

.btn-outline {
  background: transparent;
  border: 1px solid #ddd;
  color: #555;
  padding: 0.8rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #f5f5f5;
  color: var(--color-secondary);
}

.btn-secondary {
  background: var(--color-secondary);
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: var(--radius-md);
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background: #112a30;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.scale-in {
  animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
