import yaml from 'js-yaml';
import scriptYaml from './scriptYaml';

export const script = yaml.safeLoad(scriptYaml);

export function _ (id, opts = {}) {
  if (script[id]) {
    if (typeof script[id] === 'string') {
      return script[id].trim();
    }

    return script[id];
  }

  return id;
}
