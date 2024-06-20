import axios from 'axios';
import { Notify } from 'notiflix';
Notify.init({
    position: 'right-bottom',
    opacity: 0.8,
    distance: '50px',
    fontSize: '18px',
});
import { selectedFields } from './calculator';

const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form__input");
const FORM_KEY = 'formDataState';
const TOKEN = `7357787813:AAFRKZu3xG6LqyBBhfemdO__9i6ipkyN0qc`;
const CHAT_ID = `-1002203851399`;
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
// токен потрібно буде ховати на сервері

const formData = {
    name: "",
    tel: "",
    url: "",
};

form.addEventListener("submit", onFormSubmit);
form.addEventListener('input', onFormInput);
(() => {
    inputs.forEach((input) => {
        input.addEventListener("blur", onValidatorInputBlur);
    });
})();

afterPageReload();

function onValidatorInputBlur(event) {
    const input = event.currentTarget;
    const inputContentLength = event.currentTarget.value.split("").length;

    if (inputContentLength === 0) {
        input.classList.remove('form__input-valid', 'form__input-invalid');
    } else if (inputContentLength >= Number(input.dataset.length) || ((input.name === "user_url") && (input.validity.valid))) {
        input.classList.remove('form__input-invalid');
        input.classList.add('form__input-valid');
    } else {
        input.classList.remove('form__input-valid');
        input.classList.add('form__input-invalid');
    };
};

function onFormInput(event) {
    const { user_name, user_tel, user_url } = event.currentTarget.elements;
    formData.name = user_name.value;
    formData.tel = user_tel.value;
    formData.url = user_url.value;
    localStorage.setItem(FORM_KEY, JSON.stringify(formData));
};

function onFormSubmit(event) {
    event.preventDefault();
    const formValue = event.currentTarget;
    const hasInvalidInput = Array.from(inputs).some(input => input.classList.contains('form__input-invalid'));
    let calculatorData;

    if (selectedFields) {
        calculatorData = generateCalculatorData(selectedFields);
        if (!hasInvalidInput) {
            const formDataMessage = `                   
        <b>Нова заявка</b>\n 
    <b>Ім’я:</b> ${formData.name};
    <b>Номер:</b> ${formData.tel};
    <b>Посилання:</b> <a href="${formData.url}">${formData.url}</a>;\n       
<b>Данні з калькулятора: </b>
${calculatorData || "Калькулятор не клікали :( "}`

            axios.post(URL_API, {
                chat_id: CHAT_ID,
                text: formDataMessage,
                parse_mode: 'HTML',
            })
                .then(() => {
                    inputs.forEach(input => {
                        input.classList.remove('form__input-valid', 'form__input-invalid');
                    });
                    formValue.reset();
                    localStorage.removeItem(FORM_KEY);
                    Notify.success('Заявку надіслано.');
                })
                .catch((err) => {
                    console.warn(err);
                    Notify.failure('Непередбачувана помилка спробуйте, буть-ласка ще раз.');
                })
        } else {
            Notify.failure('Заявку не надіслано. Перевірте правильність заповнення.');
        }
    }
};

function afterPageReload() {

    const storedData = JSON.parse(localStorage.getItem(FORM_KEY));
    if (storedData === null) {
        return;
    }
    const { user_name, user_tel, user_url } = form.elements;
    user_name.value = storedData.name || '';
    user_tel.value = storedData.tel || '';
    user_url.value = storedData.url || '';

    formData.name = storedData.name || '';
    formData.tel = storedData.tel || '';
    formData.url = storedData.url || '';

    if (storedData.name || storedData.tel || storedData.url) {
        validateInputClassMaker()
    }
};

function validateInputClassMaker() {
    inputs.forEach((input) => {
        const inputContentLength = input.value.split("").length;

        if (inputContentLength === 0) {
            input.classList.remove('form__input-valid', 'form__input-invalid');
        } else if (inputContentLength >= Number(input.dataset.length) || ((input.name === "user_url") && (input.validity.valid))) {
            input.classList.remove('form__input-invalid');
            input.classList.add('form__input-valid');
        } else {
            input.classList.remove('form__input-valid');
            input.classList.add('form__input-invalid');
        };
    });
};

function generateCalculatorData(selectedFields) {
    let calculatorData;

    if (!selectedFields.total) {
        calculatorData = `<b>Калькулятор не клікали :( </b>`;
    } else {
        const itemsData = selectedFields.items.map(item => {
            if (item.type === 'checkbox') {
                return `<b>${item.id}:</b> ${item.price || "знижку вибрано"}`;
            } else if (item.type === 'counter') {
                return `<b>${item.id}:</b> ${item.quantity} x ${item.price} = ${item.quantity * item.price}`;
            }
        }).join('\n');

        calculatorData = `${itemsData}\n<b>Всього:</b> ${selectedFields.total}`;
    }
    return calculatorData;
};