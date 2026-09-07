<script setup lang="ts">
interface Sponsor {
  name: string
  amount: number
  date: string
  message?: string
  email?: string
}

useHead({
  title: '赞助支持 — MCIM',
  script: [
    {
      src: 'https://js.stripe.com/v3/buy-button.js',
      async: true,
    },
  ],
})

const { data: sponsors } = await useFetch<Sponsor[]>('/api/sponsors')

const totalAmount = computed(() =>
  (sponsors.value ?? []).reduce((sum, s) => sum + s.amount, 0)
)

function avatarUrl(sponsor: Sponsor): string {
  const initial = encodeURIComponent((sponsor.name ?? 'A').charAt(0).toUpperCase())
  return `https://ui-avatars.com/api/?name=${initial}&background=1d70b8&color=ffffff&size=40`
}
</script>

<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <a href="javascript:window.history.back()" class="govuk-back-link">返回</a>
      <h1 class="govuk-heading-xl govuk-!-margin-top-4">支持 MCIM</h1>
      <p class="govuk-body-l">
        MCIM 是一个免费开源的项目，你的赞助将帮助我们维持服务器运营和持续开发。
      </p>
    </div>
  </div>

  <div class="govuk-grid-row govuk-!-margin-bottom-8">
    <div class="govuk-grid-column-one-quarter">
      <div class="mcim-stat-box">
        <p class="govuk-heading-l govuk-!-margin-bottom-1">¥{{ totalAmount }}</p>
        <p class="govuk-body-s govuk-!-margin-bottom-0">总赞助金额</p>
      </div>
    </div>
    <div class="govuk-grid-column-one-quarter">
      <div class="mcim-stat-box">
        <p class="govuk-heading-l govuk-!-margin-bottom-1">{{ sponsors?.length ?? 0 }}</p>
        <p class="govuk-body-s govuk-!-margin-bottom-0">位赞助者</p>
      </div>
    </div>
  </div>

  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible">

  <div class="govuk-grid-row govuk-!-margin-top-8 mcim-support-grid">
    <div class="govuk-grid-column-full">
      <h2 class="govuk-heading-l">支持我们</h2>
      <p class="govuk-body">选择合适的方式来支持 MCIM 的日常运营。</p>
    </div>

    <div class="govuk-grid-column-one-half mcim-support-column">
      <div class="govuk-summary-card">
        <div class="govuk-summary-card__title-wrapper">
          <h3 class="govuk-summary-card__title">在线支付</h3>
        </div>
        <div class="govuk-summary-card__content">
          <p class="govuk-body">通过 Stripe 安全快捷支付，支持信用卡、借记卡、微信、支付宝等多种方式。</p>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="`<stripe-buy-button buy-button-id='buy_btn_1S07F8JdozoqG8Z5GyxlY8SW' publishable-key='pk_live_51RIdSjJdozoqG8Z5Tj0EPeqWDpxNwf1bRgIsNccaTJ1c0YhB9N7ek7WdnWTM13aa7M4lrffzIpmQf0Z8uEdp28vA00LN7uByKl'></stripe-buy-button>`" />
        </div>
      </div>
    </div>

    <div class="govuk-grid-column-one-half mcim-support-column">
      <div class="govuk-summary-card">
        <div class="govuk-summary-card__title-wrapper">
          <h3 class="govuk-summary-card__title">快捷赞助</h3>
        </div>
        <div class="govuk-summary-card__content">
          <p class="govuk-body">点击链接，跳转到安全的 Stripe 支付页面完成赞助。</p>
          <a
            href="https://donate.stripe.com/dRmcN64pEbSL6VD7gVgIo02"
            class="govuk-button govuk-!-margin-top-2"
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            data-module="govuk-button"
          >
            立即赞助
          </a>
        </div>
      </div>
    </div>
  </div>

  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-8">

  <div class="govuk-grid-row govuk-!-margin-top-8">
    <div class="govuk-grid-column-two-thirds">
      <h2 class="govuk-heading-l">资金用途</h2>
      <p class="govuk-body">你的每一份支持都会用于以下方面。</p>

      <dl class="govuk-summary-list">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">服务器运营</dt>
          <dd class="govuk-summary-list__value">
            维持服务器稳定运行，确保 24/7 可用性，为用户提供优质的镜像服务。
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">开发维护</dt>
          <dd class="govuk-summary-list__value">
            持续改进功能，修复问题，提升用户体验，让 MCIM 变得更好。
          </dd>
        </div>
      </dl>
    </div>
  </div>

  <hr class="govuk-section-break govuk-section-break--l govuk-section-break--visible govuk-!-margin-top-8">

  <div class="govuk-grid-row govuk-!-margin-top-8">
    <div class="govuk-grid-column-full">
      <h2 class="govuk-heading-l">感谢赞助者</h2>
      <p class="govuk-body">感谢每一位支持 MCIM 的朋友。</p>

      <div class="mcim-table-scroll" role="region" aria-label="赞助者名单" tabindex="0">
      <table class="govuk-table">
        <caption class="govuk-table__caption govuk-table__caption--m govuk-visually-hidden">
          赞助者名单
        </caption>
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header">赞助者</th>
            <th scope="col" class="govuk-table__header govuk-table__header--numeric">金额</th>
            <th scope="col" class="govuk-table__header">日期</th>
            <th scope="col" class="govuk-table__header">留言</th>
          </tr>
        </thead>
        <tbody class="govuk-table__body">
          <tr
            v-for="(sponsor, i) in sponsors"
            :key="i"
            class="govuk-table__row"
          >
            <td class="govuk-table__cell">
              <div class="mcim-sponsor-name">
                <img
                  :src="avatarUrl(sponsor)"
                  :alt="sponsor.name"
                  class="mcim-avatar"
                  width="32"
                  height="32"
                >
                <span class="govuk-body govuk-!-margin-bottom-0">{{ sponsor.name }}</span>
              </div>
            </td>
            <td class="govuk-table__cell govuk-table__cell--numeric">
              <strong>¥{{ sponsor.amount }}</strong>
            </td>
            <td class="govuk-table__cell govuk-body-s">{{ sponsor.date }}</td>
            <td class="govuk-table__cell govuk-body-s">{{ sponsor.message || '—' }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mcim-support-grid {
  display: flex;
  flex-wrap: wrap;
}

.mcim-support-column {
  display: flex;
}

.mcim-support-column .govuk-summary-card {
  flex: 1;
}

.mcim-stat-box {
  border-left: 5px solid #00703c;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.mcim-table-scroll {
  overflow-x: auto;
}

.mcim-table-scroll .govuk-table {
  min-width: 640px;
}

.mcim-sponsor-name {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mcim-avatar {
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
