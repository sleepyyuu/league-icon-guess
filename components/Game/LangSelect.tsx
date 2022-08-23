import styles from "../../styles/LangSelect.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { FaLanguage } from "react-icons/fa";

export default function LangSelect(props) {
  const { locale, lang } = props;
  const router = useRouter();

  return (
    <div className={styles.langSelectContainer}>
      <div className={styles.langHeader}></div>
      <div className={styles.langMenuContainer}>
        <div className={styles.langImage}>
          {" "}
          <FaLanguage size={45}></FaLanguage>
        </div>
        <select
          id="languages"
          name="languages"
          onChange={(e) => {
            let redirectUrl = "https://www.skill-issue.com/league/" + e.target.value;
            window.location.href = redirectUrl;
          }}
          value={locale}
          className={styles.langSelectChosen}
        >
          <option value="cs_CZ">Czech - čeština</option>
          <option value="el_GR">Greek - Ελληνικά</option>
          <option value="pl_PL">Polish - polski</option>
          <option value="ro_RO">Romanian - română</option>
          <option value="hu_HU">Hungarian - magyar</option>
          <option value="en_GB">English (United Kingdom)</option>
          <option value="de_DE">German (Germany) - Deutsch (Deutschland)</option>
          <option value="es_ES">Spanish (Spain) - español (España)</option>
          <option value="it_IT">Italian (Italy) - italiano (Italia)</option>
          <option value="fr_FR">French (France) - français (France)</option>
          <option value="ja_JP">Japanese - 日本語</option>
          <option value="ko_KR">Korean - 한국어</option>
          <option value="es_MX">Spanish (Mexico) - español (México)</option>
          <option value="es_AR">Spanish (Argentina) - español (Argentina)</option>
          <option value="pt_BR">Portuguese (Brazilian) - Português (do Brasil)</option>
          <option value="en_US">English (United States)</option>
          <option value="en_AU">English (Australia)</option>
          <option value="ru_RU">Russian - русский</option>
          <option value="tr_TR">Turkish - Türkçe</option>
          <option value="en_PH">English (Republic of the Philippines)</option>
          <option value="en_SG">English (Singapore)</option>
          {/* riot api spellnames are all still in english for thai <option value="th_TH">Thai - ไทย</option> */}
          <option value="vn_VN">Vietnamese - Tiếng Việ</option>
          {/* {<option value="zh_MY">Chinese (Malaysia) - 中文</option>}  */}
          <option value="zh_CN">Chinese (China) - 中文（简体）</option>
          <option value="zh_TW">Chinese (Taiwan) - 中文（繁體）</option>
        </select>
      </div>
    </div>
  );
}
