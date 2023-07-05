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
		const {
			type,
			label,
			id,
			name,
			groupClass,
			validationRequirements,
			secondaryProperties,
			hasError,
		} = options || {};

		this.type = type;
		this.label = label || null;
		this.id = id || null;
		this.name = name || null;
		this.groupClass = groupClass || null;
		this.validationRequirements = validationRequirements || null;
		this.secondaryProperties = secondaryProperties || null;
		this.hasError = hasError || false;
	}

	getElement() {
		//Determine correct element type
		const elementType = this.#getElementType();
		//Create the element
		const input = document.createElement(elementType);

		//Add type etc... based on options
		this.#setTypeAttribute(input, elementType);
		//Add id and such
		input.id = this.id;
		input.setAttribute("name", this.name);

		//Add restrictions
		if (this.validationRequirements) this.#addRestrictions(input);

		//Add other properties
		if (this.secondaryProperties) this.#addAdditionalProperties(input);

		//Adds label and error message
		const wrapper = this.#wrap(input);

		return wrapper;
	}

	#getErrorContainer() {
		const errorContainer = document.createElement("span");
		errorContainer.classList.add("error");
		errorContainer.setAttribute("aria-live", "polite");
	}

	#wrap(elem) {
		const wrapper = document.createElement("div");

		//Add label if necessary
		if (this.label) wrapper.appendChild(this.#getLabel(this.label));
		wrapper.className = this.groupClass;

		wrapper.appendChild(elem);

		//Add error message if necessary
		if (this.hasError) wrapper.appendChild(this.#getErrorContainer());
		return wrapper;
	}

	#addAdditionalProperties(elem) {
		const {
			readonly,
			disabled,
			autofocus,
			placeholder,
			spellcheck,
			autocomplete,
			multiple,
			checked,
			novalidate,
			form,
		} = this.secondaryProperties;

		if (readonly) elem.setAttribute("readonly", readonly);
		if (disabled) elem.setAttribute("disabled", disabled);
		if (autofocus) elem.setAttribute("autofocus", autofocus);
		if (placeholder) elem.setAttribute("placeholder", placeholder);
		if (spellcheck) elem.setAttribute("spellcheck", spellcheck);
		if (autocomplete) elem.setAttribute("autocomplete", autocomplete);
		if (multiple) elem.setAttribute("multiple", multiple);
		if (checked) elem.setAttribute("checked", checked);
		if (novalidate) elem.setAttribute("novalidate", novalidate);
		if (form) elem.setAttribute("form", form);
	}

	#addRestrictions(elem) {
		const { required, max, min, maxlen, minlen, pattern, size, step } =
			this.validationRequirements;

		if (required) elem.setAttribute("required", required);
		if (max) elem.setAttribute("max", max);
		if (min) elem.setAttribute("min", min);
		if (maxlen) elem.setAttribute("maxlen", maxlen);
		if (minlen) elem.setAttribute("minlen", minlen);
		if (pattern) elem.setAttribute("pattern", pattern);
		if (size) elem.setAttribute("size", size);
		if (step) elem.setAttribute("step", step);
	}

	#getLabel(label) {
		const labelElem = document.createElement("label");
		//Add the things to the label
		labelElem.setAttribute("for", this.id);
		labelElem.textContent = label;
		return labelElem;
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
