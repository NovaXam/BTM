export default {
    resultingGraph: (function() {

    var height = 350;
    var breadth = 40;
  
  var easing = [
      "easeElastic",
      "easeBounce",
      "easeLinear",
      "easeSin",
      "easeQuad",
      "easeCubic",
      "easePoly",
      "easeCircle",
      "easeExp",
      "easeBack"
      ];
      
const calcul = (data) => {
    var xScale = d3.scaleBand()
                  .domain(data.map((d) => d.year))
                  .range([0, height * 1.5]);
  
    var yScale = d3.scaleLinear()
                  .domain([0, d3.max(data.map((d) => d.value))])
                  .range([height - 20, 0]);
  
    var x = d3.axisBottom(xScale);
  
    var y = d3.axisLeft(yScale);
  
    var svg = d3.select('body')
                .append('svg')
                .attr('height', height + 35)
                .attr('width', height * 1.75)
  
    var gTag = svg.selectAll('g')
              .data(data)
              .enter()
              .append('g')
              .attr('id', (d, i) => i)
              .attr('transform', (d, i) => 'translate(' + Math.ceil(xScale(d.year)-17) + ', -5)');
  
    gTag.append('rect')
      .attr('class', 'bar')
      .attr('x', -10)
      .attr('y', height)
      .attr('height', 0)
      .attr('width', breadth)
      .attr('fill', 'orange')
      .attr('transform', 'translate(85, 0)')
      .transition()
      .ease(d3.easeQuad)
      .duration(1500)
      .attr('y', (d) => yScale(d.value))
      .attr('height', (d) => height - yScale(d.value));
  
    d3.selectAll('.bar').on('mouseover', function() {
      d3.select(this)
        .transition()
        .ease(d3.easeBounce)
        .duration(500)
        .attr('fill', 'steelblue')
        .attr('width', breadth + 10)
        .attr('x', -15);
  
    d3.select(this.parentNode).append('text')
        .attr('class', 'number')
        .attr('y', (d) => yScale(d.value) + 35)
        .attr('transform', 'translate(80, 0)')
        .attr('fill', 'white')
        .attr('font-size', 20)
        .text((d) => '$' + d.value);
  
    }).on('mouseout', function() {
        d3.selectAll('.number')
          .remove();
  
        d3.select(this)
          .transition()
          .ease(d3.easeBounce)
          .duration(500)
          .attr('fill', 'orange')
          .attr('width', breadth)
          .attr('x', -10);
    });
  
    svg.append('g')
      .attr('transform', 'translate(50,' + (height-5)  + ')')
      .call(x)
      .append('text')
      .text('year')
      .attr('x', xScale(2014))
      .attr('y', 35)
      .attr('font-size', 15)
      .attr('fill', 'black');
  
    svg.append('g')
      .attr('transform', 'translate(50, 15)')
      .call(y.tickFormat((d) => '$'+ d).ticks(20))
      .append('text')
      .attr('x', yScale(height/2.8))
      .attr('y', -35)
      .attr('fill', 'black')
      .attr('font-size', 15)
      .attr('font-family', 'helvetica')
      .attr('transform', 'rotate(-90)')
      .text('price');
  
    svg.append('text')
      .text('Stock value over the year')
      .attr('fill', 'black')
      .attr('font-size', 15)
      .attr('x', xScale(2014))
      .attr('y', 15)
      .attr('font-family', 'helvetica');
        }
    })()
};