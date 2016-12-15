<!doctype html>
<html lang="sk">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PSA Trnava - FERRAGE</title>
    <link href="css/bootstrap.min.css" type="text/css" rel="stylesheet">
    <link href="css/bootstrap-theme.min.css" type="text/css" rel="stylesheet">
    <link href="css/bootstrap-select.min.css" type="text/css" rel="stylesheet">
    <link href="css/jqx.base.css" type="text/css" rel="stylesheet">
    <link href="css/daterangepicker.css" type="text/css" rel="stylesheet">
    <link href="css/ion.rangeSlider.css" type="text/css" rel="stylesheet">
    <link href="css/ion.rangeSlider.skinFlat.css" type="text/css" rel="stylesheet">
    <link href="css/style.css" type="text/css" rel="stylesheet">
    <style type="text/css">
        .double-input .form-control {
            width: 50%;
            border-right-width: 1px;
        }

        .double-input .form-control:focus {
            border-right-width: 1px;
        }

        #toggleSidebar {
            cursor:pointer;
        }

        .input-group .form-control {
            position: static;
        }

        .irs-slider {
            display: none;
        }

        .telo {
            /*-webkit-filter: blur(5px);
            -moz-filter: blur(5px);
            -o-filter: blur(5px);
            -ms-filter: blur(5px);
            filter: blur(5px);*/
        }
    </style>
</head>

<body>
    <div class="telo">
        <div class="sidebar">
            <div class="cas">
                <div class="sidebarNadpis">Výber časového ohraničenia</div>
                <ul id="searchTab" class="nav nav-tabs" role="tablist">
                    <li class="nav-item" data-tab-num="1">
                        <a class="nav-link active" data-toggle="tab" href="#rawTab" role="tab">RAW</a>
                    </li>
                    <li class="nav-item" data-tab-num="2">
                        <a class="nav-link" data-toggle="tab" href="#shiftTab" role="tab">Zmena</a>
                    </li>
                    <li class="nav-item" data-tab-num="3">
                        <a class="nav-link" data-toggle="tab" href="#dayTab" role="tab">Deň</a>
                    </li>
                    <li class="nav-item" data-tab-num="4">
                        <a class="nav-link" data-toggle="tab" href="#weekTab" role="tab">Týždeň</a>
                    </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="rawTab" role="tabpanel">
                        <div class="input-group double-input">
                            <span class="input-group-btn">
                                <button id="timeRngBtn" class="btn btn-success" type="button">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                </button>
                            </span>
                            <input id="startTimeIn" class="form-control myDatePicker" type="text" placeholder="Dátum od" disabled/>
                            <input id="endTimeIn" class="form-control myDatePicker" type="text" placeholder="Dátum do" disabled/>
                        </div>
                        <input class="tcyPicker" type="text" value="" />
                    </div>
                    <div class="tab-pane" id="shiftTab" role="tabpanel">
                        <div class="input-group">
                            <span class="input-group-btn">
                                <button class="btn btn-success singleTimeBtn" type="button">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                </button>
                            </span>
                            <input id="startTimeIn" class="form-control myDatePicker" type="text" placeholder="Dátum" disabled/>
                        </div>
                        <select class="selectpicker">
                            <option>Ranná</option>
                            <option>Poobedná</option>
                            <option>Nočná</option>
                        </select>
                        <input class="tcyPicker" type="text" value="" />
                    </div>
                    <div class="tab-pane" id="dayTab" role="tabpanel">
                        <div class="input-group">
                            <span class="input-group-btn">
                                <button class="btn btn-success singleTimeBtn" type="button">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                </button>
                            </span>
                            <input id="startTimeIn" class="form-control myDatePicker" type="text" placeholder="Dátum" disabled/>
                        </div>
                        <input class="tcyPicker" type="text" value="" />
                    </div>
                    <div class="tab-pane" id="weekTab" role="tabpanel">
                        <div class="input-group">
                            <span class="input-group-btn">
                                <button class="btn btn-success singleTimeBtn" type="button">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                </button>
                            </span>
                            <input id="startTimeIn" class="form-control myDatePicker" type="text" placeholder="Dátum" disabled/>
                        </div>
                        <p>Týždeň: <span id="tyzdenNum">50</span><p>
                        <input class="tcyPicker" type="text" value="" />
                    </div>
                </div>
            </div>
            <div class="topologia">
                <div class="sidebarNadpis">Výber grafov podľa topologie</div>
                <div class="topologia_pills">
                    <ul id="topoTab" class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" href="#tcyTopo" role="tab" data-toggle="tab" data-type="tcy">Čas cyklu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#cnvTopo" role="tab" data-toggle="tab"  data-type="cnv">Dopravníky</a>
                        </li>   
                        <!--<li class="nav-item">
                            <a class="nav-link" href="#parTab" role="tab" data-toggle="tab"  data-type="par">Pareto</a>
                        </li>-->
                    </ul>
                </div>
                <div class="topologia_obsah tab-content">
                    <div class="tab-pane active" id="tcyTopo" role="tabpanel"></div>
                    <div class="tab-pane" id="cnvTopo" role="tabpanel"></div>
                    <!--<div class="tab-pane" id="parTab" role="tabpanel"></div>-->
                </div>
            </div>
        </div>
        <div class="content">
            <div class="nadpis">
                <p id="toggleSidebar" class="glyphicon glyphicon-search"></p>
                <p>Štatistiky Sapia</p>
            </div>

            <div id='mainGrafPanel' class="graf-panel"></div>
        </div>
    </div>
    <script src="js/jquery-3.1.1.min.js" type="text/javascript"></script>
    <script src="js/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/bootstrap-select.min.js" type="text/javascript"></script>
    <script src="js/jqxcore.js" type="text/javascript"></script>
    <script src="js/jqxdata.js" type="text/javascript"></script>
    <script src="js/jqxbuttons.js" type="text/javascript"></script>
    <script src="js/jqxscrollbar.js" type="text/javascript"></script>
    <script src="js/jqxpanel.js" type="text/javascript"></script>
    <script src="js/jqxtree.js" type="text/javascript"></script>
    <script src="js/jqxcheckbox.js" type="text/javascript"></script>
    <script src="js/plotly.min.js" type="text/javascript"></script>
    <script src="js/moment.min.js" type="text/javascript"></script>
    <script src="js/daterangepicker.js" type="text/javascript"></script>
    <script src="js/ion.rangeSlider.js" type="text/javascript"></script>
    <script>
        // $('#treeTopology').jqxTree({hasThreeStates: true, checkboxes: true});

        $("input.tcyPicker").ionRangeSlider({
            min: 1,
            max: 10
            // prefix: 'TCY'
        });

        $('#searchTab a:first').tab('show');
        $('#topoTab a:first').tab('show');

        loadTree('tcy');
        loadTree('cnv');


        function loadTree(type)
        {
            if (type != 'tcy' && type != 'cnv' && type != 'par') {
                return;
            }


            var link = "http://" + window.location.hostname + "/FER/";
            var fncLink = link + 'models/getTree';

            $.get(fncLink, {type: type}, function(data) {
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

                var destID = '#'+ type +'Topo';
                $(destID).jqxTree({
                    source: records,
                    checkboxes: true,
                    hasThreeStates: true
                });
            }).fail(
                function() {
                    alert( "error" );
            });
        }
    </script>
    <script src="js/grafy.js?<?php echo time(); ?>" type="text/javascript"></script>
    <script src="js/main.js?<?php echo time(); ?>" type="text/javascript"></script>
</body>

</html>