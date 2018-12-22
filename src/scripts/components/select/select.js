// JS
// FIXME: 'Не меняется selected значение в Safari'
import { wrap } from '../helpers';

const nativeSelects = document.querySelectorAll('select[data-select]');

function resetNativeSelect() {
  nativeSelects.forEach((nativeSelect) => {
    const item = nativeSelect;
    if (item.options) {
      for (let i = 0; i < item.options.length; i += 1) {
        item.options[i].removeAttribute('selected');
        item.options[i].selected = item.options[i].defaultSelected;
      }
      item.options[item.selectedIndex].setAttribute('selected', 'selected');
      item.parentNode.childNodes[1].textContent = item.options[item.selectedIndex].textContent;
    }
  });
}

function customOptionHandler({ target }, nativeSelectOption) {
  const select = target.closest('.select');
  const nativeSelect = nativeSelectOption.parentNode;
  const customSelectList = target.parentNode;
  select.childNodes[1].textContent = target.textContent;
  if (!target.hasAttribute('selected')) {
    for (let i = 0; i < customSelectList.childNodes.length; i += 1) {
      customSelectList.childNodes[i].removeAttribute('selected');
    }
    target.setAttribute('selected', 'selected');
  }
  if (!nativeSelectOption.hasAttribute('selected')) {
    nativeSelect.options.selectedIndex = Array.from(target.parentNode.children).indexOf(target);
    nativeSelect.options[nativeSelect.selectedIndex].removeAttribute('selected');
    nativeSelectOption.setAttribute('selected', 'selected');
  }
}

function closeAllSelect() {
  document.querySelectorAll('.select').forEach((item) => {
    item.classList.remove('active');
  });
}

function createCustomSelectOption(customSelectList, nativeSelectOption) {
  const customSelectOption = document.createElement('li');
  customSelectOption.setAttribute('value', nativeSelectOption.getAttribute('value'));
  customSelectOption.innerHTML = nativeSelectOption.innerHTML;
  if (nativeSelectOption.selected) {
    customSelectOption.setAttribute('selected', 'selected');
  }
  customSelectOption.addEventListener('click', (e) => {
    resetNativeSelect();
    customOptionHandler(e, nativeSelectOption);
  });
  return customSelectOption;
}

function createCustomSelectList(nativeSelect) {
  const customSelectList = document.createElement('ul');
  customSelectList.classList.add('select-list');
  for (let i = 0; i < nativeSelect.options.length; i += 1) {
    customSelectList.append(createCustomSelectOption(customSelectList, nativeSelect.options[i]));
  }
  return customSelectList;
}

function createCustomSelect(nativeSelect) {
  const customSelect = document.createElement('div');
  customSelect.classList.add('select');
  customSelect.id = nativeSelect.id;
  wrap(nativeSelect, customSelect);
  if (nativeSelect.options.length > 0) {
    customSelect.append(nativeSelect.options[nativeSelect.selectedIndex].innerHTML);
    customSelect.append(createCustomSelectList(nativeSelect));
  }
  return customSelect;
}

function createSelect() {
  nativeSelects.forEach((nativeSelect) => {
    createCustomSelect(nativeSelect);
  });
  document.body.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('select')) {
      closeAllSelect();
    } else if (target.classList.contains('select') && !target.classList.contains('active')) {
      closeAllSelect();
      target.classList.add('active');
    } else {
      closeAllSelect();
    }
  });
}

export default createSelect;
