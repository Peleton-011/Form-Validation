import RawInput from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList, title } = options || {};

		this.inputList = inputList || [];
		console.log(inputList);

		this.title = title || null;
	}

	getElement() {
		let form = document.createElement("form");

		parseInputList(this.inputList).forEach((input) => {
			form.appendChild(input);
		});

		if (this.title) form = this.#addTitle(form);

		return form;
	}

	#addTitle(elem) {
		const wrapper = document.createElement("div");
		const title = document.createElement(this.title.titleType || "h1");

		title.innerText = this.title.title || "Unnamed Form";
		elem.setAttribute("title", this.title.title);
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
			fieldSet.appendChild(input)
		);

		return fieldSet;
	}
}

function parseInputList(list) {
	const newList = [];
	list.map(({ type, options }) => {
		//Remove built-in validation if js validation is turned on
		const newOptions = options.validationRequirements
			? options.validationRequirements.jsValidate
				? { ...options, validationRequirements: null }
				: options
			: options;

		let curr;
		//Return the appropiate element
		switch (type) {
			case "input":
				curr = new RawInput(newOptions);
				break;
			case "fieldset":
				curr = new Fieldset(newOptions);
				break;
			default:
				curr = new RawInput({ ...newOptions, type: type });
		}

		//Add js validation if necessary
		newList.push(inputToElem(curr, options));
	});

	return newList;
}

function inputToElem(input, options) {
	const elem = input.getElement();
	if (
		options.validationRequirements &&
		options.validationRequirements.jsValidate
	)
		addJsValidation(options, elem);
	return elem;
}

function addJsValidation(inputOpts, elem) {
	console.log("adding shit");
	const inputElem = elem.querySelector(`#${inputOpts.id}`);

	const errorMsg = document.createElement("span");
	errorMsg.setAttribute("aria-live", "polite");
	errorMsg.classList.add("error");

	inputElem.insertAdjacentElement("afterend", errorMsg);
	inputElem.onblur = getValidationFunction(inputOpts.validationRequirements);
}

function getValidationFunction(validationRequirements) {
	const { required, max, min, maxlen, minlen, pattern, size, step } =
		validationRequirements;
	const functions = [];

	//TODO: Add proper validation for time & datetime inputs

	if (required)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (!inputValue || Number(inputValue.length) < 1) {
				return `Input is required`;
			}
			return "";
		});
	if (max || typeof max === "string")
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue) > Number(min)) {
				return `Input value is greater than the maximum value: ${max}`;
			}
			return "";
		});
	if (min || typeof min === "string")
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue) < Number(min)) {
				return `Input value is less than the minimum value: ${min}`;
			}
			return "";
		});
	if (maxlen)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue.length) > Number(maxlen)) {
				return `Input value is longer than the maximum length: ${maxlen}`;
			}
			return "";
		});
	if (minlen)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue.length) < Number(minlen)) {
				return `Input value is shorter than the minimum length: ${minlen}`;
			}
			return "";
		});
	if (pattern)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			const regex = new RegExp(pattern);
			if (!regex.test(inputValue)) {
				return "Input value does not match the pattern, follow the instructions";
			}
			return "";
		});
	if (size)
		functions.push((e) => {
			console.log("Hi, sorry, i don't know what happened :/");
		});

	//TODO: Implement size validation
	if (step)
		functions.push((e) => {
			const value = Number(e.target.value.trim());
			const stepValue = Number(step);

			if (value % stepValue !== 0) {
				return `Input value does not match the specified step interval: ${step}`;
			}
			return "";
		});

	return (e) => {
		const input = e.target;
		const errorMsg = input.nextSibling;

		const final = functions.reduce((msgText, func) => {
			const out = func(e);
			// console.log(out +" + " + msgText)
			// console.log(msgText)
			return msgText + String(out);
		}, "");
		// console.log("ass ",final);
		errorMsg.textContent = final;
		errorMsg.className = final ? "active" : "";
	};
}

export default Form;
