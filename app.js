// Direccion de la API local
const urlAPI = 'http://localhost:3000/api/recursos';

// Funcion principal para consumir datos
async function obtenerDatos() {
    try {
        const respuesta = await fetch(urlAPI);
        const productos = await respuesta.json();

        llenarTabla(productos);
        generarGrafica(productos);
    } catch (error) {
        console.error(error);
    }
}

// Generar filas de la tabla dinamicamente
function llenarTabla(productos) {
    const tbody = document.querySelector('#tablaProductos tbody');
    tbody.innerHTML = '';

    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        `;
        tbody.appendChild(fila);
    });
}

// Configurar e instanciar Chart js
function generarGrafica(productos) {
    // Extraer arreglos independientes
    const nombres = productos.map(producto => producto.nombre);
    const precios = productos.map(producto => producto.precio);

    const ctx = document.getElementById('miGrafica').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombres,
            datasets: [{
                label: 'Precio',
                data: precios,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Ejecutar todo al cargar el archivo
obtenerDatos();