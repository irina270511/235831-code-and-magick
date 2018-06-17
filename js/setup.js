'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

/**
 * Выдает случайный элемент из массива.
 *
 * @param {array} arr - любой массив элементов.
 * @return {string} randomElement - случайный элемент из входящего массива.
 */
var randomizeElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  var randomElement = arr[index];
  return randomElement;
};

/**
 * Выдает случайный элемент из массива, удаляя этот элемент из входящего массива.
 *
 * @param {array} arr - любой массив элементов.
 * @return {string} randomEl - случайный элемент из входящего массива.
 */
var randomizeUniqueElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  var randomEl = arr[index];
  arr.splice(index, 1);

  return randomEl;
};

/**
 * Генерирует имя волшебника, состоящее из случайного имени и случайной фамилии, расположенных в случайном порядке.
 *
 * @return {string} name - случайное имя.
 */
var generateName = function () {
  var initials = [randomizeElement(WIZARD_NAMES), randomizeElement(WIZARD_SURNAMES)];
  var copyInitials = [].concat(initials);
  var name = randomizeUniqueElement(copyInitials) + ' ' + randomizeUniqueElement(copyInitials);
  return name;
};

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
      coatColor: randomizeElement(WIZARD_COATS_COLORS),
      eyesColor: randomizeElement(WIZARD_EYES_COLORS)
    };
    wizards.push(wizard);
  }

  return wizards;
};

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
};

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
};


// Открытие-закрытие окна настройки персонажа
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');

/**
 * Закрывает окно настройки персонажа по нажатию ESC, если фокус не на поле с вводом имени персонажа.
 *
 * @param {object} evt - объект event.
 */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !document.querySelector('input[name=username]:focus')) {
    setup.classList.add('hidden');
  }
};

/**
 * Открывает окно настройки персонажа.
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

/**
 * Закрывает окно настройки персонажа.
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Возможность изменения параметров персонажа по нажатию
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

/**
 * Добавляет или меняет заданное цветовое CSS-свойство стиля на случайный цвет из заданного массива цветов. Также меняет значение инпута для отправки заданного цвета на сервер.
 *
 * @param {array} colors - массив возможных цветов.
 * @param {object} element - DOM-элемент, у которого меняется свойство.
 * @param {string} property - CSS-свойство, значением которого может быть цвет.
 * @param {string} inputName - имя инпута, для отправки значения на сервер.
 */
var changeColorElement = function (colors, element, property, inputName) {
  var color = randomizeElement(colors);
  element.style = property + ': ' + color + ';';
  document.querySelector('input[name=' + inputName + ']').value = color;
};

wizardCoat.addEventListener('click', function () {
  changeColorElement(WIZARD_COATS_COLORS, wizardCoat, 'fill', 'coat-color');
});

wizardCoat.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    changeColorElement(WIZARD_COATS_COLORS, wizardCoat, 'fill', 'coat-color');
  }
});

wizardEyes.addEventListener('click', function () {
  changeColorElement(WIZARD_EYES_COLORS, wizardEyes, 'fill', 'eyes-color');
});

wizardEyes.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    changeColorElement(WIZARD_EYES_COLORS, wizardEyes, 'fill', 'eyes-color');
  }
});

wizardFireball.addEventListener('click', function () {
  changeColorElement(WIZARD_FIREBALL_COLORS, wizardFireball, 'background', 'fireball-color');
});

wizardFireball.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    changeColorElement(WIZARD_FIREBALL_COLORS, wizardFireball, 'background', 'fireball-color');
  }
});

// Список подобных персонажей
var similarListElement = document.querySelector('.setup-similar-list');

var wizards = getWizards(4);
drawWizard(wizards, similarListElement);

setup.querySelector('.setup-similar').classList.remove('hidden');

