// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('serviceDate').setAttribute('min', today);
});

// Phone number formatting
document.getElementById('phoneNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Form submission
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Show loading
    submitBtn.disabled = true;
    loading.style.display = 'block';

    // Get form data
    const formData = new FormData(e.target);
    const data = {
        customerName: formData.get('customerName'),
        phoneNumber: formData.get('phoneNumber'),
        serviceDate: formData.get('serviceDate'),
        serviceTime: formData.get('serviceTime'),
        carSize: formData.get('carSize'),
        timestamp: new Date().toISOString(),
        status: 'Pending'
    };

    try {
        // This will be replaced with actual Google Apps Script URL
        const response = await fetch('https://script.google.com/macros/library/d/1b7q1arxxvm-f7rDEWbDxVIX10W4SUwRPKLJ5SqPTWsDoQwBSkLBC9kg6/7', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            successMessage.style.display = 'block';
            e.target.reset();
            // Reset date minimum
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('serviceDate').setAttribute('min', today);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        loading.style.display = 'none';
    }
});


