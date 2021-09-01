var countryList = new Array();

// to get the api for Country, state and city names
var apiLoad = new XMLHttpRequest();
apiLoad.open(
	'GET',
	'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json',
	true
);
apiLoad.send();
apiLoad.onload = function () {
	var data = JSON.parse(this.response);

	// Using foreach to get the required details from the api and store into the array
	data.forEach((e) => {
		var addName = { Name: e.name, State: e.states };
		countryList.push(addName);

		// creating a select's option for the country and adding it to the element
		var newCountryList = document.createElement('option');
		newCountryList.innerHTML = e.name;

		// Getting the couontry list's element and appending the values
		var getSelectCountry = document.getElementById('country');
		getSelectCountry.appendChild(newCountryList);
	});
};

// This function is to create the state list based on the country selected

function getState() {
	// to get the country name
	var countryValue = document.getElementById('country').value;

	// This is to check if user has changed country selection and remove the old state values
	var deleteState = document.getElementById('state');

	if (deleteState.options.length >= 1) {
		deleteState.options.length = 0;
	}

	// to get the country based api data. The data may also have other info which is not nesccessary
	var stateList = countryList.filter((e) => e.Name == countryValue);

	// From the statelist all the state names are displayed by traversing
	stateList[0].State.forEach((s) => {
		// New option is created under the select of state
		var newStateList = document.createElement('option');

		// Class name is set using the setAttribute
		newStateList.setAttribute('class', 'cState');

		newStateList.innerHTML = s.name;

		// State's select is get here and the options are appended to it
		var getSelectState = document.getElementById('state');
		getSelectState.appendChild(newStateList);
	});
}

// This function is to create the city list based on the country and state selected
function getCity() {
	// Country and state names are stored in the variables
	var countryValue = document.getElementById('country').value;
	var stateValue = document.getElementById('state').value;

	// To remove the city names if the it was displaying other country's data
	var deleteCity = document.getElementById('city');

	if (deleteCity.options.length >= 1) {
		deleteCity.options.length = 0;
	}

	// To store the data of a certain country alone filter is used
	var stateList = countryList.filter((e) => e.Name == countryValue);

	// To store the country's city name alone filter based on state is done and the city names are stored
	var cityList = stateList[0].State.filter((e) => e.name == stateValue).map(
		(e) => e.cities
	);

	// Traversing through the citylist to add values into the newly created option element
	cityList[0].forEach((s) => {
		// Element is created and the class name is set
		var newCityList = document.createElement('option');
		newCityList.setAttribute('class', 'cCity');

		// value is added
		newCityList.innerHTML = s.name;

		// City's select element is selected and option is appended to it
		var getSelectCity = document.getElementById('city');
		getSelectCity.appendChild(newCityList);
	});
}

// To check if all the values are entered by the user
function checkInput() {
	// All the values are fetched based on their ID, element name
	var fname = document.getElementById('firstName').value;
	var lname = document.getElementById('lastName').value;
	var gender = document.getElementsByName('gender');
	var food = document.querySelectorAll('#food');
	var address = document.getElementById('address').value;
	var country = document.getElementById('country').value;
	var state = document.getElementById('state').value;
	var city = document.getElementById('city').value;
	var pincode = document.getElementById('pincode').value;
	var showError = document.querySelectorAll('small');
	var removeSmall = document.querySelectorAll('small');

	// This is to remove all value after storing locally to avoid throwing error based on previous input
	for (let i = 0; i < removeSmall.length; i++) {
		removeSmall[i].innerHTML = '';
	}

	// THis is to get the value from the radio button and to check if user has selected one
	var finalGender;
	for (var g of gender) {
		if (g.checked) {
			finalGender = g.value;
		}
	}
	// This is to get the value from the checkbox and to check if user has selected min of 2
	var finalFood = '';
	var count = 0;
	for (var i of food) {
		if (i.checked) {
			finalFood += i.value + ' ';
			count += 1;
		}
	}

	// To check and throw error message
	if (fname === '' || fname === null || fname === ' ') {
		showError[0].innerHTML = 'First name cannot be empty';
	}
	if (lname === '' || lname === null || lname === ' ') {
		showError[1].innerHTML = 'Last name cannot be empty';
	}
	if (finalGender == undefined) {
		showError[2].innerHTML = 'Must choose gender';
	}
	if (count < 2) {
		showError[3].innerHTML = 'Select minimum of two food';
	}
	if (address === '' || address === ' ' || address === null) {
		showError[4].innerHTML = 'Address cannot be empty';
	}
	if (country === '' || country === ' ' || country === 'select') {
		showError[5].innerHTML = 'Please select the country';
	}
	if (state === '' || state === ' ' || state === 'select') {
		showError[6].innerHTML = 'Please select the state';
	}
	if (city === '' || city === ' ' || city === 'select') {
		showError[7].innerHTML = 'Please select the city';
	}
	if (pincode === '' || pincode === ' ' || pincode === null) {
		showError[8].innerHTML = 'Please enter the pincode';
	}

	// Here checking if there are any error message and if not will
	// execute another function to display the user entered details
	var trueCount = 0;

	var checkSmall = document.querySelectorAll('small');

	for (let i = 0; i < 9; i++) {
		var answer = checkSmall[i].innerHTML != '' ? false : true;

		if (answer) {
			trueCount += 1;
		}
	}

	if (trueCount === 9) {
		displayData();
	}
}

function displayData() {
	// All the values are fetched based on their ID, element name
	var fname = document.getElementById('firstName').value;
	var lname = document.getElementById('lastName').value;
	var gender = document.getElementsByName('gender');
	var food = document.querySelectorAll('#food');
	var address = document.getElementById('address').value;
	var country = document.getElementById('country').value;
	var state = document.getElementById('state').value;
	var city = document.getElementById('city').value;
	var pincode = document.getElementById('pincode').value;

	// To get the selected gender value
	var finalGender;
	for (var g of gender) {
		if (g.checked) {
			finalGender = g.value;
		}
	}

	// To get the selected food names
	var finalFood = '';
	for (var i of food) {
		if (i.checked) {
			finalFood += i.value + ', ';
		}
	}
	// To remove the "," at the end
	finalFood = finalFood.slice(0, finalFood.length - 2);

	// All the values are stored in this array to traverse and display in table
	var columnAns = [
		fname,
		lname,
		finalGender,
		finalFood,
		address,
		country,
		state,
		city,
		pincode,
	];

	// get the reference for the body
	var record = document.querySelector('.record');

	// creates a <table> element and a <tbody> element
	var tbl = document.createElement('table');
	var tblBody = document.createElement('tbody');

	// creating all cells
	for (var i = 0; i < 9; i++) {
		// creates a table row
		var row = document.createElement('tr');
		var label = document.querySelectorAll('#forTable');

		for (var j = 0; j < 2; j++) {
			// Create a <td> element and a text node, make the text
			// node the contents of the <td>, and put the <td> at
			// the end of the table row
			if (j == 0) {
				var ans = label[i].innerHTML;
				var cell = document.createElement('td');
				cell.setAttribute('id', 'labelCol');
				var cellText = document.createTextNode(ans);
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else {
				var cell = document.createElement('td');
				cell.setAttribute('id', 'ansCol');
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
	tbl.setAttribute('border', '2');
}
