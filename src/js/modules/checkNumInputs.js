const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, ''); // Когда пользователь что то вводит, и если наше рег.выражение находит не число то заменяет на пуст. место
        });
    });
};

export default checkNumInputs;