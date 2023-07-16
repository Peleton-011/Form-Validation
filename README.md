Example input:

```
{
	type: "input",
	options: {
		label: "testLabel",
		id: "sampleId0",
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
			popUp: true,
			jsValidate: true,
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
	},
}
```

Example inputList:

```
[
	{
		type: "input",
		options: {
			type: "text",
			label: "testLabel",
			id: "sampleId0",
			name: "testLabel0",
			groupClass: "testGroupClass",
			validationRequirements: {
				required: true,
				maxlen: 50,
				minlen: 5,
				jsValidate: true,
			},
			secondaryProperties: {
				placeholder: "test",
			},
		},
	},
	{
		type: "input",
		options: {
			type: "password",
			label: "testLabel1",
			id: "sampleId1",
			name: "testLabel",
			groupClass: "testGroupClass",
			validationRequirements: {
				minlen: 5,
			},
		},
	},
	{
		type: "fieldset",
		options: {
			inputList: [
				{
					type: "input",
					options: {
						type: "email",
						label: "testLabel2",
						id: "sampleId2",
						name: "testLabel",
						groupClass: "testGroupClass",
						validationRequirements: {
							minlen: 5,
							jsValidate: true,
						},
						secondaryProperties: {
							placeholder: "test",
						},
					},
				},
				{
					type: "input",
					options: {
						type: "tel",
						label: "testLabel3",
						id: "sampleId3",
						name: "testLabel",
						groupClass: "testGroupClass",
						validationRequirements: {
							pattern: /0-9{9}/,
							jsValidate: true,
						},
						secondaryProperties: {
							placeholder: "000-00-00-00",
						},
					},
				},
			],
			legend: "cum",
		},
	},
	{
		type: "input",
		options: {
			type: "submit",
			id: "sampleId4",
			name: "testLabel4",
			groupClass: "testGroupClass",
		},
	},
]
```
