import { describe, expect, it, vi } from "vitest"
import { render } from "solid-testing-library"
import Align from "./Align.jsx" // Путь к вашему компоненту
import style from "./Align.module.css" // Путь к вашим стилям
import { Show } from "../index.js"

describe("Align", () => {
  it("должен рендерить базовый компонент", () => {
    const { queryByText } = render(() => (
      <Align
        children={({ Before, Children, After }) => (
          <>
            <Before children="Before" />
            <Children children="Children" />
            <After children="After" />
          </>
        )}
      />
    ))

    expect(queryByText("Before")).toBeTruthy()
    expect(queryByText("Children")).toBeTruthy()
    expect(queryByText("After")).toBeTruthy()
  })

  it("должен рендерить с дополнительными стилями", () => {
    const { queryByText } = render(() => (
      <Align
        class="custom-class"
        classList={{ customClass: true }}
        children={({ Before, Children, After }) => (
          <>
            <Before children="Before" />
            <Children children="Children" />
            <After children="After" />
          </>
        )}
      />
    ))

    expect(queryByText("Before")).toBeTruthy()
    expect(queryByText("Children")).toBeTruthy()
    expect(queryByText("After")).toBeTruthy()
    expect(Show).toHaveBeenCalledWith(
      expect.objectContaining({
        class: style.Align__before,
        component: "span",
        classList: expect.objectContaining({
          customClass: true,
          "custom-class": true,
        }),
      }),
    )
    expect(Show).toHaveBeenCalledWith(
      expect.objectContaining({
        class: style.Align__children,
        classList: expect.objectContaining({
          customClass: true,
          "custom-class": true,
        }),
      }),
    )
    expect(Show).toHaveBeenCalledWith(
      expect.objectContaining({
        class: style.Align__after,
        component: "span",
        classList: expect.objectContaining({
          customClass: true,
          "custom-class": true,
        }),
      }),
    )
  })
})
