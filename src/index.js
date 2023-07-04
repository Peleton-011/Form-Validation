import Form from "./form.js";

function setup() {
	const body = document.querySelector("body");

	//TESTING vv
	const list = makeInputList();

	//TESTING ^^

	const form = new Form({ inputList: list, title: {title: "Sample Title", titleType: "h3"} });

	body.appendChild(form.getElement());
}

function makeInputList() {
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

	return [
		{ type: "input", options: { type: "color", ...inOpts } },
		{ type: "input", options: { type: "textarea", ...inOpts } },
		{
			type: "input",
			options: { type: "select", ...inOpts, label: null },
		},
		{ type: "input", options: { type: "cum", ...inOpts } },
		{
			type: "fieldset",
			options: {
				inputList: [
					{ type: "input", options: { type: "color", ...inOpts } },
					{ type: "input", options: { type: "textarea", ...inOpts } },
					{
						type: "input",
						options: { type: "select", ...inOpts, label: null },
					},
					{ type: "input", options: { type: "cum", ...inOpts } },
				],
				legend: "cum",
			},
		},
	];
}

setup();
