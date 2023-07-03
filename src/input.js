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
		const { type, label, id } = options || {};

		this.type = type;
		this.label = label || null;
        this.id = id || null;

		//idk
	}

	getElement() {
		//Determine correct element type
		const elementType = this.#getElementType();
		//Create the element
		let input = document.createElement(elementType);
		//Add type etc... based on options
		this.#setTypeAttribute(input, elementType);
        //Add id and such if necessary
        input.id = this.id
		//Add label if necessary
		input = this.#addLabel(this.label, input)

		return input;
	}

	#addLabel(label, elem) {
		if (!label) return elem;
		const temp = elem;
		elem = document.createElement("div");
		const labelElem = document.createElement("label");
		//Add the things to the label
        labelElem.setAttribute("for", this.id)
        labelElem.textContent = label;
		elem.appendChild(labelElem);
		elem.appendChild(temp);
		return elem;
	}

	#setTypeAttribute(elem, type) {
		switch (type) {
			case "input":
				elem.setAttribute("type", this.type);
				break;

			case "p":
				elem.textContent =
					"Sorry, '" +
					this.type +
					"' is not an accepted input type. Please try again";
				break;

			default:
				break;
		}
	}

	#getElementType() {
		const type = this.type;

		if (!this.types.includes(type)) {
			return "p";
		}

		if (type === "textarea" || type === "select") {
			return type;
		}
		return "input";
	}
}

export default Input;
