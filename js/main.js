$(document).ready(function () {
    $('.collapseBtn').click(function () {
        if ($('.sidebar').css('margin-left') === "0px") {
            $('.sidebar').css('margin-left', -1 * ($('.sidebar').width() + 2));
            $('.content').css('margin-left', 48);
        } else {
            $('.sidebar').css('margin-left', 0);
            $('.content').css('margin-left', $('.sidebar').width() + 50);
        }

        setTimeout(function () {
            var chartDivs = $('.graf-kontainer');
            if (chartDivs.length > 0) {
                var dimmensions = {
                    width: chartDivs[0].clientWidth - 171
                }

                var charts = $('.graf > div');
                $.each(charts, function (index, chart) {
                    Plotly.relayout(chart.id, dimmensions);
                });
            }
        }, 200);
    });


    function changeChartsWidth(dimmensions) {
        var charts = $('.graf > div');
        $.each(charts, function (index, chart) {
            console.log(chart.id);
            console.log(dimmensions);

            Plotly.relayout(chart.id, dimmensions);
        });
    }

    $('.navbarBtn').click(function (e) {
        e.preventDefault();

        // if ($(this).hasClass('active')) {
        //     $(this).removeClass('active');
        //     if ($(this).data('type') === 'tab') {
        //         $('#table').hide();
        //     } else {
        //         $('#chartsArea').hide();
        //     }
        // } else {
        if ($(this).hasClass('active') === false) {
            $(this).removeClass('active');
            $(this).addClass('active');

            var type = $(this).data('type');

            if (type === 'tab') {
                $('#chartsArea').hide();
                $('#table').show();
            } else {
                $('#table').hide(); 
                $('#chartsArea').show();
            }

            if (type == "op") {
                $('.charakterizovane').show();
                $('.charakterizovane > label > span').text('Operator:');
            } else if (type == "par" || type == "tab") {
                $('.charakterizovane').show();
                $('.charakterizovane > label > span').text('Charakterizované:');
            } else {
                $('.charakterizovane').hide();
            }

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
        if (treeType != 'op' && treeType != 'tcy' && treeType != 'cnv' && treeType != 'par' && treeType != 'tab') {
            return;
        }

        $.post(window.link + 'data/getTopology', {
                'viewType': treeType
            },
            function (data, textStatus, jqXHR) {
                $('#topo').jstree(true).settings.core.data = data;
                $('#topo').jstree(true).refresh();
            },
            "json"
        );
    }


    if ($('.topologia').width() > 430)
        $('.sidebar').css('width', $('.topologia').width());
    else
        $('.sidebar').css('width', "430px");

    $('.topologia_obsah').click(function () {
        if ($('.topologia').width() > 430) {
            $('.sidebar').css('width', $('.topologia').width() + 10);
            $('.content').css('margin-left', $('.topologia').width() + 10);

        } else {
            $('.sidebar').css('width', "430px");
            $('.content').css('margin-left', "479px");
        }
    });

    $('.navbar-nav li').click(function (e) {
        $('.navbar li.active').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
        e.preventDefault();
    });
});