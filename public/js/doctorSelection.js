
    document.addEventListener("DOMContentLoaded", function () {
        const departmentsDropdown = document.getElementById("departments");
        const doctorListDiv = document.getElementById("doctorList");
        const selectedDoctorDiv = document.getElementById("selectedDoctor");
        const doctorInput = document.getElementById("doctor");

        // Mapping departments to doctors
        const doctorsByDepartment = {
            "Early Intervention": [
                {
                    name: "Dr. Sree",
                    occupation: "Pediatric Specialist",
                    profile: "Dr. Sree has over 15 years of experience working with children with developmental delays. His focus is on early detection and intervention.",
                    photo: "images/dr-john-doe.jpg",
                },
                {
                    name: "Dr. Praveen",
                    occupation: "Child Psychologist",
                    profile: "Dr. Praveen specializes in assessing and improving cognitive and emotional development in children.",
                    photo: "images/dr-jane-smith.jpg",
                },
            ],
            "ABA Therapy": [
                {
                    name: "Dr. Umesh",
                    occupation: "Behavioral Therapist",
                    profile: "Dr. Umesh is a certified ABA therapist with a decade of experience helping children with autism spectrum disorders.",
                    photo: "images/dr-emily-davis.jpg",
                },
                {
                    name: "Dr. Kushan",
                    occupation: "Clinical Psychologist",
                    profile: "Dr. Kushan focuses on evidence-based behavioral modification techniques for children and adults.",
                    photo: "images/dr-michael-brown.jpg",
                },
            ],
            "Behaviour Modification": [
                {
                    name: "Dr. Bindu",
                    occupation: "Behavior Analyst",
                    profile: "Dr. Bindu specializes in creating personalized behavior modification programs for individuals with ADHD.",
                    photo: "images/dr-sarah-lee.jpg",
                },
                {
                    name: "Dr. Jyoshna",
                    occupation: "Counseling Psychologist",
                    profile: "Dr. Jyoshna uses therapeutic methods to assist clients in overcoming behavioral challenges.",
                    photo: "images/dr-david-clark.jpg",
                },
            ],
            "Behaviour Therapy": [
                {
                    name: "Dr. Ravi",
                    occupation: "Behavioral Specialist",
                    profile: "Dr. Ravi focuses on helping individuals develop positive behavior patterns.",
                    photo: "images/dr-ravi.jpg",
                },
                {
                    name: "Dr. Sneha",
                    occupation: "Psychotherapist",
                    profile: "Dr. Sneha uses behavioral therapy techniques to address emotional and social challenges.",
                    photo: "images/dr-sneha.jpg",
                },
            ],
            "Speech And Language Therapy": [
                {
                    name: "Dr. Anita",
                    occupation: "Speech Therapist",
                    profile: "Dr. Anita has extensive experience helping children improve their speech and language skills.",
                    photo: "images/dr-anita.jpg",
                },
                {
                    name: "Dr. Ramesh",
                    occupation: "Language Pathologist",
                    profile: "Dr. Ramesh specializes in treating language disorders in children and adults.",
                    photo: "images/dr-ramesh.jpg",
                },
            ],
            "Occupational Therapy": [
                {
                    name: "Dr. Kavita",
                    occupation: "Occupational Therapist",
                    profile: "Dr. Kavita designs customized therapy programs to improve motor skills and daily functioning.",
                    photo: "images/dr-kavita.jpg",
                },
                {
                    name: "Dr. Mohan",
                    occupation: "Rehabilitation Specialist",
                    profile: "Dr. Mohan focuses on occupational rehabilitation for children with special needs.",
                    photo: "images/dr-mohan.jpg",
                },
            ],
            "Sensory Integration": [
                {
                    name: "Dr. Asha",
                    occupation: "Sensory Specialist",
                    profile: "Dr. Asha works with children to improve sensory processing and integration skills.",
                    photo: "images/dr-asha.jpg",
                },
                {
                    name: "Dr. Suraj",
                    occupation: "Neurotherapist",
                    profile: "Dr. Suraj uses sensory integration techniques to enhance neurological development.",
                    photo: "images/dr-suraj.jpg",
                },
            ],
            "Special Education": [
                {
                    name: "Dr. Nisha",
                    occupation: "Special Educator",
                    profile: "Dr. Nisha provides tailored educational programs for children with learning disabilities.",
                    photo: "images/dr-nisha.jpg",
                },
                {
                    name: "Dr. Arun",
                    occupation: "Educational Psychologist",
                    profile: "Dr. Arun specializes in educational strategies for students with developmental delays.",
                    photo: "images/dr-arun.jpg",
                },
            ],
            "School Readiness Program": [
                {
                    name: "Dr. Pooja",
                    occupation: "Educational Therapist",
                    profile: "Dr. Pooja helps prepare children for school by improving foundational skills.",
                    photo: "images/dr-pooja.jpg",
                },
                {
                    name: "Dr. Rohan",
                    occupation: "Early Learning Specialist",
                    profile: "Dr. Rohan designs readiness programs tailored for preschoolers.",
                    photo: "images/dr-rohan.jpg",
                },
            ],
            "Cognitive Retraining": [
                {
                    name: "Dr. Meena",
                    occupation: "Cognitive Specialist",
                    profile: "Dr. Meena works on retraining cognitive functions in children and adults.",
                    photo: "images/dr-meena.jpg",
                },
                {
                    name: "Dr. Karthik",
                    occupation: "Neuropsychologist",
                    profile: "Dr. Karthik focuses on enhancing cognitive capabilities using evidence-based methods.",
                    photo: "images/dr-karthik.jpg",
                },
            ],
            "Cognitive Behavior Therapy": [
                {
                    name: "Dr. Sanjay",
                    occupation: "CBT Specialist",
                    profile: "Dr. Sanjay uses cognitive-behavioral therapy to treat anxiety and mood disorders.",
                    photo: "images/dr-sanjay.jpg",
                },
                {
                    name: "Dr. Priya",
                    occupation: "Clinical Psychologist",
                    profile: "Dr. Priya has expertise in CBT for children and young adults.",
                    photo: "images/dr-priya.jpg",
                },
            ],
        };

        // Populate the doctor list when a department is selected
        departmentsDropdown.addEventListener("change", function () {
            const selectedDepartment = this.value;

            // Reset doctor list and selected doctor details
            doctorListDiv.innerHTML = "";
            selectedDoctorDiv.innerHTML = "";
            selectedDoctorDiv.style.display = "none";
            doctorInput.value = ""; // Reset hidden field

            if (selectedDepartment && doctorsByDepartment[selectedDepartment]) {
                const doctors = doctorsByDepartment[selectedDepartment];
                const list = document.createElement("ul");

                doctors.forEach((doctor) => {
                    const listItem = document.createElement("li");

                    const radio = document.createElement("input");
                    radio.type = "radio";
                    radio.name = "doctorSelection";
                    radio.value = doctor.name;
                    radio.id = doctor.name;

                    // Event listener for selecting a doctor
                    radio.addEventListener("change", function () {
                        doctorInput.value = doctor.name; // Update hidden input
                        selectedDoctorDiv.style.display = "block";
                        selectedDoctorDiv.innerHTML = `
                            <h3>Selected Doctor</h3>
                            <p><strong>Name:</strong> ${doctor.name}</p>
                            <p><strong>Occupation:</strong> ${doctor.occupation}</p>
                            <p><strong>Profile:</strong> ${doctor.profile}</p>
                        `;

                        // Additional options for doctor
                        const additionalOptions = document.createElement("div");
                        additionalOptions.classList.add("additional-options");
                        additionalOptions.innerHTML = `
                        <p><strong>Availability:</strong> Monday - Friday</p>
                        <p><strong>Available Time:</strong> 9 AM - 5 PM</p>
                        <p><strong>Languages Spoken:</strong> English, Kannada,Telugu</p>
                        `;

                        selectedDoctorDiv.appendChild(additionalOptions);
                    });

                    const label = document.createElement("label");
                    label.htmlFor = doctor.name;
                    label.textContent = doctor.name;

                    listItem.appendChild(radio);
                    listItem.appendChild(label);
                    list.appendChild(listItem);
                });

                doctorListDiv.appendChild(list);
            } else {
                doctorListDiv.textContent = "No doctors available for this department.";
            }
        });

        // Validate form submission
        document.getElementById("appointmentForm").addEventListener("submit", function (event) {
            if (!doctorInput.value) {
                event.preventDefault(); // Prevent form submission
                alert("Please select a doctor before submitting.");
            }
        });
    });

