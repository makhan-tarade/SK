/* ========================================================================

Home Js

=========================================================================
 */


"use strict";


/*======== Doucument Ready Function =========*/
jQuery(document).ready(function ($) {

    var feedData = [
        [0,49.331065063219285],
        [1,48.79814898366035],
        [2,50.61793547911337],
        [3,53.31696317779434],
        [4,54.78560952831719],
        [5,53.84293992505776],
        [6,54.682958355082874],
        [7,56.742547193381654],
        [8,56.99677491680908],
        [9,56.144488388681445],
        [10,56.567122269843885],
        [11,60.355022877262684],
        [12,58.7457726121753],
        [13,61.445407102315514],
        [14,61.112870581452086],
        [15,58.57202276349258],
        [16,54.72497594269612],
        [17,52.070341498681124],
        [18,51.09867716530438],
        [19,47.48185519192089],
        [20,48.57861168097493],
        [21,48.99789250679436],
        [22,53.582491800119456],
        [23,50.28407438696142],
        [24,46.24606628705599],
        [25,48.614330310543856],
        [26,51.75313497797672],
        [27,51.34463925296746],
        [28,50.217320673443936],
        [29,54.657281647073304],
        [30,52.445057217757245],
        [31,53.063914668561345],
        [32,57.07494250387825],
        [33,52.970403392565515],
        [34,48.723854145068756],
        [35,52.69064629353968],
        [36,53.590890118378205],
        [37,58.52332126105745],
        [38,55.1037709679581],
        [39,58.05347017020425],
        [40,61.350810521199946],
        [41,57.746188675088575],
        [42,60.276910973029786],
        [43,61.00841651851749],
        [44,57.786733623457636],
        [45,56.805721677811356],
        [46,58.90301959619822],
        [47,62.45091969566289],
        [48,58.75007922945926],
        [49,58.405842466185355],
        [50,56.746633122658444],
        [51,52.76631598845634],
        [52,52.3020769891715],
        [53,50.56370473325533],
        [54,55.407205992344544],
        [55,50.49825590435839],
        [56,52.4975614755482],
        [57,48.79614749316488],
        [58,47.46776704767111],
        [59,43.317880548036456],
        [60,38.96296121124144],
        [61,34.73218432559628],
        [62,31.033700732272116],
        [63,32.637987000382296],
        [64,36.89513637594264],
        [65,35.89701755609185],
        [66,32.742284578187544],
        [67,33.20516407297906],
        [68,30.82094321791933],
        [69,28.64770271525896],
        [70,28.44679026902145],
        [71,27.737654438195236],
        [72,27.755190738237744],
        [73,25.96228929938593],
        [74,24.38197394166947],
        [75,21.95038772723346],
        [76,22.08944448751686],
        [77,23.54611335622507],
        [78,27.309610481106425],
        [79,30.276849322378055],
        [80,27.25409223418214],
        [81,29.920374921780102],
        [82,25.143447932376702],
        [83,23.09444253479626],
        [84,23.79459089729409],
        [85,23.46775072519832],
        [86,27.9908486073969],
        [101,13.957161242832626],
        [102,13.237091619700053],
        [103,18.10178875669874],
        [104,20.634765519499563],
        [105,21.064946755449817],
        [106,25.370593801826132],
        [107,25.321453557866203],
        [108,20.947464543531186],
        [109,18.750516645477425],
        [110,15.382042945356737],
        [111,14.569147793065632],
        [112,17.949159188821604],
        [113,15.965876707018058],
        [114,16.359355082317443],
        [115,14.163139419453657],
        [116,12.106761506858124],
        [117,14.843319717588216],
        [118,17.24291158460492],
        [119,17.799018581487058],
        [120,14.038359368301329],
        [121,18.658227817264983],
        [122,18.463689935573676],
        [123,22.687619584142652],
        [124,25.088957744790036],
        [125,28.184893996099582],
        [126,28.03276492115397],
        [127,24.11167758305713],
        [128,24.28007484247854],
        [129,28.23487421795626],
        [130,26.246971673504287],
        [131,29.330939820784877],
        [132,26.07749855928238],
        [133,23.921786397788168],
        [134,28.825012181053275],
        [135,25.140449169947626],
        [136,21.79048000172746],
        [137,23.05414699421924],
        [138,20.712904460250886],
        [139,19.727388210287337],
        [140,15.219713454550508],
        [141,16.567062865467058],
        [142,21.46105146001275],
        [143,24.699736621958863],
        [144,20.05510726036824],
        [145,16.200669070105356],
        [146,16.938945414022744],
        [147,15.50411643355061],
        [148,14.788500646665874],
        [149,16.97330575970296]
    ];

    if ($('#recentRevenueChart').length) {
        $.plot('#recentRevenueChart',
            [{
                data: feedData,
                color: '#7672fb'
            }],{

                series: {
                    shadowSize: 0,
                    lines: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: { colors: [ { opacity: 0 }, { opacity: 0.2 } ] }
                    }
                },
                grid: {
                    borderWidth: 0,
                    labelMargin: 0,
                    aboveData: true
                },
                yaxis: {
                    show: true,
                    color: 'rgba(0,0,0,0.06)',
                    ticks: [[0, ''], [15, '$6320'], [30, '$6340'], [45, '$6360'], [60, '$6380'], [75, '$6400']],
                    min: 0,
                    max: 80,
                    font: {
                        size: 11,
                        weight: '600',
                        family: 'Archivo, sans-serif',
                        color: '#343640'
                    }
                },
                xaxis: {
                    show: true,
                    color: 'rgba(0,0,0,0.1)',
                    ticks: [[0, '06:00'], [20, '09:00'], [40, '12:00'], [60, '13:00'], [80, '16:00'], [100, '19:00'], [120, '21:00'], [140, '23:00']],
                    font: {
                        size: 11,
                        family: 'Arial, sans-serif',
                        color: '#70737c'
                    },
                    reserveSpace: false
                }
            });
    }

    /*======== Plot Chart =========*/

    if ($(".updating-chart").length) {
        var data = [],
            totalPoints = 200;
        var getRandomData = function () {
            if (data.length > 0)
                data = data.slice(1);

            // do a random walk
            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50;
                var y = prev + Math.random() * 10 - 5;
                if (y < 0)
                    y = 0;
                if (y > 100)
                    y = 100;
                data.push(y);
            }

            // zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i)
                res.push([i, data[i]])

            return res;
        }


        var options = {
            // rgba(0,0,0,0.04)
            colors: ['#7572fb'],
            series:
                {
                    lines:
                        {
                            show: true,
                            lineWidth: 0.5,
                            fill: 0.9,
                            fillColor:
                                {
                                    colors: [
                                        {
                                            opacity: 0.6
                                        },
                                        {
                                            opacity: 0
                                        }]
                                },
                        },

                    shadowSize: 0 // Drawing is faster without shadows
                },
            grid:
                {
                    borderColor: '#F0F0F0',
                    borderWidth: 1,
                    labelMargin: 5
                },
            xaxis:
                {
                    color: '#F0F0F0',
                    font:
                        {
                            size: 10,
                            color: '#999'
                        }
                },
            yaxis:
                {
                    min: 0,
                    max: 100,
                    color: '#F0F0F0',
                    font:
                        {
                            size: 10,
                            color: '#999'
                        }
                }
        };
        var plot = $.plot($(".updating-chart"), [getRandomData()], options);
    }

    /*======== End Plot Chart =========*/

    /*======== Easy Pie Cart =========*/

    if ($(".easy-pie-chart").length) {
        $('.easy-pie-chart').each(function () {
            var value = $(this).data('value');
            var size = $(this).data('size');
            var trackColor = $(this).data('track-color');
            var barColor = $(this).data('bar-color');

            $(this).find('.easy-pie-chart__value').css({
                lineHeight: (size) + 'px',
                fontSize: (size / 4) + 'px',
                color: barColor
            });

            $(this).easyPieChart({
                easing: 'easeOutBounce',
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: 'rgba(0,0,0,0)',
                lineCap: 'round',
                lineWidth: 2,
                size: size,
                animate: 3000,
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            })
        });
    }

    /*======== End Easy Pie Cart =========*/

    /*======== Working Project chart =========*/

    if ($(".easy-pie-chart").length) {
        var options = {
            chart: {
                height: 305,
                type: 'radialBar'
            },
            plotOptions: {
                radialBar: {
                    offsetY: -10,
                    startAngle: 0,
                    endAngle: 210,
                    hollow: {
                        margin: 5,
                        size: '40%',
                        background: 'transparent',
                        image: undefined
                    },
                    dataLabels: {
                        name: {
                            show: true
                        },
                        value: {
                            show: true
                        }
                    }
                }
            },
            colors: [
                '#007bff', '#00cccc', '#6f42c1'
            ],
            series: [
                76, 67, 61
            ],
            labels: [
                'New', 'Old', 'Others'
            ],
            legend: {
                show: true,
                floating: true,
                fontSize: '12px',
                position: 'left',
                offsetX: 0,
                offsetY: 10,
                labels: {
                    useSeriesColors: true
                },
                markers: {
                    size: 0
                },
                itemMargin: {
                    horizontal: 1
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            show: false
                        }
                    }
                }
            ]
        }
        var chart = new ApexCharts(document.querySelector("#working_chart"), options);
        chart.render();
    }

    if($('#flotPieChart').length) {
        $.plot('#flotPieChart', [
            { label: 'Very Satisfied', data: [[1,25]], color: '#02bbe0'},
            { label: 'Satisfied', data: [[1,38]], color: '#3fb504'},
            { label: 'Not Satisfied', data: [[1,20]], color: '#f39a51'},
            { label: 'Very Unsatisfied', data: [[1,15]], color: '#969dab'}
        ], {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    innerRadius: 0.5,
                    label: {
                        show: true,
                        radius: 3/4,
                        formatter: labelFormatter
                    }
                }
            },
            legend: { show: false }
        });
        function labelFormatter(label, series) {
            return '<div style="font-size:11px; font-weight:500; text-align:center; padding:2px; color:white;">' + Math.round(series.percent) + '%</div>';
        }

    }

    if($('#capitals_map').length) {
        var map = AmCharts.makeChart("capitals_map", {
            "type": "map",
            "theme": "light",
            "projection": "miller",

            "dataProvider": {
                "map": "worldLow",
                "getAreasFromMap": true
            },
            "areasSettings": {
                "autoZoom": false,
                "color": "#7672fb",
                "selectedColor": "#5EB7DE",
                "selectable": true
            },
            "listeners": [ {
                "event": "clickMapObject",
                "method": function( event ) {
                    // deselect the area by assigning all of the dataProvider as selected object
                    map.selectedObject = map.dataProvider;

                    //define a custom click count property to store state
                    //if not already defined
                    if (event.mapObject.clickCount === undefined) {
                        event.mapObject.clickCount = 0;
                    }
                    //increment click count
                    ++event.mapObject.clickCount;

                    //if we're not at the third click, maintain the showAsSelected
                    //state while updating the color
                    if (event.mapObject.clickCount < 3) {
                        event.mapObject.showAsSelected = true;
                        event.mapObject.selectedColor = (event.mapObject.clickCount == 1 ? "#5EB7DE" : "#CC0000");
                    }
                    //otherwise, restore the initial color and reset the counter
                    else {
                        event.mapObject.clickCount = 0;
                        event.mapObject.showAsSelected = false;
                    }

                    //update the area's color
                    event.mapObject.validate();
                }
            } ],
            "export": {
                "enabled": true,
                "position": "bottom-right"
            }
        });
    }
});
/*======== End Doucument Ready Function =========*/