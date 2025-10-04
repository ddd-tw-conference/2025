# Agenda 時間調整計畫（13:00 → 13:30）

本文件描- **檢查 AgendaLightbox 的時間計算機制**

關鍵發現：`components/ui/agenda-lightbox.tsx` 使用 `calculateSegmentTimes` 函數來計算 segments 的時間範圍，它會從 `session.time.split(' - ')[0]` 取得開始時間，然後根據每個 segment 的 duration 來計算實際時間。因此：

- ✅ **好消息**：只需修改頂層 `time` 字串，所有 segments 的相對時間會自動調整
- ❌ **注意**：不要修改 segments 的 duration 欄位，否則會影響時間計算

```powershell
# 驗證指令：搜尋時間相關的元件
Select-String -Path .\components\ui\agenda-lightbox.tsx -Pattern "calculateSegmentTimes|session.time" -Context 3
```以最小修改原則，安全地將原本時間為 `13:00 - 16:00` 的兩個議題往後延遲 30 分鐘（變為 `13:30 - 16:30`），包含 cascade 處理、驗證步驟、回滾策略與相關注意事項。

---

## 變更背景與目標

- 目標：將兩筆位於 `lib/data/agenda.ts` 的議題（原 time 為 `13:00 - 16:00`）同時改為 `13:30 - 16:30`。
- 原則：最小修改，優先修改資料層（`lib/data/agenda.ts`），不改 UI/Lightbox 邏輯；若發現 Lightbox 以 segments 計算 start/end，視情況再做補充修改。

---

## 詳細執行步驟（建議順序）

1. 建立分支與 snapshot（保險）

```powershell
git checkout -b chore/shift-13-00-to-13-30
git add -A
git commit -m "chore: snapshot before agenda time shift"
```

2. 套用最小修改（只修改 `time` 顯示字串）

在 `lib/data/agenda.ts` 找到對應議題，將：

```diff
-    time: "13:00 - 16:00",
+    time: "13:30 - 16:30",
```

3. 搜尋並確認專案中沒有遺漏相同時間字串

```powershell
Select-String -Path .\* -Pattern "13:00 - 16:00" -SimpleMatch -List | Select-Object Path,LineNumber,Line
```

4. 檢查 AgendaLightbox / page 的時間計算方式

- 搜尋使用 `session.time`、`segments`、`start`、`end` 的元件，確認是否需要同步更新 segment 的 start 欄位：

```powershell
Select-String -Path .\app\**\*.{tsx,ts,js,jsx} -Pattern "session.time|segments|start|end" -List | Select-Object Path,LineNumber,Line
```

5. 本地驗證（重要！）

```powershell
pnpm install
pnpm dev
# 在瀏覽器檢查以下項目：
# 1. http://localhost:3000/agenda - 議程頁時間顯示
# 2. 點擊議程卡片開啟 Lightbox - 檢查 segments 時間計算
# 3. 右鍵 > 檢視原始碼 - 搜尋 "startDate" 檢查 JSON-LD 是否正確
```

6. Build/測試

```powershell
pnpm build
pnpm test
```

7. 提交並推送

```powershell
git add lib/data/agenda.ts
git commit -m "chore(agenda): shift 13:00-16:00 topics to 13:30-16:30"
git push --set-upstream origin chore/shift-13-00-to-13-30
```

8. Cascade（如有衝突）

- 若此變更造成後續場次時間衝突，請以手動小幅調整為主（建議）。
- 若需要大量調整，可在此 branch 新增 `scripts/shift-agenda-by-minutes.js` 來自動批次移動（預先在 branch 上測試）。

---

## 驗收標準

- [ ] `lib/data/agenda.ts` 兩筆 time 已修改為 `13:30 - 16:30`
- [ ] 議程頁時間顯示正確（主版面 + Lightbox segments）
- [ ] **JSON-LD structured data 正確**（檢查 subEvent startDate）
- [ ] build & test 通過（若有 snapshot 失敗已更新）
- [ ] **性能檢查**：`pnpm build:analyze` 確認 bundle size 無異常增長
- [ ] 變更已提交並 merge 到 main

---

## 風險與緩解

- 風險：UI 可能會依賴 segments 做細節時間計算 → 緩解：先搜尋元件使用情況，必要時同步更新 segments。 
- 風險：時間字串被硬編碼在多處 → 緩解：搜尋所有同字串並一併處理。
- 回滾：使用 git revert 或 `git checkout -- lib/data/agenda.ts`。

---

## 其他注意（我在原版本可能沒寫清楚的）

- 時區與格式：確認 `lib/data/agenda.ts` 中使用的是 local display 字串（`HH:mm`）而非帶時區的 ISO 字串。若系統在不同時區有使用者，請檢查前端如何 format 與顯示（建議使用 locale-aware formatting，且不要硬編碼時區）。

- **結構化資料（Structured Data / SEO）**：重要！在 `lib/structured-data.ts` 的 `generateEventStructuredData` 中，`subEvent` 欄位直接讀取 `session.time.split(' - ')[0]` 來產生 `startDate`。更改後必須檢查：
  - `generateEventStructuredData` 的 subEvent 部分是否正確反映新時間
  - Google Search Console 的 Event schema 驗證是否通過
  - 搜尋引擎收錄的時間資訊是否正確

- 瀏覽器快取：若本機開發時煙存有舊版本，請清除瀏覽器快取或使用無痕模式 / Ctrl+Shift+R 強制重新整理，確保能看到新的議程時間。

- i18n：時間顯示通常不需要翻譯文字，但若你在 UI 內有 hard-coded 文案（例如 "starts at 13:00"），確保改為使用 `t()` 並在各語系中更新對應翻譯值（避免在多處硬改時間）。

- 通知流程：時間調整可能牽涉講者、工程師與行銷，建議同步通知：
	- 行銷/社群：是否要更新議程頁或宣傳素材
	- 講者：告知講者新的開始/結束時間
	- 開發：PR 描述中註明變更原因與驗收方式

- **測試與 Snapshot**：專案使用 Next.js 15.5.2 + React 19，若有 Jest/Vitest snapshot 或 Playwright e2e 測試，時間字串變更可能導致測試失敗。請執行：
  ```powershell
  # 搜尋測試檔案
  Select-String -Path .\* -Pattern "13:00|snapshot|toMatchSnapshot" -List
  # 若有 snapshot 失敗，更新它們
  pnpm test -- --updateSnapshot
  ```

- 搜尋模式擴充：除了精確的 `"13:00 - 16:00"`，也建議搜尋 `"13:00"` 與 `"16:00"`，或更寬鬆的正規表達式以免遺漏（例如 `13:00` 單獨出現於注釋或說明中也要評估是否需要同步修改）。

---

---

## TODO-List

- [ ] 建立分支並 snapshot
- [ ] 修改 `lib/data/agenda.ts`（兩筆 time）
- [ ] **重要**：檢查 `lib/structured-data.ts` 的 subEvent 時間計算
- [ ] 本地啟動並驗證（檢查 Lightbox 時間顯示）
- [ ] **新增**：測試 structured data：`pnpm dev` 後檢查 `view-source` 的 JSON-LD
- [ ] build & test（若有 snapshot 失敗請更新）
- [ ] commit & push


---

如需我立刻在工作區套用修改並執行驗證（包含啟動 dev 並回報畫面結果），請回覆「套用並執行」，我會在同一個操作中回報每一步的輸出與結論。