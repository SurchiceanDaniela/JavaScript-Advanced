import axios from 'axios';
let _ = require('lodash');
let getBtn = document.getElementById("btn1");
let search = document.getElementById("search");
let containerLibri = document.getElementById("containerLibri");

function createElement(tagElement, classElement, textElement) {
    tagElement = document.createElement(tagElement);
    tagElement.classList.add(classElement);
    textElement = document.createTextNode(textElement);
    tagElement.appendChild(textElement);
    return tagElement;
}
// CHIAMO API
const getData = async () => {
    containerLibri.innerHTML = '';
    let valoreCerca = search.value;
    let vcerca = valoreCerca.toLowerCase();
    try {
        const response = await axios.get('https://openlibrary.org/search.json?q=' + vcerca || "https://openlibrary.org/search/authors.json?q=" + vcerca)
        if (response.data.numFound == 0) {
            alert("OPS... La ricerca non ha prodotto alcun risultato, Riprova!");
            return;
        }
        //NUMERO RISULTATI DI RICERCA
        let numRisultatidiRicerca = response.data.docs.length;
        let titoloRicerca = createElement("h2", "titoloRicerca", 'Risultati trovati per "' + vcerca + '"');
        containerLibri.append(titoloRicerca);
        for (let i = 1; i < numRisultatidiRicerca; i++) {
            // CREAZIONE CONTENITORE LIBRO SINGOLO
            let Libro = createElement("div", "col-4", "");
            Libro.setAttribute('id', 'Libro');
            containerLibri.append(Libro);

            //CREO COLONNA PER COPERTINA DEL LIBRO
            let copertinaLibro = createElement("img", "imgLibro", "");
            copertinaLibro.setAttribute('id', 'copertinaLibro');
            //CREO ELEMENTO LA COPERTINA DEL LIBRO
            let copertinaLibroApi = response.data.docs[i]?.cover_i;
            //SE LA COPERTINA NON ESISTE AGGIUNGE QUELLA DI DEFAULT
            let copertinaLibroImg = copertinaLibroApi == undefined ? "https://via.placeholder.com/128x192.png?text=No+Cover" : "https://covers.openlibrary.org/b/id/" + copertinaLibroApi + "-M.jpg";
            copertinaLibro.setAttribute('src', copertinaLibroImg);
            Libro.append(copertinaLibro);

            //CREO COLONNA PER INFORMAZIONI LIBRO
            let infoLibro = createElement("div", "infoLibro", "");
            infoLibro.setAttribute('id', 'infolibro');
            Libro.append(infoLibro);
            //CREO ELEMENTO H3 CON IL TITOLO DEL LIBRO
            let titoloLibro = createElement("h3", "titololibro", response.data.docs[i]?.title);
            infoLibro.append(titoloLibro);

            //CREO ELEMENTO H4 CON L'AUTORE DEL LIBRO
            let autoreLibroApi = response.data.docs[i]?.author_name;
            let autoreLibroTesto = autoreLibroApi === undefined ? "Autore Sconosciuto" : response.data.docs[i]?.author_name;
            let autoreLibro = createElement("h4", "autore", autoreLibroTesto);
            autoreLibro.setAttribute('id', 'autore');
            infoLibro.append(autoreLibro);

            //CREO ELEMENTO H5 CON L'ANNO DELLA PRIMA EDIZIONE
            let annoPrimaEdizioneLibroApi = response.data.docs[i]?.first_publish_year;
            let annoPrimaEdizioneLibroTesto = annoPrimaEdizioneLibroApi === undefined ? "" : response.data.docs[i]?.first_publish_year;
            let annoPrimaEdizioneLibro = createElement("h5", "anno", "Prima Pubblicazione del " + annoPrimaEdizioneLibroTesto);
            annoPrimaEdizioneLibro.setAttribute('id', 'anno');
            infoLibro.append(annoPrimaEdizioneLibro);

            // CREO ELEMENTO BUTTON PER LA DESCRIZIONE DEL LIBRO
            let btnDescLibro = createElement("button", "bottoneDescrizioneLibro", "Più Informazioni");
            infoLibro.append(btnDescLibro);
            btnDescLibro.addEventListener('click', () => {
                btnDescLibro.style.display = 'none';
            })

            //AGGIUNGO DESCRIZIONE DEL LIBRO
            btnDescLibro.onclick = async function () {
                //CHIAMO API ATTRAVERSO LA KEY DEL LIBRO
                const dscrResp = await axios.get("https://openlibrary.org" + response.data.docs[i].key + ".json")
                    .then(function (dscrResp) {
                        //DICHIARO LA VARIABILE TESTO DELLA DESCRIZIONE
                        let descrizioneLibroTesto = "Nessuna descrizione disponibile";
                        //DICHIARO LA VARIABILE TIPO DELLA DESCRIZIONE
                        let descrizioneLibroType = typeof (dscrResp.data.description);
                        //CONTROLLO SE LA DESCRIZIONE HA COME TIPO STRINGA
                        if (descrizioneLibroType === 'string') {
                            descrizioneLibroTesto = dscrResp.data.description;
                            //CONTROLLO SE LA DESCRIZIONE HA COME TIPO OGGETTO
                        } else if (descrizioneLibroType === 'object') {
                            //AGGIUNGO SOLO IL VALUE DELLA DESCRIZIONE
                            descrizioneLibroTesto = dscrResp.data.description.value;
                        }
                        let descrizioneLibro = createElement("p", "descLibro", descrizioneLibroTesto);
                        descrizioneLibro.setAttribute('id', 'descrizioneLibro');
                        btnDescLibro.style.display = 'none';
                        infoLibro.append(descrizioneLibro);

                        // CREO PULSANTE PER NASCONDERE LA DESCRIZIONE
                        let HidebtnDescLibro = createElement("button", "backButton", "Meno Informazioni")
                        infoLibro.append(HidebtnDescLibro);
                        HidebtnDescLibro.addEventListener('click', () => {
                            btnDescLibro.style.display = 'block';
                        })
                        HidebtnDescLibro.onclick = function () {
                            if (descrizioneLibro.style.display !== "none") {
                                descrizioneLibro.style.display = "none";
                                btnDescLibro.style.display = 'block';
                                HidebtnDescLibro.style.display = 'none';
                            } else {
                                descrizioneLibro.style.display = "block";
                                btnDescLibro.style.display = 'none';
                                HidebtnDescLibro.style.display = 'block';
                            }
                        }

                    })
            }
        }
    } catch (error) {
        alert(`OPS... Qualcosa è andato storto, Riprova!`);
    }

}
getBtn.addEventListener("click", getData);
export default getData;
