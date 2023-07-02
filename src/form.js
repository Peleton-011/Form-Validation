import Input from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList } = options || {};
		this.inputList = inputList || [new Input({type: "text"}), new Input({type: "textarea"}), 
        new Input({type: "select"}), 
        new Input({type: "cum"})
    ];
	}

	getElement() {
		const form = document.createElement("form");

		this.inputList.forEach((input) => {
			form.appendChild(input.getElement());
		});

		return form;
	}
}

export default Form;
