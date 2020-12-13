export const createButtonHTMLElement = ({ id = "", name, onClick, classList = [], dataset = {} }) => {
  const $button = document.createElement("button");
  $button.innerText = name;
  $button.id = id;
  $button.addEventListener("click", onClick);
  $button.classList.add(...classList);
  
  Object.entries(dataset).forEach(([key, value]) => {
    $button.dataset[key] = value;
  });

  return $button;
};

export const createInputTextHTMLElement = ({ id = "", onKeydown, placeholder = "" }) => {
  const $input = document.createElement("input");
  $input.type = "text";
  $input.id = id;
  $input.addEventListener("keydown", onKeydown);
  $input.placeholder = placeholder;

  return $input;
};

export const createLabelHTMLElement = ({ name = "", htmlFor }) => {
  const $label = document.createElement("label");
  $label.innerText = name;
  $label.setAttribute("for", htmlFor);
  // $label.style.display = "block";
  
  return $label;
};

export const createDivHTMLElement = ({ innerText = "" }) => {
  const $div = document.createElement("div");
  $div.innerText = innerText;
  
  return $div;
};

const createOptionHTMLElement = value => {
  const $option = document.createElement("option");
  $option.value = value;
  $option.innerText = value;

  return $option;
};

export const createSelectHTMLElement = ({ id, options = [] }) => {
  const $select = document.createElement("select");
  $select.id = id;

  const $options = options.map(optionValue => createOptionHTMLElement(optionValue));
  $select.append(...$options);

  return $select;
};

export const clearInputValue = $input => {
  $input.value = "";
  $input.focus();
};

