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

// global data for json
var data = [];

//get all country name

// json creator
const generateData = ((country, value)=>{
	console.log(`${country} || ${value}`);

	//create object

	const object = {"name": `${country}`,
					"value": value}
	data.push(object);

})

// generate map

const generateMap = ((data)=>{
	//render charts based on the json
var chart = new Highcharts.Map('container', { 
        chart: {
        map: 'custom/world'
    },
       title: {
        text: 'Highmaps basic demo'
    },

	mapNavigation: {
			enableButtons: true,
			enableDoubleClickZoom: true,
			enableMouseWheelZoom: true,
			enableTouchZoom: true,
	}, 

    colorAxis: {
            min: 0,
        },
   
    series: [{
        data: data,
        joinBy: ['name', 'name'],  // data will look the name property at the json.
        name: 'Random data',
        cursor: 'pointer',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
         dataLabels: {
            enabled: true,
            format: '{point.name}'
        }

    }]
});

})

const getCountry = (() =>{

	const dataHistory = JSON.parse( sessionStorage.dataHistory );


	const countryList = Object.keys(dataHistory);
	//number of days since the pandemic has began on 1/22/2020
	let days = dataHistory.Afghanistan.length

	//subtract 1
	days = days - 1;

	//set the maximum value of slider
	const slider = document.getElementById('slider');

	slider.setAttribute("max", days);

	slider.setAttribute("value", 0);

	const sliderValue = document.getElementById('slider').value

	const output = document.getElementById("demo");

	output.innerHTML = slider.value;

	for (let countryCount = 0; countryCount < countryList.length; countryCount++) {

		let eachCountry = countryList[countryCount];
		
		let counrtyId = document.getElementById('country');

		let h1 = document.createElement('h1');

		let h4 = document.createElement('h4');

		h4.setAttribute("id", eachCountry);

		h1.innerHTML = eachCountry;

		h1.appendChild(h4);

		counrtyId.appendChild(h1);

		let eachCountryId = document.getElementById(eachCountry);

 		//dynamically access object property using variable
 		//total number of confimred cases on each day by country
 		const totalCase = dataHistory[eachCountry][sliderValue].confirmed;

 		eachCountryId.innerHTML = totalCase;

 		generateData(eachCountry, totalCase)

		// console.log(country[countryCount]);
	};

	console.log(data);

	generateMap(data);
	// run map generator


})

const countCases = (() => {

	const dataHistory = JSON.parse( sessionStorage.dataHistory );

	let country = 'Afghanistan';

	console.log(dataHistory[country][0].confirmed);

	const totalCase = dataHistory.Philippines[193].confirmed;
	
	const countryId = document.getElementById('Philippines');

	countryId.innerHTML = totalCase;

})

const slider = document.getElementById("slider");

slider.oninput = function() {

  // output.innerHTML = this.value;
 const dataHistory = JSON.parse( sessionStorage.dataHistory );

 const sliderValue = document.getElementById('slider').value

 const countryList = Object.keys(dataHistory);

 const output = document.getElementById("demo");

 for (let countryCount = 0; countryCount < countryList.length; countryCount++) {

 	const countryId = document.getElementById(countryList[countryCount]);

 	//country name
 	let eachCountry = countryList[countryCount];

 	//dynamically access object property using variable
 	//total number of confimred cases on each day by country
 	const totalCase = dataHistory[eachCountry][sliderValue].confirmed;

 	countryId.innerHTML = totalCase;

 	//modify json set the name and the value
 	//run the map function

 };

	output.innerHTML = sliderValue;

	// console.log(countryId);
}
