import RawInput from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList, title } = options || {};

		this.inputList = inputList || [];

		//TESTING ^^
		this.title = title || "Unnamed form";
	}

	getElement() {
		const form = document.createElement("form");

		parseInputList(this.inputList).forEach((input) => {
			form.appendChild(input.getElement());
		});

		form.setAttribute("title", this.title);

		return form;
	}
}

class Fieldset {
	constructor({ inputList, legend }) {
		this.inputList = inputList || null;
		this.legend = legend || null;
	}

	getElement() {
		const fieldSet = document.createElement("fieldset");
		if (this.legend) {
			const legend = document.createElement("legend");
			legend.innerText = this.legend;
			fieldSet.appendChild(legend);
		}
		parseInputList(this.inputList).forEach((input) =>
			fieldSet.appendChild(input.getElement())
		);

		return fieldSet;
	}
}

function parseInputList(list) {
	const newList = [];
	list.forEach(({ type, options }) => {
		switch (type) {
			case "input":
				newList.push(new RawInput(options));
				break;
			case "fieldset":
				newList.push(new Fieldset(options));
				break;
			default:
				newList.push(new RawInput({ ...options, type: type }));
		}
	});
	return newList;
}

export default Form;
