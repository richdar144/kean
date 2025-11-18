function createPlayerCard(p) {
    return `
    <div class="player-card">
        <img src="${p.foto}" alt="Foto ${p.nome}" class="player-photo">
        <div class="player-info">
            <p class="player-number">${p.numero}</p>
            <h4 class="player-name">${p.nome}</h4>
            <p class="player-role">${p.ruolo}</p>
        </div>
    </div>`;
}

async function loadRole(file, containerId) {
    const res = await fetch("data/squadra/" + file);
    const players = await res.json();
    const box = document.getElementById(containerId);

    players.forEach(p => {
        box.innerHTML += createPlayerCard(p);
    });
}

window.addEventListener("load", () => {
    loadRole("portieri.json", "lista-portieri");
    loadRole("difensori.json", "lista-difensori");
    loadRole("centrocampisti.json", "lista-centrocampisti");
    loadRole("attaccanti.json", "lista-attaccanti");
    loadRole("staff.json", "lista-staff");
});
