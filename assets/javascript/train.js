$(document).ready(function() {


//initialize firebase
var config = {
    apiKey: "AIzaSyD_yM7ZDB5nMg4dFQMHT66MTzAJhZ9YKG0",
    authDomain: "train-scheduler-4378e.firebaseapp.com",
    databaseURL: "https://train-scheduler-4378e.firebaseio.com",
    projectId: "train-scheduler-4378e",
    storageBucket: "",
    messagingSenderId: "188028492416"
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();
var inputFirstTrain = moment($("#first-train-input").val(),"HH:mm").format("HH:mm")
console.log(inputFirstTrain);



var newTrain= {
	train: trainName,
	destination: trainDestination,
	frequency: trainFrequency,
	firstTrain: inputFirstTrain
}
 
console.log(newTrain);

database.ref().push(newTrain);
// Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.firstTrain);


//clears all input boxes
 $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#first-train-input").val("");
});


//Creating firebase event for adding trains to firebase

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

   console.log(childSnapshot.val());

   // Store everything into a variable.
   var trainName = childSnapshot.val().train;
   var trainDestination = childSnapshot.val().destination;
   var trainFrequency = childSnapshot.val().frequency;
   var trainFirstTrain = childSnapshot.val().firstTrain;


  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(trainFirstTrain);






console.log("FIRST TRAIN TIME: " + trainFirstTrain);


 var currentTime=moment().format("HH:mm");
 console.log("CURRENT TIME: "+ currentTime);



//difference between times in minutes
 var difference= moment(currentTime,"HH:mm").diff(moment(trainFirstTrain,"HH:mm"),"minutes");
 console.log(difference);


 //time apart
var remainder = difference % trainFrequency;
console.log("REMAINDER: " + remainder);


//miutes until train
var minutesUntilTrain = trainFrequency - remainder;
console.log("MINUTES TILL TRAIN: " + minutesUntilTrain);

//next train
var nextTrain= moment().add(minutesUntilTrain,"minutes");
var nextTrainConverted =  moment(nextTrain).format("hh:mm");
console.log("ARRIVAL TIME: " + nextTrainConverted);



//add new train data to the table

$("#train-table>tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>"+ trainFrequency  + "</td><td>" + nextTrainConverted + "</td><td>" + minutesUntilTrain + "</td></tr>");

	})



})
