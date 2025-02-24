const WINDOW_WIDTH = 350;
const WINDOW_HEIGHT =
  (24 * 2) +  // 2 rows of 24px height buttons
  4 +         // 4px of space between button rows
  (24 * 2);   // top and bottom padding of 24px around buttons
const CURSOR_OFFSET_X = -(WINDOW_WIDTH / 2); // window should be centered horizontally on the cursor
const CURSOR_OFFSET_Y = 10; // window should be a little below the cursor

module.exports = {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  CURSOR_OFFSET_X,
  CURSOR_OFFSET_Y
};
