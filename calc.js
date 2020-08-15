// All calculator logic goes here

function Calculator(initialValue)
{
	// limit of the symbols on the screen, 100 symbols initially
	this.symbolsLimit = 100;
	// flag indicating that the result can be computed
	this.canFindResult = false;
	// flag indicating whether operation symbol is present
	this.hasOperation = false;
	// flag indicating whether comma for current number is present
	this.hasComma = initialValue.includes(".");
	// current value on the screen
	this.screenValue = initialValue;
	// screen's initial value
	this.initialValue = initialValue;
	// initialization of method that refreshes the screen after some changes
	this.refresh = function(){
		document.getElementById("calc_screen").innerHTML = this.screenValue;
	}
	// initial refreshing
	this.refresh();
	// initialization of the method that appends next number symbol to the screen
	this.putNumber = function(number){
		if(this.hasOperation){ 
		// if there's an operation defined we change the state so the computations can be done
			this.hasOperation = false;
			this.canFindResult = true;
		}
		// changing value of the screen
		if(parseInt(this.screenValue) == 0)
			this.screenValue = number + "";
		else
			this.screenValue += number;
		// refresh of the changes
		this.refresh();
	}
	// method that appends operation symbol or comma to the screen string value
	this.putSymbol = function(symbol){
		if(this.screenValue.length > this.symbolsLimit) return;
		if((!this.hasOperation && !this.canFindResult) || (!this.hasComma && symbol == "."))
		{
			this.screenValue += symbol;
			this.refresh();
			if(symbol != "."){
				this.hasOperation = true;
				this.hasComma = false;
			}
			else
				this.hasComma = true;
		}
	}
	// initialization of the method that computes results based on the included operation
	this.findResult = function(){
		if(this.screenValue.includes("+"))
		{
			var num = this.screenValue.split("+");
			return parseFloat(num[0]) + parseFloat(num[1]);
		}
		else if(this.screenValue.includes("-"))
		{
			var num = this.screenValue.split("-");
			return parseFloat(num[0]) - parseFloat(num[1]);
		}
		else if(this.screenValue.includes("*"))
		{
			var num = this.screenValue.split("*");
			return parseFloat(num[0]) * parseFloat(num[1]);
		}
		else if(this.screenValue.includes("/"))
		{
			var num = this.screenValue.split("/");
			return parseFloat(num[0]) / parseFloat(num[1]);
		}
	}
	// initialzation of the method that performs proper operations based on the screen value
	this.clearOrCompute = function(){
		if(this.canFindResult)// showing the result if possible i.e two numbers and operation are present
		{
			var result = this.findResult();
			this.screenValue = result + "";
			
		}// cleaning the ouput screen otherwise i.e setting the initial state of the screen
		else
			this.screenValue = this.initialValue + "";
		this.canFindResult = false;
		this.hasOperation = false;
		this.hasComma = this.screenValue.includes(".");
		// refreshing the screen
		this.refresh();
	}
	// sets limit of the symbols on the screen
	this.setLimit = function(limit){
		this.symbolsLimit = limit
	}
}