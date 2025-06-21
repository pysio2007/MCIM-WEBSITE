"use client";

import { useEffect } from "react";

export function ClientComponents() {
  // 页面加载动画
  useEffect(() => {
    // 为body添加进入动画类
    document.body.classList.add('page-enter');
    
    // 去除加载动画类
    const timeout = setTimeout(() => {
      document.body.classList.remove('page-enter');
    }, 500);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <style jsx global>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      .animation-delay-100 {
        animation-delay: 0.1s;
      }
      
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animation-delay-300 {
        animation-delay: 0.3s;
      }
      
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      
      .animation-delay-500 {
        animation-delay: 0.5s;
      }
      
      /* 页面过渡动画 */
      .page-enter {
        animation: pageEnter 0.5s ease-out forwards;
      }
      
      .page-exit {
        animation: pageExit 0.3s ease-in forwards;
      }
      
      @keyframes pageEnter {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pageExit {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
      }
      
      /* 自定义慢速旋转动画 */
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
      }
    `}</style>
  );
} 