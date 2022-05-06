import { CSSProperties, FC, useCallback, useMemo, memo } from 'react';
import { getCroppedImageUrl, CropConfigs } from './utils/getCroppedImageUrl';
import ImageStandards from './constants/imageStandards';
import classNames from 'classnames';
import LazyLoad, { LazyLoadProps } from 'react-lazyload';
import styles from './index.module.less';

interface Props {
  type?: 'img' | 'bg';
  className?: string;
  style?: CSSProperties;
  url: string;
  configs?: string | CropConfigs;
  alt?: string;
  lazyLoad?: LazyLoadProps | boolean;
}

interface LazyLoadWrapperProps {
  lazyLoad?: LazyLoadProps | boolean;
  style?: CSSProperties;
}

const DefaultLazyLoadConfigs: LazyLoadProps = {
  once: true,
  offset: 100,
  throttle: true
};

const LazyLoadWrapper: FC<LazyLoadWrapperProps> = props => {
  const { lazyLoad, children, style } = props;
  if (!lazyLoad) return <>{children}</>;
  return (
    <LazyLoad {...lazyLoad} style={style}>
      {children}
    </LazyLoad>
  );
};

const CroppedImage: FC<Props> = props => {
  const { type = 'bg', url, className, configs, style, alt, lazyLoad = DefaultLazyLoadConfigs } = props;

  const imgUrl = useMemo(() => {
    let _config = {};
    if (typeof configs === 'string') {
      _config = ImageStandards[configs] ?? {};
    } else {
      _config = configs ?? {};
    }
    return getCroppedImageUrl(url, { ..._config, devicePixelRatio: 2 });
  }, [url, configs]);

  const imgUrlSet = useMemo(() => {
    let _config = {};
    if (typeof configs === 'string') {
      _config = ImageStandards[configs] ?? {};
    } else {
      _config = configs ?? {};
    }

    const url_1x = getCroppedImageUrl(url, { ..._config, devicePixelRatio: 1 });
    const url_2x = getCroppedImageUrl(url, { ..._config, devicePixelRatio: 2 });
    const url_3x = getCroppedImageUrl(url, { ..._config, devicePixelRatio: 3 });
    return [url_1x, url_2x, url_3x];
  }, [url, configs]);

  const render = useCallback(() => {
    const [url_1x, url_2x, url_3x] = imgUrlSet;
    if (type === 'img') {
      return (
        <LazyLoadWrapper lazyLoad={lazyLoad} style={{ height: '100%' }}>
          <img
            src={imgUrl}
            srcSet={`${url_1x} 1x, ${url_2x} 2x, ${url_3x} 3x`}
            className={classNames(className, styles.croppedImage)}
            style={style}
            alt={alt}
          />
        </LazyLoadWrapper>
      );
    }
    return (
      <>
        <style jsx>{`
          div {
            background-image: url(${imgUrl});
          }
          @media only screen and (-webkit-min-device-pixel-ratio: 1), only screen and (min-resolution: 1dppx) {
            div {
              background-image: url(${url_1x});
            }
          }

          @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-resolution: 2dppx) {
            div {
              background-image: url(${url_2x});
            }
          }

          @media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min-resolution: 3dppx) {
            div {
              background-image: url(${url_3x});
            }
          }
          div {
            background-image: image-set(url(${url_1x}) 1x, url(${url_2x}) 2x, url(${url_3x}) 3x);
          }
        `}</style>
        <LazyLoadWrapper lazyLoad={lazyLoad} style={{ height: '100%' }}>
          <div style={style} className={classNames(className, styles.croppedImageBg)}></div>
        </LazyLoadWrapper>
      </>
    );
  }, [props]);
  return render();
};

export default memo(CroppedImage);
