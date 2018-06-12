'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

/**
 * Выдает случайный элемент из массива. Если второй аргумент указан и true, то элемент не будет повторяться.
 *
 * @param {array} arr - любой массив элементов.
 * @param {boolean} unique - если true, то выданное функцией значение будет удалено из массива. Необязательный аргумент.
 * @return {string} randomEl - случайный элемент из входящего массива.
 */
var randomizeEl = function (arr, unique) {
  var index = Math.floor(Math.random() * arr.length);
  var randomEl = arr[index];

  if (unique === true) {
    var removed = arr.splice(index, 1);
  }

  return randomEl;
}

/**
 * Генерирует имя волшебника, состоящее из случайного имени и случайной фамилии, расположенных в случайном порядке.
 *
 * @return {string} name - случайное имя.
 */
var generateName = function () {
  var initials = [randomizeEl(WIZARD_NAMES), randomizeEl(WIZARD_SURNAMES)];
  var name = randomizeEl(initials, true) + ' ' + randomizeEl(initials);
  return name;
}

/**
 * Создает массив волшебников любой длины, со случайными параметрами.
 *
 * @param {number} wizardsQuantity - количество волшебников.
 * @return {array} wizards - массив волшебников.
 */
var getWizards = function (wizardsQuantity) {
  var wizards = [];
  for (var i = 0; i < wizardsQuantity; i++) {
    var wizard = {
      name: generateName(),
      coatColor: randomizeEl(WIZARD_COATS_COLORS),
      eyesColor: randomizeEl(WIZARD_EYES_COLORS)
    }
    wizards.push(wizard);
  }

  return wizards;
}

/**
 * Создает DOM-элемент, описывающий волшебника.
 *
 * @param {object} wizard - волшебник с характеристиками.
 * @param {string} wizard.name - имя волшебника.
 * @param {string} wizard.coatColor - цвет плаща волшебника.
 * @param {string} wizard.eyesColor - цвет глаз волшебника.
 * @return {object} wizardElement - DOM-элемент на основе шаблона, описывает волшебника.
 */
var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

/**
 * Отрисовывает на странице волшебников (DOM-элементы) на основе данных массива.
 *
 * @param {array} wizards - массив волшебников.
 * @param {object} place - место в DOM-дереве для добавления элементов.
 */
var drawWizard = function (wizards, place) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  place.appendChild(fragment);
}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var wizards = getWizards(4);
drawWizard(wizards, similarListElement);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
