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

		countCases();

		getCountry();
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

	// console.log(country[0])

	for (let countryCount = 0; countryCount < country.length; countryCount++) {
		
		const counrtyId = document.getElementById('country');

		const h1 = document.createElement('h1');

		h1.innerHTML = country[countryCount];

		counrtyId.appendChild(h1);

		console.log(country[countryCount]);
	};

})

const countCases = (() => {

	const dataHistory = JSON.parse( sessionStorage.dataHistory );

	//set the aprs

	console.log(dataHistory);

	console.log(dataHistory.Philippines[0].confirmed);
	
	// console.log(dataHistory[0].timeline.cases);


	//pass thre result in array
	//get int only for case count
	//get string only for date
	//distribute count on each ID
})

//get all country name
// get their total case on each day

// const countCases =