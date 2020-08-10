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

		//modify the json 

		getCountry();

		// countCases();
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
	// console.log(`${country} || ${value}`);

	//create object

	const object = {"name": `${country}`,
					"value": value,
					"key": `${country}`}
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

	// console.log(dataHistory);

	let countryList = Object.keys(dataHistory);

	// console.log(countryList);
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

		//dynamically access object property using variable

 		//total number of confimred cases on each day by country
 		const totalCase = dataHistory[eachCountry][sliderValue].confirmed;
 		//prepare json for map generation
 		generateData(eachCountry, totalCase)

		//for testing purposes
		
		// let counrtyId = document.getElementById('country');

		// let h1 = document.createElement('h1');

		// let h4 = document.createElement('h4');

		// h4.setAttribute("id", eachCountry);

		// h1.innerHTML = eachCountry;

		// h1.appendChild(h4);

		// counrtyId.appendChild(h1);

		// let eachCountryId = document.getElementById(eachCountry);

 		// eachCountryId.innerHTML = totalCase;

		// console.log(country[countryCount]);
	};

	//modify json name value
	//changed the name 'Taiwan*' to 'Taiwan'
	const fixedTaiwan = data.filter(function(country) {
        return country.key === 'Taiwan*'
        
    });
    //changed the name 'US' to 'United States of America'
    const fixedUS = data.filter(function(country) {
        return country.key === 'US'
        
    });

	fixedTaiwan[0].name = 'Taiwan';

	fixedUS[0].name = 'United States of America';

    console.log(data);
	// run map generator
	generateMap(data);

})

const slider = document.getElementById("slider");

slider.oninput = function() {

  // output.innerHTML = this.value;
 const dataHistory = JSON.parse( sessionStorage.dataHistory );

 const sliderValue = document.getElementById('slider').value

 const countryList = Object.keys(dataHistory);

 const output = document.getElementById("demo");

 for (let countryCount = 0; countryCount < countryList.length; countryCount++) {

 	//country name
 	let eachCountry = countryList[countryCount];

 	const totalCase = dataHistory[eachCountry][sliderValue].confirmed;

 	data[countryCount].value = totalCase;

 	//for testing purposes

 	// countryId.innerHTML = totalCase;

 	// const countryId = document.getElementById(countryList[countryCount]);

 };

	output.innerHTML = sliderValue;
	//run the map function
	generateMap(data)

}
