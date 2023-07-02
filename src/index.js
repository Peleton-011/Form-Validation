import Form from "./form.js";

function setup() {
	const body = document.querySelector("body");

	const form = new Form();

	body.appendChild(form.getElement());
}

setup();
