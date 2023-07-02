import Input from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList, title } = options || {};
		this.inputList = inputList || [
            new Input({type: "color"}), 
            new Input({type: "textarea"}), 
        new Input({type: "select"}), 
        new Input({type: "cum"})
    ];
        this.title = title || "Unnamed form";
	}

	getElement() {
		const form = document.createElement("form");

		this.inputList.forEach((input) => {
			form.appendChild(input.getElement());
		});

        form.setAttribute("title", this.title);

		return form;
	}
}

export default Form;
