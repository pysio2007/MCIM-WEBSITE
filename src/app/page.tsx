import { ArrowUpRight, Server, Wifi, Globe, Users, Zap, NetworkIcon, CloudCog, Globe2, Network, Search, Code, Download, Shield, HardDrive } from "lucide-react";
import Image from 'next/image';
import { ClientComponents } from './client-components';

// 定义统计数据接口
interface StatsData {
  curseforge: {
    mod: number;
    file: number;
    fingerprint: number;
  };
  modrinth: {
    project: number;
    version: number;
    file: number;
  };
  file_cdn: {
    file: number;
  };
}

// 服务端异步获取统计数据函数
async function getStats(): Promise<StatsData | null> {
  try {
    const response = await fetch('https://mod.mcimirror.top/statistics', {
      next: { revalidate: 300 } // 5分钟缓存
    });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return null;
  }
}

// 格式化数字函数
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

// 服务端组件 - 主页面
export default async function Home() {
  // 服务端获取统计数据
  const stats = await getStats();

  return (
    <main className="min-h-screen py-12 px-6 md:px-12 max-w-5xl mx-auto cn-page">
      <ClientComponents />
      
      <header className="mb-8 relative">
        <div className="flex justify-between items-center relative">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12">
              <Image
                src="/avatar.png"
                alt="MCIM Logo"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 inline-block text-transparent bg-clip-text">
                MCIM <span className="text-sm animate-bounce inline-block ml-2">✨</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Minecraft Mod 镜像加速
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-br from-pink-400 to-purple-600 rounded-md opacity-25 group-hover:opacity-40 blur-lg transition duration-500"></div>
            <a 
              href="https://mod.mcimirror.top/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 cursor-pointer flex items-center gap-1 text-sm px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md hover:border-gray-300 dark:hover:border-gray-600 transition-all overflow-hidden"
            >
              <Code className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative overflow-hidden inline-block">
                <span className="inline-block transition-transform duration-500">API 文档</span>
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* 统计数据展示区域 */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Modrinth 镜像统计 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-green-300 dark:group-hover:border-green-600 transition-all duration-300">
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-300 rounded-full opacity-60"></div>
              <div className="flex items-center justify-between mb-4">
                <Globe2 className="w-8 h-8 text-green-500 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">MODRINTH</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stats ? formatNumber(stats.modrinth.project) : '69.5k'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">个项目已缓存</p>
              <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>

          {/* CurseForge 镜像统计 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-orange-300 dark:group-hover:border-orange-600 transition-all duration-300">
              <div className="absolute top-4 right-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-orange-300 rounded-full opacity-60"></div>
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-orange-500 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">CURSEFORGE</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stats ? formatNumber(stats.curseforge.mod) : '152.4k'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">个 Mod 已缓存</p>
              <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>

          {/* 缓存文件总数统计 */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-purple-300 dark:group-hover:border-purple-600 transition-all duration-300">
              <div className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
              <div className="flex items-center justify-between mb-4">
                <HardDrive className="w-8 h-8 text-purple-500 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">TOTAL FILES</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stats ? formatNumber(stats.file_cdn.file) : '876.5k'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">缓存文件总数</p>
              <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主要功能介绍 */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 inline-block text-transparent bg-clip-text">
            为什么选择 MCIM？
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            我们提供稳定、快速的 Minecraft Mod 信息镜像服务，让你的下载更加顺畅
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* 镜像服务卡片 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 transition-all duration-300">
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute top-6 right-6 w-6 h-6 border-2 border-blue-300 rounded-full opacity-20"></div>
              <div className="absolute top-8 right-8 w-8 h-8 border border-blue-200 rounded-full opacity-10"></div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">镜像服务</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Mirror Services</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                提供 Modrinth 和 CurseForge 的完整镜像服务，确保你能够快速访问所需的 Mod 信息和文件。
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span>实时同步最新数据</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                  <span>高可用性保障</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                  <span>完整的 API 支持</span>
                </div>
              </div>
            </div>
          </div>

          {/* 加速访问卡片 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-green-300 dark:group-hover:border-green-600 transition-all duration-300">
              <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute top-6 right-6 w-6 h-6 border-2 border-green-300 rounded-full opacity-20"></div>
              <div className="absolute top-8 right-8 w-8 h-8 border border-green-200 rounded-full opacity-10"></div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">加速访问</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Fast Access</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                通过优秀的 CDN 和缓存，大幅提升 Mod 信息查询和文件下载速度。
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                  <span>智能缓存机制</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3 animate-pulse"></div>
                  <span>CDN 全球加速</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                  <span>毫秒级响应时间</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API 替换示例 */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 inline-block text-transparent bg-clip-text">
            API 替换示例
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            只需简单替换 API 端点，即可享受更快的访问速度
          </p>
        </div>

        <div className="space-y-6">
          {/* Modrinth API 示例 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Globe2 className="w-6 h-6 text-green-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modrinth API</h3>
                </div>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">推荐</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">原始 API:</p>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm text-gray-800 dark:text-gray-200 font-mono break-all">
                    https://api.modrinth.com/v2/project/sodium
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">镜像 API:</p>
                  <code className="block bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm text-green-700 dark:text-green-300 font-mono break-all border border-green-200 dark:border-green-800">
                    https://mod.mcimirror.top/modrinth/v2/project/sodium
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* CurseForge API 示例 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-orange-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">CurseForge API</h3>
                </div>
                <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">热门</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">原始 API:</p>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm text-gray-800 dark:text-gray-200 font-mono break-all">
                    https://api.curseforge.com/v1/mods/238222
                  </code>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">镜像 API:</p>
                  <code className="block bg-orange-50 dark:bg-orange-900/20 p-3 rounded text-sm text-orange-700 dark:text-orange-300 font-mono break-all border border-orange-200 dark:border-orange-800">
                    https://mod.mcimirror.top/curseforge/v1/mods/238222
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 底部信息 */}
      <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-6 mb-4">
          <a 
            href="https://github.com/mcmod-info-mirror" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Code className="w-4 h-4 mr-2" />
            GitHub
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </a>
          <a 
            href="https://mod.mcimirror.top/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Search className="w-4 h-4 mr-2" />
            API 文档
            <ArrowUpRight className="w-3 h-3 ml-1" />
          </a>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          © 2025 MCIM. 致力于为 Minecraft 社区提供更好的体验。
        </p>
      </footer>
    </main>
  );
}
