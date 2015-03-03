    module.exports= function (data){
        return {
            name : "collection_schedule",
            schedule_code: returnColumn(data, 0),
            collection_date: returnColumn(data, 1),
            program_code_array: returnColumn(data, 2)   
        }
    }

    function returnColumn (data, index) {
        var col3 = data.map(function(value){return value[index];});
        return col3;
    }