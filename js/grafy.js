function getCharts(type, viewType) {
    var link = "http://" + window.location.hostname + ":8080/FER/";

    var items = $('#' + type + 'Topo').jqxTree('getCheckedItems');
    var localisations = [];

    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        localisations[i] = item.value;
    }

    var startTime;
    var endTime;


    switch (viewType) {
        case 'raw':
            startTime = $('#rawStartTime').val();
            endTime = $('#rawEndTime').val();
            break;
        case 'shift':
            var time = $('#shiftStartTime').val();

            switch ($('#shiftSelect').val()) {
                case 'ranna':
                    startTime = moment(time, 'DD/MM/YYYY').add(6, 'hour').format('DD/MM/YYYY HH:mm:ss');
                    endTime = moment(time, 'DD/MM/YYYY').add(14, 'hour').format('DD/MM/YYYY HH:mm:ss');
                    break;
                case 'poobedna':
                    startTime = moment(time, 'DD/MM/YYYY').add(14, 'hour').format('DD/MM/YYYY HH:mm:ss');
                    endTime = moment(time, 'DD/MM/YYYY').add(22, 'hour').format('DD/MM/YYYY HH:mm:ss');
                    break;
                case 'nocna':
                    startTime = moment(time, 'DD/MM/YYYY').add(22, 'hour').format('DD/MM/YYYY HH:mm:ss');
                    endTime = moment(time, 'DD/MM/YYYY').add(30, 'hour').format('DD/MM/YYYY HH:mm:ss');
                    break;
                default:
                    break;
            }
            break;
        case 'day':
            var time = $('#dayStartTime').val();

            startTime = moment(time, 'DD/MM/YYYY').add(6, 'hour').format('DD/MM/YYYY HH:mm:ss');
            endTime = moment(time, 'DD/MM/YYYY').add(30, 'hour').format('DD/MM/YYYY HH:mm:ss');
            break;
        case 'week':
            alert('Nie je implementovane!');
            return;
            break;
        default:
            break;
    }

    var data = {
        localisations: localisations,
        startTime: startTime,
        endTime: endTime
    };

    downloadChartsData(type, data);
}


function downloadChartsData(type, data)
{
    var link = "http://" + window.location.hostname + ":8080/FER/";
    var serverPath = '';
    var chartIdPrefix = '';


    if (type == 'tcy') {
        serverPath = link + 'models/getHistograms';
        chartIdPrefix = 'tcy_';
    } else if (type == 'cnv') {
        serverPath = link + 'models/getConveyors';
        chartIdPrefix = 'cnv_';
    } else {
        serverPath = link + 'models/getParetos';
        chartIdPrefix = 'par_';
    }
    

    $.ajax({
        type: "POST",
        url: serverPath,
        data: data,
        dataType: 'json',
        
        error: function (jqXHR, textStatus, errorThrown) {
            alert('error status: ' + textStatus + " - thrown: " + errorThrown);
        },
        success: function (result) {
            if (result.success == true) {
                var mainDiv = document.getElementById("mainGrafPanel");

                var arrayLength = result.data.length;

                for (var i = 0; i < arrayLength; i++) {
                    switch (type) {
                        case 'tcy':
                            $('#mainGrafPanel').append(getChartTemplate(chartIdPrefix + i));
                            addTcyChart(result.data[i].ilotName, result.data[i].chartData, chartIdPrefix + i);
                            break;
                        case 'cnv':
                            $('#mainGrafPanel').append(getChartTemplate(chartIdPrefix + i));
                            addCnvChart(result.data[i].ilotName, result.data[i].chartData, chartIdPrefix + i);
                            break;
                        case 'par':
                            var cntID = chartIdPrefix + 'cnt_' + i;
                            var timeID = chartIdPrefix + 'time_' + i;

                            var cntData = result.data[i].chartData.cntPareto;
                            var timeData = result.data[i].chartData.timePareto;

                            $('#mainGrafPanel').append(getChartTemplate(cntID));
                            $('#mainGrafPanel').append(getChartTemplate(timeID));

                            addParChart(result.data[i].ilotName, cntData, cntID, 'cnt');
                            addParChart(result.data[i].ilotName, timeData, timeID, 'time');
                            break
                        default:
                            return;
                    }
                }
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
            color: "rgba(255, 100, 102, 0.7)",
            line: {
                color: "rgba(255, 100, 102, 1)",
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
        title: location,
        bargap: 0.0,
        bargroupgap: 0.0,
        barmode: "group"
    };

    Plotly.newPlot(id, data, layout);
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
        type: 'scatter'
    };

    var layout = {
        title: location,
        xaxis: {
            showgrid: false,
            showticklabels: false
        }
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
        opacity: 0.5,
        type: "bar",
        orientation: 'v'
    };

    if (type == 'cnt') {
        tcy.marker.color = "rgba(31, 119, 180, 0.7)";
    } else {
        tcy.marker.color = "rgba(255, 100, 102, 0.7)";
    }

    var data = [tcy];
    var layout = {
        title: location + (type == 'cnt' ? ' [Pocetnost]' : ' [Trvanie]'),
        barmode: "group",
        xaxis: {
            showline: true
        }
    };

    Plotly.newPlot(id, data, layout);
}


function getChartTemplate(id) {
    var element = '<div class="graf-kontainer"><div class="graf"><div id="' + id + '" class="telografu"></div></div><div class="pareto"></div></div>';
    return element;
}