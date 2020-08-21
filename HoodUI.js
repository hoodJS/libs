class HoodUI {
  constructor(GlobalName) {
    this.GlobalName = GlobalName;
    this.nullMsg = [];
    this.body = document.createElement('div');
    this.visibleText = document.createElement('span');
    this.body.className = 'hui';
    this.endWith = ['Min', 'Max', 'Step', 'Options'];
    this.header = document.createElement('div');
    this.hidden = false;
    this.bodies = [];
    this.onChange = function () {};
  }
  static get hr() {
    return document.createElement('hr');
  }
  get size() {
    return Object.keys(window[this.GlobalName].length);
  }
  static getType(value) {
    return Array.isArray(value) ? 'array' : typeof value;
  }
  setValue(name, value) {
    if (window[this.GlobalName] && !name.endsWith(this.endWith)) {
      window[this.GlobalName][name] = value;
    }
  }
  static isColor(string) {
    return string.toString().startsWith('#') && string.length === 7;
  }
  getValue(name) {
    if (window[this.GlobalName]) {
      let val = window[this.GlobalName][name];
      let type = HoodUI.getType(val);
      return val
        ? [
            name,
            val,
            HoodUI.isColor(val) ? 'color' : type == 'object' ? 'string' : type,
          ]
        : this.this.nullMsg;
    } else {
      return this.this.nullMsg;
    }
  }
  static isValid(val) {
    return !val ? false : val.length !== 0;
  }
  getNumberSet(name) {
    let val = this.getValue(name);
    let res = [0, 0, 0];
    if (HoodUI.isValid(val)) {
      let min = this.getValue(name + 'Min');
      let max = this.getValue(name + 'Max');
      let step = this.getValue(name + 'Step');
      Number(min[1]) ? (res[0] = Number(min[1])) : null;
      Number(max[1]) ? (res[1] = Number(max[1])) : null;
      Number(step[1]) ? (res[2] = Number(step[1])) : null;
    }
    return res;
  }
  getOptions(name) {
    let val = this.getValue(name + 'Options');
    return HoodUI.isValid(val) ? val[1] : [];
  }
  setHeader(name) {
    let h1 = document.createElement('span');
    this.visibleText.innerHTML = '  +';
    h1.innerHTML = name;
    this.header.className = 'hui-header';
    this.header.append(h1, this.visibleText);
    this.body.append(this.header);
  }
  get hideOnDBclick() {
    this.header.addEventListener('dblclick', () => {
      this.bodies.forEach(el => {
        this.hidden
          ? (el.style.display = el.fl ? 'flex' : 'block')
          : (el.style.display = 'none');
      });
      let t = this.hidden ? (this.hidden = false) : (this.hidden = true);
      this.visibleText.innerHTML = t ? '  -' : '  +';
      this.body.setAttribute('data-hidden', t);
    });
  }
  get render() {
    Object.keys(window[this.GlobalName]).forEach((name, id) => {
      for (var end of this.endWith) {
        if (name.endsWith(end)) {
          return undefined;
        }
      }
      let conf = this.getValue(name);
      switch (conf[2]) {
        case 'string':
          this.stringToDom(name, conf[1].toString());
          break;
        case 'number':
          this.numberToDom(name, parseInt(conf[1]) || 0);
          break;
        case 'boolean':
          this.booleanToDom(name, conf[1]);
          break;
        case 'array':
          this.arrayToDom(name, conf[1]);
          break;
        case 'color':
          this.colorToDom(name, conf[1]);
          break;
        case 'function':
          this.functionToDom(name, conf[1]);
          break;
      }
    });
    return this.body;
  }
  stringToDom(name, value) {
    let body = document.createElement('div');
    this.bodies.push(body);
    body.className = 'hui-body';
    let nameDiv = document.createElement('div');
    let valueInp = document.createElement('input');
    valueInp.className = 'hui-input';
    nameDiv.innerHTML = name + ' :';
    valueInp.value = value;
    body.append(nameDiv, valueInp);
    this.body.append(body);
    valueInp.addEventListener('input', () => {
      this.setValue(name, valueInp.value);
      this.onChange(name);
    });
  }
  functionToDom(name, value) {
    let body = document.createElement('div');
    this.bodies.push(body);
    body.className = 'hui-body';
    let valueBtn = document.createElement('input');
    valueBtn.type = 'button';
    valueBtn.className = 'hui-input';
    valueBtn.value = name;
    body.append(valueBtn);
    this.body.append(body);
    valueBtn.addEventListener('click', e => {
      value(e);
    });
  }
  colorToDom(name, value) {
    let body = document.createElement('div');
    this.bodies.push(body);
    body.className = 'hui-body';
    let nameDiv = document.createElement('div');
    let valueInp = document.createElement('input');
    valueInp.type = 'color';
    valueInp.className = 'hui-input';
    nameDiv.innerHTML = name + ' :';
    valueInp.value = value;
    body.append(nameDiv, valueInp);
    this.body.append(body);
    valueInp.addEventListener('input', () => {
      this.setValue(name, valueInp.value);
      this.onChange(name);
    });
  }
  arrayToDom(name, value) {
    let body = document.createElement('div');
    this.bodies.push(body);
    let options = this.getOptions(name);
    body.className = 'hui-body';
    let nameDiv = document.createElement('div');
    let valueSelc = document.createElement('select');
    body.style.display = 'flex';
    body.fl = true;
    valueSelc.style.margin = '0';
    valueSelc.style.marginLeft = '10px';
    valueSelc.className = 'hui-input';
    nameDiv.innerHTML = name + ' :';
    valueSelc.value = value;
    let opElms = options.map(function (val) {
      let op = document.createElement('option');
      op.value = op.innerHTML = val;
      return op;
    });
    valueSelc.append(...opElms);
    body.append(nameDiv, valueSelc);
    this.body.append(body);
    valueSelc.addEventListener('input', () => {
      this.setValue(name, valueSelc.value);
      this.onChange(name);
    });
  }
  booleanToDom(name, value) {
    let body = document.createElement('div');
    this.bodies.push(body);
    body.className = 'hui-body';
    let nameDiv = document.createElement('div');
    let valueInp = document.createElement('input');
    valueInp.type = 'checkbox';
    body.style.display = 'flex';
    body.fl = true;
    valueInp.style.margin = '2px';
    valueInp.style.marginLeft = '10px';
    valueInp.className = 'hui-input';
    nameDiv.innerHTML = name + ' :';
    valueInp.checked = value;
    body.append(nameDiv, valueInp);
    this.body.append(body);
    valueInp.addEventListener('input', () => {
      this.setValue(name, valueInp.checked);
      this.onChange(name);
    });
  }
  dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0,
      scope = this;
    if (this.header) {
      this.header.onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  numberToDom(name, value) {
    let body = document.createElement('div');
    this.bodies.push(body);
    let set = this.getNumberSet(name);
    body.className = 'hui-body';
    let nameDiv = document.createElement('div');
    let valueInp = document.createElement('input');
    valueInp.type = 'range';
    valueInp.className = 'hui-input';
    nameDiv.innerHTML = name + ' :';
    let valueInp2 = document.createElement('input');
    valueInp2.value = value;
    valueInp2.type = 'number';
    valueInp2.style.margin = '0';
    valueInp2.style.marginLeft = '10px';
    valueInp2.style.width = '35px';
    valueInp2.style.display = 'inline';
    valueInp.value = value;
    nameDiv.append(valueInp2);
    body.append(nameDiv, valueInp);
    valueInp.min = valueInp2.min = set[0];
    valueInp.max = valueInp2.max = set[1];
    valueInp.step = valueInp2.step = set[2];
    this.body.append(body);
    valueInp2.addEventListener('input', () => {
      valueInp.value = Number(valueInp2.value);
      this.setValue(name, Number(valueInp2.value));
      this.onChange(name);
    });
    valueInp.addEventListener('input', () => {
      valueInp2.value = Number(valueInp.value);
      this.setValue(name, Number(valueInp.value));
      this.onChange(name);
    });
  }
}
