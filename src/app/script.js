import yaml from 'js-yaml';
import scriptYml from './script.yml';

export const script = yaml.safeLoad(scriptYml);

export function _ (id, opts = {}) {
  if (script[id]) {
    if (typeof script[id] === 'string') {
      return script[id].trim();
    }

    return script[id];
  }

  return id;
}
