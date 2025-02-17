document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mensajeForm');
    const muro = document.getElementById('muroMensajes');
    
    // Cargar mensajes almacenados
    cargarMensajes();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if(nombre && mensaje) {
            agregarMensaje(nombre, mensaje);
            crearEfectoConfeti();
            form.reset();
        }
    });

    function agregarMensaje(nombre, mensaje) {
        const mensajeHTML = `
            <div class="mensaje-card">
                <h3>${nombre}</h3>
                <p>${mensaje}</p>
                <small>${new Date().toLocaleDateString()}</small>
            </div>
        `;
        
        // Guardar en localStorage
        const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        mensajes.push({ nombre, mensaje, fecha: new Date() });
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
        
        // Agregar al muro
        muro.insertAdjacentHTML('afterbegin', mensajeHTML);
    }

    function cargarMensajes() {
        const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        mensajes.forEach(msg => {
            muro.insertAdjacentHTML('afterbegin', `
                <div class="mensaje-card">
                    <h3>${msg.nombre}</h3>
                    <p>${msg.mensaje}</p>
                    <small>${new Date(msg.fecha).toLocaleDateString()}</small>
                </div>
            `);
        });
    }

    function crearEfectoConfeti() {
        const emojis = ['🎉', '🎂', '🎁', '💖', '✨'];
        const container = document.createElement('div');
        
        for(let i = 0; i < 50; i++) {
            const confeti = document.createElement('div');
            confeti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confeti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -10px;
                font-size: ${Math.random() * 20 + 15}px;
                animation: caer ${Math.random() * 3 + 2}s linear;
                z-index: 999;
            `;
            container.appendChild(confeti);
        }
        
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 3000);
    }
});