class Portal extends Wall {
  constructor(x, y, img, type, direction) {
    super(x, y, img, type);
    this.direction = direction;
  }
}