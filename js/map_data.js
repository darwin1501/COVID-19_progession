



//modify the json
var countryList = Highcharts.geojson(Highcharts.maps['custom/world']);
//prepare data

// var randomData = [['ph', 100], ['sa', 2000]]
var randomData = [
    {
        "name": "Philippines", 
        "value": 100
    },
    {
        "name": "Singapore", 
        "value": 10000
    },
    {
        "name": "Japan", 
        "value": 1000
    }
    ]
console.log(countryList)

// console.log(countryList);
// load highchart maps

// countryList.forEach((country, i) => {
//     console.log(country)
//   if (i > 20) {
//     country.color = 'red'
//   }
//   if(country.name == 'Italy'){
//     country.color = 'yellow'
//   }
// })

// var data = Highcharts.geojson(Highcharts.maps['custom/europe']);

// data.forEach((country, i) => {
//     console.log(country)
//   if (i > 20) {
//     country.color = 'red'
//   }
//   if(country.name == 'Italy'){
//     country.color = 'yellow'
//   }
// })

// console.log(data);



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
        data: randomData,
        joinBy: ['name', 'name'],
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

// list of country in map modification

// get the name of the country
// set the color
// set the value
// add hover effect

// console.log(data);
// countryList[90].color = 'red'
// console.log(countryList[0].color = 'red');