import RawInput from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList, title, formOptions } = options || {};

		this.customPopup = formOptions.customPopup;
		this.jsValidate = formOptions.jsValidate;

		this.inputList = inputList || [];

		this.title = title || null;
	}

	getElement() {
		let form = document.createElement("form");

		if (this.customPopup) {
			form.setAttribute("novalidate", "true");
		}

		parseInputList(
			this.inputList,
			this.jsValidate,
			this.customPopup
		).forEach((input) => {
			form.appendChild(input);
		});

		if (this.title) form = this.#addTitle(form);

		form.onsubmit = (e) => {
			e.preventDefault();
			const isValid = this.#checkValidity(form);
			console.log("val ", isValid);
		};
		return form;
	}

	#checkValidity(elem) {
		const blurEvent = new Event("blur");
		const children = elem.querySelectorAll(
			"input, select, textarea, checkbox, radio, datalist, output"
		);

		return Array.from(children).reduce((acc, el) => {
			el.dispatchEvent(blurEvent);
			console.log(el);
			console.log(el.validity.valid);
			return acc && el.validity.valid;
		}, true);
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
	constructor({ inputList, legend, jsValidate, customPopup }) {
		this.inputList = inputList || null;
		this.legend = legend || null;
		this.jsVal = jsValidate || null;
		this.customPopup = customPopup || null;
	}

	getElement() {
		const fieldSet = document.createElement("fieldset");
		if (this.legend) {
			const legend = document.createElement("legend");
			legend.innerText = this.legend;
			fieldSet.appendChild(legend);
		}
		parseInputList(this.inputList, this.jsVal, this.customPopup).forEach(
			(input) => fieldSet.appendChild(input)
		);

		return fieldSet;
	}
}

function parseInputList(list, jsVal, customPopup) {
	const newList = [];
	list.map(({ type, options }) => {
		//Remove built-in validation if js validation is turned on
		const newOptions = options.validationRequirements
			? jsVal
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
				curr = new Fieldset(newOptions, jsVal, customPopup);
				break;
			default:
				curr = new RawInput({ ...newOptions, type: type });
		}

		//Add js validation if necessary
		newList.push(inputToElem(curr, options, jsVal, customPopup));
	});

	return newList;
}

function inputToElem(input, options, jsVal, customPopup) {
	const elem = input.getElement();
	if (jsVal) {
		addJsValidation(options, elem, customPopup);
	}
	return elem;
}

function addJsValidation(inputOpts, elem, customPopup) {
	const inputElem = elem.querySelector(`#${inputOpts.id}`);
	if (customPopup) {
		const errorMsg = document.createElement("span");
		errorMsg.setAttribute("aria-live", "polite");
		errorMsg.classList.add("error");

		inputElem.insertAdjacentElement("afterend", errorMsg);
	}

	inputElem.onblur = (e) => {
		const msg = getValidationMessage(inputOpts.validationRequirements, e);
		if (customPopup) {
			errorMessageFunc(msg, e);
		}
		inputElem.setCustomValidity(msg);
	};
}

function errorMessageFunc(msg, e) {
	const input = e.target;
	const errorMsg = input.nextSibling;

	errorMsg.textContent = msg;
	errorMsg.classList[msg ? "add" : "remove"]("active");
}

function getValidationMessage(validationRequirements, e) {
	const { required, max, min, maxlen, minlen, pattern, size, step } =
		validationRequirements;
	const functions = [];

	//In case no customMsg is given:
	const customMsgs = validationRequirements.customMsgs
		? validationRequirements.customMsgs
		: {};

	//TODO: Add proper validation for time & datetime inputs
	if (required)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (!inputValue || Number(inputValue.length) < 1) {
				return customMsgs.required || `Input is required`;
			}
			return "";
		});
	if (max || typeof max === "string")
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue) > Number(min)) {
				return (
					customMsgs.max ||
					`Input value is greater than the maximum value: ${max}`
				);
			}
			return "";
		});
	if (min || typeof min === "string")
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue) < Number(min)) {
				return (
					customMsgs.min ||
					`Input value is less than the minimum value: ${min}`
				);
			}
			return "";
		});
	if (maxlen)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue.length) > Number(maxlen)) {
				return (
					customMsgs.maxlen ||
					`Input value is longer than the maximum length: ${maxlen}`
				);
			}
			return "";
		});
	if (minlen)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			if (inputValue && Number(inputValue.length) < Number(minlen)) {
				return (
					customMsgs.minlen ||
					`Input value is shorter than the minimum length: ${minlen}`
				);
			}
			return "";
		});
	if (pattern)
		functions.push((e) => {
			const inputValue = e.target.value.trim();

			const regex = new RegExp(pattern);
			if (!regex.test(inputValue)) {
				return (
					customMsgs.pattern ||
					"Input value does not match the pattern, follow the instructions"
				);
			}
			return "";
		});
	if (size)
		functions.push((e) => {
			console.log(
				customMsgs.size || "Hi, sorry, i don't know what happened :/"
			);
		});

	//TODO: Implement size validation
	if (step)
		functions.push((e) => {
			const value = Number(e.target.value.trim());
			const stepValue = Number(step);

			if (value % stepValue !== 0) {
				return (
					customMsgs.step ||
					`Input value does not match the specified step interval: ${step}`
				);
			}
			return "";
		});

	return functions.reduce((msgText, func) => {
		const out = func(e);
		// console.log(out +" + " + msgText)
		// console.log(msgText)
		return msgText + String(out);
	}, "");
}

export default Form;
