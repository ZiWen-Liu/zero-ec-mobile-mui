import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./index.module.css";
import classnames from "classnames";

interface IProps {
  overLines?: number; // 超过几行隐藏文本
  style?: {
    fontSize: string;
    lineHeight: string;
  };
  onSpread?: () => void;
  onlyShowPoint?: boolean;
  pointPosition?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

const EllipsesText: FC<PropsWithChildren<IProps>> = ({
  children,
  style,
  overLines = 3,
  onSpread,
  onlyShowPoint,
  pointPosition,
}) => {
  const [maxHeight, setMaxHeight] = useState<string>("");
  const firstRenderMaxHeight = useRef<string>("");

  const stlyeData = useMemo(() => {
    if (style && Object.keys(style).length) {
      const heightValue = `${parseInt(style.lineHeight) * overLines}px`;
      setMaxHeight(heightValue);
      firstRenderMaxHeight.current = heightValue;
      return {
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
      };
    }
    const heightValue = `${18 * overLines}px`;
    setMaxHeight(heightValue);
    firstRenderMaxHeight.current = heightValue;
    return {
      fontSize: "14px",
      lineHeight: "18px",
    };
  }, [style, overLines]);

  // 文本内容dom引用
  const textDom = useRef<any>();

  // 是否应该展示省略tag
  const [shouldShowTag, setShouldShowTag] = useState<boolean>(false);
  // 是否应该展示...(展开时隐藏三个点)
  const [isShowPoint, setIsShowPoint] = useState<boolean>(true);

  useEffect(() => {
    const dom = textDom.current;
    if (dom) {
      const scrollHeight = dom.scrollHeight;
      if (
        scrollHeight >
        parseInt(maxHeight) + parseInt(stlyeData.lineHeight) / 2
      ) {
        setIsShowPoint(true);
        setShouldShowTag(true);
      }
    }
  }, [stlyeData, maxHeight]);

  const showAllText = useCallback(() => {
    const dom = textDom.current;
    if (dom) {
      const scrollHeight = dom.scrollHeight;
      if (isShowPoint) {
        setIsShowPoint(false);
        setMaxHeight(scrollHeight);
        if (onSpread && typeof onSpread === "function") {
          onSpread();
        }
      } else {
        setIsShowPoint(true);
        setMaxHeight(firstRenderMaxHeight.current);
      }
    }
  }, [isShowPoint]);

  const iconClassnames = classnames(styles.icon, {
    [styles.unflod]: !isShowPoint,
  });

  return (
    <div
      className={styles.ellipsesContainer}
      style={{ ...stlyeData, maxHeight }}
      ref={textDom}
    >
      {children}
      {shouldShowTag && (
        <div
          className={styles.ellipsesTag}
          style={{ ...pointPosition }}
          onClick={!onlyShowPoint ? showAllText : () => {}}
        >
          <div className={styles.pointContainer}>
            {isShowPoint && <span className={styles.gradient}></span>}
            <span className={styles.point}>
              {isShowPoint ? "..." : null}
              {!onlyShowPoint && (
                <i className={iconClassnames}>
                  <svg
                    width="13"
                    height="7"
                    viewBox="0 0 13 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.12868 7C6.27583 7 6.4009 6.94787 6.5039 6.83617L12.1029 0.878723C12.1985 0.781915 12.25 0.655319 12.25 0.51383C12.25 0.223404 12.0366 0 11.7423 0C11.6026 0 11.4775 0.0595746 11.3892 0.14149L6.12868 5.74149L0.868168 0.14149C0.772523 0.0595746 0.647447 0 0.507658 0C0.220721 0 0 0.223404 0 0.51383C0 0.655319 0.0515015 0.781915 0.147147 0.878723L5.75345 6.83617C5.85646 6.94787 5.98153 7 6.12868 7Z"
                      fill="#666666"
                    />
                  </svg>
                </i>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EllipsesText;
