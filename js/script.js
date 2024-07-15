document.addEventListener("DOMContentLoaded", () => {
    const url = "https://api-auto-spj9.onrender.com/autos";
    let carrito = []; 

    const toggleCartButton = document.getElementById("toggle-cart-button");
    const carritoOverlay = document.getElementById("carrito-overlay");
    const closeButton = document.getElementById("close-button");
    const comprarCarritoButton = document.getElementById("comprar-carrito");


    toggleCartButton.addEventListener("click", () => {
        renderCarrito(); 
        carritoOverlay.style.display = "block";
    });

    
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
                addToCartButton.classList.add("add-to-cart-button"); 
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
      
        const found = carrito.find(item => item.auto.nombre === auto.nombre);
        if (found) {
            found.cantidad++; 
        } else {
            carrito.push({ auto: auto, cantidad: 1 }); 
        }
        alert("Producto agregado al carrito.");
    }

    function renderCarrito() {
        const carritoContainer = document.getElementById("carrito-container");
        carritoContainer.innerHTML = ''; 

        carrito.forEach(item => {
            const carritoItem = document.createElement("div");
            carritoItem.classList.add("carrito-item");

            const itemName = document.createElement("span");
            itemName.textContent = `${item.auto.nombre} x${item.cantidad}`; 
            carritoItem.appendChild(itemName);

            const itemPrice = document.createElement("span");
            const totalPrice = item.auto.precio * item.cantidad; 
            itemPrice.textContent = `$ ${totalPrice}`;
            carritoItem.appendChild(itemPrice);

            carritoContainer.appendChild(carritoItem);
        });

        // Actualizar el total del carrito
        const total = carrito.reduce((acc, curr) => acc + (curr.auto.precio * curr.cantidad), 0);
        const totalElement = document.getElementById("carrito-total");
        totalElement.textContent = `Total: $ ${total}`;
    }

   
    comprarCarritoButton.addEventListener("click", () => {
        if (carrito.length > 0) {
            alert("Carrito comprado correctamente!");
            carrito = []; // Vaciar el carrito después de la compra (simulación)
            renderCarrito(); 
            carritoOverlay.style.display = "none"; 
        } else {
            alert("El carrito está vacío. Agrega productos antes de comprar.");
        }
    });
});




