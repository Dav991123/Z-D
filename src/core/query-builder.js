function Query(methods, options) {
  this._qs = {};
  this.options = options || {};

  let self = this;

  for (let m in methods) {
    (function(name, method) {
      self[name] = function(val) {
        val = method.default && val === undefined ? method.default : val;
        let q = method.param || name;
        if ("add" === method.method) {
          if (!self._qs[q]) {
            self._qs[q] = [val];
          } else {
            self._qs[q].push(val);
          }
        } else {
          self._qs[q] = val;
        }

        return self;
      };

      if (method.alias) {
        self[method.alias] = self[name];
      }
    })(m, methods[m]);
  }
}

Query.prototype.valueOf = function() {
  let qs = {};
  for (let q in this._qs) {
    if (this._qs[q] !== null){

      qs[q] = this._qs[q];
    }
    // if (Array.isArray(qs[q]) && this.options.arrayJoiner) {
    //   qs[q] = qs[q].join(this.options.arrayJoiner);
    // }
  }

  return qs;
};

Query.prototype.toString = function() {
  return require("querystring").stringify(this.valueOf());
};

export default Query;
