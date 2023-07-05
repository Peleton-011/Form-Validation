import RawInput from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList, title } = options || {};

		this.inputList = inputList || [];

		this.title = title || null;
	}

	getElement() {
		let form = document.createElement("form");

		parseInputList(this.inputList).forEach((input) => {
            let inputElem = input.getElement();
            if (input.validationRequirements) {
                inputElem = this.#addErrorMessage(inputElem)
            }
			form.appendChild(inputElem);
		});

        if (this.title) {
            form.setAttribute("title", this.title.title);

            form = this.#addTitle(form);
        }

		return form;
	}

	#addTitle(elem) {
		const wrapper = document.createElement("div");
		const title = document.createElement(this.title.titleType || "h1");

		title.innerText = this.title.title || "Unnamed Form";
		wrapper.appendChild(title);
		wrapper.appendChild(elem);

		return wrapper;
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
