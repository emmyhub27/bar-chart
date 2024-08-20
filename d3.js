d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(data => {
    const dataset = data.data;
    
    console.log(dataset)

    // Declare the chart dimensions and margins.
    const width = 800;
    const height = 600;
    const padding = 60;
  
    // Declare the x (horizontal position) scale.
    const xScale = d3.scaleTime()
    .domain([new Date("1947-01-01"), new Date("2015-07-01")])
        .range([padding, width - padding]);
  
    // Declare the y (vertical position) scale.
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d[1])])
        .range([height - padding, padding]);
  
    // Create the SVG container.
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);
  
    // Add the x-axis.
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, "+ (height - padding) +")")
        .call(xAxis);

    // Add the y-axis.
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
       .attr("id", "y-axis")
       .attr("transform", 'translate(' + padding + ', 0)')
       .call(yAxis);

        //   Add tooltip
        const tooltip = d3.select("#tooltip");
  
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("class", "bar")
       .attr("data-date", d => d[0])
       .attr("data-gdp", d => d[1])
       .attr("x", d => xScale(new Date(d[0])))
       .attr("y", d => yScale(d[1]))
       .attr("width", (width - (2 * padding)) / dataset.length)
       .attr("height", d => yScale(0) - yScale(d[1]))
       .on("mouseover", showTooltip)
       .on("mouseout", hideTooltip);

       
       
       function showTooltip (event, d) {
        tooltip.style("display", "block")
              .data(dataset)
              .style('left', `${event.pageX}px`)
              .style('top', `${event.pageY}px`)
              .attr("data-date", d[0])
              .html(`Date: <span>${d3.select(this).attr('data-date')}</span><br>GDP: <span>${d3.select(this).attr('data-gdp')}</span>`)
              console.log(d[0])
       };

       function hideTooltip () {
        tooltip.style("display", "none")
       }
});