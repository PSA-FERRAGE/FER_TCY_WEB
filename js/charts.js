function createCharts(type, nodes, timeRange, timeRgnType) {
    $('.graf-kontainer').remove();

    switch (type) {
        case 'op':
            createOperatorsCharts(nodes, timeRange, timeRgnType);
            break;
        case 'tcy':
            createCycleTimesCharts(nodes, timeRange);
            break;
        case 'cnv':
            createConvoyeursCharts(nodes, timeRange);
            break;
        case 'par':
            createParetosCharts(nodes, timeRange, timeRgnType);
            break;
        default:
            alert('Nepodporovany typ grafu!');
            return;
    }
}

function createOperatorsCharts(nodes, timeRange, timeRgnType) {
    var opChecked = $('#' + timeRgnType + "_toggle").prop('checked');
    
    $.ajax({
        type: "POST",
        url: window.link + "data/getOperatorsCharts",
        data: {
            localisations: nodes,
            startTime: timeRange.startTime,
            endTime: timeRange.endTime,
            opChecked: opChecked
        },
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error status: ' + textStatus + " - thrown: " + errorThrown);
        },
        success: function (response) {
            if (response.success) {
                var mainDiv = document.getElementById("chartsArea");
                var arrayLength = response.data.length;

                for (var i = 0; i < arrayLength; i++) {
                    $('#chartsArea').append(getChartTemplate('op_' + i));
                    addOpChart(response.data[i].postName, response.data[i].chartData, response.data[i].median, 'op_' + i);
                }
            } else {
                console.log(response);
            }
        }
    });
}

function createCycleTimesCharts(nodes, timeRange) {
    $.ajax({
        type: "POST",
        url: window.link + "data/getTCY",
        data: {
            localisations: nodes,
            startTime: timeRange.startTime,
            endTime: timeRange.endTime
        },
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error status: ' + textStatus + " - thrown: " + errorThrown);
        },
        success: function (response) {
            if (response.success) {
                var mainDiv = document.getElementById("chartsArea");
                var arrayLength = response.data.length;

                for (var i = 0; i < arrayLength; i++) {
                    $('#chartsArea').append(getChartTemplate('tcy_' + i));
                    addTcyChart(response.data[i].ilotName, response.data[i].chartData, 'tcy_' + i);
                }
            } else {
                console.log(response);
            }
        }
    });
}


function createConvoyeursCharts(nodes, timeRange) {
    $.ajax({
        type: "POST",
        url: window.link + "data/getConvoyeursCharts",
        data: {
            localisations: nodes,
            startTime: timeRange.startTime,
            endTime: timeRange.endTime
        },
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error status: ' + textStatus + " - thrown: " + errorThrown);
        },
        success: function (response) {
            if (response.success) {
                var mainDiv = document.getElementById("chartsArea");
                var arrayLength = response.data.length;

                for (var i = 0; i < arrayLength; i++) {
                    $('#chartsArea').append(getChartTemplate('cnv_' + i));
                    addCnvChart(response.data[i].ilotName, response.data[i].chartData, 'cnv_' + i);
                }
            } else {
                console.log(response);
            }
        }
    });
}


function createParetosCharts(nodes, timeRange, timeRgnType) {
    var showCharacterized = $('#' + timeRgnType + "_toggle").prop('checked');

    $.ajax({
        type: "POST",
        url: window.link + "data/getParetoCharts",
        data: {
            localisations: nodes,
            startTime: timeRange.startTime,
            endTime: timeRange.endTime,
            characterized: showCharacterized
        },
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error status: ' + textStatus + " - thrown: " + errorThrown);
        },
        success: function (response) {
            if (response.success) {
                var mainDiv = document.getElementById("chartsArea");
                var arrayLength = response.data.length;

                for (var i = 0; i < arrayLength; i++) {
                    $('#chartsArea').append(getChartTemplate('parCnt_' + i));
                    $('#chartsArea').append(getChartTemplate('parTime_' + i))

                    var cntData = response.data[i].chartData.cntPareto;
                    var timeData = response.data[i].chartData.timePareto;

                    addParChart(response.data[i].ilotName, cntData, 'parCnt_' + i, 'cnt');
                    addParChart(response.data[i].ilotName, timeData, 'parTime_' + i, 'time');
                }
            } else {
                console.log(response);
            }
        }
    });
}


function addTcyChart(location, data, id) {
    var x = new Array;
    var y = new Array;

    $.each(data, function (index, value) {
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
            color: "rgba(160, 236, 54, 0.76)",
            line: {
                color: "rgba(0, 0, 0, 1)",
                width: 1
            }
        },
        opacity: 0.8,
        type: "histogram",
        xbins: {
            end: minX,
            size: 1,
            start: maxX
        }
    };

    var data = [tcy];
    var layout = {
        title: location,
        titlefont: {
            color: "rgb(255, 255, 255)"
        },
        margin: {
            t: 30,
            r: 30,
            b: 30,
            l: 30
        },
        xaxis: {
            showgrid: false,
            showticklabels: true,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            tickfont: {
                color: "rgb(255, 255, 255)"
            }
        },
        yaxis: {
            showgrid: true,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            zeroline: false,
            tickfont: {
                color: "rgb(255, 255, 255)"
            },
            gridcolor: "rgba(255, 255, 255, 0.5)"
        },
        bargap: 0.0,
        bargroupgap: 0.0,
        barmode: "group",
        plot_bgcolor: "rgb(0, 0, 0, 0)",
        paper_bgcolor: "rgb(0, 0, 0, 0)"
    };

    Plotly.newPlot(id, data, layout);
}


function addOpChart(location, data, median, id) {
    var x1 = new Array;
    var x2 = new Array;
    var x3 = new Array;
    var y1 = new Array;
    var y2 = new Array;
    var y3 = new Array;

    $.each(data, function (index, value) {
        x1.push(value[0]);
        x2.push(value[0]);
        x3.push(value[0]);

        y1.push(value[1]);
        y2.push(value[2]);
        y3.push(median);
    });

    var data1 = {
        name: 'Hodnota',
        x: x1,
        y: y1,
        type: 'scatter',
        line: {
            color: "rgb(255, 255, 255)"
        }
    };

    var data2 = {
        name: 'Ciel',
        x: x2,
        y: y2,
        type: 'scatter',
        line: {
            color: "rgb(255, 0, 0)"
        }
    };

    var data3 = {
        name: 'Median',
        x: x3,
        y: y3,
        type: 'scatter',
        line: {
            color: "rgb(0, 0, 255)"
        }
    };

    var layout = {
        showlegend: false,
        autosize: true,
        title: location,
        titlefont: {
            color: "rgb(255, 255, 255)"
        },
        margin: {
            t: 30,
            r: 30,
            b: 30,
            l: 30
        },
        xaxis: {
            showgrid: false,
            showticklabels: false,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            tickfont: {
                color: "rgb(255, 255, 255)"
            }
        },
        yaxis: {
            showgrid: false,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            zeroline: false,
            tickfont: {
                color: "rgb(255, 255, 255)"
            },
            gridcolor: "rgba(255, 255, 255, 0.5)"
        },
        plot_bgcolor: "rgb(0, 0, 0, 0)",
        paper_bgcolor: "rgb(0, 0, 0, 0)"
    };

    Plotly.newPlot(id, [data1, data2, data3], layout);
}


function addCnvChart(location, data, id) {
    var x = new Array;
    var y = new Array;

    $.each(data, function (index, value) {
        x.push(value[0]);
        y.push(value[1]);
    });

    var data = {
        x: x,
        y: y,
        type: 'scatter',
        line: {
            color: "rgb(255, 255, 255)"
        }
    };

    var layout = {
        autosize: true,
        title: location,
        titlefont: {
            color: "rgb(255, 255, 255)"
        },
        margin: {
            t: 30,
            r: 30,
            b: 30,
            l: 30
        },
        xaxis: {
            showgrid: false,
            showticklabels: false,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            tickfont: {
                color: "rgb(255, 255, 255)"
            }
        },
        yaxis: {
            showgrid: false,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            zeroline: false,
            tickfont: {
                color: "rgb(255, 255, 255)"
            },
            gridcolor: "rgba(255, 255, 255, 0.5)"
        },
        plot_bgcolor: "rgb(0, 0, 0, 0)",
        paper_bgcolor: "rgb(0, 0, 0, 0)"
    };

    Plotly.newPlot(id, [data], layout);
}


function addParChart(location, data, id, type) {
    var x = new Array;
    var y = new Array;

    var len = data.length;
    var i = 0;
    $.each(data, function (index, value) {
        x.push(value[1] + ' [' + (len - i++) + ']');
        y.push(parseInt(value[0]));
    });

    var tcy = {
        x: x,
        y: y,
        name: 'control',
        marker: {
            line: {
                color: "rgba(0, 0, 0, 1)",
                width: 1
            }
        },
        type: "bar",
        orientation: 'v'
    };

    if (type == 'cnt') {
        tcy.marker.color = "rgba(31, 119, 180, 0.6)";
    } else {
        tcy.marker.color = "rgba(255, 100, 102, 0.6)";
    }

    var data = [tcy];
    var layout = {
        autosize: true,
        title: location + (type == 'cnt' ? ' [Pocetnost]' : ' [Trvanie]'),
        titlefont: {
            color: "rgb(255, 255, 255)"
        },
        margin: {
            t: 30,
            r: 30,
            b: 30,
            l: 30
        },
        barmode: "group",
        xaxis: {
            showgrid: false,
            showticklabels: false,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            tickfont: {
                color: "rgb(255, 255, 255)"
            }
        },
        yaxis: {
            showgrid: true,
            showline: true,
            linecolor: "rgb(255, 255, 255)",
            zeroline: false,
            tickfont: {
                color: "rgb(255, 255, 255)"
            },
            gridcolor: "rgba(255, 255, 255, 0.5)"
        },
        plot_bgcolor: "rgb(0, 0, 0, 0)",
        paper_bgcolor: "rgb(0, 0, 0, 0)"
    };

    Plotly.newPlot(id, data, layout);
}


function getChartTemplate(id) {
    var element = '<div class="graf-kontainer"><div class="graf"><div id="' + id + '" class="telografu"></div></div><div class="pareto"></div></div>';
    return element;
}
