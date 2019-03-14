//161 167 287 146
var dataset= d3.json('gradeDataTime.json');

var drawChart =function(data){


      var screen={width:500,height:420};
      var margin = {top: 50, right: 30, bottom: 30, left: 70};
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
          .range([80, 1320])


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
      .on("mouseover",function(){
          var getID=d3.select(this).attr("id")
          var getY=getY=d3.select(this).attr("y")
          d3.select("."+getID+"text")
          .transition()
          .ease(d3.easeBounce)
          .style('font-size', '25px')
          .style('fill', 'black')
          .style('text-decoration', 'underline')
          .attr("y",getY-20)
        })
      .on('mouseout', function(){
        var getID=d3.select(this).attr("id")
        var getY=d3.select(this).attr("y")
        d3.select("."+getID+"text")
        .transition()
        .duration(200)
        .ease(d3.easeBounce)
        .style('font-size', '15px')
        .style('fill', 'white')
        .style('text-decoration', 'none')
        .attr("y",getY-10)
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
      .attr('class', function(d){
        return d.name+"text"
      })
      .style('fill', 'white')




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
      .attr('y',screen.height-margin.bottom-15)
      .text(function(d){
        return d.name
      })
      .attr('fill', function(d){return colors(d.name)})




      // previous button
      var previous=d3.select("body").append("svg")
      .attr('width', 350)
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

      previous.append("text")
      .attr('x', 230)
      .attr('y', 150)
      .attr('id', 'previoustext')
      .attr('text-anchor', 'left')
      .text("Previous day")
      .style('font-family', 'Josefin Sans')




      // next button
      var next=d3.select("body").append("svg")
      .attr('width', 300)
      .attr('height', 300)
      .attr('class', 'changeButton')
      .attr('id', 'next')

      next.append("svg:image")
      .attr('xlink:href', function(){return "next.png"})
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 200)
      .attr('height', 200)
      .attr('class', 'actualImage')

      next.append("text")
      .attr('x', 0)
      .attr('id', 'nexttext')
      .attr('text-anchor', 'right')
      .attr('y', 150)
      .text("Next day")
      .style('font-family', 'Josefin Sans')




      // timeline
      var timeline=d3.select("body").append("svg")
      .attr('class', 'timeline')
      .attr('width', 1400)
      .attr('height', 100)

      d3.select(".timeline")
      .append("circle")
      .attr('cx', timeposition(date))
      .attr('cy', 50)
      .attr('r', 50)
      .attr('fill-opacity', 0.7)
      .style('fill', '#53687E')

      timeline.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr('text-anchor', 'middle')
      .attr('x',function(d,i){
        return timeposition(i)
      })
      .attr('y',55)
      .attr('class', function(d,i){
        return "day"+i
      })
      .text(function(d){
        return "Day"+d.day
      })
      .on("mouseover",function(){
        var getcx=d3.select(this).attr("x")
        d3.select(this)
        .transition()
        .duration(500)
        .delay(200)
        .style('text-decoration', 'underline')
        .style('font-size', '25px')
        .style('fill', 'white')
        d3.select(".timeline")
        .select("circle")
        .transition()
        .duration(500)
        .attr('cx', getcx)
        d3.select(".day"+date)
        .transition()
        .duration(500)
        .style('text-decoration', 'none')
        .style('font-size', '15px')
        .style('fill', 'black')
      })
      .on("mouseout",function(){
        d3.select(".timeline").select("circle")
        .transition()
        .duration(500)
        .attr('cx', timeposition(date))
        d3.select(".day"+date)
        .transition()
        .duration(500)
        .style('text-decoration', 'underline')
        .style('font-size', '25px')
        .style('fill', 'white')
        var compare=parseInt(d3.select(this).attr("class").replace(/[^0-9]/ig,""))
        if (compare!=date) {
          d3.select(this)
          .transition()
          .duration(500)
          .delay(200)
          .style('text-decoration', 'none')
          .style('font-size', '15px')
          .style('fill', 'black')
        }

      })
      .on("click",function(){
        date=parseInt(d3.select(this).attr("class").replace(/[^0-9]/ig,""))

          // rects
          svg.selectAll("rect")
          .data(data[date].grades)
          .transition()
          .duration(500)
          .ease(d3.easeBounce)
          .attr("x",function(d,i){
            return xScale(i)
          })
          .attr('y', function(d){return yScale(d.grade)})
          .attr('height',function(d){return h-yScale(d.grade)})


          //timeline
          console.log(date)

          d3.select(".day"+date)
          .transition()
          .duration(500)
          .delay(200)
          .style('text-decoration', 'underline')
          .style('font-size', '25px')
          .style('fill', 'white')


          // labels
          svg.selectAll("text")
          .data(data[date].grades)
          .transition()
          .duration(500)
          .ease(d3.easeBounce)
          .attr('x',function(d,i){
            return xScale(i)+(xScale.bandwidth()/2)
          })
          .attr('y', function(d){
            return yScale(d.grade)-10
          })
          .text(function(d){return d.grade})


      })


      d3.select(".day"+date)
      .style('text-decoration', 'underline')
      .style('font-size', '25px')
      .style('fill', 'white')



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

              var getID= d3.select(this).attr("id")
              if (getID=="next"){
                d3.select("#nexttext")
                  .transition()
                  .duration(300)
                  .attr('x', 70)
                  .style('font-size', '20px')
                  .style('text-decoration', 'underline')

              }
              else if (getID=="previous") {
                d3.select("#previoustext")
                  .transition()
                  .duration(300)
                  .attr('x', 160)
                  .style('font-size', '20px')
                  .style('text-decoration', 'underline')

              }


            })
            .on("mouseout",function(){
              d3.select(this).select(".actualImage")
              .transition()
              .duration(300)
              .attr('width', 200)
              .attr('height', 200)
              .attr('x', 50)
              .attr('y', 50)

              var getID= d3.select(this).attr("id")
              if (getID=="next"){
                d3.select("#nexttext")
                  .transition()
                  .duration(300)
                  .attr('x', 0)
                  .style('font-size', '15px')
                  .style('text-decoration', 'none')

              }
              else if (getID=="previous") {
                d3.select("#previoustext")
                  .transition()
                  .duration(300)
                  .attr('x', 230)
                  .style('font-size', '15px')
                  .style('text-decoration', 'none')

              }
            })
            .on("click",function(){
              var getID= d3.select(this).attr("id")
              if (getID=="next"){
                var svg=d3.select(".mainchart")

                // rects
                svg.selectAll("rect")
                .data(function(){
                  if (date<10){
                    console.log(typeof(date))
                    date=date+1
                    console.log(typeof(data[date]))
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
                .attr('height',function(d){return h-yScale(d.grade)})



                // timeline
                d3.select(".timeline")
                .select("circle")
                .transition()
                .duration(500)
                .attr('cx', timeposition(date))

                d3.select(".day"+(date-1))
                .transition()
                .duration(500)
                .style('text-decoration', 'none')
                .style('font-size', '15px')
                .style('fill', 'black')


                d3.select(".day"+date)
                .transition()
                .duration(500)
                .delay(200)
                .style('text-decoration', 'underline')
                .style('font-size', '25px')
                .style('fill', 'white')


                // labels
                svg.selectAll("text")
                .data(data[date].grades)
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
                .attr('x',function(d,i){
                  return xScale(i)+(xScale.bandwidth()/2)
                })
                .attr('y', function(d){
                  return yScale(d.grade)-10
                })
                .text(function(d){return d.grade})}
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
                .attr('height',function(d){return h-yScale(d.grade)})

                // timeline
                d3.select(".timeline")
                .select("circle")
                .transition()
                .duration(500)
                .attr('cx', timeposition(date))

                d3.select(".day"+(date+1))
                .transition()
                .duration(500)
                .style('text-decoration', 'none')
                .style('font-size', '15px')
                .style('fill', 'black')


                d3.select(".day"+date)
                .transition()
                .duration(500)
                .delay(200)
                .style('text-decoration', 'underline')
                .style('font-size', '25px')
                .style('fill', 'white')


                // labels
                svg.selectAll("text")
                .data(data[date].grades)
                .transition()
                .duration(500)
                .ease(d3.easeBounce)
                .attr('text-anchor', 'middle')
                .attr('x',function(d,i){
                  return xScale(i)+(xScale.bandwidth()/2)
                })
                .attr('y', function(d){
                  return yScale(d.grade)-10
                })
                .text(function(d){return d.grade})

              }})


}

dataset.then(function(d){
  drawChart(d)
})
