# player3d-vue [![Build Status](https://travis-ci.com/NataliShip/player3d-vue.svg?branch=master)](https://travis-ci.com/NataliShip/player3d-vue)

3D плеер на Vue для демонстрации товаров на 360° с использованием canvas через покадровую смену фотографий. Используется Canvas, как наиболее подходящий инструмент для управления пиксельными изображениями.

**Принимает параметры:**

`framesList` - массив ссылок на изображения (в примере загружается с api)

`intervalDefault` - интервал смены кадров по умолчанию (200мс)

`selectorStart` - селектор (id) элемента, который будет запускать плеер

**DEMO: http://reactapp.ru/3d-player-vue/**

**Использование:**
```
<div class='player3d__container'>
  <Player3d 
    :framesList='this.images' 
    selectorStart='start' 
    :intervalDefault='200' 
  />
</div>
<button id='start'>Start</buttin>
```
В данном примере, классу container нужно задать ширину и высоту, так как canvas будет брать значение ширины и высоты родительского компонента при инициализации. Можно задавать относительные параметры в %.

`images3d` - это переменная содержащая массив ссылок на изображения

`'start'` - это id того элемента который будет запускать плеер. На него автоматически будет навешен обработчик на событие click. Достаточно добавить id

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

![Alt text](http://reactapp.ru/img/3d-player-vue.png "3d плеер Vue")
