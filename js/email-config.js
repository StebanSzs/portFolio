// Configuración para servicios de email
// Para usar EmailJS (opcional):

/*
1. Registrarse en https://www.emailjs.com/
2. Crear un servicio de email (Gmail, Outlook, etc.)
3. Crear una plantilla de email
4. Obtener las claves necesarias
5. Descomentar y configurar el siguiente código:

const EMAIL_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID', 
  publicKey: 'YOUR_PUBLIC_KEY'
};

// Agregar este script en el HTML:
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Inicializar EmailJS:
emailjs.init(EMAIL_CONFIG.publicKey);

// Ejemplo de plantilla para EmailJS:
Plantilla del email:
---
Asunto: Nuevo mensaje de {{from_name}} - {{subject}}

Contenido:
De: {{from_name}} ({{from_email}})
Asunto: {{subject}}

Mensaje:
{{message}}

---
Enviado desde el portafolio de StebanSzs
*/

// Para usar Formspree (alternativa):
/*
1. Registrarse en https://formspree.io/
2. Crear un formulario
3. Usar la URL del endpoint en el formulario HTML:

<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- campos del formulario -->
</form>
*/

// Para usar Netlify Forms (si está hospedado en Netlify):
/*
Solo agregar data-netlify="true" al formulario:

<form data-netlify="true" name="contact">
  <!-- campos del formulario -->
</form>
*/

export const EMAIL_SERVICES = {
  EMAILJS: 'emailjs',
  FORMSPREE: 'formspree', 
  NETLIFY: 'netlify',
  MAILTO: 'mailto'
};

// Configuración actual (usando mailto como fallback)
export const CURRENT_SERVICE = EMAIL_SERVICES.MAILTO;
