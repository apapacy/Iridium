var util = require('util');
var _ = require('lodash');
function ModelSpecificInstance(model, instanceType) {
    var constructor = function (doc, isNew, isPartial) {
        if (isNew === void 0) { isNew = true; }
        if (isPartial === void 0) { isPartial = false; }
        instanceType.call(this, model, doc, isNew, isPartial);
    };
    util.inherits(constructor, instanceType);
    _.each(Object.keys(model.schema), function (property) {
        if (property === '_id') {
            return Object.defineProperty(constructor.prototype, property, {
                get: function () {
                    return model.options.identifier.apply(this._modified._id);
                },
                set: function (value) {
                    this._modified._id = model.options.identifier.reverse(value);
                },
                enumerable: true
            });
        }
        Object.defineProperty(constructor.prototype, property, {
            get: function () {
                return this._modified[property];
            },
            set: function (value) {
                this._modified[property] = value;
            },
            enumerable: true
        });
    });
    return constructor;
}
module.exports = ModelSpecificInstance;
//# sourceMappingURL=ModelSpecificInstance.js.map