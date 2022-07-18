import { post } from "jquery";
import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! С вами скоро свяжутся',
        failure: 'Что то пошло не так'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div'); // Создаю блок оповещения пользователя
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); // Собираю данные с формы
            if(item.getAttribute('data-calc') === 'end') { // Проверка формы(та ли форма)
                for(let key in state) { //перебираем свойства и отправляем в formData
                    formData.append(key, state[key]);
                }
            }


            postData('assets/server.php', formData) // Отправляю по этому адресу с данными которые получил в formData
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;