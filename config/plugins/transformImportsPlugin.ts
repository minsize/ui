import { Plugin } from "vite"
import path from "path"

export default function transformImportsPlugin(options: {
  baseDir: string
}): Plugin {
  const { baseDir } = options
  const componentMapping: Record<string, string> = {
    Button: path.resolve(baseDir, "src/default/Blocks/Button"),
    Text: path.resolve(baseDir, "src/default/templates/Text"),
    Flex: path.resolve(baseDir, "src/default/Blocks/Flex"),
    Events: path.resolve(baseDir, "src/default/templates/Events"),
    // Добавьте другие компоненты сюда, если нужно
  }

  return {
    name: "transform-imports",
    transform(code, id) {
      const importRegex = /import\s*{(.*?)}\s+from\s+['"]ui['"]/g
      let newCode = code
      let match

      while ((match = importRegex.exec(code)) !== null) {
        const importedComponents = match[1].split(",").map((s) => s.trim())
        const newImports = importedComponents
          .map((component) => {
            const componentPath = componentMapping[component]
            if (!componentPath) {
              console.warn(
                `Component '${component}' not found in mapping. Skipping.`,
              )
              return "" // Пропускаем, если компонент не найден
            }
            const relativePath = path.relative(path.dirname(id), componentPath)
            return `import { ${component} } from '${relativePath}';`
          })
          .join("\n")

        newCode = newCode.replace(match[0], newImports)
      }

      return newCode
    },
  }
}
