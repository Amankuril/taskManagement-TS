import mongoose, { Document, Schema } from 'mongoose';

export enum taskStatus {
    TODO = "todo",
    IN_PROGRESS = "inProgress",
    DONE = "done"
};

export interface taskDocument extends Document {
    title: string;
    description: string;
    status: taskStatus;
}

const taskSchema = new Schema<taskDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.TODO
    },

}, { timestamps: true });

const taskModel = mongoose.model<taskDocument>("Task", taskSchema);

export default taskModel;