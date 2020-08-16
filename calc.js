// All calculator logic goes here

function Calculator(symbolsLimit)
{
	// limit of the symbols on the screen
	this.symbolsLimit = symbolsLimit;
	// flag indicating whether two numbers and operaton are present
	this.canFindResult = false;
	// flag indicating whether comma for current number is present
	this.hasComma = false;
	// first number
	this.firstNumber = "0.0";
	//second number
	this.secondNumber = "";
	//operation symbol
	this.operation = "";
	// method that sets screen value
	this.setScreenValue = function(value){
		document.getElementById("calc_screen").innerHTML = value;
	}
	// setting initial state of the screen
	this.setScreenValue(this.firstNumber);
	// initialization of the method that refreshes the screen after some changes
	this.refresh = function(){
		this.setScreenValue(this.firstNumber + this.operation + this.secondNumber);
	}
	// initialization of the method that appends next number symbol to the screen
	this.putNumber = function(number){
		if(this.firstNumber.length + this.operation.length + this.secondNumber.length > this.symbolsLimit)
			return;
		if(this.operation == ""){
			if(this.firstNumber == "0.0")
				this.firstNumber = number + "";
			else
				this.firstNumber += number;
		}
		else if(this.operaton != ""){
			this.secondNumber += number;
			this.canFindResult = true;
		}
		this.refresh();
	}
	// method that appends operation symbol to the screen string value
	this.putSymbol = function(symbol){
		if(this.operation == ""){
			this.operation = symbol;
			this.hasComma = false;
		}
		this.refresh();
	}
	// initialization of the method that computes results based on the included operation
	this.findResult = function(){
		if(this.operation == "+")
		{
			return parseFloat(this.firstNumber) + parseFloat(this.secondNumber);
		}
		else if(this.operation == "-")
		{
			return parseFloat(this.firstNumber) - parseFloat(this.secondNumber);
		}
		else if(this.operation == "*")
		{
			return parseFloat(this.firstNumber) * parseFloat(this.secondNumber);
		}
		else if(this.operation == "/")
		{
			if(Math.abs(parseFloat(this.secondNumber)) <= 0.0000001) return 0;
			return parseFloat(this.firstNumber) / parseFloat(this.secondNumber);
		}
	}
	// initialzation of the method that performs proper operations based on the screen value
	this.clearOrCompute = function(){
		if(this.canFindResult)// showing the result if possible i.e two numbers and operation are present
		{
			var result = this.findResult();
			this.firstNumber = result + "";
			this.hasComma = this.firstNumber.includes(".");
			
		}// cleaning the ouput screen otherwise i.e setting the initial state of the screen
		else{
			this.firstNumber = "0.0";
			this.hasComma = false;
		}
		this.secondNumber = "";
		this.operation = "";
		this.canFindResult = false;
		this.refresh();
	}
	// method that appends comma
	this.putComma = function(){
		if(this.hasComma || this.firstNumber == "" || this.firstNumber == "0.0") return; //states when comma cannot be put
		if(this.operation == "")
			this.firstNumber += ".";
		else this.secondNumber += ".";
		this.hasComma = true;
		this.refresh();
	}
}