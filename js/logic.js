// console.log('connected');


const dataHistory = 'https://disease.sh/v3/covid-19/historical?lastdays=all';


async function getData(){

	let getDataHistory = await fetch( dataHistory );

	if(getDataHistory.ok){

		getDataHistory  = await getDataHistory.json() 

		sessionStorage.clear();

		sessionStorage.dataHistory = JSON.stringify( getDataHistory );

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

	//country name
	console.log(dataHistory[0].country);
})

const countCases = (() => {

	const dataHistory = JSON.parse( sessionStorage.dataHistory );

	//set the aprs

	console.log(dataHistory)

	console.log(dataHistory[0].country);
	//loop country name
	//add html id to each element
	console.log(dataHistory[0].timeline.cases);
	//pass thre result in array
	//get int only for case count
	//get string only for date
	//distribute count on each ID
})

//get all country name
// get their total case on each day

// const countCases =