import classNames from "classnames";

type IconProps = {
  className?: string;
  type: string;
  [key: string]: any;
  far?: boolean;
  style?: React.CSSProperties;
};

export function WeeeIcon(props: IconProps) {
  const { type, className, ...rest } = props;
  return (
    <i {...rest} className={classNames(`icon iconfont ${type}`, className)} />
  );
}
