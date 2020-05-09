var margin = {top: 40, right: 30, bottom: 40, left: 50},
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

var greyColor = "#898989";
var barColor = d3.interpolateInferno(0.4);
var highlightColor = d3.interpolateInferno(0.3);

var formatPercent = d3.format("");

var svg = d3.select("#ff").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .range([0, width/2])
        .padding(0.2);    //長條形的寬度
var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom(x).tickSize([]).tickPadding(22);    
var yAxis = d3.axisLeft(y).tickFormat(formatPercent);;

var dataset = {
            "108":[
                {"city":"台北市", "value":61849},
                {"city":"新北市", "value":124178},
                {"city":"桃園市", "value":34308},
                {"city":"台中市", "value":41147},
                {"city":"台南市", "value":63345},
                {"city":"高雄市", "value":30319}, 
                {"city":"宜蘭縣", "value":11100},
                {"city":"新竹縣", "value":8115},
                {"city":"苗栗縣", "value":15649},
                {"city":"彰化縣", "value":15237},
                {"city":"南投縣", "value":7827},
                {"city":"雲林縣", "value":14573}, 
                {"city":"嘉義縣", "value":11186},
                {"city":"屏東縣", "value":12148},
                {"city":"台東縣", "value":5173},
                {"city":"花蓮縣", "value":6049},
                {"city":"澎湖縣", "value":4335},
                {"city":"基隆市", "value":7709},
                {"city":"新竹市", "value":10263},
                {"city":"嘉義市", "value":4435},
                {"city":"金門縣", "value":5741},
                {"city":"連江縣", "value":2999}
            ],
            "107":[
                {"city":"台北市", "value":68839},
                {"city":"新北市", "value":126982},
                {"city":"桃園市", "value":31977},
                {"city":"台中市", "value":536159},
                {"city":"台南市", "value":77313},
                {"city":"高雄市", "value":80731}, 
                {"city":"宜蘭縣", "value":11986},
                {"city":"新竹縣", "value":7338},
                {"city":"苗栗縣", "value":14213},
                {"city":"彰化縣", "value":17229},
                {"city":"南投縣", "value":8781},
                {"city":"雲林縣", "value":17259}, 
                {"city":"嘉義縣", "value":15643},
                {"city":"屏東縣", "value":12169},
                {"city":"台東縣", "value":8236},
                {"city":"花蓮縣", "value":5090},
                {"city":"澎湖縣", "value":4037},
                {"city":"基隆市", "value":11754},
                {"city":"新竹市", "value":14680},
                {"city":"嘉義市", "value":9827},
                {"city":"金門縣", "value":5805},
                {"city":"連江縣", "value":1664}
            ],
            "106":[
                {"city":"台北市", "value":66764},
                {"city":"新北市", "value":113473},
                {"city":"桃園市", "value":22460},
                {"city":"台中市", "value":43308},
                {"city":"台南市", "value":73372},
                {"city":"高雄市", "value":81510}, 
                {"city":"宜蘭縣", "value":7770},
                {"city":"新竹縣", "value":7797},
                {"city":"苗栗縣", "value":12466},
                {"city":"彰化縣", "value":15729},
                {"city":"南投縣", "value":10165},
                {"city":"雲林縣", "value":16621}, 
                {"city":"嘉義縣", "value":13435},
                {"city":"屏東縣", "value":11202},
                {"city":"台東縣", "value":7752},
                {"city":"花蓮縣", "value":5924},
                {"city":"澎湖縣", "value":4365},
                {"city":"基隆市", "value":11748},
                {"city":"新竹市", "value":14331},
                {"city":"嘉義市", "value":6683},
                {"city":"金門縣", "value":3146},
                {"city":"連江縣", "value":1312}
            ]}
var e = document.getElementById("mySelect");
var selected = e.options[e.selectedIndex].value;
var data = dataset[selected];

var changedata = function(data){
    console.log(data);
    d3.selectAll(".bar").remove();
    d3.selectAll(".label").remove();
x.domain(data.map( d => { return d.city; }));

    // y.domain([0, d3.max(dataset,  d => { return d.value; })]);
y.domain([1000, 150000]);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text") 
    .style("text-anchor", "end") 
    .attr("dx", "4em") 
    .attr("dy", "-2.5em") 
    .attr("transform", "rotate(90)");

svg.append("g")
    .attr("class","y axis")
    .call(yAxis);

svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .style("display", d => { return d.value === null ? "none" : null; })
    .style("fill",  d => { 
        return d.value === d3.max(data,  d => { return d.value; }) //長條形的顏色
        ? highlightColor : barColor
        })
    .attr("x",  d => { return x(d.city); })
    .attr("width", x.bandwidth())
        .attr("y",  d => { return height; })
        .attr("height", 0)
            .transition()
            .duration(750)
            .delay(function (d, i) {
                return i * 150;
            })
    .attr("y",  d => { return y(d.value); })
    .attr("height",  d => { return height - y(d.value); });

svg.selectAll(".label")        
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .style("display",  d => { return d.value === null ? "none" : null; })
    .attr("x", ( d => { return x(d.city) + (x.bandwidth()/2) -10 ; }))
        .style("fill",  d => {                                                  //字體highlight
            return d.value === d3.max(data,  d => { return d.value; }) 
            ? highlightColor : greyColor
            })
    .attr("y",  d => { return height; })
        .attr("height", 0)                            //長條形上方數字移動
            .transition()
            .duration(750)
            .delay((d, i) => { return i * 150; })
    .text( d => { return formatPercent(d.value); })   //長條形上方顯示的數字
    .attr("y",  d => { return y(d.value); })
    .attr("dy", "-.7em");
};
changedata(data);
d3.select("select")
    .on("change",function(d){
        let a = d3.select("#mySelect").node().value;
        console.log(a)
        data = dataset[a];
        changedata(data);
    })