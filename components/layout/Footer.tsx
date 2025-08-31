'use client'

import Link from "next/link";
import Image from "next/image";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { getImagePath } from "@/lib/paths";
import { useI18n } from "@/contexts/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  return (
    <TooltipProvider delayDuration={200}>
      <footer className="bg-blue-900 border-blue-700">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden relative">
                  <Image
                    src={getImagePath("/DDDTW-logo.png")}
                    alt="DDD Taiwan Logo"
                    className="object-cover"
                    fill
                    sizes="32px"
                  />
                </div>
                <span className="text-white font-semibold">{t("footer.brand")}</span>
              </div>
              <p className="text-gray-400 text-sm">{t("footer.description")}</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    {t("nav.about")}
                  </Link>
                </li>
                <li>
                  <Link href="/agenda" className="hover:text-white transition-colors">
                    {t("nav.agenda")}
                  </Link>
                </li>
                <li>
                  <Link href="/speakers" className="hover:text-white transition-colors">
                    {t("nav.speakers")}
                  </Link>
                </li>
                <li>
                  <Link href="/transportation" className="hover:text-white transition-colors">
                    {t("nav.transportation")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t("footer.participation")}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/tickets" className="hover:text-white transition-colors">
                    {t("nav.tickets")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t("footer.contact")}</h4>
              <div className="space-y-3 text-sm">
                <div className="group flex items-center hover:bg-blue-800/30 p-1.5 rounded-md transition-colors">
                  <div className="w-7 h-7 flex items-center justify-center bg-blue-800/30 rounded-md mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="mailto:dddtw2018@gmail.com" className="text-gray-300 group-hover:text-white transition-colors">
                        dddtw2018@gmail.com
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-blue-800 text-white border-blue-700">
                      <p>{t("footer.sendEmail")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://www.facebook.com/DDDCommunity.tw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-800/30 text-gray-300 hover:bg-blue-700/50 hover:text-white transition-all"
                        aria-label="Facebook"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-blue-800 text-white border-blue-700">
                      <p>追蹤我們的 Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="https://line.me/ti/g2/aiNGJvViOJIxp7tV-EgNvJ2Id5ae1jBpecKSnA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-800/30 text-gray-300 hover:bg-blue-700/50 hover:text-white transition-all"
                        aria-label="Line"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 2h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3Z" />
                          <path d="M5 13h14" />
                        </svg>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-blue-800 text-white border-blue-700">
                      <p>加入我們的 Line 社群</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a 
                        href="https://www.youtube.com/channel/UCydw7dbEksG3axEMjHy4BxQ"
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-800/30 text-gray-300 hover:bg-blue-700/50 hover:text-white transition-all"
                        aria-label="Youtube"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                          <path d="m10 15 5-3-5-3z" />
                        </svg>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-blue-800 text-white border-blue-700">
                      <p>觀看我們的 YouTube 頻道</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 DDDesign TW. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
}
