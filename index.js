const audioContext = new AudioContext();

// define primary sound control (gain)
const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);

// connect primary gain control to the output (speakers, etc...)
primaryGainControl.connect(audioContext.destination);

document.body.onkeyup = function (e) {
    if (
        e.code == "a" ||
        e.keyCode == 65
    ) {
        generateNote("C");
        document.getElementById("play").focus();
    } else if (
        e.code == "s" ||
        e.keyCode == 83
    ) {
        generateNote("D");
        document.getElementById("play").focus();

    } else if (
        e.code == "d" ||
        e.keyCode == 68
    ) {
        generateNote("E");
        document.getElementById("play").focus();

    } else if (
        e.code == "f" ||
        e.keyCode == 70
    ) {
        generateNote("F");
        document.getElementById("play").focus();

    } else if (
        e.code == "h" ||
        e.keyCode == 72
    ) {
        generateNote("G");
        document.getElementById("play").focus();

    } else if (
        e.code == "j" ||
        e.keyCode == 74
    ) {
        generateNote("A");
        document.getElementById("play").focus();
    } else if (
        e.code == "k" ||
        e.keyCode == 75
    ) {
        generateNote("B");
        document.getElementById("play").focus();
    } else if (
        e.code == "l" ||
        e.keyCode == 76
    ) {
        generateNote("Cup");
        document.getElementById("play").focus();
    }
}

function getFrequency(noteSymbol) {
    let freqVal;
    switch (noteSymbol) {
        case "D":
            freqVal = 293.66;
            break;
        case "E":
            freqVal = 329.63;
            break;
        case "F":
            freqVal = 349.23;
            break;
        case "G":
            freqVal = 392;
            break;
        case "A":
            freqVal = 440;
            break;
        case "B":
            freqVal = 493.88;
            break;
        case "Cup":
            freqVal = 523.25;
            break;
        default:
            freqVal = 261.63;
            break;
    }
    return freqVal;
}

function resetNotesClass() {
    Array.prototype.slice.call(document.getElementsByClassName("notes")[0].children).forEach(element => {
        element.classList.remove("active")
    });
}

function generateNote(noteSymbol) {

    resetNotesClass();


    let notesArray = ["C", "D", "E", "F", "G", "A", "B", "Cup"];
    let rnd = Math.floor(Math.random() * notesArray.length)

    let note = noteSymbol ?? notesArray[rnd];

    const noteFreq = getFrequency(note);
    const baseSoundOscilator = audioContext.createOscillator();

    let noteEl = document.getElementById("note" + note);
    noteEl.classList.add("active");

    let oscType = document.querySelector('input[name="oscType"]:checked').value;

    baseSoundOscilator.frequency.value = noteFreq;
    baseSoundOscilator.type = oscType;

    const baseSoundGain = audioContext.createGain();

    baseSoundGain.gain.setValueAtTime(1, audioContext.currentTime);
    baseSoundGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + .5);


    baseSoundOscilator.connect(baseSoundGain);
    // connect sound created to the main sound control
    baseSoundGain.connect(primaryGainControl);


    baseSoundOscilator.start();
    baseSoundOscilator.stop(audioContext.currentTime + .5);
    setTimeout(() => {
        resetNotesClass();
    }, 1000);
}

let randomSongInterval;

const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
    let timeout;

    const runInterval = () => {
        const timeoutFunction = () => {
            intervalFunction();
            runInterval();
        };

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

        timeout = setTimeout(timeoutFunction, delay);
    };

    runInterval();

    return {
        clear() { clearTimeout(timeout) },
    };
};

document.getElementById("playRandom").addEventListener("click", function () {
    document.getElementById("playRandom").classList.add("d-none");
    document.getElementById("stopRandom").classList.remove("d-none");
    randomSongInterval = setRandomInterval(generateNote, 100, 800);
})

document.getElementById("stopRandom").addEventListener("click", function () {
    document.getElementById("playRandom").classList.remove("d-none");
    document.getElementById("stopRandom").classList.add("d-none");
    randomSongInterval.clear();
});