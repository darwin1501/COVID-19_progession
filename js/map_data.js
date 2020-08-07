



// //modify the json
var countryGeo = Highcharts.geojson(Highcharts.maps['custom/world']);
console.log(countryGeo);
// //prepare data

// // var randomData = [['ph', 100], ['sa', 2000]]
// var randomData = [
//                     {
//                         "name": "Philippines", 
//                         "value": 0
//                     },
//                     {
//                         "name": "Singapore", 
//                         "value": 0
//                     },
//                     {
//                         "name": "Japan", 
//                         "value": 0
//                     },
//                     {
//                         "name": "Taiwan*", 
//                         "value": 0
//                     }
//                 ]


// // console.log(countryList)

// //render charts based on the json
// var chart = new Highcharts.Map('container', { 
//         chart: {
//         map: 'custom/world'
//     },
//        title: {
//         text: 'Highmaps basic demo'
//     },

// 	mapNavigation: {
// 			enableButtons: true,
// 			enableDoubleClickZoom: true,
// 			enableMouseWheelZoom: true,
// 			enableTouchZoom: true,
// 	}, 

//     colorAxis: {
//             min: 0,
//         },
   
//     series: [{
//         data: randomData,
//         joinBy: ['name', 'name'],  // data will look the name property at the json.
//         name: 'Random data',
//         cursor: 'pointer',
//         states: {
//             hover: {
//                 color: '#BADA55'
//             }
//         },
//          dataLabels: {
//             enabled: true,
//             format: '{point.name}'
//         }

//     }]
// });

// // list of country in map modification

// // get the name of the country
// // set the color
// // set the value
// // add hover effect

// // console.log(data);
// // countryList[90].color = 'red'
// // console.log(countryList[0].color = 'red');