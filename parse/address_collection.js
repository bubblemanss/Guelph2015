    module.exports= function (data){
        return {
            name : "address_collection",
            address_id: returnColumn(data, 0),
            schedule_code: returnColumn(data, 1),
            collection_day_array: returnColumn(data, 2)   
        }
    }

    function returnColumn (data, index) {
        var col3 = data.map(function(value){return value[index];});
        return col3;
    }