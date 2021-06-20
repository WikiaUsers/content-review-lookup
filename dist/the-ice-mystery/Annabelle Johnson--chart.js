anychart.onDocumentReady(function () {
      // our data from bulbapedia
     var data1 = [
       {x: "Power", value: 180},
       {x: "Strength", value: 168},
       {x: "Communication", value: 179},
       {x: "Talent", value: 160},
       {x: "Positivity", value: 192},
       {x: "Intelligence", value: 124},
       {x: "Extraordinariness", value: 137}
     ];

     // create radar chart
     var chart = anychart.radar();

     // set chart yScale settings
     chart.yScale()
       .minimum(0)
       .maximum(200)
       .ticks({'interval':20});

      // color alternating cells
      chart.yGrid().palette(["#5448ff 0.1", "#5448ff 0.15"]);

      // create first series
      chart.area(data1).name('Annabelle I. Johnson').markers(true).fill("#786eff", 0.3).stroke("#5448ff")

      // set chart title
      chart.title("Annabelle Ivanna Johnson's Chart")
        // set legend
        .legend(false);

      // set container id for the chart
      chart.container('container');
      // initiate chart drawing
      chart.draw();
	  
	  $(".chart-place").eq(0).after($content);
    });