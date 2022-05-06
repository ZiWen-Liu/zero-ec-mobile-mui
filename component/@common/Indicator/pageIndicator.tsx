/* eslint-disable @next/next/no-img-element */
import { render, unmountComponentAtNode } from "react-dom";
import styles from "./index.module.css";

import loadingImage from "assets/images/page-loading.gif";

const PageIndicator = () => {
  return (
    <div className={styles.pageIndicator}>
      <img
        className={styles.loadingImg}
        src={loadingImage as unknown as string}
        alt="Weee! - Groceries Delivered"
      />
    </div>
  );
};

export default PageIndicator;

/**
 * 各种弹窗
 * @param paras
 */
export const showLoading = () => {
  if (typeof window === undefined) return;
  let div = document?.getElementById("loading");
  if (!div) {
    div = document.createElement("div");
    div.id = "loading";
    document.body.appendChild(div);
    render(<PageIndicator />, div);
  }
};

export const hideLoading = () => {
  if (typeof window === undefined) return;
  const div = document.getElementById("loading");
  if (div) {
    unmountComponentAtNode(div);
    div.parentNode?.removeChild(div);
  }
};
