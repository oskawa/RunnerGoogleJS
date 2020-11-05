const dino = document.querySelector('.dino')
const grille = document.querySelector("#grille")
const alert = document.getElementById("alert")
var tabImages = new Array(2)
var numImage=0
tabImages[0] = "img/trex_run_left.png";
tabImages[1] = "img/trex_run_right.png";
tabImages[2] = "img/trexcrouch.png";
let isJumping = false
let isCrouch = false
let gameOver = false
let position = 0
let gravity = 0.9
var oui

/* Action pour l'input flèche du haut */
window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "ArrowDown":
            if (!gameOver){


                if (!isCrouch){
                    isCrouch = true
                    isJumping = true
                    crouch()
                }
            }

            break;
        case "ArrowUp":
            if (!gameOver){
            if (!isJumping){
                isJumping = true
                
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

stand()
            }

            break;

        default:
    }
}, true);


function jump() {

    let count = 0
    dino.style.content = "url('img/trex.png')"
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
clearTimeout(oui)
    isCrouch = true
    dino.classList.remove('dino')
    dino.classList.add('crouch')
    dino.style.content = "url(" + tabImages[2] + ")"
}

function stand() {
    isJumping = false
    isCrouch = false
    dino.classList.add('dino')
    dino.classList.remove('crouch')
    dino.style.content = "url(" + tabImages[numImage] + ")"
    if (numImage == 1) numImage = 0;
    else numImage++;
    oui = setTimeout("stand()", 20);
}

function generationObstacles() {
    randomGeneration = Math.random() * 4000
    randomObstacles = Math.random()

    if (randomObstacles<0.5){
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
        if (positionCactus < 10) {
            cactus.remove()

        }
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
             if (positionBird < 10) {
                bird.remove()

             }
        },20)

        if (!gameOver) setTimeout(generationObstacles, randomGeneration)
    }

}




generationObstacles()
