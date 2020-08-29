const signupForm = document.getElementById('signupForm');
const signupFirstName = document.getElementById('firstName');
const signupLastName = document.getElementById('lastName');
const signupUsername = document.getElementById('signupUsername')
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const signupFirstNameVal = signupFirstName.value;
    signupFirstName.value = '';
    const signupLastNameVal = signupLastName.value;
    signupLastName.value = '';
    signupUsernameVal = signupUsername.value;
    signupUsername.value = '';
    const signupEmailVal = signupEmail.value;
    signupEmail.value = '';
    const signupPasswordVal = signupPassword.value;
    signupPassword.value = '';


    signupUser(signupFirstNameVal, signupLastNameVal, signupUsernameVal, signupEmailVal, signupPasswordVal);
});

const backendURL = 'http://192.168.219.13:8181';

function signupUser(firstName, lastName, username, email, password) {
    fetch(`${backendURL}/auth/signup`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password
        })
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((error) => {
            throw new Error(error.message);
        });
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        alert(err);
    })
}