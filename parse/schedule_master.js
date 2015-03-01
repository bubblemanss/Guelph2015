    module.exports= function (data){
        return {
            schedule_code: returnColumn(data, 0),
            schedule_type_code: returnColumn(data, 1),
            schedule_name: returnColumn(data, 2),
            schedule_description: returnColumn(data, 3),
            schedule_remarks: returnColumn(data, 4)
        }
    }

    function returnColumn (data, index) {
        var col3 = data.map(function(value){return value[index];});
        return col3;
    }