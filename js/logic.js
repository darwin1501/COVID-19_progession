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

 var dataHistoryGlobal = JSON.parse( sessionStorage.dataHistory );

 var countryListGlobal = Object.keys(dataHistoryGlobal);


const updateChart = (()=>{
	chart.series[0].setData(jsonArray)
})

//parse json

// global data for json
var jsonArray = [];

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
        data: jsonArray,
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


// })

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
 		// generateData(eachCountry, totalCase)

 		const object = {"name": `${eachCountry}`,
					"value": totalCase ,
					"key": `${eachCountry}`}


	jsonArray.push(object);

	};
	// Korea, South
	//modify json name value
	const fixedKoreaS = jsonArray.filter(function(country) {
        return country.key === 'Korea, South'; 
    });

	const fixedTanzania = jsonArray.filter(function(country) {
        return country.key === 'Tanzania'; 
    });

	const fixedCongoB = jsonArray.filter(function(country) {
        return country.key === 'Congo (Brazzaville)';
    });
    const fixedCongoF = jsonArray.filter(function(country) {
        return country.key === 'Congo (Kinshasa)';
    });
	//changed the name 'Taiwan*' to 'Taiwan'
	const fixedTaiwan = jsonArray.filter(function(country) {
        return country.key === 'Taiwan*';
    });
    //changed the name 'US' to 'United States of America'
    const fixedUS = jsonArray.filter(function(country) {
        return country.key === 'US';
    });

    fixedKoreaS[0].name = 'South Korea';

    fixedTanzania[0].name = 'United Republic of Tanzania';

    fixedCongoB[0].name = 'Republic of Congo';

    fixedCongoF[0].name = 'Democratic Republic of the Congo';

	fixedTaiwan[0].name = 'Taiwan';
	// fixedTaiwan[0].value = 0;
	fixedUS[0].name = 'United States of America';

	chart.series[0].setData(jsonArray)

	// chart.series[0].setData(jsonArray)

	// console.log(jsonArray);

})


const slider = document.getElementById("slider");

slider.oninput = async function() {

	// console.log(dataHistoryGlobal);

  // output.innerHTML = this.value;
 // const dataHistory = JSON.parse( sessionStorage.dataHistory );

 const sliderValue = document.getElementById('slider').value

 // const countryList = Object.keys(dataHistory);

 const output = document.getElementById("demo");

 for (let countryCount = 0; countryCount < countryListGlobal.length; countryCount++) {

 	//country name
 	let eachCountry = countryListGlobal[countryCount];

 	const totalCase = dataHistoryGlobal[eachCountry][sliderValue].confirmed;

 	jsonArray[countryCount].value = totalCase;

 	jsonArray[countryCount].name = eachCountry;

 	jsonArray[countryCount].key = eachCountry;

 };

 	const fixedKoreaS = jsonArray.filter(function(country) {
        return country.key === 'Korea, South'; 
    });

 	const fixedTanzania = jsonArray.filter(function(country) {
        return country.key === 'Tanzania'; 
    });

	const fixedCongoB = jsonArray.filter(function(country) {
        return country.key === 'Congo (Brazzaville)'; 
    });

    const fixedCongoF = jsonArray.filter(function(country) {
        return country.key === 'Congo (Kinshasa)'; 
    });

 	const fixedTaiwan = jsonArray.filter(function(country) {
        return country.key === 'Taiwan*'; 
    });
    //changed the name 'US' to 'United States of America'
    const fixedUS = jsonArray.filter(function(country) {
        return country.key === 'US';
        
    });

    fixedKoreaS[0].name = 'South Korea';

    fixedTanzania[0].name = 'United Republic of Tanzania';

    fixedCongoB[0].name = 'Republic of Congo';

    fixedCongoF[0].name = 'Democratic Republic of the Congo';

	fixedTaiwan[0].name = 'Taiwan';

	fixedUS[0].name = 'United States of America';

	output.innerHTML = sliderValue;

	// await chart.series[0].setData(jsonArray)

	await updateChart();
	
}
