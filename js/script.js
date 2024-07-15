document.addEventListener("DOMContentLoaded", () => {
    const url = "https://api-auto-spj9.onrender.com/autos";
    let carrito = []; // Array para almacenar autos en el carrito

    const toggleCartButton = document.getElementById("toggle-cart-button");
    const carritoOverlay = document.getElementById("carrito-overlay");
    const closeButton = document.getElementById("close-button");
    const comprarCarritoButton = document.getElementById("comprar-carrito");

    // Función para abrir el carrito
    toggleCartButton.addEventListener("click", () => {
        renderCarrito(); // Renderizar el carrito al abrirlo
        carritoOverlay.style.display = "block";
    });

    // Función para cerrar el carrito
    closeButton.addEventListener("click", () => {
        carritoOverlay.style.display = "none";
    });

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const autosContainer = document.getElementById("autos-container");

            data.autos.forEach(auto => {
                const card = document.createElement("div");
                card.classList.add("card");

                const imageUrl = auto.imagenUrl || "https://via.placeholder.com/300";
                const image = document.createElement("img");
                image.src = imageUrl;
                card.appendChild(image);

                const title = document.createElement("h3");
                title.textContent = auto.nombre;
                card.appendChild(title);

                const details = document.createElement("p");
                details.textContent = `Modelo: ${auto.modelo} |
                 País: ${auto.pais} | 
                 Precio: $${auto.precio}`;
                
                const addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Agregar al carrito";
                addToCartButton.classList.add("add-to-cart-button"); // Añadir la clase para el nuevo estilo
                addToCartButton.addEventListener("click", () => {
                    addToCart(auto);
                });

                card.appendChild(details);
                card.appendChild(addToCartButton);

                autosContainer.appendChild(card);
            });
        })
        .catch(error => console.log("Error al obtener los datos:", error));

    function addToCart(auto) {
        // Verificar si el producto ya está en el carrito
        const found = carrito.find(item => item.auto.nombre === auto.nombre);
        if (found) {
            found.cantidad++; // Incrementar la cantidad si ya está en el carrito
        } else {
            carrito.push({ auto: auto, cantidad: 1 }); // Agregar el producto con cantidad 1 al carrito
        }
        alert("Producto agregado al carrito.");
    }

    function renderCarrito() {
        const carritoContainer = document.getElementById("carrito-container");
        carritoContainer.innerHTML = ''; // Limpiar el contenido previo del carrito

        carrito.forEach(item => {
            const carritoItem = document.createElement("div");
            carritoItem.classList.add("carrito-item");

            const itemName = document.createElement("span");
            itemName.textContent = `${item.auto.nombre} x${item.cantidad}`; // Mostrar el nombre del producto y la cantidad
            carritoItem.appendChild(itemName);

            const itemPrice = document.createElement("span");
            const totalPrice = item.auto.precio * item.cantidad; // Calcular el precio total por producto
            itemPrice.textContent = `$ ${totalPrice}`;
            carritoItem.appendChild(itemPrice);

            carritoContainer.appendChild(carritoItem);
        });

        // Actualizar el total del carrito
        const total = carrito.reduce((acc, curr) => acc + (curr.auto.precio * curr.cantidad), 0);
        const totalElement = document.getElementById("carrito-total");
        totalElement.textContent = `Total: $ ${total}`;
    }

    // Funcionalidad del botón "Comprar Carrito"
    comprarCarritoButton.addEventListener("click", () => {
        if (carrito.length > 0) {
            alert("Carrito comprado correctamente!");
            carrito = []; // Vaciar el carrito después de la compra (simulación)
            renderCarrito(); // Actualizar visualización del carrito
            carritoOverlay.style.display = "none"; // Cerrar el carrito después de la compra
        } else {
            alert("El carrito está vacío. Agrega productos antes de comprar.");
        }
    });
});




