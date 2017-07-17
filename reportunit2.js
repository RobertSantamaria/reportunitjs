var menuWidth = 260;

function showDynamicModal(heading, content) {
    var m = $('.modal-trigger');
    document.getElementById('modal-title').innerHTML = heading;
    document.getElementById('modal-message').innerHTML = content;
}

$('.details-container').click(function(evt) {
    var t = $(evt.target);
    showDynamicModal(t.closest('tr').find('.name').text() + ' StatusMessage: ', t.next().text());
});

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

/* filters -> by suite status */
$('#suites-dropdown li').click(function() {
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

$(document).ready(function() {
	/* init */
	$('select').material_select();
	$('.tooltipped').tooltip({delay: 10});

	var passedPercentage = Math.round(((passed / total) * 100)) + '%';
	$('.pass-percentage').text(passedPercentage);
	$('.dashboard .determinate').attr('style', 'width:' + passedPercentage);

    testsChart();

	//resetFilters();
	//$('.suite:first-child').click();
});

var options = {
	segmentShowStroke : false, 
	percentageInnerCutout : 55, 
	animationSteps : 1,
	legendTemplate : '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<segments.length; i++){%><li><span style=\'background-color:<%=segments[i].fillColor%>\'></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
};

/* test case counts */
var total = $('.test-name').length;
/*var passed = $('td.passed').length;
var failed = $('td.failed').length;
var errors = $('td.error').length;
var skipped = $('td.skipped').length;
*/
var passed = 3;
var failed = 1;
var errors = 0;
var skipped = 1;

/* report -> tests chart */
function testsChart() {
	if (!$('#test-analysis').length) {
		return false;
    }
    var ctx = document.getElementById("test-analysis").getContext("2d");

    data = {
        datasets: [{
            data: [300, 50, 100]
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
    };
//var options={}
var myPieChart = new Chart(ctx,
{
    "type": "doughnut",
    "data":
    {
        "labels": ["Red","Blue","Yellow"],
        "datasets":
        [
            {
                "label": "My First Dataset",
                "data": [300,50,100],
                "backgroundColor":
                [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)"
                ]
            }
        ]
    },
    "options": options
});

/*
    var data = {};
    
    if ($('body.summary').length > 0) {
        total = parseInt($('.total-tests').text());
        passed = parseInt($('.total-passed').text());
        failed = parseInt($('.total-failed').text());
        others = parseInt($('.total-skipped').text());
        
        data = [
            { value: passed, color: '#00af00', highlight: '#32bf32', label: 'Pass' },
            { value: failed, color:'#F7464A', highlight: '#FF5A5E', label: 'Fail' },
            { value: others, color: '#1e90ff', highlight: '#4aa6ff', label: 'Others' }
        ];
        
        $('.test-others-count').text(others);
    }
    else {
        data = [
            { value: passed, color: '#00af00', highlight: '#32bf32', label: 'Pass' },
            { value: failed, color:'#F7464A', highlight: '#FF5A5E', label: 'Fail' },
            { value: errors, color:'#ff6347', highlight: '#ff826b', label: 'Error' },
            { value: skipped, color: '#1e90ff', highlight: '#4aa6ff', label: 'Skip' }
        ];
        
        $('.test-others-count').text(errors + skipped);
    }
	
	$('.test-pass-count').text(passed);
	$('.test-fail-count').text(failed);
    
*/
    /*
	var ctx = $("#test-analysis").get(0).getContext("2d");
	testChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
	drawLegend(testChart, 'test-analysis');*/
}

/* draw legend for test and step charts [DASHBOARD] */
function drawLegend(chart, id) {
	var helpers = Chart.helpers;
	var legendHolder = document.getElementById(id);
	
	legendHolder.innerHTML = chart.generateLegend();
	
	helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index) {
		helpers.addEvent(legendNode, 'mouseover', function() {
			var activeSegment = chart.segments[index];
			activeSegment.save();
			activeSegment.fillColor = activeSegment.highlightColor;
			chart.showTooltip([activeSegment]);
			activeSegment.restore();
		});
	});
	
	Chart.helpers.addEvent(legendHolder.firstChild, 'mouseout', function() {
		chart.draw();
	});
	
	$('#' + id).after(legendHolder.firstChild);
}
