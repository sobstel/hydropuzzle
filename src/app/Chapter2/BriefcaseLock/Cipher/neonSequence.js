export default function neonSequence () {
  return new NeonSequence([
    {x: 0, y: null},
    {x: 1, y: null},
    {x: 2, y: null},
    {x: null, y: 0},
    {x: null, y: 1},
    {x: null, y: 2}
  ]);
};

/**
 * Handle neon highlighting sequence (rows and cols)
 */
class NeonSequence {
  constructor (seq) {
    this.seq = seq;
    this.restart();
  }

  next () {
    if (this.key === null) {
      this.key = 0;
      return;
    }

    const nextKey = this.key + 1;

    if (nextKey >= this.seq.length) {
      this.key = null;
      this.ended = true;
      return;
    }

    this.key = nextKey;
  }

  restart () {
    this.key = null;
    this.ended = false;
  }

  get xy () {
    if (this.key === null) {
      return {x: null, y: null};
    }
    return this.seq[this.key];
  }
}
