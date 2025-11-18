document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("match-list");
    if (!container) return;

    try {
        const response = await fetch("data/risultati.json");
        const result = await response.json();
        const partite = result.partite;

        container.innerHTML = "";

        partite.forEach(match => {

            // Card container
            const card = document.createElement("div");
            card.classList.add("match-card");

            // Stile speciale per la finale
            if (match.special_style === "finale") {
                card.style.border = "4px solid var(--oro-freddo)";
                card.style.backgroundColor = "var(--viola-scuro)";
                card.style.boxShadow = "0 0 60px var(--oro-freddo)";
            }

            // HEADER DATA
            const dateEl = document.createElement("span");
            dateEl.classList.add("match-date");
            dateEl.textContent = match.data;
            if (match.special_style === "finale") {
                dateEl.style.color = "var(--oro-freddo)";
                dateEl.style.fontSize = "1.1em";
            }
            card.appendChild(dateEl);

            // Risultato container
            const resultBox = document.createElement("div");
            resultBox.classList.add("match-result-container");

            resultBox.innerHTML = `
                <span class="kean-fc-name" 
                    style="${match.special_style === 'finale' ? 'color: var(--oro-freddo); font-size:1.2em; text-shadow:0 0 5px var(--oro-freddo);' : ''}">
                    ${match.team_name}
                </span>

                <img src="${match.team_logo}" alt="Kean FC Logo" class="team-logo"
                    style="${match.special_style === 'finale' ? 'height:55px;width:55px;filter:drop-shadow(0 0 10px white);' : ''}">

                <div style="flex-grow: 1;">
                    <span class="score-kean" 
                        style="${match.special_style === 'finale' ? 'color: var(--oro-freddo); font-size:5em;' : ''}">
                        ${match.gol_kean}
                    </span>
                    <span style="font-size:${match.special_style === 'finale' ? '3em' : 'inherit'}; color:white;">-</span>
                    <span class="score-opponent"
                        style="${match.special_style === 'finale' ? 'color:white; font-size:5em;' : ''}">
                        ${match.gol_opp}
                    </span>
                </div>

                <img src="${match.opp_logo}" alt="Logo Opponente" class="team-logo"
                    style="${match.special_style === 'finale' ? 'height:55px;width:55px;' : ''}">

                <span class="opponent-name"
                    style="${match.special_style === 'finale' ? 'color:white; font-size:1em;' : ''}">
                    ${match.opp_name}
                </span>
            `;

            card.appendChild(resultBox);

            // ESITO
            const status = document.createElement("span");
            status.classList.add("final-status");
            status.classList.add(match.esito_class);
            if (match.special_style === "finale") {
                status.style.backgroundColor = "var(--oro-freddo)";
                status.style.color = "var(--nero-dominante)";
                status.style.fontSize = "1.3em";
            }
            status.textContent = match.esito;

            card.appendChild(status);

            // MARCATORI / DETTAGLI
            const details = document.createElement("div");
            details.classList.add("match-details");
            if (match.special_style === "finale") {
                details.style.borderTopColor = "white";
            }

            details.innerHTML = `
                <h5 style="${match.special_style === 'finale' ? 'color: var(--oro-freddo);' : ''}">
                    ${match.titolo_marcatori}
                </h5>
                <p style="${match.special_style === 'finale' ? 'color:white;' : ''}">
                    ${match.marcatori}
                </p>
            `;

            card.appendChild(details);

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Errore caricamento risultati: ", err);
        container.innerHTML = "<p style='color:white;text-align:center;'>Errore nel caricamento.</p>";
    }
});
