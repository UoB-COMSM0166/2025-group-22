class GuideUI extends UI {
  constructor() {
    super(images["background_default"], []);
  }

  draw() {
    super.draw();
    image(images["text_jump"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_move"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_pause_guideUI"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_shoot"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_teleport"], 0, 0, canvasWidth, canvasHeight);
    image(images["text_toggle_portal"], 0, 0, canvasWidth, canvasHeight);
    UIManager.imageEffect(images["key_a"], 0, 0, canvasWidth, canvasHeight, {
      highlightOnlyHover: false,
      float: true,
    });
    UIManager.imageEffect(images["key_d"], 0, 0, canvasWidth, canvasHeight, {
      highlightOnlyHover: false,
      float: true,
    });
    UIManager.imageEffect(images["key_p"], 0, 0, canvasWidth, canvasHeight, {
      highlightOnlyHover: false,
      float: true,
    });
    UIManager.imageEffect(images["key_c"], 0, 0, canvasWidth, canvasHeight, {
      highlightOnlyHover: false,
      float: true,
    });
    UIManager.imageEffect(
      images["key_space"],
      0,
      0,
      canvasWidth,
      canvasHeight,
      {
        highlightOnlyHover: false,
        float: true,
      }
    );
    UIManager.imageEffect(images["key_e"], 0, 0, canvasWidth, canvasHeight, {
      highlightOnlyHover: false,
      float: true,
    });
    UIManager.imageEffect(images["mouse"], 0, 0, canvasWidth, canvasHeight, {
      highlightOnlyHover: false,
      float: true,
    });
    UIManager.imageEffect(
      images["text_press_any_key_to_start"],
      0,
      0,
      canvasWidth,
      canvasHeight,
      {
        highlightOnlyHover: false,
        float: true,
      }
    );
  }
}
