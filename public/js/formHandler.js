const HOST = 'http://localhost:5000/api';

// Handle Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    fetch(`${HOST}/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                contactForm.reset();
                alert('Submission successful!');
            } else {
                alert('Submission failed. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Contact Error:', error);
        });
});

// Handle Feedback Form Submission
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm?.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    fetch(`${HOST}/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(() => {
            feedbackForm.reset();
            alert('Feedback submitted successfully!');
        })
        .catch((error) => {
            alert('Error submitting feedback. Please try again.');
        });
});

const appointmentForm = document.getElementById('appointmentForm');

appointmentForm?.addEventListener('submit', async function (event) {
    event.preventDefault();

    console.log('Submitting appointment form...');

    const formData = new FormData(this);

    // Validate and handle doctor selection
    // const doctorField = document.getElementById('doctor');
    // const selectedDoctor = document.querySelector('#doctorList input[name="doctor"]:checked');
    // if (selectedDoctor) {
    //     doctorField.value = selectedDoctor.value;
    //     console.log('Selected Doctor:', selectedDoctor.value);
    // } else {
    //     alert('Please select a doctor before submitting.');
    //     return;
    // }

    // Convert form data to JSON object
    const data = Object.fromEntries(formData);
    console.log('Form data to submit:', data);

    try {
        const response = await fetch(`${HOST}/appointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log('Response Status:', response.status);

        // Check if response is not OK
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response Error:', errorText);
            alert(`Failed to schedule appointment: ${response.statusText}`);
            return;
        }

        const result = await response.json();
        console.log('Server Response:', result);

        // On success, reset the form and clear the doctor list
        appointmentForm.reset();
        document.getElementById('doctorList').innerHTML = '';
        document.getElementById('selectedDoctor').style.display = 'none';

        alert('Appointment scheduled successfully!');
    } catch (error) {
        console.error('Submission Error:', error);
        alert('An error occurred while scheduling the appointment. Please try again.');
    }
});