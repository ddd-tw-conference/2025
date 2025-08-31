'use client'

import { Users, Clock, MapPin } from "lucide-react";
import { useI18n } from "@/contexts/i18n-context";

export default function AboutSection() {
  const { t } = useI18n();
  return (
    <section className="py-20 bg-blue-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">{t("about.title")}</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            {t("about.description")}
          </p>
          <div className="grid md:grid-cols-3 gap-8 pt-12">
            <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t("about.community.title")}</h3>
              <p className="text-gray-400">{t("about.community.description")}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t("about.practice.title")}</h3>
              <p className="text-gray-400">{t("about.practice.description")}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{t("about.exchange.title")}</h3>
              <p className="text-gray-400">{t("about.exchange.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
