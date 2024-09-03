// JavaScript for Interactive Navigation Menu and Cart Functionality

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const orderButton = document.querySelector('.order-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const finalizeOrderButton = document.querySelector('.finalize-order-btn');
    let cart = [];

    // Change navbar style on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // If scrolled more than 50px
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active navigation item
        document.querySelectorAll('.nav-item a').forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (
                section.offsetTop <= window.scrollY + navbar.offsetHeight &&
                section.offsetTop + section.offsetHeight > window.scrollY + navbar.offsetHeight
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // Smooth scroll to items section on "Order Now" button click
    orderButton.addEventListener('click', function() {
        const itemsSection = document.getElementById('items');
        window.scrollTo({
            top: itemsSection.offsetTop - navbar.offsetHeight,
            behavior: 'smooth'
        });
    });

    // Add items to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            const itemName = item.querySelector('h3').textContent;
            cart.push({ name: itemName});
            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        cartItemsList.innerHTML = ''; // Clear the current list
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name}`;
            cartItemsList.appendChild(li);
        });
    }

    // Finalize order button functionality
    finalizeOrderButton.addEventListener('click', function() {
        if (cart.length > 0) {
            alert(`You have ordered: ${cart.map(item => item.name).join(', ')}.`);
            cart = []; // Empty the cart after order
            updateCart();
        } else {
            alert('Your cart is empty.');
        }
    });
});
