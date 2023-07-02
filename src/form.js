import Input from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList } = options || {};
		this.inputList = inputList || [];
	}

	getElement() {
		const form = document.createElement("form");

		form.textContent = "This is just a test";

		return form;
	}
}

export default Form;
