async function loadStorico() {
    try {
        const res = await fetch("data/storico.json");
        const s = await res.json();

        document.getElementById("s-giocate").innerText   = s.giocate;
        document.getElementById("s-vittorie").innerText  = s.vittorie;
        document.getElementById("s-pareggi").innerText   = s.pareggi;
        document.getElementById("s-sconfitte").innerText = s.sconfitte;
        document.getElementById("s-gf").innerText        = s.gf;
        document.getElementById("s-gs").innerText        = s.gs;

    } catch(err) {
        console.error("Errore caricamento storico", err);
    }
}

window.addEventListener("load", loadStorico);
