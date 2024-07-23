document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('cliente-form');
    const clienteId = document.getElementById('cliente-id');
    const clienteCelula = document.getElementById('cliente-celula');
    const clienteDni = document.getElementById('cliente-dni');
    const clienteEstado = document.getElementById('cliente-estado');
    const clienteNombre = document.getElementById('cliente-nombre');
    const clienteApellido = document.getElementById('cliente-apellido');
    const clienteDireccion = document.getElementById('cliente-direccion');
    const clientesLista = document.getElementById('clientes-lista');
    const buscarCliente = document.getElementById('buscar-cliente');

    document.querySelector('.agregar-cliente').addEventListener('click', agregarCliente);
    document.querySelector('.actualizar-cliente').addEventListener('click', actualizarCliente);
    document.querySelector('.eliminar-cliente').addEventListener('click', eliminarCliente);
    buscarCliente.addEventListener('input', filtrarClientes);

    function agregarCliente() {
        const cliente = {
            id: Date.now(),
            celula: clienteCelula.value,
            dni: clienteDni.value,
            estado: clienteEstado.value,
            nombre: clienteNombre.value,
            apellido: clienteApellido.value,
            direccion: clienteDireccion.value
        };

        const clienteItem = crearClienteItem(cliente);
        clientesLista.appendChild(clienteItem);

        form.reset();
    }

    function actualizarCliente() {
        const clienteItem = document.querySelector(`li[data-id='${clienteId.value}']`);

        if (clienteItem) {
            clienteItem.querySelector('.celula').textContent = `Celular: ${clienteCelula.value}`;
            clienteItem.querySelector('.dni').textContent = `DNI: ${clienteDni.value}`;
            clienteItem.querySelector('.estado').textContent = `Estado: ${clienteEstado.value}`;
            clienteItem.querySelector('.nombre').textContent = `Nombre: ${clienteNombre.value}`;
            clienteItem.querySelector('.apellido').textContent = `Apellido: ${clienteApellido.value}`;
            clienteItem.querySelector('.direccion').textContent = `Dirección: ${clienteDireccion.value}`;
            
            form.reset();
        }
    }

    function eliminarCliente() {
        const clienteItem = document.querySelector(`li[data-id='${clienteId.value}']`);
        
        if (clienteItem) {
            clientesLista.removeChild(clienteItem);
            form.reset();
        }
    }

    function crearClienteItem(cliente) {
        const clienteItem = document.createElement('li');
        clienteItem.setAttribute('data-id', cliente.id);

        clienteItem.innerHTML = `
            <span class="celula">Celular: ${cliente.celula}</span>
            <span class="dni">DNI: ${cliente.dni}</span>
            <span class="estado">Estado: ${cliente.estado}</span>
            <span class="nombre">Nombre: ${cliente.nombre}</span>
            <span class="apellido">Apellido: ${cliente.apellido}</span>
            <span class="direccion">Dirección: ${cliente.direccion}</span>
            <button class="editar-cliente">Editar</button>
        `;

        clienteItem.querySelector('.editar-cliente').addEventListener('click', () => editarCliente(cliente));

        return clienteItem;
    }

    function editarCliente(cliente) {
        clienteId.value = cliente.id;
        clienteCelula.value = cliente.celula;
        clienteDni.value = cliente.dni;
        clienteEstado.value = cliente.estado;
        clienteNombre.value = cliente.nombre;
        clienteApellido.value = cliente.apellido;
        clienteDireccion.value = cliente.direccion;
    }

    function filtrarClientes() {
        const textoBusqueda = buscarCliente.value.toLowerCase();
        const clientes = clientesLista.querySelectorAll('li');
        
        clientes.forEach(cliente => {
            const nombre = cliente.querySelector('.nombre').textContent.toLowerCase();
            const apellido = cliente.querySelector('.apellido').textContent.toLowerCase();
            const celula = cliente.querySelector('.celula').textContent.toLowerCase();
            const dni = cliente.querySelector('.dni').textContent.toLowerCase();

            if (nombre.includes(textoBusqueda) || apellido.includes(textoBusqueda) || celula.includes(textoBusqueda) || dni.includes(textoBusqueda)) {
                cliente.style.display = '';
            } else {
                cliente.style.display = 'none';
            }
        });
    }
});
