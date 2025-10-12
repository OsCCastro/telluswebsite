document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('modalContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('cName').value.trim());
    const email = encodeURIComponent(document.getElementById('cEmail').value.trim());
    const msg = encodeURIComponent(document.getElementById('cMsg').value.trim());
    // TODO: reemplaza por tu backend si lo tienes
    window.location.href =
      `mailto:contacto@tudominio.com?subject=Contacto%20desde%20web` +
      `&body=Nombre:%20${name}%0AEmail:%20${email}%0AMensaje:%0A${msg}`;
  });
});