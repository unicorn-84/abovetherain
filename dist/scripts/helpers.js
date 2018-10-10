function wrap(element, wrapper) {
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
}

export default wrap;
