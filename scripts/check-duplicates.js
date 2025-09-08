const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const IMAGE_DIR = path.join(__dirname, '../public/images')
const TARGET_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.svg']

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file)
    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, callback)
    } else {
      callback(filepath)
    }
  })
}

function getFileHash(filepath) {
  const data = fs.readFileSync(filepath)
  return crypto.createHash('md5').update(data).digest('hex')
}

function main() {
  console.log('🔍 檢查重複圖片\n')
  
  const hashMap = {}
  
  walkDir(IMAGE_DIR, (filepath) => {
    const ext = path.extname(filepath).toLowerCase()
    if (TARGET_EXT.includes(ext)) {
      const hash = getFileHash(filepath)
      const relativePath = path.relative(process.cwd(), filepath)
      
      if (!hashMap[hash]) {
        hashMap[hash] = []
      }
      hashMap[hash].push(relativePath)
    }
  })

  const duplicates = Object.entries(hashMap).filter(([hash, files]) => files.length > 1)
  
  if (duplicates.length === 0) {
    console.log('✅ 沒有發現重複的圖片檔案')
  } else {
    console.log('❌ 發現重複的圖片檔案:')
    duplicates.forEach(([hash, files]) => {
      console.log(`\n  Hash: ${hash}`)
      files.forEach(file => console.log(`    - ${file}`))
    })
  }
  
  const totalFiles = Object.values(hashMap).flat().length
  console.log(`\n總結: 檢查了 ${totalFiles} 個圖片檔案，發現 ${duplicates.length} 組重複`)
}

main()
