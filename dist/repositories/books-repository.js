"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRepository = void 0;
const mongodb_1 = require("mongodb");
const index_1 = require("../index");
const paginator_1 = require("../utils/paginator");
exports.booksRepository = {
    getBooksMongoDB() {
        return __awaiter(this, arguments, void 0, function* (order = 'asc', page = 1, pageSize = 10) {
            var _a, _b, _c, _d, _e;
            const sortDirection = order === 'asc' ? 1 : -1;
            const { skip, limit } = (0, paginator_1.getPagination)({ page, pageSize });
            const pipeline = [
                {
                    $addFields: {
                        volumeNumber: {
                            $toInt: { $arrayElemAt: [{ $split: ["$volume", "-"] }, 1] }
                        }
                    }
                },
                { $sort: { volumeNumber: sortDirection } },
                {
                    $facet: {
                        items: [
                            { $skip: skip },
                            { $limit: limit },
                            { $project: { _id: 1, volume: 1 } }
                        ],
                        totalCount: [
                            { $count: "count" }
                        ]
                    }
                }
            ];
            const result = yield index_1.booksCollection.aggregate(pipeline).toArray();
            const items = (_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.items) !== null && _b !== void 0 ? _b : [];
            const totalItems = (_e = (_d = (_c = result[0]) === null || _c === void 0 ? void 0 : _c.totalCount[0]) === null || _d === void 0 ? void 0 : _d.count) !== null && _e !== void 0 ? _e : 0;
            const pagination = (0, paginator_1.getPaginationInfo)(totalItems, page, pageSize);
            return { items, pagination };
        });
    },
    postBooksMongoDB(newBook) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.booksCollection.insertOne(newBook);
            const insertedBook = yield index_1.booksCollection.findOne({ _id: result.insertedId });
            if (!insertedBook) {
                throw new Error("Ошибка: документ не найден после вставки");
            }
            return insertedBook;
        });
    },
    deleteBooksMongoDB(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield index_1.booksCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return { deleted: result.deletedCount === 1 };
        });
    }
};
