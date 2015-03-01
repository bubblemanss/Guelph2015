    module.exports= function (data){
        return {
            program_type: returnColumn(data, 0),
            program_code: returnColumn(data, 1),
            program_name: returnColumn(data, 2),
            program_description: returnColumn(data, 3),
            program_notes: returnColumn(data, 4),
            contact_email: returnColumn(data, 5)   
        }
    }

    function returnColumn (data, index) {
        var col3 = data.map(function(value){return value[index];});
        return col3;
    }