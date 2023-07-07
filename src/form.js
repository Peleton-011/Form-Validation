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
			const elem = input.getElement();

			if (input.validationRequirements) {
				const inputElem = elem.querySelector(`#${input.id}`);
				inputElem.onblur = this.#getValidationFunction(
					input.validationRequirements
				);
			}

			form.appendChild(elem);
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

	#getValidationFunction(validationRequirements, elem) {
		const { required, max, min, maxlen, minlen, pattern, size, step } =
			validationRequirements;
		const functions = [];

		//TODO: Add proper validation for time & datetime inputs

		if (required) functions.push((e) => {});
		if (max || typeof max === "string")
			functions.push((e) => {
				const inputValue = e.target.value;

				if (inputValue && Number(inputValue) > Number(min)) {
					return `Input value is greater than the maximum value: ${max}`;
				}
			});
		if (min || typeof min === "string")
			functions.push((e) => {
				const inputValue = e.target.value;

				if (inputValue && Number(inputValue) < Number(min)) {
					return `Input value is less than the minimum value: ${min}`;
				}
			});
		if (maxlen)
			functions.push((e) => {
				const inputValue = e.target.value;

				if (inputValue && Number(inputValue.length) > Number(maxlen)) {
					return `Input value is longer than the maximum length: ${maxlen}`;
				}
			});
		if (minlen)
			functions.push((e) => {
				const inputValue = e.target.value;

				if (inputValue && Number(inputValue.length) < Number(minlen)) {
					return `Input value is shorter than the minimum length: ${minlen}`;
				}
			});
		if (pattern)
			functions.push((e) => {
				const inputValue = e.target.value;

				const regex = new RegExp(pattern);
				if (!regex.test(inputValue)) {
					return "Input value does not match the pattern, follow the instructions";
				}
			});
		if (size)
			functions.push((e) => {
				console.log("Hi, sorry, i don't know what happened :/");
			});

		//TODO: Implement size validation
		if (step)
			functions.push((e) => {
				const value = Number(e.target.value);
				const stepValue = Number(step);

				if (value % stepValue !== 0) {
					return `Input value does not match the specified step interval: ${step}`;
				}
			});

		return (e) => {
			const input = e.target;
			const errorMsg = input.nextSibling;
		};
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
