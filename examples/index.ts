import { argv, exit } from "process";
import fs from "fs/promises"
import { spawn } from "child_process";

const example = argv[2] as string

fs.readdir('examples')
  .then(files => files.filter(file => file.endsWith('.ts') && !file.startsWith('index')))
  .then(files => files.map(file => file.replace('.ts', '')))
  .then(examples => { if(!examples.includes(example)) throw examples })
  .then(() => spawn('node', [`${example}.js`], { stdio: 'inherit', cwd: 'dist/examples' }))
  .catch((examples: Array<string>) => {
    console.log(`Choose an example from the list:\n${examples.map(file => `\n   - ${file}`).join('')}\n`)
    exit(1)
  })
