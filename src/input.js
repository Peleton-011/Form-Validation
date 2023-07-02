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

		this.type = type;

		//idk
	}

	getElement() {
        //Determine correct element type
		const elementType =
			this.types.includes(this.type)
				? this.type === "textarea"
					? "textarea"
					: this.type === "select"
					? "select"
					: "input"
				: "p";
        //Create the element
		const input = document.createElement(elementType);

        //Add type etc... based on options
        switch (elementType) {
            case "input":
                input.setAttribute("type", this.type)
                break;
            
            case "p":
            input.textContent = "Sorry, '" + this.type + "' is not an accepted input type. Please try again"
            break;
        
            default:
                break;
        }

		return input;
	}
}

export default Input;
