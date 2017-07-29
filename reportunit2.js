var total = 0;
var passed = 0;
var failed = 0;
var skipped = 0;
var errors = 0;

$(document).ready(function() {
    /* init */
    drawPercentageChart();

    drawTestsChart();

    buildStatusDropdown();
    buildCollectionsDropdown();
    buildTraitsDropdown();

    statusFilter();
    collectionFilter();
    traitFilter();

    $('select').material_select();
    $('.collapsible').collapsible();
});

function buildStatusDropdown() {
    var statusObject = $("#test-list .test .test-name");
    
    var statusList = [];
    for (i = 0; i < statusObject.length; i++) {
        var classAttribute = $(statusObject[i]).attr('class');
        var st = "";
        if (classAttribute.includes("passed")) {
            st = "Passed";
        }
        else if (classAttribute.includes("failed")) {
            st = "Failed";
        }
        else if (classAttribute.includes("skipped")) {
            st = "Skipped";
        }
        statusList.push(st);
    }

    var status = Array.from(new Set(statusList));
    
    for (i = 0; i < status.length; i++){
        var html = "<option value='" + i + "'>" + status[i] + "</option>";
        $("#status-select").append(html);
    }
}

function buildCollectionsDropdown() {
    var collectionObject = $("#test-list .test .collection-name td:nth-child(2)");
    
    var collectionList = [];
    for (i = 0; i < collectionObject.length; i++) {
        collectionList.push(collectionObject[i].innerHTML);
    }

    var collections = Array.from(new Set(collectionList));
    
    for (i = 0; i < collections.length; i++){
        var html = "<option value='" + i + "'>" + collections[i] + "</option>";
        $("#collection-select").append(html);
    }
}

function buildTraitsDropdown() {
    var traitObject = $("#test-list .test .trait-name td:nth-child(2)");
    
    var traitList = [];
    for (i = 0; i < traitObject.length; i++) {
        traitList.push(traitObject[i].innerHTML);
    }

    var traits = Array.from(new Set(traitList));
    
    for (i = 0; i < traits.length; i++){
        var html = "<option value='" + i + "'>" + traits[i] + "</option>";
        $("#trait-select").append(html);
    }
}

function statusFilter() {
    $("#status-select").on("change", function(e) {
        var statusSelected = $('#status-select').parent(["0"]).children()[1].value;
        var testList = $("#test-list li.test");

        if (statusSelected === "All Status") {
            $(testList).removeClass('hide');
        }
        else {
            for (i = 0; i < testList.length; i++) {
                var statusName = $(testList[i]).find('.test-name').attr('class');
                
                if (statusName.includes(statusSelected.toLowerCase())) {
                    $(testList[i]).removeClass('hide');
                }
                else {
                    $(testList[i]).addClass('hide');
                }
            }
        }
    });
}

function collectionFilter() {
    $("#collection-select").on("change", function(e) {
        var collectionSelected = $('#collection-select').parent(["0"]).children()[1].value;
        var testList = $("#test-list li.test");

        if (collectionSelected === "All Collections") {
            $(testList).removeClass('hide');
        }
        else {
            for (i = 0; i < testList.length; i++) {
                var collectionName = $(testList[i]).find('.collection-name td:nth-child(2)').text();
                
                if (collectionSelected === collectionName) {
                    $(testList[i]).removeClass('hide');
                }
                else {
                    $(testList[i]).addClass('hide');
                }
            }
        }
    });
}

function traitFilter() {
    $("#trait-select").on("change", function(e) {
        var traitSelected = $('#trait-select').parent(["0"]).children()[1].value;
        var testList = $("#test-list li.test");

        if (traitSelected === "All Traits") {
            $(testList).removeClass('hide');
        }
        else {
            for (i = 0; i < testList.length; i++) {
                var traitName = $(testList[i]).find('.trait-name td:nth-child(2)').text();
                
                if (traitSelected === traitName) {
                    $(testList[i]).removeClass('hide');
                }
                else {
                    $(testList[i]).addClass('hide');
                }
            }
        }
    });
}

function drawPercentageChart() {
    total = $("#test-list .test-name").length;
    passed = $("#test-list .test-name.passed").length;
    failed = $("#test-list .test-name.failed").length;
    errors = $("#test-list .test-name.error").length;
    skipped = $("#test-list .test-name.skipped").length;

    var passedPercentage = Math.round(((passed / total) * 100)) + "%";
    $(".pass-percentage").text(passedPercentage);
    $(".dashboard .determinate").attr("style", "width:" + passedPercentage);
}

function drawTestsChart() {
	if (!$('#test-analysis').length) {
		return false;
    }

    var ctx = document.getElementById("test-analysis").getContext("2d");

    data = {
        labels: ["Passed", "Failed", "Skipped", "Errors"],
        datasets: [
            {
                data: [passed, failed, skipped, errors],
                backgroundColor: [
                    "#66bb6a",
                    "#ef5350",
                    "#03a9f4",
                    "#ffa726"
                ]
            }
        ]
    };

    var options = {
        responsive: false,
        maintainAspectRatio: true,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }
        },
        legendCallback: function (chart) {
            var text = [];
            text.push('<ul class="doughnut-legend">');

            var data = chart.data;
            var datasets = data.datasets;
            var labels = data.labels;

            if (datasets.length) {
                for (var i = 0; i < datasets[0].data.length; ++i) {
                    text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + ';"></span>');
                    if (labels[i]) {
                        text.push(datasets[0].data[i] + ' ' + labels[i]);
                    }
                    //text.push('<div>percentage</div>');
                    text.push('</li>');
                }
            }
            text.push('</ul>');
            //console.log(text);
            return text.join('');
        },
        legend: {
            display: false
        }
    };

    var chart = new Chart(ctx,
    {
        type: "doughnut",
        data: data,
        options: options
    });

    var legend = chart.generateLegend();
    document.getElementById("legend").innerHTML = legend;
}

function showTestList() {
    $(".details-container").html("");
    var numberOfSuites = $("#suite-collection .collection-item");
    var html = ("<ul>");

    for (i = 1; i <= numberOfSuites.length; i++){
        var suiteChild = "li:nth-child(" + i + ") .collection-item";
        
        html += "<li>";
        html += $("#suite-collection").find(suiteChild).html();
        html += "</li>";
    }
    html += ("</ul>");

    $(".details-container").append(html);
    $(".details-container .suite-content").removeClass("hide");
}
