const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const  timeList = document.querySelector('#time-list')
const elTime = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#e31b05', '#00c9af','#04a4de', '#578732', '#dfe305', '#6205e3', '#e31b05', '#6205e3']
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function  decreaseTime () {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
        }
    }

function  setTime(value){
    elTime.innerHTML = `00:${value}`
}

function finishGame() {
    elTime.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score} </span></h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height =`${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.backgroundColor = color

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function winTheGame() {
    function kill(){
        const circle = document.querySelector('.circle')

        if (circle){
            circle.click()
        }
    }

    setInterval(kill, 75)
}