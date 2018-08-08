// SCSS
import './select.scss';
// JS
import wrap from '../helpers';

function resetNativeSelect() {
  document.querySelectorAll('select[data-select]').forEach((nativeSelect) => {
    for (let i = 0; i < nativeSelect.options.length; i += 1) {
      nativeSelect.options[i].removeAttribute('selected');
      nativeSelect.options[i].selected = nativeSelect.options[i].defaultSelected;
    }
    nativeSelect.options[nativeSelect.selectedIndex].setAttribute('selected', 'selected');
    nativeSelect.parentNode.childNodes[1].textContent = nativeSelect.options[nativeSelect.selectedIndex].textContent;
  });
}

function customOptionHandler({ target }, nativeSelectOption) {
  const select = target.closest('.select');
  const nativeSelect = nativeSelectOption.parentNode;
  select.childNodes[1].textContent = target.textContent;
  if (!target.hasAttribute('selected')) {
    for (let i = 0; i < target.parentNode.childNodes.length; i += 1) {
      target.parentNode.childNodes[i].removeAttribute('selected');
    }
    target.setAttribute('selected', 'selected');
  }
  if (!nativeSelectOption.hasAttribute('selected')) {
    nativeSelect.options[nativeSelect.selectedIndex].selected = false;
    nativeSelect.options[nativeSelect.selectedIndex].removeAttribute('selected');
    nativeSelectOption.selected = true;
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
    customSelectOption.setAttribute('selected', '');
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
  wrap(nativeSelect, customSelect);
  customSelect.append(nativeSelect.options[nativeSelect.selectedIndex].innerHTML);
  if (nativeSelect.options.length > 0) {
    customSelect.append(createCustomSelectList(nativeSelect));
  }
}

function createSelect() {
  document.querySelectorAll('select[data-select]').forEach((nativeSelect) => {
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
