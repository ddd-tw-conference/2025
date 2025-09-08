const fs = require('fs')
const path = require('path')

const IMAGE_DIR = path.join(__dirname, '../public/images')
const TARGET_EXT = ['.png', '.jpg', '.jpeg', '.webp']
const MAX_SIZE = 200 * 1024 // 200KB

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) {
    console.log(`目錄不存在: ${dir}`)
    return
  }
  
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file)
    if (fs.statSync(filepath).isDirectory()) {
      walkDir(filepath, callback)
    } else {
      callback(filepath)
    }
  })
}

function getFileSize(filepath) {
  return fs.statSync(filepath).size
}

function main() {
  console.log('📊 圖片檔案大小盤點\n')
  
  const allImages = []
  const oversized = []
  
  walkDir(IMAGE_DIR, (filepath) => {
    const ext = path.extname(filepath).toLowerCase()
    if (TARGET_EXT.includes(ext)) {
      const size = getFileSize(filepath)
      const relativePath = path.relative(process.cwd(), filepath)
      
      allImages.push({ filepath: relativePath, size })
      
      if (size > MAX_SIZE) {
        oversized.push({ filepath: relativePath, size })
      }
    }
  })

  console.log('所有圖片檔案:')
  allImages.forEach(img => {
    const sizeKB = (img.size / 1024).toFixed(1)
    const status = img.size > MAX_SIZE ? '❌ 過大' : '✅ 合適'
    console.log(`  ${status} ${img.filepath} (${sizeKB} KB)`)
  })

  console.log('\n超過 200KB 的檔案:')
  if (oversized.length === 0) {
    console.log('  ✅ 所有檔案都在 200KB 以下')
  } else {
    oversized.forEach(img => {
      console.log(`  ❌ ${img.filepath} (${(img.size/1024).toFixed(1)} KB)`)
    })
  }
  
  console.log(`\n總結: ${allImages.length} 個圖片檔案，${oversized.length} 個需要壓縮`)
}

main()
