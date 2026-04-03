import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Width percentage - converts percentage to actual width
 * @param widthPercent - percentage of screen width (0-100)
 */
export const wp = (widthPercent: number): number => {
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

/**
 * Height percentage - converts percentage to actual height
 * @param heightPercent - percentage of screen height (0-100)
 */
export const hp = (heightPercent: number): number => {
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

/**
 * Responsive font size - scales font based on screen width
 * @param fontSize - base font size
 */
export const rfs = (fontSize: number): number => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Responsive spacing - scales spacing values based on screen dimensions
 * @param size - base size value
 */
export const rs = (size: number): number => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Moderately scale size - less aggressive scaling for larger values
 * @param size - base size value
 * @param factor - scaling factor (default: 0.5)
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  return Math.round(size + (scale - 1) * size * factor);
};

/**
 * Screen size breakpoints
 */
export const breakpoints = {
  isSmallDevice: SCREEN_WIDTH < 375,
  isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLargeDevice: SCREEN_WIDTH >= 414,
  isTablet: SCREEN_WIDTH >= 768,
};

/**
 * Get current screen dimensions
 */
export const screenDimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};
