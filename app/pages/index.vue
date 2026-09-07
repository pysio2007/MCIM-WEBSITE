<script setup lang="ts">
interface StatsData {
  curseforge: { mod: number; file: number }
  modrinth: { project: number; version: number; file: number }
  translate: { curseforge: number; modrinth: number }
}

useHead({ title: 'MCIM — Minecraft Mod 镜像加速' })

const { data: stats } = await useFetch<StatsData>('/api/statistics')

function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k'
  return num.toString()
}

const modrinthPercent = computed(() => {
  if (!stats.value) return 0
  return Math.min((stats.value.translate.modrinth / stats.value.modrinth.project) * 100, 100)
})

const curseforgePercent = computed(() => {
  if (!stats.value) return 0
  return Math.min((stats.value.translate.curseforge / stats.value.curseforge.mod) * 100, 100)
})
</script>

<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">
        Minecraft Mod <span class="mcim-nowrap">信息镜像</span>
      </h1>
      <p class="govuk-body-l">
        为中国大陆用户提供稳定、快速的 Minecraft Mod 信息镜像服务，支持 Modrinth 和 CurseForge API，完全兼容官方接口。
      </p>
      <div class="govuk-button-group">
        <a
          href="https://mod.mcimirror.top/docs"
          class="govuk-button"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          data-module="govuk-button"
        >
          查看 API 文档
        </a>
        <NuxtLink to="/sponsor" class="govuk-link">赞助支持</NuxtLink>
        <a
          href="https://github.com/mcmod-info-mirror"
          class="govuk-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>

  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-8">

  <div class="govuk-grid-row govuk-!-margin-top-8 mcim-stat-grid">
    <div class="govuk-grid-column-full">
      <h2 class="govuk-heading-l">缓存统计</h2>
    </div>

    <div class="govuk-grid-column-one-half mcim-stat-column">
      <div class="mcim-stat-panel">
        <span class="govuk-caption-m">Modrinth</span>
        <p class="govuk-heading-l govuk-!-margin-bottom-1">
          {{ stats ? formatNumber(stats.modrinth.project) : '—' }}
        </p>
        <p class="govuk-body govuk-!-margin-bottom-4">个项目已缓存</p>

        <dl class="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-2">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key govuk-body-s">版本数</dt>
            <dd class="govuk-summary-list__value govuk-body-s">
              {{ stats ? formatNumber(stats.modrinth.version) : '—' }}
            </dd>
          </div>
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key govuk-body-s">文件数</dt>
            <dd class="govuk-summary-list__value govuk-body-s">
              {{ stats ? formatNumber(stats.modrinth.file) : '—' }}
            </dd>
          </div>
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key govuk-body-s">已翻译</dt>
            <dd class="govuk-summary-list__value govuk-body-s">
              {{ stats ? formatNumber(stats.translate.modrinth) : '—' }}
              <span v-if="stats"> ({{ modrinthPercent.toFixed(1) }}%)</span>
            </dd>
          </div>
        </dl>

        <div
          class="mcim-progress"
          role="progressbar"
          :aria-valuenow="modrinthPercent"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`Modrinth 翻译进度 ${modrinthPercent.toFixed(1)}%`"
        >
          <div class="mcim-progress__fill mcim-progress__fill--modrinth" :style="{ width: modrinthPercent + '%' }" />
        </div>
      </div>
    </div>

    <div class="govuk-grid-column-one-half mcim-stat-column">
      <div class="mcim-stat-panel">
        <span class="govuk-caption-m">CurseForge</span>
        <p class="govuk-heading-l govuk-!-margin-bottom-1">
          {{ stats ? formatNumber(stats.curseforge.mod) : '—' }}
        </p>
        <p class="govuk-body govuk-!-margin-bottom-4">个 Mod 已缓存</p>

        <dl class="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-2">
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key govuk-body-s">文件数</dt>
            <dd class="govuk-summary-list__value govuk-body-s">
              {{ stats ? formatNumber(stats.curseforge.file) : '—' }}
            </dd>
          </div>
          <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key govuk-body-s">已翻译</dt>
            <dd class="govuk-summary-list__value govuk-body-s">
              {{ stats ? formatNumber(stats.translate.curseforge) : '—' }}
              <span v-if="stats"> ({{ curseforgePercent.toFixed(1) }}%)</span>
            </dd>
          </div>
        </dl>

        <div
          class="mcim-progress"
          role="progressbar"
          :aria-valuenow="curseforgePercent"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-label="`CurseForge 翻译进度 ${curseforgePercent.toFixed(1)}%`"
        >
          <div class="mcim-progress__fill mcim-progress__fill--curseforge" :style="{ width: curseforgePercent + '%' }" />
        </div>
      </div>
    </div>
  </div>

  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-8">

  <div class="govuk-grid-row govuk-!-margin-top-8">
    <div class="govuk-grid-column-two-thirds">
      <h2 class="govuk-heading-l">为什么选择 MCIM？</h2>
      <p class="govuk-body">我们提供稳定、快速的 Minecraft Mod 信息镜像服务，让你的下载更加顺畅。</p>
    </div>
  </div>

  <div class="govuk-grid-row govuk-!-margin-top-4 govuk-!-margin-bottom-8">
    <div class="govuk-grid-column-one-half">
      <div class="govuk-summary-card">
        <div class="govuk-summary-card__title-wrapper">
          <h3 class="govuk-summary-card__title">镜像服务</h3>
          <span class="govuk-tag govuk-tag--blue govuk-!-font-size-14">Mirror</span>
        </div>
        <div class="govuk-summary-card__content">
          <p class="govuk-body">
            提供 Modrinth 和 CurseForge 的完整镜像，确保你能快速访问所需的 Mod 信息和文件。
          </p>
          <ul class="govuk-list govuk-list--bullet">
            <li>实时同步最新数据</li>
            <li>高可用性保障</li>
            <li>完整的 API 支持</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="govuk-grid-column-one-half">
      <div class="govuk-summary-card">
        <div class="govuk-summary-card__title-wrapper">
          <h3 class="govuk-summary-card__title">加速访问</h3>
          <span class="govuk-tag govuk-tag--green govuk-!-font-size-14">Fast</span>
        </div>
        <div class="govuk-summary-card__content">
          <p class="govuk-body">
            通过优秀的 CDN 和缓存，大幅提升 Mod 信息查询和文件下载速度。
          </p>
          <ul class="govuk-list govuk-list--bullet">
            <li>智能缓存机制</li>
            <li>CDN 全球加速</li>
            <li>毫秒级响应时间</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

  <div class="govuk-grid-row govuk-!-margin-top-8">
    <div class="govuk-grid-column-full">
      <h2 class="govuk-heading-l">API 替换示例</h2>
      <p class="govuk-body">只需将原始 API 端点替换为镜像地址，其他代码无需任何改动。</p>

      <details class="govuk-details" data-module="govuk-details">
        <summary class="govuk-details__summary">
          <span class="govuk-details__summary-text">Modrinth API 替换示例</span>
        </summary>
        <div class="govuk-details__text">
          <dl class="govuk-summary-list govuk-summary-list--no-border">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">原始 API</dt>
              <dd class="govuk-summary-list__value">
                <code class="mcim-code">https://api.modrinth.com/v2/project/sodium</code>
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">镜像 API</dt>
              <dd class="govuk-summary-list__value">
                <code class="mcim-code mcim-code--mirror">https://mod.mcimirror.top/modrinth/v2/project/sodium</code>
              </dd>
            </div>
          </dl>
        </div>
      </details>

      <details class="govuk-details" data-module="govuk-details">
        <summary class="govuk-details__summary">
          <span class="govuk-details__summary-text">CurseForge API 替换示例</span>
        </summary>
        <div class="govuk-details__text">
          <dl class="govuk-summary-list govuk-summary-list--no-border">
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">原始 API</dt>
              <dd class="govuk-summary-list__value">
                <code class="mcim-code">https://api.curseforge.com/v1/mods/238222</code>
              </dd>
            </div>
            <div class="govuk-summary-list__row">
              <dt class="govuk-summary-list__key">镜像 API</dt>
              <dd class="govuk-summary-list__value">
                <code class="mcim-code mcim-code--mirror">https://mod.mcimirror.top/curseforge/v1/mods/238222</code>
              </dd>
            </div>
          </dl>
        </div>
      </details>

      <div class="govuk-inset-text govuk-!-margin-top-6">
        完整的接口列表和请求参数说明，请查阅
        <a class="govuk-link" href="https://mod.mcimirror.top/docs" target="_blank" rel="noopener noreferrer">API 文档</a>。
      </div>

      <div class="govuk-button-group govuk-!-margin-top-6">
        <a
          href="https://mod.mcimirror.top/docs"
          class="govuk-button"
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          data-module="govuk-button"
        >
          查看 API 文档
        </a>
        <a
          href="https://github.com/mcmod-info-mirror"
          class="govuk-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub 源码
        </a>
        <NuxtLink to="/sponsor" class="govuk-link">赞助我们</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.govuk-summary-card__title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.govuk-summary-card__title-wrapper .govuk-tag {
  flex-shrink: 0;
}

.mcim-nowrap {
  white-space: nowrap;
}

.mcim-stat-grid {
  display: flex;
  flex-wrap: wrap;
}

.mcim-stat-column {
  display: flex;
}

.mcim-stat-panel {
  display: flex;
  flex: 1;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 25px;
  margin-bottom: 30px;
  background-color: #ffffff;
}

.mcim-progress {
  height: 8px;
  margin-top: auto;
  background-color: #f3f2f1;
  border: 1px solid #b1b4b6;
}

.mcim-progress__fill {
  height: 100%;
  transition: width 0.6s ease;
}

.mcim-progress__fill--modrinth {
  background-color: #00703c;
}

.mcim-progress__fill--curseforge {
  background-color: #1d70b8;
}

.mcim-code {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.875rem;
  background-color: #f3f2f1;
  padding: 2px 5px;
  word-break: break-all;
}

.mcim-code--mirror {
  background-color: #cce2d8;
  color: #005a30;
}
</style>
