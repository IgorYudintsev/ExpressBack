import {Response} from "express";

export const switchErrors=(res: Response,error:string)=>{
    switch (error) {
        case "Todo Not Found":{
            res.status(404).json({message: "Todo list not found"});
            return;
        }
        case "Task Not Found":{
            res.status(404).json({message: "Task not found in the specified todo list"});
            return;
        }
        default:{
            res.status(500).json({message: "Internal Server Error"});
            return;
        }
    }
}
