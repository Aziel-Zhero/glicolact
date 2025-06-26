document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculate-btn");
    const weightInput = document.getElementById("weight");
    const resultSection = document.getElementById("result");
    const differenceText = document.getElementById("difference");
    const dosageText = document.getElementById("dosage");

    calculateBtn.addEventListener("click", function () {
        const weight = parseFloat(weightInput.value);
        if (!isNaN(weight)) {
            const [dosage, difference, resultMessage, resultColor] = calculateDosage(weight);
            differenceText.textContent = resultMessage;
            differenceText.style.color = "black"; // Definir a cor preta para a frase
            dosageText.textContent = `A dosagem que paciente deve ingerir é de ${dosage}ml.`;
            dosageText.style.color = resultColor; // Usar a cor vermelha para o valor da dosagem
            resultSection.style.display = "block";
        }
    });

    function calculateDosage(weight) {
        if (weight > 24) {
            return [300, null, "Pacientes acima de 25kg devem tomar 300ml de Lactose", "green"];
        } else {
            const dosage = weight * 12;
            const difference = 300 - dosage;
            return [dosage.toFixed(0), difference.toFixed(0), `Você deve retirar ${difference.toFixed(0)}ml da garrafa de Lactose`, "red"];
        }
    }
});