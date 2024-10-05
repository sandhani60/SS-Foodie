document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const billDetails = document.getElementById('bill-details');
    const checkoutButton = document.getElementById('checkout');
    const phonepePaymentButton = document.getElementById('phonepe-payment');
    const cashPaymentButton = document.getElementById('cash-payment');
    const paymentOptions = document.getElementById('payment-options');
    const paymentSection = document.getElementById('payment-section');
    const paymentImg = document.getElementById('payment-img');
    const confirmPaymentButton = document.getElementById('confirm-payment');
    const printButton = document.getElementById('print-receipt');
    
    let total = 0;
    let items = [];

    // Toggle visibility of menu categories (Starters, Biriyani, Beverages, Desserts)
    function toggleCategory(vegButtonId, nonVegButtonId, vegSectionId, nonVegSectionId) {
        const vegButton = document.getElementById(vegButtonId);
        const nonVegButton = document.getElementById(nonVegButtonId);
        const vegSection = document.getElementById(vegSectionId);
        const nonVegSection = document.getElementById(nonVegSectionId);

        vegButton.addEventListener('click', () => {
            vegSection.style.display = 'block';
            nonVegSection.style.display = 'none';
        });

        nonVegButton.addEventListener('click', () => {
            nonVegSection.style.display = 'block';
            vegSection.style.display = 'none';
        });
    }

    // Apply category toggle for Starters, Biriyani, Beverages, Desserts
    toggleCategory('veg-starters-btn', 'non-veg-starters-btn', 'veg-starters', 'non-veg-starters');
    toggleCategory('veg-biriyani-btn', 'non-veg-biriyani-btn', 'veg-biriyani', 'non-veg-biriyani');
    toggleCategory('cold-beverages-btn', 'hot-beverages-btn', 'cold-beverages', 'hot-beverages');
    toggleCategory('indian-desserts-btn', 'western-desserts-btn', 'indian-desserts', 'western-desserts');

    // Update bill based on selections
    function updateBill() {
        total = 0;
        items = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseInt(checkbox.getAttribute('data-price'), 10);
                const itemName = checkbox.parentElement.textContent.trim().split(' - ')[0];
                items.push(itemName);
                total += price;
            }
        });

        if (items.length > 0) {
            billDetails.textContent = `You selected: ${items.join(', ')}. Total: ₹${total}`;
        } else {
            billDetails.textContent = 'Select items to see your total bill here.';
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBill);
    });

    // Apply GST
    const gstButton = document.getElementById('apply-gst');
    gstButton.addEventListener('click', () => {
        const gstRate = 0.18;
        total += total * gstRate;
        billDetails.textContent = `After GST: ₹${total.toFixed(2)}`;
    });

    // Apply Discount
    const discountButton = document.getElementById('apply-discount');
    discountButton.addEventListener('click', () => {
        const discountRate = 0.10;
        total -= total * discountRate;
        billDetails.textContent = `After Discount: ₹${total.toFixed(2)}`;
    });

    // Show payment options after clicking checkout
    checkoutButton.addEventListener('click', () => {
        paymentOptions.style.display = 'block';
    });

    // PhonePe Payment Logic
    phonepePaymentButton.addEventListener('click', () => {
        paymentSection.style.display = 'block';
        paymentImg.src = 'phonepe_scanner.png'; // Replace with actual scanner image URL
        confirmPaymentButton.style.display = 'block';
    });

    // Cash Payment Logic (hand animation)
    cashPaymentButton.addEventListener('click', () => {
        paymentSection.style.display = 'block';
        paymentImg.src = 'hand_payment.jpg'; // Replace with actual hand image URL
        paymentImg.style.animation = 'handAnimation 2s forwards';
        confirmPaymentButton.style.display = 'block';
    });

    // Confirm payment after clicking OK
    confirmPaymentButton.addEventListener('click', () => {
        alert('Payment Successful!');
        paymentSection.style.display = 'none'; // Hide payment section after confirmation
        paymentOptions.style.display = 'none'; // Hide payment options after confirmation
        printButton.style.display = 'block';  // Show the print receipt button after payment
    });

    // Print Receipt
    printButton.addEventListener('click', () => {
        const receiptContent = `
            Items: ${items.join(', ')}
            Total Amount: ₹${total.toFixed(2)}
        `;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<pre>${receiptContent}</pre>`);
        newWindow.print();
        newWindow.close();
    });
});
