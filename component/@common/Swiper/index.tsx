import React, { ReactNode, useEffect, useRef } from "react";
import {
  Swiper as ReactSwiper,
  SwiperSlide as ReactSwiperSlide,
} from "swiper/react";

import {
  Swiper as SwiperProps,
  SwiperSlide as SwiperSlideProps,
} from "swiper/swiper-react";
// import Swiper core and required modules
import SwiperCore, {
  Scrollbar,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper";

import "swiper/swiper.less";
import "swiper/components/scrollbar/scrollbar.less";
import "swiper/components/pagination/pagination.less";
import "swiper/components/navigation/navigation.less";

// install Swiper modules
SwiperCore.use([Scrollbar, Autoplay, Pagination, Navigation]);
export type Props = {
  children?: string | ReactNode[] | ReactNode;
  activeIndex?: number;
} & SwiperProps;

export type SlideProps = {
  children?: string | ReactNode[] | ReactNode;
} & SwiperSlideProps;

export function SwiperSlide({ children, ...rest }: SlideProps) {
  return <ReactSwiperSlide {...rest}>{children}</ReactSwiperSlide>;
}

SwiperSlide.displayName = "SwiperSlide";

export default function Swiper({
  children,
  activeIndex,
  onSwiper,
  ...rest
}: Props) {
  const swiperRef = useRef(null);
  useEffect(() => {
    // @ts-ignore:next-line
    swiperRef.current && swiperRef.current.slideTo(activeIndex);
  }, [activeIndex]);

  const handleSwiper = (swiper: any) => {
    swiperRef.current = swiper;
    onSwiper?.(swiper);
  };

  return (
    <ReactSwiper onSwiper={handleSwiper} {...rest}>
      {children}
    </ReactSwiper>
  );
}
