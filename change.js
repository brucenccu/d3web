$('#mySelect').change(function() {
    var e = document.getElementById("mySelect");
    var selected = e.options[e.selectedIndex].value;
    var data = dataset[selected];
    });