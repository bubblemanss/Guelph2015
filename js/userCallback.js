function createUser(formData){
	var url = "http://127.0.0.1:8080";

	formData['address'] = {
		streetNum : formData['streetNum'],
		streetName : formData['streetName'],
		postalCode : formData['postalCode']
	};
	console.log(formData);
	jQuery.post(url, formData, function(data){
		console.log(data);
	})
}