const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Dowiadujesz się, że zły Dy-Roo zbudował w swoim gabinecie bibliotekę ze słownikami zaklęć! Zakradnij się tam!',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Idź pod salę! (idź do "Parter")',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Jesteś przed biblioteką ale słyszysz hałas za drzwiami - Dyro jest w środku.',
        tlo: 'url("img/Drzwi.png")',
        options: [
            {
                text: 'Schowaj się za rogiem i poczekaj, aż Dy-Roo wybiegnie! (skradanie)',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: 'Czekasz 15 min i widzisz jak Dy-Roo wybiega na górę.',
        tlo: 'url("img/Ucieczka.png")',
        options: [
            {
                text: 'Wejdź do Biblioteki (idź do "Biblioteka")',
                nextText: "Start4"
            }
        ]
    },
    {
        id: "Start4",
        text: 'Oczom ukazuje Ci się ogromna Biblioteka, jak ze snów! Którą książkę przeglądasz?',
        tlo: 'url("img/Biblioteka.png")',
        options: [
            {
                text: 'Książka kucharska: "Smaki świata i okolic" (weź przedmiot)',
                nextText: "Kucharska"
            },
            {
                text: 'Książka romantyczna: "Ja i mój głaz" (weź przedmiot)',
                nextText: "Romantyczna"
            },
            {
                text: 'Autobiografia Tomasza Karolaka: "(Fanów) listy do T." (weź przedmiot)',
                nextText: "Karolak"
            },
            {
                text: 'Słownik przekręconych przysłów polskich: "Raz na moście, raz pod mostem" (weź przedmiot)',
                nextText: "Przysłowia"
            }
        ]
    },
    {
        id: "Kucharska",
        text: 'Szukasz najsilniejszego zaklęcia w książce. Po chwili znajdujesz zapisane złotymi literami.',
        tlo: 'url("img/Biblioteka.png")',
        options: [
            {
                text: 'Wypowiedz: "Los_Pollos_Hermanos!" (rzuć zaklęcie)',
                nextText: "Zaklęcie_K"
            }
        ]
    },
    {
        id: "Zaklęcie_K",
        text: 'Zaklęcie zmieniło Cię w kubełek pełen soczystego kurczaka. Możesz tylko czekać, aż Dy-Roo przyjdzie i Cię zje...',
        tlo: 'url("img/Kubełek.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj jeszcze raz!',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Romantyczna",
        text: 'Szukasz najsilniejszego zaklęcia w książce. Po chwili znajdujesz zapisane złotymi literami.',
        tlo: 'url("img/Biblioteka.png")',
        options: [
            {
                text: 'Wypowiedz: "Kocham Cię mała, skradłaś moje serce!" (rzuć zaklęcie)',
                nextText: "Zaklęcie_R"
            }
        ]
    },
    {
        id: "Zaklęcie_R",
        text: 'Zaklęcie przywołuje Dy-Roo, który jest zakochany w Tobie po uszy. Ściska Cię tak mocno, że umierasz...',
        tlo: 'url("img/Szczęśliwy.png")',
        options: [
            {
                text: 'Przegrałeś, zagraj jeszcze raz!',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Karolak",
        text: 'Szukasz najsilniejszego zaklęcia w książce. Po chwili znajdujesz zapisane złotymi literami.',
        tlo: 'url("img/Biblioteka.png")',
        options: [
            {
                text: 'Wypowiedz: "To ja powinienem zagrać papieża!" (rzuć zaklęcie)',
                nextText: "Zaklęcie_T"
            }
        ]
    },
    {
        id: "Zaklęcie_T",
        text: 'Mimo, że jesteś w budynku z piorunochronem, przez sufit trafia w Ciebie błyskawica. Masz za niską statystykę "religijność" aby używać tego zaklęcia...',
        tlo: 'url("img/Biblioteka.png")',
        options: [
            {
                text: 'Porażony prądem umierasz. Zagraj jeszcze raz!',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Przysłowia",
        text: 'Szukasz najsilniejszego zaklęcia w książce. Po chwili znajdujesz zapisane złotymi literami.',
        tlo: 'url("img/Biblioteka.png")',
        options: [
            {
                text: 'Wypowiedz: "Przez żołądek Dy-Roo, do jego serca!" (rzuć zaklęcie)',
                nextText: "Zaklęcie_P"
            }
        ]
    },
    {
        id: "Zaklęcie_P",
        text: 'Wymawiając zaklęcie doznajesz wizji: widzisz jak Dy-Roo umiera jedząc gołąbka!',
        tlo: 'url("img/gołąbki.png")',
        options: [
            {
                text: 'Wymknij się z biblioteki! (ucieczka)',
                nextText: "Sukces"
            }
        ]
    },
    {
        id: "Sukces",
        text: 'Dzięki zaklęciu wiesz, że Dy-Roo umiera jedząc gołąbka. Teraz wystarczy znaleźć sposób aby mu je wcisnąć...',
        tlo: 'url("img/Biblioteka.png")',
        options: [
            {
                text: 'Brawo! Czy chcesz zagrać jeszcze raz? (chcesz)',
                nextText: "Start1"
            }
        ]
    }
]

startGame()
