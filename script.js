let apiUrl = 'https://swapi.dev/api/people/';

window.onload = async () => {
    try{
       await loadCharacters(apiUrl)
    } catch(error) {
        console.log(error)
        alert( 'Erro ao caregar cards' )
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener("click", loadNextPage);
    backButton.addEventListener("click", loadPreviousPage);

}

async function loadCharacters(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json()

        responseJson.results.forEach((character) => {

            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
            card.className = "cards"

            const characterNameContainer = document.createElement("div")
            characterNameContainer.className  = "character-name-container"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            mainContent.appendChild(card);
            card.appendChild(characterNameContainer);
            characterNameContainer.appendChild(characterName);

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''


                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g,"")}.jpg')`
                characterImage.className = "character-image"


                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Nome: ${character.name}`

                const height = document.createElement("span")
                height.className = "character-details"
                height.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement("span")
                mass.className = "character-details"
                mass.innerText = `Peso: ${covertMass(character.mass)}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "character-details"
                eyeColor.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birthYear = document.createElement("span")
                birthYear.className = "character-details"
                birthYear.innerText = `Nascimento: ${covertBrithYear(character.birth_year)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(height)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)


            }

        });


        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"

        apiUrl = url

    }catch (error){
        console.log(error)
        alert( 'Erro ao caregar os personagens' )
    }
}

async function loadNextPage(){
    if(!apiUrl) return

    try{
        const response = await fetch(apiUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    }catch(error){
        alert('Erro ao carregar proxima pagina')
    }
}

async function loadPreviousPage(){
    if(!apiUrl) return

    try{
        const response = await fetch(apiUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    }catch(error){
        alert('Erro ao carregar proxima anterior')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelha",
        orange: "laranja",
        hazel: "avelã",
        unknown: "desconhecida"
    };

    return cores [eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    } 

    return (height / 100).toFixed(2);
}

function covertMass(mass) {
    if (mass === "unkonown") {
        return "desconhecido"
    }
    return(`${mass} kg`)
} 

function covertBrithYear(birthYear) {
    if (birthYear === "unkonown") {
        return "desconhecido"
    }
    return birthYear
}





