const dino = document.querySelector('#dino')
const grille = document.querySelector("#grille")
const cactus = document.getElementById("#cactus")

let isJumping = false
let position = 0
let gravity = 0.9


window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "ArrowDown":
            // Faire quelque chose pour la touche "flèche vers le bas" pressée.
            break;
        case "ArrowUp":
            if (!isJumping){
                isJumping = true
                jump()
            }

            break;
        default:
    }
}, true);





function jump() {

    let count = 0
     let timerID = setInterval(function () {


     // Retour en bas
     if (count  === 15){
         clearInterval(timerID)
         let downTimerID = setInterval(function () {
             if (count === 0){
                 clearInterval(downTimerID)
                 isJumping = false

             }
             position -=6
             count --
             position = position * gravity
             dino.style.bottom = 200 + position + 'px'
             console.log(count)
             console.log(position)
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



function generationObstacles() {
    let positionObstacles = 1000
    const obstacles = document.createElement('div')
    obstacles.elements.add('cactus')
    grille.appendChild(obstacles)
    obstacles.style.left = positionObstacles + 'px'

}

generationObstacles()