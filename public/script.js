function generatePassword() {
    const length = document.getElementById('length').value;
    fetch(`/generate?length=${length}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('password').textContent = data.password;
      });
  }
  
  document.getElementById('length').addEventListener('input', function() {
    document.getElementById('lengthValue').textContent = this.value;
  });