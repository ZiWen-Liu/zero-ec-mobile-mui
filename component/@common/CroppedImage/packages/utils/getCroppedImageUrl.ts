// @ts-nocheck

/**
 * @description 根据原始图片CDN地址及裁剪参数配置动态计算需要获取的裁剪后的图片CDN地址；
 * @note SSR模式下，由于无法动态获取window宽度，需要手动传入合适的devicePixelRatio
 */

import { getDevicePixelRatio } from "./getDevicePixelRatio";
import ImageStandards from "../constants/imageStandards";
import isWebpSupport from "./isWebpSupport";
import Url from "url-parse";

export type CropConfigs = {
  renderWidth?: number | string;
  renderHeight?: number | string;
  quality?: number;
  format?: "jpeg" | "webp" | "png" | "tiff";
  defaultDevicePixelRatio?: number;
  devicePixelRatio?: number; // SSR模式下，由于无法动态获取window宽度，需要手动传入合适的devicePixelRatio
};

type GetCroppedImageUrl = (
  originUrl: string,
  cropConfigs?: string | CropConfigs,
  userAgent?: string,
) => string;

export const RTGBG = "rtgBg";

const IMAGEMAXWIDTH = 1024;
const IMAGEMAXHEIGHT = 1024;
const WEBP = "webp";
const JPG = "jpg";
const MINDEVICEPIXELRATIO = 1;

const SupportedFormatList = ["jpeg", "webp", "png", "tiff"];
const PicFormatExg = /\/[^\/\s\.]+\.(jpg|jpeg|png|tiff)/;

/** CDN白名单 */
const CDNWhiteList = [
  "img01.weeecdn.com",
  "img06.weeecdn.com",
  "video.sayweeecdn.com",
  "cdn.sayweee.net",
  "cdn02.sayweee.net",
  "cdn01.sayweee.net",
  "images-static.sayweeecdn.com",
  "img01.sayweeecdn.com",
];

const TYPESTRING = "[object String]";
const TYPEOBJECT = "[object Object]";
const TYPENUMBER = "[object Number]";

const prototypeToString: (param: any) => string = (param) => {
  return Object.prototype.toString.call(param);
};

/**
 * 计算百分比对应的实际值
 * @param originNum 百分比计算基准值
 * @param percentage 百分比（仅支持 /^((0|[1-9][\d]*)(\.[\d]+)?)%$/形式）
 * @returns number 计算结果
 */
const getNumFromPercentage = (originNum, percentage) => {
  const percentageRegex = /^((0|[1-9][\d]*)(\.[\d]+)?)%$/;
  let numRes = percentageRegex.exec(String(percentage));
  if (numRes) {
    const _num = Number(numRes[1] ?? 0);
    return (originNum * _num) / 100;
  }
  return 0;
};

/**
 * 获取需要通过CDN裁剪处理的图片URL（拼接了裁剪处理参数）
 * @param originUrl 图片原始URL（不包含裁剪参数）
 * @param configs 图片裁剪参数集合（可传字符串或CropConfigs类型；传入字符串，则去通用规则设置里面去取）
 * @returns 拼接了裁剪参数的图片URL
 */
export const getCroppedImageUrl: GetCroppedImageUrl = (
  originUrl,
  configs = {},
  userAgent?: string,
) => {
  let _url = null;
  try {
    _url = new Url(originUrl);
  } catch (error) {
    return originUrl;
  }

  if (!CDNWhiteList.includes(_url.host)) {
    return originUrl;
  }

  let renderWidth: string | number = "auto",
    renderHeight: string | number = "auto",
    quality,
    format = WEBP,
    defaultDevicePixelRatio = MINDEVICEPIXELRATIO,
    devicePixelRatio;

  // 如果configs为string，则去通用规则设置里面去取裁剪参数
  if (prototypeToString(configs) === TYPESTRING) {
    const standard = configs as string;
    if (ImageStandards.hasOwnProperty(standard)) {
      ({
        renderWidth = "auto",
        renderHeight = "auto",
        quality,
        format = WEBP,
        defaultDevicePixelRatio = MINDEVICEPIXELRATIO,
        devicePixelRatio,
      } = ImageStandards[standard] ?? {});
    }
  }

  // 如果configs为object，则从configs中获取裁剪参数
  if (prototypeToString(configs) === TYPEOBJECT) {
    ({
      renderWidth = "auto",
      renderHeight = "auto",
      quality,
      format = WEBP,
      defaultDevicePixelRatio = MINDEVICEPIXELRATIO,
      devicePixelRatio,
    } = (configs as CropConfigs) ?? {});
  }

  // 设备DPI（SSR模式下，由于无法动态获取window宽度，需要手动传入合适的devicePixelRatio）
  const _devicePixelRatio =
    !devicePixelRatio || devicePixelRatio < MINDEVICEPIXELRATIO
      ? getDevicePixelRatio(defaultDevicePixelRatio)
      : devicePixelRatio;

  // 裁剪参数中宽度、高度默认为0（即按CDN中的裁剪规则处理）
  let _width = 0,
    _height = 0;

  if (prototypeToString(renderWidth) === TYPENUMBER) {
    const _renderWidth = renderWidth as number;
    _width = _renderWidth < 0 ? 0 : _renderWidth;
  }

  if (prototypeToString(renderHeight) === TYPENUMBER) {
    const _renderHeight = renderHeight as number;
    _height = _renderHeight < 0 ? 0 : _renderHeight;
  }

  // 若renderWidth为百分比值，则根据document.documentElement.clientWidth计算图片实际宽度
  if (prototypeToString(renderWidth) === TYPESTRING && renderWidth !== "auto") {
    const clientWidth = globalThis?.document?.documentElement?.clientWidth || 0;
    _width = getNumFromPercentage(clientWidth, renderWidth);
  }

  // 若renderHeight为百分比值，则根据document.documentElement.clientHeight计算图片实际高度
  if (
    prototypeToString(renderHeight) === TYPESTRING &&
    renderHeight !== "auto"
  ) {
    const clientHeight =
      globalThis?.document?.documentElement?.clientHeight || 0;
    _height = getNumFromPercentage(clientHeight, renderHeight);
  }

  // 裁剪参数中的宽度、高度目前不支持小数值、宽度不超过1024
  _width = Math.floor(_width * _devicePixelRatio);
  _width = _width > IMAGEMAXWIDTH ? IMAGEMAXWIDTH : _width;
  _height = Math.floor(_height * _devicePixelRatio);
  _height = _height > IMAGEMAXHEIGHT ? IMAGEMAXHEIGHT : _height;

  // quality不支持负数和小数
  if (prototypeToString(quality) === TYPENUMBER) {
    quality = quality < 0 ? void 0 : Math.floor(quality);
  }

  // 传入不支持的format时使用默认format
  format = SupportedFormatList.includes(format) ? format : WEBP;

  if (format === WEBP) {
    if (!isWebpSupport(userAgent)) {
      const result = PicFormatExg.exec(_url.pathname);
      if (result === null) {
        return originUrl;
      }
      format = result[1] || JPG;
    }
  }

  _url.pathname += `!c${_width}x${_height}${
    quality ? `_q${quality}` : ""
  }.${format}`;
  return _url.toString();
};
