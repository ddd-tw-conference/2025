const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const IMAGE_DIR = path.join(__dirname, '../public/images')
const TARGET_EXT = ['.png', '.jpg', '.jpeg']

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

async function convertToWebP(inputPath) {
  const ext = path.extname(inputPath).toLowerCase()
  if (!TARGET_EXT.includes(ext)) return

  const size = getFileSize(inputPath)
  const relativePath = path.relative(process.cwd(), inputPath)
  
  console.log(`\n處理: ${relativePath} (${(size/1024).toFixed(1)} KB)`)

  // 生成 WebP 輸出路徑
  const outputPath = inputPath.replace(ext, '.webp')
  
  // 如果WebP已存在，檢查是否需要更新
  if (fs.existsSync(outputPath)) {
    const inputStat = fs.statSync(inputPath)
    const outputStat = fs.statSync(outputPath)
    
    if (outputStat.mtime > inputStat.mtime) {
      console.log(`  ⏭️  WebP已存在且較新，跳過`)
      return
    }
  }
  
  try {
    // 針對不同類型圖片使用不同品質設定
    let quality = 85
    
    // 大型圖片使用較低品質以減少檔案大小
    if (size > 200 * 1024) {
      quality = 75
    }
    // 小型圖片使用較高品質以保持清晰度
    else if (size < 50 * 1024) {
      quality = 90
    }
    
    await sharp(inputPath)
      .webp({ quality, effort: 6 })
      .toFile(outputPath)
    
    const newSize = getFileSize(outputPath)
    const newSizeKB = (newSize / 1024).toFixed(1)
    const savings = ((size - newSize) / size * 100).toFixed(1)
    
    console.log(`  ✅ 成功! ${path.basename(inputPath)} → ${path.basename(outputPath)}`)
    console.log(`  📉 大小從 ${(size/1024).toFixed(1)} KB 減少到 ${newSizeKB} KB (節省 ${savings}%)`)
    
  } catch (error) {
    console.error(`  ❌ 錯誤: ${error.message}`)
  }
}

async function main() {
  console.log('🔧 開始為所有圖片產生WebP版本\n')
  
  const imageFiles = []
  
  walkDir(IMAGE_DIR, (filepath) => {
    const ext = path.extname(filepath).toLowerCase()
    if (TARGET_EXT.includes(ext)) {
      imageFiles.push(filepath)
    }
  })

  if (imageFiles.length === 0) {
    console.log('❌ 沒有找到圖片檔案')
    return
  }

  console.log(`找到 ${imageFiles.length} 個圖片檔案`)

  for (const filepath of imageFiles) {
    await convertToWebP(filepath)
  }
  
  console.log('\n🎉 WebP轉換完成!')
  console.log('\n📊 建議接下來：')
  console.log('1. 更新程式碼使用WebP版本')
  console.log('2. 考慮移除原始PNG/JPG檔案以節省空間')
  console.log('3. 運行 node scripts/check-image-sizes.js 檢查結果')
}

main().catch(console.error)
