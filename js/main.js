$(document).ready(function () {
    window.link = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/FER/";

    $("input.tcyPicker").ionRangeSlider({
        min: 1,
        max: 10
            // prefix: 'TCY'
    });


    $('#searchTab a').click(function (e) {
        e.preventDefault();

        // var type = $(this).parent().data('type');
        // // if (window[type + 'Loaded'] == false) {
        // //     if (type === "par") {
        // //         $('#charaktTgl').show();
        // //     } else {
        // //         $('#charaktTgl').hide();
        // //     }

        // loadTree(type);
        // //     $('#'+type+'Topo').addClass('jqx-hideborder');
        // //     window[type + 'Loaded'] = true;
        // // }

        // $(this).tab('show');
    });

    $('.searchBtn').click(function () {
        // var checked_ids = [];
        // $.each($("#topo").jstree("get_checked",true), function(index, value) {
        //     checked_ids.push(value.text);
        // });

        // console.log(checked_ids);
        //$('#topo').jstree('open_all');
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
                createTable();
            } else {
                $('#table').hide();
                $('#chartsArea').show();
            }
            console.log($(this).data('type'));
            loadTree($(this).data('type'));
        }
    });


    $('#timeRngBtn').daterangepicker({
        opens: 'right',
        showWeekNumbers: true,
        showISOWeekNumbers: true,
        timePicker: true,
        timePicker24Hour: true,
        alwaysShowCalendars: true,
        showCustomRangeLabel: false,
        autoUpdateInput: false,
        locale: {
            format: 'DD/MM/YYYY',
            weekLabel: "T",
            applyLabel: 'Použiť',
            cancelLabel: 'Vymazať',
            daysOfWeek: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
            monthNames: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún",
                "Júl", "August", "September", "Október", "November", "December"
            ],
        },
        ranges: {
            'Dnes': [getTimeInterval('dnes', true), getTimeInterval('dnes', false)],
            'Včera': [getTimeInterval('vcera', true), getTimeInterval('vcera', false)],
            'Tento týždeň': [getTimeInterval('tyzden', true), getTimeInterval('tyzden', false)],
            'Posledných 30 dní': [getTimeInterval('minusTridsat', true), getTimeInterval('minusTridsat', false)],
            'Tento mesiac': [getTimeInterval('tentoMesiac', true), getTimeInterval('tentoMesiac', false)],
            'Posledný mesiac': [getTimeInterval('poslednyMesiac', true), getTimeInterval('poslednyMesiac', false)]
        }
    });


    $('.singleTimeBtn').daterangepicker({
        opens: 'right',
        singleDatePicker: true,
        showWeekNumbers: true,
        showISOWeekNumbers: true,
        autoUpdateInput: true,
        autoApply: true,
        locale: {
            format: 'DD/MM/YYYY',
            weekLabel: "T",
            applyLabel: 'Použiť',
            cancelLabel: 'Vymazať',
            daysOfWeek: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
            monthNames: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún",
                "Júl", "August", "September", "Október", "November", "December"
            ],
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
        if (treeType != 'tcy' && treeType != 'cnv' && treeType != 'par') {
            return;
        }

        $('#topo').jstree({
            'core': {
                "themes": {
                    "name": "default-dark",
                    "dots": false,
                    "icons": false
                },
                'data': {
                    'url': window.link + 'data/getTopology',
                    'method': 'POST',
                    'data': {
                        'viewType': treeType
                    },
                    dataType: 'json'
                }
            },
            "checkbox": {
                "keep_selected_style": false
            },
            "plugins": ["wholerow", "checkbox"]
        });
    }


    function createTable() {
        $('#dataTbl').bootstrapTable({
            url: window.link + 'data/getTableData',
            method: 'GET',
            queryParams: function (p) {
                p.localisation = 'SB';
                p.startTime = '19/01/2017 06:00:00';
                p.endTime = '20/01/2017 06:00:00';

                return p;
            },
            showRefresh: true,
            showExport: true,
            exportTypes: ['excel', 'csv'],
            exportDataType: 'all',
            search: true,
            pagination: true,
            striped: true,
            pageSize: 10,
            pageList: [10, 25, 50, 100, 150],
            filterControl: true,
            filterShowClear: true,
            icons: {
                refresh: 'fa fa-refresh',
                toggle: 'fa fa-th-list',
                columns: 'fa fa-columns',
                detailOpen: 'fa fa-plus-circle',
                detailClose: 'fa fa-minus-circle',
                export: 'glyphicon-export icon-share',
                clear: 'glyphicon-trash icon-clear'
            },
            columns: [{
                field: "0",
                title: 'Lokalizácia',
                align: 'center',
                sortable: true,
                valign: "middle",
                filterControl: 'select'
            }, {
                field: "1",
                title: 'Začiatok',
                align: 'center',
                sortable: true,
                valign: "middle",
                filterControl: 'input'
            }, {
                field: "2",
                title: 'Trvanie [s]',
                align: 'center',
                sortable: true,
                valign: "middle",
                filterControl: 'input'
            }, {
                field: "3",
                title: 'Mnemonika',
                align: 'center',
                sortable: true,
                valign: "middle",
                filterControl: 'select'
            }, {
                field: "4",
                title: 'Trieda',
                align: 'center',
                sortable: true,
                valign: "middle",
                filterControl: 'select'
            }, {
                field: "5",
                title: 'Popis',
                align: 'center',
                sortable: true,
                valign: "middle",
                filterControl: 'input'
            }, {
                field: "6",
                title: 'Komentár',
                align: 'center',
                sortable: true,
                valign: "middle",
                filterControl: 'input'
            }],
            onRefresh: function (params) {
                $('#preloader').show();
                console.log('onRefresh');
            },
            onLoadSuccess: function (data) {
                console.log('onLoadSuccess');
                $('#preloader').hide();
            }
        });
    }

    console.log('Page loaded.');
});


function getTableParams(params) {
    return params;
}

function getTimeInterval(type, isStart) {
    var result = {
        startTime: 0,
        endTime: 0
    };
    var year = moment().get('year');
    var month = moment().get('month'); // (0-11) + 1
    var day = moment().get('date');

    switch (type) {
        case 'dnes':
            result.startTime = moment(new Date(year, month, day, 6));
            result.endTime = moment(new Date(year, month, day, 6)).add(1, 'days');
            break;
        case 'vcera':
            result.startTime = moment(new Date(year, month, day, 6)).subtract(1, 'days');
            result.endTime = moment(new Date(year, month, day, 6));
            break;
        case 'tyzden':
            result.startTime = moment(new Date(year, month, day)).startOf('isoweek').add(6, 'hour');
            result.endTime = moment(new Date(year, month, day)).startOf('isoweek').add(5, 'days').add(6, 'hour');
            break;
        case 'minusTridsat':
            result.startTime = moment(new Date(year, month, day, 6)).subtract(29, 'days');
            result.endTime = moment(new Date(year, month, day, 6)).add(1, 'days');
            break;
        case 'tentoMesiac':
            result.startTime = moment(new Date(year, month, 1, 6));
            result.endTime = moment(new Date(year, month, day, 6)).add(1, 'days');
            break;
        case 'poslednyMesiac':
            result.startTime = moment(new Date(year, month - 1, 1, 6));
            result.endTime = moment(new Date(year, month, 1, 6));
            break;
        default:
            return;
    }

    if (isStart)
        return result.startTime;

    return result.endTime;
}