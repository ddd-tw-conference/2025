/**
 * 議程投影片下載/檢視行為元件
 * 
 * 行為邏輯：
 * - 無投影片：不顯示
 * - 單一投影片：直接顯示下載/檢視按鈕
 * - 多個投影片：顯示選擇按鈕 + 展開選單
 * 
 * 設計原則：
 * - 禁止批次下載：每個投影片獨立下載
 * - 明確提示：可下載 vs 僅檢視
 * - 停止事件冒泡：避免觸發父層點擊事件
 */

'use client';

import { useState } from 'react';
import { SPEAKERS_DATA } from '@/lib/data/speakers';
import { getSegmentAssets, getSlideAction } from '@/lib/slides';
import { useI18n } from '@/contexts/i18n-context';

// 內部工具函式 - 避免影響其他檔案
function getSpeakerById(speakerId: string) {
  for (const topic of SPEAKERS_DATA) {
    const speaker = topic.speakers.find(s => s.id === speakerId);
    if (speaker) return speaker;
  }
  return null;
}

interface Props {
  segmentKey: string;
  speakerIds: string[];
}

export function SegmentSlideAction(props: Props) {
  const { t } = useI18n();
  const assets = getSegmentAssets(props.segmentKey, props.speakerIds);

  if (assets.length === 0) return null;

  const [open, setOpen] = useState(false);
  const isSingle = assets.length === 1;
  const single = isSingle ? assets[0] : null;
  const singleAction = single ? getSlideAction(single) : null;

  // 單一投影片：直接顯示按鈕
  if (isSingle && single && singleAction && singleAction.url && singleAction.mode !== 'none') {
    const speaker = getSpeakerById(single.speakerId);
    const isViewOnly = singleAction.mode === 'view';
    
    return (
      <div id={`slides-${props.segmentKey}`} className="mt-2">
        <a
          href={singleAction.url}
          rel="noopener"
          target={isViewOnly ? '_blank' : undefined}
          onClick={e => e.stopPropagation()}
          className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none"
        >
          {isViewOnly ? t('slides.cta.view') : t('slides.cta.download')}
        </a>
        {isViewOnly && (
          <p className="mt-1 text-[11px] text-blue-700">{t('slides.notice.viewOnly')}</p>
        )}
        {speaker && (
          <p className="mt-1 text-[11px] text-blue-700">
            {t('slides.speaker.label')} {speaker.name['zh-tw']}
          </p>
        )}
      </div>
    );
  }

  // 多個投影片：顯示選擇按鈕 + 展開選單
  return (
    <div id={`slides-${props.segmentKey}`} className="relative mt-2">
      <button
        type="button"
        onClick={e => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="inline-flex items-center rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none"
      >
        {t('slides.cta.choose')}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute z-10 mt-2 w-72 rounded border border-blue-200 bg-blue-50 p-3 shadow"
          onClick={e => e.stopPropagation()}
        >
          <p className="mb-2 text-[11px] font-semibold text-blue-800">{t('slides.menu.title')}</p>
          <ul className="space-y-2">
            {assets.map(a => {
              const action = getSlideAction(a);
              if (!action.url || action.mode === 'none') return null;
              const speaker = getSpeakerById(a.speakerId);
              const isViewOnly = action.mode === 'view';
              
              return (
                <li key={`${a.segmentKey}-${a.speakerId}`} className="flex items-start justify-between">
                  <div className="flex-1">
                    {speaker && (
                      <p className="text-[11px] text-blue-700">
                        {t('slides.speaker.label')} {speaker.name['zh-tw']}
                      </p>
                    )}
                    {!speaker && <p className="text-[11px] text-orange-700">{t('slides.unknown-speaker')}</p>}
                    <p className="text-[11px] text-blue-900">{t(a.titleKey)}</p>
                    {isViewOnly && (
                      <p className="text-[11px] text-blue-600">{t('slides.notice.viewOnly')}</p>
                    )}
                  </div>
                  <a
                    href={action.url}
                    rel="noopener"
                    target={isViewOnly ? '_blank' : undefined}
                    className="ml-2 rounded bg-blue-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-blue-700 focus:outline-none"
                  >
                    {isViewOnly ? t('slides.cta.view') : t('slides.cta.download')}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-2">
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="rounded bg-blue-100 px-2 py-1 text-[11px] text-blue-800 hover:bg-blue-200 focus:outline-none"
            >
              {t('slides.menu.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
