const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const IMAGE_DIR = path.join(__dirname, '../public/images')
const TARGET_EXT = ['.png', '.jpg', '.jpeg']
const MAX_SIZE = 200 * 1024 // 200KB

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

function getFileSize(filepath) {
  return fs.statSync(filepath).size
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  if (!TARGET_EXT.includes(ext)) return

  const size = getFileSize(inputPath)
  const relativePath = path.relative(process.cwd(), inputPath)
  
  console.log(`\n處理: ${relativePath} (${(size/1024).toFixed(1)} KB)`)

  // 生成 WebP 輸出路徑
  const outputPath = inputPath.replace(ext, '.webp')
  
  try {
    // 嘗試不同的壓縮等級
    const qualities = [85, 75, 65, 55]
    
    for (const quality of qualities) {
      await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toFile(outputPath)
      
      const newSize = getFileSize(outputPath)
      const newSizeKB = (newSize / 1024).toFixed(1)
      
      console.log(`  品質 ${quality}: ${newSizeKB} KB`)
      
      if (newSize <= MAX_SIZE) {
        console.log(`  ✅ 成功! ${path.basename(inputPath)} → ${path.basename(outputPath)}`)
        console.log(`  📉 大小從 ${(size/1024).toFixed(1)} KB 減少到 ${newSizeKB} KB`)
        return
      }
    }
    
    console.log(`  ⚠️  即使最低品質也無法達到 200KB 以下，但已盡力壓縮`)
    
  } catch (error) {
    console.error(`  ❌ 錯誤: ${error.message}`)
  }
}

async function main() {
  console.log('🔧 開始圖片優化處理\n')
  
  const oversized = []
  
  walkDir(IMAGE_DIR, (filepath) => {
    const ext = path.extname(filepath).toLowerCase()
    if (TARGET_EXT.includes(ext)) {
      const size = getFileSize(filepath)
      if (size > MAX_SIZE) {
        oversized.push(filepath)
      }
    }
  })

  if (oversized.length === 0) {
    console.log('✅ 沒有需要壓縮的檔案')
    return
  }

  console.log(`找到 ${oversized.length} 個需要壓縮的檔案`)

  for (const filepath of oversized) {
    await optimizeImage(filepath)
  }
  
  console.log('\n🎉 圖片優化完成!')
}

main().catch(console.error)
