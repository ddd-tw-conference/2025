/**
 * 主應用配置管理
 * 遵循 Vibe-Coding 原則：集中化配置，避免魔法字串分散
 */

// 基礎常數
const BASE_PATH = '/2025'
const DOMAIN = 'ddd-tw-conference.github.io'
const CONFERENCE_YEAR = 2025
const CONFERENCE_NAME = 'DDDTW 2025'
const CONFERENCE_THEME = 'AI時代軟體開發方法'
const ORGANIZATION = 'DDDesign TW'

export const CONFIG = {
  // 部署配置
  deployment: {
    basePath: BASE_PATH,
    domain: DOMAIN,
    baseUrl: `https://${DOMAIN}${BASE_PATH}`
  },

  // 會議基本資訊
  conference: {
    year: CONFERENCE_YEAR,
    name: CONFERENCE_NAME,
    fullName: `${CONFERENCE_NAME} - ${CONFERENCE_THEME}`,
    theme: CONFERENCE_THEME,
    date: {
      year: CONFERENCE_YEAR,
      month: 11,
      day: 8,
      formatted: `${CONFERENCE_YEAR}年11月8日`,
      iso: `${CONFERENCE_YEAR}-11-08`,
      display: `${CONFERENCE_YEAR} / 11 / 08`
    },
    organization: ORGANIZATION,
    copyright: `© ${CONFERENCE_YEAR} ${ORGANIZATION}. All rights reserved.`
  }
}

// 類型導出，提供 TypeScript 支持
export type Config = typeof CONFIG
export type DeploymentConfig = typeof CONFIG.deployment
export type ConferenceConfig = typeof CONFIG.conference
