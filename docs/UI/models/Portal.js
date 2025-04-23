// 📁 models/Portal.js
class Portal extends Wall {
  constructor(x, y, img, type, direction) {
    super(x, y, img, type); //type: "blue", "red"
    this.direction = direction; // "top", "bottom", "left", "right"
  }
}
