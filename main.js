//https://teachablemachine.withgoogle.com/models/dc0Npt9GP/

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (Burrito) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + Burrito + '"/>'
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dc0Npt9GP/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is " + predicition_1;
    speak_data_2 = "And the Seconed Prediction is " + predicition_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(results[0].label == "Sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "Angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if(results[1].label == "Happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(results[1].label == "Sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[1].label == "Angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }
    }
}