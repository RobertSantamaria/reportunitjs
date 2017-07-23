$( document ).ready(function() {
    /*$('select').not('.disabled').material_select();
    $("#select1").click(function() {
        alert("Selection");
    });
    */
  $('select').not('.disabled').material_select();
  $('#select1').on('change', function(e) {
        console.log($('#select1').parent(["0"]).children()[1].value);
    alert('Select Changed');
  });
});

/*$('#dropdown1 li').click(function() {
    var t = $(this);
});

$(document).ready(function() {
    $('select').material_select();

      $('#dropdown1').on('change', function(e) {
    alert('Select Changed');
  });*/
    /*
    var data = {
            labels: ["Red","Blue","Yellow"],
            datasets:
            [
                {
                label: "My First Dataset",
                data: [300,50,100],
                backgroundColor:
                [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)"
                ]
            }
        ]
    };
    var ctx = document.getElementById("test-analysis").getContext("2d");
    var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.labels[tooltipItem.index] + ' (' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%)';
                }
            }
        },
        legendCallback: function 
        
        (chart) {
            var text = [];
            text.push('<ul class="legend">');

            var data = chart.data;
            var datasets = data.datasets;
            var labels = data.labels;

            if (datasets.length) {
                for (var i = 0; i < datasets[0].data.length; ++i) {
                    console.log(datasets[0]);
                    text.push('<li><div class="testing" style="background-color:' + datasets[0].backgroundColor[i] + ';"></div>');
                    if (labels[i]) {
                        text.push(labels[i] + ' (' + datasets[0].data[i] + '%)');
                    }
                    text.push('<div>percentage</div>');
                    text.push('</li>');
                }
            }
            text.push('</ul>');
            console.log(text);
            return text.join('');
        },
        legend: {
            // since you're providing your own legend
            display: false,
        },                
    }
});

var legend = myPieChart.generateLegend();
document.getElementById("legend").innerHTML = legend;
*/
//});
