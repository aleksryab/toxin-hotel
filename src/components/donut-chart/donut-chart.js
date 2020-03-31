import gradients from './gradients.xml';

const donutChart = {
  options: {
    angleOffset: -90,
    cx: '60',
    cy: '60',
    viewBox: '0 0 120 120',
    radius: 56,
    strokeWidth: 4,
    gap: 3,
    labelDeclension: ['голосов', 'голос', 'голоса'],
    colors: {
      excellent: 'url(#gradient_excellent)',
      good: 'url(#gradient_good)',
      fair: 'url(#gradient_fair)',
      poor: 'url(#gradient_poor)',
      bad:  'black'
    }
  },
  container: null,
  svg: null,
  group: null,
  data: [],
  totalValue: 0,
  offset: 0,
  circumference: 0,

  createSvg() {
    // because IE 11 doesn't support innerHtml for svg
    let docForSvg = new DOMParser().parseFromString('<svg xmlns="http://www.w3.org/2000/svg">' + gradients + '</svg>', 'text/html');
    this.svg = docForSvg.documentElement.querySelector('svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('viewBox', this.options.viewBox);
  },

  createGroup() {
    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.group.setAttribute('transform', `rotate(${this.options.angleOffset} ${this.options.cx} ${this.options.cy})`);
  },

  createSegment(data) {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', this.options.cx);
    circle.setAttribute('cy', this.options.cy);
    circle.setAttribute('r', this.options.radius);
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('stroke', this.options.colors[data.rate]);
    circle.setAttribute('stroke-width', this.options.strokeWidth);
    circle.setAttribute('stroke-dashoffset', this.offset);
    circle.setAttribute('stroke-dasharray', this.calculateSegment(data.value));

    this.group.appendChild(circle);
  },

  createLegend() {
    let textGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    textGroup.appendChild(this.createText('donut-chart__amount', this.totalValue));
    textGroup.appendChild(this.createText('donut-chart__label', this.makeDeclension(this.totalValue)));
    this.svg.appendChild(textGroup);
  },

  createText(cssClass, text) {
    let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.setAttribute('x', '50%');
    textElement.setAttribute('y', '50%');
    textElement.classList.add(cssClass);
    textElement.textContent = text;
    return textElement;
  },

  calculateSegment(dataVal) {
    let dash = dataVal/this.totalValue * this.circumference;
    this.offset -= dash;
    return `${dash - this.options.gap} ${this.circumference - dash + this.options.gap}`;
  },

  render() {
    this.createSvg();
    this.createGroup();

    this.data.forEach(item => {
      this.createSegment(item);
    });

    //let parser = new DOMParser();
    //let defs = parser.parseFromString(gradients, "text/html");
    //console.log(gradients);
    //this.svg.textContent = gradients;
    //this.svg.appendChild(defs);
    this.svg.appendChild(this.group);
    this.createLegend();
    this.container.appendChild(this.svg);
  },

  makeDeclension(val) {
    switch (val) {
      case 0:
        return this.options.labelDeclension[0];
      case 1:
        return this.options.labelDeclension[1];
      case 2:
      case 3:
      case 4:
        return this.options.labelDeclension[2];
      default:
        if (val > 20) {
          if(val > 99) {
            return this.makeDeclension(val % 100);
          }
          return this.makeDeclension(val % 10);
        }
        return this.options.labelDeclension[0];
    }
  },

  init(container) {

    this.container = container;
    this.data = JSON.parse(container.getAttribute('data-donut'));
    container.removeAttribute('data-donut');

    if(this.data.length == 1) {
      this.options.gap = 0;
    }

    this.data.forEach(item => {
      this.totalValue += +item.value;
    });

    this.circumference = 2 * Math.PI * this.options.radius;

    this.render();
  },
};

$(document).ready(() => {
  const donuts = document.querySelectorAll('.js-donut');
  donuts.forEach(container => {
    let objDonut = Object.create(donutChart);
    objDonut.init(container);
  });
});