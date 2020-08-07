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

	// console.log(dataHistory);

	let countryList = Object.keys(dataHistory);

	// countryList.forEach(function(key) {

 //    let country = countryList[key];

 //    if(country == 'US'){

 //        	// country=country.replace("\"US\":","\"United States of America\":");
 //        	// // data = 'United States of America'

 //        	return console.log('this is us')
 //        }

 //    // console.log(country);
 //    // ...
	// });
	console.log(countryList);
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

	// 		//modify the json file


		
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


				// changed the us to United States of America
	// const changedUS = data.filter(function(key) {
 //        // return data.name === 'US'

 //        if(key === 'US'){

 //        	// data=data.replace("\"US\":","\"United States of America\":");
 //        	// data = 'United States of America'

 //        	console.log('this is us')

 //        }
 //    });

 //    console.log(changedUS);



	// run map generator
	generateMap(data);


})

// const countCases = (() => {

// 	const dataHistory = JSON.parse( sessionStorage.dataHistory );

// 	let country = 'Afghanistan';

// 	// console.log(dataHistory[country][0].confirmed);

// 	const totalCase = dataHistory.Philippines[193].confirmed;
	
// 	const countryId = document.getElementById('Philippines');

// 	countryId.innerHTML = totalCase;

// })

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
 	// console.log(data[0].name);

 	

 	// set new value
	data[countryCount].value = totalCase;

		// console.log(data);

	

 };

	output.innerHTML = sliderValue;
	//run the map function
	generateMap(data)

	// console.log(countryId);
}
