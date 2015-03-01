    module.exports= function (data){
        return {
            schedule_type_code: returnColumn(data, 0),
            schedule_type_name: returnColumn(data, 1),
            schedule_type_description: returnColumn(data, 2)
        }
    }

    function returnColumn (data, index) {
        var col3 = data.map(function(value){return value[index];});
        return col3;
    }