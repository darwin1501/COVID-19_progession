// console.log('connected');


// const dataHistory = 'https://disease.sh/v3/covid-19/historical?lastdays=all';
// const dataHistory = 'https://corona.lmao.ninja/v2/historical?lastdays=all';
// https://corona.lmao.ninja/v2/historical?lastdays=all

//another api
const dataHistory = 'https://pomber.github.io/covid19/timeseries.json';
// https://pomber.github.io/covid19/timeseries.json


async function getData(){

	let getDataHistory = await fetch( dataHistory );

	if(getDataHistory.ok){

		getDataHistory  = await getDataHistory.json() 

		sessionStorage.clear();

		sessionStorage.dataHistory = JSON.stringify( getDataHistory );

		getCountry();

		countCases();
		//get data here

		// console.log(getDataHistory);

	}else{

		console.log(getDataHistory.status)
	}


}

getData();

//parse json

//get all country name

const getCountry = (() =>{

	const dataHistory = JSON.parse( sessionStorage.dataHistory );


	const country = Object.keys(dataHistory);
	//number of days since the pandemic has began on 1/22/2020
	let days = dataHistory.Afghanistan.length

	//subtract 1
	days = days - 1;

	//set the maximum value of slider
	const slider = document.getElementById('slider');

	slider.setAttribute("max", days);

	slider.setAttribute("value", days);

	const output = document.getElementById("demo");

	output.innerHTML = slider.value;

	//slider
	// console.log(country[0]);



	// console.log(country[0])

	for (let countryCount = 0; countryCount < country.length; countryCount++) {

		let countryResult = country[countryCount]
		
		let counrtyId = document.getElementById('country');

		let h1 = document.createElement('h1');

		let h4 = document.createElement('h4');

		h4.setAttribute("id", countryResult);

		h1.innerHTML = countryResult;

		h1.appendChild(h4);

		counrtyId.appendChild(h1);

		// console.log(country[countryCount]);
	};

})

const countCases = (() => {

	const dataHistory = JSON.parse( sessionStorage.dataHistory );

	//set the aprs

	// console.log(dataHistory);
	
	// console.log(dataHistory.Philippines[0].confirmed);
	//show the total case on specific day
	const totalCase = dataHistory.Philippines[193].confirmed;
	
	const countryId = document.getElementById('Philippines');

	// console.log(countryId);

	countryId.innerHTML = totalCase;


	// console.log(dataHistory[0].timeline.cases);
	//pass thre result in array
	//get int only for case count
	//get string only for date
	//distribute count on each ID

})

const slider = document.getElementById("slider");

// const output = document.getElementById("demo");

// output.innerHTML = slider.value;

slider.oninput = function() {

  // output.innerHTML = this.value;
 const dataHistory = JSON.parse( sessionStorage.dataHistory );

 const sliderValue = document.getElementById('slider').value

 const country = Object.keys(dataHistory);

 const totalCase = dataHistory.Philippines[sliderValue].confirmed;
	
 const countryId = document.getElementById('Philippines');

 const output = document.getElementById("demo");

 for (let countryCount = 0; countryCount < country.length; countryCount++) {

 	// console.log(sliderValue);

 	// console.log(singleCountry);

 	const countryId = document.getElementById(country[countryCount]);

 	// console.log(countryId);
 	// const countryTest = {Afghanistan};

 	//replace the country with a variable

 	const totalCase = dataHistory.Afghanistan[sliderValue].confirmed;

 	// const totalCaseTest = dataHistory.country[countryCount];

 	// console.log(totalCaseTest)

 	// console.log(dataHistory)

 	// console.log(dataHistory.country[countryCount][sliderValue].confirmed)

 	countryId.innerHTML = totalCase;

 };

	output.innerHTML = sliderValue;

	// console.log(countryId);

	countryId.innerHTML = totalCase;

}

//get all country name
// get their total case on each day

// const countCases =