document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculate-btn");
  const weightInput = document.getElementById("weight");
  const resultSection = document.getElementById("result-popup");
  const differenceText = document.getElementById("difference");
  const dosageText = document.getElementById("dosage");
  const errorMsg = document.getElementById("error-msg");
  const popupContent = resultSection.querySelector("div");
  const closeBtn = document.getElementById("close-btn");

  calculateBtn.addEventListener("click", function () {
    const weight = parseFloat(weightInput.value);

    // Validação amigável
    if (!weight || weight <= 0) {
      errorMsg.classList.remove("hidden");
      weightInput.classList.add("border-red-600", "focus:ring-red-600");
      return;
    }

    // Esconde erro se válido
    errorMsg.classList.add("hidden");
    weightInput.classList.remove("border-red-600", "focus:ring-red-600");

    // Cálculo da dosagem
    const [dosage, difference, resultMessage, resultColor] = calculateDosage(weight);

    differenceText.textContent = resultMessage;
    differenceText.style.color = "black";
    dosageText.textContent = `Dosagem: ${dosage} ml`;
    dosageText.style.color = resultColor;

    // Mostrar popup com animação GSAP
    resultSection.classList.remove("hidden");
    gsap.fromTo(
      popupContent,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  });

  closeBtn.addEventListener("click", () => {
    gsap.to(popupContent, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => resultSection.classList.add("hidden"),
    });
  });

  function calculateDosage(weight) {
    if (weight > 42) {
      return [
        300,
        null,
        "Pacientes acima de 42kg devem tomar 300ml de Dextrosol",
        "green",
      ];
    } else {
      const dosage = weight * 7;
      const difference = 300 - dosage;
      return [
        dosage.toFixed(0),
        difference.toFixed(0),
        `Você deve retirar ${difference.toFixed(0)}ml da garrafa de Dextrosol`,
        "red",
      ];
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const helpBtn = document.getElementById("help-btn");
  const helpPopup = document.getElementById("help-popup");
  const closeHelp = document.getElementById("close-help");

  helpBtn.addEventListener("click", () => {
    helpPopup.classList.remove("hidden");
    gsap.fromTo(
      helpPopup.querySelector("div"),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  });

  closeHelp.addEventListener("click", () => {
    gsap.to(helpPopup.querySelector("div"), {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => helpPopup.classList.add("hidden"),
    });
  });
});
