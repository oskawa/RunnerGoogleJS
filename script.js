const dino = document.querySelector('.dino')
const grille = document.querySelector("#grille")
const alert = document.getElementById("alert")

let isJumping = false
let isCrouch = false
let gameOver = false
let position = 0
let gravity = 0.9

/* Action pour l'input flèche du haut */
window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "ArrowDown":
            if (!gameOver){


                if (!isCrouch){
                    isCrouch = true
                    crouch()
                }
            }

            break;
        case "ArrowUp":
            if (!gameOver){


            if (!isJumping){
                isJumping = true
                isCrouch = true
                jump()
            }
            }

            break;
        default:
    }
}, true);


window.addEventListener("keyup", function(e) {
    switch (e.key) {
        case "ArrowDown":
            if (!gameOver) {
                console.log('vui')
stand()
            }

            break;
        default:
    }
}, true);


function jump() {

    let count = 0

    //Création d'un Timer qui agit toutes les 20 ms
    // Pour faire sauter et redescendre le dino
    let timerID = setInterval(function () {
     // Retour en bas
     if (count  === 15){
         clearInterval(timerID)
         let downTimerID = setInterval(function () {
             if (count === 0){
                 clearInterval(downTimerID)
                 isJumping = false
                 isCrouch = false
             }
             position -=6
             count --
             position = position * gravity
             //Agit sur le bottom pour simuler le saut du dino
             dino.style.bottom = 200 + position + 'px'
             }, 20)
     }
     // Vers le haut
         count++
         position +=30
         position = position * gravity
         dino.style.bottom = 200 + position + 'px'
         console.log(count)
         console.log(position)
     }, 20)

}


function crouch() {

        isCrouch = true
    dino.classList.add('crouch')
    dino.classList.remove('dino')
    console.log('ACCROUPI TOI')
}

function stand() {
      dino.style.height = 60 + 'px'
    console.log(dino.style.height)
    isCrouch = false
    dino.classList.add('dino')
    dino.classList.remove('crouch ')

}



function generationObstacles() {
    randomGeneration = Math.random() * 4000
    randomObstacles = Math.random()

    if (randomObstacles<0.5){
console.log('Inférieur')

    let positionCactus = 1000
    const cactus = document.createElement('div')
    if (!gameOver) cactus.classList.add('cactus')
    grille.appendChild(cactus)
    cactus.style.left = positionCactus + 'px'


    let timerID = setInterval(function () {
        if (positionCactus > 0 && positionCactus < 60 && position < 60){
            gameOver = true
            alert.innerHTML="Game Over"
            clearInterval(timerID)
            grille.removeChild(grille.lastChild)
        }
        positionCactus -=10
        cactus.style.left = positionCactus + 'px'
    },20)
if (!gameOver) setTimeout(generationObstacles, randomGeneration)
}else{
        console.log('Supérieur')
        let positionBird = 1000
        const bird = document.createElement('div')
        if (!gameOver) bird.classList.add('bird')
        grille.appendChild(bird)
        bird.style.left = positionBird + 'px'
         let timerID = setInterval( function () {
             if (positionBird > 0 && positionBird < 60 && position > 60) {
                 gameOver = true
                 alert.innerHTML="Game Over"
                 clearInterval(timerID)
                 grille.removeChild(grille.lastChild)
             }
             positionBird -= 10
             bird.style.left = positionBird + 'px'
        },20)
        if (!gameOver) setTimeout(generationObstacles, randomGeneration)
    }
}
generationObstacles()


