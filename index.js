const audioContext = new AudioContext();

let canvas = document.getElementById("canvas"),
    canvasContext = canvas.getContext("2d");

canvas.height = 400;
canvas.width = 450;

let isPlaying = false;

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
    } else if (
        e.code == "w" ||
        e.keyCode == 87
    ) {
        generateNote("CD");

    } else if (
        e.code == "s" ||
        e.keyCode == 83
    ) {
        generateNote("D");

    } else if (
        e.code == "e" ||
        e.keyCode == 69
    ) {
        generateNote("DE");

    } else if (
        e.code == "d" ||
        e.keyCode == 68
    ) {
        generateNote("E");

    } else if (
        e.code == "f" ||
        e.keyCode == 70
    ) {
        generateNote("F");

    } else if (
        e.code == "y" ||
        e.keyCode == 89
    ) {
        generateNote("FG");

    } else if (
        e.code == "h" ||
        e.keyCode == 72
    ) {
        generateNote("G");

    } else if (
        e.code == "u" ||
        e.keyCode == 85
    ) {
        generateNote("GA");

    } else if (
        e.code == "j" ||
        e.keyCode == 74
    ) {
        generateNote("A");
    } else if (
        e.code == "i" ||
        e.keyCode == 73
    ) {
        generateNote("AB");

    } else if (
        e.code == "k" ||
        e.keyCode == 75
    ) {
        generateNote("B");
    } else if (
        e.code == "l" ||
        e.keyCode == 76
    ) {
        generateNote("Cup");
    }
}

const notes = [
    {
        "symbol": "C",
        "octaveFour": 261.63,
        "octaveFive": 523.25,
        "octaveSix": 1046.50
    },
    {
        "symbol": "CD",
        "octaveFour": 277.18,
        "octaveFive": 554.37,
        "octaveSix": 1108.73
    },
    {
        "symbol": "D",
        "octaveFour": 293.66,
        "octaveFive": 587.33,
        "octaveSix": 1174.66
    },
    {
        "symbol": "DE",
        "octaveFour": 311.13,
        "octaveFive": 622.25,
        "octaveSix": 1244.51
    },
    {
        "symbol": "E",
        "octaveFour": 329.63,
        "octaveFive": 659.25,
        "octaveSix": 1318.51
    },
    {
        "symbol": "F",
        "octaveFour": 349.23,
        "octaveFive": 698.46,
        "octaveSix": 1396.91
    },
    {
        "symbol": "FG",
        "octaveFour": 369.99,
        "octaveFive": 739.99,
        "octaveSix": 1479.98
    },
    {
        "symbol": "G",
        "octaveFour": 392.00,
        "octaveFive": 783.99,
        "octaveSix": 1567.98
    },
    {
        "symbol": "GA",
        "octaveFour": 415.30,
        "octaveFive": 830.61,
        "octaveSix": 1661.22
    },
    {
        "symbol": "A",
        "octaveFour": 440.00,
        "octaveFive": 880.00,
        "octaveSix": 1760.00
    },
    {
        "symbol": "AB",
        "octaveFour": 466.16,
        "octaveFive": 932.33,
        "octaveSix": 1864.66
    },
    {
        "symbol": "B",
        "octaveFour": 493.88,
        "octaveFive": 987.77,
        "octaveSix": 1975.53
    },
    {
        "symbol": "Cup",
        "octaveFour": 523.25,
        "octaveFive": 1046.50,
        "octaveSix": 2093.00
    },
]


function getFreq(noteSymbol, octave) {
    let freqVal = 0;

    notes.forEach(item => {
        if (item.symbol === noteSymbol) {
            freqVal = item[octave]
        }
    })
    return freqVal;
}

function getFrequency(noteSymbol) {
    let freqVal;
    switch (noteSymbol) {
        case "CD":
            freqVal = 277.18;
            break;
        case "D":
            freqVal = 293.66;
            break;
        case "DE":
            freqVal = 311.13;
            break;
        case "E":
            freqVal = 329.63;
            break;
        case "F":
            freqVal = 349.23;
            break;
        case "FG":
            freqVal = 369.99;
            break;
        case "G":
            freqVal = 392;
            break;
        case "GA":
            freqVal = 415.30;
            break;
        case "A":
            freqVal = 440;
            break;
        case "AB":
            freqVal = 466.16;
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

    let oscType = document.querySelector('input[name="oscType"]:checked').value;

    let notesArray = ["C", "CD", "D", "DE", "E", "F", "FG", "G", "GA", "A", "AB", "B", "Cup"];
    let octaveArray = ["octaveFour", "octaveFive", "octaveSix"];
    let rndNote = Math.floor(Math.random() * notesArray.length);
    let rndOctave = Math.floor(Math.random() * octaveArray.length);
    let octaveFromInput = document.querySelector('input[name="octave"]:checked').value;
    // let filterFreqVal = document.getElementById("filterFreqVal").value;
    // let filterQVal = document.getElementById("filterQVal").value;

    let note = noteSymbol ?? notesArray[rndNote];
    let octave = noteSymbol ? octaveFromInput : octaveArray[rndOctave];
    let min = 1.2;
    let max = 5;
    let soundDuration = noteSymbol ? .7 : Math.random() * (max - min) + min;

    const noteFreq = getFreq(note, octave);

    let noteEl = document.getElementById("note" + note);
    noteEl.classList.add("active");

    const baseSoundOscilator = audioContext.createOscillator();
    baseSoundOscilator.frequency.value = noteFreq;
    baseSoundOscilator.type = oscType;

    // const baseSoundFilter = audioContext.createBiquadFilter();
    // baseSoundFilter.type = "peaking";
    // baseSoundFilter.frequency.value = filterFreqVal;
    // baseSoundFilter.Q.value = filterQVal;

    const baseSoundGain = audioContext.createGain();

    baseSoundGain.gain.setValueAtTime(1, audioContext.currentTime);
    baseSoundGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + soundDuration);

    // custom sound wave type
    // const imag = new Float32Array([50, 200, 1, 75, 40]);   // sine
    // const real = new Float32Array(imag.length);  // cos
    // const customWave = audioContext.createPeriodicWave(real, imag);
    // baseSoundOscilator.setPeriodicWave(customWave);

    // baseSoundOscilator.connect(baseSoundGain);
    // baseSoundGain.connect(baseSoundFilter);
    // // connect sound created to the main sound control
    // baseSoundFilter.connect(primaryGainControl);

    const analyser = audioContext.createAnalyser();

    baseSoundOscilator.connect(baseSoundGain);
    baseSoundGain.connect(analyser);
    // connect sound created to the main sound control
    analyser.connect(primaryGainControl);

    isPlaying = true;

    drawWave(analyser);


    baseSoundOscilator.start();
    baseSoundOscilator.stop(audioContext.currentTime + soundDuration);
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
    randomSongInterval = setRandomInterval(generateNote, 400, 1150);
})

document.getElementById("stopRandom").addEventListener("click", function () {
    document.getElementById("playRandom").classList.remove("d-none");
    document.getElementById("stopRandom").classList.add("d-none");
    randomSongInterval.clear();
    isPlaying = false;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
});

Array.prototype.slice.call(document.getElementsByClassName("notes")[0].children).forEach((item) => {
    item.addEventListener("click", () => {
        generateNote(item.getAttribute("id").replace("note", ""));
    })
});

function drawWave(analyser) {

    var buffer = new Float32Array(1024),
        w = canvasContext.canvas.width;

    // canvasContext.strokeStyle = "#777";
    canvasContext.setTransform(1, 0, 0, -1, 0, 200); // flip y-axis and translate to center
    // canvasContext.lineWidth = 2;

    (function loop() {
        analyser.getFloatTimeDomainData(buffer);

        canvasContext.clearRect(0, -200, w, canvasContext.canvas.height);

        canvasContext.beginPath();
        canvasContext.moveTo(0, buffer[0] * 90);
        for (var x = 2; x < w; x += 2) canvasContext.lineTo(x, buffer[x] * 90);
        canvasContext.stroke();

        if (isPlaying) requestAnimationFrame(loop)
    })();
}

function drawRandom(analyser) {
    canvasContext.setTransform(1, 0, 0, -1, 0, 200);
    (function loop() {

        canvasContext.beginPath();
        canvasContext.moveTo();
        canvasContext.stroke();

        if (isPlaying) requestAnimationFrame(loop)
    })
}