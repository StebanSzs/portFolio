// Sistema de contacto mejorado
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.originalButtonText = this.submitButton.textContent;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.addInputValidation();
    this.addLoadingStates();
  }

  addInputValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      // Validación en tiempo real
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remover errores previos
    this.clearFieldError(field);

    // Validaciones específicas
    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Por favor, ingresa un email válido';
        }
        break;
      case 'text':
        if (value.length < 2) {
          isValid = false;
          errorMessage = 'Este campo debe tener al menos 2 caracteres';
        }
        break;
      default:
        if (field.tagName === 'TEXTAREA' && value.length < 10) {
          isValid = false;
          errorMessage = 'El mensaje debe tener al menos 10 caracteres';
        }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    // Crear elemento de error si no existe
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  addLoadingStates() {
    // Agregar estilos para estados de carga
    const style = document.createElement('style');
    style.textContent = `
      .contact-form.loading {
        opacity: 0.7;
        pointer-events: none;
      }
      
      .contact-form button.loading {
        position: relative;
        color: transparent;
      }
      
      .contact-form button.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #ffffff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .form-group.error input,
      .form-group.error textarea {
        border-color: #ff4757 !important;
        box-shadow: 0 0 5px rgba(255, 71, 87, 0.3) !important;
      }
      
      .error-message {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
      }
      
      .success-message,
      .error-notification {
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: center;
        font-weight: 500;
      }
      
      .success-message {
        background: rgba(46, 213, 115, 0.1);
        border: 1px solid #2ed573;
        color: #2ed573;
      }
      
      .error-notification {
        background: rgba(255, 71, 87, 0.1);
        border: 1px solid #ff4757;
        color: #ff4757;
      }
    `;
    document.head.appendChild(style);
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Validar todos los campos
    const inputs = this.form.querySelectorAll('input, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showNotification('Por favor, corrige los errores antes de enviar', 'error');
      return;
    }

    // Mostrar estado de carga
    this.setLoadingState(true);

    try {
      // Intentar envío moderno primero
      const success = await this.sendModernEmail();
      
      if (success) {
        this.showSuccessMessage();
        this.resetForm();
      } else {
        // Fallback a mailto si no hay servicio configurado
        this.sendMailtoFallback();
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      this.sendMailtoFallback();
    } finally {
      this.setLoadingState(false);
    }
  }

  async sendModernEmail() {
    // Aquí podrías integrar con servicios como EmailJS, Formspree, etc.
    // Por ahora retornamos false para usar el fallback
    
    // Ejemplo de integración con EmailJS:
    /*
    try {
      const formData = new FormData(this.form);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      const response = await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );
      
      return response.status === 200;
    } catch (error) {
      console.error('EmailJS error:', error);
      return false;
    }
    */
    
    return false; // Por ahora usar fallback
  }

  sendMailtoFallback() {
    const formData = new FormData(this.form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Crear un mensaje mejor estructurado
    const emailBody = `
Nombre: ${name}
Email: ${email}
Asunto: ${subject}

Mensaje:
${message}

---
Enviado desde el portafolio de StebanSzs
    `.trim();

    const mailtoLink = `mailto:miguelestebanbravodiaz9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    // Mostrar mensaje informativo
    this.showNotification(
      'Se abrirá tu cliente de email para enviar el mensaje. Si no se abre automáticamente, puedes copiar los datos y enviarlos manualmente.',
      'info'
    );
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.form.classList.add('loading');
      this.submitButton.classList.add('loading');
      this.submitButton.disabled = true;
    } else {
      this.form.classList.remove('loading');
      this.submitButton.classList.remove('loading');
      this.submitButton.disabled = false;
    }
  }

  showSuccessMessage() {
    this.showNotification(
      '¡Mensaje enviado correctamente! Te responderé pronto.',
      'success'
    );
  }

  showNotification(message, type = 'info') {
    // Remover notificaciones previas
    const existingNotification = this.form.querySelector('.success-message, .error-notification, .info-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = type === 'success' ? 'success-message' : 
                            type === 'error' ? 'error-notification' : 
                            'info-notification';
    notification.textContent = message;

    // Insertar después del formulario
    this.form.parentNode.insertBefore(notification, this.form.nextSibling);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  resetForm() {
    this.form.reset();
    
    // Limpiar errores
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => this.clearFieldError(input));
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});

// Agregar estilos adicionales para mejor UX
document.addEventListener('DOMContentLoaded', () => {
  const additionalStyles = document.createElement('style');
  additionalStyles.textContent = `
    .info-notification {
      background: rgba(0, 212, 255, 0.1);
      border: 1px solid #00d4ff;
      color: #00d4ff;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
      font-weight: 500;
    }
    
    .contact-form input:focus,
    .contact-form textarea:focus {
      outline: none;
      border-color: #00d4ff;
      box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
    }
    
    .contact-form .form-group {
      position: relative;
    }
    
    .contact-form label {
      transition: all 0.3s ease;
    }
    
    .contact-form input:focus + label,
    .contact-form textarea:focus + label,
    .contact-form input:not(:placeholder-shown) + label,
    .contact-form textarea:not(:placeholder-shown) + label {
      transform: translateY(-20px);
      font-size: 0.8rem;
      color: #00d4ff;
    }
  `;
  document.head.appendChild(additionalStyles);
});
