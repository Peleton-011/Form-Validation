import Input from "./input.js";

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
            }
		};

		this.inputList = inputList || [
			new Input({ type: "color", ...inOpts }),
			new Input({ type: "textarea", ...inOpts }),
			new Input({ type: "select", ...inOpts, label: null }),
			new Input({ type: "cum", ...inOpts }),
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

export default Form;
