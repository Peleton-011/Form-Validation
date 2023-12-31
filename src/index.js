import Form from "./form.js";

function setup() {
	const body = document.querySelector("body");

	//TESTING vv
	const list = makeInputList();

	//TESTING ^^

	const form = new Form({
		inputList: list,
		title: { title: "Sample Title", titleType: "h3" },
		formOptions: {
			customPopup: true,
			jsValidate: true,
		},
	});

	body.appendChild(form.getElement());
}

function makeInputList() {
	const inOpts = {
		label: "testLabel",
		get id() {
			if (!this._id) {
				this._id = 0;
			}
			return String("sampleid" + this._id++);
		},
		name: "testLabel",
		groupClass: "testGroupClass",
		validationRequirements: {
			required: true,
			max: 50,
			min: 25,
			maxlen: null,
			minlen: 5,
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
			//form
		},
	};

	return [
		{ type: "input", options: { type: "text", ...inOpts } },
		{ type: "input", options: { type: "text", ...inOpts } },
		{ type: "input", options: { type: "password", ...inOpts } },
		/*{
			type: "fieldset",
			options: {
				inputList: [
					{ type: "input", options: { type: "email", ...inOpts } },
					{ type: "input", options: { type: "text", ...inOpts } },
					{ type: "input", options: { type: "password", ...inOpts } },
				],
				legend: "cum",
			},
		},*/
		{
			type: "input",
			options: { type: "submit", ...inOpts, validationRequirements: {} },
		},
	];
}

setup();

export default Form