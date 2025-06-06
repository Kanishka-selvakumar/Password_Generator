const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const passwordOutput = document.getElementById('password');
const copyBtnMain = document.getElementById('copyBtn');  // renamed here

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?";

function generatePassword() {
  const length = parseInt(lengthInput.value);
  let charset = "";

  if (uppercaseCheckbox.checked) charset += uppercaseChars;
  if (lowercaseCheckbox.checked) charset += lowercaseChars;
  if (numbersCheckbox.checked) charset += numberChars;
  if (symbolsCheckbox.checked) charset += symbolChars;

  if (!charset) {
    alert("Select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  passwordOutput.value = password;
}

generateBtn.addEventListener('click', generatePassword);

// Modern copy to clipboard for main password output
copyBtnMain.addEventListener('click', () => {
  const pwd = passwordOutput.value;
  if (!pwd) return;

  navigator.clipboard.writeText(pwd).then(() => {
    alert("Password copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy password.");
  });
});

const saveBtn = document.getElementById('saveBtn');
const savedPasswordsList = document.getElementById('savedPasswordsList');

// Load saved passwords from localStorage on page load
let savedPasswords = JSON.parse(localStorage.getItem('savedPasswords')) || [];

function renderSavedPasswords() {
  savedPasswordsList.innerHTML = '';
  savedPasswords.forEach((pwd, index) => {
    const li = document.createElement('li');
    li.textContent = pwd;

    // Copy button for saved pwd
    const copyBtnSaved = document.createElement('button');  // renamed here
    copyBtnSaved.textContent = 'Copy';
    copyBtnSaved.className = 'saved-password-copy';
    copyBtnSaved.onclick = () => {
      navigator.clipboard.writeText(pwd).then(() => {
        alert('Password copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy password.');
      });
    };

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'saved-password-delete';
    deleteBtn.onclick = () => {
      savedPasswords.splice(index, 1);
      localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
      renderSavedPasswords();
    };

    li.appendChild(copyBtnSaved);
    li.appendChild(deleteBtn);
    savedPasswordsList.appendChild(li);
  });
}

// Save current generated password
saveBtn.addEventListener('click', () => {
  const pwd = passwordOutput.value;
  if (!pwd) {
    alert('Generate a password first to save!');
    return;
  }
  if (savedPasswords.includes(pwd)) {
    alert('Password already saved!');
    return;
  }
  savedPasswords.push(pwd);
  localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
  renderSavedPasswords();
});

// Initial render of saved passwords on page load
renderSavedPasswords();
