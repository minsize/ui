
## Plug (Аналог Placeholder из VKUI)
Компонент используется для каких-либо заглушек: например, в случае отсутствия элементов в списке или ошибки.

```jsx
const Example = () => {
  return (
    <Plug full>
      <Plug.Container>
        <Plug.Title>Title</Plug.Title>
        <Plug.SubTitle>SubTitle</Plug.SubTitle>
      </Plug.Container>
      <Plug.Icon>
        <IconElumTeam color={"white"} height={28} />
      </Plug.Icon>
      <Plug.Action>
        <button>Тут Кнопка</button>
      </Plug.Action>
    </Plug>
  )
}

```