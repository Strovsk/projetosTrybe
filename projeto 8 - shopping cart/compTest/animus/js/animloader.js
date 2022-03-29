function Import(url) {
  const script = document.createElement('script');
  script.src = url;
  script.type = 'module';
  document.head.appendChild(script);
}

const paths = ['animus', 'vector', 'entity', 'entity/ball'];
const scriptList = document.getElementsByTagName('script');
let relativePath;

for (let path of scriptList) {
  if (path.src.includes('animloader')) {
    relativePath = path.src.slice(0, -1 * ('/animloader.js'.length));
    break;
  }
}

// console.log(relativePath);
for (let path of paths) {
  Import(`${relativePath}/${path}.js`);
}
