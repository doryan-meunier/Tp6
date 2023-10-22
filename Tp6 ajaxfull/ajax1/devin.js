document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("input");
    const message = document.getElementById("message");
    let nombreMystere;
    let tentativesRestantes = 6;
    const playButton = document.getElementById("valider");

    function generateRandomNumber() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    nombreMystere = parseInt(xhr.responseText.trim());
                } else {
                    console.error("Error fetching random number:", xhr.status, xhr.statusText);
                    nombreMystere = Math.floor(Math.random() * 100) + 1;
                }
            }
        };

        xhr.open("GET", "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new", true);
        xhr.send();
    }

    generateRandomNumber();

    // Other functions remain unchanged...

    function afficherMessage(messageText, couleur) {
        message.style.color = couleur;
        message.textContent = messageText;
    }

    function rejouer() {
        generateRandomNumber();
        tentativesRestantes = 6;
        afficherMessage("", "black");
        input.value = "";
        playButton.textContent = "Jouer";
        input.removeAttribute("disabled");
    }

    playButton.addEventListener("click", function () {
        if (playButton.textContent === "Rejouer ?") {
            rejouer();
            return;
        }

        const valeurSaisie = input.value.trim();

        if (valeurSaisie === "") {
            afficherMessage("Veuillez saisir un nombre.", "black");
            return;
        }

        const nombreSaisi = parseInt(valeurSaisie);

        if (isNaN(nombreSaisi) || nombreSaisi < 1 || nombreSaisi > 100) {
            afficherMessage("Nombre invalide. Entrez un nombre entre 1 et 100.", "black");
            return;
        }

        tentativesRestantes--;

        if (nombreSaisi < nombreMystere) {
            afficherMessage("Trop petit", "blue");
        } else if (nombreSaisi > nombreMystere) {
            afficherMessage("Trop grand", "blue");
        } else {
            afficherMessage("Gagné ! Le nombre mystère était " + nombreMystere, "green");
            playButton.textContent = "Rejouer ?";
            input.setAttribute("disabled", "disabled");
        }

        if (tentativesRestantes === 0) {
            afficherMessage("Perdu. Le nombre mystère était " + nombreMystere, "red");
            playButton.textContent = "Rejouer ?";
            input.setAttribute("disabled", "disabled");
        }
    });
});
