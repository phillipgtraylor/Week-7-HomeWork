$(document).ready(function(event) {

  var config = {
    apiKey: "AIzaSyD0wEI_L7mmhussyWU1eYMF9kZgA7NP2Uc",
    authDomain: "employeedata-ede61.firebaseapp.com",
    databaseURL: "https://employeedata-ede61.firebaseio.com",
    projectId: "employeedata-ede61",
    storageBucket: "",
    messagingSenderId: "1096092632034"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";

  $("#submit-button").focus().on("click", function(event) {
    event.preventDefault();


    var tFrequency = $("#frequency").val().trim();

    var firstTime = $("#firstTrain").val().trim();
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime + "minutes");

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    name = $("#name").val().trim();
    console.log(name);

    destination = $("#destination").val().trim();
    console.log(destination);

    firstTrain = $("#firstTrain").val().trim();
    console.log(firstTrain);

    frequency = $("#frequency").val().trim();
    console.log(frequency);

    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        tMinutesTillTrain: tMinutesTillTrain,
        tRemainder: tRemainder,
        nextTrain: nextTrain,
      });

  });

  database.ref().on("child_added", function(snapshot) {

  var sv = snapshot.val();

    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.firstTrain);
    console.log(sv.frequency);    



    var entry = $("#table").append ("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" + sv.frequency + "</td><td>" + sv.tRemainder + "</td><td>" + sv.tMinutesTillTrain +"</td></tr>" );

    console.log(entry);

});

});



  // orderByChild("dateAdded").limitToLast(1)