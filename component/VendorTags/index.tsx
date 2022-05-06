import { memo } from "react";
import styles from "./index.module.css";

type TagProps = {
  tags: string[];
  className?: string;
};

const VendorTags = ({ tags, className }: TagProps) => {
  if (!Array.isArray(tags)) return <></>;
  return (
    <div className={className}>
      {tags?.map((tag, i) => {
        return (
          <span className={styles.tagItem} key={`rtg-tag-${tag}-${i}`}>
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default memo(VendorTags);
