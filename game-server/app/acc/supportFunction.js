var supportFunction = module.exports;



//string转化为json
supportFunction.stringToJson = function(_str) {
	return JSON.parse(_str);
}
 //json转化为string
 supportFunction.jsonToString = function(_json) {
 	JSON.stringify(_json); 
 }