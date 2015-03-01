    module.exports= function (data){
        return {
            address_id: returnColumn(data, 0),
            street_name: returnColumn(data, 1),
            street_number: returnColumn(data, 2),
            postal_code: returnColumn(data, 3),
            ward: returnColumn(data, 4),
            latitude: returnColumn(data, 5),
            longitude: returnColumn(data, 6)
        }
    }

    function returnColumn (data, index) {
        var col3 = data.map(function(value){return value[index];});
        return col3;
    }