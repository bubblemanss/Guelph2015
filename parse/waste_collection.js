    module.exports= function (data){
        return {
            collection_code: returnColumn(data, 0),
            collection_name: returnColumn(data, 1),
            program_code: returnColumn(data, 2),
            waste_stream: returnColumn(data, 3),
            collection_notes: returnColumn(data, 4),
            collection_alert: returnColumn(data, 5)   
        }
    }

    function returnColumn (data, index) {
        var col3 = data.map(function(value){return value[index];});
        return col3;
    }