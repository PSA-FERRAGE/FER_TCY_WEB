$(document).ready(function () {
    var link = "http://" + window.location.hostname + "/FER/";

    $('#searchBtn').click(function() {
        // $('.sidebar').toggle();
    });

    // $('.sidebar').toggle(function () {
    //     $(".sidebar").css({display: "none"});
    // }, function () {
    //     $(".sidebar").css({display: "flex"});
    // });


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


    $('button.treeBtn').click(
        function() {
            var fncLink = link + 'models/getTree';
            var typeStr = $(this).data('type');

            if (typeStr != 'tcy' && typeStr != 'cnv' && typeStr != 'par') {
                return;
            }

            $.get(fncLink, {type: typeStr}, function(data) {
                var source = {
                    datatype: "json",
                    datafields: [{ name: 'id' }, { name: 'parent_id' },
                                 { name: 'nazov' }, { name: 'bo_id' }
                                ],
                    id: 'lokalizacia_id',
                    localdata: data
                };

                // create data adapter.
                var dataAdapter = new $.jqx.dataAdapter(source);
                // perform Data Binding.
                dataAdapter.dataBind();
                // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents
                // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter
                // specifies the mapping between the 'text' and 'label' fields.
                var records = dataAdapter.getRecordsHierarchy('id', 'parent_id', 'items', [{
                    name: 'nazov',
                    map: 'label'
                }, {
                    name: 'bo_id',
                    map: 'value'
                }]);

                $('#treeTopology').jqxTree({ source: records });
            }).fail(
                function() {
                    alert( "error" );
            });
        }
    );


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