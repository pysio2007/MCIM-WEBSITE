import { ArrowUpRight, Coffee, Zap } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

// 赞助者数据接口
interface Sponsor {
  name: string;
  amount: number;
  date: string;
  message?: string;
  email?: string;
}

// 导入赞助者数据
import sponsorsData from '@/data/sponsors.json';

const sponsors: Sponsor[] = sponsorsData;

// 计算总赞助金额
const totalAmount = sponsors.reduce((sum, sponsor) => sum + sponsor.amount, 0);

// 生成 Gravatar 头像 URL
function getAvatarUrl(email?: string): string {
  if (!email) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent('Anonymous')}&background=6366f1&color=ffffff&size=32`;
  }
  
  // 使用 crypto.subtle API 生成 MD5 hash (在现代浏览器中)
  // 对于服务端渲染，我们使用 ui-avatars 作为后备
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(email.charAt(0).toUpperCase())}&background=random&size=32`;
}

export default function SponsorPage() {
  return (
    <>
      {/* 加载 Stripe 脚本 */}
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />
      
      <main className="min-h-screen">
        {/* 顶部导航 */}
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← 返回主页
            </Link>
          </div>
        </nav>

        {/* Hero 区域 */}
        <section className="pt-20 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                支持 
              </span>
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                MCIM
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              MCIM 是一个免费开源的项目，你的赞助将帮助我们维持服务器运营和持续开发
            </p>
          </div>
        </section>

        {/* 统计数据 */}
        <section className="py-12 px-6 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                  ¥{totalAmount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  总赞助金额
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                  {sponsors.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  位赞助者
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 支付区域 */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                支持我们
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                选择合适的金额来支持 MCIM 的日常运营开销
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Stripe 内嵌支付 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    在线支付
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    通过 Stripe 安全快捷支付
                  </p>
                  
                  <div 
                    dangerouslySetInnerHTML={{
                      __html: `
                        <stripe-buy-button
                          buy-button-id="buy_btn_1S07F8JdozoqG8Z5GyxlY8SW"
                          publishable-key="pk_live_51RIdSjJdozoqG8Z5Tj0EPeqWDpxNwf1bRgIsNccaTJ1c0YhB9N7ek7WdnWTM13aa7M4lrffzIpmQf0Z8uEdp28vA00LN7uByKl"
                        ></stripe-buy-button>
                      `
                    }}
                  />
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  支持信用卡、借记卡、微信、支付宝等多种支付方式
                </p>
              </div>

              {/* 快捷赞助链接 */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    快捷赞助
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    点击链接快速完成赞助
                  </p>
                </div>

                <div className="mb-6">
                  <a
                    href="https://donate.stripe.com/dRmcN64pEbSL6VD7gVgIo02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full h-12 px-6 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    立即赞助
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </a>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  安全的 Stripe 支付页面
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 资金用途 */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                资金用途
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                你的每一份支持都会用于以下方面
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    服务器运营
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    维持服务器稳定运行，确保 24/7 可用性，为用户提供优质的镜像服务
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Coffee className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    开发维护
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    持续改进功能，修复问题，提升用户体验，让 MCIM 变得更好
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 赞助者名单 */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                感谢赞助者
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                感谢每一位支持 MCIM 的朋友
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="px-8 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        赞助者
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        金额
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        日期
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        留言
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsors.map((sponsor, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            <img
                              src={getAvatarUrl(sponsor.email)}
                              alt={sponsor.name}
                              className="w-10 h-10 rounded-full mr-4"
                            />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {sponsor.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ¥{sponsor.amount}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-gray-600 dark:text-gray-400">
                          {sponsor.date}
                        </td>
                        <td className="px-8 py-6 text-gray-600 dark:text-gray-400">
                          {sponsor.message || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 底部信息 */}
        <footer className="py-16 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-8 mb-6">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                返回主页
              </Link>
              <a
                href="https://github.com/mcmod-info-mirror"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              感谢你对 MCIM 的支持 ❤️
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}