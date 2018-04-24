const fs = require('fs');
const types = require('ast-types');
const babylon = require('babylon');
const traverse = require('babel-traverse');
const generate = require('@babel/generator');
const getAst = function (filePath) {
    let code = fs.readFileSync(filePath, {
        encoding: 'utf8'
    });
    let result = [];
    let ast;
    try {
        ast = babylon.parse(code, {
            allowImportExportEverywhere: true,
            plugins: ['jsx', 'objectRestSpread', 'decorators', 'exportExtensions', 'classProperties']
        });
    } catch (e) {
        console.error('parse file error', filePath);
        throw e;
    }
    traverse.default(ast, {
        enter(path){
            if(path.node.value == 'require'){
                path.node.value = 'hahah';
            }
        }
    })
    let parseResult = generate.default(ast, {sourceMaps: true}, code)
    console.log(parseResult)
    fs.writeFile('new_learn_ast.js', parseResult.code,(err) => {
        if(err) throw err;
        console.log('The file has been saved!')
    })
}
// getAst("./dynamic_xml.xml")
getAst("./learn_ast.js")