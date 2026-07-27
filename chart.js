let chart;

function drawChart(forecast){

    const labels = [];
    const temps = [];

    forecast.list.slice(0,8).forEach(item=>{

        labels.push(
            new Date(item.dt*1000).getHours()+":00"
        );

        temps.push(item.main.temp);

    });

    const ctx = document.getElementById("tempChart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Temperature (°C)",

                data:temps,

                borderWidth:3,

                tension:.4,

                fill:true

            }]

        },

        options:{

            responsive:true,

            plugins:{
                legend:{
                    display:true
                }
            }

        }

    });

}