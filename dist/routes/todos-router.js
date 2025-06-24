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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const textfieldValidationMidleware_1 = require("../midlewares/textfieldValidationMidleware");
const basicValidations_1 = require("../midlewares/basicValidations");
const switchErrors_1 = require("../midlewares/switchErrors");
const todos_service_1 = require("../domain/todos-service");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundTodos = yield todos_service_1.todosService.getTodos();
    if (!foundTodos || foundTodos.length === 0) {
        res.status(404).send("No todos found");
    }
    else {
        res.send(foundTodos);
    }
}));
exports.todosRouter.post("/", basicValidations_1.titleValidation, textfieldValidationMidleware_1.textfieldValidationMidleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const postedTodos = yield todos_service_1.todosService.postTodo(title);
    if (postedTodos) {
        res.status(201).json(postedTodos);
    }
    else {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.todosRouter.post("/task", basicValidations_1.titleValidation, basicValidations_1.idValidation, basicValidations_1.priorityValidation, textfieldValidationMidleware_1.textfieldValidationMidleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, priority = "medium" } = req.body;
    try {
        const postedTask = yield todos_service_1.todosService.postTask(id, title, priority);
        if (!postedTask) {
            res.status(404).json({ error: "Todolist not found" });
            return;
        }
        res.status(201).json(postedTask);
    }
    catch (error) {
        console.error("Error creating todo list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.todosRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosAfterRemove = yield todos_service_1.todosService.deleteTodo(req.params.id);
    if (todosAfterRemove) {
        res.send(todosAfterRemove);
    }
    else {
        res.status(404).json({ message: "Todo Not Found" });
    }
}));
exports.todosRouter.delete("/:todolistID/tasks/:taskID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todolistID, taskID } = req.params;
        const result = yield todos_service_1.todosService.deleteTask(todolistID, taskID);
        res.send(result);
    }
    catch (error) {
        if (!(error instanceof Error)) {
            res.status(500).json({ message: "Unknown error occurred" });
            return;
        }
        (0, switchErrors_1.switchErrors)(res, error.message);
    }
}));
exports.todosRouter.put("/:id", basicValidations_1.titleValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const updatedTodo = yield todos_service_1.todosService.putTodo(req.params.id, title);
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        }
        else {
            res.status(404).json({ message: "Todo Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.todosRouter.put("/:todolistID/tasks/:taskID", basicValidations_1.titleValidation, textfieldValidationMidleware_1.textfieldValidationMidleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todolistID, taskID } = req.params;
        const { title } = req.body;
        const updatedTodos = yield todos_service_1.todosService.putTask(todolistID, taskID, title);
        res.status(200).json(updatedTodos);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, switchErrors_1.switchErrors)(res, error.message);
            return;
        }
        else {
            console.error("Unknown error updating task:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}));
