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
        // รองรับหลาย URL (เลือกอันใดอันหนึ่ง)
        //const url = 'https://script.google.com/macros/s/AKfycbzp891sx34BwvBtZhwu76y8fBxCw8J2UvqdMnv7O8-32S0v-uy0RQGKsWY_aqBbyR-sjQ/exec';
        const url = 'https://script.google.com/macros/s/AKfycbw2lseQDnaim1IHepjfxrXG0NwzpPhcIuiRTeDKd6JKOzKj8a_J5OLZv2R7MlkOPq3duw/exec';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
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



