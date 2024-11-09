function makeDivisible(num: number, by: number = 4) {
  if (num <= 0) return by
  let remainder = num % by // Находим остаток от деления на 4
  if (remainder !== 0) {
    return num + (by - remainder) // Добавляем разницу до 4, чтобы получить число, кратное 4
  } else {
    return num // Число уже делится на 4
  }
}

export default makeDivisible
