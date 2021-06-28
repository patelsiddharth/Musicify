const input1 = document.querySelector('.form-input');
const input2 = document.querySelector(input);
console.log(input1);
console.log(input2);
input1.addEventListener('focus', () => {
    input1.parentNode('.form-group').addClass('focused')
})