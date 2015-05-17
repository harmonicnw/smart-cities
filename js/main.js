/* main.js */

google.load('visualization', '1', {packages: ['corechart', 'bar']});
      google.setOnLoadCallback(drawAxisTickColors);

      columnChart = {
        data: null,
        options: null,
        chart: null
      },
      lineChart = {
        data: null,
        options: null,
        chart: null
      };

      function drawAxisTickColors() {
        this.columnChart.data = google.visualization.arrayToDataTable([
        ['TimeOfDay', 'Other', 'Morning', 'Evening', { role: 'annotation' } ],
        ['Sunday', 10, 24, 20, ''],
        ['Monday', 16, 22, 23, ''],
        ['Tuesday', 28, 19, 29, ''],
        ['Wednesday', 28, 19, 29, ''],
        ['Thursday', 28, 19, 29, ''],
        ['Friday', 28, 19, 29, ''],
        ['Saturday', 28, 19, 29, '']
      ]);

      this.columnChart.options = {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
      };
      
      this.columnChart.chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      this.columnChart.chart.draw(this.columnChart.data, this.columnChart.options);
      google.visualization.events.addListener(this.columnChart.chart, 'select', this.drawLineChart);
      }
      
      function drawLineChart () {
        
          this.getDay();
          
      }
      
      function getDay () {
        if (this.columnChart.chart.getSelection().length > 0 ) {
          var selection = this.columnChart.chart.getSelection(),
          day = (22 + selection[0].row).toString(),
          me = this;;
        $.get("dailyData/deqAirQualityCombined-" + day + ".csv", function(csvString) {
          //query.setQuery('select C, sum(B) group by C');

          // Send the query with a callback function.
          //query.send(handleQueryResponse);
            var arrayData = $.csv.toObjects(csvString);
          
            console.log(arrayData);


            var data = new google.visualization.DataTable();

            data.addColumn('number', 'time');
            data.addColumn('number', 'NO2');

            var i=0;


            for(i = 0; i<arrayData.length;i++){
              data.addRows([
                [(Number(arrayData[i].hour)*60)+Number(arrayData[i].minute), Number(arrayData[i].nitrogen_oxides)]
              ]);
            }

            me.lineChart.options = {
              hAxis: {
                title: 'Time'
              },
              vAxis: {
                title: 'NO2'
              }
            };

            me.lineChart.data = data;

            me.lineChart.chart = new google.visualization.LineChart(document.getElementById('line_chart'));
          
          if (columnChart.options.height !== 200) {
            me.columnChart.options.height = 200;
            me.columnChart.chart.draw(me.columnChart.data, me.columnChart.options);
            google.visualization.events.addListener(me.columnChart.chart, 'select',   me.drawLineChart);
            me.columnChart.chart.setSelection(selection);
          }
          me.lineChart.chart.draw(me.lineChart.data, me.lineChart.options);


      }, "text");
        } else {
          if (columnChart.options.height !== 400) {
            me.columnChart.options.height = 400;
            me.columnChart.chart.draw(me.columnChart.data, me.columnChart.options);
          }
          me.lineChart.chart.clearChart();
        }

      }