import RawInput from "./input.js";

class Form {
	inputList = [];
	constructor(options) {
		const { inputList, title } = options || {};

		//TESTING vv

		const inOpts = {
			label: "testLabel",
			get id() {
				if (!this._id) {
					this._id = 0;
				}
				return String(this._id++);
			},
			name: "testLabel",
			groupClass: "testGroupClass",
			validationRequirements: {
				required: true,
				max: 50,
				min: 25,
				maxlen: null,
				minlen: null,
				pattern: null,
				size: null,
				step: null,
			},
			secondaryProperties: {
				readonly: null,
				disabled: null,
				autofocus: null,
				placeholder: "test",
				spellcheck: null,
				autocomplete: null,
				multiple: null,
				checked: null,
				formnovalidate: null,
				form: null,
			},
		};

		this.inputList = inputList || [
			new RawInput({ type: "color", ...inOpts }),
			new RawInput({ type: "textarea", ...inOpts }),
			new RawInput({ type: "select", ...inOpts, label: null }),
			new RawInput({ type: "cum", ...inOpts }),
			new Fieldset({
				inputList: [
					new RawInput({ type: "color", ...inOpts }),
					new RawInput({ type: "textarea", ...inOpts }),
					new RawInput({ type: "select", ...inOpts, label: null }),
					new RawInput({ type: "cum", ...inOpts }),
				],
				legend: "cum",
			}),
		];

		//TESTING ^^
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
		this.inputList.forEach((input) =>
			fieldSet.appendChild(new RawInput(input).getElement())
		);

		return fieldSet;
	}
}

export default Form;
