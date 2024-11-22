export type TextObject = {
  /**
   * Цвет текста.
   */
  color: "accent" | "primary" | "secondary" | "inherit"
  /**
   * Размер текста.
   */
  size: "small" | "medium" | "large" | "x-large" | "xx-large"
  /**
   * Жирность шрифта.
   */
  weight: "400" | "500" | "600" | "700"
  /**
   * Выравнивание текста.
   */
  align?: "start" | "center" | "end"
}
