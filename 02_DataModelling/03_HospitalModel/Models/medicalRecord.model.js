import mongoose from "mongoose"

const medicalRecordSchema = new mongoose.Schema({
    patientName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    patientProblem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    doctorAllocated: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
}, {timestamps: true})

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema)