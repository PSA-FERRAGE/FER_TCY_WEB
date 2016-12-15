function getCharts(type)
{
    var link = "http://" + window.location.hostname + "/FER/";

    var items = $('#'+ type +'Topo').jqxTree('getCheckedItems');
    var localisations = [];

    for (var i = 0; i < items.length; i++) {
       var item = items[i];
       localisations[i] = item.value;
    }

    $.ajax({
        type: "POST",
        url: link + 'models/getHistograms',
        data: { localisations: localisations,
                startTime: '23/11/2016 06:00:00',
                endTime: '23/11/2016 14:00:00'
        },
        error: function( jqXHR, textStatus, errorThrown ) {
            alert('error status: ' + textStatus + " - thrown: " + errorThrown);
        },
        success: function(result) {
            if (result.success == true) {
                var mainDiv = document.getElementById("mainGrafPanel");

                var arrayLength = result.data.length;

                for (var i = 0; i < arrayLength; i++) {
                    var name = result.data[i].ilotName;
                    var histData = result.data[i].histData;

                    var chartID = 'tcy_' + i;
                    $('#mainGrafPanel').append(getChartTemplate(chartID));

                    addTcyChart(name, histData, chartID);
                }
            }
        },
        dataType: 'json'
    });


    // remData = {
    //     ilotName: 'ILOT 1',
    //     data: [["23/11/2016 06:02:55", 28], ["23/11/2016 06:03:40", 27], ["23/11/2016 06:05:55", 28]]
    // };

    
    // $.ajax({
    //     type: "POST",
    //     url: link + 'Main/getConveyors/',
    //     data: { localisations: [],
    //             startTime: '23/11/2016 06:00:00',
    //             endTime: '23/11/2016 14:00:00'
    //     },
    //     error: function( jqXHR, textStatus, errorThrown ) {
    //         alert('error status: ' + textStatus + " - thrown: " + errorThrown);
    //     },
    //     success: function(result) {
    //         if (result.success == true) {
    //             var mainDiv = document.getElementById("mainGrafPanel");
    //             console.log(result.data[0]);

    //             var arrayLength = result.data.length;

    //             for (var i = 0; i < arrayLength; i++) {
    //                 var name = result.data[i].ilotName;
    //                 var cnvData = result.data[i].cnvData;

    //                 $('#mainGrafPanel').append(getChartTemplate(i));

    //                 addCnvChart(name, cnvData, i);
    //             }
    //         }
    //     },
    //     dataType: 'json'
    // });
}


function addTcyChart(location, data, id) {
    var x = new Array;
    var y = new Array;

    $.each(data, function(index, value) {
        y.push(index);
        x.push(value);
    });


    var minX = Math.max.apply(null, x) - 0.5;
    var maxX = Math.min.apply(null, x) - 0.5;


    var tcy = {
        x: x,
        y: y,
        name: 'control',
        autobinx: false,
        marker: {
            color: "rgba(255, 100, 102, 0.7)",
            line: {
            color:  "rgba(255, 100, 102, 1)",
            width: 1
            }
        },
        opacity: 0.5,
        type: "histogram",
        xbins: {
            end: minX,
            size: 1,
            start: maxX
        }
    };

    var data = [tcy];
    var layout = {
        bargap: 0.0,
        bargroupgap: 0.0,
        barmode: "group"
    };

    Plotly.newPlot(id, data, layout);
}


function addCnvChart(location, data, id) {
    var x = new Array;
    var y = new Array;

    $.each(data, function(index, value) {
        x.push(value[0]);
        y.push(value[1]);
    });

    var data = {
        x: x,
        y: y,
        type: 'scatter'
    };

    Plotly.newPlot(id, [data]);
}


function getChartTemplate(id) {
    var element = '<div class="graf-kontainer"><div class="graf"><div id="' + id + '" class="telografu"></div></div><div class="pareto"></div></div>';
    return element;
}