window.addEventListener('DOMContentLoaded', e => {

    let rulesDiv = document.querySelector('.rules-div')
    let rulesButton = document.querySelector('#rules-button')
    let rulesX = document.querySelector('.fa-x')
    let fadedBackground = document.querySelector('.faded-background')
    let choiceMenu = document.querySelector('.choice-menu')
    let paper = document.querySelector('.paper')
    let scissors = document.querySelector('.scissors')
    let rock = document.querySelector('.rock')
    let active = document.querySelectorAll('.active')
    let youPoints = document.querySelector('.you-points')
    let cpuPoints = document.querySelector('.cpu-points')
    let againDiv = document.querySelector('.again-div')
    let result = document.querySelector('.result')
    let paButton = document.querySelector('.pa-button')
    let resetButton = document.querySelector('.reset-button')
    let vsMenu = document.querySelector('.vs-menu')
    let lightUpLeft = document.querySelector('.left')
    let lightUpRight = document.querySelector('.right')

    function playWoosh() {
        let woosh = new Audio("whoosh.mp3")
        woosh.play()
    }

    function playSlot() {
        let slot = new Audio('Slot.mp3')
        slot.play()
    }

    function playBassDrop() {
        let bassDrop = new Audio('Bass Drop.mp3')
        bassDrop.play()
    }

    function playSuccess() {
        let success = new Audio('short-success.mp3')
        success.play()
    }

    function playLoss() {
        let loss = new Audio('ooh-123103.mp3')
        loss.play()
    }

    function playTie() {
        let tie = new Audio('failure-drum.mp3')
        tie.play()
    }

    rulesButton.addEventListener('click', e => {
        rulesDiv.style.transition = '300ms';
        fadedBackground.style.transition = '300ms'
        rulesDiv.style.visibility = 'visible';
        fadedBackground.style.visibility = 'visible';
        rulesDiv.style.opacity = '1'
        fadedBackground.style.opacity = '1'
    })

    rulesX.addEventListener('click', closeRules)
    fadedBackground.addEventListener('click', closeRules)

    function closeRules() {
        if (rulesDiv.style.visibility === 'visible') {
            rulesDiv.style.visibility = 'hidden'
            fadedBackground.style.visibility = 'hidden';
            rulesDiv.style.opacity = '0'
            fadedBackground.style.opacity = '0'
        }
    }

    function startAnimation() {
        setTimeout(() => {
            choiceMenu.style.height = '500px';
            choiceMenu.style.transition = '1s'
        }, 100)

        setTimeout(() => {
            choiceMenu.style.visibility = 'visible'
            choiceMenu.style.opacity = '1'
        }, 900)

        setTimeout(() => {
            playWoosh()
            rock.style.transition = '200ms'
            rock.style.transform = 'translate(-0%, 50%)'
        }, 1500)

        setTimeout(() => {
            playWoosh()
            paper.style.transform = 'translate(-70%, -70%)'
            paper.style.transition = '200ms'
        }, 1700)

        setTimeout(() => {
            playWoosh()
            scissors.style.transform = 'translate(70%, -70%)'
            scissors.style.transition = '200ms'
        }, 1900)
        setTimeout(() => {
            paper.addEventListener('click', getCPU)
            scissors.addEventListener('click', getCPU)
            rock.addEventListener('click', getCPU)
        }, 2000)
    }

    startAnimation()

    for (const i of active) {
        i.addEventListener('mousedown', mouseDown);
        i.addEventListener('mouseleave', mouseLeave);
    }

    function mouseDown(e) {
        e.currentTarget.style.boxShadow = '0px 7px 100px black';
    }

    function mouseLeave(e) {
        e.currentTarget.style.boxShadow = null;
    }

    for (const i of active) {
        i.addEventListener('mouseover', hover);
        i.addEventListener('mouseout', resetBackground);
    }

    function hover(e) {
        let choiceBox = e.currentTarget.querySelector('.choice-box')
        choiceBox.style.backgroundColor = 'rgb(219, 219, 219)';
        e.currentTarget.style.cursor = 'pointer';
    }

    function resetBackground(e) {
        let choiceBox = e.currentTarget.querySelector('.choice-box')
        choiceBox.style.backgroundColor = '';
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    function whoWins() {
        let clone = document.querySelector('.clone')
        let addYou = parseInt(youPoints.textContent)
        let addCPU = parseInt(cpuPoints.textContent)
        function againStyle() {
            againDiv.style.height = 'auto'
            againDiv.style.opacity = '1'
            againDiv.style.display = 'flex'
        }
        if ((clone.classList.contains('paper') && cpuClone.classList.contains('rock')) || (clone.classList.contains('rock') && cpuClone.classList.contains('scissors')) || (clone.classList.contains('scissors') && cpuClone.classList.contains('paper'))) {
            playSuccess()
            addYou++
            youPoints.textContent = addYou
            againStyle()
            lightUpLeft.style.transition = '300ms'
            lightUpLeft.style.boxShadow = '0 0 200px white'
            result.textContent = 'You Win'
        } else if ((clone.classList.contains('paper') && cpuClone.classList.contains('scissors')) || (clone.classList.contains('rock') && cpuClone.classList.contains('paper')) || (clone.classList.contains('scissors') && cpuClone.classList.contains('rock'))) {
            playLoss()
            addCPU++
            cpuPoints.textContent = addCPU
            againStyle()
            lightUpRight.style.transition = '300ms'
            lightUpRight.style.boxShadow = '0 0 200px white'
            result.textContent = 'You Lose'
        } else {
            playTie()
            againStyle()
            result.textContent = "It's A Tie"
        }
    }

    function getCPU(e) {
        paper.removeEventListener('click', getCPU)
        scissors.removeEventListener('click', getCPU)
        rock.removeEventListener('click', getCPU)
        playBassDrop()
        choiceMenu.style.transition = '500ms'
        choiceMenu.style.opacity = '0'
        choiceMenu.style.visibility = 'hidden'
        choiceMenu.style.height = '0'
        let clone = e.currentTarget.cloneNode(true)
        clone.classList.add('clone')
        clone.style.boxShadow = ''
        clone.style.visibility = 'hidden'
        clone.style.transition = '300ms'
        clone.style.position = 'static'
        clone.style.transform = 'translate(0%, 0%)'
        let choiceBox = clone.querySelector('.choice-box')

        setTimeout(() => {
            vsMenu.style.visibility = 'visible'
            vsMenu.style.opacity = '1'
            vsMenu.style.height = '320px'
            vsMenu.style.transition = '500ms'
            setTimeout(() => {
                let cpuClone = active[0];
                lightUpLeft.appendChild(clone)
                clone.style.opacity = '1'
                clone.style.visibility = 'visible'
                clone.style.cursor = 'default'
                cpuClone.style.opacity = '1'
                cpuClone.style.visibility = 'visible'
                choiceBox.style.backgroundColor = 'white'
            }, 400)
        }, 700)

        setTimeout(() => {
            genCPU()
        }, 1000)
    }

    async function genCPU() {
        playSlot()
        for (let i = 0; i < 24; i++) {
            cpuClone = active[Math.floor(Math.random() * 3)].cloneNode(true)
            lightUpRight.appendChild(cpuClone)
            cpuClone.style.position = 'static'
            cpuClone.style.transform = 'translate(0%, 0%)'
            cpuClone.style.cursor = 'default'

            if (i != 23) {
                await delay(120)
                cpuClone.remove()
            }
        }
        cpuClone.style.transition = '300ms'
        whoWins()
    }

    resetButton.addEventListener('click', e => {
        youPoints.textContent = '0'
        cpuPoints.textContent = '0'
    })

    paButton.addEventListener('click', e => {
        lightUpLeft.style.boxShadow = ''
        lightUpRight.style.boxShadow = ''
        paper.style.transform = 'translate(0%, -23%)'
        scissors.style.transform = 'translate(0%, -23%)'
        rock.style.transform = 'translate(0%, -23%)'
        againDiv.style.display = ''
        vsMenu.style.visibility = ''
        vsMenu.style.height = '0'
        vsMenu.style.opacity = '0'
        vsMenu.style.transition = '500ms'
        cpuClone.remove()
        let clone = document.querySelector('.clone')
        clone.remove()
        setTimeout(() => {
            startAnimation()
        }, 300)
    })
})
