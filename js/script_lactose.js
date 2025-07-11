document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculate-btn");
    const weightInput = document.getElementById("weight");
    const errorMsg = document.getElementById("error-msg");

    const resultPopup = document.getElementById("result-popup");
    const differenceText = document.getElementById("difference");
    const dosageText = document.getElementById("dosage");
    const closeBtn = document.getElementById("close-btn");

    const helpBtn = document.getElementById("help-btn");
    const helpPopup = document.getElementById("help-popup");
    const closeHelp = document.getElementById("close-help");

    // Botão Calcular
    calculateBtn.addEventListener("click", function () {
        const weight = parseFloat(weightInput.value);
        if (isNaN(weight) || weight <= 0) {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        const [dosage, difference, resultMessage, resultColor] = calculateDosage(weight);

        differenceText.textContent = resultMessage;
        differenceText.style.color = "black";

        dosageText.textContent = `A dosagem que o paciente deve ingerir é de ${dosage}ml.`;
        dosageText.style.color = resultColor;

        resultPopup.classList.remove("hidden");
        gsap.fromTo(resultPopup.querySelector("div"),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    });

    // Fecha resultado
    closeBtn.addEventListener("click", () => {
        gsap.to(resultPopup.querySelector("div"), {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => resultPopup.classList.add("hidden")
        });
    });

    // Ajuda
    helpBtn.addEventListener("click", () => {
        helpPopup.classList.remove("hidden");
        gsap.fromTo(helpPopup.querySelector("div"),
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
    });

    closeHelp.addEventListener("click", () => {
        gsap.to(helpPopup.querySelector("div"), {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => helpPopup.classList.add("hidden")
        });
    });

    function calculateDosage(weight) {
        if (weight > 24) {
            return [300, null, "Pacientes com peso igual ou superior a 25 kg devem tomar os 300 ml de lactose", "green"];
        } else {
            const dosage = weight * 12;
            const difference = 300 - dosage;
            return [dosage.toFixed(0), difference.toFixed(0), `Você deve retirar ${difference.toFixed(0)}ml da garrafa de Lactose`, "red"];
        }
    }
});
