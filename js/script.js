var countryList = new Array();

var apiLoad = new XMLHttpRequest();
apiLoad.open("GET","https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json",true)
apiLoad.send();
apiLoad.onload = function(){
  var data = JSON.parse(this.response);
  var i =0;
  data.forEach(e => {
    var addName = {Name:e.name, State: e.states}
    countryList.push(addName)
    var newCountryList = document.createElement('option')
    newCountryList.value = e.name;
    newCountryList.innerHTML = e.name;
    var getSelectCountry = document.getElementById("country");
    getSelectCountry.appendChild(newCountryList);
  });
}

function getState(){
  var countryValue = document.getElementById("country").value

  var deleteState = document.getElementById("state")
  
  if(deleteState.options.length >=1){
    deleteState.options.length = 0
    
  }
  var stateList = countryList.filter(e=>(e.Name == countryValue))
  
  
  stateList[0].State.forEach(s =>{
    var newStateList = document.createElement('option')
    newStateList.setAttribute("class","cState")
    newStateList.value = s.name;
    newStateList.innerHTML = s.name;
    var getSelectState = document.getElementById("state");
    getSelectState.appendChild(newStateList);
})

}


function getCity(){
  var countryValue = document.getElementById("country").value
  var stateValue = document.getElementById("state").value

  var deleteCity = document.getElementById("city")
  
  if(deleteCity.options.length >=1){
    deleteCity.options.length = 0
    
  }
  var stateList = countryList.filter(e=>(e.Name == countryValue))
  var cityList = stateList[0].State.filter(e=>e.name == stateValue).map(e=>e.cities)

  cityList[0].forEach(s =>{
    var newCityList = document.createElement('option')
    newCityList.setAttribute("class","cCity")
    newCityList.value = s.name;
    newCityList.innerHTML = s.name;
    var getSelectCity = document.getElementById("city");
    getSelectCity.appendChild(newCityList);
})

}

function checkInput(){

  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var gender = document.getElementsByName("gender");
  var food = document.querySelectorAll("#food");
  var address = document.getElementById("address").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var pincode = document.getElementById("pincode").value;
  var showError = document.querySelectorAll("small")
  var removeSmall = document.querySelectorAll("small");
  for(let i=0; i<removeSmall.length; i++){
    removeSmall[i].innerHTML = "";
  }

  var finalGender;
  for(var g of gender){
    if(g.checked){
      finalGender = g.value
    }
  }

  var finalFood="";
  var count =0;
  for(var i of food){
    if(i.checked){
      finalFood += i.value + " ";
      count +=1 ;
    }
  }
  

  if(fname === "" || fname === null || fname === " "){
    showError[0].innerHTML = "First name cannot be empty"
  }
  if(lname === "" || lname === null || lname === " "){
    showError[1].innerHTML = "Last name cannot be empty"
  }
  if(finalGender == undefined){
    showError[2].innerHTML = "Must choose gender"
  }
  if(count <2){
    showError[3].innerHTML = "Select minimum of two food"
  }
  if(address === "" || address === " " || address === null){
    showError[4].innerHTML = "Address cannot be empty"
  }
  if(country === "" || country === " " || country === "select"){
    showError[5].innerHTML = "Please select the country"
  }
  if(state === "" || state === " " || state === "select"){
    showError[6].innerHTML = "Please select the state"
  }
  if(city === "" || city === " " || city === "select"){
    showError[7].innerHTML = "Please select the city"
  }
  if(pincode === "" || pincode === " " || pincode === null){
    showError[8].innerHTML = "Please enter the pincode"
  }
  var trueCount = 0;
  var checkSmall = document.querySelectorAll("small")
  for(let i=0; i<9; i++){
    var answer = (checkSmall[i].innerHTML != "")? false: true
    if(answer){
      trueCount += 1;
    }
  }
  if(trueCount === 9){
    displayData();
    console.log("H");
  }
  console.log("object");
  
}

function displayData(){
  
  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var gender = document.getElementsByName("gender");
  var food = document.querySelectorAll("#food");
  var address = document.getElementById("address").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var pincode = document.getElementById("pincode").value;

  var finalGender;
  for(var g of gender){
    if(g.checked){
      finalGender = g.value
    }
  }

  var finalFood="";
  for(var i of food){
    if(i.checked){
      finalFood += i.value + " ";
    }
  }

  var columnAns = [fname, lname, finalGender, finalFood, address, country, state, city, pincode]

  // get the reference for the body
  var record = document.querySelector(".record");

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < 9; i++) {
    // creates a table row
    var row = document.createElement("tr");
    var label = document.querySelectorAll("#forTable");
    
    for (var j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      if(j == 0){
        var ans = label[i].innerHTML
        var cell = document.createElement("td");
        cell.setAttribute('id','labelCol')
        var cellText = document.createTextNode(ans);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }else{
        //var input = document.querySelector(column[i]);
        //var ans = columnAns[i];
        var cell = document.createElement("td");
        cell.setAttribute('id','ansCol')
        var cellText = document.createTextNode(columnAns[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      
      
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  record.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
  

}