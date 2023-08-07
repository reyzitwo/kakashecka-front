const fs = require("fs");
const path = require("path");
const watch = require("watch");

const targetDir1 = path.join(__dirname, "/src/components/__global");
const targetDir2 = path.join(__dirname, "/src/components/views");

// Функция, которая будет выполняться при создании папок
function onDirectoryCreate(path, targetDir) {
  if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
    // Вызываем функцию для создания файлов внутри папки ComponentName
    createFilesInComponentFolder(path, targetDir);
  }
}

// Функция для создания файлов внутри папки ComponentName
function createFilesInComponentFolder(path, targetDir) {
  const componentName = path.match(/\/([^/]+)\/?$/)[1];

  const files = [
    {
      name: `${componentName}.tsx`,
      content:
        targetDir === targetDir1
          ? generateComponentFileContent1(componentName)
          : generateComponentFileContent2(componentName),
    },
    {
      name: `${componentName}.interface.ts`,
      content: generateInterfaceFileContent(componentName),
    },
    {
      name: `${componentName}.scss`,
      content: generateScssFileContent(componentName),
    },
  ];

  files.forEach((file, i) => {
    if (i === 1 && targetDir === targetDir2) return;
    fs.writeFileSync(`${path}/${file.name}`, file.content);
  });

  // Добавляем импорт компонента в файл index.ts
  addToIndexFile(componentName, targetDir);
}

// Функции для генерации содержимого файлов
function generateComponentFileContent1(componentName) {
  return `import { FC } from "react";
import { clsx } from "clsx"

import Props from "./${componentName}.interface.ts"

import "./${componentName}.scss"

const ${componentName}: FC<Props> = ({ className }) => {
    return <div className={clsx("${componentName}", className)}></div>
}

export default ${componentName};
`;
}

function generateComponentFileContent2(componentName) {
  return `import "./${componentName}.scss"

const ${componentName} = () => {
    return <div className={componentName}></div>
}

export default ${componentName};
`;
}

function generateInterfaceFileContent(componentName) {
  return `export default interface ${componentName} {
    className?: string
}
`;
}

function generateScssFileContent(componentName) {
  return `.${componentName} {}
`;
}

// Функция для добавления импорта компонента в файл index.ts
function addToIndexFile(componentName, targetDir) {
  const indexFilePath = path.join(targetDir, "index.ts");
  const importStatement = `export { default as ${componentName} } from "./${componentName}/${componentName}";\n`;

  fs.appendFileSync(indexFilePath, importStatement);
}

// Начинаем отслеживать изменения в директории
watch.createMonitor(targetDir1, function (monitor) {
  monitor.on("created", (path) => onDirectoryCreate(path, targetDir1));
});

watch.createMonitor(targetDir2, function (monitor) {
  monitor.on("created", (path) => onDirectoryCreate(path, targetDir2));
});

console.log(
  "Расширение для автоматического создания файлов и папок активировано!"
);
