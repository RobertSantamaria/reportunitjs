var total = 0;
var passed = 0;
var failed = 0;
var skipped = 0;
var errors = 0;

$(document).ready(function() {
    /* init */
    showTestList();
    drawPercentageChart();
    drawTestsChart();

    buildSuiteDropdown();

    $('select').material_select();
    suiteFilter();

    $(".collapsible").collapsible();
});

function buildSuiteDropdown(){
    var numberOfSuites = $("#suite-collection .collection-item");

    for (i = 1; i <= numberOfSuites.length; i++){
        var suiteName = $("#suite-collection li:nth-child(" + i + ") .suite-head").text();
        var html = "<option value='" + i + "'>" + suiteName + "</option>";
        $("#collection-select").append(html);
    }
}

function suiteFilter() {
    $("#collection-select").on("change", function(e) {
        var suiteSelected = $('#collection-select').parent(["0"]).children()[1].value;
        var numberOfSuites = $("#suite-collection .collection-item");

        for (i = 1; i <= numberOfSuites.length; i++) {
            var suiteName = $(".details-container li:nth-child(" + i + ") .suite-head").text();
            if (suiteName === suiteSelected) {
                $(".details-container li:nth-child(" + i + ") .suite-head").removeClass("hide");
                $(".details-container li:nth-child(" + i + ") .suite-content").removeClass("hide");
            }
            else {
                $(".details-container li:nth-child(" + i + ") .suite-head").addClass("hide");
                $(".details-container li:nth-child(" + i + ") .suite-content").addClass("hide");
            }
        }
    });
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

function drawPercentageChart() {
    total = $("#suite-collection .test-name").length;
    passed = $("#suite-collection .test-name.passed").length;
    failed = $("#suite-collection .test-name.failed").length;
    errors = $("#suite-collection .test-name.error").length;
    skipped = $("#suite-collection .test-name.skipped").length;

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
            console.log(text);
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

/*
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
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: "right"
        }
    };
    var myPieChart = new Chart(ctx,
    {
        type: "doughnut",
        data: data,
        options: options
    });
}
*/