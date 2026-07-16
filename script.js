function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        if (data.message === "Login Successful") {
            window.location.href = "product.html";
        }

    })
    .catch(error => {
        console.log(error);
    });

}// Add Product
function addProduct() {

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    fetch("http://localhost:8000/add-product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price, image })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadProducts();
    });
}

// Load Products
function loadProducts() {

    fetch("http://localhost:8000/products")
    .then(res => res.json())
    .then(data => {

        let output = "";

        data.forEach(product => {

           output += `
    <div>
        <h3>${product.product_name}</h3>
        <p>₹${product.price}</p>
        <img src="${product.image}" width="150">

        <br><br>

        <button onclick="deleteProduct(${product.id})">
    Delete
</button>
    </div>
    <hr>
`;

        });

        document.getElementById("products").innerHTML = output;

    });

}

window.onload = loadProducts;
function addToCart(id, name, price){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        id: id,
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart");

}function deleteProduct(id) {

    fetch("http://localhost:8000/delete-product/" + id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadProducts();
    });

}