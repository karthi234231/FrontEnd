// Retrieve saved data from web storage
let savedData = JSON.parse(localStorage.getItem("registrationData")) || [];

// Display saved data in the table
let registrationTable = document.getElementById("registration-table");

function displayData() {
    registrationTable.tBodies[0].innerHTML = "";

    savedData.forEach(function (registration) {
        let row = registrationTable.tBodies[0].insertRow();

        let nameCell = row.insertCell();
        nameCell.appendChild(document.createTextNode(registration.name));

        let emailCell = row.insertCell();
        emailCell.appendChild(document.createTextNode(registration.email));

        let passwordCell = row.insertCell();
        passwordCell.appendChild(document.createTextNode(registration.password));

        let dobCell = row.insertCell();
        dobCell.appendChild(document.createTextNode(registration.dob));

        let termsCell = row.insertCell();
        termsCell.appendChild(
            document.createTextNode(registration.terms ? "Yes" : "No")
        );
    });
}

displayData();

// Handle form submission
let registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let terms = document.getElementById("terms").checked;

    // Add additional validation to the date input field
    let birthDate = new Date(dob);
    let minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 55);
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    if (birthDate < minDate || birthDate > maxDate) {
        alert("Date of birth must be between 18 and 55 years ago.");
        return;
    }

    let registration = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        terms: terms,
    };

    savedData.push(registration);

    localStorage.setItem("registrationData", JSON.stringify(savedData));

    displayData();

    registrationForm.reset();
});
