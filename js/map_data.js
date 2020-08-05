//load highchart maps
var chart = new Highcharts.Map('container', { 

	mapNavigation: {
			enableButtons: true,
			enableDoubleClickZoom: true,
			enableMouseWheelZoom: true,
			enableTouchZoom: true,
	}, 
   
    series: [{
        mapData: Highcharts.maps['custom/world'],

         data: [{
        value: 6,
        name: "Afghanistan",
        color: "#00FF00"
    }, {
        value: 6,
        name: "Russia",
        color: "#FF00FF"
    }]
    
    }]
});

//list of country in map modification
const countryList = Highcharts.geojson(Highcharts.maps['custom/world']);

console.log(countryList);