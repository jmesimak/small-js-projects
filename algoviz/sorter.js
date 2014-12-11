$(document).ready(function() {
    var numbas = [5,4,2,6,1,2,6,1,6,8,9,10,11,51,1,25,16,12];
    var sorted = [1,1,1,2,2,4,5,6,6,6,8,9,10,11,12,16,25,51];

    var handler = new QuicksortHandler(numbas, renderChart);


    function shuffle(o) {
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function renderChart(stateObj) {

        var numbers = stateObj.numbers;
        console.log(stateObj);

        d3.select('#sorting-area')
        .selectAll('div')
        .remove();

        d3.select('#sorting-area')
        .selectAll('div')
        .data(numbers)
        .enter()
        .append('div')
        .attr('class', function(d, i) {
            if (stateObj.low === i || stateObj.high === i) {
                return 'active';
            } else if (stateObj.pivot === i) {
                return 'pivot';
            }
        })
        .style("width", function(d) { return d  * 10 +"px"; })
        .text(function(d) {return d});
    }

    $('#shuffle-button').click(function() {
        numbas = shuffle(numbas);
        renderChart({numbers: numbas});
    })

    $('#sort-button').click(function() {
        handler.sort();
        var i = 0, l = handler.getStateArray().length;
        (function iterator() {
            renderChart(handler.getStateArray()[i]);
            if(++i<l) {
                setTimeout(iterator, 500);
            }
            if(i===l) {
                renderChart({numbers: numbas});
            }
        })();

    })

    renderChart({numbers: numbas});

});
