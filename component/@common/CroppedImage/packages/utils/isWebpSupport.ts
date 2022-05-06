import UAParser from 'ua-parser-js';

type IsWebpSupport = (userAgent?: string, versions?: appVersionsParam) => boolean;

type versionParams = {
  version: number | string;
  os?: {
    name: string;
    version: number | string;
  };
};

type appVersionsParam = {
  ['IE']?: boolean;
  ['Edge']?: versionParams;
  ['Firefox']?: versionParams;
  ['Chrome']?: versionParams;
  ['Safari']?: versionParams;
  ['Opera']?: versionParams;
  ['Mobile Safari']?: versionParams;
  ['Opera Mini']?: boolean;
  ['Android Browser']?: versionParams;
  ['Chrome Android']?: versionParams;
  ['Firefox Reality']?: versionParams;
  ['Chrome WebView']?: versionParams;
};

const UNDEFINED = 'undefined';
const BOOLEAN = 'boolean';

export const DeviceWebpSupports = {
  ['IE']: false,
  ['Edge']: {
    version: '18'
  },
  ['Firefox']: { version: '65' },
  ['Chrome']: { version: '32' },
  ['Safari']: {
    version: '14',
    os: {
      name: 'Mac OS',
      version: '11'
    }
  },
  ['Opera']: { version: '19' },
  ['Mobile Safari']: { version: '14' },
  ['Opera Mini']: true,
  ['Android Browser']: { version: '4.2' },
  ['Chrome Android']: { version: '100' },
  ['Firefox Reality']: { version: '98' },
  ['Samsung Internet']: { version: '4' },
  ['Chrome WebView']: { version: '99' }
};

const versionIsSupport = (version, minVersion) => {
  const _minVersionTemp = minVersion?.split('.') || [];
  const _versionTemp = version?.split('.') || [];

  for (let i = 0; i < _minVersionTemp.length; i++) {
    const v = Number(_versionTemp[i]);
    const mv = Number(_minVersionTemp[i]);
    if (v < mv) {
      return false;
    }
  }
  return true;
};

export const isWebpSupport: IsWebpSupport = (userAgent?: string, versions?: appVersionsParam) => {
  const _versions = versions ?? DeviceWebpSupports;
  const _userAgent = userAgent ?? ((typeof window !== UNDEFINED && (window?.navigator?.userAgent ?? '')) || '');
  const parser = new UAParser(_userAgent);
  const { name: browserName, version: browserVersion } = parser.getBrowser();
  if (!Object.prototype.hasOwnProperty.call(_versions, browserName)) return false;
  const _supportInfo = _versions[browserName];
  if (typeof _supportInfo === BOOLEAN) return _supportInfo;
  if (_supportInfo.os) {
    const { name: _osName, version: _osVersion } = _supportInfo.os ?? {};
    const { name: osName, version: osVersion } = parser.getOS();
    return (
      versionIsSupport(browserVersion, _supportInfo.version) &&
      _osName === osName &&
      versionIsSupport(osVersion, _osVersion)
    );
  }
  return versionIsSupport(browserVersion, _supportInfo.version);
};

export default isWebpSupport;
