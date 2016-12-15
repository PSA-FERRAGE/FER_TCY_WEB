$(document).ready(function () {
    var link = "http://" + window.location.hostname + "/FER/";

    $('#toggleSidebar').click(function() {
        $(".content").toggleClass("isClosed");
        $("#toggleSidebar").toggleClass("active");

        if ($( "#toggleSidebar").hasClass("active"))
        {
            $('.graf-kontainer').remove();
            
            var activeTab = $('#topoTab li.active a');
            var type = activeTab.data('type');

            getCharts(type);
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
                            "Júl", "August", "September", "Október", "November", "December"],
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
            timePicker: true,
            timePicker24Hour: true,
            autoUpdateInput: true,
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                weekLabel: "T",
                applyLabel: 'Použiť',
                cancelLabel: 'Vymazať',
                daysOfWeek: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So"],
                monthNames: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún",
                            "Júl", "August", "September", "Október", "November", "December"],
            }
        }, function(start, end, label) {
            console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD'));
    });


    $('#timeRngBtn').on('apply.daterangepicker', function(ev, picker) {
        $('#startTimeIn').val(picker.startDate.format('DD/MM/YYYY HH:mm:ss'));
        $('#endTimeIn').val(picker.endDate.format('DD/MM/YYYY HH:mm:ss'));
    });

    function getTimeInterval(type, isStart)
    {
        var result = {startTime: 0, endTime: 0};
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
});