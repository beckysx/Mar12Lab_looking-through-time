var dataset= d3.json('gradeDataTime.json');
var drawChart =function(data){


      var screen={width:500,height:400};
      var margin = {top: 30, right: 30, bottom: 30, left: 70};
      var w = screen.width - margin.left - margin.right;
      var h = screen.height - margin.top - margin.bottom;

      var svg = d3.select('body').append('svg')
          .attr('width', screen.width)
          .attr('height', screen.height)
          .attr('class', 'mainchart')
          .style('display', 'block')

      // scale
      var xScale= d3.scaleBand()
      .domain(d3.range(4))
      .rangeRound([margin.left,screen.width - margin.right])
      .paddingInner(0.1);

      var yScale= d3.scaleLinear()
          .domain([0,100])
          .range([h,margin.top]);

      var colors=d3.scaleOrdinal()
      .domain(['Fred','Sally','Karl','Nancy'])
      .range(["#C47171","#8F995E","#499FB7","#F29C3A"])

      var timeposition=d3.scaleLinear()
          .domain([0, 9])
          .range([50, 1100])

      // rects
      svg.selectAll("rect")
      .data(data[0].grades)
      .enter()
      .append("rect")
      .attr("x",function(d,i){
        return xScale(i)
      })
      .attr('y', function(d){return yScale(d.grade)})
      .attr('width', xScale.bandwidth())
      .attr('height',function(d){return h-yScale(d.grade)})
      .attr('fill', function(d,i){
          return colors(i)
        })

      // labels
      svg.selectAll("text")
      .data(data[0].grades)
      .enter()
      .append("text")
      .attr('text-anchor', 'middle')
      .attr('x',function(d,i){
        return xScale(i)+(xScale.bandwidth()/2)
      })
      .attr('y', function(d){
        return yScale(d.grade)-10
      })
      .text(function(d){return d.grade})

      // y-axis
      var yAxis=d3.axisLeft(yScale)
      .tickSize(0)
      svg.append("g")
      .attr('class', 'yAxis')
      .call(yAxis)
      .attr('transform', 'translate(' + (margin.left/1.5) + ',0)')

      // legend
      svg.append("g")
      .attr('class', 'legend')
      .selectAll("text")
      .data(data[0].grades)
      .enter()
      .append("text")
      .attr('text-anchor', 'middle')
      .attr('x',function(d,i){
        return xScale(i)+(xScale.bandwidth()/2)
      })
      .attr('y',screen.height-margin.bottom)
      .text(function(d){
        return d.name
      })
      .attr('fill', function(d){return colors(d.name)})

      // previous button
      var previous=d3.select("body").append("svg")
      .attr('width', 300)
      .attr('height', 300)
      .attr('class', 'previous')

      previous.append("svg:image")
      .attr('xlink:href', function(){return "previous.png"})
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 200)
      .attr('height', 200)

      // next button
      var previous=d3.select("body").append("svg")
      .attr('width', 300)
      .attr('height', 300)
      .attr('class', 'next')

      previous.append("svg:image")
      .attr('xlink:href', function(){return "next.png"})
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 200)
      .attr('height', 200)

      // timeline
      var time=[1,2,3,4,5,6,7,8,9,10]
      var timeline=d3.select("body").append("svg")
      .attr('class', 'timeline')
      .attr('width', 1200)
      .attr('height', 50)
      timeline.append("g").selectAll("text")
      .data(time)
      .enter()
      .append("text")
      .attr('x',function(d,i){
        return timeposition(i)
      })
      .attr('y',30)
      .text(function(d){
        return "day"+d
      })

}

dataset.then(function(d){
  drawChart(d)
})
