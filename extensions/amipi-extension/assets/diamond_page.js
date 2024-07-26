    

    var price_value = [0, 1, 3, 5, 7, 10, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 283, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200, 6300, 6400, 6500, 6600, 6700, 6800, 6900, 7000, 7100, 7200, 7300, 7400, 7500, 7600, 7700, 7800, 7900, 8000, 8100, 8200, 8300, 8400, 8500, 8600, 8700, 8800, 8900, 9000, 9100, 9200, 9300, 9400, 9500, 9600, 9700, 9800, 9900, 10000, 10100, 10200, 10300, 10400, 10500, 10600, 10700, 10800, 10900, 11000, 11100, 11200, 11300, 11400, 11500, 11600, 11700, 11800, 11900, 12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500, 19000, 19500, 20000, 20500, 21000, 21500, 22000, 22500, 23000, 23500, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 800000, 900000, 1000000];

    $(document).ready(function () {
        var disablePrice = '';
        var from_price = 0;
        var to_price = 10000000;

        var price_value1 = [parseInt(from_price), parseInt(to_price)];
        var price_value2 = price_value.concat(price_value1);
        price_value2.sort(function (a, b) { return a - b });

        from_price = price_value2.indexOf(parseInt(from_price));
        to_price = price_value2.indexOf(parseInt(to_price));

        $("#price_slider").ionRangeSlider({
            type: "double",
            from: from_price,
            to: to_price,
            values: price_value2,
            disable: disablePrice,
            onStart: function (data) {
                from_value = data.from_value;
                to_value = data.to_value;
                $('#price_from').val(from_value);
                $('#price_to').val(to_value);
            },
            onChange: function (data) {

                from_value = data.from_value;
                to_value = data.to_value;
                $('#price_from').val(from_value);
                $('#price_to').val(to_value);
            },
            onFinish: function (data) {
                submitForm();
            },
            onUpdate: function (data) {
                submitForm();
            }
        });
        var price_range = $("#price_slider").data("ionRangeSlider");
        setSliderFromTo = function () {

            var from = $('#price_from').val();

            var to = $('#price_to').val();

            var price_value1 = [from, to];
            var price_value2 = price_value.concat(price_value1);
            price_value2.sort(function (a, b) { return a - b });

            from = price_value2.indexOf(from);
            to = price_value2.indexOf(to);

            price_range.update({
                min: 0,
                max: 100,
                from: from,
                to: to,
                values: price_value2
            });
        };


  
        var from_size = 0;
        var to_size = 10;

        $("#carat").ionRangeSlider({
            type: "double",
            min: 0,
            max: 10,
            from: from_size,
            to: to_size,
            step: 0.01,
            max_postfix: '+',
            onStart: function (data) {
                from = data.from;
                to = data.to;

                $('#carat_from').val(from);
                $('#carat_to').val(to);
            },
            onChange: function (data) {
                from = data.from;
                to = data.to;
                $('#carat_from').val(from);
                $('#carat_to').val(to);
            },
            onFinish: function (data) {
                submitForm();
            },
            onUpdate: function (data) {
                submitForm();
            }
        });
        var carat_range = $("#carat").data("ionRangeSlider");
        setSliderFromTo1 = function () {
            var from = $('#carat_from').val();
            var to = $('#carat_to').val();
            carat_range.update({
                min: 0,
                max: 10,
                from: from,
                to: to,
                step: 0.01,
                max_postfix: '+',
            });
        };

    });


    function resetForm() {
        location.reload();
        document.getElementById("form").reset();
        $('#form li').removeClass('active-label');
        $('#form li').removeClass('active');
        $('label').removeClass('active1');

        var disablePrice = '';

        if (!disablePrice) {
            $('#price_from').val('0');
            $('#price_to').val('10000000');
            setSliderFromTo();
        }
        $('#carat_from').val('0');
        $('#carat_to').val('10');
        setSliderFromTo1();
        // submitForm();
    }
