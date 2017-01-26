$(document).ready(function () {
    $('.searchBtn').click(function () {
        $('.sidebar').css('margin-left', -1 * ($('.sidebar').width() + 2));
        $('.content').css('margin-left', 0);

        var type = $('.navbarBtn.active').data('type');
        var viewType = $('#searchTab li.active').data('type');

        if (viewType == 'raw') {
            if ($('#rawStartTime').val() == '' || $('#rawEndTime').val() == '') {
                alert('Zadajte datum!');   
                return;
            }
        } else if (viewType == 'shift') {
            if ($('#shiftStartTime').val() == '') {
                alert('Zadajte datum!');   
                return;
            }
        } else if (viewType == 'day') {
            if ($('#dayStartTime').val() == '') {
                alert('Zadajte datum!');   
                return;
            }
        } else {
            alert('Nie je implementovane!');
            return;
        }

        getData(type, viewType);
    });


    // function getData(type, viewType) {
    //     var checked_ids = [];
    //     var startTime;
    //     var endTime;


    //     switch (viewType) {
    //         case 'raw':
    //             startTime = $('#rawStartTime').val();
    //             endTime = $('#rawEndTime').val();
    //             break;
    //         case 'shift':
    //             var time = $('#shiftStartTime').val();

    //             switch ($('#shiftSelect').val()) {
    //                 case 'ranna':
    //                     startTime = moment(time, 'DD/MM/YYYY').add(6, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //                     endTime = moment(time, 'DD/MM/YYYY').add(14, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //                     break;
    //                 case 'poobedna':
    //                     startTime = moment(time, 'DD/MM/YYYY').add(14, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //                     endTime = moment(time, 'DD/MM/YYYY').add(22, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //                     break;
    //                 case 'nocna':
    //                     startTime = moment(time, 'DD/MM/YYYY').add(22, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //                     endTime = moment(time, 'DD/MM/YYYY').add(30, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             break;
    //         case 'day':
    //             var time = $('#dayStartTime').val();

    //             startTime = moment(time, 'DD/MM/YYYY').add(6, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //             endTime = moment(time, 'DD/MM/YYYY').add(30, 'hour').format('DD/MM/YYYY HH:mm:ss');
    //             break;
    //         case 'week':
    //             alert('Nie je implementovane!');
    //             return;
    //             break;
    //         default:
    //             return;
    //     }

    //     $.each($("#topo").jstree("get_checked", true), function (index, value) {
    //         checked_ids.push(value.text);
    //     });

    //     var data = {
    //         localisations: checked_ids,
    //         startTime: startTime,
    //         endTime: endTime
    //         //characterization:  $('#charaktTgl').prop('checked')
    //     };

    //     console.log(data);
    // }


    $('.collapseBtn').click(function () {
        if ($('.sidebar').css('margin-left') === "0px") {
            $('.sidebar').css('margin-left', -1 * ($('.sidebar').width() + 2));
            $('.content').css('margin-left', 0);
        } else {
            $('.sidebar').css('margin-left', 0);
            $('.sidebar').css('transition', 'margin-left .2s');
            $('.content').css('margin-left', $('.sidebar').width());
        }
    });


    $('.navbarBtn').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            if ($(this).data('type') === 'tab') {
                $('#table').hide();
            } else {
                $('#chartsArea').hide();
            }
        } else {
            $('.navbarBtn').removeClass('active');
            $(this).addClass('active');
            if ($(this).data('type') === 'tab') {
                $('#chartsArea').hide();
                $('#table').show();
            } else {
                $('#table').hide();
                $('#chartsArea').show();
            }
            console.log($(this).data('type'));
            loadTree($(this).data('type'));
        }
    });


    $('.singleTimeBtn').on('apply.daterangepicker', function (ev, picker) {
        var viewType = $('#searchTab li.active').data('type');

        switch (viewType) {
            case 'shift':
                $('#shiftStartTime').val(picker.startDate.format('DD/MM/YYYY'));
                break;
            case 'day':
                $('#dayStartTime').val(picker.startDate.format('DD/MM/YYYY'));
                break;
            case 'week':
                $('#weekStartTime').val(picker.startDate.format('DD/MM/YYYY'));
                $('#tyzdenNum').text(moment($('#weekStartTime').val(), 'DD/MM/YYYY').isoWeek());
                break;
            default:
                break;
        }
    });


    $('#timeRngBtn').on('apply.daterangepicker', function (ev, picker) {
        $('#rawStartTime').val(picker.startDate.format('DD/MM/YYYY HH:mm:ss'));
        $('#rawEndTime').val(picker.endDate.format('DD/MM/YYYY HH:mm:ss'));
    });


    function loadTree(treeType) {
        if (treeType != 'tcy' && treeType != 'cnv' && treeType != 'par' && treeType != 'tab') {
            return;
        }

        $.post(window.link + 'data/getTopology', {'viewType': treeType},
            function (data, textStatus, jqXHR) {
                $('#topo').jstree(true).settings.core.data = data;
                $('#topo').jstree(true).refresh();
            },
            "json"
        );
    }


    if ($('.topologia').width() > 300)
        $('.sidebar').css('width', $('.topologia').width());
    else
        $('.sidebar').css('width', "300px");

    $('.topologia_obsah').click(function () {
        if ($('.topologia').width() > 300) {
            $('.sidebar').css('width', $('.topologia').width() + 10);
            $('.content').css('margin-left', $('.topologia').width() + 10);

        } else {
            $('.sidebar').css('width', "300px");
            $('.content').css('margin-left', "300px");
        }
    });
});
