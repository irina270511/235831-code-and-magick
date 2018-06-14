'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

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

// ПОПЫТАЛАСЬ РЕАЛИЗОВАТЬ ТАСОВАНИЕ ФИШЕРА
/**
 * Перемешивает массив случайным образом.
 *
 * @param {array} arr - любой массив элементов.
 * @return {array} newArr - новый массив из тех же элементов в случайном порядке.
 */
var randomizeArray = function (arr) {
  var arrayLength = arr.length;
  var newArr = [];
  for (var i = 0; i < arrayLength; i++) {
    var indexAAA = Math.floor(Math.random() * arr.length);
    newArr.push(arr[indexAAA]);
    arr.splice(indexAAA, 1);
  }
  return newArr;
};

// ЕЩЕ ОДИН СПОСОБ СОРТИРОВКИ

/**
 * Перемешивает массив случайным образом.
 *
 * @param {array} arr - любой массив элементов.
 * @return {array} newArr - новый массив из тех же элементов в случайном порядке.
 */
var randomizeArray2 = function (arr) {
  var randomCompare = function (_a, _b) {
    return Math.random() - 0.5;
  };
  var newArr = arr.sort(randomCompare);
  return newArr;
};

/**
 * Генерирует имя волшебника, состоящее из случайного имени и случайной фамилии, расположенных в случайном порядке.
 * @return {string} name - случайное имя.
 */

var generateName = function () {
  var initials = randomizeArray([randomizeElement(WIZARD_NAMES), randomizeElement(WIZARD_SURNAMES)]);
  var name = initials[0] + ' ' + initials[1];
  return name;
};

generateName();
randomizeArray2(WIZARD_COATS_COLORS);
