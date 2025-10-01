import React from "react";
import { useTranslations } from "next-intl";

export const Newsletter: React.FC = () => {
  const t = useTranslations("footer");
  return (
    <section className="w-full max-w-md mx-auto bg-gradient-to-br from-main-purple via-purple-800 to-indigo-900 rounded-xl shadow-lg p-8 flex flex-col gap-4 border border-white/10">
      <h4 className="text-2xl font-semibold mb-2 text-orange-main">{t("stayUpdated")}</h4>
      <p className="text-gray-300 mb-4">{t("stayUpdatedDesc")}</p>
      <form className="flex gap-3">
        <input
          type="email"
          placeholder={t("emailPlaceholder")}
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gradient-app-main-1 backdrop-blur-sm placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-orange-main hover:bg-gradient-app-main-1 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-white"
        >
          {t("subscribe")}
        </button>
      </form>
    </section>
  );
};
