const fs = require("fs");
const path = require("path");
const env = require("dotenv").config().parsed;

class PrepareProject {
  // Define `apply` as its prototype method which is supplied with compiler as its argument
  apply(compiler) {
    // Specify the event hook to attach to
    compiler.hooks.afterEmit.tap("PrepareProject", (compilation) => {
      // create group folder
      fs.mkdirSync(
        path.resolve(compiler.context, env.PATH, env.COMPONENT_TYPE, env.COMPONENT_GROUP),
        { recursive: true }
      );
      let files = fs.readdirSync(__dirname);
      files.forEach((file) => {
        if (file.match(/\.env\..*/)){
          let componentENV = require("dotenv").config({path: path.resolve(__dirname, file)}).parsed;
          this.generateComponent(compiler, env, componentENV);
        }
      })
      this.generateDependeicies(compiler, env);
    });
  }
  generateComponent = (compiler, env, componentENV) => {
    let basePath = path.resolve(compiler.context, env.PATH, env.COMPONENT_TYPE, env.COMPONENT_GROUP);
    // create base folder
    fs.mkdirSync(basePath,{ recursive: true});
    // create component folder
    fs.mkdirSync(path.resolve(basePath, componentENV.COMPONENT_NAME),{ recursive: true});
    // generate blade
    fs.writeFileSync(
      path.resolve( basePath, componentENV.COMPONENT_NAME, `${componentENV.ID}.blade.php`),
      this.prepareBlade(compiler, componentENV)
    )
    // generate php
    fs.writeFileSync(
      path.resolve( basePath, componentENV.COMPONENT_NAME, `${componentENV.ID}.php`),
      this.preparePHP(compiler, env, componentENV)
    );
  }
  generateDependeicies = (compiler, env) => {
    let basePath = path.resolve(compiler.context, env.PATH, env.COMPONENT_TYPE, env.COMPONENT_GROUP);
    // create base folder
    fs.mkdirSync(basePath,{ recursive: true});
    // generate tsx
    fs.writeFileSync(
      path.resolve( basePath, `${env.GROUP_ID}.tsx`),
      this.prepareTSX(compiler)
    );
    // copy scss
    fs.copyFileSync(
      path.resolve(compiler.context, "src/index.scss"),
      path.resolve(basePath, `${env.GROUP_ID}.scss`)
    );
  }
  preparePHP = (compiler, env, componentENV) => {
    let phpContent = fs.readFileSync(path.resolve(compiler.context, "component/component.txt"), "utf8");
    phpContent = phpContent.replace(/process\.env\.ID/gmu, componentENV.ID);
    phpContent = phpContent.replace(/process\.env\.GROUP_ID/gmu, env.GROUP_ID);
    phpContent = phpContent.replace(/process\.env\.COMPONENT_NAME/gmu, componentENV.COMPONENT_NAME);
    phpContent = phpContent.replace(/process\.env\.COMPONENT_DESCRIPTION/gmu, componentENV.COMPONENT_DESCRIPTION);
    phpContent = phpContent.replace(/process\.env\.COMPONENT_TYPE/gmu, env.COMPONENT_TYPE);
    phpContent = phpContent.replace(/process\.env\.COMPONENT_GROUP/gmu, env.COMPONENT_GROUP);
    return phpContent;
  };
  prepareTSX = (compiler) => {
    let tsxContent = fs.readFileSync(
      path.resolve(compiler.context, "src/index.tsx"),
      "utf8"
    );
    tsxContent = tsxContent.replace(/import "\.\/index\.scss";(?:\r\n|\r|\n)/ui, "");
    return tsxContent;
  };
  prepareBlade = (compiler, componentENV) => {
    let bladeContent = fs.readFileSync(
      path.resolve(compiler.context, `src/${componentENV.COMPONENT_NAME}/index.blade.php`),
      "utf8"
    )
    bladeContent = bladeContent.replace(/^<link.*>(?:\r\n|\r|\n)/ui, "");
    bladeContent = bladeContent.replace(/<script.*$/ui, "");
    return bladeContent;
  };
}

module.exports = PrepareProject;
