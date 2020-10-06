function isNumber(value) {
    return !isNaN(value);
}

function priceGasolina(value){
    var pricePerLitroGasolina = 4.008;
    var priceTotalGasolina = value * pricePerLitroGasolina;

    var spanGasolina = document.querySelector('#spanGasolina');
    spanGasolina.value = priceTotalGasolina.toFixed(2);

    return priceTotalGasolina.toFixed(2);
}

function priceAlcool(value){
    var pricePerLitroAlcool = 2.537;
    var priceTotalAlcool = value * pricePerLitroAlcool;

    var spanAlcool = document.querySelector('#spanAlcool');
    spanAlcool.value = priceTotalAlcool.toFixed(2);

    return priceTotalAlcool.toFixed(2);
}

function comparativo(value){
    return priceAlcool(value)/priceGasolina(value);
}

function kmGasolina(value){
    return value;
}

function kmAlcool(value){
    return value;
}

var validations = [
    {
        id: 'v01',
        description: 'Recomenda-se colocar Gasolina',
        validator: function validatePrice(inputLitros) {
            if( comparativo(inputLitros) > 0.7 ) {
                this.description = 'Recomenda-se colocar Gasolina';
                return true
            } else if( comparativo(inputLitros) < 0.7 ) {
                this.description = 'Recomenda-se colocar Álcool';
                return true
            } else if (isNumber(inputLitros)) {
                this.description = 'Necessário informar os litros para te retornar o valor';
                return true;
            }
            return false
        },
    },
    {
        id: 'v02',
        description: 'Seu carro rodará XXX com gasolina',
        validator: function validatePrice(inputLitros) {
            const litros = kmGasolina(inputLitros) * 11
            this.description = `Seu carro rodará ${litros} km abastecendo com gasolina`;
            return kmGasolina(inputLitros) * 11;
        },
    },
    {
        id: 'v03',
        description: 'Seu carro rodará xxx com álcool',
        validator: function validatePrice(inputLitros) {
            const litros = kmAlcool(inputLitros) * 7
            this.description = `Seu carro rodará ${litros} km abastecendo com álcool`;
            return kmAlcool(inputLitros) * 7;
        },
    },
]

function start() {
    var inputLitros = document.querySelector('#inputLitros');
    inputLitros.addEventListener('input', handleInputChange);
}

function handleInputChange(event) {
    var inputLitros = event.target.value;

    validatePrice(inputLitros);
}

function validatePrice(inputLitros) {
    var divValidations = document.querySelector('.vantajoso');
    divValidations.innerHTML = '';

    var ul = document.createElement('ul');

    for (var i = 0; i < validations.length; i++) {
        var currentValidation = validations[i];

        var li = document.createElement('li');
        var p = document.createElement('p');
        var span = document.createElement('span');
        var icon = document.createElement('i');
        icon.classList.add('material-icons');
        // icon.textContent('subdirectory_arrow_right');

        p = currentValidation.validator(inputLitros);
        span.textContent = currentValidation.description;

        span.appendChild(icon);
        li.appendChild(span);
        ul.appendChild(li);
    }
    console.log(ul);


    divValidations.appendChild(ul);
}

start();
