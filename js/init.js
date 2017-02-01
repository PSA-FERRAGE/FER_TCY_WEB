$(document).ready(function () {
    window.numOfAjaxQrys = 0;
    window.link = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/FER/";

    $(document).ajaxSend(function(e, jqXHR){
        if (window.numOfAjaxQrys === 0) {
            $('#preloader').show();
        }

        window.numOfAjaxQrys += 1;
    });


    $(document).ajaxComplete(function(e, jqXHR){
        console.log('ajaxEnd');
        window.numOfAjaxQrys -= 1;
        if (window.numOfAjaxQrys === 0) {
            $('#preloader').hide();
        }
    });

    //when ajax starts, show loading div
    $('#preloader').hide().on('ajaxStart', function(){

    });
    //when ajax ends, hide div
    $('#preloader').on('ajaxEnd', function(){

    });

    $('#rawBtn').click();


    $("input.tcyPicker").ionRangeSlider({
        min: 1,
        max: 10
    });


    $('#topo').jstree({
        'core': {
            "themes": {
                "name": "default-dark",
                "dots": false,
                "icons": false
            }
        },
        "checkbox": {
            "keep_selected_style": false
        },
        "plugins": ["wholerow", "checkbox"]
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


    $('#dataTbl').bootstrapTable({
        showRefresh: false,
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
        columns: [{ field: "0", title: 'Lokalizácia', align: 'center', sortable: true, valign: "middle", filterControl: 'select' },
                  { field: "1", title: 'Začiatok', align: 'center', sortable: true, valign: "middle", filterControl: 'input',
                    sorter: function(a, b) {
                        if (a === null || b === null)
                            return;

                        if (a > b) return 1;
                        if (a < b) return -1;
                        return 0;
                    },
                    formatter: function(value, row, index) {
                        if (value === null)
                            return;

                        var date = moment.unix(value);
                        return date.format("DD/MM/YYYY HH:mm");
                    }
                  },
                  { field: "2", title: 'Trvanie [s]', align: 'center', sortable: true, valign: "middle", filterControl: 'input' },
                  { field: "3", title: 'Mnemonika', align: 'center', sortable: true, valign: "middle", filterControl: 'select' },
                  { field: "4", title: 'Trieda', align: 'center', sortable: true, valign: "middle", filterControl: 'select' },
                  { field: "5", title: 'Popis', align: 'center', sortable: true, valign: "middle", filterControl: 'input' },
                  { field: "6", title: 'Komentár', align: 'center', sortable: true, valign: "middle", filterControl: 'input' }],
        onRefresh: function (params) { $('#preloader').show(); },
        onLoadSuccess: function (data) { $('#preloader').hide(); }
    });



    function getTableParams() {
        var type = $('.navbarBtn.active').data('type');
        var viewType = $('#searchTab li.active').data('type');

        return getData(type, viewType);
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


    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds()),
            D = checkTime(today.getDate()),
            M = checkTime(today.getMonth() + 1),
            Y = today.getFullYear();
        document.getElementById('time').innerHTML = D + ". " + M + ". " + Y + " " + h + ":" + m + ":" + s + "\t";
        t = setTimeout(function () {
            startTime();
        }, 500);
    }

    startTime();
});



    function getData(type, viewType) {
        var checked_ids = [];
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
                return;
        }

        $.each($("#topo").jstree("get_checked", true), function (index, value) {
            checked_ids.push(value.id);
        });

        var data = {
            localisations: checked_ids,
            startTime: startTime,
            endTime: endTime
            //characterization:  $('#charaktTgl').prop('checked')
        };

        return data;
    }