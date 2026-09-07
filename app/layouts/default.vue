<template>
  <div>
    <a href="#main-content" class="govuk-skip-link" data-module="govuk-skip-link">跳到主要内容</a>

    <header class="govuk-header" data-module="govuk-header" role="banner">
      <div class="govuk-header__container govuk-width-container">
        <div class="govuk-header__logo">
          <NuxtLink to="/" class="govuk-header__link govuk-header__link--homepage">
            <span class="govuk-header__logotype">
              <span class="govuk-header__logotype-text">MCIM</span>
            </span>
            <span class="govuk-header__product-name">Minecraft Mod 镜像</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="govuk-width-container">
      <div class="govuk-phase-banner">
        <p class="govuk-phase-banner__content">
          <strong class="govuk-tag govuk-phase-banner__content__tag">beta</strong>
          <span class="govuk-phase-banner__text">
            这是一项新服务 — 你的
            <a class="govuk-link" href="https://github.com/mcmod-info-mirror" target="_blank" rel="noopener noreferrer">
              反馈
            </a>
            将帮助我们改进。
          </span>
        </p>
      </div>

      <main class="govuk-main-wrapper" id="main-content" role="main">
        <slot />
      </main>
    </div>

    <footer class="govuk-footer" role="contentinfo">
      <div class="govuk-width-container">
        <div class="govuk-footer__meta">
          <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <h2 class="govuk-visually-hidden">支持链接</h2>
            <ul class="govuk-footer__inline-list">
              <li class="govuk-footer__inline-list-item">
                <a
                  class="govuk-footer__link"
                  href="https://github.com/mcmod-info-mirror"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li class="govuk-footer__inline-list-item">
                <a
                  class="govuk-footer__link"
                  href="https://mod.mcimirror.top/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API 文档
                </a>
              </li>
              <li class="govuk-footer__inline-list-item">
                <NuxtLink class="govuk-footer__link" to="/sponsor">赞助</NuxtLink>
              </li>
            </ul>
            <p class="govuk-footer__licence-description">
              © 2026 MCIM. 致力于为 Minecraft 社区提供更好的体验。
            </p>
            <p class="govuk-footer__licence-description">
              <a
                class="govuk-footer__link"
                href="https://beian.miit.gov.cn"
                target="_blank"
                rel="noopener noreferrer"
              >
                蜀ICP备2023021309号-4
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
onMounted(async () => {
  const { createAll } = await import('govuk-frontend')
  createAll()
})
</script>
