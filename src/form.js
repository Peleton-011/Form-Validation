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
              }
        }

        this.inputList = inputList || [
			new Input({ type: "color", ...inOpts }),
			new Input({ type: "textarea", ...inOpts  }),
			new Input({ type: "select", ...inOpts  }),
			new Input({ type: "cum", ...inOpts  }),
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
