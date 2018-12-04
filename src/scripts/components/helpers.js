function wrap(element, wrapper) {
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
}

function fetchData(url, cb) {
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('No data');
      }
      return response.text();
    })
    .then(text => cb(null, text))
    .catch(error => cb(error));
}

function insertDataToModal(data) {
  document.querySelector('.modal').insertAdjacentHTML('beforeEnd', data);
  document.querySelector('.abovetherain__css3-spinner').remove();
}

export { wrap, fetchData, insertDataToModal };
