## Group
Компонент используется для группировки контента

```jsx
const Example = () => {
  return (
    <Group
      header={<Group.Header>Header</Group.Header>}
      footer={<Group.Footer>Footer</Group.Footer>}
    >
      <Cell.List>
        <Cell>Павел Дуров</Cell>
        <Cell>Илон Маск</Cell>
        <Cell>Петя Камушкин</Cell>
      </Cell.List>
    </Group>
  )
}
```

