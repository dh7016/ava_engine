var supportFunction = module.exports;



//string转化为json
supportFunction.stringToJson = function(_str) {
	if(_str!=="") {
		return eval("(" + _str + ")");
	}
	else {
		return "";
	}
}
 //json转化为string
 supportFunction.jsonToString = function(_json) {
 	JSON.stringify(_json); 
 }