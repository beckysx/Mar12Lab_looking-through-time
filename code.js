var dataset= d3.json('gradeDataTime.json');
var drawChart =function(data){


      var screen={width:500,height:400};
      var margin = {top: 30, right: 30, bottom: 30, left: 70};
      var w = screen.width - margin.left - margin.right;
      var h = screen.height - margin.top - margin.bottom;
      var date=0

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
      .data(data[date].grades)
      .enter()
      .append("rect")
      .attr("x",function(d,i){
        return xScale(i)
      })
      .attr('y', function(d){return yScale(d.grade)})
      .attr('width', xScale.bandwidth())
      .attr('height',function(d){return h-yScale(d.grade)})
      .attr('fill', function(d){return colors(d.name)})
      .attr('id', function(d){
          return d.name
        })




      // labels
      svg.selectAll("text")
      .data(data[date].grades)
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
      .attr('class', 'changeButton')
      .attr('id', 'previous')

      previous.append("svg:image")
      .attr('xlink:href', function(){return "previous.png"})
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 200)
      .attr('height', 200)
      .attr('class', 'actualImage')




      // next button
      var previous=d3.select("body").append("svg")
      .attr('width', 300)
      .attr('height', 300)
      .attr('class', 'changeButton')
      .attr('id', 'next')

      previous.append("svg:image")
      .attr('xlink:href', function(){return "next.png"})
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 200)
      .attr('height', 200)
      .attr('class', 'actualImage')




      // timeline
      var time=[1,2,3,4,5,6,7,8,9,10]
      var timeline=d3.select("body").append("svg")
      .attr('class', 'timeline')
      .attr('width', 1200)
      .attr('height', 70)
      timeline.selectAll("text")
      .data(time)
      .enter()
      .append("text")
      .attr('x',function(d,i){
        return timeposition(i)
      })
      .attr('y',40)
      .attr('class', function(d,i){
        return i
      })
      .text(function(d){
        return "day"+d
      })


      d3.select(".timeline").select(function(){
        return "."+date}).style('fill', 'red')



      // click and update
      d3.selectAll(".changeButton")
            .on("mouseover",function(){
              d3.select(this).select(".actualImage")
              .transition()
              .duration(300)
              .attr('width', 300)
              .attr('height', 300)
              .attr('x', 0)
              .attr('y', 0)
            })
            .on("mouseout",function(){
              d3.select(this).select(".actualImage")
              .transition()
              .duration(300)
              .attr('width', 200)
              .attr('height', 200)
              .attr('x', 50)
              .attr('y', 50)
            })
            .on("click",function(){
              var getID= d3.select(this).attr("id")

              if (getID=="next"){
                var svg=d3.select(".mainchart")

                // rects
                svg.selectAll("rect")
                .data(function(){
                  if (date<10){
                    date=date+1
                    return data[date].grades
                  }
                  else if (date==10) {
                    return data[date].grades
                  }
                  })
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
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
                .data(data[date].grades)
                .transition()
                .duration(500)
                .ease(d3.easeCircle)
                .attr('text-anchor', 'middle')
                .attr('x',function(d,i){
                  return xScale(i)+(xScale.bandwidth()/2)
                })
                .attr('y', function(d){
                  return yScale(d.grade)-10
                })
                .text(function(d){return d.grade})
              }

              else if (getID=="previous") {

                var svg=d3.select(".mainchart")

                // rects
                svg.selectAll("rect")
                .data(function(){
                  if (date>0){
                    date=date-1
                    return data[date].grades
                  }
                  else if (date==0) {
                    return data[date].grades
                  }
                  })
                .transition()
                .duration(500)
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
                .data(data[date].grades)
                .transition()
                .duration(500)
                .attr('text-anchor', 'middle')
                .attr('x',function(d,i){
                  return xScale(i)+(xScale.bandwidth()/2)
                })
                .attr('y', function(d){
                  return yScale(d.grade)-10
                })
                .text(function(d){return d.grade})
              }

              })




      //rects color change
      d3.select('.mainchart').selectAll('rect')
      .on("mouseover",function(){
        d3.select(this)
        .transition()
        .duration(200)
        .attr('width', xScale.bandwidth()+15)
        .attr('x', function(){
          return parseFloat(d3.select(this).attr("x"))-10
        })
        .attr('y', function(){
          return parseFloat(d3.select(this).attr("y"))-5
        })
        .attr('height', function(){
          return parseFloat(d3.select(this).attr("height"))+10
        })
        .attr('fill', "#34435E")
      })
      .on("mouseout",function(){
        d3.select(this)
        .transition()
        .duration(200)
        .attr('width', xScale.bandwidth())
        .attr('x', function(){
          return parseFloat(d3.select(this).attr("x"))+10
        })
        .attr('y', function(){
          return parseFloat(d3.select(this).attr("y"))+5
        })
        .attr('height', function(){
          return parseFloat(d3.select(this).attr("height"))-10
        })
        .attr('fill', function() {
          return colors(d3.select(this).attr("id"))
        })
      })


}

dataset.then(function(d){
  drawChart(d)
})
