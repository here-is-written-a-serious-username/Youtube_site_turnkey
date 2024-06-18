let selectedFields = {
    items: [],
    total: 0
};

document.addEventListener('DOMContentLoaded', () => {

    const checkboxes = document.querySelectorAll('.calculator__checkbox');
    const counters = document.querySelectorAll('.calculator__counter-input[type="number"]');
    const totalField = document.getElementById('total');

    document.querySelectorAll('.btn-counter-minus').forEach(button => {
        button.addEventListener('click', onBtnMinusClick);
    });

    document.querySelectorAll('.btn-counter-plus').forEach(button => {
        button.addEventListener('click', onBtnPlusClick);
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotal);
    });

    counters.forEach(counter => {
        counter.addEventListener('input', updateTotal);
    });

    function onBtnMinusClick() {
        const input = this.nextElementSibling;
        if (input.value > 0) {
            input.value = Number(input.value) - 1;
            updateTotal();
        }
    };

    function onBtnPlusClick() {
        const input = this.previousElementSibling;
        input.value = Number(input.value) + 1;
        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        let discount = 0;
        selectedFields.items = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = Number(checkbox.dataset.price || 0);
                total += price;
                selectedFields.items.push({
                    type: 'checkbox',
                    id: checkbox.id,
                    price: price
                });
            }
            if (checkbox.checked && checkbox.dataset.discount) {
                discount = Number(checkbox.dataset.discount);
            }
        });

        counters.forEach(counter => {
            const price = Number(counter.dataset.price || 0);
            const quantity = Number(counter.value);
            total += price * quantity;

            if (quantity > 0 && !counter.dataset.total) {
                selectedFields.items.push({
                    type: 'counter',
                    id: counter.id,
                    price: price,
                    quantity: quantity
                });
            }

        });

        if (discount > 0) {
            total *= (1 - discount);
        }

        totalField.value = total;
        selectedFields.total = total;
        // console.log('Selected Fields:', selectedFields);
    }
});

export { selectedFields };