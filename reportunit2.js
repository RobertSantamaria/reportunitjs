var menuWidth = 260;

$(document).ready(function() {
    /* init */
    showTestList();
    drawPercentageChart();
    testsChart();
    
    $(".collapsible").collapsible();
});

function showTestList() {
    $(".details-container").html("");
    var numberOfSuites = $("#suite-collection .suite-content");
    for (i = 0; i < numberOfSuites.length; i++){
        var suiteName = "#suite" + parseInt(i+1);
        var html = $("#suite-collection").find(suiteName).html();    
        $(".details-container").append(html);
        $(".details-container ul.collapsible").addClass("tests");
        $(".details-container .suite-content").removeClass("hide");
    }
}

function drawPercentageChart() {
    var total = $(".tests .test-name").length;
    var passed = $(".tests .test-name.passed").length;
    var failed = $(".tests .test-name.failed").length;
    var errors = $(".tests .test-name.error").length;
    var skipped = $(".tests .test-name.skipped").length;

    var passedPercentage = Math.round(((passed / total) * 100)) + "%";
    $(".pass-percentage").text(passedPercentage);
    $(".dashboard .determinate").attr("style", "width:" + passedPercentage);
}

/* show suite data on click */
$('.suite').click(function() {
    var t = $(this);
    
    $('.suite').removeClass('active');
    $('.suite-name-displayed, .details-container').html('');
    
    t.toggleClass('active');
    var html = t.find('.suite-content').html();
    
    $('.suite-name-displayed').text(t.find('.suite-name').text());
    $('.details-container').append(html);
});

$('#slide-out .report-item > a').filter(function(){
    return this.href.match(/[^\/]+$/)[0] == document.location.pathname.match(/[^\/]+$/)[0];
}).parent().addClass('active');

$(".btn .clear").click(function() {
    var t = $(this);
});

/* filters -> by suite status */
$('#suites-dropdown').click(function() {
    var t = $(this);
    
    if (!t.hasClass('clear')) {
        resetFilters();
        
        var status = t.text().toLowerCase();
        
        $('#suites .suite').addClass('hide');
        $('#suites .suite.' + status).removeClass('hide');
        
        selectVisSuite()
    }
});

/* filters -> by test status */
$('#tests-dropdown li').click(function() {
    var t = $(this);

    if (!t.hasClass('clear')) {
        resetFilters();
        
        var opt = t.text().toLowerCase();
        
        //We filter tests here...
        $('.suite table tr.test-status:not(.' + opt + '), .details-container tr.test-status:not(.' + opt).addClass('hide');
        $('.suite table tr.test-status.' + opt + ', .details-container tr.test-status.' + opt).removeClass('hide');
        
        hideEmptySuites();
        selectVisSuite()
    }
});

$('.clear').click(function() {
    resetFilters(); selectVisSuite()
});

function hideEmptySuites() {
    $('.suite').each(function() {
        var t = $(this);
        
        if (t.find('tr.test-status').length == t.find('tr.test-status.hide').length) {
            t.addClass('hide');
        }
    });
}

function resetFilters() {
    $('.suite, tr.test-status').removeClass('hide');
    $('.suite-toggle li:first-child, .tests-toggle li:first-child, .feature-toggle li:first-child').click();
}

function selectVisSuite() {
    $('.suite').get(0).click();
}

function clickListItem(listClass, index) {
    $('#' + listClass).find('li').get(index).click();
}

/* report -> tests chart */
function testsChart() {
	if (!$('#test-analysis').length) {
		return false;
    }
    var ctx = document.getElementById("test-analysis").getContext("2d");

    data = {
        labels: ["Pass", "Fail", "Error", "Skip"],
        datasets: [
            {
                label: "My First Dataset",
                data: [1, 1, 0, 1],
                backgroundColor: [
                    "#66bb6a",
                    "#ef5350",
                    "#ffa726",
                    "#03a9f4"
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