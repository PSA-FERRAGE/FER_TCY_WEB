$(document).ready(function(){
    $('.searchBtn').click(function () {
        var viewType = getActualViewType();
        var timeRgnType = getActualTimeRngType();

        if (viewType === null) {
            alert('Zvoľte typ zobrazenia.');
            return;
        }

        if (timeRgnType === null) {
            alert('Zvoľte časový rozsah.');
            return;
        }

        var timeRng = getTimeRanges(timeRgnType);
        if (timeRng.success === false) {
            alert(timeRng.msg);
            return;
        }

        var nodes = getTopologyNodes(viewType);
        if (nodes.length == 0) {
            alert("Prosim vyberte lokalizaciu.");
            return;
        }


        if (viewType != "tab") {
            createCharts(viewType, nodes, timeRng, timeRgnType);
        } else {
            var showCharacterized = $('#' + timeRgnType + "_toggle").prop('checked');

            $('#dataTbl').bootstrapTable('removeAll');
            
            $.ajax({
                type: "POST",
                url: window.link + "data/getTableData",
                data: {
                    localisations: nodes,
                    startTime: timeRng.startTime,
                    endTime: timeRng.endTime,
                    characterized: showCharacterized
                },
                dataType: "json",
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error status: ' + textStatus + " - thrown: " + errorThrown);
                },
                success: function (response) {
                    if (response.success == true) {
                        $('#dataTbl').bootstrapTable('load', response.data);
                    }
                }
            });
        }
    });
});


function getActualViewType() {
    return getType(".navbarBtn.active");
}


function getActualTimeRngType() {
    return getType("#searchTab li.active");
}


function getType(elementId) {
    var type = $(elementId).data("type");
    
    if (typeof type === "undefined")
        return null;
    else
        return type;
}


function getTimeRanges(actualTimeRngType) {
    var result = {
        success: false,
        msg: "",
        startTime: null,
        endTime: null
    };

    switch (actualTimeRngType) {
    case 'raw':
        result.startTime = $('#rawStartTime').val();
        result.endTime = $('#rawEndTime').val();

        if (result.startTime === "" || result.endTime === "") {
            result.msg = "Prosim zadajte datum";
        }
        break;
    case 'shift':
        var time = $('#shiftStartTime').val();

        if (time === "") {
            result.msg = "Prosim zadajte datum.";
            break;
        }

        switch ($('#shiftSelect').val()) {
            case 'ranna':
                result.startTime = moment(time, 'DD/MM/YYYY').add(6, 'hour').format('DD/MM/YYYY HH:mm:ss');
                result.endTime = moment(time, 'DD/MM/YYYY').add(14, 'hour').format('DD/MM/YYYY HH:mm:ss');
                break;
            case 'poobedna':
                result.startTime = moment(time, 'DD/MM/YYYY').add(14, 'hour').format('DD/MM/YYYY HH:mm:ss');
                result.endTime = moment(time, 'DD/MM/YYYY').add(22, 'hour').format('DD/MM/YYYY HH:mm:ss');
                break;
            case 'nocna':
                result.startTime = moment(time, 'DD/MM/YYYY').add(22, 'hour').format('DD/MM/YYYY HH:mm:ss');
                result.endTime = moment(time, 'DD/MM/YYYY').add(30, 'hour').format('DD/MM/YYYY HH:mm:ss');
                break;
            default:
                break;
        }
        break;
    case 'day':
        var time = $('#dayStartTime').val();

        if (time === "") {
            result.msg = "Prosim zadajte datum.";
            break;
        }

        result.startTime = moment(time, 'DD/MM/YYYY').add(6, 'hour').format('DD/MM/YYYY HH:mm:ss');
        result.endTime = moment(time, 'DD/MM/YYYY').add(30, 'hour').format('DD/MM/YYYY HH:mm:ss');
        break;
    case 'week':
        result.msg ='Nie je implementovane';
        break;
    default:
        break;
    }

    if (result.msg === "") {
        result.success = true;
    }

    return result;
}


function getTopologyNodes(viewType) {
    var nodes = [];

    if (viewType == "par" || viewType == "tab") {
        $.each($("#topo").jstree("get_top_checked", true), function (index, node) {
            nodes.push(node.id);
        });
    } else if (viewType == "cnv" || viewType == "op") {
        $.each($("#topo").jstree("get_bottom_selected", true), function (index, node) {
            nodes.push(node.id);
        });
    }else {
        $.each($("#topo").jstree("get_checked", true), function (index, node) {
            nodes.push(node.id);
        });
    }

    return nodes;
}