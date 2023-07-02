class Input {
	types = [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password",
		"textarea",
		"select",
		"checkbox",
		"radio",
		"file",
		"range",
		"date",
		"time",
		"button",
		"color",
		"datetime-local",
		"hidden",
		"image",
		"month",
		"week",
		"number",
		"reset",
		"search",
		"submit",
	];
	constructor(options) {
        const { type } = options || {};
        console.log("idk?")
		//idk
	}

	getElement() {
		const input = document.createElement("div");

		input.textContent = "This is another test";

		return input;
	}
}

export default Input;
