// plugins/mongoosePaginatePlugin.js
module.exports = function paginatePlugin(schema) {
  schema.statics.paginate = async function (filters = {}, options = {}) {
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 10;
    const sort = options.sort || { createdAt: -1 };

    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      this.find(filters).sort(sort).skip(skip).limit(limit),
      this.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      results,
      page,
      limit,
      totalPages,
      totalResults: total,
    };
  };
};
